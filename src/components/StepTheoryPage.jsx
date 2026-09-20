import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Sparkles,
  ExternalLink,
  ListOrdered,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Save,
  Check,
  RotateCcw,
  Clock,
  Layers,
  Code2,
  Share2
} from 'lucide-react';
import { getStepTheory } from '../data/stepTheories';
import { STRIVER_STEPS } from '../services/db';
import { visualizersRegistry } from '../visualizers';
import { sound } from '../services/audio';

function YoutubeIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

export default function StepTheoryPage({
  stepNo = 1,
  questions = [],
  onBack,
  onOpenQuestion,
  onLaunchStudio,
  onSelectStep
}) {
  const [activeTab, setActiveTab] = useState('notes'); // 'notes' | 'videos' | 'visualizer' | 'articles' | 'problems'
  const currentStepInfo = STRIVER_STEPS.find((s) => s.step_no === stepNo) || {
    step_no: stepNo,
    title: `Step ${stepNo}`
  };

  const theory = useMemo(
    () => getStepTheory(stepNo, currentStepInfo.title),
    [stepNo, currentStepInfo.title]
  );

  // Active YouTube video in the video player
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const activeVideo = theory.videos?.[activeVideoIdx] || theory.videos?.[0];

  // User Custom Notes State (Persisted in localStorage)
  const storageKey = `algovision_custom_theory_step_${stepNo}`;
  const [userNotes, setUserNotes] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved !== null ? saved : theory.defaultNotes;
    } catch (_) {
      return theory.defaultNotes;
    }
  });
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notesSavedAlert, setNotesSavedAlert] = useState(false);

  // Sync notes when stepNo changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`algovision_custom_theory_step_${stepNo}`);
      setUserNotes(saved !== null ? saved : theory.defaultNotes);
    } catch (_) {
      setUserNotes(theory.defaultNotes);
    }
    setIsEditingNotes(false);
    setActiveVideoIdx(0);
  }, [stepNo, theory.defaultNotes]);

  const handleSaveNotes = () => {
    try {
      localStorage.setItem(storageKey, userNotes);
      setNotesSavedAlert(true);
      setIsEditingNotes(false);
      sound?.playSuccess?.();
      setTimeout(() => setNotesSavedAlert(false), 2500);
    } catch (e) {
      console.error('Failed to save theory notes', e);
    }
  };

  const handleResetNotes = () => {
    if (window.confirm('Reset theory notes back to default?')) {
      setUserNotes(theory.defaultNotes);
      localStorage.removeItem(storageKey);
      sound?.playStep?.(500);
    }
  };

  // Questions in this step
  const stepQuestions = useMemo(() => {
    return questions.filter((q) => q.step_no === stepNo);
  }, [questions, stepNo]);

  const masteredCount = stepQuestions.filter((q) => q.status === 'mastered').length;

  // Foundational Visualizer Component for this step
  const VisualizerComponent = visualizersRegistry[theory.visualizerKey] || null;

  // Step Switcher (Prev / Next)
  const currentStepIdx = STRIVER_STEPS.findIndex((s) => s.step_no === stepNo);
  const prevStep = currentStepIdx > 0 ? STRIVER_STEPS[currentStepIdx - 1] : null;
  const nextStep = currentStepIdx < STRIVER_STEPS.length - 1 ? STRIVER_STEPS[currentStepIdx + 1] : null;

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
      {/* ── Top Sticky Header ── */}
      <div className="sticky top-0 z-30 bg-[#0a0907]/90 backdrop-blur-md border-b border-[var(--border-subtle)] px-4 sm:px-6 py-3">
        <div className="max-w-[1300px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Left: Back button & Step Title */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => {
                sound?.playStep?.(480);
                onBack();
              }}
              className="p-2 rounded-lg bg-[var(--bg-surface)] hover:bg-[rgba(255,248,230,0.06)] border border-[var(--border-subtle)] text-[var(--text-body)] hover:text-[var(--text-primary)] transition-colors cursor-pointer shrink-0"
              title="Back to problem sheet"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
                <span className="px-2 py-0.5 rounded-md bg-[rgba(212,160,60,0.1)] text-[var(--accent)] font-semibold border border-[var(--border-accent)]/30">
                  STEP {String(stepNo).padStart(2, '0')}
                </span>
                <span className="text-[var(--text-tertiary)]">·</span>
                <span className="text-[var(--text-muted)]">Theory &amp; Concept Hub</span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-[var(--text-primary)] tracking-tight truncate pt-0.5">
                {theory.title}
              </h1>
            </div>
          </div>

          {/* Right: Step Switcher & Question Stats */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-muted)]">
              <span>Progress:</span>
              <strong className="text-[var(--text-primary)]">{masteredCount}</strong>
              <span>/ {stepQuestions.length}</span>
            </div>

            <div className="flex items-center gap-1 bg-[var(--bg-surface)] p-1 rounded-lg border border-[var(--border-subtle)]">
              <button
                onClick={() => {
                  if (prevStep && onSelectStep) {
                    sound?.playStep?.(500);
                    onSelectStep(prevStep.step_no);
                  }
                }}
                disabled={!prevStep}
                className="p-1.5 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-30 disabled:hover:text-[var(--text-muted)] cursor-pointer"
                title={prevStep ? `Go to Step ${prevStep.step_no}: ${prevStep.title}` : 'First step'}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-xs font-mono px-2 text-[var(--text-body)]">
                {stepNo} / {STRIVER_STEPS.length}
              </span>

              <button
                onClick={() => {
                  if (nextStep && onSelectStep) {
                    sound?.playStep?.(540);
                    onSelectStep(nextStep.step_no);
                  }
                }}
                disabled={!nextStep}
                className="p-1.5 rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-30 disabled:hover:text-[var(--text-muted)] cursor-pointer"
                title={nextStep ? `Go to Step ${nextStep.step_no}: ${nextStep.title}` : 'Last step'}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Workspace Container ── */}
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* ── Tabbed Navigation Bar (Eliminates awkward endless scrolling) ── */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-[var(--border-subtle)] pb-2 scrollbar-none text-xs font-mono">
          {[
            { id: 'notes', label: 'Concept Notes', icon: BookOpen, count: null },
            { id: 'videos', label: 'Video Lectures', icon: YoutubeIcon, count: theory.videos?.length || 0 },
            { id: 'visualizer', label: 'Visual Intuition', icon: Sparkles, count: null },
            { id: 'articles', label: 'Articles & Links', icon: ExternalLink, count: theory.articles?.length || 0 },
            { id: 'problems', label: 'Step Problems', icon: ListOrdered, count: stepQuestions.length }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound?.playStep?.(600);
                  setActiveTab(tab.id);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[var(--bg-surface)] text-[var(--accent)] font-semibold border border-[var(--border-medium)] shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-body)] hover:bg-[rgba(255,248,230,0.03)]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`} />
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-[var(--accent)]/15 text-[var(--accent-bright)]' : 'bg-[rgba(255,248,230,0.06)] text-[var(--text-tertiary)]'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── TAB 1: CONCEPT NOTES & EDITABLE OUR THEORY NOTES ── */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            {/* Overview & Key Patterns Banner */}
            <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-[var(--accent)] font-semibold uppercase tracking-wider">
                  Conceptual Overview
                </span>
                <p className="text-sm sm:text-base text-[var(--text-body)] leading-relaxed">
                  {theory.overview}
                </p>
              </div>

              {/* Core Algorithmic Patterns */}
              {theory.keyPatterns && theory.keyPatterns.length > 0 && (
                <div className="pt-2 border-t border-[var(--border-subtle)] space-y-2">
                  <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider block">
                    Core Algorithmic Patterns &amp; Invariants
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    {theory.keyPatterns.map((pattern, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-primary)]"
                      >
                        ✓ {pattern}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Time & Space Complexity Cheatsheet Table */}
            {theory.complexityCheatsheet && theory.complexityCheatsheet.length > 0 && (
              <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] overflow-hidden">
                <div className="px-5 py-3.5 border-b border-[var(--border-subtle)] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[var(--accent)]" />
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                      Standard Operations Complexity Cheatsheet
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-[var(--text-tertiary)]">Asymptotic Bounds</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-[rgba(255,248,230,0.02)] text-[var(--text-muted)] border-b border-[var(--border-subtle)]">
                      <tr>
                        <th className="px-5 py-2.5 font-medium">Operation / Algorithm</th>
                        <th className="px-5 py-2.5 font-medium">Time Complexity</th>
                        <th className="px-5 py-2.5 font-medium">Space Complexity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-subtle)]">
                      {theory.complexityCheatsheet.map((row, idx) => (
                        <tr key={idx} className="hover:bg-[rgba(255,248,230,0.02)] transition-colors">
                          <td className="px-5 py-3 text-[var(--text-primary)] font-semibold">{row.operation}</td>
                          <td className="px-5 py-3 text-[var(--accent)]">{row.time}</td>
                          <td className="px-5 py-3 text-[var(--text-body)]">{row.space}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── Interactive "Our Custom Theory Notes" Section ── */}
            <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] overflow-hidden">
              <div className="px-5 py-3.5 border-b border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3 bg-[var(--bg-card)]">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-[var(--accent)]" />
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                    Our Theory &amp; Takeaway Notes
                  </h3>
                  {notesSavedAlert && (
                    <span className="text-[11px] font-mono text-[#3d9e5c] flex items-center gap-1 ml-2">
                      <Check className="w-3.5 h-3.5" />
                      <span>Saved!</span>
                    </span>
                  )}
                </div>

                {/* Edit & Save Controls */}
                <div className="flex items-center gap-2">
                  {isEditingNotes ? (
                    <>
                      <button
                        onClick={handleResetNotes}
                        className="btn-secondary h-7 px-2.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                        title="Reset notes back to default"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset</span>
                      </button>
                      <button
                        onClick={handleSaveNotes}
                        className="btn-primary h-7 px-3 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <Save className="w-3 h-3" />
                        <span>Save Notes</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditingNotes(true)}
                      className="btn-secondary h-7 px-3 text-xs flex items-center gap-1.5"
                      title="Edit this step's theory notes"
                    >
                      <Edit3 className="w-3 h-3 text-[var(--accent)]" />
                      <span>Edit Theory</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="p-5">
                {isEditingNotes ? (
                  <div className="space-y-2">
                    <textarea
                      value={userNotes}
                      onChange={(e) => setUserNotes(e.target.value)}
                      placeholder="Write your step theory, invariants, edge cases, and personal takeaways here (Markdown supported)..."
                      className="w-full h-80 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs sm:text-sm font-mono text-[var(--text-primary)] leading-relaxed focus:outline-none focus:border-[var(--accent)] resize-y"
                    />
                    <div className="text-[11px] font-mono text-[var(--text-tertiary)] flex items-center justify-between">
                      <span>Markdown syntax supported. Click 'Save Notes' to persist your changes.</span>
                      <span>{userNotes.length} characters</span>
                    </div>
                  </div>
                ) : (
                  <div className="prose prose-invert max-w-none text-xs sm:text-sm font-sans text-[var(--text-body)] leading-relaxed whitespace-pre-wrap font-mono">
                    {userNotes}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: MULTI-VIDEO YOUTUBE LECTURES PLAYER ── */}
        {activeTab === 'videos' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left 8 Cols: Video Embed Player */}
              <div className="lg:col-span-8 space-y-3">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-[var(--border-subtle)] shadow-xl">
                  {activeVideo ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=0&rel=0`}
                      title={activeVideo.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-mono text-[var(--text-muted)]">
                      No video lectures configured for this step yet.
                    </div>
                  )}
                </div>

                {activeVideo && (
                  <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent)]">
                        <span>{activeVideo.channel}</span>
                        <span>·</span>
                        <span>{activeVideo.duration}</span>
                        {activeVideo.tag && (
                          <span className="px-1.5 py-0.2 rounded bg-[var(--accent)]/10 text-[var(--accent-bright)] text-[10px]">
                            {activeVideo.tag}
                          </span>
                        )}
                      </div>
                      <h2 className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                        {activeVideo.title}
                      </h2>
                    </div>

                    <a
                      href={`https://www.youtube.com/watch?v=${activeVideo.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary h-8 px-3 text-xs flex items-center gap-1.5 shrink-0"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Watch on YT</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Right 4 Cols: Lecture Playlist Selector */}
              <div className="lg:col-span-4 space-y-3">
                <div className="px-3 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                  <div className="flex items-center justify-between text-xs font-mono mb-2 pb-2 border-b border-[var(--border-subtle)]">
                    <span className="font-semibold text-[var(--text-primary)]">Step Lecture Playlist</span>
                    <span className="text-[var(--text-tertiary)]">{theory.videos?.length || 0} Lectures</span>
                  </div>

                  <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                    {(theory.videos || []).map((vid, idx) => {
                      const isSelected = activeVideoIdx === idx;
                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            sound?.playStep?.(580);
                            setActiveVideoIdx(idx);
                          }}
                          className={`p-3 rounded-xl border transition-all cursor-pointer select-none ${
                            isSelected
                              ? 'bg-[var(--bg-card)] border-[var(--border-accent)] shadow-sm'
                              : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-[var(--border-medium)]'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold ${
                              isSelected ? 'bg-[var(--accent)] text-black' : 'bg-[var(--bg-card)] text-[var(--text-muted)]'
                            }`}>
                              {idx + 1}
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className={`text-xs font-semibold line-clamp-2 leading-snug ${
                                isSelected ? 'text-[var(--text-primary)]' : 'text-[var(--text-body)]'
                              }`}>
                                {vid.title}
                              </h4>
                              <div className="flex items-center gap-2 mt-1 text-[10.5px] font-mono text-[var(--text-muted)]">
                                <span>{vid.channel}</span>
                                <span>·</span>
                                <span>{vid.duration}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 3: VISUAL INTUITION & ALGORITHM ANIMATION ── */}
        {activeTab === 'visualizer' && (
          <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] overflow-hidden">
            <div className="px-5 py-3 border-b border-[var(--border-subtle)] flex items-center justify-between bg-[var(--bg-card)]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                  Interactive Algorithm Animation &amp; State Inspection
                </h3>
              </div>
              <span className="text-xs font-mono text-[var(--text-tertiary)]">Step {stepNo} Core Visualizer</span>
            </div>

            <div className="p-6">
              {VisualizerComponent ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
                    <VisualizerComponent />
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-xs font-mono text-[var(--text-muted)] space-y-2">
                  <div>Select any problem from this step to launch its dedicated visualizer studio.</div>
                  <button
                    onClick={() => setActiveTab('problems')}
                    className="btn-primary h-8 px-4 text-xs mt-2"
                  >
                    View Step Problems
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TAB 4: ARTICLES & EXTERNAL REFERENCES ── */}
        {activeTab === 'articles' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(theory.articles || []).map((art, idx) => (
              <a
                key={idx}
                href={art.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-accent)] transition-all flex flex-col justify-between gap-4 cursor-pointer"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[var(--accent)] font-semibold">{art.source}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[var(--text-tertiary)] group-hover:text-[var(--accent)] transition-colors" />
                  </div>
                  <h4 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-bright)] transition-colors leading-snug">
                    {art.title}
                  </h4>
                </div>

                <div className="text-[11px] font-mono text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors flex items-center gap-1">
                  <span>Read Article</span>
                  <span>&rarr;</span>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* ── TAB 5: STEP PRACTICE PROBLEMS ── */}
        {activeTab === 'problems' && (
          <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[var(--border-subtle)] flex items-center justify-between bg-[var(--bg-card)]">
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                Problems in {theory.title} ({stepQuestions.length})
              </h3>
              <span className="text-xs font-mono text-[var(--text-tertiary)]">
                {masteredCount} of {stepQuestions.length} Mastered
              </span>
            </div>

            <div className="divide-y divide-[var(--border-subtle)]">
              {stepQuestions.map((q, idx) => {
                const diffColor =
                  q.difficulty === 'Hard'
                    ? 'text-[#b83c38]'
                    : q.difficulty === 'Medium'
                    ? 'text-[#d4a03c]'
                    : 'text-[#3d9e5c]';

                return (
                  <div
                    key={q.id || idx}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[rgba(255,248,230,0.02)] transition-colors"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className={`font-semibold ${diffColor}`}>{q.difficulty || 'Easy'}</span>
                        <span className="text-[var(--text-tertiary)]">·</span>
                        <span className="text-[var(--text-muted)]">{q.display_id || `LC-${q.leetcode_id}`}</span>
                        {q.substep_name && (
                          <>
                            <span className="text-[var(--text-tertiary)]">·</span>
                            <span className="text-[var(--text-tertiary)] truncate max-w-[200px]">{q.substep_name}</span>
                          </>
                        )}
                      </div>
                      <h4
                        onClick={() => {
                          sound?.playStep?.(520);
                          onOpenQuestion(q);
                        }}
                        className="text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors cursor-pointer truncate"
                      >
                        {q.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {q.leetcode_url && (
                        <a
                          href={q.leetcode_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                          title="LeetCode problem"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      <button
                        onClick={() => {
                          sound?.playStep?.(520);
                          onOpenQuestion(q);
                        }}
                        className="btn-secondary h-8 px-3 text-xs"
                      >
                        Solution
                      </button>

                      {onLaunchStudio && (
                        <button
                          onClick={() => {
                            sound?.playSuccess?.();
                            onLaunchStudio(q);
                          }}
                          className="btn-primary h-8 px-3 text-xs flex items-center gap-1.5 font-semibold"
                          title="Launch Visualizer Studio"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Visualize</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
