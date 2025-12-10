export interface SavingsGoal {
  id: string;
  userId: string;
  name: string;             // e.g., "New Laptop"
  targetAmount: number;     // e.g., 2000
  currentAmount: number;    // e.g., 500
  currency: string;         // e.g., "USD"
  deadline?: number;        // Timestamp (optional)
  color?: string;           // Hex code for UI decoration (optional)
  createdAt: number;
  updatedAt: number;
}

export interface SavingsGoalState {
  goals: SavingsGoal[];
  isLoading: boolean;
  error: string | null;
}

// Derived/Computed properties for UI
export interface SavingsGoalProgress extends SavingsGoal {
  percentage: number;       // (currentAmount / targetAmount) * 100
  remainingAmount: number;  // targetAmount - currentAmount
  isCompleted: boolean;
  monthlySavingsNeeded?: number; // Calculated if deadline exists
}
