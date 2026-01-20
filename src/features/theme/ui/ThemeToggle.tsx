import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/app/providers/ThemeProvider';
import { Button } from '@/shared/ui/Button/Button';

export const ThemeToggle = () => {
  const { t } = useTranslation();
  const { theme, setTheme, resolvedTheme } = useTheme();

  const handleToggle = () => {
    
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleToggle} aria-label={t('common.toggleTheme', 'Toggle theme')}>
      {resolvedTheme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </Button>
  );
};
