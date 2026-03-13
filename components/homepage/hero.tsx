"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ScrollingBanner } from "@/components/homepage/scrolling-banner";

const leaves = [
  { top: "10%", left: "5%" },
  { top: "15%", left: "90%" },
  { top: "25%", left: "15%" },
  { top: "30%", left: "85%" },
  { top: "40%", left: "8%" },
  { top: "50%", left: "92%" },
  { top: "60%", left: "12%" },
  { top: "70%", left: "88%" },
  { top: "80%", left: "20%" },
  { top: "85%", left: "80%" },
];

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center overflow-hidden pt-6 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Decorative Leaf Background */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {leaves.map((leaf, i) => (
          <motion.div
            key={i}
            className="absolute w-14 h-14 opacity-30 pointer-events-none"
            style={{ top: leaf.top, left: leaf.left }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg
              className="w-14 h-14 text-green-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm border border-green-200 rounded-full text-sm font-medium text-green-700 shadow-sm">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12,2L13.09,8.26L22,9L13.09,9.74L12,16L10.91,9.74L2,9L10.91,8.26L12,2Z" />
                </svg>
                Premium Herbal Extracts for Global Markets
              </div>
            </motion.div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight text-center">
                <span className="block">Trusted Global Supplier of</span>
                <span className="block mt-2 bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 bg-clip-text text-transparent">
                  Premium Herbal & Natural Products
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed text-center">
                Delivering excellence in herbal raw materials, cosmetic ingredients,
                and natural products to industries worldwide.
              </p>
            </div>

            {/* Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Explore Products
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-green-600 text-green-600 font-semibold text-lg rounded-xl hover:bg-green-600 hover:text-white transition-all duration-300"
              >
                Get Quote
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Category Pills Banner */}
      <div className="relative z-10 w-full mt-12">
        <ScrollingBanner />
      </div>
    </section>
  );
}
