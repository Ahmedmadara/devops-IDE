import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ToolButtonProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  badge?: number;
  onClick?: () => void;
}

export function ToolButton({
  icon: Icon,
  label,
  active,
  collapsed,
  badge,
  onClick,
}: ToolButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center px-3 py-2 hover:bg-gray-800 transition-colors rounded-sm group ${
        active ? 'bg-gray-800 text-blue-400' : 'text-gray-400 hover:text-gray-100'
      }`}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      {!collapsed && (
        <>
          <span className="ml-3 text-sm">{label}</span>
          {badge && (
            <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </>
      )}
      {collapsed && badge && (
        <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-blue-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
          {badge}
        </span>
      )}
    </button>
  );
}