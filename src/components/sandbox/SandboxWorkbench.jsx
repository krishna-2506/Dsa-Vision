import React, { useState, useEffect, useCallback } from 'react';
import {
  Code2,
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  FileCode,
  Sliders,
  ChevronDown
} from 'lucide-react';
import LiveCodeEditor from './LiveCodeEditor';
import TemplatedVisualizerStage from './TemplatedVisualizerStage';
import { ALGORITHM_TEMPLATES } from '../../services/sandbox/AlgorithmTemplates';
import { sandboxCoordinator } from '../../services/sandbox/SandboxCoordinator';
import { sound } from '../../services/audio';

const LANGUAGES = [
  { id: 'python', label: 'Python 3', ext: '.py', badge: 'WASM' },
  { id: 'cpp', label: 'C++', ext: '.cpp', badge: 'AST Engine' },
  { id: 'javascript', label: 'JavaScript', ext: '.js', badge: 'Client V8' }
];

export default function SandboxWorkbench() {
  const [selectedTemplateId, setSelectedTemplateId] = useState('two-sum');
  const [selectedLang, setSelectedLang] = useState('python');
  const [code, setCode] = useState('');
  
  // Execution & Visualization State
  const [isExecuting, setIsExecuting] = useState(false);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [stdout, setStdout] = useState('');
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState(null);

  // Active template object
  const currentTemplate = ALGORITHM_TEMPLATES.find(t => t.id === selectedTemplateId) || ALGORITHM_TEMPLATES[0];

  // Initialize or switch code when template or language changes
  useEffect(() => {
    if (currentTemplate && currentTemplate.code[selectedLang]) {
      setCode(currentTemplate.code[selectedLang]);
      // Trigger execution for initial preview
      executeCode(currentTemplate.code[selectedLang], selectedLang);
    }
  }, [selectedTemplateId, selectedLang]);

  // Execute Code through Sandbox Coordinator
  const executeCode = useCallback(async (sourceCode, language) => {
    setIsExecuting(true);
    setError(null);
    setIsPlaying(false);
    const startTime = performance.now();

    try {
      const res = await sandboxCoordinator.executeAndTrace(language, sourceCode);
      const durationMs = Math.round(performance.now() - startTime);

      if (!res.success && res.error) {
        setError(res.error);
        setSteps([]);
        setStdout(res.stdout || '');
        setMetrics(null);
        sound.play('error');
      } else {
        setSteps(res.steps);
        setCurrentStep(0);
        setStdout(res.stdout || '');
        setMetrics({
          stepsCount: res.steps.length,
          frameCount: res.frameCount,
          durationMs
        });
        sound.play('success');
      }
    } catch (err) {
      setError(err.message || 'Execution error');
      setSteps([]);
      sound.play('error');
    } finally {
      setIsExecuting(false);
    }
  }, []);

  const handleRun = () => {
    executeCode(code, selectedLang);
  };

  const handleReset = () => {
    if (currentTemplate && currentTemplate.code[selectedLang]) {
      const initialCode = currentTemplate.code[selectedLang];
      setCode(initialCode);
      executeCode(initialCode, selectedLang);
      sound.play('click');
    }
  };

  // Sync editor line highlight with active execution step
  const activeLine = steps[currentStep]?.line || null;

  return (
    <div className="flex flex-col min-h-screen bg-[var(--board)] text-[var(--ink)]">
      {/* ── Top Header Toolbar ── */}
      <header className="px-6 py-4 bg-[var(--board)] border-b border-[var(--line)] sticky top-0 z-20 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Title & Engine info */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-[var(--indigo)]/10 border border-[var(--indigo)]/25 flex items-center justify-center text-[var(--indigo)]">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold tracking-tight text-[var(--ink)]">
                  Code-to-Visualizer Studio
                </h1>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                  100% In-Browser Execution
                </span>
              </div>
              <p className="text-xs text-[var(--ink-muted)]">
                Write algorithms in Python, C++, or JavaScript — our client engine traces variables and renders interactive visualizer steps live.
              </p>
            </div>
          </div>

          {/* Controls: Template, Language, Run */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Algorithm Template Dropdown */}
            <div className="relative">
              <select
                value={selectedTemplateId}
                onChange={(e) => setSelectedTemplateId(e.target.value)}
                className="appearance-none bg-[var(--board-raised)] border border-[var(--line)] rounded-md text-xs font-semibold px-3 py-1.5 pr-8 text-[var(--ink)] hover:border-[var(--line-strong)] focus:outline-hidden focus:ring-1 focus:ring-[var(--indigo)] cursor-pointer transition-colors"
              >
                {ALGORITHM_TEMPLATES.map((tmpl) => (
                  <option key={tmpl.id} value={tmpl.id}>
                    {tmpl.title}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[var(--ink-muted)] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Language Selector */}
            <div className="flex items-center bg-[var(--board-raised)] border border-[var(--line)] rounded-md p-0.5">
              {LANGUAGES.map((lang) => {
                const isSelected = selectedLang === lang.id;
                return (
                  <button
                    key={lang.id}
                    onClick={() => {
                      setSelectedLang(lang.id);
                      sound.play('click');
                    }}
                    className={`px-2.5 py-1 text-xs font-mono font-medium rounded-xs transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[var(--board)] text-[var(--ink)] shadow-xs border border-[var(--line)]'
                        : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                    }`}
                  >
                    <span>{lang.label}</span>
                    <span className="text-[9px] px-1 py-0.2 rounded-xs bg-[var(--board-raised)] text-[var(--ink-muted)] border border-[var(--line)]">
                      {lang.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              title="Reset code to original template"
              className="p-1.5 rounded-md border border-[var(--line)] text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--board-raised)] transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Primary Run & Visualize Action */}
            <button
              onClick={handleRun}
              disabled={isExecuting}
              className="flex items-center gap-2 px-4 py-1.5 rounded-md bg-[var(--indigo)] hover:bg-[var(--indigo-hover)] text-white text-xs font-semibold shadow-xs disabled:opacity-50 transition-all cursor-pointer"
            >
              {isExecuting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Compiling & Tracing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Run & Visualize</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Runtime Metrics Bar */}
        {metrics && !error && (
          <div className="mt-2.5 pt-2.5 border-t border-[var(--line)]/60 flex items-center justify-between text-[11px] font-mono text-[var(--ink-muted)]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Traced successfully</span>
              </span>
              <span>Steps: <strong className="text-[var(--ink)]">{metrics.stepsCount}</strong></span>
              <span>Execution: <strong className="text-[var(--ink)]">{metrics.durationMs}ms</strong></span>
              <span>Engine: <strong className="text-[var(--ink)]">{selectedLang === 'python' ? 'CPython 3.12 (Pyodide WASM)' : selectedLang === 'cpp' ? 'AST Transpiler (In-Browser)' : 'Instrumented V8 (Worker)'}</strong></span>
            </div>
            <div className="text-[10px] text-[var(--ink-muted)]">
              Edit the code arrays or variables and re-run to see instant visual changes.
            </div>
          </div>
        )}
      </header>

      {/* ── Main Workbench Grid ── */}
      <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto w-full">
        {/* Left Side: Code Editor & Console (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Editor Container */}
          <div className="flex flex-col flex-1 rounded-md border border-[var(--line)] bg-[var(--board-raised)] overflow-hidden shadow-xs">
            {/* Editor File Bar */}
            <div className="flex items-center justify-between px-3 py-2 bg-[var(--board)] border-b border-[var(--line)] text-xs">
              <div className="flex items-center gap-2 text-[var(--ink)]">
                <FileCode className="w-3.5 h-3.5 text-[var(--indigo)]" />
                <span className="font-mono font-medium">
                  main{LANGUAGES.find(l => l.id === selectedLang)?.ext}
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-xs bg-[var(--board-raised)] text-[var(--ink-muted)] border border-[var(--line)]">
                  Editable
                </span>
              </div>
              <div className="flex items-center gap-2">
                {activeLine && (
                  <span className="text-[10px] font-mono text-[var(--indigo)] bg-[var(--indigo)]/10 px-2 py-0.5 rounded-xs border border-[var(--indigo)]/20">
                    Executing Line {activeLine}
                  </span>
                )}
              </div>
            </div>

            {/* Live Editor Component */}
            <div className="flex-1 min-h-[360px] p-2 bg-[var(--board)]">
              <LiveCodeEditor
                code={code}
                onChange={setCode}
                activeLine={activeLine}
                language={selectedLang}
                className="h-full min-h-[360px]"
              />
            </div>
          </div>

          {/* Console / Terminal Output */}
          <div className="rounded-md border border-[var(--line)] bg-[var(--board)] overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 bg-[var(--board-raised)] border-b border-[var(--line)] text-xs">
              <div className="flex items-center gap-2 text-[var(--ink-muted)]">
                <Terminal className="w-3.5 h-3.5" />
                <span className="font-mono font-medium">Terminal & Trace Log</span>
              </div>
              {error && (
                <span className="text-[10px] font-mono text-red-400 bg-red-500/10 px-2 py-0.5 rounded-xs border border-red-500/20">
                  Execution Error
                </span>
              )}
            </div>
            <div className="p-3 font-mono text-xs max-h-36 overflow-y-auto space-y-1">
              {error ? (
                <div className="text-red-400 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              ) : stdout ? (
                <pre className="text-emerald-400 whitespace-pre-wrap">{stdout}</pre>
              ) : (
                <div className="text-[var(--ink-muted)] opacity-60">
                  &gt; Code executed cleanly. {steps.length} state snapshots recorded.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Templated Visualizer Stage (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <TemplatedVisualizerStage
            steps={steps}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            isPlaying={isPlaying}
            onTogglePlay={() => setIsPlaying(!isPlaying)}
            speed={speed}
            onSpeedChange={setSpeed}
            className="flex-1 min-h-[500px]"
          />
        </div>
      </main>
    </div>
  );
}
