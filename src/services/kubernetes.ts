import * as k8s from '@kubernetes/client-node';

export class KubernetesService {
  private kc: k8s.KubeConfig;
  private k8sApi: k8s.CoreV1Api;
  private metricsApi: k8s.CustomObjectsApi;

  constructor() {
    this.kc = new k8s.KubeConfig();
    this.kc.loadFromDefault();
    this.k8sApi = this.kc.makeApiClient(k8s.CoreV1Api);
    this.metricsApi = this.kc.makeApiClient(k8s.CustomObjectsApi);
  }

  async getPods(namespace = 'default') {
    try {
      const response = await this.k8sApi.listNamespacedPod(namespace);
      return response.body.items;
    } catch (error) {
      console.error('Error fetching pods:', error);
      throw error;
    }
  }

  async getServices(namespace = 'default') {
    try {
      const response = await this.k8sApi.listNamespacedService(namespace);
      return response.body.items;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  }

  async getClusterMetrics() {
    try {
      const response = await this.metricsApi.listClusterCustomObject(
        'metrics.k8s.io',
        'v1beta1',
        'nodes'
      );
      return this.transformMetrics(response.body);
    } catch (error) {
      console.error('Error fetching metrics:', error);
      throw error;
    }
  }

  private transformMetrics(rawMetrics: any) {
    // Transform raw metrics into a format suitable for charts
    return rawMetrics.items.map((item: any) => ({
      timestamp: new Date(item.timestamp).getTime(),
      cpu: this.parseCPU(item.usage.cpu),
      memory: this.parseMemory(item.usage.memory),
    }));
  }

  private parseCPU(cpu: string): number {
    return parseInt(cpu) / 1000000; // Convert to millicores
  }

  private parseMemory(memory: string): number {
    return parseInt(memory) / (1024 * 1024); // Convert to MB
  }
}