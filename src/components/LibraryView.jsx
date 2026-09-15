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

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-8 space-y-7">
      
      {/* ── 1. Page Header (Exact Match to Striver Sheet Reference) ── */}
      <section className="space-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#f2f3f5] font-sans">
              Striver's A2Z Sheet - Learn DSA from A to Z
            </h1>
            <p className="text-xs sm:text-[13px] text-[#8c909e] leading-relaxed">
              This course is made for people who want to learn DSA from A to Z for free in a well-organised and structured manner.{' '}
              <a
                href="https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#eab308] hover:underline font-medium inline-flex items-center gap-0.5"
              >
                Know more
              </a>
            </p>
          </div>

          {/* Top Right Header Action Buttons */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            {/* Reset Button */}
            <button
              onClick={handleResetProgress}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18191f] hover:bg-[#22242c] border border-[#272932] text-xs font-medium text-[#c5c8d6] hover:text-white transition-colors cursor-pointer"
              title="Reset all progress back to zero"
            >
              <span>Reset</span>
              <RotateCcw className="w-3 h-3 text-[#eab308]" />
            </button>

            {/* Import Button */}
            <button
              onClick={onOpenImportModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18191f] hover:bg-[#22242c] border border-[#272932] text-xs font-medium text-[#c5c8d6] hover:text-white transition-colors cursor-pointer"
              title="Import or Export Question Sheet Data"
            >
              <span>Import</span>
              <ClipboardCopy className="w-3 h-3 text-[#8c909e]" />
            </button>

            {/* Admin Center Button */}
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 text-xs font-semibold text-amber-400 transition-colors cursor-pointer"
                title="Open Admin Page (/admin)"
              >
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>Admin</span>
              </button>
            )}

            {/* Last Updated Badge */}
            <div className="px-3.5 py-1.5 rounded-lg bg-[#18191f] border border-[#272932] text-[11px] font-mono text-[#8c909e]">
              Last updated : <strong className="text-[#c5c8d6] font-medium">December 13, 2025</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Filter & Navigation Bar (Exact Match to Striver Sheet Reference) ── */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-wrap">
        
        {/* Left: [All Problems] and [Revision] Pills */}
        <div className="flex items-center gap-1 bg-[#15161c] p-1 rounded-xl border border-[#22242b] self-start">
          <button
            onClick={() => {
              sound.playStep(600);
              setActiveTab('all');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#22242e] text-white shadow-sm border border-[#2d303d]'
                : 'text-[#8c909e] hover:text-white'
            }`}
          >
            All Problems
          </button>

          <button
            onClick={() => {
              sound.playStep(600);
              setActiveTab('revision');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'revision'
                ? 'bg-[#22242e] text-white shadow-sm border border-[#2d303d]'
                : 'text-[#8c909e] hover:text-white'
            }`}
          >
            Revision
          </button>
        </div>

        {/* Right: Search, All Problems dropdown, Difficulty dropdown, Random Problem button */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#5b5e6e]" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problems..."
              className="w-48 sm:w-60 pl-8 pr-7 py-1.5 bg-[#15161c] border border-[#22242b] focus:border-[#383b47] rounded-xl text-xs text-[#f2f3f5] placeholder-[#5b5e6e] focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5b5e6e] hover:text-white p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* All Problems status dropdown */}
          <select
            value={problemStatusFilter}
            onChange={(e) => setProblemStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-[#15161c] border border-[#22242b] rounded-xl text-xs text-[#c5c8d6] focus:outline-none cursor-pointer"
          >
            <option value="all">All problems</option>
            <option value="unsolved">Unsolved</option>
            <option value="solved">Solved</option>
          </select>

          {/* Difficulty dropdown */}
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="px-3 py-1.5 bg-[#15161c] border border-[#22242b] rounded-xl text-xs text-[#c5c8d6] focus:outline-none cursor-pointer"
          >
            <option value="all">Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Random Problem button */}
          <button
            onClick={handlePickRandomProblem}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#15161c] hover:bg-[#20222a] border border-[#22242b] text-xs font-medium text-[#c5c8d6] hover:text-white transition-colors cursor-pointer"
            title="Pick a random problem from the sheet"
          >
            <Shuffle className="w-3.5 h-3.5 text-[#8c909e]" />
            <span>Random Problem</span>
          </button>

          {/* View mode toggle (Accordion vs Cards) */}
          <div className="flex items-center gap-1 bg-[#15161c] p-1 rounded-xl border border-[#22242b]">
            <button
              onClick={() => setViewMode('accordion')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'accordion' ? 'bg-[#22242e] text-white' : 'text-[#8c909e] hover:text-white'
              }`}
              title="Sheet Accordion View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'cards' ? 'bg-[#22242e] text-white' : 'text-[#8c909e] hover:text-white'
              }`}
              title="Card Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── 3. Overall Progress Telemetry Card (Exact Match to Striver Screenshot) ── */}
      <section className="p-5 sm:p-6 rounded-2xl bg-[#15161c] border border-[#22242b] flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
        
        {/* Left: Circular Progress Ring & Title */}
        <div className="flex items-center gap-4">
          {/* Circular SVG Meter */}
          <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
              {/* Background ring */}
              <circle
                cx="24"
                cy="24"
                r="20"
                className="stroke-[#22242e]"
                strokeWidth="4"
                fill="none"
              />
              {/* Progress ring */}
              <circle
                cx="24"
                cy="24"
                r="20"
                className="stroke-emerald-500 transition-all duration-700 ease-out"
                strokeWidth="4"
                strokeDasharray={125.6}
                strokeDashoffset={125.6 - (125.6 * overallProgressPct) / 100}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <span className="absolute text-xs font-mono font-bold text-white">
              {overallProgressPct}%
            </span>
          </div>

          <div>
            <div className="text-sm font-semibold text-white">Overall Progress</div>
            <div className="text-base sm:text-lg font-mono font-bold text-[#c5c8d6] tracking-tight">
              <strong className="text-white">{masteredCount}</strong> / {totalCount}
            </div>
          </div>
        </div>

        {/* Right: Difficulty Filter Buttons (Easy green, Medium yellow, Hard red) */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-xs font-mono">
          {/* Easy Filter Button */}
          <button
            onClick={() => {
              sound?.playStep?.(580);
              setDifficultyFilter((prev) => (prev.toLowerCase() === 'easy' ? 'all' : 'Easy'));
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
              difficultyFilter.toLowerCase() === 'easy'
                ? 'bg-emerald-500/15 border-emerald-500/50 text-white shadow-sm ring-1 ring-emerald-500/40'
                : 'bg-[#181920] hover:bg-[#20222a] border-[#272933] text-[#8c909e] hover:text-[#c5c8d6]'
            }`}
            title="Filter to show only Easy problems"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
            <span>Easy</span>
            <span className="font-bold text-[#c5c8d6]">
              {easyMastered} <span className="text-[#5b5e6e] font-normal">/{easyTotal}</span>
            </span>
          </button>

          {/* Medium Filter Button */}
          <button
            onClick={() => {
              sound?.playStep?.(580);
              setDifficultyFilter((prev) => (prev.toLowerCase() === 'medium' ? 'all' : 'Medium'));
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
              difficultyFilter.toLowerCase() === 'medium'
                ? 'bg-amber-500/15 border-amber-500/50 text-white shadow-sm ring-1 ring-amber-500/40'
                : 'bg-[#181920] hover:bg-[#20222a] border-[#272933] text-[#8c909e] hover:text-[#c5c8d6]'
            }`}
            title="Filter to show only Medium problems"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#eab308] shrink-0" />
            <span>Medium</span>
            <span className="font-bold text-[#c5c8d6]">
              {mediumMastered} <span className="text-[#5b5e6e] font-normal">/{mediumTotal}</span>
            </span>
          </button>

          {/* Hard Filter Button */}
          <button
            onClick={() => {
              sound?.playStep?.(580);
              setDifficultyFilter((prev) => (prev.toLowerCase() === 'hard' ? 'all' : 'Hard'));
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
              difficultyFilter.toLowerCase() === 'hard'
                ? 'bg-rose-500/15 border-rose-500/50 text-white shadow-sm ring-1 ring-rose-500/40'
                : 'bg-[#181920] hover:bg-[#20222a] border-[#272933] text-[#8c909e] hover:text-[#c5c8d6]'
            }`}
            title="Filter to show only Hard problems"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
            <span>Hard</span>
            <span className="font-bold text-[#c5c8d6]">
              {hardMastered} <span className="text-[#5b5e6e] font-normal">/{hardTotal}</span>
            </span>
          </button>

          {/* Clear Difficulty Filter if active */}
          {difficultyFilter !== 'all' && (
            <button
              onClick={() => {
                sound?.playStep?.(520);
                setDifficultyFilter('all');
              }}
              className="text-[11px] font-mono px-2 py-1 rounded-lg bg-[#22242d] hover:bg-[#2d303c] text-[#8c909e] hover:text-white transition-colors cursor-pointer"
            >
              Reset filter
            </button>
          )}
        </div>
      </section>

      {/* ── 4. Main Content: 18-Step Collapsible Accordion or Card Grid ── */}
      {viewMode === 'accordion' ? (
        <section className="space-y-2.5">
          {hierarchicalSteps.map((step) => {
            const isOpen = openSteps.has(step.step_no);
            const stepFraction = `${step.mastered} / ${step.total}`;
            const stepPct = Math.round((step.mastered / Math.max(step.total, 1)) * 100);
            const isCompleted = step.total > 0 && step.mastered === step.total;

            return (
              <div
                key={step.step_no}
                className="rounded-2xl bg-[#14151b] border border-[#20222a] overflow-hidden transition-all duration-150"
              >
                {/* ── Step Header Row (Exact Style to Reference Image) ── */}
                <div
                  onClick={() => toggleStep(step.step_no)}
                  className="px-5 py-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#181921] transition-colors select-none"
                >
                  {/* Left: Chevron & Step Title */}
                  <div className="flex items-center gap-3.5 min-w-0">
                    <ChevronRight
                      className={`w-4 h-4 text-[#8c909e] transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-90' : ''
                      }`}
                    />
                    <h3 className="text-sm font-semibold text-white truncate">
                      {step.title}
                    </h3>
                  </div>

                  {/* Right: Progress Track Bar & Count Fraction */}
                  <div className="flex items-center gap-4 shrink-0">
                    {/* Clean Dark Progress Bar */}
                    <div className="w-24 sm:w-36 h-1.5 rounded-full bg-[#20222b] overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isCompleted ? 'bg-emerald-500' : 'bg-[#3b82f6]'
                        }`}
                        style={{ width: `${stepPct}%` }}
                      />
                    </div>

                    {/* Fraction (e.g. 0 / 54) */}
                    <span className="text-xs font-mono text-[#8c909e] w-14 text-right">
                      {stepFraction}
                    </span>
                  </div>
                </div>

                {/* ── Step Content (Subcategories & Problems) ── */}
                {isOpen && (
                  <div className="border-t border-[#1e2028] bg-[#0f1015] p-3 sm:p-5 space-y-4">
                    {Array.from(step.subcategories.values()).map((sub, sIdx) => {
                      const subKey = `${step.step_no}_${sub.substep_name}`;
                      const isSubOpen = !openSubcategories.has(subKey); // open by default

                      return (
                        <div
                          key={sIdx}
                          className="rounded-xl bg-[#13141a] border border-[#1e2027] overflow-hidden"
                        >
                          {/* Subcategory Header */}
                          <div
                            onClick={() => toggleSubcategory(subKey)}
                            className="px-4 py-2.5 flex items-center justify-between gap-2 cursor-pointer hover:bg-[#181922] transition-colors select-none bg-[#16171e]"
                          >
                            <div className="flex items-center gap-2">
                              <ChevronDown
                                className={`w-3.5 h-3.5 text-[#5b5e6e] transition-transform duration-150 ${
                                  isSubOpen ? '' : '-rotate-90'
                                }`}
                              />
                              <span className="text-xs font-semibold text-[#d4d6e2]">
                                {sub.substep_name}
                              </span>
                            </div>
                            <span className="text-[11px] font-mono text-[#8c909e]">
                              {sub.mastered} / {sub.total}
                            </span>
                          </div>

                          {/* Problem Rows Table */}
                          {isSubOpen && (
                            <div className="divide-y divide-[#1b1c24]">
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
                                    className="px-4 py-3 flex items-center justify-between gap-3 hover:bg-[#161720] transition-colors group"
                                  >
                                    {/* Left: Checkbox, Star & Title */}
                                    <div className="flex items-center gap-3 min-w-0 flex-1">
                                      {/* Checkbox */}
                                      <button
                                        onClick={() => {
                                          sound.playStep(640);
                                          onStatusChange(q.id, isSolved ? 'to_learn' : 'mastered');
                                        }}
                                        className={`w-4.5 h-4.5 rounded flex items-center justify-center transition-all cursor-pointer shrink-0 border ${
                                          isSolved
                                            ? 'bg-emerald-600 border-emerald-500 text-white'
                                            : 'border-[#333644] hover:border-[#5b5e6e] bg-[#1a1b23]'
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
                                        className={`p-1 rounded transition-colors cursor-pointer shrink-0 ${
                                          q.is_favorite
                                            ? 'text-amber-400'
                                            : 'text-[#383a48] hover:text-[#8c909e]'
                                        }`}
                                        title={q.is_favorite ? 'Bookmarked' : 'Add to bookmarks'}
                                      >
                                        <Star
                                          className={`w-3.5 h-3.5 ${
                                            q.is_favorite ? 'fill-amber-400' : ''
                                          }`}
                                        />
                                      </button>

                                      {/* Problem Title (Opens Article Hub by default) */}
                                      <span
                                        onClick={() => {
                                          sound.playStep(520);
                                          if (onOpenArticle) onOpenArticle(q);
                                          else onOpenQuestion(q);
                                        }}
                                        className={`text-xs sm:text-[13px] font-medium transition-colors cursor-pointer truncate ${
                                          isSolved
                                            ? 'text-[#6e7282] line-through decoration-[#404352]'
                                            : 'text-[#f0f1f4] hover:text-indigo-400'
                                        }`}
                                      >
                                        {q.title}
                                      </span>
                                    </div>

                                    {/* Right: Actions & Resource Badges */}
                                    <div className="flex items-center gap-2 shrink-0">
                                      
                                      {/* Article Button (Opens Article Hub) */}
                                      <button
                                        onClick={() => {
                                          sound.playStep(520);
                                          if (onOpenArticle) onOpenArticle(q);
                                          else onOpenQuestion(q);
                                        }}
                                        className="flex items-center gap-1 px-2 py-1 rounded bg-[#181922] hover:bg-[#20222d] border border-[#272935] text-[11px] text-teal-400/90 hover:text-teal-300 transition-colors cursor-pointer"
                                        title="Open Tutorial & Article Hub"
                                      >
                                        <BookOpen className="w-3 h-3 text-teal-400" />
                                        <span className="hidden md:inline">Article</span>
                                      </button>

                                      {/* Multiple Videos Button with Popover Menu */}
                                      {hasVideos && (
                                        <div className="relative" onClick={(e) => e.stopPropagation()}>
                                          <button
                                            onClick={() => setVideoMenuOpenId(isVideoMenuOpen ? null : q.id)}
                                            className="flex items-center gap-1 px-2 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/25 text-[11px] text-rose-400 transition-colors cursor-pointer"
                                            title="View video solutions"
                                          >
                                            <Play className="w-3 h-3 fill-current" />
                                            <span className="hidden md:inline">
                                              {videoList.length > 1 ? `${videoList.length} Videos` : 'Video'}
                                            </span>
                                          </button>

                                          {/* Popover Menu for Videos */}
                                          {isVideoMenuOpen && (
                                            <div className="absolute right-0 bottom-full mb-1.5 w-64 rounded-xl bg-[#16171f] border border-[#292c3a] shadow-2xl p-2 z-50 text-xs font-sans space-y-1">
                                              <div className="text-[10px] font-mono uppercase text-[#5b5e6e] px-2 py-1">
                                                Select Tutorial ({videoList.length})
                                              </div>
                                              {videoList.map((vid, vIdx) => (
                                                <button
                                                  key={vIdx}
                                                  onClick={() => {
                                                    setVideoMenuOpenId(null);
                                                    if (onOpenArticle) onOpenArticle(q);
                                                  }}
                                                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-[#20222d] text-left text-white transition-colors cursor-pointer"
                                                >
                                                  <div className="flex items-center gap-2 truncate">
                                                    <YoutubeIcon className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                                                    <span className="truncate">{vid.channel || vid.title || `Video ${vIdx + 1}`}</span>
                                                  </div>
                                                  <span className="text-[10px] text-indigo-400 shrink-0">Study →</span>
                                                </button>
                                              ))}
                                            </div>
                                          )}
                                        </div>
                                      )}

                                      {/* Interactive Visualizer Badge / Launch */}
                                      {hasVis && (
                                        <button
                                          onClick={() => {
                                            sound?.playSuccess?.();
                                            onOpenQuestion(q);
                                          }}
                                          className="flex items-center gap-1 px-2 py-1 rounded bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/25 text-[11px] text-indigo-400 transition-colors cursor-pointer"
                                          title="Launch Interactive Visualizer"
                                        >
                                          <Layers className="w-3 h-3" />
                                          <span className="hidden lg:inline">Visualize</span>
                                        </button>
                                      )}

                                      {/* LeetCode practice link */}
                                      {q.leetcode_url && (
                                        <a
                                          href={q.leetcode_url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="p-1 text-[#5b5e6e] hover:text-white transition-colors"
                                          title="Open LeetCode problem"
                                        >
                                          <ExternalLink className="w-3 h-3" />
                                        </a>
                                      )}

                                      {/* Difficulty Pill */}
                                      <span
                                        className={`px-2 py-0.5 rounded-md text-[10.5px] font-medium border ${diffCfg.badge}`}
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
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
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
        <div className="p-12 rounded-2xl bg-[#15161c] border border-[#22242b] text-center space-y-3">
          <BookOpen className="w-8 h-8 text-[#5b5e6e] mx-auto" />
          <h3 className="text-sm font-semibold text-white">No problems found</h3>
          <p className="text-xs text-[#8c909e]">Try adjusting your search terms or filter selection.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveTab('all');
              setProblemStatusFilter('all');
              setDifficultyFilter('all');
            }}
            className="btn-primary text-xs cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
