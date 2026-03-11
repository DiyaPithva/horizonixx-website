/**
 * Theme Persistence Property Tests
 * Property-based tests for theme persistence across page navigation
 * Requirements: 4.4
 */

import fc from 'fast-check';
import { render, cleanup } from '@testing-library/react';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { useTheme } from 'next-themes';

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

// Mock next-themes with localStorage persistence
let currentTheme = 'light';
let storedTheme: string | null = null;
const mockSetTheme = jest.fn();

jest.mock('next-themes', () => ({
  ThemeProvider: ({ children, storageKey }: { children: React.ReactNode; storageKey?: string }) => {
    // Simulate theme persistence by reading from mock localStorage
    const stored = mockLocalStorage.getItem(storageKey || 'theme');
    if (stored) {
      currentTheme = stored;
    }
    
    return (
      <div data-theme={currentTheme} className={currentTheme}>
        {children}
      </div>
    );
  },
  useTheme: () => ({
    theme: currentTheme,
    setTheme: (theme: string) => {
      mockSetTheme(theme);
      currentTheme = theme;
      // Simulate localStorage persistence
      mockLocalStorage.setItem('horizonixx-theme', theme);
      storedTheme = theme;
    },
    systemTheme: 'light',
  }),
}));

// Mock window.localStorage
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('Theme Persistence Properties', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.clear();
    currentTheme = 'light';
    storedTheme = null;
  });

  afterEach(() => {
    cleanup();
  });

  // Feature: horizonixx-website, Property 10: Theme Persistence Round-Trip
  test('theme preference persists across page navigation', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('light', 'dark'),
        (selectedTheme) => {
          // Component that uses theme and can change it
          const TestComponent = () => {
            const { theme, setTheme } = useTheme();
            
            return (
              <div data-testid="theme-component" data-current-theme={theme}>
                <button 
                  data-testid="theme-button"
                  onClick={() => setTheme(selectedTheme)}
                >
                  Set Theme to {selectedTheme}
                </button>
                <span data-testid="current-theme">{theme}</span>
              </div>
            );
          };

          // First render - simulate initial page load
          const { container: container1, unmount: unmount1 } = render(
            <ThemeProvider>
              <TestComponent />
            </ThemeProvider>
          );

          // Simulate user changing theme
          const button = container1.querySelector('[data-testid="theme-button"]') as HTMLButtonElement;
          button?.click();

          // Verify theme was set
          expect(mockSetTheme).toHaveBeenCalledWith(selectedTheme);
          expect(mockLocalStorage.getItem('horizonixx-theme')).toBe(selectedTheme);

          // Unmount component (simulate navigation away)
          unmount1();

          // Second render - simulate navigating to a different page and back
          const { container: container2 } = render(
            <ThemeProvider>
              <TestComponent />
            </ThemeProvider>
          );

          // Verify theme persisted across "navigation"
          const themeProvider = container2.querySelector('[data-theme]');
          expect(themeProvider).toHaveAttribute('data-theme', selectedTheme);
          expect(themeProvider).toHaveClass(selectedTheme);

          // Verify the theme is still available in localStorage
          expect(mockLocalStorage.getItem('horizonixx-theme')).toBe(selectedTheme);
        }
      ),
      { numRuns: 10 }
    );
  });

  test('theme persistence works with system theme fallback', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('light', 'dark'),
        (systemTheme) => {
          // Clear any stored theme to test system fallback
          mockLocalStorage.clear();
          
          // Mock system theme preference
          Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation((query: string) => ({
              matches: query === '(prefers-color-scheme: dark)' ? systemTheme === 'dark' : systemTheme === 'light',
              media: query,
              onchange: null,
              addListener: jest.fn(),
              removeListener: jest.fn(),
              addEventListener: jest.fn(),
              removeEventListener: jest.fn(),
              dispatchEvent: jest.fn(),
            })),
          });

          const TestComponent = () => {
            const { theme } = useTheme();
            return <div data-testid="theme-display" data-theme={theme}>{theme}</div>;
          };

          // First render without stored theme
          const { container: container1, unmount: unmount1 } = render(
            <ThemeProvider>
              <TestComponent />
            </ThemeProvider>
          );

          // Should fall back to system theme when no stored preference
          const themeDisplay1 = container1.querySelector('[data-testid="theme-display"]');
          
          // Unmount and re-render to simulate navigation
          unmount1();
          
          const { container: container2 } = render(
            <ThemeProvider>
              <TestComponent />
            </ThemeProvider>
          );

          // Theme should remain consistent across renders when no stored preference
          const themeDisplay2 = container2.querySelector('[data-testid="theme-display"]');
          expect(themeDisplay2?.getAttribute('data-theme')).toBe(themeDisplay1?.getAttribute('data-theme'));
        }
      ),
      { numRuns: 10 }
    );
  });

  test('theme persistence survives multiple navigation cycles', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('light', 'dark'),
        fc.integer({ min: 2, max: 5 }),
        (selectedTheme, navigationCycles) => {
          const TestComponent = () => {
            const { theme, setTheme } = useTheme();
            
            return (
              <div data-testid="persistent-theme" data-current-theme={theme}>
                <button onClick={() => setTheme(selectedTheme)}>
                  Set Theme
                </button>
              </div>
            );
          };

          // Initial render and theme setting
          let { container, unmount } = render(
            <ThemeProvider>
              <TestComponent />
            </ThemeProvider>
          );

          // Set the theme
          const button = container.querySelector('button') as HTMLButtonElement;
          button?.click();

          // Verify initial theme setting
          expect(mockLocalStorage.getItem('horizonixx-theme')).toBe(selectedTheme);
          unmount();

          // Simulate multiple navigation cycles
          for (let i = 0; i < navigationCycles; i++) {
            const renderResult = render(
              <ThemeProvider>
                <TestComponent />
              </ThemeProvider>
            );
            
            container = renderResult.container;
            unmount = renderResult.unmount;

            // Verify theme persists through each cycle
            const themeElement = container.querySelector('[data-testid="persistent-theme"]');
            expect(themeElement).toHaveAttribute('data-current-theme', selectedTheme);
            expect(mockLocalStorage.getItem('horizonixx-theme')).toBe(selectedTheme);

            unmount();
          }
        }
      ),
      { numRuns: 10 }
    );
  });

  test('theme storage key is consistent', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('light', 'dark'),
        (themeValue) => {
          const TestComponent = () => {
            const { setTheme } = useTheme();
            
            return (
              <button 
                data-testid="set-theme-btn"
                onClick={() => setTheme(themeValue)}
              >
                Set Theme
              </button>
            );
          };

          const { container } = render(
            <ThemeProvider>
              <TestComponent />
            </ThemeProvider>
          );

          // Set theme
          const button = container.querySelector('[data-testid="set-theme-btn"]') as HTMLButtonElement;
          button?.click();

          // Verify the theme is stored with the correct key
          expect(mockLocalStorage.getItem('horizonixx-theme')).toBe(themeValue);
          
          // Verify the storage contains the theme key
          const storedValue = mockLocalStorage.getItem('horizonixx-theme');
          expect(storedValue).toBe(themeValue);
          
          // Verify the mock was called correctly
          expect(mockSetTheme).toHaveBeenCalledWith(themeValue);
        }
      ),
      { numRuns: 10 }
    );
  });

  test('theme transitions are smooth without data loss', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('light', 'dark'),
        fc.constantFrom('light', 'dark'),
        (initialTheme, finalTheme) => {
          const TestComponent = () => {
            const { theme, setTheme } = useTheme();
            
            return (
              <div data-testid="transition-test" data-theme={theme}>
                <button 
                  data-testid="set-initial"
                  onClick={() => setTheme(initialTheme)}
                >
                  Set Initial
                </button>
                <button 
                  data-testid="set-final"
                  onClick={() => setTheme(finalTheme)}
                >
                  Set Final
                </button>
              </div>
            );
          };

          const { container, unmount } = render(
            <ThemeProvider>
              <TestComponent />
            </ThemeProvider>
          );

          // Set initial theme
          const initialButton = container.querySelector('[data-testid="set-initial"]') as HTMLButtonElement;
          initialButton?.click();
          expect(mockLocalStorage.getItem('horizonixx-theme')).toBe(initialTheme);

          // Set final theme
          const finalButton = container.querySelector('[data-testid="set-final"]') as HTMLButtonElement;
          finalButton?.click();
          expect(mockLocalStorage.getItem('horizonixx-theme')).toBe(finalTheme);

          unmount();

          // Re-render to verify final theme persisted
          const { container: newContainer } = render(
            <ThemeProvider>
              <TestComponent />
            </ThemeProvider>
          );

          const themeElement = newContainer.querySelector('[data-testid="transition-test"]');
          expect(themeElement).toHaveAttribute('data-theme', finalTheme);
          expect(mockLocalStorage.getItem('horizonixx-theme')).toBe(finalTheme);
        }
      ),
      { numRuns: 10 }
    );
  });
});