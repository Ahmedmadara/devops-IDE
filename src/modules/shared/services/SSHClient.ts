import { Client } from 'ssh2';

export class SSHClient {
  private client: Client;
  private connected: boolean = false;

  constructor() {
    this.client = new Client();
  }

  async connect(config: {
    host: string;
    username: string;
    privateKey: string;
  }): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client
        .on('ready', () => {
          this.connected = true;
          resolve();
        })
        .on('error', (err) => {
          reject(err);
        })
        .connect(config);
    });
  }

  async executeCommand(command: string): Promise<{ stdout: string; stderr: string }> {
    if (!this.connected) {
      throw new Error('SSH client not connected');
    }

    return new Promise((resolve, reject) => {
      this.client.exec(command, (err, stream) => {
        if (err) {
          reject(err);
          return;
        }

        let stdout = '';
        let stderr = '';

        stream
          .on('data', (data) => {
            stdout += data;
          })
          .stderr.on('data', (data) => {
            stderr += data;
          })
          .on('close', () => {
            resolve({ stdout, stderr });
          });
      });
    });
  }

  disconnect(): void {
    if (this.connected) {
      this.client.end();
      this.connected = false;
    }
  }
}