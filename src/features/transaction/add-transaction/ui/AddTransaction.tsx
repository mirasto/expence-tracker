import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/app/providers/store/store';
import { addTransaction } from '@/entities/transaction/model/slice';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { Select } from '@/shared/ui/Select/Select';
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
    control,
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
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <Select
                    label={t('transactions.type')}
                    options={[
                      { value: 'expense', label: t('transactions.expense') },
                      { value: 'income', label: t('transactions.income') }
                    ]}
                    value={field.value}
                    onValueChange={field.onChange}
                    error={errors.type?.message}
                  />
                )}
              />

              <Input
                label={t('transactions.amount')}
                type="number"
                step="0.01"
                placeholder="0.00"
                error={errors.amount?.message}
                {...register('amount', { valueAsNumber: true })}
                fullWidth
              />

              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Select
                    label={t('transactions.category')}
                    options={CATEGORIES.map(cat => ({
                      value: cat,
                      label: t(`transactions.categories.${cat}`)
                    }))}
                    value={field.value}
                    onValueChange={field.onChange}
                    error={errors.category?.message}
                    placeholder={t('settings.categoryNamePlaceholder', 'Select category')}
                  />
                )}
              />

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
