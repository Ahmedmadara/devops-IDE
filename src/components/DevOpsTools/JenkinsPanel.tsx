import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';
import { JenkinsService } from '../../services/jenkins';

const jenkinsService = new JenkinsService(
  'http://localhost:8080',
  'admin',
  'your-token-here'
);

export function JenkinsPanel() {
  const [jobs, setJobs] = useState<any[]>([]);
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

  if (loading) {
    return <div className="p-6">Loading Jenkins jobs...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-4">
        <Terminal className="w-6 h-6 mr-2" />
        <h2 className="text-xl font-semibold">Jenkins Pipeline</h2>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.name} className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{job.name}</h3>
              <button
                onClick={() => triggerBuild(job.name)}
                className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 transition-colors"
              >
                Build Now
              </button>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <span className={`px-2 py-1 rounded ${
                job.lastBuild?.result === 'SUCCESS' ? 'bg-green-600' : 'bg-red-600'
              }`}>
                {job.lastBuild?.result || 'No builds'}
              </span>
              <span className="text-gray-300">
                Last build: {job.lastBuild?.timestamp ? new Date(job.lastBuild.timestamp).toLocaleString() : 'Never'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}