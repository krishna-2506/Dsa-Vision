import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Repeat,
  ExternalLink,
  Save,
  Check,
  Clock,
  Cpu,
  BookOpen,
  Download,
  Layers,
  Sparkles,
  HelpCircle,
  UploadCloud,
  FileCode,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Search,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../services/audio';
import { visualizersRegistry } from '../visualizers';
import { api } from '../services/api';
import CodeViewer from './CodeViewer';
import VisualizerUploader from './VisualizerUploader';

function formatComplexity(text, maxChars = 32) {
  if (!text) return 'O(1)';
  let cleaned = String(text).replace(/^[-:=*#\s]+/, '').replace(/[*\/#\s]+$/, '').trim();
  cleaned = cleaned.replace(/^(?:time|space)\s*complexity\s*[:=-]\s*/i, '').replace(/^(?:time|space)\s*[:=-]\s*/i, '').trim();
  if (cleaned.length <= maxChars) return cleaned;
  return cleaned.slice(0, maxChars).trim() + '...';
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
  const visualizerEntry = visualizersRegistry[currentKey] || null;
  const Component = visualizerEntry?.Component || null;
  const stepsList = visualizerEntry?.steps || null;
  const maxSteps = stepsList?.length || 6;
  const hasVisualizer = Boolean(Component);

  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [loop, setLoop] = useState(false);
  const [notes, setNotes] = useState(question.notes || '');
  const [notesSaved, setNotesSaved] = useState(false);
  const [solutions, setSolutions] = useState({});
  // Open full visualizer 1st; if no visualizer, have code available 1st; only split if user clicks Split
  const [viewMode, setViewMode] = useState(hasVisualizer ? 'visualizer_only' : 'code_only');
  const [showUploader, setShowUploader] = useState(false);
  const [showApproach, setShowApproach] = useState(false);
  const [showJumper, setShowJumper] = useState(false);
  const [jumperSearch, setJumperSearch] = useState('');

  // Find index and previous / next questions
  const currentIndex = questions ? questions.findIndex((q) => q.id === question.id) : -1;
  const prevQuestion = currentIndex > 0 ? questions[currentIndex - 1] : null;
  const nextQuestion =
    currentIndex >= 0 && currentIndex < questions.length - 1 ? questions[currentIndex + 1] : null;

  // Filter questions in the quick jumper dropdown
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

  const timerRef = useRef(null);

  // Sync mode when question changes
  useEffect(() => {
    const hasComponent = Boolean(visualizersRegistry[question.component_key || question.componentKey]);
    setViewMode(hasComponent ? 'visualizer_only' : 'code_only');
    setShowApproach(false);
    setShowUploader(false);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [question.id, question.component_key, question.componentKey]);

  // Active step data
  const currentStepData = stepsList ? stepsList[currentStep] : null;
  const activeCodeLine = currentStepData?.codeLine || null;

  // Load solutions from SQLite
  useEffect(() => {
    let isMounted = true;
    api.getCodeSolutions(question.id).then((data) => {
      if (isMounted && data) {
        setSolutions(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [question.id]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if ((e.altKey && e.code === 'ArrowRight') || e.key === ']') {
        // Next problem shortcut
        if (nextQuestion && onNavigateQuestion) {
          e.preventDefault();
          onNavigateQuestion(nextQuestion);
        }
      } else if ((e.altKey && e.code === 'ArrowLeft') || e.key === '[') {
        // Previous problem shortcut
        if (prevQuestion && onNavigateQuestion) {
          e.preventDefault();
          onNavigateQuestion(prevQuestion);
        }
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNextStep();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrevStep();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, maxSteps, isPlaying, prevQuestion, nextQuestion, onNavigateQuestion]);

  // Playback timer
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = 2000 / speed;
      timerRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < maxSteps - 1) {
            sound.playStep(520 + (prev + 1) * 30);
            return prev + 1;
          } else {
            if (loop) {
              sound.playStep(450);
              return 0;
            } else {
              setIsPlaying(false);
              triggerCompletionCelebration();
              return prev;
            }
          }
        });
      }, intervalMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speed, loop, maxSteps]);

  const triggerCompletionCelebration = () => {
    sound.playComplete();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleNextStep = () => {
    if (currentStep < maxSteps - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      sound.playStep(520 + next * 30);
      if (next === maxSteps - 1) {
        triggerCompletionCelebration();
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      sound.playPrev();
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    sound.playReset();
  };

  const togglePlay = () => {
    if (currentStep >= maxSteps - 1) {
      setCurrentStep(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleSaveNotes = async () => {
    await api.saveNotes(question.id, notes);
    onUpdateQuestion({ ...question, notes });
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  };

  const handleDownloadStudySheet = () => {
    window.open(`/api/export/${encodeURIComponent(question.id)}`, '_blank');
  };

  const handleUploadSuccess = (newKey) => {
    onUpdateQuestion({ ...question, component_key: newKey });
    setShowUploader(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
      {/* 🧭 Question Navigator Bar (Previous, Next & Quick Jumper) */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 bg-[#0e111a] border border-white/[0.08] p-2.5 sm:px-4 rounded-xl shadow-xl">
        {/* Previous Question */}
        <button
          onClick={() => prevQuestion && onNavigateQuestion && onNavigateQuestion(prevQuestion)}
          disabled={!prevQuestion}
          className="flex items-center gap-2 h-9 px-3 rounded-lg bg-white/[0.03] hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-slate-300 hover:text-white border border-white/5 text-xs font-mono transition group"
          title={prevQuestion ? `Previous: #${prevQuestion.display_id} ${prevQuestion.title} (Shortcut: [ or Alt+Left)` : 'First problem'}
        >
          <ChevronLeft className="w-4 h-4 text-indigo-400 group-hover:-translate-x-0.5 transition-transform" />
          <div className="flex items-center gap-1.5 text-left">
            <span className="font-bold text-slate-200">Prev</span>
            {prevQuestion && (
              <span className="hidden sm:inline text-slate-400 max-w-[130px] truncate">
                #{prevQuestion.display_id}
              </span>
            )}
          </div>
        </button>

        {/* Center: Quick Problem Jumper & Counter */}
        <div className="relative">
          <button
            onClick={() => setShowJumper(!showJumper)}
            className="flex items-center gap-2 h-9 px-3.5 rounded-lg bg-[#08090e] hover:bg-white/5 border border-white/10 text-xs font-mono text-slate-200 hover:text-white transition shadow-inner"
            title="Jump to any problem in Striver's Sheet"
          >
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span className="font-bold text-indigo-400">#{question.display_id || 'Q'}</span>
            <span className="text-slate-400 hidden xs:inline">
              Problem {currentIndex >= 0 ? currentIndex + 1 : 1} of {questions.length || 369}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${showJumper ? 'rotate-180' : ''}`} />
          </button>

          {/* Quick Jumper Dropdown Menu */}
          {showJumper && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowJumper(false)}
              />
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-80 sm:w-96 bg-[#0e111a] border border-white/15 rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in fade-in duration-150">
                <div className="p-3 border-b border-white/5 bg-[#090b10] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1 bg-[#08090e] px-2.5 py-1.5 rounded-lg border border-white/5">
                    <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      value={jumperSearch}
                      onChange={(e) => setJumperSearch(e.target.value)}
                      placeholder="Search Q-001, title, category..."
                      className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-full font-mono"
                      autoFocus
                    />
                    {jumperSearch && (
                      <button onClick={() => setJumperSearch('')} className="text-slate-500 hover:text-white">
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => setShowJumper(false)}
                    className="p-1 rounded text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="overflow-y-auto max-h-72 divide-y divide-white/5 font-mono text-xs">
                  {filteredJumperQuestions.length === 0 ? (
                    <div className="p-4 text-center text-slate-500 text-xs">
                      No matching problems found
                    </div>
                  ) : (
                    filteredJumperQuestions.map((q) => {
                      const isCurrent = q.id === question.id;
                      return (
                        <div
                          key={q.id}
                          onClick={() => {
                            if (onNavigateQuestion) onNavigateQuestion(q);
                            setShowJumper(false);
                          }}
                          className={`p-2.5 flex items-center justify-between gap-2 cursor-pointer transition ${
                            isCurrent
                              ? 'bg-indigo-600/20 text-white font-bold'
                              : 'hover:bg-white/5 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-indigo-400 shrink-0 font-bold">
                              #{q.display_id || q.leetcode_id}
                            </span>
                            <span className="truncate text-slate-200">{q.title}</span>
                          </div>
                          <span
                            className={`text-[10px] uppercase font-bold px-1.5 py-0.2 rounded border shrink-0 ${
                              q.difficulty === 'Easy'
                                ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                                : q.difficulty === 'Medium'
                                ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                                : 'text-rose-400 bg-rose-500/10 border-rose-500/20'
                            }`}
                          >
                            {q.difficulty}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Next Question */}
        <button
          onClick={() => nextQuestion && onNavigateQuestion && onNavigateQuestion(nextQuestion)}
          disabled={!nextQuestion}
          className="flex items-center gap-2 h-9 px-3 rounded-lg bg-white/[0.03] hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-slate-300 hover:text-white border border-white/5 text-xs font-mono transition group"
          title={nextQuestion ? `Next: #${nextQuestion.display_id} ${nextQuestion.title} (Shortcut: ] or Alt+Right)` : 'Last problem'}
        >
          <div className="flex items-center gap-1.5 text-right">
            {nextQuestion && (
              <span className="hidden sm:inline text-slate-400 max-w-[130px] truncate">
                #{nextQuestion.display_id}
              </span>
            )}
            <span className="font-bold text-slate-200">Next</span>
          </div>
          <ChevronRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Studio Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0e111a] border border-white/[0.08] p-4 sm:p-5 rounded-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="h-8 w-8 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 border border-white/5 transition"
            title="Return to library"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div>
            <div className="flex items-center gap-2 mb-1">
              {question.display_id && (
                <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-[4px] border border-indigo-500/25">
                  #{question.display_id}
                </span>
              )}
              {question.leetcode_id && question.leetcode_id !== question.display_id && (
                <span className="font-mono text-xs font-bold text-slate-300 bg-white/5 px-2 py-0.5 rounded-[4px] border border-white/10">
                  LC #{question.leetcode_id}
                </span>
              )}
              <span
                className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px] border ${
                  question.difficulty === 'Easy'
                    ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                    : question.difficulty === 'Medium'
                    ? 'text-amber-400 bg-amber-500/10 border-amber-500/30'
                    : 'text-rose-400 bg-rose-500/10 border-rose-500/30'
                }`}
              >
                {question.difficulty}
              </span>
              <span className="text-xs font-mono text-slate-400">{question.category}</span>
              {question.tags && question.tags.length > 0 && (
                <div className="hidden sm:flex items-center gap-1.5 ml-1">
                  {question.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono text-indigo-300 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <h1 className="text-lg sm:text-xl font-mono font-bold text-white tracking-tight">{question.title}</h1>
          </div>
        </div>

        {/* Complexity, Status, View mode toggles */}
        <div className="flex items-center gap-2.5 flex-wrap font-mono text-xs">
          {/* Complexity HUD - Separate lines with ellipsis */}
          <div className="flex flex-col gap-1 bg-[#08090e] px-3 py-1.5 rounded-lg border border-white/5 text-[11px] font-mono min-w-[140px]">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-indigo-400 shrink-0" />
              <span className="text-slate-400 shrink-0">Time:</span>
              <span className="text-indigo-300 font-semibold truncate max-w-[170px] sm:max-w-xs" title={question.time_complexity}>
                {formatComplexity(question.time_complexity, 32)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 border-t border-white/5 pt-1">
              <Cpu className="w-3 h-3 text-indigo-400 shrink-0" />
              <span className="text-slate-400 shrink-0">Space:</span>
              <span className="text-indigo-300 font-semibold truncate max-w-[170px] sm:max-w-xs" title={question.space_complexity}>
                {formatComplexity(question.space_complexity, 32)}
              </span>
            </div>
          </div>

          <select
            value={question.status || 'to_learn'}
            onChange={(e) => onStatusChange(question.id, e.target.value)}
            className="px-2.5 py-1.5 bg-[#08090e] border border-white/10 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="to_learn">To Learn</option>
            <option value="in_progress">In Progress</option>
            <option value="mastered">Mastered</option>
          </select>

          {/* Toggle Uploader vs Live Visualizer */}
          <button
            onClick={() => setShowUploader(!showUploader)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition ${
              showUploader
                ? 'bg-indigo-600 text-white border-indigo-500 font-semibold'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
            }`}
            title="Upload or replace visualizer code"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>{showUploader ? 'Viewing Uploader' : 'Upload Visualizer'}</span>
          </button>

          {/* Split / Visualizer / Code Toggle */}
          <div className="flex items-center bg-[#08090e] p-0.5 rounded-lg border border-white/5">
            <button
              onClick={() => setViewMode('split')}
              className={`px-2.5 py-1 rounded text-xs transition ${
                viewMode === 'split' ? 'bg-indigo-600/30 text-indigo-300 font-semibold border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Split
            </button>
            <button
              onClick={() => setViewMode('visualizer_only')}
              className={`px-2.5 py-1 rounded text-xs transition ${
                viewMode === 'visualizer_only' ? 'bg-indigo-600/30 text-indigo-300 font-semibold border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Visualizer
            </button>
            <button
              onClick={() => setViewMode('code_only')}
              className={`px-2.5 py-1 rounded text-xs transition ${
                viewMode === 'code_only' ? 'bg-indigo-600/30 text-indigo-300 font-semibold border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Code
            </button>
          </div>

          {question.leetcode_url && (
            <a
              href={question.leetcode_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 font-medium transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>LeetCode</span>
            </a>
          )}
        </div>
      </div>

      {/* Problem Statement Box with Collapsible Approach & Intuition */}
      <div className="bg-[#0e111a] border border-white/[0.08] rounded-xl p-4 sm:p-5 space-y-3 shadow-xl">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-indigo-400" />
            <span>Problem Statement & Examples</span>
          </div>

          {/* Toggle for Intuition & Approach so user is not spoiled straight away */}
          <button
            onClick={() => setShowApproach(!showApproach)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-mono font-medium transition ${
              showApproach
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>{showApproach ? 'Hide Approach & Intuition' : '💡 Show Approach & Intuition'}</span>
          </button>
        </div>

        <div className="text-xs text-slate-300 font-sans leading-relaxed whitespace-pre-wrap max-h-36 overflow-y-auto pr-1">
          {question.description || 'No question description available.'}
        </div>

        {/* Collapsible Approach & Intuition */}
        {showApproach && (
          <div className="border-t border-white/5 pt-3 mt-2">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider mb-2">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Algorithm Approach & Intuition</span>
            </div>
            <div className="text-xs text-slate-300 font-sans leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto pr-1 bg-[#090b10] p-3 rounded-lg border border-amber-500/20">
              {question.approach || 'Standard optimal algorithm from Striver A2Z Sheet.'}
            </div>
          </div>
        )}
      </div>

      {/* Upload Zone (Visible if active or if component is missing) */}
      {showUploader ? (
        <VisualizerUploader
          question={question}
          solutions={solutions}
          onUploadSuccess={handleUploadSuccess}
        />
      ) : (
        <>
          {/* Playback Toolbar (only if visualizer component exists) */}
          {Component ? (
            <div className="bg-[#0e111a] border border-white/[0.08] rounded-xl p-3 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-white/5 transition"
                  title="Reset (R)"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={handlePrevStep}
                  disabled={currentStep === 0}
                  className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-white/5 disabled:opacity-30 transition"
                  title="Previous Step (Left Arrow)"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={togglePlay}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded text-xs font-bold text-white shadow transition ${
                    isPlaying ? 'bg-amber-600 hover:bg-amber-500' : 'bg-indigo-600 hover:bg-indigo-500'
                  }`}
                  title="Play / Pause (Spacebar)"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  <span>{isPlaying ? 'Pause' : 'Play'}</span>
                </button>

                <button
                  onClick={handleNextStep}
                  disabled={currentStep >= maxSteps - 1}
                  className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-white/5 disabled:opacity-30 transition"
                  title="Next Step (Right Arrow)"
                >
                  <SkipForward className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setLoop(!loop)}
                  className={`p-1.5 rounded transition ${
                    loop ? 'text-indigo-400 bg-indigo-500/15 border border-indigo-500/30' : 'text-slate-500 hover:text-slate-300'
                  }`}
                  title={loop ? 'Looping active' : 'Enable loop'}
                >
                  <Repeat className="w-4 h-4" />
                </button>
              </div>

              {/* Scrubber pills */}
              <div className="flex items-center gap-1 overflow-x-auto max-w-full py-0.5">
                {Array.from({ length: maxSteps }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentStep(idx);
                      sound.playStep(500 + idx * 30);
                      if (idx === maxSteps - 1) triggerCompletionCelebration();
                    }}
                    className={`w-6 h-6 rounded text-[11px] font-bold transition-all ${
                      currentStep === idx
                        ? 'bg-indigo-600 text-white shadow scale-105'
                        : idx < currentStep
                        ? 'bg-white/10 text-slate-300 hover:bg-white/15'
                        : 'bg-[#08090e] text-slate-600 border border-white/5 hover:text-slate-400'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              {/* Speed */}
              <div className="flex items-center gap-0.5 bg-[#08090e] p-0.5 rounded-lg border border-white/5">
                {[0.5, 1, 1.5, 2].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    className={`px-2 py-0.5 rounded text-xs transition ${
                      speed === s ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-[#0e111a] border border-white/[0.08] rounded-xl p-3 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                <span>Code solution view active • Visualizer not uploaded yet</span>
              </div>
              <button
                onClick={() => setShowUploader(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition text-xs font-semibold"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Upload Visualizer with Gemini</span>
              </button>
            </div>
          )}

          {/* Main Visualizer + Code Studio Split Area */}
          <div className={`grid gap-6 ${viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'}`}>
            {/* Visualizer Canvas */}
            {viewMode !== 'code_only' && (
              <div className={viewMode === 'split' ? 'lg:col-span-7' : 'w-full'}>
                {Component ? (
                  <Component currentStep={currentStep} onStepChange={setCurrentStep} />
                ) : (
                  <div className="bg-[#0e111a] border border-white/10 rounded-xl p-12 text-center space-y-3">
                    <Layers className="w-8 h-8 text-slate-600 mx-auto" />
                    <h3 className="text-sm font-bold text-white">Visualizer Not Found</h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      Click below to generate with Gemini and upload the visualizer!
                    </p>
                    <button
                      onClick={() => setShowUploader(true)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-medium rounded-lg shadow transition"
                    >
                      Upload Visualizer for This Problem
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Code Solution with Synchronized Active Line */}
            {viewMode !== 'visualizer_only' && (
              <div className={viewMode === 'split' ? 'lg:col-span-5' : 'w-full'}>
                <CodeViewer
                  solutions={solutions}
                  initialLanguage="cpp"
                  activeLine={activeCodeLine}
                />
              </div>
            )}
          </div>
        </>
      )}

      {/* Engineering Lab Notebook (Persistent in SQLite) */}
      <div className="notebook-grid border border-amber-500/25 rounded-xl p-5 shadow-2xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-amber-400 rounded-sm"></span>
            <span className="font-mono text-xs font-bold text-amber-300 uppercase tracking-wider">
              Engineering Lab Notes & Key Invariants
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadStudySheet}
              className="flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 rounded text-xs font-mono transition"
              title="Download Markdown Study Sheet for college exam revision"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span>Export Study Sheet (.md)</span>
            </button>

            <button
              onClick={handleSaveNotes}
              className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded text-xs font-mono font-medium transition"
            >
              {notesSaved ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Save className="w-3.5 h-3.5" />}
              <span>{notesSaved ? 'Saved to SQLite' : 'Save Notes'}</span>
            </button>
          </div>
        </div>

        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Document the core loop invariants, memory bounds, base case subtleties, or interview tips..."
          className="w-full p-3.5 bg-[#08090e]/80 border border-white/10 rounded-lg text-xs text-slate-200 font-mono focus:outline-none focus:border-amber-500/50 leading-relaxed transition resize-y"
        />

        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Persistent in local SQLite database (`data/algovision.sqlite`)</span>
          <span className="text-amber-400/80">Press 'Save Notes' to commit</span>
        </div>
      </div>

      {/* Visualizer Uploader Modal */}
      {showUploader && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto my-auto">
            <VisualizerUploader
              question={question}
              solutions={solutions}
              onUploadSuccess={handleUploadSuccess}
              onClose={() => setShowUploader(false)}
              userId={currentUser?.id}
            />
          </div>
        </div>
      )}
    </div>
  );
}
