import React from 'react';
import { File, Folder } from 'lucide-react';
import { FileSystemItem } from '@/types';

interface FileSearchResultsProps {
  results: FileSystemItem[];
  onSelect: (path: string) => void;
}

export function FileSearchResults({ results, onSelect }: FileSearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="p-4 text-center text-gray-400">
        <p className="text-sm">No matching files found</p>
      </div>
    );
  }

  return (
    <div className="max-h-64 overflow-auto">
      {results.map((item) => (
        <button
          key={item.path}
          onClick={() => onSelect(item.path)}
          className="w-full flex items-center px-4 py-2 hover:bg-gray-700 text-left"
        >
          {item.type === 'file' ? (
            <File className="w-4 h-4 mr-2" />
          ) : (
            <Folder className="w-4 h-4 mr-2" />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm truncate">{item.name}</p>
            <p className="text-xs text-gray-400 truncate">{item.path}</p>
          </div>
        </button>
      ))}
    </div>
  );
}