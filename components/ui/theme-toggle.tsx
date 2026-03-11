'use client';

/**
 * Theme Toggle Component
 * Provides a button to toggle between light and dark themes with smooth animations
 * Requirements: 4.1 - Theme toggle control accessible from all pages
 */

import { useTheme } from '@/hooks/use-theme';
import { useEffect, useState } from 'react';
import { ANIMATION_DURATION } from '@/lib/theme-constants';

interface ThemeToggleProps {
  position?: 'header' | 'footer' | 'floating';
  showLabel?: boolean;
  className?: string;
}

export function ThemeToggle({ 
  showLabel = false,
  className = ''
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = async () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    toggleTheme();
    
    // Reset animation state after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, ANIMATION_DURATION.NORMAL);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Support Enter and Space keys for accessibility
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  if (!mounted) {
    // Return a placeholder during SSR
    return (
      <button
        className={`inline-flex items-center justify-center rounded-md p-2 transition-all duration-300 ease-in-out hover:bg-accent/50 ${className}`}
        disabled
        aria-label="Theme toggle loading"
      >
        <div className="h-5 w-5 opacity-50" />
        {showLabel && <span className="ml-2 text-sm opacity-50">Theme</span>}
      </button>
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      disabled={isAnimating}
      className={`
        group relative inline-flex items-center justify-center rounded-md p-2 
        transition-all duration-300 ease-in-out
        hover:bg-accent/50 hover:scale-105 
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      role="switch"
      aria-checked={isDark}
    >
      <div className="relative h-5 w-5">
        {/* Sun Icon */}
        <svg
          className={`
            absolute inset-0 h-5 w-5 text-foreground
            transition-all duration-300 ease-in-out
            ${isDark 
              ? 'rotate-0 scale-100 opacity-100' 
              : 'rotate-90 scale-0 opacity-0'
            }
          `}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>

        {/* Moon Icon */}
        <svg
          className={`
            absolute inset-0 h-5 w-5 text-foreground
            transition-all duration-300 ease-in-out
            ${isDark 
              ? '-rotate-90 scale-0 opacity-0' 
              : 'rotate-0 scale-100 opacity-100'
            }
          `}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </div>

      {showLabel && (
        <span className={`
          ml-2 text-sm font-medium text-foreground
          transition-all duration-300 ease-in-out
          group-hover:text-primary
        `}>
          {isDark ? 'Light' : 'Dark'}
        </span>
      )}

      {/* Subtle glow effect on hover */}
      <div className={`
        absolute inset-0 rounded-md opacity-0 
        transition-opacity duration-300 ease-in-out
        group-hover:opacity-20
        ${isDark 
          ? 'bg-gradient-to-r from-yellow-400 to-orange-400' 
          : 'bg-gradient-to-r from-blue-400 to-purple-400'
        }
      `} />
    </button>
  );
}