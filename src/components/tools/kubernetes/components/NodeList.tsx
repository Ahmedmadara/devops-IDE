import React from 'react';
import { useNodes } from '../../../../hooks/kubernetes/useNodes';
import { ResourceTable } from '../../../ui/ResourceTable';
import { StatusBadge } from '../../../ui/StatusBadge';

export function NodeList() {
  const { nodes, loading } = useNodes();

  if (loading) {
    return <div className="p-4">Loading nodes...</div>;
  }

  const columns = [
    { key: 'name', header: 'Name' },
    { 
      key: 'status', 
      header: 'Status',
      render: (status: string) => <StatusBadge status={status} />
    },
    { key: 'role', header: 'Role' },
    { key: 'version', header: 'Version' },
    { 
      key: 'cpu', 
      header: 'CPU',
      render: (cpu: { used: number; total: number }) => 
        `${cpu.used}/${cpu.total} cores`
    },
    { 
      key: 'memory', 
      header: 'Memory',
      render: (memory: { used: number; total: number }) => 
        `${memory.used}/${memory.total} GB`
    }
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-medium mb-4">Nodes</h3>
      <ResourceTable data={nodes} columns={columns} />
    </div>
  );
}