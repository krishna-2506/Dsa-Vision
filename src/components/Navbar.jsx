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
    <header className="sticky top-0 z-40 w-full border-b border-[var(--line)] bg-[#12181a]/95 backdrop-blur-md">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-12 flex items-center justify-between gap-4">

        {/* ── Left: Logo + studio breadcrumb ── */}
        <div className="flex items-center gap-4 min-w-0">
          {/* Logo */}
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 shrink-0 group cursor-pointer"
            aria-label="Go to library"
          >
            <div className="w-6 h-6 rounded-[3px] bg-[var(--board-raised-2)] border border-[var(--line)] flex items-center justify-center group-hover:border-[var(--amber)] transition">
              <Layers className="w-3.5 h-3.5 text-[var(--amber)]" />
            </div>
            <span className="font-sans font-semibold text-[14px] text-[var(--chalk)] tracking-tight">
              AlgoVision
            </span>
          </button>

          {/* Studio breadcrumb — only in studio view */}
          {activeView === 'studio' && activeQuestion && (
            <div className="hidden md:flex items-center gap-2 min-w-0">
              <span className="text-[var(--chalk-faint)] text-sm">/</span>
              <span className="text-[12px] font-mono text-[var(--chalk-dim)] truncate max-w-[280px]">
                {(activeQuestion.display_id || (activeQuestion.leetcode_id ? `#${activeQuestion.leetcode_id}` : '')) && (
                  <span className="text-[var(--amber)] mr-1.5 font-medium">
                    {activeQuestion.display_id || `#${activeQuestion.leetcode_id}`}
                  </span>
                )}
                {activeQuestion.title}
              </span>
              {/* Inline prev/next in breadcrumb */}
              {questions.length > 0 && (
                <div className="flex items-center border border-[var(--line)] rounded-[3px] overflow-hidden shrink-0">
                  <button
                    onClick={() => hasPrev && onNavigateQuestion && onNavigateQuestion(questions[currentIdx - 1])}
                    disabled={!hasPrev}
                    className="p-1 text-[var(--chalk-faint)] hover:text-[var(--chalk)] hover:bg-[var(--board-raised-2)] disabled:opacity-25 transition cursor-pointer"
                    title={hasPrev ? `← ${questions[currentIdx - 1]?.display_id || questions[currentIdx - 1]?.title}` : 'First problem'}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <div className="w-px h-4 bg-[var(--line)]" />
                  <button
                    onClick={() => hasNext && onNavigateQuestion && onNavigateQuestion(questions[currentIdx + 1])}
                    disabled={!hasNext}
                    className="p-1 text-[var(--chalk-faint)] hover:text-[var(--chalk)] hover:bg-[var(--board-raised-2)] disabled:opacity-25 transition cursor-pointer"
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
            <span className="hidden sm:block text-[11px] font-mono text-[var(--chalk-faint)]">
              {stats.total || 369} problems
              {stats.mastered > 0 && (
                <span className="text-[var(--easy)] ml-2">· {stats.mastered} mastered</span>
              )}
            </span>
          )}
        </div>

        {/* ── Right: utility actions ── */}
        <div className="flex items-center gap-2 shrink-0">

          {/* Gemini Skill — only in library */}
          {activeView === 'library' && (
            <button
              onClick={onOpenSkillModal}
              className="chalk-btn hidden sm:inline-flex"
              title="Export Gemini skill for generating visualizers"
            >
              <FileCode className="w-3 h-3 text-[var(--amber)]" />
              <span>Gemini Skill</span>
            </button>
          )}

          {/* Admin Console button */}
          <button
            onClick={onOpenAdminModal}
            className="chalk-btn chalk-btn-amber"
            title="Admin Console: Questions, Database, Visualizers & Reports"
          >
            <Shield className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Admin</span>
          </button>

          {/* Sound toggle — icon only */}
          <button
            onClick={handleToggleSound}
            className="chalk-btn w-8 justify-center px-0"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted
              ? <VolumeX className="w-3.5 h-3.5 text-[var(--chalk-faint)]" />
              : <Volume2 className="w-3.5 h-3.5 text-[var(--chalk-dim)]" />
            }
          </button>

          {/* Divider */}
          <div className="w-px h-5 bg-[var(--line)] mx-0.5" />

          {/* User section */}
          {currentUser ? (
            <button
              onClick={onOpenDashboardModal}
              className="flex items-center gap-2 h-8 pl-2 pr-3 rounded-[3px] bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] border border-[var(--line)] transition cursor-pointer"
              title="Your dashboard"
            >
              <span className="w-5 h-5 rounded-[2px] bg-[var(--amber-dim)] border border-[rgba(232,163,61,0.3)] flex items-center justify-center text-[11px] leading-none text-[var(--amber)]">
                {currentUser.avatar || '⚡'}
              </span>
              <span className="text-[12px] font-sans font-medium text-[var(--chalk)] max-w-[90px] truncate">
                {currentUser.username}
              </span>
              {/* XP / streak inline */}
              {userStats && (
                <span className="hidden lg:flex items-center gap-1 text-[11px] font-mono text-[var(--chalk-faint)]">
                  <Flame className="w-3 h-3 text-[var(--amber)]" />
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
