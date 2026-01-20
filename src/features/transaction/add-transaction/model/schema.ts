import { z } from 'zod';

export const transactionSchema = z.object({
  amount: z.number().positive('Amount must be greater than 0'),
  type: z.enum(['income', 'expense']),
  category: z.enum([
    'food', 'transport', 'utilities', 'entertainment', 'shopping',
    'health', 'education', 'housing', 'salary', 'investment', 'other'
  ]),
  description: z.string().min(1, 'Description is required'),
  date: z.string(), 
});

export type TransactionFormValues = z.infer<typeof transactionSchema>;
