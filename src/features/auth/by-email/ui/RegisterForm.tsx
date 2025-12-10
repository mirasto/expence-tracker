import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/shared/api/firebase';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { RegisterFormValues, registerSchema } from '../model/schema';
import styles from './styles.module.scss';

export const RegisterForm = () => {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
    } catch (err: any) {
      setError(err.message || t('common.error'));
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
      <Input
        label={t('auth.confirmPassword')}
        type="password"
        placeholder={t('auth.confirmPassword')}
        error={errors.confirmPassword?.message}
        fullWidth
        {...register('confirmPassword')}
      />
      
      {error && <div className={styles.errorMessage}>{error}</div>}

      <Button type="submit" fullWidth disabled={isLoading}>
        {isLoading ? t('common.loading') : t('auth.createAccount')}
      </Button>
    </form>
  );
};
