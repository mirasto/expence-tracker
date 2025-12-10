import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/app/providers/ThemeProvider';
import { Button } from '@/shared/ui/Button/Button';

export const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const handleToggle = () => {
    // Simple toggle logic: if light -> dark, else -> light (overriding system)
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleToggle} aria-label="Toggle theme">
      {resolvedTheme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </Button>
  );
};
