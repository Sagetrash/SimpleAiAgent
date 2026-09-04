import { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Timeline from './components/Timeline';
import ArtifactPanel from './components/ArtifactPanel';

function App() {
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [isFileLoading, setIsFileLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);

  // 1. Fetch workspace file list
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

  // 2. Fetch specific file content when clicked in Sidebar
  const handleSelectFile = async (path) => {
    setActiveFile(path);
    setIsFileLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/api/sandbox/file?path=${encodeURIComponent(path)}`);
      const data = await res.json();
      setFileContent(data.contents || '');
    } catch (err) {
      console.error('Error reading file content:', err);
      setFileContent('// Failed to load file content.');
    } finally {
      setIsFileLoading(false);
    }
  };

  // 3. Submit prompt & stream SSE events from FastAPI
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

      // Refresh workspace file list after execution completes
      fetchFiles();
      // If a file was active, refresh its content too
      if (activeFile) {
        handleSelectFile(activeFile);
      }
    } catch (err) {
      console.error('Error in agent stream:', err);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-(--claude-bg) text-gray-100 overflow-hidden font-sans">
      {/* Left Explorer */}
      <Sidebar
        files={files}
        activeFilePath={activeFile}
        onSelectFile={handleSelectFile}
        onRefresh={fetchFiles}
      />

      {/* Center Feed */}
      <Timeline
        events={events}
        isStreaming={isStreaming}
        onSubmitPrompt={handlePromptSubmit}
      />

      {/* Right Code Inspector */}
      <ArtifactPanel
        filePath={activeFile}
        content={fileContent}
        isLoading={isFileLoading}
      />
    </div>
  );
}

export default App;