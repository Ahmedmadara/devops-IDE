import { useState, useEffect } from 'react';
import { useKubernetes } from './useKubernetes';

interface ResourceMetrics {
  used: number;
  total: number;
  percentage: number;
}

interface Utilization {
  cpu: ResourceMetrics;
  memory: ResourceMetrics;
  storage: ResourceMetrics;
}

export function useResourceUtilization() {
  const [utilization, setUtilization] = useState<Utilization>({
    cpu: { used: 0, total: 0, percentage: 0 },
    memory: { used: 0, total: 0, percentage: 0 },
    storage: { used: 0, total: 0, percentage: 0 }
  });
  const [loading, setLoading] = useState(true);
  const { getMetrics } = useKubernetes();

  useEffect(() => {
    async function fetchUtilization() {
      try {
        const metrics = await getMetrics();
        // Transform metrics into utilization format
        setUtilization({
          cpu: {
            used: metrics.reduce((acc, m) => acc + m.cpu, 0),
            total: 100,
            percentage: metrics.reduce((acc, m) => acc + m.cpu, 0)
          },
          memory: {
            used: Math.round(metrics.reduce((acc, m) => acc + m.memory, 0)),
            total: 100,
            percentage: metrics.reduce((acc, m) => acc + m.memory, 0)
          },
          storage: {
            used: 50, // Example values
            total: 100,
            percentage: 50
          }
        });
      } finally {
        setLoading(false);
      }
    }

    fetchUtilization();
    const interval = setInterval(fetchUtilization, 30000);

    return () => clearInterval(interval);
  }, [getMetrics]);

  return { utilization, loading };
}