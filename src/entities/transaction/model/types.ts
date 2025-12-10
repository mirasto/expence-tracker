export type TransactionType = 'income' | 'expense';

export type TransactionCategory = 
  | 'food' | 'transport' | 'utilities' | 'entertainment' | 'shopping' 
  | 'health' | 'education' | 'housing' | 'salary' | 'investment' | 'other';

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  description: string;
  date: number; // Timestamp
  receiptUrl?: string;
  currency: string;
  createdAt: number;
}

export interface TransactionState {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  filter: {
    type: TransactionType | 'all';
    category: TransactionCategory | 'all';
    startDate: number | null;
    endDate: number | null;
    search: string;
  };
}
