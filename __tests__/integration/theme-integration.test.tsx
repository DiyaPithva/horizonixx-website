/**
 * Theme Integration Tests
 * Integration tests for theme provider with components
 * Requirements: 4.1, 4.2, 4.3, 4.4
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { ThemeToggle } from '@/components/ui/theme-toggle';

// Mock next-themes for integration testing
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

describe('Theme Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    currentTheme = 'light';
  });

  test('ThemeProvider and ThemeToggle work together', () => {
    const { rerender } = render(
      <ThemeProvider>
        <ThemeToggle />
        <div data-testid="themed-content" className="bg-background text-foreground">
          Content
        </div>
      </ThemeProvider>
    );

    // Verify initial state
    expect(screen.getByRole('switch')).toHaveAttribute('aria-label', 'Switch to dark theme');
    
    // Click toggle button
    fireEvent.click(screen.getByRole('switch'));
    expect(mockSetTheme).toHaveBeenCalledWith('dark');

    // Simulate theme change
    currentTheme = 'dark';
    rerender(
      <ThemeProvider>
        <ThemeToggle />
        <div data-testid="themed-content" className="bg-background text-foreground">
          Content
        </div>
      </ThemeProvider>
    );

    // Verify theme changed
    expect(screen.getByRole('switch')).toHaveAttribute('aria-label', 'Switch to light theme');
  });

  test('theme classes are applied correctly', () => {
    const { container } = render(
      <ThemeProvider>
        <div data-testid="content" className="bg-primary text-foreground">
          Themed Content
        </div>
      </ThemeProvider>
    );

    const themeProvider = container.querySelector('[data-theme]');
    expect(themeProvider).toHaveAttribute('data-theme', 'light');
    expect(themeProvider).toHaveClass('light');

    const content = screen.getByTestId('content');
    expect(content).toHaveClass('bg-primary', 'text-foreground');
  });

  test('multiple themed components work together', () => {
    render(
      <ThemeProvider>
        <div data-testid="header" className="bg-card text-card-foreground">
          Header
        </div>
        <div data-testid="main" className="bg-background text-foreground">
          Main Content
        </div>
        <div data-testid="sidebar" className="bg-muted text-muted-foreground">
          Sidebar
        </div>
      </ThemeProvider>
    );

    // All components should be rendered and have theme classes
    expect(screen.getByTestId('header')).toHaveClass('bg-card', 'text-card-foreground');
    expect(screen.getByTestId('main')).toHaveClass('bg-background', 'text-foreground');
    expect(screen.getByTestId('sidebar')).toHaveClass('bg-muted');
  });
});