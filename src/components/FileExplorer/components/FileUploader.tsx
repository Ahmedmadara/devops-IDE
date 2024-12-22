import React from 'react';
import { Upload, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface FileUploaderProps {
  onUpload: (files: File[]) => void;
  onClose: () => void;
}

export function FileUploader({ onUpload, onClose }: FileUploaderProps) {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop: onUpload,
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg p-6 w-[480px]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium">Upload Files</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center
            ${isDragActive ? 'border-blue-500 bg-blue-500 bg-opacity-10' : 'border-gray-600'}
          `}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          {isDragActive ? (
            <p className="text-blue-400">Drop files here...</p>
          ) : (
            <>
              <p className="text-gray-300 mb-2">
                Drag and drop files here, or click to select files
              </p>
              <p className="text-sm text-gray-400">
                Supported file types: All files
              </p>
            </>
          )}
        </div>

        {acceptedFiles.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Selected Files</h4>
            <div className="max-h-32 overflow-auto">
              {acceptedFiles.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center justify-between py-2 px-3 bg-gray-700 rounded mb-2"
                >
                  <span className="text-sm truncate">{file.name}</span>
                  <span className="text-xs text-gray-400">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}