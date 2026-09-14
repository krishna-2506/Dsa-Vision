import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  Flame,
  Sparkles,
  Layers,
  Users,
  CheckCircle2,
  Clock,
  LogOut,
  ChevronRight,
  BarChart3
} from 'lucide-react';
import { api } from '../services/api';
import { sound } from '../services/audio';

export default function UserDashboardModal({
  isOpen,
  onClose,
  currentUser,
  onLogout,
  onOpenAuth,
  onOpenQuestion
}) {
  const [tab, setTab] = useState('overview'); // 'overview' | 'revision' | 'contributions' | 'comparison'
  const [stats, setStats] = useState(null);
  const [dueReviews, setDueReviews] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [comparisonUser, setComparisonUser] = useState(null);
  const [comparisonStats, setComparisonStats] = useState(null);

  const loadStats = useCallback(async () => {
    if (!currentUser?.id) return;
    try {
      const data = await api.getUserStats(currentUser.id);
      setStats(data);
    } catch (e) {
      console.error('Failed to load user stats:', e);
    }
  }, [currentUser]);

  const loadDueReviews = useCallback(async () => {
    if (!currentUser?.id) return;
    const due = await api.getDueReviews(currentUser.id);
    setDueReviews(due || []);
  }, [currentUser]);

  const loadAllUsers = useCallback(async () => {
    const list = await api.getAllUsers();
    setAllUsers(list || []);
    // Pre-select another user if available for comparison
    const other = list?.find(u => u.id !== currentUser?.id);
    if (other) {
      setComparisonUser(other);
      api.getUserStats(other.id).then(setComparisonStats);
    }
  }, [currentUser]);

  useEffect(() => {
    if (isOpen && currentUser) {
      loadStats();
      loadAllUsers();
      loadDueReviews();
    }
  }, [isOpen, currentUser, loadStats, loadAllUsers, loadDueReviews]);

  const handleQuickReview = async (questionId, confidence) => {
    await api.recordReview(currentUser?.id, questionId, confidence);
    sound?.playSuccess?.();
    loadDueReviews();
    loadStats();
  };

  const handleSelectComparison = async (userId) => {
    const user = allUsers.find(u => u.id === userId);
    setComparisonUser(user);
    if (user) {
      const otherStats = await api.getUserStats(user.id);
      setComparisonStats(otherStats);
    }
  };

  if (!isOpen) return null;

  const user = stats?.user || currentUser;
  const xpPercent = Math.min(100, Math.round(((user.xp - (user.tierStart || 0)) / ((user.nextXp || 200) - (user.tierStart || 0))) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-[var(--board-raised)] border border-[var(--line-strong)] rounded-lg shadow-xl p-5 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top bar (GitHub Profile Header Style) */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-md bg-[var(--board-raised-2)] border border-[var(--line)] flex items-center justify-center text-xl font-mono">
              {user.avatar || '⚡'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-sans font-bold text-[var(--chalk)] text-base">
                  {user.display_name || user.username}
                </h2>
                <span className="text-xs font-mono text-[var(--chalk-faint)]">@{user.username}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-mono font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 uppercase tracking-wider">
                  Level {user.level}: {user.title || 'Developer'}
                </span>
                <span className="flex items-center gap-1 text-[10.5px] font-mono text-amber-600 dark:text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  <Flame className="w-3 h-3 fill-amber-400" />
                  <span>{user.streak || 1} Day Streak</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="p-1.5 rounded-md text-[var(--chalk-dim)] hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
              title="Logout session"
            >
              <LogOut className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-[var(--chalk-dim)] hover:text-[var(--chalk)] hover:bg-[var(--board-hover)] transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab switcher (Segmented Developer Rail) */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-[var(--board-raised-2)] rounded-md border border-[var(--line)] my-3 font-mono text-xs">
          <button
            onClick={() => setTab('overview')}
            className={`flex items-center justify-center gap-1.5 py-1.5 rounded transition cursor-pointer ${
              tab === 'overview'
                ? 'bg-[var(--board-raised)] text-[var(--chalk)] font-semibold border border-[var(--line)] shadow-xs'
                : 'text-[var(--chalk-dim)] hover:text-[var(--chalk)]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Progress</span>
          </button>
          <button
            onClick={() => setTab('revision')}
            className={`flex items-center justify-center gap-1.5 py-1.5 rounded transition cursor-pointer relative ${
              tab === 'revision'
                ? 'bg-[var(--board-raised)] text-[var(--chalk)] font-semibold border border-[var(--line)] shadow-xs'
                : 'text-[var(--chalk-dim)] hover:text-[var(--chalk)]'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Revision</span>
            {dueReviews.length > 0 && (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse ml-0.5" />
            )}
          </button>
          <button
            onClick={() => setTab('contributions')}
            className={`flex items-center justify-center gap-1.5 py-1.5 rounded transition cursor-pointer ${
              tab === 'contributions'
                ? 'bg-[var(--board-raised)] text-[var(--chalk)] font-semibold border border-[var(--line)] shadow-xs'
                : 'text-[var(--chalk-dim)] hover:text-[var(--chalk)]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Uploads ({stats?.contributionsCount || 0})</span>
          </button>
          <button
            onClick={() => setTab('comparison')}
            className={`flex items-center justify-center gap-1.5 py-1.5 rounded transition cursor-pointer ${
              tab === 'comparison'
                ? 'bg-[var(--board-raised)] text-[var(--chalk)] font-semibold border border-[var(--line)] shadow-xs'
                : 'text-[var(--chalk-dim)] hover:text-[var(--chalk)]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Compare</span>
          </button>
        </div>

        {/* Tab 1: Overview & Progress */}
        {tab === 'overview' && (
          <div className="space-y-3.5 overflow-y-auto pr-1">
            {/* XP Level Bar */}
            <div className="bg-[var(--board-raised-2)] p-3.5 rounded-md border border-[var(--line)] space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[var(--chalk-dim)] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                  <span>Experience Points</span>
                </span>
                <span className="text-[var(--chalk)] font-bold">
                  {user.xp || 0} / {user.nextXp || 200} XP ({xpPercent}%)
                </span>
              </div>
              <div className="w-full h-2 bg-[var(--board-raised)] rounded-full overflow-hidden border border-[var(--line)]">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
              <p className="text-[10px] font-mono text-[var(--chalk-faint)]">
                +25 XP for Easy · +50 XP for Medium · +100 XP for Hard · +150 XP for Visualizer uploads.
              </p>
            </div>

            {/* Solved metrics grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono">
              <div className="bg-[var(--board-raised-2)] p-3 rounded-md border border-[var(--line)] text-center">
                <span className="text-[10px] text-[var(--chalk-faint)] uppercase tracking-wider block mb-1">Total Solved</span>
                <span className="text-xl font-bold text-[var(--chalk)]">{stats?.solved || 0}</span>
                <span className="text-[10px] text-[var(--chalk-faint)] block mt-0.5">/ {stats?.totalQuestions || 372}</span>
              </div>

              <div className="bg-[var(--board-raised-2)] p-3 rounded-md border border-emerald-500/25 text-center">
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">Easy</span>
                <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{stats?.breakdown?.easy || 0}</span>
                <span className="text-[10px] text-[var(--chalk-faint)] block mt-0.5">Solves</span>
              </div>

              <div className="bg-[var(--board-raised-2)] p-3 rounded-md border border-amber-500/25 text-center">
                <span className="text-[10px] text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-1">Medium</span>
                <span className="text-xl font-bold text-amber-600 dark:text-amber-400">{stats?.breakdown?.medium || 0}</span>
                <span className="text-[10px] text-[var(--chalk-faint)] block mt-0.5">Solves</span>
              </div>

              <div className="bg-[var(--board-raised-2)] p-3 rounded-md border border-rose-500/25 text-center">
                <span className="text-[10px] text-rose-600 dark:text-rose-400 uppercase tracking-wider block mb-1">Hard</span>
                <span className="text-xl font-bold text-rose-600 dark:text-rose-400">{stats?.breakdown?.hard || 0}</span>
                <span className="text-[10px] text-[var(--chalk-faint)] block mt-0.5">Solves</span>
              </div>
            </div>

            {/* Daily Streak Card */}
            <div className="bg-[var(--board-raised-2)] p-3.5 rounded-md border border-[var(--line)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-amber-500 fill-amber-400" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-[var(--chalk)]">Learning Consistency</h4>
                  <p className="text-[11px] font-sans text-[var(--chalk-dim)]">
                    Solve or mark a question daily to preserve your streak.
                  </p>
                </div>
              </div>
              <div className="text-right font-mono">
                <span className="text-xl font-bold text-amber-600 dark:text-amber-400">{user.streak || 1}</span>
                <span className="text-[9.5px] text-[var(--chalk-faint)] block">DAYS ACTIVE</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Spaced Repetition Revision Queue */}
        {tab === 'revision' && (
          <div className="space-y-3.5 overflow-y-auto pr-1 flex-1">
            <div className="bg-[var(--board-raised-2)] p-3.5 rounded-md border border-[var(--line)] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-mono font-bold text-[var(--chalk)] uppercase tracking-wider">
                    Spaced Repetition Review Queue
                  </h3>
                  <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-300 text-[10px] font-mono font-semibold border border-amber-500/30">
                    Leitner System
                  </span>
                </div>
                <p className="text-[11px] font-sans text-[var(--chalk-dim)] mt-1">
                  Active recall intervals (1d → 3d → 7d → 14d → 30d) for long-term algorithmic retention.
                </p>
              </div>
              <div className="text-right font-mono">
                <span className="text-xl font-bold text-amber-600 dark:text-amber-400">{dueReviews.length}</span>
                <span className="text-[9.5px] text-[var(--chalk-faint)] block">DUE TODAY</span>
              </div>
            </div>

            {/* List of due questions */}
            {dueReviews.length > 0 ? (
              <div className="space-y-2">
                <div className="text-xs font-mono text-[var(--chalk-dim)] flex items-center justify-between px-1">
                  <span>Questions Scheduled for Today:</span>
                  <span className="text-[10px] text-amber-500">+20 XP per review</span>
                </div>

                {dueReviews.map((q) => (
                  <div
                    key={q.id}
                    className="p-3 bg-[var(--board-raised-2)] border border-[var(--line)] hover:border-amber-500/40 rounded-md flex items-center justify-between transition group"
                  >
                    <div className="flex-1 min-w-0 pr-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-[var(--chalk)] truncate group-hover:text-amber-400 transition">
                          {q.title}
                        </span>
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                            q.difficulty?.toLowerCase() === 'easy'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : q.difficulty?.toLowerCase() === 'hard'
                              ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          }`}
                        >
                          {q.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--chalk-faint)]">
                        <span>Topic: {q.category}</span>
                        <span>•</span>
                        <span>Interval: {q.review_interval_days || 1}d</span>
                        {q.last_reviewed_at && (
                          <>
                            <span>•</span>
                            <span>Last: {new Date(q.last_reviewed_at).toLocaleDateString()}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => {
                          if (onOpenQuestion) onOpenQuestion(q.id);
                          onClose();
                        }}
                        className="btn-secondary h-7 px-2 text-xs"
                        title="Open in Visualizer Studio"
                      >
                        Launch
                        <ChevronRight className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => handleQuickReview(q.id, 'mastered')}
                        className="px-2 py-1 rounded bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-semibold transition cursor-pointer"
                        title="Mastered (Extend interval 2.5x)"
                      >
                        ✓ Easy
                      </button>
                      <button
                        onClick={() => handleQuickReview(q.id, 'struggling')}
                        className="px-2 py-1 rounded bg-rose-500/15 hover:bg-rose-500/25 text-rose-600 dark:text-rose-300 border border-rose-500/30 text-[10px] font-mono transition cursor-pointer"
                        title="Struggled (Reset interval to 1d)"
                      >
                        ↺ Reset
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-[var(--board-raised-2)] rounded-md border border-dashed border-[var(--line)] text-[var(--chalk-faint)] font-mono text-xs space-y-1.5">
                <CheckCircle2 className="w-7 h-7 text-emerald-500 mx-auto" />
                <p className="text-[var(--chalk)] font-semibold">All caught up on reviews for today!</p>
                <p className="text-[11px] text-[var(--chalk-dim)] max-w-sm mx-auto">
                  When you solve problems and rate your confidence, spaced repetition scheduling will queue them here.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Visualizer Contributions */}
        {tab === 'contributions' && (
          <div className="space-y-3 overflow-y-auto pr-1 flex-1">
            <div className="flex items-center justify-between text-xs font-mono text-[var(--chalk-dim)] mb-1">
              <span>Your Uploaded Visualizers</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">+150 XP per component</span>
            </div>

            {stats?.contributions && stats.contributions.length > 0 ? (
              <div className="space-y-2">
                {stats.contributions.map((c) => (
                  <div
                    key={c.id}
                    className="p-3 bg-[var(--board-raised-2)] border border-[var(--line)] hover:border-indigo-500/40 rounded-md flex items-center justify-between transition group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        {c.display_id && (
                          <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">
                            #{c.display_id}
                          </span>
                        )}
                        <h4 className="text-xs font-mono font-bold text-[var(--chalk)] group-hover:text-indigo-400 transition">
                          {c.question_title || c.component_key}
                        </h4>
                      </div>
                      <p className="text-[10px] font-mono text-[var(--chalk-faint)] mt-1">
                        Mounted as <code className="text-[var(--chalk-dim)]">{c.component_key}.jsx</code> • {new Date(c.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        if (onOpenQuestion) {
                          onOpenQuestion({ id: c.question_id, title: c.question_title });
                        }
                      }}
                      className="btn-secondary h-7 px-2.5 text-xs"
                    >
                      <span>Studio</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-[var(--board-raised-2)] border border-[var(--line)] rounded-md space-y-1.5 font-mono text-xs">
                <Layers className="w-7 h-7 text-[var(--chalk-faint)] mx-auto opacity-50" />
                <h4 className="font-bold text-[var(--chalk)]">No Visualizer Contributions Yet</h4>
                <p className="text-[var(--chalk-dim)] max-w-sm mx-auto">
                  Ask Gemini for a visualizer in any question studio and drop the code to earn +150 XP!
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Friends & Rivals Comparison */}
        {tab === 'comparison' && (
          <div className="space-y-4 overflow-y-auto pr-1 flex-1">
            <div className="flex items-center justify-between gap-3">
              <label className="text-xs font-mono text-[var(--chalk-dim)]">Compare with Developer:</label>
              <select
                value={comparisonUser?.id || ''}
                onChange={(e) => handleSelectComparison(e.target.value)}
                className="px-2.5 py-1 bg-[var(--board-raised-2)] border border-[var(--line)] rounded-md text-xs font-mono text-[var(--chalk)] focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                {allUsers.filter(u => u.id !== currentUser?.id).map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.avatar} {u.display_name || u.username} (Level {u.level})
                  </option>
                ))}
              </select>
            </div>

            {comparisonUser && comparisonStats ? (
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                {/* You */}
                <div className="bg-[var(--board-raised-2)] border border-indigo-500/30 rounded-md p-3.5 space-y-2.5">
                  <div className="flex items-center gap-2 pb-2 border-b border-[var(--line)]">
                    <span className="text-lg">{user.avatar}</span>
                    <div>
                      <h4 className="font-bold text-[var(--chalk)] text-xs">{user.display_name} (You)</h4>
                      <span className="text-[10px] text-indigo-400">Level {user.level}: {user.title}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between py-0.5 border-b border-[var(--line)]">
                      <span className="text-[var(--chalk-dim)]">Total Solved:</span>
                      <strong className="text-[var(--chalk)]">{stats?.solved || 0}</strong>
                    </div>
                    <div className="flex justify-between py-0.5 border-b border-[var(--line)]">
                      <span className="text-[var(--chalk-dim)]">Streak:</span>
                      <strong className="text-amber-500 font-semibold">{user.streak || 1} Days</strong>
                    </div>
                    <div className="flex justify-between py-0.5 border-b border-[var(--line)]">
                      <span className="text-[var(--chalk-dim)]">Total XP:</span>
                      <strong className="text-indigo-400">{user.xp || 0} XP</strong>
                    </div>
                    <div className="flex justify-between py-0.5 border-b border-[var(--line)]">
                      <span className="text-[var(--chalk-dim)]">Contributions:</span>
                      <strong className="text-emerald-500">{stats?.contributionsCount || 0}</strong>
                    </div>
                  </div>
                </div>

                {/* Friend / Rival */}
                <div className="bg-[var(--board-raised-2)] border border-[var(--line)] rounded-md p-3.5 space-y-2.5">
                  <div className="flex items-center gap-2 pb-2 border-b border-[var(--line)]">
                    <span className="text-lg">{comparisonUser.avatar}</span>
                    <div>
                      <h4 className="font-bold text-[var(--chalk)] text-xs">{comparisonUser.display_name}</h4>
                      <span className="text-[10px] text-[var(--chalk-dim)]">Level {comparisonUser.level}: {comparisonUser.title}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between py-0.5 border-b border-[var(--line)]">
                      <span className="text-[var(--chalk-dim)]">Total Solved:</span>
                      <strong className="text-[var(--chalk)]">{comparisonStats?.solved || 0}</strong>
                    </div>
                    <div className="flex justify-between py-0.5 border-b border-[var(--line)]">
                      <span className="text-[var(--chalk-dim)]">Streak:</span>
                      <strong className="text-amber-500 font-semibold">{comparisonUser.streak || 1} Days</strong>
                    </div>
                    <div className="flex justify-between py-0.5 border-b border-[var(--line)]">
                      <span className="text-[var(--chalk-dim)]">Total XP:</span>
                      <strong className="text-[var(--chalk)]">{comparisonUser.xp || 0} XP</strong>
                    </div>
                    <div className="flex justify-between py-0.5 border-b border-[var(--line)]">
                      <span className="text-[var(--chalk-dim)]">Contributions:</span>
                      <strong className="text-emerald-500">{comparisonStats?.contributionsCount || 0}</strong>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs font-mono text-[var(--chalk-faint)] text-center py-6">
                Invite or register another coder profile to compare metrics side-by-side.
              </p>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-3 pt-2.5 border-t border-[var(--line)] flex items-center justify-between font-mono text-xs">
          <button
            onClick={() => {
              onClose();
              if (onOpenAuth) {
                onOpenAuth();
              }
            }}
            className="text-[var(--chalk-dim)] hover:text-indigo-400 text-[11px] underline cursor-pointer"
          >
            Switch Account / Register New
          </button>
          <span className="text-[10.5px] text-[var(--chalk-faint)]">Local SQLite Engine</span>
        </div>
      </div>
    </div>
  );
}
