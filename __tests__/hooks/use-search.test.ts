/**
 * useSearch Hook Tests
 * Unit tests for the useSearch custom hook
 * Requirements: 20.1, 20.2, 20.3, 20.4, 20.5
 */

import { renderHook, act } from '@testing-library/react';
import { useSearch } from '@/hooks/use-search';
import { Product } from '@/types/product';

// Mock the useDebounce hook
jest.mock('@/hooks/use-debounce', () => ({
  useDebounce: jest.fn((value) => ({ debouncedValue: value, isDebouncing: false })),
}));

// Mock products for testing
const mockProducts: Product[] = [
  {
    id: '1',
    slug: 'moringa-powder',
    name: 'Moringa Powder',
    category: 'herbal-powders',
    description: 'Premium quality moringa powder rich in nutrients',
    shortDescription: 'Organic moringa powder',
    specifications: { meshSize: '80-100', moisture: '5%', color: 'Green' },
    benefits: ['Rich in vitamins', 'Antioxidant properties', 'Boosts immunity'],
    packing: { options: ['10kg bags'], customAvailable: true },
    images: [],
    primaryImage: '/images/moringa.jpg',
    keywords: ['superfood', 'organic'],
    createdAt: new Date(),
    updatedAt: new Date(),
    published: true,
  },
  {
    id: '2',
    slug: 'turmeric-powder',
    name: 'Turmeric Powder',
    category: 'spices',
    description: 'High-quality turmeric powder with curcumin',
    shortDescription: 'Pure turmeric powder',
    specifications: { meshSize: '60-80', moisture: '8%', color: 'Yellow' },
    benefits: ['Anti-inflammatory', 'Natural healing', 'Digestive health'],
    packing: { options: ['25kg bags'], customAvailable: false },
    images: [],
    primaryImage: '/images/turmeric.jpg',
    keywords: ['spice', 'curcumin'],
    createdAt: new Date(),
    updatedAt: new Date(),
    published: true,
  },
  {
    id: '3',
    slug: 'ashwagandha-powder',
    name: 'Ashwagandha Powder',
    category: 'herbal-powders',
    subcategory: 'adaptogenic',
    description: 'Premium ashwagandha root powder for stress relief',
    shortDescription: 'Adaptogenic ashwagandha powder',
    specifications: { meshSize: '80-120', moisture: '6%', color: 'Beige' },
    benefits: ['Stress relief', 'Energy boost', 'Mental clarity'],
    packing: { options: ['5kg bags', '10kg bags'], customAvailable: true },
    images: [],
    primaryImage: '/images/ashwagandha.jpg',
    keywords: ['adaptogen', 'stress'],
    createdAt: new Date(),
    updatedAt: new Date(),
    published: true,
  },
];

