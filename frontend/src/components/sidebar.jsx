import React from "react";
import { Folder, FileCode, FileText, RefreshCw } from 'lucide-react';

export default function Sidebar({ files, activeFilePath, onSelectFile, onRefresh }) {
  return (
    <aside style={{ width: '260px', backgroundColor: 'var(--claude-panel)', borderRight: '1px solid var(--claude-border)' }} className="flex flex-col h-full select-none">
      {/*header*/}
      <div className="flex items-center justify-between px-4 py-3 border-b border-(--claude-border)">
        <div className="flex items-center gap-2">
          <Folder className="w-4 h-4 text-(--claude-accent)" />
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-200">
            workspace
          </span>
        </div>
        <button
          onClick={onRefresh}
          className="p-1 hover:bg-(--claude-border) rounded text-gray-400 hover:text-gray-200 transition-colors"
          title="Refresh files"
        >
          <RefreshCw className="w-3.5 h-3.5"/>
        </button>
      </div>
    </aside>
  );
} 