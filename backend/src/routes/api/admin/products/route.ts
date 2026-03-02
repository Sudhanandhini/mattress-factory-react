import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all products
export async function GET(request: NextRequest) {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        sku: true,
        basePrice: true,
        discountPrice: true,
        stock: true,
        status: true,
        isFeatured: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST create product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: body.name.toLowerCase().replace(/\s+/g, '-'),
        sku: body.sku,
        description: body.description || '',
        shortDescription: body.shortDescription || '',
        basePrice: parseFloat(body.basePrice),
        discountPrice: body.discountPrice ? parseFloat(body.discountPrice) : null,
        stock: parseInt(body.stock),
        lowStockAlert: parseInt(body.lowStockAlert),
        brand: body.brand || null,
        material: body.material || null,
        warranty: body.warranty || null,
        status: body.status || 'ACTIVE',
        isFeatured: body.isFeatured || false,
        categoryId: body.categoryId || '', // You'll need to set a default category
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create product' },
      { status: 500 }
    );
  }
}
