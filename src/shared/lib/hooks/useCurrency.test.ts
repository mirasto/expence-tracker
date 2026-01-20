import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCurrency } from './useCurrency';
import * as redux from '@/app/providers/store/store';


vi.mock('@/app/providers/store/store', () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn(),
}));

describe('useCurrency', () => {
  const mockSelector = redux.useAppSelector as any;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should format currency correctly without conversion when currency matches', () => {
    mockSelector.mockReturnValue({
      currency: 'USD',
      exchangeRates: {},
    });

    const { result } = renderHook(() => useCurrency());
    
    expect(result.current.format(100, 'USD')).toBe('$100.00');
  });

  it('should format currency correctly with fallback when no rates available', () => {
    mockSelector.mockReturnValue({
      currency: 'EUR',
      exchangeRates: {},
    });

    const { result } = renderHook(() => useCurrency());
    
    
    expect(result.current.format(100, 'USD')).toBe('$100.00');
  });

  it('should convert and format currency correctly when rates exist', () => {
    mockSelector.mockReturnValue({
      currency: 'EUR',
      exchangeRates: {
        'USD': 1.2, 
        'EUR': 1,
      },
    });

    const { result } = renderHook(() => useCurrency());
    
    
    
    
    
    expect(result.current.format(120, 'USD')).toBe('€100.00');
  });

  it('should handle zero values correctly', () => {
    mockSelector.mockReturnValue({
      currency: 'EUR',
      exchangeRates: { 'USD': 1.2 },
    });

    const { result } = renderHook(() => useCurrency());
    expect(result.current.format(0, 'USD')).toBe('€0.00');
  });

  it('should handle negative values correctly', () => {
    mockSelector.mockReturnValue({
      currency: 'EUR',
      exchangeRates: { 'USD': 1.2 },
    });

    const { result } = renderHook(() => useCurrency());
    expect(result.current.format(-120, 'USD')).toBe('-€100.00');
  });

  it('should provide raw converted value via convert function', () => {
    mockSelector.mockReturnValue({
      currency: 'EUR',
      exchangeRates: { 'USD': 1.2 },
    });

    const { result } = renderHook(() => useCurrency());
    expect(result.current.convert(120, 'USD')).toBe(100);
  });
});
