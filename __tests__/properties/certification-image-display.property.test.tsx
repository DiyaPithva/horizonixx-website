/**
 * Certification Image Display Property Tests
 * Property-based tests for certification image display functionality
 * Requirements: 13.2
 */

import fc from 'fast-check';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CertificationCard } from '@/components/ui/certification-card';
import { Certification } from '@/types/content';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, fill, className, ...props }: any) => (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      data-fill={fill}
      {...props} 
    />
  ),
}));

// Arbitrary for generating valid certification data
const certificationArbitrary = fc.record({
  id: fc.string({ minLength: 1 }),
  name: fc.string({ minLength: 1 }),
  issuer: fc.string({ minLength: 1 }),
  scope: fc.string({ minLength: 1 }),
  description: fc.string({ minLength: 1 }),
  image: fc.string({ minLength: 1 }).map(str => `/certifications/${str}.png`),
  certificationNumber: fc.option(fc.string({ minLength: 1 })),
  issueDate: fc.option(fc.date()),
  expiryDate: fc.option(fc.date()),
  order: fc.integer({ min: 0, max: 100 }),
  published: fc.boolean(),
});

// Arbitrary for certification variants
const variantArbitrary = fc.constantFrom('card', 'badge');

describe('Certification Image Display Properties', () => {
  afterEach(() => {
    // Clean up DOM after each test
    document.body.innerHTML = '';
  });

  // Feature: horizonixx-website, Property 21: Certification Image Display
  test('certification images are properly displayed', () => {
    fc.assert(
      fc.property(
        certificationArbitrary,
        variantArbitrary,
        (certification: Certification, variant) => {
          const { container } = render(
            <CertificationCard 
              certification={certification} 
              variant={variant}
            />
          );

          // Verify certification image is present in the DOM
          const certificationImage = container.querySelector('[data-testid="certification-image"]') as HTMLImageElement;
          expect(certificationImage).toBeInTheDocument();

          // Verify image has proper src attribute
          expect(certificationImage).toHaveAttribute('src', certification.image);

          // Verify image has proper alt text for accessibility
          const expectedAltText = `${certification.name} certification`;
          expect(certificationImage).toHaveAttribute('alt', expectedAltText);

          // Verify image is configured for proper display (fill mode for responsive sizing)
          expect(certificationImage).toHaveAttribute('data-fill', 'true');

          // Verify image has proper styling classes for display
          expect(certificationImage).toHaveClass('object-contain', 'p-2');

          // Verify image is contained within proper wrapper with sizing
          const imageWrapper = certificationImage.parentElement;
          expect(imageWrapper).toHaveClass('relative');
          expect(imageWrapper).toHaveClass('mx-auto');
          expect(imageWrapper).toHaveClass('bg-white/20');
          expect(imageWrapper).toHaveClass('dark:bg-white/10');
          expect(imageWrapper).toHaveClass('rounded-lg');
          expect(imageWrapper).toHaveClass('overflow-hidden');

          // Verify variant-specific image sizing
          if (variant === 'card') {
            expect(imageWrapper).toHaveClass('w-24', 'h-24', 'mb-4');
          } else if (variant === 'badge') {
            expect(imageWrapper).toHaveClass('w-16', 'h-16', 'mb-2');
          }
        }
      ),
      { numRuns: 5 } // Use 5 iterations as requested by user for faster execution
    );
  });

  test('certification image display handles various image paths correctly', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string({ minLength: 1 }),
          name: fc.string({ minLength: 1 }),
          issuer: fc.string({ minLength: 1 }),
          scope: fc.string({ minLength: 1 }),
          description: fc.string({ minLength: 1 }),
          image: fc.oneof(
            fc.constant('/certifications/iso-9001.png'),
            fc.constant('/certifications/iso-14001.jpg'),
            fc.constant('/certifications/haccp.webp'),
            fc.constant('https://example.com/cert.png'),
            fc.string({ minLength: 1 }).map(str => `/images/${str}.png`),
            fc.string({ minLength: 1 }).map(str => `https://cdn.example.com/${str}.jpg`)
          ),
          certificationNumber: fc.option(fc.string({ minLength: 1 })),
          issueDate: fc.option(fc.date()),
          expiryDate: fc.option(fc.date()),
          order: fc.integer({ min: 0, max: 100 }),
          published: fc.boolean(),
        }),
        variantArbitrary,
        (certification: Certification, variant) => {
          const { container } = render(
            <CertificationCard 
              certification={certification} 
              variant={variant}
            />
          );

          const certificationImage = container.querySelector('[data-testid="certification-image"]') as HTMLImageElement;
          
          // Verify image src is properly set regardless of path format
          expect(certificationImage).toHaveAttribute('src', certification.image);
          
          // Verify image path is not empty or undefined
          expect(certification.image).toBeTruthy();
          expect(certification.image.length).toBeGreaterThan(0);
        }
      ),
      { numRuns: 5 }
    );
  });

  test('certification image accessibility attributes are properly set', () => {
    fc.assert(
      fc.property(
        certificationArbitrary,
        variantArbitrary,
        (certification: Certification, variant) => {
          const { container } = render(
            <CertificationCard 
              certification={certification} 
              variant={variant}
            />
          );

          const certificationImage = container.querySelector('[data-testid="certification-image"]') as HTMLImageElement;
          
          // Verify alt text is descriptive and includes certification name
          const altText = certificationImage.getAttribute('alt');
          expect(altText).toBeTruthy();
          expect(altText).toContain(certification.name);
          expect(altText).toContain('certification');
          
          // Verify alt text is not just the filename or path
          expect(altText).not.toBe(certification.image);
          expect(altText).not.toContain('.png');
          expect(altText).not.toContain('.jpg');
          expect(altText).not.toContain('.webp');
        }
      ),
      { numRuns: 5 }
    );
  });

  test('certification image display is consistent across both variants', () => {
    fc.assert(
      fc.property(
        certificationArbitrary,
        (certification: Certification) => {
          // Test card variant
          const { container: cardContainer } = render(
            <CertificationCard 
              certification={certification} 
              variant="card"
            />
          );

          let certificationImage = cardContainer.querySelector('[data-testid="certification-image"]') as HTMLImageElement;
          const cardImageSrc = certificationImage.getAttribute('src');
          const cardImageAlt = certificationImage.getAttribute('alt');

          // Clean up and test badge variant
          cardContainer.remove();
          
          const { container: badgeContainer } = render(
            <CertificationCard 
              certification={certification} 
              variant="badge"
            />
          );

          certificationImage = badgeContainer.querySelector('[data-testid="certification-image"]') as HTMLImageElement;
          const badgeImageSrc = certificationImage.getAttribute('src');
          const badgeImageAlt = certificationImage.getAttribute('alt');

          // Verify image source and alt text are consistent across variants
          expect(cardImageSrc).toBe(badgeImageSrc);
          expect(cardImageAlt).toBe(badgeImageAlt);
          
          // Both should display the same image with same accessibility attributes
          expect(cardImageSrc).toBe(certification.image);
          expect(cardImageAlt).toBe(`${certification.name} certification`);
        }
      ),
      { numRuns: 5 }
    );
  });

  test('certification image fallback behavior when image fails to load', () => {
    fc.assert(
      fc.property(
        certificationArbitrary,
        variantArbitrary,
        (certification: Certification, variant) => {
          const { container } = render(
            <CertificationCard 
              certification={certification} 
              variant={variant}
            />
          );

          const certificationImage = container.querySelector('[data-testid="certification-image"]') as HTMLImageElement;
          
          // Verify image has proper error handling attributes
          // The Next.js Image component should handle loading errors gracefully
          expect(certificationImage).toBeInTheDocument();
          
          // Verify the image wrapper provides visual structure even if image fails
          const imageWrapper = certificationImage.parentElement;
          expect(imageWrapper).toHaveClass('bg-white/20', 'dark:bg-white/10');
          
          // This provides a subtle background that will be visible if image fails to load
          // ensuring the layout remains intact and accessible
        }
      ),
      { numRuns: 5 }
    );
  });

  test('certification image display maintains proper aspect ratio and sizing', () => {
    fc.assert(
      fc.property(
        certificationArbitrary,
        variantArbitrary,
        (certification: Certification, variant) => {
          const { container } = render(
            <CertificationCard 
              certification={certification} 
              variant={variant}
            />
          );

          const certificationImage = container.querySelector('[data-testid="certification-image"]') as HTMLImageElement;
          const imageWrapper = certificationImage.parentElement;
          
          // Verify image uses object-contain for proper aspect ratio preservation
          expect(certificationImage).toHaveClass('object-contain');
          
          // Verify image has padding to prevent touching edges
          expect(certificationImage).toHaveClass('p-2');
          
          // Verify wrapper maintains square aspect ratio for consistent layout
          if (variant === 'card') {
            expect(imageWrapper).toHaveClass('w-24', 'h-24'); // 96px x 96px
          } else if (variant === 'badge') {
            expect(imageWrapper).toHaveClass('w-16', 'h-16'); // 64px x 64px
          }
          
          // Verify wrapper is properly positioned and styled
          expect(imageWrapper).toHaveClass('relative', 'mx-auto', 'rounded-lg', 'overflow-hidden');
        }
      ),
      { numRuns: 5 }
    );
  });
});