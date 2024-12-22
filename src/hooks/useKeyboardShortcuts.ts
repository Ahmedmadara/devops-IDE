import { useEffect } from 'react';

interface ShortcutHandler {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  handler: () => void;
}

export function useKeyboardShortcuts(shortcuts: ShortcutHandler[]) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const shortcut = shortcuts.find(
        (s) =>
          s.key === event.key &&
          !!s.ctrl === event.ctrlKey &&
          !!s.shift === event.shiftKey
      );

      if (shortcut) {
        event.preventDefault();
        shortcut.handler();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}