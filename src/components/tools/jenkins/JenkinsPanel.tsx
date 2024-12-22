import React from 'react';
import { useJenkins } from '@/hooks/useJenkins';
import { ResourceTable } from '@/components/common/ResourceTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Play, Clock } from 'lucide-react';

export function JenkinsPanel() {
  const { jobs, triggerBuild } = useJenkins();

  return (
    <div className="h-full bg-gray-800 p-4">
      <div className="bg-gray-900 rounded-lg p-4">
        <h3 className="text-lg font-medium mb-4">Pipeline Jobs</h3>
        <ResourceTable
          data={jobs}
          columns={[
            { key: 'name', header: 'Name' },
            { 
              key: 'status', 
              header: 'Status',
              render: (status) => <StatusBadge status={status} />
            },
            { key: 'lastBuild', header: 'Last Build' },
            { key: 'duration', header: 'Duration' }
          ]}
          actions={[
            {
              icon: Play,
              label: 'Run',
              onClick: (job) => triggerBuild(job.name)
            },
            {
              icon: Clock,
              label: 'History',
              onClick: (job) => window.open(job.url)
            }
          ]}
        />
      </div>
    </div>
  );
}