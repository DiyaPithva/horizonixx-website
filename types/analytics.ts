/**
 * Analytics and Tracking Types
 * Defines the structure for analytics events and tracking
 * Requirements: 17.1
 */

export interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
  timestamp: Date;
}

// Specific event types
export type ProductViewEvent = AnalyticsEvent & {
  category: 'Product';
  action: 'View';
  label: string; // product name
};

export type ContactFormEvent = AnalyticsEvent & {
  category: 'Contact';
  action: 'Submit' | 'Error';
  label?: string; // error message if applicable
};

export type SearchEvent = AnalyticsEvent & {
  category: 'Search';
  action: 'Query';
  label: string; // search query
};

export type NavigationEvent = AnalyticsEvent & {
  category: 'Navigation';
  action: 'Click';
  label: string; // destination page
};

export type ThemeEvent = AnalyticsEvent & {
  category: 'Theme';
  action: 'Toggle';
  label: 'light' | 'dark';
};

export type DownloadEvent = AnalyticsEvent & {
  category: 'Download';
  action: 'Click';
  label: string; // file name or type
};

// Google Analytics 4 Event Parameters
export interface GA4EventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

// Web Vitals
export interface WebVitalsMetric {
  name: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

// Performance Metrics
export interface PerformanceMetrics {
  pageLoadTime: number;
  domContentLoaded: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}