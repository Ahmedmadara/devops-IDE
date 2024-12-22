import React from 'react';
import { Plus, FolderPlus, Upload, Search, X } from 'lucide-react';
import { useFileSearch } from '@/hooks/useFileSearch';
import { FileSearchResults } from './FileSearchResults';

interface FileToolbarProps {
  onNewFile: () => void;
  onNewFolder: () => void;
  onUploadFile: () => void;
  onFileSelect: (path: string) => void;
}

export function FileToolbar({
  onNewFile,
  onNewFolder,
  onUploadFile,
  onFileSelect,
}: FileToolbarProps) {
  const { searchQuery, searchResults, setSearchQuery, searchFiles } = useFileSearch();
  const [showSearch, setShowSearch] = React.useState(false);

  return (
    <div className="p-4 border-b border-gray-700">
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearch(true);
            }}
            placeholder="Search files... (Ctrl+P)"
            className="w-full bg-gray-800 rounded-md pl-9 pr-8 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setShowSearch(false);
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-700 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {showSearch && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 rounded-md shadow-lg border border-gray-700">
              <FileSearchResults
                results={searchResults}
                onSelect={(path) => {
                  onFileSelect(path);
                  setShowSearch(false);
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onNewFile}
          className="p-1.5 hover:bg-gray-700 rounded-md"
          title="New File (Ctrl+N)"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={onNewFolder}
          className="p-1.5 hover:bg-gray-700 rounded-md"
          title="New Folder (Ctrl+Shift+N)"
        >
          <FolderPlus className="w-4 h-4" />
        </button>
        <button
          onClick={onUploadFile}
          className="p-1.5 hover:bg-gray-700 rounded-md"
          title="Upload File"
        >
          <Upload className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}