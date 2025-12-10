import { TransactionCategory } from '@/entities/transaction/model/types';

export interface Budget {
  id: string;
  userId: string;
  category: TransactionCategory; // e.g., 'food', 'transport'
  amount: number;                // The spending limit (e.g., $500)
  currency: string;
  period: 'monthly';             // For now, support monthly budgets
  createdAt: number;
  updatedAt: number;
}

export interface BudgetState {
  budgets: Budget[];
  isLoading: boolean;
  error: string | null;
}

// Derived state (calculated on the fly, not stored in DB)
export interface BudgetProgress extends Budget {
  spent: number;      // Total transaction amount for this category
  remaining: number;  // amount - spent
  percentage: number; // (spent / amount) * 100
  isOverBudget: boolean;
}
