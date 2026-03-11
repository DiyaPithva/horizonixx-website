/**
 * SearchResults Component
 * Displays search results with empty state handling
 * Requirements: 20.5 - Show empty state message when no results
 */

'use client';

import React from 'react';
import { Product } from '@/types/product';

interface SearchResultsProps {
  query: string;
  results: Product[];
  loading: boolean;
  error: Error | null;
  children: React.ReactNode;
  className?: string;
  'data-testid'?: string;
}

export function SearchResults({
  query,
  results,
  loading,
  error,
  children,
  className = '',
  'data-testid': testId = 'search-results',
}: SearchResultsProps) {
  // Show loading state
  if (loading) {
    return (
      <div
        className={`flex items-center justify-center py-12 ${className}`}
        data-testid="search-loading"
      >
        <div className="flex items-center space-x-2 text-muted">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span>Searching products...</span>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div
        className={`flex flex-col items-center justify-center py-12 ${className}`}
        data-testid="search-error"
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <h3 className="text-lg font-medium text-foreground mb-2">
            Search Error
          </h3>
          <p className="text-muted max-w-md">
            We encountered an error while searching. Please try again.
          </p>
        </div>
      </div>
    );
  }

  // Show empty state when no results found
  if (query && results.length === 0) {
    return (
      <div
        className={`flex flex-col items-center justify-center py-12 ${className}`}
        data-testid="search-empty"
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <h3 className="text-lg font-medium text-foreground mb-2">
            No products found
          </h3>
          <p className="text-muted max-w-md mb-4">
            We couldn&apos;t find any products matching &quot;{query}&quot;. Try searching with different keywords or browse our categories.
          </p>
          <div className="space-y-2 text-sm text-muted">
            <p>Try searching for:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Moringa', 'Ashwagandha', 'Turmeric', 'Herbal Products', 'Spices'].map((suggestion) => (
                <span
                  key={suggestion}
                  className="px-3 py-1 bg-accent rounded-full text-foreground"
                >
                  {suggestion}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show results
  return (
    <div className={className} data-testid={testId}>
      {query && (
        <div className="mb-6">
          <p className="text-muted">
            {results.length === 1 
              ? `Found 1 product for "${query}"`
              : `Found ${results.length} products for "${query}"`
            }
          </p>
        </div>
      )}
      {children}
    </div>
  );
}