import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Transaction } from '@/entities/transaction/model/types';
import { Card } from '@/shared/ui/Card/Card';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { formatCurrency } from '@/shared/lib/format';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import styles from './SummaryOverview.module.scss';

interface SummaryOverviewProps {
  transactions: Transaction[];
  isLoading: boolean;
}

export const SummaryOverview = ({ transactions, isLoading }: SummaryOverviewProps) => {
  const { t } = useTranslation();

  const stats = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);

    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);

    return {
      balance: income - expenses,
      income,
      expenses
    };
  }, [transactions]);

  if (isLoading) {
    return (
      <div className={styles.grid}>
        {[1, 2, 3].map((i) => (
          <Card key={i} className={styles.card}>
            <Skeleton width={40} height={40} circle className="mb-4" />
            <Skeleton width="60%" height={24} className="mb-2" />
            <Skeleton width="80%" height={32} />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {}
      <Card hover glass className={styles.balanceCard}>
        <div className={styles.cardHeader}>
          <div className={styles.iconWrapper}>
            <Wallet className={styles.icon} />
          </div>
          <span className={styles.trendPositive}>
            <TrendingUp size={16} /> +2.5%
          </span>
        </div>
        <div className={styles.content}>
          <span className={styles.label}>{t('dashboard.totalBalance')}</span>
          <h2 className={styles.amount}>${stats.balance.toFixed(2)}</h2>
        </div>
      </Card>

      {}
      <Card hover className={styles.incomeCard}>
        <div className={styles.cardHeader}>
          <div className={styles.iconWrapper}>
            <ArrowUpRight className={styles.icon} />
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipContent className={styles.tooltip}>
                <p>Total earnings this month</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className={styles.content}>
          <span className={styles.label}>{t('dashboard.totalIncome')}</span>
          <h2 className={styles.amount}>+${stats.income.toFixed(2)}</h2>
        </div>
      </Card>

      {}
      <Card hover className={styles.expenseCard}>
        <div className={styles.cardHeader}>
          <div className={styles.iconWrapper}>
            <ArrowDownRight className={styles.icon} />
          </div>
        </div>
        <div className={styles.content}>
          <span className={styles.label}>{t('dashboard.totalExpenses')}</span>
          <h2 className={styles.amount}>-{formatCurrency(stats.expenses)}</h2>
        </div>
      </Card>
    </div>
  );
};
