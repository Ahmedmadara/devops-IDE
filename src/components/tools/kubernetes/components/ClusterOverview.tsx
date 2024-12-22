import React from 'react';
import { MetricsChart } from '../../../ui/MetricsChart';
import { useClusterMetrics } from '../../../../hooks/kubernetes/useClusterMetrics';
import { ResourceUtilization } from './ResourceUtilization';
import { NodeList } from './NodeList';

export function ClusterOverview() {
  const { metrics, loading, error } = useClusterMetrics();

  if (loading) {
    return <div className="p-4">Loading cluster metrics...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-400">
        Error loading cluster metrics: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">CPU Usage</h3>
          <MetricsChart
            data={metrics}
            dataKey="cpu"
            name="CPU Usage"
            color="#60A5FA"
          />
        </div>
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Memory Usage</h3>
          <MetricsChart
            data={metrics}
            dataKey="memory"
            name="Memory Usage"
            color="#34D399"
          />
        </div>
      </div>
      <ResourceUtilization />
      <NodeList />
    </div>
  );
}