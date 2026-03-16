import os
import sys

from dotenv import load_dotenv
from google import genai
from google.genai import types

from config import MODEL, SYSTEM_PROMPT
from functions.function_map import callFunction
from functions.schemas import avail_functions


def main():
    load_dotenv()
    api_key = os.environ.get("GEMINI_API_KEY")
    model = MODEL
    if model is None:
        model = "gemini-2.5-flash-lite"

    client = genai.Client(api_key=api_key)
    print(model)

    if len(sys.argv) < 2:
        print("please enter a prompt")
        sys.exit(1)
    else:
        prompt = sys.argv[1]
    verbose = False
    if len(sys.argv) > 2:
        if sys.argv[2] == "--verbose":
            verbose = True
    messages = [types.Content(role="user", parts=[types.Part(text=prompt)])]
    response = types.GenerateContentResponse()
    for _ in range(20):
        response = client.models.generate_content(
            model=model,
            contents=messages,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT, tools=[avail_functions]
            ),
        )
        if response.candidates and response.candidates[0].content:
            content = response.candidates[0].content
            messages.append(content)

        if response.function_calls:
            function_call_results = []
            for i in response.function_calls:
                call_result = callFunction(i, verbose)
                if not (
                    call_result.parts
                    and call_result.parts[0].function_response
                    and call_result.parts[0].function_response.response
                ):
                    raise Exception
                function_call_results.append(call_result.parts[0])
                if verbose:
                    print(f"-> {call_result.parts[0].function_response.response}")
            messages.append(types.Content(role="user", parts=function_call_results))
        else:
            print(f"\n\n {response.text} \n\n")
            break

        if response.usage_metadata is None:
            return
        if verbose:
            print(f"user prompt: {prompt}")
            print(f"prompt tokens: {response.usage_metadata.prompt_token_count}")
            print(f"response tokens: {response.usage_metadata.candidates_token_count}")


main()
