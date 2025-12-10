import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/app/providers/store/store';
import { fetchTransactions, deleteTransaction } from '@/entities/transaction/model/slice';
import { Button } from '@/shared/ui/Button/Button';
import { Trash2 } from 'lucide-react';
import { TransactionItem } from '@/entities/transaction/ui/TransactionItem/TransactionItem';
import styles from './TransactionList.module.scss';

export const TransactionList = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { transactions, isLoading, error } = useAppSelector((state) => state.transactions);

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchTransactions(user.uid));
    }
  }, [dispatch, user?.uid]);

  const handleDelete = (id: string) => {
    // Confirmation removed as requested
    if (user?.uid) {
      dispatch(deleteTransaction({ id, userId: user.uid }));
    }
  };

  if (isLoading && transactions.length === 0) {
    return <div className={styles.loading}>{t('common.loading')}</div>;
  }

  if (error) {
    return <div className={styles.error}>{t('common.error')}: {error}</div>;
  }

  if (transactions.length === 0) {
    return (
      <div className={styles.empty}>
        <p>{t('transactions.noTransactions')}</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          variant="default"
          actions={
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleDelete(transaction.id)}
              className={styles.deleteBtn}
              aria-label={t('common.delete')}
            >
              <Trash2 size={16} />
            </Button>
          }
        />
      ))}
    </div>
  );
};
