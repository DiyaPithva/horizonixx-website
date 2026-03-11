/**
 * GlobalExportMap Component Tests
 * Tests for the world map visualization component
 * Requirements: 22.1, 22.2, 22.3, 22.4
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { GlobalExportMap } from '@/components/ui/global-export-map';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { initial, animate, variants, transition, whileHover, ...rest } = props;
      return <div {...rest}>{children}</div>;
    },
    g: ({ children, ...props }: any) => {
      const { initial, animate, variants, transition, whileHover, ...rest } = props;
      return <g {...rest}>{children}</g>;
    },
    circle: ({ children, ...props }: any) => {
      const { initial, animate, variants, transition, whileHover, ...rest } = props;
      return <circle {...rest}>{children}</circle>;
    },
  },
  useInView: () => true,
  AnimatePresence: ({ children }: any) => children,
}));

// Mock AnimatedSection
jest.mock('@/components/ui/animated-section', () => ({
  AnimatedSection: ({ children, className }: any) => <div className={className}>{children}</div>,
}));

describe('GlobalExportMap', () => {
  test('renders map title and description', () => {
    render(<GlobalExportMap />);
    
    expect(screen.getByText('Global Export Network')).toBeInTheDocument();
    expect(screen.getByText(/Serving 25\+ countries worldwide/)).toBeInTheDocument();
  });

  test('displays statistics section', () => {
    render(<GlobalExportMap />);
    
    expect(screen.getByText('25+')).toBeInTheDocument();
    expect(screen.getByText('Countries Served')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('Continents')).toBeInTheDocument();
  });

  test('renders regional breakdown', () => {
    render(<GlobalExportMap />);
    
    expect(screen.getByText('North America')).toBeInTheDocument();
    expect(screen.getByText('Europe')).toBeInTheDocument();
    expect(screen.getByText('Asia Pacific')).toBeInTheDocument();
    expect(screen.getByText('Middle East')).toBeInTheDocument();
    expect(screen.getByText('South America')).toBeInTheDocument();
    expect(screen.getByText('Africa')).toBeInTheDocument();
  });

  test('renders SVG world map', () => {
    render(<GlobalExportMap />);
    
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg?.getAttribute('viewBox')).toBe('0 0 900 500');
  });

  test('applies custom className', () => {
    const { container } = render(<GlobalExportMap className="custom-class" />);
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  test('shows 25+ countries requirement', () => {
    render(<GlobalExportMap />);
    
    // Check that the component displays 25+ countries as required
    expect(screen.getByText('25+')).toBeInTheDocument();
    expect(screen.getByText('Countries Served')).toBeInTheDocument();
  });
});