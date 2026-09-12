import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Copy, Check, Code2, ExternalLink } from 'lucide-react';

const LANGUAGE_LABELS = {
  cpp: 'C++',
  python: 'Python 3',
  java: 'Java',
  javascript: 'JavaScript',
  typescript: 'TypeScript'
};

const KEYWORDS = new Set([
  'class', 'public', 'private', 'protected', 'static', 'virtual', 'override',
  'const', 'constexpr', 'let', 'var', 'function', 'def', 'return', 'if', 'else',
  'elif', 'while', 'for', 'do', 'switch', 'case', 'default', 'break', 'continue',
  'new', 'delete', 'try', 'catch', 'throw', 'throws', 'finally', 'import', 'export',
  'from', 'as', 'in', 'of', 'and', 'or', 'not', 'is', 'pass', 'yield', 'async',
  'await', 'struct', 'enum', 'typedef', 'typename', 'using', 'namespace', 'auto',
  'sizeof', 'nullptr', 'null', 'nil', 'true', 'false', 'None', 'True', 'False',
  'this', 'self', 'super', 'extends', 'implements', 'interface', 'package'
]);

const TYPES = new Set([
  'int', 'long', 'double', 'float', 'char', 'bool', 'boolean', 'void', 'size_t',
  'vector', 'string', 'String', 'list', 'dict', 'set', 'tuple', 'map',
  'unordered_map', 'unordered_set', 'multiset', 'multimap', 'pair', 'stack', 'queue',
  'deque', 'priority_queue', 'ListNode', 'TreeNode', 'Node', 'Array', 'Object',
  'Number', 'Boolean', 'Integer', 'Long', 'Double', 'Character', 'Math', 'Solution'
]);

