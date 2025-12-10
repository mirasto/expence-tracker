import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/app/providers/store/store';
import { updateBudget, addBudget } from '@/entities/budget/model/slice';
import { Budget } from '@/entities/budget/model/types';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { BudgetFormValues, budgetSchema, CATEGORIES } from '@/features/budget/add-budget/model/schema';
import styles from './EditBudgetModal.module.scss';

interface EditBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  budget: Budget | null;
  isDuplicate?: boolean;
}

export const EditBudgetModal = ({ isOpen, onClose, budget, isDuplicate = false }: EditBudgetModalProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { budgets } = useAppSelector((state) => state.budgets);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<BudgetFormValues>({
    resolver: zodResolver(budgetSchema),
  });

  useEffect(() => {
    if (budget) {
      reset({
        category: budget.category,
        amount: budget.amount,
      });
    }
  }, [budget, reset]);

  const onSubmit = async (data: BudgetFormValues) => {
    if (!user || !budget) return;

    // Check if user is trying to change category to one that already exists 
    // (excluding current IF it's an edit, but including current IF it's a duplicate)
    const exists = budgets.some(b => 
      b.category === data.category && 
      (isDuplicate ? true : b.id !== budget.id)
    );

    if (exists) {
      setError('category', { 
        type: 'manual', 
        message: t('budget.errors.categoryExists', 'A budget for this category already exists') 
      });
      return;
    }

    try {
      if (isDuplicate) {
        // Create new budget
        await dispatch(addBudget({
          userId: user.uid,
          amount: Number(data.amount),
          category: data.category,
          currency: 'USD',
          period: 'monthly',
        })).unwrap();
      } else {
        // Update existing budget
        await dispatch(updateBudget({
          id: budget.id,
          userId: user.uid,
          data: {
            amount: Number(data.amount),
            category: data.category,
          }
        })).unwrap();
      }
      
      onClose();
    } catch (error) {
      console.error('Failed to save budget:', error);
    }
  };

  if (!isOpen) return null;

  const title = isDuplicate 
    ? t('common.duplicate') + ' ' + t('budget.title')
    : t('common.edit') + ' ' + t('budget.title');

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>{title}</h3>
          <button onClick={onClose} className={styles.closeBtn}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.field}>
            <label>{t('budget.category', 'Category')}</label>
            <select {...register('category')} className={styles.select}>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{t(`categories.${cat}`, cat)}</option>
              ))}
            </select>
            {errors.category && <span style={{color: 'var(--color-danger)', fontSize: 12}}>{errors.category.message}</span>}
          </div>

          <Input
            label={t('budget.amount', 'Monthly Limit')}
            type="number"
            placeholder="500"
            error={errors.amount?.message}
            {...register('amount', { valueAsNumber: true })}
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
