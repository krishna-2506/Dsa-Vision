import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Sparkles,
  UploadCloud,
  Code2,
  Search,
  X,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { sound } from '../services/audio';
import { visualizersRegistry, loadVisualizer } from '../visualizers';
import { api } from '../services/api';
import { generateMasterVisualizerPrompt } from '../utils/aiVisualizerPrompt';
import CodeViewer from './CodeViewer';
import VisualizerUploader from './VisualizerUploader';
import ReportSolutionModal from './ReportSolutionModal';
import AiQuestionEnhancerModal from './AiQuestionEnhancerModal';
import VisualizerErrorBoundary from './VisualizerErrorBoundary';
import KeyboardShortcutsModal from './KeyboardShortcutsModal';
import BetaCodeVisualizer from './sandbox/BetaCodeVisualizer';
import IdeaMapView from './IdeaMapView';

// Decomposed Subcomponents & Custom Hook
import { useVisualizerPlayback } from '../hooks/useVisualizerPlayback';
import StudioHeader from './studio/StudioHeader';
import StudioTransportHud from './studio/StudioTransportHud';
import StudioDiscussionHub from './studio/StudioDiscussionHub';

function isArrayQuestion(q) {
  if (!q) return false;
  const cat = (q.category || '').toLowerCase();
  const title = (q.title || '').toLowerCase();
  const step = (q.step_name || '').toLowerCase();
  const substep = (q.substep_name || '').toLowerCase();
  const comp = (q.component_key || q.componentKey || '').toLowerCase();
  const slug = (q.slug || '').toLowerCase();
  const tags = Array.isArray(q.tags) ? q.tags.map((t) => String(t).toLowerCase()) : [];

  return (
    cat.includes('array') ||
    cat.includes('sorting') ||
    cat.includes('two pointer') ||
    step.includes('array') ||
    substep.includes('array') ||
    title.includes('array') ||
    title.includes('sum') ||
    title.includes('sort') ||
    title.includes('element') ||
    comp.includes('array') ||
    slug.includes('array') ||
    tags.some((t) => t.includes('array')) ||
    q.step_no === 3 ||
    q.step_no === 2
  );
}

