import React from 'react';
import { Card } from '@/components/ui/Card';

export default function GitHub() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">GitHub Integration</h1>
      <Card title="Repositories">
        <p className="text-gray-300">No repositories connected</p>
      </Card>
    </div>
  );
}