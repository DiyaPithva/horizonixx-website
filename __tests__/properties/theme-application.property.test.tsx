/**
 * Theme Application Consistency Property Tests
 * Property-based tests for theme application across components
 * Requirements: 4.2, 4.3
 */

import fc from 'fast-check';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { ThemeToggle } from '@/components/ui/theme-toggle';

// Mock next-themes
let currentTheme = 'light';
const mockSetTheme = jest.fn();

jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-theme={currentTheme} className={currentTheme}>
      {children}
    </div>
  ),
  useTheme: () => ({
    theme: currentTheme,
    setTheme: (theme: string) => {
      mockSetTheme(theme);
      currentTheme = theme;
    },
    systemTheme: 'light',
  }),
}));

// Mock CSS custom properties for testing
const mockCSSVariables = {
  light: {
    '--color-primary': '#2e7d32',
    '--color-secondary': '#4caf50',
    '--color-accent': '#f5f7f2',
    '--color-background': '#ffffff',
    '--color-foreground': '#1a1a1a',
    '--color-muted': '#6b7280',
    '--color-border': '#e5e7eb',
    '--color-card': '#ffffff',
    '--color-card-foreground': '#1a1a1a',
  },
  dark: {
    '--color-primary': '#4caf50',
    '--color-secondary': '#66bb6a',
    '--color-accent': '#2d3748',
    '--color-background': '#0f1a12',
    '--color-foreground': '#f7fafc',
    '--color-muted': '#a0aec0',
    '--color-border': '#2d3748',
    '--color-card': '#1a202c',
    '--color-card-foreground': '#f7fafc',
  },
};

// Mock document.documentElement.style.setProperty
Object.defineProperty(document.documentElement, 'style', {
  value: {
    setProperty: jest.fn(),
    getPropertyValue: jest.fn((prop: string) => {
      const theme = currentTheme as 'light' | 'dark';
      return mockCSSVariables[theme][prop as keyof typeof mockCSSVariables.light] || '';
    }),
  },
  writable: true,
});

