import React, { useState, useMemo } from 'react';
import { Search, Star, Layers, FileCode, CheckCircle2, Tag, X } from 'lucide-react';
import QuestionCard from './QuestionCard';
import { CATEGORIES } from '../services/db';

const POPULAR_TAGS = [
  'Two Pointers',
  'Binary Search',
  'Sliding Window',
  'Prefix Sum',
  "Kadane's Algorithm",
  'Dynamic Programming',
  'Monotonic Stack',
  'Fast & Slow Pointers',
  'Tree Traversal',
  'BFS',
  'DFS',
  'Topological Sort',
  'Shortest Path',
  'Disjoint Set Union',
  'Subsequences',
  'Knapsack',
  'Hash Map',
  'Matrix',
  'Bitmask',
  'Backtracking',
  'Sorting'
];

export default function LibraryView({
  questions,
  onOpenQuestion,
  onToggleFavorite,
  onStatusChange,
  onOpenSkillModal
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  // Filtering
  const filtered = useMemo(() => {
    return questions.filter((q) => {
      const qNum = q.leetcode_id ? String(q.leetcode_id) : '';
      const qTags = Array.isArray(q.tags) ? q.tags : [];

      // Search query matches title, display_id (e.g. Q-001), leetcode_id, description, or tags
      const query = searchQuery.trim().toLowerCase();
      const matchSearch =
        query === '' ||
        q.title.toLowerCase().includes(query) ||
        (q.display_id && q.display_id.toLowerCase().includes(query)) ||
        qNum.includes(query) ||
        q.description?.toLowerCase().includes(query) ||
        qTags.some((t) => t.toLowerCase().includes(query));

      // Category matching resilient to "1. Arrays" vs "Arrays"
      const cleanSelectedCat = selectedCategory.replace(/^\d+\.\s*/, '').toLowerCase();
      const cleanQCat = (q.category || '').replace(/^\d+\.\s*/, '').toLowerCase();
      const matchCat =
        selectedCategory === 'All' ||
        q.category === selectedCategory ||
        cleanQCat === cleanSelectedCat;

      // Tag filter match
      const matchTag = !selectedTag || qTags.includes(selectedTag);

      const matchDiff = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
      const matchStatus = selectedStatus === 'All' || q.status === selectedStatus;
      const matchFav = !onlyFavorites || q.is_favorite;

      return matchSearch && matchCat && matchTag && matchDiff && matchStatus && matchFav;
    });
  }, [questions, searchQuery, selectedCategory, selectedTag, selectedDifficulty, selectedStatus, onlyFavorites]);

  const featuredQuestion = filtered.find((q) => q.is_favorite) || filtered[0];
  const remainingQuestions = filtered.filter((q) => q.id !== featuredQuestion?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono text-indigo-400 font-semibold uppercase tracking-wider">
              Algorithm Catalog
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs font-mono text-slate-400">
              SQLite Backend
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
            Data Structures & Algorithms
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl font-sans">
            Interactive animated visualizers with multi-language code solutions and persistent engineering lab notes.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenSkillModal}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-medium transition"
          >
            <FileCode className="w-4 h-4 text-indigo-400" />
            <span>Gemini SKILL.md</span>
          </button>
        </div>
      </div>

      {/* Featured / Next Up Algorithm Card (Hierarchy Overhaul) */}
      {featuredQuestion && searchQuery.trim() === '' && selectedCategory === 'All' && !selectedTag && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="font-semibold uppercase text-indigo-400">FEATURED ALGORITHM</span>
            <span>Recommended for Next Practice</span>
          </div>
          <QuestionCard
            question={featuredQuestion}
            onOpen={onOpenQuestion}
            onToggleFavorite={onToggleFavorite}
            onStatusChange={onStatusChange}
            isFeatured={true}
            activeTag={selectedTag}
            onSelectTag={setSelectedTag}
          />
        </div>
      )}

      {/* Search, Categories & Tags Ribbon */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, tag (#Two Pointers), or algorithm..."
              className="w-full pl-9 pr-4 py-2 bg-[#0e111a] border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono transition"
            />
          </div>

          {/* Secondary filter chips */}
          <div className="flex items-center gap-2 flex-wrap font-mono text-xs">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-2.5 py-1.5 bg-[#0e111a] border border-white/10 rounded-lg text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-2.5 py-1.5 bg-[#0e111a] border border-white/10 rounded-lg text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Statuses</option>
              <option value="mastered">Mastered</option>
              <option value="in_progress">In Progress</option>
              <option value="to_learn">To Learn</option>
            </select>

            <button
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border transition ${
                onlyFavorites
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-[#0e111a] text-slate-400 border-white/10 hover:text-slate-200'
              }`}
            >
              <Star className={`w-3 h-3 ${onlyFavorites ? 'fill-amber-400' : ''}`} />
              <span>Favorites</span>
            </button>
          </div>
        </div>

        {/* Segmented Underline Tab Bar for Categories */}
        <div className="border-b border-white/5 flex items-center gap-6 overflow-x-auto scrollbar-none font-mono text-xs">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`py-2 border-b-2 transition whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'border-indigo-500 text-white font-bold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Algorithmic Tags Filter Ribbon */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1.5 text-[11px] font-mono">
          <div className="flex items-center gap-1 text-slate-500 mr-1 shrink-0">
            <Tag className="w-3 h-3 text-indigo-400" />
            <span className="uppercase text-[10px] tracking-wider font-semibold">Filter Tags:</span>
          </div>

          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-indigo-600 text-white font-bold border border-indigo-500 shadow-sm shrink-0 cursor-pointer"
              title="Clear active tag filter"
            >
              <span>#{selectedTag}</span>
              <X className="w-3 h-3 hover:text-indigo-200" />
            </button>
          )}

          {POPULAR_TAGS.filter((t) => t !== selectedTag).map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className="px-2.5 py-0.5 rounded border border-white/5 bg-white/[0.02] hover:bg-white/10 text-slate-400 hover:text-white transition shrink-0 whitespace-nowrap cursor-pointer"
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Active Tag Filter Status Banner */}
        {selectedTag && (
          <div className="flex items-center justify-between px-3.5 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono animate-in fade-in">
            <div className="flex items-center gap-2 text-indigo-300">
              <Tag className="w-3.5 h-3.5 text-indigo-400" />
              <span>Showing <strong>{filtered.length}</strong> algorithms tagged with <strong>#{selectedTag}</strong></span>
            </div>
            <button
              onClick={() => setSelectedTag(null)}
              className="text-[11px] text-slate-400 hover:text-white underline cursor-pointer"
            >
              Clear tag filter
            </button>
          </div>
        )}
      </div>

      {/* Grid of Questions */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(searchQuery.trim() !== '' || selectedCategory !== 'All' || selectedTag ? filtered : remainingQuestions).map((q) => (
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
        <div className="bg-[#0e111a] border border-white/5 rounded-xl p-12 text-center flex flex-col items-center justify-center space-y-3 font-mono text-xs">
          <Search className="w-6 h-6 text-slate-600" />
          <h3 className="font-bold text-white">No algorithms match your filter</h3>
          <p className="text-slate-400 max-w-sm">
            {selectedTag ? `No algorithms found with tag #${selectedTag} in this category.` : 'Adjust your search query or reset category/difficulty filters.'}
          </p>
          {(selectedTag || selectedCategory !== 'All' || searchQuery.trim() !== '') && (
            <button
              onClick={() => {
                setSelectedTag(null);
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs transition mt-2"
            >
              Reset All Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
