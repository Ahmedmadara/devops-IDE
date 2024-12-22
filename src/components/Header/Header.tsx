import React from 'react';
import { 
  Save, 
  Settings, 
  GitBranch, 
  Search,
  Command
} from 'lucide-react';

export function Header() {
  return (
    <header className="h-12 bg-gray-900 border-b border-gray-700 flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Command className="w-5 h-5 text-blue-400" />
          <span className="font-semibold">DevOps IDE</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-1.5 hover:bg-gray-700 rounded">
            <Save className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:bg-gray-700 rounded">
            <GitBranch className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search commands (Ctrl+P)"
            className="w-full bg-gray-800 text-sm rounded-md pl-10 pr-4 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button className="p-1.5 hover:bg-gray-700 rounded">
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}