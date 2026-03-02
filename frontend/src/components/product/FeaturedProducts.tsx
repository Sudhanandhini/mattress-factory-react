'use client';

import { ProductCard } from './ProductCard';
import { StaggerContainer, StaggerItem } from '../ui/AnimatedSection';

const mockProducts = [
  {
    id: '1',
    name: 'Bliss Memory Foam Mattress',
    slug: 'bliss-memory-foam-mattress',
    shortDescription: 'Premium memory foam for ultimate comfort and support.',
    basePrice: 35999,
    discountPercent: 33,
    discountPrice: 24119,
    images: [{ url: '/images/products/memory-foam-1.jpg', isPrimary: true }],
    avgRating: 4.5,
    reviewCount: 128,
    isFeatured: true,
    category: 'Memory Foam',
  },
  {
    id: '2',
    name: 'Bonnell Plus Spring Mattress',
    slug: 'bonnell-plus-spring-mattress',
    shortDescription: 'Traditional spring support with modern comfort layers.',
    basePrice: 41999,
    discountPercent: 33,
    discountPrice: 28139,
    images: [{ url: '/images/products/spring-1.jpg', isPrimary: true }],
    avgRating: 4.3,
    reviewCount: 95,
    isFeatured: true,
    category: 'Spring',
  },
  {
    id: '3',
    name: 'Orthopedic Support Mattress',
    slug: 'orthopedic-support-mattress',
    shortDescription: 'Designed for optimal back support and posture care.',
    basePrice: 38999,
    discountPercent: 30,
    discountPrice: 27299,
    images: [{ url: '/images/products/ortho-1.jpg', isPrimary: true }],
    avgRating: 4.7,
    reviewCount: 156,
    isFeatured: true,
    category: 'Orthopedic',
  },
  {
    id: '4',
    name: 'Hybrid Comfort Mattress',
    slug: 'hybrid-comfort-mattress',
    shortDescription: 'Best of foam and spring technology combined.',
    basePrice: 45999,
    discountPercent: 35,
    discountPrice: 29899,
    images: [{ url: '/images/products/hybrid-1.jpg', isPrimary: true }],
    avgRating: 4.6,
    reviewCount: 103,
    isFeatured: true,
    category: 'Hybrid',
  },
];

export function FeaturedProducts() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {mockProducts.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
