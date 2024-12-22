import React from 'react';
import { File, Folder, ChevronRight, ChevronDown, Circle } from 'lucide-react';
import { useDrag, useDrop } from 'react-dnd';
import { formatDistanceToNow } from 'date-fns';
import { formatFileSize } from '@/utils/format';

interface FileTreeItemProps {
  name: string;
  type: 'file' | 'folder';
  level: number;
  isExpanded?: boolean;
  isModified?: boolean;
  size?: number;
  lastModified?: Date;
  onToggle?: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
  onDrop?: (item: any) => void;
}

export function FileTreeItem({
  name,
  type,
  level,
  isExpanded,
  isModified,
  size,
  lastModified,
  onToggle,
  onContextMenu,
  onDrop
}: FileTreeItemProps) {
  const [{ isDragging }, drag] = useDrag({
    type: 'FILE',
    item: { name, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'FILE',
    drop: (item) => onDrop?.(item),
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`
        group flex items-center px-2 py-1 cursor-pointer select-none
        ${isDragging ? 'opacity-50' : ''}
        ${isOver ? 'bg-gray-700' : 'hover:bg-gray-800'}
      `}
      style={{ paddingLeft: `${level * 12}px` }}
      onContextMenu={onContextMenu}
    >
      <div className="flex-1 flex items-center">
        {type === 'folder' && (
          <button
            onClick={onToggle}
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