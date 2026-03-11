/**
 * Theme Configuration
 * Defines light and dark mode color palettes and theme settings
 * Requirements: 3.1, 3.2, 3.3, 3.4
 */

import { ThemeConfig } from '@/types/theme';

export const themeConfig: ThemeConfig = {
  colors: {
    light: {
      primary: '#2e7d32',      // Leaf Green
      secondary: '#4caf50',    // Natural Green
      accent: '#f5f7f2',       // Soft Beige
      background: '#ffffff',   // White background
      foreground: '#1a1a1a',   // Dark text
      muted: '#6b7280',        // Gray-500
      border: '#e5e7eb',       // Gray-200
      card: '#ffffff',         // White card background
      cardForeground: '#1a1a1a', // Dark card text
    },
    dark: {
      primary: '#4caf50',      // Natural Green (brighter for dark mode)
      secondary: '#66bb6a',    // Light Green
      accent: '#2d3748',       // Dark gray accent
      background: '#0f1a12',   // Dark green background
      foreground: '#f7fafc',   // Light text
      muted: '#a0aec0',        // Gray-400
      border: '#2d3748',       // Dark border
      card: '#1a202c',         // Dark card background
      cardForeground: '#f7fafc', // Light card text
    },
  },
  fonts: {
    heading: 'Poppins, "Playfair Display", serif',
    body: 'Inter, system-ui, sans-serif',
  },
  animations: {
    duration: {
      fast: 200,
      normal: 300,
      slow: 500,
    },
    easing: {
      default: 'ease-in-out',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
};

/**
 * CSS Custom Properties for dynamic theming
 * These will be applied to the :root element based on the current theme
 */
export const cssVariables = {
  light: {
    '--color-primary': themeConfig.colors.light.primary,
    '--color-secondary': themeConfig.colors.light.secondary,
    '--color-accent': themeConfig.colors.light.accent,
    '--color-background': themeConfig.colors.light.background,
    '--color-foreground': themeConfig.colors.light.foreground,
    '--color-muted': themeConfig.colors.light.muted,
    '--color-border': themeConfig.colors.light.border,
    '--color-card': themeConfig.colors.light.card,
    '--color-card-foreground': themeConfig.colors.light.cardForeground,
  },
  dark: {
    '--color-primary': themeConfig.colors.dark.primary,
    '--color-secondary': themeConfig.colors.dark.secondary,
    '--color-accent': themeConfig.colors.dark.accent,
    '--color-background': themeConfig.colors.dark.background,
    '--color-foreground': themeConfig.colors.dark.foreground,
    '--color-muted': themeConfig.colors.dark.muted,
    '--color-border': themeConfig.colors.dark.border,
    '--color-card': themeConfig.colors.dark.card,
    '--color-card-foreground': themeConfig.colors.dark.cardForeground,
  },
};

/**
 * Glassmorphism effect configuration
 * Requirements: 3.8
 */
export const glassmorphism = {
  backdrop: 'blur(10px)',
  background: 'rgba(255, 255, 255, 0.1)',
  backgroundDark: 'rgba(0, 0, 0, 0.2)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderDark: '1px solid rgba(255, 255, 255, 0.1)',
  shadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  shadowDark: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
};

export default themeConfig;