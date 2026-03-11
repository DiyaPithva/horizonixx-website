/**
 * Custom Hook Types
 * Defines the return types for custom React hooks
 * Requirements: Various hook implementations
 */

import { Product } from './product';
import { ThemeMode } from './theme';

// Theme Hook
export interface UseThemeReturn {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

// Scroll Animation Hook
export interface UseScrollAnimationReturn {
  ref: React.RefObject<HTMLElement>;
  isVisible: boolean;
  hasAnimated: boolean;
}

// Counter Hook
export interface UseCounterOptions {
  end: number;
  duration: number;
  start?: number;
  trigger?: boolean;
}

export interface UseCounterReturn {
  count: number;
  reset: () => void;
}

// Products Hook
export interface UseProductsOptions {
  category?: string;
  search?: string;
}

export interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

// Search Hook
export interface UseSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  results: Product[];
  loading: boolean;
  error: Error | null;
}

// Local Storage Hook
export interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: T) => void;
  removeValue: () => void;
}

// Debounce Hook
export interface UseDebounceReturn<T> {
  debouncedValue: T;
  isDebouncing: boolean;
}