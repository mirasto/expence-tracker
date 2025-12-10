import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/app/providers/ThemeProvider';
import { LanguageSwitcher } from '@/features/language/ui/LanguageSwitcher';
import { Monitor, Moon, Sun } from 'lucide-react';
import styles from './Settings.module.scss';
import * as RadioGroup from '@radix-ui/react-radio-group';

export const AppearanceSettings = () => {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();

  return (
    <div className={styles.settingsGroup}>
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>
          <label>{t('settings.theme', 'Theme')}</label>
          <span className={styles.description}>
            {t('settings.themeDesc', 'Choose your preferred visual theme')}
          </span>
        </div>
        
        <div className={styles.settingControl}>
          <RadioGroup.Root 
            className={styles.radioGroup} 
            value={theme} 
            onValueChange={(val) => setTheme(val as 'light' | 'dark' | 'system')}
          >
            <RadioGroup.Item value="light" className={styles.radioItem}>
              <Sun size={20} />
              <span>{t('settings.light', 'Light')}</span>
            </RadioGroup.Item>
            <RadioGroup.Item value="dark" className={styles.radioItem}>
              <Moon size={20} />
              <span>{t('settings.dark', 'Dark')}</span>
            </RadioGroup.Item>
            <RadioGroup.Item value="system" className={styles.radioItem}>
              <Monitor size={20} />
              <span>{t('settings.system', 'System')}</span>
            </RadioGroup.Item>
          </RadioGroup.Root>
        </div>
      </div>

      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>
          <label>{t('settings.language', 'Language')}</label>
          <span className={styles.description}>
            {t('settings.languageDesc', 'Select your preferred language')}
          </span>
        </div>
        
        <div className={styles.settingControl}>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
};
