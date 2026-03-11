/**
 * SearchBar Component
 * Real-time search input with debouncing and suggestions
 * Requirements: 20.1, 20.2, 20.3, 20.4, 20.5
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { SearchProps } from '@/types/components';
import { Product } from '@/types/product';

interface SearchBarProps extends Omit<SearchProps, 'onSearch'> {
  onSearch: (query: string) => void;
  products?: Product[];
  showSuggestions?: boolean;
  maxSuggestions?: number;
  className?: string;
  'data-testid'?: string;
}

export function SearchBar({
  placeholder = 'Search products...',
  onSearch,
  products = [],
  suggestions = [],
  showSuggestions = true,
  maxSuggestions = 5,
  className = '',
  'data-testid': testId = 'search-bar',
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Generate suggestions based on products
  const generateSuggestions = (searchQuery: string): string[] => {
    if (!searchQuery.trim() || !products.length) {
      return suggestions;
    }

    const lowercaseQuery = searchQuery.toLowerCase();
    const productSuggestions = new Set<string>();

    products.forEach((product) => {
      // Add product names that match
      if (product.name.toLowerCase().includes(lowercaseQuery)) {
        productSuggestions.add(product.name);
      }

      // Add category names that match
      const categoryName = product.category.replace('-', ' ');
      if (categoryName.toLowerCase().includes(lowercaseQuery)) {
        productSuggestions.add(categoryName);
      }

      // Add benefits that match
      product.benefits?.forEach((benefit) => {
        if (benefit.toLowerCase().includes(lowercaseQuery)) {
          productSuggestions.add(benefit);
        }
      });
    });

    return Array.from(productSuggestions).slice(0, maxSuggestions);
  };

  const currentSuggestions = generateSuggestions(query);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
    setIsOpen(showSuggestions && value.length > 0);
    setHighlightedIndex(-1);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || currentSuggestions.length === 0) {
      if (e.key === 'Escape') {
        setQuery('');
        onSearch('');
        setIsOpen(false);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < currentSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : currentSuggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleSuggestionClick(currentSuggestions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative w-full max-w-md ${className}`} data-testid={testId}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(showSuggestions && query.length > 0)}
          placeholder={placeholder}
          className="
            w-full pl-10 pr-10 py-3 
            bg-card border border-border rounded-lg
            text-foreground placeholder-muted
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            transition-all duration-200
            hover:border-primary/50
          "
          data-testid="search-input"
          aria-label="Search products"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-controls={isOpen ? 'search-suggestions' : undefined}
          role="combobox"
        />

        {/* Clear Button */}
        {query && (
          <button
            onClick={handleClear}
            className="
              absolute inset-y-0 right-0 pr-3 flex items-center
              text-muted hover:text-foreground
              transition-colors duration-200
            "
            data-testid="search-clear"
            aria-label="Clear search"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && currentSuggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          id="search-suggestions"
          className="
            absolute z-50 w-full mt-1
            bg-card border border-border rounded-lg shadow-lg
            backdrop-blur-sm
            max-h-60 overflow-y-auto
          "
          data-testid="search-suggestions"
          role="listbox"
        >
          {currentSuggestions.map((suggestion, index) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`
                w-full px-4 py-3 text-left
                hover:bg-accent transition-colors duration-150
                ${
                  index === highlightedIndex
                    ? 'bg-accent text-foreground'
                    : 'text-foreground'
                }
                ${index === 0 ? 'rounded-t-lg' : ''}
                ${index === currentSuggestions.length - 1 ? 'rounded-b-lg' : ''}
              `}
              data-testid={`search-suggestion-${index}`}
              role="option"
              aria-selected={index === highlightedIndex}
            >
              <div className="flex items-center">
                <svg
                  className="h-4 w-4 text-muted mr-3"
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
                <span className="truncate">{suggestion}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}