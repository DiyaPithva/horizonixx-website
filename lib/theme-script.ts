/**
 * Theme Initialization Script
 * This script runs immediately to prevent flash of unstyled content (FOUC)
 * Requirements: 4.1, 4.2, 4.3, 4.4
 */

/**
 * Inline script to initialize theme before React hydration
 * This prevents flash of wrong theme on page load
 */
export const themeInitScript = `
(function() {
  function getStoredTheme() {
    try {
      return localStorage.getItem('theme');
    } catch (e) {
      return null;
    }
  }
  
  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  function applyTheme(theme) {
    const root = document.documentElement;
    
    // Apply theme class
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Apply CSS custom properties
    const variables = theme === 'dark' ? {
      '--color-primary': '#4caf50',
      '--color-secondary': '#66bb6a',
      '--color-accent': '#2d3748',
      '--color-background': '#0f1a12',
      '--color-foreground': '#f7fafc',
      '--color-muted': '#a0aec0',
      '--color-border': '#2d3748',
      '--color-card': '#1a202c',
      '--color-card-foreground': '#f7fafc',
      '--glass-background': 'rgba(0, 0, 0, 0.2)',
      '--glass-border': 'rgba(255, 255, 255, 0.1)',
      '--glass-shadow': '0 8px 32px 0 rgba(0, 0, 0, 0.5)'
    } : {
      '--color-primary': '#2e7d32',
      '--color-secondary': '#4caf50',
      '--color-accent': '#f5f7f2',
      '--color-background': '#ffffff',
      '--color-foreground': '#1a1a1a',
      '--color-muted': '#6b7280',
      '--color-border': '#e5e7eb',
      '--color-card': '#ffffff',
      '--color-card-foreground': '#1a1a1a',
      '--glass-background': 'rgba(255, 255, 255, 0.1)',
      '--glass-border': 'rgba(255, 255, 255, 0.2)',
      '--glass-shadow': '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
    };
    
    Object.entries(variables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
    
    // Update legacy variables for compatibility
    root.style.setProperty('--background', variables['--color-background']);
    root.style.setProperty('--foreground', variables['--color-foreground']);
  }
  
  // Get theme preference
  const storedTheme = getStoredTheme();
  const theme = storedTheme || getSystemTheme();
  
  // Apply theme immediately
  applyTheme(theme);
  
  // Store the theme if it wasn't already stored
  if (!storedTheme) {
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      // Ignore localStorage errors
    }
  }
})();
`;

export default themeInitScript;