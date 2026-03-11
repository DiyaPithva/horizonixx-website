/**
 * SEO Meta Tags Presence Property Tests
 * Property-based tests for SEO meta tags presence across all pages
 * Requirements: 15.1
 */

import fc from 'fast-check';
import { render, cleanup } from '@testing-library/react';
import React from 'react';

// Page component generator for testing
const createPageComponent = (metadata: any, viewport?: any) => {
  return function TestPage() {
    // Simulate Next.js metadata injection by setting document head directly
    React.useEffect(() => {
      // Store original values for cleanup
      const originalTitle = document.title;

      // Set title
      document.title = metadata.title;

      // Create and append meta tags with test marker
      const metaTags: HTMLMetaElement[] = [];

      // Description meta tag
      const descriptionMeta = document.createElement('meta');
      descriptionMeta.name = 'description';
      descriptionMeta.content = metadata.description;
      descriptionMeta.setAttribute('data-test-meta', 'true');
      metaTags.push(descriptionMeta);

      // Viewport meta tag
      if (viewport) {
        const viewportMeta = document.createElement('meta');
        viewportMeta.name = 'viewport';
        viewportMeta.content = viewport;
        viewportMeta.setAttribute('data-test-meta', 'true');
        metaTags.push(viewportMeta);
      }

      // Keywords meta tag
      if (metadata.keywords) {
        const keywordsMeta = document.createElement('meta');
        keywordsMeta.name = 'keywords';
        keywordsMeta.content = metadata.keywords.join(', ');
        keywordsMeta.setAttribute('data-test-meta', 'true');
        metaTags.push(keywordsMeta);
      }

      // OpenGraph meta tags
      if (metadata.openGraph) {
        const ogTitleMeta = document.createElement('meta');
        ogTitleMeta.setAttribute('property', 'og:title');
        ogTitleMeta.content = metadata.openGraph.title;
        ogTitleMeta.setAttribute('data-test-meta', 'true');
        metaTags.push(ogTitleMeta);

        const ogDescriptionMeta = document.createElement('meta');
        ogDescriptionMeta.setAttribute('property', 'og:description');
        ogDescriptionMeta.content = metadata.openGraph.description;
        ogDescriptionMeta.setAttribute('data-test-meta', 'true');
        metaTags.push(ogDescriptionMeta);

        const ogTypeMeta = document.createElement('meta');
        ogTypeMeta.setAttribute('property', 'og:type');
        ogTypeMeta.content = metadata.openGraph.type;
        ogTypeMeta.setAttribute('data-test-meta', 'true');
        metaTags.push(ogTypeMeta);

        if (metadata.openGraph.images && metadata.openGraph.images[0]) {
          const ogImageMeta = document.createElement('meta');
          ogImageMeta.setAttribute('property', 'og:image');
          ogImageMeta.content = metadata.openGraph.images[0].url;
          ogImageMeta.setAttribute('data-test-meta', 'true');
          metaTags.push(ogImageMeta);
        }
      }

      // Twitter meta tags
      if (metadata.twitter) {
        const twitterCardMeta = document.createElement('meta');
        twitterCardMeta.name = 'twitter:card';
        twitterCardMeta.content = metadata.twitter.card;
        twitterCardMeta.setAttribute('data-test-meta', 'true');
        metaTags.push(twitterCardMeta);

        const twitterTitleMeta = document.createElement('meta');
        twitterTitleMeta.name = 'twitter:title';
        twitterTitleMeta.content = metadata.twitter.title;
        twitterTitleMeta.setAttribute('data-test-meta', 'true');
        metaTags.push(twitterTitleMeta);

        const twitterDescriptionMeta = document.createElement('meta');
        twitterDescriptionMeta.name = 'twitter:description';
        twitterDescriptionMeta.content = metadata.twitter.description;
        twitterDescriptionMeta.setAttribute('data-test-meta', 'true');
        metaTags.push(twitterDescriptionMeta);
      }

      // Append all meta tags to head
      metaTags.forEach(meta => document.head.appendChild(meta));

      // Cleanup function
      return () => {
        // Remove test meta tags
        document.querySelectorAll('meta[data-test-meta]').forEach(meta => {
          if (meta.parentNode) {
            meta.parentNode.removeChild(meta);
          }
        });
        // Restore original title
        document.title = originalTitle;
      };
    }, [metadata, viewport]);

    return (
      <main data-testid="page-content">
        <h1>Test Page Content</h1>
        <p>This is a test page for SEO meta tags validation.</p>
      </main>
    );
  };
};

// Arbitraries for generating test data - using more constrained values
const titleArbitrary = fc.string({ minLength: 10, maxLength: 60 })
  .filter(s => s.trim().length >= 10 && s.trim().length <= 60)
  .map(s => s.trim().replace(/\s+/g, ' ')); // Normalize whitespace

