import React from 'react';
import { useKubernetes } from '@/hooks/useKubernetes';
import { ResourceTable } from '@/components/common/ResourceTable';
import { MetricsChart } from '@/components/common/MetricsChart';

export function KubernetesPanel() {
  const { pods, metrics, scaleDeployment } = useKubernetes();

  return (
    <div className="h-full bg-gray-800 p-4">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <MetricsChart
          data={metrics.cpu}
          title="CPU Usage"
          type="line"
        />
        <MetricsChart
          data={metrics.memory}
          title="Memory Usage"
          type="line"
        />
      </div>

      <div className="bg-gray-900 rounded-lg p-4">
        <h3 className="text-lg font-medium mb-4">Pods</h3>
        <ResourceTable
          data={pods}
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'status', header: 'Status' },
            { key: 'cpu', header: 'CPU' },
            { key: 'memory', header: 'Memory' },
          ]}
          actions={[
            {
              label: 'Scale',
              onClick: (pod) => scaleDeployment(pod.name),
            },
          ]}
        />
      </div>
    </div>
  );
}