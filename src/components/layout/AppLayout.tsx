import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';
import { GlobalSearch } from '../search/GlobalSearch';
import { ThemeProvider } from '../../contexts/ThemeContext';

export function AppLayout() {
  return (
    <ThemeProvider>
      <div className="h-screen flex flex-col bg-gray-900 text-gray-100">
        <Header>
          <GlobalSearch />
        </Header>
        
        <div className="flex-1 flex overflow-hidden">
          <Sidebar />
          <MainContent />
        </div>
      </div>
    </ThemeProvider>
  );
}