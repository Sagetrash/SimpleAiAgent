import React from "react";
import { Folder, FileCode, FileText, RefreshCw, User } from 'lucide-react';

const GithubIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Sidebar({ files, activeFilePath, onSelectFile, onRefresh }) {
  const getFileIcon = (file) => {
    if (file.is_dir) return <Folder className="w-4 h-4 text-(--claude-accent)" />;
    if (file.name.endsWith('.py')) return <FileCode className="w-4 h-4 text-(--claude-text)" />;
    return <FileText className="w-4 h-4 text-(--claude-text)" />;
  };

  return (
    <aside style={{ width: '260px', backgroundColor: 'var(--claude-panel)', borderRight: '1px solid var(--claude-border)' }} className="flex flex-col h-full select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-(--claude-border)">
        <div className="flex items-center gap-2">
          <Folder className="w-4 h-4 text-(--claude-accent)" />
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-200">
            workspace
          </span>
        </div>
        <div className="flex items-center gap-1">
          <a
            href="https://ayushsharma.is-a.dev"
            target="_blank"
            rel="noreferrer"
            className="p-1 hover:bg-(--claude-border) rounded text-gray-400 hover:text-(--claude-accent) transition-colors"
            title="Ayush Sharma — Portfolio & Resume"
          >
            <User className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://github.com/Sagetrash/SimpleAiAgent"
            target="_blank"
            rel="noreferrer"
            className="p-1 hover:bg-(--claude-border) rounded text-gray-400 hover:text-gray-200 transition-colors"
            title="View GitHub Repository"
          >
            <GithubIcon className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onRefresh}
            className="p-1 hover:bg-(--claude-border) rounded text-gray-400 hover:text-gray-200 transition-colors"
            title="Refresh files"
          >
            <RefreshCw className="w-3.5 h-3.5"/>
          </button>
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto py-2">
        {files.length === 0 ? (
          <div className="px-4 py-3 text-xs text-(--claude-muted) italic">
            No files found
          </div>
        ) : (
          files.map((file) => {
            const isActive = activeFilePath === file.path;
            return (
              <button
                key={file.path}
                onClick={() => onSelectFile(file.path)}
                className={`w-full flex items-center gap-2.5 px-4 py-1.5 text-xs text-left transition-colors ${
                  isActive
                    ? `bg-(--claude-card) text-(--claude-accent) font-medium`
                    : `text-gray-300 hover:bg-(--claude-muted)`
                }`}
              >
                {getFileIcon(file)}
                <span className="truncate">{file.name}</span>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
}