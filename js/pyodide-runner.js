let pyodide;
let pyodideReady = false;

async function loadPython() {
  pyodide = await loadPyodide();
  pyodideReady = true;
}
loadPython();

async function runPython(codeId, outputId) {
  if (!pyodideReady) {
    document.getElementById(outputId).textContent = "Loading Python...";
    return;
  }

  const code = document.getElementById(codeId).value;

  try {
    let result = pyodide.runPython(code);
    document.getElementById(outputId).textContent =
      result !== undefined ? result : "Program executed successfully.";
  } catch (err) {
    document.getElementById(outputId).textContent = err;
  }
}
