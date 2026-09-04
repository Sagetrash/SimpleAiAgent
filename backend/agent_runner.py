import json
import os

from dotenv import load_dotenv
from google import genai
from google.genai import types

from backend.config import MODEL, SYSTEM_PROMPT
from backend.functions.function_map import callFunction
from backend.functions.schemas import avail_functions


async def run_agent_stream(prompt:str):
    load_dotenv()
    api_key = os.environ.get("GEMINI_API_KEY")
    model = MODEL
    system_prompt = SYSTEM_PROMPT
    client = genai.Client(api_key=api_key)
    messages = [types.Content(role="user",parts=[types.Part(text=prompt)])]
    yield f"data: {json.dumps({'type':'start','prompt':prompt})}\n\n"

    for _ in range(20):
        response = client.models.generate_content(
            model=model,
            contents=messages,
            config= types.GenerateContentConfig(
                system_instruction=system_prompt,
                tools = [avail_functions],
            ),
        )
        if response.candidates and response.candidates[0].content:
            messages.append(response.candidates[0].content)
        if response.function_calls:
            function_call_results = []
            for call in response.function_calls:
                func_name = call.name or ""
                func_args = dict(call.args) if call.args else {}
                yield f"data: {json.dumps({'type':'tool_call','name':func_name,'args':func_args})}\n\n"
                call_result = callFunction(call)
                res_payload = (
                    call_result.parts[0].function_response.response if (call_result.parts and call_result.parts[0].function_response) else {}
                )
                yield f"data:{json.dumps({'type':'tool_result','name':func_name,'result':res_payload})}\n\n"
                if call_result.parts:
                    function_call_results.append(call_result.parts[0])
            messages.append(types.Content(role="user",parts=function_call_results))
        else:
            usage = {}
            if response.usage_metadata:
                usage['prompt_tokens'] = response.usage_metadata.prompt_token_count
                usage['candidate_tokens'] = response.usage_metadata.candidates_token_count
            yield f"data:{json.dumps({'type':'agent_response', 'content':response.text, 'usage':usage})}\n\n"
            break
    yield f"data:{json.dumps({'type':'end'})}\n\n"
    