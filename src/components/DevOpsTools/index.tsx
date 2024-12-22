import React from 'react';
import { GitPanel } from './GitPanel';
import { ContainersPanel } from './ContainersPanel';
import { KubernetesPanel } from './KubernetesPanel';
import { PrometheusPanel } from './PrometheusPanel';
import { JenkinsPanel } from './JenkinsPanel';

interface ToolContentProps {
  toolId: string;
}

export function ToolContent({ toolId }: ToolContentProps) {
  const renderContent = () => {
    switch (toolId) {
      case 'git':
        return <GitPanel />;
      case 'containers':
        return <ContainersPanel />;
      case 'cloud':
        return <KubernetesPanel />;
      case 'monitoring':
        return <PrometheusPanel />;
      case 'cicd':
        return <JenkinsPanel />;
      default:
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold">Select a tool to begin</h2>
          </div>
        );
    }
  };

  return (
    <div className="h-full bg-gray-800 text-gray-100 overflow-y-auto">
      {renderContent()}
    </div>
  );
}