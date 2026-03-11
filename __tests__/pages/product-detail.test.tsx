/**
 * Product Detail Page Tests
 * Tests for the dynamic product detail page functionality
 */

import { render, screen } from '@testing-library/react';
import { ProductDetail } from '@/components/product';
import { Product } from '@/types/product';

// Mock product data for testing
const mockProduct: Product = {
  id: '1',
  slug: 'test-product',
  name: 'Test Product',
  category: 'herbal-powders',
  description: 'This is a detailed description of the test product with comprehensive information about its properties and uses.',
  shortDescription: 'A test product for unit testing',
  specifications: {
    meshSize: '80-100',
    moisture: '5%',
    color: 'Green'
  },
  benefits: [
    'Rich in vitamins',
    'High in antioxidants',
    'Boosts immunity'
  ],
  packing: {
    options: ['10kg HDPE bags', '25kg HDPE bags'],
    customAvailable: true
  },
  images: [],
  primaryImage: '/images/test-product.jpg',
  keywords: ['test', 'product'],
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-15'),
  published: true,
};

describe('ProductDetail Component', () => {
  test('displays product name', () => {
    render(<ProductDetail product={mockProduct} />);
    
    expect(screen.getByTestId('product-name')).toHaveTextContent('Test Product');
  });

  test('displays product description', () => {
    render(<ProductDetail product={mockProduct} />);
    
    expect(screen.getByTestId('product-description')).toHaveTextContent('A test product for unit testing');
  });

  test('displays product specifications', () => {
    render(<ProductDetail product={mockProduct} />);
    
    const specificationsSection = screen.getByTestId('product-specifications');
    expect(specificationsSection).toBeInTheDocument();
    expect(specificationsSection).toHaveTextContent('80-100');
    expect(specificationsSection).toHaveTextContent('5%');
    expect(specificationsSection).toHaveTextContent('Green');
  });

  test('displays product benefits', () => {
    render(<ProductDetail product={mockProduct} />);
    
    const benefitsSection = screen.getByTestId('product-benefits');
    expect(benefitsSection).toBeInTheDocument();
    expect(benefitsSection).toHaveTextContent('Rich in vitamins');
    expect(benefitsSection).toHaveTextContent('High in antioxidants');
    expect(benefitsSection).toHaveTextContent('Boosts immunity');
  });

  test('displays packing information', () => {
    render(<ProductDetail product={mockProduct} />);
    
    const packingSection = screen.getByTestId('product-packing');
    expect(packingSection).toBeInTheDocument();
    expect(packingSection).toHaveTextContent('10kg HDPE bags');
    expect(packingSection).toHaveTextContent('25kg HDPE bags');
    expect(packingSection).toHaveTextContent('Custom packing available on request');
  });

  test('displays product image placeholder when no image provided', () => {
    const productWithoutImage = { ...mockProduct, primaryImage: '' };
    render(<ProductDetail product={productWithoutImage} />);
    
    // Check that the placeholder content is displayed in the image area
    const placeholderText = screen.getAllByText('Test Product')[0]; // Get the first one (in the image placeholder)
    expect(placeholderText).toBeInTheDocument();
    expect(placeholderText).toHaveClass('text-sm', 'text-muted');
  });

  test('displays category badge', () => {
    render(<ProductDetail product={mockProduct} />);
    
    expect(screen.getByText('Herbal Products')).toBeInTheDocument();
  });

  test('displays contact buttons', () => {
    render(<ProductDetail product={mockProduct} />);
    
    expect(screen.getByText('Get Quote')).toBeInTheDocument();
    expect(screen.getByText('WhatsApp')).toBeInTheDocument();
  });
});