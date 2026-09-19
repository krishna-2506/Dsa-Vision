/**
 * Client-Side JavaScript Execution & Tracing Runner
 * 
 * Instruments JavaScript code to record execution frames (lines, variable snapshots)
 * in real-time with infinite-loop protection, syntax error isolation, and stdout streaming.
 */

function checkJsSyntax(code) {
  try {
    new Function(code);
    return null;
  } catch (err) {
    // Extract line number if possible
    let lineNum = 1;
    const match = err.stack?.match(/<anonymous>:(\d+):(\d+)/) || err.message.match(/line (\d+)/i);
    if (match) {
      lineNum = parseInt(match[1], 10);
    }
    return {
      errorType: err.name || 'SyntaxError',
      errorLine: lineNum,
      message: `${err.name || 'SyntaxError'}: ${err.message}`,
      traceback: `${err.name || 'SyntaxError'}: ${err.message}\n  at main.js:${lineNum}`
    };
  }
}

export async function runJavaScript(code, maxSteps = 400) {
  const frames = [];
  const stdoutLogs = [];

  // 1. Check syntax first
  const syntaxErr = checkJsSyntax(code);
  if (syntaxErr) {
    return {
      success: false,
      frames: [],
      stdout: '',
      error: syntaxErr.message,
      errorType: syntaxErr.errorType,
      errorLine: syntaxErr.errorLine,
      traceback: syntaxErr.traceback
    };
  }

  // 2. Detect variable names declared in the user code
  const varNames = new Set();
  const declarationRegex = /(?:let|const|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
  let match;
  while ((match = declarationRegex.exec(code)) !== null) {
    varNames.add(match[1]);
  }

  // Also include common algorithmic pointers
  ['nums', 'arr', 'target', 'i', 'j', 'k', 'left', 'right', 'low', 'high', 'mid', 'seen', 'result', 'diff', 'max_ones', 'largest', 'second_largest', 'drops'].forEach(v => {
    if (code.includes(v)) varNames.add(v);
  });

  // 3. Transpile const/let to var to eliminate Temporal Dead Zone (TDZ)
  let safeCode = code
    .replace(/\bconst\s+/g, 'var ')
    .replace(/\blet\s+/g, 'var ');

  const lines = safeCode.split('\n');
  const instrumentedLines = [];

  const varListStr = Array.from(varNames).map(v => {
    return `${v}: __safeGet(() => typeof ${v} !== 'undefined' ? (Array.isArray(${v}) ? [...${v}] : (typeof ${v} === 'object' && ${v} !== null ? {...${v}} : ${v})) : undefined)`;
  }).join(',\n      ');

  lines.forEach((lineText, idx) => {
    const lineNum = idx + 1;
    const trimmed = lineText.trim();

    // Skip empty lines, comments, and standalone braces
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed === '}' || trimmed === '{') {
      instrumentedLines.push(lineText);
      return;
    }

    // Insert trace hook before line if not a control flow header that doesn't accept statements
    if (!trimmed.startsWith('else') && !trimmed.startsWith('catch') && !trimmed.startsWith('finally')) {
      instrumentedLines.push(`__recordStep__(${lineNum}, {
      ${varListStr}
    });`);
    }

    instrumentedLines.push(lineText);
  });

  const instrumentedCode = instrumentedLines.join('\n');

  // 4. Execution harness with sandbox scope
  try {
    const __safeGet = (fn) => {
      try { return fn(); } catch (_) { return undefined; }
    };

    const customConsole = {
      log: (...args) => stdoutLogs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
      error: (...args) => stdoutLogs.push('ERROR: ' + args.join(' ')),
      warn: (...args) => stdoutLogs.push('WARN: ' + args.join(' '))
    };

    let stepCount = 0;
    const recordStep = (lineNum, localsSnapshot) => {
      if (stepCount >= maxSteps) {
        throw new Error(`Execution paused: maximum step limit (${maxSteps}) reached to prevent infinite loops.`);
      }
      stepCount++;

      // Clean undefined locals
      const cleanLocals = {};
      for (const [k, v] of Object.entries(localsSnapshot)) {
        if (v !== undefined) {
          cleanLocals[k] = v;
        }
      }

      frames.push({
        step: stepCount,
        line: lineNum,
        locals: cleanLocals,
        stdout: stdoutLogs.slice(-1)[0] || ''
      });
    };

    // Execute in Function sandbox
    const runnerFn = new Function('__recordStep__', '__safeGet', 'console', instrumentedCode);
    runnerFn(recordStep, __safeGet, customConsole);

    return {
      success: true,
      frames,
      stdout: stdoutLogs.join('\n'),
      error: null
    };
  } catch (err) {
    let errLine = 1;
    const matchLine = err.stack?.match(/<anonymous>:(\d+):(\d+)/);
    if (matchLine) {
      errLine = Math.max(1, parseInt(matchLine[1], 10) - 2);
    }

    return {
      success: false,
      frames: [],
      stdout: stdoutLogs.join('\n'),
      error: `${err.name || 'RuntimeError'}: ${err.message}`,
      errorType: err.name || 'RuntimeError',
      errorLine: errLine,
      traceback: `${err.name || 'RuntimeError'}: ${err.message}\n  at line ${errLine}`
    };
  }
}
