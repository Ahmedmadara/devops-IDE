import React, { useState } from 'react';
import { VM, DeployedTool } from '../types';
import { VMService } from '../services/VMService';

interface ToolDeploymentModalProps {
  vm: VM;
  onClose: () => void;
  onToolDeployed: (tool: DeployedTool) => void;
}

export function ToolDeploymentModal({
  vm,
  onClose,
  onToolDeployed,
}: ToolDeploymentModalProps) {
  const [selectedTool, setSelectedTool] = useState<DeployedTool['type']>('jenkins');
  const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(false);

  const vmService = new VMService();

  const handleDeploy = async () => {
    setLoading(true);
    try {
      const tool = await vmService.deployTool(vm.id, {
        type: selectedTool,
        config,
      });
      onToolDeployed(tool);
      onClose();
    } catch (error) {
      console.error('Error deploying tool:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-medium mb-4">Deploy Tool to VM</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200">
              Select Tool
            </label>
            <select
              value={selectedTool}
              onChange={(e) => setSelectedTool(e.target.value as DeployedTool['type'])}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
            >
              <option value="jenkins">Jenkins</option>
              <option value="kubernetes">Kubernetes</option>
              <option value="prometheus">Prometheus</option>
              <option value="docker">Docker</option>
            </select>
          </div>

          {/* Tool-specific configuration fields */}
          {selectedTool === 'jenkins' && (
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Jenkins Port
              </label>
              <input
                type="number"
                defaultValue="8080"
                onChange={(e) => setConfig({ ...config, port: e.target.value })}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
              />
            </div>
          )}

          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleDeploy}
              disabled={loading}
              className={`px-4 py-2 rounded-md bg-blue-600 text-white
                ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            >
              {loading ? 'Deploying...' : 'Deploy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}