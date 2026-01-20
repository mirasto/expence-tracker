import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/shared/api/firebase';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { LoginFormValues, loginSchema } from '../model/schema';
import { getAuthErrorMessageKey } from '@/shared/lib/authErrors';
import styles from './styles.module.scss';

export const LoginForm = () => {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (err: any) {
      const errorKey = getAuthErrorMessageKey(err.code);
      setError(t(errorKey));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Input
        label={t('auth.email')}
        type="email"
        placeholder={t('auth.email')}
        error={errors.email?.message}
        fullWidth
        {...register('email')}
      />
      <Input
        label={t('auth.password')}
        type="password"
        placeholder={t('auth.password')}
        error={errors.password?.message}
        fullWidth
        {...register('password')}
      />
      
      {error && <div className={styles.errorMessage}>{error}</div>}

      <Button type="submit" fullWidth disabled={isLoading}>
        {isLoading ? t('common.loading') : t('auth.login')}
      </Button>
    </form>
  );
};
