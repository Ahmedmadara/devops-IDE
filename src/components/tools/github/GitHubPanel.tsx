import React from 'react';
import { Tabs } from '../../ui/Tabs';
import { GitHubRepositories } from './components/GitHubRepositories';
import { GitHubPullRequests } from './components/GitHubPullRequests';
import { GitHubActions } from './components/GitHubActions';

const tabs = [
  { id: 'repositories', label: 'Repositories' },
  { id: 'pullRequests', label: 'Pull Requests' },
  { id: 'actions', label: 'Actions' },
];

export function GitHubPanel() {
  const [activeTab, setActiveTab] = React.useState('repositories');

  const renderContent = () => {
    switch (activeTab) {
      case 'repositories':
        return <GitHubRepositories />;
      case 'pullRequests':
        return <GitHubPullRequests />;
      case 'actions':
        return <GitHubActions />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
}