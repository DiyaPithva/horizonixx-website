/**
 * API and CMS Interface Types
 * Defines the structure for API routes and CMS client interfaces
 * Requirements: 16.1, 16.2, 20.1, 20.2
 */

import { Product, Category, QueryOptions } from './product';
import { Testimonial, Certification } from './content';
import { ContactFormData } from './components';

// CMS Client Interface
export interface CMSClient {
  getProducts(options?: QueryOptions): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getCategories(): Promise<Category[]>;
  getTestimonials(): Promise<Testimonial[]>;
  getCertifications(): Promise<Certification[]>;
}

// API Route Request/Response Types
export interface ProductsAPIRequest {
  category?: string;
  search?: string;
  limit?: number;
}

export interface ProductsAPIResponse {
  products: Product[];
  total: number;
  page: number;
}

export interface ContactAPIRequest {
  formData: ContactFormData;
}

export interface ContactAPIResponse {
  success: boolean;
  message: string;
  error?: string;
}

export interface SearchAPIRequest {
  query: string;
  limit?: number;
}

export interface SearchAPIResponse {
  results: Product[];
  suggestions: string[];
}

// Generic API Response
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Error Response
export interface APIError {
  success: false;
  error: string;
  code: string;
  statusCode?: number;
}