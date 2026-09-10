import React, { useState } from 'react';
import { Layers, ArrowLeft, Volume2, VolumeX, FileCode, Flame, Trophy, User, LogIn, ChevronLeft, ChevronRight } from 'lucide-react';
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
  questions = [],
  onNavigateQuestion
}) {
  const [isMuted, setIsMuted] = useState(sound.isMuted());

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playStep(600);
  };

  const currentIdx = activeQuestion && questions ? questions.findIndex((q) => q.id === activeQuestion.id) : -1;
  const hasPrev = currentIdx > 0;
  const hasNext = currentIdx >= 0 && currentIdx < questions.length - 1;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.07] bg-[#090a0f]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Left: Brand / Breadcrumbs */}
        <div className="flex items-center gap-3">
          {activeView === 'studio' && (
            <button
              onClick={onNavigateHome}
              className="h-8 w-8 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 border border-white/5 transition"
              title="Return to library"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          <div
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div className="w-7 h-7 rounded bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
              <Layers className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-sm text-white">
                AlgoVision
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-slate-400 border border-white/10">
                PRO
              </span>
            </div>
          </div>

          {activeView === 'studio' && activeQuestion && (
            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-400 pl-3 border-l border-white/10">
              <span className="text-slate-600">/</span>
              <span className="text-slate-200 truncate max-w-xs font-medium">
                #{activeQuestion.display_id || activeQuestion.leetcode_id || 'DSA'} - {questionShort(activeQuestion.title)}
              </span>

              {questions && questions.length > 0 && (
                <div className="flex items-center gap-0.5 ml-1 border border-white/10 rounded-md p-0.5 bg-white/[0.02]">
                  <button
                    onClick={() => hasPrev && onNavigateQuestion && onNavigateQuestion(questions[currentIdx - 1])}
                    disabled={!hasPrev}
                    className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-25 disabled:hover:bg-transparent transition"
                    title={hasPrev ? `Previous: #${questions[currentIdx - 1].display_id}` : 'First problem'}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => hasNext && onNavigateQuestion && onNavigateQuestion(questions[currentIdx + 1])}
                    disabled={!hasNext}
                    className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-25 disabled:hover:bg-transparent transition"
                    title={hasNext ? `Next: #${questions[currentIdx + 1].display_id}` : 'Last problem'}
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Actions Group (Uniform height & styling) */}
        <div className="flex items-center gap-2">
          {/* SQLite Status Dot */}
          <div className="hidden lg:flex items-center gap-1.5 h-8 px-2.5 rounded bg-white/[0.03] border border-white/[0.06] text-[11px] font-mono text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>node:sqlite</span>
          </div>

          {/* Sound Toggle Button */}
          <button
            onClick={handleToggleSound}
            className="flex items-center gap-1.5 h-8 px-2.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-mono transition"
            title={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-500" /> : <Volume2 className="w-3.5 h-3.5 text-indigo-400" />}
            <span className="hidden sm:inline">{isMuted ? 'Muted' : 'Audio'}</span>
          </button>

          {/* Gemini Skill Button */}
          <button
            onClick={onOpenSkillModal}
            className="hidden sm:flex items-center gap-1.5 h-8 px-3 rounded bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-medium transition"
          >
            <FileCode className="w-3.5 h-3.5 text-indigo-400" />
            <span>Gemini Skill</span>
          </button>

          {/* User Account / Gamification Section */}
          {currentUser ? (
            <div className="flex items-center gap-2 pl-1 sm:pl-2 sm:border-l sm:border-white/10">
              {/* Daily Streak Flame */}
              <div
                className="flex items-center gap-1 h-8 px-2.5 rounded bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/25 text-amber-300 text-xs font-mono font-semibold"
                title={`${userStats?.streak_days || 0} Day Coding Streak`}
              >
                <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse fill-orange-400" />
                <span>{userStats?.streak_days || 0}d</span>
              </div>

              {/* Level Badge */}
              <div
                className="hidden sm:flex items-center gap-1 h-8 px-2 rounded bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-[11px] font-mono font-semibold"
                title={`Level ${userStats?.level || 1} (${userStats?.level_title || 'Coder'})`}
              >
                <Trophy className="w-3 h-3 text-indigo-400" />
                <span>Lv.{userStats?.level || 1}</span>
              </div>

              {/* User Profile Button */}
              <button
                onClick={onOpenDashboardModal}
                className="flex items-center gap-2 h-8 pl-1.5 pr-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition group"
                title="Open User Dashboard & Stats"
              >
                <span className="w-6 h-6 rounded-md bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-sm">
                  {currentUser.avatar || '⚡'}
                </span>
                <span className="text-xs font-mono font-medium text-slate-200 group-hover:text-white max-w-[100px] truncate">
                  {currentUser.username}
                </span>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-1.5 h-8 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-medium shadow transition ml-1"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

function questionShort(title) {
  if (!title) return '';
  return title.length > 28 ? title.slice(0, 26) + '...' : title;
}
