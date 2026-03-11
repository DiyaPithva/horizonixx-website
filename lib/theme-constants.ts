/**
 * Theme Constants
 * Centralized theme values and constants for easy access
 * Requirements: 3.1, 3.2, 3.3, 3.4
 */

// Brand Colors (Requirements: 3.1, 3.2, 3.3)
export const BRAND_COLORS = {
  LEAF_GREEN: '#2e7d32',      // Primary color
  NATURAL_GREEN: '#4caf50',   // Secondary color  
  SOFT_BEIGE: '#f5f7f2',      // Accent color
  DARK_BACKGROUND: '#0f1a12', // Dark mode background
} as const;

// Light Theme Palette
export const LIGHT_THEME = {
  primary: BRAND_COLORS.LEAF_GREEN,
  secondary: BRAND_COLORS.NATURAL_GREEN,
  accent: BRAND_COLORS.SOFT_BEIGE,
  background: '#ffffff',
  foreground: '#1a1a1a',
  muted: '#6b7280',
  border: '#e5e7eb',
  card: '#ffffff',
  cardForeground: '#1a1a1a',
} as const;

// Dark Theme Palette (Requirements: 3.4)
export const DARK_THEME = {
  primary: BRAND_COLORS.NATURAL_GREEN,  // Brighter for dark mode
  secondary: '#66bb6a',                 // Light green
  accent: '#2d3748',                    // Dark gray accent
  background: BRAND_COLORS.DARK_BACKGROUND,
  foreground: '#f7fafc',
  muted: '#a0aec0',
  border: '#2d3748',
  card: '#1a202c',
  cardForeground: '#f7fafc',
} as const;

// Typography (Requirements: 3.5, 3.6)
export const FONTS = {
  HEADING: 'Poppins, "Playfair Display", serif',
  BODY: 'Inter, system-ui, sans-serif',
} as const;

// Animation Durations
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Animation Easings
export const ANIMATION_EASING = {
  DEFAULT: 'ease-in-out',
  SPRING: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  EASE_IN: 'cubic-bezier(0.4, 0, 1, 1)',
  EASE_OUT: 'cubic-bezier(0, 0, 0.2, 1)',
  EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// Glassmorphism Effects (Requirements: 3.8)
export const GLASSMORPHISM = {
  BACKDROP_BLUR: 'blur(10px)',
  LIGHT: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    shadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  },
  DARK: {
    background: 'rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    shadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
  },
} as const;

// Breakpoints
export const BREAKPOINTS = {
  MOBILE: 320,
  TABLET: 768,
  DESKTOP: 1024,
  WIDE: 1920,
} as const;

// Z-Index Scale
export const Z_INDEX = {
  HIDE: -1,
  AUTO: 'auto',
  BASE: 0,
  DOCKED: 10,
  DROPDOWN: 1000,
  STICKY: 1100,
  BANNER: 1200,
  OVERLAY: 1300,
  MODAL: 1400,
  POPOVER: 1500,
  SKIP_LINK: 1600,
  TOAST: 1700,
  TOOLTIP: 1800,
} as const;

// Spacing Scale
export const SPACING = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
} as const;

// Border Radius Scale
export const BORDER_RADIUS = {
  NONE: '0',
  SM: '0.125rem',   // 2px
  BASE: '0.25rem',  // 4px
  MD: '0.375rem',   // 6px
  LG: '0.5rem',     // 8px
  XL: '0.75rem',    // 12px
  '2XL': '1rem',    // 16px
  '3XL': '1.5rem',  // 24px
  FULL: '9999px',
} as const;

// Shadow Scale
export const SHADOWS = {
  SM: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  BASE: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  MD: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  LG: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  XL: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2XL': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  INNER: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  GLASS: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  GLASS_DARK: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
  SOFT: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
} as const;

const themeConstants = {
  BRAND_COLORS,
  LIGHT_THEME,
  DARK_THEME,
  FONTS,
  ANIMATION_DURATION,
  ANIMATION_EASING,
  GLASSMORPHISM,
  BREAKPOINTS,
  Z_INDEX,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
};

export default themeConstants;