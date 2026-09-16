import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  ExternalLink,
  Code2,
  CheckCircle2,
  Star,
  Layers,
  Copy,
  Check,
  Clock,
  Cpu,
  Edit,
  FileText,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  UploadCloud,
  Maximize2
} from 'lucide-react';

function YoutubeIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}
import { sound } from '../services/audio';
import { api } from '../services/api';
import { visualizersRegistry } from '../visualizers';
import VisualizerErrorBoundary from './VisualizerErrorBoundary';
import CodeViewer from './CodeViewer';
import { generateMasterVisualizerPrompt } from '../utils/aiVisualizerPrompt';

function toCamelCase(str) {
  if (!str) return 'AlgorithmVisualizer';
  return str
    .replace(/[^a-zA-Z0-9 ]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('');
}

// Helper to extract YouTube embed URL and video ID
function getYoutubeEmbedUrl(url) {
  if (!url) return null;
  try {
    let videoId = null;
    let timeParam = null;

    if (url.includes('youtu.be/')) {
      const parts = url.split('youtu.be/')[1].split('?');
      videoId = parts[0];
      if (parts[1]) {
        const params = new URLSearchParams(parts[1]);
        timeParam = params.get('t') || params.get('start');
      }
    } else if (url.includes('youtube.com/watch')) {
      const u = new URL(url);
      videoId = u.searchParams.get('v');
      timeParam = u.searchParams.get('t') || u.searchParams.get('start');
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('youtube.com/embed/')[1].split('?')[0];
    }

    if (!videoId) return null;
    let embed = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;
    if (timeParam) {
      const cleanTime = timeParam.replace(/s$/i, '');
      embed += `&start=${cleanTime}`;
    }
    return embed;
  } catch {
    return null;
  }
}

const DIFF_CONFIG = {
  easy: {
    label: 'Easy',
    dotClass: 'bg-emerald-500',
    textClass: 'text-emerald-400',
    bgClass: 'bg-emerald-500/10 border-emerald-500/20'
  },
  medium: {
    label: 'Medium',
    dotClass: 'bg-amber-500',
    textClass: 'text-amber-400',
    bgClass: 'bg-amber-500/10 border-amber-500/20'
  },
  hard: {
    label: 'Hard',
    dotClass: 'bg-rose-500',
    textClass: 'text-rose-400',
    bgClass: 'bg-rose-500/10 border-rose-500/20'
  }
};

export default function ProblemArticlePage({
  question,
  onBack,
  onLaunchStudio,
  onStatusChange,
  onToggleFavorite,
  onOpenAdmin,
  currentUser
}) {
  const [activeTab, setActiveTab] = useState('article'); // 'article' | 'solutions' | 'notes'
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('cpp'); // 'cpp' | 'java' | 'python' | 'javascript'
  const [selectedTier, setSelectedTier] = useState('optimal'); // 'intuitive' | 'better' | 'optimal'
  const [solutionsByTier, setSolutionsByTier] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [personalNotes, setPersonalNotes] = useState(question?.notes || '');
  const [savingNotes, setSavingNotes] = useState(false);
  const [notesSavedAlert, setNotesSavedAlert] = useState(false);

  // Normalize YouTube videos array
  const videoList = useMemo(() => {
    if (Array.isArray(question?.youtube_videos) && question.youtube_videos.length > 0) {
      return question.youtube_videos;
    }
    if (question?.youtube_url) {
      return [
        {
          id: 'striver-main',
          title: "Striver's Tutorial",
          url: question.youtube_url,
          channel: 'take U forward',
          is_primary: true
        }
      ];
    }
    return [];
  }, [question]);

  const activeVideo = videoList[activeVideoIdx] || videoList[0];
  const embedUrl = useMemo(() => activeVideo ? getYoutubeEmbedUrl(activeVideo.url) : null, [activeVideo]);

  // Load code solutions for this question
  useEffect(() => {
    let isMounted = true;
    const loadSolutions = async () => {
      if (!question?.id) return;
      const tiers = await api.getCodeSolutionsAllTiers(question.id);
      if (isMounted && tiers) {
        setSolutionsByTier(tiers);
      }
    };
    loadSolutions();
    return () => {
      isMounted = false;
    };
  }, [question?.id]);

  if (!question) return null;

  const diffKey = (question.difficulty || 'medium').toLowerCase();
  const diffCfg = DIFF_CONFIG[diffKey] || DIFF_CONFIG.medium;

  const [visStep, setVisStep] = useState(0);
  const [isVisPlaying, setIsVisPlaying] = useState(false);
  const [visSpeed, setVisSpeed] = useState(1);
  const [copiedMasterPrompt, setCopiedMasterPrompt] = useState(false);
  const [isUploadingVis, setIsUploadingVis] = useState(false);
  const [uploadMsg, setUploadMsg] = useState(null);
  const [simStep, setSimStep] = useState(0);
  const fileInputRef = useRef(null);

  const currentKey = question?.component_key || question?.componentKey;
  const visualizerEntry = currentKey ? visualizersRegistry[currentKey] : null;
  const VisualizerComponent = visualizerEntry?.Component || null;
  const hasVisualizer = Boolean(VisualizerComponent);

  const activeApproachData = visualizerEntry?.approaches?.[selectedTier] || null;
  const stepsList = activeApproachData?.steps || visualizerEntry?.steps || null;
  const totalSteps = stepsList?.length || 6;
  const currentStepData = stepsList && stepsList[visStep] ? stepsList[visStep] : null;

  const [visViewMode, setVisViewMode] = useState('split'); // 'split' | 'canvas' | 'code'

  const activeCodeLine =
    currentStepData?.codeLines ||
    currentStepData?.codeLine ||
    currentStepData?.highlightLines ||
    currentStepData?.line ||
    null;

  const activeTierSolutions = useMemo(() => {
    const apiTier = solutionsByTier?.[selectedTier];
    const hasApiCode =
      apiTier && Object.values(apiTier).some((c) => typeof c === 'string' && c.trim().length > 10);
    if (hasApiCode) return apiTier;

    const regTier = visualizerEntry?.approaches?.[selectedTier]?.solutions;
    if (regTier && Object.keys(regTier).length > 0) return regTier;

    if (visualizerEntry?.solutions && Object.keys(visualizerEntry.solutions).length > 0) {
      return visualizerEntry.solutions;
    }

    const apiOptimal = solutionsByTier?.optimal;
    if (
      apiOptimal &&
      Object.values(apiOptimal).some((c) => typeof c === 'string' && c.trim().length > 10)
    ) {
      return apiOptimal;
    }

    return apiTier || {};
  }, [solutionsByTier, selectedTier, visualizerEntry]);

  // Auto playback loop
  useEffect(() => {
    if (!isVisPlaying) return;
    const interval = setInterval(() => {
      setVisStep((prev) => {
        if (prev < totalSteps - 1) return prev + 1;
        setIsVisPlaying(false);
        return prev;
      });
    }, 1200 / visSpeed);
    return () => clearInterval(interval);
  }, [isVisPlaying, totalSteps, visSpeed]);

  // Copy refined master prompt
  const handleCopyMasterPrompt = () => {
    const prompt = generateMasterVisualizerPrompt(question, solutionsByTier);
    navigator.clipboard.writeText(prompt);
    sound?.playSuccess?.();
    setCopiedMasterPrompt(true);
    setTimeout(() => setCopiedMasterPrompt(false), 2500);
  };

  // Upload visualizer JSX file
  const handleUploadVisualizer = async (e) => {
    const file = e.target.files?.[0] || e.dataTransfer?.files?.[0];
    if (!file) return;
    if (!file.name.endsWith('.jsx') && !file.name.endsWith('.js')) {
      setUploadMsg({ type: 'error', text: 'Please upload a .jsx or .js component file.' });
      setTimeout(() => setUploadMsg(null), 3000);
      return;
    }
    setIsUploadingVis(true);
    try {
      const text = await file.text();
      const rawName = file.name.replace(/\.(jsx|js)$/, '');
      const key = rawName.charAt(0).toUpperCase() + rawName.slice(1);
      const res = await api.uploadVisualizer({
        questionId: question.id,
        componentKey: key,
        code: text,
        userId: currentUser?.id
      });
      if (res && res.success !== false) {
        sound?.playSuccess?.();
        setUploadMsg({ type: 'success', text: `Uploaded and linked ${key} successfully!` });
        question.component_key = key;
        setTimeout(() => window.location.reload(), 1200);
      } else {
        setUploadMsg({ type: 'error', text: res?.error || 'Failed to upload visualizer.' });
      }
    } catch (err) {
      setUploadMsg({ type: 'error', text: err.message });
    } finally {
      setIsUploadingVis(false);
      setTimeout(() => setUploadMsg(null), 4000);
    }
  };

  const displayId = question.display_id || (question.leetcode_id ? `LC-${question.leetcode_id}` : 'DSA');

  // Handle copying code
  const currentCode =
    solutionsByTier?.[selectedTier]?.[selectedLanguage] ||
    solutionsByTier?.optimal?.[selectedLanguage] ||
    '// Code solution loading or not available in this language.';

  const handleCopyCode = async () => {
    sound.playStep(680);
    await navigator.clipboard.writeText(currentCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Save personal notes
  const handleSaveNotes = async () => {
    setSavingNotes(true);
    await api.saveNotes(question.id, personalNotes);
    sound?.playSuccess?.();
    setSavingNotes(false);
    setNotesSavedAlert(true);
    setTimeout(() => setNotesSavedAlert(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[var(--board)] text-[var(--ink)] font-sans">
      {/* ── Sub-header Navigation Bar ── */}
      <div className="sticky top-12 z-40 bg-[var(--board)]/90 backdrop-blur-md border-b border-[var(--line)] px-4 sm:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          
          {/* Left: Back button & Breadcrumbs */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => {
                sound.playStep(520);
                onBack();
              }}
              className="btn-secondary flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sheet</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[var(--ink-muted)] truncate">
              <span>Step {question.step_no || 1}</span>
              <ChevronRight className="w-3 h-3 opacity-50" />
              <span className="truncate max-w-[200px]">
                {question.substep_name || question.category || 'DSA Track'}
              </span>
            </div>
          </div>

          {/* Right: Actions (Visualizer, LeetCode, Article Link, Admin Edit, Status) */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Visualizer Studio Launcher */}
            {hasVisualizer && (
              <button
                onClick={() => {
                  sound?.playSuccess?.();
                  onLaunchStudio(question);
                }}
                className="btn-primary flex items-center gap-1.5 px-3 py-1 text-xs font-medium cursor-pointer"
                title="Launch Step-by-Step Algorithm Visualizer Studio"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Launch Visualizer</span>
              </button>
            )}

            {/* External LeetCode */}
            {question.leetcode_url && (
              <a
                href={question.leetcode_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium cursor-pointer"
                title="Open LeetCode problem"
              >
                <span>LeetCode</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            )}

            {/* External TUF Article */}
            {question.article_url && (
              <a
                href={question.article_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-teal-400 hover:text-teal-300 cursor-pointer"
                title="Open original Striver TakeUForward Article"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden md:inline">TUF Article</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            )}

            {/* GeeksforGeeks Article */}
            {question.gfg_url && (
              <a
                href={question.gfg_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-emerald-400 hover:text-emerald-300 cursor-pointer"
                title="Open GeeksforGeeks Solution & Practice Article"
              >
                <span className="font-bold text-[11px]">GFG</span>
                <span className="hidden md:inline">Article</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            )}

            {/* Admin Quick Edit Button */}
            {onOpenAdmin && (
              <button
                onClick={() => {
                  sound.playStep(640);
                  onOpenAdmin(question.id);
                }}
                className="btn-secondary flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[var(--ink-muted)] hover:text-amber-400 cursor-pointer"
                title="Edit YouTube links, Article content & Solutions in Admin Page"
              >
                <Edit className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin Edit</span>
              </button>
            )}

            {/* Favorite Bookmark */}
            <button
              onClick={() => {
                sound.playStep(740);
                onToggleFavorite(question.id);
              }}
              className={`p-1.5 rounded-md border transition-colors cursor-pointer ${
                question.is_favorite
                  ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                  : 'bg-[var(--board-raised)] border-[var(--line)] text-[var(--ink-muted)] hover:text-[var(--ink)]'
              }`}
              title={question.is_favorite ? 'Bookmarked' : 'Add to bookmarks'}
            >
              <Star className={`w-3.5 h-3.5 ${question.is_favorite ? 'fill-amber-400' : ''}`} />
            </button>

            {/* Status Selector */}
            <select
              value={question.status || 'to_learn'}
              onChange={(e) => onStatusChange(question.id, e.target.value)}
              className="px-2.5 py-1 bg-[var(--board-raised)] border border-[var(--line)] text-xs text-[var(--ink)] rounded-md font-mono focus:outline-none focus:border-[var(--indigo)] cursor-pointer"
            >
              <option value="to_learn">To Learn</option>
              <option value="in_progress">In Progress</option>
              <option value="mastered">Mastered ✓</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Main Article Layout Container ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6">
        
        {/* ── Title & Meta Header Card ── */}
        <div className="p-6 rounded-lg bg-[var(--board-raised)] border border-[var(--line)] space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-md bg-[var(--board-raised-2)] text-[var(--ink-muted)] border border-[var(--line)]">
                  {displayId}
                </span>
                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-semibold border ${diffCfg.bgClass} ${diffCfg.textClass}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${diffCfg.dotClass}`} />
                  <span>{diffCfg.label}</span>
                </span>
                {hasVisualizer && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-mono bg-blue-500/10 border border-blue-500/25 text-blue-400 font-medium">
                    <Sparkles className="w-3 h-3 text-blue-400" />
                    <span>Interactive Visualizer Ready</span>
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-[var(--ink)] pt-1">
                {question.title}
              </h1>
            </div>

            {/* Time & Space Complexity Pill */}
            <div className="flex items-center gap-3 bg-[var(--board)] px-3.5 py-2 rounded-md border border-[var(--line)] shrink-0 self-start md:self-auto">
              <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--ink-muted)]">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Time: <strong className="text-[var(--ink)]">{question.time_complexity || 'O(N)'}</strong></span>
              </div>
              <span className="text-[var(--line)]">|</span>
              <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--ink-muted)]">
                <Cpu className="w-3.5 h-3.5 text-teal-400" />
                <span>Space: <strong className="text-[var(--ink)]">{question.space_complexity || 'O(1)'}</strong></span>
              </div>
            </div>
          </div>

          {/* Tags */}
          {Array.isArray(question.tags) && question.tags.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              {question.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md text-xs font-mono bg-[var(--board-raised-2)] text-[var(--ink-muted)] border border-[var(--line)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ── 2. Problem Statement Card (shown FIRST so user knows the problem context) ── */}
        <div className="rounded-lg bg-[var(--board-raised)] border border-[var(--line)] overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-[var(--line)] bg-[var(--board)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-amber-500/10 border border-amber-500/25 flex items-center justify-center">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-[var(--ink)]">Problem Statement</h2>
                <p className="text-xs text-[var(--ink-muted)]">Read the problem before exploring the visualizer</p>
              </div>
            </div>
            {question.article_url && (
              <a
                href={question.article_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-teal-400 hover:text-teal-300 transition-colors shrink-0 cursor-pointer"
              >
                <BookOpen className="w-3 h-3" />
                <span>Striver's TUF Article</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </a>
            )}
          </div>

          {/* Problem text body */}
          <div className="p-5 sm:p-6 space-y-4">
            <div className="text-sm text-[var(--ink)] leading-relaxed whitespace-pre-line font-sans">
              {question.problem_statement || question.description ||
                'Problem statement details available in the TakeUForward (Striver) article above.'}
            </div>

            {/* Examples */}
            {Array.isArray(question.examples) && question.examples.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-[var(--line)]">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink-muted)]">Examples</h3>
                <div className="space-y-2">
                  {question.examples.map((ex, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-md bg-[var(--board)] border border-[var(--line)] font-mono text-xs text-[var(--ink)] whitespace-pre-wrap leading-relaxed"
                    >
                      {typeof ex === 'string' ? ex : JSON.stringify(ex, null, 2)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── 3. Interactive Algorithm Visualizer Section (PRIMARY LEARNING CANVAS) ── */}
        <div className="rounded-lg bg-[var(--board-raised)] border border-[var(--line)] overflow-hidden shadow-xs">
          {/* Visualizer Header Bar */}
          <div className="px-4 py-3 border-b border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[var(--board)]">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-[var(--ink)] flex items-center gap-2">
                  <span>Interactive Algorithm Canvas</span>
                  {hasVisualizer ? (
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 font-semibold">
                      Live Component Mounted
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/25 font-semibold">
                      AI Generator Ready
                    </span>
                  )}
                </h2>
                <p className="text-xs text-[var(--ink-muted)]">
                  Step-by-step interactive algorithm animation with live pointers, states &amp; intuition
                </p>
              </div>
            </div>

            {/* Approach Tier Switcher, View Mode & Studio Fullscreen Button */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* View Mode Segmented Controls */}
              <div className="flex items-center gap-0.5 bg-[var(--board-raised-2)] p-0.5 rounded-md border border-[var(--line)]">
                {[
                  { id: 'split', label: 'Split ◫' },
                  { id: 'canvas', label: 'Canvas ▭' },
                  { id: 'code', label: 'Code 📄' }
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => {
                      sound?.playStep?.(580);
                      setVisViewMode(mode.id);
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-all cursor-pointer ${
                      visViewMode === mode.id
                        ? 'bg-[var(--board-raised)] text-[var(--ink)] font-semibold shadow-xs'
                        : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-0.5 bg-[var(--board-raised-2)] p-0.5 rounded-md border border-[var(--line)]">
                {[
                  { id: 'intuitive', label: 'Brute Force' },
                  { id: 'better', label: 'Better' },
                  { id: 'optimal', label: 'Optimal' }
                ].map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => {
                      sound?.playStep?.(600);
                      setSelectedTier(tier.id);
                      setVisStep(0);
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-all cursor-pointer ${
                      selectedTier === tier.id
                        ? 'bg-[var(--indigo)] text-white font-semibold shadow-xs'
                        : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>

              {onLaunchStudio && (
                <button
                  onClick={() => {
                    sound?.playSuccess?.();
                    onLaunchStudio(question);
                  }}
                  className="btn-secondary flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[var(--indigo)] hover:text-blue-400 transition-colors cursor-pointer"
                  title="Open in full split-screen Studio with Code Viewer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Studio</span>
                </button>
              )}
            </div>
          </div>

          {/* Visualizer Canvas Body */}
          <div className="p-5 sm:p-6 bg-[var(--board)] min-h-[280px]">
            {hasVisualizer && VisualizerComponent ? (
              <div>
                {/* ── 1. Split View Mode (Visualizer Left, Live Synced Code Right) ── */}
                {visViewMode === 'split' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left 7 Cols: Interactive Canvas, Controls & Pedagogical Explanation */}
                    <div className="lg:col-span-7 space-y-4">
                      <div className="w-full flex items-center justify-center p-4 bg-[var(--board-raised)] rounded-md border border-[var(--line)] min-h-[240px]">
                        <VisualizerErrorBoundary onReset={() => setVisStep(0)}>
                          <VisualizerComponent
                            currentStep={visStep}
                            onStepChange={setVisStep}
                            approachTier={selectedTier}
                          />
                        </VisualizerErrorBoundary>
                      </div>

                      {/* Step Player Controls & Scrubber */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-md bg-[var(--board-raised)] border border-[var(--line)]">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              sound?.playStep?.(440);
                              setVisStep(0);
                              setIsVisPlaying(false);
                            }}
                            className="btn-secondary p-1.5 rounded-md text-[var(--ink-muted)] hover:text-[var(--ink)] cursor-pointer"
                            title="Reset Step"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              sound?.playStep?.(480);
                              setVisStep((prev) => Math.max(0, prev - 1));
                            }}
                            disabled={visStep === 0}
                            className="btn-secondary p-1.5 rounded-md disabled:opacity-40 text-[var(--ink-muted)] hover:text-[var(--ink)] cursor-pointer"
                            title="Previous Step"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              sound?.playStep?.(540);
                              setIsVisPlaying(!isVisPlaying);
                            }}
                            className="btn-primary px-3 py-1 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                          >
                            {isVisPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                            <span>{isVisPlaying ? 'Pause' : 'Play'}</span>
                          </button>
                          <button
                            onClick={() => {
                              sound?.playStep?.(520);
                              setVisStep((prev) => Math.min(totalSteps - 1, prev + 1));
                            }}
                            disabled={visStep >= totalSteps - 1}
                            className="btn-secondary p-1.5 rounded-md disabled:opacity-40 text-[var(--ink-muted)] hover:text-[var(--ink)] cursor-pointer"
                            title="Next Step"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Scrubber Range Slider */}
                        <div className="flex-1 max-w-xs flex items-center gap-3">
                          <span className="text-xs font-mono text-[var(--ink-muted)] shrink-0">
                            Step <strong className="text-[var(--ink)]">{visStep + 1}</strong>/{totalSteps}
                          </span>
                          <input
                            type="range"
                            min="0"
                            max={Math.max(0, totalSteps - 1)}
                            value={visStep}
                            onChange={(e) => {
                              setIsVisPlaying(false);
                              setVisStep(Number(e.target.value));
                            }}
                            className="w-full accent-blue-500 cursor-pointer"
                          />
                        </div>

                        {/* Speed Selector */}
                        <div className="flex items-center gap-0.5 bg-[var(--board)] p-0.5 rounded-md border border-[var(--line)]">
                          {[0.5, 1, 1.5, 2].map((spd) => (
                            <button
                              key={spd}
                              onClick={() => setVisSpeed(spd)}
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold transition-colors cursor-pointer ${
                                visSpeed === spd ? 'bg-[var(--indigo)] text-white' : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                              }`}
                            >
                              {spd}x
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Pedagogical Step Explanation Callout */}
                      {currentStepData && (
                        <div className="bg-[var(--board-raised)] border border-[var(--line)] rounded-md p-4 space-y-2">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/25 text-blue-400">
                                {currentStepData.phase || 'ANALYZING'}
                              </span>
                              <h4 className="text-sm font-semibold text-[var(--ink)]">
                                {currentStepData.title || `Step ${visStep + 1}`}
                              </h4>
                            </div>
                            {activeCodeLine && (
                              <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/25 flex items-center gap-1 font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                                <span>Line {activeCodeLine}</span>
                              </span>
                            )}
                          </div>
                          {currentStepData.explain && (
                            <p className="text-xs text-[var(--ink)] leading-relaxed">
                              {currentStepData.explain}
                            </p>
                          )}
                          {currentStepData.intuition && (
                            <div className="pt-2 border-t border-[var(--line)] flex items-start gap-2 text-xs text-amber-400">
                              <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                              <span><strong className="text-[var(--ink)]">Why this works: </strong>{currentStepData.intuition}</span>
                            </div>
                          )}
                          {currentStepData.variables && (
                            <div className="pt-2 flex items-center gap-2 flex-wrap">
                              {Object.entries(currentStepData.variables).map(([k, v]) => (
                                <div key={k} className="px-2 py-0.5 rounded-md bg-[var(--board)] border border-[var(--line)] text-xs font-mono">
                                  <span className="text-[var(--ink-muted)]">{k}: </span>
                                  <span className="text-[var(--ink)] font-bold">{String(v)}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Right 5 Cols: Live Synchronized CodeViewer */}
                    <div className="lg:col-span-5 h-full">
                      <div className="rounded-md overflow-hidden border border-[var(--line)] bg-[var(--board)] shadow-sm flex flex-col h-[520px]">
                        <div className="flex items-center justify-between px-3.5 py-2 bg-[var(--board-raised)] border-b border-[var(--line)] text-xs font-mono">
                          <span className="text-[var(--ink-muted)] flex items-center gap-1.5 font-medium">
                            <Code2 className="w-3.5 h-3.5 text-blue-400" />
                            <span className="text-[var(--ink)] font-semibold">Live Code Execution</span>
                            <span className="text-[10px] opacity-60 hidden sm:inline">· step sync</span>
                          </span>
                          {activeCodeLine && (
                            <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/25 flex items-center gap-1.5 font-semibold text-xs font-mono">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              <span>Line {activeCodeLine}</span>
                            </span>
                          )}
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <CodeViewer
                            solutions={activeTierSolutions}
                            initialLanguage={selectedLanguage}
                            activeLine={activeCodeLine}
                            leetcodeUrl={question.leetcode_url}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── 2. Canvas Only Mode ── */}
                {visViewMode === 'canvas' && (
                  <div className="space-y-4">
                    <div className="w-full flex items-center justify-center p-4 bg-[var(--board-raised)] rounded-md border border-[var(--line)] min-h-[240px]">
                      <VisualizerErrorBoundary onReset={() => setVisStep(0)}>
                        <VisualizerComponent
                          currentStep={visStep}
                          onStepChange={setVisStep}
                          approachTier={selectedTier}
                        />
                      </VisualizerErrorBoundary>
                    </div>

                    {/* Step Player Controls & Scrubber */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-md bg-[var(--board-raised)] border border-[var(--line)]">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            sound?.playStep?.(440);
                            setVisStep(0);
                            setIsVisPlaying(false);
                          }}
                          className="btn-secondary p-1.5 rounded-md text-[var(--ink-muted)] hover:text-[var(--ink)] cursor-pointer"
                          title="Reset Step"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            sound?.playStep?.(480);
                            setVisStep((prev) => Math.max(0, prev - 1));
                          }}
                          disabled={visStep === 0}
                          className="btn-secondary p-1.5 rounded-md disabled:opacity-40 text-[var(--ink-muted)] hover:text-[var(--ink)] cursor-pointer"
                          title="Previous Step"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            sound?.playStep?.(540);
                            setIsVisPlaying(!isVisPlaying);
                          }}
                          className="btn-primary px-3 py-1 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                        >
                          {isVisPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                          <span>{isVisPlaying ? 'Pause' : 'Play'}</span>
                        </button>
                        <button
                          onClick={() => {
                            sound?.playStep?.(520);
                            setVisStep((prev) => Math.min(totalSteps - 1, prev + 1));
                          }}
                          disabled={visStep >= totalSteps - 1}
                          className="btn-secondary p-1.5 rounded-md disabled:opacity-40 text-[var(--ink-muted)] hover:text-[var(--ink)] cursor-pointer"
                          title="Next Step"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Scrubber Range Slider */}
                      <div className="flex-1 max-w-sm flex items-center gap-3">
                        <span className="text-xs font-mono text-[var(--ink-muted)] shrink-0">
                          Step <strong className="text-[var(--ink)]">{visStep + 1}</strong>/{totalSteps}
                        </span>
                        <input
                          type="range"
                          min="0"
                          max={Math.max(0, totalSteps - 1)}
                          value={visStep}
                          onChange={(e) => {
                            setIsVisPlaying(false);
                            setVisStep(Number(e.target.value));
                          }}
                          className="w-full accent-blue-500 cursor-pointer"
                        />
                      </div>

                      {/* Speed Selector */}
                      <div className="flex items-center gap-0.5 bg-[var(--board)] p-0.5 rounded-md border border-[var(--line)]">
                        {[0.5, 1, 1.5, 2].map((spd) => (
                          <button
                            key={spd}
                            onClick={() => setVisSpeed(spd)}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold transition-colors cursor-pointer ${
                              visSpeed === spd ? 'bg-[var(--indigo)] text-white' : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                            }`}
                          >
                            {spd}x
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Pedagogical Step Explanation Callout */}
                    {currentStepData && (
                      <div className="bg-[var(--board-raised)] border border-[var(--line)] rounded-md p-4 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/25 text-blue-400">
                            {currentStepData.phase || 'ANALYZING'}
                          </span>
                          <h4 className="text-sm font-semibold text-[var(--ink)]">
                            {currentStepData.title || `Step ${visStep + 1}`}
                          </h4>
                        </div>
                        {currentStepData.explain && (
                          <p className="text-xs text-[var(--ink)] leading-relaxed">
                            {currentStepData.explain}
                          </p>
                        )}
                        {currentStepData.intuition && (
                          <div className="pt-2 border-t border-[var(--line)] flex items-start gap-2 text-xs text-amber-400">
                            <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                            <span><strong className="text-[var(--ink)]">Why this works: </strong>{currentStepData.intuition}</span>
                          </div>
                        )}
                        {currentStepData.variables && (
                          <div className="pt-2 flex items-center gap-2 flex-wrap">
                            {Object.entries(currentStepData.variables).map(([k, v]) => (
                              <div key={k} className="px-2 py-0.5 rounded-md bg-[var(--board)] border border-[var(--line)] text-xs font-mono">
                                <span className="text-[var(--ink-muted)]">{k}: </span>
                                <span className="text-[var(--ink)] font-bold">{String(v)}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* ── 3. Code Only Mode ── */}
                {visViewMode === 'code' && (
                  <div className="space-y-4">
                    {/* Compact Step Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-md bg-[var(--board-raised)] border border-[var(--line)]">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            sound?.playStep?.(440);
                            setVisStep(0);
                            setIsVisPlaying(false);
                          }}
                          className="btn-secondary p-1.5 rounded-md text-[var(--ink-muted)] hover:text-[var(--ink)] cursor-pointer"
                          title="Reset Step"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            sound?.playStep?.(480);
                            setVisStep((prev) => Math.max(0, prev - 1));
                          }}
                          disabled={visStep === 0}
                          className="btn-secondary p-1.5 rounded-md disabled:opacity-40 text-[var(--ink-muted)] hover:text-[var(--ink)] cursor-pointer"
                          title="Previous Step"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            sound?.playStep?.(540);
                            setIsVisPlaying(!isVisPlaying);
                          }}
                          className="btn-primary px-3 py-1 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                        >
                          {isVisPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                          <span>{isVisPlaying ? 'Pause' : 'Play'}</span>
                        </button>
                        <button
                          onClick={() => {
                            sound?.playStep?.(520);
                            setVisStep((prev) => Math.min(totalSteps - 1, prev + 1));
                          }}
                          disabled={visStep >= totalSteps - 1}
                          className="btn-secondary p-1.5 rounded-md disabled:opacity-40 text-[var(--ink-muted)] hover:text-[var(--ink)] cursor-pointer"
                          title="Next Step"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex-1 max-w-sm flex items-center gap-3">
                        <span className="text-xs font-mono text-[var(--ink-muted)] shrink-0">
                          Step <strong className="text-[var(--ink)]">{visStep + 1}</strong>/{totalSteps}
                        </span>
                        <input
                          type="range"
                          min="0"
                          max={Math.max(0, totalSteps - 1)}
                          value={visStep}
                          onChange={(e) => {
                            setIsVisPlaying(false);
                            setVisStep(Number(e.target.value));
                          }}
                          className="w-full accent-blue-500 cursor-pointer"
                        />
                      </div>

                      {currentStepData && (
                        <div className="text-xs text-[var(--ink)] truncate max-w-xs font-medium">
                          <span className="text-blue-400 font-bold uppercase text-[10px] mr-1.5 font-mono">
                            {currentStepData.phase || 'STEP'}:
                          </span>
                          <span>{currentStepData.title || `Step ${visStep + 1}`}</span>
                        </div>
                      )}
                    </div>

                    <div className="rounded-md overflow-hidden border border-[var(--line)] bg-[var(--board)] shadow-sm min-h-[500px]">
                      <CodeViewer
                        solutions={activeTierSolutions}
                        initialLanguage={selectedLanguage}
                        activeLine={activeCodeLine}
                        leetcodeUrl={question.leetcode_url}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* When NO custom visualizer is attached yet (e.g. count-occurrences-in-a-sorted-array) */
              <div className="space-y-4">
                {/* Interactive Simulated Demonstration */}
                <div className="p-5 rounded-md bg-[var(--board-raised)] border border-[var(--line)] space-y-4">
                  <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      <h3 className="text-xs font-bold text-[var(--ink)] uppercase tracking-wider font-mono">
                        Interactive Algorithm Simulation
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-[var(--ink-muted)]">
                      Step <strong className="text-[var(--ink)]">{simStep + 1}</strong> of 4
                    </span>
                  </div>

                  {/* Simulated Array Elements */}
                  <div className="flex items-center justify-center gap-3 py-6 flex-wrap">
                    {[1, 2, 2, 2, 3, 4, 8].map((num, i) => {
                      const isMid = (simStep === 0 && i === 3) || (simStep === 1 && i === 1) || (simStep === 2 && i === 2);
                      const isMatch = (simStep >= 2 && num === 2);
                      let cellClass = "bg-[var(--board)] border-[var(--line)] text-[var(--ink)]";
                      if (isMatch) cellClass = "bg-emerald-500/20 border-emerald-500 text-emerald-300 scale-105 shadow-md shadow-emerald-500/20";
                      else if (isMid) cellClass = "bg-blue-500/20 border-blue-500 text-blue-300 scale-105";

                      return (
                        <div key={i} className="flex flex-col items-center gap-1.5">
                          <div className="h-5 flex items-center justify-center">
                            {isMid && (
                              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-blue-500 text-white">
                                mid↓
                              </span>
                            )}
                            {isMatch && !isMid && (
                              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-500 text-white">
                                match↓
                              </span>
                            )}
                          </div>
                          <div className={`w-12 h-12 rounded-md flex items-center justify-center font-mono font-bold text-base border transition-all duration-200 ${cellClass}`}>
                            {num}
                          </div>
                          <span className="text-[10px] font-mono text-[var(--ink-muted)]">[{i}]</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Simulated Step Explanation & Controls */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-[var(--line)]">
                    <div className="text-xs text-[var(--ink)] leading-relaxed">
                      {simStep === 0 && "Step 1: Inspect middle element nums[3] = 2. Since 2 matches our target, we know the value exists!"}
                      {simStep === 1 && "Step 2: Binary search left half to find the First Occurrence of 2."}
                      {simStep === 2 && "Step 3: Binary search right half to find the Last Occurrence of 2."}
                      {simStep === 3 && "Step 4: Total count = (lastIndex - firstIndex + 1) = (3 - 1 + 1) = 3 occurrences in O(log N) time!"}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setSimStep((prev) => Math.max(0, prev - 1))}
                        disabled={simStep === 0}
                        className="btn-secondary px-2.5 py-1 text-xs font-mono disabled:opacity-40"
                      >
                        Prev Step
                      </button>
                      <button
                        onClick={() => setSimStep((prev) => Math.min(3, prev + 1))}
                        disabled={simStep === 3}
                        className="btn-primary px-3 py-1 text-xs font-mono disabled:opacity-40"
                      >
                        Next Step →
                      </button>
                    </div>
                  </div>
                </div>

                {/* AI Visualizer Generator Card */}
                <div className="p-5 rounded-md bg-[var(--board-raised)] border border-[var(--line)] space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-blue-400" />
                        <h4 className="text-sm font-semibold text-[var(--ink)]">
                          Generate Custom Interactive Visualizer for "{question.title}"
                        </h4>
                      </div>
                      <p className="text-xs text-[var(--ink-muted)] max-w-2xl leading-relaxed">
                        Our master AI prompt includes <strong>pedagogy-first simple teaching language</strong> and a <strong>complete pre-built React component template</strong>. Just copy, generate with Gemini or ChatGPT, and drop the <code className="text-blue-400 font-mono">.jsx</code> file below!
                      </p>
                    </div>

                    {/* Copy AI Prompt Button */}
                    <button
                      onClick={handleCopyMasterPrompt}
                      className="btn-primary flex items-center gap-2 px-3 py-1.5 text-xs font-semibold shrink-0 cursor-pointer"
                    >
                      {copiedMasterPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedMasterPrompt ? 'Copied Prompt!' : 'Copy Master Prompt'}</span>
                    </button>
                  </div>

                  {/* Dropzone for JSX file */}
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      handleUploadVisualizer(e);
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    className="p-5 rounded-md border border-dashed border-[var(--line)] hover:border-[var(--indigo)]/50 hover:bg-[var(--board)] transition-all flex flex-col items-center justify-center gap-2 cursor-pointer text-center"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".jsx,.js"
                      onChange={handleUploadVisualizer}
                      className="hidden"
                    />
                    <UploadCloud className="w-6 h-6 text-[var(--indigo)]" />
                    <div>
                      <span className="text-xs font-medium text-[var(--ink)]">
                        {isUploadingVis ? 'Uploading & linking visualizer...' : 'Drop compiled visualizer .jsx file here'}
                      </span>
                      <p className="text-[11px] text-[var(--ink-muted)] mt-0.5">
                        Or click to browse files. The visualizer will mount live instantly!
                      </p>
                    </div>
                  </div>

                  {uploadMsg && (
                    <div className={`p-2.5 rounded-md text-xs font-mono ${
                      uploadMsg.type === 'success' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                    }`}>
                      {uploadMsg.text}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Multi-Video Learning Section ── */}
        <div className="rounded-lg bg-[var(--board-raised)] border border-[var(--line)] overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[var(--board)]">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-400">
                <YoutubeIcon className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-[var(--ink)] flex items-center gap-2">
                  <span>Video Tutorials</span>
                  <span className="text-xs px-2 py-0.2 rounded-md bg-[var(--board-raised-2)] text-[var(--ink-muted)] border border-[var(--line)] font-mono">
                    {videoList.length} {videoList.length === 1 ? 'Source' : 'Sources'}
                  </span>
                </h2>
                <p className="text-xs text-[var(--ink-muted)]">
                  Watch step-by-step explanations from top educators (Striver, NeetCode, Abdul Bari)
                </p>
              </div>
            </div>

            {/* Video Selector Tabs */}
            {videoList.length > 1 && (
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                {videoList.map((vid, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      sound.playStep(600);
                      setActiveVideoIdx(idx);
                    }}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                      activeVideoIdx === idx
                        ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30 font-semibold'
                        : 'btn-secondary text-[var(--ink-muted)] hover:text-[var(--ink)]'
                    }`}
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>{vid.channel || vid.title || `Video ${idx + 1}`}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Active Video Player or Empty State */}
          <div className="p-4 sm:p-6 bg-[var(--board)]">
            {activeVideo && embedUrl ? (
              <div className="space-y-3">
                <div className="aspect-video w-full max-w-4xl mx-auto rounded-md overflow-hidden bg-black border border-[var(--line)] shadow-lg">
                  <iframe
                    src={embedUrl}
                    title={activeVideo.title || `${question.title} Video Tutorial`}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-[var(--ink-muted)] max-w-4xl mx-auto pt-1">
                  <span className="font-medium text-[var(--ink)]">
                    {activeVideo.title || `${question.title} Video Guide`} {activeVideo.channel ? `• ${activeVideo.channel}` : ''}
                  </span>
                  <a
                    href={activeVideo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-rose-400 hover:text-rose-300 transition-colors"
                  >
                    <span>Watch on YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="py-10 text-center space-y-3 max-w-md mx-auto">
                <div className="w-10 h-10 rounded-md bg-[var(--board-raised)] border border-[var(--line)] flex items-center justify-center text-[var(--ink-muted)] mx-auto">
                  <YoutubeIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[var(--ink)]">No video added yet</h4>
                  <p className="text-xs text-[var(--ink-muted)] mt-1">
                    You can add Striver, NeetCode, or custom YouTube tutorials for this problem from the Admin Center!
                  </p>
                </div>
                {onOpenAdmin && (
                  <button
                    onClick={() => onOpenAdmin(question.id)}
                    className="btn-primary text-xs"
                  >
                    Add YouTube Link in Admin
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Content Navigation Tabs (Editorial Article / Code Solutions / Personal Notes) ── */}
        <div className="border-b border-[var(--line)] flex items-center gap-2">
          <button
            onClick={() => setActiveTab('article')}
            className={`px-4 py-2.5 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'article'
                ? 'border-[var(--indigo)] text-[var(--ink)]'
                : 'border-transparent text-[var(--ink-muted)] hover:text-[var(--ink)]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Problem Editorial &amp; Article</span>
          </button>

          <button
            onClick={() => setActiveTab('solutions')}
            className={`px-4 py-2.5 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'solutions'
                ? 'border-[var(--indigo)] text-[var(--ink)]'
                : 'border-transparent text-[var(--ink-muted)] hover:text-[var(--ink)]'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Multi-Language Solutions</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-2.5 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'notes'
                ? 'border-[var(--indigo)] text-[var(--ink)]'
                : 'border-transparent text-[var(--ink-muted)] hover:text-[var(--ink)]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>My Study Notes</span>
          </button>
        </div>

        {/* ── TAB 1: Problem Editorial & Article ── */}
        {activeTab === 'article' && (
          <div className="space-y-6">
            
            {/* 1. Custom Rich Article / Editorial Notes written by Admin */}
            {question.article_content && (
              <section className="p-5 rounded-lg bg-[var(--board-raised)] border border-[var(--line)] space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <h2 className="text-sm font-semibold text-[var(--ink)]">Curated Editorial Insights</h2>
                </div>
                <div className="text-sm text-[var(--ink)] leading-relaxed whitespace-pre-line font-sans bg-[var(--board)] p-4 rounded-md border border-[var(--line)]">
                  {question.article_content}
                </div>
              </section>
            )}

            {/* 2. Curated Alternate Articles & Authoritative Resource Hub */}
            {(question.article_url || question.gfg_url || (Array.isArray(question.alternate_articles) && question.alternate_articles.length > 0)) && (
              <section className="p-5 rounded-lg bg-[var(--board-raised)] border border-[var(--line)] space-y-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-teal-400" />
                  <div>
                    <h2 className="text-sm font-semibold text-[var(--ink)]">Curated Solution Articles &amp; Editorial Guides</h2>
                    <p className="text-xs text-[var(--ink-muted)]">Compare official explanations, proof of invariants, and community editorials.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {question.article_url && (
                    <a
                      href={question.article_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-md bg-[var(--board)] hover:bg-[var(--board-raised-2)] border border-[var(--line)] hover:border-teal-500/40 transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div className="space-y-0.5">
                        <div className="text-xs font-semibold text-[var(--ink)] group-hover:text-teal-300 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                          <span>Take U Forward</span>
                        </div>
                        <div className="text-xs text-[var(--ink-muted)]">Official A2Z Comprehensive Guide</div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-[var(--ink-muted)] group-hover:text-teal-400 shrink-0" />
                    </a>
                  )}

                  {question.gfg_url && (
                    <a
                      href={question.gfg_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-md bg-[var(--board)] hover:bg-[var(--board-raised-2)] border border-[var(--line)] hover:border-emerald-500/40 transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div className="space-y-0.5">
                        <div className="text-xs font-semibold text-[var(--ink)] group-hover:text-emerald-300 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          <span>GeeksforGeeks</span>
                        </div>
                        <div className="text-xs text-[var(--ink-muted)]">Problem Article &amp; Practice</div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-[var(--ink-muted)] group-hover:text-emerald-400 shrink-0" />
                    </a>
                  )}

                  {Array.isArray(question.alternate_articles) && question.alternate_articles.map((art, aIdx) => (
                    <a
                      key={aIdx}
                      href={art.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-md bg-[var(--board)] hover:bg-[var(--board-raised-2)] border border-[var(--line)] hover:border-[var(--indigo)]/40 transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div className="space-y-0.5 min-w-0 pr-2">
                        <div className="text-xs font-semibold text-[var(--ink)] group-hover:text-blue-300 truncate flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></span>
                          <span className="truncate">{art.title || art.source}</span>
                        </div>
                        <div className="text-xs text-[var(--ink-muted)]">{art.source || 'Curated Editorial'}</div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-[var(--ink-muted)] group-hover:text-blue-400 shrink-0" />
                    </a>
                  ))}
                </div>
              </section>
            )}

            {/* 4. Structured Approaches Breakdown */}
            {Array.isArray(question.approaches_data) && question.approaches_data.length > 0 ? (
              <div className="space-y-4">
                <h2 className="text-sm font-semibold text-[var(--ink)] uppercase tracking-wider font-mono">Algorithmic Approaches</h2>
                {question.approaches_data.map((app, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-lg bg-[var(--board-raised)] border border-[var(--line)] space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--line)]">
                      <h3 className="text-sm font-semibold text-[var(--ink)] flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs flex items-center justify-center font-mono">
                          {idx + 1}
                        </span>
                        <span>{app.approach_name || `Approach ${idx + 1}`}</span>
                      </h3>

                      <div className="flex items-center gap-3 font-mono text-xs text-[var(--ink-muted)]">
                        <span>Time: <strong className="text-amber-400">{app.time_complexity || 'O(N)'}</strong></span>
                        <span>•</span>
                        <span>Space: <strong className="text-teal-400">{app.space_complexity || 'O(1)'}</strong></span>
                      </div>
                    </div>

                    {/* Intuition / Algorithm details */}
                    {app.algorithm && (
                      <div className="space-y-1.5">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--ink-muted)]">Intuition &amp; Algorithm</h4>
                        <div className="text-sm text-[var(--ink)] leading-relaxed whitespace-pre-line bg-[var(--board)] p-3.5 rounded-md border border-[var(--line)]">
                          {app.algorithm}
                        </div>
                      </div>
                    )}

                    {/* Complexity explanation */}
                    {(app.time_complexity_details || app.space_complexity_details) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs font-mono">
                        {app.time_complexity_details && (
                          <div className="p-3 rounded-md bg-[var(--board)] border border-[var(--line)]">
                            <span className="text-amber-400 font-semibold block mb-1">Time Complexity Details</span>
                            <p className="text-[var(--ink-muted)] whitespace-pre-line">{app.time_complexity_details}</p>
                          </div>
                        )}
                        {app.space_complexity_details && (
                          <div className="p-3 rounded-md bg-[var(--board)] border border-[var(--line)]">
                            <span className="text-teal-400 font-semibold block mb-1">Space Complexity Details</span>
                            <p className="text-[var(--ink-muted)] whitespace-pre-line">{app.space_complexity_details}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : question.approach ? (
              <section className="p-5 rounded-lg bg-[var(--board-raised)] border border-[var(--line)] space-y-3">
                <h2 className="text-sm font-semibold text-[var(--ink)]">Recommended Approach</h2>
                <div className="text-sm text-[var(--ink)] leading-relaxed whitespace-pre-line bg-[var(--board)] p-3.5 rounded-md border border-[var(--line)]">
                  {question.approach}
                </div>
              </section>
            ) : null}
          </div>
        )}

        {/* ── TAB 2: Multi-Language Code Solutions ── */}
        {activeTab === 'solutions' && (
          <div className="p-5 rounded-lg bg-[var(--board-raised)] border border-[var(--line)] space-y-4">
            {/* Tier & Info Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-[var(--line)]">
              {/* Approach Tier */}
              <div className="flex items-center gap-0.5 bg-[var(--board)] p-0.5 rounded-md border border-[var(--line)]">
                {[
                  { key: 'intuitive', label: 'Brute Force' },
                  { key: 'better', label: 'Better' },
                  { key: 'optimal', label: 'Optimal' }
                ].map((tier) => (
                  <button
                    key={tier.key}
                    onClick={() => {
                      sound?.playStep?.(600);
                      setSelectedTier(tier.key);
                    }}
                    className={`px-3 py-1 rounded text-xs font-mono font-medium transition-all cursor-pointer ${
                      selectedTier === tier.key
                        ? 'bg-[var(--indigo)] text-white font-semibold shadow-xs'
                        : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>

              <div className="text-xs font-mono text-[var(--ink-muted)] flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Multi-Language Highlighting &amp; Step Synced</span>
              </div>
            </div>

            {/* Code Display Area with Interactive CodeViewer */}
            <div className="rounded-md overflow-hidden border border-[var(--line)] min-h-[500px]">
              <CodeViewer
                solutions={activeTierSolutions}
                initialLanguage={selectedLanguage}
                activeLine={activeCodeLine}
                leetcodeUrl={question.leetcode_url}
              />
            </div>
          </div>
        )}

        {/* ── TAB 3: Personal Study Notes ── */}
        {activeTab === 'notes' && (
          <div className="p-5 rounded-lg bg-[var(--board-raised)] border border-[var(--line)] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-[var(--ink)]">Private Study Notes</h3>
                <p className="text-xs text-[var(--ink-muted)]">Write your key takeaways, tricky edge cases, and personal insights for quick revision.</p>
              </div>

              <button
                onClick={handleSaveNotes}
                disabled={savingNotes}
                className="btn-primary text-xs flex items-center gap-1.5 cursor-pointer"
              >
                {notesSavedAlert ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <span>{savingNotes ? 'Saving...' : 'Save Notes'}</span>
                )}
              </button>
            </div>

            <textarea
              value={personalNotes}
              onChange={(e) => setPersonalNotes(e.target.value)}
              placeholder="e.g. Remember to handle negative numbers in two-pointer approach..."
              rows={8}
              className="w-full p-3.5 rounded-md bg-[var(--board)] border border-[var(--line)] focus:border-[var(--indigo)] text-sm text-[var(--ink)] placeholder-[var(--ink-muted)] focus:outline-none font-mono resize-y"
            />
          </div>
        )}

        {/* ── Bottom Interactive Visualizer Callout Banner ── */}
        {hasVisualizer && (
          <div className="p-5 rounded-lg bg-[var(--board-raised)] border border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-400">
                <Layers className="w-4 h-4" />
                <span>Interactive Algorithm Canvas Available</span>
              </div>
              <p className="text-sm font-medium text-[var(--ink)]">
                Visualize <strong className="text-[var(--ink)]">{question.title}</strong> step-by-step with live pointers, arrays &amp; code highlights
              </p>
            </div>
            <button
              onClick={() => {
                sound?.playSuccess?.();
                onLaunchStudio(question);
              }}
              className="btn-primary flex items-center gap-2 px-4 py-2 text-xs font-semibold shrink-0 cursor-pointer"
            >
              <span>Launch Visualizer Studio →</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
