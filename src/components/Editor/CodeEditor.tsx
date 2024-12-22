import React from 'react';
import { useMonaco } from '@monaco-editor/react';
import { useFileContent } from '@/hooks/useFileContent';

interface CodeEditorProps {
  filePath: string;
  language: string;
}

export function CodeEditor({ filePath, language }: CodeEditorProps) {
  const { content, saveContent } = useFileContent(filePath);
  const monaco = useMonaco();

  // Configure Monaco editor for DevOps languages
  React.useEffect(() => {
    if (monaco) {
      // Register custom language providers
      monaco.languages.register({ id: 'terraform' });
      monaco.languages.register({ id: 'kubernetes-yaml' });
    }
  }, [monaco]);

  return (
    <div className="h-full bg-gray-900">
      <div className="h-8 bg-gray-800 border-b border-gray-700 flex items-center px-4">
        <span className="text-sm text-gray-300">{filePath}</span>
      </div>
      <div className="h-[calc(100%-2rem)]">
        <Editor
          value={content}
          language={language}
          theme="vs-dark"
          onChange={(value) => saveContent(value || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            rulers: [80],
            formatOnPaste: true,
            formatOnType: true,
          }}
        />
      </div>
    </div>
  );
}