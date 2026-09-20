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
import { generateMasterVisualizerPrompt } from '../utils/aiVisualizerPrompt';
import BetaCodeVisualizer from './sandbox/BetaCodeVisualizer';

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

function getYouTubeEmbedUrl(url) {
  if (!url || typeof url !== 'string') return null;
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/;
  const match = url.match(regExp);
  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}?rel=0&modestbranding=1` : null;
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
  const [showVideo, setShowVideo] = useState(false);
  const embedUrl = useMemo(() => getYouTubeEmbedUrl(question.youtube_url), [question.youtube_url]);
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
    const promptText = generateMasterVisualizerPrompt(question, solutions);
    navigator.clipboard.writeText(promptText);
    sound?.playStep?.(640);
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
      {/* ── 1. Problem Header (Clean, Spacious Level 1 Hierarchy) ── */}
      <header className="space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <button
              onClick={onBack}
              className="p-2 rounded-md bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] border border-[var(--line)] text-[var(--chalk-dim)] hover:text-[var(--chalk)] transition-colors shrink-0 cursor-pointer"
              title="Back to problem library (Esc)"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                {/* Step & Substep Indicator */}
                {question.step_no && (
                  <span className="text-xs font-mono text-[var(--chalk-faint)]">
                    Step {question.step_no}: {question.step_name} {question.substep_name ? `· ${question.substep_name}` : ''}
                  </span>
                )}
                <span className="text-[var(--line-strong)] text-xs">·</span>
                {/* Problem ID */}
                <span className="text-xs font-mono text-[var(--chalk-dim)] font-medium">
                  {question.display_id || (question.leetcode_id ? `#${question.leetcode_id}` : 'DSA')}
                </span>
                <span className="text-[var(--line-strong)] text-xs">·</span>
                {/* Difficulty Dot + Label */}
                <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                  question.difficulty === 'Hard' ? 'text-rose-400' :
                  question.difficulty === 'Medium' ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${diffDotClass}`} />
                  {question.difficulty}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold font-sans text-[var(--chalk)] tracking-tight truncate">
                {question.title}
              </h1>
            </div>
          </div>

          {/* Right Action Tools Toolbar */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Dynamic Complexity Badges */}
            <div className="hidden xl:flex items-center gap-2.5 text-xs font-mono text-[var(--chalk-dim)] px-3 py-1.5 rounded-md bg-[var(--board-raised-2)] border border-[var(--line)]">
              <span className="flex items-center gap-1.5" title="Time Complexity">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{formatComplexity(currentApproachObj?.time_complexity || question.time_complexity)}</span>
              </span>
              <span className="text-[var(--line-strong)]">·</span>
              <span className="flex items-center gap-1.5" title="Space Complexity">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>{formatComplexity(currentApproachObj?.space_complexity || question.space_complexity)}</span>
              </span>
            </div>

            {/* Status Dropdown */}
            <select
              value={question.status || 'to_learn'}
              onChange={(e) => onStatusChange(question.id, e.target.value)}
              className="h-8 px-2.5 rounded-md bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-sans font-medium text-[var(--chalk)] cursor-pointer focus:outline-none focus:border-indigo-500"
            >
              <option value="to_learn">To learn</option>
              <option value="in_progress">In progress</option>
              <option value="mastered">Mastered</option>
            </select>

            {/* Export Study Sheet */}
            <button
              onClick={handleDownloadStudySheet}
              className="btn-secondary h-8 px-2.5 text-xs"
              title="Download Markdown Study Sheet"
            >
              <Download className="w-3.5 h-3.5 text-[var(--chalk-dim)]" />
              <span className="hidden sm:inline">Export</span>
            </button>

            {/* LeetCode link */}
            {question.leetcode_url && (
              <a
                href={question.leetcode_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary h-8 px-2.5 text-xs"
                title="Open LeetCode problem in new tab"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[var(--chalk-dim)]" />
                <span className="hidden sm:inline">LeetCode</span>
              </a>
            )}

            {/* Upload Button */}
            <button
              onClick={() => setShowUploader(!showUploader)}
              className={`btn-secondary h-8 px-2.5 text-xs ${
                showUploader ? 'border-indigo-500/50 bg-indigo-500/10 text-indigo-400 font-semibold' : ''
              }`}
              title="Upload custom .jsx visualizer component"
            >
              <UploadCloud className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Upload Viz</span>
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
                            q.id === question.id ? 'bg-indigo-500/15 text-indigo-400 font-semibold' : 'hover:bg-[var(--board-raised-2)] text-[var(--chalk-dim)]'
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

            {/* Prev / Next Problem Switcher */}
            <div className="flex items-center gap-1 pl-1">
              {(() => {
                const prevLabel = prevQuestion
                  ? prevQuestion.display_id || (prevQuestion.leetcode_id ? `#${prevQuestion.leetcode_id}` : '')
                  : '';
                return (
                  <button
                    onClick={() => prevQuestion && onNavigateQuestion && onNavigateQuestion(prevQuestion)}
                    disabled={!prevQuestion}
                    className="btn-secondary h-8 px-2 text-xs disabled:opacity-30 disabled:pointer-events-none"
                    title={prevQuestion ? `Previous: ${prevLabel} ${prevQuestion.title}` : 'First problem'}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                );
              })()}

              <span className="text-xs font-mono text-[var(--chalk-faint)] px-1.5">
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
                    className="btn-secondary h-8 px-2 text-xs disabled:opacity-30 disabled:pointer-events-none"
                    title={nextQuestion ? `Next: ${nextLabel} ${nextQuestion.title}` : 'Last problem'}
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                );
              })()}
            </div>
          </div>
        </div>
      </header>

      {/* ── 2. THE HERO WORKSPACE: Interactive Algorithm Canvas & Synchronized Code ── */}
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

          {/* Center: Clean Approach Selector Tabs */}
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

          {/* Right: View Mode Toggle (Split, Canvas, Code) */}
          <div className="segmented-control">
            {[
              ['split', 'Split View'],
              ['visualizer_only', 'Canvas'],
              ['code_only', 'Code']
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
        </div>

        {/* Main Stage Grid or Beta Mode Component */}
        {activeTier === 'beta' ? (
          <div className="p-4 bg-[var(--bg-base)]">
            <BetaCodeVisualizer question={question} solutions={solutions} />
          </div>
        ) : (
          <>
            {/* Main Stage Grid (Canvas Viewport + Synchronized Code) */}
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
                  <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                  <span className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider shrink-0">
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

              {/* Educational Explanation & Step Invariant Panel */}
              {currentStepData && (
                <div className="mt-4 p-4 rounded-lg bg-[var(--board-raised-2)] border border-[var(--line)] transition-all">
                  <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-400 text-[11px] font-mono font-semibold">
                        Invariant
                      </span>
                      <span className="text-xs font-sans font-semibold text-[var(--chalk)]">
                        {currentStepData.title}
                      </span>
                    </div>

                    {currentStepData.action && (
                      <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                        {currentStepData.action}
                      </span>
                    )}
                  </div>


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
          </>
        )}
      </section>


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
