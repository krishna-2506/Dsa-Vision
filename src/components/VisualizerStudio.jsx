import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowLeft,
  Play,
  Pause,
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
  UploadCloud,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
  MessageSquare,
  ThumbsUp,
  Send,
  Lock,
  Plus,
  Flag,
  Code2,
  Keyboard
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../services/audio';
import { visualizersRegistry } from '../visualizers';
import { api } from '../services/api';
import CodeViewer from './CodeViewer';
import VisualizerUploader from './VisualizerUploader';
import VariableInspector from './primitives/VariableInspector';
import ReportSolutionModal from './ReportSolutionModal';
import AiQuestionEnhancerModal from './AiQuestionEnhancerModal';
import VisualizerErrorBoundary from './VisualizerErrorBoundary';
import KeyboardShortcutsModal from './KeyboardShortcutsModal';

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
  const [activeTier, setActiveTier] = useState('optimal'); // 'intuitive' | 'better' | 'optimal'
  const [showReportModal, setShowReportModal] = useState(false);
  const [showEnhanceModal, setShowEnhanceModal] = useState(false);
  const stepsList = visualizerEntry?.approaches?.[activeTier]?.steps || visualizerEntry?.steps || null;
  const maxSteps = stepsList?.length || 6;
  const hasVisualizer = Boolean(Component);

  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [loop, setLoop] = useState(false);
  const [solutions, setSolutions] = useState({});
  // Open split screen by default when visualizer exists so user sees both animation & synced code
  const [viewMode, setViewMode] = useState(hasVisualizer ? 'split' : 'code_only');
  const [showUploader, setShowUploader] = useState(false);
  const [showApproach, setShowApproach] = useState(false);
  const [showJumper, setShowJumper] = useState(false);
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);
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
  // Custom Input Sandbox & Preset State
  const [customInput, _setCustomInput] = useState('');
  const [customTarget, _setCustomTarget] = useState('');
  const [reviewSaved, setReviewSaved] = useState(false);
  const [isBarDragging, setIsBarDragging] = useState(false);
  const [isCodeColDragging, setIsCodeColDragging] = useState(false);
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
    setViewMode(hasComponent ? 'split' : 'code_only');
    setShowApproach(false);
    setShowUploader(false);
    setCurrentStep(0);
    setIsPlaying(false);

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
  }, [question.id, question.component_key, question.componentKey, question.notes, currentUser?.id]);

  // Fetch solutions dynamically whenever question or active approach tier changes
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

  const handleSelectTier = useCallback((tier) => {
    setActiveTier((curr) => {
      if (curr === tier) return curr;
      setCurrentStep(0);
      setIsPlaying(false);
      sound.playStep(640);
      return tier;
    });
  }, []);


  const handleDirectCopyPrompt = () => {
    const key = question.component_key || toCamelCase(question.title) + 'Visualizer';
    const cppCode = solutions.cpp || '// Provide full C++ solution here';
    const timeC = question.time_complexity || 'O(N)';
    const spaceC = question.space_complexity || 'O(1)';
    const desc = JSON.stringify((question.description || '').slice(0, 160));

    const promptText = `Act as an expert algorithm educator and React visualization engineer for AlgoVision Studio.
Create an interactive, animated React visualizer component for this DSA problem:

Problem ID: ${question.display_id || (question.leetcode_id ? '#' + question.leetcode_id : 'Q-001')}
Problem: "${question.title}" (${question.category} - ${question.difficulty})

Problem Statement & Examples:
${question.description}

Approach & Logic:
${question.approach || 'Provide intuitive brute force, optimized intermediate, and optimal algorithm approaches.'}

C++ Reference (basis for all solution code):
\`\`\`cpp
${cppCode}
\`\`\`

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALGOVISION STUDIO ARCHITECTURE — READ CAREFULLY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The Studio already provides:
  • Approach tier tabs (Intuitive / Better / Optimal) above the stage
  • Split-screen: your canvas LEFT, syntax-highlighted code viewer RIGHT
  • Transport controls: Play/Pause, step ticks bar, Reset, Speed 0.5x-2x
  • Step title ("1. Initialize pointers") displayed above your canvas
  • Prev/Next step buttons and Prev/Next problem navigation

DO NOT render any of: outer card frames, "Step X of Y" counters, prev/next buttons,
language tabs, or copy-code buttons. The Studio already wraps you. Just render canvas content.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VISUAL STYLE & DUAL THEME SPECIFICATION (LIGHT & DARK MODE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AlgoVision supports both LIGHT and DARK themes.
You MUST use the app's CSS variables so your visualizer renders cleanly in BOTH themes:

COLOR TOKENS (use these CSS variables directly in SVG and styles):
  Canvas / Stage bg:   var(--board)
  Card / node fill:    var(--board-raised)
  Node border / line:  var(--line)
  Primary text:        var(--chalk)
  Secondary / dim text: var(--chalk-dim)
  Faint index text:    var(--chalk-faint)
  Active / curr glow:  var(--indigo) (#6366f1) or var(--amber) (#f59e0b)
  Secondary pointer:   var(--teal) (#06b6d4)
  Success / Done:      var(--easy) (#10b981)
  Error / Collision:   var(--hard) (#f43f5e)

SVG DRAWING RULES:
  Array / node boxes:
    fill="var(--board-raised)" stroke="var(--line)" strokeWidth=1.5 rx=6
  Active element (curr / selected):
    stroke="var(--indigo)" strokeWidth=2.4 rx=8 (or amber glow)
  Previous / secondary element:
    stroke="var(--teal)" strokeWidth=1.8 strokeDasharray="4 4"
  Value inside box:
    font-family="'JetBrains Mono', monospace" fontSize=15 fontWeight=600 fill="var(--chalk)"
  Index label below box:
    font-family="'JetBrains Mono', monospace" fontSize=11 fill="var(--chalk-faint)"
  Pointer labels (curr, prev, L, R, slow, fast, i, j):
    font-family="'Plus Jakarta Sans', sans-serif" fontSize=13 fontWeight=700 fill="var(--indigo)" (active) or "var(--teal)" (secondary)

STATUS HUD — render below canvas:
  <div className="status-line"><span className="prev-b">prev = 12</span>, <b>curr = 35</b></div>

EXPLANATION — render below status HUD:
  <p className="explain">35 beats curr, so prev inherits the old value.</p>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MULTI-LANGUAGE CODE — 3 LANGUAGES × 3 TIERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

For EACH approach tier, provide COMPLETE, fully written solutions in:
  • C++    (always required, full function)
  • Java   (required — full "class Solution { public ... }" wrapper)
  • Python (required — def with type hints, "# type: ignore" if needed)

Add educational line-by-line comments in each language explaining WHAT happens and WHY.
Do NOT write "..." or placeholder stubs — the code viewer shows the full source.

CRITICAL — codeLine sync with animation:
  Each step object needs codeLine: N where N = the EXACT line number in the C++ solution.
  The code viewer highlights that line live as the animation plays.
  Count lines carefully starting from line 1.
  (Java/Python have different line counts — only C++ line is used for sync.)

  If a tier doesn't meaningfully differ, you may reuse the same steps array and
  write "// Same approach as optimal" in the other tier's solutions.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXPORT FORMAT (scaffold — complete all sections)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

\`\`\`jsx
import React, { useMemo } from 'react';
// Available primitives: ArrayView, LinkedListView, TreeGraphView, MatrixView, StackQueueView
// import ArrayView from '../components/primitives/ArrayView';

export const approaches = {
  intuitive: {
    title: 'Intuitive: Brute Force',
    badge: 'Brute Force',
    complexity: { time: 'O(N²)', space: 'O(1)' },
    steps: [
      {
        title: '1. Initialize pointers',   // shown as step title above canvas
        codeLine: 3,                        // ← exact C++ line number, count carefully
        variables: { i: 0, j: 1 },         // shown in variable inspector
        status: '<span class="prev-b">i = 0</span>, <b>j = 1</b>',
        explain: 'Start at index 0 and scan every element...',
        // add problem-specific visual state here:
        activeIndex: 0,
        compareIndex: 1,
      },
      // ... every meaningful algorithm step
    ],
    solutions: {
      cpp: \`// C++ Brute Force — O(N²)
// Scan all pairs to find the second largest
int solution(int arr[], int n) {   // line 3
  int first = -1, second = -1;     // line 4  ← codeLine 4 for steps that touch this
  for (int i = 0; i < n; i++) {   // line 5
    // ...
  }
  return second;                   // line N
}\`,
      java: \`// Java Brute Force — O(N²)
class Solution {
  public int solution(int[] arr) {
    int first = Integer.MIN_VALUE, second = Integer.MIN_VALUE;
    // ...
    return second;
  }
}\`,
      python: \`# Python Brute Force — O(N²)
def solution(arr: list[int]) -> int:
    first = second = float('-inf')
    # ...
    return second
\`
    }
  },
  better: {
    title: 'Better: Sort + Scan',
    badge: 'Sub-Optimal',
    complexity: { time: 'O(N log N)', space: 'O(1)' },
    steps: [ /* all steps with codeLine */ ],
    solutions: { cpp: \`...\`, java: \`...\`, python: \`...\` }
  },
  optimal: {
    title: 'Optimal: Single Pass',
    badge: 'Optimal',
    complexity: { time: '${timeC}', space: '${spaceC}' },
    steps: [ /* all steps with codeLine */ ],
    solutions: { cpp: \`...\`, java: \`...\`, python: \`...\` }
  }
};

export const solutions = approaches.optimal.solutions;
export const steps     = approaches.optimal.steps;
export const meta = {
  display_id:      '${question.display_id || 'Q-001'}',
  title:           "${question.title}",
  category:        "${question.category}",
  difficulty:      "${question.difficulty}",
  timeComplexity:  "${timeC}",
  spaceComplexity: "${spaceC}",
  description:     ${desc}
};

export default function ${key}({
  currentStep  = 0,
  onStepChange,
  customInput  = '',
  customTarget = '',
  approachTier = 'optimal'
}) {
  const activeApproach = approaches[approachTier] || approaches.optimal;
  const activeSteps    = activeApproach.steps;
  const stepIndex      = Math.min(Math.max(0, currentStep), activeSteps.length - 1);
  const stepData       = activeSteps[stepIndex] || activeSteps[0];

  return (
    <div className="w-full flex flex-col">
      {/* ── Chalkboard Canvas ── */}
      <div className="w-full py-6 flex items-center justify-center">
        <svg viewBox="0 0 620 180" width="100%" height="180">
          <defs>
            <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#5f6f6a"/>
            </marker>
          </defs>
          {/* Render boxes / arrows / pointers based on stepData */}
        </svg>
      </div>

      {/* ── Status HUD ── */}
      {stepData.status && (
        <div className="status-line" dangerouslySetInnerHTML={{ __html: stepData.status }} />
      )}

      {/* ── Explanation ── */}
      {stepData.explain && (
        <p className="explain" dangerouslySetInnerHTML={{ __html: stepData.explain }} />
      )}
    </div>
  );
}
\`\`\`

Return ONLY the complete, ready-to-run React JSX code. No markdown outside the code block.`;

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

  const triggerCompletionCelebration = useCallback(() => {
    sound?.playSuccess?.();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  }, []);

  const handleNextStep = useCallback(() => {
    setCurrentStep((curr) => {
      if (curr < maxSteps - 1) {
        const next = curr + 1;
        sound.playStep(520 + next * 30);
        if (next === maxSteps - 1) {
          triggerCompletionCelebration();
        }
        return next;
      }
      return curr;
    });
  }, [maxSteps, triggerCompletionCelebration]);

  const handlePrevStep = useCallback(() => {
    setCurrentStep((curr) => {
      if (curr > 0) {
        sound.playPrev();
        return curr - 1;
      }
      return curr;
    });
  }, []);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
    sound.playReset();
  }, []);

  const togglePlay = useCallback(() => {
    setCurrentStep((curr) => {
      if (curr >= maxSteps - 1) {
        return 0;
      }
      return curr;
    });
    setIsPlaying((prev) => !prev);
  }, [maxSteps]);

  // Unified Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable) return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if ((e.altKey && e.code === 'ArrowRight') || e.key === ']') {
        if (nextQuestion && onNavigateQuestion) {
          e.preventDefault();
          onNavigateQuestion(nextQuestion);
        }
      } else if ((e.altKey && e.code === 'ArrowLeft') || e.key === '[') {
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
      } else if (e.key === '1') {
        e.preventDefault();
        handleSelectTier('intuitive');
      } else if (e.key === '2') {
        e.preventDefault();
        handleSelectTier('better');
      } else if (e.key === '3') {
        e.preventDefault();
        handleSelectTier('optimal');
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShowJumper((j) => !j);
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleSavePrivateNotes();
      } else if (e.key === '?') {
        e.preventDefault();
        setShowShortcutsModal(true);
      } else if (e.key === 'Escape') {
        setShowJumper(false);
        setShowShortcutsModal(false);
        setShowUploader(false);
        setShowReportModal(false);
        setShowEnhanceModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    togglePlay,
    handleNextStep,
    handlePrevStep,
    handleReset,
    handleSelectTier,
    prevQuestion,
    nextQuestion,
    onNavigateQuestion
  ]);

  // Compute active line and variables for real-time inspection & code sync
  const currentStepData = stepsList ? stepsList[currentStep] : null;
  const activeCodeLine = currentStepData?.codeLines || currentStepData?.codeLine || currentStepData?.highlightLines || currentStepData?.line || null;
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
  }, [isPlaying, speed, loop, maxSteps, triggerCompletionCelebration]);

  const handleDownloadStudySheet = () => {
    window.open(`/api/export/${encodeURIComponent(question.id)}`, '_blank');
  };


  const diffDotClass =
    question.difficulty === 'Easy' ? 'dot-easy' :
    question.difficulty === 'Medium' ? 'dot-medium' :
    question.difficulty === 'Hard' ? 'dot-hard' : 'dot-easy';

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* ── ZONE 1: Problem Overview & Command Toolbar (Senior Workbench Card) ── */}
      <div className="card specular-card shadow-sm p-5 sm:p-6 space-y-4 bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl">
        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[var(--line)] pb-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] border border-[var(--line)] text-[var(--chalk-dim)] hover:text-[var(--chalk)] transition-all shrink-0 cursor-pointer group"
              title="Back to problem library (Esc)"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                {/* Difficulty Badge */}
                <span className={`diff-badge ${
                  question.difficulty === 'Hard' ? 'diff-badge-hard' :
                  question.difficulty === 'Medium' ? 'diff-badge-medium' : 'diff-badge-easy'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${diffDotClass}`} />
                  {question.difficulty}
                </span>

                {/* Display ID */}
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/25 text-indigo-600 dark:text-indigo-300">
                  {question.display_id || (question.leetcode_id ? `#${question.leetcode_id}` : 'DSA')}
                </span>

                {/* Category */}
                {question.category && (
                  <span className="text-xs font-sans font-medium text-[var(--chalk-dim)]">
                    {question.category.replace(/^\d+\.\s*/, '')}
                  </span>
                )}
              </div>

              <h1 className="text-lg sm:text-xl font-bold font-sans text-[var(--chalk)] tracking-tight truncate">
                {question.title}
              </h1>
            </div>
          </div>

          {/* Right Action Tools Toolbar */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
            {/* Complexity Badges */}
            <div className="hidden xl:flex items-center gap-2.5 text-xs font-mono text-[var(--chalk-dim)] px-3 py-1.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)]">
              <span className="flex items-center gap-1.5" title="Time Complexity">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>{formatComplexity(question.time_complexity)}</span>
              </span>
              <span className="text-[var(--line-strong)]">·</span>
              <span className="flex items-center gap-1.5" title="Space Complexity">
                <Cpu className="w-3.5 h-3.5 text-cyan-500" />
                <span>{formatComplexity(question.space_complexity)}</span>
              </span>
            </div>

            {/* View Mode Segmented Control */}
            <div className="segmented-control">
              {[
                ['visualizer_only', 'Visualizer'],
                ['split', 'Split View'],
                ['code_only', 'Code & Logic']
              ].map(([mode, label]) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`segmented-item ${viewMode === mode ? 'active' : ''}`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Status Dropdown */}
            <div className="relative">
              <select
                value={question.status || 'to_learn'}
                onChange={(e) => onStatusChange(question.id, e.target.value)}
                className="h-8 px-2.5 rounded-lg bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-mono font-medium text-[var(--chalk)] cursor-pointer focus:outline-none focus:border-indigo-500"
              >
                <option value="to_learn" className="bg-[var(--board-raised)] text-[var(--chalk)]">To learn</option>
                <option value="in_progress" className="bg-[var(--board-raised)] text-amber-500">In progress</option>
                <option value="mastered" className="bg-[var(--board-raised)] text-emerald-500">Mastered</option>
              </select>
            </div>

            {/* Upload Button */}
            <button
              onClick={() => setShowUploader(!showUploader)}
              className={`btn-secondary h-8 px-2.5 text-xs ${
                showUploader ? 'border-indigo-500/50 bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 font-semibold' : ''
              }`}
              title="Upload custom .jsx visualizer component"
            >
              <UploadCloud className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              <span className="hidden sm:inline">Upload Viz</span>
            </button>

            {/* AI Enhance */}
            <button
              onClick={() => setShowEnhanceModal(true)}
              className="btn-secondary h-8 px-2.5 text-xs text-amber-600 dark:text-amber-300 hover:text-amber-500"
              title="Enhance problem statement with AI"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden md:inline">AI Enhance</span>
            </button>

            {/* Quick Problem Jumper */}
            <div className="relative">
              <button
                onClick={() => setShowJumper(!showJumper)}
                className="btn-secondary h-8 px-2.5 text-xs"
                title="Jump to problem (Ctrl+K)"
              >
                <Layers className="w-3.5 h-3.5 text-[var(--chalk-dim)]" />
                <span className="hidden sm:inline">Jump</span>
                <kbd className="hidden lg:inline-flex ml-1">K</kbd>
              </button>

              {showJumper && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowJumper(false)} />
                  <div className="absolute top-full mt-2 right-0 w-80 bg-[var(--board-raised)] border border-[var(--line-strong)] rounded-2xl shadow-2xl z-50 overflow-hidden fade-in">
                    <div className="p-3 border-b border-[var(--line)] flex items-center gap-2">
                      <Search className="w-3.5 h-3.5 text-[var(--chalk-dim)] shrink-0" />
                      <input
                        type="text"
                        value={jumperSearch}
                        onChange={(e) => setJumperSearch(e.target.value)}
                        placeholder="Q-001, title, category…"
                        className="bg-transparent text-[12px] text-[var(--chalk)] placeholder-[var(--chalk-faint)] focus:outline-none w-full font-mono"
                        autoFocus
                      />
                      {jumperSearch && (
                        <button onClick={() => setJumperSearch('')} className="text-[var(--chalk-faint)] hover:text-[var(--chalk)] shrink-0">
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    <div className="overflow-y-auto max-h-64 divide-y divide-[var(--line)] font-mono text-[11px]">
                      {filteredJumperQuestions.length === 0 ? (
                        <div className="p-4 text-center text-[var(--chalk-faint)]">No matches</div>
                      ) : filteredJumperQuestions.map((q) => (
                        <div
                          key={q.id}
                          onClick={() => { if (onNavigateQuestion) onNavigateQuestion(q); setShowJumper(false); }}
                          className={`px-3 py-2 flex items-center justify-between gap-2 cursor-pointer transition ${
                            q.id === question.id ? 'bg-[var(--amber-dim)] text-[var(--amber)]' : 'hover:bg-[var(--board-raised-2)] text-[var(--chalk-dim)]'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-[var(--amber)] shrink-0">#{q.display_id || q.leetcode_id}</span>
                            <span className="truncate">{q.title}</span>
                          </div>
                          <span className={`text-[10px] shrink-0 ${
                            q.difficulty === 'Easy' ? 'text-[var(--easy)]' :
                            q.difficulty === 'Medium' ? 'text-[var(--amber)]' : 'text-[var(--hard)]'
                          }`}>{q.difficulty}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Report Button */}
            <button
              onClick={() => setShowReportModal(true)}
              className="btn-secondary h-8 w-8 justify-center px-0 text-slate-400 hover:text-rose-400"
              title="Report an issue"
            >
              <Flag className="w-3.5 h-3.5" />
            </button>

            {/* LeetCode Link */}
            {question.leetcode_url && (
              <a
                href={question.leetcode_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary h-8 px-2.5 text-xs text-indigo-300 hover:text-white"
                title="Open on LeetCode"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">LeetCode</span>
              </a>
            )}
          </div>
        </div>

        {/* Navigation & Gamified Spaced Repetition Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          {/* Spaced Repetition Rater */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-slate-400 font-medium">Recall Confidence:</span>
            <button
              onClick={() => handleReviewConfidence('mastered')}
              className="conf-btn mastered"
              title="I remembered it instantly — interval extended (+4 days)"
            >
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Mastered</span>
              <span className="text-[10px] opacity-70">+4d</span>
            </button>
            <button
              onClick={() => handleReviewConfidence('practicing')}
              className="conf-btn practicing"
              title="I needed slight hints — review again in 2 days"
            >
              <span className="text-amber-400 font-bold">~</span>
              <span>Shaky</span>
              <span className="text-[10px] opacity-70">+2d</span>
            </button>
            <button
              onClick={() => handleReviewConfidence('struggling')}
              className="conf-btn struggling"
              title="I forgot the pattern — reset to tomorrow"
            >
              <span className="text-rose-400 font-bold">✗</span>
              <span>Forgot</span>
              <span className="text-[10px] opacity-70">1d</span>
            </button>
            {reviewSaved && (
              <span className="text-emerald-400 text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 fade-in">
                ✓ Recorded (+15 XP)
              </span>
            )}
          </div>

          {/* Prev / Next Problem Switcher */}
          <div className="flex items-center gap-2">
            {(() => {
              const prevLabel = prevQuestion
                ? prevQuestion.display_id || (prevQuestion.leetcode_id ? `#${prevQuestion.leetcode_id}` : '')
                : '';
              return (
                <button
                  onClick={() => prevQuestion && onNavigateQuestion && onNavigateQuestion(prevQuestion)}
                  disabled={!prevQuestion}
                  className="btn-secondary h-8 px-2.5 text-xs disabled:opacity-30 disabled:pointer-events-none"
                  title={prevQuestion ? `Previous: ${prevLabel} ${prevQuestion.title}` : 'First problem'}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{prevLabel || 'Prev'}</span>
                </button>
              );
            })()}

            <span className="text-xs font-mono text-slate-400 px-2">
              {currentIndex >= 0 ? currentIndex + 1 : '?'} / {questions.length}
            </span>

            {(() => {
              const nextLabel = nextQuestion
                ? nextQuestion.display_id || (nextQuestion.leetcode_id ? `#${nextQuestion.leetcode_id}` : '')
                : '';
              return (
                <button
                  onClick={() => nextQuestion && onNavigateQuestion && onNavigateQuestion(nextQuestion)}
                  disabled={!nextQuestion}
                  className="btn-secondary h-8 px-2.5 text-xs disabled:opacity-30 disabled:pointer-events-none"
                  title={nextQuestion ? `Next: ${nextLabel} ${nextQuestion.title}` : 'Last problem'}
                >
                  <span className="hidden sm:inline">{nextLabel || 'Next'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              );
            })()}
          </div>
        </div>

        {/* Problem Statement text */}
        <div className="text-[13px] text-[var(--chalk)] leading-relaxed whitespace-pre-wrap font-sans bg-[var(--board)] p-4 rounded-xl border border-[var(--line)] max-h-52 overflow-y-auto">
          {question.description || 'No description available for this problem.'}
        </div>

        {/* Collapsible Approach & Hints Accordion */}
        <div>
          <button
            onClick={() => setShowApproach(!showApproach)}
            className="flex items-center gap-2 text-xs font-mono text-indigo-500 dark:text-indigo-300 hover:text-indigo-600 dark:hover:text-indigo-200 transition-colors cursor-pointer group"
          >
            <span className="text-[11px] group-hover:translate-x-0.5 transition-transform">
              {showApproach ? '▾' : '▸'}
            </span>
            <span className="font-semibold underline decoration-indigo-500/40 underline-offset-4">
              {showApproach ? 'Hide algorithm approach & invariants' : 'Show algorithm approach & invariants'}
            </span>
          </button>
          {showApproach && (
            <div className="approach-panel fade-in">
              {question.approach || 'Standard optimal algorithm approach.'}
            </div>
          )}
        </div>
      </div>

      {/* ── ZONE 2: Interactive Visualizer Stage (IDE Workbench Card) ── */}
      <div className="card specular-card shadow-2xl overflow-hidden rounded-2xl bg-[var(--board-raised)] border border-[var(--line)]">
        {/* Modern Tier Switcher Bar */}
        <div className="flex items-center gap-2 p-3 border-b border-[var(--line)] bg-[var(--board-raised-2)] overflow-x-auto scrollbar-none">
          <span className="text-xs font-mono text-[var(--chalk-dim)] mr-2 font-medium">Approach Tier:</span>
          {[
            { id: 'intuitive', label: '1. Intuitive', sub: 'Brute Force' },
            { id: 'better', label: '2. Better', sub: 'Sub-Optimal' },
            { id: 'optimal', label: '3. Optimal', sub: 'Single Pass / Optimal' }
          ].map((tier) => {
            const isActive = activeTier === tier.id;
            const hasCustomAnimation = Boolean(visualizerEntry?.approaches?.[tier.id]);
            return (
              <button
                key={tier.id}
                onClick={() => handleSelectTier(tier.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-200 border border-indigo-500/40 shadow-[0_0_12px_rgba(99,102,241,0.25)] font-semibold'
                    : 'text-[var(--chalk-muted)] hover:text-[var(--chalk)] hover:bg-[var(--board-hover)] border border-transparent'
                }`}
              >
                <span>{tier.label}</span>
                <span className="text-[10.5px] opacity-70 font-normal">({tier.sub})</span>
                {hasCustomAnimation && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 ml-0.5 shadow-[0_0_6px_rgba(6,182,212,0.8)]" title="Dedicated interactive visualizer available" />
                )}
              </button>
            );
          })}
        </div>

        {/* Main Stage Grid */}
        <div
          className="stage"
          style={{
            gridTemplateColumns:
              viewMode === 'split' ? '1.15fr 0.95fr' : '1fr'
          }}
        >
          {/* Canvas Column */}
          {viewMode !== 'code_only' && (
            <div className="canvas-col">
              <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-[var(--line)]">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)] shrink-0" />
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-300 uppercase tracking-wider shrink-0">
                    Step {currentStep + 1} of {maxSteps}
                  </span>
                  <span className="text-[var(--chalk-faint)] shrink-0">·</span>
                  <h2 className="text-sm font-semibold font-sans text-[var(--chalk)] truncate" id="stepTitle">
                    {currentStepData?.title || `Step ${currentStep + 1} Execution`}
                  </h2>
                </div>
              </div>

              {Component ? (
                <VisualizerErrorBoundary
                  onReset={() => setCurrentStep(0)}
                  onSwitchToCode={() => setViewMode('code_only')}
                >
                  <Component
                    currentStep={currentStep}
                    onStepChange={setCurrentStep}
                    customInput={customInput}
                    customTarget={customTarget}
                    approachTier={activeTier}
                  />
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
                  className={`flex flex-col items-center justify-center py-16 text-center space-y-3 cursor-pointer border border-dashed rounded-[3px] transition-all duration-200 ${
                    isBarDragging
                      ? 'border-[var(--amber)] bg-[var(--amber-dim)]'
                      : 'border-[var(--line-strong)] hover:border-[var(--amber)]'
                  }`}
                >
                  <input
                    type="file"
                    ref={barFileInputRef}
                    onChange={handleBarFileInput}
                    accept=".jsx,.tsx,.js,.ts"
                    className="hidden"
                  />
                  <UploadCloud className="w-8 h-8 text-[var(--amber)]" />
                  <p className="text-[13px] font-medium text-[var(--chalk)]">
                    {isBarDragging ? 'Drop your .jsx file now!' : 'No visualizer for this question yet'}
                  </p>
                  <p className="text-[12px] text-[var(--chalk-dim)] max-w-sm">
                    Drag &amp; drop your React visualizer <code className="text-[var(--amber)]">.jsx</code> file here, or click to browse.
                  </p>
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDirectCopyPrompt();
                      }}
                      className="chalk-btn chalk-btn-amber"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{copiedDirect ? 'Copied Prompt!' : 'Copy AI Prompt'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowUploader(true);
                      }}
                      className="chalk-btn"
                    >
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>Upload Code</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Live Variable Inspector HUD */}
              {currentVariables && Object.keys(currentVariables).length > 0 && (
                <div className="px-5 pb-3">
                  <VariableInspector variables={currentVariables} />
                </div>
              )}
            </div>
          )}

          {/* Code Column */}
          {viewMode !== 'visualizer_only' && (
            <div className="code-col">
              {!Component && viewMode === 'code_only' && (
                <>
                  {/* ── Header bar with action buttons ── */}
                  <div className="p-3 bg-[var(--board-raised-2)] border-b border-[var(--line)] flex items-center justify-between gap-3 text-[11.5px] font-mono flex-wrap">
                    <span className="text-[var(--chalk-dim)] flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-[var(--amber)]" />
                      Code Execution View · No visualizer uploaded yet.
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleDirectCopyPrompt}
                        className="chalk-btn chalk-btn-amber py-1"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>{copiedDirect ? 'Copied!' : 'Copy AI Prompt'}</span>
                      </button>
                      <button
                        onClick={() => setShowUploader(true)}
                        className="chalk-btn py-1"
                      >
                        <UploadCloud className="w-3 h-3" />
                        <span>Upload .jsx</span>
                      </button>
                    </div>
                  </div>

                  {/* ── Drag-and-drop zone in code column ── */}
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
                        {' '}above
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

        {/* ── Step progress bar ── */}
        <div className="step-progress-track" style={{ margin: '0' }}>
          <div
            className="step-progress-fill"
            style={{ width: `${maxSteps > 1 ? (currentStep / (maxSteps - 1)) * 100 : 100}%` }}
          />
        </div>

        {/* ── Docked Transport HUD (Senior Media Player HUD) ── */}
        <div className="transport-hud px-5 py-3 border-t border-[var(--line)] bg-[var(--board-raised)] flex items-center justify-between gap-4 flex-wrap">
          {/* Scrubber Ticks */}
          <div className="flex items-center gap-1.5" id="ticks">
            {Array.from({ length: maxSteps }).map((_, idx) => {
              const isCurrent = idx === currentStep;
              const isDone = idx < currentStep;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentStep(idx);
                    sound.playStep(500 + idx * 30);
                    if (idx === maxSteps - 1) triggerCompletionCelebration();
                  }}
                  className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                    isCurrent
                      ? 'w-7 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]'
                      : isDone
                      ? 'w-3.5 bg-indigo-500/40 hover:bg-indigo-500/60'
                      : 'w-3.5 bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] border border-[var(--line)]'
                  }`}
                  title={`Step ${idx + 1} of ${maxSteps}`}
                />
              );
            })}
          </div>

          {/* Center Transport Controls HUD */}
          <div className="flex items-center gap-3">
            {/* Reset */}
            <button
              onClick={handleReset}
              className="p-2 rounded-xl text-[var(--chalk-dim)] hover:text-[var(--chalk)] hover:bg-[var(--board-hover)] transition-all cursor-pointer"
              title="Reset to step 1 (R)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Prominent Play / Pause Button with Glow */}
            <button
              onClick={togglePlay}
              className={`h-9 px-4 rounded-xl flex items-center gap-2 text-xs font-mono font-semibold transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/40 shadow-[0_0_16px_rgba(245,158,11,0.3)]'
                  : 'btn-primary'
              }`}
              title="Play / Pause (Space)"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>PAUSE</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  <span>AUTO PLAY</span>
                </>
              )}
            </button>

            {/* Loop Toggle */}
            <button
              onClick={() => setLoop(!loop)}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                loop
                  ? 'text-cyan-600 dark:text-cyan-300 bg-cyan-500/15 border border-cyan-500/30'
                  : 'text-[var(--chalk-dim)] hover:text-[var(--chalk)] hover:bg-[var(--board-hover)]'
              }`}
              title={loop ? 'Looping enabled' : 'Looping disabled'}
            >
              <Repeat className="w-4 h-4" />
            </button>

            {/* Speed Selector Segmented Control */}
            <div className="flex items-center bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl p-0.5 text-xs font-mono">
              {[0.5, 1, 1.5, 2].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                    speed === s
                      ? 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 font-bold shadow-sm'
                      : 'text-[var(--chalk-dim)] hover:text-[var(--chalk)]'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>

            {/* Step Counter Badge */}
            <span className="text-xs font-mono text-[var(--chalk-dim)] ml-1 px-2 py-1 rounded-lg bg-[var(--board-raised-2)] border border-[var(--line)]">
              {currentStep + 1} / {maxSteps}
            </span>

            {/* Keyboard Shortcuts Trigger */}
            <button
              type="button"
              onClick={() => setShowShortcutsModal(true)}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] border border-[var(--line)] text-xs font-mono text-[var(--chalk-dim)] hover:text-[var(--chalk)] transition-all cursor-pointer"
              title="View keyboard shortcuts (?)"
            >
              <Keyboard className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              <span>Keys</span>
              <kbd className="text-[10px]">?</kbd>
            </button>
          </div>

          {/* Step Back / Step Forward Navigation */}
          <div className="flex items-center gap-2">
            <button
              className="btn-secondary h-8 px-3 text-xs disabled:opacity-30 disabled:pointer-events-none"
              id="prevBtn"
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              title="Previous step (←)"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Step</span>
            </button>
            <button
              className="btn-primary h-8 px-3.5 text-xs disabled:opacity-30 disabled:pointer-events-none"
              id="nextBtn"
              onClick={handleNextStep}
              disabled={currentStep === maxSteps - 1}
              title="Next step (→)"
            >
              <span>Step</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>


      {/* ── Uploader Modal Overlay ── */}
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

      {/* ── Zone 3: Knowledge Hub ── */}
      <div className="card overflow-hidden">
        {/* Tab bar */}
        <div className="flex items-center gap-5 border-b border-[var(--line)] px-4">
          {[['comments','Discussion', comments.length],['public_notes','Notes', publicNotes.length],['private_notes','Private', null]].map(([id, label, count]) => (
            <button
              key={id}
              onClick={() => setHubTab(id)}
              className={`tab-btn ${hubTab === id ? 'active' : ''}`}
            >
              {label}{count !== null && <span className="text-[var(--chalk-faint)] ml-0.5 font-normal">({count})</span>}
            </button>
          ))}
        </div>

        {hubTab === 'comments' && (
          <div className="p-4 space-y-4">
            <form onSubmit={handlePostComment} className="space-y-2">
              <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--chalk-faint)]">
                <span className="hub-avatar">{currentUser?.avatar || '⚡'}</span>
                <span>Posting as <span className="text-[var(--chalk)] font-medium">{currentUser?.username || 'Guest'}</span></span>
                <span className="text-[var(--teal)] ml-auto">+10 XP on post</span>
              </div>
              <textarea
                rows={2}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Ask a question, share an insight, or discuss edge cases…"
                className="hub-textarea"
                style={{ resize: 'none' }}
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isPostingComment || !newComment.trim()}
                  className="chalk-btn chalk-btn-amber disabled:opacity-30"
                >
                  <Send className="w-3 h-3" />
                  <span>{isPostingComment ? 'Posting…' : 'Post'}</span>
                </button>
              </div>
            </form>

            <div className="space-y-3">
              {comments.length === 0 ? (
                <div className="py-12 text-center">
                  <MessageSquare className="w-7 h-7 text-[var(--chalk-faint)] mx-auto mb-2 opacity-50" />
                  <p className="text-[12px] text-[var(--chalk-faint)]">No comments yet — be the first.</p>
                </div>
              ) : (
                comments.map((c) => (
                  <div key={c.id} className="hub-comment space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="hub-avatar">{c.avatar || '⚡'}</span>
                        <span className="text-[12px] font-medium text-[var(--chalk)]">{c.username}</span>
                        <span className="text-[10.5px] font-mono text-[var(--chalk-faint)]">
                          {c.created_at ? new Date(c.created_at).toLocaleDateString() : ''}
                        </span>
                      </div>
                      <button
                        onClick={() => handleUpvoteComment(c.id)}
                        className="hub-upvote"
                        title="Upvote"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span className="font-bold">{c.upvotes || 0}</span>
                      </button>
                    </div>
                    <p className="text-[12.5px] text-[var(--chalk-dim)] font-sans leading-relaxed whitespace-pre-wrap pl-8">
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
              <span className="text-[11.5px] text-[var(--chalk-faint)] font-sans">
                Community intuitions, pattern breakdowns, interview tricks
              </span>
              <button
                onClick={() => setShowAddPublicNote(!showAddPublicNote)}
                className="chalk-btn"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showAddPublicNote ? 'Cancel' : 'Share Note'}</span>
              </button>
            </div>

            {/* Form to add public note */}
            {showAddPublicNote && (
              <form onSubmit={handlePostPublicNote} className="p-4 rounded-[4px] bg-[var(--board-raised-2)] border border-[var(--teal)]/30 space-y-3 fade-in">
                <input
                  type="text"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  placeholder="Note Title: e.g. Invariant: Sliding window boundary condition"
                  className="hub-input"
                  required
                />
                <textarea
                  rows={3}
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  placeholder="Write the core algorithmic insight, invariant, or trick to remember..."
                  className="hub-textarea"
                  required
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddPublicNote(false)}
                    className="chalk-btn"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPostingNote || !newNoteContent.trim()}
                    className="chalk-btn chalk-btn-amber disabled:opacity-30"
                  >
                    {isPostingNote ? 'Publishing...' : 'Publish to Community'}
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-3">
              {publicNotes.length === 0 ? (
                <div className="py-12 text-center">
                  <BookOpen className="w-7 h-7 text-[var(--chalk-faint)] mx-auto mb-2 opacity-50" />
                  <p className="text-[12px] text-[var(--chalk-faint)]">No notes yet — share the first insight.</p>
                </div>
              ) : (
                publicNotes.map((note) => (
                  <div key={note.id} className="note-card space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="hub-avatar teal">{note.avatar || '⚡'}</span>
                        <div>
                          <h4 className="text-[12.5px] font-medium text-[var(--chalk)]">{note.title || 'Algorithmic Insight'}</h4>
                          <span className="text-[10.5px] font-mono text-[var(--chalk-faint)]">by {note.username}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleUpvotePublicNote(note.id)}
                        className="hub-upvote"
                        title="Helpful"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span className="font-bold">{note.upvotes || 0}</span>
                      </button>
                    </div>
                    <p className="text-[12.5px] text-[var(--chalk-dim)] font-sans leading-relaxed whitespace-pre-wrap pl-8">
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
              <span className="text-[11px] font-mono text-[var(--chalk-faint)]">
                Private to @{currentUser?.username || 'you'} · stored locally
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadStudySheet}
                  className="chalk-btn"
                  title="Download Markdown Study Sheet for revision"
                >
                  <Download className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Export Study Sheet (.md)</span>
                </button>

                <button
                  onClick={handleSavePrivateNotes}
                  className="chalk-btn chalk-btn-amber"
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
              className="hub-textarea font-mono"
            />

            <div className="flex items-center justify-between text-[11px] font-mono text-[var(--chalk-faint)]">
              <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Stored locally in SQLite, never sent anywhere</span>
              <span className="text-[var(--amber)] opacity-75">Ctrl+S to save</span>
            </div>
          </div>
        )}
      </div>

      {/* Report Solution Modal */}
      <ReportSolutionModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        question={question}
        currentTier={activeTier}
        activeLanguage="cpp"
        currentUser={currentUser}
      />

      {/* AI Question Enhancer & Specification Editor Modal */}
      <AiQuestionEnhancerModal
        isOpen={showEnhanceModal}
        onClose={() => setShowEnhanceModal(false)}
        question={question}
        solutions={solutions}
        onQuestionUpdated={(updated) => {
          if (onUpdateQuestion) onUpdateQuestion(updated);
        }}
      />

      {/* Keyboard Shortcuts Modal */}
      <KeyboardShortcutsModal
        isOpen={showShortcutsModal}
        onClose={() => setShowShortcutsModal(false)}
      />
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
