import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
        addresses: true,
        orders: {
          orderBy: { createdAt: 'desc' },
          include: {
            items: true,
            shippingAddress: true,
            payment: true,
            statusHistory: { orderBy: { createdAt: 'asc' } },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error('User detail error:', error);
    return NextResponse.json({ success: false, message: 'Error fetching user' }, { status: 500 });
  }
}
