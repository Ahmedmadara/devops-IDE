import React from 'react';
import { Card } from '@/components/ui/Card';

export default function Kubernetes() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Kubernetes Dashboard</h1>
      <Card title="Clusters">
        <p className="text-gray-300">No active clusters</p>
      </Card>
    </div>
  );
}