import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { TerminalCommands } from './TerminalCommands';

export class TerminalManager {
  private terminal: Terminal;
  private commands: TerminalCommands;
  private currentCommand: string = '';
  private fitAddon: FitAddon;

  constructor(container: HTMLElement) {
    this.terminal = new Terminal({
      theme: {
        background: '#1a1b26',
        foreground: '#c0caf5',
        cursor: '#c0caf5',
        selection: '#364A82',
        black: '#363B54',
        brightBlack: '#363B54',
        red: '#F7768E',
        brightRed: '#F7768E',
        green: '#73DACA',
        brightGreen: '#73DACA',
        yellow: '#E0AF68',
        brightYellow: '#E0AF68',
        blue: '#7AA2F7',
        brightBlue: '#7AA2F7',
        magenta: '#BB9AF7',
        brightMagenta: '#BB9AF7',
        cyan: '#7DCFFF',
        brightCyan: '#7DCFFF',
        white: '#C0CAF5',
        brightWhite: '#C0CAF5'
      },
      fontSize: 14,
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      cursorBlink: true,
      cursorStyle: 'block',
    });

    this.commands = new TerminalCommands(this.terminal);
    this.fitAddon = new FitAddon();
    
    this.initialize(container);
  }

  private initialize(container: HTMLElement) {
    this.terminal.loadAddon(this.fitAddon);
    this.terminal.loadAddon(new WebLinksAddon());
    
    this.terminal.open(container);
    this.fitAddon.fit();

    this.terminal.onData(this.handleData.bind(this));
    window.addEventListener('resize', () => this.fitAddon.fit());

    this.writePrompt();
  }

  private async handleData(data: string) {
    switch (data) {
      case '\r': // Enter
        await this.handleEnter();
        break;
      case '\u0003': // Ctrl+C
        this.handleCtrlC();
        break;
      case '\u007F': // Backspace
        this.handleBackspace();
        break;
      case '\u001b[A': // Up arrow
        this.handleUpArrow();
        break;
      case '\u001b[B': // Down arrow
        this.handleDownArrow();
        break;
      default:
        this.handleDefault(data);
    }
  }

  private async handleEnter() {
    this.terminal.write('\r\n');
    if (this.currentCommand.trim()) {
      const output = await this.commands.executeCommand(this.currentCommand);
      this.terminal.write(output);
      this.commands.addToHistory(this.currentCommand);
    }
    this.currentCommand = '';
    this.writePrompt();
  }

  private handleCtrlC() {
    this.terminal.write('^C\r\n');
    this.currentCommand = '';
    this.writePrompt();
  }

  private handleBackspace() {
    if (this.currentCommand.length > 0) {
      this.currentCommand = this.currentCommand.slice(0, -1);
      this.terminal.write('\b \b');
    }
  }

  private handleUpArrow() {
    const previousCommand = this.commands.getPreviousCommand();
    if (previousCommand) {
      this.clearCurrentLine();
      this.currentCommand = previousCommand;
      this.terminal.write(this.currentCommand);
    }
  }

  private handleDownArrow() {
    const nextCommand = this.commands.getNextCommand();
    this.clearCurrentLine();
    this.currentCommand = nextCommand;
    this.terminal.write(this.currentCommand);
  }

  private handleDefault(data: string) {
    if (data >= String.fromCharCode(0x20) && data <= String.fromCharCode(0x7E)) {
      this.currentCommand += data;
      this.terminal.write(data);
    }
  }

  private clearCurrentLine() {
    this.terminal.write('\r\x1b[K$ ');
  }

  private writePrompt() {
    this.terminal.write('\r\n$ ');
  }

  dispose() {
    this.terminal.dispose();
  }
}