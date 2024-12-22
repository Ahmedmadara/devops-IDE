import React from 'react';
import { Card } from '@/components/ui/Card';

export default function Prometheus() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Prometheus Monitoring</h1>
      <Card title="Metrics">
        <p className="text-gray-300">No metrics available</p>
      </Card>
    </div>
  );
}