import { z } from 'zod';
import { TransactionCategory } from '@/entities/transaction/model/types';

// We can't import the type directly into z.enum, so we list them
export const CATEGORIES: [TransactionCategory, ...TransactionCategory[]] = [
  'food', 'transport', 'utilities', 'entertainment', 'shopping',
  'health', 'education', 'housing', 'salary', 'investment', 'other'
];

export const budgetSchema = z.object({
  category: z.enum(CATEGORIES),
  amount: z.number().min(1, 'Amount must be at least 1'),
});

export type BudgetFormValues = z.infer<typeof budgetSchema>;
