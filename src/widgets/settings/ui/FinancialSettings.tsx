import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/app/providers/store/store';
import { setCurrency } from '@/entities/settings/model/slice';
import styles from './Settings.module.scss';
import * as Select from '@radix-ui/react-select';
import { ChevronDown, Check } from 'lucide-react';

export const FinancialSettings = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { currency } = useAppSelector((state) => state.settings);

  const CURRENCIES = [
    { value: 'USD', label: 'USD - US Dollar ($)' },
    { value: 'EUR', label: 'EUR - Euro (€)' },
    { value: 'GBP', label: 'GBP - British Pound (£)' },
    { value: 'JPY', label: 'JPY - Japanese Yen (¥)' },
    { value: 'CNY', label: 'CNY - Chinese Yuan (¥)' },
    { value: 'INR', label: 'INR - Indian Rupee (₹)' },
    { value: 'UAH', label: 'UAH - Ukrainian Hryvnia (₴)' },
  ];

  return (
    <div className={styles.settingsGroup}>
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>
          <label>{t('settings.currency', 'Base Currency')}</label>
          <span className={styles.description}>
            {t('settings.currencyDesc', 'Primary currency for your transactions')}
          </span>
        </div>
        
        <div className={styles.settingControl}>
          <select 
            className={styles.select}
            value={currency}
            onChange={(e) => dispatch(setCurrency(e.target.value))}
          >
            {CURRENCIES.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

