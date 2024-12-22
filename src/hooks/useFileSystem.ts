import { useState, useCallback } from 'react';
import { api } from '@/lib/api';

interface FileSystemItem {
  path: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileSystemItem[];
}

export function useFileSystem() {
  const [files, setFiles] = useState<FileSystemItem[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);

  const createFile = useCallback(async (name: string) => {
    try {
      await api.post('/fs/file', { name });
      // Refresh file list
    } catch (error) {
      console.error('Error creating file:', error);
    }
  }, []);

  const createFolder = useCallback(async (name: string) => {
    try {
      await api.post('/fs/folder', { name });
      // Refresh file list
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  }, []);

  const deleteFile = useCallback(async (path: string) => {
    try {
      await api.delete('/fs/file', { data: { path } });
      // Refresh file list
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }, []);

  const renameFile = useCallback(async (oldPath: string, newPath: string) => {
    try {
      await api.put('/fs/file', { oldPath, newPath });
      // Refresh file list
    } catch (error) {
      console.error('Error renaming file:', error);
    }
  }, []);

  const toggleFolder = useCallback((path: string) => {
    setExpandedFolders(prev =>
      prev.includes(path)
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  }, []);

  return {
    files,
    expandedFolders,
    createFile,
    createFolder,
    deleteFile,
    renameFile,
    toggleFolder,
  };
}