import React from 'react';
import { Card } from '@/components/ui/Card';

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Active Services">
          <p className="text-gray-300">Overview of running services</p>
        </Card>
        <Card title="Recent Activity">
          <p className="text-gray-300">Latest deployments and changes</p>
        </Card>
        <Card title="System Status">
          <p className="text-gray-300">Current system health</p>
        </Card>
      </div>
    </div>
  );
}