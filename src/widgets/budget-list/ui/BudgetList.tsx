import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '@/app/providers/store/store';
import { selectBudgetsWithProgress } from '@/entities/budget/model/selectors';
import { deleteBudget, addBudget } from '@/entities/budget/model/slice';
import { BudgetCard } from '@/entities/budget/ui/BudgetCard/BudgetCard';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { PieChart } from 'lucide-react';
import styles from './BudgetList.module.scss';
import { BudgetProgress } from '@/entities/budget/model/types';
import { EditBudgetModal } from '@/features/budget/edit-budget/ui/EditBudgetModal';

export const BudgetList = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const budgets = useAppSelector(selectBudgetsWithProgress);
  const { isLoading, error } = useAppSelector((state) => state.budgets);
  const { user } = useAppSelector((state) => state.user);

  const [editingBudget, setEditingBudget] = useState<BudgetProgress | null>(null);

  const handleDelete = (id: string) => {
    if (user) {
      dispatch(deleteBudget({ id, userId: user.uid }))
        .unwrap()
        .then(() => {
          // Success notification could be added here
          console.log('Budget deleted successfully');
        })
        .catch((err) => {
          console.error('Failed to delete budget:', err);
        });
    }
  };

  const handleEdit = (budget: BudgetProgress) => {
    setEditingBudget(budget);
  };

  const handleDuplicate = (budget: BudgetProgress) => {
    // For duplication, we want to create a NEW budget based on this one.
    // We'll pass a special flag or handle it in the modal.
    // Let's use a "clean" copy without ID to signify a new entry based on existing data.
    // However, our EditModal relies on ID for updates. 
    // Let's update EditBudgetModal to handle "isDuplicate" prop.
    setEditingBudget({ ...budget, id: 'DUPLICATE_FLAG' });
  };

  return (
    <>
      <div className={styles.grid}>
        {budgets.map((budget) => (
          <BudgetCard
            key={budget.id}
            budget={budget}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onDuplicate={handleDuplicate}
          />
        ))}
      </div>

      {editingBudget && (
        <EditBudgetModal
          isOpen={!!editingBudget}
          onClose={() => setEditingBudget(null)}
          budget={editingBudget}
          isDuplicate={editingBudget.id === 'DUPLICATE_FLAG'}
        />
      )}
    </>
  );
};
