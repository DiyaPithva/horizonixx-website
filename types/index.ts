/**
 * Type Definitions Index
 * Central export point for all TypeScript type definitions
 * Requirements: 3.1, 3.2, 3.3, 3.4
 */

// Theme and Design System Types
export * from './theme';
export * from './design-tokens';

// Product and Category Types
export * from './product';

// Content Types (Testimonials, Certifications, etc.)
export * from './content';

// Component Props Types
export * from './components';

// API and CMS Types
export * from './api';

// Custom Hook Types
export * from './hooks';

// SEO and Metadata Types
export * from './seo';

// Analytics and Tracking Types
export * from './analytics';

// Utility Types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type ID = string;
export type Timestamp = Date;
export type URL = string;
export type Email = string;
export type PhoneNumber = string;

// Generic Response Types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface LoadingState {
  loading: boolean;
  error: Error | null;
}

export interface AsyncState<T> extends LoadingState {
  data: T | null;
}

// Form Types
export interface FormState {
  isSubmitting: boolean;
  isValid: boolean;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}

// Common Props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  'data-testid'?: string;
}

// Animation Types
export type AnimationType = 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate';
export type EasingFunction = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | string;

// Responsive Breakpoints
export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'wide';

// Status Types
export type Status = 'idle' | 'loading' | 'success' | 'error';
export type PublishStatus = 'draft' | 'published' | 'archived';

// Sort and Filter Types
export type SortOrder = 'asc' | 'desc';
export type SortField = 'name' | 'date' | 'category' | 'order';

export interface SortOptions {
  field: SortField;
  order: SortOrder;
}

// Environment Types
export type Environment = 'development' | 'staging' | 'production';

// Feature Flags
export interface FeatureFlags {
  enableDarkMode: boolean;
  enableAnimations: boolean;
  enableAnalytics: boolean;
  enableCMS: boolean;
  enableSearch: boolean;
}