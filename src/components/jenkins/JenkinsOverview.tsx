import React, { useState, useEffect } from 'react';
import { JenkinsJob } from '../../types';
import { ResourceTable } from '../common/ResourceTable';
import { StatusBadge } from '../common/StatusBadge';
import { Play, Clock } from 'lucide-react';
import { JenkinsService } from '../../services/jenkins';

const jenkinsService = new JenkinsService(
  'http://localhost:8080',
  'admin',
  process.env.JENKINS_TOKEN || ''
);

export function JenkinsOverview() {
  const [jobs, setJobs] = useState<JenkinsJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const jobsData = await jenkinsService.getJobs();
        setJobs(jobsData);
      } catch (error) {
        console.error('Error fetching Jenkins jobs:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  const triggerBuild = async (jobName: string) => {
    try {
      await jenkinsService.triggerBuild(jobName);
      // Refresh jobs list
      const updatedJobs = await jenkinsService.getJobs();
      setJobs(updatedJobs);
    } catch (error) {
      console.error('Error triggering build:', error);
    }
  };

  const columns = [
    { key: 'name', header: 'Name' },
    {
      key: 'lastBuild',
      header: 'Last Build',
      render: (build: any) => (
        <div className="flex items-center space-x-2">
          <StatusBadge status={build?.result || 'N/A'} />
          <span className="text-gray-400">
            {build?.timestamp
              ? new Date(build.timestamp).toLocaleString()
              : 'Never'}
          </span>
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_: any, job: JenkinsJob) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => triggerBuild(job.name)}
            className="p-2 hover:bg-gray-600 rounded"
            title="Build Now"
          >
            <Play className="w-4 h-4" />
          </button>
          <button
            onClick={() => window.open(job.url)}
            className="p-2 hover:bg-gray-600 rounded"
            title="View Build History"
          >
            <Clock className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return <div className="p-6">Loading Jenkins jobs...</div>;
  }

  return (
    <div className="p-6">
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Jenkins Jobs</h3>
        <ResourceTable data={jobs} columns={columns} />
      </div>
    </div>
  );
}