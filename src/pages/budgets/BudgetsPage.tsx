import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/app/providers/store/store';
import { fetchBudgets } from '@/entities/budget/model/slice';
import { fetchTransactions } from '@/entities/transaction/model/slice';
import { BudgetList } from '@/widgets/budget-list/ui/BudgetList';
import { AddBudgetModal } from '@/features/budget/add-budget/ui/AddBudgetModal';
import styles from './BudgetsPage.module.scss';

export const BudgetsPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchBudgets(user.uid));
      dispatch(fetchTransactions(user.uid)); 
    }
  }, [dispatch, user?.uid]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleSection}>
          <h1>{t('budget.title', 'Budgets')}</h1>
          <p>{t('budget.subtitle', 'Manage your monthly spending limits')}</p>
        </div>
        <AddBudgetModal />
      </header>

      <BudgetList />
    </div>
  );
};
