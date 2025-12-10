import { z } from 'zod';

export const transactionSchema = z.object({
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
});

export type TransactionFormValues = z.infer<typeof transactionSchema>;
