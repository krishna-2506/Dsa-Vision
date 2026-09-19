import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, AlertCircle, Check, CheckCheck } from 'lucide-react';

export default function LiveCodeEditor({
  code = '',
  onChange = () => {},
  onRun = null,
  onFormat = null,
  isFormatting = false,
  prettierStatus = 'idle', // 'idle' | 'formatted' | 'error'
  prettierMessage = '',
  activeLine = null,
  errorLine = null,
  errorMessage = null,
  language = 'python',
  readOnly = false,
  className = ''
}) {
  const textareaRef = useRef(null);
  const gutterRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });
  const lines = code.split('\n');

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

  // Handle Tab key, Ctrl+Enter / Cmd+Enter, and Shift+Alt+F (Prettier)
  const handleKeyDown = (e) => {
    // Shift + Alt + F (Windows/Linux) or Shift + Option + F (macOS) -> Prettier Format Document
    if (e.shiftKey && e.altKey && (e.key === 'F' || e.key === 'f')) {
      e.preventDefault();
      if (typeof onFormat === 'function') {
        onFormat();
      }
      return;
    }

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
    setScrollTop(top);
    if (gutterRef.current) {
      gutterRef.current.scrollTop = top;
    }
  };

  // Auto-scroll to activeLine or errorLine if outside view
  useEffect(() => {
    const focusLine = errorLine || activeLine;
    if (!focusLine || !textareaRef.current) return;
    const lineHeight = 20; // 20px per line
    const targetScroll = (focusLine - 3) * lineHeight;
    textareaRef.current.scrollTop = Math.max(0, targetScroll);
    setScrollTop(Math.max(0, targetScroll));
    if (gutterRef.current) {
      gutterRef.current.scrollTop = Math.max(0, targetScroll);
    }
  }, [activeLine, errorLine]);

  return (
    <div className={`relative flex flex-col rounded-lg border border-[var(--line)] bg-[var(--board)] overflow-hidden font-mono text-xs ${className}`}>
      {/* Editor Body: Gutter + Code Surface */}
      <div className="relative flex flex-1 overflow-hidden min-h-[350px]">
        {/* Line Numbers Gutter */}
        <div
          ref={gutterRef}
          className="select-none py-3 px-2 bg-[var(--board-raised)] border-r border-[var(--line)] text-[var(--chalk-dim)] text-right w-12 shrink-0 space-y-0.5 overflow-hidden"
        >
          {lines.map((_, idx) => {
            const lineNum = idx + 1;
            const isActive = activeLine === lineNum;
            const isError = errorLine === lineNum;
            return (
              <div
                key={lineNum}
                className={`h-5 leading-5 transition-colors flex items-center justify-end gap-1 font-mono text-[11px] ${
                  isError
                    ? 'text-rose-400 font-bold bg-rose-500/15 -mx-2 px-2'
                    : isActive
                    ? 'text-indigo-400 font-bold'
                    : 'text-[var(--chalk-faint)]'
                }`}
              >
                {isError && <span className="text-[10px] text-rose-400 font-bold">✖</span>}
                <span>{lineNum}</span>
              </div>
            );
          })}
        </div>

        {/* Code Area & Overlays */}
        <div className="relative flex-1 overflow-hidden">
          {/* Error Line Highlight Overlay */}
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

          {/* Active Line Highlight Banner */}
          {!errorLine && activeLine && activeLine <= lines.length && (
            <div
              className="absolute left-0 right-0 h-5 bg-indigo-500/15 border-l-2 border-indigo-500 pointer-events-none transition-all duration-75 z-0"
              style={{ top: `${12 + (activeLine - 1) * 20 - scrollTop}px` }}
            />
          )}

          {/* Textarea Code Input */}
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
            className="relative z-10 w-full h-full p-3 bg-transparent text-[var(--chalk)] caret-indigo-400 resize-none focus:outline-none leading-5 whitespace-pre font-mono text-[12.5px]"
            style={{ minHeight: '350px' }}
          />
        </div>
      </div>

      {/* ── VS Code Style Prettier Status Bar ── */}
      <div className="px-3 py-1.5 bg-[var(--board-raised)] border-t border-[var(--line)] flex items-center justify-between text-[11px] font-mono select-none">
        {/* Left: Prettier Extension Status Pill */}
        <div className="flex items-center gap-3">
          <button
            onClick={onFormat}
            disabled={isFormatting}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded transition-all cursor-pointer ${
              isFormatting
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                : prettierStatus === 'formatted'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                : prettierStatus === 'error'
                ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                : 'hover:bg-[var(--board-raised-2)] text-[var(--chalk-dim)] hover:text-cyan-300'
            }`}
            title="Format Document with Prettier (Shift + Alt + F)"
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span className="font-semibold">Prettier:</span>
            {isFormatting ? (
              <span className="text-amber-400 animate-pulse">formatting...</span>
            ) : prettierStatus === 'formatted' ? (
              <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                <CheckCheck className="w-3.5 h-3.5" />
                <span>formatted</span>
              </span>
            ) : prettierStatus === 'error' ? (
              <span className="text-rose-400 font-bold">⚠ error</span>
            ) : (
              <span className="text-cyan-400 font-bold flex items-center">
                <CheckCheck className="w-3.5 h-3.5" />
              </span>
            )}
          </button>

          {prettierMessage && (
            <span className={`text-[10px] transition-opacity ${
              prettierStatus === 'error' ? 'text-rose-400' : 'text-emerald-400'
            }`}>
              {prettierMessage}
            </span>
          )}
        </div>

        {/* Right: VS Code Telemetry (Cursor Ln/Col, Spaces, Encoding, Language) */}
        <div className="flex items-center gap-3 text-[var(--chalk-faint)] text-[10.5px]">
          <span>
            Ln <strong className="text-[var(--chalk-dim)]">{cursorPos.line}</strong>, Col <strong className="text-[var(--chalk-dim)]">{cursorPos.col}</strong>
          </span>
          <span className="hidden sm:inline">
            Spaces: <strong className="text-[var(--chalk-dim)]">{language === 'javascript' ? 2 : 4}</strong>
          </span>
          <span className="hidden md:inline">UTF-8</span>
          <span className="px-1.5 py-0.2 rounded bg-[var(--board-raised-2)] text-[var(--chalk-dim)] uppercase text-[9.5px] font-bold">
            {language}
          </span>
        </div>
      </div>
    </div>
  );
}
