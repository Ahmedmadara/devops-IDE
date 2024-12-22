import React from 'react';
import { SearchResult } from '../../types/search';
import { Loader } from 'lucide-react';

interface SearchResultsProps {
  results: SearchResult[];
  loading: boolean;
  onClose: () => void;
}

export function SearchResults({ results, loading, onClose }: SearchResultsProps) {
  return (
    <div className="absolute top-full mt-2 w-full bg-gray-800 rounded-lg shadow-lg border border-gray-700
      max-h-96 overflow-y-auto">
      {loading ? (
        <div className="flex items-center justify-center p-4">
          <Loader className="w-5 h-5 animate-spin text-blue-400" />
          <span className="ml-2 text-sm text-gray-400">Searching...</span>
        </div>
      ) : results.length > 0 ? (
        <div className="py-2">
          {results.map((result) => (
            <button
              key={result.id}
              onClick={() => {
                result.onClick();
                onClose();
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-700 flex items-center space-x-3"
            >
              <result.icon className="w-4 h-4 text-gray-400" />
              <div>
                <div className="text-sm font-medium">{result.title}</div>
                <div className="text-xs text-gray-400">{result.subtitle}</div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="p-4 text-sm text-gray-400 text-center">
          No results found
        </div>
      )}
    </div>
  );
}