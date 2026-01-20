import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/app/providers/store/store';
import { updateSavingsGoal } from '@/entities/savings-goal/model/slice';
import { SavingsGoalProgress } from '@/entities/savings-goal/model/types';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { SavingsGoalFormValues, savingsGoalSchema } from '@/features/savings-goal/add-savings-goal/model/schema';
import styles from './EditSavingsGoalModal.module.scss';

interface EditSavingsGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  goal: SavingsGoalProgress | null;
}

export const EditSavingsGoalModal = ({ isOpen, onClose, goal }: EditSavingsGoalModalProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SavingsGoalFormValues>({
    resolver: zodResolver(savingsGoalSchema),
  });

  useEffect(() => {
    if (goal) {
      reset({
        name: goal.name,
        targetAmount: goal.targetAmount,
        currentAmount: goal.currentAmount,
        deadline: goal.deadline ? new Date(goal.deadline).toISOString().split('T')[0] : undefined,
      });
    }
  }, [goal, reset]);

  const onSubmit = async (data: SavingsGoalFormValues) => {
    if (!user || !goal) return;

    try {
      await dispatch(updateSavingsGoal({
        id: goal.id,
        userId: user.uid,
        data: {
          name: data.name,
          targetAmount: Number(data.targetAmount),
          currentAmount: Number(data.currentAmount),
          deadline: data.deadline ? new Date(data.deadline).getTime() : undefined,
        },
      })).unwrap();
      
      onClose();
    } catch (error) {
      console.error('Failed to update savings goal:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>{t('savings.editGoal', 'Edit Savings Goal')}</h3>
          <button onClick={onClose} className={styles.closeBtn}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            label={t('savings.name', 'Goal Name')}
            placeholder={t('savings.goalNamePlaceholder', 'e.g. Vacation')}
            error={errors.name?.message}
            {...register('name')}
            fullWidth
          />

          <Input
            label={t('savings.targetAmount', 'Target Amount')}
            type="number"
            placeholder="1000"
            error={errors.targetAmount?.message}
            {...register('targetAmount', { valueAsNumber: true })}
            fullWidth
          />

          {/* Current amount editing might be restricted or allowed. 
              Usually "Edit" allows changing initial params, but current amount 
              is often managed by transactions. However, Add modal has it, so let's allow it. */}
          <Input
            label={t('savings.currentAmount', 'Current Amount')}
            type="number"
            placeholder="0"
            error={errors.currentAmount?.message}
            {...register('currentAmount', { valueAsNumber: true })}
            fullWidth
          />

          <Input 
            label={t('savings.deadline', 'Target Date (Optional)')}
            type="date" 
            error={errors.deadline?.message}
            {...register('deadline')} 
            fullWidth
          />

          <div className={styles.actions}>
            <Button type="button" variant="ghost" onClick={onClose}>{t('common.cancel')}</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? t('common.loading') : t('common.save')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
