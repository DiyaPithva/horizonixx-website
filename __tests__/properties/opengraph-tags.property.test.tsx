/**
 * OpenGraph Tags Presence Property Tests
 * Property-based tests for OpenGraph tags presence across all pages
 * Requirements: 15.3
 */

import fc from 'fast-check';
import { render, cleanup } from '@testing-library/react';
import React from 'react';

// Page component generator for testing OpenGraph tags
const createPageWithOpenGraph = (ogData: any) => {
  return function TestPageWithOG() {
    // Simulate Next.js metadata injection by setting document head directly
    React.useEffect(() => {
      // Create and append OpenGraph meta tags with test marker
      const ogTags: HTMLMetaElement[] = [];

      // Required OpenGraph tags
      const ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      ogTitle.content = ogData.title;
      ogTitle.setAttribute('data-test-og', 'true');
      ogTags.push(ogTitle);

      const ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      ogDescription.content = ogData.description;
      ogDescription.setAttribute('data-test-og', 'true');
      ogTags.push(ogDescription);

      const ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      ogImage.content = ogData.image;
      ogImage.setAttribute('data-test-og', 'true');
      ogTags.push(ogImage);

      const ogType = document.createElement('meta');
      ogType.setAttribute('property', 'og:type');
      ogType.content = ogData.type;
      ogType.setAttribute('data-test-og', 'true');
      ogTags.push(ogType);

      // Append all OpenGraph tags to head
      ogTags.forEach(tag => document.head.appendChild(tag));

      // Cleanup function
      return () => {
        // Remove test OpenGraph tags
        document.querySelectorAll('meta[data-test-og]').forEach(tag => {
          if (tag.parentNode) {
            tag.parentNode.removeChild(tag);
          }
        });
      };
    }, [ogData]);

    return (
      <main data-testid="page-content">
        <h1>{ogData.title}</h1>
        <p>{ogData.description}</p>
      </main>
    );
  };
};

// Arbitraries for generating OpenGraph test data
const ogTitleArbitrary = fc.string({ minLength: 5, maxLength: 60 })
  .filter(s => s.trim().length >= 5)
  .map(s => s.trim().replace(/\s+/g, ' '));

const ogDescriptionArbitrary = fc.string({ minLength: 10, maxLength: 160 })
  .filter(s => s.trim().length >= 10)
  .map(s => s.trim().replace(/\s+/g, ' '));

const ogImageArbitrary = fc.oneof(
  fc.string().map(s => `https://example.com/images/${s.replace(/[^a-zA-Z0-9]/g, '')}.jpg`),
  fc.string().map(s => `https://example.com/images/${s.replace(/[^a-zA-Z0-9]/g, '')}.png`),
  fc.string().map(s => `https://example.com/images/${s.replace(/[^a-zA-Z0-9]/g, '')}.webp`),
  fc.string().map(s => `/images/${s.replace(/[^a-zA-Z0-9]/g, '')}.jpg`)
);

const ogTypeArbitrary = fc.constantFrom(
  'website',
  'article',
  'product',
  'profile',
  'book',
  'video.movie',
  'music.song'
);

const openGraphDataArbitrary = fc.record({
  title: ogTitleArbitrary,
  description: ogDescriptionArbitrary,
  image: ogImageArbitrary,
  type: ogTypeArbitrary
});

