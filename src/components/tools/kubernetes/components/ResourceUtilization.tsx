import React from 'react';
import { useResourceUtilization } from '../../../../hooks/kubernetes/useResourceUtilization';
import { ProgressBar } from '../../../ui/ProgressBar';

export function ResourceUtilization() {
  const { utilization, loading } = useResourceUtilization();

  if (loading) {
    return <div className="p-4">Loading resource utilization...</div>;
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-medium mb-4">Resource Utilization</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span>CPU</span>
            <span>{utilization.cpu.used}/{utilization.cpu.total} cores</span>
          </div>
          <ProgressBar 
            value={utilization.cpu.percentage} 
            color="blue"
          />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span>Memory</span>
            <span>{utilization.memory.used}/{utilization.memory.total} GB</span>
          </div>
          <ProgressBar 
            value={utilization.memory.percentage} 
            color="green"
          />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span>Storage</span>
            <span>{utilization.storage.used}/{utilization.storage.total} GB</span>
          </div>
          <ProgressBar 
            value={utilization.storage.percentage} 
            color="purple"
          />
        </div>
      </div>
    </div>
  );
}