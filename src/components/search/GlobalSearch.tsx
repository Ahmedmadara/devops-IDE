import React, { useState } from 'react';
import { Search, Command } from 'lucide-react';
import { useSearch } from '../../hooks/useSearch';
import { SearchResults } from './SearchResults';

export function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { results, loading } = useSearch(query);

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search resources (⌘K)"
          className="w-full pl-10 pr-12 py-2 bg-gray-700 border border-gray-600 rounded-lg
            text-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500
            focus:ring-1 focus:ring-blue-500"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1
          px-2 py-1 text-xs text-gray-400 bg-gray-800 rounded border border-gray-600">
          <Command className="w-3 h-3" />
          K
        </kbd>
      </div>

      {isOpen && (
        <SearchResults
          results={results}
          loading={loading}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}