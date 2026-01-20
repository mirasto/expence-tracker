import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { SavingsGoal, SavingsGoalState } from './types';


const getLocalSavingsGoals = (userId: string): SavingsGoal[] => {
  const data = localStorage.getItem(`savings_goals_${userId}`);
  return data ? JSON.parse(data) : [];
};


const saveLocalSavingsGoals = (userId: string, goals: SavingsGoal[]) => {
  localStorage.setItem(`savings_goals_${userId}`, JSON.stringify(goals));
};


export const fetchSavingsGoals = createAsyncThunk(
  'savingsGoals/fetch',
  async (userId: string, { rejectWithValue }) => {
    try {
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const goals = getLocalSavingsGoals(userId);
      
      return goals.sort((a, b) => b.createdAt - a.createdAt);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addSavingsGoal = createAsyncThunk(
  'savingsGoals/add',
  async (goal: Omit<SavingsGoal, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      
      await new Promise(resolve => setTimeout(resolve, 500));

      const newGoal: SavingsGoal = {
        id: crypto.randomUUID(),
        ...goal,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      const goals = getLocalSavingsGoals(goal.userId);
      goals.unshift(newGoal);
      saveLocalSavingsGoals(goal.userId, goals);

      return newGoal;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteSavingsGoal = createAsyncThunk(
  'savingsGoals/delete',
  async ({ id, userId }: { id: string; userId: string }, { rejectWithValue }) => {
    try {
      
      await new Promise(resolve => setTimeout(resolve, 500));

      const goals = getLocalSavingsGoals(userId);
      const filteredGoals = goals.filter(g => g.id !== id);
      saveLocalSavingsGoals(userId, filteredGoals);

      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateSavingsGoal = createAsyncThunk(
  'savingsGoals/update',
  async ({ id, userId, data }: { id: string; userId: string; data: Partial<SavingsGoal> }, { rejectWithValue }) => {
    try {
      
      await new Promise(resolve => setTimeout(resolve, 500));

      const goals = getLocalSavingsGoals(userId);
      const index = goals.findIndex(g => g.id === id);
      
      if (index !== -1) {
        goals[index] = { 
          ...goals[index], 
          ...data,
          updatedAt: Date.now()
        };
        saveLocalSavingsGoals(userId, goals);
        return goals[index];
      }
      throw new Error('Savings goal not found');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: SavingsGoalState = {
  goals: [],
  isLoading: false,
  error: null,
};

export const savingsGoalSlice = createSlice({
  name: 'savingsGoals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchSavingsGoals.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSavingsGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.goals = action.payload;
      })
      .addCase(fetchSavingsGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      .addCase(addSavingsGoal.fulfilled, (state, action) => {
        state.goals.unshift(action.payload);
      })
      
      .addCase(deleteSavingsGoal.fulfilled, (state, action) => {
        state.goals = state.goals.filter((g) => g.id !== action.payload);
      })
      
      .addCase(updateSavingsGoal.fulfilled, (state, action) => {
        const index = state.goals.findIndex((g) => g.id === action.payload.id);
        if (index !== -1) {
          state.goals[index] = action.payload;
        }
      });
  },
});

export default savingsGoalSlice.reducer;
