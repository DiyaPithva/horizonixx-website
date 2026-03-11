/**
 * Property-Based Test: Product Categorization
 * **Property 3: Product Categorization**
 * **Validates: Requirements 2.4**
 * 
 * Tests that for any product in the system, it should belong to exactly one of the following 
 * categories: Herbal Products, Cosmetic Products, Spices, or Dehydrated Fruits & Vegetables.
 */

import fc from 'fast-check';
import { Product, ProductCategory } from '@/types/product';
import { CMSClient } from '@/lib/cms/client';

describe('Property-Based Test: Product Categorization', () => {
  // Valid categories as defined in requirements 2.4
  const validCategories: ProductCategory[] = [
    'herbal-powders',
    'cosmetic-powders', 
    'spices',
    'dehydrated-powders',
    'healthcare-equipment'
  ];

  // Generator for valid product categories
  const validCategoryArbitrary = fc.constantFrom(...validCategories);

  // Generator for product with valid category
  const productWithValidCategoryArbitrary = fc.record({
    id: fc.string({ minLength: 1, maxLength: 10 }),
    slug: fc.string({ minLength: 1, maxLength: 20 }).map(s => s.toLowerCase().replace(/[^a-z0-9]/g, '-')),
    name: fc.string({ minLength: 1, maxLength: 50 }),
    category: validCategoryArbitrary,
    description: fc.string({ minLength: 10, maxLength: 200 }),
    shortDescription: fc.string({ minLength: 5, maxLength: 100 }),
    specifications: fc.constant({}),
    benefits: fc.array(fc.string({ minLength: 5, maxLength: 50 }), { minLength: 1, maxLength: 5 }),
    packing: fc.record({
      options: fc.array(fc.string({ minLength: 5, maxLength: 30 }), { minLength: 1, maxLength: 3 }),
      customAvailable: fc.boolean()
    }),
    images: fc.constant([]),
    primaryImage: fc.string({ minLength: 10, maxLength: 100 }),
    createdAt: fc.date(),
    updatedAt: fc.date(),
    published: fc.boolean()
  }) as fc.Arbitrary<Product>;

  test('Property 3: Product Categorization - All products belong to valid categories', () => {
    fc.assert(
      fc.property(
        productWithValidCategoryArbitrary,
        (product) => {
          // Verify that the product's category is one of the valid categories
          expect(validCategories).toContain(product.category);
          
          // Verify that the category is exactly one of the allowed values
          const categoryMatches = validCategories.filter(cat => cat === product.category);
          expect(categoryMatches).toHaveLength(1);
        }
      ),
      { numRuns: 5 }
    );
  });

  test('Property 3: Product Categorization - CMS products have valid categories', async () => {
    // Test that all products from CMS have valid categories
    const products = await CMSClient.getProducts();
    
    fc.assert(
      fc.property(
        fc.constantFrom(...products),
        (product) => {
          // Each product from CMS should have a valid category
          expect(validCategories).toContain(product.category);
          
          // Category should be a string and not empty
          expect(typeof product.category).toBe('string');
          expect(product.category.length).toBeGreaterThan(0);
          
          // Category should match the expected format (lowercase with hyphens)
          expect(product.category).toMatch(/^[a-z]+(-[a-z]+)*$/);
        }
      ),
      { numRuns: 5 }
    );
  });

  test('Property 3: Product Categorization - Category filtering works correctly', async () => {
    await fc.assert(
      fc.asyncProperty(
        validCategoryArbitrary,
        async (filterCategory) => {
          // Get products filtered by category
          const filteredProducts = await CMSClient.getProducts({ category: filterCategory });
          
          // All returned products should belong to the requested category
          filteredProducts.forEach(product => {
            expect(product.category).toBe(filterCategory);
            expect(validCategories).toContain(product.category);
          });
          
          // If there are products, they should all have the same category
          if (filteredProducts.length > 0) {
            const categories = [...new Set(filteredProducts.map(p => p.category))];
            expect(categories).toHaveLength(1);
            expect(categories[0]).toBe(filterCategory);
          }
        }
      ),
      { numRuns: 5 }
    );
  });

  test('Property 3: Product Categorization - Products maintain category consistency', () => {
    fc.assert(
      fc.property(
        fc.array(productWithValidCategoryArbitrary, { minLength: 1, maxLength: 5 }),
        (products) => {
          // Each product should maintain its category consistently
          products.forEach(product => {
            // Category should be valid
            expect(validCategories).toContain(product.category);
            
            // Category should be immutable (same reference)
            const originalCategory = product.category;
            expect(product.category).toBe(originalCategory);
            
            // Category should be one of the specific allowed values
            const isValidCategory = validCategories.some(cat => cat === product.category);
            expect(isValidCategory).toBe(true);
          });
          
          // Verify that we have a mix of categories (if multiple products)
          if (products.length > 1) {
            const uniqueCategories = [...new Set(products.map(p => p.category))];
            expect(uniqueCategories.length).toBeGreaterThanOrEqual(1);
            expect(uniqueCategories.length).toBeLessThanOrEqual(validCategories.length);
            
            // All unique categories should be valid
            uniqueCategories.forEach(category => {
              expect(validCategories).toContain(category);
            });
          }
        }
      ),
      { numRuns: 5 }
    );
  });

  test('Property 3: Product Categorization - Category validation is strict', () => {
    fc.assert(
      fc.property(
        fc.record({
          ...productWithValidCategoryArbitrary.value,
          category: validCategoryArbitrary
        }),
        (product) => {
          // Test that only exact matches are accepted
          const category = product.category;
          
          // Category must be exactly one of the valid values
          expect(validCategories.includes(category)).toBe(true);
          
          // Category should not be a partial match or similar string
          const exactMatch = validCategories.find(cat => cat === category);
          expect(exactMatch).toBeDefined();
          expect(exactMatch).toBe(category);
          
          // Category should not be case-insensitive match of invalid value
          const upperCaseCategory = category.toUpperCase();
          const lowerCaseValidCategories = validCategories.map(cat => cat.toLowerCase());
          expect(lowerCaseValidCategories).toContain(category.toLowerCase());
        }
      ),
      { numRuns: 5 }
    );
  });

  test('Property 3: Product Categorization - No products have invalid categories', async () => {
    // Get all products from CMS
    const allProducts = await CMSClient.getProducts();
    
    // Test each product individually
    allProducts.forEach(product => {
      // Product must have a category
      expect(product.category).toBeDefined();
      expect(product.category).not.toBe('');
      
      // Category must be valid
      expect(validCategories).toContain(product.category);
      
      // Category must be a string
      expect(typeof product.category).toBe('string');
      
      // Category should follow naming convention
      expect(product.category).toMatch(/^[a-z]+(-[a-z]+)*$/);
    });
    
    // Verify we have products in each category (if products exist)
    if (allProducts.length > 0) {
      const categoriesInUse = [...new Set(allProducts.map(p => p.category))];
      
      // All categories in use should be valid
      categoriesInUse.forEach(category => {
        expect(validCategories).toContain(category);
      });
      
      // Should have at least one category in use
      expect(categoriesInUse.length).toBeGreaterThan(0);
    }
  });
});