export interface SavingsGoal {
  id: string;
  userId: string;
  name: string;             
  targetAmount: number;     
  currentAmount: number;    
  currency: string;         
  deadline?: number;        
  color?: string;           
  createdAt: number;
  updatedAt: number;
}

export interface SavingsGoalState {
  goals: SavingsGoal[];
  isLoading: boolean;
  error: string | null;
}


export interface SavingsGoalProgress extends SavingsGoal {
  percentage: number;       
  remainingAmount: number;  
  isCompleted: boolean;
  monthlySavingsNeeded?: number; 
}
