/**
 * Property-Based Tests for Map Interaction
 * Tests universal properties for the GlobalExportMap component
 * Requirements: 22.3
 */

import fc from 'fast-check';
import { render, fireEvent } from '@testing-library/react';
import { GlobalExportMap } from '@/components/ui/global-export-map';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { initial, animate, variants, transition, whileHover, onMouseEnter, onMouseLeave, ...rest } = props;
      return <div {...rest} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>{children}</div>;
    },
    g: ({ children, ...props }: any) => {
      const { initial, animate, variants, transition, whileHover, ...rest } = props;
      return <g {...rest}>{children}</g>;
    },
    circle: ({ children, ...props }: any) => {
      const { initial, animate, variants, transition, whileHover, onMouseEnter, onMouseLeave, ...rest } = props;
      return <circle {...rest} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>{children}</circle>;
    },
  },
  useInView: () => true,
  AnimatePresence: ({ children }: any) => children,
}));

// Mock AnimatedSection
jest.mock('@/components/ui/animated-section', () => ({
  AnimatedSection: ({ children, className }: any) => <div className={className}>{children}</div>,
}));

describe('Map Interaction Properties', () => {
  // Feature: horizonixx-website, Property 39: Map Interaction Information Display
  test('map interaction provides additional information about export regions', () => {
    fc.assert(
      fc.property(
        fc.record({
          interactionType: fc.constantFrom('hover', 'click'),
          markerIndex: fc.integer({ min: 0, max: 4 }) // Test first 5 markers
        }),
        ({ interactionType, markerIndex }) => {
          const { container } = render(<GlobalExportMap />);
          
          // Find interactive map elements (circles representing countries)
          const countryMarkers = container.querySelectorAll('circle.fill-primary.cursor-pointer');
          
          // Verify that there are interactive elements
          expect(countryMarkers.length).toBeGreaterThan(0);
          expect(countryMarkers.length).toBeGreaterThanOrEqual(25); // Requirement 22.2
          
          // Test interaction with a specific marker
          if (countryMarkers.length > markerIndex) {
            const targetMarker = countryMarkers[markerIndex];
            
            // Simulate mouse interaction
            if (interactionType === 'hover') {
              // Before interaction - no tooltip should be visible
              let tooltip = container.querySelector('.absolute.z-10.bg-card.border.border-border.rounded-lg');
              expect(tooltip).not.toBeInTheDocument();
              
              // Trigger hover interaction
              fireEvent.mouseEnter(targetMarker, {
                clientX: 100,
                clientY: 100,
                currentTarget: { getBoundingClientRect: () => ({ left: 50, top: 50 }) }
              });
              
              // After interaction - tooltip should appear with information
              tooltip = container.querySelector('.absolute.z-10.bg-card.border.border-border.rounded-lg');
              expect(tooltip).toBeInTheDocument();
              
              // Verify tooltip contains required information elements
              if (tooltip) {
                // Should contain country name (h4 element)
                const countryName = tooltip.querySelector('h4.font-semibold.text-foreground');
                expect(countryName).toBeInTheDocument();
                expect(countryName?.textContent).toBeTruthy();
                
                // Should contain region information
                const regionInfo = tooltip.querySelector('p.text-sm.text-muted-foreground');
                expect(regionInfo).toBeInTheDocument();
                expect(regionInfo?.textContent).toBeTruthy();
                
                // May contain description (optional but should be present for most countries)
                const description = tooltip.querySelector('p.text-xs.text-muted-foreground');
                // Description is optional, so we just verify structure if present
                if (description) {
                  expect(description.textContent).toBeTruthy();
                }
              }
              
              // Clean up - mouse leave should hide tooltip
              fireEvent.mouseLeave(targetMarker);
              
              // Verify tooltip is removed after mouse leave
              setTimeout(() => {
                const tooltipAfterLeave = container.querySelector('.absolute.z-10.bg-card.border.border-border.rounded-lg');
                expect(tooltipAfterLeave).not.toBeInTheDocument();
              }, 100);
            }
          }
          
          // Property: Interactive regions should provide additional information
          // Validated by: presence of interactive elements, tooltip display on hover,
          // tooltip contains country name and region information
          return true;
        }
      ),
      { numRuns: 5 } // Exactly 5 iterations as requested by user
    );
  });

  test('map interaction displays correct information content', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 24 }), // Test different country markers (25+ countries)
        (countryIndex) => {
          const { container } = render(<GlobalExportMap />);
          
          // Find all interactive country markers
          const countryMarkers = container.querySelectorAll('circle.fill-primary.cursor-pointer');
          
          // Ensure we have the required number of countries
          expect(countryMarkers.length).toBeGreaterThanOrEqual(25);
          
          // Test a specific country marker if it exists
          if (countryMarkers.length > countryIndex) {
            const marker = countryMarkers[countryIndex];
            
            // Simulate hover with proper event structure
            const mockEvent = {
              clientX: 200 + countryIndex * 10, // Vary position
              clientY: 150 + countryIndex * 5,
              currentTarget: {
                getBoundingClientRect: () => ({
                  left: 100,
                  top: 100,
                  right: 800,
                  bottom: 500
                })
              }
            };
            
            fireEvent.mouseEnter(marker, mockEvent);
            
            // Verify tooltip appears with correct structure
            const tooltip = container.querySelector('.absolute.z-10.bg-card.border.border-border.rounded-lg.p-4.shadow-xl.max-w-xs.pointer-events-none');
            expect(tooltip).toBeInTheDocument();
            
            if (tooltip) {
              // Verify required information elements are present
              const countryNameElement = tooltip.querySelector('h4.font-semibold.text-foreground.mb-1');
              const regionElement = tooltip.querySelector('p.text-sm.text-muted-foreground.mb-2');
              
              expect(countryNameElement).toBeInTheDocument();
              expect(regionElement).toBeInTheDocument();
              
              // Verify content is meaningful (not empty)
              expect(countryNameElement?.textContent?.trim()).toBeTruthy();
              expect(regionElement?.textContent?.trim()).toBeTruthy();
              
              // Verify country name is from expected list
              const countryName = countryNameElement?.textContent?.trim();
              const expectedCountries = [
                'United States', 'Canada', 'Mexico', 'Brazil', 'Argentina', 'Chile',
                'United Kingdom', 'Germany', 'France', 'Italy', 'Spain', 'Netherlands',
                'Japan', 'South Korea', 'Singapore', 'Malaysia', 'Thailand', 'Australia', 'New Zealand',
                'United Arab Emirates', 'Saudi Arabia', 'South Africa', 'Egypt',
                'China', 'Russia', 'Turkey', 'Israel'
              ];
              
              if (countryName) {
                expect(expectedCountries).toContain(countryName);
              }
              
              // Verify region is from expected list
              const regionName = regionElement?.textContent?.trim();
              const expectedRegions = [
                'North America', 'South America', 'Europe', 'Europe/Asia', 
                'Asia Pacific', 'Asia', 'Middle East', 'Africa'
              ];
              
              if (regionName) {
                expect(expectedRegions).toContain(regionName);
              }
            }
            
            // Clean up
            fireEvent.mouseLeave(marker);
          }
          
          // Property: Map interactions display correct information about export regions
          // Validated by: tooltip structure, content presence, and data accuracy
          return true;
        }
      ),
      { numRuns: 5 } // Exactly 5 iterations as requested
    );
  });

  test('map displays 25+ export countries as required', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container } = render(<GlobalExportMap />);
        
        // Count the number of country markers
        const countryMarkers = container.querySelectorAll('circle.fill-primary.cursor-pointer');
        
        // Property: Map should display 25+ countries
        expect(countryMarkers.length).toBeGreaterThanOrEqual(25);
        
        return true;
      }),
      { numRuns: 5 }
    );
  });

  test('map styling is consistent with theme', () => {
    fc.assert(
      fc.property(fc.constantFrom('', 'custom-theme-class'), (customClass) => {
        const { container } = render(<GlobalExportMap className={customClass} />);
        
        // Check that theme-consistent classes are applied
        const mapContainer = container.querySelector('.bg-card');
        expect(mapContainer).toBeInTheDocument();
        
        const primaryElements = container.querySelectorAll('.fill-primary');
        expect(primaryElements.length).toBeGreaterThan(0);
        
        const foregroundText = container.querySelectorAll('.text-foreground');
        expect(foregroundText.length).toBeGreaterThan(0);
        
        // Property: Map styling should be consistent with theme
        return true;
      }),
      { numRuns: 10 }
    );
  });

  test('regional breakdown shows correct country distribution', () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const { container } = render(<GlobalExportMap />);
        
        // Check that regional sections exist
        const regions = ['North America', 'Europe', 'Asia Pacific', 'Middle East', 'South America', 'Africa'];
        
        regions.forEach(region => {
          // Verify each region heading exists in the regional breakdown section
          const regionCards = container.querySelectorAll('.bg-card.border.border-border.rounded-lg');
          const regionExists = Array.from(regionCards).some(card => 
            card.textContent?.includes(region)
          );
          expect(regionExists).toBe(true);
        });
        
        // Property: Regional breakdown should accurately represent country distribution
        return true;
      }),
      { numRuns: 5 }
    );
  });
});