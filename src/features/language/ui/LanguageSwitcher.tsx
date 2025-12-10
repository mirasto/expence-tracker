import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { Button } from '@/shared/ui/Button/Button';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'uk' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      aria-label="Switch language"
      onClick={toggleLanguage}
    >
      <Globe size={20} />
      <span style={{ marginLeft: 8, fontSize: '0.875rem' }}>
        {i18n.language === 'uk' ? 'UA' : 'EN'}
      </span>
    </Button>
  );
};
