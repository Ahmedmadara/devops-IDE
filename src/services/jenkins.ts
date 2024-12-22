import axios from 'axios';
import { JenkinsJob, JenkinsBuild } from '../types';

export class JenkinsService {
  private baseUrl: string;
  private auth: { username: string; token: string };

  constructor(baseUrl: string, username: string, token: string) {
    this.baseUrl = baseUrl;
    this.auth = { username, token };
  }

  private async request(endpoint: string, method = 'GET', data?: any) {
    try {
      const response = await axios({
        method,
        url: `${this.baseUrl}${endpoint}`,
        auth: this.auth,
        data,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Jenkins API error: ${error}`);
      throw error;
    }
  }

  async getJobs(): Promise<JenkinsJob[]> {
    const response = await this.request('/api/json?tree=jobs[name,url,lastBuild[*]]');
    return response.jobs.map((job: any) => ({
      name: job.name,
      url: job.url,
      lastBuild: job.lastBuild
        ? {
            id: job.lastBuild.id,
            result: job.lastBuild.result,
            timestamp: job.lastBuild.timestamp,
            duration: job.lastBuild.duration,
            url: job.lastBuild.url,
          }
        : null,
      inProgress: job.lastBuild?.building || false,
    }));
  }

  async getBuildStatus(jobName: string, buildNumber: number): Promise<JenkinsBuild> {
    const response = await this.request(`/job/${jobName}/${buildNumber}/api/json`);
    return {
      id: response.id,
      result: response.result,
      timestamp: response.timestamp,
      duration: response.duration,
      url: response.url,
    };
  }

  async triggerBuild(jobName: string, parameters?: Record<string, any>) {
    const endpoint = parameters
      ? `/job/${jobName}/buildWithParameters`
      : `/job/${jobName}/build`;
    await this.request(endpoint, 'POST', parameters);
  }

  async getBuildLog(jobName: string, buildNumber: number): Promise<string> {
    const response = await this.request(`/job/${jobName}/${buildNumber}/consoleText`);
    return response;
  }
}