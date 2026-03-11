/**
 * Design Tokens Types
 * Defines the structure for design system tokens and constants
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
 */

// Color Token Values
export const COLORS = {
  // Primary Brand Colors
  LEAF_GREEN: '#2e7d32',
  NATURAL_GREEN: '#4caf50',
  SOFT_BEIGE: '#f5f7f2',
  
  // Dark Mode Background
  DARK_BACKGROUND: '#0f1a12',
  
  // Light Mode Colors
  LIGHT: {
    primary: '#2e7d32',
    secondary: '#4caf50',
    accent: '#f5f7f2',
    background: '#ffffff',
    foreground: '#1a1a1a',
    muted: '#6b7280',
    border: '#e5e7eb',
    card: '#ffffff',
    cardForeground: '#1a1a1a',
  },
  
  // Dark Mode Colors
  DARK: {
    primary: '#4caf50',
    secondary: '#66bb6a',
    accent: '#2d3748',
    background: '#0f1a12',
    foreground: '#f7fafc',
    muted: '#a0aec0',
    border: '#2d3748',
    card: '#1a202c',
    cardForeground: '#f7fafc',
  }
} as const;

// Typography Tokens
export const FONTS = {
  HEADING: 'Poppins, "Playfair Display", serif',
  BODY: 'Inter, system-ui, sans-serif',
  MONO: 'Monaco, "Cascadia Code", monospace',
} as const;

export const FONT_SIZES = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem',    // 48px
  '6xl': '3.75rem', // 60px
} as const;

export const FONT_WEIGHTS = {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
} as const;

export const LINE_HEIGHTS = {
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
} as const;

// Spacing Tokens
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

// Border Radius Tokens
export const BORDER_RADIUS = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
} as const;

// Shadow Tokens
export const SHADOWS = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
} as const;

// Animation Tokens
export const ANIMATIONS = {
  DURATION: {
    fast: 200,
    normal: 300,
    slow: 500,
    slower: 700,
    slowest: 1000,
  },
  EASING: {
    default: 'ease-in-out',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// Breakpoint Tokens
export const BREAKPOINTS = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1920px',
} as const;

// Z-Index Tokens
export const Z_INDEX = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// Glassmorphism Effect Tokens
export const GLASSMORPHISM = {
  backdrop: 'blur(10px)',
  background: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  shadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
} as const;

// Type definitions for token values
export type ColorToken = keyof typeof COLORS.LIGHT;
export type FontToken = keyof typeof FONTS;
export type FontSizeToken = keyof typeof FONT_SIZES;
export type FontWeightToken = keyof typeof FONT_WEIGHTS;
export type SpacingToken = keyof typeof SPACING;
export type BorderRadiusToken = keyof typeof BORDER_RADIUS;
export type ShadowToken = keyof typeof SHADOWS;
export type BreakpointToken = keyof typeof BREAKPOINTS;
export type ZIndexToken = keyof typeof Z_INDEX;