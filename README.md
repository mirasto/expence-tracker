# 💰 Expense Tracker

A modern, feature-rich personal finance management application built with **React 19**, **TypeScript**, and **Feature-Sliced Design (FSD)**.
This application helps users track income and expenses, manage budgets, and achieve savings goals through an intuitive and responsive interface.

![Dashboard](https://i.ibb.co/HfSy2zkc/dashoard-new.png)

---

## 🚀 Key Features

* **Dashboard Overview**
  Real-time financial health summary with interactive charts (Monthly Trends, Expense Distribution).

* **Transaction Management**
  Record and categorize income and expenses with ease.

* **Smart Budgeting**
  Set and monitor monthly limits for different categories to prevent overspending.

* **Savings Goals**
  Create financial goals and track progress with deposit and withdraw functionality.

* **Visual Analytics**
  Data visualization using Recharts for clear financial insights.

* **Multi-language Support**
  Fully localized in English and Ukrainian using i18next.

* **Theme Customization**
  Seamless dark and light mode switching.

* **Secure Authentication**
  Robust user management via Firebase (Email/Password, Google Auth, Guest Access).

* **Responsive Design**
  Optimized for both desktop and mobile devices.

---

## 🛠️ Tech Stack

### Core

* **Framework**: [React 19](https://react.dev/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Build Tool**: [Vite](https://vitejs.dev/)
* **Architecture**: [Feature-Sliced Design (FSD)](https://feature-sliced.design/)

### State Management & Data

* **Global State**: [Redux Toolkit](https://redux-toolkit.js.org/)
* **Backend (BaaS)**: [Firebase](https://firebase.google.com/) (Authentication, Firestore)

### UI & Styling

* **Styling**: SCSS Modules, [clsx](https://github.com/lukeed/clsx)
* **Components**: [Radix UI](https://www.radix-ui.com/)
* **Animations**: [Framer Motion](https://www.framer.com/motion/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Charts**: [Recharts](https://recharts.org/)

### Forms & Validation

* **Form Handling**: [React Hook Form](https://react-hook-form.com/)
* **Validation**: [Zod](https://zod.dev/)

### Utilities

* **Dates**: [date-fns](https://date-fns.org/)
* **Internationalization**: [i18next](https://www.i18next.com/)

---

## 📸 Screenshots

![Budget](https://i.ibb.co/WWKVzS4D/budget.png)

![Saving Goals](https://i.ibb.co/sv6BzD4Z/goals.png)

---

## 📂 Project Architecture

This project follows the **Feature-Sliced Design (FSD)** methodology, organizing code into layers based on responsibility and scope:

```txt
src/
├── app/        # Global setup (providers, styles, store configuration)
├── pages/      # Page composition and routing
├── widgets/    # Large UI blocks (Sidebar, Header, DashboardStats)
├── features/   # User interactions (AddTransaction, Login, ChangeTheme)
├── entities/   # Business domain models (Transaction, Budget, SavingsGoal)
└── shared/     # Reusable UI kit, utilities, helpers, and configuration
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js v18 or higher
* npm or yarn

---

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/mirasto/expence-tracker.git
cd expence-tracker
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Environment Configuration

Create a `.env` file in the root directory.
Use `.env.example` as a reference.

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_CURRENCY_API_KEY=your_currency_api_key
```

#### 4. Start the development server

```bash
npm run dev
```

---

## 📜 Available Scripts

```bash
npm run dev      # Starts the development server
npm run build    # Builds the application for production
npm run preview  # Previews the production build locally
npm run lint     # Runs ESLint
npm run check    # Runs TypeScript type checking
```
