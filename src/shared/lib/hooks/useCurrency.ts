import { useCallback } from 'react';
import { useAppSelector } from '@/app/providers/store/store';

export const useCurrency = () => {
  const { currency, exchangeRates } = useAppSelector((state) => state.settings);

  const format = useCallback((amount: number, fromCurrency: string = 'USD') => {
    // If target currency matches source, just format
    if (fromCurrency === currency) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
      }).format(amount);
    }

    // If we don't have rates, fallback to original
    if (!exchangeRates || Object.keys(exchangeRates).length === 0) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: fromCurrency,
      }).format(amount);
    }

    // Convert
    // The rates in store are based on the SELECTED currency.
    // e.g. Selected = EUR. Rates: { USD: 1.1, EUR: 1, ... }
    // This means 1 EUR = 1.1 USD.
    // So to convert FROM USD TO EUR: amount / rate(USD)
    // Example: 10 USD / 1.1 = 9.09 EUR.
    
    const rate = exchangeRates[fromCurrency];
    
    if (!rate) {
      // Fallback if rate not found
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
