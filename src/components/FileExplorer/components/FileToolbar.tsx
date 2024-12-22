import React from 'react';
import { Plus, FolderPlus, Upload, Search, X } from 'lucide-react';
import { Tooltip } from '@/components/ui/Tooltip';

interface FileToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNewFile: () => void;
  onNewFolder: () => void;
  onUploadFile: () => void;
}

export function FileToolbar({
  searchQuery,
  onSearchChange,
  onNewFile,
  onNewFolder,
  onUploadFile,
}: FileToolbarProps) {
  return (
    <div className="p-4 border-b border-gray-700">
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search files... (Ctrl+P)"
            className="w-full bg-gray-800 rounded-md pl-9 pr-8 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-700 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Tooltip content="New File (Ctrl+N)">
          <button
            onClick={onNewFile}
            className="p-1.5 hover:bg-gray-700 rounded-md"
          >
            <Plus className="w-4 h-4" />
          </button>
        </Tooltip>

        <Tooltip content="New Folder (Ctrl+Shift+N)">
          <button
            onClick={onNewFolder}
            className="p-1.5 hover:bg-gray-700 rounded-md"
          >
            <FolderPlus className="w-4 h-4" />
          </button>
        </Tooltip>

        <Tooltip content="Upload File">
          <button
            onClick={onUploadFile}
            className="p-1.5 hover:bg-gray-700 rounded-md"
          >
            <Upload className="w-4 h-4" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}