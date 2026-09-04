import React, { useState } from "react";
import { User, Bot, Send, Wrench } from 'lucide-react';

export default function Timeline({ events, isStreaming, onSubmitPrompt }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;
    onSubmitPrompt(input);
    setInput('');
  };
  
  return (
    <div className="flex-1 flex flex-col h-full bg-(--claude-bg)">

      {/*feed container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <h2 className="text-xs uppercase tracking-wider text-(--claude-muted)">
          Agent Activity Feed
        </h2>
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-(--claude-border) bg-(--claude-panel)">
        <div className="flex items-center gap-2 bg-(--claude-card) border border-(--claude-border) rounded-lg px-3 py-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-sm text-(--claude-text) focus:outline-none placeholder-(--claude-muted)"
          />
          <button
            type="submit"
            disabled={!input.trim() || isStreaming}
            className="p-1.5 bg-(--claude-accent) hover:bg-(--claude-accent-hover) text-white rounded transition-colors disabled:opacity-40"
          >
            <Send className="w-4 h-4"/>
          </button>
        </div>
      </form>
    </div>
  )
}