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
    <section className="py-6 sm:py-8 bg-gradient-to-r from-green-100/50 via-emerald-100/30 to-teal-100/50 border-y border-green-200/30 overflow-hidden">
      <div className="relative">
        {/* Scrolling Container */}
        <motion.div
          className="flex items-center whitespace-nowrap"
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
              className="flex items-center space-x-2 px-3 sm:px-4 py-2 mx-3 sm:mx-4 bg-white/60 backdrop-blur-sm rounded-full border border-green-200/50 shadow-sm hover:bg-white/80 transition-colors duration-300 flex-shrink-0"
            >
              <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex-shrink-0"></div>
              <span className="text-xs sm:text-sm md:text-base font-medium text-gray-700 flex-shrink-0">
                {item}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 md:w-24 bg-gradient-to-r from-green-100 via-green-100/80 to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 md:w-24 bg-gradient-to-l from-green-100 via-green-100/80 to-transparent pointer-events-none z-10"></div>
      </div>
    </section>
  );
}