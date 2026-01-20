import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/app/providers/store/store';
import { addTransaction } from '@/entities/transaction/model/slice';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { TransactionFormValues, transactionSchema } from '../model/schema';
import styles from './AddTransaction.module.scss';
import { Plus } from 'lucide-react';

const CATEGORIES = [
  'food', 'transport', 'utilities', 'entertainment', 'shopping',
  'health', 'education', 'housing', 'salary', 'investment', 'other'
];

export const AddTransaction = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
      category: 'other',
    },
  });

  const onSubmit = async (data: TransactionFormValues) => {
    if (!user) return;

    try {
      await dispatch(addTransaction({
        userId: user.uid,
        amount: Number(data.amount),
        type: data.type,
        category: data.category,
        description: data.description,
        date: new Date(data.date).getTime(),
        currency: 'USD', 
        createdAt: Date.now(),
      })).unwrap();
      
      setIsOpen(false);
      reset();
    } catch (error) {
      console.error('Failed to add transaction:', error);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Plus size={20} style={{ marginRight: 8 }} />
        {t('transactions.addTransaction')}
      </Button>

      {isOpen && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.header}>
              <h3>{t('transactions.addTransaction')}</h3>
              <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>&times;</button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <div className={styles.field}>
                <label>{t('transactions.type')}</label>
                <select {...register('type')} className={styles.select}>
                  <option value="expense">{t('transactions.expense')}</option>
                  <option value="income">{t('transactions.income')}</option>
                </select>
              </div>

              <Input
                label={t('transactions.amount')}
                type="number"
                step="0.01"
                placeholder="0.00"
                error={errors.amount?.message}
                {...register('amount', { valueAsNumber: true })}
                fullWidth
              />

              <div className={styles.field}>
                <label>{t('transactions.category')}</label>
                <select {...register('category')} className={styles.select}>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{t(`transactions.categories.${cat}`)}</option>
                  ))}
                </select>
              </div>

              <Input
                label={t('transactions.description')}
                placeholder={t('transactions.description')}
                error={errors.description?.message}
                {...register('description')}
                fullWidth
              />

              <Input
                label={t('transactions.date')}
                type="date"
                error={errors.date?.message}
                {...register('date')}
                fullWidth
              />

              <div className={styles.actions}>
                <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>{t('common.cancel')}</Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? t('common.loading') : t('common.add')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
