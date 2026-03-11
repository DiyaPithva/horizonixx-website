/**
 * Company Stats Section Component Tests
 * Unit tests for the CompanyStats component
 * Requirements: 8.1, 8.2, 8.3, 8.4, 8.5
 */

import { render, screen, waitFor } from '@testing-library/react';
import { CompanyStats } from '@/components/homepage/company-stats';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
}));

// Mock AnimatedCounter component
jest.mock('@/components/ui/animated-counter', () => ({
  AnimatedCounter: ({ end, suffix }: { end: number; suffix: string }) => (
    <span data-testid="animated-counter">{end}{suffix}</span>
  ),
}));

describe('CompanyStats Component', () => {
  test('displays section heading and description', async () => {
    render(<CompanyStats />);

    await waitFor(() => {
      expect(screen.getByText('Our Impact in Numbers')).toBeInTheDocument();
      expect(screen.getByText(/These numbers reflect our commitment to excellence/)).toBeInTheDocument();
    });
  });

  test('displays all 4 statistics with correct values', async () => {
    render(<CompanyStats />);

    await waitFor(() => {
      // Check for Countries Exported stat
      expect(screen.getByText('Countries Exported')).toBeInTheDocument();
      expect(screen.getByText('25+')).toBeInTheDocument();
      expect(screen.getByText('Global reach across continents')).toBeInTheDocument();

      // Check for Product Variants stat
      expect(screen.getByText('Product Variants')).toBeInTheDocument();
      expect(screen.getByText('300+')).toBeInTheDocument();
      expect(screen.getByText('Diverse product portfolio')).toBeInTheDocument();

      // Check for Industrial Clients stat
      expect(screen.getByText('Industrial Clients')).toBeInTheDocument();
      expect(screen.getByText('150+')).toBeInTheDocument();
      expect(screen.getByText('Trusted business partnerships')).toBeInTheDocument();

      // Check for Years Experience stat
      expect(screen.getByText('Years Experience')).toBeInTheDocument();
      expect(screen.getByText('10+')).toBeInTheDocument();
      expect(screen.getByText('Proven industry expertise')).toBeInTheDocument();
    });
  });

  test('displays correct icons for each statistic', async () => {
    render(<CompanyStats />);

    await waitFor(() => {
      expect(screen.getByText('🌍')).toBeInTheDocument(); // Countries
      expect(screen.getByText('🌿')).toBeInTheDocument(); // Products
      expect(screen.getByText('🤝')).toBeInTheDocument(); // Clients
      expect(screen.getByText('⭐')).toBeInTheDocument(); // Experience
    });
  });

  test('uses AnimatedCounter components for all statistics', async () => {
    render(<CompanyStats />);

    await waitFor(() => {
      const animatedCounters = screen.getAllByTestId('animated-counter');
      expect(animatedCounters).toHaveLength(4);
    });
  });

  test('uses responsive grid layout', async () => {
    render(<CompanyStats />);

    await waitFor(() => {
      const statsGrid = document.querySelector('.grid.grid-cols-1.sm\\:grid-cols-2.lg\\:grid-cols-4');
      expect(statsGrid).toBeInTheDocument();
    });
  });

  test('has proper section styling with gradient background', async () => {
    render(<CompanyStats />);

    await waitFor(() => {
      const section = document.querySelector('section');
      expect(section).toHaveClass('py-20', 'bg-gradient-to-br', 'from-primary/5', 'via-background', 'to-secondary/5');
    });
  });

  test('stat cards have hover effects', async () => {
    render(<CompanyStats />);

    await waitFor(() => {
      const statCards = document.querySelectorAll('.card.hover\\:shadow-xl');
      expect(statCards).toHaveLength(4);
      
      // Check for group hover classes
      const groupElements = document.querySelectorAll('.group');
      expect(groupElements.length).toBeGreaterThanOrEqual(4);
    });
  });

  test('displays additional info section with manufacturing details', async () => {
    render(<CompanyStats />);

    await waitFor(() => {
      expect(screen.getByText('Manufacturing Excellence')).toBeInTheDocument();
      expect(screen.getByText('State-of-the-art facilities with quality control')).toBeInTheDocument();
      
      expect(screen.getByText('Logistics Network')).toBeInTheDocument();
      expect(screen.getByText('Efficient supply chain and timely delivery')).toBeInTheDocument();
      
      expect(screen.getByText('Quality Assurance')).toBeInTheDocument();
      expect(screen.getByText('ISO certified processes and documentation')).toBeInTheDocument();
    });
  });

  test('additional info section has proper icons', async () => {
    render(<CompanyStats />);

    await waitFor(() => {
      expect(screen.getByText('🏭')).toBeInTheDocument(); // Manufacturing
      expect(screen.getByText('🚚')).toBeInTheDocument(); // Logistics
      expect(screen.getByText('📋')).toBeInTheDocument(); // Quality
    });
  });

  test('additional info section uses glassmorphism styling', async () => {
    render(<CompanyStats />);

    await waitFor(() => {
      const glassCard = document.querySelector('.card-glass');
      expect(glassCard).toBeInTheDocument();
      expect(glassCard).toHaveClass('max-w-4xl', 'mx-auto', 'p-8');
    });
  });

  test('has proper heading hierarchy', async () => {
    render(<CompanyStats />);

    await waitFor(() => {
      const mainHeading = screen.getByRole('heading', { level: 2 });
      expect(mainHeading).toHaveClass('heading-2');
      
      const subHeadings = screen.getAllByRole('heading', { level: 3 });
      expect(subHeadings.length).toBeGreaterThanOrEqual(4); // Stat labels
      
      const infoHeadings = screen.getAllByRole('heading', { level: 4 });
      expect(infoHeadings).toHaveLength(3); // Additional info headings
    });
  });

  test('stat cards have progress bar animation elements', async () => {
    render(<CompanyStats />);

    await waitFor(() => {
      const progressBars = document.querySelectorAll('.h-1.bg-gradient-to-r.from-primary.to-secondary.rounded-full');
      expect(progressBars).toHaveLength(4); // One for each stat card
    });
  });

  test('counters display with primary color styling', async () => {
    render(<CompanyStats />);

    await waitFor(() => {
      const counterElements = document.querySelectorAll('.heading-1.text-primary.font-bold');
      expect(counterElements).toHaveLength(4);
    });
  });
});