import React from 'react';
import { VM } from '../types';
import { StatusBadge } from '../../shared/components/StatusBadge';
import { Play, Square, Terminal, Tool } from 'lucide-react';

interface VMListProps {
  vms: VM[];
  onVMAction: (vm: VM, action: 'start' | 'stop' | 'terminal' | 'deploy-tool') => void;
}

export function VMList({ vms, onVMAction }: VMListProps) {
  return (
    <div className="space-y-4">
      {vms.map((vm) => (
        <div
          key={vm.id}
          className="bg-gray-800 rounded-lg p-4 space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-white">{vm.name}</h3>
              <p className="text-sm text-gray-400">{vm.ip}</p>
            </div>
            <StatusBadge status={vm.status} />
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm text-gray-400">
            <div>
              <span className="block text-xs">CPU</span>
              <span className="font-medium text-white">{vm.specs.cpu} cores</span>
            </div>
            <div>
              <span className="block text-xs">Memory</span>
              <span className="font-medium text-white">{vm.specs.memory} GB</span>
            </div>
            <div>
              <span className="block text-xs">Storage</span>
              <span className="font-medium text-white">{vm.specs.storage} GB</span>
            </div>
          </div>

          {vm.tools.length > 0 && (
            <div className="border-t border-gray-700 pt-4">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Deployed Tools</h4>
              <div className="flex flex-wrap gap-2">
                {vm.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex items-center space-x-2 px-2 py-1 bg-gray-700 rounded-md"
                  >
                    <span className="text-sm">{tool.name}</span>
                    <StatusBadge status={tool.status} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2 pt-2">
            {vm.status === 'stopped' ? (
              <button
                onClick={() => onVMAction(vm, 'start')}
                className="p-2 hover:bg-gray-700 rounded"
                title="Start VM"
              >
                <Play className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => onVMAction(vm, 'stop')}
                className="p-2 hover:bg-gray-700 rounded"
                title="Stop VM"
              >
                <Square className="w-4 h-4" />
              </button>
            )}
            
            <button
              onClick={() => onVMAction(vm, 'terminal')}
              className="p-2 hover:bg-gray-700 rounded"
              title="Open Terminal"
            >
              <Terminal className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => onVMAction(vm, 'deploy-tool')}
              className="p-2 hover:bg-gray-700 rounded"
              title="Deploy Tool"
            >
              <Tool className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}