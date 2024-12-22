import { useState, useEffect, useCallback } from 'react';
import { useJenkins } from './useJenkins';
import { Pipeline } from '../../types/jenkins';

export function usePipelines() {
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [loading, setLoading] = useState(true);
  const { getJobs, triggerBuild } = useJenkins();

  const fetchPipelines = useCallback(async () => {
    try {
      const jobs = await getJobs();
      setPipelines(jobs.map(job => ({
        id: job.name,
        name: job.name,
        status: job.lastBuild?.result || 'UNKNOWN',
        lastRun: {
          time: job.lastBuild?.timestamp 
            ? new Date(job.lastBuild.timestamp).toLocaleString()
            : 'Never',
          duration: job.lastBuild?.duration 
            ? `${Math.round(job.lastBuild.duration / 1000)}s`
            : '-'
        },
        url: job.url,
        inProgress: job.lastBuild?.building || false
      })));
    } finally {
      setLoading(false);
    }
  }, [getJobs]);

  useEffect(() => {
    fetchPipelines();
    const interval = setInterval(fetchPipelines, 10000);
    return () => clearInterval(interval);
  }, [fetchPipelines]);

  const triggerPipeline = useCallback(async (pipelineId: string) => {
    await triggerBuild(pipelineId);
    fetchPipelines();
  }, [triggerBuild, fetchPipelines]);

  return { pipelines, triggerPipeline, loading };
}