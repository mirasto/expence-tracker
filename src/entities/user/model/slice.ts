import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { updateProfile } from 'firebase/auth';
import { auth } from '@/shared/api/firebase';
import { User, UserState } from './types';


export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ displayName, photoURL }: { displayName?: string; photoURL?: string }, { rejectWithValue }) => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName,
          photoURL,
        });
        
        
        return { displayName, photoURL };
      }
      throw new Error('No user logged in');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: UserState = {
  user: null,
  isLoading: true, 
  error: null,
  isInitialized: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isLoading = false;
      state.isInitialized = true;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.user) {
          if (action.payload.displayName !== undefined) state.user.displayName = action.payload.displayName;
          if (action.payload.photoURL !== undefined) state.user.photoURL = action.payload.photoURL;
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
