import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../../hooks/useTheme';
import { Tooltip } from '../../ui/Tooltip';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Tooltip content={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-md hover:bg-gray-700 transition-colors"
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </button>
    </Tooltip>
  );
}