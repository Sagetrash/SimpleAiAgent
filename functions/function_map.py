from google.genai import types

from functions.get_file_content import getFileContent
from functions.get_files_info import getFilesInfo
from functions.run_python_file import run_python_file
from functions.write_file import writeToFile

function_map = {
    "getFileContent": getFileContent,
    "getFilesInfo": getFilesInfo,
    "run_python_file": run_python_file,
    "writeToFile": writeToFile,
}


def callFunction(call: types.FunctionCall, verbose: bool = False):
    func_name = call.name if call.name else ""

    if verbose:
        print(f"- calling function: {func_name}({call.args})")
    else:
        print(f"- calling function: {func_name}")

    if func_name not in function_map:
        return types.Content(
            role="tool",
            parts=[
                types.Part.from_function_response(
                    name=func_name,
                    response={"error": f"Unknown Function: {func_name}"},
                )
            ],
        )
    func_args = dict(call.args) if call.args else {}
    func_args["working_directory"] = "./calculator"
    func_result = function_map[func_name](**func_args)
    return types.Content(
        role="tool",
        parts=[
            types.Part.from_function_response(
                name=func_name,
                response={"result": func_result},
            )
        ],
    )