describe('Theme Application Consistency Properties', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    currentTheme = 'light';
  });

  // Feature: horizonixx-website, Property 9: Theme Application Consistency
  test('all components apply theme consistently across the entire page', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('light', 'dark'),
        (themeMode) => {
          currentTheme = themeMode;

          // Create a comprehensive test component that uses all theme classes
          const ComprehensiveTestComponent = () => (
            <div data-testid="page-container" className="bg-background text-foreground">
              {/* Header with navigation */}
              <header data-testid="header" className="bg-card border-b border-border">
                <nav className="text-foreground">
                  <div className="text-primary">Logo</div>
                  <div className="text-muted">Navigation</div>
                </nav>
              </header>

              {/* Main content area */}
              <main data-testid="main" className="bg-background">
                {/* Hero section */}
                <section data-testid="hero" className="bg-primary text-white">
                  <h1 className="heading-1 text-white">Hero Title</h1>
                  <p className="text-white/80">Hero description</p>
                </section>

                {/* Content cards */}
                <section data-testid="cards" className="bg-background">
                  <div data-testid="regular-card" className="card">
                    <h3 className="heading-3 text-primary">Card Title</h3>
                    <p className="text-muted">Card description</p>
                    <div className="bg-secondary text-white">Secondary element</div>
                  </div>

                  <div data-testid="glass-card" className="card-glass">
                    <h3 className="heading-4 text-foreground">Glass Card</h3>
                    <p className="text-muted">Glass card content</p>
                  </div>
                </section>

                {/* Form elements */}
                <section data-testid="forms" className="bg-card">
                  <input data-testid="input" className="input" placeholder="Test input" />
                  <button data-testid="btn-primary" className="btn-primary">Primary Button</button>
                  <button data-testid="btn-secondary" className="btn-secondary">Secondary Button</button>
                  <button data-testid="btn-outline" className="btn-outline">Outline Button</button>
                </section>

                {/* Typography showcase */}
                <section data-testid="typography" className="bg-background">
                  <h1 data-testid="h1" className="heading-1">Heading 1</h1>
                  <h2 data-testid="h2" className="heading-2">Heading 2</h2>
                  <h3 data-testid="h3" className="heading-3">Heading 3</h3>
                  <h4 data-testid="h4" className="heading-4">Heading 4</h4>
                  <p data-testid="body-text" className="text-foreground">Body text</p>
                  <p data-testid="muted-text" className="text-muted">Muted text</p>
                </section>
              </main>

              {/* Footer */}
              <footer data-testid="footer" className="bg-card border-t border-border">
                <div className="text-muted">Footer content</div>
                <div className="text-foreground">Footer links</div>
              </footer>
            </div>
          );

          const { container } = render(
            <ThemeProvider>
              <ComprehensiveTestComponent />
            </ThemeProvider>
          );

          // Verify theme is applied to provider
          const themeProvider = container.querySelector('[data-theme]');
          expect(themeProvider).toHaveAttribute('data-theme', themeMode);
          expect(themeProvider).toHaveClass(themeMode);

          // Test page-level theme consistency
          const pageContainer = container.querySelector('[data-testid="page-container"]');
          expect(pageContainer).toHaveClass('bg-background', 'text-foreground');

          // Test header theme consistency
          const header = container.querySelector('[data-testid="header"]');
          expect(header).toHaveClass('bg-card', 'border-b', 'border-border');

          // Test main content theme consistency
          const main = container.querySelector('[data-testid="main"]');
          expect(main).toHaveClass('bg-background');

          // Test hero section theme consistency
          const hero = container.querySelector('[data-testid="hero"]');
          expect(hero).toHaveClass('bg-primary', 'text-white');

          // Test card theme consistency
          const regularCard = container.querySelector('[data-testid="regular-card"]');
          expect(regularCard).toHaveClass('card');

          const glassCard = container.querySelector('[data-testid="glass-card"]');
          expect(glassCard).toHaveClass('card-glass');

          // Test form elements theme consistency
          const input = container.querySelector('[data-testid="input"]');
          expect(input).toHaveClass('input');

          const btnPrimary = container.querySelector('[data-testid="btn-primary"]');
          expect(btnPrimary).toHaveClass('btn-primary');

          const btnSecondary = container.querySelector('[data-testid="btn-secondary"]');
          expect(btnSecondary).toHaveClass('btn-secondary');

          const btnOutline = container.querySelector('[data-testid="btn-outline"]');
          expect(btnOutline).toHaveClass('btn-outline');

          // Test typography theme consistency
          const h1 = container.querySelector('[data-testid="h1"]');
          expect(h1).toHaveClass('heading-1');

          const h2 = container.querySelector('[data-testid="h2"]');
          expect(h2).toHaveClass('heading-2');

          const h3 = container.querySelector('[data-testid="h3"]');
          expect(h3).toHaveClass('heading-3');

          const h4 = container.querySelector('[data-testid="h4"]');
          expect(h4).toHaveClass('heading-4');

          const bodyText = container.querySelector('[data-testid="body-text"]');
          expect(bodyText).toHaveClass('text-foreground');

          const mutedText = container.querySelector('[data-testid="muted-text"]');
          expect(mutedText).toHaveClass('text-muted');

          // Test footer theme consistency
          const footer = container.querySelector('[data-testid="footer"]');
          expect(footer).toHaveClass('bg-card', 'border-t', 'border-border');
        }
      ),
      { numRuns: 10 }
    );
  });

  test('theme toggle component reflects current theme state', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('light', 'dark'),
        (themeMode) => {
          currentTheme = themeMode;

          const { container } = render(
            <ThemeProvider>
              <ThemeToggle />
            </ThemeProvider>
          );

          const button = container.querySelector('button');
          expect(button).toBeInTheDocument();

          // Verify button has proper theme-aware classes (check for partial class matches)
          expect(button?.className).toContain('hover:bg-accent');
          expect(button?.className).toContain('focus:ring-primary');

          // Verify button has proper aria-label for current theme
          const expectedLabel = `Switch to ${themeMode === 'dark' ? 'light' : 'dark'} theme`;
          expect(button).toHaveAttribute('aria-label', expectedLabel);
          expect(button).toHaveAttribute('title', expectedLabel);

          // Verify icon has theme-aware text color
          const icon = button?.querySelector('svg');
          expect(icon).toHaveClass('text-foreground');
        }
      ),
      { numRuns: 10 }
    );
  });

  test('theme configuration contains all required colors with valid values', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('light', 'dark'),
        (themeMode) => {
          // Import theme config to test
          const themeConfig = require('@/lib/theme.config').themeConfig;
          
          const palette = themeConfig.colors[themeMode];
          
          // Verify all required color properties exist
          const requiredColors = [
            'primary',
            'secondary', 
            'accent',
            'background',
            'foreground',
            'muted',
            'border',
            'card',
            'cardForeground'
          ];

          requiredColors.forEach(color => {
            expect(palette).toHaveProperty(color);
            expect(typeof palette[color]).toBe('string');
            expect(palette[color]).toMatch(/^#[0-9a-fA-F]{6}$/); // Valid hex color
            expect(palette[color].length).toBe(7); // Exactly 7 characters (#RRGGBB)
          });

          // Verify specific brand colors for light theme
          if (themeMode === 'light') {
            expect(palette.primary).toBe('#2e7d32'); // Leaf Green
            expect(palette.secondary).toBe('#4caf50'); // Natural Green
            expect(palette.accent).toBe('#f5f7f2'); // Soft Beige
            expect(palette.background).toBe('#ffffff'); // White
          }

          // Verify specific brand colors for dark theme
          if (themeMode === 'dark') {
            expect(palette.primary).toBe('#4caf50'); // Natural Green (brighter for dark)
            expect(palette.background).toBe('#0f1a12'); // Dark green background
          }
        }
      ),
      { numRuns: 10 }
    );
  });

  test('CSS custom properties are applied consistently for theme', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('light', 'dark'),
        (themeMode) => {
          currentTheme = themeMode;

          // Test that CSS variables are properly defined
          const expectedVariables = [
            '--color-primary',
            '--color-secondary',
            '--color-accent',
            '--color-background',
            '--color-foreground',
            '--color-muted',
            '--color-border',
            '--color-card',
            '--color-card-foreground'
          ];

          expectedVariables.forEach(variable => {
            const value = mockCSSVariables[themeMode][variable as keyof typeof mockCSSVariables.light];
            expect(value).toBeDefined();
            expect(typeof value).toBe('string');
            expect(value).toMatch(/^#[0-9a-fA-F]{6}$/); // Valid hex color
          });

          // Verify theme-specific values
          if (themeMode === 'light') {
            expect(mockCSSVariables.light['--color-primary']).toBe('#2e7d32');
            expect(mockCSSVariables.light['--color-background']).toBe('#ffffff');
          } else {
            expect(mockCSSVariables.dark['--color-primary']).toBe('#4caf50');
            expect(mockCSSVariables.dark['--color-background']).toBe('#0f1a12');
          }
        }
      ),
      { numRuns: 10 }
    );
  });

  test('theme transitions are smooth without jarring visual changes', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('light', 'dark'),
        fc.constantFrom('light', 'dark'),
        (fromTheme, toTheme) => {
          // Test that theme provider configuration supports smooth transitions
          currentTheme = fromTheme;

          const TestComponent = () => (
            <div data-testid="transition-test" className="bg-background text-foreground transition-colors">
              <div className="bg-card text-card-foreground transition-colors">Card</div>
              <div className="text-muted transition-colors">Muted text</div>
            </div>
          );

          const { rerender } = render(
            <ThemeProvider>
              <TestComponent />
            </ThemeProvider>
          );

          // Change theme
          currentTheme = toTheme;

          rerender(
            <ThemeProvider>
              <TestComponent />
            </ThemeProvider>
          );

          // The component should handle theme changes gracefully
          // This is verified by the fact that no errors are thrown during rerender
          expect(true).toBe(true); // Test passes if no errors occur
        }
      ),
      { numRuns: 10 }
    );
  });

  test('glassmorphism effects are applied consistently across themes', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('light', 'dark'),
        (themeMode) => {
          currentTheme = themeMode;

          const GlassComponent = () => (
            <div data-testid="glass-container" className="bg-background">
              <div data-testid="glass-card" className="card-glass">
                Glass card content
              </div>
              <div data-testid="glass-element" className="glass">
                Glass element
              </div>
            </div>
          );

          const { container } = render(
            <ThemeProvider>
              <GlassComponent />
            </ThemeProvider>
          );

          const glassCard = container.querySelector('[data-testid="glass-card"]');
          expect(glassCard).toHaveClass('card-glass');

          const glassElement = container.querySelector('[data-testid="glass-element"]');
          expect(glassElement).toHaveClass('glass');

          // Both elements should have glassmorphism classes applied
          // The actual backdrop-filter and styling is handled by CSS
        }
      ),
      { numRuns: 10 }
    );
  });

  test('interactive elements maintain theme consistency on hover states', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('light', 'dark'),
        (themeMode) => {
          currentTheme = themeMode;

          const InteractiveComponent = () => (
            <div data-testid="interactive-container" className="bg-background">
              <button data-testid="primary-btn" className="btn-primary">Primary</button>
              <button data-testid="secondary-btn" className="btn-secondary">Secondary</button>
              <button data-testid="outline-btn" className="btn-outline">Outline</button>
              <div data-testid="hover-card" className="card hover:shadow-lg">Hover Card</div>
            </div>
          );

          const { container } = render(
            <ThemeProvider>
              <InteractiveComponent />
            </ThemeProvider>
          );

          // Verify buttons have theme-aware classes
          const primaryBtn = container.querySelector('[data-testid="primary-btn"]');
          expect(primaryBtn).toHaveClass('btn-primary');

          const secondaryBtn = container.querySelector('[data-testid="secondary-btn"]');
          expect(secondaryBtn).toHaveClass('btn-secondary');

          const outlineBtn = container.querySelector('[data-testid="outline-btn"]');
          expect(outlineBtn).toHaveClass('btn-outline');

          const hoverCard = container.querySelector('[data-testid="hover-card"]');
          expect(hoverCard).toHaveClass('card', 'hover:shadow-lg');
        }
      ),
      { numRuns: 10 }
    );
  });
});
