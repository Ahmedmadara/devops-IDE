import { useCallback } from 'react';
import { api } from '@/lib/api';

export function useTerminal() {
  const executeCommand = useCallback(async (command: string) => {
    try {
      const { data } = await api.post('/terminal/execute', { command });
      return data;
    } catch (error) {
      console.error('Terminal command failed:', error);
      throw error;
    }
  }, []);

  return {
    executeCommand,
  };
}