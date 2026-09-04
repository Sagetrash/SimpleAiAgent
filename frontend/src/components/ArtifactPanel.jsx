import React, { useState } from 'react';
import { FileText, Copy, Check, Code } from 'lucide-react';

export default function ArtifactPanel({ filePath, content, isLoading }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 1. Empty State (No file selected yet)
  if (!filePath) {
    return (
      <div className="w-[450px] bg-(--claude-panel) border-l border-(--claude-border) h-full flex flex-col items-center justify-center text-(--claude-muted) text-sm p-6 text-center select-none">
        <Code className="w-8 h-8 mb-3 opacity-40 text-(--claude-accent)" />
        <p>Select a file from the workspace to inspect its code.</p>
      </div>
    );
  }

  // 2. Active File Code Viewer State
  return (
    <div className="w-[450px] bg-(--claude-panel) border-l border-(--claude-border) h-full flex flex-col overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-(--claude-border) bg-[#16161a]">
        <div className="flex items-center gap-2 overflow-hidden">
          <FileText className="w-4 h-4 text-(--claude-accent) shrink-0" />
          <span className="text-xs font-mono font-medium text-gray-200 truncate">
            {filePath}
          </span>
        </div>

        {/* <button
          onClick={handleCopy}
          className="p-1.5 hover:bg-[#2e2e3e] rounded text-gray-400 hover:text-gray-200 transition-colors flex items-center gap-1 text-xs"
          title="Copy Code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 text-[10px]">Copied!</span>
            </>
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>*/}
      </div>

      {/* Code Body */}
      <div className="flex-1 overflow-auto p-4 bg-[#121214] font-mono text-xs text-gray-200 leading-relaxed">
        {isLoading ? (
          <div className="text-(--claude-muted) italic">Loading file content...</div>
        ) : (
          <pre className="whitespace-pre-wrap">{content || '// Empty file'}</pre>
        )}
      </div>
    </div>
  );
}
