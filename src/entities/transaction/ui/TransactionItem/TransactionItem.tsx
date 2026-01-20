import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { 
  Utensils, Car, Zap, Film, ShoppingBag, 
  Heart, GraduationCap, Home, Banknote, 
  TrendingUp, HelpCircle, Briefcase 
} from 'lucide-react';
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

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  food: Utensils,
  transport: Car,
  utilities: Zap,
  entertainment: Film,
  shopping: ShoppingBag,
  health: Heart,
  education: GraduationCap,
  housing: Home,
  salary: Banknote,
  investment: TrendingUp,
  other: HelpCircle,
};

export const TransactionItem = ({
  transaction,
  actions,
  variant = 'default',
  className,
  onClick
}: TransactionItemProps) => {
  const { t } = useTranslation();
  const Icon = CATEGORY_ICONS[transaction.category] || HelpCircle;

  return (
    <div 
      className={clsx(styles.item, variant === 'minimal' && styles.minimal, className)}
      onClick={onClick}
    >
      <div className={styles.icon}>
        <Icon size={20} strokeWidth={2} />
      </div>
      
      <div className={styles.details}>
        <div className={styles.description}>
          {transaction.description}
        </div>
        <div className={styles.meta}>
          {variant === 'default' && (
            <span>
              {new Date(transaction.date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })} •{' '}
            </span>
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
