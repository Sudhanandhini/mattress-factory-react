import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;

    // Delete related data first
    await prisma.productImage.deleteMany({
      where: { productId },
    });

    await prisma.productVariant.deleteMany({
      where: { productId },
    });

    // Delete the product
    const product = await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json({
      message: 'Product deleted successfully',
      product,
    });
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete product' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        images: true,
        variants: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error: any) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name: body.name,
        description: body.description,
        shortDescription: body.shortDescription,
        basePrice: body.basePrice ? parseFloat(body.basePrice) : undefined,
        discountPrice: body.discountPrice ? parseFloat(body.discountPrice) : null,
        stock: body.stock ? parseInt(body.stock) : undefined,
        lowStockAlert: body.lowStockAlert ? parseInt(body.lowStockAlert) : undefined,
        brand: body.brand || null,
        material: body.material || null,
        warranty: body.warranty || null,
        status: body.status,
        isFeatured: body.isFeatured,
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update product' },
      { status: 500 }
    );
  }
}
