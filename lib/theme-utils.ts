/**
 * Theme Utility Functions
 * Helper functions for theme management and CSS variable application
 * Requirements: 3.1, 3.2, 3.3, 3.4, 4.1, 4.2, 4.3, 4.4
 */

import { ThemeMode } from '@/types/theme';
import { cssVariables } from './theme.config';

/**
 * Apply CSS custom properties to the document root
 * @param theme - The theme mode to apply
 */
export function applyThemeVariables(theme: ThemeMode): void {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  const variables = cssVariables[theme];
  
  Object.entries(variables).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
}

/**
 * Get the current theme from localStorage or system preference
 * @returns The current theme mode
 */
export function getCurrentTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  
  // Check localStorage first
  const stored = localStorage.getItem('theme') as ThemeMode | null;
  if (stored && (stored === 'light' || stored === 'dark')) {
    return stored;
  }
  
  // Fall back to system preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  return 'light';
}

/**
 * Save theme preference to localStorage
 * @param theme - The theme mode to save
 */
export function saveThemePreference(theme: ThemeMode): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('theme', theme);
}

/**
 * Toggle between light and dark themes
 * @param currentTheme - The current theme mode
 * @returns The new theme mode
 */
export function toggleTheme(currentTheme: ThemeMode): ThemeMode {
  return currentTheme === 'light' ? 'dark' : 'light';
}

/**
 * Apply theme class to document element
 * @param theme - The theme mode to apply
 */
export function applyThemeClass(theme: ThemeMode): void {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

/**
 * Initialize theme on page load
 * This should be called as early as possible to prevent flash of wrong theme
 */
export function initializeTheme(): void {
  if (typeof document === 'undefined') return;
  
  const theme = getCurrentTheme();
  applyThemeClass(theme);
  applyThemeVariables(theme);
}

/**
 * Listen for system theme changes
 * @param callback - Function to call when system theme changes
 * @returns Cleanup function to remove the listener
 */
export function listenForSystemThemeChanges(
  callback: (theme: ThemeMode) => void
): () => void {
  if (typeof window === 'undefined') return () => {};
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handleChange = (e: MediaQueryListEvent) => {
    // Only update if no theme is stored in localStorage
    const stored = localStorage.getItem('theme');
    if (!stored) {
      const newTheme = e.matches ? 'dark' : 'light';
      callback(newTheme);
    }
  };
  
  mediaQuery.addEventListener('change', handleChange);
  
  return () => {
    mediaQuery.removeEventListener('change', handleChange);
  };
}

/**
 * Get CSS variable value for the current theme
 * @param variableName - The CSS variable name (without --)
 * @returns The CSS variable value
 */
export function getCSSVariable(variableName: string): string {
  if (typeof document === 'undefined') return '';
  
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--${variableName}`)
    .trim();
}

/**
 * Check if the current theme is dark
 * @returns True if the current theme is dark
 */
export function isDarkTheme(): boolean {
  if (typeof document === 'undefined') return false;
  return document.documentElement.classList.contains('dark');
}

/**
 * Get theme-appropriate glassmorphism styles
 * @param theme - The current theme mode
 * @returns CSS properties for glassmorphism effect
 */
export function getGlassmorphismStyles(theme: ThemeMode) {
  const isDark = theme === 'dark';
  
  return {
    background: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: isDark 
      ? '1px solid rgba(255, 255, 255, 0.1)' 
      : '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: isDark 
      ? '0 8px 32px 0 rgba(0, 0, 0, 0.5)' 
      : '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  };
}