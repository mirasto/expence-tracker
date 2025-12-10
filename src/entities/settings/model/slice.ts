import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CustomCategory {
  id: string;
  name: string;
  color: string;
  icon: string; // lucide icon name
}

export interface SettingsState {
  currency: string;
  monthlyStartDay: number;
  compactMode: boolean;
  customCategories: CustomCategory[];
  isLoading: boolean;
}

// Load from localStorage
const loadSettings = (): Partial<SettingsState> => {
  try {
    const saved = localStorage.getItem('app_settings');
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
};

const initialState: SettingsState = {
  currency: 'USD',
  monthlyStartDay: 1,
  compactMode: false,
  customCategories: [],
  isLoading: false,
  ...loadSettings(),
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
      localStorage.setItem('app_settings', JSON.stringify(state));
    },
    setMonthlyStartDay: (state, action: PayloadAction<number>) => {
      state.monthlyStartDay = action.payload;
      localStorage.setItem('app_settings', JSON.stringify(state));
    },
    setCompactMode: (state, action: PayloadAction<boolean>) => {
      state.compactMode = action.payload;
      localStorage.setItem('app_settings', JSON.stringify(state));
    },
    addCustomCategory: (state, action: PayloadAction<CustomCategory>) => {
      state.customCategories.push(action.payload);
      localStorage.setItem('app_settings', JSON.stringify(state));
    },
    removeCustomCategory: (state, action: PayloadAction<string>) => {
      state.customCategories = state.customCategories.filter(c => c.id !== action.payload);
      localStorage.setItem('app_settings', JSON.stringify(state));
    },
    updateCustomCategory: (state, action: PayloadAction<CustomCategory>) => {
      const index = state.customCategories.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.customCategories[index] = action.payload;
        localStorage.setItem('app_settings', JSON.stringify(state));
      }
    },
  },
});

export const { 
  setCurrency, 
  setMonthlyStartDay, 
  setCompactMode, 
  addCustomCategory, 
  removeCustomCategory, 
  updateCustomCategory 
} = settingsSlice.actions;

export default settingsSlice.reducer;
