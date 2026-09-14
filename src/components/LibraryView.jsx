import React, { useState, useMemo } from 'react';
import {
  Search,
  Star,
  X,
  Clock,
  Upload,
  CheckCircle2,
  BookOpen,
  Zap,
  Layers,
  Sparkles,
  RotateCcw,
  LayoutGrid,
  ListOrdered,
  ChevronRight
} from 'lucide-react';
import QuestionCard from './QuestionCard';
import { STRIVER_STEPS, CATEGORIES } from '../services/db';
import { visualizersRegistry } from '../visualizers';
import AlgoVisionLogo from './AlgoVisionLogo';

const POPULAR_TAGS = [
  'Two Pointers', 'Binary Search', 'Sliding Window', 'Prefix Sum',
  "Kadane's Algorithm", 'Dynamic Programming', 'Monotonic Stack',
  'Fast & Slow Pointers', 'Tree Traversal', 'BFS', 'DFS',
  'Topological Sort', 'Shortest Path', 'Disjoint Set Union',
  'Hash Map', 'Matrix', 'Bitmask', 'Sorting'
];

export default function LibraryView({
  questions,
  onOpenQuestion,
  onToggleFavorite,
  onStatusChange,
  onOpenSkillModal: _onOpenSkillModal,
  onOpenImportModal
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStep, setSelectedStep] = useState('All'); // 'All' or number 1..18
  const [selectedSubstep, setSelectedSubstep] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [onlyDueForReview, setOnlyDueForReview] = useState(false);
  const [onlyWithViz, setOnlyWithViz] = useState(false);
  const [layoutMode, setLayoutMode] = useState('grouped'); // 'grouped' | 'grid'
  const searchInputRef = React.useRef(null);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key === 'k')) && document.activeElement !== searchInputRef.current && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  // Compute stats per Striver Step
  const stepStats = useMemo(() => {
    const statsMap = {};
    for (const s of STRIVER_STEPS) {
      statsMap[s.step_no] = { total: 0, mastered: 0 };
    }
    for (const q of questions) {
      if (q.step_no && statsMap[q.step_no]) {
        statsMap[q.step_no].total += 1;
        if (q.status === 'mastered') statsMap[q.step_no].mastered += 1;
      }
    }
    return statsMap;
  }, [questions]);

  // Compute available substeps for active step
  const availableSubsteps = useMemo(() => {
    if (selectedStep === 'All') return [];
    const set = new Set();
    for (const q of questions) {
      if (q.step_no === selectedStep && q.substep_name) {
        set.add(q.substep_name);
      }
    }
    return Array.from(set);
  }, [questions, selectedStep]);

  const filtered = useMemo(() => {
    return questions.filter((q) => {
      const qNum = q.leetcode_id ? String(q.leetcode_id) : '';
      const qTags = Array.isArray(q.tags) ? q.tags : [];
      const query = searchQuery.trim().toLowerCase();

      const matchSearch =
        query === '' ||
        q.title.toLowerCase().includes(query) ||
        (q.display_id && q.display_id.toLowerCase().includes(query)) ||
        qNum.includes(query) ||
        (q.step_name && q.step_name.toLowerCase().includes(query)) ||
        (q.substep_name && q.substep_name.toLowerCase().includes(query)) ||
        q.description?.toLowerCase().includes(query) ||
        qTags.some((t) => t.toLowerCase().includes(query));

      const matchStep = selectedStep === 'All' || q.step_no === selectedStep;
      const matchSubstep = selectedSubstep === 'All' || q.substep_name === selectedSubstep;

      const cleanCat = selectedCategory.replace(/^\d+\.\s*/, '').toLowerCase();
      const cleanQCat = (q.category || '').replace(/^\d+\.\s*/, '').toLowerCase();
      const matchCat =
        selectedCategory === 'All' ||
        q.category === selectedCategory ||
        cleanQCat === cleanCat;

      const matchTag = !selectedTag || qTags.includes(selectedTag);
      const matchDiff = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
      const matchStat = selectedStatus === 'All' || q.status === selectedStatus;
      const matchFav = !onlyFavorites || q.is_favorite;
      const matchDue = !onlyDueForReview || (q.next_review_date && q.next_review_date <= todayStr);
      const matchViz = !onlyWithViz || Boolean(visualizersRegistry[q.component_key || q.componentKey]);

      return matchSearch && matchStep && matchSubstep && matchCat && matchTag && matchDiff && matchStat && matchFav && matchDue && matchViz;
    });
  }, [
    questions,
    searchQuery,
    selectedStep,
    selectedSubstep,
    selectedCategory,
    selectedTag,
    selectedDifficulty,
    selectedStatus,
    onlyFavorites,
    onlyDueForReview,
    onlyWithViz,
    todayStr
  ]);

  // Grouped questions structure by Step & Substep
  const groupedQuestions = useMemo(() => {
    if (layoutMode !== 'grouped') return null;
    const groups = [];
    const groupMap = new Map();

    for (const q of filtered) {
      const groupKey = `${q.step_no || 0}_${q.substep_name || 'General'}`;
      if (!groupMap.has(groupKey)) {
        const item = {
          step_no: q.step_no,
          step_name: q.step_name || `Step ${q.step_no}`,
          substep_name: q.substep_name || 'General Problems',
          questions: []
        };
        groupMap.set(groupKey, item);
        groups.push(item);
      }
      groupMap.get(groupKey).questions.push(q);
    }
    return groups;
  }, [filtered, layoutMode]);

  const hasActiveFilter =
    selectedStep !== 'All' ||
    selectedSubstep !== 'All' ||
    selectedCategory !== 'All' ||
    selectedTag ||
    selectedDifficulty !== 'All' ||
    selectedStatus !== 'All' ||
    onlyFavorites ||
    onlyDueForReview ||
    onlyWithViz ||
    searchQuery.trim() !== '';

  const totalCount = questions.length || 450;
  const mastered = useMemo(() => questions.filter((q) => q.status === 'mastered').length, [questions]);
  const inProgress = useMemo(() => questions.filter((q) => q.status === 'in_progress').length, [questions]);
  const withViz = useMemo(
    () => questions.filter((q) => Boolean(visualizersRegistry[q.component_key || q.componentKey])).length,
    [questions]
  );
  const dueReviewCount = useMemo(
    () => questions.filter((q) => q.next_review_date && q.next_review_date <= todayStr).length,
    [questions, todayStr]
  );

  const masteryPercentage = Math.round((mastered / Math.max(totalCount, 1)) * 100);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedStep('All');
    setSelectedSubstep('All');
    setSelectedCategory('All');
    setSelectedTag(null);
    setSelectedDifficulty('All');
    setSelectedStatus('All');
    setOnlyFavorites(false);
    setOnlyDueForReview(false);
    setOnlyWithViz(false);
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 py-7 space-y-6">

      {/* ── Top Executive Workspace Header (Apple Showcase Telemetry Card) ── */}
      <section className="rounded-2xl p-4 sm:p-5 bg-[var(--board-raised)] border border-[var(--line)] backdrop-blur-2xl shadow-sm relative overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--indigo-glow)] rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 opacity-40" />

        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Left: Roadmap Identity & Progress Telemetry */}
          <div className="space-y-2.5 max-w-xl">
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--indigo-dim)] border border-[var(--indigo)]/25 text-[var(--indigo)] text-[11.5px] font-sans font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Striver A2Z Curriculum</span>
              </div>
              <span className="text-[var(--line-strong)] text-xs">·</span>
              <span className="text-xs font-sans text-[var(--chalk-dim)]">
                Roadmap Mastery: <strong className="text-[var(--indigo)] font-semibold">{masteryPercentage}%</strong> ({mastered}/{totalCount} Completed)
              </span>
            </div>

            {/* Apple Smooth Progress Track */}
            <div className="w-full max-w-md h-2 rounded-full bg-[var(--board-raised-2)] overflow-hidden border border-[var(--line)] p-0.5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[var(--indigo)] to-[var(--teal)] transition-all duration-500 ease-out shadow-[0_0_8px_rgba(10,132,255,0.4)]"
                style={{ width: `${Math.max(masteryPercentage, 2)}%` }}
              />
            </div>
          </div>

          {/* Right: Apple Telemetry Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* 1. Total Problems */}
            <div className="px-3.5 py-1.5 rounded-full bg-[var(--board-raised-2)] border border-[var(--line)] flex items-center gap-2 text-xs font-sans">
              <BookOpen className="w-3.5 h-3.5 text-[var(--chalk-faint)]" />
              <span className="text-[var(--chalk-dim)]">Challenges:</span>
              <span className="font-bold text-[var(--chalk)]">{totalCount}</span>
            </div>

            {/* 2. Mastered */}
            <div className="px-3.5 py-1.5 rounded-full bg-[var(--easy-dim)] border border-[var(--easy)]/30 flex items-center gap-2 text-xs font-sans">
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--easy)]" />
              <span className="text-[var(--chalk-dim)]">Mastered:</span>
              <span className="font-bold text-[var(--easy)]">{mastered}</span>
            </div>

            {/* 3. In Progress */}
            <div className="px-3.5 py-1.5 rounded-full bg-[var(--amber-dim)] border border-[var(--amber)]/30 flex items-center gap-2 text-xs font-sans">
              <Zap className="w-3.5 h-3.5 text-[var(--amber)]" />
              <span className="text-[var(--chalk-dim)]">Active:</span>
              <span className="font-bold text-[var(--amber)]">{inProgress}</span>
            </div>

            {/* 4. Interactive Visualizers Toggle */}
            <button
              onClick={() => setOnlyWithViz(!onlyWithViz)}
              className={`px-3.5 py-1.5 rounded-full border flex items-center gap-2 text-xs font-sans transition-all cursor-pointer ${
                onlyWithViz
                  ? 'bg-[var(--indigo-dim)] border-[var(--indigo)]/50 text-[var(--indigo)] font-semibold shadow-[0_0_10px_rgba(10,132,255,0.25)]'
                  : 'bg-[var(--board-raised-2)] border-[var(--line)] hover:border-[var(--indigo)]/30 text-[var(--chalk-dim)] hover:text-[var(--chalk)]'
              }`}
              title="Filter problems with interactive visualizers"
            >
              <Layers className="w-3.5 h-3.5 text-[var(--indigo)]" />
              <span>Visualizers:</span>
              <span className="font-bold">{withViz}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── Search, Controls & Filter Bar ── */}
      <div className="space-y-3.5">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5 flex-wrap">

          {/* Search Bar (Apple Command Palette Style) */}
          <div className="relative flex-1 min-w-[260px] max-w-lg">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--chalk-faint)] pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search algorithms, patterns, LC numbers (#167)..."
              className="w-full pl-9 pr-12 py-2 bg-[var(--board-raised)] border border-[var(--line)] hover:border-[var(--line-strong)] focus:border-[var(--indigo)] rounded-full text-xs text-[var(--chalk)] placeholder-[var(--chalk-faint)] focus:outline-none focus:ring-2 focus:ring-[var(--indigo)]/20 font-sans transition-all shadow-sm"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--chalk-faint)] hover:text-[var(--chalk)] transition-colors p-0.5"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[9.5px]">
                /
              </kbd>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Segmented Difficulty Control */}
            <div className="segmented-control shrink-0">
              {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`segmented-item ${selectedDifficulty === diff ? 'active' : ''}`}
                >
                  {diff === 'All' ? 'All Diff' : diff}
                </button>
              ))}
            </div>

            {/* Segmented Status Control */}
            <div className="segmented-control shrink-0">
              {[
                { key: 'All', label: 'All Status' },
                { key: 'mastered', label: 'Mastered' },
                { key: 'in_progress', label: 'Active' },
                { key: 'to_learn', label: 'To Learn' }
              ].map((st) => (
                <button
                  key={st.key}
                  onClick={() => setSelectedStatus(st.key)}
                  className={`segmented-item ${selectedStatus === st.key ? 'active' : ''}`}
                >
                  {st.label}
                </button>
              ))}
            </div>

            {/* Quick Filter Toggles */}
            <div className="flex items-center gap-1.5">
              {/* Starred */}
              <button
                onClick={() => setOnlyFavorites(!onlyFavorites)}
                className={`nav-pill text-xs h-8 px-3 ${
                  onlyFavorites ? 'border-amber-500/40 bg-amber-500/15 text-amber-600 dark:text-amber-300 font-semibold' : ''
                }`}
                title="Show bookmarked problems"
              >
                <Star className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-amber-400 text-amber-500' : ''}`} />
                <span className="hidden sm:inline">Saved</span>
              </button>

              {/* Spaced Repetition Due Filter */}
              <button
                onClick={() => setOnlyDueForReview(!onlyDueForReview)}
                className={`nav-pill text-xs h-8 px-3 ${
                  onlyDueForReview ? 'border-cyan-500/40 bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 font-semibold' : ''
                }`}
                title="Show problems due for spaced repetition review"
              >
                <Clock className="w-3.5 h-3.5 text-[var(--teal)]" />
                <span className="hidden sm:inline">Review</span>
                {dueReviewCount > 0 && (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-[var(--teal-dim)] text-[var(--teal)] font-bold">
                    {dueReviewCount}
                  </span>
                )}
              </button>

              {/* Import Button */}
              {onOpenImportModal && (
                <button
                  onClick={onOpenImportModal}
                  className="btn-secondary h-8 px-3 text-xs"
                  title="Import or create custom questions"
                >
                  <Upload className="w-3.5 h-3.5 text-[var(--chalk-dim)]" />
                  <span>Import</span>
                </button>
              )}

              {/* Layout Mode Toggle (Grouped vs Grid) */}
              <div className="segmented-control shrink-0">
                <button
                  onClick={() => setLayoutMode('grouped')}
                  className={`segmented-item flex items-center gap-1.5 ${layoutMode === 'grouped' ? 'active' : ''}`}
                  title="Group problems by Step and Subtopic"
                >
                  <ListOrdered className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Roadmap</span>
                </button>
                <button
                  onClick={() => setLayoutMode('grid')}
                  className={`segmented-item flex items-center gap-1.5 ${layoutMode === 'grid' ? 'active' : ''}`}
                  title="View as compact card grid"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Grid</span>
                </button>
              </div>

              {/* Reset Action */}
              {hasActiveFilter && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 px-2.5 py-1 h-8 rounded-full text-rose-500 hover:bg-rose-500/10 border border-rose-500/25 text-xs font-mono transition-all cursor-pointer"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Official 18-Step Striver's A2Z Roadmap Navigation Ribbon ── */}
        <div className="space-y-2 border-b border-[var(--line)] pb-3">
          <div className="flex items-center justify-between text-xs font-sans text-[var(--chalk-dim)] px-1">
            <span className="font-semibold uppercase tracking-wider text-[11px] text-[var(--indigo)]">
              Curriculum Steps (18 Modules)
            </span>
            <span className="text-[11px] font-mono">
              {selectedStep === 'All' ? 'All Steps Active' : `Viewing Step ${selectedStep}`}
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            {/* "All Steps" Pill */}
            <button
              onClick={() => {
                setSelectedStep('All');
                setSelectedSubstep('All');
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-sans font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                selectedStep === 'All'
                  ? 'bg-[var(--indigo)] text-white font-semibold shadow-sm'
                  : 'bg-[var(--board-raised-2)] text-[var(--chalk-dim)] hover:text-[var(--chalk)] hover:bg-[var(--board-hover)] border border-[var(--line)]'
              }`}
            >
              <span>All Steps</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                selectedStep === 'All' ? 'bg-white/20 text-white' : 'bg-[var(--board-raised)] text-[var(--chalk-faint)]'
              }`}>
                {totalCount}
              </span>
            </button>

            {/* Steps 1 to 18 */}
            {STRIVER_STEPS.map((s) => {
              const isActive = selectedStep === s.step_no;
              const stats = stepStats[s.step_no] || { total: 0, mastered: 0 };
              const isFinished = stats.total > 0 && stats.mastered === stats.total;

              return (
                <button
                  key={s.step_no}
                  onClick={() => {
                    setSelectedStep(isActive ? 'All' : s.step_no);
                    setSelectedSubstep('All');
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-sans transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-[var(--indigo)] text-white font-semibold shadow-sm'
                      : isFinished
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      : 'bg-[var(--board-raised-2)] text-[var(--chalk-dim)] hover:text-[var(--chalk)] hover:bg-[var(--board-hover)] border border-[var(--line)]'
                  }`}
                  title={`Step ${s.step_no}: ${s.title}`}
                >
                  <span className="font-semibold">Step {s.step_no}</span>
                  <span className="text-[11px] truncate max-w-[120px] hidden md:inline opacity-80">
                    {s.title.split('[')[0].replace('Learn', '').replace('Solve Problems on', '').trim()}
                  </span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[var(--board-raised)] text-[var(--chalk-faint)]'
                  }`}>
                    {stats.mastered}/{stats.total}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Substep Filter Ribbon (when a step is selected) */}
          {availableSubsteps.length > 0 && (
            <div className="flex items-center gap-1.5 pt-1 overflow-x-auto scrollbar-none">
              <span className="text-[11px] font-mono text-[var(--chalk-faint)] shrink-0 mr-1">Subtopics:</span>
              <button
                onClick={() => setSelectedSubstep('All')}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-sans transition-all shrink-0 cursor-pointer ${
                  selectedSubstep === 'All'
                    ? 'bg-[var(--indigo-dim)] text-[var(--indigo)] border border-[var(--indigo)]/30 font-semibold'
                    : 'text-[var(--chalk-dim)] hover:text-[var(--chalk)] bg-[var(--board-raised-2)] border border-[var(--line)]'
                }`}
              >
                All Subtopics
              </button>
              {availableSubsteps.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubstep(sub)}
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-sans transition-all shrink-0 cursor-pointer ${
                    selectedSubstep === sub
                      ? 'bg-[var(--indigo-dim)] text-[var(--indigo)] border border-[var(--indigo)]/30 font-semibold'
                      : 'text-[var(--chalk-dim)] hover:text-[var(--chalk)] bg-[var(--board-raised-2)] border border-[var(--line)]'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Popular Tags Ribbon (Apple Pill Tags) ── */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--indigo-dim)] text-[var(--indigo)] border border-[var(--indigo)]/30 text-[11px] font-sans font-medium shrink-0 transition-all shadow-sm"
            >
              #{selectedTag}
              <X className="w-3 h-3 ml-0.5" />
            </button>
          )}
          {POPULAR_TAGS.filter((t) => t !== selectedTag).map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className="px-2.5 py-1 rounded-full border border-[var(--line)] bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] text-[var(--chalk-dim)] hover:text-[var(--chalk)] text-[11px] font-sans transition-all shrink-0 whitespace-nowrap"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* ── Filter Counter & Metadata Info ── */}
      <div className="flex items-center justify-between text-xs font-mono text-[var(--chalk-dim)] pt-0.5">
        <span>
          Showing <b className="text-[var(--chalk)]">{filtered.length}</b> of {questions.length} problems
          {selectedStep !== 'All' && <span className="text-[var(--indigo)]"> (Step {selectedStep})</span>}
          {selectedSubstep !== 'All' && <span className="text-[var(--teal)]"> · {selectedSubstep}</span>}
        </span>
        {hasActiveFilter && (
          <span className="text-indigo-600 dark:text-indigo-400 font-medium">Filters active</span>
        )}
      </div>

      {/* ── Problem Cards: Grouped by Step & Subtopic or Flat Grid ── */}
      {filtered.length > 0 ? (
        layoutMode === 'grouped' && groupedQuestions && groupedQuestions.length > 0 ? (
          <div className="space-y-8">
            {groupedQuestions.map((group, gIdx) => (
              <section key={gIdx} className="space-y-3.5">
                {/* Section Header */}
                <div className="flex items-center justify-between gap-3 pb-2 border-b border-[var(--line)]">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-6 h-6 rounded-lg bg-[var(--indigo-dim)] border border-[var(--indigo)]/25 text-[var(--indigo)] text-xs font-mono font-bold flex items-center justify-center shrink-0">
                      {group.step_no || '·'}
                    </span>
                    <div>
                      <h3 className="text-sm font-sans font-bold text-[var(--chalk)] flex items-center gap-2">
                        <span>Step {group.step_no}: {group.step_name}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[var(--line-strong)]" />
                        <span className="text-[var(--indigo)] font-semibold">{group.substep_name}</span>
                      </h3>
                    </div>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[var(--board-raised-2)] text-[var(--chalk-dim)] border border-[var(--line)]">
                    {group.questions.length} {group.questions.length === 1 ? 'problem' : 'problems'}
                  </span>
                </div>

                {/* Subtopic Questions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
                  {group.questions.map((q) => (
                    <QuestionCard
                      key={q.id}
                      question={q}
                      onOpen={onOpenQuestion}
                      onToggleFavorite={onToggleFavorite}
                      onStatusChange={onStatusChange}
                      activeTag={selectedTag}
                      onSelectTag={setSelectedTag}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          /* Flat Card Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
            {filtered.map((q) => (
              <QuestionCard
                key={q.id}
                question={q}
                onOpen={onOpenQuestion}
                onToggleFavorite={onToggleFavorite}
                onStatusChange={onStatusChange}
                activeTag={selectedTag}
                onSelectTag={setSelectedTag}
              />
            ))}
          </div>
        )
      ) : (
        /* Empty State */
        <div className="p-14 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] flex flex-col items-center justify-center text-center space-y-3.5 shadow-sm">
          <AlgoVisionLogo size={44} />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-[var(--chalk)]">No problems match your filter</p>
            <p className="text-xs text-[var(--chalk-dim)] max-w-sm">
              Try adjusting your search terms or selecting a different step or subtopic.
            </p>
          </div>
          {hasActiveFilter && (
            <button
              onClick={handleResetFilters}
              className="btn-primary text-xs"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
