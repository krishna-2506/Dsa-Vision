import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Search,
  Star,
  X,
  RotateCcw,
  ClipboardCopy,
  ChevronRight,
  ChevronDown,
  Play,
  BookOpen,
  ExternalLink,
  Sparkles,
  Layers,
  Shuffle,
  Check,
  LayoutGrid,
  List,
  Shield,
  Code2
} from 'lucide-react';

function YoutubeIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}
import { STRIVER_STEPS } from '../services/db';
import { visualizersRegistry } from '../visualizers';
import { sound } from '../services/audio';
import QuestionCard from './QuestionCard';

const DIFF_COLORS = {
  easy: { dot: 'bg-emerald-500', text: 'text-emerald-400', badge: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25' },
  medium: { dot: 'bg-amber-500', text: 'text-amber-400', badge: 'text-amber-400 bg-amber-500/10 border-amber-500/25' },
  hard: { dot: 'bg-rose-500', text: 'text-rose-400', badge: 'text-rose-400 bg-rose-500/10 border-rose-500/25' }
};

export default function LibraryView({
  questions = [],
  onOpenQuestion,
  onOpenArticle,
  onToggleFavorite,
  onStatusChange,
  onOpenImportModal,
  onOpenAdmin,
  onOpenSandbox,
  onOpenStepTheory
}) {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'revision'
  const [searchQuery, setSearchQuery] = useState('');
  const [problemStatusFilter, setProblemStatusFilter] = useState('all'); // 'all' | 'solved' | 'unsolved'
  const [difficultyFilter, setDifficultyFilter] = useState('all'); // 'all' | 'Easy' | 'Medium' | 'Hard'
  const [viewMode, setViewMode] = useState('accordion'); // 'accordion' | 'cards'
  const [videoMenuOpenId, setVideoMenuOpenId] = useState(null);

  // Set of opened step accordions (defaults to step 1 open for quick start)
  const [openSteps, setOpenSteps] = useState(new Set([1, 2, 3]));
  // Set of opened subcategory accordions
  const [openSubcategories, setOpenSubcategories] = useState(new Set());

  const searchInputRef = useRef(null);

  // Keyboard shortcut '/' to search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key === 'k')) &&
        document.activeElement !== searchInputRef.current &&
        !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close video popover on click outside
  useEffect(() => {
    const handleClickOutside = () => setVideoMenuOpenId(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  // Global counts
  const totalCount = questions.length || 474;
  const masteredCount = useMemo(
    () => questions.filter((q) => q.status === 'mastered').length,
    [questions]
  );
  const easyTotal = useMemo(
    () => questions.filter((q) => (q.difficulty || '').toLowerCase() === 'easy').length || 151,
    [questions]
  );
  const easyMastered = useMemo(
    () => questions.filter((q) => (q.difficulty || '').toLowerCase() === 'easy' && q.status === 'mastered').length,
    [questions]
  );
  const mediumTotal = useMemo(
    () => questions.filter((q) => (q.difficulty || '').toLowerCase() === 'medium').length || 187,
    [questions]
  );
  const mediumMastered = useMemo(
    () => questions.filter((q) => (q.difficulty || '').toLowerCase() === 'medium' && q.status === 'mastered').length,
    [questions]
  );
  const hardTotal = useMemo(
    () => questions.filter((q) => (q.difficulty || '').toLowerCase() === 'hard').length || 136,
    [questions]
  );
  const hardMastered = useMemo(
    () => questions.filter((q) => (q.difficulty || '').toLowerCase() === 'hard' && q.status === 'mastered').length,
    [questions]
  );

  const overallProgressPct = Math.round((masteredCount / Math.max(totalCount, 1)) * 100);

  // Toggle step accordion
  const toggleStep = (stepNo) => {
    sound.playStep(580);
    setOpenSteps((prev) => {
      const next = new Set(prev);
      if (next.has(stepNo)) {
        next.delete(stepNo);
      } else {
        next.add(stepNo);
      }
      return next;
    });
  };

  // Toggle subcategory accordion
  const toggleSubcategory = (subKey) => {
    sound.playStep(620);
    setOpenSubcategories((prev) => {
      const next = new Set(prev);
      if (next.has(subKey)) {
        next.delete(subKey);
      } else {
        next.add(subKey);
      }
      return next;
    });
  };

  // Pick a random problem
  const handlePickRandomProblem = () => {
    sound?.playSuccess?.();
    const candidates = questions.filter((q) => q.status !== 'mastered');
    const pool = candidates.length > 0 ? candidates : questions;
    if (pool.length === 0) return;
    const randomPick = pool[Math.floor(Math.random() * pool.length)];
    if (onOpenArticle) {
      onOpenArticle(randomPick);
    } else {
      onOpenQuestion(randomPick);
    }
  };

  // Handle reset progress
  const handleResetProgress = async () => {
    if (!window.confirm('Reset all progress back to 0%? This will mark all problems as "To Learn".')) return;
    sound.playStep(450);
    for (const q of questions) {
      if (q.status === 'mastered') {
        onStatusChange(q.id, 'to_learn');
      }
    }
  };

  // Filtered list
  const filtered = useMemo(() => {
    const qLower = searchQuery.trim().toLowerCase();
    return questions.filter((q) => {
      // Revision filter
      if (activeTab === 'revision' && !q.is_favorite) return false;

      // Status filter
      if (problemStatusFilter === 'solved' && q.status !== 'mastered') return false;
      if (problemStatusFilter === 'unsolved' && q.status === 'mastered') return false;

      // Difficulty filter
      if (difficultyFilter !== 'all' && (q.difficulty || '').toLowerCase() !== difficultyFilter.toLowerCase()) return false;

      // Search filter
      if (qLower) {
        const matchTitle = q.title?.toLowerCase().includes(qLower);
        const matchId = q.display_id?.toLowerCase().includes(qLower) || (q.leetcode_id && String(q.leetcode_id).includes(qLower));
        const matchStep = q.step_name?.toLowerCase().includes(qLower);
        const matchSub = q.substep_name?.toLowerCase().includes(qLower);
        const matchTags = Array.isArray(q.tags) && q.tags.some((t) => t.toLowerCase().includes(qLower));
        if (!matchTitle && !matchId && !matchStep && !matchSub && !matchTags) return false;
      }

      return true;
    });
  }, [questions, activeTab, problemStatusFilter, difficultyFilter, searchQuery]);

  // Auto-expand steps when difficulty filter or search query is active
  useEffect(() => {
    if (difficultyFilter !== 'all' || searchQuery.trim() !== '') {
      const activeStepNos = new Set();
      for (const q of filtered) {
        if (q.step_no) activeStepNos.add(q.step_no);
      }
      if (activeStepNos.size > 0) {
        setOpenSteps(activeStepNos);
      }
    }
  }, [difficultyFilter, searchQuery, filtered]);

  // Group questions by Step -> Subcategory for the accordion sheet view
  const hierarchicalSteps = useMemo(() => {
    const map = new Map();

    // Initialize all 18 steps
    for (const s of STRIVER_STEPS) {
      map.set(s.step_no, {
        step_no: s.step_no,
        title: s.title,
        total: 0,
        mastered: 0,
        subcategories: new Map()
      });
    }

    // Populate questions
    for (const q of filtered) {
      const stepNo = q.step_no || 1;
      if (!map.has(stepNo)) {
        map.set(stepNo, {
          step_no: stepNo,
          title: q.step_name || `Step ${stepNo}`,
          total: 0,
          mastered: 0,
          subcategories: new Map()
        });
      }

      const stepObj = map.get(stepNo);
      stepObj.total += 1;
      if (q.status === 'mastered') stepObj.mastered += 1;

      const subName = q.substep_name || 'Overview & Problems';
      if (!stepObj.subcategories.has(subName)) {
        stepObj.subcategories.set(subName, {
          substep_name: subName,
          substep_no: q.substep_no || 1,
          total: 0,
          mastered: 0,
          problems: []
        });
      }

      const subObj = stepObj.subcategories.get(subName);
      subObj.total += 1;
      if (q.status === 'mastered') subObj.mastered += 1;
      subObj.problems.push(q);
    }

    return Array.from(map.values()).filter((st) => searchQuery.trim() === '' || st.total > 0);
  }, [filtered, searchQuery]);

  // Find next recommended problem (first unsolved problem in sequence)
  const nextRecommended = useMemo(() => {
    return questions.find((q) => q.status !== 'mastered') || questions[0];
  }, [questions]);

  return (
    <div className="max-w-[1300px] mx-auto px-4 sm:px-6 py-8 space-y-8 relative overflow-hidden">
      {/* ── Dark Luxury Ambient Breathing Orb ── */}
      <div className="hero-orb" />

      {/* ── 1. Dark Luxury Hero Section ── */}
      <section className="relative z-10 pt-4 pb-2 reveal">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            {/* Curriculum Badge */}
            <div className="hero-badge">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              <span>Striver's A2Z DSA Sheet</span>
            </div>

            {/* Clean Title & Description */}
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              Data Structures &amp; Algorithms
            </h1>

            <p className="text-sm sm:text-base text-[var(--text-body)] leading-relaxed max-w-2xl pt-0.5">
              Interactive visualizers, solution notes, and multi-language code implementations across all 455 problems.
            </p>
          </div>

          {/* Top Right Header Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            {/* Code Lab Sandbox Action */}
            <button
              onClick={onOpenSandbox}
              className="btn-primary h-9 px-4 text-xs font-semibold"
              title="Open Code-to-Visualizer Studio (C++, Python, JS in-browser compiler)"
            >
              <Code2 className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Code Lab</span>
            </button>

            {/* Reset Progress */}
            <button
              onClick={handleResetProgress}
              className="btn-secondary h-9 px-3 text-xs"
              title="Reset all progress back to zero"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Reset</span>
            </button>

            {/* Import / Export */}
            <button
              onClick={onOpenImportModal}
              className="btn-secondary h-9 px-3 text-xs"
              title="Import or Export Question Sheet Data"
            >
              <ClipboardCopy className="w-3.5 h-3.5 text-[var(--text-body)]" />
              <span>Import</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── 2. Filters & Actions Row (Dark Luxury Toolbar) ── */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-wrap">
        {/* Left: Tab Segmented Control (All Problems / Revision) */}
        <div className="flex items-center bg-[var(--bg-card)] p-1 rounded-xl border border-[var(--border-subtle)]">
          <button
            onClick={() => {
              sound.playStep(600);
              setActiveTab('all');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] font-semibold border border-[var(--border-medium)] shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-body)]'
            }`}
          >
            All Problems
          </button>

          <button
            onClick={() => {
              sound.playStep(600);
              setActiveTab('revision');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
              activeTab === 'revision'
                ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] font-semibold border border-[var(--border-medium)] shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-body)]'
            }`}
          >
            Revision
          </button>
        </div>

        {/* Right: Search Input, Status Filter, Difficulty Filter, Random Problem */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-tertiary)]" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problems... (/)"
              className="w-40 sm:w-56 pl-8 pr-7 py-1.5 bg-[var(--bg-card)] border border-[var(--border-subtle)] focus:border-[var(--border-accent)] rounded-lg text-xs text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Status filter dropdown */}
          <select
            value={problemStatusFilter}
            onChange={(e) => setProblemStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg text-xs text-[var(--text-body)] focus:border-[var(--border-accent)] focus:outline-none cursor-pointer transition-colors"
          >
            <option value="all">All Status</option>
            <option value="unsolved">Unsolved</option>
            <option value="solved">Solved</option>
          </select>

          {/* Difficulty filter dropdown */}
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="px-3 py-1.5 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg text-xs text-[var(--text-body)] focus:border-[var(--border-accent)] focus:outline-none cursor-pointer transition-colors"
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Random Challenge */}
          <button
            onClick={handlePickRandomProblem}
            className="btn-secondary h-8 px-3 text-xs rounded-lg flex items-center gap-1.5"
            title="Pick a random problem to solve"
          >
            <Shuffle className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Random Problem</span>
          </button>

          {/* View mode toggle (Accordion vs Cards) */}
          <div className="flex items-center bg-[var(--bg-card)] p-1 rounded-xl border border-[var(--border-subtle)] ml-1">
            <button
              onClick={() => setViewMode('accordion')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'accordion' ? 'bg-[var(--bg-surface)] text-[var(--accent)] border border-[var(--border-medium)]' : 'text-[var(--text-muted)] hover:text-[var(--text-body)]'
              }`}
              title="Sheet Accordion View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'cards' ? 'bg-[var(--bg-surface)] text-[var(--accent)] border border-[var(--border-medium)]' : 'text-[var(--text-muted)] hover:text-[var(--text-body)]'
              }`}
              title="Card Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── 3. Dark Luxury Progress Card (Elevated borderless panel with inset top highlight) ── */}
      <section className="card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 reveal">
        {/* Left: Circular Ring & Overall Progress */}
        <div className="flex items-center gap-5">
          {/* Circular Progress Gauge */}
          <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="26"
                className="stroke-[var(--bg-surface)]"
                strokeWidth="5"
                fill="transparent"
              />
              <circle
                cx="32"
                cy="32"
                r="26"
                className="stroke-[var(--accent)] transition-all duration-700"
                strokeWidth="5"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 26}
                strokeDashoffset={2 * Math.PI * 26 - (overallProgressPct / 100) * (2 * Math.PI * 26)}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute font-mono font-bold text-sm text-[var(--text-primary)]">
              {overallProgressPct}%
            </span>
          </div>

          <div className="space-y-1">
            <span className="section-label !mb-1">[Curriculum Mastery]</span>
            <div className="text-base font-bold text-[var(--text-primary)]">
              {masteredCount} <span className="text-xs font-normal text-[var(--text-muted)] font-mono">/ {totalCount || 474} Completed</span>
            </div>
            <div className="text-xs font-mono text-[var(--text-tertiary)]">
              {totalCount - masteredCount} problems remaining to achieve master tier
            </div>
          </div>
        </div>

        {/* Right: Interactive Difficulty Filters (Easy, Medium, Hard) */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 flex-wrap text-xs font-mono">
          {/* Easy */}
          <button
            onClick={() => {
              sound?.playStep?.(580);
              setDifficultyFilter(prev => prev === 'Easy' ? 'all' : 'Easy');
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all cursor-pointer border ${
              difficultyFilter === 'Easy'
                ? 'bg-[#3d9e5c]/15 border-[#3d9e5c] text-[#3d9e5c] shadow-[0_0_12px_rgba(61,158,92,0.25)]'
                : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-[var(--border-medium)] text-[var(--text-body)]'
            }`}
            title="Click to filter by Easy problems"
          >
            <span className={`w-2.5 h-2.5 rounded-full bg-[#3d9e5c] shrink-0 ${difficultyFilter === 'Easy' ? 'animate-pulse ring-2 ring-[#3d9e5c]/40' : ''}`} />
            <span>Easy</span>
            <span className={`font-semibold ${difficultyFilter === 'Easy' ? 'text-[#3d9e5c]' : 'text-[var(--text-primary)]'}`}>
              {easyMastered}<span className="text-[var(--text-muted)] font-normal">/{easyTotal || 151}</span>
            </span>
          </button>

          {/* Medium */}
          <button
            onClick={() => {
              sound?.playStep?.(580);
              setDifficultyFilter(prev => prev === 'Medium' ? 'all' : 'Medium');
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all cursor-pointer border ${
              difficultyFilter === 'Medium'
                ? 'bg-[#d4a03c]/15 border-[#d4a03c] text-[#d4a03c] shadow-[0_0_12px_rgba(212,160,60,0.25)]'
                : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-[var(--border-medium)] text-[var(--text-body)]'
            }`}
            title="Click to filter by Medium problems"
          >
            <span className={`w-2.5 h-2.5 rounded-full bg-[#d4a03c] shrink-0 ${difficultyFilter === 'Medium' ? 'animate-pulse ring-2 ring-[#d4a03c]/40' : ''}`} />
            <span>Medium</span>
            <span className={`font-semibold ${difficultyFilter === 'Medium' ? 'text-[#d4a03c]' : 'text-[var(--text-primary)]'}`}>
              {mediumMastered}<span className="text-[var(--text-muted)] font-normal">/{mediumTotal || 187}</span>
            </span>
          </button>

          {/* Hard */}
          <button
            onClick={() => {
              sound?.playStep?.(580);
              setDifficultyFilter(prev => prev === 'Hard' ? 'all' : 'Hard');
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all cursor-pointer border ${
              difficultyFilter === 'Hard'
                ? 'bg-[#b83c38]/15 border-[#b83c38] text-[#b83c38] shadow-[0_0_12px_rgba(184,60,56,0.25)]'
                : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-[var(--border-medium)] text-[var(--text-body)]'
            }`}
            title="Click to filter by Hard problems"
          >
            <span className={`w-2.5 h-2.5 rounded-full bg-[#b83c38] shrink-0 ${difficultyFilter === 'Hard' ? 'animate-pulse ring-2 ring-[#b83c38]/40' : ''}`} />
            <span>Hard</span>
            <span className={`font-semibold ${difficultyFilter === 'Hard' ? 'text-[#b83c38]' : 'text-[var(--text-primary)]'}`}>
              {hardMastered}<span className="text-[var(--text-muted)] font-normal">/{hardTotal || 136}</span>
            </span>
          </button>
        </div>
      </section>

      {/* ── 4. Main Content: 18-Step Collapsible Accordion or Card Grid ── */}
      {viewMode === 'accordion' ? (
        <section className="space-y-3">
          {hierarchicalSteps.map((step) => {
            const isOpen = openSteps.has(step.step_no);
            const stepPct = Math.round((step.mastered / Math.max(step.total, 1)) * 100);
            const isCompleted = step.total > 0 && step.mastered === step.total;

            return (
              <div
                key={step.step_no}
                className="card rounded-2xl overflow-hidden mb-3 border-none transition-all"
              >
                {/* ── Step Header Row ── */}
                <div
                  onClick={() => toggleStep(step.step_no)}
                  className="px-5 py-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-[rgba(255,248,230,0.02)] transition-colors select-none"
                >
                  {/* Left: Chevron & Monospace Step Badge & Step Title */}
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-medium)] flex items-center justify-center shrink-0">
                      <ChevronRight
                        className={`w-4 h-4 text-[var(--accent)] transition-transform duration-200 ${
                          isOpen ? 'rotate-90' : ''
                        }`}
                      />
                    </div>
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-xs font-mono font-semibold text-[var(--accent)] tracking-wider shrink-0">
                        [STEP {String(step.step_no).padStart(2, '0')}]
                      </span>
                      <h3 className="text-sm sm:text-[15px] font-semibold text-[var(--text-primary)] truncate">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  {/* Right: Theory Hub Action, Progress Track Bar & Count Fraction */}
                  <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                    {onOpenStepTheory && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          sound?.playStep?.(620);
                          onOpenStepTheory(step.step_no);
                        }}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-medium text-[var(--accent)] hover:text-[var(--accent-bright)] bg-[rgba(212,160,60,0.08)] hover:bg-[rgba(212,160,60,0.18)] border border-[var(--border-accent)]/30 hover:border-[var(--accent)] transition-all cursor-pointer"
                        title={`Open Step ${step.step_no} Theory, Video Lectures & Notes`}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Theory</span>
                      </button>
                    )}

                    <div className="hidden sm:block w-24 sm:w-36 h-1.5 rounded-full bg-[rgba(255,248,230,0.06)] overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isCompleted ? 'bg-[#3d9e5c]' : 'bg-[var(--accent)]'
                        }`}
                        style={{ width: `${stepPct}%` }}
                      />
                    </div>

                    <span className="text-xs font-mono text-[var(--text-muted)] w-14 text-right">
                      <span className="font-semibold text-[var(--text-primary)]">{step.mastered}</span> / {step.total}
                    </span>
                  </div>
                </div>

                {/* ── Step Content (Subcategories & Problems) ── */}
                {isOpen && (
                  <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3 sm:p-5 space-y-4">
                    {Array.from(step.subcategories.values()).map((sub, sIdx) => {
                      const subKey = `${step.step_no}_${sub.substep_name}`;
                      const isSubOpen = !openSubcategories.has(subKey);

                      return (
                        <div
                          key={sIdx}
                          className="rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] overflow-hidden"
                        >
                          {/* Subcategory Header */}
                          <div
                            onClick={() => toggleSubcategory(subKey)}
                            className="px-4 py-2.5 flex items-center justify-between gap-2 cursor-pointer hover:bg-[rgba(255,248,230,0.02)] transition-colors select-none bg-[var(--bg-card)] border-b border-[var(--border-subtle)]"
                          >
                            <div className="flex items-center gap-2.5">
                              <ChevronDown
                                className={`w-3.5 h-3.5 text-[var(--text-tertiary)] transition-transform duration-150 ${
                                  isSubOpen ? '' : '-rotate-90'
                                }`}
                              />
                              <span className="text-xs font-mono font-medium text-[var(--text-primary)] tracking-wide">
                                [{sub.substep_name}]
                              </span>
                            </div>
                            <span className="text-xs font-mono text-[var(--text-tertiary)]">
                              <span className="text-[var(--text-body)] font-medium">{sub.mastered}</span> / {sub.total}
                            </span>
                          </div>

                          {/* Problem Rows Table */}
                          {isSubOpen && (
                            <div className="divide-y divide-[var(--border-subtle)]">
                              {sub.problems.map((q, pIdx) => {
                                const isSolved = q.status === 'mastered';
                                const diffKey = (q.difficulty || 'medium').toLowerCase();
                                const hasVis = Boolean(
                                  visualizersRegistry[q.component_key || q.componentKey]
                                );
                                const videoList = Array.isArray(q.youtube_videos) && q.youtube_videos.length > 0
                                  ? q.youtube_videos
                                  : (q.youtube_url ? [{ title: "Striver's Tutorial", url: q.youtube_url, channel: 'take U forward' }] : []);
                                const hasVideos = videoList.length > 0;
                                const isVideoMenuOpen = videoMenuOpenId === q.id;

                                return (
                                  <div
                                    key={q.id}
                                    className="px-4 py-2.5 flex items-center justify-between gap-3 hover:bg-[rgba(255,248,230,0.02)] transition-colors group"
                                  >
                                    {/* Left: Checkbox, Star, Sequential Index & Problem Title */}
                                    <div className="flex items-center gap-3 min-w-0 flex-1">
                                      {/* Checkbox */}
                                      <button
                                        onClick={() => {
                                          sound.playStep(640);
                                          onStatusChange(q.id, isSolved ? 'to_learn' : 'mastered');
                                        }}
                                        className={`w-4 h-4 rounded-[4px] flex items-center justify-center transition-all cursor-pointer shrink-0 border ${
                                          isSolved
                                            ? 'bg-[#3d9e5c] border-[#3d9e5c] text-black shadow-[0_0_8px_rgba(61,158,92,0.4)]'
                                            : 'border-[var(--border-medium)] hover:border-[var(--accent)] bg-[var(--bg-surface)]'
                                        }`}
                                        title={isSolved ? 'Mark as unsolved' : 'Mark as solved'}
                                      >
                                        {isSolved && <Check className="w-3 h-3 stroke-[3]" />}
                                      </button>

                                      {/* Bookmark Star */}
                                      <button
                                        onClick={() => {
                                          sound.playStep(720);
                                          onToggleFavorite(q.id);
                                        }}
                                        className={`p-0.5 rounded transition-colors cursor-pointer shrink-0 ${
                                          q.is_favorite
                                            ? 'text-[var(--accent)]'
                                            : 'text-[var(--text-tertiary)] hover:text-[var(--accent)]'
                                        }`}
                                        title={q.is_favorite ? 'Bookmarked' : 'Add to bookmarks'}
                                      >
                                        <Star
                                          className={`w-3.5 h-3.5 ${
                                            q.is_favorite ? 'fill-[var(--accent)]' : ''
                                          }`}
                                        />
                                      </button>

                                      {/* Clean Problem Number Index (01, 02, 03...) */}
                                      <span className="text-xs font-mono text-[var(--text-tertiary)] w-6 shrink-0 tabular-nums select-none hidden sm:inline">
                                        {String(pIdx + 1).padStart(2, '0')}
                                      </span>

                                      {/* Problem Title */}
                                      <span
                                        onClick={() => {
                                          sound.playStep(520);
                                          if (onOpenArticle) onOpenArticle(q);
                                          else onOpenQuestion(q);
                                        }}
                                        className={`text-[13px] sm:text-sm font-medium transition-colors cursor-pointer truncate ${
                                          isSolved
                                            ? 'text-[var(--text-muted)] line-through'
                                            : 'text-[var(--text-primary)] hover:text-[var(--accent-bright)]'
                                        }`}
                                        title={q.title}
                                      >
                                        {q.title}
                                      </span>
                                    </div>

                                    {/* Right: Actions & Resource Badges (Restrained & Quiet) */}
                                    <div className="flex items-center gap-2 shrink-0">
                                      {/* Subtle Difficulty Dot + Text */}
                                      <div className="flex items-center gap-1.5 w-14 sm:w-16 shrink-0 justify-end sm:justify-start">
                                        <span
                                          className={`w-1.5 h-1.5 rounded-full ${
                                            diffKey === 'easy'
                                              ? 'bg-[#3d9e5c]'
                                              : diffKey === 'hard'
                                              ? 'bg-[#b83c38]'
                                              : 'bg-[#d4a03c]'
                                          }`}
                                        />
                                        <span
                                          className={`text-[11px] font-mono capitalize ${
                                            diffKey === 'easy'
                                              ? 'text-[#3d9e5c]'
                                              : diffKey === 'hard'
                                              ? 'text-[#b83c38]'
                                              : 'text-[#d4a03c]'
                                          }`}
                                        >
                                          {q.difficulty || 'Med'}
                                        </span>
                                      </div>

                                      {/* Resource Action Icons: Docs / Notes */}
                                      <button
                                        onClick={() => {
                                          sound.playStep(520);
                                          if (onOpenArticle) onOpenArticle(q);
                                          else onOpenQuestion(q);
                                        }}
                                        className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[rgba(255,248,230,0.06)] transition-colors cursor-pointer"
                                        title="Editorial Article & Solution Notes"
                                      >
                                        <BookOpen className="w-3.5 h-3.5" />
                                      </button>

                                      {/* Video Button */}
                                      {hasVideos && (
                                        <div className="relative" onClick={(e) => e.stopPropagation()}>
                                          <button
                                            onClick={() => setVideoMenuOpenId(isVideoMenuOpen ? null : q.id)}
                                            className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-rose-400 hover:bg-[rgba(255,248,230,0.06)] transition-colors cursor-pointer flex items-center gap-1"
                                            title="Video Breakdown"
                                          >
                                            <YoutubeIcon className="w-3.5 h-3.5" />
                                            {videoList.length > 1 && (
                                              <span className="text-[10px] font-mono text-[var(--accent)] font-semibold">
                                                {videoList.length}
                                              </span>
                                            )}
                                          </button>

                                          {/* Popover Menu for Videos */}
                                          {isVideoMenuOpen && (
                                            <div className="absolute right-0 bottom-full mb-1 w-64 rounded-xl bg-[var(--bg-card)] border border-[var(--border-medium)] shadow-2xl p-2 z-50 text-xs space-y-1">
                                              <div className="text-[10px] font-mono uppercase text-[var(--accent)] px-2 py-1 tracking-wider">
                                                [Video Breakdown ({videoList.length})]
                                              </div>
                                              {videoList.map((vid, vIdx) => (
                                                <button
                                                  key={vIdx}
                                                  onClick={() => {
                                                    setVideoMenuOpenId(null);
                                                    if (onOpenArticle) onOpenArticle(q);
                                                  }}
                                                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-[rgba(255,248,230,0.06)] text-left text-[var(--text-primary)] transition-colors cursor-pointer"
                                                >
                                                  <div className="flex items-center gap-2 truncate">
                                                    <YoutubeIcon className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                                                    <span className="truncate text-xs">{vid.channel || vid.title || `Video ${vIdx + 1}`}</span>
                                                  </div>
                                                  <span className="text-[10px] font-mono text-[var(--accent)] shrink-0">Study →</span>
                                                </button>
                                              ))}
                                            </div>
                                          )}
                                        </div>
                                      )}

                                      {/* LeetCode link */}
                                      {q.leetcode_url && (
                                        <a
                                          href={q.leetcode_url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[rgba(255,248,230,0.06)] transition-colors"
                                          title="Open on LeetCode"
                                        >
                                          <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                      )}

                                      {/* Interactive Visualizer Launch — Minimalist Icon Button */}
                                      {hasVis && (
                                        <button
                                          onClick={() => {
                                            sound?.playSuccess?.();
                                            onOpenQuestion(q);
                                          }}
                                          className="p-1.5 rounded-md text-[var(--accent)] hover:text-[var(--accent-bright)] bg-[rgba(212,160,60,0.08)] hover:bg-[rgba(212,160,60,0.18)] border border-[var(--border-accent)]/40 hover:border-[var(--accent)] transition-all cursor-pointer shadow-[0_0_8px_rgba(212,160,60,0.10)] hover:shadow-[0_0_14px_rgba(212,160,60,0.25)]"
                                          title="Launch Interactive Algorithm Visualizer Studio"
                                        >
                                          <Sparkles className="w-3.5 h-3.5" />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </section>
      ) : (
        /* Card Grid View (Alternative Layout) */
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filtered.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              onOpen={onOpenArticle || onOpenQuestion}
              onToggleFavorite={onToggleFavorite}
              onStatusChange={onStatusChange}
            />
          ))}
        </section>
      )}

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="p-12 rounded-lg bg-[var(--board-raised)] border border-[var(--line)] text-center space-y-3">
          <BookOpen className="w-8 h-8 text-[var(--chalk-faint)] mx-auto" />
          <h3 className="text-sm font-medium text-[var(--chalk)]">No problems found</h3>
          <p className="text-xs text-[var(--chalk-dim)]">Try adjusting your search terms or filter selection.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveTab('all');
              setProblemStatusFilter('all');
              setDifficultyFilter('all');
            }}
            className="btn-primary text-xs cursor-pointer h-7.5 px-3"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
