import { useTranslation } from 'react-i18next';
import { Menu } from 'lucide-react';
import { Button } from '@/shared/ui/Button/Button';
import { ThemeToggle } from '@/features/theme/ui/ThemeToggle';
import { LanguageSwitcher } from '@/features/language/ui/LanguageSwitcher';
import styles from './Header.module.scss';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  
  const getTitle = (path: string) => {
  const getTitle = (path: string) => {
    switch (path) {
      case '/': return t('sidebar.dashboard');
      case '/transactions': return t('sidebar.transactions');
      case '/budgets': return t('sidebar.budgets');
      case '/goals': return t('sidebar.goals');
      case '/settings': return t('sidebar.settings');
    }
  };

  const title = getTitle(location.pathname);

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.menuButton}>
          <Button variant="ghost" size="sm" onClick={onMenuClick}>
            <Menu size={24} />
          </Button>
        </div>
        <h1 className={styles.title}>{title}</h1>
      </div>

      <div className={styles.right}>
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </header>
  );
};