import React from 'react';
import { useDrag } from 'react-dnd';
import { File, Folder } from 'lucide-react';

interface DraggableFileProps {
  path: string;
  type: 'file' | 'folder';
  name: string;
}

export function DraggableFile({ path, type, name }: DraggableFileProps) {
  const [{ isDragging }, drag] = useDrag({
    type: 'FILE',
    item: { path, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`flex items-center p-1 rounded cursor-move
        ${isDragging ? 'opacity-50' : ''}
        hover:bg-gray-700`}
    >
      {type === 'file' ? (
        <File className="w-4 h-4 mr-2" />
      ) : (
        <Folder className="w-4 h-4 mr-2" />
      )}
      <span className="text-sm">{name}</span>
    </div>
  );
}