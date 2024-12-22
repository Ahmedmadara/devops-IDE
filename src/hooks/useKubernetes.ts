import { useState, useCallback } from 'react';
import { KubernetesService } from '../services/kubernetes';

export function useKubernetes() {
  const [error, setError] = useState<Error | null>(null);
  const k8sService = new KubernetesService();

  const getPods = useCallback(async (namespace?: string) => {
    try {
      return await k8sService.getPods(namespace);
    } catch (err) {
      setError(err as Error);
      return [];
    }
  }, []);

  const getDeployments = useCallback(async (namespace?: string) => {
    try {
      return await k8sService.getDeployments(namespace);
    } catch (err) {
      setError(err as Error);
      return [];
    }
  }, []);

  const getServices = useCallback(async (namespace?: string) => {
    try {
      return await k8sService.getServices(namespace);
    } catch (err) {
      setError(err as Error);
      return [];
    }
  }, []);

  const getMetrics = useCallback(async () => {
    try {
      return await k8sService.getClusterMetrics();
    } catch (err) {
      setError(err as Error);
      return [];
    }
  }, []);

  return {
    getPods,
    getDeployments,
    getServices,
    getMetrics,
    error,
  };
}