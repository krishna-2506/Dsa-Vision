import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, Terminal, Code2 } from 'lucide-react';

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
  const punctuationRegex = /^[{}\[\](),;.]/;
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
          <span key={keyIdx++} className="text-[#eef1ea]">
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
        <span key={keyIdx++} className="text-[#8fa09a]">
          {punctMatch[0]}
        </span>
      );
      remaining = remaining.slice(punctMatch[0].length);
      continue;
    }

    // Fallback single character
    tokens.push(<span key={keyIdx++}>{remaining[0]}</span>);
    remaining = remaining.slice(1);
  }

  return <>{tokens}</>;
}

export default function CodeViewer({ solutions = {}, initialLanguage = 'cpp', activeLine = null }) {
  const availableLangs = Object.keys(solutions);
  const [selectedLang, setSelectedLang] = useState(
    availableLangs.includes(initialLanguage) ? initialLanguage : availableLangs[0] || 'cpp'
  );
  const [copied, setCopied] = useState(false);
  const tableRef = useRef(null);

  const activeCode = solutions[selectedLang] || '// Solution code not available for this language.';

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = activeCode.split('\n');

  // Auto-scroll active line into view smoothly
  useEffect(() => {
    if (activeLine && tableRef.current) {
      const activeRow = tableRef.current.querySelector(`[data-line="${activeLine}"]`);
      if (activeRow) {
        activeRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [activeLine]);

  return (
    <div className="code-col h-full rounded-[3px] border border-[var(--line)] overflow-hidden">
      {/* Code Header Bar */}
      <div className="code-head">
        <div className="flex items-center gap-4">
          {availableLangs.length > 0 ? (
            availableLangs.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`lang-tab ${selectedLang === lang ? 'active' : ''}`}
              >
                {LANGUAGE_LABELS[lang] || lang.toUpperCase()}
              </button>
            ))
          ) : (
            <span className="text-[12px] font-mono text-[var(--chalk-dim)] flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-[var(--amber)]" /> C++
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {activeLine && (
            <span className="text-[11px] font-mono text-[var(--amber)] opacity-90">
              L{activeLine}
            </span>
          )}
          <button
            onClick={handleCopy}
            className="copy-btn"
            title="Copy full solution code"
          >
            {copied ? <Check className="w-3 h-3 text-[var(--easy)]" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'copied' : 'copy'}</span>
          </button>
        </div>
      </div>

      {/* Code Block with Synchronized Chalkboard Line Highlighting */}
      <pre className="code max-h-[540px]" ref={tableRef}>
        {lines.map((line, idx) => {
          const lineNum = idx + 1;
          const isCur = activeLine === lineNum;
          return (
            <div
              key={idx}
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
