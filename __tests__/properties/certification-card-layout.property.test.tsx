/**
 * Certification Card Layout Property Tests
 * Property-based tests for certification card layout structure and consistency
 * Requirements: 13.4
 */

import fc from 'fast-check';
import { render } from '@testing-library/react';
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
  certificationNumber: fc.option(fc.string({ minLength: 1 }), { nil: undefined }),
  issueDate: fc.option(fc.date(), { nil: undefined }),
  expiryDate: fc.option(fc.date(), { nil: undefined }),
  order: fc.integer({ min: 0, max: 100 }),
  published: fc.boolean(),
});

// Arbitrary for certification variants
const variantArbitrary = fc.constantFrom('card', 'badge');

describe('Certification Card Layout Properties', () => {
  afterEach(() => {
    // Clean up DOM after each test
    document.body.innerHTML = '';
  });

  // Feature: horizonixx-website, Property 22: Certification Card Layout
  test('certification cards have consistent layout structure', () => {
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

          // Verify main card container exists with proper structure
          const cardElement = container.querySelector('[data-testid="certification-card"]');
          expect(cardElement).toBeInTheDocument();

          // Verify card has glassmorphism styling classes
          expect(cardElement).toHaveClass('backdrop-blur-md');
          expect(cardElement).toHaveClass('bg-white/10');
          expect(cardElement).toHaveClass('dark:bg-white/5');
          expect(cardElement).toHaveClass('border');
          expect(cardElement).toHaveClass('border-white/20');
          expect(cardElement).toHaveClass('dark:border-white/10');

          // Verify card has proper layout and spacing classes
          expect(cardElement).toHaveClass('relative');
          expect(cardElement).toHaveClass('overflow-hidden');
          expect(cardElement).toHaveClass('transition-all');
          expect(cardElement).toHaveClass('duration-300');

          // Verify hover effects are present
          expect(cardElement).toHaveClass('hover:scale-105');
          expect(cardElement).toHaveClass('shadow-lg');
          expect(cardElement).toHaveClass('hover:shadow-xl');

          // Verify variant-specific sizing and spacing
          if (variant === 'card') {
            expect(cardElement).toHaveClass('rounded-2xl');
            expect(cardElement).toHaveClass('p-6');
            expect(cardElement).toHaveClass('space-y-4');
            expect(cardElement).toHaveClass('min-h-[280px]');
            expect(cardElement).toHaveClass('max-w-sm');
          } else if (variant === 'badge') {
            expect(cardElement).toHaveClass('rounded-xl');
            expect(cardElement).toHaveClass('p-4');
            expect(cardElement).toHaveClass('space-y-2');
            expect(cardElement).toHaveClass('min-h-[160px]');
            expect(cardElement).toHaveClass('max-w-xs');
          }
        }
      ),
      { numRuns: 5 } // Use 5 iterations as requested by user for faster execution
    );
  });

  test('certification card layout elements are properly positioned', () => {
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

          // Verify background gradient overlay exists and is positioned correctly
          const gradientOverlay = container.querySelector('.absolute.inset-0.bg-gradient-to-br');
          expect(gradientOverlay).toBeInTheDocument();
          expect(gradientOverlay).toHaveClass('from-primary/5');
          expect(gradientOverlay).toHaveClass('to-secondary/5');
          expect(gradientOverlay).toHaveClass('dark:from-primary/10');
          expect(gradientOverlay).toHaveClass('dark:to-secondary/10');

          // Verify content wrapper has proper z-index
          const contentWrapper = container.querySelector('.relative.z-10');
          expect(contentWrapper).toBeInTheDocument();

          // Verify image wrapper positioning and styling
          const imageWrapper = container.querySelector('[data-testid="certification-image"]')?.parentElement;
          expect(imageWrapper).toHaveClass('relative');
          expect(imageWrapper).toHaveClass('mx-auto');
          expect(imageWrapper).toHaveClass('bg-white/20');
          expect(imageWrapper).toHaveClass('dark:bg-white/10');
          expect(imageWrapper).toHaveClass('rounded-lg');
          expect(imageWrapper).toHaveClass('overflow-hidden');

          // Verify hover effect overlay exists
          const hoverOverlay = container.querySelector('.absolute.inset-0.bg-gradient-to-t');
          expect(hoverOverlay).toBeInTheDocument();
          expect(hoverOverlay).toHaveClass('from-primary/10');
          expect(hoverOverlay).toHaveClass('to-transparent');
          expect(hoverOverlay).toHaveClass('opacity-0');
          expect(hoverOverlay).toHaveClass('hover:opacity-100');
          expect(hoverOverlay).toHaveClass('transition-opacity');
          expect(hoverOverlay).toHaveClass('duration-300');
        }
      ),
      { numRuns: 5 }
    );
  });

  test('certification card text elements have consistent typography and spacing', () => {
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

          // Verify certification name styling
          const nameElement = container.querySelector('[data-testid="certification-name"]');
          expect(nameElement).toBeInTheDocument();
          expect(nameElement).toHaveClass('font-semibold');
          expect(nameElement).toHaveClass('text-foreground');
          expect(nameElement).toHaveClass('text-center');
          expect(nameElement).toHaveClass('leading-tight');

          // Verify issuer styling
          const issuerElement = container.querySelector('[data-testid="certification-issuer"]');
          expect(issuerElement).toBeInTheDocument();
          expect(issuerElement).toHaveClass('text-muted-foreground');
          expect(issuerElement).toHaveClass('text-center');
          expect(issuerElement).toHaveClass('font-medium');

          // Verify scope styling
          const scopeElement = container.querySelector('[data-testid="certification-scope"]');
          expect(scopeElement).toBeInTheDocument();
          expect(scopeElement).toHaveClass('text-muted-foreground');
          expect(scopeElement).toHaveClass('text-center');
          expect(scopeElement).toHaveClass('leading-relaxed');

          // Verify variant-specific text sizing
          if (variant === 'card') {
            expect(nameElement).toHaveClass('text-lg');
            expect(nameElement).toHaveClass('mb-2');
            expect(issuerElement).toHaveClass('text-sm');
            expect(issuerElement).toHaveClass('mb-3');
            expect(scopeElement).toHaveClass('text-sm');
          } else if (variant === 'badge') {
            expect(nameElement).toHaveClass('text-sm');
            expect(nameElement).toHaveClass('mb-1');
            expect(issuerElement).toHaveClass('text-xs');
            expect(issuerElement).toHaveClass('mb-1');
            expect(scopeElement).toHaveClass('text-xs');
          }
        }
      ),
      { numRuns: 5 }
    );
  });

  test('certification card responsive behavior maintains layout integrity', () => {
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

          const cardElement = container.querySelector('[data-testid="certification-card"]');
          
          // Verify card has maximum width constraints for responsive behavior
          if (variant === 'card') {
            expect(cardElement).toHaveClass('max-w-sm'); // 384px max width
          } else if (variant === 'badge') {
            expect(cardElement).toHaveClass('max-w-xs'); // 320px max width
          }

          // Verify card has minimum height to maintain consistent layout
          if (variant === 'card') {
            expect(cardElement).toHaveClass('min-h-[280px]');
          } else if (variant === 'badge') {
            expect(cardElement).toHaveClass('min-h-[160px]');
          }

          // Verify image wrapper maintains aspect ratio
          const imageWrapper = container.querySelector('[data-testid="certification-image"]')?.parentElement;
          if (variant === 'card') {
            expect(imageWrapper).toHaveClass('w-24'); // 96px
            expect(imageWrapper).toHaveClass('h-24'); // 96px
            expect(imageWrapper).toHaveClass('mb-4');
          } else if (variant === 'badge') {
            expect(imageWrapper).toHaveClass('w-16'); // 64px
            expect(imageWrapper).toHaveClass('h-16'); // 64px
            expect(imageWrapper).toHaveClass('mb-2');
          }
        }
      ),
      { numRuns: 5 }
    );
  });

  test('certification card layout handles optional content gracefully', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.string({ minLength: 1 }),
          name: fc.string({ minLength: 1 }),
          issuer: fc.string({ minLength: 1 }),
          scope: fc.string({ minLength: 1 }),
          description: fc.string({ minLength: 1 }),
          image: fc.string({ minLength: 1 }).map(str => `/certifications/${str}.png`),
          certificationNumber: fc.option(fc.string({ minLength: 1 }), { nil: undefined }),
          issueDate: fc.option(fc.date(), { nil: undefined }),
          expiryDate: fc.option(fc.date(), { nil: undefined }),
          order: fc.integer({ min: 0, max: 100 }),
          published: fc.boolean(),
        }),
        (certification: Certification) => {
          // Test card variant (shows optional content)
          const { container: cardContainer } = render(
            <CertificationCard 
              certification={certification} 
              variant="card"
            />
          );

          const cardElement = cardContainer.querySelector('[data-testid="certification-card"]');
          expect(cardElement).toBeInTheDocument();

          // Verify layout remains consistent regardless of optional content presence
          expect(cardElement).toHaveClass('min-h-[280px]');
          expect(cardElement).toHaveClass('space-y-4');

          // Check certification number handling
          if (certification.certificationNumber) {
            const certNumberText = cardContainer.textContent?.includes('Cert. No:');
            expect(certNumberText).toBe(true);
            
            // Find the border element that should contain the cert number
            const borderElement = cardContainer.querySelector('.pt-2.border-t.border-white\\/10');
            if (borderElement) {
              expect(borderElement).toBeInTheDocument();
            }
          }

          // Test badge variant (hides optional content)
          cardContainer.remove();
          
          const { container: badgeContainer } = render(
            <CertificationCard 
              certification={certification} 
              variant="badge"
            />
          );

          const badgeElement = badgeContainer.querySelector('[data-testid="certification-card"]');
          expect(badgeElement).toBeInTheDocument();
          expect(badgeElement).toHaveClass('min-h-[160px]');
          expect(badgeElement).toHaveClass('space-y-2');

          // Badge variant should not show certification number or issue date
          expect(badgeContainer.textContent?.includes('Cert. No:')).toBe(false);
          expect(badgeContainer.textContent?.includes('Issued:')).toBe(false);
        }
      ),
      { numRuns: 5 }
    );
  });

  test('certification card layout maintains visual hierarchy', () => {
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

          // Verify proper semantic structure
          const nameElement = container.querySelector('[data-testid="certification-name"]');
          expect(nameElement?.tagName).toBe('H3'); // Semantic heading

          const issuerElement = container.querySelector('[data-testid="certification-issuer"]');
          expect(issuerElement?.tagName).toBe('P'); // Paragraph for issuer

          const scopeElement = container.querySelector('[data-testid="certification-scope"]');
          expect(scopeElement?.tagName).toBe('P'); // Paragraph for scope

          // Verify visual hierarchy through font weights and sizes
          expect(nameElement).toHaveClass('font-semibold'); // Strongest weight for name
          expect(issuerElement).toHaveClass('font-medium'); // Medium weight for issuer
          // Scope uses default font weight (lighter than issuer)

          // Verify color hierarchy
          expect(nameElement).toHaveClass('text-foreground'); // Highest contrast
          expect(issuerElement).toHaveClass('text-muted-foreground'); // Lower contrast
          expect(scopeElement).toHaveClass('text-muted-foreground'); // Lower contrast

          // Verify size hierarchy based on variant
          if (variant === 'card') {
            expect(nameElement).toHaveClass('text-lg'); // Largest text
            expect(issuerElement).toHaveClass('text-sm'); // Smaller text
            expect(scopeElement).toHaveClass('text-sm'); // Smaller text
          } else if (variant === 'badge') {
            expect(nameElement).toHaveClass('text-sm'); // Largest relative to variant
            expect(issuerElement).toHaveClass('text-xs'); // Smaller text
            expect(scopeElement).toHaveClass('text-xs'); // Smaller text
          }
        }
      ),
      { numRuns: 5 }
    );
  });
});