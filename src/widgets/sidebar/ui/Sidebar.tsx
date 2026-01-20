import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, Wallet, Target, Settings, LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/shared/api/firebase';
import clsx from 'clsx';
import styles from './Sidebar.module.scss';
import { Button } from '@/shared/ui/Button/Button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { t } = useTranslation();

  const NAV_ITEMS = [
    { path: '/', label: t('sidebar.dashboard'), icon: LayoutDashboard },
    { path: '/transactions', label: t('sidebar.transactions'), icon: Receipt },
    { path: '/budgets', label: t('sidebar.budgets'), icon: Wallet },
    { path: '/goals', label: t('sidebar.goals'), icon: Target },
    { path: '/settings', label: t('sidebar.settings'), icon: Settings },
  ];

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <>
      <div className={clsx(styles.overlay, isOpen && styles.open)} onClick={onClose} />
      <aside className={clsx(styles.sidebar, isOpen && styles.open)}>
        <div className={styles.logo}>
          {t('auth.appName', 'ExpenseTracker')}
        </div>

        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => clsx(styles.navItem, isActive && styles.active)}
              onClick={onClose}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className={styles.footer}>
          <Button variant="ghost" fullWidth onClick={handleLogout} style={{ justifyContent: 'flex-start' }}>
            <LogOut size={20} style={{ marginRight: 12 }} />
            {t('sidebar.logout')}
          </Button>
        </div>
      </aside>
    </>
  );
};
