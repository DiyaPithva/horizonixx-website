/**
 * ProductCard Component
 * Modern circular design for herbal export company
 * Requirements: 2.5, 7.2, 7.3, 7.4
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  variant?: 'featured' | 'standard' | 'compact';
  showHoverEffect?: boolean;
  onClick?: () => void;
  className?: string;
  'data-testid'?: string;
}

export function ProductCard({
  product,
  variant = 'standard',
  showHoverEffect = true,
  onClick,
  className = '',
  'data-testid': testId = 'product-card',
}: ProductCardProps) {
  // High-quality herbal images for each product
  const getProductImage = (productName: string) => {
    const imageMap: { [key: string]: string } = {
      'moringa': 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'ashwagandha': 'https://images.unsplash.com/photo-1609501676725-7186f734b2e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'tulsi': 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'neem': 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'amla': 'https://images.unsplash.com/photo-1609501676725-7186f734b2e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'spirulina': 'https://images.unsplash.com/photo-1609501676725-7186f734b2e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'turmeric': 'https://images.unsplash.com/photo-1609501676725-7186f734b2e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      'ginger': 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    };
    
    const productKey = productName.toLowerCase().split(' ')[0];
    return imageMap[productKey] || 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
  };

  const cardContent = (
    <motion.div
      className={`
        group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl
        transition-all duration-500 ease-out cursor-pointer h-full flex flex-col
        border-2 border-transparent hover:border-green-200 dark:hover:border-green-700
        transition-transform duration-300 hover:scale-105
        ${className}
      `}
      data-testid={testId}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Professional Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.primaryImage || getProductImage(product.name)}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = getProductImage(product.name);
          }}
        />
        
        {/* Premium badge */}
        <div className="absolute top-3 right-3">
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,2L13.09,8.26L22,9L13.09,9.74L12,16L10.91,9.74L2,9L10.91,8.26L12,2Z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Product Information */}
      <div className="flex-1 flex flex-col p-6">
        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-green-600 transition-colors duration-300">
          {product.name}
        </h3>

        {/* Short Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 flex-1">
          {product.shortDescription}
        </p>

        {/* Tags */}
        <div className="flex justify-center space-x-2 mb-4">
          <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs px-2 py-1 rounded-full font-medium">
            Organic
          </span>
          <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-2 py-1 rounded-full font-medium">
            Export Quality
          </span>
        </div>

        {/* View Details Button */}
        <motion.button
          className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2.5 px-4 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );

  return product.slug ? (
    <Link href={`/products/${product.slug}`} className="block h-full">
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
}