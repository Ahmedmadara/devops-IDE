import React, { useState, useEffect } from 'react';
import { GitHubRepo } from '../../types';
import { ResourceTable } from '../common/ResourceTable';
import { GitHubService } from '../../services/github';
import { Star, GitFork, ExternalLink } from 'lucide-react';

const githubService = new GitHubService(process.env.GITHUB_TOKEN || '');

export function GitHubOverview() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const reposData = await githubService.getRepositories('your-username');
        setRepos(reposData);
      } catch (error) {
        console.error('Error fetching repositories:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  const columns = [
    { key: 'name', header: 'Repository' },
    { 
      key: 'stats',
      header: 'Stats',
      render: (_: any, repo: GitHubRepo) => (
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1" />
            <span>{repo.stars}</span>
          </div>
          <div className="flex items-center">
            <GitFork className="w-4 h-4 mr-1" />
            <span>{repo.forks}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_: any, repo: GitHubRepo) => (
        <button
          onClick={() => window.open(repo.url)}
          className="p-2 hover:bg-gray-600 rounded"
          title="Open in GitHub"
        >
          <ExternalLink className="w-4 h-4" />
        </button>
      ),
    },
  ];

  if (loading) {
    return <div className="p-6">Loading repositories...</div>;
  }

  return (
    <div className="p-6">
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-4">GitHub Repositories</h3>
        <ResourceTable data={repos} columns={columns} />
      </div>
    </div>
  );
}