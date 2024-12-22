import { useState, useEffect } from 'react';
import { useKubernetes } from './useKubernetes';

interface Node {
  name: string;
  status: string;
  role: string;
  version: string;
  cpu: {
    used: number;
    total: number;
  };
  memory: {
    used: number;
    total: number;
  };
}

export function useNodes() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [loading, setLoading] = useState(true);
  const { getNodes, getMetrics } = useKubernetes();

  useEffect(() => {
    async function fetchNodes() {
      try {
        const [nodesData, metrics] = await Promise.all([
          getNodes(),
          getMetrics()
        ]);

        const transformedNodes = nodesData.map(node => ({
          name: node.metadata.name,
          status: node.status.conditions.find(c => c.type === 'Ready')?.status === 'True' 
            ? 'Ready' 
            : 'NotReady',
          role: node.metadata.labels['kubernetes.io/role'] || 'worker',
          version: node.status.nodeInfo.kubeletVersion,
          cpu: {
            used: metrics.find(m => m.node === node.metadata.name)?.cpu || 0,
            total: parseInt(node.status.capacity.cpu)
          },
          memory: {
            used: metrics.find(m => m.node === node.metadata.name)?.memory || 0,
            total: Math.round(parseInt(node.status.capacity.memory) / (1024 * 1024 * 1024))
          }
        }));

        setNodes(transformedNodes);
      } finally {
        setLoading(false);
      }
    }

    fetchNodes();
    const interval = setInterval(fetchNodes, 30000);

    return () => clearInterval(interval);
  }, [getNodes, getMetrics]);

  return { nodes, loading };
}