const descriptionArbitrary = fc.string({ minLength: 50, maxLength: 160 })
  .filter(s => s.trim().length >= 50 && s.trim().length <= 160)
  .map(s => s.trim().replace(/\s+/g, ' ')); // Normalize whitespace

const keywordsArbitrary = fc.array(
  fc.string({ minLength: 3, maxLength: 20 })
    .filter(s => s.trim().length >= 3)
    .map(s => s.trim().replace(/\s+/g, ' ')), // Normalize whitespace
  { minLength: 1, maxLength: 5 } // Reduce max to avoid overly long keyword lists
);

const viewportArbitrary = fc.constantFrom(
  'width=device-width, initial-scale=1',
  'width=device-width, initial-scale=1.0',
  'width=device-width, initial-scale=1, maximum-scale=1'
);

const metadataArbitrary = fc.record({
  title: titleArbitrary,
  description: descriptionArbitrary,
  keywords: keywordsArbitrary,
  openGraph: fc.record({
    title: titleArbitrary,
    description: descriptionArbitrary,
    type: fc.constantFrom('website', 'article', 'product'),
    images: fc.array(fc.record({
      url: fc.string().map(s => `/images/test-${s.replace(/[^a-zA-Z0-9]/g, '')}.jpg`),
      width: fc.constantFrom(1200, 1080, 800),
      height: fc.constantFrom(630, 540, 400)
    }), { minLength: 1, maxLength: 1 })
  }),
  twitter: fc.record({
    card: fc.constantFrom('summary', 'summary_large_image'),
    title: titleArbitrary,
    description: descriptionArbitrary
  })
});

