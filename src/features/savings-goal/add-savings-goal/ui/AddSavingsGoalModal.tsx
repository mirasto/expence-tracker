import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/app/providers/store/store';
import { addSavingsGoal } from '@/entities/savings-goal/model/slice';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { SavingsGoalFormValues, savingsGoalSchema } from '../model/schema';
import styles from './AddSavingsGoalModal.module.scss';
import { Plus } from 'lucide-react';

export const AddSavingsGoalModal = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SavingsGoalFormValues>({
    resolver: zodResolver(savingsGoalSchema),
    defaultValues: {
      name: '',
      targetAmount: 1000,
      currentAmount: 0,
    },
  });

  const onSubmit = async (data: SavingsGoalFormValues) => {
    if (!user) return;

    try {
      await dispatch(addSavingsGoal({
        userId: user.uid,
        name: data.name,
        targetAmount: Number(data.targetAmount),
        currentAmount: Number(data.currentAmount),
        deadline: data.deadline ? new Date(data.deadline).getTime() : undefined,
        currency: 'USD',
      })).unwrap();
      
      setIsOpen(false);
      reset();
    } catch (error) {
      console.error('Failed to add savings goal:', error);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Plus size={20} style={{ marginRight: 8 }} />
        {t('savings.createGoal', 'Create Goal')}
      </Button>

      {isOpen && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.header}>
              <h3>{t('savings.createGoal', 'Create Savings Goal')}</h3>
              <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>&times;</button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <Input
                label={t('savings.name', 'Goal Name')}
                placeholder="e.g. Vacation"
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

              <Input
                label={t('savings.currentAmount', 'Starting Amount')}
                type="number"
                placeholder="0"
                error={errors.currentAmount?.message}
                {...register('currentAmount', { valueAsNumber: true })}
                fullWidth
              />

              <div className={styles.field}>
                <label>{t('savings.deadline', 'Target Date (Optional)')}</label>
                <input 
                  type="date" 
                  {...register('deadline')} 
                  className={styles.input}
                />
              </div>

              <div className={styles.actions}>
                <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>{t('common.cancel')}</Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? t('common.loading') : t('common.save')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
