import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
  const activeApproachData = visualizerEntry?.approaches?.[activeTier] || null;
  const currentApproachObj = useMemo(() => {
    const list = Array.isArray(question.approaches_data) ? question.approaches_data : [];
    if (list.length === 0) return null;
    if (activeTier === 'intuitive') return list[0];
    if (activeTier === 'better') return list.length >= 3 ? list[1] : (list.length === 2 ? list[0] : list[0]);
    return list[list.length - 1];
  }, [question.approaches_data, activeTier]);
  const stepsList = activeApproachData?.steps || visualizerEntry?.steps || null;
  const maxSteps = stepsList?.length || 6;
  const hasVisualizer = Boolean(Component);

  const [currentStep, setCurrentStep] = useState(0);
  const currentStepData = stepsList && stepsList[currentStep] ? stepsList[currentStep] : null;
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
1. ALGOVISION STUDIO ARCHITECTURE & CONTEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The Studio already provides:
  • Approach tier tabs (Intuitive / Better / Optimal) above the stage
  • Split-screen layout: your canvas LEFT, syntax-highlighted code viewer RIGHT
  • Transport controls: Play/Pause, step ticks bar, Reset, Speed 0.5x-2x
  • Step title and Prev/Next navigation
  • Educational Explanation & Live Variables Inspector Panel below the stage

DO NOT render: outer card frames, "Step X of Y" counters, prev/next buttons, language tabs, or copy-code buttons. Just render the visualization canvas content.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. AESTHETIC: APPLE macOS & HIG DESIGN SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The visualizer must feel like an Apple native product (macOS Sequoia / iOS).
Keep the visualizer theme and the site theme IDENTICAL:

CSS VARIABLES (Mandatory — automatically supports Light & Dark themes):
  Canvas / Stage bg:    var(--board)
  Card / Node fill:     var(--board-raised)
  Subtle container:     var(--board-raised-2)
  Hairline border:      var(--line)
  Primary text:         var(--chalk)
  Secondary / dim text: var(--chalk-dim)
  Faint index text:     var(--chalk-faint)

