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
import VariableInspector from './primitives/VariableInspector';

function formatComplexity(text) {
  if (!text) return '—';
  const s = String(text);
  // First try to extract a Big-O token like O(N), O(N log N), O(N²), O(V+E), etc.
  const match = s.match(/O\([^)]{1,20}\)/i);
  if (match) return match[0];
  // Fall back: strip known prefixes and truncate
  let cleaned = s
    .replace(/^[-:=*#\s]+/, '')
    .replace(/^(?:the\s+)?(?:time|space)\s+complexity\s+(?:of[^:]*?)?(?:is|:|-|=)\s*/i, '')
    .replace(/^(?:time|space)\s*(?:complexity)?\s*[:=-]\s*/i, '')
    .trim();
  return cleaned.length <= 24 ? cleaned : cleaned.slice(0, 22) + '…';
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
  // Custom Input Sandbox & Preset State
  const [customInput, setCustomInput] = useState('');
  const [customTarget, setCustomTarget] = useState('');
  const [showCustomSandbox, setShowCustomSandbox] = useState(false);
  const [reviewSaved, setReviewSaved] = useState(false);
  const [isBarDragging, setIsBarDragging] = useState(false);
  const [preloadedUploadCode, setPreloadedUploadCode] = useState('');
  const barFileInputRef = useRef(null);

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
// (Or import other primitives if needed: LinkedListView, TreeGraphView, MatrixView, StackQueueView, CallStackView, VariableInspector)

// 0. Multi-language production solution code with detailed educational comments
export const solutions = {
  cpp: \`// C++ Optimal Solution with line-by-line syntax & complexity comments
class Solution {
public:
    // Detailed step comments explaining approach...
};\n\`,
  python: \`# Python 3 Solution with thorough syntax & data structure comments
class Solution:
    # Detailed step comments explaining approach...
    pass\n\`,
  java: \`// Java Solution with step-by-step logic breakdown
class Solution {
    // Detailed step comments explaining approach...
}\n\`,
  javascript: \`// JavaScript Solution with in-line explanation
var solve = function(...) {
    // Detailed step comments explaining approach...
};\n\`,
};

export const meta = {
  display_id: '${question.display_id || 'Q-001'}',
  title: "${question.title}",
  category: "${question.category}",
  difficulty: "${question.difficulty}",
  timeComplexity: "${question.time_complexity || 'O(N)'}",
  spaceComplexity: "${question.space_complexity || 'O(1)'}",
  description: ${JSON.stringify((question.description || '').slice(0, 140))}
};

// Realistic sample array/data extracted directly from the problem statement & examples
const SAMPLE_DATA = [/* realistic data from problem example */];

export const steps = [
  // IMPORTANT: Provide 6 to 12 thorough, sequential execution steps tracing the algorithm on SAMPLE_DATA
  {
    title: "1. Initialize State",
    codeLine: 4, // Exact line of C++ code executing
    code: "// In-line commented executing line...",
    explanation: "Detailed educational explanation of what happens in this step and why...",
    pointers: [{ index: 0, label: 'i', color: 'indigo' }],
    highlightIndices: [0],
    hudText: "Current state: initialized"
  }
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
      <div className="p-6 flex flex-col items-center justify-center bg-[#08090e]/60 min-h-[240px]">
        <ArrayView items={SAMPLE_DATA} pointers={stepData.pointers || []} matchIndices={stepData.highlightIndices || []} />
        
        {/* Real-time HUD Status & Variables */}
        <div className="mt-5 flex items-center gap-3 px-4 py-2 rounded-lg bg-[#0e111a] border border-white/5 font-mono text-xs shadow-inner">
          <span className="text-zinc-400">Status: <strong className="text-indigo-400">{stepData.hudText || 'Processing...'}</strong></span>
        </div>
      </div>

      {/* 3. Explanation Footer */}
      <div className="px-5 py-3 bg-[#0c0e16] border-t border-white/5 text-xs text-slate-300 leading-relaxed font-sans">
        <span className="text-slate-500 font-mono text-[11px] uppercase mr-2 font-bold">Explanation:</span>
        {stepData.explanation}
      </div>
    </div>
  );
}
\`\`\`

Rules:
- Include \`export const solutions = { cpp: \`...\`, python: \`...\`, java: \`...\`, javascript: \`...\` }\` with fully commented solutions explaining syntax, line-by-line logic, and edge cases. These will automatically replace the old code in the database.
- IMPORTANT: Ensure the visualizer has RICH ANIMATED VISUALS: accurately trace the problem's sample example across 6-12 step-by-step frames with moving pointers (e.g., start, end, left, right), highlighted active subarrays, and live HUD variables.
- Use primitive components from \`../components/primitives/\` (ArrayView, LinkedListView, TreeGraphView, MatrixView, StackQueueView, CallStackView, VariableInspector) or custom SVG/HTML visualizations.
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

  // Compute active line and variables for real-time inspection & code sync
  const currentStepData = stepsList ? stepsList[currentStep] : null;
  const activeCodeLine = currentStepData?.codeLine || currentStepData?.line || null;
  const currentVariables = currentStepData?.variables || {
    ...(currentStepData?.low !== undefined ? { low: currentStepData.low } : {}),
    ...(currentStepData?.high !== undefined ? { high: currentStepData.high } : {}),
    ...(currentStepData?.mid !== undefined ? { mid: currentStepData.mid } : {}),
    ...(currentStepData?.left !== undefined ? { left: currentStepData.left } : {}),
    ...(currentStepData?.right !== undefined ? { right: currentStepData.right } : {}),
    ...(currentStepData?.currentSum !== undefined ? { currentSum: currentStepData.currentSum } : {}),
    ...(currentStepData?.status ? { status: currentStepData.status } : {})
  };

  const handleReviewConfidence = async (confidence) => {
    await api.recordReview(currentUser?.id, question.id, confidence);
    sound?.playSuccess?.();
    setReviewSaved(true);
    setTimeout(() => setReviewSaved(false), 2500);
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
    // Automatically reload solutions from DB so new commented code replaces old code immediately in CodeViewer
    const refreshedSolutions = await api.getCodeSolutions(question.id);
    if (refreshedSolutions && Object.keys(refreshedSolutions).length > 0) {
      setSolutions(refreshedSolutions);
    }
    if (onUpdateQuestion && updatedQuestion) {
      onUpdateQuestion(updatedQuestion);
    }
    sound?.playSuccess?.();
  };


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


  const diffDot =
    question.difficulty === 'Easy'   ? 'bg-emerald-400' :
    question.difficulty === 'Medium' ? 'bg-amber-400'   :
    question.difficulty === 'Hard'   ? 'bg-rose-400'    : 'bg-slate-500';

  const diffText =
    question.difficulty === 'Easy'   ? 'text-emerald-400' :
    question.difficulty === 'Medium' ? 'text-amber-400'   :
    question.difficulty === 'Hard'   ? 'text-rose-400'    : 'text-slate-500';

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-6 space-y-4">
      {/* ── Zone 1: Problem header ── */}
      <div className="card p-4 sm:p-5">
        {/* Title + meta row */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0">
            {/* Back */}
            <button
              onClick={onBack}
              className="mt-0.5 p-1.5 rounded-md text-slate-500 hover:text-white hover:bg-white/[0.06] transition shrink-0"
              title="Back to library (Esc)"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="min-w-0">
              {/* ID + difficulty */}
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`w-2 h-2 rounded-full shrink-0 ${diffDot}`} title={question.difficulty} />
                <span className={`text-[11px] font-mono font-semibold ${diffText}`}>{question.difficulty}</span>
                {question.display_id && (
                  <span className="text-[11px] font-mono text-slate-500">{question.display_id}</span>
                )}
                {question.leetcode_id && question.leetcode_id !== question.display_id && (
                  <span className="text-[11px] font-mono text-slate-600">LC {question.leetcode_id}</span>
                )}
                <span className="text-[11px] font-mono text-slate-600">
                  {(question.category || '').replace(/^\d+\.\s*/, '')}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-sans font-bold text-[15px] sm:text-[16px] text-white leading-snug tracking-tight max-w-lg">
                {question.title}
              </h1>

              {/* Tags */}
              {question.tags && question.tags.length > 0 && (
                <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                  {question.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono text-slate-600 hover:text-slate-400 transition cursor-default"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
            {/* Complexity */}
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 bg-white/[0.03] border border-white/[0.06] rounded-md px-3 py-1.5 shrink-0">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-indigo-500" />
                {formatComplexity(question.time_complexity)}
              </span>
              <span className="text-white/10">·</span>
              <span className="flex items-center gap-1">
                <Cpu className="w-3 h-3 text-indigo-500" />
                {formatComplexity(question.space_complexity)}
              </span>
            </div>

            {/* Status */}
            <select
              value={question.status || 'to_learn'}
              onChange={(e) => onStatusChange(question.id, e.target.value)}
              className={`nav-pill cursor-pointer ${
                question.status === 'mastered'    ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' :
                question.status === 'in_progress' ? 'text-amber-400   border-amber-500/30  bg-amber-500/10'  : ''
              }`}
              style={{ appearance: 'none', backgroundImage: 'none', paddingRight: '0.625rem' }}
            >
              <option value="to_learn"    className="bg-[#0d0f18]">To learn</option>
              <option value="in_progress" className="bg-[#0d0f18]">In progress</option>
              <option value="mastered"    className="bg-[#0d0f18]">Mastered</option>
            </select>

            {/* View mode */}
            <div className="flex items-center bg-white/[0.03] border border-white/[0.06] rounded-md p-0.5">
              {[['visualizer_only','Viz'],['split','Split'],['code_only','Code']].map(([mode, label]) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition ${
                    viewMode === mode
                      ? 'bg-indigo-600/30 text-indigo-300 font-semibold'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Upload */}
            <button
              onClick={() => setShowUploader(!showUploader)}
              className={`nav-pill ${
                showUploader ? 'border-indigo-500/40 bg-indigo-600/15 text-indigo-300' : ''
              }`}
              title="Upload or replace visualizer"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Upload</span>
            </button>

            {/* Spaced Repetition Quick Rater */}
            <div className="flex items-center gap-1 bg-[#08090e] p-0.5 rounded-lg border border-white/[0.08] text-[10px] font-mono">
              <button
                onClick={() => handleReviewConfidence('mastered')}
                className="px-2 py-0.5 rounded bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 transition flex items-center gap-1"
                title="Mark Mastered (Interval extended 2.5x)"
              >
                <span>🟢</span> <span className="hidden sm:inline">Mastered</span>
              </button>
              <button
                onClick={() => handleReviewConfidence('practicing')}
                className="px-2 py-0.5 rounded bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 transition flex items-center gap-1"
                title="Needs Practice (Review in 3 days)"
              >
                <span>🟡</span> <span className="hidden sm:inline">Review 3d</span>
              </button>
              <button
                onClick={() => handleReviewConfidence('struggling')}
                className="px-2 py-0.5 rounded bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 transition flex items-center gap-1"
                title="Struggled (Reset to 1 day)"
              >
                <span>🔴</span> <span className="hidden sm:inline">Reset</span>
              </button>
              {reviewSaved && (
                <span className="text-emerald-400 px-1 font-bold animate-pulse">✓ Saved</span>
              )}
            </div>

            {/* LeetCode */}
            {question.leetcode_url && (
              <a
                href={question.leetcode_url}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-pill"
                title="Open on LeetCode"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {/* Jumper */}
            <div className="relative">
              <button
                onClick={() => setShowJumper(!showJumper)}
                className="nav-pill"
                title="Jump to any problem"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Jump</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${showJumper ? 'rotate-180' : ''}`} />
              </button>

              {showJumper && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowJumper(false)} />
                  <div className="absolute top-full mt-1.5 right-0 w-72 sm:w-80 bg-[#0d0f18] border border-white/[0.12] rounded-xl shadow-2xl z-50 overflow-hidden fade-in">
                    <div className="p-2.5 border-b border-white/[0.06] flex items-center gap-2">
                      <Search className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <input
                        type="text"
                        value={jumperSearch}
                        onChange={(e) => setJumperSearch(e.target.value)}
                        placeholder="Q-001, title, category…"
                        className="bg-transparent text-[12px] text-white placeholder-slate-600 focus:outline-none w-full font-mono"
                        autoFocus
                      />
                      {jumperSearch && (
                        <button onClick={() => setJumperSearch('')} className="text-slate-600 hover:text-white shrink-0">
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    <div className="overflow-y-auto max-h-64 divide-y divide-white/[0.05] font-mono text-[11px]">
                      {filteredJumperQuestions.length === 0 ? (
                        <div className="p-4 text-center text-slate-600">No matches</div>
                      ) : filteredJumperQuestions.map((q) => (
                        <div
                          key={q.id}
                          onClick={() => { if (onNavigateQuestion) onNavigateQuestion(q); setShowJumper(false); }}
                          className={`px-3 py-2 flex items-center justify-between gap-2 cursor-pointer transition ${
                            q.id === question.id ? 'bg-indigo-600/15 text-white' : 'hover:bg-white/[0.04] text-slate-400'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-indigo-400 shrink-0">#{q.display_id || q.leetcode_id}</span>
                            <span className="truncate">{q.title}</span>
                          </div>
                          <span className={`text-[10px] shrink-0 ${
                            q.difficulty === 'Easy' ? 'text-emerald-400' :
                            q.difficulty === 'Medium' ? 'text-amber-400' : 'text-rose-400'
                          }`}>{q.difficulty}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Problem statement + approach */}
        <div className="mt-4 pt-4 border-t border-white/[0.05] space-y-3">
          <div className="text-[12px] text-slate-400 leading-relaxed whitespace-pre-wrap max-h-32 overflow-y-auto font-sans">
            {question.description || 'No description available.'}
          </div>

          {/* Approach toggle button — always visible */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowApproach(!showApproach)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-mono font-medium border transition ${
                showApproach
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                  : 'bg-white/[0.03] border-white/[0.08] text-slate-500 hover:text-amber-400 hover:border-amber-500/30 hover:bg-amber-500/10'
              }`}
            >
              <span>{showApproach ? '▾' : '▸'}</span>
              {showApproach ? 'Hide Approach & Intuition' : 'Show Approach & Intuition'}
            </button>
          </div>

          {showApproach && (
            <div className="rounded-lg bg-[#0a0b10] border border-amber-500/15 p-3.5 space-y-1">
              <span className="text-[10px] font-mono text-amber-600/80 uppercase tracking-wider font-semibold">Approach & Intuition</span>
              <div className="text-[12px] text-slate-400 leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto font-sans pt-1">
                {question.approach || 'Standard optimal approach.'}
              </div>
            </div>
          )}
        </div>

        {/* Prev / Next navigation strip */}
        <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between gap-2">
          <button
            onClick={() => prevQuestion && onNavigateQuestion && onNavigateQuestion(prevQuestion)}
            disabled={!prevQuestion}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md text-[11px] font-mono border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.07] disabled:opacity-30 disabled:pointer-events-none text-slate-400 hover:text-white transition group"
            title={prevQuestion ? `← ${prevQuestion.display_id} ${prevQuestion.title}` : 'First problem'}
          >
            <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline max-w-[180px] truncate">
              {prevQuestion ? `${prevQuestion.display_id} – ${prevQuestion.title}` : 'First'}
            </span>
            <span className="sm:hidden">Prev</span>
          </button>

          <span className="text-[11px] font-mono text-slate-700">
            {currentIndex >= 0 ? currentIndex + 1 : '?'} / {questions.length}
          </span>

          <button
            onClick={() => nextQuestion && onNavigateQuestion && onNavigateQuestion(nextQuestion)}
            disabled={!nextQuestion}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md text-[11px] font-mono border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.07] disabled:opacity-30 disabled:pointer-events-none text-slate-400 hover:text-white transition group"
            title={nextQuestion ? `${nextQuestion.display_id} ${nextQuestion.title} →` : 'Last problem'}
          >
            <span className="sm:hidden">Next</span>
            <span className="hidden sm:inline max-w-[180px] truncate">
              {nextQuestion ? `${nextQuestion.display_id} – ${nextQuestion.title}` : 'Last'}
            </span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>


      {/* ── Uploader modal ── */}
      {showUploader ? (
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
      ) : (
        <>
          {/* ── Playback bar ── */}
          {Component ? (
            <div className="card px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Transport controls */}
              <div className="flex items-center gap-1">
                <button onClick={handleReset} className="btn-ghost w-8 justify-center px-0" title="Reset (R)">
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button onClick={handlePrevStep} disabled={currentStep === 0} className="btn-ghost w-8 justify-center px-0" title="Prev (←)">
                  <SkipBack className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={togglePlay}
                  className={`btn-primary gap-1.5 ${isPlaying ? 'bg-amber-600 hover:bg-amber-500 border-amber-500/40' : ''}`}
                  title="Play / Pause (Space)"
                >
                  {isPlaying
                    ? <Pause className="w-3.5 h-3.5 fill-current" />
                    : <Play  className="w-3.5 h-3.5 fill-current" />
                  }
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button onClick={handleNextStep} disabled={currentStep >= maxSteps - 1} className="btn-ghost w-8 justify-center px-0" title="Next (→)">
                  <SkipForward className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setLoop(!loop)}
                  className={`btn-ghost w-8 justify-center px-0 ${
                    loop ? 'border-indigo-500/40 bg-indigo-500/10 text-indigo-400' : ''
                  }`}
                  title={loop ? 'Loop on' : 'Loop off'}
                >
                  <Repeat className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Step dots */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                {Array.from({ length: maxSteps }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentStep(idx);
                      sound.playStep(500 + idx * 30);
                      if (idx === maxSteps - 1) triggerCompletionCelebration();
                    }}
                    title={`Step ${idx + 1}`}
                    className={`rounded-full transition-all ${
                      currentStep === idx
                        ? 'w-5 h-5 bg-indigo-600 text-white text-[10px] font-bold shadow-sm shadow-indigo-900/60'
                        : idx < currentStep
                        ? 'w-2 h-2 bg-indigo-600/40 hover:bg-indigo-500/60'
                        : 'w-2 h-2 bg-white/[0.08] hover:bg-white/[0.15]'
                    }`}
                  >
                    {currentStep === idx ? idx + 1 : ''}
                  </button>
                ))}
              </div>

              {/* Speed */}
              <div className="flex items-center gap-0.5 bg-white/[0.03] border border-white/[0.06] rounded-md p-0.5">
                {[0.5, 1, 1.5, 2].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono transition ${
                      speed === s ? 'bg-indigo-600 text-white font-bold' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>
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
              className={`card px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] font-mono transition-all duration-200 ${
                isBarDragging
                  ? 'border-2 border-dashed border-indigo-400 bg-indigo-950/40 shadow-[0_0_20px_rgba(99,102,241,0.25)] ring-2 ring-indigo-500/30 animate-pulse'
                  : 'hover:border-white/15'
              }`}
            >
              <input
                type="file"
                ref={barFileInputRef}
                onChange={handleBarFileInput}
                accept=".jsx,.tsx,.js,.ts"
                className="hidden"
              />

              <div className="flex items-center gap-2 text-slate-400">
                <UploadCloud className={`w-4 h-4 ${isBarDragging ? 'text-indigo-400 animate-bounce' : 'text-slate-500'}`} />
                <span>
                  {isBarDragging ? (
                    <strong className="text-indigo-300">Drop your visualizer component (.jsx / .tsx) here!</strong>
                  ) : (
                    <>
                      No visualizer uploaded yet{' '}
                      <span className="text-slate-600 text-[11px] hidden md:inline">
                        · Drag & drop .jsx file here or upload
                      </span>
                    </>
                  )}
                </span>
              </div>

              {/* Action buttons (Isolated to prevent drag/click conflict with Copy prompt) */}
              <div
                className="flex items-center gap-2 shrink-0"
                onDragOver={(e) => e.stopPropagation()}
                onDrop={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={handleDirectCopyPrompt}
                  className="btn-ghost gap-1.5 cursor-pointer relative z-10"
                  title="Copy Gemini prompt"
                >
                  {copiedDirect ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  )}
                  <span>{copiedDirect ? 'Copied!' : 'Copy AI prompt'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => barFileInputRef.current?.click()}
                  className="btn-primary gap-1.5 cursor-pointer relative z-10 shadow-lg"
                  title="Click to select or drag & drop .jsx file directly"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Upload visualizer</span>
                </button>
              </div>
            </div>
          )}

          {/* Live State & Variable Inspector */}
          {currentVariables && Object.keys(currentVariables).length > 0 && (
            <VariableInspector
              variables={currentVariables}
              title="Live Execution State & Pointers"
            />
          )}

          {/* Canvas + Code */}
          <div className={`grid gap-4 ${viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'}`}>
            {viewMode !== 'code_only' && (
              <div className={viewMode === 'split' ? 'lg:col-span-7' : ''}>
                {Component ? (
                  <Component
                    currentStep={currentStep}
                    onStepChange={setCurrentStep}
                    customInput={customInput}
                    customTarget={customTarget}
                  />
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
                    className={`card flex flex-col items-center justify-center py-16 text-center space-y-3 cursor-pointer transition-all duration-200 ${
                      isBarDragging
                        ? 'border-2 border-dashed border-indigo-400 bg-indigo-950/30 ring-2 ring-indigo-500/30 shadow-2xl'
                        : 'hover:border-white/15 hover:bg-white/[0.01]'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <UploadCloud className={`w-6 h-6 ${isBarDragging ? 'animate-bounce' : ''}`} />
                    </div>
                    <p className="text-[13px] font-medium text-slate-300">
                      {isBarDragging ? 'Drop your .jsx file now!' : 'No visualizer yet'}
                    </p>
                    <p className="text-[11px] text-slate-500 max-w-sm">
                      Drag & drop your AI-generated <code className="text-indigo-300">.jsx</code> visualizer file here, or click to browse.
                    </p>
                  </div>
                )}
              </div>
            )}
            {viewMode !== 'visualizer_only' && (
              <div className={viewMode === 'split' ? 'lg:col-span-5' : ''}>
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

      {/* ── Zone 3: Knowledge Hub ── */}
      <div className="card overflow-hidden">
        {/* Tab bar */}
        <div className="flex items-center gap-5 border-b border-white/[0.06] px-4">
          {[['comments','Discussion', comments.length],['public_notes','Notes', publicNotes.length],['private_notes','Private', null]].map(([id, label, count]) => (
            <button
              key={id}
              onClick={() => setHubTab(id)}
              className={`tab-btn ${hubTab === id ? 'active' : ''}`}
            >
              {label}{count !== null && <span className="text-slate-600 ml-0.5">({count})</span>}
            </button>
          ))}
        </div>

        {hubTab === 'comments' && (
          <div className="p-4 space-y-4">
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

            <div className="space-y-3">
              {comments.length === 0 ? (
                <div className="py-10 text-center space-y-1">
                  <p className="text-[12px] text-slate-600">No comments yet — be the first.</p>
                </div>
              ) : (
                comments.map((c) => (
                  <div key={c.id} className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.09] transition space-y-2">
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

        {hubTab === 'public_notes' && (
          <div className="p-4 space-y-4">
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

            <div className="space-y-3">
              {publicNotes.length === 0 ? (
                <div className="py-10 text-center">
                  <p className="text-[12px] text-slate-600">No public notes yet.</p>
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

        {hubTab === 'private_notes' && (
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500">
                Private to @{currentUser?.username || 'you'}
              </span>

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
