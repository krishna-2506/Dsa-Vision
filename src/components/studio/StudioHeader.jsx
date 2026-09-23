import React from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Clock,
  Cpu,
  Search,
  Sparkles,
  Flag,
  Download,
  Compass,
  ExternalLink,
  UploadCloud,
  Maximize2,
  Minimize2
} from 'lucide-react';

function formatComplexity(text) {
  if (!text) return '—';
  const s = String(text);
  const match = s.match(/O\([^)]{1,20}\)/i);
  if (match) return match[0];
  let cleaned = s
    .replace(/^[-:=*#\s]+/, '')
    .replace(/^(?:the\s+)?(?:time|space)\s+complexity\s+(?:of[^:]*?)?(?:is|:|-|=)\s*/i, '')
    .replace(/^(?:time|space)\s*(?:complexity)?\s*[:=-]\s*/i, '')
    .trim();
  return cleaned.length <= 24 ? cleaned : cleaned.slice(0, 22) + '…';
}

/**
 * StudioHeader
 * 
 * Top bar of Visualizer Studio with problem identity, difficulty badges,
 * complexity metrics, status selector, and problem navigation controls.
 */
export default function StudioHeader({
  question,
  onBack,
  onStatusChange,
  currentApproachObj,
  hasIdeaMap,
  viewMode,
  setViewMode,
  onDownloadStudySheet,
  onOpenJumper,
  onOpenEnhancer,
  onOpenReport,
  onToggleUploader,
  showUploader,
  onToggleFullscreen,
  isFullscreen,
  prevQuestion,
  nextQuestion,
  currentIndex,
  totalQuestions,
  onNavigateQuestion
}) {
  const diffDotClass =
    question.difficulty === 'Hard'
      ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]'
      : question.difficulty === 'Medium'
      ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]'
      : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]';

  return (
    <header className="px-4 sm:px-6 py-4 border-b border-[var(--line)] bg-[var(--board)] select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Back button + Question Title & Metadata */}
        <div className="flex items-center gap-3.5 min-w-0">
          <button
            type="button"
            onClick={onBack}
            className="p-2 rounded-md bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] border border-[var(--line)] text-[var(--chalk-dim)] hover:text-[var(--chalk)] transition-colors shrink-0 cursor-pointer"
            title="Back to problem library (Esc)"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              {/* Step & Substep Indicator */}
              {question.step_no && (
                <span className="text-xs font-mono text-[var(--chalk-faint)]">
                  Step {question.step_no}: {question.step_name} {question.substep_name ? `· ${question.substep_name}` : ''}
                </span>
              )}
              <span className="text-[var(--line-strong)] text-xs">·</span>
              {/* Problem ID */}
              <span className="text-xs font-mono text-[var(--chalk-dim)] font-medium">
                {question.display_id || (question.leetcode_id ? `#${question.leetcode_id}` : 'DSA')}
              </span>
              <span className="text-[var(--line-strong)] text-xs">·</span>
              {/* Difficulty Dot + Label */}
              <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                question.difficulty === 'Hard' ? 'text-rose-400' :
                question.difficulty === 'Medium' ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                <span className={`w-2 h-2 rounded-full ${diffDotClass}`} />
                {question.difficulty}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold font-sans text-[var(--chalk)] tracking-tight truncate">
              {question.title}
            </h1>
          </div>
        </div>

        {/* Right Action Tools Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Dynamic Complexity Badges */}
          <div className="hidden xl:flex items-center gap-2.5 text-xs font-mono text-[var(--chalk-dim)] px-3 py-1.5 rounded-md bg-[var(--board-raised-2)] border border-[var(--line)]">
            <span className="flex items-center gap-1.5" title="Time Complexity">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{formatComplexity(currentApproachObj?.time_complexity || question.time_complexity)}</span>
            </span>
            <span className="text-[var(--line-strong)]">·</span>
            <span className="flex items-center gap-1.5" title="Space Complexity">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>{formatComplexity(currentApproachObj?.space_complexity || question.space_complexity)}</span>
            </span>
          </div>

          {/* Status Dropdown */}
          <select
            value={question.status || 'to_learn'}
            onChange={(e) => onStatusChange && onStatusChange(question.id, e.target.value)}
            className="h-8 px-2.5 rounded-md bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-sans font-medium text-[var(--chalk)] cursor-pointer focus:outline-none focus:border-indigo-500"
          >
            <option value="to_learn">To learn</option>
            <option value="in_progress">In progress</option>
            <option value="mastered">Mastered</option>
          </select>

          {/* LeetCode link */}
          {question.leetcode_url && (
            <a
              href={question.leetcode_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary h-8 px-2.5 text-xs flex items-center gap-1.5"
              title="Open LeetCode problem in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[var(--chalk-dim)]" />
              <span className="hidden sm:inline">LeetCode</span>
            </a>
          )}

          {/* Upload Button */}
          {onToggleUploader && (
            <button
              type="button"
              onClick={onToggleUploader}
              className={`btn-secondary h-8 px-2.5 text-xs flex items-center gap-1.5 ${
                showUploader ? 'border-indigo-500/50 bg-indigo-500/10 text-indigo-400 font-semibold' : ''
              }`}
              title="Upload custom .jsx visualizer component"
            >
              <UploadCloud className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Upload Viz</span>
            </button>
          )}

          {/* Fullscreen Theater Button */}
          {onToggleFullscreen && (
            <button
              type="button"
              onClick={onToggleFullscreen}
              className={`btn-secondary h-8 px-2.5 text-xs flex items-center gap-1.5 cursor-pointer ${
                isFullscreen ? 'border-amber-500/60 bg-amber-500/15 text-amber-300 font-semibold' : 'text-[var(--chalk-dim)] hover:text-[var(--chalk)]'
              }`}
              title={isFullscreen ? 'Exit Fullscreen (Esc or F)' : 'Expand to Fullscreen Theater Mode (F)'}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 text-amber-400" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span className="hidden md:inline">{isFullscreen ? 'Exit Full' : 'Fullscreen'}</span>
            </button>
          )}

          {/* Idea Map Toggle Button */}
          {hasIdeaMap && (
            <button
              type="button"
              onClick={() => setViewMode((prev) => (prev === 'idea_map' ? 'split' : 'idea_map'))}
              className={`btn-secondary h-8 px-2.5 text-xs flex items-center gap-1.5 transition-all ${
                viewMode === 'idea_map'
                  ? 'bg-purple-600/25 border-purple-500/50 text-purple-300'
                  : 'text-purple-300 hover:text-purple-200'
              }`}
              title="Toggle Idea Map & Mental Model"
            >
              <Compass className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">Idea Map</span>
            </button>
          )}

          {/* Export Study Sheet */}
          <button
            type="button"
            onClick={onDownloadStudySheet}
            className="btn-secondary h-8 px-2.5 text-xs"
            title="Download Markdown Study Sheet"
          >
            <Download className="w-3.5 h-3.5 text-[var(--chalk-dim)]" />
            <span className="hidden sm:inline">Export</span>
          </button>

          {/* Quick Problem Jumper */}
          <button
            type="button"
            onClick={onOpenJumper}
            className="btn-secondary h-8 px-2 text-xs"
            title="Jump to problem (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-[var(--chalk-dim)]" />
          </button>

          {/* AI Enhancer button */}
          <button
            type="button"
            onClick={onOpenEnhancer}
            className="btn-secondary h-8 px-2 text-xs"
            title="Enhance question details with AI"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          </button>

          {/* Report solution issue button */}
          <button
            type="button"
            onClick={onOpenReport}
            className="btn-secondary h-8 px-2 text-xs"
            title="Report an issue with this problem or code"
          >
            <Flag className="w-3.5 h-3.5 text-[var(--chalk-faint)]" />
          </button>

          {/* Prev / Next Problem Switcher */}
          <div className="flex items-center gap-1 pl-1">
            <button
              type="button"
              onClick={() => prevQuestion && onNavigateQuestion && onNavigateQuestion(prevQuestion)}
              disabled={!prevQuestion}
              className="btn-secondary h-8 px-2 text-xs disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              title={prevQuestion ? `Previous: ${prevQuestion.title}` : 'First problem'}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <span className="text-xs font-mono text-[var(--chalk-faint)] px-1.5">
              {currentIndex >= 0 ? currentIndex + 1 : '?'} / {totalQuestions || 0}
            </span>

            <button
              type="button"
              onClick={() => nextQuestion && onNavigateQuestion && onNavigateQuestion(nextQuestion)}
              disabled={!nextQuestion}
              className="btn-secondary h-8 px-2 text-xs disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              title={nextQuestion ? `Next: ${nextQuestion.title}` : 'Last problem'}
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
