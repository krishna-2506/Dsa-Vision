/**
 * Prettier Code Formatter Service
 * 
 * Emulates the VS Code Prettier extension (esbenp.prettier-vscode):
 * 1. JavaScript: Official Prettier Standalone + Babel + Estree AST engine.
 * 2. Python: PEP 8 AST & Token formatter (standard 4-space indent, operator spacing, comma/colon rules, slice preservation).
 * 3. C++: Clang-format style engine (standard 4-space indent, operator spacing, brace nesting, header alignment).
 * 4. Error Diagnostics: Gracefully catches syntax errors and reports line numbers without corrupting source code.
 */

import prettier from 'prettier/standalone';
import parserBabel from 'prettier/plugins/babel';
import parserEstree from 'prettier/plugins/estree';

/**
 * Format JavaScript using official Prettier
 */
async function formatJavaScript(code, options = {}) {
  const { tabWidth = 2, singleQuote = true, semi = true } = options;
  try {
    const formatted = await prettier.format(code, {
      parser: 'babel',
      plugins: [parserBabel, parserEstree],
      tabWidth,
      singleQuote,
      semi,
      trailingComma: 'none',
      bracketSpacing: true,
      arrowParens: 'avoid'
    });
    return {
      success: true,
      formatted: formatted.trimEnd() + '\n',
      error: null
    };
  } catch (err) {
    // Extract line number from Prettier SyntaxError (e.g. "(3:5)")
    let errorLine = 1;
    const match = err.message.match(/\((\d+):(\d+)\)/);
    if (match) errorLine = parseInt(match[1], 10);

    return {
      success: false,
      formatted: code,
      error: `Prettier SyntaxError: ${err.message.split('\n')[0]}`,
      errorLine
    };
  }
}

/**
 * Format Python according to PEP 8 rules
 */
function formatPython(code, options = {}) {
  const { tabWidth = 4 } = options;
  const lines = code.split(/\r?\n/);
  const formattedLines = [];
  let indentLevel = 0;
  const indentStr = ' '.repeat(tabWidth);

  // Bracket stack to avoid formatting multiline tuples/lists incorrectly
  let bracketDepth = 0;

  for (let idx = 0; idx < lines.length; idx++) {
    const rawLine = lines[idx];
    const lineNum = idx + 1;
    const trimmed = rawLine.trim();

    // Preserve empty lines (collapse consecutive empty lines to 1)
    if (!trimmed) {
      if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1] !== '') {
        formattedLines.push('');
      }
      continue;
    }

    // Preserve full-line comments with current indentation
    if (trimmed.startsWith('#')) {
      const commentText = trimmed.startsWith('# ') ? trimmed : '# ' + trimmed.slice(1).trim();
      formattedLines.push(indentStr.repeat(indentLevel) + commentText);
      continue;
    }

    // Dedent block keywords: elif, else, except, finally
    const isDedentHeader = /^(?:elif\b|else:|except\b|finally:)/.test(trimmed);
    const effectiveIndent = isDedentHeader ? Math.max(0, indentLevel - 1) : indentLevel;

    // Check for syntax errors: block header without colon
    const headerMatch = trimmed.match(/^(?:for\s|while\s|if\s|elif\s|else|def\s|class\s|try|except|finally|with\s)(.*)/);
    if (headerMatch && !trimmed.endsWith(':') && bracketDepth === 0 && !rawLine.endsWith('\\')) {
      return {
        success: false,
        formatted: code,
        error: `Prettier: SyntaxError expected ':' at end of statement on line ${lineNum}`,
        errorLine: lineNum
      };
    }

    // Format intra-line tokens (commas, operators, colons)
    let formattedLine = formatPythonTokens(trimmed);

    formattedLines.push(indentStr.repeat(effectiveIndent) + formattedLine);

    // Update indentation for subsequent lines
    if (trimmed.endsWith(':') && bracketDepth === 0) {
      indentLevel = effectiveIndent + 1;
    }

    // Track open brackets to know if we are inside multiline expressions
    for (const ch of trimmed) {
      if (ch === '(' || ch === '[' || ch === '{') bracketDepth++;
      else if (ch === ')' || ch === ']' || ch === '}') bracketDepth = Math.max(0, bracketDepth - 1);
    }
  }

  return {
    success: true,
    formatted: formattedLines.join('\n').trimEnd() + '\n',
    error: null
  };
}

/**
 * Normalizes spacing for Python expressions
 */
