import React from 'react';
import { Trash2, Edit2, Info } from 'lucide-react';
import { useFileSystem } from '@/hooks/useFileSystem';

interface FileContextMenuProps {
  x: number;
  y: number;
  file: string;
  onClose: () => void;
}

export function FileContextMenu({ x, y, file, onClose }: FileContextMenuProps) {
  const { deleteFile, renameFile } = useFileSystem();

  React.useEffect(() => {
    const handleClickOutside = () => onClose();
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [onClose]);

  const menuItems = [
    {
      icon: Edit2,
      label: 'Rename',
      onClick: () => {
        const newName = prompt('Enter new name:', file);
        if (newName) {
          renameFile(file, newName);
        }
        onClose();
      }
    },
    {
      icon: Trash2,
      label: 'Delete',
      onClick: () => {
        if (confirm('Are you sure you want to delete this file?')) {
          deleteFile(file);
        }
        onClose();
      }
    },
    {
      icon: Info,
      label: 'Properties',
      onClick: () => {
        // Show file properties
        onClose();
      }
    }
  ];

  return (
    <div
      className="fixed bg-gray-800 rounded-md shadow-lg py-1 z-50"
      style={{ top: y, left: x }}
      onClick={(e) => e.stopPropagation()}
    >
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.label}
            onClick={item.onClick}
            className="w-full flex items-center px-4 py-2 text-sm hover:bg-gray-700"
          >
            <Icon className="w-4 h-4 mr-3" />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}