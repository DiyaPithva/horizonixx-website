"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const categories = [
  {
    id: "herbal-cosmetics",
    title: "Herbal & Cosmetics",
    description:
      "Premium herbal products and cosmetic products for beauty and wellness industries.",
    icon: (
      <svg
        className="w-12 h-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    ),
    href: "/products?category=herbal-powders",
    features: ["Moringa Powder", "Ashwagandha", "Multani Mitti", "Sandalwood"],
    gradient: "from-green-500/20 to-emerald-500/20",
    color: "text-green-600",
  },
  {
    id: "healthcare-equipment",
    title: "Healthcare Equipment",
    description:
      "Medical and healthcare equipment for hospitals, clinics, and healthcare facilities.",
    icon: (
      <svg
        className="w-12 h-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    href: "/products?category=healthcare-equipment",
    features: [
      "Medical Devices",
      "Diagnostic Tools",
      "Safety Equipment",
      "Consumables",
    ],
    gradient: "from-blue-500/20 to-cyan-500/20",
    color: "text-blue-600",
  },
  {
    id: "spices",
    title: "Spices",
    description:
      "High-quality spice powders and blends for food processing and culinary industries.",
    icon: (
      <svg
        className="w-12 h-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
        />
      </svg>
    ),
    href: "/products?category=spices",
    features: [
      "Turmeric Powder",
      "Ginger Powder",
      "Garlic Powder",
      "Black Pepper",
    ],
    gradient: "from-orange-500/20 to-red-500/20",
    color: "text-orange-600",
  },
  {
    id: "dehydrated-foods",
    title: "Dehydrated Fruits & Vegetables",
    description:
      "Nutritious dehydrated fruit and vegetable powders for food and beverage industries.",
    icon: (
      <svg
        className="w-12 h-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"
        />
      </svg>
    ),
    href: "/products?category=dehydrated-powders",
    features: [
      "Beetroot Powder",
      "Mango Powder",
      "Banana Powder",
      "Carrot Powder",
    ],
    gradient: "from-purple-500/20 to-pink-500/20",
    color: "text-purple-600",
  },
];

export function ProductCategories() {
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
            Product Categories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-lg text-muted max-w-3xl mx-auto px-4 sm:px-0"
          >
            Explore our comprehensive range of products across multiple
            industries. Each category represents our commitment to quality and
            excellence.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link href={category.href}>
                <div
                  className={`card hover:shadow-xl transition-all duration-300 overflow-hidden relative bg-gradient-to-br ${category.gradient} border-2 border-transparent hover:border-primary/20`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-4 right-4 opacity-30">
                      <div className={`${category.color}`}>{category.icon}</div>
                    </div>
                  </div>

                  <div className="relative z-10 p-6 sm:p-8">
                    {/* Icon and Title */}
                    <div className="flex items-center mb-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                        className={`${category.color} mr-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        {category.icon}
                      </motion.div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {category.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-muted mb-6 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Features */}
                    <div className="mb-4 sm:mb-6">
                      <h4 className="text-sm font-semibold text-foreground mb-3">
                        Key Products:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {category.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-center text-sm text-muted"
                          >
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-medium group-hover:underline">
                        Explore Category →
                      </span>
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 sm:mt-16"
        >
          <div className="card-glass max-w-3xl mx-auto p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
              Can&apos;t Find What You&apos;re Looking For?
            </h3>
            <p className="text-muted mb-4 sm:mb-6 px-4 sm:px-0">
              We offer custom sourcing and private labeling services. Contact us
              to discuss your specific requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl transition-all duration-300"
              >
                Custom Requirements
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-xl font-medium"
              >
                View All Products
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
