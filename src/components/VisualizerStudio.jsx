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
  User,
  Flag,
  Code2
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
  }, [question.id, question.component_key, question.componentKey, currentUser?.id]);

  // Fetch solutions dynamically whenever question or active approach tier changes
  useEffect(() => {
    let isMounted = true;
    api.getCodeSolutions(question.id, activeTier).then((data) => {
      if (!isMounted) return;
      if (data && Object.keys(data).length > 0) {
        setSolutions(data);
      } else if (visualizerEntry?.approaches?.[activeTier]?.solutions) {
        setSolutions(visualizerEntry.approaches[activeTier].solutions);
      } else if (activeTier !== 'optimal') {
        api.getCodeSolutions(question.id, 'optimal').then((fallbackData) => {
          if (isMounted && fallbackData && Object.keys(fallbackData).length > 0) {
            setSolutions(fallbackData);
          } else if (isMounted && visualizerEntry?.solutions) {
            setSolutions(visualizerEntry.solutions);
          }
        });
      } else if (visualizerEntry?.solutions) {
        setSolutions(visualizerEntry.solutions);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [question.id, activeTier, currentKey]);

  const handleSelectTier = (tier) => {
    if (tier === activeTier) return;
    setActiveTier(tier);
    setCurrentStep(0);
    setIsPlaying(false);
    sound.playStep(640);
  };


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
VISUAL STYLE — CHALKBOARD / WHITEBOARD AESTHETIC
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Match this exact design system. All colours are enforced by the app's CSS variables:

PALETTE (use these exact hex values):
  Stage background:     #12181a
  Card / node fill:     #1c2529
  Divider lines:        rgba(238,241,234,0.09)
  Primary text:         #eef1ea
  Secondary (dim) text: #8fa09a
  Faint index text:     #5f6f6a
  Amber / curr-active:  #e8a33d
  Teal  / prev-second:  #5fb3a6
  Easy green: #7cb473 | Hard red: #e06c75

SVG DRAWING RULES (all visualizers are SVG-based):
  Array/node boxes:
    fill="#1c2529"  stroke="#5f6f6a"  strokeWidth=1.4  rx=3
    filter="url(#rough)"  ← gives hand-drawn chalk-edge look
    (The SVG filter id="rough" is already in the page's root HTML — just reference it)

  Active element (curr / selected):
    Amber glow ring: stroke="#e8a33d" strokeWidth=2.2 rx=6 (box padded +5px each side)

  Previous / secondary element:
    Teal dashed ring: stroke="#5fb3a6" strokeWidth=1.6 strokeDasharray="3 4"

  Value inside box:
    font-family="IBM Plex Mono, monospace" fontSize=16 fontWeight=500 fill="#eef1ea"

  Index label below box:
    font-family="IBM Plex Mono, monospace" fontSize=10.5 fill="#5f6f6a"

  Pointer labels (curr, prev, L, R, head, slow, fast, i, j):
    font-family="Kalam, cursive" fontSize=14 fill=#e8a33d (active) or #5fb3a6 (secondary)
    Place ABOVE the box for curr/active, BELOW for prev/secondary

  SVG arrows: stroke="#5f6f6a" strokeWidth=1.2 with arrowhead marker
  Linked-List nodes: 3-compartment boxes (PREV | VAL | NEXT) with hex address tags above
  Tree nodes: circles fill="#1c2529" stroke="#5f6f6a"
  Hash Map: key→value badge grid in amber/teal

STATUS HUD — always render directly below canvas:
  <div className="status-line"><span className="prev-b">prev = 12</span>, <b>curr = 35</b></div>
  CSS already defined: .status-line (mono, dim), .status-line b (amber), .status-line .prev-b (teal)

EXPLANATION — render below status HUD:
  <p className="explain">35 beats curr, so <span className="note">prev</span> inherits old value.</p>
  CSS already defined: .explain (13.5px, dim), .explain .note (Kalam cursive, amber)

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
    setViewMode('split'); // Default to split screen with dominant visualizer canvas upon upload
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


  const diffDotClass =
    question.difficulty === 'Easy' ? 'dot-easy' :
    question.difficulty === 'Medium' ? 'dot-medium' :
    question.difficulty === 'Hard' ? 'dot-hard' : 'dot-easy';

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Caption line */}
      <div className="caption flex items-center justify-between">
        <span>AlgoVision Whiteboard Studio · Interactive DSA Step-by-Step Visualization</span>
        {question.category && (
          <span className="font-mono text-[11px] opacity-75 hidden sm:inline">
            {question.category.replace(/^\d+\.\s*/, '')}
          </span>
        )}
      </div>

      {/* ── ZONE 1: Problem Overview & Question Tab (Card on TOP) ── */}
      <div className="card shadow-xl p-4 sm:p-5 space-y-4">
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--line)] pb-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onBack}
              className="p-1.5 rounded text-[var(--chalk-dim)] hover:text-[var(--chalk)] hover:bg-[var(--line)] transition shrink-0"
              title="Back to library (Esc)"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="diff !ml-0">
                  <span className={`dot ${diffDotClass}`}></span>
                  {question.difficulty}
                </span>
                <span className="text-[11.5px] font-mono text-[var(--amber)]">
                  {question.display_id || (question.leetcode_id ? `#${question.leetcode_id}` : '')}
                </span>
                {question.category && (
                  <span className="text-[11px] font-mono text-[var(--chalk-faint)]">
                    {question.category.replace(/^\d+\.\s*/, '')}
                  </span>
                )}
              </div>
              <h1 className="text-[16px] sm:text-[18px] font-bold font-sans text-[var(--chalk)] truncate">
                {question.title}
              </h1>
            </div>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
            {/* Complexity Badges */}
            <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-[var(--chalk-dim)] px-2.5 py-1 rounded bg-[var(--board-raised-2)] border border-[var(--line)]">
              <span className="flex items-center gap-1" title="Time Complexity">
                <Clock className="w-3 h-3 text-[var(--amber)]" />
                {formatComplexity(question.time_complexity)}
              </span>
              <span className="opacity-30">·</span>
              <span className="flex items-center gap-1" title="Space Complexity">
                <Cpu className="w-3 h-3 text-[var(--teal)]" />
                {formatComplexity(question.space_complexity)}
              </span>
            </div>

            {/* Status Dropdown */}
            <select
              value={question.status || 'to_learn'}
              onChange={(e) => onStatusChange(question.id, e.target.value)}
              className="nav-pill cursor-pointer"
            >
              <option value="to_learn" className="bg-[#171f22]">To learn</option>
              <option value="in_progress" className="bg-[#171f22]">In progress</option>
              <option value="mastered" className="bg-[#171f22]">Mastered</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-[var(--board-raised-2)] border border-[var(--line)] rounded p-0.5">
              {[['visualizer_only', 'Viz'], ['split', 'Split'], ['code_only', 'Code']].map(([mode, label]) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition ${
                    viewMode === mode
                      ? 'bg-[var(--amber-dim)] text-[var(--amber)] font-semibold'
                      : 'text-[var(--chalk-faint)] hover:text-[var(--chalk)]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Upload Button */}
            <button
              onClick={() => setShowUploader(!showUploader)}
              className={`chalk-btn ${showUploader ? 'chalk-btn-amber' : ''}`}
              title="Upload custom .jsx visualizer component"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Upload</span>
            </button>

            {/* AI Enhance / Edit Question */}
            <button
              onClick={() => setShowEnhanceModal(true)}
              className="chalk-btn"
              title="Enhance or edit problem statement & examples with AI"
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--amber)]" />
              <span className="hidden lg:inline">AI Enhance</span>
            </button>

            {/* Quick Problem Jumper */}
            <div className="relative">
              <button
                onClick={() => setShowJumper(!showJumper)}
                className="chalk-btn"
                title="Jump to any problem"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Jump</span>
              </button>

              {showJumper && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowJumper(false)} />
                  <div className="absolute top-full mt-1.5 right-0 w-72 sm:w-80 bg-[var(--board-raised)] border border-[var(--line)] rounded shadow-2xl z-50 overflow-hidden fade-in">
                    <div className="p-2.5 border-b border-[var(--line)] flex items-center gap-2">
                      <Search className="w-3.5 h-3.5 text-[var(--chalk-faint)] shrink-0" />
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
              className="chalk-btn"
              title="Report an issue with this question or solution"
            >
              <Flag className="w-3.5 h-3.5 text-[#e06c75]" />
            </button>

            {/* LeetCode link */}
            {question.leetcode_url && (
              <a
                href={question.leetcode_url}
                target="_blank"
                rel="noopener noreferrer"
                className="chalk-btn"
                title="Open on LeetCode"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Navigation & Spaced Repetition Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11.5px] font-mono">
          {/* Spaced Repetition Rater */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[var(--chalk-faint)] mr-1">Spaced Rep:</span>
            <button
              onClick={() => handleReviewConfidence('mastered')}
              className="px-2 py-0.5 rounded bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] text-[var(--easy)] border border-[var(--line)] transition flex items-center gap-1"
              title="Mark Mastered (Interval extended)"
            >
              <span>🟢</span> <span>Mastered</span>
            </button>
            <button
              onClick={() => handleReviewConfidence('practicing')}
              className="px-2 py-0.5 rounded bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] text-[var(--amber)] border border-[var(--line)] transition flex items-center gap-1"
              title="Review in 3 days"
            >
              <span>🟡</span> <span>Review 3d</span>
            </button>
            <button
              onClick={() => handleReviewConfidence('struggling')}
              className="px-2 py-0.5 rounded bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] text-[#e06c75] border border-[var(--line)] transition flex items-center gap-1"
              title="Reset to 1 day"
            >
              <span>🔴</span> <span>Reset</span>
            </button>
            {reviewSaved && (
              <span className="text-[var(--easy)] px-1 font-bold animate-pulse">✓ Saved</span>
            )}
          </div>

          {/* Prev / Next Problem Navigation */}
          <div className="flex items-center gap-2">
            {(() => {
              const prevLabel = prevQuestion ? (prevQuestion.display_id || (prevQuestion.leetcode_id ? `#${prevQuestion.leetcode_id}` : '')) : '';
              return (
                <button
                  onClick={() => prevQuestion && onNavigateQuestion && onNavigateQuestion(prevQuestion)}
                  disabled={!prevQuestion}
                  className="chalk-btn disabled:opacity-30 disabled:pointer-events-none"
                  title={prevQuestion ? `← ${prevLabel} ${prevQuestion.title}` : 'First problem'}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{prevLabel || 'Prev'}</span>
                </button>
              );
            })()}

            <span className="text-[var(--chalk-faint)] px-1.5">
              {currentIndex >= 0 ? currentIndex + 1 : '?'} / {questions.length}
            </span>

            {(() => {
              const nextLabel = nextQuestion ? (nextQuestion.display_id || (nextQuestion.leetcode_id ? `#${nextQuestion.leetcode_id}` : '')) : '';
              return (
                <button
                  onClick={() => nextQuestion && onNavigateQuestion && onNavigateQuestion(nextQuestion)}
                  disabled={!nextQuestion}
                  className="chalk-btn disabled:opacity-30 disabled:pointer-events-none"
                  title={nextQuestion ? `${nextLabel} ${nextQuestion.title} →` : 'Last problem'}
                >
                  <span className="hidden sm:inline">{nextLabel || 'Next'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              );
            })()}
          </div>
        </div>

        {/* Problem Statement text */}
        <div className="text-[12.5px] text-[var(--chalk-dim)] leading-relaxed whitespace-pre-wrap max-h-36 overflow-y-auto font-sans bg-[var(--board)] p-3.5 rounded border border-[var(--line)]">
          {question.description || 'No description available.'}
        </div>

        {/* Approach toggle */}
        <div>
          <button
            onClick={() => setShowApproach(!showApproach)}
            className="text-[11.5px] font-mono text-[var(--amber)] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{showApproach ? '▾' : '▸'}</span>
            <span>{showApproach ? 'Hide Approach & Invariants' : 'Show Approach & Invariants'}</span>
          </button>
          {showApproach && (
            <div className="mt-2 p-3 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-[12.5px] text-[var(--chalk-dim)] leading-relaxed whitespace-pre-wrap font-sans">
              {question.approach || 'Standard optimal approach.'}
            </div>
          )}
        </div>
      </div>

      {/* ── ZONE 2: Chalkboard Interactive Stage (Workbench Card) ── */}
      <div className="card shadow-2xl overflow-hidden">
        {/* Tiers Row (with organic wavy SVG underline) */}
        <div className="tiers">
          {[
            { id: 'intuitive', label: 'Intuitive', sub: 'brute force' },
            { id: 'better',    label: 'Better',    sub: 'sub-optimal' },
            { id: 'optimal',   label: 'Optimal',   sub: 'single pass / optimal' },
          ].map((tier) => {
            const isActive = activeTier === tier.id;
            const hasCustomAnimation = Boolean(visualizerEntry?.approaches?.[tier.id]);
            return (
              <button
                key={tier.id}
                className={`tier ${isActive ? 'active' : ''}`}
                data-tier={tier.id}
                onClick={() => handleSelectTier(tier.id)}
              >
                {tier.label} <span className="sub">{tier.sub}</span>
                {hasCustomAnimation && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--teal)] ml-1" title="Dedicated animation ready" />
                )}
                <svg className="underline" viewBox="0 0 100 8" preserveAspectRatio="none">
                  <path d="M2,5 Q25,2 50,5 T98,4" stroke="#e8a33d" strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
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
              <p id="stepTitle">
                {currentStepData?.title || `${currentStep + 1}. Step Execution`}
              </p>

              {Component ? (
                <Component
                  currentStep={currentStep}
                  onStepChange={setCurrentStep}
                  customInput={customInput}
                  customTarget={customTarget}
                  approachTier={activeTier}
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
            </div>
          )}

          {/* Code Column */}
          {viewMode !== 'visualizer_only' && (
            <div className="code-col">
              {!Component && viewMode === 'code_only' && (
                <div className="p-3 bg-[var(--board-raised-2)] border-b border-[var(--line)] flex items-center justify-between gap-3 text-[11.5px] font-mono flex-wrap">
                  <span className="text-[var(--chalk-dim)] flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-[var(--amber)]" />
                    Code Execution View · No visualizer uploaded yet for this question.
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
              )}
              <CodeViewer
                solutions={solutions}
                initialLanguage="cpp"
                activeLine={activeCodeLine}
              />
            </div>
          )}
        </div>

        {/* ── Navrow Footer (Ticks + Transport Controls + Nav Buttons) ── */}
        <div className="navrow">
          {/* Ticks */}
          <div className="ticks" id="ticks">
            {Array.from({ length: maxSteps }).map((_, idx) => {
              const cls = idx === currentStep ? 'now' : idx < currentStep ? 'done' : '';
              return (
                <span
                  key={idx}
                  onClick={() => {
                    setCurrentStep(idx);
                    sound.playStep(500 + idx * 30);
                    if (idx === maxSteps - 1) triggerCompletionCelebration();
                  }}
                  className={`tick ${cls}`}
                  title={`Step ${idx + 1}`}
                />
              );
            })}
          </div>

          {/* Transport Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={handleReset}
              className="navbtn"
              title="Reset (R)"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={togglePlay}
              className="navbtn font-medium"
              style={{ color: isPlaying ? 'var(--amber)' : undefined }}
              title="Play / Pause (Space)"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isPlaying ? 'pause' : 'play'}</span>
            </button>

            <button
              onClick={() => setLoop(!loop)}
              className={`navbtn ${loop ? 'text-[var(--amber)]' : ''}`}
              title={loop ? 'Loop enabled' : 'Loop disabled'}
            >
              <Repeat className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-1 border-l border-[var(--line)] pl-3 text-[12px] font-mono text-[var(--chalk-faint)]">
              {[0.5, 1, 1.5, 2].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-1.5 py-0.5 rounded transition ${
                    speed === s ? 'text-[var(--amber)] font-bold' : 'hover:text-[var(--chalk)]'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>

            <span className="stepcount ml-2" id="stepCount">
              Step {currentStep + 1} of {maxSteps}
            </span>
          </div>

          {/* Nav Buttons */}
          <div className="navbtns">
            <button
              className="navbtn"
              id="prevBtn"
              onClick={handlePrevStep}
              disabled={currentStep === 0}
            >
              ← prev
            </button>
            <button
              className="navbtn"
              id="nextBtn"
              onClick={handleNextStep}
              disabled={currentStep === maxSteps - 1}
            >
              next →
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
