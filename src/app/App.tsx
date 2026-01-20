import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./providers/ThemeProvider";
import { StoreProvider } from "./providers/store/ui";
import { AuthProvider } from "./providers/auth/AuthProvider";
import { PrivateRoute, RestrictedRoute } from "./providers/router/Guards";
import { AuthPage } from "@/pages/auth/AuthPage";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { TransactionsPage } from "@/pages/transactions/TransactionsPage";
import { BudgetsPage } from "@/pages/budgets/BudgetsPage";
import { SavingsGoalsPage } from "@/pages/savings-goals/SavingsGoalsPage";
import { SettingsPage } from "@/pages/settings/SettingsPage";
import { MainLayout } from "@/widgets/layout/ui/MainLayout";

export default function App() {
  return (
    <StoreProvider>
      <AuthProvider>
        <ThemeProvider>
          <Router>
            <Routes>
              {}
              <Route element={<RestrictedRoute />}>
                <Route path="/auth" element={<AuthPage />} />
              </Route>

              {}
              <Route element={<PrivateRoute />}>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/transactions" element={<TransactionsPage />} />
                  <Route path="/budgets" element={<BudgetsPage />} />
                  <Route path="/goals" element={<SavingsGoalsPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Route>
              </Route>

              {}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </StoreProvider>
  );
}
