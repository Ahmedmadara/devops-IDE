import React from 'react';
import { useWorkflows } from '../../../../hooks/github/useWorkflows';
import { ResourceTable } from '../../../ui/ResourceTable';
import { StatusBadge } from '../../../ui/StatusBadge';
import { Play, AlertCircle } from 'lucide-react';

export function GitHubActions() {
  const { workflows, triggerWorkflow, loading } = useWorkflows();

  if (loading) {
    return <div className="p-4">Loading workflows...</div>;
  }

  const columns = [
    { key: 'name', header: 'Name' },
    {
      key: 'status',
      header: 'Status',
      render: (status: string) => <StatusBadge status={status} />,
    },
    { key: 'trigger', header: 'Trigger' },
    {
      key: 'lastRun',
      header: 'Last Run',
      render: (lastRun: { time: string; duration: string }) => (
        <div>
          <div>{lastRun.time}</div>
          <div className="text-sm text-gray-400">{lastRun.duration}</div>
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, workflow) => (
        <div className="flex space-x-2">
          <button
            onClick={() => triggerWorkflow(workflow.id)}
            className="p-1 hover:bg-gray-700 rounded"
            title="Run Workflow"
          >
            <Play className="w-4 h-4" />
          </button>
          <button
            onClick={() => window.open(workflow.url)}
            className="p-1 hover:bg-gray-700 rounded"
            title="View Details"
          >
            <AlertCircle className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-medium mb-4">GitHub Actions</h3>
        <ResourceTable data={workflows} columns={columns} />
      </div>
    </div>
  );
}