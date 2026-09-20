import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  FileCode,
  ChevronLeft,
  ChevronRight,
  Repeat,
  Zap,
  BookOpen,
  Copy,
  Check
} from 'lucide-react';
import LiveCodeEditor from './LiveCodeEditor';
import ArrayView from '../primitives/ArrayView';
import VariableInspector from '../primitives/VariableInspector';
import { sandboxCoordinator } from '../../services/sandbox/SandboxCoordinator';
import {
  getTemplateForQuestion,
  getRunnableCodeForQuestion
} from '../../services/sandbox/AlgorithmTemplates';
import { formatCodeWithPrettier } from '../../services/sandbox/PrettierService';
import { sound } from '../../services/audio';

const LANGUAGES = [
  { id: 'python', label: 'Python 3', ext: '.py', badge: 'WASM CPython 3.12' },
  { id: 'cpp', label: 'C++', ext: '.cpp', badge: 'AST Engine' },
  { id: 'javascript', label: 'JavaScript', ext: '.js', badge: 'Client V8' }
];

/**
 * Robustly injects test parameter values into Python, C++, and JavaScript source code.
 * Handles arrays, numbers (including negative numbers), strings, and multiple variable names.
 */
function injectInputsIntoCode(sourceCode, lang, inputValues) {
  let updated = sourceCode;
  for (const [key, rawVal] of Object.entries(inputValues)) {
    if (rawVal === undefined || rawVal === null || rawVal === '') continue;
    let cleanVal = rawVal;
    if (typeof rawVal === 'string') {
      const trimmed = rawVal.trim();
      if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
        try {
          cleanVal = JSON.parse(trimmed);
        } catch (_) {
          cleanVal = trimmed;
        }
      } else {
        cleanVal = trimmed;
      }
    }

    if (lang === 'python') {
      if (Array.isArray(cleanVal)) {
        const arrRegex = new RegExp(`\\b${key}\\s*=\\s*\\[[^\\]]*\\]`);
        if (arrRegex.test(updated)) {
          updated = updated.replace(arrRegex, `${key} = ${JSON.stringify(cleanVal)}`);
        }
      } else {
        const numRegex = new RegExp(`\\b${key}\\s*=\\s*[-+]?\\d+`);
        if (numRegex.test(updated)) {
          updated = updated.replace(numRegex, `${key} = ${cleanVal}`);
        }
      }
    } else if (lang === 'cpp') {
      if (Array.isArray(cleanVal)) {
        const cppVecStr = `{${cleanVal.join(', ')}}`;
        const vecRegex = new RegExp(`((?:(?:std::)?vector<int>|auto)\\s+${key}\\s*=\\s*)\\{[^}]*\\}`);
        if (vecRegex.test(updated)) {
          updated = updated.replace(vecRegex, `$1${cppVecStr}`);
        }
      } else {
        const numRegex = new RegExp(`(int\\s+${key}\\s*=\\s*)[-+]?\\d+`);
        if (numRegex.test(updated)) {
          updated = updated.replace(numRegex, `$1${cleanVal}`);
        }
      }
    } else {
      // JavaScript
      if (Array.isArray(cleanVal)) {
        const arrRegex = new RegExp(`((?:const|let|var)\\s+${key}\\s*=\\s*)\\[[^\\]]*\\]`);
        if (arrRegex.test(updated)) {
          updated = updated.replace(arrRegex, `$1${JSON.stringify(cleanVal)}`);
        }
      } else {
        const numRegex = new RegExp(`((?:const|let|var)\\s+${key}\\s*=\\s*)[-+]?\\d+`);
        if (numRegex.test(updated)) {
          updated = updated.replace(numRegex, `$1${cleanVal}`);
        }
      }
    }
  }
  return updated;
}

