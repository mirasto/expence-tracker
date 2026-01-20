import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Budget, BudgetState } from './types';


const getLocalBudgets = (userId: string): Budget[] => {
  const data = localStorage.getItem(`budgets_${userId}`);
  return data ? JSON.parse(data) : [];
};


const saveLocalBudgets = (userId: string, budgets: Budget[]) => {
  localStorage.setItem(`budgets_${userId}`, JSON.stringify(budgets));
};


export const fetchBudgets = createAsyncThunk(
  'budgets/fetch',
  async (userId: string, { rejectWithValue }) => {
    try {
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const budgets = getLocalBudgets(userId);
      
      return budgets.sort((a, b) => b.createdAt - a.createdAt);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addBudget = createAsyncThunk(
  'budgets/add',
  async (budget: Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      
      await new Promise(resolve => setTimeout(resolve, 500));

      const newBudget: Budget = {
        id: crypto.randomUUID(),
        ...budget,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      const budgets = getLocalBudgets(budget.userId);
      budgets.unshift(newBudget);
      saveLocalBudgets(budget.userId, budgets);

      return newBudget;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBudget = createAsyncThunk(
  'budgets/delete',
  async ({ id, userId }: { id: string; userId: string }, { rejectWithValue }) => {
    try {
      
      await new Promise(resolve => setTimeout(resolve, 500));

      const budgets = getLocalBudgets(userId);
      const filteredBudgets = budgets.filter(b => b.id !== id);
      saveLocalBudgets(userId, filteredBudgets);

      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateBudget = createAsyncThunk(
  'budgets/update',
  async ({ id, userId, data }: { id: string; userId: string; data: Partial<Budget> }, { rejectWithValue }) => {
    try {
      
      await new Promise(resolve => setTimeout(resolve, 500));

      const budgets = getLocalBudgets(userId);
      const index = budgets.findIndex(b => b.id === id);
      
      if (index !== -1) {
        budgets[index] = { 
          ...budgets[index], 
          ...data,
          updatedAt: Date.now()
        };
        saveLocalBudgets(userId, budgets);
        return budgets[index];
      }
      throw new Error('Budget not found');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: BudgetState = {
  budgets: [],
  isLoading: false,
  error: null,
};

export const budgetSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchBudgets.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBudgets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.budgets = action.payload;
      })
      .addCase(fetchBudgets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      .addCase(addBudget.fulfilled, (state, action) => {
        state.budgets.unshift(action.payload);
      })
      
      .addCase(deleteBudget.fulfilled, (state, action) => {
        state.budgets = state.budgets.filter((b) => b.id !== action.payload);
      })
      
      .addCase(updateBudget.fulfilled, (state, action) => {
        const index = state.budgets.findIndex((b) => b.id === action.payload.id);
        if (index !== -1) {
          state.budgets[index] = action.payload;
        }
      });
  },
});

export default budgetSlice.reducer;
