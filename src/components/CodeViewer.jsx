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
        <span key={keyIdx++} className="text-slate-500 italic font-mono">
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
        <span key={keyIdx++} className="text-emerald-400 font-mono">
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
        <span key={keyIdx++} className="text-amber-400 font-mono">
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
          <span key={keyIdx++} className="text-purple-400 font-semibold">
            {word}
          </span>
        );
      } else if (TYPES.has(word)) {
        tokens.push(
          <span key={keyIdx++} className="text-cyan-400 font-medium">
            {word}
          </span>
        );
      } else if (isFunction) {
        tokens.push(
          <span key={keyIdx++} className="text-blue-400 font-medium">
            {word}
          </span>
        );
      } else {
        tokens.push(
          <span key={keyIdx++} className="text-slate-200">
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
        <span key={keyIdx++} className="text-pink-400 font-mono">
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
        <span key={keyIdx++} className="text-slate-400 font-mono">
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
    <div className="flex flex-col bg-[#0b0d13] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
      {/* Code Header Bar */}
      <div className="px-4 py-2 bg-[#0e111a] border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-1">
          {availableLangs.length > 0 ? (
            availableLangs.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-2.5 py-1 rounded text-xs font-mono transition ${
                  selectedLang === lang
                    ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                }`}
              >
                {LANGUAGE_LABELS[lang] || lang.toUpperCase()}
              </button>
            ))
          ) : (
            <span className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" /> Solution Code
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {activeLine && (
            <div className="flex items-center gap-1 text-[11px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
              <span>Line {activeLine}</span>
            </div>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono border border-white/10 transition"
            title="Copy full solution code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Code Block with Synchronized Line Highlighting */}
      <div className="p-3 font-mono text-xs overflow-x-auto max-h-[500px] leading-relaxed">
        <table ref={tableRef} className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => {
              const lineNum = idx + 1;
              const isActive = activeLine === lineNum;

              return (
                <tr
                  key={idx}
                  data-line={lineNum}
                  className={`transition-colors duration-150 ${
                    isActive
                      ? 'active-code-line bg-indigo-950/40 text-white font-medium'
                      : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <td className="w-10 pr-3 text-right select-none text-[11px] align-top py-0.5">
                    <span className="flex items-center justify-end gap-1">
                      {isActive && <span className="text-indigo-400 text-[9px]">►</span>}
                      <span className={isActive ? 'text-indigo-400 font-bold' : 'text-slate-600'}>
                        {lineNum}
                      </span>
                    </span>
                  </td>
                  <td className="whitespace-pre font-mono py-0.5">
                    {renderHighlightedLine(line, selectedLang)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
