import { useState, useCallback } from 'react';
import { FileSystemItem } from '@/types';

export function useFileSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FileSystemItem[]>([]);

  const searchFiles = useCallback((files: FileSystemItem[], query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results = [];
    const search = (items: FileSystemItem[]) => {
      for (const item of items) {
        if (item.name.toLowerCase().includes(query.toLowerCase())) {
          results.push(item);
        }
        if (item.children) {
          search(item.children);
        }
      }
    };

    search(files);
    setSearchResults(results);
  }, []);

  return {
    searchQuery,
    searchResults,
    setSearchQuery,
    searchFiles,
  };
}