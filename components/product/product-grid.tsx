/**
 * ProductGrid Component
 * Displays products in a responsive grid layout with filtering
 * Requirements: 7.5, 10.5, 11.1
 */

'use client';

import React from 'react';
import { Product, Category, FilterOptions } from '@/types/product';
import { ProductCard } from '@/components/product/product-card';

interface ProductGridProps {
  products: Product[];
  categories?: Category[];
  searchQuery?: string;
  filterOptions?: FilterOptions;
  loading?: boolean;
  className?: string;
  'data-testid'?: string;
}

export function ProductGrid({
  products,
  categories = [],
  searchQuery = '',
  filterOptions,
  loading = false,
  className = '',
  'data-testid': testId = 'product-grid',
}: ProductGridProps) {
  // Filter products by category if specified
  const filteredProducts = React.useMemo(() => {
    if (!filterOptions?.category) {
      return products;
    }
    return products.filter(product => product.category === filterOptions.category);
  }, [products, filterOptions?.category]);

  // Sort products if specified
  const sortedProducts = React.useMemo(() => {
    if (!filterOptions?.sortBy) {
      return filteredProducts;
    }

    return [...filteredProducts].sort((a, b) => {
      switch (filterOptions.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });
  }, [filteredProducts, filterOptions?.sortBy]);

  // Group products by category for organized display
  const productsByCategory = React.useMemo(() => {
    const grouped = new Map<string, Product[]>();
    
    sortedProducts.forEach(product => {
      const categoryProducts = grouped.get(product.category) || [];
      categoryProducts.push(product);
      grouped.set(product.category, categoryProducts);
    });

    return grouped;
  }, [sortedProducts]);

  // Get category display name
  const getCategoryDisplayName = (categorySlug: string): string => {
    const category = categories.find(cat => cat.slug === categorySlug);
    return category?.name || categorySlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) {
    return (
      <div className={`${className}`} data-testid="product-grid-loading">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-card rounded-lg p-6 animate-pulse"
              data-testid={`product-skeleton-${index}`}
            >
              <div className="aspect-square bg-muted rounded-lg mb-4"></div>
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-3 bg-muted rounded mb-4 w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (sortedProducts.length === 0) {
    return (
      <div
        className={`flex flex-col items-center justify-center py-12 ${className}`}
        data-testid="product-grid-empty"
      >
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-muted mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          <h3 className="text-lg font-medium text-foreground mb-2">
            No products found
          </h3>
          <p className="text-muted max-w-md">
            {searchQuery 
              ? `No products match your search "${searchQuery}"`
              : filterOptions?.category
                ? `No products found in the ${getCategoryDisplayName(filterOptions.category)} category`
                : 'No products available at the moment'
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={className} data-testid={testId}>
      {/* Display products grouped by category */}
      {Array.from(productsByCategory.entries()).map(([categorySlug, categoryProducts]) => (
        <div key={categorySlug} className="mb-12 last:mb-0">
          {/* Category Header - only show if not filtering by specific category */}
          {!filterOptions?.category && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {getCategoryDisplayName(categorySlug)}
              </h2>
              <div className="w-16 h-1 bg-primary rounded-full"></div>
            </div>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="standard"
                showHoverEffect={true}
                data-testid={`product-card-${product.slug}`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}