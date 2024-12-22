import React from 'react';
import { Command, Settings, Bell } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { NotificationsMenu } from './NotificationsMenu';
import { UserMenu } from './UserMenu';

interface HeaderProps {
  children: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <header className="h-14 bg-gray-800 border-b border-gray-700 flex items-center px-4">
      <div className="flex items-center space-x-4">
        <Command className="w-6 h-6 text-blue-400" />
        <h1 className="text-lg font-semibold">DevOps IDE</h1>
      </div>

      <div className="flex-1 mx-4">
        {children}
      </div>

      <div className="flex items-center space-x-3">
        <ThemeToggle />
        <NotificationsMenu />
        <UserMenu />
      </div>
    </header>
  );
}