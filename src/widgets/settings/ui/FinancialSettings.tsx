import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/app/providers/store/store';
import { setCurrency, setMonthlyStartDay } from '@/entities/settings/model/slice';
import styles from './Settings.module.scss';
import * as Select from '@radix-ui/react-select';
import { ChevronDown, Check } from 'lucide-react';
import { CustomCategoryManager } from './CustomCategoryManager';

export const FinancialSettings = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { currency, monthlyStartDay } = useAppSelector((state) => state.settings);

  const CURRENCIES = [
    { value: 'USD', label: 'USD - US Dollar ($)' },
    { value: 'EUR', label: 'EUR - Euro (€)' },
    { value: 'GBP', label: 'GBP - British Pound (£)' },
    { value: 'JPY', label: 'JPY - Japanese Yen (¥)' },
    { value: 'CNY', label: 'CNY - Chinese Yuan (¥)' },
    { value: 'INR', label: 'INR - Indian Rupee (₹)' },
    { value: 'UAH', label: 'UAH - Ukrainian Hryvnia (₴)' },
  ];

  const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

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

      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>
          <label>{t('settings.startDay', 'Monthly Start Date')}</label>
          <span className={styles.description}>
            {t('settings.startDayDesc', 'Day of the month when your budget cycle resets')}
          </span>
        </div>
        
        <div className={styles.settingControl}>
          <select 
            className={styles.select}
            value={monthlyStartDay}
            onChange={(e) => dispatch(setMonthlyStartDay(Number(e.target.value)))}
          >
            {DAYS.map(d => (
              <option key={d} value={d}>{d}{getOrdinal(d)}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.settingItem} style={{ flexDirection: 'column', alignItems: 'stretch' }}>
        <div className={styles.settingLabel}>
          <label>{t('settings.categories', 'Custom Categories')}</label>
          <span className={styles.description}>
            {t('settings.categoriesDesc', 'Manage your custom expense categories')}
          </span>
        </div>
        
        <div style={{ marginTop: 16 }}>
          <CustomCategoryManager />
        </div>
      </div>
    </div>
  );
};

const getOrdinal = (n: number) => {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
};
