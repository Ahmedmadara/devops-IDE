import React from 'react';
import { Card } from '@/components/ui/Card';

export default function Jenkins() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Jenkins Pipelines</h1>
      <Card title="Builds">
        <p className="text-gray-300">No active builds</p>
      </Card>
    </div>
  );
}