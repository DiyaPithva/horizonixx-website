'use client';

import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/ui/animated-counter';

const stats = [
  {
    id: 'countries',
    label: 'Countries Exported',
    value: 25,
    suffix: '+',
    icon: '🌍',
    description: 'Global reach across continents'
  },
  {
    id: 'products',
    label: 'Product Variants',
    value: 300,
    suffix: '+',
    icon: '🌿',
    description: 'Diverse product portfolio'
  },
  {
    id: 'clients',
    label: 'Industrial Clients',
    value: 150,
    suffix: '+',
    icon: '🤝',
    description: 'Trusted business partnerships'
  },
  {
    id: 'experience',
    label: 'Years Experience',
    value: 10,
    suffix: '+',
    icon: '⭐',
    description: 'Proven industry expertise'
  }
];

export function CompanyStats() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-green-100/30 via-emerald-100/20 to-teal-100/30">
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
            Our Impact in Numbers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-lg text-muted max-w-2xl mx-auto px-4 sm:px-0"
          >
            These numbers reflect our commitment to excellence and the trust our clients place in us.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="card text-center p-6 sm:p-8 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary/20">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  className="text-4xl sm:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300"
                >
                  {stat.icon}
                </motion.div>

                {/* Counter */}
                <div className="mb-2">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
                    <AnimatedCounter
                      end={stat.value}
                      duration={2000}
                      suffix={stat.suffix}
                    />
                  </span>
                </div>

                {/* Label */}
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted">
                  {stat.description}
                </p>

                {/* Progress bar animation */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: index * 0.1 + 0.5 }}
                  className="h-1 bg-gradient-to-r from-primary to-secondary rounded-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12 sm:mt-16"
        >
          <div className="card-glass max-w-4xl mx-auto p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
              <div>
                <div className="text-2xl mb-2">🏭</div>
                <h4 className="font-semibold text-foreground mb-1">Manufacturing Excellence</h4>
                <p className="text-sm text-muted">State-of-the-art facilities with quality control</p>
              </div>
              <div>
                <div className="text-2xl mb-2">🚚</div>
                <h4 className="font-semibold text-foreground mb-1">Logistics Network</h4>
                <p className="text-sm text-muted">Efficient supply chain and timely delivery</p>
              </div>
              <div>
                <div className="text-2xl mb-2">📋</div>
                <h4 className="font-semibold text-foreground mb-1">Quality Assurance</h4>
                <p className="text-sm text-muted">ISO certified processes and documentation</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}