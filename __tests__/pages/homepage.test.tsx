/**
 * Homepage Component Tests
 * Unit tests for the homepage (app/page.tsx)
 * Requirements: 1.1, 1.2, 1.3
 */

import { render, screen, waitFor } from '@testing-library/react';
import Home from '@/app/page';

// Mock the homepage components
jest.mock('@/components/homepage/hero', () => ({
  Hero: () => <div data-testid="hero-section">Hero Section</div>
}));

jest.mock('@/components/homepage/featured-products', () => ({
  FeaturedProducts: () => <div data-testid="featured-products-section">Featured Products Section</div>
}));

jest.mock('@/components/homepage/why-choose-us', () => ({
  WhyChooseUs: () => <div data-testid="why-choose-us-section">Why Choose Us Section</div>
}));

jest.mock('@/components/homepage/company-stats', () => ({
  CompanyStats: () => <div data-testid="company-stats-section">Company Stats Section</div>
}));

jest.mock('@/components/homepage/product-categories', () => ({
  ProductCategories: () => <div data-testid="product-categories-section">Product Categories Section</div>
}));

jest.mock('@/components/ui/animated-section', () => ({
  AnimatedSection: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

// Mock Next.js metadata
jest.mock('next', () => ({
  ...jest.requireActual('next'),
  metadata: {
    title: 'HORIZONIXX INTERNATIONAL - Global Exporter of Premium Herbal & Natural Products',
    description: 'Supplying high-quality herbal raw materials, cosmetic ingredients, spices and healthcare products to industries worldwide. ISO 9001:2015 certified with 25+ countries served.'
  }
}));

describe('Homepage', () => {
  beforeEach(() => {
    // Mock window.matchMedia for theme functionality
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

  test('renders all main sections', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByTestId('hero-section')).toBeInTheDocument();
      expect(screen.getByTestId('featured-products-section')).toBeInTheDocument();
      expect(screen.getByTestId('why-choose-us-section')).toBeInTheDocument();
      expect(screen.getByTestId('company-stats-section')).toBeInTheDocument();
      expect(screen.getByTestId('product-categories-section')).toBeInTheDocument();
    });
  });

  test('renders sections in correct order', async () => {
    render(<Home />);

    await waitFor(() => {
      const main = screen.getByRole('main');
      const sections = main.children;
      
      // Check that sections appear in the expected order
      expect(sections[0]).toContainElement(screen.getByTestId('hero-section'));
      expect(sections[1]).toContainElement(screen.getByTestId('featured-products-section'));
      expect(sections[2]).toContainElement(screen.getByTestId('why-choose-us-section'));
      expect(sections[3]).toContainElement(screen.getByTestId('company-stats-section'));
      expect(sections[4]).toContainElement(screen.getByTestId('product-categories-section'));
    });
  });

  test('includes structured data for organization', async () => {
    render(<Home />);

    await waitFor(() => {
      const structuredDataScript = document.querySelector('script[type="application/ld+json"]');
      expect(structuredDataScript).toBeInTheDocument();
      
      if (structuredDataScript) {
        const structuredData = JSON.parse(structuredDataScript.textContent || '{}');
        expect(structuredData['@context']).toBe('https://schema.org');
        expect(structuredData['@type']).toBe('Organization');
        expect(structuredData.name).toBe('HORIZONIXX INTERNATIONAL');
        expect(structuredData.certification).toBe('ISO 9001:2015');
      }
    });
  });

  test('has proper main element structure', async () => {
    render(<Home />);

    await waitFor(() => {
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
      expect(main).toHaveClass('min-h-screen');
    });
  });

  test('contains all required homepage sections for requirements', async () => {
    render(<Home />);

    await waitFor(() => {
      // Requirement 1.1: Hero section with headline
      expect(screen.getByTestId('hero-section')).toBeInTheDocument();
      
      // Requirement 1.2: Featured products section
      expect(screen.getByTestId('featured-products-section')).toBeInTheDocument();
      
      // Requirement 1.3: Company stats section
      expect(screen.getByTestId('company-stats-section')).toBeInTheDocument();
    });
  });
});