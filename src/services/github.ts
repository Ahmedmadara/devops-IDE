import { Octokit } from '@octokit/rest';
import { GitHubRepo, PullRequest } from '../types';

export class GitHubService {
  private octokit: Octokit;

  constructor(token: string) {
    this.octokit = new Octokit({ auth: token });
  }

  async getRepositories(username: string): Promise<GitHubRepo[]> {
    const { data } = await this.octokit.repos.listForUser({ username });
    return data.map(repo => ({
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description || '',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      url: repo.html_url,
    }));
  }

  async getPullRequests(owner: string, repo: string): Promise<PullRequest[]> {
    const { data } = await this.octokit.pulls.list({ owner, repo });
    return data.map(pr => ({
      id: pr.number,
      title: pr.title,
      author: pr.user?.login || '',
      status: pr.state,
      createdAt: pr.created_at,
    }));
  }

  async getWorkflows(owner: string, repo: string) {
    const { data } = await this.octokit.actions.listWorkflowRunsForRepo({
      owner,
      repo,
    });
    return data.workflow_runs;
  }
}