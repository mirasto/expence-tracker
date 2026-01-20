import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginForm } from '@/features/auth/by-email/ui/LoginForm';
import { RegisterForm } from '@/features/auth/by-email/ui/RegisterForm';
import { GoogleLoginButton } from '@/features/auth/by-google/ui/GoogleLoginButton';
import { GuestLoginButton } from '@/features/auth/guest-login/ui/GuestLoginButton';
import styles from './AuthPage.module.scss';

export const AuthPage = () => {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={styles.container}>
      <div className={styles.contentSide}>
        <div className={styles.header}>
          <h1 className={styles.title}>Expense Tracker</h1>
          <p className={styles.subtitle}>
            Manage your finances, track your spending, and reach your saving goals with ease.
          </p>
        </div>
        
        <div className={styles.card}>
          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${isLogin ? styles.active : ''}`}
              onClick={() => setIsLogin(true)}
            >
              {t('auth.login')}
            </button>
            <button 
              className={`${styles.tab} ${!isLogin ? styles.active : ''}`}
              onClick={() => setIsLogin(false)}
            >
              {t('auth.register')}
            </button>
          </div>

          <div className={styles.formContainer}>
            {isLogin ? <LoginForm /> : <RegisterForm />}
          </div>

          <div className={styles.divider}>
            <span>Or</span>
          </div>

          <div className={styles.socialActions}>
            <GoogleLoginButton />
            <GuestLoginButton />
          </div>
        </div>
      </div>
      
      <div className={styles.visualSide}>
        <div className={styles.visualContent}>
          <h2>{t('auth.taglineTitle', 'Smart Financial Management')}</h2>
          <p>{t('auth.taglineDesc', 'Visualize your income and expenses in one place.')}</p>
        </div>
      </div>
    </div>
  );
};