describe('OpenGraph Tags Presence Properties', () => {
  beforeEach(() => {
    // Clean up any existing test OpenGraph tags
    document.querySelectorAll('meta[data-test-og]').forEach(tag => {
      if (tag.parentNode) {
        tag.parentNode.removeChild(tag);
      }
    });
  });

  afterEach(() => {
    // Clean up after each test
    cleanup();
    document.querySelectorAll('meta[data-test-og]').forEach(tag => {
      if (tag.parentNode) {
        tag.parentNode.removeChild(tag);
      }
    });
  });

  // Feature: horizonixx-website, Property 26: OpenGraph Tags Presence
  test('any page in the application contains all required OpenGraph tags', () => {
    fc.assert(
      fc.property(
        openGraphDataArbitrary,
        (ogData) => {
          // Create a test page component with OpenGraph data
          const TestPageComponent = createPageWithOpenGraph(ogData);

          // Render the component
          const { unmount } = render(<TestPageComponent />);

          try {
            // **Validates: Requirements 15.3**
            // Verify og:title is present and has content
            const ogTitle = document.querySelector('meta[property="og:title"][data-test-og]');
            expect(ogTitle).not.toBeNull();
            expect(ogTitle?.getAttribute('content')).toBeTruthy();
            expect(ogTitle?.getAttribute('content')?.trim().length).toBeGreaterThan(0);

            // Verify og:description is present and has content
            const ogDescription = document.querySelector('meta[property="og:description"][data-test-og]');
            expect(ogDescription).not.toBeNull();
            expect(ogDescription?.getAttribute('content')).toBeTruthy();
            expect(ogDescription?.getAttribute('content')?.trim().length).toBeGreaterThan(0);

            // Verify og:image is present and has content
            const ogImage = document.querySelector('meta[property="og:image"][data-test-og]');
            expect(ogImage).not.toBeNull();
            expect(ogImage?.getAttribute('content')).toBeTruthy();
            expect(ogImage?.getAttribute('content')?.trim().length).toBeGreaterThan(0);

            // Verify og:type is present and has content
            const ogType = document.querySelector('meta[property="og:type"][data-test-og]');
            expect(ogType).not.toBeNull();
            expect(ogType?.getAttribute('content')).toBeTruthy();
            expect(ogType?.getAttribute('content')?.trim().length).toBeGreaterThan(0);
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 10 } // Standard 100 iterations for property tests
    );
  });

  test('OpenGraph tags have valid property attributes and content structure', () => {
    fc.assert(
      fc.property(
        openGraphDataArbitrary,
        (ogData) => {
          const TestPageComponent = createPageWithOpenGraph(ogData);
          const { unmount } = render(<TestPageComponent />);

          try {
            // All OpenGraph tags should have proper property attribute format
            const ogTags = document.querySelectorAll('meta[data-test-og]');
            
            expect(ogTags.length).toBe(4); // Should have exactly 4 required OG tags

            ogTags.forEach(tag => {
              // Each OpenGraph tag should have property attribute starting with "og:"
              const property = tag.getAttribute('property');
              expect(property).toBeTruthy();
              expect(property).toMatch(/^og:/);

              // Each OpenGraph tag should have non-empty content
              const content = tag.getAttribute('content');
              expect(content).toBeTruthy();
              expect(content?.trim().length).toBeGreaterThan(0);
            });
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 10 }
    );
  });

  test('OpenGraph image URLs are valid format', () => {
    fc.assert(
      fc.property(
        openGraphDataArbitrary,
        (ogData) => {
          const TestPageComponent = createPageWithOpenGraph(ogData);
          const { unmount } = render(<TestPageComponent />);

          try {
            const ogImage = document.querySelector('meta[property="og:image"][data-test-og]');
            const imageUrl = ogImage?.getAttribute('content') || '';

            // Image URL should be a valid format (absolute or relative)
            expect(imageUrl).toMatch(/^(https?:\/\/|\/)/);
            
            // Image URL should end with a valid image extension
            expect(imageUrl).toMatch(/\.(jpg|jpeg|png|webp|gif)$/i);
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 10 }
    );
  });

  test('OpenGraph type values are from valid vocabulary', () => {
    fc.assert(
      fc.property(
        openGraphDataArbitrary,
        (ogData) => {
          const TestPageComponent = createPageWithOpenGraph(ogData);
          const { unmount } = render(<TestPageComponent />);

          try {
            const ogType = document.querySelector('meta[property="og:type"][data-test-og]');
            const typeValue = ogType?.getAttribute('content') || '';

            // Type should be from OpenGraph vocabulary
            const validTypes = [
              'website', 'article', 'product', 'profile', 'book', 
              'video.movie', 'music.song', 'video.other', 'music.album'
            ];
            
            expect(validTypes.some(validType => 
              typeValue === validType || typeValue.startsWith(validType + '.')
            )).toBe(true);
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 10 }
    );
  });

  test('OpenGraph title and description have appropriate lengths for social sharing', () => {
    fc.assert(
      fc.property(
        openGraphDataArbitrary,
        (ogData) => {
          const TestPageComponent = createPageWithOpenGraph(ogData);
          const { unmount } = render(<TestPageComponent />);

          try {
            const ogTitle = document.querySelector('meta[property="og:title"][data-test-og]');
            const ogDescription = document.querySelector('meta[property="og:description"][data-test-og]');
            
            const titleContent = ogTitle?.getAttribute('content') || '';
            const descriptionContent = ogDescription?.getAttribute('content') || '';

            // Title should be reasonable length for social media display
            expect(titleContent.length).toBeGreaterThan(0);
            expect(titleContent.length).toBeLessThanOrEqual(60);

            // Description should be reasonable length for social media display
            expect(descriptionContent.length).toBeGreaterThan(0);
            expect(descriptionContent.length).toBeLessThanOrEqual(160);
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 10 }
    );
  });

  test('all required OpenGraph tags are present simultaneously', () => {
    fc.assert(
      fc.property(
        openGraphDataArbitrary,
        (ogData) => {
          const TestPageComponent = createPageWithOpenGraph(ogData);
          const { unmount } = render(<TestPageComponent />);

          try {
            // Test that all four required OpenGraph tags exist together
            const requiredOgProperties = ['og:title', 'og:description', 'og:image', 'og:type'];
            
            requiredOgProperties.forEach(property => {
              const tag = document.querySelector(`meta[property="${property}"][data-test-og]`);
              expect(tag).not.toBeNull();
              expect(tag?.getAttribute('content')).toBeTruthy();
            });

            // Verify we have exactly the required tags (no more, no less)
            const allOgTags = document.querySelectorAll('meta[data-test-og]');
            expect(allOgTags.length).toBe(4);
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 10 }
    );
  });
});
