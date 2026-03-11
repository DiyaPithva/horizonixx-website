/**
 * ProductDetail Component
 * Displays comprehensive product information including specifications, benefits, and packing details
 * Requirements: 2.1, 11.2
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';

interface ProductDetailProps {
  product: Product;
  relatedProducts?: Product[];
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [imageError, setImageError] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  return (
    <div className="space-y-8">
      {/* Product Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg overflow-hidden">
            {product.primaryImage && !imageError && (
              <Image
                src={product.primaryImage}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                data-testid="product-image"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            )}
            
            {/* Placeholder when no image or image fails to load */}
            {(!product.primaryImage || imageError) && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="w-16 h-16 text-muted mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm text-muted">
                    {product.name}
                  </span>
                </div>
              </div>
            )}
          </div>
          
          {/* Additional Images Gallery - placeholder for future implementation */}
          {product.images && product.images.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square bg-accent rounded-md overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, 12.5vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          {/* Category Badge */}
          <div>
            <span className="
              px-3 py-1 text-sm font-medium
              bg-primary/10 text-primary
              rounded-full
            ">
              {product.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          </div>

          {/* Product Name */}
          <h1 
            className="text-3xl md:text-4xl font-bold text-foreground"
            data-testid="product-name"
          >
            {product.name}
          </h1>

          {/* Short Description */}
          <p 
            className="text-lg text-muted leading-relaxed"
            data-testid="product-description"
          >
            {product.shortDescription}
          </p>

          {/* Key Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="space-y-3" data-testid="product-specifications">
              <h3 className="text-lg font-semibold text-foreground">
                Key Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  value && (
                    <div
                      key={key}
                      className="
                        flex justify-between items-center
                        p-3 bg-card border border-border rounded-lg
                      "
                    >
                      <span className="font-medium text-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="text-muted">
                        {value}
                      </span>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Packing Information */}
          {product.packing && product.packing.options.length > 0 && (
            <div className="space-y-3" data-testid="product-packing">
              <h3 className="text-lg font-semibold text-foreground">
                Packing Options
              </h3>
              <div className="space-y-2">
                {product.packing.options.map((option, index) => (
                  <div
                    key={index}
                    className="
                      flex items-center gap-2
                      p-3 bg-accent/50 rounded-lg
                    "
                  >
                    <svg
                      className="w-4 h-4 text-primary flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-foreground">
                      {option}
                    </span>
                  </div>
                ))}
                {product.packing.customAvailable && (
                  <div className="
                    flex items-center gap-2
                    p-3 bg-secondary/10 rounded-lg
                  ">
                    <svg
                      className="w-4 h-4 text-secondary flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span className="text-foreground">
                      Custom packing available on request
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detailed Description */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">
          Product Description
        </h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-muted leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Benefits */}
      {product.benefits && product.benefits.length > 0 && (
        <div className="space-y-4" data-testid="product-benefits">
          <h2 className="text-2xl font-bold text-foreground">
            Key Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.benefits.map((benefit, index) => (
              <div
                key={index}
                className="
                  flex items-start gap-3
                  p-4 bg-card border border-border rounded-lg
                  hover:border-primary/50 transition-colors
                "
              >
                <svg
                  className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-foreground">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features (if available) */}
      {product.features && product.features.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.features.map((feature, index) => (
              <div
                key={index}
                className="
                  p-4 bg-accent/30 rounded-lg
                  border border-accent
                "
              >
                <span className="text-foreground">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact for Inquiry */}
      <div className="
        p-6 bg-gradient-to-r from-primary/10 to-secondary/10
        border border-primary/20 rounded-lg
      ">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold text-foreground">
            Interested in this product?
          </h3>
          <p className="text-muted">
            Contact us for detailed specifications, pricing, and bulk orders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="
                px-6 py-3 bg-primary text-primary-foreground
                rounded-lg font-medium
                hover:bg-primary/90 transition-colors
                text-center
              "
            >
              Get Quote
            </a>
            <a
              href="https://wa.me/919974823781"
              target="_blank"
              rel="noopener noreferrer"
              className="
                px-6 py-3 bg-secondary text-secondary-foreground
                rounded-lg font-medium
                hover:bg-secondary/90 transition-colors
                text-center flex items-center justify-center gap-2
              "
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}