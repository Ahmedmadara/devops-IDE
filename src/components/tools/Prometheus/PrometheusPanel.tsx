import React from 'react';
import { usePrometheus } from '@/hooks/usePrometheus';
import { MetricsChart } from '@/components/common/MetricsChart';
import { AlertList } from './AlertList';

export function PrometheusPanel() {
  const { metrics, alerts } = usePrometheus();

  return (
    <div className="h-full bg-gray-800 p-4 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <MetricsChart
          data={metrics.system}
          title="System Metrics"
          type="line"
        />
        <MetricsChart
          data={metrics.application}
          title="Application Metrics"
          type="line"
        />
      </div>
      
      <AlertList alerts={alerts} />
    </div>
  );
}