/**
 * Product Not Found Page
 * Displayed when a product slug is not found
 */

import React from 'react';
import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* 404 Illustration */}
          <div className="space-y-4">
            <div className="text-8xl font-bold text-primary/20">
              404
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Product Not Found
            </h1>
            <p className="text-lg text-muted max-w-md mx-auto">
              The product you're looking for doesn't exist or may have been moved. 
              Let's help you find what you need.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="
                px-6 py-3 bg-primary text-primary-foreground
                rounded-lg font-medium
                hover:bg-primary/90 transition-colors
                text-center
              "
            >
              Browse All Products
            </Link>
            <Link
              href="/"
              className="
                px-6 py-3 bg-card border border-border text-foreground
                rounded-lg font-medium
                hover:bg-accent transition-colors
                text-center
              "
            >
              Back to Home
            </Link>
          </div>

          {/* Popular Categories */}
          <div className="pt-8 space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              Popular Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href="/products?category=herbal-powders"
                className="
                  p-4 bg-card border border-border rounded-lg
                  hover:border-primary/50 hover:bg-primary/5
                  transition-colors text-center
                "
              >
                <div className="text-sm font-medium text-foreground">
                  Herbal Products
                </div>
              </Link>
              <Link
                href="/products?category=cosmetic-powders"
                className="
                  p-4 bg-card border border-border rounded-lg
                  hover:border-primary/50 hover:bg-primary/5
                  transition-colors text-center
                "
              >
                <div className="text-sm font-medium text-foreground">
                  Cosmetic Products
                </div>
              </Link>
              <Link
                href="/products?category=spices"
                className="
                  p-4 bg-card border border-border rounded-lg
                  hover:border-primary/50 hover:bg-primary/5
                  transition-colors text-center
                "
              >
                <div className="text-sm font-medium text-foreground">
                  Spices
                </div>
              </Link>
              <Link
                href="/products?category=dehydrated-powders"
                className="
                  p-4 bg-card border border-border rounded-lg
                  hover:border-primary/50 hover:bg-primary/5
                  transition-colors text-center
                "
              >
                <div className="text-sm font-medium text-foreground">
                  Dehydrated Fruits & Vegetables
                </div>
              </Link>
            </div>
          </div>

          {/* Contact Information */}
          <div className="pt-8 space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              Need Help?
            </h2>
            <p className="text-muted">
              Can't find what you're looking for? Our team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="
                  px-4 py-2 bg-secondary text-secondary-foreground
                  rounded-lg font-medium
                  hover:bg-secondary/90 transition-colors
                  text-center
                "
              >
                Contact Us
              </Link>
              <a
                href="https://wa.me/919974823781"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  px-4 py-2 bg-green-600 text-white
                  rounded-lg font-medium
                  hover:bg-green-700 transition-colors
                  text-center flex items-center justify-center gap-2
                "
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}