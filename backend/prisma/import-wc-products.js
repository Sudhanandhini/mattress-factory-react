/**
 * WooCommerce CSV Product Import Script
 *
 * Reads a WooCommerce product export CSV and imports products,
 * categories, images, and variants into the database.
 *
 * Usage:
 *   node prisma/import-wc-products.js <path-to-csv>
 *
 * Example:
 *   node prisma/import-wc-products.js "C:/Users/Admin/Downloads/wc-product-export.csv"
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function parseDecimal(value) {
  if (!value || value === '') return null;
  const num = parseFloat(value);
  return isNaN(num) ? null : num;
}

function parseBool(value) {
  if (value === '1' || value === 1 || value === true) return true;
  if (value === '0' || value === 0 || value === false) return false;
  return false;
}

function parseWcId(value) {
  if (!value || value === '') return null;
  const num = parseInt(value, 10);
  return isNaN(num) ? null : num;
}

/**
 * Parse WooCommerce parent field like "id:315" to extract the numeric ID.
 */
function parseParentId(value) {
  if (!value || value === '') return null;
  const match = value.match(/id:(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

/**
 * Split comma-separated category names and trim whitespace.
 */
function parseCategories(value) {
  if (!value || value === '') return [];
  return value
    .split(',')
    .map((c) => c.trim())
    .filter((c) => c.length > 0);
}

/**
 * Split comma-separated image URLs and trim whitespace.
 */
function parseImages(value) {
  if (!value || value === '') return [];
  return value
    .split(',')
    .map((url) => url.trim())
    .filter((url) => url.length > 0);
}

/**
 * Parse specification rows from the HTML description table.
 * Extracts <tr><td>Label</td><td>Value</td></tr> pairs from the first <table>.
 * Skips the header row (DESCRIPTION/SPECIFICATION) and Brand row (contains HTML).
 */
function parseSpecifications(html) {
  if (!html || html === '') return [];
  const specs = [];

  // Replace literal \n with actual newlines so regex can match
  html = html.replace(/\\n/g, '\n');

  // Match all table rows with two <td> cells
  const rowRegex = /<tr[^>]*>\s*<td[^>]*>([\s\S]*?)<\/td>\s*<td[^>]*>([\s\S]*?)<\/td>\s*<\/tr>/gi;
  let match;

  while ((match = rowRegex.exec(html)) !== null) {
    // Strip HTML tags to get plain text
    let label = match[1].replace(/<[^>]+>/g, '').trim();
    let value = match[2].replace(/<[^>]+>/g, '').trim();

    // Skip header row
    if (label.toUpperCase() === 'DESCRIPTION' && value.toUpperCase() === 'SPECIFICATION') continue;

    // Skip empty rows
    if (!label || !value) continue;

    // Skip Brand row (it contains image/link HTML, value would be messy)
    if (label.toLowerCase().includes('brand')) {
      // Extract brand name from the text (e.g., "Refresh Springs")
      const brandText = value.replace(/\s+/g, ' ').trim();
      if (brandText) {
        specs.push({ label: 'Brand', value: brandText });
      }
      continue;
    }

    specs.push({ label, value });
  }

  return specs;
}

/**
 * Extract warranty value from specifications array.
 */
function extractWarranty(specs) {
  const warrantySpec = specs.find((s) => s.label.toLowerCase().includes('warranty'));
  return warrantySpec ? warrantySpec.value : null;
}

/**
 * Extract brand value from specifications array.
 */
function extractBrand(specs) {
  const brandSpec = specs.find((s) => s.label.toLowerCase().includes('brand'));
  return brandSpec ? brandSpec.value : null;
}

// ---------------------------------------------------------------------------
// Main import logic
// ---------------------------------------------------------------------------

async function importCSV(csvPath) {
  console.log(`\nReading CSV from: ${csvPath}\n`);

  let csvContent = fs.readFileSync(csvPath, 'utf-8');
  // Remove BOM if present
  if (csvContent.charCodeAt(0) === 0xFEFF) {
    csvContent = csvContent.slice(1);
  }
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
    trim: true,
    bom: true,
  });

  console.log(`Found ${records.length} rows in CSV.`);

  // Debug: print first row column names to detect BOM/encoding issues
  if (records.length > 0) {
    const cols = Object.keys(records[0]);
    console.log(`Columns (${cols.length}):`, cols.slice(0, 5).map(c => JSON.stringify(c)).join(', '), '...');
  }
  console.log('');

  // Find the actual ID column name (may have BOM prefix)
  const firstRowKeys = records.length > 0 ? Object.keys(records[0]) : [];
  const idColName = firstRowKeys.find((k) => k.replace(/^\uFEFF/, '') === 'ID') || 'ID';
  console.log(`  ID column resolved as: ${JSON.stringify(idColName)}`);

  // Separate variable (parent) products from variations
  const parentProducts = records.filter((r) => r['Type'] === 'variable' || r['Type'] === 'simple');
  const variations = records.filter((r) => r['Type'] === 'variation');

  console.log(`  Parent products: ${parentProducts.length}`);
  console.log(`  Variations:      ${variations.length}\n`);

  // ------ Step 1: Create/find all categories ------
  console.log('--- Step 1: Importing categories ---');
  const categoryMap = {}; // name -> category record

  const allCategoryNames = new Set();
  for (const row of parentProducts) {
    const cats = parseCategories(row['Categories']);
    cats.forEach((c) => allCategoryNames.add(c));
  }

  for (const name of allCategoryNames) {
    const slug = slugify(name);
    let category = await prisma.category.findUnique({ where: { slug } });
    if (!category) {
      category = await prisma.category.create({
        data: { name, slug },
      });
      console.log(`  Created category: ${name}`);
    } else {
      console.log(`  Exists category:  ${name}`);
    }
    categoryMap[name] = category;
  }

  console.log(`\nTotal categories: ${Object.keys(categoryMap).length}\n`);

  // ------ Step 2: Import parent products ------
  console.log('--- Step 2: Importing products ---');
  const productMap = {}; // wcId -> product record

  for (const row of parentProducts) {
    const wcId = parseWcId(row[idColName]);
    const name = row['Name'] || '';
    let slug = slugify(name);

    // Ensure slug uniqueness by appending wcId if needed
    const existingSlug = await prisma.product.findUnique({ where: { slug } });
    if (existingSlug && existingSlug.wcId !== wcId) {
      slug = `${slug}-${wcId}`;
    }

    // Check if already imported
    let product = wcId ? await prisma.product.findUnique({ where: { wcId } }) : null;

    const productData = {
      wcId,
      name,
      slug,
      type: row['Type'] || 'variable',
      description: row['Description'] || null,
      shortDescription: row['Short description'] || null,
      isPublished: parseBool(row['Published']),
      isFeatured: parseBool(row['Is featured?']),
      visibility: row['Visibility in catalog'] || 'visible',
      taxStatus: row['Tax status'] || 'taxable',
      taxClass: row['Tax class'] || null,
      inStock: parseBool(row['In stock?']),
      stock: parseInt(row['Stock'] || '0', 10) || 0,
      allowReviews: parseBool(row['Allow customer reviews?']),
      // Attribute values stored on product for filtering
      sizeGroups: row['Attribute 1 value(s)'] || null,
      dimensions: row['Attribute 2 value(s)'] || null,
      firmness: row['Attribute 3 value(s)'] || null,
      // SEO (from Rank Math meta)
      metaTitle: row['Meta: rank_math_title'] || null,
      metaDescription: row['Meta: rank_math_description'] || null,
      metaKeywords: row['Meta: rank_math_focus_keyword'] || null,
      // View count from WooCommerce
      viewCount: parseInt(row['Meta: _eael_post_view_count'] || '0', 10) || 0,
    };

    if (product) {
      product = await prisma.product.update({
        where: { wcId },
        data: productData,
      });
      console.log(`  Updated product: ${name} (WC ID: ${wcId})`);
    } else {
      product = await prisma.product.create({ data: productData });
      console.log(`  Created product: ${name} (WC ID: ${wcId})`);
    }

    productMap[wcId] = product;

    // ------ Link categories (many-to-many) ------
    const categoryNames = parseCategories(row['Categories']);
    // Remove existing links first to avoid duplicates on re-import
    await prisma.productCategory.deleteMany({ where: { productId: product.id } });
    for (const catName of categoryNames) {
      const cat = categoryMap[catName];
      if (cat) {
        await prisma.productCategory.create({
          data: { productId: product.id, categoryId: cat.id },
        });
      }
    }

    // ------ Import images ------
    const imageUrls = parseImages(row['Images']);
    // Remove existing images on re-import
    await prisma.productImage.deleteMany({ where: { productId: product.id } });
    for (let i = 0; i < imageUrls.length; i++) {
      await prisma.productImage.create({
        data: {
          productId: product.id,
          url: imageUrls[i],
          altText: name,
          sortOrder: i,
          isPrimary: i === 0,
        },
      });
    }

    // ------ Parse & import specifications from HTML description ------
    const description = row['Description'] || '';
    const specs = parseSpecifications(description);
    await prisma.productSpecification.deleteMany({ where: { productId: product.id } });
    for (let i = 0; i < specs.length; i++) {
      await prisma.productSpecification.create({
        data: {
          productId: product.id,
          label: specs[i].label,
          value: specs[i].value,
          sortOrder: i,
        },
      });
    }

    // Extract brand and warranty from specs into product fields
    const brand = extractBrand(specs);
    const warranty = extractWarranty(specs);
    if (brand || warranty) {
      await prisma.product.update({
        where: { id: product.id },
        data: {
          ...(brand ? { brand } : {}),
          ...(warranty ? { warranty } : {}),
        },
      });
    }

    if (specs.length > 0) {
      console.log(`    -> ${specs.length} specifications`);
    }

    // ------ Import badges (from warranty value) ------
    await prisma.productBadge.deleteMany({ where: { productId: product.id } });
    const badges = [];
    if (warranty) {
      badges.push({ title: `${warranty} Warranty`, icon: 'Shield' });
    }
    badges.push({ title: 'Free Delivery Only in Bangalore', icon: 'Truck' });
    badges.push({ title: 'Customization', icon: 'Settings' });
    for (let i = 0; i < badges.length; i++) {
      await prisma.productBadge.create({
        data: {
          productId: product.id,
          title: badges[i].title,
          icon: badges[i].icon,
          sortOrder: i,
        },
      });
    }

    // ------ Import freebies (free products offered) ------
    await prisma.productFreebie.deleteMany({ where: { productId: product.id } });
    // Only add freebies for mattress products (not accessories like pillows/sheets)
    const isMattress = row['Type'] === 'variable' && (row['Categories'] || '').toLowerCase().includes('mattress');
    if (isMattress) {
      const freebies = [
        { name: 'Free Pillow', image: null },
        { name: 'Waterproof Protector', image: null },
      ];
      for (let i = 0; i < freebies.length; i++) {
        await prisma.productFreebie.create({
          data: {
            productId: product.id,
            name: freebies[i].name,
            image: freebies[i].image,
            sortOrder: i,
          },
        });
      }
    }
  }

  console.log(`\nTotal products: ${Object.keys(productMap).length}\n`);

  // ------ Step 3: Import variations ------
  console.log('--- Step 3: Importing variants ---');
  let variantCount = 0;

  for (const row of variations) {
    const wcId = parseWcId(row[idColName]);
    const parentWcId = parseParentId(row['Parent']);
    const parentProduct = parentWcId ? productMap[parentWcId] : null;

    if (!parentProduct) {
      console.log(`  SKIP variant WC ID ${wcId}: parent WC ID ${parentWcId} not found`);
      continue;
    }

    const sizeGroup = row['Attribute 1 value(s)'] || null; // King / Queen
    const dimension = row['Attribute 2 value(s)'] || '';     // 72x60, etc.
    const regularPrice = parseDecimal(row['Regular price']);
    const salePrice = parseDecimal(row['Sale price']);

    if (!regularPrice) {
      console.log(`  SKIP variant WC ID ${wcId}: no regular price`);
      continue;
    }

    const variantData = {
      wcId,
      productId: parentProduct.id,
      parentWcId,
      sizeGroup,
      size: dimension,
      firmness: null, // Firmness is at product level, not per variation in this CSV
      price: regularPrice,
      salePrice,
      inStock: parseBool(row['In stock?']),
      stock: parseInt(row['Stock'] || '0', 10) || 0,
      sortOrder: parseInt(row['Position'] || '0', 10) || 0,
    };

    let variant = wcId ? await prisma.productVariant.findUnique({ where: { wcId } }) : null;

    if (variant) {
      await prisma.productVariant.update({ where: { wcId }, data: variantData });
      console.log(`  Updated variant: ${parentProduct.name} | ${sizeGroup} ${dimension} (WC ID: ${wcId})`);
    } else {
      await prisma.productVariant.create({ data: variantData });
      console.log(`  Created variant: ${parentProduct.name} | ${sizeGroup} ${dimension} (WC ID: ${wcId})`);
    }

    variantCount++;
  }

  console.log(`\nTotal variants imported: ${variantCount}\n`);

  // ------ Summary ------
  console.log('========================================');
  console.log('  Import complete!');
  console.log(`  Categories: ${Object.keys(categoryMap).length}`);
  console.log(`  Products:   ${Object.keys(productMap).length}`);
  console.log(`  Variants:   ${variantCount}`);
  console.log('========================================\n');
}

// ---------------------------------------------------------------------------
// CLI entry point
// ---------------------------------------------------------------------------

async function main() {
  const csvPath = process.argv[2];

  if (!csvPath) {
    console.error('Usage: node prisma/import-wc-products.js <path-to-csv>');
    console.error('Example: node prisma/import-wc-products.js "C:/Users/Admin/Downloads/wc-product-export.csv"');
    process.exit(1);
  }

  const resolvedPath = path.resolve(csvPath);
  if (!fs.existsSync(resolvedPath)) {
    console.error(`File not found: ${resolvedPath}`);
    process.exit(1);
  }

  try {
    await importCSV(resolvedPath);
  } catch (error) {
    console.error('\nImport failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
