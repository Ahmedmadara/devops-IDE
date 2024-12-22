import React from 'react';
import { Card } from '@/components/ui/Card';

export default function Settings() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <Card title="General Settings">
        <p className="text-gray-300">Configure your preferences</p>
      </Card>
    </div>
  );
}