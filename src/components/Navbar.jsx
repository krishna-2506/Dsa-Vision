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
  Moon,
  User,
  Code2
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
  onNavigateSandbox,
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
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border-subtle)] bg-[#0a0907]/85 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-13 flex items-center justify-between gap-4">

        {/* ── Left: Brand & Studio Breadcrumb ── */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Logo & Brand */}
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 shrink-0 group cursor-pointer text-left focus:outline-none"
            aria-label="Go to AlgoVision Library"
          >
            <AlgoVisionLogo size={26} />
            <span className="font-sans font-bold text-[14.5px] text-[var(--text-primary)] tracking-tight group-hover:text-[var(--accent)] transition-colors">
              AlgoVision
            </span>
          </button>

          {/* Admin Breadcrumb */}
          {activeView === 'admin' && (
            <div className="hidden md:flex items-center gap-2 pl-3 border-l border-[var(--line)]">
              <span className="text-[var(--chalk-faint)] text-xs">/</span>
              <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400">
                Admin Console
              </span>
            </div>
          )}

          {/* Sandbox Breadcrumb */}
          {activeView === 'sandbox' && (
            <div className="hidden md:flex items-center gap-2 pl-3 border-l border-[var(--line)]">
              <span className="text-[var(--chalk-faint)] text-xs">/</span>
              <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-[var(--indigo)]/10 border border-[var(--indigo)]/20 text-[var(--indigo)]">
                Code-to-Visualizer Studio
              </span>
            </div>
          )}

          {/* Theory Breadcrumb */}
          {activeView === 'theory' && (
            <div className="hidden md:flex items-center gap-2 pl-3 border-l border-[var(--border-subtle)]">
              <span className="text-[var(--text-tertiary)] text-xs">/</span>
              <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-[rgba(212,160,60,0.1)] border border-[var(--border-accent)]/30 text-[var(--accent)]">
                Theory Hub
              </span>
            </div>
          )}

          {/* Article Breadcrumb */}
          {activeView === 'article' && activeQuestion && (
            <div className="hidden md:flex items-center gap-2 min-w-0 pl-3 border-l border-[var(--line)]">
              <span className="text-[var(--chalk-faint)] text-xs">/</span>
              <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/20 text-teal-400 shrink-0">
                Docs
              </span>
              <span className="text-[12.5px] font-sans font-medium text-[var(--chalk)] truncate max-w-[280px]">
                {activeQuestion.title}
              </span>
            </div>
          )}

          {/* Studio Breadcrumb */}
          {activeView === 'studio' && activeQuestion && (
            <div className="hidden md:flex items-center gap-2.5 min-w-0 pl-3 border-l border-[var(--line)]">
              <span className="text-[var(--chalk-faint)] text-xs">/</span>
              <div className="flex items-center gap-2 min-w-0">
                {(activeQuestion.display_id || activeQuestion.leetcode_id) && (
                  <span className="text-[11px] font-mono font-medium px-1.5 py-0.5 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--indigo)] shrink-0">
                    {activeQuestion.display_id || `#${activeQuestion.leetcode_id}`}
                  </span>
                )}
                <span className="text-[12.5px] font-sans font-medium text-[var(--chalk)] truncate max-w-[320px]">
                  {activeQuestion.title}
                </span>
              </div>

              {/* Prev / Next Problem Switcher */}
              {questions.length > 0 && (
                <div className="flex items-center bg-[var(--board-raised-2)] border border-[var(--line)] rounded overflow-hidden shrink-0 ml-1">
                  <button
                    onClick={() => hasPrev && onNavigateQuestion && onNavigateQuestion(questions[currentIdx - 1])}
                    disabled={!hasPrev}
                    className="p-1 text-[var(--chalk-dim)] hover:text-[var(--chalk)] hover:bg-[var(--board-hover)] disabled:opacity-25 transition-all cursor-pointer"
                    title={hasPrev ? `Previous: ${questions[currentIdx - 1]?.title}` : 'First problem'}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <div className="w-px h-3.5 bg-[var(--line)]" />
                  <button
                    onClick={() => hasNext && onNavigateQuestion && onNavigateQuestion(questions[currentIdx + 1])}
                    disabled={!hasNext}
                    className="p-1 text-[var(--chalk-dim)] hover:text-[var(--chalk)] hover:bg-[var(--board-hover)] disabled:opacity-25 transition-all cursor-pointer"
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
            <div className="hidden lg:flex items-center gap-2 text-[11.5px] font-mono text-[var(--chalk-dim)] pl-3 border-l border-[var(--line)]">
              <span>{stats.total || questions.length} problems</span>
              {stats.mastered > 0 && (
                <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                  · {stats.mastered} completed
                </span>
              )}
            </div>
          )}
        </div>

        {/* ── Right: Utilities & User Status ── */}
        <div className="flex items-center gap-1.5 shrink-0">

          {/* Quick Search Shortcut Pill (Library mode) */}
          {activeView === 'library' && (
            <button
              onClick={() => {
                const searchEl = document.querySelector('input[type="text"]');
                if (searchEl) searchEl.focus();
              }}
              className="hidden md:flex items-center gap-2 h-7.5 px-2.5 rounded bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] border border-[var(--line)] text-[var(--chalk-dim)] hover:text-[var(--chalk)] transition-all text-xs font-sans cursor-pointer"
              title="Search problems (type / or ⌘K to focus)"
            >
              <Search className="w-3 h-3 text-[var(--chalk-faint)]" />
              <span>Search</span>
              <kbd className="text-[9px] px-1 py-0.2 rounded bg-[var(--board)] border border-[var(--line)] text-[var(--chalk-faint)] font-mono ml-1">⌘K</kbd>
            </button>
          )}

          {/* Gemini Skill Export */}
          {activeView === 'library' && (
            <button
              onClick={onOpenSkillModal}
              className="hidden sm:inline-flex items-center gap-1.5 h-7.5 px-2.5 rounded bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] border border-[var(--line)] text-[var(--chalk-dim)] hover:text-[var(--chalk)] transition-all text-xs font-medium cursor-pointer"
              title="Export visualizer generator skill for Gemini / AI agents"
            >
              <FileCode className="w-3 h-3 text-[var(--indigo)]" />
              <span>Skill</span>
            </button>
          )}

          {/* Code Lab Workbench */}
          <button
            onClick={onNavigateSandbox}
            className={`flex items-center gap-1.5 h-7.5 px-2.5 rounded border transition-all cursor-pointer text-xs font-medium ${
              activeView === 'sandbox'
                ? 'bg-[var(--indigo)]/20 border-[var(--indigo)]/40 text-[var(--indigo)] font-semibold shadow-xs'
                : 'bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] border-[var(--line)] text-[var(--chalk-dim)] hover:text-[var(--chalk)]'
            }`}
            title="Open Code-to-Visualizer Studio (C++, Python, JS in-browser compiler)"
          >
            <Code2 className="w-3.5 h-3.5 text-[var(--indigo)]" />
            <span className="hidden sm:inline">Code Lab</span>
            <span className="text-[9px] font-mono uppercase px-1 rounded-xs bg-[var(--indigo)]/15 text-[var(--indigo)] font-bold">New</span>
          </button>

          {/* Admin Console */}
          <button
            onClick={onOpenAdminModal}
            className={`w-7.5 h-7.5 rounded border flex items-center justify-center transition-all cursor-pointer ${
              activeView === 'admin'
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-400 font-bold'
                : 'bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] border-[var(--line)] text-[var(--chalk-dim)] hover:text-[var(--chalk)]'
            }`}
            title="Database & Questions Admin"
          >
            <Shield className="w-3.5 h-3.5" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className="w-7.5 h-7.5 rounded bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] border border-[var(--line)] flex items-center justify-center text-[var(--chalk-dim)] hover:text-[var(--chalk)] transition-all cursor-pointer"
            title={isMuted ? 'Turn Sound On' : 'Mute Sound'}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-[var(--chalk-faint)]" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[var(--indigo)]" />
            )}
          </button>

          {/* Theme Switcher Toggle (Light / Dark) */}
          <button
            onClick={onToggleTheme}
            className="w-7.5 h-7.5 rounded bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] border border-[var(--line)] flex items-center justify-center transition-all cursor-pointer"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-indigo-600 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Divider */}
          <div className="w-px h-4 bg-[var(--line)] mx-1" />

          {/* User Account / Profile */}
          {currentUser ? (
            <button
              onClick={onOpenDashboardModal}
              className="flex items-center gap-2 h-7.5 px-2 rounded bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] border border-[var(--line)] hover:border-[var(--indigo)]/30 transition-all cursor-pointer group"
              title="Open Personal Learning Dashboard"
            >
              <div className="w-4.5 h-4.5 rounded bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-[10px] text-indigo-400 font-mono font-bold">
                {currentUser.username ? currentUser.username.charAt(0).toUpperCase() : <User className="w-3 h-3" />}
              </div>
              <span className="text-xs font-sans font-medium text-[var(--chalk)] max-w-[90px] truncate">
                {currentUser.username}
              </span>

              {/* Streak Badge */}
              {userStats && (
                <span className="hidden sm:flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <Flame className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                  {userStats.streak_days || 0}d
                </span>
              )}
            </button>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="btn-primary h-7.5 px-3 text-xs font-medium"
            >
              <LogIn className="w-3 h-3" />
              Sign in
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
