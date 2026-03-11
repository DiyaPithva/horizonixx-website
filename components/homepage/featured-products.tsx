'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const featuredProducts = [
  {
    id: 'moringa-powder',
    name: 'Moringa Powder',
    slug: 'moringa-powder',
    image: '/images/products/moringa-powder.webp',
    shortDescription: 'Premium quality moringa leaf powder rich in nutrients and antioxidants.',
    category: 'herbal-powders'
  },
  {
    id: 'ashwagandha',
    name: 'Ashwagandha Powder',
    slug: 'ashwagandha-powder',
    image: '/images/products/Ashwaganda_powder.avif',
    shortDescription: 'Pure ashwagandha root powder for stress relief and vitality.',
    category: 'herbal-powders'
  },
  {
    id: 'tulsi',
    name: 'Tulsi Powder',
    slug: 'tulsi-powder',
    image: '/images/products/Tulsi_powder.webp',
    shortDescription: 'Sacred basil powder with immune-boosting properties.',
    category: 'herbal-powders'
  },
  {
    id: 'amla',
    name: 'Amla Powder',
    slug: 'amla-powder',
    image: '/images/products/amla_powder.jpeg',
    shortDescription: 'Vitamin C rich amla powder for health and wellness.',
    category: 'herbal-powders'
  },
  {
    id: 'neem',
    name: 'Neem Powder',
    slug: 'neem-powder',
    image: '/images/products/Neem_powder.webp',
    shortDescription: 'Natural neem leaf powder with antibacterial properties.',
    category: 'herbal-powders'
  },
  {
    id: 'spirulina',
    name: 'Spirulina Powder',
    slug: 'spirulina-powder',
    image: '/images/products/spirulina_powder.jpg',
    shortDescription: 'Nutrient-dense blue-green algae powder superfood.',
    category: 'herbal-powders'
  }
];

export function FeaturedProducts() {
  return (
    <section className="py-16 sm:py-20 bg-white/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Featured Products
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-lg text-muted max-w-2xl mx-auto px-4 sm:px-0"
          >
            Discover our premium selection of herbal products and natural ingredients, 
            sourced from the finest suppliers and processed with the highest quality standards.
          </motion.p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group h-full"
            >
              <Link href={`/products/${product.slug}`}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col group-hover:scale-[1.02]">
                  {/* Product Image */}
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-green-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg">
                        Premium
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="flex space-x-2">
                        <span className="bg-white/90 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                          Organic
                        </span>
                        <span className="bg-white/90 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                          Export Quality
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 sm:p-6 flex-1 flex flex-col">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-green-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 sm:mb-6 line-clamp-2 flex-1">
                      {product.shortDescription}
                    </p>
                    
                    {/* View Details Button */}
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-green-600 font-semibold group-hover:text-green-700 transition-colors">
                        View Details
                      </span>
                      <div className="w-10 h-10 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Products Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8 sm:mt-12"
        >
          <Link href="/products" className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-xl font-medium text-base sm:text-lg">
            View All Products
          </Link>
        </motion.div>
      </div>
    </section>
  );
}