function renderHighlightedLine(line, lang = 'cpp') {
  if (!line) return <span>&nbsp;</span>;

  const tokens = [];
  let remaining = line;
  let keyIdx = 0;

  const commentRegex = lang === 'python' ? /(#.*)$/ : /(\/\/.*|\/\*.*\*\/|\/\*.*|\*\/|\*.*)$/;
  const stringRegex = /^("([^"\\]|\\.)*"|'([^'\\]|\\.)*'|`([^`\\]|\\.)*`)/;
  const numberRegex = /^(0x[0-9a-fA-F]+|\d+(\.\d+)?)/;
  const wordRegex = /^[a-zA-Z_]\w*/;
  const operatorRegex = /^(->|::|=>|===|!==|==|!=|<=|>=|\+\+|--|\+=|-=|\*=|\/=|&&|\|\||[+\-*/%!=<>&|^~?:])/;
  const punctuationRegex = /^[{}[\](),;.]/;
  const whitespaceRegex = /^\s+/;

  while (remaining.length > 0) {
    // Check for comment
    const commentMatch = remaining.match(commentRegex);
    if (commentMatch && remaining.startsWith(commentMatch[0])) {
      tokens.push(
        <span key={keyIdx++} className="cm">
          {commentMatch[0]}
        </span>
      );
      break;
    }

    // Check for whitespace
    const wsMatch = remaining.match(whitespaceRegex);
    if (wsMatch) {
      tokens.push(<span key={keyIdx++}>{wsMatch[0]}</span>);
      remaining = remaining.slice(wsMatch[0].length);
      continue;
    }

    // Check for strings
    const strMatch = remaining.match(stringRegex);
    if (strMatch) {
      tokens.push(
        <span key={keyIdx++} className="str">
          {strMatch[0]}
        </span>
      );
      remaining = remaining.slice(strMatch[0].length);
      continue;
    }

    // Check for numbers
    const numMatch = remaining.match(numberRegex);
    if (numMatch) {
      tokens.push(
        <span key={keyIdx++} className="num-tok">
          {numMatch[0]}
        </span>
      );
      remaining = remaining.slice(numMatch[0].length);
      continue;
    }

    // Check for words (identifiers, keywords, types, functions)
    const wordMatch = remaining.match(wordRegex);
    if (wordMatch) {
      const word = wordMatch[0];
      const afterWord = remaining.slice(word.length);
      const isFunction = /^\s*\(/.test(afterWord);

      if (KEYWORDS.has(word)) {
        tokens.push(
          <span key={keyIdx++} className="kw">
            {word}
          </span>
        );
      } else if (TYPES.has(word)) {
        tokens.push(
          <span key={keyIdx++} className="tp">
            {word}
          </span>
        );
      } else if (isFunction) {
        tokens.push(
          <span key={keyIdx++} className="fn">
            {word}
          </span>
        );
      } else {
        tokens.push(
          <span key={keyIdx++} className="text-[var(--chalk)]">
            {word}
          </span>
        );
      }
      remaining = afterWord;
      continue;
    }

    // Check for operators
    const opMatch = remaining.match(operatorRegex);
    if (opMatch) {
      tokens.push(
        <span key={keyIdx++} className="op">
          {opMatch[0]}
        </span>
      );
      remaining = remaining.slice(opMatch[0].length);
      continue;
    }

    // Check for punctuation
    const punctMatch = remaining.match(punctuationRegex);
    if (punctMatch) {
      tokens.push(
        <span key={keyIdx++} className="text-[var(--chalk-dim)]">
          {punctMatch[0]}
        </span>
      );
      remaining = remaining.slice(punctMatch[0].length);
      continue;
    }

    // Fallback single character
    tokens.push(<span key={keyIdx++} className="text-[var(--chalk)]">{remaining[0]}</span>);
    remaining = remaining.slice(1);
  }

  return <>{tokens}</>;
}

function isLineActive(activeLine, lineNum) {
  if (!activeLine) return false;
  if (typeof activeLine === 'number') return activeLine === lineNum;
  if (Array.isArray(activeLine)) return activeLine.includes(lineNum);
  if (typeof activeLine === 'string') {
    if (activeLine.includes('-')) {
      const [s, e] = activeLine.split('-').map((n) => parseInt(n.trim(), 10));
      if (!isNaN(s) && !isNaN(e)) return lineNum >= s && lineNum <= e;
    }
    if (activeLine.includes(',')) {
      const nums = activeLine.split(',').map((n) => parseInt(n.trim(), 10));
      return nums.includes(lineNum);
    }
    const single = parseInt(activeLine, 10);
    return single === lineNum;
  }
  if (typeof activeLine === 'object' && activeLine.start && activeLine.end) {
    return lineNum >= activeLine.start && lineNum <= activeLine.end;
  }
  return false;
}

function formatActiveLines(activeLine) {
  if (!activeLine) return null;
  if (typeof activeLine === 'number') return `L${activeLine}`;
  if (Array.isArray(activeLine)) {
    if (activeLine.length === 0) return null;
    if (activeLine.length === 1) return `L${activeLine[0]}`;
    const sorted = [...activeLine].sort((a, b) => a - b);
    const isSeq = sorted.every((val, idx) => idx === 0 || val === sorted[idx - 1] + 1);
    if (isSeq) return `L${sorted[0]}-${sorted[sorted.length - 1]}`;
    return `L${sorted.join(', ')}`;
  }
  if (typeof activeLine === 'string') return `L${activeLine}`;
  if (typeof activeLine === 'object' && activeLine.start && activeLine.end) {
    return `L${activeLine.start}-${activeLine.end}`;
  }
  return null;
}

export default function CodeViewer({
  solutions = {},
  initialLanguage = 'cpp',
  activeLine = null,
  leetcodeUrl = null
}) {
  const availableLangs = useMemo(() => Object.keys(solutions), [solutions]);
  const [selectedLang, setSelectedLang] = useState(
    availableLangs.includes(initialLanguage) ? initialLanguage : availableLangs[0] || 'cpp'
  );
  const [copied, setCopied] = useState(false);
  const tableRef = useRef(null);

  const currentLang = availableLangs.includes(selectedLang)
    ? selectedLang
    : availableLangs.includes('cpp')
    ? 'cpp'
    : availableLangs[0] || 'cpp';

  const activeCode = solutions[currentLang] || '// Solution code not available for this language.';

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = activeCode.split('\n');
  const formattedLineBadge = formatActiveLines(activeLine);

  // Auto-scroll active line into view smoothly
  useEffect(() => {
    if (activeLine && tableRef.current) {
      const activeRows = tableRef.current.querySelectorAll('.ln.current');
      if (activeRows && activeRows.length > 0) {
        activeRows[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [activeLine]);

  return (
    <div className="code-col h-full rounded-xl border border-[var(--line)] overflow-hidden bg-[var(--code-bg)] flex flex-col shadow-sm">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-[var(--line)] bg-[var(--board-raised-2)]">
        {/* Language Tabs */}
        <div className="flex items-center gap-1.5">
          {availableLangs.length > 0 ? (
            availableLangs.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium transition-all cursor-pointer ${
                  currentLang === lang
                    ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 border border-indigo-500/30 font-semibold'
                    : 'text-[var(--chalk-dim)] hover:text-[var(--chalk)] hover:bg-[var(--board-hover)]'
                }`}
              >
                {LANGUAGE_LABELS[lang] || lang.toUpperCase()}
              </button>
            ))
          ) : (
            <span className="text-xs font-mono text-[var(--chalk-dim)] flex items-center gap-1.5 px-2 py-0.5 rounded bg-[var(--board-raised)] border border-[var(--line)]">
              <Code2 className="w-3.5 h-3.5 text-indigo-500" /> C++
            </span>
          )}
        </div>

        {/* Right Info & Actions */}
        <div className="flex items-center gap-2">
          {formattedLineBadge && (
            <span className="text-[11px] font-mono font-semibold text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/25">
              Line {formattedLineBadge}
            </span>
          )}

          {leetcodeUrl && (
            <a
              href={leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-mono text-[var(--chalk-dim)] hover:text-[var(--chalk)] hover:bg-[var(--board-hover)] transition-all"
              title="Open problem on LeetCode"
            >
              <ExternalLink className="w-3 h-3 text-indigo-500" />
              <span className="hidden sm:inline">LeetCode</span>
            </a>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono text-[var(--chalk-dim)] hover:text-[var(--chalk)] hover:bg-[var(--board-hover)] border border-[var(--line)] transition-all cursor-pointer"
            title="Copy full solution code"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Block with Synchronized Line Highlighting */}
      <pre className="code max-h-[560px] flex-1 overflow-y-auto" ref={tableRef}>
        {lines.map((line, idx) => {
          const lineNum = idx + 1;
          const isCur = isLineActive(activeLine, lineNum);
          return (
            <div
              key={isCur ? `${lineNum}-${String(activeLine)}` : lineNum}
              data-line={lineNum}
              className={`ln${isCur ? ' current' : ''}`}
            >
              <span className="num">{lineNum}</span>
              <span className="src">{renderHighlightedLine(line, selectedLang)}</span>
            </div>
          );
        })}
      </pre>
    </div>
  );
}
