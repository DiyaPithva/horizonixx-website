/**
 * useSearch Hook
 * Manages search state and provides search functionality
 * Requirements: 20.1, 20.2, 20.3, 20.4, 20.5
 */

import { useState, useEffect, useCallback } from 'react';
import { UseSearchReturn } from '@/types/hooks';
import { Product } from '@/types/product';
import { useDebounce } from './use-debounce';

interface UseSearchOptions {
  products: Product[];
  debounceDelay?: number;
}

export function useSearch({ products, debounceDelay = 300 }: UseSearchOptions): UseSearchReturn {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>(products);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { debouncedValue: debouncedQuery } = useDebounce(query, debounceDelay);

  const filterProducts = useCallback((searchQuery: string, productList: Product[]): Product[] => {
    if (!searchQuery.trim()) {
      return productList;
    }

    const lowercaseQuery = searchQuery.toLowerCase();
    
    return productList.filter((product) => {
      // Search across product name, description, and category
      const searchableText = [
        product.name,
        product.description,
        product.shortDescription,
        product.category.replace('-', ' '),
        product.subcategory || '',
        ...(product.benefits || []),
        ...(product.keywords || []),
      ].join(' ').toLowerCase();

      return searchableText.includes(lowercaseQuery);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      const filteredResults = filterProducts(debouncedQuery, products);
      setResults(filteredResults);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Search failed'));
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery, products, filterProducts]);

  return {
    query,
    setQuery,
    results,
    loading,
    error,
  };
}