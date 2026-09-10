import React, { useState, useEffect } from 'react';
import {
  X,
  Flame,
  Trophy,
  Award,
  Sparkles,
  Layers,
  Users,
  CheckCircle2,
  Clock,
  LogOut,
  ChevronRight,
  UserCheck,
  TrendingUp,
  Share2,
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && currentUser) {
      loadStats();
      loadAllUsers();
      loadDueReviews();
    }
  }, [isOpen, currentUser]);

  const loadStats = async () => {
    if (!currentUser?.id) return;
    setLoading(true);
    const data = await api.getUserStats(currentUser.id);
    setStats(data);
    setLoading(false);
  };

  const loadDueReviews = async () => {
    if (!currentUser?.id) return;
    const due = await api.getDueReviews(currentUser.id);
    setDueReviews(due || []);
  };

  const handleQuickReview = async (questionId, confidence) => {
    await api.recordReview(currentUser?.id, questionId, confidence);
    sound?.playSuccess?.();
    loadDueReviews();
    loadStats();
  };

  const loadAllUsers = async () => {
    const list = await api.getAllUsers();
    setAllUsers(list || []);
    // Pre-select another user if available for comparison
    const other = list?.find(u => u.id !== currentUser?.id);
    if (other) {
      setComparisonUser(other);
      api.getUserStats(other.id).then(setComparisonStats);
    }
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0e111a] border border-white/10 rounded-2xl shadow-2xl p-6 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/30 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-2xl shadow-inner">
              {user.avatar || '⚡'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-mono font-bold text-white text-lg">
                  {user.display_name || user.username}
                </h2>
                <span className="text-[11px] font-mono text-slate-400">@{user.username}</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 uppercase tracking-wider">
                  Level {user.level}: {user.title || 'Novice Coder'}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  <Flame className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{user.streak || 1} Day Streak</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
              title="Logout session"
            >
              <LogOut className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-[#08090e] rounded-xl border border-white/5 my-4 font-mono text-xs">
          <button
            onClick={() => setTab('overview')}
            className={`flex items-center justify-center gap-1 py-1.5 rounded-lg transition cursor-pointer ${
              tab === 'overview'
                ? 'bg-indigo-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Progress</span>
          </button>
          <button
            onClick={() => setTab('revision')}
            className={`flex items-center justify-center gap-1 py-1.5 rounded-lg transition cursor-pointer relative ${
              tab === 'revision'
                ? 'bg-indigo-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Revision</span>
            {dueReviews.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse ml-0.5" />
            )}
          </button>
          <button
            onClick={() => setTab('contributions')}
            className={`flex items-center justify-center gap-1 py-1.5 rounded-lg transition cursor-pointer ${
              tab === 'contributions'
                ? 'bg-indigo-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Uploads ({stats?.contributionsCount || 0})</span>
          </button>
          <button
            onClick={() => setTab('comparison')}
            className={`flex items-center justify-center gap-1 py-1.5 rounded-lg transition cursor-pointer ${
              tab === 'comparison'
                ? 'bg-indigo-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Compare</span>
          </button>
        </div>

        {/* Tab 1: Overview & Progress */}
        {tab === 'overview' && (
          <div className="space-y-4 overflow-y-auto pr-1">
            {/* XP Level Bar */}
            <div className="bg-[#08090e] p-4 rounded-xl border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Experience Points</span>
                </span>
                <span className="text-white font-bold">
                  {user.xp || 0} / {user.nextXp || 200} XP ({xpPercent}%)
                </span>
              </div>
              <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
              <p className="text-[10px] font-mono text-slate-500">
                Earn +25 XP for Easy, +50 XP for Medium, +100 XP for Hard, and +150 XP for Visualizer uploads.
              </p>
            </div>

            {/* Solved metrics grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              <div className="bg-[#08090e] p-3.5 rounded-xl border border-white/5 text-center">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1">Total Solved</span>
                <span className="text-xl font-bold text-white">{stats?.solved || 0}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">/ {stats?.totalQuestions || 372}</span>
              </div>

              <div className="bg-[#08090e] p-3.5 rounded-xl border border-emerald-500/20 text-center">
                <span className="text-[10px] text-emerald-400 uppercase tracking-wider block mb-1">Easy</span>
                <span className="text-xl font-bold text-emerald-400">{stats?.breakdown?.easy || 0}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Solves</span>
              </div>

              <div className="bg-[#08090e] p-3.5 rounded-xl border border-amber-500/20 text-center">
                <span className="text-[10px] text-amber-400 uppercase tracking-wider block mb-1">Medium</span>
                <span className="text-xl font-bold text-amber-400">{stats?.breakdown?.medium || 0}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Solves</span>
              </div>

              <div className="bg-[#08090e] p-3.5 rounded-xl border border-rose-500/20 text-center">
                <span className="text-[10px] text-rose-400 uppercase tracking-wider block mb-1">Hard</span>
                <span className="text-xl font-bold text-rose-400">{stats?.breakdown?.hard || 0}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Solves</span>
              </div>
            </div>

            {/* Daily Streak Card */}
            <div className="bg-gradient-to-r from-amber-500/10 via-[#08090e] to-indigo-500/10 p-4 rounded-xl border border-amber-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                  <Flame className="w-6 h-6 text-amber-400 fill-amber-400 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-white">Daily Learning Streak</h4>
                  <p className="text-[11px] font-mono text-slate-400">
                    Solve or mark a question daily to keep your streak glowing!
                  </p>
                </div>
              </div>
              <div className="text-right font-mono">
                <span className="text-2xl font-bold text-amber-400">{user.streak || 1}</span>
                <span className="text-[10px] text-slate-500 block">DAYS ACTIVE</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Spaced Repetition Revision Queue */}
        {tab === 'revision' && (
          <div className="space-y-4 overflow-y-auto pr-1 flex-1">
            <div className="bg-[#08090e] p-4 rounded-xl border border-amber-500/20 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Spaced Repetition Review Queue
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold border border-amber-500/30">
                    Leitner System
                  </span>
                </div>
                <p className="text-[11px] font-mono text-slate-400 mt-1">
                  Problems are scheduled for active recall (1d → 3d → 7d → 14d → 30d → 60d) to maximize long-term retention.
                </p>
              </div>
              <div className="text-right font-mono">
                <span className="text-2xl font-bold text-amber-400">{dueReviews.length}</span>
                <span className="text-[10px] text-slate-500 block">DUE TODAY</span>
              </div>
            </div>

            {/* List of due questions */}
            {dueReviews.length > 0 ? (
              <div className="space-y-2">
                <div className="text-xs font-mono text-slate-400 flex items-center justify-between px-1">
                  <span>Questions Due for Review Today:</span>
                  <span className="text-[10px] text-amber-400">+20 XP per review</span>
                </div>

                {dueReviews.map((q) => (
                  <div
                    key={q.id}
                    className="p-3 bg-[#08090e] border border-white/10 hover:border-amber-500/40 rounded-xl flex items-center justify-between transition group"
                  >
                    <div className="flex-1 min-w-0 pr-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-white truncate group-hover:text-amber-300 transition">
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
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
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
                        className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-semibold transition flex items-center gap-1"
                        title="Open in Visualizer Studio"
                      >
                        Launch
                        <ChevronRight className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => handleQuickReview(q.id, 'mastered')}
                        className="px-2 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold transition"
                        title="Mastered (Extend interval 2.5x)"
                      >
                        ✓ Easy
                      </button>
                      <button
                        onClick={() => handleQuickReview(q.id, 'struggling')}
                        className="px-2 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-[10px] font-mono transition"
                        title="Struggled (Reset interval to 1d)"
                      >
                        ↺ Reset
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-[#08090e] rounded-xl border border-dashed border-white/10 text-slate-500 font-mono text-xs space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <p className="text-white font-semibold">All caught up on reviews for today!</p>
                <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                  When you solve problems and rate your confidence, they will automatically appear here based on optimal spaced repetition intervals.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Visualizer Contributions */}
        {tab === 'contributions' && (
          <div className="space-y-3 overflow-y-auto pr-1 flex-1">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
              <span>Your Uploaded Visualizers</span>
              <span className="text-indigo-400 font-bold">+150 XP per component</span>
            </div>

            {stats?.contributions && stats.contributions.length > 0 ? (
              <div className="space-y-2">
                {stats.contributions.map((c) => (
                  <div
                    key={c.id}
                    className="p-3 bg-[#08090e] border border-white/5 hover:border-indigo-500/30 rounded-xl flex items-center justify-between transition group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        {c.display_id && (
                          <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">
                            #{c.display_id}
                          </span>
                        )}
                        <h4 className="text-xs font-mono font-bold text-white group-hover:text-indigo-300 transition">
                          {c.question_title || c.component_key}
                        </h4>
                      </div>
                      <p className="text-[10px] font-mono text-slate-500 mt-1">
                        Mounted as <code className="text-slate-400">{c.component_key}.jsx</code> • {new Date(c.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onOpenQuestion && onOpenQuestion({ id: c.question_id, title: c.question_title });
                      }}
                      className="flex items-center gap-1 px-2.5 py-1 rounded bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs font-mono border border-indigo-500/30 transition cursor-pointer"
                    >
                      <span>Studio</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-[#08090e] border border-white/5 rounded-xl space-y-2 font-mono text-xs">
                <Layers className="w-8 h-8 text-slate-600 mx-auto" />
                <h4 className="font-bold text-white">No Visualizer Contributions Yet</h4>
                <p className="text-slate-500 max-w-sm mx-auto">
                  Ask Gemini for a visualizer in any question studio and drop the code to earn +150 XP and appear here!
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Friends & Rivals Comparison */}
        {tab === 'comparison' && (
          <div className="space-y-4 overflow-y-auto pr-1 flex-1">
            <div className="flex items-center justify-between gap-3">
              <label className="text-xs font-mono text-slate-400">Compare with Coder:</label>
              <select
                value={comparisonUser?.id || ''}
                onChange={(e) => handleSelectComparison(e.target.value)}
                className="px-3 py-1.5 bg-[#08090e] border border-white/10 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
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
                <div className="bg-[#08090e] border border-indigo-500/30 rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                    <span className="text-xl">{user.avatar}</span>
                    <div>
                      <h4 className="font-bold text-white text-sm">{user.display_name} (You)</h4>
                      <span className="text-[10px] text-indigo-400">Level {user.level}: {user.title}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-[11px]">
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-slate-400">Total Solved:</span>
                      <strong className="text-white">{stats?.solved || 0}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-slate-400">Streak:</span>
                      <strong className="text-amber-400">🔥 {user.streak || 1} Days</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-slate-400">Total XP:</span>
                      <strong className="text-indigo-400">{user.xp || 0} XP</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-slate-400">Contributions:</span>
                      <strong className="text-emerald-400">{stats?.contributionsCount || 0}</strong>
                    </div>
                  </div>
                </div>

                {/* Friend / Rival */}
                <div className="bg-[#08090e] border border-purple-500/30 rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                    <span className="text-xl">{comparisonUser.avatar}</span>
                    <div>
                      <h4 className="font-bold text-white text-sm">{comparisonUser.display_name}</h4>
                      <span className="text-[10px] text-purple-400">Level {comparisonUser.level}: {comparisonUser.title}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-[11px]">
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-slate-400">Total Solved:</span>
                      <strong className="text-white">{comparisonStats?.solved || 0}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-slate-400">Streak:</span>
                      <strong className="text-amber-400">🔥 {comparisonUser.streak || 1} Days</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-slate-400">Total XP:</span>
                      <strong className="text-purple-400">{comparisonUser.xp || 0} XP</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-slate-400">Contributions:</span>
                      <strong className="text-emerald-400">{comparisonStats?.contributionsCount || 0}</strong>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs font-mono text-slate-500 text-center py-6">
                Invite or register another coder profile to compare metrics side-by-side!
              </p>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between font-mono text-xs">
          <button
            onClick={() => {
              onClose();
              onOpenAuth && onOpenAuth();
            }}
            className="text-slate-400 hover:text-indigo-300 text-[11px] underline cursor-pointer"
          >
            Switch Account / Register New
          </button>
          <span className="text-[11px] text-slate-600">Local Auth Engine • Ready for Supabase</span>
        </div>
      </div>
    </div>
  );
}
