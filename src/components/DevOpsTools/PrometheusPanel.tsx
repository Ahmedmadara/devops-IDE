import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Monitor } from 'lucide-react';
import { PrometheusService } from '../../services/prometheus';

const prometheusService = new PrometheusService('http://localhost:9090');

export function PrometheusPanel() {
  const [metrics, setMetrics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const end = Math.floor(Date.now() / 1000);
        const start = end - 3600; // Last hour
        const result = await prometheusService.queryRange(
          'container_memory_usage_bytes',
          start.toString(),
          end.toString(),
          '60'
        );
        setMetrics(result.data.result);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchMetrics();
  }, []);

  if (loading) {
    return <div className="p-6">Loading metrics...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-4">
        <Monitor className="w-6 h-6 mr-2" />
        <h2 className="text-xl font-semibold">Prometheus Metrics</h2>
      </div>

      <div className="bg-gray-700 p-4 rounded-lg">
        <h3 className="font-medium mb-4">Memory Usage</h3>
        <div className="w-full h-64">
          <LineChart width={600} height={200} data={metrics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </div>
      </div>
    </div>
  );
}