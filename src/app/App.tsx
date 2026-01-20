import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./providers/ThemeProvider";
import { StoreProvider } from "./providers/store/ui";
import { AuthProvider } from "./providers/auth/AuthProvider";
import { PrivateRoute, RestrictedRoute } from "./providers/router/Guards";
import { MainLayout } from "@/widgets/layout/ui/MainLayout";
import { Loader } from "@/shared/ui/Loader/Loader";


const AuthPage = lazy(() => import("@/pages/auth/AuthPage").then(module => ({ default: module.AuthPage })));
const DashboardPage = lazy(() => import("@/pages/dashboard/DashboardPage").then(module => ({ default: module.DashboardPage })));
const TransactionsPage = lazy(() => import("@/pages/transactions/TransactionsPage").then(module => ({ default: module.TransactionsPage })));
const BudgetsPage = lazy(() => import("@/pages/budgets/BudgetsPage").then(module => ({ default: module.BudgetsPage })));
const SavingsGoalsPage = lazy(() => import("@/pages/savings-goals/SavingsGoalsPage").then(module => ({ default: module.SavingsGoalsPage })));
const SettingsPage = lazy(() => import("@/pages/settings/SettingsPage").then(module => ({ default: module.SettingsPage })));

export default function App() {
  return (
    <StoreProvider>
      <AuthProvider>
        <ThemeProvider>
          <Router>
            <Suspense fallback={<Loader />}>
              <Routes>
          
                <Route element={<RestrictedRoute />}>
                  <Route path="/auth" element={<AuthPage />} />
                </Route>

             
                <Route element={<PrivateRoute />}>
                  <Route element={<MainLayout />}>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/transactions" element={<TransactionsPage />} />
                    <Route path="/budgets" element={<BudgetsPage />} />
                    <Route path="/goals" element={<SavingsGoalsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                  </Route>
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </StoreProvider>
  );
}
