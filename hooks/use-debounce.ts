/**
 * useDebounce Hook
 * Debounces a value to prevent excessive API calls during real-time search
 * Requirements: 20.4 - Real-time search updates
 */

import { useState, useEffect } from 'react';
import { UseDebounceReturn } from '@/types/hooks';

export function useDebounce<T>(value: T, delay: number): UseDebounceReturn<T> {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isDebouncing, setIsDebouncing] = useState(false);

  useEffect(() => {
    // If the value is the same as the debounced value, don't debounce
    if (value === debouncedValue) {
      setIsDebouncing(false);
      return;
    }

    setIsDebouncing(true);
    
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setIsDebouncing(false);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, debouncedValue]);

  return { debouncedValue, isDebouncing };
}