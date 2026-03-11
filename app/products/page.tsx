/**
 * Products Page
 * Displays all products with search and filtering capabilities
 */

import React from "react";
import { Metadata } from "next";
import { CMSClient } from "@/lib/cms";
import { ProductsPageClient } from "./products-client";

export const metadata: Metadata = {
  title:
    "Premium Herbal, Cosmetic & Dehydrated Products | HORIZONIXX INTERNATIONAL",
  description:
    "Explore our premium herbal products, cosmetic products, spices, and dehydrated fruits & vegetables for industrial and commercial use.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  const [products, categories] = await Promise.all([
    CMSClient.getProducts({
      category: searchParams.category,
      search: searchParams.search,
    }),
    CMSClient.getCategories(),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-12 overflow-hidden">

        {/* Soft background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/40 via-white to-emerald-100/40"></div>

        {/* Decorative blur circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>
        </div>

        {/* Floating Leaves */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute opacity-20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${20 + Math.random() * 20}s`,
              }}
            >
              <svg
                className="w-10 h-10 text-green-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
              </svg>
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Premium Herbal, Cosmetic & Dehydrated Products
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
              Discover our extensive range of high-quality herbal products,
              cosmetic products, spices, and dehydrated fruits & vegetables.
              Carefully sourced and processed to meet global quality standards.
            </p>

            {/* Category Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              <div className="bg-white/60 backdrop-blur border border-green-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">50+</div>
                <div className="text-sm text-gray-600">Herbal Products</div>
              </div>

              <div className="bg-white/60 backdrop-blur border border-green-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">25+</div>
                <div className="text-sm text-gray-600">Cosmetic Products</div>
              </div>

              <div className="bg-white/60 backdrop-blur border border-green-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">30+</div>
                <div className="text-sm text-gray-600">Spices</div>
              </div>

              <div className="bg-white/60 backdrop-blur border border-green-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">40+</div>
                <div className="text-sm text-gray-600">
                  Dehydrated Fruits & Vegetables
                </div>
              </div>

            </div>

          </div>
        </div>

      </section>

      {/* PRODUCTS SECTION */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <ProductsPageClient
            initialProducts={products}
            categories={categories}
            initialCategory={searchParams.category}
            initialSearch={searchParams.search}
          />
        </div>
      </section>

    </div>
  );
}