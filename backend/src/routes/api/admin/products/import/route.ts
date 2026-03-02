import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper function to parse CSV
function parseCSV(csvText: string): Array<Record<string, string>> {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map((h) => h.trim().replace(/^"(.*)"$/, '$1'));

  const data: Array<Record<string, string>> = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    // Handle quoted fields with commas inside
    const regex = /("([^"]*)")|([^,]+)/g;
    const fields: string[] = [];
    let match;
    while ((match = regex.exec(line)) !== null) {
      if (match[2]) {
        fields.push(match[2]);
      } else {
        fields.push(match[3]?.trim() || '');
      }
    }

    const row: Record<string, string> = {};
    headers.forEach((header, index) => {
      row[header] = fields[index] || '';
    });
    data.push(row);
  }

  return data;
}

// Helper to generate unique slug
async function generateUniqueSlug(baseName: string): Promise<string> {
  let slug = baseName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  let count = 1;

  while (await prisma.product.findUnique({ where: { slug } })) {
    slug = `${baseName.toLowerCase().replace(/\s+/g, '-')}-${count}`;
    count++;
  }

  return slug;
}

// Helper to parse price
function parsePrice(value: string): number | null {
  if (!value || value.trim() === '') return null;
  const num = parseFloat(value.replace(/[^\d.-]/g, ''));
  return isNaN(num) ? null : num;
}

// Helper to parse stock
function parseStock(value: string): number {
  if (!value || value.trim() === '') return 0;
  const num = parseInt(value);
  return isNaN(num) ? 0 : num;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const csvText = await file.text();
    const rows = parseCSV(csvText);

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'CSV file is empty' },
        { status: 400 }
      );
    }

    let importedCount = 0;
    let skippedCount = 0;
    const errors: string[] = [];

    // Get or create default category
    let defaultCategory = await prisma.category.findFirst();
    if (!defaultCategory) {
      defaultCategory = await prisma.category.create({
        data: {
          name: 'General',
          slug: 'general',
          description: 'General products',
        },
      });
    }

    // Process each row
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      try {
        const name = row['Name'] || row['name'] || '';
        const sku = row['SKU'] || row['sku'] || `SKU-${Date.now()}-${i}`;

        if (!name || !sku) {
          skippedCount++;
          errors.push(`Row ${i + 2}: Missing name or SKU`);
          continue;
        }

        // Check if product already exists
        const existingProduct = await prisma.product.findUnique({
          where: { sku },
        });

        if (existingProduct) {
          skippedCount++;
          continue;
        }

        const basePrice = parsePrice(row['Regular price'] || row['basePrice'] || '0');
        const discountPrice = parsePrice(row['Sale price'] || row['discountPrice'] || '');
        const stock = parseStock(row['Stock'] || row['stock'] || '0');

        const slug = await generateUniqueSlug(name);

        const product = await prisma.product.create({
          data: {
            name,
            slug,
            sku,
            description: row['Description'] || row['description'] || '',
            shortDescription: row['Short description'] || row['shortDescription'] || '',
            basePrice: basePrice || 0,
            discountPrice: discountPrice || null,
            stock: stock,
            lowStockAlert: 10,
            brand: row['Brands'] || row['brand'] || null,
            material: row['Attribute 1 value(s)'] || row['material'] || null,
            warranty: row['warranty'] || null,
            status: row['Published'] === '1' || row['Published'] === 'true' ? 'ACTIVE' : 'INACTIVE',
            isFeatured: row['Is featured?'] === '1' || row['Is featured?'] === 'true',
            categoryId: defaultCategory.id,
          },
        });

        importedCount++;
      } catch (rowError: any) {
        skippedCount++;
        errors.push(`Row ${i + 2}: ${rowError.message}`);
      }
    }

    return NextResponse.json({
      importedCount,
      skippedCount,
      totalRows: rows.length,
      errors: errors.slice(0, 10), // Return first 10 errors
    });
  } catch (error: any) {
    console.error('Error importing CSV:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to import CSV' },
      { status: 500 }
    );
  }
}
