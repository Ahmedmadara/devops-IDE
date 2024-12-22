import React from 'react';
import { 
  File, 
  FolderOpen, 
  RefreshCw,
  MoreVertical,
  ChevronRight,
  Code,
  FileText
} from 'lucide-react';

export function Editor() {
  return (
    <div className="h-full flex bg-[#1E1E1E]">
      <div className="w-64 border-r border-gray-800">
        <div className="h-10 flex items-center justify-between px-3 border-b border-gray-800">
          <span className="text-sm font-medium text-gray-300">EXPLORER</span>
          <div className="flex items-center space-x-1">
            <button className="p-1 hover:bg-gray-800 rounded-md text-gray-400 hover:text-gray-100">
              <File className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-gray-800 rounded-md text-gray-400 hover:text-gray-100">
              <FolderOpen className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-gray-800 rounded-md text-gray-400 hover:text-gray-100">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="p-2">
          <div className="flex items-center text-gray-400 hover:text-gray-100 py-1 px-2 rounded-sm cursor-pointer">
            <ChevronRight className="w-4 h-4 mr-1" />
            <FolderOpen className="w-4 h-4 mr-2" />
            <span className="text-sm">src</span>
          </div>
          <div className="ml-4">
            <div className="flex items-center text-gray-400 hover:text-gray-100 py-1 px-2 rounded-sm cursor-pointer">
              <Code className="w-4 h-4 mr-2" />
              <span className="text-sm">main.ts</span>
            </div>
            <div className="flex items-center text-gray-400 hover:text-gray-100 py-1 px-2 rounded-sm cursor-pointer">
              <FileText className="w-4 h-4 mr-2" />
              <span className="text-sm">types.ts</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="h-10 flex items-center border-b border-gray-800">
          <div className="flex-1 flex items-center">
            <div className="px-4 py-2 bg-[#252526] text-sm border-r border-gray-800 flex items-center group">
              <span className="mr-2 text-gray-300">main.ts</span>
              <button className="p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-700 rounded-md">
                <MoreVertical className="w-3 h-3 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex-1 bg-[#1E1E1E] p-4 font-mono">
          <pre className="text-sm">
            <code className="text-gray-300">{`// Your code here
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}