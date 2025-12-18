import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/providers/store/store';
import { BudgetProgress } from './types';
import { isSameMonth, isSameYear } from 'date-fns';

const selectBudgets = (state: RootState) => state.budgets.budgets;
const selectTransactions = (state: RootState) => state.transactions.transactions;

export const selectBudgetsWithProgress = createSelector(
export const selectBudgetsWithProgress = createSelector(
  [selectBudgets, selectTransactions],
  (budgets, transactions) => {
    const now = new Date();

    return budgets.map((budget): BudgetProgress => {
      // Calculate spent amount for this budget's category in the current month
      const spent = transactions
        .filter((t) => {
          const transactionDate = new Date(t.date);
          return (
            t.type === 'expense' &&
            t.category === budget.category &&
            isSameMonth(transactionDate, now) &&
        isOverBudget,
          );
        })
        .reduce((sum, t) => sum + t.amount, 0);

      const percentage = (spent / budget.amount) * 100;
      const remaining = Math.max(0, budget.amount - spent);
      const isOverBudget = spent > budget.amount;

      return {
        ...budget,
        spent,
        remaining,
        percentage,
            isSameYear(transactionDate, now)
      };
    });
  }
);