# Simple AI Coding Agent 🚀

A full-stack **Agentic AI Assistant** powered by **Google Gemini**, **FastAPI**, this application provides real-time Server-Sent Events (SSE) streaming, sandboxed execution, and an interactive 3-panel workspace interface.

---

## ✨ Features

- **⚡ Real-Time SSE Event Streaming:** Streams agent thought loops, tool execution badges, and output chunks token-by-token using HTTP Server-Sent Events (SSE).
- **🔒 Sandboxed Execution Environment:** Restricts all file system reads, writes, and script executions strictly to `./calculator` with path traversal security boundaries.
- **⚙️ Autonomous Tool Use:** Powered by Gemini function calling with a multi-turn reasoning loop (up to 20 turns) to explore, code, and execute Python scripts.

---

## 🏗️ Repository Architecture

```
SimpleAiCodingAgent/
├── backend/                  # 🐍 Python FastAPI Backend & Agent Core
│   ├── __init__.py           # Package marker
│   ├── main.py               # CLI entry point
│   ├── config.py             # Model configuration & System Prompt
│   ├── agent_runner.py       # Async generator engine yielding SSE events (2KB buffer flush)
│   ├── server.py             # FastAPI Server (CORS + SSE + Sandbox File APIs)
│   └── functions/            # Sandboxed Tool Definitions & Dispatcher
│       ├── schemas.py        # Gemini FunctionDeclaration definitions
│       ├── function_map.py   # Tool execution map (isolated to ./calculator)
│       ├── get_files_info.py # Directory listing
│       ├── get_file_content.py# File content reader
│       ├── write_file.py     # Sandboxed file writer
│       └── run_python_file.py# Sandboxed script runner
├── frontend/                 # ⚛️ React Web Application (Vite + Tailwind CSS v4 + Lucide Icons)
│   ├── package.json          # Node dependencies
│   ├── vite.config.js        # Vite + Tailwind plugin config
│   └── src/
│       ├── index.css         # Dark Theme CSS Variables & Custom Scrollbars
│       ├── App.jsx           # Main 3-Panel Dashboard Layout & SSE State Management
│       └── components/
│           ├── Sidebar.jsx   # Workspace file tree explorer & author links
│           ├── Timeline.jsx  # Real-time event feed & prompt input bar
│           └── ArtifactPanel.jsx # Code inspector panel
├── calculator/               # 📦 Sandboxed working directory for AI operations
├── tests/                    # 🧪 Backend unit tests
└── README.md                 # Project documentation
```

---

## ⚡ API Endpoints

The FastAPI backend runs on `http://127.0.0.1:8000`:

| Endpoint | Method | Description |
|---|---|---|
| `/api/agent/stream` | `POST` | Accepts `{ "prompt": "..." }`, streams live SSE events (`start`, `tool_call`, `tool_result`, `agent_response`, `end`). |
| `/api/sandbox/files` | `GET` | Returns flat JSON list of files and directories in `./calculator`. |
| `/api/sandbox/file` | `GET` | Accepts `?path=file.py` and returns relative file contents securely. |

---

## 🚀 Getting Started

### Prerequisites
- **Python 3.10+** (with `uv` or `pip`)
- **Node.js 18+** & `npm`
- **Google Gemini API Key**

### 1. Backend Setup

```bash
# Clone the repository
git clone https://github.com/your-username/SimpleAiCodingAgent.git
cd SimpleAiCodingAgent

# Set up environment variables
echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env

# Install backend dependencies
uv sync

# Run the FastAPI server
python -m uvicorn backend.server:app --reload --port 8000
```

### 2. Frontend Setup

```bash
# In a new terminal window:
cd frontend

# Install Node dependencies
npm install

# Start Vite dev server
npm run dev
```

Open **`http://localhost:5173`** in your browser to launch the dashboard!

---

## 👨‍💻 Author & Credits

Designed and developed by **Ayush Sharma** as a learning project for how agents and harnesses are made.

- 🌐 **Portfolio & Resume:** [ayushsharma.is-a.dev](https://ayushsharma.is-a.dev)
- 💼 **GitHub:** [github.com](https://github.com)
