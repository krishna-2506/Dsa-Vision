import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Check } from 'lucide-react';

/**
 * VS Code Dark+ Syntax Tokenizer for Python, C++, and JavaScript.
 * Accurately colors keywords, strings, numbers, comments, built-ins, and functions.
 */
function renderSyntaxHighlightedLine(line, language) {
  if (!line) return <span>&nbsp;</span>;

  // 1. Comments
  const commentPrefix = language === 'python' ? '#' : '//';
  const commentIdx = line.indexOf(commentPrefix);
  let codePart = line;
  let commentPart = null;

  if (commentIdx !== -1) {
    const before = line.slice(0, commentIdx);
    const doubleQuotes = (before.match(/"/g) || []).length;
    const singleQuotes = (before.match(/'/g) || []).length;
    if (doubleQuotes % 2 === 0 && singleQuotes % 2 === 0) {
      codePart = line.slice(0, commentIdx);
      commentPart = line.slice(commentIdx);
    }
  }

  // 2. Tokenizer Regex
  const tokenRegex = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`[^`]*`|\b\d+(?:\.\d+)?\b|\b[a-zA-Z_]\w*\b|[^\s\w'"`]+|\s+)/g;
  const tokens = [];
  let match;

  const pythonControl = new Set([
    'return', 'for', 'while', 'if', 'elif', 'else', 'try', 'except',
    'finally', 'with', 'pass', 'continue', 'break', 'yield'
  ]);
  const pythonKeywords = new Set([
    'def', 'class', 'import', 'from', 'as', 'in', 'lambda', 'and', 'or', 'not', 'is', 'self'
  ]);
  const cppKeywords = new Set([
    'int', 'void', 'char', 'bool', 'double', 'float', 'long', 'auto', 'vector',
    'string', 'const', 'return', 'for', 'while', 'if', 'else', 'switch', 'case',
    'break', 'continue', 'class', 'struct', 'public', 'private', 'std'
  ]);
  const jsKeywords = new Set([
    'function', 'const', 'let', 'var', 'return', 'for', 'while', 'if', 'else',
    'switch', 'case', 'break', 'continue', 'class', 'import', 'export', 'from',
    'async', 'await', 'new', 'typeof'
  ]);
  const constKeywords = new Set(['True', 'False', 'None', 'true', 'false', 'null', 'undefined', 'nullptr']);
  const builtinFuncs = new Set([
    'print', 'len', 'range', 'append', 'min', 'max', 'sum', 'abs', 'enumerate', 'zip',
    'cout', 'cin', 'push_back', 'console', 'log', 'push', 'pop'
  ]);

  const controlKw = pythonControl;
  const activeKw = language === 'cpp' ? cppKeywords : language === 'javascript' ? jsKeywords : pythonKeywords;

  let keyCounter = 0;
  while ((match = tokenRegex.exec(codePart)) !== null) {
    const t = match[0];
    keyCounter++;
    if (t.startsWith('"') || t.startsWith("'") || t.startsWith('`')) {
      tokens.push(<span key={keyCounter} className="text-[#ce9178]">{t}</span>);
    } else if (constKeywords.has(t)) {
      tokens.push(<span key={keyCounter} className="text-[#569cd6] font-semibold">{t}</span>);
    } else if (controlKw.has(t)) {
      tokens.push(<span key={keyCounter} className="text-[#c586c0] font-semibold">{t}</span>);
    } else if (activeKw.has(t)) {
      tokens.push(<span key={keyCounter} className="text-[#569cd6] font-semibold">{t}</span>);
    } else if (builtinFuncs.has(t)) {
      tokens.push(<span key={keyCounter} className="text-[#dcdcaa]">{t}</span>);
    } else if (/^\d+(\.\d+)?$/.test(t)) {
      tokens.push(<span key={keyCounter} className="text-[#b5cea8]">{t}</span>);
    } else {
      tokens.push(<span key={keyCounter} className="text-[#d4d4d4]">{t}</span>);
    }
  }

  return (
    <>
      {tokens}
      {commentPart && <span className="text-[#6a9955] italic">{commentPart}</span>}
    </>
  );
}

export default function LiveCodeEditor({
  code = '',
  onChange = () => {},
  onRun = null,
  activeLine = null,
  errorLine = null,
  errorMessage = null,
  language = 'python',
  readOnly = false,
  className = ''
}) {
  const textareaRef = useRef(null);
  const gutterRef = useRef(null);
  const highlightOverlayRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });
  const lines = useMemo(() => code.split('\n'), [code]);

  // Track cursor Ln & Col
  const updateCursorPos = () => {
    if (!textareaRef.current) return;
    const selStart = textareaRef.current.selectionStart;
    const textBefore = code.slice(0, selStart);
    const lineList = textBefore.split('\n');
    setCursorPos({
      line: lineList.length,
      col: lineList[lineList.length - 1].length + 1
    });
  };

  // Keyboard shortcut Ctrl+Enter to run
  const handleKeyDown = (e) => {
    // Ctrl + Enter or Cmd + Enter -> Compile & Run
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (typeof onRun === 'function') {
        onRun();
      }
      return;
    }

    // Tab key indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const spaces = language === 'javascript' ? '  ' : '    ';

      const updated = code.substring(0, start) + spaces + code.substring(end);
      onChange(updated);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + spaces.length;
        updateCursorPos();
      }, 0);
    }
  };

  const handleScroll = (e) => {
    const top = e.target.scrollTop;
    const left = e.target.scrollLeft;
    setScrollTop(top);
    if (gutterRef.current) {
      gutterRef.current.scrollTop = top;
    }
    if (highlightOverlayRef.current) {
      highlightOverlayRef.current.scrollTop = top;
      highlightOverlayRef.current.scrollLeft = left;
    }
  };

  // Auto-scroll to activeLine or errorLine
  useEffect(() => {
    const focusLine = errorLine || activeLine;
    if (!focusLine || !textareaRef.current) return;
    const lineHeight = 20;
    const targetScroll = (focusLine - 3) * lineHeight;
    textareaRef.current.scrollTop = Math.max(0, targetScroll);
    setScrollTop(Math.max(0, targetScroll));
    if (gutterRef.current) {
      gutterRef.current.scrollTop = Math.max(0, targetScroll);
    }
    if (highlightOverlayRef.current) {
      highlightOverlayRef.current.scrollTop = Math.max(0, targetScroll);
    }
  }, [activeLine, errorLine]);

  return (
    <div className={`relative flex flex-col rounded-xl border border-[var(--border-subtle)] bg-[#0d0c0a] overflow-hidden font-mono text-xs ${className}`}>
      {/* Editor Body: Gutter + Syntax Highlighted Surface */}
      <div className="relative flex flex-1 overflow-hidden min-h-[350px]">
        {/* Line Numbers Gutter */}
        <div
          ref={gutterRef}
          className="select-none py-3 px-2 bg-[#090807] border-r border-[var(--border-subtle)] text-[var(--text-tertiary)] text-right w-11 shrink-0 space-y-0.5 overflow-hidden font-mono text-[11px]"
        >
          {lines.map((_, idx) => {
            const lineNum = idx + 1;
            const isActive = activeLine === lineNum;
            const isError = errorLine === lineNum;
            return (
              <div
                key={lineNum}
                className={`h-5 leading-5 transition-colors flex items-center justify-end gap-1 ${
                  isError
                    ? 'text-rose-400 font-bold bg-rose-500/15 -mx-2 px-2'
                    : isActive
                    ? 'text-[var(--accent)] font-bold'
                    : 'text-[var(--text-tertiary)]'
                }`}
              >
                {isError && <span className="text-[10px] text-rose-400 font-bold">✖</span>}
                <span>{lineNum}</span>
              </div>
            );
          })}
        </div>

        {/* Code Area: Syntax Overlay + Interactive Textarea */}
        <div className="relative flex-1 overflow-hidden">
          {/* Error Line Highlight */}
          {errorLine && errorLine <= lines.length && (
            <div
              className="absolute left-0 right-0 h-5 bg-rose-500/20 border-l-2 border-rose-500 pointer-events-none transition-all duration-75 z-0 flex items-center justify-between px-3"
              style={{ top: `${12 + (errorLine - 1) * 20 - scrollTop}px` }}
            >
              <span />
              {errorMessage && (
                <span className="text-[10px] font-mono font-semibold text-rose-300 bg-rose-950/90 px-2 py-0.5 rounded border border-rose-500/40 shadow-md">
                  {errorMessage}
                </span>
              )}
            </div>
          )}

          {/* Active Line Highlight */}
          {!errorLine && activeLine && activeLine <= lines.length && (
            <div
              className="absolute left-0 right-0 h-5 bg-[rgba(212,160,60,0.12)] border-l-2 border-[var(--accent)] pointer-events-none transition-all duration-75 z-0"
              style={{ top: `${12 + (activeLine - 1) * 20 - scrollTop}px` }}
            />
          )}

          {/* ── VS Code Syntax Highlighted Layer (Rendered below textarea) ── */}
          <div
            ref={highlightOverlayRef}
            aria-hidden="true"
            className="absolute inset-0 p-3 pointer-events-none font-mono text-[12.5px] leading-5 whitespace-pre select-none overflow-hidden z-0"
          >
            {lines.map((line, idx) => (
              <div key={idx} className="h-5 leading-5">
                {renderSyntaxHighlightedLine(line, language)}
              </div>
            ))}
          </div>

          {/* ── Transparent Interactive Textarea (Top Layer) ── */}
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => {
              onChange(e.target.value);
              updateCursorPos();
            }}
            onKeyDown={handleKeyDown}
            onKeyUp={updateCursorPos}
            onClick={updateCursorPos}
            onSelect={updateCursorPos}
            onScroll={handleScroll}
            readOnly={readOnly}
            spellCheck={false}
            className="relative z-10 w-full h-full p-3 bg-transparent text-transparent caret-[var(--accent)] resize-none focus:outline-none leading-5 whitespace-pre font-mono text-[12.5px] selection:bg-[rgba(212,160,60,0.28)] selection:text-transparent"
            style={{ minHeight: '350px' }}
          />
        </div>
      </div>

      {/* ── Clean, Grounded Status Bar ── */}
      <div className="px-3.5 py-1.5 bg-[#090807] border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono select-none text-[var(--text-tertiary)]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3d9e5c]" />
          <span className="text-[var(--text-muted)]">Prettier Formatted</span>
        </div>

        <div className="flex items-center gap-3 text-[10.5px]">
          <span>
            Ln <strong className="text-[var(--text-body)]">{cursorPos.line}</strong>, Col <strong className="text-[var(--text-body)]">{cursorPos.col}</strong>
          </span>
          <span className="hidden sm:inline">
            Spaces: <strong className="text-[var(--text-body)]">{language === 'javascript' ? 2 : 4}</strong>
          </span>
          <span className="hidden md:inline">UTF-8</span>
          <span className="px-1.5 py-0.2 rounded bg-[var(--bg-surface)] text-[var(--accent)] uppercase text-[9.5px] font-semibold border border-[var(--border-subtle)]">
            {language}
          </span>
        </div>
      </div>
    </div>
  );
}