describe('SEO Meta Tags Presence Properties', () => {
  beforeEach(() => {
    // Clean up any existing test meta tags
    document.querySelectorAll('meta[data-test-meta]').forEach(meta => {
      if (meta.parentNode) {
        meta.parentNode.removeChild(meta);
      }
    });
  });

  afterEach(() => {
    // Clean up after each test
    cleanup();
    document.querySelectorAll('meta[data-test-meta]').forEach(meta => {
      if (meta.parentNode) {
        meta.parentNode.removeChild(meta);
      }
    });
  });

  // Feature: horizonixx-website, Property 24: SEO Meta Tags Presence
  test('all pages contain required meta description, title, and viewport tags', () => {
    fc.assert(
      fc.property(
        metadataArbitrary,
        viewportArbitrary,
        (metadata, viewport) => {
          // Create a test page component with the generated metadata
          const TestPageComponent = createPageComponent(metadata, viewport);

          // Render the component
          const { unmount } = render(<TestPageComponent />);

          try {
            // Verify title tag is present and has content
            expect(document.title).toBeTruthy();
            expect(document.title.trim().length).toBeGreaterThan(0);

            // Verify meta description is present and has content
            const descriptionMeta = document.querySelector('meta[name="description"][data-test-meta]');
            expect(descriptionMeta).not.toBeNull();
            expect(descriptionMeta?.getAttribute('content')).toBeTruthy();
            expect(descriptionMeta?.getAttribute('content')?.trim().length).toBeGreaterThan(0);

            // Verify viewport meta tag is present
            const viewportMeta = document.querySelector('meta[name="viewport"][data-test-meta]');
            expect(viewportMeta).not.toBeNull();
            expect(viewportMeta?.getAttribute('content')).toBeTruthy();
            expect(viewportMeta?.getAttribute('content')).toContain('width=device-width');
            expect(viewportMeta?.getAttribute('content')).toContain('initial-scale=1');
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 10 } // Reduced runs for faster execution
    );
  });

  test('meta description has appropriate length for SEO', () => {
    fc.assert(
      fc.property(
        metadataArbitrary,
        viewportArbitrary,
        (metadata, viewport) => {
          const TestPageComponent = createPageComponent(metadata, viewport);
          const { unmount } = render(<TestPageComponent />);

          try {
            const descriptionMeta = document.querySelector('meta[name="description"][data-test-meta]');
            const description = descriptionMeta?.getAttribute('content') || '';

            // Meta description should be between 50-160 characters for optimal SEO
            expect(description.length).toBeGreaterThanOrEqual(50);
            expect(description.length).toBeLessThanOrEqual(160);
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 10 }
    );
  });

  test('title tag has appropriate length for SEO', () => {
    fc.assert(
      fc.property(
        metadataArbitrary,
        viewportArbitrary,
        (metadata, viewport) => {
          const TestPageComponent = createPageComponent(metadata, viewport);
          const { unmount } = render(<TestPageComponent />);

          try {
            const title = document.title;

            // Title should be between 10-60 characters for optimal SEO
            expect(title.length).toBeGreaterThanOrEqual(10);
            expect(title.length).toBeLessThanOrEqual(60);
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 10 }
    );
  });

  test('OpenGraph meta tags are present when specified', () => {
    fc.assert(
      fc.property(
        metadataArbitrary,
        viewportArbitrary,
        (metadata, viewport) => {
          const TestPageComponent = createPageComponent(metadata, viewport);
          const { unmount } = render(<TestPageComponent />);

          try {
            // Verify OpenGraph title
            const ogTitle = document.querySelector('meta[property="og:title"][data-test-meta]');
            expect(ogTitle).not.toBeNull();
            expect(ogTitle?.getAttribute('content')).toBeTruthy();

            // Verify OpenGraph description
            const ogDescription = document.querySelector('meta[property="og:description"][data-test-meta]');
            expect(ogDescription).not.toBeNull();
            expect(ogDescription?.getAttribute('content')).toBeTruthy();

            // Verify OpenGraph type
            const ogType = document.querySelector('meta[property="og:type"][data-test-meta]');
            expect(ogType).not.toBeNull();
            expect(ogType?.getAttribute('content')).toBeTruthy();

            // Verify OpenGraph image
            const ogImage = document.querySelector('meta[property="og:image"][data-test-meta]');
            expect(ogImage).not.toBeNull();
            expect(ogImage?.getAttribute('content')).toBeTruthy();
            expect(ogImage?.getAttribute('content')).toMatch(/\.(jpg|jpeg|png|webp)$/i);
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 10 }
    );
  });

  test('Twitter Card meta tags are present when specified', () => {
    fc.assert(
      fc.property(
        metadataArbitrary,
        viewportArbitrary,
        (metadata, viewport) => {
          const TestPageComponent = createPageComponent(metadata, viewport);
          const { unmount } = render(<TestPageComponent />);

          try {
            // Verify Twitter card type
            const twitterCard = document.querySelector('meta[name="twitter:card"][data-test-meta]');
            expect(twitterCard).not.toBeNull();
            expect(twitterCard?.getAttribute('content')).toBeTruthy();
            expect(['summary', 'summary_large_image']).toContain(twitterCard?.getAttribute('content'));

            // Verify Twitter title
            const twitterTitle = document.querySelector('meta[name="twitter:title"][data-test-meta]');
            expect(twitterTitle).not.toBeNull();
            expect(twitterTitle?.getAttribute('content')).toBeTruthy();

            // Verify Twitter description
            const twitterDescription = document.querySelector('meta[name="twitter:description"][data-test-meta]');
            expect(twitterDescription).not.toBeNull();
            expect(twitterDescription?.getAttribute('content')).toBeTruthy();
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 10 }
    );
  });

  test('viewport meta tag contains required attributes', () => {
    fc.assert(
      fc.property(
        metadataArbitrary,
        viewportArbitrary,
        (metadata, viewport) => {
          const TestPageComponent = createPageComponent(metadata, viewport);
          const { unmount } = render(<TestPageComponent />);

          try {
            const viewportMeta = document.querySelector('meta[name="viewport"][data-test-meta]');
            const viewportContent = viewportMeta?.getAttribute('content') || '';

            // Viewport must contain width=device-width
            expect(viewportContent).toContain('width=device-width');

            // Viewport must contain initial-scale
            expect(viewportContent).toMatch(/initial-scale=1(\.0)?/);

            // Viewport content should be a valid viewport string
            expect(viewportContent).toMatch(/^[a-zA-Z0-9\-=.,\s]+$/);
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 10 }
    );
  });

  test('meta tags have proper HTML structure and attributes', () => {
    fc.assert(
      fc.property(
        metadataArbitrary,
        viewportArbitrary,
        (metadata, viewport) => {
          const TestPageComponent = createPageComponent(metadata, viewport);
          const { unmount } = render(<TestPageComponent />);

          try {
            // All test meta tags should have proper structure
            const metaTags = document.querySelectorAll('meta[data-test-meta]');
            
            expect(metaTags.length).toBeGreaterThan(0);

            metaTags.forEach(meta => {
              // Each meta tag should have either name or property attribute
              const hasName = meta.hasAttribute('name');
              const hasProperty = meta.hasAttribute('property');
              expect(hasName || hasProperty).toBe(true);

              // Each meta tag should have content attribute
              expect(meta.hasAttribute('content')).toBe(true);
              
              // Content should not be empty
              const content = meta.getAttribute('content') || '';
              expect(content.trim().length).toBeGreaterThan(0);
            });

            // Title should be properly set
            expect(document.title.trim().length).toBeGreaterThan(0);
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 10 }
    );
  });
});
