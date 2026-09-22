import React, { useEffect, useCallback } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  CloudRain,
  Radio,
  Wind,
  Flame,
  Clock,
  Pin,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useFocus } from '../../context/FocusContext';
import { sound } from '../../services/audio';

export default function FocusModal({ activeQuestion, onNavigateQuestion }) {
  const {
    isModalOpen,
    setIsModalOpen,
    isZenMode,
    setIsZenMode,
    mode,
    FOCUS_MODES,
    formattedTime,
    progressPercent,
    isRunning,
    start,
    pause,
    reset,
    skip,
    switchMode,
    customMinutes,
    setCustomMinutes,
    linkedQuestion,
    setLinkedQuestion,
    ambientType,
    setAmbientType,
    ambientVolume,
    setAmbientVolume,
    soundEnabled,
    setSoundEnabled,
    tickEnabled,
    setTickEnabled,
    focusMinutesToday,
    sessionsCompletedToday
  } = useFocus();

  const currentMode = FOCUS_MODES[mode] || FOCUS_MODES.pomodoro;
  const isBreak = currentMode.isBreak;

  // Keyboard shortcut listener
  const handleKeyDown = useCallback(
    (e) => {
      // Ignore if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        if (isRunning) {
          pause();
        } else {
          start();
        }
      } else if (e.code === 'KeyR' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        reset();
      } else if (e.code === 'Escape') {
        e.preventDefault();
        if (isZenMode) {
          setIsZenMode(false);
        } else {
          setIsModalOpen(false);
        }
      }
    },
    [isRunning, isZenMode, setIsZenMode, setIsModalOpen, start, pause, reset]
  );

  useEffect(() => {
    if (isModalOpen || isZenMode) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isModalOpen, isZenMode, handleKeyDown]);

  if (!isModalOpen && !isZenMode) return null;

  // Pin active problem from current page if not already pinned
  const handlePinCurrent = () => {
    if (activeQuestion) {
      setLinkedQuestion(activeQuestion);
      sound.playSuccess();
    }
  };

  // SVG circular geometry
  const radius = 95;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  // Zen Mode (Minimalist Fullscreen Experience)
  if (isZenMode) {
    return (
      <div className="fixed inset-0 z-50 bg-[#060608] text-[var(--chalk)] flex flex-col items-center justify-between p-8 sm:p-12 animate-in fade-in duration-200 select-none">
        {/* Zen Header */}
        <div className="w-full max-w-4xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[var(--chalk-dim)]">
              Zen Focus Mode · {currentMode.name}
            </span>
          </div>

          <button
            onClick={() => setIsZenMode(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[var(--chalk-dim)] hover:text-white transition-all cursor-pointer"
            title="Exit Zen Mode (Esc)"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Exit Zen (Esc)</span>
          </button>
        </div>

        {/* Center Clock & Circular Progress */}
        <div className="flex flex-col items-center justify-center space-y-8 my-auto">
          {/* Linked problem pill if available */}
          {linkedQuestion && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-sans max-w-md truncate">
              <Pin className="w-3 h-3 text-indigo-400 shrink-0" />
              <span className="truncate">Target: {linkedQuestion.title}</span>
            </div>
          )}

          <div className="relative flex items-center justify-center w-72 h-72">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 220 220">
              {/* Background Track */}
              <circle
                cx="110"
                cy="110"
                r={radius}
                className="stroke-white/5"
                strokeWidth="6"
                fill="none"
              />
              {/* Animated Progress Ring */}
              <circle
                cx="110"
                cy="110"
                r={radius}
                className={`transition-all duration-300 ${
                  isBreak ? 'stroke-emerald-400' : 'stroke-amber-400'
                }`}
                strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Centered Digital Display */}
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-6xl sm:text-7xl font-mono font-bold tracking-tight text-white drop-shadow-md">
                {formattedTime}
              </span>
              <span className="text-xs font-mono font-medium tracking-widest uppercase mt-2 text-[var(--chalk-dim)]">
                {currentMode.name}
              </span>
            </div>
          </div>

          {/* Zen Play / Pause Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={reset}
              className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-[var(--chalk-dim)] hover:text-white transition-all cursor-pointer"
              title="Reset Timer (R)"
            >
              <RotateCcw className="w-4.5 h-4.5" />
            </button>

            <button
              onClick={isRunning ? pause : start}
              className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-all cursor-pointer ${
                isBreak
                  ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30'
                  : 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/30'
              }`}
              title="Toggle Play / Pause (Space)"
            >
              {isRunning ? (
                <Pause className="w-7 h-7 fill-current" />
              ) : (
                <Play className="w-7 h-7 fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={skip}
              className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-[var(--chalk-dim)] hover:text-white transition-all cursor-pointer"
              title="Skip Session"
            >
              <SkipForward className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Zen Footer Hotkey Hints */}
        <div className="flex items-center gap-6 text-[11px] font-mono text-[var(--chalk-faint)]">
          <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white">Space</kbd> Play / Pause</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white">R</kbd> Reset</span>
          <span><kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white">Esc</kbd> Exit Zen</span>
        </div>
      </div>
    );
  }

  // Standard Focus Hub Modal
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-[var(--board-raised)] border border-[var(--line-strong)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* ── Top Bar ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--line)] bg-[var(--board)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-sans font-bold text-sm text-[var(--chalk)] tracking-tight">
                AlgoFocus · Study Room
              </h2>
              <p className="text-[11px] font-mono text-[var(--chalk-dim)]">
                Structured pacing & deep work for DSA mastery
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsZenMode(true)}
              className="p-1.5 rounded-md hover:bg-[var(--board-hover)] border border-[var(--line)] text-[var(--chalk-dim)] hover:text-[var(--chalk)] transition-all cursor-pointer"
              title="Enter Fullscreen Zen Mode"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="p-1.5 rounded-md hover:bg-[var(--board-hover)] border border-[var(--line)] text-[var(--chalk-dim)] hover:text-[var(--chalk)] transition-all cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Modal Body (Scrollable) ── */}
        <div className="p-6 overflow-y-auto space-y-6">

          {/* 1. Mode Presets Bar */}
          <div className="flex items-center justify-center gap-1.5 p-1 rounded-xl bg-[var(--board)] border border-[var(--line)] overflow-x-auto">
            {Object.values(FOCUS_MODES).map((m) => {
              const active = mode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => switchMode(m.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all cursor-pointer whitespace-nowrap ${
                    active
                      ? m.isBreak
                        ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-semibold shadow-xs'
                        : 'bg-amber-500/20 border border-amber-500/30 text-amber-300 font-semibold shadow-xs'
                      : 'text-[var(--chalk-dim)] hover:text-[var(--chalk)] hover:bg-[var(--board-hover)]'
                  }`}
                >
                  {m.name}
                  <span className="text-[10px] font-mono opacity-60 ml-1">
                    ({m.id === 'custom' ? `${customMinutes}m` : `${m.durationMinutes}m`})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Custom Duration Slider (if custom mode active) */}
          {mode === 'custom' && (
            <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-[var(--board)] border border-[var(--line)]">
              <span className="text-xs font-mono text-[var(--chalk-dim)]">Custom Duration:</span>
              <input
                type="range"
                min="5"
                max="90"
                step="5"
                value={customMinutes}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setCustomMinutes(val);
                  switchMode('custom', val);
                }}
                className="flex-1 accent-amber-500 cursor-pointer"
              />
              <span className="text-xs font-mono font-bold text-amber-400 w-12 text-right">
                {customMinutes} min
              </span>
            </div>
          )}

          {/* 2. Circular Gauge & Controls */}
          <div className="flex flex-col items-center justify-center py-2">
            <div className="relative flex items-center justify-center w-60 h-60">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 220 220">
                <circle
                  cx="110"
                  cy="110"
                  r={radius}
                  className="stroke-[var(--board-raised-2)]"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="110"
                  cy="110"
                  r={radius}
                  className={`transition-all duration-300 ${
                    isBreak ? 'stroke-emerald-400' : 'stroke-amber-400'
                  }`}
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>

              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-5xl font-mono font-bold tracking-tight text-[var(--chalk)] drop-shadow-sm">
                  {formattedTime}
                </span>
                <span className="text-xs font-sans font-medium text-[var(--chalk-dim)] mt-1.5">
                  {currentMode.description}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3.5 mt-5">
              <button
                onClick={reset}
                className="w-10 h-10 rounded-full bg-[var(--board)] hover:bg-[var(--board-hover)] border border-[var(--line)] flex items-center justify-center text-[var(--chalk-dim)] hover:text-[var(--chalk)] transition-all cursor-pointer"
                title="Reset session (R)"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={isRunning ? pause : start}
                className={`h-11 px-7 rounded-full font-sans font-semibold text-xs flex items-center gap-2 text-white shadow-md transition-all cursor-pointer ${
                  isBreak
                    ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/25'
                    : 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/25'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                    <span>Start Focus</span>
                  </>
                )}
              </button>

              <button
                onClick={skip}
                className="w-10 h-10 rounded-full bg-[var(--board)] hover:bg-[var(--board-hover)] border border-[var(--line)] flex items-center justify-center text-[var(--chalk-dim)] hover:text-[var(--chalk)] transition-all cursor-pointer"
                title="Skip to next session"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 3. Linked Problem Section */}
          <div className="p-3.5 rounded-xl bg-[var(--board)] border border-[var(--line)] space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-sans font-semibold text-[var(--chalk)]">
                <Pin className="w-3.5 h-3.5 text-[var(--indigo)]" />
                <span>Target Focus Problem</span>
              </div>

              {activeQuestion && linkedQuestion?.id !== activeQuestion.id && (
                <button
                  onClick={handlePinCurrent}
                  className="text-[11px] font-mono text-[var(--indigo)] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Pin active: {activeQuestion.title?.slice(0, 20)}…
                </button>
              )}
            </div>

            {linkedQuestion ? (
              <div className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-[var(--board-raised)] border border-[var(--line)] text-xs">
                <div className="min-w-0">
                  <div className="font-medium text-[var(--chalk)] truncate">
                    {linkedQuestion.title}
                  </div>
                  <div className="text-[10px] font-mono text-[var(--chalk-dim)]">
                    {linkedQuestion.category || 'DSA Problem'}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {onNavigateQuestion && (
                    <button
                      onClick={() => {
                        onNavigateQuestion(linkedQuestion);
                        setIsModalOpen(false);
                      }}
                      className="px-2.5 py-1 rounded bg-[var(--indigo)]/15 border border-[var(--indigo)]/30 text-[var(--indigo)] text-xs font-mono font-medium hover:bg-[var(--indigo)]/25 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <span>Study</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  )}
                  <button
                    onClick={() => setLinkedQuestion(null)}
                    className="text-[var(--chalk-faint)] hover:text-rose-400 text-xs p-1"
                    title="Unpin problem"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-2 text-xs font-mono text-[var(--chalk-dim)]">
                {activeQuestion ? (
                  <button
                    onClick={handlePinCurrent}
                    className="text-[var(--indigo)] hover:underline cursor-pointer"
                  >
                    Click to link current problem: "{activeQuestion.title}"
                  </button>
                ) : (
                  <span>Open any problem in the Studio or Library to link it here.</span>
                )}
              </div>
            )}
          </div>

          {/* 4. Procedural Ambient Noise & Audio Deck */}
          <div className="p-3.5 rounded-xl bg-[var(--board)] border border-[var(--line)] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-sans font-semibold text-[var(--chalk)]">
                Ambient Sound & Focus Atmosphere
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTickEnabled(!tickEnabled)}
                  className={`text-[11px] font-mono px-2 py-0.5 rounded border transition-all cursor-pointer ${
                    tickEnabled
                      ? 'bg-indigo-500/15 border-indigo-500/30 text-indigo-400'
                      : 'bg-[var(--board-raised)] border-[var(--line)] text-[var(--chalk-dim)]'
                  }`}
                  title="Soft wooden tick every second"
                >
                  Tick {tickEnabled ? 'ON' : 'OFF'}
                </button>

                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="text-[var(--chalk-dim)] hover:text-[var(--chalk)] cursor-pointer"
                  title={soundEnabled ? 'Disable Chimes' : 'Enable Chimes'}
                >
                  {soundEnabled ? (
                    <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
                  ) : (
                    <VolumeX className="w-3.5 h-3.5 text-[var(--chalk-faint)]" />
                  )}
                </button>
              </div>
            </div>

            {/* Ambient Type Buttons */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'none', label: 'Off', icon: VolumeX },
                { id: 'binaural', label: '432Hz Alpha', icon: Radio },
                { id: 'rain', label: 'Rain Drops', icon: CloudRain },
                { id: 'whitenoise', label: 'White Noise', icon: Wind }
              ].map((item) => {
                const active = ambientType === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setAmbientType(item.id)}
                    className={`flex flex-col items-center gap-1.5 p-2 rounded-lg border text-xs font-sans transition-all cursor-pointer ${
                      active
                        ? 'bg-[var(--indigo)]/20 border-[var(--indigo)]/40 text-[var(--indigo)] font-semibold'
                        : 'bg-[var(--board-raised)] hover:bg-[var(--board-hover)] border-[var(--line)] text-[var(--chalk-dim)] hover:text-[var(--chalk)]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[11px]">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Ambient Volume Slider */}
            {ambientType !== 'none' && (
              <div className="flex items-center gap-3 pt-1">
                <Volume2 className="w-3.5 h-3.5 text-[var(--chalk-dim)] shrink-0" />
                <input
                  type="range"
                  min="0.05"
                  max="0.8"
                  step="0.05"
                  value={ambientVolume}
                  onChange={(e) => setAmbientVolume(parseFloat(e.target.value))}
                  className="flex-1 accent-indigo-500 cursor-pointer h-1.5"
                />
                <span className="text-[11px] font-mono text-[var(--chalk-dim)] w-8 text-right">
                  {Math.round(ambientVolume * 100)}%
                </span>
              </div>
            )}
          </div>

          {/* 5. Daily Summary Bar */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--board)] border border-[var(--line)]">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase text-[var(--chalk-dim)]">Focused Today</div>
                <div className="text-sm font-mono font-bold text-[var(--chalk)]">
                  {focusMinutesToday} mins
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--board)] border border-[var(--line)]">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase text-[var(--chalk-dim)]">Completed</div>
                <div className="text-sm font-mono font-bold text-[var(--chalk)]">
                  {sessionsCompletedToday} rounds
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
