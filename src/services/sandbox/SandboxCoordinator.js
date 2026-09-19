/**
 * Central Sandbox Coordinator
 * 
 * Orchestrates language execution runners (Python, C++, JavaScript)
 * and feeds raw execution traces into the Trace Normalizer to produce
 * interactive step-by-step visualizer states.
 */

import { runPython, initPyodide } from './pythonRunner.js';
import { runCpp } from './cppRunner.js';
import { runJavaScript } from './jsRunner.js';
import { normalizeExecutionTrace } from './traceNormalizer.js';

export const sandboxCoordinator = {
  /**
   * Warm up Python WASM in background
   */
  warmup() {
    initPyodide().catch(() => {});
  },

  /**
   * Execute code and generate visualizer steps
   * @param {string} language - 'python' | 'cpp' | 'javascript'
   * @param {string} code - Source code
   * @param {Object} options - Execution options
   * @returns {Promise<{ success: boolean, steps: Array, stdout: string, error: string|null }>}
   */
  async executeAndTrace(language = 'python', code = '', options = {}) {
    let result = { success: false, frames: [], stdout: '', error: null };

    const lang = language.toLowerCase();
    const maxSteps = options.maxSteps || 300;

    if (lang === 'python' || lang === 'py') {
      result = await runPython(code, maxSteps);
    } else if (lang === 'cpp' || lang === 'c++') {
      result = await runCpp(code, maxSteps);
    } else if (lang === 'javascript' || lang === 'js') {
      result = await runJavaScript(code, maxSteps);
    } else {
      result.error = `Unsupported language: ${language}. Supported languages: Python, C++, JavaScript.`;
    }

    const steps = normalizeExecutionTrace(result.frames, options);

    return {
      success: result.success,
      steps,
      stdout: result.stdout || '',
      error: result.error,
      errorType: result.errorType || null,
      errorLine: result.errorLine || null,
      traceback: result.traceback || null,
      frameCount: result.frames.length
    };
  }
};
