import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/widgets/sidebar/ui/Sidebar';
import { Header } from '@/widgets/header/ui/Header';
import styles from './MainLayout.module.scss';

export const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className={styles.main}>
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
