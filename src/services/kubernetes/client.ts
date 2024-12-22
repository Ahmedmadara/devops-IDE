import * as k8s from '@kubernetes/client-node';
import { KubernetesConfig } from './types';

export class KubernetesClient {
  private config: k8s.KubeConfig;
  private coreV1Api: k8s.CoreV1Api;
  private appsV1Api: k8s.AppsV1Api;
  private customObjectsApi: k8s.CustomObjectsApi;

  constructor(config?: KubernetesConfig) {
    this.config = new k8s.KubeConfig();
    
    if (config?.token) {
      this.config.loadFromOptions({
        clusters: [{
          name: 'default',
          server: config.apiUrl,
          skipTLSVerify: true,
        }],
        users: [{
          name: 'default',
          token: config.token,
        }],
        contexts: [{
          name: 'default',
          cluster: 'default',
          user: 'default',
          namespace: config.namespace || 'default',
        }],
        currentContext: 'default',
      });
    } else {
      this.config.loadFromDefault();
    }

    this.coreV1Api = this.config.makeApiClient(k8s.CoreV1Api);
    this.appsV1Api = this.config.makeApiClient(k8s.AppsV1Api);
    this.customObjectsApi = this.config.makeApiClient(k8s.CustomObjectsApi);
  }

  getCoreV1Api() {
    return this.coreV1Api;
  }

  getAppsV1Api() {
    return this.appsV1Api;
  }

  getCustomObjectsApi() {
    return this.customObjectsApi;
  }
}