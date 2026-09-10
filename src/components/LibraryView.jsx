import React, { useState, useMemo } from 'react';
import { Search, Star, X, Clock, Upload, Plus } from 'lucide-react';
import QuestionCard from './QuestionCard';
import { CATEGORIES } from '../services/db';

const POPULAR_TAGS = [
  'Two Pointers', 'Binary Search', 'Sliding Window', 'Prefix Sum',
  "Kadane's Algorithm", 'Dynamic Programming', 'Monotonic Stack',
  'Fast & Slow Pointers', 'Tree Traversal', 'BFS', 'DFS',
  'Topological Sort', 'Shortest Path', 'Disjoint Set Union',
  'Subsequences', 'Knapsack', 'Hash Map', 'Matrix', 'Bitmask',
  'Backtracking', 'Sorting'
];

export default function LibraryView({
  questions,
  onOpenQuestion,
  onToggleFavorite,
  onStatusChange,
  onOpenSkillModal,
  onOpenImportModal
}) {
  const [searchQuery, setSearchQuery]       = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag]       = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [onlyFavorites, setOnlyFavorites]   = useState(false);
  const [onlyDueForReview, setOnlyDueForReview] = useState(false);

  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  const filtered = useMemo(() => {
    return questions.filter((q) => {
      const qNum  = q.leetcode_id ? String(q.leetcode_id) : '';
      const qTags = Array.isArray(q.tags) ? q.tags : [];
      const query = searchQuery.trim().toLowerCase();

      const matchSearch =
        query === '' ||
        q.title.toLowerCase().includes(query) ||
        (q.display_id && q.display_id.toLowerCase().includes(query)) ||
        qNum.includes(query) ||
        q.description?.toLowerCase().includes(query) ||
        qTags.some((t) => t.toLowerCase().includes(query));

      const cleanCat  = selectedCategory.replace(/^\d+\.\s*/, '').toLowerCase();
      const cleanQCat = (q.category || '').replace(/^\d+\.\s*/, '').toLowerCase();
      const matchCat  =
        selectedCategory === 'All' ||
        q.category === selectedCategory ||
        cleanQCat === cleanCat;

      const matchTag  = !selectedTag || qTags.includes(selectedTag);
      const matchDiff = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
      const matchStat = selectedStatus === 'All' || q.status === selectedStatus;
      const matchFav  = !onlyFavorites || q.is_favorite;
      const matchDue  = !onlyDueForReview || (q.next_review_date && q.next_review_date <= todayStr);

      return matchSearch && matchCat && matchTag && matchDiff && matchStat && matchFav && matchDue;
    });
  }, [questions, searchQuery, selectedCategory, selectedTag, selectedDifficulty, selectedStatus, onlyFavorites, onlyDueForReview, todayStr]);

  const hasActiveFilter =
    selectedCategory !== 'All' ||
    selectedTag ||
    selectedDifficulty !== 'All' ||
    selectedStatus !== 'All' ||
    onlyFavorites ||
    onlyDueForReview ||
    searchQuery.trim() !== '';


  return (
    <div className="max-w-[1280px] mx-auto px-6 py-8 space-y-6">

      {/* ── Header ── */}
      <div className="space-y-1">
        <h1 className="text-[22px] font-mono font-bold text-white tracking-tight">
          Problems
        </h1>
        <p className="text-[13px] text-slate-500">
          Striver's A2Z DSA Sheet · {questions.length} problems
          {filtered.length !== questions.length && (
            <span className="text-indigo-400 ml-2">· {filtered.length} shown</span>
          )}
        </p>
      </div>

      {/* ── Search + filters row ── */}
      <div className="space-y-3">
        {/* Search */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, number, tag…"
              className="w-full pl-9 pr-9 py-2 bg-[#0d0f18] border border-white/[0.08] rounded-lg text-[13px] text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 font-sans transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Difficulty */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="nav-pill cursor-pointer pr-6"
            style={{ appearance: 'none', backgroundImage: 'none' }}
          >
            <option value="All">All difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Status */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="nav-pill cursor-pointer pr-6"
            style={{ appearance: 'none', backgroundImage: 'none' }}
          >
            <option value="All">All statuses</option>
            <option value="mastered">Mastered</option>
            <option value="in_progress">In progress</option>
            <option value="to_learn">To learn</option>
          </select>

          {/* Favorites toggle */}
          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`nav-pill gap-1.5 ${onlyFavorites ? 'border-amber-500/40 bg-amber-500/10 text-amber-300' : ''}`}
          >
            <Star className={`w-3 h-3 ${onlyFavorites ? 'fill-amber-400 text-amber-400' : ''}`} />
            Saved
          </button>

          {/* Due for Spaced Repetition Review */}
          <button
            onClick={() => setOnlyDueForReview(!onlyDueForReview)}
            className={`nav-pill gap-1.5 ${onlyDueForReview ? 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300 font-bold' : ''}`}
            title="Show questions due for spaced repetition review today"
          >
            <Clock className={`w-3 h-3 ${onlyDueForReview ? 'text-indigo-400' : ''}`} />
            Due for Review
          </button>

          {/* Import Question Button */}
          {onOpenImportModal && (
            <button
              onClick={onOpenImportModal}
              className="nav-pill gap-1.5 border-emerald-500/30 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-emerald-300 ml-auto"
              title="Import or create DSA questions via JSON/CSV"
            >
              <Upload className="w-3 h-3" />
              <span>Import Questions</span>
            </button>
          )}

          {/* Reset */}
          {hasActiveFilter && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedTag(null);
                setSelectedDifficulty('All');
                setSelectedStatus('All');
                setOnlyFavorites(false);
                setOnlyDueForReview(false);
              }}
              className="nav-pill text-rose-400 border-rose-500/20 hover:bg-rose-500/10"
            >
              Reset
            </button>
          )}
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-5 border-b border-white/[0.06] overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`tab-btn ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat.replace(/^\d+\.\s*/, '')}
            </button>
          ))}
        </div>

        {/* Tag ribbon */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 text-[11px] font-mono font-semibold shrink-0 transition hover:bg-indigo-600/30"
            >
              #{selectedTag}
              <X className="w-3 h-3 ml-0.5" />
            </button>
          )}
          {POPULAR_TAGS.filter((t) => t !== selectedTag).map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className="px-2.5 py-1 rounded-full border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] text-slate-500 hover:text-slate-300 text-[11px] font-mono transition shrink-0 whitespace-nowrap"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid ── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
        <div className="card flex flex-col items-center justify-center py-20 text-center space-y-3">
          <Search className="w-8 h-8 text-slate-700" />
          <p className="text-[14px] font-medium text-slate-400">Nothing matches</p>
          <p className="text-[12px] text-slate-600 max-w-xs">
            Try a different search term, category, or clear your active filters.
          </p>
          {hasActiveFilter && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedTag(null);
                setSelectedDifficulty('All');
                setSelectedStatus('All');
                setOnlyFavorites(false);
              }}
              className="btn-primary mt-2"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
