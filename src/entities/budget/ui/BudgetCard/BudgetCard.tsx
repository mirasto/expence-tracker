import React, { useState } from 'react';
import { MoreHorizontal, ShoppingBag, Utensils, Car, Zap, Coffee, Heart, GraduationCap, Home, Briefcase, TrendingUp, HelpCircle, Edit2, Copy, Trash2 } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ProgressBar } from '@/shared/ui/ProgressBar/ProgressBar';
import { ConfirmDialog } from '@/shared/ui/ConfirmDialog/ConfirmDialog';
import { BudgetProgress } from '../../model/types';
import { TransactionCategory } from '@/entities/transaction/model/types';
import styles from './BudgetCard.module.scss';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '@/shared/lib/format';

interface BudgetCardProps {
  budget: BudgetProgress;
  onEdit?: (budget: BudgetProgress) => void;
  onDelete?: (id: string) => void;
  onDuplicate?: (budget: BudgetProgress) => void;
}

const getCategoryIcon = (category: TransactionCategory) => {
  switch (category) {
    case 'food': return <Utensils />;
    case 'shopping': return <ShoppingBag />;
    case 'transport': return <Car />;
    case 'utilities': return <Zap />;
    case 'entertainment': return <Coffee />;
    case 'health': return <Heart />;
    case 'education': return <GraduationCap />;
    case 'housing': return <Home />;
    case 'salary': return <Briefcase />;
    case 'investment': return <TrendingUp />;
    default: return <HelpCircle />;
  }
};

export const BudgetCard: React.FC<BudgetCardProps> = ({ 
  budget, 
  onEdit, 
  onDelete, 
  onDuplicate
}) => {
  const { t } = useTranslation();
  const { id, category, spent, amount, percentage, remaining, isOverBudget, currency } = budget;
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  
  const formatMoney = (val: number) => {
    return formatCurrency(val, currency);
  };

  const handleDeleteConfirm = () => {
    if (onDelete) {
      onDelete(id);
    }
    setIsDeleteOpen(false);
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.categoryInfo}>
            <div className={styles.iconWrapper}>
              {getCategoryIcon(category)}
            </div>
            <span className={styles.categoryName}>{t(`categories.${category}`, category)}</span>
          </div>
          
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className={styles.actions}>
                <MoreHorizontal size={20} />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content className={styles.dropdownContent} sideOffset={5} align="end">
                <DropdownMenu.Item className={styles.dropdownItem} onSelect={() => onEdit?.(budget)}>
                  <Edit2 size={16} />
                  {t('common.edit')}
                </DropdownMenu.Item>
                <DropdownMenu.Item className={styles.dropdownItem} onSelect={() => onDuplicate?.(budget)}>
                  <Copy size={16} />
                  {t('common.duplicate')}
                </DropdownMenu.Item>
                
                <DropdownMenu.Separator className={styles.separator} />
                
                <DropdownMenu.Item 
                  className={`${styles.dropdownItem} ${styles.deleteItem}`} 
                  onSelect={() => setIsDeleteOpen(true)}
                >
                  <Trash2 size={16} />
                  {t('common.delete')}
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>

        <div className={styles.progressSection}>
          <div className={styles.amounts}>
            <span className={styles.spent}>{formatMoney(spent)}</span>
            <span className={styles.limit}> / {formatMoney(amount)}</span>
          </div>
          <ProgressBar percentage={percentage} />
        </div>

        <div className={styles.footer}>
          {isOverBudget ? (
            <span className={styles.overBudget}>
              {t('budget.overBudgetBy', { amount: formatMoney(spent - amount) })}
            </span>
          ) : (
            <span className={styles.remaining}>
              {t('budget.leftToSpend', { amount: formatMoney(remaining) })}
            </span>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title={t('budget.confirmDeleteTitle')}
        description={t('budget.confirmDeleteDesc', { category: t(`categories.${category}`) })}
      />
    </>
  );
};
