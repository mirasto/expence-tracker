import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { format, isToday, isYesterday } from 'date-fns';
import { ArrowRight, Receipt } from 'lucide-react';
import { Transaction } from '@/entities/transaction/model/types';
import { Card } from '@/shared/ui/Card/Card';
import { Button } from '@/shared/ui/Button/Button';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import styles from './RecentTransactions.module.scss';

interface RecentTransactionsProps {
  transactions: Transaction[];
  isLoading: boolean;
}

import { TransactionItem } from '@/entities/transaction/ui/TransactionItem/TransactionItem';

export const RecentTransactions = ({ transactions, isLoading }: RecentTransactionsProps) => {
  const { t } = useTranslation();

  const groupedTransactions = useMemo(() => {
    
    const groups: { label: string; items: Transaction[] }[] = [
      { label: t('common.today', 'Today'), items: [] },
      { label: t('common.yesterday', 'Yesterday'), items: [] },
      { label: t('common.earlier', 'Earlier'), items: [] },
    ];

    transactions.slice(0, 10).forEach((t) => {
      const date = new Date(t.date);
      if (isToday(date)) {
        groups[0].items.push(t);
      } else if (isYesterday(date)) {
        groups[1].items.push(t);
      } else {
        groups[2].items.push(t);
      }
    });

    return groups.filter(g => g.items.length > 0);
  }, [transactions]);

  if (isLoading) {
    
    return (
      <Card className={styles.container}>
        <div className={styles.header}>
          <h3>{t('dashboard.recentTransactions')}</h3>
        </div>
        <div className={styles.list}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={styles.skeletonItem}>
              <Skeleton width={40} height={40} circle />
              <div style={{ flex: 1 }}>
                <Skeleton width="40%" height={16} className="mb-2" />
                <Skeleton width="20%" height={12} />
              </div>
              <Skeleton width={60} height={16} />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (transactions.length === 0) {
    
    return (
      <Card className={styles.container}>
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>
            <Receipt size={32} />
          </div>
          <h3>{t('transactions.noTransactionsTitle', 'No transactions yet')}</h3>
          <p>{t('transactions.noTransactionsDesc', 'Add your first transaction to start tracking your expenses.')}</p>
          <Link to="/transactions">
            <Button>{t('transactions.addTransaction')}</Button>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <Card className={styles.container}>
      <div className={styles.header}>
        <h3>{t('dashboard.recentTransactions')}</h3>
        <Link to="/transactions">
          <Button variant="ghost" size="sm" className={styles.viewAllBtn}>
            {t('dashboard.viewAll')} <ArrowRight size={16} />
          </Button>
        </Link>
      </div>

      <div className={styles.list}>
        {groupedTransactions.map((group) => (
          <div key={group.label} className={styles.group}>
            <h4 className={styles.groupTitle}>{group.label}</h4>
            {group.items.map((transaction) => (
              <TransactionItem 
                key={transaction.id} 
                transaction={transaction} 
                variant="minimal"
              />
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
};
