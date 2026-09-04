import { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Timeline from './components/Timeline';

function App() {
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState('');
  const [events, setEvents] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);

  // 1. Memoized fetchFiles function using useCallback
  const fetchFiles = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:8000/api/sandbox/files');
      const data = await res.json();
      setFiles(data.files || []);
    } catch (err) {
      console.error('Error fetching files:', err);
    }
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  // 2. Submit prompt & stream SSE events from FastAPI
  const handlePromptSubmit = async (promptText) => {
    setIsStreaming(true);
    setEvents((prev) => [...prev, { type: 'user_prompt', content: promptText }]);

    try {
      const response = await fetch('http://localhost:8000/api/agent/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data:')) {
            const jsonStr = line.replace(/^data:\s*/, '').trim();
            if (jsonStr) {
              try {
                const eventData = JSON.parse(jsonStr);
                setEvents((prev) => [...prev, eventData]);
              } catch (e) {
                console.error('Error parsing SSE event:', e);
              }
            }
          }
        }
      }

      fetchFiles();
    } catch (err) {
      console.error('Error in agent stream:', err);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-(--claude-bg) text-gray-100 overflow-hidden font-sans">
      <Sidebar
        files={files}
        activeFilePath={activeFile}
        onSelectFile={(path) => setActiveFile(path)}
        onRefresh={fetchFiles}
      />
      <Timeline
        events={events}
        isStreaming={isStreaming}
        onSubmitPrompt={handlePromptSubmit}
      />
    </div>
  );
}

export default App;