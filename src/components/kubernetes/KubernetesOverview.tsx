import React, { useState, useEffect } from 'react';
import { Pod } from '../../types';
import { ResourceTable } from '../common/ResourceTable';
import { StatusBadge } from '../common/StatusBadge';
import { MetricsChart } from '../common/MetricsChart';
import { KubernetesService } from '../../services/kubernetes';

const k8sService = new KubernetesService();

export function KubernetesOverview() {
  const [pods, setPods] = useState<Pod[]>([]);
  const [metrics, setMetrics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [podsData, metricsData] = await Promise.all([
          k8sService.getPods(),
          k8sService.getClusterMetrics(),
        ]);
        setPods(podsData);
        setMetrics(metricsData);
      } catch (error) {
        console.error('Error fetching Kubernetes data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'namespace', header: 'Namespace' },
    {
      key: 'phase',
      header: 'Status',
      render: (status: string) => <StatusBadge status={status} />,
    },
    { key: 'nodeName', header: 'Node' },
  ];

  if (loading) {
    return <div className="p-6">Loading cluster overview...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Cluster CPU Usage</h3>
          <MetricsChart
            data={metrics}
            dataKey="cpu"
            name="CPU Usage"
            color="#60A5FA"
          />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Cluster Memory Usage</h3>
          <MetricsChart
            data={metrics}
            dataKey="memory"
            name="Memory Usage"
            color="#34D399"
          />
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Pods</h3>
        <ResourceTable data={pods} columns={columns} />
      </div>
    </div>
  );
}