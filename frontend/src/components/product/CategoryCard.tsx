'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface Category {
  name: string;
  slug: string;
  image: string;
  count?: number;
}

interface CategoryCardProps {
  category: Category;
  index: number;
}

export function CategoryCard({ category, index }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Link href={`/products?category=${category.slug}`}>
        <div className="group relative overflow-hidden rounded-2xl bg-white shadow-md card-hover border border-gray-100">
          <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <div className="text-6xl group-hover:scale-110 transition-transform duration-300">&#128716;</div>
          </div>

          <div className="p-4">
            <h3 className="font-bold text-navy-700 group-hover:text-accent-500 transition-colors">
              {category.name}
            </h3>
            {category.count && (
              <p className="text-sm text-gray-500 mt-1">{category.count} Products</p>
            )}
          </div>

          <div className="absolute inset-0 bg-navy-700/0 group-hover:bg-navy-700/5 transition-colors duration-300 rounded-2xl" />
        </div>
      </Link>
    </motion.div>
  );
}
