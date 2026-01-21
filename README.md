# Expense Tracker


![Vite](https://img.shields.io/badge/vite-%5E5.0-646CFF?logo=vite) ![React](https://img.shields.io/badge/react-%5E19.0.0-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/typescript-%5E5.0-3178C6?logo=typescript) ![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-6441AA?logo=redux&logoColor=white) ![Firebase](https://img.shields.io/badge/firebase-%5E10.0.0-FFCA28?logo=firebase)


![Dashboard](https://i.ibb.co/WN6Nbysf/Expence-dashboard.png)

## 1. Project Overview

**Expense Tracker** is a modern, feature-rich personal finance management application designed to help users take control of their financial health. Built with performance and scalability in mind, it utilizes **React 19**, **TypeScript**, and follows the **Feature-Sliced Design (FSD)** architecture.

The application provides a seamless and intuitive interface for tracking income and expenses, setting monthly budgets, and managing long-term savings goals. With real-time analytics and multi-language support, it caters to a diverse range of users looking to optimize their spending habits.
### Key Features

*   **Dashboard Overview**: Real-time summary of financial health with interactive charts (Monthly Trends, Expense Distribution).
*   **Transaction Management**: Easily record, edit, and categorize income and expenses.
*   **Smart Budgeting**: Set monthly spending limits per category to prevent overspending.
*   **Savings Goals**: Create financial targets and track progress with deposit/withdrawal functionality.
*   **Visual Analytics**: Comprehensive data visualization using Recharts for clear financial insights.
*   **Multi-language Support**: Fully localized interface (English & Ukrainian) powered by i18next.
*   **Theme Customization**: Native support for Dark and Light modes with system preference detection.
*   **Secure Authentication**: Robust user management via Firebase (Email/Password, Google Auth, Guest Access).
*   **Responsive Design**: Fully optimized experience across desktop, tablet, and mobile devices.

## Development Information

### Architecture

This project follows the Feature-Sliced Design (FSD)** methodology to ensure maintainability and scalability.

*   **`app/`**: Global app setup (providers, styles, routing).
*   **`pages/`**: Composition layer for constructing full pages.
*   **`widgets/`**: Compositional units that combine entities and features (e.g., Header, Sidebar).
*   **`features/`**: User interactions (e.g., Auth, AddTransaction).
*   **`entities/`**: Business entities (e.g., Transaction, User, Budget).
*   **`shared/`**: Reusable infrastructure code (UI kit, api, libs).
### Tech Stack
*   **Core**: React 19, TypeScript, Vite
*   **State**: Redux Toolkit, React-Redux
*   **Styling**: SCSS Modules, clsx
*   **Backend**: Firebase (Auth, Firestore)
*   **Testing**: Vitest, React Testing Library
*   **Validation**: Zod, React Hook Form

### Basic Usage

*   **Sign Up/Login**: Create an account using email/password or sign in with Google. Use "Guest Mode" for a quick preview.
*   **Add Transaction**: Click the "+" button to record a new income or expense.
*   **Set Budgets**: Navigate to the Budgets tab to define monthly limits for specific categories.
*   **Manage Savings**: Go to the Goals tab to create savings targets and contribute funds.
*   **View Reports**: The Dashboard provides a visual breakdown of your financial activity.

### Screenshot
 ![Budged](https://i.ibb.co/sGN8JfF/expence-budged.png)

---

## Installation Instructions

Follow these steps to set up the project locally on your machine.

---

### 🛠 Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js**: `v18.0.0` or higher
* **Package Manager**: **npm** (`v9+`) or **yarn** (`v3+`)

---

### Step-by-Step Setup

1. **Clone the repository**
```bash
git clone https://github.com/mirasto/expense-tracker.git
cd expense-tracker

```


2. **Install dependencies**
```bash
npm install
# or
yarn install

```


3. **Configure Environment Variables**
Create a `.env` file in the root directory by copying the example file:
```bash
cp .env.example .env

```


Then, open `.env` and fill in your **Firebase** configuration keys:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

```


4. **Start the Development Server**
```bash
npm run dev

```




  

