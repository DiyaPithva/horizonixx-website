"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pb-16 flex justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-green-50 via-white to-emerald-50"></div>

      {/* Decorative circles */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-green-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center pt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto space-y-8"
        >
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-green-100 border border-green-200 rounded-full text-sm font-medium text-green-700">
            Premium Herbal Extracts for Global Markets
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
            Trusted Global Supplier of
            <span className="block text-green-600">
              Premium Herbal & Natural Products
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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
              className="px-8 py-4 border-2 border-green-600 text-green-600 font-semibold rounded-xl hover:bg-green-600 hover:text-white transition"
            >
              Get Quote
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
