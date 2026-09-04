import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Timeline from './components/Timeline';

function App() {
  // Temporary sample files to test our Sidebar rendering
  const [files, setFiles] = useState([
    { name: 'main.py', path: 'main.py', is_dir: false },
    { name: 'utils.py', path: 'utils.py', is_dir: false },
    { name: 'README.md', path: 'README.md', is_dir: false },
  ]);
  
  const [activeFile, setActiveFile] = useState('main.py');

  const [events, setEvents] = useState([
      { type: 'user_prompt', content: 'Hello Agent! Can you help me build a calculator?' },
      { type: 'agent_response', content: 'Hello! I can definitely help you build a Python calculator in `./calculator`.' }
    ]);
    const [isStreaming, setIsStreaming] = useState(false);

  const handlePromptSubmit = (promptText) => {
    // Append the user's prompt to the events feed
    setEvents((prev) => [...prev, { type: 'user_prompt', content: promptText }]);
  };

  const handleRefresh = () => {
    console.log('Refreshing file list...');
  };
  return (
    <div className="flex h-screen w-screen bg-(--claude-bg) text-gray-100 overflow-hidden font-sans">
      <Sidebar
        files={files}
        activeFilePath={activeFile}
        onSelectFile={(path) => setActiveFile(path)}
        onRefresh={handleRefresh}
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