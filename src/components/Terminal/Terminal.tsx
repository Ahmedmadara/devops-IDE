import React, { useEffect, useRef } from 'react';
import { TerminalManager } from './TerminalManager';
import 'xterm/css/xterm.css';

export function Terminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const managerRef = useRef<TerminalManager | null>(null);

  useEffect(() => {
    if (terminalRef.current && !managerRef.current) {
      managerRef.current = new TerminalManager(terminalRef.current);
    }

    return () => {
      managerRef.current?.dispose();
    };
  }, []);

  return (
    <div className="h-full w-full bg-gray-900" ref={terminalRef} />
  );
}