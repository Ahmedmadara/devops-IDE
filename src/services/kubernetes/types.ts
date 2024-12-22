export interface KubernetesConfig {
  apiUrl: string;
  token?: string;
  namespace?: string;
}

export interface KubernetesMetrics {
  timestamp: number;
  cpu: number;
  memory: number;
}

export interface KubernetesResource {
  name: string;
  namespace: string;
  kind: string;
  status: string;
  createdAt: string;
  labels?: Record<string, string>;
}

export interface Pod extends KubernetesResource {
  phase: string;
  nodeName: string;
  containers: Container[];
}

export interface Container {
  name: string;
  image: string;
  ready: boolean;
  restartCount: number;
  state: ContainerState;
}

export interface ContainerState {
  waiting?: { reason: string };
  running?: { startedAt: string };
  terminated?: { 
    exitCode: number;
    reason: string;
    startedAt: string;
    finishedAt: string;
  };
}