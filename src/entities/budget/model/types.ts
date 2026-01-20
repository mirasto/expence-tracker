import { TransactionCategory } from '@/entities/transaction/model/types';

export interface Budget {
  id: string;
  userId: string;
  category: TransactionCategory; 
  amount: number;                
  currency: string;
  period: 'monthly';             
  createdAt: number;
  updatedAt: number;
}

export interface BudgetState {
  budgets: Budget[];
  isLoading: boolean;
  error: string | null;
}


export interface BudgetProgress extends Budget {
  spent: number;      
  remaining: number;  
  percentage: number; 
  isOverBudget: boolean;
}
