import React from 'react';
import { Trash2, Edit2, Copy, FolderPlus, Info } from 'lucide-react';

interface FileContextMenuProps {
  x: number;
  y: number;
  path: string;
  type: 'file' | 'folder';
  onClose: () => void;
  onDelete: (path: string) => void;
  onRename: (path: string) => void;
  onDuplicate: (path: string) => void;
  onMoveToFolder: (path: string) => void;
  onShowProperties: (path: string) => void;
}

export function FileContextMenu({
  x,
  y,
  path,
  type,
  onClose,
  onDelete,
  onRename,
  onDuplicate,
  onMoveToFolder,
  onShowProperties,
}: FileContextMenuProps) {
  React.useEffect(() => {
    const handleClickOutside = () => onClose();
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [onClose]);

  const menuItems = [
    {
      icon: Edit2,
      label: 'Rename',
      onClick: () => onRename(path)
    },
    {
      icon: Copy,
      label: 'Duplicate',
      onClick: () => onDuplicate(path)
    },
    {
      icon: FolderPlus,
      label: 'Move to Folder',
      onClick: () => onMoveToFolder(path)
    },
    {
      icon: Trash2,
      label: 'Delete',
      onClick: () => onDelete(path),
      className: 'text-red-400 hover:text-red-300'
    },
    {
      icon: Info,
      label: 'Properties',
      onClick: () => onShowProperties(path)
    }
  ];

  return (
    <div
      className="fixed z-50 w-48 bg-gray-800 rounded-md shadow-lg py-1 border border-gray-700"
      style={{ top: y, left: x }}
      onClick={(e) => e.stopPropagation()}
    >
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.label}
            onClick={item.onClick}
            className={`
              w-full flex items-center px-4 py-2 text-sm hover:bg-gray-700
              ${item.className || 'text-gray-200'}
            `}
          >
            <Icon className="w-4 h-4 mr-3" />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}