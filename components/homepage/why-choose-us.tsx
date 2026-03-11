'use client';

import { motion } from 'framer-motion';

const features = [
  {
    id: 'global-export',
    title: 'Global Export Network',
    description: 'Serving 25+ countries worldwide with reliable shipping and logistics partnerships.',
    icon: '🌍'
  },
  {
    id: 'quality-assured',
    title: 'Quality Assured Products',
    description: 'Rigorous quality control processes ensure premium standards for all our products.',
    icon: '✅'
  },
  {
    id: 'iso-certified',
    title: 'ISO Certified Company',
    description: 'ISO 9001:2015 certified for import, export and repacking of herbal and natural products.',
    icon: '🏆'
  },
  {
    id: 'reliable-supply',
    title: 'Reliable Supply Chain',
    description: 'Consistent supply chain management with trusted suppliers and efficient processes.',
    icon: '🔗'
  },
  {
    id: 'bulk-industrial',
    title: 'Bulk Industrial Supply',
    description: 'Specialized in bulk quantities for industrial clients with flexible packaging options.',
    icon: '📦'
  }
];

export function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20 bg-white/30 backdrop-blur-sm">
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
            Why Choose HORIZONIXX INTERNATIONAL?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-lg text-muted max-w-3xl mx-auto px-4 sm:px-0"
          >
            We are committed to delivering excellence in every aspect of our business, 
            from product quality to customer service and global logistics.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Row 1: First 3 cards */}
          {features.slice(0, 3).map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
                <div className="card-glass h-full p-6 sm:p-8 text-center hover:shadow-xl transition-all duration-300">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  className="text-5xl sm:text-6xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300"
                >
                  {feature.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-muted leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative element */}
                <div className="mt-6 w-12 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}

          {/* Row 2: Last 2 cards centered with same width */}
          <div className="sm:col-span-2 lg:col-span-3 flex justify-center gap-6 sm:gap-8">
            {features.slice(3).map((feature, index) => (
              <div key={feature.id} className="w-full sm:w-[48%] lg:w-[32%]">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (index + 3) * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <div className="card-glass h-full p-6 sm:p-8 text-center hover:shadow-xl transition-all duration-300">
                    {/* Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: (index + 3) * 0.1 + 0.2 }}
                      className="text-5xl sm:text-6xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300"
                    >
                      {feature.icon}
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Decorative element */}
                    <div className="mt-6 w-12 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 sm:mt-16"
        >
          <div className="card-glass max-w-2xl mx-auto p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
              Ready to Partner with Us?
            </h3>
            <p className="text-muted mb-4 sm:mb-6 px-4 sm:px-0">
              Join hundreds of satisfied clients worldwide who trust us for their herbal and natural product needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl transition-all duration-300">
                Get Quote
              </a>
              <a href="/products" className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-xl font-medium">
                Browse Catalog
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}