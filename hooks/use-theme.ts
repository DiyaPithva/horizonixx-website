'use client';

/**
 * Custom Theme Hook
 * Wraps next-themes useTheme with custom types and utilities
 * Requirements: 4.1, 4.2, 4.3, 4.4
 */

import { useTheme as useNextTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import type { ThemeMode } from '@/types/theme';
import type { UseThemeReturn } from '@/types/hooks';

export function useTheme(): UseThemeReturn {
  const { theme, setTheme: setNextTheme, systemTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get the resolved theme (handles system theme)
  const resolvedTheme = (theme === 'system' ? systemTheme : theme) as ThemeMode;
  
  // Use light as fallback during SSR
  const currentTheme: ThemeMode = mounted ? resolvedTheme || 'light' : 'light';

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setNextTheme(newTheme);
  };

  const setTheme = (newTheme: ThemeMode) => {
    setNextTheme(newTheme);
  };

  return {
    theme: currentTheme,
    toggleTheme,
    setTheme,
  };
}