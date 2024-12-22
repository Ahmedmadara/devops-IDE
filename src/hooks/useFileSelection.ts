import { useState, useCallback } from 'react';

export function useFileSelection() {
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());

  const toggleSelection = useCallback((path: string, multiSelect: boolean) => {
    setSelectedFiles(prev => {
      const newSelection = new Set(prev);
      if (multiSelect) {
        if (newSelection.has(path)) {
          newSelection.delete(path);
        } else {
          newSelection.add(path);
        }
      } else {
        if (newSelection.has(path) && newSelection.size === 1) {
          newSelection.clear();
        } else {
          newSelection.clear();
          newSelection.add(path);
        }
      }
      return newSelection;
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedFiles(new Set());
  }, []);

  return {
    selectedFiles,
    toggleSelection,
    clearSelection,
  };
}