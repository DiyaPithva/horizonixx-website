/**
 * Product Data Model Types
 * Defines the structure for products, categories, and related data
 * Requirements: 2.1, 2.4, 11.2, 11.3, 11.4, 11.5, 11.6
 */

export type ProductCategory = 
  | 'herbal-powders'
  | 'cosmetic-powders'
  | 'spices'
  | 'dehydrated-powders'
  | 'healthcare-equipment';

export interface ProductSpecification {
  meshSize?: string;
  moisture?: string;
  color?: string;
  [key: string]: string | undefined;
}

export interface ProductImage {
  url: string;
  alt: string;
  width: number;
  height: number;
  isPrimary: boolean;
}

export interface PackingInfo {
  options: string[]; // e.g., ["10kg HDPE bags", "25kg HDPE bags"]
  customAvailable: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  subcategory?: string;
  description: string;
  shortDescription: string;
  
  // Specifications
  specifications: ProductSpecification;
  
  // Benefits and features
  benefits: string[];
  features?: string[];
  
  // Packaging information
  packing: PackingInfo;
  
  // Media
  images: ProductImage[];
  primaryImage: string;
  
  // Metadata
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  
  // CMS metadata
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  
  // Future e-commerce fields (not displayed yet)
  sku?: string;
  price?: number;
  currency?: string;
  moq?: number; // Minimum Order Quantity
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon?: string;
  image?: string;
  parentCategory?: string;
  order: number;
  seoTitle?: string;
  seoDescription?: string;
  productCount?: number;
}

export interface FilterOptions {
  category?: string;
  sortBy?: 'name' | 'category';
}

export interface QueryOptions {
  category?: string;
  limit?: number;
  offset?: number;
  search?: string;
}