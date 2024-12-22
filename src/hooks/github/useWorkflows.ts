import { useState, useEffect, useCallback } from 'react';
import { useGitHub } from './useGitHub';
import { Workflow } from '../../types/github';

export function useWorkflows() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const { getWorkflows, triggerWorkflowDispatch } = useGitHub();

  const fetchWorkflows = useCallback(async () => {
    try {
      const data = await getWorkflows();
      setWorkflows(data.map(workflow => ({
        id: workflow.id,
        name: workflow.name,
        status: workflow.state,
        trigger: workflow.event,
        lastRun: {
          time: workflow.updated_at 
            ? new Date(workflow.updated_at).toLocaleString()
            : 'Never',
          duration: workflow.duration 
            ? `${Math.round(workflow.duration / 1000)}s`
            : '-'
        },
        url: workflow.html_url
      })));
    } finally {
      setLoading(false);
    }
  }, [getWorkflows]);

  useEffect(() => {
    fetchWorkflows();
    const interval = setInterval(fetchWorkflows, 30000);
    return () => clearInterval(interval);
  }, [fetchWorkflows]);

  const triggerWorkflow = useCallback(async (workflowId: string) => {
    await triggerWorkflowDispatch(workflowId);
    fetchWorkflows();
  }, [triggerWorkflowDispatch, fetchWorkflows]);

  return { workflows, triggerWorkflow, loading };
}