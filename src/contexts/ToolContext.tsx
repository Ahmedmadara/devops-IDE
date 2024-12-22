import React, { createContext, useContext, useState } from 'react';

interface ToolContextType {
  activeTool: string;
  setActiveTool: (tool: string) => void;
}

const ToolContext = createContext<ToolContextType | undefined>(undefined);

export function ToolProvider({ children }: { children: React.ReactNode }) {
  const [activeTool, setActiveTool] = useState('kubernetes');

  return (
    <ToolContext.Provider value={{ activeTool, setActiveTool }}>
      {children}
    </ToolContext.Provider>
  );
}

export function useToolContext() {
  const context = useContext(ToolContext);
  if (!context) {
    throw new Error('useToolContext must be used within a ToolProvider');
  }
  return context;
}