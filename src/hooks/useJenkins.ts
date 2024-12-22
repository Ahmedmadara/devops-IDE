import { useState, useCallback } from 'react';
import { api } from '@/lib/api';

export function useJenkins() {
  const [jobs, setJobs] = useState([]);

  const triggerBuild = useCallback(async (jobName: string) => {
    await api.post(`/jenkins/jobs/${jobName}/build`);
    // Refresh jobs list
  }, []);

  const getBuildHistory = useCallback(async (jobName: string) => {
    const { data } = await api.get(`/jenkins/jobs/${jobName}/history`);
    return data;
  }, []);

  return {
    jobs,
    triggerBuild,
    getBuildHistory
  };
}