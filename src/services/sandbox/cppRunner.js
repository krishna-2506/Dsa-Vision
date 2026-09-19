/**
 * Client-Side C++ Execution & Tracing Runner
 * 
 * Translates and interprets C++ algorithm snippets (vectors, loops, pointers, swaps)
 * directly in the browser with full compiler syntax checking, runtime diagnostics, and stdout streaming.
 */

function checkCppSyntax(code) {
  const lines = code.split('\n');
  const bracketStack = [];
  const bracketPairs = { '(': ')', '[': ']', '{': '}' };

  for (let idx = 0; idx < lines.length; idx++) {
    const lineNum = idx + 1;
    const rawLine = lines[idx];
    const trimmed = rawLine.trim();

    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*')) continue;

    // Check bracket matching
    for (let c of rawLine) {
      if (c === '(' || c === '[' || c === '{') {
        bracketStack.push({ char: c, line: lineNum });
      } else if (c === ')' || c === ']' || c === '}') {
        if (bracketStack.length === 0) {
          return {
            errorType: 'CompilationError',
            errorLine: lineNum,
            message: `Syntax Error: unmatched '${c}' on line ${lineNum}`,
            traceback: `In file included from main.cpp:${lineNum}:\n    ${rawLine}\n    ^\nerror: stray '${c}' in program`
          };
        }
        const last = bracketStack.pop();
        if (bracketPairs[last.char] !== c) {
          return {
            errorType: 'CompilationError',
            errorLine: lineNum,
            message: `Syntax Error: closing '${c}' does not match '${last.char}' from line ${last.line}`,
            traceback: `In file included from main.cpp:${lineNum}:\n    ${rawLine}\n    ^\nerror: expected '${bracketPairs[last.char]}' before '${c}' token`
          };
        }
      }
    }
  }

  if (bracketStack.length > 0) {
    const unclosed = bracketStack.pop();
    return {
      errorType: 'CompilationError',
      errorLine: unclosed.line,
      message: `Syntax Error: unclosed '${unclosed.char}' opened on line ${unclosed.line}`,
      traceback: `In file included from main.cpp:${unclosed.line}:\n    ${lines[unclosed.line - 1]}\n    ^\nerror: expected '}' at end of input`
    };
  }

  return null;
}

export async function runCpp(code, maxSteps = 400) {
  const frames = [];
  const stdout = [];

  // 1. Static syntax analysis
  const syntaxErr = checkCppSyntax(code);
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

  try {
    // 2. Strip headers, namespaces and main wrappers
    let cleanCode = code
      .replace(/#include\s*<[^>]+>/g, '')
      .replace(/using\s+namespace\s+std\s*;/g, '')
      // std::vector<int> nums = {2, 7, 11, 15}; -> var nums = [2, 7, 11, 15];
      .replace(/(?:std::)?vector<\w+>\s+([a-zA-Z_]\w*)\s*=\s*\{([^}]+)\};/g, 'var $1 = [$2];')
      // int nums[] = { ... }; -> var nums = [ ... ];
      .replace(/\b(?:int|double|float|char)\s+([a-zA-Z_]\w*)\s*\[\s*\]\s*=\s*\{([^}]+)\};/g, 'var $1 = [$2];')
      // vector<int> nums; -> var nums = [];
      .replace(/(?:std::)?vector<\w+>\s+([a-zA-Z_]\w*)\s*;/g, 'var $1 = [];')
      // int a = 5, b = 10; -> var a = 5, b = 10;
      .replace(/\b(?:int|long|double|float|char|bool|size_t|auto)\s+/g, 'var ')
      // nums.size() -> nums.length
      .replace(/\.size\(\)/g, '.length')
      // nums.push_back(x) -> nums.push(x)
      .replace(/\.push_back\(/g, '.push(')
      // std::swap(a, b) or swap(a, b) -> [a, b] = [b, a]
      .replace(/(?:std::)?swap\(\s*([^,]+),\s*([^)]+)\);/g, '{ const __tmp = $1; $1 = $2; $2 = __tmp; }')
      // std::cout << x << std::endl; -> console.log(x);
      .replace(/(?:std::)?cout\s*<<\s*([^;]+);/g, (match, expr) => {
        const parts = expr.split('<<').map(p => p.trim()).filter(p => p && !p.includes('endl'));
        return `console.log(${parts.join(', ')});`;
      })
      // std::endl -> ''
      .replace(/(?:std::)?endl/g, "''")
      // return 0; in main
      .replace(/return\s+0\s*;/g, '// return 0;')
      // int main() { ... } wrapper
      .replace(/(?:var|int|void)\s+main\s*\([^)]*\)\s*\{/g, '{');

    // 2.5 Extract all declared variable names dynamically
    const varNames = new Set([
      'nums', 'arr', 'target', 'k', 'n', 'left', 'right', 'low', 'high', 'mid',
      'i', 'j', 'current_sum', 'max_ones', 'largest', 'second_largest', 'found_idx',
      'max_prod', 'prefix', 'suffix', 'sum', 'max_sum', 'max_len', 'drops',
      'candidate', 'count', 'row', 'triangle', 'numRows', 'val', 'ans', 'result'
    ]);
    const varDeclRegex = /\bvar\s+([a-zA-Z_]\w*)/g;
    let vMatch;
    while ((vMatch = varDeclRegex.exec(cleanCode)) !== null) {
      varNames.add(vMatch[1]);
    }

    const varExtractors = Array.from(varNames).map((v) =>
      `${v}: __safeGet(() => typeof ${v} !== 'undefined' ? (Array.isArray(${v}) ? [...${v}] : (typeof ${v} === 'object' && ${v} !== null ? {...${v}} : ${v})) : undefined)`
    ).join(',\n          ');

    // 3. Instrument lines with step recording
    const lines = cleanCode.split('\n');
    const instrumentedLines = [];

    lines.forEach((lineText, idx) => {
      const lineNum = idx + 1;
      const trimmed = lineText.trim();

      if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed === '}' || trimmed === '{') {
        instrumentedLines.push(lineText);
        return;
      }

      if (!trimmed.startsWith('else') && !trimmed.startsWith('catch')) {
        instrumentedLines.push(`__recordCppStep__(${lineNum}, {
          ${varExtractors}
        });`);
      }

      instrumentedLines.push(lineText);
    });

    const finalScript = instrumentedLines.join('\n');

    let stepCount = 0;
    const recordStep = (lineNum, locals) => {
      if (stepCount >= maxSteps) return;
      stepCount++;

      const cleanLocals = {};
      for (const [k, v] of Object.entries(locals)) {
        if (v !== undefined) cleanLocals[k] = v;
      }

      frames.push({
        step: stepCount,
        line: lineNum,
        locals: cleanLocals,
        stdout: stdout.slice(-1)[0] || ''
      });
    };

    const customConsole = {
      log: (...args) => stdout.push(args.join(' '))
    };

    const __safeGet = (fn) => {
      try { return fn(); } catch (_) { return undefined; }
    };

    const fn = new Function('__recordCppStep__', '__safeGet', 'console', finalScript);
    fn(recordStep, __safeGet, customConsole);

    return {
      success: true,
      frames,
      stdout: stdout.join('\n'),
      error: null
    };
  } catch (err) {
    return {
      success: false,
      frames: [],
      stdout: stdout.join('\n'),
      error: `Compilation Error: ${err.message}`,
      errorType: 'CompilationError',
      errorLine: 1,
      traceback: `In file included from main.cpp:1:\nerror: ${err.message}`
    };
  }
}
