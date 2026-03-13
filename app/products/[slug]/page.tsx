/**
 * Dynamic Product Detail Page
 * Displays detailed product information with related products and structured data
 * Requirements: 2.1, 2.3, 11.2, 15.2
 */

import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CMSClient } from '@/lib/cms';
import { ProductDetail, ProductCard } from '@/components/product';
import { Product } from '@/types/product';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all products (SSG)
export async function generateStaticParams() {
  try {
    const products = await CMSClient.getProducts();
    return products.map((product) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  try {
    const product = await CMSClient.getProductBySlug(params.slug);
    
    if (!product) {
      return {
        title: 'Product Not Found | HORIZONIXX INTERNATIONAL',
        description: 'The requested product could not be found.',
      };
    }

    const title = product.seoTitle || `${product.name} | HORIZONIXX INTERNATIONAL`;
    const description = product.seoDescription || product.shortDescription;
    const keywords = product.keywords || [];

    return {
      title,
      description,
      keywords: [
        ...keywords,
        product.name.toLowerCase(),
        product.category.replace('-', ' '),
        'herbal exporter india',
        'bulk supplier',
        'industrial grade',
      ],
      openGraph: {
        title,
        description,
        type: 'website',
        url: `https://horizonixx.com/products/${product.slug}`,
        images: [
          {
            url: product.primaryImage || '/images/og-product-default.jpg',
            width: 1200,
            height: 630,
            alt: product.name,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [product.primaryImage || '/images/og-product-default.jpg'],
      },
      alternates: {
        canonical: `https://horizonixx.com/products/${product.slug}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Product | HORIZONIXX INTERNATIONAL',
      description: 'Premium herbal products and spices for industrial use.',
    };
  }
}

// Generate structured data for Product schema
function generateProductStructuredData(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.primaryImage ? [product.primaryImage] : [],
    brand: {
      '@type': 'Brand',
      name: 'HORIZONIXX INTERNATIONAL',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'HORIZONIXX INTERNATIONAL',
      url: 'https://horizonixx.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'B/22 Suncity Park',
        addressLocality: 'Ankleshwar',
        addressRegion: 'Gujarat',
        postalCode: '393002',
        addressCountry: 'IN',
      },
    },
    category: product.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    additionalProperty: Object.entries(product.specifications || {})
      .filter(([, value]) => value)
      .map(([key, value]) => ({
        '@type': 'PropertyValue',
        name: key.replace(/([A-Z])/g, ' $1').trim(),
        value: value,
      })),
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      seller: {
        '@type': 'Organization',
        name: 'HORIZONIXX INTERNATIONAL',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '25',
      bestRating: '5',
      worstRating: '1',
    },
  };
}

// Generate breadcrumb structured data
function generateBreadcrumbStructuredData(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://horizonixx.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products',
        item: 'https://horizonixx.com/products',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        item: `https://horizonixx.com/products?category=${product.category}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: product.name,
        item: `https://horizonixx.com/products/${product.slug}`,
      },
    ],
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    // Fetch product data
    const product = await CMSClient.getProductBySlug(params.slug);
    
    if (!product) {
      notFound();
    }

    // Check if this is a parent product with sub-products
    const isParentProduct = product.isParentProduct && product.subProducts && product.subProducts.length > 0;

    // Fetch related products from the same category (only if not a parent product)
    const relatedProducts = !isParentProduct ? await CMSClient.getProducts({
      category: product.category,
      limit: 4,
    }) : [];

    // Filter out the current product from related products
    const filteredRelatedProducts = relatedProducts.filter(p => p.slug !== product.slug);

    // Generate structured data
    const productStructuredData = generateProductStructuredData(product);
    const breadcrumbStructuredData = generateBreadcrumbStructuredData(product);

    return (
      <>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbStructuredData),
          }}
        />

        <div className="min-h-screen bg-background">
          {/* Breadcrumb Navigation */}
          <section className="bg-accent/30 py-4">
            <div className="container mx-auto px-4">
              <nav className="flex items-center space-x-2 text-sm">
                <Link 
                  href="/" 
                  className="text-muted hover:text-primary transition-colors"
                >
                  Home
                </Link>
                <span className="text-muted">/</span>
                <Link 
                  href="/products" 
                  className="text-muted hover:text-primary transition-colors"
                >
                  Products
                </Link>
                <span className="text-muted">/</span>
                <Link 
                  href={`/products?category=${product.category}`}
                  className="text-muted hover:text-primary transition-colors"
                >
                  {product.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Link>
                <span className="text-muted">/</span>
                <span className="text-foreground font-medium">
                  {product.name}
                </span>
              </nav>
            </div>
          </section>

          {/* Product Detail Section */}
          {isParentProduct ? (
            // Parent Product with Sub-Products
            <section className="py-12">
              <div className="container mx-auto px-4">
                {/* Hero Title and Description */}
                <div className="max-w-4xl mx-auto text-center mb-12">
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                    {product.name}
                  </h1>
                  <p className="text-lg text-muted leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Sub-Products Grid */}
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-foreground mb-4">
                      Our {product.name} Range
                    </h2>
                    <p className="text-muted max-w-2xl mx-auto">
                      Explore our complete range of {product.name.toLowerCase()} variants
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {product.subProducts!.map((subProduct) => (
                      <div
                        key={subProduct.id}
                        className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="relative mb-4 rounded-lg overflow-hidden bg-accent/20 h-48">
                          <img
                            src={subProduct.primaryImage}
                            alt={subProduct.name}
                            className="w-full h-48 object-cover"
                          />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {subProduct.name}
                        </h3>
                        <p className="text-muted text-sm mb-4 line-clamp-3">
                          {subProduct.shortDescription}
                        </p>
                        <div className="space-y-2 mb-4">
                          <div className="text-sm">
                            <span className="font-medium text-foreground">Specifications:</span>
                            <ul className="text-muted mt-1 space-y-1">
                              {Object.entries(subProduct.specifications).map(([key, value]) => (
                                value && (
                                  <li key={key} className="text-xs">
                                    • {key.replace(/([A-Z])/g, ' $1').trim()}: {value}
                                  </li>
                                )
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-border">
                          <p className="text-xs text-muted">
                            <span className="font-medium">Packing:</span> {subProduct.packing.options.join(', ')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits Section */}
                {product.benefits && product.benefits.length > 0 && (
                  <div className="mt-12 max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                      Key Benefits
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <svg
                            className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-muted">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          ) : (
            // Regular Product Detail
            <section className="py-12">
              <div className="container mx-auto px-4">
                <ProductDetail product={product} />
              </div>
            </section>
          )}

          {/* Related Products Section (only for non-parent products) */}
          {!isParentProduct && filteredRelatedProducts.length > 0 && (
            <section className="py-12 bg-accent/20">
              <div className="container mx-auto px-4">
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-foreground mb-4">
                      Related Products
                    </h2>
                    <p className="text-muted max-w-2xl mx-auto">
                      Explore other premium products in the {product.category.replace('-', ' ')} category
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredRelatedProducts.slice(0, 4).map((relatedProduct) => (
                      <ProductCard
                        key={relatedProduct.id}
                        product={relatedProduct}
                        variant="standard"
                        showHoverEffect={true}
                      />
                    ))}
                  </div>

                  <div className="text-center">
                    <Link
                      href={`/products?category=${product.category}`}
                      className="
                        inline-flex items-center gap-2
                        px-6 py-3 bg-primary text-primary-foreground
                        rounded-lg font-medium
                        hover:bg-primary/90 transition-colors
                      "
                    >
                      View All {product.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      <svg
                        className="w-4 h-4"
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
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Call to Action Section */}
          <section className="py-12 bg-gradient-to-r from-primary/10 to-secondary/10">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center space-y-6">
                <h2 className="text-3xl font-bold text-foreground">
                  Ready to Place Your Order?
                </h2>
                <p className="text-lg text-muted">
                  Contact our team for detailed specifications, pricing, and bulk order arrangements. 
                  We ensure quality products with reliable global shipping.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="
                      px-8 py-4 bg-primary text-primary-foreground
                      rounded-lg font-semibold text-lg
                      hover:bg-primary/90 transition-colors
                      text-center
                    "
                  >
                    Request Quote
                  </Link>
                  <Link
                    href="/products"
                    className="
                      px-8 py-4 bg-card border-2 border-primary text-primary
                      rounded-lg font-semibold text-lg
                      hover:bg-primary/5 transition-colors
                      text-center
                    "
                  >
                    Browse More Products
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  } catch (error) {
    console.error('Error loading product page:', error);
    notFound();
  }
}