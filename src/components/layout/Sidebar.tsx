import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Layout, 
  Cloud, 
  GitBranch, 
  Activity,
  Settings 
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Layout },
  { name: 'Kubernetes', href: '/kubernetes', icon: Cloud },
  { name: 'Jenkins', href: '/jenkins', icon: Activity },
  { name: 'GitHub', href: '/github', icon: GitBranch },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  return (
    <nav className="w-64 bg-gray-800 border-r border-gray-700">
      <div className="p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}