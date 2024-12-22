// Common Types
export interface Resource {
  id: string;
  name: string;
  status: string;
  createdAt: string;
  labels?: Record<string, string>;
}

// Kubernetes Types
export interface KubernetesResource extends Resource {
  namespace: string;
  kind: string;
}

export interface Pod extends KubernetesResource {
  containers: Container[];
  nodeName: string;
  phase: string;
}

// Jenkins Types
export interface JenkinsBuild {
  id: number;
  result: string;
  timestamp: number;
  duration: number;
  url: string;
}

export interface JenkinsJob {
  name: string;
  url: string;
  lastBuild: JenkinsBuild;
  inProgress: boolean;
}

// GitHub Types
export interface GitHubRepo {
  name: string;
  fullName: string;
  description: string;
  stars: number;
  forks: number;
  url: string;
}

export interface PullRequest {
  id: number;
  title: string;
  author: string;
  status: string;
  createdAt: string;
}

// Docker Types
export interface Container {
  id: string;
  name: string;
  image: string;
  status: string;
  ports: string[];
  cpu: string;
  memory: string;
}

// AWS Types
export interface EC2Instance {
  id: string;
  type: string;
  state: string;
  publicIp?: string;
  privateIp: string;
  tags: Record<string, string>;
}