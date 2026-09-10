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
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-8 space-y-6">

      {/* ── Header ── */}
      <div className="space-y-1">
        <h1 className="text-[22px] font-sans font-semibold text-[var(--chalk)] tracking-tight">
          DSA Problem Archive
        </h1>
        <p className="text-[13px] text-[var(--chalk-dim)]">
          Striver's A2Z DSA Sheet · {questions.length} curated problems
          {filtered.length !== questions.length && (
            <span className="text-[var(--amber)] ml-2">· {filtered.length} matching</span>
          )}
        </p>
      </div>

      {/* ── Search + filters row ── */}
      <div className="space-y-3">
        {/* Search */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative flex-1 min-w-[240px] max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--chalk-faint)] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problem title, #ID, category, tag…"
              className="w-full pl-9 pr-9 py-2 bg-[var(--board-raised)] border border-[var(--line)] rounded-[3px] text-[13px] text-[var(--chalk)] placeholder-[var(--chalk-faint)] focus:outline-none focus:border-[var(--amber)] font-mono transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--chalk-faint)] hover:text-[var(--chalk)] transition"
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
            <option value="All" className="bg-[#171f22]">All difficulties</option>
            <option value="Easy" className="bg-[#171f22]">Easy</option>
            <option value="Medium" className="bg-[#171f22]">Medium</option>
            <option value="Hard" className="bg-[#171f22]">Hard</option>
          </select>

          {/* Status */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="nav-pill cursor-pointer pr-6"
            style={{ appearance: 'none', backgroundImage: 'none' }}
          >
            <option value="All" className="bg-[#171f22]">All statuses</option>
            <option value="mastered" className="bg-[#171f22]">Mastered</option>
            <option value="in_progress" className="bg-[#171f22]">In progress</option>
            <option value="to_learn" className="bg-[#171f22]">To learn</option>
          </select>

          {/* Favorites toggle */}
          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`nav-pill gap-1.5 ${onlyFavorites ? 'border-[var(--amber)] bg-[var(--amber-dim)] text-[var(--amber)]' : ''}`}
          >
            <Star className={`w-3 h-3 ${onlyFavorites ? 'fill-[var(--amber)] text-[var(--amber)]' : ''}`} />
            Saved
          </button>

          {/* Due for Spaced Repetition Review */}
          <button
            onClick={() => setOnlyDueForReview(!onlyDueForReview)}
            className={`nav-pill gap-1.5 ${onlyDueForReview ? 'border-[var(--teal)] bg-[rgba(95,179,166,0.12)] text-[var(--teal)] font-medium' : ''}`}
            title="Show questions due for spaced repetition review today"
          >
            <Clock className="w-3 h-3 text-[var(--teal)]" />
            Due for Review
          </button>

          {/* Import Question Button */}
          {onOpenImportModal && (
            <button
              onClick={onOpenImportModal}
              className="chalk-btn ml-auto"
              title="Import or create DSA questions via JSON/CSV"
            >
              <Upload className="w-3.5 h-3.5 text-[var(--amber)]" />
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
              className="nav-pill text-[#e06c75] border-[rgba(224,108,117,0.3)] hover:bg-[rgba(224,108,117,0.1)]"
            >
              Reset
            </button>
          )}
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-5 border-b border-[var(--line)] overflow-x-auto scrollbar-none">
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
              className="flex items-center gap-1 px-2.5 py-0.5 rounded-[2px] bg-[var(--amber-dim)] text-[var(--amber)] border border-[var(--amber)] text-[11px] font-mono shrink-0 transition"
            >
              #{selectedTag}
              <X className="w-3 h-3 ml-0.5" />
            </button>
          )}
          {POPULAR_TAGS.filter((t) => t !== selectedTag).map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className="px-2.5 py-0.5 rounded-[2px] border border-[var(--line)] bg-[var(--board-raised-2)] hover:border-[var(--line-strong)] text-[var(--chalk-dim)] hover:text-[var(--chalk)] text-[11px] font-mono transition shrink-0 whitespace-nowrap"
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
          <Search className="w-8 h-8 text-[var(--chalk-faint)]" />
          <p className="text-[14px] font-medium text-[var(--chalk-dim)]">No problems found</p>
          <p className="text-[12px] text-[var(--chalk-faint)] max-w-xs">
            Try a different search term or clear your active filters.
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
              className="chalk-btn chalk-btn-amber mt-2"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
