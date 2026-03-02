import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        categories: {
          include: { category: { select: { id: true, name: true, slug: true } } },
        },
        images: { orderBy: { sortOrder: 'asc' } },
        variants: { orderBy: { sortOrder: 'asc' } },
        specifications: { orderBy: { sortOrder: 'asc' } },
        badges: { orderBy: { sortOrder: 'asc' } },
        freebies: { orderBy: { sortOrder: 'asc' } },
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error: any) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const updateData: Record<string, any> = {};
    if (body.name !== undefined)             updateData.name             = body.name;
    if (body.shortDescription !== undefined) updateData.shortDescription = body.shortDescription || null;
    if (body.description !== undefined)      updateData.description      = body.description || null;
    if (body.basePrice !== undefined)        updateData.basePrice        = body.basePrice != null ? parseFloat(body.basePrice) : null;
    if (body.discountPrice !== undefined)    updateData.discountPrice    = body.discountPrice ? parseFloat(body.discountPrice) : null;
    if (body.stock !== undefined)            updateData.stock            = parseInt(body.stock);
    if (body.lowStockAlert !== undefined)    updateData.lowStockAlert    = parseInt(body.lowStockAlert);
    if (body.brand !== undefined)            updateData.brand            = body.brand || null;
    if (body.material !== undefined)         updateData.material         = body.material || null;
    if (body.warranty !== undefined)         updateData.warranty         = body.warranty || null;
    if (body.status !== undefined)           updateData.status           = body.status;
    if (body.isFeatured !== undefined)       updateData.isFeatured       = Boolean(body.isFeatured);

    const product = await prisma.product.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json({ success: true, message: 'Product updated successfully', data: product });
  } catch (error: any) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: error.message || 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.productImage.deleteMany({ where: { productId: params.id } });
    await prisma.productVariant.deleteMany({ where: { productId: params.id } });
    await prisma.productSpecification.deleteMany({ where: { productId: params.id } });
    await prisma.productBadge.deleteMany({ where: { productId: params.id } });
    await prisma.productFreebie.deleteMany({ where: { productId: params.id } });
    await prisma.productCategory.deleteMany({ where: { productId: params.id } });
    await prisma.product.delete({ where: { id: params.id } });

    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete product' }, { status: 500 });
  }
}
