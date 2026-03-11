/**
 * useTheme Hook Tests
 * Tests for custom theme hook functionality
 * Requirements: 4.1, 4.2, 4.3, 4.4
 */

import { renderHook, act } from '@testing-library/react';
import { useTheme } from '@/hooks/use-theme';

// Mock next-themes
const mockSetTheme = jest.fn();
const mockUseNextTheme = {
  theme: 'light',
  setTheme: mockSetTheme,
  systemTheme: 'light',
};

jest.mock('next-themes', () => ({
  useTheme: () => mockUseNextTheme,
}));

describe('useTheme Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset the mock theme
    mockUseNextTheme.theme = 'light';
    mockUseNextTheme.systemTheme = 'light';
  });

  test('returns current theme correctly', () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe('light');
  });

  test('toggles theme from light to dark', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggleTheme();
    });

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  test('toggles theme from dark to light', () => {
    mockUseNextTheme.theme = 'dark';
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggleTheme();
    });

    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  test('sets specific theme', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.setTheme('dark');
    });

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  test('handles system theme correctly', () => {
    mockUseNextTheme.theme = 'system';
    mockUseNextTheme.systemTheme = 'dark';
    
    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe('dark');
  });

  test('falls back to light theme when theme is undefined', () => {
    mockUseNextTheme.theme = undefined;
    mockUseNextTheme.systemTheme = undefined;
    
    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe('light');
  });

  test('provides all required hook methods', () => {
    const { result } = renderHook(() => useTheme());

    expect(typeof result.current.theme).toBe('string');
    expect(typeof result.current.toggleTheme).toBe('function');
    expect(typeof result.current.setTheme).toBe('function');
  });
});