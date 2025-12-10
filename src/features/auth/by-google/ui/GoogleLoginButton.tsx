import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/shared/api/firebase';
import { Button } from '@/shared/ui/Button/Button';

export const GoogleLoginButton = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
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
        variant="outline" 
        fullWidth 
        onClick={handleGoogleLogin} 
        disabled={isLoading}
        type="button"
      >
        {isLoading ? t('common.loading') : t('auth.googleLogin')}
      </Button>
    </div>
  );
};