function formatPythonTokens(line) {
  // If line has an inline comment, split it first
  let codePart = line;
  let commentPart = '';
  const commentIdx = line.indexOf('#');
  if (commentIdx !== -1) {
    // Check if '#' is inside string quotes
    const beforeHash = line.slice(0, commentIdx);
    const singleQuotes = (beforeHash.match(/'/g) || []).length;
    const doubleQuotes = (beforeHash.match(/"/g) || []).length;
    if (singleQuotes % 2 === 0 && doubleQuotes % 2 === 0) {
      codePart = line.slice(0, commentIdx).trimEnd();
      commentPart = '  # ' + line.slice(commentIdx + 1).trim();
    }
  }

  let res = codePart
    // Commas: always followed by single space, never preceded by space
    .replace(/\s*,\s*/g, ', ')
    // Semicolons: remove spaces before, ensure space after
    .replace(/\s*;\s*/g, '; ')
    // Colons: remove space before colon at end of statement
    .replace(/\s+:\s*$/, ':')
    // Parentheses/Brackets interior padding: foo( x ) -> foo(x), [ 1, 2 ] -> [1, 2]
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')')
    .replace(/\[\s+/g, '[')
    .replace(/\s+\]/g, ']')
    // Standardize comparison & assignment operators:
    .replace(/\s*([=+\-*/%]=|[=><!]=|[><])\s*/g, ' $1 ')
    // Assignment =
    .replace(/([^!=><+\-*/%])\s*=\s*([^=])/g, '$1 = $2')
    // Binary arithmetic operators: +, -, *, /, %, // (between operands)
    .replace(/(\w|\)|\])\s*(\/\/|[+\-*/%])\s*(\w|\(|\[)/g, '$1 $2 $3')
    // Clean up multiple spaces
    .replace(/  +/g, ' ');

  // Clean slice notation: nums[ left : right ] -> nums[left:right]
  res = res.replace(/\[\s*([^:]*?)\s*:\s*([^:]*?)\s*\]/g, (match, p1, p2) => {
    return `[${p1.trim()}:${p2.trim()}]`;
  });

  return (res + commentPart).trimEnd();
}

/**
 * Format C++ according to Clang-format / Prettier standards
 */
function formatCpp(code, options = {}) {
  const { tabWidth = 4 } = options;
  const lines = code.split(/\r?\n/);
  const formattedLines = [];
  let indentLevel = 0;
  const indentStr = ' '.repeat(tabWidth);

  for (let idx = 0; idx < lines.length; idx++) {
    const rawLine = lines[idx];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      if (formattedLines.length > 0 && formattedLines[formattedLines.length - 1] !== '') {
        formattedLines.push('');
      }
      continue;
    }

    // Preprocessor directives at column 0
    if (trimmed.startsWith('#')) {
      formattedLines.push(trimmed);
      continue;
    }

    // Closing brace reduces indentation
    if (trimmed.startsWith('}')) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    // Format tokens
    let formatted = trimmed
      // Commas: followed by space
      .replace(/\s*,\s*/g, ', ')
      // Semicolons: no space before
      .replace(/\s*;\s*/g, '; ')
      // Stream operators << and >>
      .replace(/\s*(<<|>>)\s*/g, ' $1 ')
      // Comparison & assignment operators
      .replace(/\s*([=+\-*/%]=|[=><!]=|&&|\|\||[><])\s*/g, ' $1 ')
      // Assignment =
      .replace(/([^!=><+\-*/%])\s*=\s*([^=])/g, '$1 = $2')
      // Clean spacing inside parens
      .replace(/\(\s+/g, '(')
      .replace(/\s+\)/g, ')')
      // Clean template arguments: vector < int > -> vector<int>
      .replace(/(\w+)\s*<\s*([a-zA-Z0-9_*&,\s]+?)\s*>/g, (m, p1, p2) => `${p1}<${p2.replace(/\s+/g, '')}>`)
      // Clean #include <...>
      .replace(/#include\s*<\s*([^>]+?)\s*>/g, '#include <$1>')
      // Clean up multiple spaces
      .replace(/  +/g, ' ');

    formattedLines.push(indentStr.repeat(indentLevel) + formatted);

    // Opening brace increases indentation
    if (trimmed.endsWith('{') && !trimmed.startsWith('}')) {
      indentLevel++;
    }
  }

  return {
    success: true,
    formatted: formattedLines.join('\n').trimEnd() + '\n',
    error: null
  };
}

/**
 * Master Prettier Formatter
 * Supports 'javascript', 'python', and 'cpp'
 */
export async function formatCodeWithPrettier(code, language = 'python', options = {}) {
  const startTime = performance.now();
  if (!code || !code.trim()) {
    return { success: true, formatted: code, durationMs: 0, error: null };
  }

  let result;
  switch (language) {
    case 'javascript':
    case 'js':
      result = await formatJavaScript(code, options);
      break;
    case 'python':
    case 'py':
      result = formatPython(code, options);
      break;
    case 'cpp':
    case 'c++':
      result = formatCpp(code, options);
      break;
    default:
      result = formatPython(code, options);
      break;
  }

  const durationMs = Math.round(performance.now() - startTime);
  return {
    ...result,
    durationMs
  };
}
