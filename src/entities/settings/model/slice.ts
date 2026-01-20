import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SettingsState {
  currency: string;
  compactMode: boolean;
  isLoading: boolean;
}


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
  compactMode: false,
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
    setCompactMode: (state, action: PayloadAction<boolean>) => {
      state.compactMode = action.payload;
      localStorage.setItem('app_settings', JSON.stringify(state));
    },
  },
});

export const { 
  setCurrency, 
  setCompactMode 
} = settingsSlice.actions;

export default settingsSlice.reducer;
