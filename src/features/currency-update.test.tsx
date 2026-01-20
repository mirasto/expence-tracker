
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from '@/entities/settings/model/slice';
import { FinancialSettings } from '@/widgets/settings/ui/FinancialSettings';
import { useCurrency } from '@/shared/lib/hooks/useCurrency';
import { describe, it, expect, vi } from 'vitest';


vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));


const CurrencyDisplay = () => {
  const { format, currency } = useCurrency();
  return (
    <div>
      <div data-testid="currency-code">{currency}</div>
      <div data-testid="currency-display">{format(100)}</div>
    </div>
  );
};


const renderWithStore = () => {
  const store = configureStore({
    reducer: {
      settings: settingsReducer,
    },
  });

  return render(
    <Provider store={store}>
      <FinancialSettings />
      <CurrencyDisplay />
    </Provider>
  );
};

describe('Currency Update Feature', () => {
  it('updates currency symbol when selection changes', async () => {
    renderWithStore();

   
    const display = screen.getByTestId('currency-display');
    expect(display.textContent).toContain('$');

    
    const select = screen.getByRole('combobox');
    

    fireEvent.change(select, { target: { value: 'EUR' } });
 
    expect(display.textContent).toContain('€');
    
  
    fireEvent.change(select, { target: { value: 'GBP' } });
    
    await waitFor(() => {
      expect(screen.getByTestId('currency-code').textContent).toBe('GBP');
    });
    
    expect(display.textContent).toContain('£');
  });
});
