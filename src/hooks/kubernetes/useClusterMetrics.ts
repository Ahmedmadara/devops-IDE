import { useState, useEffect } from 'react';
import { KubernetesMetrics } from '../../services/kubernetes/types';
import { useKubernetes } from './useKubernetes';

export function useClusterMetrics() {
  const [metrics, setMetrics] = useState<KubernetesMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { getMetrics } = useKubernetes();

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const data = await getMetrics();
        setMetrics(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [getMetrics]);

  return { metrics, loading, error };
}