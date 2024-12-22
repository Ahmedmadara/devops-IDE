import React from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { useTerminal } from '@/hooks/useTerminal';

export function IntegratedTerminal() {
  const terminalRef = React.useRef<HTMLDivElement>(null);
  const { executeCommand } = useTerminal();

  React.useEffect(() => {
    if (!terminalRef.current) return;

    const terminal = new Terminal({
      theme: {
        background: '#1a1b26',
        foreground: '#c0caf5',
      },
      fontSize: 14,
      fontFamily: 'Menlo, Monaco, Consolas, monospace',
      cursorBlink: true,
    });

    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.loadAddon(new WebLinksAddon());

    terminal.open(terminalRef.current);
    fitAddon.fit();

    terminal.onData((data) => {
      executeCommand(data);
    });

    return () => {
      terminal.dispose();
    };
  }, []);

  return (
    <div className="h-full bg-gray-900 p-2">
      <div ref={terminalRef} className="h-full" />
    </div>
  );
}