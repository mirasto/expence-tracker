import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/providers/store/store';
import { SavingsGoalProgress } from './types';
import { differenceInMonths, isAfter } from 'date-fns';

const selectGoals = (state: RootState) => state.savingsGoals.goals;

export const selectSavingsGoalsWithProgress = createSelector(
  [selectGoals],
  (goals) => {
    return goals.map((goal): SavingsGoalProgress => {
      const percentage = Math.min(100, (goal.currentAmount / goal.targetAmount) * 100);
      const remainingAmount = Math.max(0, goal.targetAmount - goal.currentAmount);
      const isCompleted = goal.currentAmount >= goal.targetAmount;
      
      let monthlySavingsNeeded: number | undefined;
      
      if (goal.deadline && !isCompleted) {
        const now = new Date();
        const deadlineDate = new Date(goal.deadline);
        
        if (isAfter(deadlineDate, now)) {
          const monthsLeft = differenceInMonths(deadlineDate, now);
          
          const divisor = Math.max(1, monthsLeft);
          monthlySavingsNeeded = remainingAmount / divisor;
        }
      }

      return {
        ...goal,
        percentage,
        remainingAmount,
        isCompleted,
        monthlySavingsNeeded
      };
    });
  }
);
