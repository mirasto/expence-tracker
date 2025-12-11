import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '@/app/providers/store/store';
import { fetchTransactions } from '@/entities/transaction/model/slice';
import { SummaryOverview } from '@/widgets/dashboard-stats/ui/SummaryOverview/SummaryOverview';
import { ExpenseDoughnut } from '@/widgets/dashboard-stats/ui/ExpenseDoughnut/ExpenseDoughnut';
import { MonthlyTrend } from '@/widgets/dashboard-stats/ui/MonthlyTrend/MonthlyTrend';
import { RecentTransactions } from '@/widgets/dashboard-stats/ui/RecentTransactions/RecentTransactions';
import styles from './DashboardPage.module.scss';

export const DashboardPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { transactions, isLoading } = useAppSelector((state) => state.transactions);

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchTransactions(user.uid));
    }
  }, [dispatch, user?.uid]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.greeting}>
          {t('dashboard.welcome', { name: user?.displayName || 'User' })}
        </h1>
        <p className={styles.subtitle}>Here's what's happening with your finances today.</p>
      </header>

      <SummaryOverview transactions={transactions} isLoading={isLoading} />

      <div className={styles.grid}>
        <div className={styles.mainContent}>
          <div className={styles.trendSection}>
            <MonthlyTrend transactions={transactions} />
          </div>
          <div className={styles.recentSection}>
            <RecentTransactions transactions={transactions} isLoading={isLoading} />
          </div>
        </div>
        </div>
        
        <div className={styles.sideContent}>
          <ExpenseDoughnut transactions={transactions} />
        </div>
      </div>
    </div>
  );
};