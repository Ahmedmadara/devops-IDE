import React from 'react';
import { usePipelines } from '../../../../hooks/jenkins/usePipelines';
import { ResourceTable } from '../../../ui/ResourceTable';
import { StatusBadge } from '../../../ui/StatusBadge';
import { Play, Clock, AlertCircle } from 'lucide-react';

export function JenkinsPipelines() {
  const { pipelines, triggerPipeline, loading } = usePipelines();

  if (loading) {
    return <div className="p-4">Loading pipelines...</div>;
  }

  const columns = [
    { key: 'name', header: 'Name' },
    {
      key: 'status',
      header: 'Status',
      render: (status: string) => <StatusBadge status={status} />,
    },
    {
      key: 'lastRun',
      header: 'Last Run',
      render: (lastRun: { time: string; duration: string }) => (
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4" />
          <span>{lastRun.time}</span>
          <span className="text-gray-400">({lastRun.duration})</span>
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, pipeline) => (
        <div className="flex space-x-2">
          <button
            onClick={() => triggerPipeline(pipeline.id)}
            className="p-1 hover:bg-gray-700 rounded"
            title="Run Pipeline"
          >
            <Play className="w-4 h-4" />
          </button>
          <button
            onClick={() => window.open(pipeline.url)}
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
        <h3 className="text-lg font-medium mb-4">Pipelines</h3>
        <ResourceTable data={pipelines} columns={columns} />
      </div>
    </div>
  );
}