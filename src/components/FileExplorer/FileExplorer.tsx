import React from 'react';
import { Plus, FolderPlus } from 'lucide-react';
import { FileTree } from './FileTree';
import { useFileSystem } from '@/hooks/useFileSystem';
import { CreateFileModal } from './CreateFileModal';
import { FileContextMenu } from './FileContextMenu';

export function FileExplorer() {
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [contextMenu, setContextMenu] = React.useState<{
    x: number;
    y: number;
    file: string;
  } | null>(null);
  
  const { createFile, createFolder } = useFileSystem();

  const handleContextMenu = (e: React.MouseEvent, file: string) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      file
    });
  };

  return (
    <div className="w-64 h-full bg-gray-900 border-r border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-gray-200">Explorer</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowCreateModal(true)}
              className="p-1 hover:bg-gray-700 rounded-md"
              title="New File (Ctrl+N)"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={() => createFolder('New Folder')}
              className="p-1 hover:bg-gray-700 rounded-md"
              title="New Folder"
            >
              <FolderPlus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <FileTree onContextMenu={handleContextMenu} />
      </div>

      {showCreateModal && (
        <CreateFileModal
          onClose={() => setShowCreateModal(false)}
          onCreate={createFile}
        />
      )}

      {contextMenu && (
        <FileContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          file={contextMenu.file}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  );
}