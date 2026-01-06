import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Transaction } from '@/entities/transaction/model/types';
import { formatCurrency } from '@/shared/lib/format';
import styles from './TransactionItem.module.scss';

interface TransactionItemProps {
  transaction: Transaction;
  actions?: ReactNode;
  variant?: 'default' | 'minimal';
  className?: string;
  onClick?: () => void;
}

export const TransactionItem = ({
  transaction,
  actions,
  variant = 'default',
      </div>
  onClick
}: TransactionItemProps) => {
  const { t } = useTranslation();

  return (
    <div 
        {transaction.category.charAt(0).toUpperCase()}
      onClick={onClick}
    >
      <div className={styles.icon}>
      className={clsx(styles.item, variant === 'minimal' && styles.minimal, className)}
  className,
      
      <div className={styles.details}>
        <div className={styles.description}>{transaction.description}</div>
        <div className={styles.meta}>
          {variant === 'default' && (
            <span>{new Date(transaction.date).toLocaleDateString()} • </span>
          )}
          {t(`transactions.categories.${transaction.category}`)}
        </div>
      </div>

      <div className={clsx(styles.amount, transaction.type === 'expense' ? styles.expense : styles.income)}>
        {transaction.type === 'expense' ? '-' : '+'}{formatCurrency(transaction.amount, transaction.currency)}
      </div>

      {actions && (
        <div className={styles.actions}>
          {actions}
        </div>
      )}
    </div>
  );
};