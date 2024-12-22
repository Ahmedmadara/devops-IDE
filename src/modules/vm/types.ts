export interface VM {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'provisioning' | 'error';
  ip: string;
  provider: 'aws' | 'azure' | 'gcp' | 'local';
  specs: {
    cpu: number;
    memory: number;
    storage: number;
  };
  tools: DeployedTool[];
  createdAt: string;
}

export interface DeployedTool {
  name: string;
  type: 'jenkins' | 'kubernetes' | 'prometheus' | 'docker';
  status: 'running' | 'stopped' | 'error';
  port: number;
  url?: string;
}