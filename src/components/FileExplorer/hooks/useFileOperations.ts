import { useState, useCallback } from 'react';
import { FileSystemItem } from '../types';

export function useFileOperations() {
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [clipboard, setClipboard] = useState<{ type: 'copy' | 'cut'; paths: string[] } | null>(null);

  const selectFile = useCallback((path: string, multiSelect: boolean) => {
    setSelectedFiles(prev => {
      const next = new Set(multiSelect ? prev : []);
      if (prev.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  }, []);

  const toggleFolder = useCallback((path: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (prev.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  }, []);

  const copyToClipboard = useCallback((paths: string[]) => {
    setClipboard({ type: 'copy', paths });
  }, []);

  const cutToClipboard = useCallback((paths: string[]) => {
    setClipboard({ type: 'cut', paths });
  }, []);

  const clearClipboard = useCallback(() => {
    setClipboard(null);
  }, []);

  return {
    selectedFiles,
    expandedFolders,
    clipboard,
    selectFile,
    toggleFolder,
    copyToClipboard,
    cutToClipboard,
    clearClipboard,
  };
}