export default function BetaCodeVisualizer({
  question = null,
  solutions = null,
  initialLanguage = 'python',
  className = ''
}) {
  const matchedTemplate = useMemo(() => {
    return getTemplateForQuestion(question, solutions || question?.solutions);
  }, [question, solutions]);

  const [selectedLang, setSelectedLang] = useState(initialLanguage);
  const [code, setCode] = useState('');
  
  // Test Bench State
  const [activeCaseIdx, setActiveCaseIdx] = useState(0); // 0, 1, 2, ... or 'custom'
  const [paramValues, setParamValues] = useState({});

  // Execution & Visualization State
  const [isExecuting, setIsExecuting] = useState(false);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [loop, setLoop] = useState(false);
  const [stdout, setStdout] = useState('');
  
  // Detailed Compiler Diagnostics State
  const [error, setError] = useState(null);
  const [errorType, setErrorType] = useState(null);
  const [errorLine, setErrorLine] = useState(null);
  const [traceback, setTraceback] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [activeConsoleTab, setActiveConsoleTab] = useState('output'); // 'output' | 'diagnostics' | 'libraries'
  const [copiedTraceback, setCopiedTraceback] = useState(false);

  // VS Code Prettier Extension Emulation State
  const [isFormatting, setIsFormatting] = useState(false);
  const [prettierStatus, setPrettierStatus] = useState('idle'); // 'idle' | 'formatted' | 'error'
  const [prettierMessage, setPrettierMessage] = useState('');
  const [formatOnRun, setFormatOnRun] = useState(true);

  // Format Code via Prettier Engine (Shift + Alt + F)
  const handleFormatCode = useCallback(async (codeToFormat = null) => {
    const targetSource = codeToFormat ?? code;
    if (!targetSource || !targetSource.trim()) return targetSource;
    setIsFormatting(true);
    setPrettierStatus('formatting');

    try {
      const res = await formatCodeWithPrettier(targetSource, selectedLang, {
        tabWidth: selectedLang === 'javascript' ? 2 : 4
      });

      if (res.success) {
        setCode(res.formatted);
        setPrettierStatus('formatted');
        setPrettierMessage(`Formatted in ${res.durationMs}ms`);
        sound?.playStep?.(680);
        setTimeout(() => {
          setPrettierStatus('idle');
          setPrettierMessage('');
        }, 3000);
        return res.formatted;
      } else {
        setPrettierStatus('error');
        setPrettierMessage(res.error);
        setError(res.error);
        setErrorType('SyntaxError');
        setErrorLine(res.errorLine || 1);
        setActiveConsoleTab('diagnostics');
        sound?.play?.('error');
        return targetSource;
      }
    } catch (err) {
      setPrettierStatus('error');
      setPrettierMessage(err.message);
      return targetSource;
    } finally {
      setIsFormatting(false);
    }
  }, [code, selectedLang]);

  // Execute Code through Sandbox Coordinator
  const executeCode = useCallback(async (sourceCode, language) => {
    setIsExecuting(true);
    setError(null);
    setErrorType(null);
    setErrorLine(null);
    setTraceback(null);
    setIsPlaying(false);
    const startTime = performance.now();

    let runnableSource = sourceCode;

    // Optional Format on Run (like VS Code Format on Save)
    if (formatOnRun) {
      try {
        const formatRes = await formatCodeWithPrettier(sourceCode, language, {
          tabWidth: language === 'javascript' ? 2 : 4
        });
        if (formatRes.success) {
          runnableSource = formatRes.formatted;
          setCode(formatRes.formatted);
          setPrettierStatus('formatted');
          setPrettierMessage(`Formatted in ${formatRes.durationMs}ms`);
          setTimeout(() => {
            setPrettierStatus('idle');
            setPrettierMessage('');
          }, 2500);
        }
      } catch (_) {
        // Continue with original source if formatting check encounters syntax issue
      }
    }

    try {
      const res = await sandboxCoordinator.executeAndTrace(language, runnableSource);
      const durationMs = Math.round(performance.now() - startTime);

      if (!res.success && res.error) {
        setError(res.error);
        setErrorType(res.errorType || 'Error');
        setErrorLine(res.errorLine || 1);
        setTraceback(res.traceback || res.error);
        setSteps([]);
        setStdout(res.stdout || '');
        setMetrics(null);
        setActiveConsoleTab('diagnostics');
        sound?.play?.('error');
      } else {
        setSteps(res.steps);
        setCurrentStep(0);
        setStdout(res.stdout || '');
        setError(null);
        setErrorType(null);
        setErrorLine(null);
        setTraceback(null);
        setMetrics({
          stepsCount: res.steps.length,
          frameCount: res.frameCount,
          durationMs
        });
        setActiveConsoleTab((prev) => (prev === 'diagnostics' ? 'output' : prev));
        sound?.play?.('success');
      }
    } catch (err) {
      setError(err.message || 'Execution error');
      setErrorType('ExecutionError');
      setErrorLine(1);
      setTraceback(err.stack || err.message);
      setSteps([]);
      setActiveConsoleTab('diagnostics');
      sound?.play?.('error');
    } finally {
      setIsExecuting(false);
    }
  }, []);

  // Initialize code whenever question, matchedTemplate, or selected language changes
  // Initialize code whenever question, matchedTemplate, or selected language changes
  useEffect(() => {
    let initialSource = '';
    if (matchedTemplate?.code?.[selectedLang]) {
      initialSource = matchedTemplate.code[selectedLang];
    } else {
      initialSource = getRunnableCodeForQuestion(question, selectedLang, solutions);
    }

    const testCases = matchedTemplate?.testCases || [];
    const firstCase = testCases[0]?.input || matchedTemplate?.defaultInput || {};
    setActiveCaseIdx(0);

    const initParams = {};
    if (matchedTemplate?.inputs && matchedTemplate.inputs.length > 0) {
      matchedTemplate.inputs.forEach((inp) => {
        const v = firstCase[inp.name] !== undefined ? firstCase[inp.name] : inp.default;
        initParams[inp.name] = typeof v === 'object' ? JSON.stringify(v) : String(v !== undefined ? v : '');
      });
    } else {
      if (firstCase.nums) initParams.nums = JSON.stringify(firstCase.nums);
      if (firstCase.target !== undefined) initParams.target = String(firstCase.target);
    }
    setParamValues(initParams);

    const injected = injectInputsIntoCode(initialSource, selectedLang, initParams);
    setCode(injected);
    executeCode(injected, selectedLang);
  }, [matchedTemplate, selectedLang, question]);

  // Handle selecting a preset test case tab
  const handleSelectTestCase = (idx) => {
    setActiveCaseIdx(idx);
    const tc = matchedTemplate?.testCases?.[idx];
    if (!tc || !tc.input) return;

    const newParams = {};
    for (const [k, v] of Object.entries(tc.input)) {
      newParams[k] = typeof v === 'object' ? JSON.stringify(v) : String(v);
    }
    setParamValues(newParams);

    const baseCode = matchedTemplate?.code?.[selectedLang] || getRunnableCodeForQuestion(question, selectedLang, solutions);
    const updated = injectInputsIntoCode(baseCode, selectedLang, newParams);
    setCode(updated);
    executeCode(updated, selectedLang);
    sound?.playStep?.(580);
  };

  // Handle custom input parameter change
  const handleParamChange = (name, value) => {
    setActiveCaseIdx('custom');
    setParamValues((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Apply Custom Inputs into Code
  const handleApplyCustomInput = () => {
    try {
      const updatedCode = injectInputsIntoCode(code, selectedLang, paramValues);
      setCode(updatedCode);
      executeCode(updatedCode, selectedLang);
      sound?.playStep?.(600);
    } catch (_) {
      setError('Invalid input format.');
      setErrorType('SyntaxError');
      setErrorLine(1);
      setActiveConsoleTab('diagnostics');
    }
  };

  // Reset to original algorithm starter code
  const handleResetCode = () => {
    const defaultCode = matchedTemplate?.code?.[selectedLang] || getRunnableCodeForQuestion(question, selectedLang, solutions);
    const testCases = matchedTemplate?.testCases || [];
    const firstCase = testCases[0]?.input || matchedTemplate?.defaultInput || {};
    setActiveCaseIdx(0);

    const initParams = {};
    if (matchedTemplate?.inputs && matchedTemplate.inputs.length > 0) {
      matchedTemplate.inputs.forEach((inp) => {
        const v = firstCase[inp.name] !== undefined ? firstCase[inp.name] : inp.default;
        initParams[inp.name] = typeof v === 'object' ? JSON.stringify(v) : String(v !== undefined ? v : '');
      });
    }
    setParamValues(initParams);

    const injected = injectInputsIntoCode(defaultCode, selectedLang, initParams);
    setCode(injected);
    executeCode(injected, selectedLang);
    sound?.playStep?.(520);
  };

  const handleCopyTraceback = () => {
    if (!traceback) return;
    navigator.clipboard.writeText(traceback);
    setCopiedTraceback(true);
    setTimeout(() => setCopiedTraceback(false), 2000);
  };

  // Quick insertion of standard library imports & print statements
  const handleInsertLibrarySnippet = (libKey) => {
    let snippet = '';
    if (selectedLang === 'python') {
      switch (libKey) {
        case 'collections':
          snippet = 'from collections import deque, Counter, defaultdict';
          break;
        case 'heapq':
          snippet = 'import heapq';
          break;
        case 'math':
          snippet = 'import math';
          break;
        case 'bisect':
          snippet = 'import bisect';
          break;
        case 'print':
          snippet = 'print("Processing nums:", len(nums), nums)';
          break;
        default:
          break;
      }
    } else if (selectedLang === 'cpp') {
      switch (libKey) {
        case 'algorithm':
          snippet = '#include <algorithm>';
          break;
        case 'iostream':
          snippet = '#include <iostream>';
          break;
        case 'print':
          snippet = 'std::cout << "Processing nums size: " << nums.size() << std::endl;';
          break;
        default:
          break;
      }
    } else {
      if (libKey === 'print') {
        snippet = 'console.log("Processing nums:", nums.length, nums);';
      }
    }

    if (!snippet) return;
    if (code.includes(snippet.trim())) {
      executeCode(code, selectedLang);
      return;
    }

    const updated = libKey === 'print' ? `${code.trim()}\n${snippet}\n` : `${snippet}\n${code}`;
    setCode(updated);
    executeCode(updated, selectedLang);
    sound?.playStep?.(580);
  };

  // Playback timer
  const totalSteps = steps.length;
  useEffect(() => {
    if (!isPlaying || totalSteps <= 1) return;

    const intervalMs = Math.max(300, 1400 / speed);
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < totalSteps - 1) {
          sound?.playStep?.(500 + (prev + 1) * 20);
          return prev + 1;
        } else if (loop) {
          sound?.playStep?.(440);
          return 0;
        } else {
          setIsPlaying(false);
          return prev;
        }
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, totalSteps, speed, loop]);

  const currentStepData = steps[currentStep] || steps[0] || {};
  const activeLine = currentStepData.line || null;

  return (
    <div className={`flex flex-col rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden shadow-2xl ${className}`}>
      
      {/* ── 1. Clean Header & Control Bar ── */}
      <div className="px-5 py-3.5 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4">
        {/* Left: Simple Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[rgba(212,160,60,0.1)] border border-[var(--border-accent)]/30 flex items-center justify-center text-[var(--accent)]">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[var(--text-primary)]">
              Interactive Code Runner
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              Edit algorithm code, test cases, and step through execution
            </p>
          </div>
        </div>

        {/* Right: Language Selector & Run Action */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Language Selector Pills */}
          <div className="flex items-center bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg p-0.5">
            {LANGUAGES.map((lang) => {
              const isSelected = selectedLang === lang.id;
              return (
                <button
                  key={lang.id}
                  onClick={() => {
                    setSelectedLang(lang.id);
                    sound?.playStep?.(640);
                  }}
                  className={`px-2.5 py-1 text-xs font-mono font-medium rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--accent)]/20 text-[var(--accent-bright)] border border-[var(--accent)]/50 font-bold shadow-xs'
                      : 'text-[var(--text-body)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
                  }`}
                >
                  <span>{lang.label}</span>
                </button>
              );
            })}
          </div>

          {/* Reset Code */}
          <button
            onClick={handleResetCode}
            title="Reset code to original template"
            className="btn-secondary h-8 px-2.5 text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Run & Visualize Action */}
          <button
            onClick={() => executeCode(code, selectedLang)}
            disabled={isExecuting}
            className="btn-primary h-8 px-3.5 text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-md transition-transform active:scale-95"
            title="Compile & Run algorithm (Ctrl + Enter)"
          >
            {isExecuting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Compiling...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Code</span>
                <kbd className="hidden sm:inline-block ml-1 text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/20 text-white/90 font-bold">
                  Ctrl ↵
                </kbd>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── 2. Dark Luxury Test Bench & Dynamic Parameter Inputs Bar ── */}
      <div className="px-5 py-3 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4 text-xs">
        {/* Left: Test Case Tabs & Dynamic Parameter Inputs */}
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[320px]">
          {/* Test Case Selector Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            {(matchedTemplate?.testCases || [
              { name: 'Case 1' },
              { name: 'Case 2' }
            ]).map((tc, idx) => {
              const isSelected = activeCaseIdx === idx;
              const cleanLabel = tc.name ? tc.name.split('(')[0].trim() : `Case ${idx + 1}`;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectTestCase(idx)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--accent)]/20 text-[var(--accent-bright)] border border-[var(--accent)]/50 font-bold shadow-xs'
                      : 'text-[var(--text-body)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
                  }`}
                  title={tc.name || `Test Case ${idx + 1}`}
                >
                  {cleanLabel}
                </button>
              );
            })}

            {/* Custom Case Tab */}
            <button
              onClick={() => setActiveCaseIdx('custom')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                activeCaseIdx === 'custom'
                  ? 'bg-[var(--accent)]/20 text-[var(--accent-bright)] border border-[var(--accent)]/50 font-bold shadow-xs'
                  : 'text-[var(--text-body)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
              }`}
            >
              Custom
            </button>
          </div>

          <span className="text-[var(--border-medium)] hidden sm:inline">|</span>

          {/* Dynamic Inputs derived from Template Schema */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {(matchedTemplate?.inputs && matchedTemplate.inputs.length > 0
              ? matchedTemplate.inputs
              : Object.keys(paramValues).map((k) => ({
                  name: k,
                  label: `${k} =`,
                  type: k === 'nums' || k === 'arr' ? 'array' : 'number'
                }))
            ).map((inp) => {
              const val = paramValues[inp.name] !== undefined ? paramValues[inp.name] : '';
              const isArr = inp.type === 'array' || (typeof val === 'string' && val.trim().startsWith('['));
              return (
                <div key={inp.name} className="flex items-center gap-1.5">
                  <span className="font-mono text-[11px] font-semibold text-[var(--accent)] shrink-0">
                    {inp.label || `${inp.name} =`}
                  </span>
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => handleParamChange(inp.name, e.target.value)}
                    placeholder={isArr ? '[1, 2, 3]' : '0'}
                    className={`font-mono text-xs px-2.5 py-1 rounded-md bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] ${
                      isArr ? 'w-48 sm:w-64' : 'w-20 text-center'
                    }`}
                  />
                </div>
              );
            })}

            {/* Apply & Run Button */}
            <button
              onClick={handleApplyCustomInput}
              className="btn-secondary h-7.5 px-3 text-[11px] font-mono font-semibold text-[var(--accent)] hover:text-[var(--accent-bright)] cursor-pointer shrink-0"
              title="Apply inputs into code and execute"
            >
              Apply &amp; Run
            </button>
          </div>
        </div>

        {/* Right: Compiler Telemetry & Status Feedback */}
        <div className="flex items-center gap-3 text-[11px] font-mono">
          {error ? (
            <button
              onClick={() => setActiveConsoleTab('diagnostics')}
              className="flex items-center gap-1.5 text-rose-400 font-semibold bg-rose-500/10 hover:bg-rose-500/20 px-2.5 py-1 rounded-full border border-rose-500/30 animate-pulse cursor-pointer transition-colors"
            >
              <AlertTriangle className="w-3 h-3" />
              <span>{errorType || 'Error'} on Line {errorLine || 1} (Inspect)</span>
            </button>
          ) : isExecuting ? (
            <span className="flex items-center gap-1.5 text-[var(--accent)] font-semibold bg-[var(--accent)]/10 px-2.5 py-1 rounded-full border border-[var(--accent)]/25">
              <div className="w-2.5 h-2.5 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
              <span>Compiling &amp; Tracing...</span>
            </span>
          ) : metrics ? (
            <div className="flex items-center gap-3 text-[var(--text-body)]">
              <span className="flex items-center gap-1 text-[#3d9e5c] font-semibold">
                <CheckCircle2 className="w-3 h-3" />
                <span>Build Succeeded</span>
              </span>
              <span>Steps: <strong className="text-[var(--text-primary)]">{metrics.stepsCount}</strong></span>
              <span>Time: <strong className="text-[var(--text-primary)]">{metrics.durationMs}ms</strong></span>
            </div>
          ) : null}
        </div>
      </div>

      {/* ── 3. Main Split Stage: Code Editor (Left) & Live Visualizer Stage (Right) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-[var(--line)]">
        
        {/* Left 5 Cols: Code Editor & Multi-Tab Compiler Console */}
        <div className="lg:col-span-5 flex flex-col bg-[var(--board)]">
          {/* File bar */}
          <div className="px-3.5 py-2 bg-[var(--board-raised)] border-b border-[var(--line)] flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-[var(--chalk)]">
              <FileCode className="w-3.5 h-3.5 text-indigo-400" />
              <span className="font-semibold">
                solution{LANGUAGES.find(l => l.id === selectedLang)?.ext}
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[var(--board-raised-2)] text-[var(--chalk-dim)] border border-[var(--line)]">
                Editable
              </span>
            </div>
            {errorLine ? (
              <span className="text-[10px] text-rose-400 bg-rose-500/15 px-2 py-0.5 rounded border border-rose-500/30 font-semibold flex items-center gap-1">
                <span>Error at Line {errorLine}</span>
              </span>
            ) : activeLine ? (
              <span className="text-[10px] text-indigo-400 bg-indigo-500/15 px-2 py-0.5 rounded border border-indigo-500/30 font-semibold animate-pulse">
                Executing Line {activeLine}
              </span>
            ) : null}
          </div>

          {/* Quick Library / Headers Bar */}
          <div className="px-3 py-1.5 bg-[var(--board-raised-2)]/50 border-b border-[var(--line)] flex items-center gap-1.5 overflow-x-auto text-[10.5px] font-mono scrollbar-none">
            <span className="text-[var(--chalk-dim)] shrink-0 flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-indigo-400" />
              <span>{selectedLang === 'python' ? 'Libraries:' : selectedLang === 'cpp' ? 'Headers:' : 'Helpers:'}</span>
            </span>

            {selectedLang === 'python' && (
              <>
                <button
                  onClick={() => handleInsertLibrarySnippet('collections')}
                  className="px-2 py-0.5 rounded bg-[var(--board)] hover:bg-[var(--board-raised)] border border-[var(--line)] text-indigo-300 transition-colors shrink-0 cursor-pointer"
                  title="Insert from collections import deque, Counter, defaultdict"
                >
                  + collections
                </button>
                <button
                  onClick={() => handleInsertLibrarySnippet('heapq')}
                  className="px-2 py-0.5 rounded bg-[var(--board)] hover:bg-[var(--board-raised)] border border-[var(--line)] text-indigo-300 transition-colors shrink-0 cursor-pointer"
                  title="Insert import heapq"
                >
                  + heapq
                </button>
                <button
                  onClick={() => handleInsertLibrarySnippet('math')}
                  className="px-2 py-0.5 rounded bg-[var(--board)] hover:bg-[var(--board-raised)] border border-[var(--line)] text-indigo-300 transition-colors shrink-0 cursor-pointer"
                  title="Insert import math"
                >
                  + math
                </button>
                <button
                  onClick={() => handleInsertLibrarySnippet('bisect')}
                  className="px-2 py-0.5 rounded bg-[var(--board)] hover:bg-[var(--board-raised)] border border-[var(--line)] text-indigo-300 transition-colors shrink-0 cursor-pointer"
                  title="Insert import bisect"
                >
                  + bisect
                </button>
                <button
                  onClick={() => handleInsertLibrarySnippet('print')}
                  className="px-2 py-0.5 rounded bg-[var(--board)] hover:bg-[var(--board-raised)] border border-[var(--line)] text-emerald-300 transition-colors shrink-0 cursor-pointer"
                  title="Insert print(nums)"
                >
                  + print()
                </button>
              </>
            )}

            {selectedLang === 'cpp' && (
              <>
                <button
                  onClick={() => handleInsertLibrarySnippet('algorithm')}
                  className="px-2 py-0.5 rounded bg-[var(--board)] hover:bg-[var(--board-raised)] border border-[var(--line)] text-indigo-300 transition-colors shrink-0 cursor-pointer"
                  title="Insert #include <algorithm>"
                >
                  + &lt;algorithm&gt;
                </button>
                <button
                  onClick={() => handleInsertLibrarySnippet('iostream')}
                  className="px-2 py-0.5 rounded bg-[var(--board)] hover:bg-[var(--board-raised)] border border-[var(--line)] text-indigo-300 transition-colors shrink-0 cursor-pointer"
                  title="Insert #include <iostream>"
                >
                  + &lt;iostream&gt;
                </button>
                <button
                  onClick={() => handleInsertLibrarySnippet('print')}
                  className="px-2 py-0.5 rounded bg-[var(--board)] hover:bg-[var(--board-raised)] border border-[var(--line)] text-emerald-300 transition-colors shrink-0 cursor-pointer"
                  title="Insert std::cout << ..."
                >
                  + std::cout
                </button>
              </>
            )}

            {selectedLang === 'javascript' && (
              <button
                onClick={() => handleInsertLibrarySnippet('print')}
                className="px-2 py-0.5 rounded bg-[var(--board)] hover:bg-[var(--board-raised)] border border-[var(--line)] text-emerald-300 transition-colors shrink-0 cursor-pointer"
                title="Insert console.log(...)"
              >
                + console.log()
              </button>
            )}
          </div>

          {/* Prominent Error Banner above editor */}
          {error && (
            <div className="m-2 p-2.5 rounded-lg bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-start justify-between gap-3 shadow-lg shadow-rose-950/30">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-rose-200 flex items-center gap-2">
                    <span>{errorType || 'Compiler Error'}</span>
                    <span className="px-1.5 py-0.2 rounded bg-rose-500/30 text-rose-200 text-[10px] font-bold">
                      Line {errorLine || 1}
                    </span>
                  </div>
                  <div className="text-[11px] text-rose-300/90 mt-0.5 leading-snug">{error}</div>
                </div>
              </div>
              <button
                onClick={() => setActiveConsoleTab('diagnostics')}
                className="px-2.5 py-1 rounded bg-rose-500/25 hover:bg-rose-500/35 border border-rose-500/40 text-[10.5px] font-semibold text-rose-100 shrink-0 cursor-pointer transition-colors"
              >
                Traceback &rarr;
              </button>
            </div>
          )}

          {/* Live Code Editor */}
          <div className="p-2 flex-1 min-h-[360px] bg-[var(--bg-card)]">
            <LiveCodeEditor
              code={code}
              onChange={(newCode) => {
                setCode(newCode);
                if (error) {
                  setError(null);
                  setErrorLine(null);
                }
              }}
              onRun={() => executeCode(code, selectedLang)}
              activeLine={error ? null : activeLine}
              errorLine={errorLine}
              errorMessage={error ? `${errorType}: on line ${errorLine}` : null}
              language={selectedLang}
              className="h-full min-h-[360px]"
            />
          </div>

          {/* ── Multi-Tab Compiler Console / Terminal ── */}
          <div className="border-t border-[var(--line)] bg-[var(--board-raised)]">
            {/* Terminal Tab Bar */}
            <div className="px-3 bg-[var(--board-raised-2)] border-b border-[var(--line)] flex items-center justify-between text-[11px] font-mono">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveConsoleTab('output')}
                  className={`px-2.5 py-1.5 font-medium border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeConsoleTab === 'output'
                      ? 'border-indigo-500 text-[var(--chalk)] font-bold bg-[var(--board)]'
                      : 'border-transparent text-[var(--chalk-dim)] hover:text-[var(--chalk)]'
                  }`}
                >
                  <Terminal className="w-3 h-3 text-emerald-400" />
                  <span>Output (stdout)</span>
                  {stdout && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                </button>

                <button
                  onClick={() => setActiveConsoleTab('diagnostics')}
                  className={`px-2.5 py-1.5 font-medium border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeConsoleTab === 'diagnostics'
                      ? 'border-rose-500 text-rose-300 font-bold bg-[var(--board)]'
                      : error
                      ? 'border-transparent text-rose-400 font-semibold'
                      : 'border-transparent text-[var(--chalk-dim)] hover:text-[var(--chalk)]'
                  }`}
                >
                  <AlertTriangle className="w-3 h-3 text-rose-400" />
                  <span>Compiler Diagnostics</span>
                  {error && (
                    <span className="text-[9px] px-1 rounded bg-rose-500/20 text-rose-400 font-bold">
                      1
                    </span>
                  )}
                </button>
              </div>

              {activeConsoleTab === 'diagnostics' && traceback && (
                <button
                  onClick={handleCopyTraceback}
                  className="text-[10px] text-[var(--chalk-dim)] hover:text-[var(--chalk)] flex items-center gap-1 cursor-pointer py-1"
                  title="Copy traceback"
                >
                  {copiedTraceback ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedTraceback ? 'Copied' : 'Copy'}</span>
                </button>
              )}
            </div>

            {/* Terminal Body */}
            <div className="p-3 font-mono text-xs max-h-40 overflow-y-auto">
              {activeConsoleTab === 'output' && (
                <div>
                  {stdout ? (
                    <pre className="text-emerald-400 whitespace-pre-wrap leading-relaxed">{stdout}</pre>
                  ) : error ? (
                    <div className="text-rose-400 flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>Execution failed with {errorType || 'error'}. See Diagnostics tab.</span>
                    </div>
                  ) : (
                    <div className="text-[var(--chalk-faint)] text-[11px] space-y-1">
                      <div>&gt; Build succeeded with zero compiler errors.</div>
                      <div className="opacity-70">
                        Add <code className="text-indigo-400">print(...)</code> in Python or <code className="text-indigo-400">console.log(...)</code> to inspect runtime values here.
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeConsoleTab === 'diagnostics' && (
                <div>
                  {error ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-rose-400 font-bold text-xs bg-rose-500/10 p-2 rounded-md border border-rose-500/25">
                        <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                        <div>
                          <div>{errorType || 'Compiler Error'}: line {errorLine || 1}</div>
                          <div className="text-[11px] font-normal text-rose-300/90">{error}</div>
                        </div>
                      </div>

                      {traceback && (
                        <pre className="text-rose-300/80 bg-black/40 p-2.5 rounded border border-rose-900/40 text-[11px] whitespace-pre-wrap overflow-x-auto leading-relaxed">
                          {traceback}
                        </pre>
                      )}

                      <div className="text-[10px] text-[var(--chalk-faint)] flex items-center gap-1">
                        <span>💡 Tip: Check line {errorLine} for syntax mistakes, unclosed parentheses, or undefined variables.</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-emerald-400 flex items-center gap-2 text-xs">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Zero compiler or syntax errors detected in your code.</span>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Right 7 Cols: Dynamic Visualizer Canvas & Controls */}
        <div className="lg:col-span-7 flex flex-col bg-[var(--board)]">
          
          {/* Canvas Titlebar */}
          <div className="px-4 py-2.5 bg-[var(--board-raised)] border-b border-[var(--line)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${error ? 'bg-rose-500' : 'bg-emerald-400 animate-pulse'}`} />
              <span className="text-xs font-semibold text-[var(--chalk)]">
                Dynamic Array Visualizer
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                error
                  ? 'bg-rose-500/15 border-rose-500/30 text-rose-400'
                  : 'bg-indigo-500/15 border-indigo-500/30 text-indigo-400'
              }`}>
                {error ? 'COMPILATION HALTED' : (currentStepData.phase || 'ANALYZING')}
              </span>
              <span className="text-xs font-mono text-[var(--chalk-dim)]">
                Step <strong className="text-[var(--chalk)]">{totalSteps > 0 ? currentStep + 1 : 0}</strong> / {totalSteps}
              </span>
            </div>
          </div>

          {/* Array Canvas Viewport */}
          <div className="p-6 bg-[var(--board)] flex flex-col items-center justify-center min-h-[220px] border-b border-[var(--line)]">
            {currentStepData.items && currentStepData.items.length > 0 ? (
              <ArrayView
                items={currentStepData.items}
                pointers={currentStepData.pointers || []}
                highlightedIndices={currentStepData.highlightedIndices || []}
                matchIndices={currentStepData.matchIndices || []}
              />
            ) : error ? (
              <div className="py-6 px-4 max-w-md w-full mx-auto text-center space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-rose-500/15 text-rose-400 border border-rose-500/30 shadow-lg shadow-rose-950/40">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-rose-400 font-mono flex items-center justify-center gap-2">
                    <span>{errorType || 'Compiler Error'}</span>
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-xs">
                      Line {errorLine || 1}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--chalk-dim)] mt-1.5 leading-relaxed font-mono">
                    {error}
                  </p>
                </div>

                {/* Failing Line Source Preview */}
                {code.split('\n')[errorLine - 1] !== undefined && (
                  <div className="text-left bg-black/50 p-2.5 rounded-lg border border-rose-500/30 font-mono text-[11.5px] space-y-1">
                    <div className="text-[10px] text-rose-400/80 font-bold uppercase tracking-wider">
                      Failing Source (Line {errorLine}):
                    </div>
                    <div className="text-rose-200 bg-rose-950/40 px-2 py-1 rounded overflow-x-auto whitespace-pre">
                      {code.split('\n')[errorLine - 1]}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-center gap-2 pt-1">
                  <button
                    onClick={() => setActiveConsoleTab('diagnostics')}
                    className="px-3 py-1.5 rounded-md bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-xs font-semibold text-rose-200 cursor-pointer transition-colors"
                  >
                    View Traceback
                  </button>
                  <button
                    onClick={handleResetCode}
                    className="btn-secondary px-3 py-1.5 text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset to Working Code</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-10 text-center text-xs font-mono text-[var(--chalk-dim)]">
                {isExecuting ? 'Compiling and tracing code execution...' : 'Click "Compile & Run" to execute algorithm and mount data structures.'}
              </div>
            )}
          </div>

          {/* Step Explanation Callout */}
          {currentStepData.explain && !error && (
            <div className="px-4 py-2.5 bg-[var(--board-raised-2)]/70 border-b border-[var(--line)] flex items-start gap-2.5 text-xs">
              <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div className="flex-1 space-y-0.5">
                <span className="font-semibold text-[var(--chalk)]">
                  {currentStepData.title || `Step ${currentStep + 1}`}:{' '}
                </span>
                <span className="text-[var(--chalk-dim)]">{currentStepData.explain}</span>
              </div>
            </div>
          )}

          {/* Docked Transport HUD (Play, Step, Speed, Scrubber) */}
          <div className="p-3 bg-[var(--board-raised)] border-b border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Playback Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  sound?.playStep?.(440);
                  setCurrentStep(0);
                }}
                disabled={totalSteps === 0 || error}
                className="btn-secondary p-1.5 rounded-md cursor-pointer disabled:opacity-40"
                title="Reset to Step 1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  sound?.playStep?.(480);
                  setCurrentStep((prev) => Math.max(0, prev - 1));
                }}
                disabled={currentStep === 0 || error}
                className="btn-secondary p-1.5 rounded-md disabled:opacity-40 cursor-pointer"
                title="Previous Step"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  sound?.playStep?.(540);
                  setIsPlaying(!isPlaying);
                }}
                disabled={totalSteps === 0 || error}
                className="btn-primary px-3 py-1 text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>
              <button
                onClick={() => {
                  sound?.playStep?.(520);
                  setCurrentStep((prev) => Math.min(totalSteps - 1, prev + 1));
                }}
                disabled={currentStep >= totalSteps - 1 || error}
                className="btn-secondary p-1.5 rounded-md disabled:opacity-40 cursor-pointer"
                title="Next Step"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setLoop(!loop)}
                disabled={error}
                className={`p-1.5 rounded-md border transition-colors cursor-pointer disabled:opacity-40 ${
                  loop
                    ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
                    : 'btn-secondary'
                }`}
                title="Loop playback"
              >
                <Repeat className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Timeline Scrubber */}
            <div className="flex-1 max-w-xs flex items-center gap-2">
              <input
                type="range"
                min="0"
                max={Math.max(0, totalSteps - 1)}
                value={currentStep}
                disabled={totalSteps === 0 || error}
                onChange={(e) => setCurrentStep(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer disabled:opacity-40"
              />
            </div>

            {/* Speed Pills */}
            <div className="flex items-center gap-0.5 bg-[var(--board)] p-0.5 rounded-md border border-[var(--line)]">
              {[0.5, 1, 1.5, 2].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setSpeed(spd)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold transition-colors cursor-pointer ${
                    speed === spd ? 'bg-indigo-600 text-white' : 'text-[var(--chalk-dim)] hover:text-[var(--chalk)]'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>

          {/* Active Variable Watcher */}
          <div className="p-3.5 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)]">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="font-semibold text-[var(--text-primary)]">
                Variables &amp; State
              </span>
              <span className="text-[var(--text-tertiary)] text-[11px]">
                {Object.keys(currentStepData.variables || {}).length} Active
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap min-h-[30px]">
              {Object.keys(currentStepData.variables || {}).length > 0 ? (
                Object.entries(currentStepData.variables).map(([k, v]) => (
                  <span
                    key={k}
                    className="px-2.5 py-1 rounded-md bg-[var(--bg-card)] border border-[var(--border-subtle)] font-mono text-xs flex items-center gap-1.5"
                  >
                    <span className="text-[var(--text-muted)]">{k}:</span>
                    <span className="text-[var(--accent)] font-semibold">
                      {typeof v === 'object' ? JSON.stringify(v) : String(v)}
                    </span>
                  </span>
                ))
              ) : (
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  Step through execution to inspect live variable values.
                </span>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
