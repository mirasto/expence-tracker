import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/app/providers/store/store';
import { updateUserProfile } from '@/entities/user/model/slice';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import styles from './Settings.module.scss';
import { Check, Mail, Smartphone, Globe } from 'lucide-react';

export const ProfileSettings = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    if (displayName.trim()) {
      await dispatch(updateUserProfile({ displayName }));
      setIsEditing(false);
    }
  };

  if (!user) return null;

  const getProviderIcon = (providerId: string) => {
    if (providerId.includes('google')) return <Globe size={16} />;
    if (providerId.includes('password')) return <Mail size={16} />;
    if (providerId.includes('phone')) return <Smartphone size={16} />;
    return <Check size={16} />;
  };

  const getProviderName = (providerId: string) => {
    if (providerId.includes('google')) return 'Google';
    if (providerId.includes('password')) return 'Email/Password';
    if (providerId.includes('phone')) return 'Phone';
    return providerId;
  };

  return (
    <div className={styles.settingsGroup}>
      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>
          <label>{t('settings.displayName', 'Display Name')}</label>
          <span className={styles.description}>
            {t('settings.displayNameDesc', 'Used in welcome messages and emails')}
          </span>
        </div>
        
        <div className={styles.settingControl}>
          {isEditing ? (
            <div className={styles.editRow}>
              <Input 
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your name"
              />
              <div className={styles.editActions}>
                <Button size="sm" onClick={handleSave}>{t('common.save')}</Button>
                <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>{t('common.cancel')}</Button>
              </div>
            </div>
          ) : (
            <div className={styles.displayRow}>
              <span className={styles.value}>{user.displayName || ''}</span>
              <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                {t('common.edit')}
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className={styles.settingItem}>
        <div className={styles.settingLabel}>
          <label>{t('settings.linkedAccounts', 'Linked Accounts')}</label>
          <span className={styles.description}>
            {t('settings.linkedAccountsDesc', 'Providers used to sign in')}
          </span>
        </div>
        
        <div className={styles.providersList}>
          {user.providers?.map((provider) => (
            <div key={provider} className={styles.providerBadge}>
              {getProviderIcon(provider)}
              <span>{getProviderName(provider)}</span>
            </div>
          ))}
          {(!user.providers || user.providers.length === 0) && (
             <div className={styles.providerBadge}>
               <Mail size={16} />
               <span>{t('settings.guestEmailLabel', 'Guest / Email')}</span>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
