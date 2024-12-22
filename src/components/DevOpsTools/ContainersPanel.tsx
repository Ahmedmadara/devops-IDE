import React from 'react';
import { Container } from 'lucide-react';

export function ContainersPanel() {
  return (
    <div className="p-6">
      <div className="flex items-center mb-4">
        <Container className="w-6 h-6 mr-2" />
        <h2 className="text-xl font-semibold">Containers</h2>
      </div>
      <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Running Containers</h3>
        <div className="text-gray-300">No active containers</div>
      </div>
    </div>
  );
}