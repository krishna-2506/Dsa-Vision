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
  RotateCcw
} from 'lucide-react';
import QuestionCard from './QuestionCard';
import { CATEGORIES } from '../services/db';
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
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [onlyDueForReview, setOnlyDueForReview] = useState(false);
  const [onlyWithViz, setOnlyWithViz] = useState(false);

  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

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
        q.description?.toLowerCase().includes(query) ||
        qTags.some((t) => t.toLowerCase().includes(query));

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

      return matchSearch && matchCat && matchTag && matchDiff && matchStat && matchFav && matchDue && matchViz;
    });
  }, [
    questions,
    searchQuery,
    selectedCategory,
    selectedTag,
    selectedDifficulty,
    selectedStatus,
    onlyFavorites,
    onlyDueForReview,
    onlyWithViz,
    todayStr
  ]);

  const hasActiveFilter =
    selectedCategory !== 'All' ||
    selectedTag ||
    selectedDifficulty !== 'All' ||
    selectedStatus !== 'All' ||
    onlyFavorites ||
    onlyDueForReview ||
    onlyWithViz ||
    searchQuery.trim() !== '';

  const totalCount = questions.length || 372;
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

      {/* ── Top Executive Workspace Header ── */}
      <section className="relative overflow-hidden rounded-2xl p-6 sm:p-7 bg-[var(--board-raised)] border border-[var(--line)] shadow-sm">
        {/* Subtle structural background accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/[0.04] dark:bg-indigo-500/[0.07] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-cyan-500/[0.03] dark:bg-cyan-500/[0.05] rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left Title & Roadmap Progression */}
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Striver's A2Z Roadmap · Interactive Studio</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-sans font-bold text-[var(--chalk)] tracking-tight leading-tight">
              Master Data Structures & Algorithms Through <span className="text-indigo-600 dark:text-indigo-400">Visual Execution</span>
            </h1>

            <p className="text-xs sm:text-sm text-[var(--chalk-dim)] leading-relaxed">
              Step through complex pointer maneuvers, recursive trees, and sliding windows in real-time.
              Paired with synchronized C++, Python, and Java code execution.
            </p>

            {/* Overall Mastery Progress Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[var(--chalk-dim)]">Roadmap Completion</span>
                <span className="text-indigo-600 dark:text-indigo-300 font-semibold">{masteryPercentage}% ({mastered}/{totalCount} Mastered)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[var(--board-raised-2)] overflow-hidden border border-[var(--line)]">
                <div
                  className="h-full rounded-full bg-indigo-500 dark:bg-indigo-400 transition-all duration-500"
                  style={{ width: `${Math.max(masteryPercentage, 2)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right: High-Precision Telemetry Stat Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
            {/* 1. Total Problems */}
            <div className="p-3.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] flex flex-col justify-between hover:border-[var(--line-strong)] transition-all">
              <div className="flex items-center justify-between text-[var(--chalk-dim)] mb-1.5">
                <span className="text-[11px] font-medium font-sans">Curated</span>
                <BookOpen className="w-3.5 h-3.5 text-[var(--chalk-faint)]" />
              </div>
              <div>
                <span className="text-xl font-bold font-mono text-[var(--chalk)]">{totalCount}</span>
                <p className="text-[10.5px] font-mono text-[var(--chalk-faint)] mt-0.5">Problems</p>
              </div>
            </div>

            {/* 2. Mastered */}
            <div className="p-3.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] flex flex-col justify-between hover:border-emerald-500/40 transition-all">
              <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 mb-1.5">
                <span className="text-[11px] font-medium font-sans">Mastered</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">{mastered}</span>
                <p className="text-[10.5px] font-mono text-[var(--chalk-faint)] mt-0.5">{masteryPercentage}% Solved</p>
              </div>
            </div>

            {/* 3. In Progress */}
            <div className="p-3.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] flex flex-col justify-between hover:border-amber-500/40 transition-all">
              <div className="flex items-center justify-between text-amber-600 dark:text-amber-400 mb-1.5">
                <span className="text-[11px] font-medium font-sans">Active</span>
                <Zap className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xl font-bold font-mono text-amber-600 dark:text-amber-400">{inProgress}</span>
                <p className="text-[10.5px] font-mono text-[var(--chalk-faint)] mt-0.5">In Progress</p>
              </div>
            </div>

            {/* 4. Interactive Visualizers Toggle Filter */}
            <button
              onClick={() => setOnlyWithViz(!onlyWithViz)}
              className={`p-3.5 rounded-xl flex flex-col justify-between transition-all cursor-pointer text-left ${
                onlyWithViz
                  ? 'bg-cyan-500/15 border-cyan-500/50 shadow-sm'
                  : 'bg-[var(--board-raised-2)] border border-[var(--line)] hover:border-cyan-500/40'
              }`}
              title="Filter problems with interactive visualizers"
            >
              <div className="flex items-center justify-between text-cyan-600 dark:text-cyan-400 mb-1.5">
                <span className="text-[11px] font-medium font-sans">Visualizers</span>
                <Layers className="w-3.5 h-3.5 text-cyan-500" />
              </div>
              <div>
                <span className="text-xl font-bold font-mono text-cyan-600 dark:text-cyan-300">{withViz}</span>
                <p className="text-[10.5px] font-mono text-[var(--chalk-faint)] mt-0.5">Ready to Run</p>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* ── Search, Controls & Filter Bar ── */}
      <div className="space-y-3.5">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5 flex-wrap">

          {/* Search Bar */}
          <div className="relative flex-1 min-w-[240px] max-w-lg">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--chalk-muted)] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, ID (#001), tag, pattern... (type / to focus)"
              className="w-full pl-9.5 pr-8 py-2 bg-[var(--board-raised)] border border-[var(--line)] hover:border-[var(--line-strong)] focus:border-indigo-500 rounded-lg text-xs text-[var(--chalk)] placeholder-[var(--chalk-dim)] focus:outline-none focus:ring-1 focus:ring-indigo-500/30 font-sans transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--chalk-muted)] hover:text-[var(--chalk)] transition-colors p-0.5"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
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
                className={`nav-pill text-xs h-8 px-2.5 ${
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
                className={`nav-pill text-xs h-8 px-2.5 ${
                  onlyDueForReview ? 'border-cyan-500/40 bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 font-semibold' : ''
                }`}
                title="Show problems due for spaced repetition review"
              >
                <Clock className="w-3.5 h-3.5 text-cyan-500" />
                <span className="hidden sm:inline">Review</span>
                {dueReviewCount > 0 && (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 font-bold">
                    {dueReviewCount}
                  </span>
                )}
              </button>

              {/* Import Button */}
              {onOpenImportModal && (
                <button
                  onClick={onOpenImportModal}
                  className="btn-secondary h-8 px-2.5 text-xs"
                  title="Import or create custom questions"
                >
                  <Upload className="w-3.5 h-3.5 text-[var(--chalk-dim)]" />
                  <span>Import</span>
                </button>
              )}

              {/* Reset Action */}
              {hasActiveFilter && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 px-2 py-1 h-8 rounded-lg text-rose-500 hover:bg-rose-500/10 border border-rose-500/25 text-xs font-mono transition-all cursor-pointer"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Category Tabs Ribbon ── */}
        <div className="flex items-center gap-4 border-b border-[var(--line)] overflow-x-auto scrollbar-none pb-0.5">
          {CATEGORIES.map((cat) => {
            const cleanTitle = cat.replace(/^\d+\.\s*/, '');
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`tab-btn text-xs ${isActive ? 'active' : ''}`}
              >
                <span>{cleanTitle}</span>
              </button>
            );
          })}
        </div>

        {/* ── Popular Tags Ribbon ── */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 text-[11px] font-mono font-medium shrink-0 transition-all"
            >
              #{selectedTag}
              <X className="w-3 h-3 ml-0.5" />
            </button>
          )}
          {POPULAR_TAGS.filter((t) => t !== selectedTag).map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className="px-2 py-0.5 rounded-md border border-[var(--line)] bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] text-[var(--chalk-dim)] hover:text-[var(--chalk)] text-[11px] font-mono transition-all shrink-0 whitespace-nowrap"
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
        </span>
        {hasActiveFilter && (
          <span className="text-indigo-600 dark:text-indigo-400 font-medium">Filters active</span>
        )}
      </div>

      {/* ── Problem Cards Grid ── */}
      {filtered.length > 0 ? (
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
      ) : (
        /* Empty State */
        <div className="p-14 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] flex flex-col items-center justify-center text-center space-y-3.5 shadow-sm">
          <AlgoVisionLogo size={44} />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-[var(--chalk)]">No problems match your filter</p>
            <p className="text-xs text-[var(--chalk-dim)] max-w-sm">
              Try adjusting your search terms or clearing active difficulty, category, or tag filters.
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
