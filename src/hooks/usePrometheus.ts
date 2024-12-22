import { useState, useCallback } from 'react';
import { api } from '@/lib/api';

export function usePrometheus() {
  const [metrics, setMetrics] = useState({
    system: [],
    application: []
  });
  const [alerts, setAlerts] = useState([]);

  const queryMetrics = useCallback(async (query: string) => {
    const { data } = await api.get('/prometheus/query', {
      params: { query }
    });
    return data;
  }, []);

  return {
    metrics,
    alerts,
    queryMetrics
  };
}