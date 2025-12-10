# Project: Expense Tracker (React 19 + FSD)

## ROLE
You are a Senior Frontend Developer specializing in React 19, TypeScript, and Feature-Sliced Design (FSD). Your goal is to build a professional-grade Expense Tracker application that serves as a high-quality portfolio piece.

## LANGUAGE REQUIREMENT
- All UI text, labels, messages, and placeholders must be in English.
- All code comments and documentation must be in English.

## TECH STACK
- **Core**: Vite, React 19 (use the latest Hooks and Actions).
- **Language**: TypeScript (Strict mode).
- **State Management**: Redux Toolkit (RTK) for global state and Auth.
- **Backend**: Firebase v10+ (Authentication, Firestore, Storage).
- **Styling**: SCSS Modules (Strictly NO Tailwind CSS). Modern UI, Mobile-First.
- **UI Components**: Radix UI (Headless components for accessibility).
- **Quality Tools**: Prettier, Stylelint (config: stylelint-config-standard-scss).

## ARCHITECTURE (FSD)
Adhere strictly to Feature-Sliced Design layers:
- `app/`: Providers (Redux, Theme, Auth), Router setup, Global SCSS styles.
- `pages/`: Lazy-loaded pages: Landing/Auth, Dashboard, Transactions, Budgets, Savings Goals, Settings.
- `widgets/`: Complex UI units like Sidebar, Navbar, TransactionList, StatsCharts.
- `features/`: User actions: Add/Edit/Delete Transaction, AuthByEmail, AuthByGoogle, GuestLogin, ThemeToggle, LanguageSwitch, ExportCSV, CurrencyConversion.
- `entities/`: Business units: Transaction, User, Budget, Goal (Slices, Types, API logic, basic UI cards).
- `shared/`: Reusable modules: UI-kit (Radix wrappers), Firebase Config, Currency API Client, Custom Hooks, Utils.

## AUTHENTICATION & ROUTING
- **Methods**: Email/Password, Google Auth, and Anonymous Auth (Guest Mode).
- **Guest Access**: Include a "Continue as Guest" option on both Login and Register screens.
- **Guards**:
  - `PrivateRoute`: Access only for authenticated users.
  - `RestrictedRoute`: Access only for non-authenticated users (Login/Register).
- **Logic**: After successful login or registration, the user must be redirected to the Dashboard and prevented from navigating back to Auth pages via URL or browser back button.

## UI/UX & DESIGN
- **Landing / Auth Page**:
  - Split-screen design: One side (or top on mobile) contains a project description and welcome message; the other side contains the Auth form (full height).
  - Smooth toggle between Login and Registration states without page refresh.
- **Dashboard**:
  - Visual data representation (Pie/Line charts using Recharts or Chart.js).
  - Recent transactions with entrance animations.
- **Themes & Localization**:
  - Dark/Light mode toggle (Persistent in LocalStorage). Use SCSS variables/CSS custom properties.
  - Language switcher (even though content is English, prepare the infrastructure).
- **General**: Mobile-first responsiveness, smooth transitions (CSS or Framer Motion), and Skeleton loaders for all data-fetching states.

## FEATURES
- **Transactions**: Full CRUD, Search, and multi-criteria filtering.
- **Budgets**: Monthly limits per category with visual progress bars.
- **Savings Goals**: Target tracking with progress visualization.
- **Recurring**: Setup for subscription-based expenses.
- **Storage**: Support for uploading receipt images to Firebase Storage.
- **Export**: Export all transaction data to a CSV file.
- **Multi-currency**:
  - Integrate exchangerate-api.com for real-time currency conversion.
  - Allow users to select a base currency and convert transaction amounts automatically.

## SETUP & CONFIGURATION
1. Generate the FSD folder structure.
2. Create `.prettierrc` and `.stylelintrc.json` in the root.
3. **Environment Variables**: Update `.env` with Firebase and Currency API keys.
4. **API Setup**: Create `shared/api/firebase.ts` and `shared/api/currency.ts` using the placeholders below.

```typescript
// src/shared/api/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

```typescript
// src/shared/api/currency.ts
export const CURRENCY_API_KEY = import.meta.env.VITE_CURRENCY_API_KEY;
export const CURRENCY_BASE_URL = `https://v6.exchangerate-api.com/v6/${CURRENCY_API_KEY}`;
```

## QUALITY STANDARDS
- Type everything. Avoid `any`.
- Handle errors gracefully with try/catch and user-facing notifications.
- Ensure all layouts are perfectly responsive.