describe('useSearch Hook', () => {
  test('initializes with all products when no query', () => {
    const { result } = renderHook(() =>
      useSearch({ products: mockProducts })
    );

    expect(result.current.query).toBe('');
    expect(result.current.results).toEqual(mockProducts);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('filters products by name', () => {
    const { result } = renderHook(() =>
      useSearch({ products: mockProducts })
    );

    act(() => {
      result.current.setQuery('Moringa');
    });

    expect(result.current.query).toBe('Moringa');
    expect(result.current.results).toHaveLength(1);
    expect(result.current.results[0].name).toBe('Moringa Powder');
  });

  test('filters products by description', () => {
    const { result } = renderHook(() =>
      useSearch({ products: mockProducts })
    );

    act(() => {
      result.current.setQuery('curcumin');
    });

    expect(result.current.results).toHaveLength(1);
    expect(result.current.results[0].name).toBe('Turmeric Powder');
  });

  test('filters products by category', () => {
    const { result } = renderHook(() =>
      useSearch({ products: mockProducts })
    );

    act(() => {
      result.current.setQuery('herbal products');
    });

    expect(result.current.results).toHaveLength(2);
    expect(result.current.results.every(p => p.category === 'herbal-powders')).toBe(true);
  });

  test('filters products by benefits', () => {
    const { result } = renderHook(() =>
      useSearch({ products: mockProducts })
    );

    act(() => {
      result.current.setQuery('stress relief');
    });

    expect(result.current.results).toHaveLength(1);
    expect(result.current.results[0].name).toBe('Ashwagandha Powder');
  });

  test('filters products by keywords', () => {
    const { result } = renderHook(() =>
      useSearch({ products: mockProducts })
    );

    act(() => {
      result.current.setQuery('adaptogen');
    });

    expect(result.current.results).toHaveLength(1);
    expect(result.current.results[0].name).toBe('Ashwagandha Powder');
  });

  test('filters products by subcategory', () => {
    const { result } = renderHook(() =>
      useSearch({ products: mockProducts })
    );

    act(() => {
      result.current.setQuery('adaptogenic');
    });

    expect(result.current.results).toHaveLength(1);
    expect(result.current.results[0].name).toBe('Ashwagandha Powder');
  });

  test('search is case insensitive', () => {
    const { result } = renderHook(() =>
      useSearch({ products: mockProducts })
    );

    act(() => {
      result.current.setQuery('MORINGA');
    });

    expect(result.current.results).toHaveLength(1);
    expect(result.current.results[0].name).toBe('Moringa Powder');
  });

  test('returns multiple matching products', () => {
    const { result } = renderHook(() =>
      useSearch({ products: mockProducts })
    );

    act(() => {
      result.current.setQuery('powder');
    });

    expect(result.current.results).toHaveLength(3);
    expect(result.current.results.every(p => p.name.includes('Powder'))).toBe(true);
  });

  test('returns empty array for no matches', () => {
    const { result } = renderHook(() =>
      useSearch({ products: mockProducts })
    );

    act(() => {
      result.current.setQuery('nonexistent');
    });

    expect(result.current.results).toHaveLength(0);
  });

  test('handles empty query by returning all products', () => {
    const { result } = renderHook(() =>
      useSearch({ products: mockProducts })
    );

    // Set a query first
    act(() => {
      result.current.setQuery('moringa');
    });

    expect(result.current.results).toHaveLength(1);

    // Clear the query
    act(() => {
      result.current.setQuery('');
    });

    expect(result.current.results).toEqual(mockProducts);
  });

  test('handles whitespace-only query', () => {
    const { result } = renderHook(() =>
      useSearch({ products: mockProducts })
    );

    act(() => {
      result.current.setQuery('   ');
    });

    expect(result.current.results).toEqual(mockProducts);
  });

  test('updates results when products change', () => {
    const { result, rerender } = renderHook(
      ({ products }) => useSearch({ products }),
      {
        initialProps: { products: mockProducts },
      }
    );

    act(() => {
      result.current.setQuery('moringa');
    });

    expect(result.current.results).toHaveLength(1);

    // Update products to exclude moringa
    const newProducts = mockProducts.filter(p => p.name !== 'Moringa Powder');
    rerender({ products: newProducts });

    expect(result.current.results).toHaveLength(0);
  });

  test('handles products with missing optional fields', () => {
    const productsWithMissingFields: Product[] = [
      {
        id: '1',
        slug: 'basic-product',
        name: 'Basic Product',
        category: 'herbal-powders',
        description: 'Basic description',
        shortDescription: 'Basic',
        specifications: {},
        benefits: [],
        packing: { options: [], customAvailable: false },
        images: [],
        primaryImage: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        // Missing optional fields: subcategory, keywords, benefits
      },
    ];

    const { result } = renderHook(() =>
      useSearch({ products: productsWithMissingFields })
    );

    act(() => {
      result.current.setQuery('basic');
    });

    expect(result.current.results).toHaveLength(1);
    expect(result.current.results[0].name).toBe('Basic Product');
  });

  test('partial word matching works', () => {
    const { result } = renderHook(() =>
      useSearch({ products: mockProducts })
    );

    act(() => {
      result.current.setQuery('turmeric');
    });

    expect(result.current.results).toHaveLength(1);
    expect(result.current.results[0].name).toBe('Turmeric Powder');
  });
});