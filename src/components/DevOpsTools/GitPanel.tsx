import React from 'react';
import { GitBranch } from 'lucide-react';

export function GitPanel() {
  return (
    <div className="p-6">
      <div className="flex items-center mb-4">
        <GitBranch className="w-6 h-6 mr-2" />
        <h2 className="text-xl font-semibold">Source Control</h2>
      </div>
      <div className="space-y-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Current Branch</h3>
          <div className="flex items-center text-green-400">
            <span className="mr-2">●</span> main
          </div>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Changes</h3>
          <div className="text-gray-300">No changes detected</div>
        </div>
      </div>
    </div>
  );
}