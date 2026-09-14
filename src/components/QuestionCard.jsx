import React, { useState } from 'react';
import { Star, ExternalLink, ArrowRight, Clock, Cpu, Layers, CheckCircle2, ChevronDown, Play, BookOpen, Code2 } from 'lucide-react';
import { sound } from '../services/audio';
import { visualizersRegistry } from '../visualizers';

function cleanComplexity(text, fallback = 'O(1)') {
  if (!text) return fallback;
  let s = String(text)
    .replace(/^[-:=*#\s]+/, '')
    .replace(/[*#/\s]+$/, '')
    .trim()
    .replace(/^(?:time|space)\s*complexity\s*[:=-]\s*/i, '')
    .replace(/^(?:time|space)\s*[:=-]\s*/i, '')
    .trim();
  if (s === 'O(0)' || s === '0' || s.toLowerCase() === 'o(0)') return 'O(1)';
  return s.length <= 18 ? s : s.slice(0, 17) + '…';
}

const STATUS_CONFIG = {
  mastered: {
    label: 'Mastered',
    badgeClass: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
    dotClass: 'bg-emerald-500'
  },
  in_progress: {
    label: 'In Progress',
    badgeClass: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/25',
    dotClass: 'bg-amber-500'
  },
  to_learn: {
    label: 'To Learn',
    badgeClass: 'text-[var(--chalk-dim)] bg-[var(--board-raised-2)] border-[var(--line)]',
    dotClass: 'bg-slate-400 dark:bg-slate-500'
  }
};

const DIFF_CONFIG = {
  easy: {
    label: 'Easy',
    dotClass: 'bg-emerald-500',
    textClass: 'text-emerald-600 dark:text-emerald-400'
  },
  medium: {
    label: 'Medium',
    dotClass: 'bg-amber-500',
    textClass: 'text-amber-600 dark:text-amber-400'
  },
  hard: {
    label: 'Hard',
    dotClass: 'bg-rose-500',
    textClass: 'text-rose-600 dark:text-rose-400'
  }
};

export default function QuestionCard({
  question,
  onOpen,
  onToggleFavorite,
  onStatusChange,
  activeTag = null,
  onSelectTag
}) {
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const hasVisualizer = Boolean(
    visualizersRegistry[question.component_key || question.componentKey]
  );
  const diffKey = (question.difficulty || 'easy').toLowerCase();
  const diffCfg = DIFF_CONFIG[diffKey] || DIFF_CONFIG.easy;
  const tags = Array.isArray(question.tags) ? question.tags : [];
  const currentStatus = question.status || 'to_learn';
  const statusCfg = STATUS_CONFIG[currentStatus] || STATUS_CONFIG.to_learn;

  const displayId = question.display_id || (question.leetcode_id ? `LC-${question.leetcode_id}` : 'DSA');
  const approachesCount = Array.isArray(question.approaches_data) && question.approaches_data.length > 0
    ? question.approaches_data.length
    : (question.approach ? 1 : 1);

  return (
    <div
      onClick={() => {
        sound.playStep(520);
        onOpen(question);
      }}
      className="card card-lift group flex flex-col justify-between p-4.5 cursor-pointer bg-[var(--board-raised)] hover:bg-[var(--board-raised)] border border-[var(--line)] hover:border-[var(--line-strong)] rounded-2xl relative select-none transition-all duration-200 backdrop-blur-xl shadow-sm"
    >
      {/* ── Top Header Row: Difficulty, ID, Step Pill & Interactive Indicator ── */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
            {/* Minimalist Apple Difficulty Indicator */}
            <div className={`flex items-center gap-1.5 text-[11px] font-sans font-semibold ${diffCfg.textClass}`}>
              <span className={`w-2 h-2 rounded-full ${diffCfg.dotClass} shadow-sm`} />
              <span>{diffCfg.label}</span>
            </div>

            <span className="text-[var(--line-strong)] text-xs">·</span>

            {/* Problem Display ID */}
            <span className="text-[11px] font-mono text-[var(--chalk-faint)] font-medium">
              {displayId}
            </span>

            {/* Step badge */}
            {question.step_no && (
              <>
                <span className="text-[var(--line-strong)] text-xs hidden sm:inline">·</span>
                <span className="text-[10px] font-sans px-1.5 py-0.2 rounded bg-[var(--board-raised-2)] text-[var(--chalk-dim)] border border-[var(--line)] truncate max-w-[150px] hidden sm:inline" title={`${question.step_name || ''} - ${question.substep_name || ''}`}>
                  Step {question.step_no} {question.substep_name ? `· ${question.substep_name}` : ''}
                </span>
              </>
            )}
          </div>

          {/* Quick Actions (Interactive Badge + Bookmark) */}
          <div className="flex items-center gap-1.5 shrink-0">
            {hasVisualizer && (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-sans font-semibold bg-[var(--indigo-dim)] border border-[var(--indigo)]/25 text-[var(--indigo)]"
                title="Interactive algorithm visualizer available"
              >
                <Layers className="w-2.5 h-2.5 text-[var(--indigo)]" />
                <span>Interactive</span>
              </span>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                sound.playStep(720);
                onToggleFavorite(question.id);
              }}
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                question.is_favorite
                  ? 'bg-amber-500/15 text-amber-500'
                  : 'text-[var(--chalk-faint)] hover:text-[var(--chalk)] hover:bg-[var(--board-hover)]'
              }`}
              title={question.is_favorite ? 'Saved in bookmarks' : 'Bookmark problem'}
            >
              <Star
                className={`w-3.5 h-3.5 ${
                  question.is_favorite ? 'fill-amber-400 text-amber-500' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* ── Problem Title ── */}
        <h3 className="font-sans font-semibold text-[14.5px] text-[var(--chalk)] group-hover:text-[var(--indigo)] transition-colors leading-snug mb-2.5 line-clamp-2">
          {question.title}
        </h3>

        {/* ── Topics / Tags (Apple Pills) ── */}
        {tags.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap mb-3.5">
            {tags.slice(0, 3).map((tag) => (
              <button
                key={tag}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onSelectTag) onSelectTag(tag);
                }}
                className={`text-[10px] font-sans px-2 py-0.5 rounded-full border transition-all cursor-pointer ${
                  activeTag === tag
                    ? 'bg-[var(--indigo-dim)] text-[var(--indigo)] border-[var(--indigo)]/30 font-semibold'
                    : 'text-[var(--chalk-faint)] hover:text-[var(--chalk)] bg-[var(--board-raised-2)] border-[var(--line)] hover:border-[var(--line-strong)]'
                }`}
              >
                #{tag}
              </button>
            ))}
            {tags.length > 3 && (
              <span className="text-[9.5px] font-mono text-[var(--chalk-faint)]">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* ── Approaches & Languages Metadata ── */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[10px] font-sans font-medium px-2 py-0.5 rounded-full bg-[var(--board-raised-2)] text-[var(--chalk-dim)] border border-[var(--line)]">
            {approachesCount} {approachesCount === 1 ? 'Approach' : 'Approaches'}
          </span>
          <div className="flex items-center gap-1 text-[9.5px] font-mono text-[var(--chalk-faint)]">
            <span className="hover:text-[var(--chalk)]">C++</span>
            <span>·</span>
            <span className="hover:text-[var(--chalk)]">Java</span>
            <span>·</span>
            <span className="hover:text-[var(--chalk)]">Py</span>
            <span>·</span>
            <span className="hover:text-[var(--chalk)]">JS</span>
          </div>
        </div>
      </div>

      {/* ── Card Footer: Complexity & Actions ── */}
      <div className="pt-3 border-t border-[var(--line)]">
        {/* Complexity & Resource Links Metadata Row */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--chalk-dim)]">
            <span className="flex items-center gap-1" title="Time Complexity">
              <Clock className="w-3 h-3 text-[var(--amber)]" />
              <span>{cleanComplexity(question.time_complexity, 'O(N)')}</span>
            </span>
            <span className="text-[var(--line-strong)]">·</span>
            <span className="flex items-center gap-1" title="Auxiliary Space Complexity">
              <Cpu className="w-3 h-3 text-[var(--teal)]" />
              <span>{cleanComplexity(question.space_complexity, 'O(1)')}</span>
            </span>
          </div>

          <div className="flex items-center gap-1">
            {question.youtube_url && (
              <a
                href={question.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-rose-500/70 hover:text-rose-500 p-1 rounded-full hover:bg-rose-500/10 transition-colors"
                title="Watch Striver's video tutorial"
              >
                <Play className="w-3 h-3 fill-current" />
              </a>
            )}

            {question.article_url && (
              <a
                href={question.article_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-teal-500/70 hover:text-teal-400 p-1 rounded-full hover:bg-teal-500/10 transition-colors"
                title="Read TakeUForward article"
              >
                <BookOpen className="w-3 h-3" />
              </a>
            )}

            {question.leetcode_url && (
              <a
                href={question.leetcode_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[var(--chalk-faint)] hover:text-[var(--chalk)] p-1 rounded-full hover:bg-[var(--board-hover)] transition-colors"
                title="Open problem on LeetCode"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Status Dropdown & Launch Action */}
        <div className="flex items-center justify-between gap-2">
          {/* Status Trigger */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setStatusMenuOpen(!statusMenuOpen);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-sans font-medium border transition-all cursor-pointer ${statusCfg.badgeClass}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dotClass}`} />
              <span>{statusCfg.label}</span>
              <ChevronDown className="w-2.5 h-2.5 opacity-60 ml-0.5" />
            </button>

            {/* Status Dropdown Menu (Apple frosted glass menu) */}
            {statusMenuOpen && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute bottom-full left-0 mb-2 w-36 rounded-2xl bg-[var(--board-raised)] border border-[var(--line-strong)] backdrop-blur-2xl shadow-xl p-1.5 z-30 fade-in"
              >
                {['to_learn', 'in_progress', 'mastered'].map((stKey) => {
                  const itemCfg = STATUS_CONFIG[stKey];
                  const isCur = currentStatus === stKey;
                  return (
                    <button
                      key={stKey}
                      onClick={() => {
                        onStatusChange(question.id, stKey);
                        setStatusMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-sans text-left transition-colors cursor-pointer ${
                        isCur
                          ? 'bg-[var(--indigo-dim)] text-[var(--indigo)] font-semibold'
                          : 'text-[var(--chalk-dim)] hover:bg-[var(--board-hover)] hover:text-[var(--chalk)]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${itemCfg.dotClass}`} />
                        <span>{itemCfg.label}</span>
                      </div>
                      {isCur && <CheckCircle2 className="w-3 h-3 text-[var(--indigo)]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Launch Studio Action */}
          <div className="flex items-center gap-1 text-[11.5px] font-sans font-semibold text-[var(--indigo)] group-hover:translate-x-0.5 transition-all">
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
