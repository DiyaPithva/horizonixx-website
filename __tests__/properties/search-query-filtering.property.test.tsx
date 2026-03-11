/**
 * Property-Based Test: Search Query Filtering
 * **Property 34: Search Query Filtering**
 * **Validates: Requirements 20.2, 20.3**
 * 
 * Tests that for any search query entered, the displayed products should only include 
 * those whose name, description, or category contains the query string (case-insensitive).
 */

import fc from 'fast-check';
import { useSearch } from '@/hooks/use-search';
import { Product, ProductCategory } from '@/types/product';
import { renderHook, act } from '@testing-library/react';

// Mock the useDebounce hook to avoid timing issues in tests
jest.mock('@/hooks/use-debounce', () => ({
  useDebounce: jest.fn((value) => ({ debouncedValue: value, isDebouncing: false })),
}));

describe('Property-Based Test: Search Query Filtering', () => {
  // Generator for product categories
  const productCategoryArbitrary = fc.constantFrom(
    'herbal-powders',
    'cosmetic-powders', 
    'spices',
    'dehydrated-powders',
    'healthcare-equipment'
  ) as fc.Arbitrary<ProductCategory>;

  // Generator for product specifications
  const productSpecificationArbitrary = fc.record({
    meshSize: fc.option(fc.string({ minLength: 1, maxLength: 20 })),
    moisture: fc.option(fc.string({ minLength: 1, maxLength: 10 })),
    color: fc.option(fc.string({ minLength: 1, maxLength: 15 })),
  });

  // Generator for packing info
  const packingInfoArbitrary = fc.record({
    options: fc.array(fc.string({ minLength: 1, maxLength: 30 }), { minLength: 1, maxLength: 5 }),
    customAvailable: fc.boolean(),
  });

  // Generator for product images
  const productImageArbitrary = fc.record({
    url: fc.webUrl(),
    alt: fc.string({ minLength: 1, maxLength: 100 }),
    width: fc.integer({ min: 100, max: 2000 }),
    height: fc.integer({ min: 100, max: 2000 }),
    isPrimary: fc.boolean(),
  });

  // Generator for products
  const productArbitrary = fc.record({
    id: fc.uuid(),
    slug: fc.string({ minLength: 1, maxLength: 50 }).map(s => s.toLowerCase().replace(/[^a-z0-9]/g, '-')),
    name: fc.string({ minLength: 1, maxLength: 100 }),
    category: productCategoryArbitrary,
    subcategory: fc.option(fc.string({ minLength: 1, maxLength: 50 })),
    description: fc.string({ minLength: 10, maxLength: 500 }),
    shortDescription: fc.string({ minLength: 5, maxLength: 150 }),
    specifications: productSpecificationArbitrary,
    benefits: fc.array(fc.string({ minLength: 1, maxLength: 100 }), { minLength: 0, maxLength: 10 }),
    features: fc.option(fc.array(fc.string({ minLength: 1, maxLength: 100 }), { minLength: 0, maxLength: 5 })),
    packing: packingInfoArbitrary,
    images: fc.array(productImageArbitrary, { minLength: 0, maxLength: 5 }),
    primaryImage: fc.webUrl(),
    keywords: fc.option(fc.array(fc.string({ minLength: 1, maxLength: 30 }), { minLength: 0, maxLength: 10 })),
    createdAt: fc.date(),
    updatedAt: fc.date(),
    published: fc.boolean(),
  }) as fc.Arbitrary<Product>;

  // Generator for search queries - includes various types of search terms
  const searchQueryArbitrary = fc.oneof(
    // Empty/whitespace queries
    fc.constant(''),
    fc.constant('   '),
    fc.constant('\t\n'),
    
    // Single words
    fc.string({ minLength: 1, maxLength: 20 }),
    
    // Multi-word phrases
    fc.array(fc.string({ minLength: 1, maxLength: 15 }), { minLength: 2, maxLength: 5 })
      .map(words => words.join(' ')),
    
    // Mixed case queries
    fc.string({ minLength: 1, maxLength: 30 }).map(s => 
      s.split('').map((char, i) => i % 2 === 0 ? char.toUpperCase() : char.toLowerCase()).join('')
    ),
    
    // Queries with special characters
    fc.string({ minLength: 1, maxLength: 20 }).map(s => s + '!@#$%'),
    
    // Partial words
    fc.string({ minLength: 2, maxLength: 10 }).map(s => s.substring(0, Math.max(1, s.length - 1))),
  );

  test('Property 34: Search Query Filtering - All results contain query string (case-insensitive)', () => {
    fc.assert(
      fc.property(
        fc.array(productArbitrary, { minLength: 1, maxLength: 20 }),
        searchQueryArbitrary,
        (products, query) => {
          // Render the hook with the generated products
          const { result } = renderHook(() => useSearch({ products }));

          // Perform the search
          act(() => {
            result.current.setQuery(query);
          });

          const searchResults = result.current.results;
          const trimmedQuery = query.trim().toLowerCase();

          // If query is empty or whitespace, should return all products
          if (!trimmedQuery) {
            expect(searchResults).toEqual(products);
            return;
          }

          // Every result should contain the query string in searchable fields
          searchResults.forEach(product => {
            const searchableText = [
              product.name,
              product.description,
              product.shortDescription,
              product.category.replace('-', ' '),
              product.subcategory || '',
              ...(product.benefits || []),
              ...(product.keywords || []),
            ].join(' ').toLowerCase();

            expect(searchableText).toContain(trimmedQuery);
          });

          // All products NOT in results should NOT contain the query string
          const resultIds = new Set(searchResults.map(p => p.id));
          const excludedProducts = products.filter(p => !resultIds.has(p.id));
          
          excludedProducts.forEach(product => {
            const searchableText = [
              product.name,
              product.description,
              product.shortDescription,
              product.category.replace('-', ' '),
              product.subcategory || '',
              ...(product.benefits || []),
              ...(product.keywords || []),
            ].join(' ').toLowerCase();

            expect(searchableText).not.toContain(trimmedQuery);
          });
        }
      ),
      { numRuns: 5 }
    );
  });

  test('Property 34: Search Query Filtering - Case insensitive matching', () => {
    fc.assert(
      fc.property(
        fc.array(productArbitrary, { minLength: 1, maxLength: 10 }),
        fc.string({ minLength: 1, maxLength: 20 }),
        (products, baseQuery) => {
          const { result } = renderHook(() => useSearch({ products }));

          // Test with lowercase query
          act(() => {
            result.current.setQuery(baseQuery.toLowerCase());
          });
          const lowercaseResults = result.current.results;

          // Test with uppercase query
          act(() => {
            result.current.setQuery(baseQuery.toUpperCase());
          });
          const uppercaseResults = result.current.results;

          // Test with mixed case query
          const mixedCase = baseQuery.split('').map((char, i) => 
            i % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
          ).join('');
          
          act(() => {
            result.current.setQuery(mixedCase);
          });
          const mixedCaseResults = result.current.results;

          // All three should return the same results (case insensitive)
          expect(lowercaseResults.map(p => p.id).sort()).toEqual(
            uppercaseResults.map(p => p.id).sort()
          );
          expect(lowercaseResults.map(p => p.id).sort()).toEqual(
            mixedCaseResults.map(p => p.id).sort()
          );
        }
      ),
      { numRuns: 5 }
    );
  });

  test('Property 34: Search Query Filtering - Searches across name, description, and category', () => {
    fc.assert(
      fc.property(
        productArbitrary,
        (product) => {
          const products = [product];
          const { result } = renderHook(() => useSearch({ products }));

          // Test searching by name
          const nameWord = product.name.split(' ')[0];
          if (nameWord && nameWord.length > 1) {
            act(() => {
              result.current.setQuery(nameWord);
            });
            expect(result.current.results).toContain(product);
          }

          // Test searching by description
          const descWords = product.description.split(' ');
          const descWord = descWords.find(word => word.length > 2);
          if (descWord) {
            act(() => {
              result.current.setQuery(descWord);
            });
            expect(result.current.results).toContain(product);
          }

          // Test searching by category (with space replacement)
          const categoryName = product.category.replace('-', ' ');
          const categoryWord = categoryName.split(' ')[0];
          if (categoryWord && categoryWord.length > 1) {
            act(() => {
              result.current.setQuery(categoryWord);
            });
            expect(result.current.results).toContain(product);
          }

          // Test searching by benefits
          if (product.benefits && product.benefits.length > 0) {
            const benefit = product.benefits[0];
            const benefitWord = benefit.split(' ')[0];
            if (benefitWord && benefitWord.length > 1) {
              act(() => {
                result.current.setQuery(benefitWord);
              });
              expect(result.current.results).toContain(product);
            }
          }
        }
      ),
      { numRuns: 5 }
    );
  });

  test('Property 34: Search Query Filtering - Empty query returns all products', () => {
    fc.assert(
      fc.property(
        fc.array(productArbitrary, { minLength: 1, maxLength: 15 }),
        (products) => {
          const { result } = renderHook(() => useSearch({ products }));

          // Test various empty/whitespace queries
          const emptyQueries = ['', '   ', '\t', '\n', '  \t\n  '];
          
          emptyQueries.forEach(emptyQuery => {
            act(() => {
              result.current.setQuery(emptyQuery);
            });
            
            expect(result.current.results).toEqual(products);
          });
        }
      ),
      { numRuns: 30 }
    );
  });

  test('Property 34: Search Query Filtering - No false positives', () => {
    fc.assert(
      fc.property(
        fc.array(productArbitrary, { minLength: 1, maxLength: 10 }),
        fc.string({ minLength: 1, maxLength: 20 }).filter(s => 
          // Generate a query that's unlikely to match any product
          s.includes('xyzzyx') || s.includes('qwerty123') || s.includes('nonexistent')
        ),
        (products, unlikelyQuery) => {
          const { result } = renderHook(() => useSearch({ products }));

          act(() => {
            result.current.setQuery(unlikelyQuery);
          });

          const searchResults = result.current.results;
          const trimmedQuery = unlikelyQuery.trim().toLowerCase();

          // Every result must actually contain the query
          searchResults.forEach(product => {
            const searchableText = [
              product.name,
              product.description,
              product.shortDescription,
              product.category.replace('-', ' '),
              product.subcategory || '',
              ...(product.benefits || []),
              ...(product.keywords || []),
            ].join(' ').toLowerCase();

            expect(searchableText).toContain(trimmedQuery);
          });
        }
      ),
      { numRuns: 30 }
    );
  });

  test('Property 34: Search Query Filtering - Partial word matching', () => {
    fc.assert(
      fc.property(
        productArbitrary,
        (product) => {
          const products = [product];
          const { result } = renderHook(() => useSearch({ products }));

          // Test partial matching on product name
          if (product.name.length > 3) {
            const partialName = product.name.substring(0, product.name.length - 1);
            
            act(() => {
              result.current.setQuery(partialName);
            });
            
            expect(result.current.results).toContain(product);
          }

          // Test partial matching on description
          const descWords = product.description.split(' ');
          const longWord = descWords.find(word => word.length > 4);
          if (longWord) {
            const partialWord = longWord.substring(0, longWord.length - 1);
            
            act(() => {
              result.current.setQuery(partialWord);
            });
            
            expect(result.current.results).toContain(product);
          }
        }
      ),
      { numRuns: 5 }
    );
  });
});
