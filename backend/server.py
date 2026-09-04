from gc import is_finalized
import os
from pathlib import Path
from tarfile import is_tarfile

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from backend.agent_runner import run_agent_stream

app = FastAPI(title = 'Simple AI Agent Backend')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_headers=["*"],
    allow_methods=["*"],
    allow_credentials=True,
)

sandbox_dir = Path("./calculator").resolve()

class PromptModel(BaseModel): 
    prompt: str

@app.post("/api/agent/stream")
async def agent_stream(modelInput:PromptModel)-> StreamingResponse:
    if not modelInput.prompt.strip():
        raise HTTPException(status_code=400)
    return StreamingResponse(run_agent_stream(modelInput.prompt),media_type="text/event_stream")

@app.get('/api/sandbox/files')
async def fetch_sandbox_files()->dict:
    file_list = []
    for root,dirs,files in os.walk(sandbox_dir):
        rel_root = Path(root).relative_to(sandbox_dir)
        for dir in dirs:
            rel_path = str(rel_root/dir)
            file_list.append({'name':dir,'path':rel_path, 'is_dir':True})
        for file in files:
            rel_path = str(rel_root/file)
            size = (Path(root)/file).stat().st_size
            file_list.append({"name":file,'path':rel_path,'is_dir':False,'size':size})
    return {'files':file_list}

@app.get('/api/sandbox/file')
async def fetch_file_content(path: str = Query(...))-> dict:
    target = (sandbox_dir/path).resolve()
    if str(target).startswith(str(sandbox_dir)):
        if(target.exists() and target.is_file()):
            try:
                contents = target.read_text(encoding='utf-8')
                return {'path':path,'contents':contents}
            except Exception as e:
                raise HTTPException(status_code=500,detail=str(e))
        else:
            raise HTTPException(status_code=404,detail = 'File not found')
    else:
        raise HTTPException(status_code=403,detail="Forbidden Path")
        