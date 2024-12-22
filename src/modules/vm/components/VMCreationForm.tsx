import React, { useState } from 'react';
import { VM } from '../types';
import { VMService } from '../services/VMService';

interface VMCreationFormProps {
  onVMCreated: (vm: VM) => void;
}

export function VMCreationForm({ onVMCreated }: VMCreationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    provider: 'aws' as VM['provider'],
    specs: {
      cpu: 2,
      memory: 4,
      storage: 50,
    },
  });

  const [loading, setLoading] = useState(false);
  const vmService = new VMService();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const vm = await vmService.createVM(formData);
      onVMCreated(vm);
    } catch (error) {
      console.error('Error creating VM:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 rounded-lg">
      <div>
        <label className="block text-sm font-medium text-gray-200">
          VM Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200">
          Provider
        </label>
        <select
          value={formData.provider}
          onChange={(e) => setFormData({ ...formData, provider: e.target.value as VM['provider'] })}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
        >
          <option value="aws">AWS</option>
          <option value="azure">Azure</option>
          <option value="gcp">GCP</option>
          <option value="local">Local</option>
        </select>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-200">
          Specifications
        </label>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-gray-400">CPU (cores)</label>
            <input
              type="number"
              value={formData.specs.cpu}
              onChange={(e) => setFormData({
                ...formData,
                specs: { ...formData.specs, cpu: parseInt(e.target.value) }
              })}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
              min="1"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400">Memory (GB)</label>
            <input
              type="number"
              value={formData.specs.memory}
              onChange={(e) => setFormData({
                ...formData,
                specs: { ...formData.specs, memory: parseInt(e.target.value) }
              })}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
              min="1"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400">Storage (GB)</label>
            <input
              type="number"
              value={formData.specs.storage}
              onChange={(e) => setFormData({
                ...formData,
                specs: { ...formData.specs, storage: parseInt(e.target.value) }
              })}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
              min="10"
              required
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 rounded-md bg-blue-600 text-white font-medium
          ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
      >
        {loading ? 'Creating VM...' : 'Create VM'}
      </button>
    </form>
  );
}