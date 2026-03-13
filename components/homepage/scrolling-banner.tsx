'use client';

import { motion } from 'framer-motion';

const scrollingItems = [
  'Herbal Products',
  'Cosmetic Ingredients', 
  'Natural Extracts',
  'Dehydrated Products',
  'Premium Spices',
  'Bulk Supply',
  'Global Export',
  'Quality Assured',
  'ISO Certified',
  'Organic Products'
];

export function ScrollingBanner() {
  // Create multiple duplicates for seamless infinite scroll
  const allItems = [...scrollingItems, ...scrollingItems, ...scrollingItems];

  return (
    <div className="w-full min-h-[80px] bg-white/90 backdrop-blur-md shadow-sm border-y border-green-100 py-6">
      <div className="container mx-auto px-4">
        {/* Scrolling Container */}
        <motion.div
          className="flex items-center gap-4 whitespace-nowrap"
          animate={{
            x: [0, -100 * scrollingItems.length - (scrollingItems.length * 8)] // Account for spacing
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          style={{
            width: 'max-content'
          }}
        >
          {allItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-green-200 shadow-sm flex-shrink-0"
            >
              <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex-shrink-0"></div>
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                {item}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}