import React, { useState } from "react";
import { User, Bot, Send, Wrench, Loader2 } from 'lucide-react';

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

        {events.length === 0 ? (
          <div className="text-center text-sm text-(--claude-muted) py-12">
            No activity yet, type a message below to get started!
          </div>
        ) : (
            events.map((event, index) => {
              if (event.type === 'user_prompt') {
                return (
                  <div key={index} className="flex gap-3 items-start justify-end">
                    <div className="bg-(--claude-card) border border-(--claude-border) rounded-lg p-3 max-w-[80%] text-sm text-(--claude-text)">
                      {event.content}
                    </div>
                    <div className="p-1.5 bg-(--claude-accent) text-white rounded-full">
                      <User className="w-4 h-4" />
                    </div>
                  </div>
                )
              } 
              
              if (event.type === 'agent_response') {
                return (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="p-1.5 bg-[#2e2e3e] text-(--claude-accent) rounded-full">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-(--claude-panel) border border-(--claude-border) rounded-lg p-4 max-w-[85%] text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">
                      {event.content}
                    </div>
                  </div>
                );
              }

              if (event.type === "tool_call") {
                return (
                  <div key={index} className="flex gap-3 items-start my-2">
                    <div className="p-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full mt-0.5">
                      <Wrench className="w-4 h-4" />
                    </div>
                    <div className="bg-[#1a1a1e] border border-(--claude-border) rounded-lg px-3 py-2 text-xs font-mono text-amber-400">
                      Executed tool: <span className="font-semibold">{event.name}</span>
                    </div>
                  </div>
                )
              }
              return null
            }
            )
        )
        }
      </div>
      {/* Animated Working Indicator when Agent is processing */}
      {isStreaming && (
        <div className="flex gap-3 items-center text-xs text-(--claude-accent) bg-[#1a1a1e] border border-(--claude-border) rounded-lg px-4 py-3 w-fit animate-pulse">
          <Loader2 className="w-4 h-4 animate-spin text-(--claude-accent)" />
          <span className="font-medium">Agent is thinking & executing tools...</span>
        </div>
      )}
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