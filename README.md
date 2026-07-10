# Simple AI Coding Agent

An agentic AI coding assistant powered by Google Gemini, built as a learning project to understand how AI agents work.

The agent operates in a **controlled directory** (`calculator/`) using a function-calling loop — it can explore, read, write, and execute Python files.

## How it works

1. You pass a natural-language query as a command-line argument.
2. The agent calls Google Gemini with a loop of up to 20 turns.
3. The model can invoke these tools:

| Function          | Description                              |
|-------------------|------------------------------------------|
| `getFilesInfo`    | List files/directories with sizes        |
| `getFileContent`  | Read the text content of a file          |
| `writeToFile`     | Write or overwrite a file                |
| `run_python_file` | Execute a Python file and return output  |

4. All file operations are **sandboxed** to the `calculator/` directory (path-traversal protected).
5. The agent continues calling functions until it produces a final text response.

## Usage

```bash
# Install dependencies
uv sync

# Run the agent
uv run python main.py "list all files in the project" --verbose
```

The `--verbose` flag prints function calls and token usage.

## Configuration

- **Model**: `gemma-4-31b-it` (set in `config.py`)
- **API Key**: Set `GEMINI_API_KEY` in `.env`
- **Working directory**: `./calculator`

## Project structure

```
.
├── main.py                # Entry point & agentic loop
├── config.py              # System prompt & model config
├── functions/
│   ├── schemas.py         # Function declarations for Gemini
│   ├── function_map.py    # Maps function names to implementations
│   ├── get_files_info.py  # List directory contents
│   ├── get_file_content.py# Read file contents
│   ├── write_file.py      # Write files
│   └── run_python_file.py # Execute Python files
├── tests/                 # Unit tests
├── calculator/            # Sandbox working directory
├── .env                   # API key (gitignored)
└── pyproject.toml         # Project metadata & dependencies
```
