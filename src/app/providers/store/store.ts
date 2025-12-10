import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/entities/user/model/slice';
import transactionReducer from '@/entities/transaction/model/slice';
import budgetReducer from '@/entities/budget/model/slice';
import savingsGoalReducer from '@/entities/savings-goal/model/slice';
import settingsReducer from '@/entities/settings/model/slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    transactions: transactionReducer,
    budgets: budgetReducer,
    savingsGoals: savingsGoalReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Firebase objects might cause issues if not careful, but we store plain objects
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
