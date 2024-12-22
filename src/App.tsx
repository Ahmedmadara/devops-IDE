import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Split from 'react-split';
import { FileTree } from './components/FileExplorer/FileTree';
import { CodeEditor } from './components/Editor/CodeEditor';
import { IntegratedTerminal } from './components/Terminal/IntegratedTerminal';
import { ToolPanel } from './components/Tools/ToolPanel';

export default function App() {
  const [selectedFile, setSelectedFile] = React.useState<string | null>(null);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-gray-900 text-white">
        <div className="flex-1 flex">
          <FileTree onFileSelect={setSelectedFile} />
          
          <div className="flex-1">
            <Split
              className="flex flex-col h-full"
              direction="vertical"
              sizes={[70, 30]}
              minSize={100}
            >
              <Split
                className="flex"
                sizes={[60, 40]}
                minSize={200}
              >
                {selectedFile ? (
                  <CodeEditor 
                    filePath={selectedFile}
                    language="typescript"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Select a file to edit
                  </div>
                )}
                <ToolPanel />
              </Split>
              
              <IntegratedTerminal />
            </Split>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}