export default function VisualizerStudio({
  question,
  onBack,
  onStatusChange,
  onUpdateQuestion,
  currentUser,
  questions = [],
  onNavigateQuestion
}) {
  const currentKey = question.component_key || question.componentKey;
  const [loadedModule, setLoadedModule] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (currentKey) {
      loadVisualizer(currentKey).then((mod) => {
        if (isMounted && mod) setLoadedModule(mod);
      });
    } else {
      setLoadedModule(null);
    }
    return () => {
      isMounted = false;
    };
  }, [currentKey]);

  const visualizerEntry = loadedModule || (currentKey ? visualizersRegistry[currentKey] : null);
  const Component = visualizerEntry?.Component || null;
  const ideaMap = visualizerEntry?.ideaMap || loadedModule?.ideaMap || null;
  const hasIdeaMap = Boolean(ideaMap);
  const [activeTier, setActiveTier] = useState('optimal'); // 'intuitive' | 'better' | 'optimal'
  const [showReportModal, setShowReportModal] = useState(false);
  const [showEnhanceModal, setShowEnhanceModal] = useState(false);
  const activeApproachData = visualizerEntry?.approaches?.[activeTier] || null;

  const currentApproachObj = useMemo(() => {
    const list = Array.isArray(question.approaches_data) ? question.approaches_data : [];
    if (list.length === 0) return null;
    if (activeTier === 'intuitive') return list[0];
    if (activeTier === 'better') return list.length >= 3 ? list[1] : (list.length === 2 ? list[0] : list[0]);
    return list[list.length - 1];
  }, [question.approaches_data, activeTier]);

  const stepsList = activeApproachData?.steps || visualizerEntry?.steps || null;
  const maxSteps = stepsList?.length || 8;
  const hasVisualizer = Boolean(Component);

  const [solutions, setSolutions] = useState({});
  const [viewMode, setViewMode] = useState(hasVisualizer ? 'split' : 'code_only');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showUploader, setShowUploader] = useState(false);
  const [showJumper, setShowJumper] = useState(false);
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);
  const [jumperSearch, setJumperSearch] = useState('');
  const [copiedDirect, setCopiedDirect] = useState(false);

  // Keyboard shortcut for Fullscreen (F to toggle, Escape to exit)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) return;
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        setIsFullscreen((prev) => !prev);
      } else if (e.key === 'Escape' && isFullscreen) {
        e.preventDefault();
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Discussion Comments, Public Notes & Private Notes State
  const [comments, setComments] = useState([]);
  const [publicNotes, setPublicNotes] = useState([]);
  const [privateNotes, setPrivateNotes] = useState('');
  const [privateNotesSaved, setPrivateNotesSaved] = useState(false);

  // Custom Input Sandbox & Preset State
  const [customInput] = useState('');
  const [customTarget] = useState('');
  const [isBarDragging, setIsBarDragging] = useState(false);
  const [isCodeColDragging, setIsCodeColDragging] = useState(false);
  const [preloadedUploadCode, setPreloadedUploadCode] = useState('');
  const barFileInputRef = useRef(null);

  // Previous / Next question navigation calculations
  const currentIndex = questions ? questions.findIndex((q) => q.id === question.id) : -1;
  const prevQuestion = currentIndex > 0 ? questions[currentIndex - 1] : null;
  const nextQuestion =
    currentIndex >= 0 && currentIndex < questions.length - 1 ? questions[currentIndex + 1] : null;

  // Filter questions in the quick jumper
  const filteredJumperQuestions = (questions || []).filter((q) => {
    if (!jumperSearch.trim()) return true;
    const s = jumperSearch.toLowerCase().trim();
    return (
      q.title?.toLowerCase().includes(s) ||
      (q.display_id && q.display_id.toLowerCase().includes(s)) ||
      (q.leetcode_id && String(q.leetcode_id).includes(s)) ||
      (q.category && q.category.toLowerCase().includes(s)) ||
      (Array.isArray(q.tags) && q.tags.some((t) => t.toLowerCase().includes(s)))
    );
  });

  const handleSelectTier = useCallback((tier) => {
    setActiveTier((curr) => {
      if (curr === tier) return curr;
      sound?.playStep?.(640);
      return tier;
    });
  }, []);

  const handleSavePrivateNotes = useCallback(async () => {
    if (currentUser?.id) {
      await api.savePrivateNote(currentUser.id, question.id, privateNotes);
    } else {
      await api.saveNotes(question.id, privateNotes);
    }
    sound?.playStep?.(680);
    setPrivateNotesSaved(true);
    setTimeout(() => setPrivateNotesSaved(false), 2000);
  }, [currentUser?.id, question.id, privateNotes]);

  // Integrated Playback Hook
  const {
    currentStep,
    setCurrentStep,
    isPlaying,
    speed,
    setSpeed,
    loop,
    setLoop,
    togglePlay,
    handleNextStep,
    handlePrevStep,
    handleReset,
    triggerCompletionCelebration
  } = useVisualizerPlayback({
    maxSteps,
    onNavigatePrev: () => prevQuestion && onNavigateQuestion && onNavigateQuestion(prevQuestion),
    onNavigateNext: () => nextQuestion && onNavigateQuestion && onNavigateQuestion(nextQuestion),
    onOpenJumper: () => setShowJumper((j) => !j),
    onOpenShortcuts: () => setShowShortcutsModal(true),
    onSaveNotes: handleSavePrivateNotes,
    onSelectTier: handleSelectTier
  });

  const currentStepData = stepsList && stepsList[currentStep] ? stepsList[currentStep] : null;

  // Reset steps & mode when question changes
  useEffect(() => {
    const hasComp = Boolean(visualizersRegistry[question.component_key || question.componentKey]);
    setViewMode(hasComp ? 'split' : 'code_only');
    setShowUploader(false);
    handleReset();

    let isMounted = true;
    api.getComments(question.id).then((data) => {
      if (isMounted && data) setComments(data);
    });
    api.getPublicNotes(question.id).then((data) => {
      if (isMounted && data) setPublicNotes(data);
    });
    if (currentUser?.id) {
      api.getPrivateNote(currentUser.id, question.id).then((content) => {
        if (isMounted) setPrivateNotes(content || '');
      });
    } else {
      setPrivateNotes(question.notes || '');
    }

    return () => {
      isMounted = false;
    };
  }, [question.id, question.component_key, question.componentKey, question.notes, currentUser?.id, handleReset]);

  // Fetch solutions whenever question or active approach tier changes
  useEffect(() => {
    let isMounted = true;
    api.getCodeSolutions(question.id, activeTier).then((data) => {
      if (!isMounted) return;
      const hasSubstantialData = data && Object.keys(data).length > 0 && Object.values(data).some((c) => c && c.length > 70);
      if (hasSubstantialData) {
        setSolutions(data);
      } else if (visualizerEntry?.approaches?.[activeTier]?.solutions) {
        setSolutions(visualizerEntry.approaches[activeTier].solutions);
      } else if (visualizerEntry?.solutions) {
        setSolutions(visualizerEntry.solutions);
      } else if (data && Object.keys(data).length > 0) {
        setSolutions(data);
      } else if (activeTier !== 'optimal') {
        api.getCodeSolutions(question.id, 'optimal').then((fallbackData) => {
          if (isMounted && fallbackData && Object.keys(fallbackData).length > 0) {
            setSolutions(fallbackData);
          } else if (isMounted && visualizerEntry?.solutions) {
            setSolutions(visualizerEntry.solutions);
          }
        });
      }
    });
    return () => {
      isMounted = false;
    };
  }, [question.id, activeTier, currentKey, visualizerEntry]);

  const handleDirectCopyPrompt = () => {
    const promptText = generateMasterVisualizerPrompt(question, solutions);
    navigator.clipboard.writeText(promptText);
    sound?.playStep?.(640);
    setCopiedDirect(true);
    setTimeout(() => setCopiedDirect(false), 2500);
  };

  const handleDownloadStudySheet = () => {
    window.open(`/api/export/${encodeURIComponent(question.id)}`, '_blank');
  };

  const handleDirectFileDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBarDragging(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const content = evt.target?.result;
        if (typeof content === 'string') {
          setPreloadedUploadCode(content);
          setShowUploader(true);
          sound?.playSuccess?.();
        }
      };
      reader.readAsText(file);
    }
  };

  const handleBarFileInput = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const content = evt.target?.result;
        if (typeof content === 'string') {
          setPreloadedUploadCode(content);
          setShowUploader(true);
          sound?.playSuccess?.();
        }
      };
      reader.readAsText(file);
    }
  };

  const handleUploadSuccess = async (newKey, updatedQuestion) => {
    setShowUploader(false);
    setPreloadedUploadCode('');
    setViewMode('split');
    const refreshedSolutions = await api.getCodeSolutions(question.id);
    if (refreshedSolutions && Object.keys(refreshedSolutions).length > 0) {
      setSolutions(refreshedSolutions);
    }
    if (onUpdateQuestion && updatedQuestion) {
      onUpdateQuestion(updatedQuestion);
    }
    sound?.playSuccess?.();
  };

  const activeCodeLine =
    currentStepData?.codeLines ||
    currentStepData?.codeLine ||
    currentStepData?.highlightLines ||
    currentStepData?.line ||
    currentStepData?.activeLine ||
    null;

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* ── 1. Decomposed Problem Header ── */}
      <StudioHeader
        question={question}
        onBack={onBack}
        onStatusChange={onStatusChange}
        currentApproachObj={currentApproachObj}
        hasIdeaMap={hasIdeaMap}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onDownloadStudySheet={handleDownloadStudySheet}
        onOpenJumper={() => setShowJumper(true)}
        onOpenEnhancer={() => setShowEnhanceModal(true)}
        onOpenReport={() => setShowReportModal(true)}
        onToggleUploader={() => setShowUploader(!showUploader)}
        showUploader={showUploader}
        onToggleFullscreen={() => setIsFullscreen((prev) => !prev)}
        isFullscreen={isFullscreen}
        prevQuestion={prevQuestion}
        nextQuestion={nextQuestion}
        currentIndex={currentIndex}
        totalQuestions={questions.length}
        onNavigateQuestion={onNavigateQuestion}
      />

      {/* ── 2. The Hero Algorithm Workspace ── */}
      <section className="workspace-stage">
        {/* Workspace Titlebar: Execution State, Approach Switcher, View Mode */}
        <div className="workspace-titlebar flex-wrap gap-2">
          {/* Execution State indicator */}
          <div className="flex items-center gap-2.5">
            <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-indigo-500'}`} />
            <span className="text-xs font-mono font-medium text-[var(--chalk)]">
              {isPlaying ? 'Running' : 'Paused'} · Step {currentStep + 1} of {maxSteps}
            </span>
            <span className="text-[var(--line-strong)] text-xs hidden sm:inline">|</span>
            <span className="text-xs font-sans text-[var(--chalk-dim)] truncate max-w-[280px] hidden sm:inline">
              {currentStepData?.title || `Execution Step ${currentStep + 1}`}
            </span>
          </div>

          {/* Approach Selector Tabs */}
          <div className="segmented-control">
            {[
              { id: 'intuitive', label: 'Brute Force' },
              { id: 'better', label: 'Better' },
              { id: 'optimal', label: 'Optimal' },
              ...(isArrayQuestion(question) ? [{ id: 'beta', label: '⚡ Beta Mode', isBeta: true }] : [])
            ].map((tier) => {
              const isActive = activeTier === tier.id;
              const hasCustomAnimation = Boolean(visualizerEntry?.approaches?.[tier.id]);
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => handleSelectTier(tier.id)}
                  className={`segmented-item flex items-center gap-1.5 ${isActive ? 'active' : ''} ${
                    tier.isBeta
                      ? (isActive
                          ? 'bg-indigo-600 text-white font-bold shadow-xs'
                          : 'text-indigo-400 hover:text-indigo-300 font-semibold')
                      : ''
                  }`}
                >
                  <span>{tier.label}</span>
                  {tier.isBeta ? (
                    <span className="text-[8px] font-mono uppercase px-1 py-0.2 rounded bg-indigo-500/25 border border-indigo-400/40 text-indigo-200">
                      Live
                    </span>
                  ) : hasCustomAnimation ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" title="Dedicated visualizer available" />
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle & Fullscreen Button */}
          <div className="flex items-center gap-2">
            <div className="segmented-control">
              {[
                ['split', 'Split View'],
                ['visualizer_only', 'Canvas'],
                ...(hasIdeaMap ? [['idea_map', '🗺️ Idea Map']] : []),
                ['code_only', 'Code']
              ].map(([mode, label]) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setViewMode(mode)}
                  className={`segmented-item ${viewMode === mode ? 'active' : ''}`}
                >
                  {label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              className="btn-secondary h-8 px-2.5 text-xs flex items-center gap-1.5 cursor-pointer text-amber-300 hover:text-amber-200"
              title="Expand to Fullscreen Theater Mode (Hotkeys: F / Esc)"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Fullscreen</span>
            </button>
          </div>
        </div>

        {/* Stage Grid or Beta Mode Component */}
        {activeTier === 'beta' ? (
          <div className="p-4 bg-[var(--bg-base)]">
            <BetaCodeVisualizer question={question} solutions={solutions} />
          </div>
        ) : (
          <>
            <div
              className="stage"
              style={{
                gridTemplateColumns: viewMode === 'split' ? '1.15fr 0.95fr' : '1fr'
              }}
            >
              {/* Canvas Column */}
              {viewMode !== 'code_only' && (
                <div className="canvas-col">
                  {viewMode === 'idea_map' ? (
                    <IdeaMapView
                      ideaMap={ideaMap}
                      question={question}
                      onLaunchVisualizer={() => setViewMode('split')}
                    />
                  ) : (
                    <>
                      {Component ? (
                        <VisualizerErrorBoundary
                          onReset={() => setCurrentStep(0)}
                          onSwitchToCode={() => setViewMode('code_only')}
                        >
                          <React.Suspense
                            fallback={
                              <div className="w-full h-56 flex flex-col items-center justify-center gap-3 bg-[var(--board-raised-2)] rounded-xl border border-[var(--line)]">
                                <div className="w-7 h-7 rounded-full border-2 border-[var(--indigo)] border-t-transparent animate-spin" />
                                <span className="text-xs font-mono text-[var(--chalk-dim)]">Loading Visualizer...</span>
                              </div>
                            }
                          >
                            <Component
                              currentStep={currentStep}
                              onStepChange={setCurrentStep}
                              customInput={customInput}
                              customTarget={customTarget}
                              approachTier={activeTier}
                            />
                          </React.Suspense>
                        </VisualizerErrorBoundary>
                      ) : (
                        <div
                          onDragOver={(e) => {
                            e.preventDefault();
                            setIsBarDragging(true);
                          }}
                          onDragLeave={(e) => {
                            e.preventDefault();
                            setIsBarDragging(false);
                          }}
                          onDrop={handleDirectFileDrop}
                          onClick={() => barFileInputRef.current?.click()}
                          className={`flex flex-col items-center justify-center py-16 text-center space-y-3 cursor-pointer border border-dashed rounded-lg transition-colors ${
                            isBarDragging
                              ? 'border-indigo-500 bg-indigo-500/10'
                              : 'border-[var(--line-strong)] hover:border-indigo-500/60'
                          }`}
                        >
                          <input
                            type="file"
                            ref={barFileInputRef}
                            onChange={handleBarFileInput}
                            accept=".jsx,.tsx,.js,.ts"
                            className="hidden"
                          />
                          <UploadCloud className="w-8 h-8 text-[var(--chalk-dim)]" />
                          <p className="text-[13px] font-sans font-medium text-[var(--chalk)]">
                            {isBarDragging ? 'Drop your .jsx file now' : 'No visualizer for this question yet'}
                          </p>
                          <p className="text-[12px] text-[var(--chalk-dim)] max-w-sm font-sans">
                            Drag &amp; drop your React visualizer <code className="text-indigo-400 font-mono">.jsx</code> file here, or click to browse.
                          </p>
                          <div className="pt-2 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDirectCopyPrompt();
                              }}
                              className="btn-primary"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>{copiedDirect ? 'Copied Prompt' : 'Copy AI Prompt'}</span>
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowUploader(true);
                              }}
                              className="btn-secondary"
                            >
                              <UploadCloud className="w-3.5 h-3.5" />
                              <span>Upload Code</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Code Column */}
              {viewMode !== 'visualizer_only' && (
                <div className="code-col">
                  {!Component && viewMode === 'code_only' && (
                    <>
                      <div className="p-3 bg-[var(--board-raised-2)] border-b border-[var(--line)] flex items-center justify-between gap-3 text-[11.5px] font-mono flex-wrap">
                        <span className="text-[var(--chalk-dim)] flex items-center gap-1.5">
                          <Code2 className="w-3.5 h-3.5 text-[var(--amber)]" />
                          Code Execution View · No visualizer uploaded yet.
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handleDirectCopyPrompt}
                            className="chalk-btn chalk-btn-amber py-1"
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>{copiedDirect ? 'Copied!' : 'Copy AI Prompt'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowUploader(true)}
                            className="chalk-btn py-1"
                          >
                            <UploadCloud className="w-3 h-3" />
                            <span>Upload .jsx</span>
                          </button>
                        </div>
                      </div>

                      <div
                        onDragOver={(e) => { e.preventDefault(); setIsCodeColDragging(true); }}
                        onDragEnter={(e) => { e.preventDefault(); setIsCodeColDragging(true); }}
                        onDragLeave={(e) => { e.preventDefault(); setIsCodeColDragging(false); }}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsCodeColDragging(false);
                          handleDirectFileDrop(e);
                        }}
                        onClick={() => barFileInputRef.current?.click()}
                        className={`flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200 ${
                          isCodeColDragging
                            ? 'bg-[var(--amber-dim)] border-[var(--amber)]'
                            : 'border-[var(--line-strong)] hover:border-[var(--amber)] hover:bg-[rgba(232,163,61,0.04)]'
                        }`}
                        style={{
                          minHeight: '160px',
                          borderWidth: '1px',
                          borderStyle: 'dashed',
                          borderRadius: '3px',
                          margin: '16px',
                        }}
                      >
                        <input
                          type="file"
                          ref={barFileInputRef}
                          onChange={handleBarFileInput}
                          accept=".jsx,.tsx,.js,.ts"
                          className="hidden"
                        />
                        <UploadCloud
                          className={`w-7 h-7 transition-colors duration-200 ${
                            isCodeColDragging ? 'text-[var(--amber)]' : 'text-[var(--chalk-faint)]'
                          }`}
                        />
                        <div className="text-center px-4">
                          <p className="text-[12.5px] font-medium text-[var(--chalk-dim)] mb-0.5">
                            {isCodeColDragging ? 'Drop .jsx to upload' : 'Drop visualizer here'}
                          </p>
                          <p className="text-[11px] text-[var(--chalk-faint)]">
                            or use{' '}
                            <span
                              className="text-[var(--amber)] cursor-pointer hover:underline"
                              onClick={(e) => { e.stopPropagation(); setShowUploader(true); }}
                            >
                              Upload .jsx
                            </span>
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                  <CodeViewer
                    solutions={solutions}
                    initialLanguage="cpp"
                    activeLine={activeCodeLine}
                    leetcodeUrl={question.leetcode_url}
                  />
                </div>
              )}
            </div>

            {/* ── Step Progress Bar & Transport HUD ── */}
            {viewMode !== 'idea_map' && (
              <>
                <div className="step-progress-track" style={{ margin: '0' }}>
                  <div
                    className="step-progress-fill"
                    style={{ width: `${maxSteps > 1 ? (currentStep / (maxSteps - 1)) * 100 : 100}%` }}
                  />
                </div>

                <StudioTransportHud
                  currentStep={currentStep}
                  maxSteps={maxSteps}
                  isPlaying={isPlaying}
                  speed={speed}
                  loop={loop}
                  onStepSelect={(idx) => {
                    setCurrentStep(idx);
                    sound?.playStep?.(500 + idx * 30);
                    if (idx === maxSteps - 1) triggerCompletionCelebration();
                  }}
                  onPrevStep={handlePrevStep}
                  onNextStep={handleNextStep}
                  onTogglePlay={togglePlay}
                  onReset={handleReset}
                  onToggleLoop={() => setLoop(!loop)}
                  onSelectSpeed={(s) => setSpeed(s)}
                  onOpenShortcuts={() => setShowShortcutsModal(true)}
                />
              </>
            )}
          </>
        )}
      </section>

      {/* ── 3. Decomposed Discussion & Study Hub ── */}
      <StudioDiscussionHub
        question={question}
        currentUser={currentUser}
        comments={comments}
        setComments={setComments}
        publicNotes={publicNotes}
        setPublicNotes={setPublicNotes}
        privateNotes={privateNotes}
        setPrivateNotes={setPrivateNotes}
        onSavePrivateNotes={handleSavePrivateNotes}
        privateNotesSaved={privateNotesSaved}
        onDownloadStudySheet={handleDownloadStudySheet}
      />

      {/* ── Quick Problem Jumper Modal Overlay ── */}
      {showJumper && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs">
          <div className="fixed inset-0" onClick={() => setShowJumper(false)} />
          <div className="relative w-full max-w-md bg-[var(--board-raised)] border border-[var(--line-strong)] rounded-xl shadow-2xl z-10 overflow-hidden fade-in">
            <div className="p-3 border-b border-[var(--line)] flex items-center gap-2">
              <Search className="w-4 h-4 text-[var(--chalk-dim)] shrink-0" />
              <input
                type="text"
                value={jumperSearch}
                onChange={(e) => setJumperSearch(e.target.value)}
                placeholder="Search problems by name, ID, category..."
                className="bg-transparent text-xs text-[var(--chalk)] placeholder-[var(--chalk-faint)] focus:outline-none w-full font-mono"
                autoFocus
              />
              {jumperSearch && (
                <button
                  type="button"
                  onClick={() => setJumperSearch('')}
                  className="text-[var(--chalk-faint)] hover:text-[var(--chalk)]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div className="overflow-y-auto max-h-72 divide-y divide-[var(--line)] font-mono text-[11px]">
              {filteredJumperQuestions.length === 0 ? (
                <div className="p-6 text-center text-xs text-[var(--chalk-faint)]">No matching problems found</div>
              ) : (
                filteredJumperQuestions.map((q) => (
                  <div
                    key={q.id}
                    onClick={() => {
                      if (onNavigateQuestion) onNavigateQuestion(q);
                      setShowJumper(false);
                    }}
                    className={`px-3.5 py-2.5 flex items-center justify-between gap-2 cursor-pointer transition ${
                      q.id === question.id
                        ? 'bg-indigo-500/15 text-indigo-400 font-semibold'
                        : 'hover:bg-[var(--board-raised-2)] text-[var(--chalk-dim)]'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-indigo-400 shrink-0">#{q.display_id || q.leetcode_id || 'DSA'}</span>
                      <span className="truncate">{q.title}</span>
                    </div>
                    <span
                      className={`text-[10px] shrink-0 ${
                        q.difficulty === 'Easy'
                          ? 'text-emerald-400'
                          : q.difficulty === 'Medium'
                          ? 'text-amber-400'
                          : 'text-rose-400'
                      }`}
                    >
                      {q.difficulty}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Modals ── */}
      {showUploader && (
        <VisualizerUploader
          question={question}
          solutions={solutions}
          onUploadSuccess={handleUploadSuccess}
          onClose={() => {
            setShowUploader(false);
            setPreloadedUploadCode('');
          }}
          userId={currentUser?.id}
          initialCode={preloadedUploadCode}
        />
      )}

      <ReportSolutionModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        question={question}
        currentTier={activeTier}
        activeLanguage="cpp"
        currentUser={currentUser}
      />

      <AiQuestionEnhancerModal
        isOpen={showEnhanceModal}
        onClose={() => setShowEnhanceModal(false)}
        question={question}
        solutions={solutions}
        onQuestionUpdated={(updated) => {
          if (onUpdateQuestion) onUpdateQuestion(updated);
        }}
      />

      <KeyboardShortcutsModal
        isOpen={showShortcutsModal}
        onClose={() => setShowShortcutsModal(false)}
      />

      {/* ── 3. Fullscreen Theater Mode Overlay ── */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-[var(--bg-base)] flex flex-col overflow-hidden animate-fadeIn">
          {/* Top Fullscreen Control Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-[var(--board-raised)] border-b border-[var(--line)] shrink-0 shadow-md">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="btn-secondary h-8 px-3 text-xs flex items-center gap-1.5 cursor-pointer text-amber-300 hover:text-white font-medium"
                title="Exit Fullscreen (Esc or F)"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Exit Fullscreen</span>
              </button>
              <div className="h-4 w-[1px] bg-[var(--line)] hidden sm:block" />
              <h3 className="text-sm font-semibold text-[var(--chalk)] truncate max-w-md hidden sm:block">
                {question.title}
              </h3>
              <span className="text-xs font-mono text-[var(--chalk-dim)] hidden md:inline">
                · Step {currentStep + 1} of {maxSteps}
              </span>
            </div>

            {/* Approach Selector & Zoom Controls */}
            <div className="flex items-center gap-3">
              <div className="segmented-control scale-90">
                {[
                  { id: 'intuitive', label: 'Brute' },
                  { id: 'better', label: 'Better' },
                  { id: 'optimal', label: 'Optimal' }
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => handleSelectTier(tier.id)}
                    className={`segmented-item ${activeTier === tier.id ? 'active' : ''}`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-1 bg-[var(--board)] border border-[var(--line)] rounded-md px-1.5 py-1">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(0.5, Math.round((z - 0.1) * 10) / 10))}
                  className="p-1 hover:text-[var(--chalk)] text-[var(--chalk-dim)] transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono font-semibold px-1 text-[var(--chalk)] min-w-[42px] text-center select-none">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(1.8, Math.round((z + 0.1) * 10) / 10))}
                  className="p-1 hover:text-[var(--chalk)] text-[var(--chalk-dim)] transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                {zoomLevel !== 1 && (
                  <button
                    type="button"
                    onClick={() => setZoomLevel(1)}
                    className="text-[10px] font-mono text-indigo-400 hover:underline px-1 cursor-pointer"
                    title="Reset Zoom to 100%"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Center Canvas Area (Scrollable / Pannable with Scaling) */}
          <div className="flex-1 w-full overflow-auto p-4 sm:p-8 flex items-center justify-center bg-[var(--bg-base)]">
            <div
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'top center',
                transition: 'transform 0.15s ease'
              }}
              className="w-full max-w-6xl min-w-[650px] flex items-center justify-center"
            >
              {Component && (
                <Component
                  currentStep={currentStep}
                  onStepChange={setCurrentStep}
                  customInput={customInput}
                  customTarget={customTarget}
                  activeTier={activeTier}
                  approachTier={activeTier}
                  tier={activeTier}
                  currentStepData={currentStepData}
                  question={question}
                />
              )}
            </div>
          </div>

          {/* Floating Bottom Transport HUD */}
          <div className="p-3 bg-[var(--board)] border-t border-[var(--line)] flex justify-center shrink-0 shadow-lg">
            <StudioTransportHud
              isPlaying={isPlaying}
              currentStep={currentStep}
              maxSteps={maxSteps}
              speed={speed}
              loop={loop}
              onTogglePlay={togglePlay}
              onPrevStep={handlePrevStep}
              onNextStep={handleNextStep}
              onReset={handleReset}
              onStepChange={setCurrentStep}
              onSpeedChange={setSpeed}
              onToggleLoop={() => setLoop(!loop)}
              onOpenShortcuts={() => setShowShortcutsModal(true)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
