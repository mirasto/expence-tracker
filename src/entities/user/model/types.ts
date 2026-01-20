export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isAnonymous: boolean;
  providers: string[]; 
}

export interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
}
