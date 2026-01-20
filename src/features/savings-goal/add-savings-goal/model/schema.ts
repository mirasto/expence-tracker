import { z } from 'zod';

export const savingsGoalSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name is too long'),
  targetAmount: z.number().min(1, 'Target amount must be at least 1'),
  currentAmount: z.number().min(0, 'Current amount cannot be negative'),
  deadline: z.string().optional(), 
});

export type SavingsGoalFormValues = z.infer<typeof savingsGoalSchema>;
