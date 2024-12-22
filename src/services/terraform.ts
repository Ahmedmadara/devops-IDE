import { execSync } from 'child_process';

export class TerraformService {
  private workingDir: string;

  constructor(workingDir: string) {
    this.workingDir = workingDir;
  }

  async getState() {
    try {
      const output = execSync('terraform show -json', {
        cwd: this.workingDir,
      });
      return JSON.parse(output.toString());
    } catch (error) {
      console.error('Error getting Terraform state:', error);
      throw error;
    }
  }

  async plan() {
    try {
      const output = execSync('terraform plan -out=tfplan', {
        cwd: this.workingDir,
      });
      return output.toString();
    } catch (error) {
      console.error('Error running Terraform plan:', error);
      throw error;
    }
  }

  async apply() {
    try {
      const output = execSync('terraform apply -auto-approve tfplan', {
        cwd: this.workingDir,
      });
      return output.toString();
    } catch (error) {
      console.error('Error applying Terraform changes:', error);
      throw error;
    }
  }
}