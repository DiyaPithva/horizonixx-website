/**
 * CertificationCard Component Tests
 * Unit tests for the CertificationCard component
 * Requirements: 13.1, 13.2, 13.3, 13.4
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CertificationCard } from '@/components/ui/certification-card';
import { Certification } from '@/types/content';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, fill, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

const mockCertification: Certification = {
  id: '1',
  name: 'ISO 9001:2015',
  issuer: 'International Organization for Standardization',
  scope: 'Import, Export and Repacking of Ayurvedic & Herbal Products, Cosmetic Product Spray, Dried Fruits & Vegetable Products, Spices and Food Products',
  description: 'Quality Management System certification',
  image: '/certifications/iso-9001.png',
  certificationNumber: 'ISO-9001-2015-001',
  issueDate: new Date('2023-01-15'),
  order: 1,
  published: true,
};

describe('CertificationCard', () => {
  describe('Card Variant', () => {
    it('renders certification information correctly', () => {
      render(<CertificationCard certification={mockCertification} variant="card" />);
      
      expect(screen.getByTestId('certification-card')).toBeInTheDocument();
      expect(screen.getByTestId('certification-name')).toHaveTextContent('ISO 9001:2015');
      expect(screen.getByTestId('certification-issuer')).toHaveTextContent('Issued by International Organization for Standardization');
      expect(screen.getByTestId('certification-scope')).toHaveTextContent(mockCertification.scope);
      expect(screen.getByTestId('certification-image')).toHaveAttribute('alt', 'ISO 9001:2015 certification');
    });

    it('displays certification number when provided', () => {
      render(<CertificationCard certification={mockCertification} variant="card" />);
      
      expect(screen.getByText('Cert. No: ISO-9001-2015-001')).toBeInTheDocument();
    });

    it('displays issue date when provided', () => {
      render(<CertificationCard certification={mockCertification} variant="card" />);
      
      expect(screen.getByText(/Issued: 15\/1\/2023/)).toBeInTheDocument();
    });

    it('does not display certification number when not provided', () => {
      const certWithoutNumber = { ...mockCertification, certificationNumber: undefined };
      render(<CertificationCard certification={certWithoutNumber} variant="card" />);
      
      expect(screen.queryByText(/Cert. No:/)).not.toBeInTheDocument();
    });

    it('does not display issue date when not provided', () => {
      const certWithoutDate = { ...mockCertification, issueDate: undefined };
      render(<CertificationCard certification={certWithoutDate} variant="card" />);
      
      expect(screen.queryByText(/Issued:/)).not.toBeInTheDocument();
    });
  });

  describe('Badge Variant', () => {
    it('renders certification information in compact format', () => {
      render(<CertificationCard certification={mockCertification} variant="badge" />);
      
      expect(screen.getByTestId('certification-card')).toBeInTheDocument();
      expect(screen.getByTestId('certification-name')).toHaveTextContent('ISO 9001:2015');
      expect(screen.getByTestId('certification-issuer')).toHaveTextContent('Issued by International Organization for Standardization');
      expect(screen.getByTestId('certification-image')).toHaveAttribute('alt', 'ISO 9001:2015 certification');
    });

    it('truncates long scope text', () => {
      const longScopeCert = {
        ...mockCertification,
        scope: 'This is a very long scope description that should be truncated in badge variant because it exceeds the 50 character limit'
      };
      
      render(<CertificationCard certification={longScopeCert} variant="badge" />);
      
      const scopeElement = screen.getByTestId('certification-scope');
      expect(scopeElement.textContent).toMatch(/\.\.\.$/);
      expect(scopeElement.textContent!.length).toBeLessThanOrEqual(53); // 50 chars + "..."
    });

    it('does not display certification number in badge variant', () => {
      render(<CertificationCard certification={mockCertification} variant="badge" />);
      
      expect(screen.queryByText(/Cert. No:/)).not.toBeInTheDocument();
    });

    it('does not display issue date in badge variant', () => {
      render(<CertificationCard certification={mockCertification} variant="badge" />);
      
      expect(screen.queryByText(/Issued:/)).not.toBeInTheDocument();
    });

    it('shows full scope for short text', () => {
      const shortScopeCert = {
        ...mockCertification,
        scope: 'Short scope'
      };
      
      render(<CertificationCard certification={shortScopeCert} variant="badge" />);
      
      expect(screen.getByTestId('certification-scope')).toHaveTextContent('Short scope');
    });
  });

  describe('Default Props', () => {
    it('defaults to card variant when variant is not specified', () => {
      render(<CertificationCard certification={mockCertification} />);
      
      // Card variant should show certification number and issue date
      expect(screen.getByText('Cert. No: ISO-9001-2015-001')).toBeInTheDocument();
      expect(screen.getByText(/Issued: 15\/1\/2023/)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper image alt text', () => {
      render(<CertificationCard certification={mockCertification} variant="card" />);
      
      const image = screen.getByTestId('certification-image');
      expect(image).toHaveAttribute('alt', 'ISO 9001:2015 certification');
    });

    it('uses semantic heading for certification name', () => {
      render(<CertificationCard certification={mockCertification} variant="card" />);
      
      const heading = screen.getByTestId('certification-name');
      expect(heading.tagName).toBe('H3');
    });
  });

  describe('Styling', () => {
    it('applies glassmorphism styling classes', () => {
      render(<CertificationCard certification={mockCertification} variant="card" />);
      
      const card = screen.getByTestId('certification-card');
      expect(card).toHaveClass('backdrop-blur-md');
      expect(card).toHaveClass('bg-white/10');
      expect(card).toHaveClass('border-white/20');
    });

    it('applies hover effects', () => {
      render(<CertificationCard certification={mockCertification} variant="card" />);
      
      const card = screen.getByTestId('certification-card');
      expect(card).toHaveClass('hover:scale-105');
      expect(card).toHaveClass('hover:shadow-xl');
    });

    it('applies different sizing for card vs badge variants', () => {
      const { rerender } = render(<CertificationCard certification={mockCertification} variant="card" />);
      
      let card = screen.getByTestId('certification-card');
      expect(card).toHaveClass('min-h-[280px]');
      expect(card).toHaveClass('max-w-sm');
      
      rerender(<CertificationCard certification={mockCertification} variant="badge" />);
      
      card = screen.getByTestId('certification-card');
      expect(card).toHaveClass('min-h-[160px]');
      expect(card).toHaveClass('max-w-xs');
    });
  });
});