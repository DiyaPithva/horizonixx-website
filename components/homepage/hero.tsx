"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const leaves = [
  { top: "8%", left: "10%" },
  { top: "15%", left: "85%" },
  { top: "25%", left: "30%" },
  { top: "35%", left: "70%" },
  { top: "45%", left: "15%" },
  { top: "55%", left: "90%" },
  { top: "65%", left: "40%" },
  { top: "75%", left: "75%" },
  { top: "20%", left: "55%" },
  { top: "50%", left: "60%" },
  { top: "70%", left: "20%" },
  { top: "80%", left: "45%" },
  { top: "30%", left: "80%" },
  { top: "60%", left: "5%" },
  { top: "40%", left: "50%" },
];

export function Hero() {
  return (
    <section className="relative isolate pb-16 flex justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 pointer-events-none bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.08),transparent_60%)]"></div>
      </div>

      {/* Decorative Gradient Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl opacity-10"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-secondary/10 to-transparent rounded-full blur-2xl opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-2xl opacity-10"></div>
      </div>

      {/* Floating Leaves */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {leaves.map((leaf, i) => (
          <motion.div
            key={i}
            className="absolute opacity-20"
            style={{ top: leaf.top, left: leaf.left }}
            animate={{
              y: [0, -25, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 10 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg
              className="w-10 h-10 md:w-12 md:h-12 text-primary"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto space-y-6"
        >
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-full text-sm font-medium text-primary backdrop-blur-sm"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12,2L13.09,8.26L22,9L13.09,9.74L12,16L10.91,9.74L2,9L10.91,8.26L12,2Z" />
            </svg>
            Premium Herbal Extracts for Global Markets
          </motion.div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.25] max-w-4xl mx-auto">
            <span className="block mb-2">Trusted Global Supplier of</span>

            <span className="block mt-2 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Premium Herbal & Natural Products
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            Delivering excellence in herbal raw materials, cosmetic ingredients,
            and natural products to industries worldwide.
          </p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                href="/products"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg transition-all"
              >
                Explore Products
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-all"
              >
                Get Quote
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
