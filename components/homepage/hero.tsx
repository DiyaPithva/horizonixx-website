"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pb-16 flex justify-center overflow-hidden">
      {/* Soft Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10" />

      {/* Decorative Blurred Shapes (lighter) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Leaves (reduced for performance) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-20 text-primary"
            initial={{
              x: Math.random() * 800,
              y: Math.random() * 500,
              rotate: Math.random() * 360,
            }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto space-y-8"
        >
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary">
            Premium Herbal Extracts for Global Markets
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Trusted Global Supplier of
            <span className="block bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              Premium Herbal & Natural Products
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg text-muted max-w-3xl mx-auto">
            Delivering excellence in herbal raw materials, cosmetic ingredients,
            and natural products to industries worldwide.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/products"
              className="px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition"
            >
              Explore Products
            </Link>

            <Link
              href="/contact"
              className="px-8 py-4 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition"
            >
              Get Quote
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
