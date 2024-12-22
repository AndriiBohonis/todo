import { FC } from 'react';

import { useTheme } from '@/core/contexts/theme-provider.tsx';
import { Moon, Sun } from 'lucide-react';

import { Toggle } from '@/components/ui/toggle.tsx';

export const ThemeToggle: FC = () => {
  const { isDark, setTheme } = useTheme();

  return (
    <Toggle
      className="w-[30px]"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      pressed={isDark}
      size="sm"
    >
      {!isDark ? <Moon /> : <Sun />}
    </Toggle>
  );
};
