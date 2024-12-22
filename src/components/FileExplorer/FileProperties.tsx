import React from 'react';
import { formatFileSize } from '@/utils/format';
import { formatDistanceToNow } from 'date-fns';

interface FilePropertiesProps {
  name: string;
  type: 'file' | 'folder';
  size?: number;
  created?: Date;
  modified?: Date;
  onClose: () => void;
}

export function FileProperties({
  name,
  type,
  size,
  created,
  modified,
  onClose
}: FilePropertiesProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg p-6 w-96">
        <h3 className="text-lg font-medium mb-4">Properties</h3>
        
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-400">Name</label>
            <p className="text-sm">{name}</p>
          </div>
          
          <div>
            <label className="text-sm text-gray-400">Type</label>
            <p className="text-sm capitalize">{type}</p>
          </div>
          
          {size !== undefined && (
            <div>
              <label className="text-sm text-gray-400">Size</label>
              <p className="text-sm">{formatFileSize(size)}</p>
            </div>
          )}
          
          {created && (
            <div>
              <label className="text-sm text-gray-400">Created</label>
              <p className="text-sm">{formatDistanceToNow(created, { addSuffix: true })}</p>
            </div>
          )}
          
          {modified && (
            <div>
              <label className="text-sm text-gray-400">Modified</label>
              <p className="text-sm">{formatDistanceToNow(modified, { addSuffix: true })}</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}