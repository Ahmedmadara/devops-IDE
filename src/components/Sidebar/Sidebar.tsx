import React from 'react';
import { 
  GitBranch, 
  Container, 
  Cloud, 
  Terminal, 
  Settings,
  Monitor,
  Database,
  Shield,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const tools = [
  { icon: GitBranch, name: 'Source Control', id: 'git' },
  { icon: Container, name: 'Containers', id: 'containers' },
  { icon: Cloud, name: 'Cloud', id: 'cloud' },
  { icon: Terminal, name: 'CI/CD', id: 'cicd' },
  { icon: Monitor, name: 'Monitoring', id: 'monitoring' },
  { icon: Database, name: 'Databases', id: 'databases' },
  { icon: Shield, name: 'Security', id: 'security' },
  { icon: Settings, name: 'Settings', id: 'settings' },
];

interface SidebarProps {
  activeTool: string;
  onToolSelect: (toolId: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ activeTool, onToolSelect, collapsed, onToggleCollapse }: SidebarProps) {
  return (
    <div className={`bg-gray-900 border-r border-gray-700 flex flex-col ${
      collapsed ? 'w-16' : 'w-56'
    } transition-all duration-200`}>
      <div className="flex-1 py-4">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onToolSelect(tool.id)}
            className={`w-full flex items-center px-3 py-2 mb-1 hover:bg-gray-800 transition-colors ${
              activeTool === tool.id ? 'bg-gray-800 text-blue-400' : 'text-gray-300'
            }`}
            title={collapsed ? tool.name : undefined}
          >
            <tool.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && (
              <span className="ml-3 text-sm">{tool.name}</span>
            )}
          </button>
        ))}
      </div>
      
      <button
        onClick={onToggleCollapse}
        className="p-2 hover:bg-gray-800 mx-2 mb-2 rounded flex items-center justify-center"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}