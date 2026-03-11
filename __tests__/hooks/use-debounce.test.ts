/**
 * useDebounce Hook Tests
 * Unit tests for the useDebounce custom hook
 * Requirements: 20.4 - Real-time search updates with debouncing
 */

import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '@/hooks/use-debounce';

// Mock timers
jest.useFakeTimers();

describe('useDebounce Hook', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  test('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));

    expect(result.current.debouncedValue).toBe('initial');
    expect(result.current.isDebouncing).toBe(false);
  });

  test('debounces value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      }
    );

    expect(result.current.debouncedValue).toBe('initial');
    expect(result.current.isDebouncing).toBe(false);

    // Change the value
    rerender({ value: 'updated', delay: 500 });

    // Should be debouncing but value not updated yet
    expect(result.current.debouncedValue).toBe('initial');
    expect(result.current.isDebouncing).toBe(true);

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Value should be updated and no longer debouncing
    expect(result.current.debouncedValue).toBe('updated');
    expect(result.current.isDebouncing).toBe(false);
  });

  test('cancels previous timeout on rapid changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      }
    );

    // First change
    rerender({ value: 'first', delay: 500 });
    expect(result.current.isDebouncing).toBe(true);

    // Advance time partially
    act(() => {
      jest.advanceTimersByTime(250);
    });

    // Second change before first completes
    rerender({ value: 'second', delay: 500 });
    expect(result.current.isDebouncing).toBe(true);

    // Advance remaining time from first change
    act(() => {
      jest.advanceTimersByTime(250);
    });

    // Should still be debouncing (first timeout was cancelled)
    expect(result.current.debouncedValue).toBe('initial');
    expect(result.current.isDebouncing).toBe(true);

    // Advance full delay for second change
    act(() => {
      jest.advanceTimersByTime(250);
    });

    // Now should have the second value
    expect(result.current.debouncedValue).toBe('second');
    expect(result.current.isDebouncing).toBe(false);
  });

  test('handles different delay values', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 100 },
      }
    );

    rerender({ value: 'updated', delay: 100 });
    expect(result.current.isDebouncing).toBe(true);

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current.debouncedValue).toBe('updated');
    expect(result.current.isDebouncing).toBe(false);
  });

  test('handles zero delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 0 },
      }
    );

    rerender({ value: 'updated', delay: 0 });
    expect(result.current.isDebouncing).toBe(true);

    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(result.current.debouncedValue).toBe('updated');
    expect(result.current.isDebouncing).toBe(false);
  });

  test('works with different value types', () => {
    // Test with numbers
    const { result: numberResult, rerender: numberRerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 0, delay: 100 },
      }
    );

    numberRerender({ value: 42, delay: 100 });
    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(numberResult.current.debouncedValue).toBe(42);

    // Test with objects
    const { result: objectResult, rerender: objectRerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: { id: 1 }, delay: 100 },
      }
    );

    const newObject = { id: 2 };
    objectRerender({ value: newObject, delay: 100 });
    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(objectResult.current.debouncedValue).toBe(newObject);
  });
});