import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/app/providers/store/store';
import { fetchSavingsGoals, deleteSavingsGoal } from '@/entities/savings-goal/model/slice';
import { selectSavingsGoalsWithProgress } from '@/entities/savings-goal/model/selectors';
import { SavingsGoalCard } from '@/entities/savings-goal/ui/SavingsGoalCard/SavingsGoalCard';
import { SavingsGoalProgress } from '@/entities/savings-goal/model/types';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { DepositWithdrawModal } from '@/features/savings-goal/manage-savings/ui/DepositWithdrawModal';
import styles from './SavingsGoalList.module.scss';

export const SavingsGoalList = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  // @ts-ignore - store not updated yet
  const { isLoading, error } = useAppSelector((state) => state.savingsGoals || { isLoading: false, error: null });
  const goals = useAppSelector(selectSavingsGoalsWithProgress);

  const [transactionModal, setTransactionModal] = useState<{
    isOpen: boolean;
    type: 'deposit' | 'withdraw';
    goal: SavingsGoalProgress | null;
  }>({
    isOpen: false,
    type: 'deposit',
    goal: null,
  });

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchSavingsGoals(user.uid));
    }
  }, [dispatch, user?.uid]);

  const handleDelete = async (id: string) => {
    if (user?.uid) {
      try {
        await dispatch(deleteSavingsGoal({ id, userId: user.uid })).unwrap();
      } catch (error) {
        console.error('Failed to delete savings goal:', error);
      }
    }
  };

  const handleEdit = (goal: SavingsGoalProgress) => {
    // TODO: Implement edit
    console.log('Edit', goal);
  };

  const handleDeposit = (goal: SavingsGoalProgress) => {
    setTransactionModal({
      isOpen: true,
      type: 'deposit',
      goal,
    });
  };

  const handleWithdraw = (goal: SavingsGoalProgress) => {
    setTransactionModal({
      isOpen: true,
      type: 'withdraw',
      goal,
    });
  };

  if (isLoading && goals.length === 0) {
    return (
      <div className={styles.grid}>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} height={200} className={styles.skeleton} />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (goals.length === 0) {
    return (
      <div className={styles.empty}>
        <p>{t('savings.empty', 'No savings goals yet. Create one to start saving!')}</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.grid}>
        {goals.map((goal) => (
          <SavingsGoalCard
            key={goal.id}
            goal={goal}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onDeposit={handleDeposit}
            onWithdraw={handleWithdraw}
          />
        ))}
      </div>

      {transactionModal.goal && (
        <DepositWithdrawModal
          isOpen={transactionModal.isOpen}
          onClose={() => setTransactionModal(prev => ({ ...prev, isOpen: false }))}
          type={transactionModal.type}
          goal={transactionModal.goal}
        />
      )}
    </>
  );
};
