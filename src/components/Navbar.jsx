import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  FileCode,
  Flame,
  LogIn,
  ChevronLeft,
  ChevronRight,
  Shield,
  Search,
  Sun,
  Moon
} from 'lucide-react';
import { sound } from '../services/audio';
import AlgoVisionLogo from './AlgoVisionLogo';

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
  onNavigateQuestion,
  theme = 'dark',
  onToggleTheme
}) {
  const [isMuted, setIsMuted] = useState(sound.isMuted());

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playStep(640);
  };

  const currentIdx =
    activeQuestion && questions ? questions.findIndex((q) => q.id === activeQuestion.id) : -1;
  const hasPrev = currentIdx > 0;
  const hasNext = currentIdx >= 0 && currentIdx < questions.length - 1;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--line)] bg-[var(--board)]/90 backdrop-blur-xl transition-colors duration-200">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">

        {/* ── Left: Brand & Studio Breadcrumb ── */}
        <div className="flex items-center gap-4 min-w-0">
          {/* Logo & Brand */}
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 shrink-0 group cursor-pointer text-left focus:outline-none"
            aria-label="Go to AlgoVision Library"
          >
            <AlgoVisionLogo size={32} />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-sans font-bold text-[15px] text-[var(--chalk)] tracking-tight group-hover:text-indigo-500 transition-colors">
                  AlgoVision
                </span>
                <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded-md bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk-dim)] font-semibold tracking-wider uppercase">
                  PRO
                </span>
              </div>
            </div>
          </button>

          {/* Studio Breadcrumb */}
          {activeView === 'studio' && activeQuestion && (
            <div className="hidden md:flex items-center gap-2.5 min-w-0 pl-3 border-l border-[var(--line)]">
              <span className="text-[var(--chalk-faint)] text-xs">/</span>
              <div className="flex items-center gap-2 min-w-0">
                {(activeQuestion.display_id || activeQuestion.leetcode_id) && (
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-indigo-500/15 border border-indigo-500/30 text-indigo-500 dark:text-indigo-300 shrink-0">
                    {activeQuestion.display_id || `#${activeQuestion.leetcode_id}`}
                  </span>
                )}
                <span className="text-[13px] font-medium text-[var(--chalk)] truncate max-w-[280px]">
                  {activeQuestion.title}
                </span>
              </div>

              {/* Prev / Next Problem Switcher */}
              {questions.length > 0 && (
                <div className="flex items-center bg-[var(--board-raised-2)] border border-[var(--line)] rounded-lg overflow-hidden shrink-0 ml-1">
                  <button
                    onClick={() => hasPrev && onNavigateQuestion && onNavigateQuestion(questions[currentIdx - 1])}
                    disabled={!hasPrev}
                    className="p-1.5 text-[var(--chalk-dim)] hover:text-[var(--chalk)] hover:bg-[var(--board-hover)] disabled:opacity-25 transition-all cursor-pointer"
                    title={hasPrev ? `Previous: ${questions[currentIdx - 1]?.title}` : 'First problem'}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <div className="w-px h-4 bg-[var(--line)]" />
                  <button
                    onClick={() => hasNext && onNavigateQuestion && onNavigateQuestion(questions[currentIdx + 1])}
                    disabled={!hasNext}
                    className="p-1.5 text-[var(--chalk-dim)] hover:text-[var(--chalk)] hover:bg-[var(--board-hover)] disabled:opacity-25 transition-all cursor-pointer"
                    title={hasNext ? `Next: ${questions[currentIdx + 1]?.title}` : 'Last problem'}
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Library Stats Sub-label */}
          {activeView === 'library' && stats && (
            <div className="hidden lg:flex items-center gap-2 text-[12px] font-mono text-[var(--chalk-dim)] pl-3 border-l border-[var(--line)]">
              <span>{stats.total || questions.length} problems</span>
              {stats.mastered > 0 && (
                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                  · {stats.mastered} mastered
                </span>
              )}
            </div>
          )}
        </div>

        {/* ── Right: Utilities & User Status ── */}
        <div className="flex items-center gap-2 shrink-0">

          {/* Quick Search Shortcut Pill (Library mode) */}
          {activeView === 'library' && (
            <button
              onClick={() => {
                const searchEl = document.querySelector('input[type="text"]');
                if (searchEl) searchEl.focus();
              }}
              className="hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] border border-[var(--line)] text-[var(--chalk-dim)] hover:text-[var(--chalk)] transition-all text-xs font-mono cursor-pointer"
              title="Search problems (type / to focus)"
            >
              <Search className="w-3.5 h-3.5 text-[var(--chalk-muted)]" />
              <span>Search</span>
              <kbd className="text-[10px] px-1 py-0.2 rounded bg-[var(--board)] border border-[var(--line)] text-[var(--chalk-faint)] font-mono ml-0.5">⌘K</kbd>
            </button>
          )}

          {/* Gemini Skill Export */}
          {activeView === 'library' && (
            <button
              onClick={onOpenSkillModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] border border-[var(--line)] hover:border-indigo-500/40 text-[var(--chalk-dim)] hover:text-[var(--chalk)] transition-all text-xs font-medium cursor-pointer"
              title="Export visualizer generator skill for Gemini / AI agents"
            >
              <FileCode className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              <span>Agent Skill</span>
            </button>
          )}

          {/* Admin Console */}
          <button
            onClick={onOpenAdminModal}
            className="w-8.5 h-8.5 rounded-lg bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] border border-[var(--line)] flex items-center justify-center text-[var(--chalk-dim)] hover:text-[var(--chalk)] transition-all cursor-pointer"
            title="Database & Questions Admin"
          >
            <Shield className="w-4 h-4" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className="w-8.5 h-8.5 rounded-lg bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] border border-[var(--line)] flex items-center justify-center text-[var(--chalk-dim)] hover:text-[var(--chalk)] transition-all cursor-pointer"
            title={isMuted ? 'Turn Sound On' : 'Mute Sound'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-[var(--chalk-faint)]" />
            ) : (
              <Volume2 className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
            )}
          </button>

          {/* Theme Switcher Toggle (Light / Dark) */}
          <button
            onClick={onToggleTheme}
            className="w-8.5 h-8.5 rounded-lg bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] border border-[var(--line)] flex items-center justify-center transition-all cursor-pointer"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Divider */}
          <div className="w-px h-5 bg-[var(--line)] mx-0.5" />

          {/* User Account / Profile */}
          {currentUser ? (
            <button
              onClick={onOpenDashboardModal}
              className="flex items-center gap-2 h-8.5 pl-2 pr-3 rounded-lg bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] border border-[var(--line)] hover:border-indigo-500/30 transition-all cursor-pointer group"
              title="Open Personal Learning Dashboard"
            >
              <div className="w-5.5 h-5.5 rounded-md bg-gradient-to-tr from-amber-500/20 to-indigo-500/20 border border-amber-500/30 flex items-center justify-center text-[11px] text-amber-500 dark:text-amber-300 font-bold group-hover:scale-105 transition-transform">
                {currentUser.avatar || '⚡'}
              </div>
              <span className="text-[12.5px] font-sans font-semibold text-[var(--chalk)] max-w-[100px] truncate">
                {currentUser.username}
              </span>

              {/* Streak Badge */}
              {userStats && (
                <span className="hidden sm:flex items-center gap-1 text-[10.5px] font-mono font-medium px-2 py-0.2 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-600 dark:text-amber-300">
                  <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                  {userStats.streak_days || 0}d
                </span>
              )}
            </button>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="btn-primary h-8.5 px-3 text-xs font-semibold"
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
