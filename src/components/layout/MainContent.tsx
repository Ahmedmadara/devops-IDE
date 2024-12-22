import React from 'react';
import Split from 'react-split';
import { Editor } from '../editor/Editor';
import { ToolPanel } from '../tools/ToolPanel';

export function MainContent() {
  return (
    <Split
      className="flex h-full"
      sizes={[60, 40]}
      minSize={200}
      gutterSize={4}
      gutterStyle={() => ({
        backgroundColor: '#2D3748',
      })}
    >
      <div className="h-full">
        <Editor />
      </div>
      <div className="h-full bg-[#1E1E1E] overflow-y-auto">
        <ToolPanel />
      </div>
    </Split>
  );
}