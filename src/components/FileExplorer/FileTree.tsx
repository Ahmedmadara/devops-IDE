import React from 'react';
import { File, Folder, ChevronRight, ChevronDown } from 'lucide-react';
import { useDrag, useDrop } from 'react-dnd';
import { useFileSystem } from '@/hooks/useFileSystem';

interface FileTreeItemProps {
  name: string;
  type: 'file' | 'folder';
  level: number;
  isExpanded?: boolean;
  onToggle?: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
}

function FileTreeItem({
  name,
  type,
  level,
  isExpanded,
  onToggle,
  onContextMenu
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
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`
        flex items-center px-2 py-1 cursor-pointer select-none
        ${isDragging ? 'opacity-50' : ''}
        ${isOver ? 'bg-gray-700' : 'hover:bg-gray-800'}
      `}
      style={{ paddingLeft: `${level * 12}px` }}
      onContextMenu={onContextMenu}
    >
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
    </div>
  );
}

export function FileTree({ onContextMenu }: { onContextMenu: (e: React.MouseEvent, file: string) => void }) {
  const { files, expandedFolders, toggleFolder } = useFileSystem();

  const renderTree = (items: any[], level = 0) => {
    return items.map((item) => (
      <React.Fragment key={item.path}>
        <FileTreeItem
          name={item.name}
          type={item.type}
          level={level}
          isExpanded={expandedFolders.includes(item.path)}
          onToggle={() => toggleFolder(item.path)}
          onContextMenu={(e) => onContextMenu(e, item.path)}
        />
        {item.type === 'folder' &&
          expandedFolders.includes(item.path) &&
          item.children &&
          renderTree(item.children, level + 1)}
      </React.Fragment>
    ));
  };

  return (
    <div className="py-2">
      {files.length > 0 ? (
        renderTree(files)
      ) : (
        <div className="flex flex-col items-center justify-center h-32 text-gray-400">
          <p className="text-sm">No files yet</p>
          <p className="text-xs mt-1">Create a new file to get started</p>
        </div>
      )}
    </div>
  );
}