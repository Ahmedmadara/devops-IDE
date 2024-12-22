import { 
  EC2Client, 
  DescribeInstancesCommand,
  StartInstancesCommand,
  StopInstancesCommand
} from '@aws-sdk/client-ec2';

export class AWSService {
  private ec2Client: EC2Client;

  constructor(region: string) {
    this.ec2Client = new EC2Client({ region });
  }

  async getEC2Instances() {
    try {
      const command = new DescribeInstancesCommand({});
      const response = await this.ec2Client.send(command);
      
      return response.Reservations?.flatMap(reservation =>
        reservation.Instances?.map(instance => ({
          id: instance.InstanceId || '',
          type: instance.InstanceType || '',
          state: instance.State?.Name || '',
          publicIp: instance.PublicIpAddress,
          privateIp: instance.PrivateIpAddress || '',
          tags: Object.fromEntries(
            instance.Tags?.map(tag => [tag.Key || '', tag.Value || '']) || []
          ),
        })) || []
      ) || [];
    } catch (error) {
      console.error('Error fetching EC2 instances:', error);
      throw error;
    }
  }

  async startInstance(instanceId: string) {
    const command = new StartInstancesCommand({
      InstanceIds: [instanceId],
    });
    return await this.ec2Client.send(command);
  }

  async stopInstance(instanceId: string) {
    const command = new StopInstancesCommand({
      InstanceIds: [instanceId],
    });
    return await this.ec2Client.send(command);
  }
}