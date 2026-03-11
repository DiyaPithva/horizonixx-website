/**
 * SearchBar Component Tests
 * Unit tests for the SearchBar component
 * Requirements: 20.1, 20.2, 20.3, 20.4, 20.5
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '@/components/product/search-bar';
import { Product } from '@/types/product';

// Mock products for testing
const mockProducts: Product[] = [
  {
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
  },
  {
    id: '2',
    slug: 'turmeric-powder',
    name: 'Turmeric Powder',
    category: 'spices',
    description: 'High-quality turmeric powder',
    shortDescription: 'Pure turmeric powder',
    specifications: { meshSize: '60-80', moisture: '8%', color: 'Yellow' },
    benefits: ['Anti-inflammatory', 'Natural healing'],
    packing: { options: ['25kg bags'], customAvailable: false },
    images: [],
    primaryImage: '/images/turmeric.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
    published: true,
  },
];

describe('SearchBar Component', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  test('renders search input with placeholder', () => {
    render(
      <SearchBar
        placeholder="Search products..."
        onSearch={mockOnSearch}
        products={mockProducts}
      />
    );

    const input = screen.getByPlaceholderText('Search products...');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-label', 'Search products');
  });

  test('calls onSearch when user types', async () => {
    const user = userEvent.setup();
    
    render(
      <SearchBar
        placeholder="Search products..."
        onSearch={mockOnSearch}
        products={mockProducts}
      />
    );

    const input = screen.getByPlaceholderText('Search products...');
    await user.type(input, 'moringa');

    expect(mockOnSearch).toHaveBeenCalledWith('moringa');
  });

  test('displays suggestions when typing', async () => {
    const user = userEvent.setup();
    
    render(
      <SearchBar
        placeholder="Search products..."
        onSearch={mockOnSearch}
        products={mockProducts}
        showSuggestions={true}
      />
    );

    const input = screen.getByPlaceholderText('Search products...');
    await user.type(input, 'mor');

    await waitFor(() => {
      expect(screen.getByTestId('search-suggestions')).toBeInTheDocument();
    });
  });

  test('selects suggestion when clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <SearchBar
        placeholder="Search products..."
        onSearch={mockOnSearch}
        products={mockProducts}
        showSuggestions={true}
      />
    );

    const input = screen.getByPlaceholderText('Search products...');
    await user.type(input, 'mor');

    await waitFor(() => {
      const suggestion = screen.getByText('Moringa Powder');
      expect(suggestion).toBeInTheDocument();
    });

    const suggestion = screen.getByText('Moringa Powder');
    await user.click(suggestion);

    expect(mockOnSearch).toHaveBeenCalledWith('Moringa Powder');
    expect(input).toHaveValue('Moringa Powder');
  });

  test('navigates suggestions with keyboard', async () => {
    const user = userEvent.setup();
    
    render(
      <SearchBar
        placeholder="Search products..."
        onSearch={mockOnSearch}
        products={mockProducts}
        showSuggestions={true}
      />
    );

    const input = screen.getByPlaceholderText('Search products...');
    await user.type(input, 'powder');

    await waitFor(() => {
      expect(screen.getByTestId('search-suggestions')).toBeInTheDocument();
    });

    // Navigate down
    await user.keyboard('{ArrowDown}');
    
    // Press Enter to select
    await user.keyboard('{Enter}');

    expect(mockOnSearch).toHaveBeenCalled();
  });

  test('clears search when clear button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <SearchBar
        placeholder="Search products..."
        onSearch={mockOnSearch}
        products={mockProducts}
      />
    );

    const input = screen.getByPlaceholderText('Search products...');
    await user.type(input, 'test');

    const clearButton = screen.getByTestId('search-clear');
    await user.click(clearButton);

    expect(input).toHaveValue('');
    expect(mockOnSearch).toHaveBeenCalledWith('');
  });

  test('closes suggestions when clicking outside', async () => {
    const user = userEvent.setup();
    
    render(
      <div>
        <SearchBar
          placeholder="Search products..."
          onSearch={mockOnSearch}
          products={mockProducts}
          showSuggestions={true}
        />
        <div data-testid="outside">Outside element</div>
      </div>
    );

    const input = screen.getByPlaceholderText('Search products...');
    await user.type(input, 'mor');

    await waitFor(() => {
      expect(screen.getByTestId('search-suggestions')).toBeInTheDocument();
    });

    const outsideElement = screen.getByTestId('outside');
    await user.click(outsideElement);

    await waitFor(() => {
      expect(screen.queryByTestId('search-suggestions')).not.toBeInTheDocument();
    });
  });

  test('handles escape key to clear search', async () => {
    const user = userEvent.setup();
    
    render(
      <SearchBar
        placeholder="Search products..."
        onSearch={mockOnSearch}
        products={mockProducts}
      />
    );

    const input = screen.getByPlaceholderText('Search products...');
    await user.type(input, 'test');
    await user.keyboard('{Escape}');

    expect(input).toHaveValue('');
    expect(mockOnSearch).toHaveBeenCalledWith('');
  });

  test('has proper accessibility attributes', () => {
    render(
      <SearchBar
        placeholder="Search products..."
        onSearch={mockOnSearch}
        products={mockProducts}
      />
    );

    const input = screen.getByRole('combobox');
    expect(input).toHaveAttribute('aria-label', 'Search products');
    expect(input).toHaveAttribute('aria-expanded', 'false');
    expect(input).toHaveAttribute('aria-haspopup', 'listbox');
    expect(input).toHaveAttribute('aria-autocomplete', 'list');
  });
});