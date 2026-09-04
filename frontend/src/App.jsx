import { useState } from 'react';
import Sidebar from './components/Sidebar';


function App() {
  // Temporary sample files to test our Sidebar rendering
  const [files, setFiles] = useState([
    { name: 'main.py', path: 'main.py', is_dir: false },
    { name: 'utils.py', path: 'utils.py', is_dir: false },
    { name: 'README.md', path: 'README.md', is_dir: false },
  ]);
  
  const [activeFile, setActiveFile] = useState('main.py');
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
      <main className="flex-1 p-6 flex flex-col justify-center items-center">
        <h1 className="text-xl font-medium text-gray-300">
          Selected File: <span className="text-[#da7756] font-mono">{activeFile}</span>
        </h1>
      </main>
    </div>
  );
}
export default App;