/**
 * Theme Toggle Component Tests
 * Unit tests for the ThemeToggle component
 * Requirements: 4.1
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

// Mock the useTheme hook
jest.mock('@/hooks/use-theme', () => ({
  useTheme: () => ({
    theme: 'light',
    toggleTheme: jest.fn(),
    setTheme: jest.fn(),
  }),
}));

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    // Mock window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  test('renders theme toggle button', async () => {
    render(<ThemeToggle />);

    await waitFor(() => {
      const button = screen.getByRole('switch');
      expect(button).toBeInTheDocument();
    });
  });

  test('displays correct aria-label for light theme', async () => {
    render(<ThemeToggle />);

    await waitFor(() => {
      const button = screen.getByRole('switch');
      expect(button).toHaveAttribute('aria-label', 'Switch to dark theme');
    });
  });

  test('shows label when showLabel prop is true', async () => {
    render(<ThemeToggle showLabel />);

    await waitFor(() => {
      expect(screen.getByText('Dark')).toBeInTheDocument();
    });
  });

  test('handles keyboard navigation with Enter key', async () => {
    render(<ThemeToggle />);

    await waitFor(() => {
      const button = screen.getByRole('switch');
      fireEvent.keyDown(button, { key: 'Enter' });
      // Component should handle the keydown event without errors
      expect(button).toBeInTheDocument();
    });
  });

  test('handles keyboard navigation with Space key', async () => {
    render(<ThemeToggle />);

    await waitFor(() => {
      const button = screen.getByRole('switch');
      fireEvent.keyDown(button, { key: ' ' });
      // Component should handle the keydown event without errors
      expect(button).toBeInTheDocument();
    });
  });

  test('applies custom className', async () => {
    render(<ThemeToggle className="custom-class" />);

    await waitFor(() => {
      const button = screen.getByRole('switch');
      expect(button).toHaveClass('custom-class');
    });
  });

  test('has proper accessibility attributes', async () => {
    render(<ThemeToggle />);

    await waitFor(() => {
      const button = screen.getByRole('switch');
      expect(button).toHaveAttribute('role', 'switch');
      expect(button).toHaveAttribute('aria-checked', 'false'); // light theme
      expect(button).toHaveAttribute('title');
    });
  });

  test('shows smooth icon transitions', async () => {
    render(<ThemeToggle />);

    await waitFor(() => {
      const button = screen.getByRole('switch');
      const icons = button.querySelectorAll('svg');
      expect(icons).toHaveLength(2); // Sun and moon icons
      
      // Check that both icons have transition classes
      icons.forEach(icon => {
        expect(icon).toHaveClass('transition-all', 'duration-300', 'ease-in-out');
      });
    });
  });

  test('has hover effects', async () => {
    render(<ThemeToggle />);

    await waitFor(() => {
      const button = screen.getByRole('switch');
      expect(button).toHaveClass('hover:bg-accent/50', 'hover:scale-105');
    });
  });
});