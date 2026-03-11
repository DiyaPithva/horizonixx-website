/**
 * Theme Configuration Types
 * Defines the structure for theme colors, fonts, and animations
 * Requirements: 3.1, 3.2, 3.3, 3.4
 */

export interface ThemeConfig {
  colors: {
    light: ColorPalette;
    dark: ColorPalette;
  };
  fonts: FontConfig;
  animations: AnimationConfig;
}

export interface ColorPalette {
  primary: string;      // #2e7d32 (Leaf Green)
  secondary: string;    // #4caf50 (Natural Green)
  accent: string;       // #f5f7f2 (Soft Beige)
  background: string;   // Light: #ffffff, Dark: #0f1a12
  foreground: string;   // Text color
  muted: string;        // Muted text/elements
  border: string;       // Border color
  card: string;         // Card background
  cardForeground: string; // Card text color
}

export interface FontConfig {
  heading: string;  // 'Poppins' or 'Playfair Display'
  body: string;     // 'Inter'
}

export interface AnimationConfig {
  duration: {
    fast: number;    // 200ms
    normal: number;  // 300ms
    slow: number;    // 500ms
  };
  easing: {
    default: string;  // 'ease-in-out'
    spring: string;   // 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  };
}

export type ThemeMode = 'light' | 'dark';