AUTHENTIC APPLE ACCENT PALETTE:
  Active Focus / Pointers:  var(--indigo) (#0a84ff - Apple System Blue)
  Comparison / Scanning:    var(--amber)  (#ff9f0a - Apple System Orange)
  Success / Matched / Done: var(--easy)   (#30d158 - Apple System Mint/Green)
  Conflict / Eliminated:    var(--hard)   (#ff453a - Apple System Coral Red)
  Secondary Pointer / Aux:  var(--teal)   (#64d2ff - Apple System Cyan)
  Special Structure / Hash: var(--purple) (#bf5af2 - Apple System Purple)

GEOMETRY & STYLING RULES:
  • Rounded Squircles: Use rx="10" or rx="8" for array/node boxes.
  • Glassmorphism: Frosted translucent fills, subtle drop shadows, and delicate 1px specular borders.
  • Floating Pointers: Render pointers as floating Apple rounded pill badges with indicator arrows (↓ top, ↑ bottom), NOT hand-drawn scratchy text.
  • Typography: font-family="'SF Mono', 'JetBrains Mono', monospace" for data values; "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" for badges.
  • Prohibited: Do NOT use rough chalkboard filters (filter="url(#rough)"), dark chalkboard slate (#12181a), or Kalam cursive font.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. DEEP EDUCATIONAL EXPLANATION & PEDAGOGY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Every step object in the \`steps\` array MUST be rich, intuitive, and teach the algorithm with senior clarity:

Each step MUST contain:
  • title: Concise action title (e.g. "2. Compare nums[left] (2) + nums[right] (23) == 25")
  • phase: Semantic phase badge (e.g. 'INITIALIZING' | 'SCANNING' | 'COMPARING' | 'SWAPPING' | 'PARTITIONING' | 'MATCH_FOUND' | 'PRUNING')
  • explain: 2-3 clear educational sentences explaining WHAT happened, WHY this step is taken, and how it progresses the algorithm.
  • intuition: A "Why this works / Key takeaway" note explaining how this decision prunes candidates or maintains the loop invariant.
  • variables: An object of all live pointers and accumulators (e.g. { left: 0, right: 5, sum: 25, target: 26 })
  • codeLine: EXACT 1-indexed line number in the C++ solution corresponding to this execution step!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. SUPERIOR ANIMATIONS & DYNAMIC MOTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  • Fluid transitions on moving elements: CSS transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1).
  • Distinct Visual States:
      - Unprocessed / Inactive: Subdued frosted opacity (0.5).
      - Scanning / In-Focus: Apple System Blue glow halo with scale(1.03).
      - Comparing: Apple Orange dual-focus with comparison badge or connecting arc.
      - Matched / Solved: Apple Mint emerald glow halo with soft spring pop.
      - Eliminated / Discarded: Muted strike or dimming.
  • Data Structure Primitives:
      - Arrays: Sleek squircle cells with indices below and floating pill pointers above.
      - Linked Lists: Apple 3-compartment squircle nodes (prev | val | next) + bezier arrow curves.
      - Trees: Apple frosted glass circles with glowing branch lines.
      - DP Matrices: Heatmap grid with glowing active cell and reference source arrows.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. MULTI-LANGUAGE SOLUTIONS (3 TIERS × 3 LANGUAGES)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
For EACH approach tier (Intuitive, Better, Optimal), provide complete working code:
  • C++    (Full function with line comments, codeLine sync basis)
  • Java   (Full class Solution { public ... } wrapper)
  • Python (Full function with type hints)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. COMPLETE COMPONENT SCAFFOLD (DROP-IN READY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
\`\`\`jsx
import React, { useMemo } from 'react';
// Available primitives: ArrayView, LinkedListView, TreeGraphView, MatrixView, StackQueueView
import ArrayView from '../components/primitives/ArrayView';

export const approaches = {
  intuitive: {
    title: 'Intuitive: Brute Force',
    badge: 'Brute Force',
    complexity: { time: 'O(N²)', space: 'O(1)' },
    steps: [
      {
        title: '1. Initialize pointers',
        phase: 'INITIALIZING',
        codeLine: 3,
        variables: { i: 0, j: 1 },
        explain: 'Start at index 0 and inspect all pairs sequentially.',
        intuition: 'Brute force checks every possible combination to guarantee finding a solution.',
        activeIndex: 0,
        compareIndex: 1,
      }
    ],
    solutions: {
      cpp: \`// C++ Brute Force — O(N²)\`,
      java: \`// Java Brute Force — O(N²)\`,
      python: \`# Python Brute Force — O(N²)\`
    }
  },
  better: {
    title: 'Better: Hash / Sub-Optimal',
    badge: 'Sub-Optimal',
    complexity: { time: 'O(N)', space: 'O(N)' },
    steps: [ /* rich steps with phase, explain, intuition, variables, codeLine */ ],
    solutions: { cpp: \`...\`, java: \`...\`, python: \`...\` }
  },
  optimal: {
    title: 'Optimal: Optimal Two Pointers / Direct',
    badge: 'Optimal',
    complexity: { time: '${timeC}', space: '${spaceC}' },
    steps: [ /* rich steps with phase, explain, intuition, variables, codeLine */ ],
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
    <div className="w-full flex flex-col items-center justify-center p-4">
      {/* Visual Canvas using Apple Design Primitives */}
      <ArrayView
        items={stepData.items || [2, 7, 11, 15]}
        pointers={[
          { index: stepData.activeIndex ?? 0, label: 'curr', color: 'blue' },
          { index: stepData.compareIndex ?? 1, label: 'scan', color: 'amber' }
        ]}
      />
    </div>
  );
}
\`\`\`

Return ONLY the complete, ready-to-run React JSX code block. No text outside the code block.`;

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

  // Compute active line for real-time code sync
  const activeCodeLine = currentStepData?.codeLines || currentStepData?.codeLine || currentStepData?.highlightLines || currentStepData?.line || null;

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
      <div className="card specular-card shadow-sm p-5 sm:p-6 space-y-4 bg-[var(--board-raised)] border border-[var(--line)] rounded-lg">
        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[var(--line)] pb-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <button
              onClick={onBack}
              className="p-2 rounded-md bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] border border-[var(--line)] text-[var(--chalk-dim)] hover:text-[var(--chalk)] transition-all shrink-0 cursor-pointer group"
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

                {/* Step & Substep Badge */}
                {question.step_no && (
                  <span className="text-xs font-sans font-medium px-2 py-0.5 rounded-full bg-[var(--board-raised-2)] text-[var(--chalk-dim)] border border-[var(--line)]">
                    Step {question.step_no}: {question.step_name} {question.substep_name ? `· ${question.substep_name}` : ''}
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
            {/* Dynamic Complexity Badges */}
            <div className="hidden xl:flex items-center gap-2.5 text-xs font-mono text-[var(--chalk-dim)] px-3 py-1.5 rounded-md bg-[var(--board-raised-2)] border border-[var(--line)]">
              <span className="flex items-center gap-1.5" title="Time Complexity">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>{formatComplexity(currentApproachObj?.time_complexity || question.time_complexity)}</span>
              </span>
              <span className="text-[var(--line-strong)]">·</span>
              <span className="flex items-center gap-1.5" title="Space Complexity">
                <Cpu className="w-3.5 h-3.5 text-cyan-500" />
                <span>{formatComplexity(currentApproachObj?.space_complexity || question.space_complexity)}</span>
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
                  <div className="absolute top-full mt-2 right-0 w-80 bg-[var(--board-raised)] border border-[var(--line-strong)] rounded-lg shadow-xl z-50 overflow-hidden fade-in">
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

            {/* Striver YouTube Tutorial Link */}
            {question.youtube_url && (
              <a
                href={question.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary h-8 px-2.5 text-xs text-rose-500 hover:text-rose-400 bg-rose-500/10 border border-rose-500/30 font-semibold"
                title="Watch Striver's Video Editorial"
              >
                <Play className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span className="hidden sm:inline">Striver Video</span>
              </a>
            )}

            {/* TakeUForward Article Link */}
            {question.article_url && (
              <a
                href={question.article_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary h-8 px-2.5 text-xs text-teal-600 dark:text-teal-300 hover:text-teal-200 bg-teal-500/10 border border-teal-500/30"
                title="Read Editorial on TakeUForward"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Editorial</span>
              </a>
            )}

            {/* LeetCode Link */}
            {question.leetcode_url && (
              <a
                href={question.leetcode_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary h-8 px-2.5 text-xs text-indigo-400 hover:text-indigo-200"
                title="Open on LeetCode"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">LeetCode</span>
              </a>
            )}

            {/* TUF+ Link */}
            {question.plus_url && (
              <a
                href={question.plus_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary h-8 px-2.5 text-xs text-[var(--chalk-dim)] hover:text-[var(--chalk)]"
                title="Practice on TUF+"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">TUF+</span>
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

        {/* Problem Statement & Examples */}
        <div className="space-y-3.5">
          <div className="text-[13px] text-[var(--chalk)] leading-relaxed whitespace-pre-wrap font-sans bg-[var(--board)] p-4 rounded-xl border border-[var(--line)] max-h-60 overflow-y-auto">
            <div className="font-semibold text-xs text-[var(--indigo)] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Problem Statement</span>
            </div>
            {question.problem_statement || question.description || 'No description available for this problem.'}
          </div>

          {/* Examples & Test Cases */}
          {Array.isArray(question.examples) && question.examples.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-sans font-semibold text-[var(--chalk-dim)] uppercase tracking-wider">
                <span>Examples & Test Cases</span>
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                {question.examples.map((ex, exIdx) => (
                  <div key={exIdx} className="p-3.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] font-mono text-xs whitespace-pre-wrap text-[var(--chalk)] leading-relaxed">
                    {ex}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Collapsible Approach & Invariants Accordion */}
        <div>
          <button
            onClick={() => setShowApproach(!showApproach)}
            className="flex items-center gap-2 text-xs font-mono text-indigo-500 dark:text-indigo-300 hover:text-indigo-600 dark:hover:text-indigo-200 transition-colors cursor-pointer group"
          >
            <span className="text-[11px] group-hover:translate-x-0.5 transition-transform">
              {showApproach ? '▾' : '▸'}
            </span>
            <span className="font-semibold underline decoration-indigo-500/40 underline-offset-4">
              {showApproach
                ? 'Hide algorithm breakdown & complexity details'
                : `Show ${activeTier === 'intuitive' ? 'Brute Force' : activeTier === 'better' ? 'Better Approach' : 'Optimal Approach'} breakdown & complexity`}
            </span>
          </button>
          {showApproach && (
            <div className="approach-panel fade-in space-y-3 mt-2.5 p-4.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)]">
              <div>
                <h4 className="text-xs font-bold text-[var(--indigo)] uppercase tracking-wider mb-1.5">
                  {currentApproachObj?.approach_name || (activeTier === 'intuitive' ? 'Intuitive / Brute Force Approach' : activeTier === 'better' ? 'Better Approach' : 'Optimal Approach')}
                </h4>
                <p className="text-xs text-[var(--chalk)] leading-relaxed whitespace-pre-wrap font-sans">
                  {currentApproachObj?.algorithm || question.approach || 'Detailed algorithm walkthrough.'}
                </p>
              </div>

              {(currentApproachObj?.time_complexity_details || currentApproachObj?.space_complexity_details) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2.5 border-t border-[var(--line)] font-mono text-[11px]">
                  {currentApproachObj?.time_complexity_details && (
                    <div className="p-3 rounded-lg bg-[var(--board)] border border-[var(--line)]">
                      <span className="font-bold text-[var(--amber)]">Time Complexity:</span>
                      <p className="mt-1 text-[var(--chalk-dim)] leading-relaxed">{currentApproachObj.time_complexity_details}</p>
                    </div>
                  )}
                  {currentApproachObj?.space_complexity_details && (
                    <div className="p-3 rounded-lg bg-[var(--board)] border border-[var(--line)]">
                      <span className="font-bold text-[var(--teal)]">Space Complexity:</span>
                      <p className="mt-1 text-[var(--chalk-dim)] leading-relaxed">{currentApproachObj.space_complexity_details}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── ZONE 2: Interactive Visualizer Stage (macOS Window Frame) ── */}
      <div className="macos-window mb-6">
        {/* macOS Titlebar Chrome with Traffic Light Dots */}
        <div className="macos-titlebar flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="traffic-lights">
              <span className="traffic-light traffic-light-red" />
              <span className="traffic-light traffic-light-yellow" />
              <span className="traffic-light traffic-light-green" />
            </div>
            <span className="text-xs font-sans font-medium text-[var(--chalk-dim)] hidden sm:inline">
              AlgoVision Studio — {activeApproachData?.title || question.title}
            </span>
          </div>

          {/* Apple Segmented Approach Switcher */}
          <div className="segmented-control">
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
                  className={`segmented-item flex items-center gap-1.5 ${isActive ? 'active' : ''}`}
                >
                  <span>{tier.label}</span>
                  {hasCustomAnimation && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)]" title="Dedicated interactive visualizer available" />
                  )}
                </button>
              );
            })}
          </div>
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
              <div className="flex items-center justify-between gap-3 mb-4 pb-2.5 border-b border-[var(--line)]">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-[var(--indigo)] shrink-0 animate-pulse shadow-[0_0_8px_rgba(10,132,255,0.6)]" />
                  <span className="text-xs font-sans font-bold text-[var(--indigo)] uppercase tracking-wider shrink-0">
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
                  className={`flex flex-col items-center justify-center py-16 text-center space-y-3 cursor-pointer border border-dashed rounded-2xl transition-all duration-200 ${
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
                  <p className="text-[13px] font-sans font-medium text-[var(--chalk)]">
                    {isBarDragging ? 'Drop your .jsx file now!' : 'No visualizer for this question yet'}
                  </p>
                  <p className="text-[12px] text-[var(--chalk-dim)] max-w-sm font-sans">
                    Drag &amp; drop your React visualizer <code className="text-[var(--amber)] font-mono">.jsx</code> file here, or click to browse.
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
                      <span>{copiedDirect ? 'Copied Prompt!' : 'Copy AI Prompt'}</span>
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

              {/* Apple-Grade Educational Explanation & Invariant Panel */}
              {currentStepData && (
                <div className="mt-4 p-4 rounded-2xl bg-[var(--board-raised-2)] border border-[var(--line)] backdrop-blur-xl shadow-sm transition-all duration-300">
                  <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--indigo-dim)] border border-[var(--indigo)]/30 text-[var(--indigo)] text-[10.5px] font-sans font-bold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--indigo)] animate-pulse" />
                        {currentStepData.phase || 'Algorithmic Execution'}
                      </span>
                      <span className="text-xs font-sans font-semibold text-[var(--chalk)]">
                        {currentStepData.title}
                      </span>
                    </div>

                    {currentStepData.codeLine && (
                      <span className="text-[11px] font-mono text-[var(--chalk-dim)] px-2.5 py-0.5 rounded-full bg-[var(--board-raised)] border border-[var(--line)]">
                        Synced with C++ line <strong className="text-[var(--indigo)]">{currentStepData.codeLine}</strong>
                      </span>
                    )}
                  </div>

                  {(currentStepData.explain || currentStepData.explanation) && (
                    <p className="text-[13px] text-[var(--chalk-dim)] leading-relaxed font-sans mb-3">
                      {currentStepData.explain || currentStepData.explanation}
                    </p>
                  )}

                  {currentStepData.intuition && (
                    <div className="p-3 rounded-xl bg-[var(--indigo-dim)]/40 border border-[var(--indigo)]/20 text-xs text-[var(--chalk)] mb-3 flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-[var(--indigo)] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[var(--indigo)] block mb-0.5 font-semibold">Algorithmic Invariant & Intuition</strong>
                        <span>{currentStepData.intuition}</span>
                      </div>
                    </div>
                  )}

                  {currentStepData.variables && Object.keys(currentStepData.variables).length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap pt-2.5 border-t border-[var(--line)]">
                      <span className="text-[11px] font-sans text-[var(--chalk-faint)] font-medium">Memory &amp; State:</span>
                      {Object.entries(currentStepData.variables).map(([k, v]) => (
                        <span
                          key={k}
                          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--board-raised)] border border-[var(--line)] font-mono text-[11px]"
                        >
                          <span className="text-[var(--chalk-dim)]">{k}:</span>
                          <strong className="text-[var(--indigo)] font-semibold">{String(v)}</strong>
                        </span>
                      ))}
                    </div>
                  )}
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

        {/* ── Docked Transport HUD (VS Code Debugger Control Bar) ── */}
        <div className="transport-hud px-4 py-2.5 border-t border-[var(--line)] bg-[var(--board-raised)] flex items-center justify-between gap-3 flex-wrap">
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
                  className={`h-1.5 rounded-full transition-all duration-150 cursor-pointer ${
                    isCurrent
                      ? 'w-6 bg-indigo-500'
                      : isDone
                      ? 'w-3 bg-indigo-500/40 hover:bg-indigo-500/60'
                      : 'w-3 bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] border border-[var(--line)]'
                  }`}
                  title={`Step ${idx + 1} of ${maxSteps}`}
                />
              );
            })}
          </div>

          {/* Center Transport Controls HUD */}
          <div className="flex items-center gap-2">
            {/* Restart (R) */}
            <button
              onClick={handleReset}
              className="p-1.5 rounded-md text-[var(--chalk-dim)] hover:text-[var(--chalk)] hover:bg-[var(--board-hover)] border border-transparent hover:border-[var(--line)] transition-all cursor-pointer"
              title="Restart execution (R)"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Previous Step (←) */}
            <button
              className="p-1.5 rounded-md text-[var(--chalk-dim)] hover:text-[var(--chalk)] hover:bg-[var(--board-hover)] border border-transparent hover:border-[var(--line)] transition-all cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
              id="prevBtn"
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              title="Previous step (←)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Play / Pause (Space) */}
            <button
              onClick={togglePlay}
              className={`h-8 px-3 rounded-md flex items-center gap-1.5 text-xs font-mono font-semibold transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30'
                  : 'btn-primary'
              }`}
              title="Play / Pause (Space)"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  <span>Play</span>
                </>
              )}
            </button>

            {/* Next Step (→) */}
            <button
              className="p-1.5 rounded-md text-[var(--chalk-dim)] hover:text-[var(--chalk)] hover:bg-[var(--board-hover)] border border-transparent hover:border-[var(--line)] transition-all cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
              id="nextBtn"
              onClick={handleNextStep}
              disabled={currentStep === maxSteps - 1}
              title="Next step (→)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <span className="text-[var(--line-strong)] mx-0.5 text-xs">·</span>

            {/* Loop Toggle */}
            <button
              onClick={() => setLoop(!loop)}
              className={`p-1.5 rounded-md transition-all cursor-pointer ${
                loop
                  ? 'text-cyan-600 dark:text-cyan-300 bg-cyan-500/15 border border-cyan-500/30'
                  : 'text-[var(--chalk-dim)] hover:text-[var(--chalk)] hover:bg-[var(--board-hover)]'
              }`}
              title={loop ? 'Looping enabled' : 'Looping disabled'}
            >
              <Repeat className="w-3.5 h-3.5" />
            </button>

            {/* Speed Selector Segmented Control */}
            <div className="flex items-center bg-[var(--board-raised-2)] border border-[var(--line)] rounded-md p-0.5 text-[11px] font-mono">
              {[0.5, 1, 1.5, 2].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                    speed === s
                      ? 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 font-bold'
                      : 'text-[var(--chalk-dim)] hover:text-[var(--chalk)]'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>

            {/* Step Counter Badge */}
            <span className="text-xs font-mono text-[var(--chalk-dim)] px-2 py-0.5 rounded-md bg-[var(--board-raised-2)] border border-[var(--line)]">
              {currentStep + 1} / {maxSteps}
            </span>

            {/* Keyboard Shortcuts Trigger */}
            <button
              type="button"
              onClick={() => setShowShortcutsModal(true)}
              className="hidden md:flex items-center gap-1.5 px-2 py-1 rounded-md bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] border border-[var(--line)] text-xs font-mono text-[var(--chalk-dim)] hover:text-[var(--chalk)] transition-all cursor-pointer"
              title="View keyboard shortcuts (?)"
            >
              <Keyboard className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
              <span>Keys</span>
              <kbd className="text-[9px]">?</kbd>
            </button>
          </div>

          {/* Step Back / Step Forward Shortcut Navigation */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[var(--chalk-faint)]">
            <span>Keys: <kbd>Space</kbd> <kbd>←</kbd> <kbd>→</kbd> <kbd>R</kbd></span>
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

      {/* ── Zone 3: Knowledge Hub (GitHub Discussions & Notes) ── */}
      <div className="rounded-lg border border-[var(--line)] bg-[var(--board-raised)] overflow-hidden">
        {/* Tab bar */}
        <div className="flex items-center gap-6 border-b border-[var(--line)] px-4 bg-[var(--board-raised-2)]">
          {[
            ['comments', 'Discussion', comments.length],
            ['public_notes', 'Community Notes', publicNotes.length],
            ['private_notes', 'Private Scratchpad', null]
          ].map(([id, label, count]) => (
            <button
              key={id}
              onClick={() => setHubTab(id)}
              className={`tab-btn ${hubTab === id ? 'active' : ''}`}
            >
              <span>{label}</span>
              {count !== null && (
                <span className="text-[10.5px] font-mono px-1.5 py-0.2 rounded-full bg-[var(--board-raised)] border border-[var(--line)] text-[var(--chalk-dim)] ml-1">
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>

        {hubTab === 'comments' && (
          <div className="p-4 space-y-4">
            <form onSubmit={handlePostComment} className="space-y-2">
              <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--chalk-dim)]">
                <span className="w-5 h-5 rounded-md bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center text-xs">
                  {currentUser?.avatar || '⚡'}
                </span>
                <span>
                  Comment as <strong className="text-[var(--chalk)] font-medium">@{currentUser?.username || 'Guest'}</strong>
                </span>
                <span className="text-cyan-600 dark:text-cyan-400 ml-auto">+10 XP</span>
              </div>
              <textarea
                rows={2}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Ask a question, discuss edge cases, or share an invariant..."
                className="hub-textarea rounded-md text-xs"
                style={{ resize: 'vertical' }}
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isPostingComment || !newComment.trim()}
                  className="btn-primary h-7.5 px-3 text-xs disabled:opacity-40"
                >
                  <Send className="w-3 h-3" />
                  <span>{isPostingComment ? 'Posting…' : 'Comment'}</span>
                </button>
              </div>
            </form>

            <div className="space-y-2.5">
              {comments.length === 0 ? (
                <div className="py-10 text-center space-y-1">
                  <MessageSquare className="w-6 h-6 text-[var(--chalk-faint)] mx-auto opacity-50" />
                  <p className="text-xs text-[var(--chalk-faint)]">No discussions yet — start the conversation.</p>
                </div>
              ) : (
                comments.map((c) => (
                  <div key={c.id} className="p-3 rounded-md bg-[var(--board-raised-2)] border border-[var(--line)] space-y-2 hover:border-[var(--line-strong)] transition-all">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs">
                          {c.avatar || '⚡'}
                        </span>
                        <span className="text-xs font-semibold text-[var(--chalk)] hover:underline cursor-pointer">
                          @{c.username}
                        </span>
                        <span className="text-[10px] font-mono text-[var(--chalk-faint)]">
                          {c.created_at ? new Date(c.created_at).toLocaleDateString() : 'recently'}
                        </span>
                      </div>
                      <button
                        onClick={() => handleUpvoteComment(c.id)}
                        className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono text-[var(--chalk-dim)] hover:text-indigo-400 hover:bg-indigo-500/10 border border-[var(--line)] transition-all cursor-pointer"
                        title="Upvote comment"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span className="font-semibold">{c.upvotes || 0}</span>
                      </button>
                    </div>
                    <p className="text-xs text-[var(--chalk-dim)] font-sans leading-relaxed whitespace-pre-wrap pl-7">
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
              <span className="text-xs text-[var(--chalk-faint)] font-sans">
                Community intuitions, invariant breakdowns, and interview tricks
              </span>
              <button
                onClick={() => setShowAddPublicNote(!showAddPublicNote)}
                className="btn-secondary h-7 px-2.5 text-xs"
              >
                <Plus className="w-3 h-3" />
                <span>{showAddPublicNote ? 'Cancel' : 'Share Note'}</span>
              </button>
            </div>

            {/* Form to add public note */}
            {showAddPublicNote && (
              <form onSubmit={handlePostPublicNote} className="p-3.5 rounded-md bg-[var(--board-raised-2)] border border-[var(--line-strong)] space-y-2.5 fade-in">
                <input
                  type="text"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  placeholder="Note Title: e.g. Invariant: Sliding window boundary condition"
                  className="hub-input rounded-md"
                  required
                />
                <textarea
                  rows={3}
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  placeholder="Write the core algorithmic insight, invariant, or trick to remember..."
                  className="hub-textarea rounded-md text-xs"
                  required
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddPublicNote(false)}
                    className="btn-secondary h-7 px-2.5 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPostingNote || !newNoteContent.trim()}
                    className="btn-primary h-7 px-3 text-xs disabled:opacity-40"
                  >
                    {isPostingNote ? 'Publishing...' : 'Publish to Community'}
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-2.5">
              {publicNotes.length === 0 ? (
                <div className="py-10 text-center space-y-1">
                  <BookOpen className="w-6 h-6 text-[var(--chalk-faint)] mx-auto opacity-50" />
                  <p className="text-xs text-[var(--chalk-faint)]">No community notes yet — share the first insight.</p>
                </div>
              ) : (
                publicNotes.map((note) => (
                  <div key={note.id} className="p-3 rounded-md bg-[var(--board-raised-2)] border border-[var(--line)] space-y-2 hover:border-[var(--line-strong)] transition-all">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">
                          {note.avatar || '⚡'}
                        </span>
                        <div>
                          <h4 className="text-xs font-semibold text-[var(--chalk)]">{note.title || 'Algorithmic Insight'}</h4>
                          <span className="text-[10px] font-mono text-[var(--chalk-faint)]">by @{note.username}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleUpvotePublicNote(note.id)}
                        className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono text-[var(--chalk-dim)] hover:text-cyan-400 hover:bg-cyan-500/10 border border-[var(--line)] transition-all cursor-pointer"
                        title="Mark as helpful"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span className="font-semibold">{note.upvotes || 0}</span>
                      </button>
                    </div>
                    <p className="text-xs text-[var(--chalk-dim)] font-sans leading-relaxed whitespace-pre-wrap pl-7">
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
