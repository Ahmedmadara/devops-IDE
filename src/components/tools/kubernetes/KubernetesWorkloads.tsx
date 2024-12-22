import React, { useState, useEffect } from 'react';
import { ResourceTable } from '../../ui/ResourceTable';
import { StatusBadge } from '../../ui/StatusBadge';
import { useKubernetes } from '../../../hooks/useKubernetes';
import { Pod } from '../../../types';

export function KubernetesWorkloads() {
  const { getPods, getDeployments } = useKubernetes();
  const [pods, setPods] = useState<Pod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkloads() {
      try {
        const [podsData, deploymentsData] = await Promise.all([
          getPods(),
          getDeployments(),
        ]);
        setPods(podsData);
      } catch (error) {
        console.error('Error fetching workloads:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkloads();
  }, []);

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'namespace', header: 'Namespace' },
    {
      key: 'status',
      header: 'Status',
      render: (status: string) => <StatusBadge status={status} />,
    },
    { key: 'age', header: 'Age' },
  ];

  if (loading) {
    return <div className="p-6">Loading workloads...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Pods</h3>
        <ResourceTable data={pods} columns={columns} />
      </div>
    </div>
  );
}