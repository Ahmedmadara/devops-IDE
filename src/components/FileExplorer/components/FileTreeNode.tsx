import React from 'react';
import { File, Folder, ChevronRight, ChevronDown, Circle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { formatFileSize } from '@/utils/format';

interface FileTreeNodeProps {
  name: string;
  type: 'file' | 'folder';
  path: string;
  isExpanded?: boolean;
  isSelected?: boolean;
  isModified?: boolean;
  size?: number;
  lastModified?: Date;
  level: number;
  onToggle?: () => void;
  onClick: (path: string, multiSelect: boolean) => void;
  onContextMenu: (e: React.MouseEvent, path: string) => void;
}

export function FileTreeNode({
  name,
  type,
  path,
  isExpanded,
  isSelected,
  isModified,
  size,
  lastModified,
  level,
  onToggle,
  onClick,
  onContextMenu,
}: FileTreeNodeProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(path, e.ctrlKey || e.shiftKey);
  };

  return (
    <div
      className={`
        group flex items-center px-2 py-1 cursor-pointer select-none
        ${isSelected ? 'bg-gray-700' : 'hover:bg-gray-800'}
      `}
      style={{ paddingLeft: `${level * 12}px` }}
      onClick={handleClick}
      onContextMenu={(e) => onContextMenu(e, path)}
    >
      <div className="flex-1 flex items-center">
        {type === 'folder' && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle?.();
            }}
            className="p-1 hover:bg-gray-700 rounded"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        )}
        {type === 'file' ? (
          <File className="w-4 h-4 mr-2" />
        ) : (
          <Folder className="w-4 h-4 mr-2" />
        )}
        <span className="text-sm truncate">{name}</span>
        {isModified && (
          <Circle className="w-2 h-2 ml-2 text-blue-400 fill-current" />
        )}
      </div>
      
      <div className="hidden group-hover:flex items-center space-x-2 text-xs text-gray-400">
        {size !== undefined && (
          <span>{formatFileSize(size)}</span>
        )}
        {lastModified && (
          <span>{formatDistanceToNow(lastModified, { addSuffix: true })}</span>
        )}
      </div>
    </div>
  );
}