import React from 'react';
import { X } from 'lucide-react';
import { formatFileSize } from '@/utils/format';
import { formatDistanceToNow } from 'date-fns';

interface FilePropertiesProps {
  name: string;
  path: string;
  type: 'file' | 'folder';
  size?: number;
  created?: Date;
  modified?: Date;
  onClose: () => void;
}

export function FileProperties({
  name,
  path,
  type,
  size,
  created,
  modified,
  onClose
}: FilePropertiesProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg p-6 w-96">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium">Properties</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">Name</label>
            <p className="text-sm mt-1">{name}</p>
          </div>
          
          <div>
            <label className="text-sm text-gray-400">Path</label>
            <p className="text-sm mt-1 break-all">{path}</p>
          </div>
          
          <div>
            <label className="text-sm text-gray-400">Type</label>
            <p className="text-sm mt-1 capitalize">{type}</p>
          </div>
          
          {size !== undefined && (
            <div>
              <label className="text-sm text-gray-400">Size</label>
              <p className="text-sm mt-1">{formatFileSize(size)}</p>
            </div>
          )}
          
          {created && (
            <div>
              <label className="text-sm text-gray-400">Created</label>
              <p className="text-sm mt-1">{formatDistanceToNow(created, { addSuffix: true })}</p>
            </div>
          )}
          
          {modified && (
            <div>
              <label className="text-sm text-gray-400">Modified</label>
              <p className="text-sm mt-1">{formatDistanceToNow(modified, { addSuffix: true })}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}