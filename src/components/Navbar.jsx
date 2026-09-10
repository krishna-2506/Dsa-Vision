import React, { useState } from 'react';
import { Layers, Volume2, VolumeX, FileCode, Flame, Trophy, LogIn, ChevronLeft, ChevronRight, Shield } from 'lucide-react';
import { sound } from '../services/audio';

export default function Navbar({
  activeView,
  activeQuestion,
  onNavigateHome,
  stats,
  onOpenSkillModal,
  currentUser,
  userStats,
  onOpenAuthModal,
  onOpenDashboardModal,
  onOpenAdminModal,
  questions = [],
  onNavigateQuestion
}) {
  const [isMuted, setIsMuted] = useState(sound.isMuted());

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playStep(600);
  };

  const currentIdx = activeQuestion && questions
    ? questions.findIndex((q) => q.id === activeQuestion.id)
    : -1;
  const hasPrev = currentIdx > 0;
  const hasNext = currentIdx >= 0 && currentIdx < questions.length - 1;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.06] bg-[#08090d]/90 backdrop-blur-xl">
      <div className="max-w-[1280px] mx-auto px-6 h-12 flex items-center justify-between gap-4">

        {/* ── Left: Logo + studio breadcrumb ── */}
        <div className="flex items-center gap-4 min-w-0">
          {/* Logo */}
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 shrink-0 group"
            aria-label="Go to library"
          >
            <div className="w-6 h-6 rounded-md bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center group-hover:bg-indigo-500/25 transition">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <span className="font-mono font-bold text-[13px] text-white tracking-tight">
              AlgoVision
            </span>
          </button>

          {/* Studio breadcrumb — only in studio view */}
          {activeView === 'studio' && activeQuestion && (
            <div className="hidden md:flex items-center gap-2 min-w-0">
              <span className="text-white/20 text-sm font-light">/</span>
              <span className="text-[12px] font-mono text-slate-400 truncate max-w-[280px]">
                {(activeQuestion.display_id || (activeQuestion.leetcode_id ? `#${activeQuestion.leetcode_id}` : '')) && (
                  <span className="text-indigo-400 mr-1.5 font-semibold">
                    {activeQuestion.display_id || `#${activeQuestion.leetcode_id}`}
                  </span>
                )}
                {activeQuestion.title}
              </span>
              {/* Inline prev/next in breadcrumb */}
              {questions.length > 0 && (
                <div className="flex items-center border border-white/[0.08] rounded-md overflow-hidden shrink-0">
                  <button
                    onClick={() => hasPrev && onNavigateQuestion && onNavigateQuestion(questions[currentIdx - 1])}
                    disabled={!hasPrev}
                    className="p-1 text-slate-500 hover:text-white hover:bg-white/[0.06] disabled:opacity-25 transition"
                    title={hasPrev ? `← ${questions[currentIdx - 1]?.display_id || questions[currentIdx - 1]?.title}` : 'First problem'}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <div className="w-px h-4 bg-white/[0.08]" />
                  <button
                    onClick={() => hasNext && onNavigateQuestion && onNavigateQuestion(questions[currentIdx + 1])}
                    disabled={!hasNext}
                    className="p-1 text-slate-500 hover:text-white hover:bg-white/[0.06] disabled:opacity-25 transition"
                    title={hasNext ? `→ ${questions[currentIdx + 1]?.display_id || questions[currentIdx + 1]?.title}` : 'Last problem'}
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Library: problem count */}
          {activeView === 'library' && stats && (
            <span className="hidden sm:block text-[11px] font-mono text-slate-600">
              {stats.total || 369} problems
              {stats.mastered > 0 && (
                <span className="text-emerald-600 ml-2">· {stats.mastered} mastered</span>
              )}
            </span>
          )}
        </div>

        {/* ── Right: utility actions ── */}
        <div className="flex items-center gap-1.5 shrink-0">

          {/* Gemini Skill — only in library */}
          {activeView === 'library' && (
            <button
              onClick={onOpenSkillModal}
              className="nav-pill hidden sm:inline-flex"
              title="Export Gemini skill for generating visualizers"
            >
              <FileCode className="w-3 h-3 text-indigo-400" />
              <span>Gemini Skill</span>
            </button>
          )}

          {/* Admin Console button */}
          <button
            onClick={onOpenAdminModal}
            className="nav-pill text-indigo-300 border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20"
            title="Admin Console: Questions, Database, Visualizers & Reports"
          >
            <Shield className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Admin</span>
          </button>

          {/* Sound toggle — icon only */}
          <button
            onClick={handleToggleSound}
            className="nav-pill w-8 justify-center px-0"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted
              ? <VolumeX className="w-3.5 h-3.5 text-slate-600" />
              : <Volume2 className="w-3.5 h-3.5 text-slate-400" />
            }
          </button>

          {/* Divider */}
          <div className="w-px h-5 bg-white/[0.07] mx-1" />

          {/* User section */}
          {currentUser ? (
            <button
              onClick={onOpenDashboardModal}
              className="flex items-center gap-2 h-8 pl-2 pr-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07] transition"
              title="Your dashboard"
            >
              <span className="w-5 h-5 rounded bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-[11px] leading-none">
                {currentUser.avatar || '⚡'}
              </span>
              <span className="text-[12px] font-medium text-slate-300 max-w-[90px] truncate">
                {currentUser.username}
              </span>
              {/* XP / streak inline */}
              {userStats && (
                <span className="hidden lg:flex items-center gap-1 text-[11px] font-mono text-slate-500">
                  <Flame className="w-3 h-3 text-orange-500" />
                  {userStats.streak_days || 0}d
                </span>
              )}
            </button>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="btn-primary"
            >
              <LogIn className="w-3.5 h-3.5" />
              Sign in
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
