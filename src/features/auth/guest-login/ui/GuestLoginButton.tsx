import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { signInAnonymously } from 'firebase/auth';
import { auth } from '@/shared/api/firebase';
import { Button } from '@/shared/ui/Button/Button';

export const GuestLoginButton = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGuestLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signInAnonymously(auth);
    } catch (err: any) {
      console.error(err);
      setError(t('common.error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      {error && <div style={{ color: 'var(--color-danger)', fontSize: '0.875rem' }}>{error}</div>}
      <Button 
        variant="ghost" 
        fullWidth 
        onClick={handleGuestLogin} 
        disabled={isLoading}
        type="button"
      >
        {isLoading ? t('common.loading') : t('auth.guestLogin')}
      </Button>
    </div>
  );
};
