import React from 'react';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (true) {
      case statusLower.includes('running') || statusLower.includes('success'):
        return 'bg-green-600';
      case statusLower.includes('pending') || statusLower.includes('progress'):
        return 'bg-yellow-600';
      case statusLower.includes('error') || statusLower.includes('failed'):
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
        status
      )} ${className}`}
    >
      {status}
    </span>
  );
}