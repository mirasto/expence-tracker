import React, { useState } from 'react';
import { MoreHorizontal, Edit2, Trash2, Plus, Minus, Target } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ProgressBar } from '@/shared/ui/ProgressBar/ProgressBar';
import { ConfirmDialog } from '@/shared/ui/ConfirmDialog/ConfirmDialog';
import { SavingsGoalProgress } from '../../model/types';
import styles from './SavingsGoalCard.module.scss';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button/Button';
import { formatCurrency } from '@/shared/lib/format';

interface SavingsGoalCardProps {
  goal: SavingsGoalProgress;
  onEdit?: (goal: SavingsGoalProgress) => void;
  onDelete?: (id: string) => void;
  onDeposit?: (goal: SavingsGoalProgress) => void;
  onWithdraw?: (goal: SavingsGoalProgress) => void;
}

export const SavingsGoalCard: React.FC<SavingsGoalCardProps> = ({ 
  goal, 
  onEdit, 
  onDelete, 
  onDeposit,
  onWithdraw
}) => {
  const { t } = useTranslation();
  const { 
    id, 
    name, 
    currentAmount, 
    targetAmount, 
    percentage, 
    remainingAmount, 
    isCompleted, 
    currency, 
    deadline,
    monthlySavingsNeeded
  } = goal;
  
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

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.goalInfo}>
            <div className={styles.iconWrapper}>
              <Target size={20} />
            </div>
            <div className={styles.titleWrapper}>
              <span className={styles.goalName}>{name}</span>
              {deadline && (
                <span className={styles.deadline}>
                  {t('savings.deadline', 'Target: {{date}}', { date: formatDate(deadline) })}
                </span>
              )}
            </div>
          </div>
          
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className={styles.menuTrigger}>
                <MoreHorizontal size={20} />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content className={styles.dropdownContent} sideOffset={5} align="end">
                <DropdownMenu.Item className={styles.dropdownItem} onSelect={() => onEdit?.(goal)}>
                  <Edit2 size={16} />
                  {t('common.edit')}
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
            <span className={styles.current}>{formatMoney(currentAmount)}</span>
            <span className={styles.target}> / {formatMoney(targetAmount)}</span>
          </div>
          <ProgressBar percentage={percentage} />
        </div>

        <div className={styles.stats}>
           {isCompleted ? (
             <span className={styles.completed}>{t('savings.completed', 'Goal Reached!')}</span>
           ) : (
             <span className={styles.remaining}>
               {t('savings.remaining', '{{amount}} to go', { amount: formatMoney(remainingAmount) })}
             </span>
           )}
           {monthlySavingsNeeded && !isCompleted && (
             <span className={styles.monthlyNeeded}>
               {t('savings.monthlyNeeded', '{{amount}}/mo', { amount: formatMoney(monthlySavingsNeeded) })}
             </span>
           )}
        </div>

        <div className={styles.actions}>
           <Button 
             variant="outline" 
             onClick={() => onWithdraw?.(goal)}
             disabled={currentAmount <= 0}
             className={`${styles.actionBtn} ${styles.withdrawBtn}`}
           >
             <Minus size={18} />
             {t('savings.withdraw', 'Withdraw')}
           </Button>
           <Button 
             variant="primary" 
             onClick={() => onDeposit?.(goal)}
             className={`${styles.actionBtn} ${styles.depositBtn}`}
           >
             <Plus size={18} />
             {t('savings.deposit', 'Deposit')}
           </Button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title={t('savings.deleteTitle', 'Delete Savings Goal?')}
        description={t('savings.deleteDesc', 'Are you sure you want to delete "{{name}}"? This action cannot be undone.', { name })}
      />
    </>
  );
};
