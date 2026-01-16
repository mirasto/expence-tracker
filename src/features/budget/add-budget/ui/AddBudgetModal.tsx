import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/app/providers/store/store';
import { addBudget } from '@/entities/budget/model/slice';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { BudgetFormValues, budgetSchema, CATEGORIES } from '../model/schema';
import styles from './AddBudgetModal.module.scss';
import { Plus } from 'lucide-react';

export const AddBudgetModal = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
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
    defaultValues: {
      category: 'food',
      amount: 500,
    },
  });

  const onSubmit = async (data: BudgetFormValues) => {
    if (!user) return;

    // Validation: Ensure a user cannot create two budgets for the same category
    const exists = budgets.some(b => b.category === data.category);
    if (exists) {
      setError('category', { 
        type: 'manual', 
        message: t('budget.errors.categoryExists', 'A budget for this category already exists') 
      });
      return;
    }

    try {
      await dispatch(addBudget({
        userId: user.uid,
        amount: Number(data.amount),
        category: data.category,
        currency: 'USD', // Default for now
        period: 'monthly',
      })).unwrap();
      
      setIsOpen(false);
      reset();
    } catch (error) {
      console.error('Failed to add budget:', error);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Plus size={20} style={{ marginRight: 8 }} />
        {t('budget.createBudget', 'Create Budget')}
      </Button>

      {isOpen && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.header}>
              <h3>{t('budget.createBudget', 'Create Budget')}</h3>
              <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>&times;</button>
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
