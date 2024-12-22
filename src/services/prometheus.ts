import axios from 'axios';

export class PrometheusService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async query(query: string, time?: string) {
    try {
      const response = await axios.get(`${this.baseURL}/api/v1/query`, {
        params: {
          query,
          time,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error querying Prometheus:', error);
      throw error;
    }
  }

  async queryRange(query: string, start: string, end: string, step: string) {
    try {
      const response = await axios.get(`${this.baseURL}/api/v1/query_range`, {
        params: {
          query,
          start,
          end,
          step,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error querying Prometheus range:', error);
      throw error;
    }
  }
}