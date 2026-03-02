'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Eye, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription?: string;
  basePrice: number;
  discountPercent: number;
  discountPrice: number;
  images?: { url: string; isPrimary: boolean }[];
  avgRating?: number;
  reviewCount?: number;
  isFeatured?: boolean;
  category?: string;
  image?: string;
  rating?: number;
}

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const categoryLabel = product.category || 'Mattress';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="group"
    >
      <div className="bg-white rounded-2xl shadow-md overflow-hidden card-hover border border-gray-100">
        {/* Image */}
        <Link href={`/products/${product.slug}`}>
          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="w-full h-full flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
              &#128716;
            </div>

            {/* Category Tag */}
            <span className="absolute top-3 left-3 bg-accent-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {categoryLabel}
            </span>

            {/* Discount Badge */}
            {product.discountPercent > 0 && (
              <span className="absolute top-3 right-3 bg-navy-700 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                -{product.discountPercent}%
              </span>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-navy-700/0 group-hover:bg-navy-700/5 transition-colors duration-300" />
          </div>
        </Link>

        {/* Content */}
        <div className="p-5">
          <p className="text-xs font-semibold text-accent-500 uppercase tracking-wider mb-1">
            {categoryLabel}
          </p>

          <Link href={`/products/${product.slug}`}>
            <h3 className="font-bold text-navy-700 mb-1.5 group-hover:text-accent-500 transition-colors line-clamp-1 text-lg">
              {product.name}
            </h3>
          </Link>

          {product.shortDescription && (
            <p className="text-sm text-gray-500 mb-3 line-clamp-2">
              {product.shortDescription}
            </p>
          )}

          {/* Rating */}
          {(product.avgRating || product.rating) && (
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.avgRating || product.rating || 0)
                        ? 'fill-gold-400 text-gold-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              {product.reviewCount && (
                <span className="text-xs text-gray-500">({product.reviewCount})</span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-xl font-bold text-navy-700">
              &#8377;{product.discountPrice.toLocaleString()}
            </span>
            {product.discountPercent > 0 && (
              <span className="text-sm text-gray-400 line-through">
                &#8377;{product.basePrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link href={`/products/${product.slug}`} className="text-accent-500 text-sm font-semibold hover:underline flex items-center gap-1">
              View Details <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <div className="flex-1" />
            <Link href={`/products/${product.slug}`}>
              <Button size="sm" variant="primary">
                <Eye className="w-4 h-4 mr-1" /> View
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
