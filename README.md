# 💰 Expense Tracker

![React](https://img.shields.io/badge/react-%5E19.0.0-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/typescript-%5E5.0-3178C6?logo=typescript)

## 📖 Project Overview

  

**Expense Tracker** is a modern, feature-rich personal finance management application designed to help users take control of their financial health. Built with performance and scalability in mind, it utilizes **React 19**, **TypeScript**, and follows the **Feature-Sliced Design (FSD)** architecture.

  

The application provides a seamless and intuitive interface for tracking income and expenses, setting monthly budgets, and managing long-term savings goals. With real-time analytics and multi-language support, it caters to a diverse range of users looking to optimize their spending habits.

  

### ✨ Key Features

  

*   **📊 Dashboard Overview**: Real-time summary of financial health with interactive charts (Monthly Trends, Expense Distribution).

*   **💸 Transaction Management**: Easily record, edit, and categorize income and expenses.

*   **📉 Smart Budgeting**: Set monthly spending limits per category to prevent overspending.

*   **🎯 Savings Goals**: Create financial targets and track progress with deposit/withdrawal functionality.

*   **📈 Visual Analytics**: Comprehensive data visualization using Recharts for clear financial insights.

*   **🌍 Multi-language Support**: Fully localized interface (English & Ukrainian) powered by i18next.

*   **🎨 Theme Customization**: Native support for Dark and Light modes with system preference detection.

*   **🔐 Secure Authentication**: Robust user management via Firebase (Email/Password, Google Auth, Guest Access).

*   **📱 Responsive Design**: Fully optimized experience across desktop, tablet, and mobile devices.



  

**Dashboard**

![Dashboard](https://i.ibb.co/HfSy2zkc/dashoard-new.png)


  

## 🛠️ Technology Stack

  

The project leverages a modern stack to ensure performance, type safety, and developer experience.

  

### **Core**

*   **Framework**: [React 19](https://react.dev/) - The library for web and native user interfaces.

*   **Language**: [TypeScript](https://www.typescriptlang.org/) - Strongly typed superset of JavaScript.

*   **Build Tool**: [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling.

*   **Architecture**: [Feature-Sliced Design (FSD)](https://feature-sliced.design/) - Architectural methodology for frontend projects.

  

### **State Management & Data**

*   **Global State**: [Redux Toolkit](https://redux-toolkit.js.org/) - The official, opinionated, batteries-included toolset for efficient Redux development.

*   **Backend (BaaS)**: [Firebase](https://firebase.google.com/) - Authentication and Firestore Database.

  

### **UI & Styling**

*   **Styling**: SCSS Modules & [clsx](https://github.com/lukeed/clsx) - For modular and conditional styling.

*   **Components**: [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components for building high-quality design systems.

*   **Animations**: [Framer Motion](https://www.framer.com/motion/) - Production-ready motion library for React.

*   **Icons**: [Lucide React](https://lucide.dev/) - Beautiful & consistent icons.

*   **Charts**: [Recharts](https://recharts.org/) - Redefined chart library built with React and D3.

  

### **Forms & Validation**

*   **Form Handling**: [React Hook Form](https://react-hook-form.com/) - Performant, flexible and extensible forms.

*   **Validation**: [Zod](https://zod.dev/) - TypeScript-first schema declaration and validation.

  

### **Utilities**

*   **Dates**: [date-fns](https://date-fns.org/) - Modern JavaScript date utility library.

*   **Internationalization**: [i18next](https://www.i18next.com/) - Internationalization framework.

  

---

  

## 📂 Documentation & Architecture

  

### Feature-Sliced Design (FSD)

This project is structured according to FSD principles, dividing the codebase into layers based on responsibility:

  

```txt

src/

├── app/        # Global setup (providers, styles, store configuration)

├── pages/      # Page composition and routing (Dashboard, Settings, etc.)

├── widgets/    # Large UI blocks (Sidebar, Header, DashboardStats)

├── features/   # User interactions (AddTransaction, Login, ChangeTheme)

├── entities/   # Business domain models (Transaction, Budget, SavingsGoal)

└── shared/     # Reusable UI kit, utilities, helpers, and configuration

```

  

### Useful Links

*   [Feature-Sliced Design Documentation](https://feature-sliced.design/)

*   [Firebase Documentation](https://firebase.google.com/docs)

*   [React 19 Documentation](https://react.dev/blog/2024/04/25/react-19)

  

---

### 📸 Screenshots

**Budget Management**

![Budget](https://i.ibb.co/WWKVzS4D/budget.png)

  

**Savings Goals**

![Saving Goals](https://i.ibb.co/sv6BzD4Z/goals.png)

  

---


## � Development Information

  

### Getting Started

  

Follow these instructions to set up the project locally.

  

#### 1. Prerequisites

*   **Node.js**: v18 or higher

*   **Package Manager**: npm or yarn

  

#### 2. Installation

  

Clone the repository:

```bash

git clone https://github.com/mirasto/expence-tracker.git

cd expence-tracker

```

  

Install dependencies:

```bash

npm install

```

  

#### 3. Environment Setup

  

Create a `.env` file in the root directory and configure your Firebase credentials. You can use `.env.example` as a reference.

  

```env

VITE_FIREBASE_API_KEY=your_api_key

VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain

VITE_FIREBASE_PROJECT_ID=your_project_id

VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket

VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id

VITE_FIREBASE_APP_ID=your_app_id

```

  

#### 4. Running the App

  

Start the development server:

```bash

npm run dev

```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

  

### Testing & Quality

  

*   **Linting**: Run `npm run lint` to check for code style issues.

*   **Type Checking**: Run `npm run check` to verify TypeScript types.

*   **Unit Tests**: Run `npm run test` (if configured) to execute test suites.

  

### Building for Production

  

To create a production-ready build:

```bash

npm run build

```

To preview the production build locally:

```bash

npm run preview

```
