import React from 'react';
import { useTranslation } from 'react-i18next';
import { User, CreditCard, Palette } from 'lucide-react';
import { ProfileSettings } from '@/widgets/settings/ui/ProfileSettings';
import { FinancialSettings } from '@/widgets/settings/ui/FinancialSettings';
import { AppearanceSettings } from '@/widgets/settings/ui/AppearanceSettings';
import styles from './SettingsPage.module.scss';

export const SettingsPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>{t('settings.title', 'Settings')}</h1>
        <p>{t('settings.subtitle', 'Manage your preferences and account')}</p>
      </header>

      <div className={styles.grid}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.iconWrapper}>
              <User size={24} />
            </div>
            <h2>{t('settings.profile', 'User Profile')}</h2>
          </div>
          <ProfileSettings />
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.iconWrapper}>
              <CreditCard size={24} />
            </div>
            <h2>{t('settings.financial', 'Financial Preferences')}</h2>
          </div>
          <FinancialSettings />
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.iconWrapper}>
              <Palette size={24} />
            </div>
            <h2>{t('settings.appearance', 'Interface & Appearance')}</h2>
          </div>
          <AppearanceSettings />
        </section>
      </div>
    </div>
  );
};
