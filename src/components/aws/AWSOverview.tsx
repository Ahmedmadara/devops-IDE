import React, { useState, useEffect } from 'react';
import { EC2Instance } from '../../types';
import { ResourceTable } from '../common/ResourceTable';
import { StatusBadge } from '../common/StatusBadge';
import { Play, Square } from 'lucide-react';
import { AWSService } from '../../services/aws';

const awsService = new AWSService(process.env.AWS_REGION || 'us-east-1');

export function AWSOverview() {
  const [instances, setInstances] = useState<EC2Instance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInstances() {
      try {
        const instancesData = await awsService.getEC2Instances();
        setInstances(instancesData);
      } catch (error) {
        console.error('Error fetching EC2 instances:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchInstances();
  }, []);

  const handleInstanceAction = async (instanceId: string, action: 'start' | 'stop') => {
    try {
      if (action === 'start') {
        await awsService.startInstance(instanceId);
      } else {
        await awsService.stopInstance(instanceId);
      }
      const updatedInstances = await awsService.getEC2Instances();
      setInstances(updatedInstances);
    } catch (error) {
      console.error(`Error ${action}ing instance:`, error);
    }
  };

  const columns = [
    { key: 'id', header: 'Instance ID' },
    { key: 'type', header: 'Type' },
    {
      key: 'state',
      header: 'State',
      render: (state: string) => <StatusBadge status={state} />,
    },
    { key: 'publicIp', header: 'Public IP' },
    {
      key: 'actions',
      header: 'Actions',
      render: (_: any, instance: EC2Instance) => (
        <div className="flex items-center space-x-2">
          {instance.state === 'stopped' && (
            <button
              onClick={() => handleInstanceAction(instance.id, 'start')}
              className="p-2 hover:bg-gray-600 rounded"
              title="Start Instance"
            >
              <Play className="w-4 h-4" />
            </button>
          )}
          {instance.state === 'running' && (
            <button
              onClick={() => handleInstanceAction(instance.id, 'stop')}
              className="p-2 hover:bg-gray-600 rounded"
              title="Stop Instance"
            >
              <Square className="w-4 h-4" />
            </button>
          )}
        </div>
      ),
    },
  ];

  if (loading) {
    return <div className="p-6">Loading EC2 instances...</div>;
  }

  return (
    <div className="p-6">
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-4">EC2 Instances</h3>
        <ResourceTable data={instances} columns={columns} />
      </div>
    </div>
  );
}