'use client';

/**
 * Theme Provider Component
 * Provides theme context using next-themes with localStorage persistence
 * Requirements: 4.1, 4.2, 4.3, 4.4
 */

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useEffect, useState } from 'react';

interface CustomThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: CustomThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return children without theme provider during SSR
    return <>{children}</>;
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={true}
      disableTransitionOnChange={false}
      storageKey="horizonixx-theme"
      themes={['light', 'dark']}
    >
      {children}
    </NextThemesProvider>
  );
}