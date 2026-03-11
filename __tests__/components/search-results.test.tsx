/**
 * SearchResults Component Tests
 * Unit tests for the SearchResults component
 * Requirements: 20.5 - Show empty state message when no results
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { SearchResults } from '@/components/product/search-results';
import { Product } from '@/types/product';

// Mock product for testing
const mockProduct: Product = {
  id: '1',
  slug: 'moringa-powder',
  name: 'Moringa Powder',
  category: 'herbal-powders',
  description: 'Premium quality moringa powder',
  shortDescription: 'Organic moringa powder',
  specifications: { meshSize: '80-100', moisture: '5%', color: 'Green' },
  benefits: ['Rich in vitamins', 'Antioxidant properties'],
  packing: { options: ['10kg bags'], customAvailable: true },
  images: [],
  primaryImage: '/images/moringa.jpg',
  createdAt: new Date(),
  updatedAt: new Date(),
  published: true,
};

describe('SearchResults Component', () => {
  test('displays loading state', () => {
    render(
      <SearchResults
        query="test"
        results={[]}
        loading={true}
        error={null}
      >
        <div>Results content</div>
      </SearchResults>
    );

    expect(screen.getByTestId('search-loading')).toBeInTheDocument();
    expect(screen.getByText('Searching products...')).toBeInTheDocument();
  });

  test('displays error state', () => {
    const error = new Error('Search failed');
    
    render(
      <SearchResults
        query="test"
        results={[]}
        loading={false}
        error={error}
      >
        <div>Results content</div>
      </SearchResults>
    );

    expect(screen.getByTestId('search-error')).toBeInTheDocument();
    expect(screen.getByText('Search Error')).toBeInTheDocument();
    expect(screen.getByText('We encountered an error while searching. Please try again.')).toBeInTheDocument();
  });

  test('displays empty state when no results found', () => {
    render(
      <SearchResults
        query="nonexistent"
        results={[]}
        loading={false}
        error={null}
      >
        <div>Results content</div>
      </SearchResults>
    );

    expect(screen.getByTestId('search-empty')).toBeInTheDocument();
    expect(screen.getByText('No products found')).toBeInTheDocument();
    expect(screen.getByText('We couldn\'t find any products matching "nonexistent". Try searching with different keywords or browse our categories.')).toBeInTheDocument();
    
    // Check for search suggestions
    expect(screen.getByText('Try searching for:')).toBeInTheDocument();
    expect(screen.getByText('Moringa')).toBeInTheDocument();
    expect(screen.getByText('Ashwagandha')).toBeInTheDocument();
    expect(screen.getByText('Turmeric')).toBeInTheDocument();
  });

  test('displays results with count when products found', () => {
    render(
      <SearchResults
        query="moringa"
        results={[mockProduct]}
        loading={false}
        error={null}
      >
        <div data-testid="results-content">Results content</div>
      </SearchResults>
    );

    expect(screen.getByTestId('search-results')).toBeInTheDocument();
    expect(screen.getByText('Found 1 product for "moringa"')).toBeInTheDocument();
    expect(screen.getByTestId('results-content')).toBeInTheDocument();
  });

  test('displays plural count for multiple results', () => {
    render(
      <SearchResults
        query="powder"
        results={[mockProduct, mockProduct]}
        loading={false}
        error={null}
      >
        <div data-testid="results-content">Results content</div>
      </SearchResults>
    );

    expect(screen.getByText('Found 2 products for "powder"')).toBeInTheDocument();
  });

  test('displays results without count when no query', () => {
    render(
      <SearchResults
        query=""
        results={[mockProduct]}
        loading={false}
        error={null}
      >
        <div data-testid="results-content">Results content</div>
      </SearchResults>
    );

    expect(screen.queryByText(/Found \d+ product/)).not.toBeInTheDocument();
    expect(screen.getByTestId('results-content')).toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(
      <SearchResults
        query="test"
        results={[mockProduct]}
        loading={false}
        error={null}
        className="custom-class"
      >
        <div>Results content</div>
      </SearchResults>
    );

    const container = screen.getByTestId('search-results');
    expect(container).toHaveClass('custom-class');
  });

  test('applies custom data-testid', () => {
    render(
      <SearchResults
        query="test"
        results={[mockProduct]}
        loading={false}
        error={null}
        data-testid="custom-search-results"
      >
        <div>Results content</div>
      </SearchResults>
    );

    expect(screen.getByTestId('custom-search-results')).toBeInTheDocument();
  });
});