import React from 'react';
import { Tabs } from '../common/Tabs';
import { JenkinsPanel } from './Jenkins/JenkinsPanel';
import { KubernetesPanel } from './Kubernetes/KubernetesPanel';
import { PrometheusPanel } from './Prometheus/PrometheusPanel';

const tools = [
  { id: 'jenkins', label: 'Jenkins' },
  { id: 'kubernetes', label: 'Kubernetes' },
  { id: 'prometheus', label: 'Prometheus' }
];

export function ToolPanel() {
  const [activeTool, setActiveTool] = React.useState('jenkins');

  const renderTool = () => {
    switch (activeTool) {
      case 'jenkins':
        return <JenkinsPanel />;
      case 'kubernetes':
        return <KubernetesPanel />;
      case 'prometheus':
        return <PrometheusPanel />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-800">
      <Tabs
        tabs={tools}
        activeTab={activeTool}
        onChange={setActiveTool}
      />
      <div className="flex-1 overflow-auto">
        {renderTool()}
      </div>
    </div>
  );
}