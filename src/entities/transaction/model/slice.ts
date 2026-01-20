import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Transaction, TransactionState, TransactionType, TransactionCategory } from './types';


const getLocalTransactions = (userId: string): Transaction[] => {
  const data = localStorage.getItem(`transactions_${userId}`);
  return data ? JSON.parse(data) : [];
};


const saveLocalTransactions = (userId: string, transactions: Transaction[]) => {
  localStorage.setItem(`transactions_${userId}`, JSON.stringify(transactions));
};


export const fetchTransactions = createAsyncThunk(
  'transactions/fetch',
  async (userId: string, { rejectWithValue }) => {
    try {
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const transactions = getLocalTransactions(userId);
      
      return transactions.sort((a, b) => b.date - a.date);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTransaction = createAsyncThunk(
  'transactions/add',
  async (transaction: Omit<Transaction, 'id'>, { rejectWithValue }) => {
    try {
      
      await new Promise(resolve => setTimeout(resolve, 500));

      const newTransaction: Transaction = {
        id: crypto.randomUUID(),
        ...transaction
      };

      const transactions = getLocalTransactions(transaction.userId);
      transactions.unshift(newTransaction);
      saveLocalTransactions(transaction.userId, transactions);

      return newTransaction;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  'transactions/delete',
  async ({ id, userId }: { id: string; userId: string }, { rejectWithValue }) => {
    try {
      
      await new Promise(resolve => setTimeout(resolve, 500));

      const transactions = getLocalTransactions(userId);
      const filteredTransactions = transactions.filter(t => t.id !== id);
      saveLocalTransactions(userId, filteredTransactions);

      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTransaction = createAsyncThunk(
  'transactions/update',
  async ({ id, userId, data }: { id: string; userId: string; data: Partial<Transaction> }, { rejectWithValue }) => {
    try {
      
      await new Promise(resolve => setTimeout(resolve, 500));

      const transactions = getLocalTransactions(userId);
      const index = transactions.findIndex(t => t.id === id);
      
      if (index !== -1) {
        transactions[index] = { ...transactions[index], ...data };
        saveLocalTransactions(userId, transactions);
        return { id, ...data };
      }
      throw new Error('Transaction not found');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: TransactionState = {
  transactions: [],
  isLoading: false,
  error: null,
  filter: {
    type: 'all',
    category: 'all',
    startDate: null,
    endDate: null,
    search: '',
  },
};

export const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setFilterType: (state, action: PayloadAction<TransactionType | 'all'>) => {
      state.filter.type = action.payload;
    },
    setFilterCategory: (state, action: PayloadAction<TransactionCategory | 'all'>) => {
      state.filter.category = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.filter.search = action.payload;
    },
    setDateRange: (state, action: PayloadAction<{ start: number | null; end: number | null }>) => {
      state.filter.startDate = action.payload.start;
      state.filter.endDate = action.payload.end;
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.unshift(action.payload);
      })
      
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter((t) => t.id !== action.payload);
      })
      
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const index = state.transactions.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.transactions[index] = { ...state.transactions[index], ...action.payload };
        }
      });
  },
});

export const { setFilterType, setFilterCategory, setSearch, setDateRange } = transactionSlice.actions;
export default transactionSlice.reducer;
