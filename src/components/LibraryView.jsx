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
  Layers,
  Shuffle,
  Check,
  LayoutGrid,
  List,
  Shield
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
  onOpenAdmin
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
    <div className="max-w-[1300px] mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* ── 1. Page Header: Developer Learning Journey ── */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--line)]">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--chalk)] font-sans">
              Algorithm Laboratory
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk-dim)] font-medium">
              A2Z Roadmap · {totalCount} Problems
            </span>
          </div>
          <p className="text-xs sm:text-[13px] text-[var(--chalk-dim)] leading-relaxed">
            Systematic algorithm curriculum with interactive step-by-step visual debugging, invariant tracking, and LeetCode problem mappings.
          </p>
        </div>

        {/* Top Right Header Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          {/* Next Recommended Problem */}
          {nextRecommended && (
            <button
              onClick={() => {
                sound?.playSuccess?.();
                if (onOpenArticle) onOpenArticle(nextRecommended);
                else onOpenQuestion(nextRecommended);
              }}
              className="btn-primary h-7.5 px-3 text-xs font-medium"
              title={`Next up: ${nextRecommended.title}`}
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Resume ({nextRecommended.display_id || 'Next'})</span>
            </button>
          )}

          {/* Random Challenge */}
          <button
            onClick={handlePickRandomProblem}
            className="flex items-center gap-1.5 h-7.5 px-2.5 rounded bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] border border-[var(--line)] text-xs font-medium text-[var(--chalk-dim)] hover:text-[var(--chalk)] transition-colors cursor-pointer"
            title="Pick a random problem to solve"
          >
            <Shuffle className="w-3 h-3" />
            <span>Random</span>
          </button>

          {/* Import / Export */}
          <button
            onClick={onOpenImportModal}
            className="flex items-center gap-1.5 h-7.5 px-2.5 rounded bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] border border-[var(--line)] text-xs font-medium text-[var(--chalk-dim)] hover:text-[var(--chalk)] transition-colors cursor-pointer"
            title="Import or Export Question Sheet Data"
          >
            <ClipboardCopy className="w-3 h-3" />
            <span>Sync</span>
          </button>

          {/* Reset Progress */}
          <button
            onClick={handleResetProgress}
            className="flex items-center gap-1.5 h-7.5 px-2.5 rounded bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] border border-[var(--line)] text-xs font-medium text-[var(--chalk-faint)] hover:text-amber-400 transition-colors cursor-pointer"
            title="Reset all progress back to zero"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </section>

      {/* ── 2. Progress Telemetry Workspace Bar (Linear/GitHub developer metrics) ── */}
      <section className="p-4 rounded-lg bg-[var(--board-raised)] border border-[var(--line)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Overall Completion Metric */}
        <div className="flex items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[var(--chalk-dim)] uppercase tracking-wider font-mono">Curriculum Progress</span>
              <span className="text-xs font-mono font-bold text-[var(--chalk)]">{overallProgressPct}%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-36 sm:w-48 h-2 rounded bg-[var(--board-raised-2)] overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500 rounded"
                  style={{ width: `${overallProgressPct}%` }}
                />
              </div>
              <span className="text-xs font-mono text-[var(--chalk-dim)]">
                <strong className="text-[var(--chalk)]">{masteredCount}</strong> / {totalCount}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Difficulty Breakdown Filters (Easy, Medium, Hard) */}
        <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
          {/* Easy Filter */}
          <button
            onClick={() => {
              sound?.playStep?.(580);
              setDifficultyFilter((prev) => (prev.toLowerCase() === 'easy' ? 'all' : 'Easy'));
            }}
            className={`flex items-center gap-2 h-7.5 px-2.5 rounded border transition-colors cursor-pointer ${
              difficultyFilter.toLowerCase() === 'easy'
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                : 'bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] border-[var(--line)] text-[var(--chalk-dim)] hover:text-[var(--chalk)]'
            }`}
            title="Filter by Easy"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Easy</span>
            <span className="font-semibold text-[var(--chalk)]">
              {easyMastered}<span className="text-[var(--chalk-faint)] font-normal">/{easyTotal}</span>
            </span>
          </button>

          {/* Medium Filter */}
          <button
            onClick={() => {
              sound?.playStep?.(580);
              setDifficultyFilter((prev) => (prev.toLowerCase() === 'medium' ? 'all' : 'Medium'));
            }}
            className={`flex items-center gap-2 h-7.5 px-2.5 rounded border transition-colors cursor-pointer ${
              difficultyFilter.toLowerCase() === 'medium'
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-400'
                : 'bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] border-[var(--line)] text-[var(--chalk-dim)] hover:text-[var(--chalk)]'
            }`}
            title="Filter by Medium"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>Medium</span>
            <span className="font-semibold text-[var(--chalk)]">
              {mediumMastered}<span className="text-[var(--chalk-faint)] font-normal">/{mediumTotal}</span>
            </span>
          </button>

          {/* Hard Filter */}
          <button
            onClick={() => {
              sound?.playStep?.(580);
              setDifficultyFilter((prev) => (prev.toLowerCase() === 'hard' ? 'all' : 'Hard'));
            }}
            className={`flex items-center gap-2 h-7.5 px-2.5 rounded border transition-colors cursor-pointer ${
              difficultyFilter.toLowerCase() === 'hard'
                ? 'bg-rose-500/15 border-rose-500/40 text-rose-400'
                : 'bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] border-[var(--line)] text-[var(--chalk-dim)] hover:text-[var(--chalk)]'
            }`}
            title="Filter by Hard"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span>Hard</span>
            <span className="font-semibold text-[var(--chalk)]">
              {hardMastered}<span className="text-[var(--chalk-faint)] font-normal">/{hardTotal}</span>
            </span>
          </button>

          {/* Clear filter button */}
          {difficultyFilter !== 'all' && (
            <button
              onClick={() => {
                sound?.playStep?.(520);
                setDifficultyFilter('all');
              }}
              className="text-[11px] font-mono px-2 py-1 rounded bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] border border-[var(--line)] text-[var(--chalk-dim)] hover:text-[var(--chalk)] cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </section>

      {/* ── 3. Search & Filter Bar ── */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-wrap">
        
        {/* Left: Tab Segmented Control (All / Revision) */}
        <div className="flex items-center bg-[var(--board-raised)] p-0.5 rounded border border-[var(--line)] self-start">
          <button
            onClick={() => {
              sound.playStep(600);
              setActiveTab('all');
            }}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[var(--board-raised-2)] text-[var(--chalk)] font-semibold border border-[var(--line)]'
                : 'text-[var(--chalk-dim)] hover:text-[var(--chalk)]'
            }`}
          >
            All Problems
          </button>

          <button
            onClick={() => {
              sound.playStep(600);
              setActiveTab('revision');
            }}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'revision'
                ? 'bg-[var(--board-raised-2)] text-[var(--chalk)] font-semibold border border-[var(--line)]'
                : 'text-[var(--chalk-dim)] hover:text-[var(--chalk)]'
            }`}
          >
            Bookmarked
          </button>
        </div>

        {/* Right: Search Input, Status Filter, View Mode Toggle */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--chalk-faint)]" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problems, topics, IDs..."
              className="w-48 sm:w-64 pl-8 pr-7 py-1 bg-[var(--board-raised)] border border-[var(--line)] focus:border-[var(--indigo)] rounded text-xs text-[var(--chalk)] placeholder-[var(--chalk-faint)] focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--chalk-faint)] hover:text-[var(--chalk)] p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Status filter dropdown */}
          <select
            value={problemStatusFilter}
            onChange={(e) => setProblemStatusFilter(e.target.value)}
            className="px-2.5 py-1 bg-[var(--board-raised)] border border-[var(--line)] rounded text-xs text-[var(--chalk-dim)] focus:outline-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="unsolved">Unsolved</option>
            <option value="solved">Completed</option>
          </select>

          {/* View mode toggle (Accordion vs Cards) */}
          <div className="flex items-center bg-[var(--board-raised)] p-0.5 rounded border border-[var(--line)]">
            <button
              onClick={() => setViewMode('accordion')}
              className={`p-1 rounded transition-colors cursor-pointer ${
                viewMode === 'accordion' ? 'bg-[var(--board-raised-2)] text-[var(--chalk)]' : 'text-[var(--chalk-dim)] hover:text-[var(--chalk)]'
              }`}
              title="Sheet Accordion View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1 rounded transition-colors cursor-pointer ${
                viewMode === 'cards' ? 'bg-[var(--board-raised-2)] text-[var(--chalk)]' : 'text-[var(--chalk-dim)] hover:text-[var(--chalk)]'
              }`}
              title="Card Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── 4. Main Content: 18-Step Collapsible Accordion or Card Grid ── */}
      {viewMode === 'accordion' ? (
        <section className="space-y-2">
          {hierarchicalSteps.map((step) => {
            const isOpen = openSteps.has(step.step_no);
            const stepFraction = `${step.mastered} / ${step.total}`;
            const stepPct = Math.round((step.mastered / Math.max(step.total, 1)) * 100);
            const isCompleted = step.total > 0 && step.mastered === step.total;

            return (
              <div
                key={step.step_no}
                className="rounded-lg bg-[var(--board-raised)] border border-[var(--line)] overflow-hidden transition-colors"
              >
                {/* ── Step Header Row ── */}
                <div
                  onClick={() => toggleStep(step.step_no)}
                  className="px-4 py-3 flex items-center justify-between gap-4 cursor-pointer hover:bg-[var(--board-raised-2)] transition-colors select-none"
                >
                  {/* Left: Chevron & Step Title */}
                  <div className="flex items-center gap-3 min-w-0">
                    <ChevronRight
                      className={`w-4 h-4 text-[var(--chalk-faint)] transition-transform duration-150 shrink-0 ${
                        isOpen ? 'rotate-90' : ''
                      }`}
                    />
                    <h3 className="text-[13.5px] font-medium text-[var(--chalk)] truncate">
                      {step.title}
                    </h3>
                  </div>

                  {/* Right: Progress Track Bar & Count Fraction */}
                  <div className="flex items-center gap-3.5 shrink-0">
                    {/* Clean Progress Bar */}
                    <div className="w-20 sm:w-32 h-1.5 rounded bg-[var(--board-raised-2)] overflow-hidden">
                      <div
                        className={`h-full rounded transition-all duration-300 ${
                          isCompleted ? 'bg-emerald-500' : 'bg-[var(--indigo)]'
                        }`}
                        style={{ width: `${stepPct}%` }}
                      />
                    </div>

                    {/* Fraction (e.g. 0 / 54) */}
                    <span className="text-xs font-mono text-[var(--chalk-dim)] w-14 text-right">
                      {stepFraction}
                    </span>
                  </div>
                </div>

                {/* ── Step Content (Subcategories & Problems) ── */}
                {isOpen && (
                  <div className="border-t border-[var(--line)] bg-[var(--board)] p-3 sm:p-4 space-y-3">
                    {Array.from(step.subcategories.values()).map((sub, sIdx) => {
                      const subKey = `${step.step_no}_${sub.substep_name}`;
                      const isSubOpen = !openSubcategories.has(subKey);

                      return (
                        <div
                          key={sIdx}
                          className="rounded-md bg-[var(--board-raised)] border border-[var(--line)] overflow-hidden"
                        >
                          {/* Subcategory Header */}
                          <div
                            onClick={() => toggleSubcategory(subKey)}
                            className="px-3.5 py-2 flex items-center justify-between gap-2 cursor-pointer hover:bg-[var(--board-hover)] transition-colors select-none bg-[var(--board-raised-2)]"
                          >
                            <div className="flex items-center gap-2">
                              <ChevronDown
                                className={`w-3.5 h-3.5 text-[var(--chalk-faint)] transition-transform duration-150 ${
                                  isSubOpen ? '' : '-rotate-90'
                                }`}
                              />
                              <span className="text-xs font-medium text-[var(--chalk)]">
                                {sub.substep_name}
                              </span>
                            </div>
                            <span className="text-[11px] font-mono text-[var(--chalk-dim)]">
                              {sub.mastered} / {sub.total}
                            </span>
                          </div>

                          {/* Problem Rows Table */}
                          {isSubOpen && (
                            <div className="divide-y divide-[var(--line)]">
                              {sub.problems.map((q) => {
                                const isSolved = q.status === 'mastered';
                                const diffKey = (q.difficulty || 'medium').toLowerCase();
                                const diffCfg = DIFF_COLORS[diffKey] || DIFF_COLORS.medium;
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
                                    className="px-3.5 py-2 flex items-center justify-between gap-3 hover:bg-[var(--board-hover)] transition-colors group"
                                  >
                                    {/* Left: Checkbox, Star & Title */}
                                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                      {/* Checkbox */}
                                      <button
                                        onClick={() => {
                                          sound.playStep(640);
                                          onStatusChange(q.id, isSolved ? 'to_learn' : 'mastered');
                                        }}
                                        className={`w-4 h-4 rounded flex items-center justify-center transition-colors cursor-pointer shrink-0 border ${
                                          isSolved
                                            ? 'bg-emerald-500 border-emerald-500 text-white'
                                            : 'border-[var(--line-strong)] hover:border-[var(--chalk-dim)] bg-[var(--board)]'
                                        }`}
                                        title={isSolved ? 'Mark as unsolved' : 'Mark as solved'}
                                      >
                                        {isSolved && <Check className="w-3 h-3 stroke-[3]" />}
                                      </button>

                                      {/* Star / Bookmark */}
                                      <button
                                        onClick={() => {
                                          sound.playStep(720);
                                          onToggleFavorite(q.id);
                                        }}
                                        className={`p-0.5 rounded transition-colors cursor-pointer shrink-0 ${
                                          q.is_favorite
                                            ? 'text-amber-400'
                                            : 'text-[var(--chalk-faint)] hover:text-amber-400'
                                        }`}
                                        title={q.is_favorite ? 'Bookmarked' : 'Add to bookmarks'}
                                      >
                                        <Star
                                          className={`w-3.5 h-3.5 ${
                                            q.is_favorite ? 'fill-amber-400' : ''
                                          }`}
                                        />
                                      </button>

                                      {/* Problem Title */}
                                      <span
                                        onClick={() => {
                                          sound.playStep(520);
                                          if (onOpenArticle) onOpenArticle(q);
                                          else onOpenQuestion(q);
                                        }}
                                        className={`text-xs sm:text-[13px] font-medium transition-colors cursor-pointer truncate ${
                                          isSolved
                                            ? 'text-[var(--chalk-faint)] line-through'
                                            : 'text-[var(--chalk)] hover:text-[var(--indigo)]'
                                        }`}
                                      >
                                        {q.title}
                                      </span>
                                    </div>

                                    {/* Right: Actions & Resource Badges */}
                                    <div className="flex items-center gap-1.5 shrink-0">
                                      
                                      {/* Article Button */}
                                      <button
                                        onClick={() => {
                                          sound.playStep(520);
                                          if (onOpenArticle) onOpenArticle(q);
                                          else onOpenQuestion(q);
                                        }}
                                        className="h-6 px-2 rounded bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] border border-[var(--line)] text-[11px] font-mono text-teal-400/90 hover:text-teal-300 transition-colors cursor-pointer flex items-center gap-1"
                                        title="Open Tutorial & Article Hub"
                                      >
                                        <BookOpen className="w-3 h-3 text-teal-400" />
                                        <span className="hidden md:inline">Docs</span>
                                      </button>

                                      {/* Video Button */}
                                      {hasVideos && (
                                        <div className="relative" onClick={(e) => e.stopPropagation()}>
                                          <button
                                            onClick={() => setVideoMenuOpenId(isVideoMenuOpen ? null : q.id)}
                                            className="h-6 px-2 rounded bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] border border-[var(--line)] text-[11px] font-mono text-rose-400 transition-colors cursor-pointer flex items-center gap-1"
                                            title="View video tutorials"
                                          >
                                            <Play className="w-3 h-3 fill-current" />
                                            <span className="hidden md:inline">
                                              {videoList.length > 1 ? `${videoList.length} vids` : 'Video'}
                                            </span>
                                          </button>

                                          {/* Popover Menu for Videos */}
                                          {isVideoMenuOpen && (
                                            <div className="absolute right-0 bottom-full mb-1 w-60 rounded-md bg-[var(--board-raised)] border border-[var(--line)] shadow-xl p-1 z-50 text-xs font-sans space-y-0.5">
                                              <div className="text-[10px] font-mono uppercase text-[var(--chalk-faint)] px-2 py-1">
                                                Tutorials ({videoList.length})
                                              </div>
                                              {videoList.map((vid, vIdx) => (
                                                <button
                                                  key={vIdx}
                                                  onClick={() => {
                                                    setVideoMenuOpenId(null);
                                                    if (onOpenArticle) onOpenArticle(q);
                                                  }}
                                                  className="w-full flex items-center justify-between px-2 py-1.5 rounded hover:bg-[var(--board-hover)] text-left text-[var(--chalk)] transition-colors cursor-pointer"
                                                >
                                                  <div className="flex items-center gap-1.5 truncate">
                                                    <YoutubeIcon className="w-3 h-3 text-rose-400 shrink-0" />
                                                    <span className="truncate text-xs">{vid.channel || vid.title || `Video ${vIdx + 1}`}</span>
                                                  </div>
                                                  <span className="text-[10px] font-mono text-[var(--indigo)] shrink-0">Study →</span>
                                                </button>
                                              ))}
                                            </div>
                                          )}
                                        </div>
                                      )}

                                      {/* Interactive Visualizer Launch */}
                                      {hasVis && (
                                        <button
                                          onClick={() => {
                                            sound?.playSuccess?.();
                                            onOpenQuestion(q);
                                          }}
                                          className="h-6 px-2 rounded bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/25 text-[11px] font-mono text-indigo-400 transition-colors cursor-pointer flex items-center gap-1"
                                          title="Launch Interactive Algorithm Visualizer"
                                        >
                                          <Layers className="w-3 h-3" />
                                          <span className="hidden lg:inline">Visualize</span>
                                        </button>
                                      )}

                                      {/* LeetCode link */}
                                      {q.leetcode_url && (
                                        <a
                                          href={q.leetcode_url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="p-1 text-[var(--chalk-faint)] hover:text-[var(--chalk)] transition-colors"
                                          title="Open on LeetCode"
                                        >
                                          <ExternalLink className="w-3 h-3" />
                                        </a>
                                      )}

                                      {/* Difficulty Badge */}
                                      <span
                                        className={`px-1.5 py-0.2 rounded text-[10px] font-mono border ${diffCfg.badge}`}
                                      >
                                        {q.difficulty}
                                      </span>
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
