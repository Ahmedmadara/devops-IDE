import React, { useState, useEffect } from 'react';
import { Cloud } from 'lucide-react';
import { KubernetesService } from '../../services/kubernetes';

const k8sService = new KubernetesService();

export function KubernetesPanel() {
  const [pods, setPods] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [podsData, servicesData] = await Promise.all([
          k8sService.getPods(),
          k8sService.getServices()
        ]);
        setPods(podsData);
        setServices(servicesData);
      } catch (error) {
        console.error('Error fetching Kubernetes data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div className="p-6">Loading Kubernetes resources...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-4">
        <Cloud className="w-6 h-6 mr-2" />
        <h2 className="text-xl font-semibold">Kubernetes Dashboard</h2>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="font-medium mb-3">Pods</h3>
          <div className="space-y-2">
            {pods.map((pod) => (
              <div key={pod.metadata.uid} className="flex items-center justify-between">
                <span>{pod.metadata.name}</span>
                <span className={`px-2 py-1 rounded text-sm ${
                  pod.status.phase === 'Running' ? 'bg-green-600' : 'bg-yellow-600'
                }`}>
                  {pod.status.phase}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="font-medium mb-3">Services</h3>
          <div className="space-y-2">
            {services.map((service) => (
              <div key={service.metadata.uid} className="flex items-center justify-between">
                <span>{service.metadata.name}</span>
                <span className="text-sm text-gray-300">
                  {service.spec.type} - {service.spec.clusterIP}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}