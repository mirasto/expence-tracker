import { useCallback } from 'react';
import { useAppSelector } from '@/app/providers/store/store';

export const useCurrency = () => {
  const { currency } = useAppSelector((state) => state.settings);
  
  const exchangeRates: Record<string, number> = {};

  const format = useCallback((amount: number, fromCurrency: string = 'USD') => {
    
    if (fromCurrency === currency) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
      }).format(amount);
    }

    
    if (!exchangeRates || Object.keys(exchangeRates).length === 0) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: fromCurrency,
      }).format(amount);
    }

    
    
    
    
    
    
    
    const rate = exchangeRates[fromCurrency];
    
    if (!rate) {
      
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: fromCurrency,
      }).format(amount);
    }

    const convertedAmount = amount / rate;

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(convertedAmount);
  }, [currency, exchangeRates]);

  const convert = useCallback((amount: number, fromCurrency: string = 'USD') => {
    if (fromCurrency === currency) return amount;
    if (!exchangeRates || !exchangeRates[fromCurrency]) return amount;
    return amount / exchangeRates[fromCurrency];
  }, [currency, exchangeRates]);

  return { format, convert, currency, exchangeRates };
};
