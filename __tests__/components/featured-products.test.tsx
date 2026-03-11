/**
 * Featured Products Section Component Tests
 * Unit tests for the FeaturedProducts component
 * Requirements: 7.1, 7.2, 7.5
 */

import { render, screen, waitFor } from '@testing-library/react';
import { FeaturedProducts } from '@/components/homepage/featured-products';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
}));

// Mock Next.js Link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('FeaturedProducts Component', () => {
  test('displays section heading and description', async () => {
    render(<FeaturedProducts />);

    await waitFor(() => {
      expect(screen.getByText('Featured Products')).toBeInTheDocument();
      expect(screen.getByText(/Discover our premium selection of herbal products/)).toBeInTheDocument();
    });
  });

  test('displays all 6 featured products', async () => {
    render(<FeaturedProducts />);

    await waitFor(() => {
      expect(screen.getByText('Moringa Powder')).toBeInTheDocument();
      expect(screen.getByText('Ashwagandha Powder')).toBeInTheDocument();
      expect(screen.getByText('Tulsi Powder')).toBeInTheDocument();
      expect(screen.getByText('Amla Powder')).toBeInTheDocument();
      expect(screen.getByText('Neem Powder')).toBeInTheDocument();
      expect(screen.getByText('Spirulina Powder')).toBeInTheDocument();
    });
  });

  test('each product has correct description', async () => {
    render(<FeaturedProducts />);

    await waitFor(() => {
      expect(screen.getByText(/Premium quality moringa leaf powder rich in nutrients/)).toBeInTheDocument();
      expect(screen.getByText(/Pure ashwagandha root powder for stress relief/)).toBeInTheDocument();
      expect(screen.getByText(/Sacred basil powder with immune-boosting properties/)).toBeInTheDocument();
      expect(screen.getByText(/Vitamin C rich amla powder for health and wellness/)).toBeInTheDocument();
      expect(screen.getByText(/Natural neem leaf powder with antibacterial properties/)).toBeInTheDocument();
      expect(screen.getByText(/Nutrient-dense blue-green algae powder superfood/)).toBeInTheDocument();
    });
  });

  test('each product links to correct product detail page', async () => {
    render(<FeaturedProducts />);

    await waitFor(() => {
      const moringaLink = screen.getByRole('link', { name: /Moringa Powder/ });
      const ashwagandhaLink = screen.getByRole('link', { name: /Ashwagandha Powder/ });
      const tulsiLink = screen.getByRole('link', { name: /Tulsi Powder/ });
      const amlaLink = screen.getByRole('link', { name: /Amla Powder/ });
      const neemLink = screen.getByRole('link', { name: /Neem Powder/ });
      const spirulinaLink = screen.getByRole('link', { name: /Spirulina Powder/ });

      expect(moringaLink).toHaveAttribute('href', '/products/moringa-powder');
      expect(ashwagandhaLink).toHaveAttribute('href', '/products/ashwagandha-powder');
      expect(tulsiLink).toHaveAttribute('href', '/products/tulsi-powder');
      expect(amlaLink).toHaveAttribute('href', '/products/amla-powder');
      expect(neemLink).toHaveAttribute('href', '/products/neem-powder');
      expect(spirulinaLink).toHaveAttribute('href', '/products/spirulina-powder');
    });
  });

  test('displays "View All Products" button', async () => {
    render(<FeaturedProducts />);

    await waitFor(() => {
      const viewAllButton = screen.getByRole('link', { name: /View All Products/i });
      expect(viewAllButton).toBeInTheDocument();
      expect(viewAllButton).toHaveAttribute('href', '/products');
      // Note: CSS classes are applied via Tailwind and may not be visible in test environment
    });
  });

  test('uses responsive grid layout', async () => {
    render(<FeaturedProducts />);

    await waitFor(() => {
      const productGrid = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
      expect(productGrid).toBeInTheDocument();
    });
  });

  test('each product card has premium badge', async () => {
    render(<FeaturedProducts />);

    await waitFor(() => {
      const premiumBadges = screen.getAllByText('Premium');
      expect(premiumBadges).toHaveLength(6); // One for each product
      
      premiumBadges.forEach(badge => {
        expect(badge).toHaveClass('bg-primary', 'text-white', 'text-xs', 'px-2', 'py-1', 'rounded-full');
      });
    });
  });

  test('each product has quality indicators', async () => {
    render(<FeaturedProducts />);

    await waitFor(() => {
      const organicBadges = screen.getAllByText('Organic');
      const exportQualityBadges = screen.getAllByText('Export Quality');
      
      expect(organicBadges).toHaveLength(6);
      expect(exportQualityBadges).toHaveLength(6);
    });
  });

  test('each product has "View Details" link with arrow', async () => {
    render(<FeaturedProducts />);

    await waitFor(() => {
      const viewDetailsLinks = screen.getAllByText(/View Details →/);
      expect(viewDetailsLinks).toHaveLength(6);
      
      // Check for arrow icons
      const arrowIcons = document.querySelectorAll('svg path[d*="M9 5l7 7-7 7"]');
      expect(arrowIcons).toHaveLength(6);
    });
  });

  test('has proper section structure and styling', async () => {
    render(<FeaturedProducts />);

    await waitFor(() => {
      const section = document.querySelector('section');
      expect(section).toHaveClass('py-20', 'bg-background');
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('heading-2');
    });
  });

  test('product cards have hover effects', async () => {
    render(<FeaturedProducts />);

    await waitFor(() => {
      const productCards = document.querySelectorAll('.card.hover\\:shadow-xl');
      expect(productCards).toHaveLength(6);
      
      // Check for group hover classes
      const groupElements = document.querySelectorAll('.group');
      expect(groupElements.length).toBeGreaterThanOrEqual(6);
    });
  });

  test('includes herbal emoji placeholder for images', async () => {
    render(<FeaturedProducts />);

    await waitFor(() => {
      const herbalEmojis = screen.getAllByText('🌿');
      expect(herbalEmojis).toHaveLength(6); // One for each product card
    });
  });
});