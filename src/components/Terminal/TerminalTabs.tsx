import React from 'react';
import { Plus, X } from 'lucide-react';

interface TerminalTab {
  id: string;
  title: string;
}

export function TerminalTabs() {
  const [tabs, setTabs] = React.useState<TerminalTab[]>([
    { id: '1', title: 'Terminal 1' }
  ]);
  const [activeTab, setActiveTab] = React.useState('1');

  const addTab = () => {
    const newTab = {
      id: String(tabs.length + 1),
      title: `Terminal ${tabs.length + 1}`
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newTab.id);
  };

  const closeTab = (id: string) => {
    setTabs(tabs.filter(tab => tab.id !== id));
    if (activeTab === id) {
      setActiveTab(tabs[0].id);
    }
  };

  return (
    <div className="flex items-center border-b border-gray-700">
      {tabs.map(tab => (
        <div
          key={tab.id}
          className={`flex items-center px-3 py-2 cursor-pointer
            ${activeTab === tab.id ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
          onClick={() => setActiveTab(tab.id)}
        >
          <span className="text-sm mr-2">{tab.title}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeTab(tab.id);
            }}
            className="hover:bg-gray-600 rounded p-1"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
      <button
        onClick={addTab}
        className="p-2 hover:bg-gray-700 rounded"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}