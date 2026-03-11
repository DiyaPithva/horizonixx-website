/**
 * Products Page Client Component
 * Handles client-side search and filtering functionality
 * Requirements: 11.1, 11.2, 20.1, 20.2, 20.3, 20.4, 20.5
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Product, Category } from '@/types/product';
import { SearchBar, SearchResults, ProductGrid } from '@/components/product';
import { useSearch } from '@/hooks/use-search';
import { CMSClient } from '@/lib/cms';

interface ProductsPageClientProps {
  initialProducts: Product[];
  categories: Category[];
  initialCategory?: string;
  initialSearch?: string;
}

export function ProductsPageClient({
  initialProducts,
  categories,
  initialCategory,
  initialSearch,
}: ProductsPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(initialCategory);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Use the search hook for real-time filtering
  const {
    query: searchQuery,
    setQuery: setSearchQuery,
    results: searchResults,
    loading: searchLoading,
    error: searchError,
  } = useSearch({ 
    products: products,
    debounceDelay: 300 
  });

  // Initialize search query from URL params
  useEffect(() => {
    if (initialSearch && initialSearch !== searchQuery) {
      setSearchQuery(initialSearch);
    }
  }, [initialSearch, searchQuery, setSearchQuery]);

  // Handle category filtering
  const handleCategoryChange = async (category: string | undefined) => {
    setSelectedCategory(category);
    setLoading(true);
    setError(null);

    try {
      // Update URL without page reload
      const params = new URLSearchParams(searchParams.toString());
      if (category) {
        params.set('category', category);
      } else {
        params.delete('category');
      }
      
      // Preserve search query in URL
      if (searchQuery) {
        params.set('search', searchQuery);
      } else {
        params.delete('search');
      }

      router.push(`/products?${params.toString()}`, { scroll: false });

      // Fetch filtered products
      const filteredProducts = await CMSClient.getProducts({
        category,
        search: searchQuery || undefined,
      });
      
      setProducts(filteredProducts);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to filter products'));
    } finally {
      setLoading(false);
    }
  };

  // Handle search query changes
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    
    // Update URL with search query
    const params = new URLSearchParams(searchParams.toString());
    if (query.trim()) {
      params.set('search', query);
    } else {
      params.delete('search');
    }
    
    // Preserve category filter in URL
    if (selectedCategory) {
      params.set('category', selectedCategory);
    }

    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedCategory(undefined);
    setSearchQuery('');
    router.push('/products', { scroll: false });
    
    // Reset to all products
    setProducts(initialProducts);
  };

  // Get category display name
  const getCategoryDisplayName = (categorySlug: string): string => {
    const category = categories.find(cat => cat.slug === categorySlug);
    return category?.name || categorySlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const hasActiveFilters = selectedCategory || searchQuery.trim();
  const displayProducts = searchQuery.trim() ? searchResults : products;
  const isLoading = loading || searchLoading;
  const displayError = error || searchError;

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="flex justify-center">
          <SearchBar
            placeholder="Search products by name, category, or benefits..."
            onSearch={handleSearchChange}
            products={products}
            showSuggestions={true}
            maxSuggestions={5}
            className="w-full max-w-2xl"
            data-testid="products-search-bar"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => handleCategoryChange(undefined)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${!selectedCategory
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-card text-foreground border border-border hover:bg-accent'
              }
            `}
            data-testid="category-filter-all"
          >
            All Products ({initialProducts.length})
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.slug)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${selectedCategory === category.slug
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-card text-foreground border border-border hover:bg-accent'
                }
              `}
              data-testid={`category-filter-${category.slug}`}
            >
              {category.name} ({category.productCount})
            </button>
          ))}
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 justify-center">
            <span className="text-sm text-muted">Active filters:</span>
            
            {selectedCategory && (
              <span className="
                inline-flex items-center gap-1 px-3 py-1 
                bg-primary/10 text-primary rounded-full text-sm
              ">
                Category: {getCategoryDisplayName(selectedCategory)}
                <button
                  onClick={() => handleCategoryChange(undefined)}
                  className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                  aria-label="Remove category filter"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </span>
            )}
            
            {searchQuery.trim() && (
              <span className="
                inline-flex items-center gap-1 px-3 py-1 
                bg-secondary/10 text-secondary rounded-full text-sm
              ">
                Search: &quot;{searchQuery}&quot;
                <button
                  onClick={() => handleSearchChange('')}
                  className="ml-1 hover:bg-secondary/20 rounded-full p-0.5"
                  aria-label="Clear search"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </span>
            )}
            
            <button
              onClick={handleClearFilters}
              className="
                px-3 py-1 text-sm text-muted hover:text-foreground
                border border-border rounded-full hover:bg-accent
                transition-colors duration-200
              "
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      <SearchResults
        query={searchQuery}
        results={displayProducts}
        loading={isLoading}
        error={displayError}
        data-testid="products-search-results"
      >
        <ProductGrid
          products={displayProducts}
          categories={categories}
          searchQuery={searchQuery}
          filterOptions={{
            category: selectedCategory,
            sortBy: 'name',
          }}
          loading={isLoading}
          data-testid="products-grid"
        />
      </SearchResults>
    </div>
  );
}