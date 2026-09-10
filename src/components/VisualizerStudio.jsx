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
  Lightbulb,
  UploadCloud,
  FileCode,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Search,
  X,
  MessageSquare,
  ThumbsUp,
  Send,
  Lock,
  Globe,
  Plus,
  Trash2,
  User
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
  const [solutions, setSolutions] = useState({});
  // Open full visualizer 1st; if no visualizer, have code available 1st; only split if user clicks Split
  const [viewMode, setViewMode] = useState(hasVisualizer ? 'visualizer_only' : 'code_only');
  const [showUploader, setShowUploader] = useState(false);
  const [showApproach, setShowApproach] = useState(false);
  const [showJumper, setShowJumper] = useState(false);
  const [jumperSearch, setJumperSearch] = useState('');
  const [copiedDirect, setCopiedDirect] = useState(false);

  // Discussion Comments, Public Notes & Private Notes State
  const [hubTab, setHubTab] = useState('comments'); // 'comments' | 'public_notes' | 'private_notes'
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [publicNotes, setPublicNotes] = useState([]);
  const [showAddPublicNote, setShowAddPublicNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [isPostingNote, setIsPostingNote] = useState(false);
  const [privateNotes, setPrivateNotes] = useState('');
  const [privateNotesSaved, setPrivateNotesSaved] = useState(false);

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

  // Sync mode and fetch comments & notes when question or user changes
  useEffect(() => {
    const hasComponent = Boolean(visualizersRegistry[question.component_key || question.componentKey]);
    setViewMode(hasComponent ? 'visualizer_only' : 'code_only');
    setShowApproach(false);
    setShowUploader(false);
    setCurrentStep(0);
    setIsPlaying(false);

    let isMounted = true;
    api.getCodeSolutions(question.id).then((data) => {
      if (isMounted && data) setSolutions(data);
    });
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
  }, [question.id, question.component_key, question.componentKey, currentUser?.id]);

  // Active step data
  const currentStepData = stepsList ? stepsList[currentStep] : null;
  const activeCodeLine = currentStepData?.codeLine || null;

  const handleDirectCopyPrompt = () => {
    const key = question.component_key || toCamelCase(question.title) + 'Visualizer';
    const promptText = `Act as an expert algorithm educator and React visualization engineer for AlgoVision Studio.
Create an interactive, animated React visualizer component for this DSA problem from Striver's A2Z Sheet:

Problem ID: ${question.display_id || 'Q-001'}
Problem: "${question.title}" (${question.category} - ${question.difficulty})

Problem Statement & Examples:
${question.description}

Approach & Logic:
${question.approach || 'Standard optimal algorithm'}

C++ Reference Code:
\`\`\`cpp
${solutions.cpp || '// C++ solution'}
\`\`\`

Strict UI Template Requirements (AlgoVision Studio 5-Layer Layout):
You MUST follow this exact component scaffold:

\`\`\`jsx
import React, { useState } from 'react';
import ArrayView from '../components/primitives/ArrayView';

export const meta = {
  display_id: '${question.display_id || 'Q-001'}',
  title: "${question.title}",
  category: "${question.category}",
  difficulty: "${question.difficulty}",
  timeComplexity: "${question.time_complexity || 'O(N)'}",
  spaceComplexity: "${question.space_complexity || 'O(1)'}",
  description: ${JSON.stringify((question.description || '').slice(0, 140))}
};

// Realistic sample array for this problem
const SAMPLE_DATA = [1, 8, 7, 56, 90];

export const steps = [
  {
    title: "1. Initialize State",
    codeLine: 4, // Exact line of C++ code executing
    code: "// In-line commented executing line...",
    explanation: "Detailed educational explanation of what happens and why...",
    pointers: [{ index: 0, label: 'i', color: 'indigo' }],
    highlightIndices: [0],
    hudText: "Current state: initialized"
  }
  // Add 4-7 thorough steps demonstrating the complete algorithm
];

export default function ${key}({ currentStep: externalStep, onStepChange }) {
  const [internalStep, setInternalStep] = useState(0);
  const stepIndex = externalStep !== undefined ? externalStep : internalStep;
  const setStep = onStepChange || setInternalStep;
  const stepData = steps[stepIndex] || steps[0];

  const handleNext = () => { if (stepIndex < steps.length - 1) setStep(stepIndex + 1); };
  const handlePrev = () => { if (stepIndex > 0) setStep(stepIndex - 1); };

  return (
    <div className="w-full flex flex-col bg-[#0b0d14] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
      {/* 1. Sub-Header Bar */}
      <div className="px-5 py-3 bg-[#0e111a] border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
            Step {stepIndex + 1} / {steps.length}
          </span>
          <h3 className="text-sm font-bold text-white font-mono">{stepData.title}</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={handlePrev} disabled={stepIndex === 0} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 disabled:opacity-30 text-slate-300 text-xs font-mono rounded border border-white/5 transition">
            ← Prev
          </button>
          <button onClick={handleNext} disabled={stepIndex === steps.length - 1} className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-white text-xs font-mono font-medium rounded transition">
            Next →
          </button>
        </div>
      </div>

      {/* 2. Visualizer Canvas */}
      <div className="p-6 flex flex-col items-center justify-center bg-[#08090e]/60 min-h-[220px]">
        <ArrayView items={SAMPLE_DATA} pointers={stepData.pointers || []} matchIndices={stepData.highlightIndices || []} />
        <div className="mt-5 flex items-center gap-3 px-4 py-2 rounded-lg bg-[#0e111a] border border-white/5 font-mono text-xs">
          <span>Status: <strong className="text-indigo-400">{stepData.hudText || 'Processing...'}</strong></span>
        </div>
      </div>

      {/* 4. Explanation Footer */}
      <div className="px-5 py-3 bg-[#0c0e16] border-t border-white/5 text-xs text-slate-300 leading-relaxed font-sans">
        <span className="text-slate-500 font-mono text-[11px] uppercase mr-2 font-bold">Explanation:</span>
        {stepData.explanation}
      </div>
    </div>
  );
}
\`\`\`

Rules:
- Palette: Deep obsidian (#0b0d14, #0e111a, #08090e), Indigo (#6366f1), Emerald, Amber, Rose.
- Explain code thoroughly with in-line comments line-by-line.
- Return ONLY the complete, ready-to-run React JSX code.`;

    navigator.clipboard.writeText(promptText);
    sound.playStep(640);
    setCopiedDirect(true);
    setTimeout(() => setCopiedDirect(false), 2500);
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setIsPostingComment(true);
    const res = await api.addComment(question.id, {
      userId: currentUser?.id || 'usr_guest',
      username: currentUser?.username || 'Guest Coder',
      avatar: currentUser?.avatar || '⚡',
      content: newComment.trim()
    });
    setIsPostingComment(false);
    if (res.success && res.data) {
      setComments((prev) => [res.data, ...prev]);
      setNewComment('');
      sound.playStep(720);
    }
  };

  const handleUpvoteComment = async (commentId) => {
    sound.playStep(600);
    const res = await api.upvoteComment(commentId);
    if (res.success && res.data) {
      setComments((prev) =>
        prev.map((c) => (c.id === commentId ? { ...c, upvotes: res.data.upvotes } : c))
      );
    }
  };

  const handlePostPublicNote = async (e) => {
    e.preventDefault();
    if (!newNoteContent.trim()) return;
    setIsPostingNote(true);
    const res = await api.addPublicNote(question.id, {
      userId: currentUser?.id || 'usr_guest',
      username: currentUser?.username || 'Guest Coder',
      avatar: currentUser?.avatar || '⚡',
      title: newNoteTitle.trim() || 'Key Insight',
      content: newNoteContent.trim()
    });
    setIsPostingNote(false);
    if (res.success && res.data) {
      setPublicNotes((prev) => {
        const filtered = prev.filter((n) => n.id !== res.data.id);
        return [res.data, ...filtered];
      });
      setNewNoteTitle('');
      setNewNoteContent('');
      setShowAddPublicNote(false);
      sound.playStep(740);
    }
  };

  const handleUpvotePublicNote = async (noteId) => {
    sound.playStep(600);
    const res = await api.upvotePublicNote(noteId);
    if (res.success && res.data) {
      setPublicNotes((prev) =>
        prev.map((n) => (n.id === noteId ? { ...n, upvotes: res.data.upvotes } : n))
      );
    }
  };

  const handleSavePrivateNotes = async () => {
    if (currentUser?.id) {
      await api.savePrivateNote(currentUser.id, question.id, privateNotes);
    } else {
      await api.saveNotes(question.id, privateNotes);
    }
    sound.playStep(680);
    setPrivateNotesSaved(true);
    setTimeout(() => setPrivateNotesSaved(false), 2000);
  };

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
            <div className="bg-[#0e111a] border border-white/[0.08] rounded-xl p-3 sm:px-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                <span>Code solution view active • Visualizer not uploaded yet</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                <button
                  onClick={handleDirectCopyPrompt}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-lg transition text-xs font-semibold shadow-sm"
                  title="Copy tailored Gemini prompt with 5-layer UI scaffold directly to clipboard"
                >
                  {copiedDirect ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Sparkles className="w-3.5 h-3.5 text-indigo-400" />}
                  <span>{copiedDirect ? 'Copied Gemini Prompt!' : '⚡ Copy Gemini Prompt'}</span>
                </button>

                <button
                  onClick={() => setShowUploader(true)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition text-xs font-semibold shadow"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Upload Visualizer</span>
                </button>
              </div>
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
                  <div className="bg-[#0e111a] border border-white/10 rounded-xl p-10 sm:p-12 text-center space-y-3">
                    <Layers className="w-8 h-8 text-slate-600 mx-auto" />
                    <h3 className="text-sm font-bold text-white font-mono">Visualizer Not Uploaded Yet</h3>
                    <p className="text-xs text-slate-400 max-w-md mx-auto">
                      1-click copy the tailored prompt for Gemini with our 5-layer UI template, then drop the generated JSX file below!
                    </p>
                    <div className="flex items-center justify-center gap-2.5 pt-2 flex-wrap">
                      <button
                        onClick={handleDirectCopyPrompt}
                        className="px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-medium rounded-lg transition flex items-center gap-1.5 shadow-sm"
                      >
                        {copiedDirect ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Sparkles className="w-3.5 h-3.5 text-indigo-400" />}
                        <span>{copiedDirect ? 'Copied Gemini Prompt!' : '⚡ Copy Gemini Prompt'}</span>
                      </button>

                      <button
                        onClick={() => setShowUploader(true)}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-medium rounded-lg shadow transition flex items-center gap-1.5"
                      >
                        <UploadCloud className="w-3.5 h-3.5" />
                        <span>Upload Visualizer Component</span>
                      </button>
                    </div>
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

      {/* 🧠 Knowledge & Collaboration Hub: Comments, Public Notes & Private Notes */}
      <div className="bg-[#0e111a] border border-white/[0.08] rounded-xl overflow-hidden shadow-2xl space-y-0">
        {/* Hub Tab Navigation */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/5 bg-[#090b10] px-4 py-1 text-xs font-mono">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setHubTab('comments')}
              className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 font-medium transition ${
                hubTab === 'comments'
                  ? 'border-indigo-500 text-white font-bold bg-white/[0.03]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
              <span>Discussion ({comments.length})</span>
            </button>

            <button
              onClick={() => setHubTab('public_notes')}
              className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 font-medium transition ${
                hubTab === 'public_notes'
                  ? 'border-indigo-500 text-white font-bold bg-white/[0.03]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>Public Notes ({publicNotes.length})</span>
            </button>

            <button
              onClick={() => setHubTab('private_notes')}
              className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 font-medium transition ${
                hubTab === 'private_notes'
                  ? 'border-indigo-500 text-white font-bold bg-white/[0.03]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Private Notes</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 py-1 text-[11px] text-slate-500 font-mono">
            {hubTab === 'comments' && <span>Earn +10 XP per discussion post</span>}
            {hubTab === 'public_notes' && <span>Earn +25 XP per public intuition</span>}
            {hubTab === 'private_notes' && <span>🔒 Private to your account</span>}
          </div>
        </div>

        {/* Tab 1: Discussion & Comments */}
        {hubTab === 'comments' && (
          <div className="p-5 space-y-4 font-mono text-xs">
            {/* Post comment box */}
            <form onSubmit={handlePostComment} className="space-y-2">
              <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                <span className="w-5 h-5 rounded bg-indigo-600/30 flex items-center justify-center text-xs">
                  {currentUser?.avatar || '⚡'}
                </span>
                <span>Posting as <strong>{currentUser?.username || 'Guest'}</strong></span>
                <span className="text-indigo-400 ml-auto">+10 XP Bonus</span>
              </div>
              <textarea
                rows={2}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Ask a question, share an observation, or discuss edge cases..."
                className="w-full p-3 bg-[#08090e] border border-white/10 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition resize-none font-sans"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isPostingComment || !newComment.trim()}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-white text-xs font-semibold shadow transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isPostingComment ? 'Posting...' : 'Post Comment'}</span>
                </button>
              </div>
            </form>

            {/* Comments feed */}
            <div className="space-y-3 pt-2">
              {comments.length === 0 ? (
                <div className="p-8 text-center bg-[#08090e]/40 rounded-lg border border-white/5 space-y-1">
                  <MessageSquare className="w-6 h-6 text-slate-600 mx-auto" />
                  <p className="text-slate-400 text-xs">No discussion comments yet.</p>
                  <p className="text-slate-600 text-[11px]">Be the first to share an observation or question!</p>
                </div>
              ) : (
                comments.map((c) => (
                  <div
                    key={c.id}
                    className="p-3 rounded-lg bg-[#08090e]/80 border border-white/5 space-y-2 hover:border-white/10 transition"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-xs">
                          {c.avatar || '⚡'}
                        </span>
                        <span className="font-bold text-slate-200">{c.username}</span>
                        <span className="text-[10px] text-slate-500">
                          {c.created_at ? new Date(c.created_at).toLocaleDateString() : ''}
                        </span>
                      </div>

                      <button
                        onClick={() => handleUpvoteComment(c.id)}
                        className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/[0.03] hover:bg-indigo-600/20 text-slate-400 hover:text-indigo-300 border border-white/5 transition"
                        title="Upvote comment"
                      >
                        <ThumbsUp className="w-3 h-3 text-indigo-400" />
                        <span className="text-[11px] font-bold">{c.upvotes || 0}</span>
                      </button>
                    </div>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed whitespace-pre-wrap pl-8">
                      {c.content}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Public Community Notes */}
        {hubTab === 'public_notes' && (
          <div className="p-5 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-400 text-xs font-sans">
                Community-shared intuitions, pattern breakdowns, and common interview mistakes.
              </span>
              <button
                onClick={() => setShowAddPublicNote(!showAddPublicNote)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-semibold transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showAddPublicNote ? 'Cancel' : 'Share Public Note (+25 XP)'}</span>
              </button>
            </div>

            {/* Form to add public note */}
            {showAddPublicNote && (
              <form onSubmit={handlePostPublicNote} className="p-4 rounded-xl bg-[#08090e] border border-emerald-500/30 space-y-3 animate-in fade-in duration-150">
                <input
                  type="text"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  placeholder="Note Title: e.g. Invariant: Sliding window boundary condition"
                  className="w-full p-2.5 bg-[#0e111a] border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                  required
                />
                <textarea
                  rows={3}
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  placeholder="Write the core algorithmic insight, invariant, or trick to remember..."
                  className="w-full p-2.5 bg-[#0e111a] border border-white/10 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition resize-y font-sans leading-relaxed"
                  required
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddPublicNote(false)}
                    className="px-3 py-1.5 text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPostingNote || !newNoteContent.trim()}
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 text-white font-semibold shadow transition"
                  >
                    {isPostingNote ? 'Publishing...' : 'Publish to Community'}
                  </button>
                </div>
              </form>
            )}

            {/* Public Notes Feed */}
            <div className="space-y-3">
              {publicNotes.length === 0 ? (
                <div className="p-8 text-center bg-[#08090e]/40 rounded-lg border border-white/5 space-y-1">
                  <Globe className="w-6 h-6 text-slate-600 mx-auto" />
                  <p className="text-slate-400 text-xs">No public study notes shared yet.</p>
                  <p className="text-slate-600 text-[11px]">Click "Share Public Note" to contribute and earn +25 XP!</p>
                </div>
              ) : (
                publicNotes.map((note) => (
                  <div
                    key={note.id}
                    className="p-4 rounded-xl bg-[#08090e]/90 border border-white/5 space-y-2 hover:border-white/15 transition"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-xs">
                          {note.avatar || '⚡'}
                        </span>
                        <div>
                          <h4 className="font-bold text-white text-xs">{note.title || 'Algorithmic Insight'}</h4>
                          <span className="text-[10px] text-slate-500">by {note.username}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleUpvotePublicNote(note.id)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.03] hover:bg-emerald-600/20 text-slate-400 hover:text-emerald-300 border border-white/5 transition"
                        title="Upvote public note"
                      >
                        <ThumbsUp className="w-3 h-3 text-emerald-400" />
                        <span className="text-[11px] font-bold">{note.upvotes || 0}</span>
                      </button>
                    </div>

                    <p className="text-xs text-slate-300 font-sans leading-relaxed whitespace-pre-wrap pt-1 pl-8">
                      {note.content}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Private Personal Notes */}
        {hubTab === 'private_notes' && (
          <div className="p-5 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-amber-400 rounded-sm"></span>
                <span className="font-mono text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Personal Cheatsheet & Pitfalls (@{currentUser?.username || 'You'})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadStudySheet}
                  className="flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 rounded text-xs font-mono transition"
                  title="Download Markdown Study Sheet for revision"
                >
                  <Download className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Export Study Sheet (.md)</span>
                </button>

                <button
                  onClick={handleSavePrivateNotes}
                  className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded text-xs font-mono font-medium transition"
                >
                  {privateNotesSaved ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Save className="w-3.5 h-3.5" />}
                  <span>{privateNotesSaved ? 'Saved to SQLite' : 'Save Private Notes'}</span>
                </button>
              </div>
            </div>

            <textarea
              rows={4}
              value={privateNotes}
              onChange={(e) => setPrivateNotes(e.target.value)}
              placeholder="Write your private notes, loop invariants, base cases, memory nuances, or college exam tips..."
              className="w-full p-3.5 bg-[#08090e]/80 border border-white/10 rounded-lg text-xs text-slate-200 font-mono focus:outline-none focus:border-amber-500/50 leading-relaxed transition resize-y"
            />

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>🔒 Private to your account in local SQLite database</span>
              <span className="text-amber-400/80">Press 'Save Private Notes' to commit</span>
            </div>
          </div>
        )}
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

function toCamelCase(str) {
  if (!str) return 'Visualizer';
  return str
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}
