import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/app/providers/store/store';
import { updateSavingsGoal } from '@/entities/savings-goal/model/slice';
import { SavingsGoalProgress } from '@/entities/savings-goal/model/types';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { formatCurrency } from '@/shared/lib/format';
import { TransactionFormValues, transactionSchema } from '../model/schema';
import styles from './DepositWithdrawModal.module.scss';

interface DepositWithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'deposit' | 'withdraw';
  goal: SavingsGoalProgress | null;
}

export const DepositWithdrawModal = ({ isOpen, onClose, type, goal }: DepositWithdrawModalProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: undefined,
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  if (!isOpen || !goal) return null;

  const onSubmit = async (data: TransactionFormValues) => {
    if (!user) return;

    if (type === 'withdraw' && data.amount > goal.currentAmount) {
      setError('amount', {
        type: 'manual',
        message: t('savings.errors.insufficientFunds', 'Insufficient funds'),
      });
      return;
    }

    try {
      const newAmount = type === 'deposit' 
        ? goal.currentAmount + data.amount 
        : goal.currentAmount - data.amount;

      await dispatch(updateSavingsGoal({
        id: goal.id,
        userId: user.uid,
        data: {
          currentAmount: newAmount,
        },
      })).unwrap();

      onClose();
    } catch (error) {
      console.error(`Failed to ${type}:`, error);
    }
  };

  const title = type === 'deposit' 
    ? t('savings.depositTo', 'Deposit to {{name}}', { name: goal.name })
    : t('savings.withdrawFrom', 'Withdraw from {{name}}', { name: goal.name });

  const btnLabel = type === 'deposit' ? t('savings.deposit') : t('savings.withdraw');
  

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>{title}</h3>
          <button onClick={onClose} className={styles.closeBtn}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.currentInfo}>
            <span>{t('savings.currentBalance', 'Current Balance')}:</span>
            <span className={styles.balance}>
              {formatCurrency(goal.currentAmount, goal.currency)}
            </span>
          </div>

          <Input
            label={t('savings.amount', 'Amount')}
            type="number"
            placeholder="0.00"
            error={errors.amount?.message}
            {...register('amount', { valueAsNumber: true })}
            fullWidth
            autoFocus
          />

          <div className={styles.actions}>
            <Button type="button" variant="ghost" onClick={onClose}>{t('common.cancel')}</Button>
            <Button type="submit" disabled={isSubmitting} variant={type === 'withdraw' ? 'outline' : 'primary'}>
              {isSubmitting ? t('common.loading') : btnLabel}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
