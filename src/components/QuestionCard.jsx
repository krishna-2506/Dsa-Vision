import React, { useState } from 'react';
import { Star, ExternalLink, ArrowRight, Clock, Cpu, Sparkles, CheckCircle2, ChevronDown, Play, BookOpen, Code2 } from 'lucide-react';
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
    badgeClass: 'text-[#3d9e5c] bg-[#3d9e5c]/10 border-[#3d9e5c]/30',
    dotClass: 'bg-[#3d9e5c]'
  },
  in_progress: {
    label: 'In Progress',
    badgeClass: 'text-[var(--accent)] bg-[var(--accent)]/10 border-[var(--accent)]/30',
    dotClass: 'bg-[var(--accent)]'
  },
  to_learn: {
    label: 'To Learn',
    badgeClass: 'text-[var(--text-muted)] bg-[rgba(255,248,230,0.03)] border-[var(--border-subtle)]',
    dotClass: 'bg-[var(--text-tertiary)]'
  }
};

const DIFF_CONFIG = {
  easy: {
    label: 'Easy',
    dotClass: 'bg-[#3d9e5c]',
    textClass: 'text-[#3d9e5c]'
  },
  medium: {
    label: 'Medium',
    dotClass: 'bg-[#d4a03c]',
    textClass: 'text-[#d4a03c]'
  },
  hard: {
    label: 'Hard',
    dotClass: 'bg-[#b83c38]',
    textClass: 'text-[#b83c38]'
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
      className="group flex flex-col justify-between p-5 cursor-pointer card rounded-2xl relative select-none transition-all duration-200"
    >
      {/* ── Top Header Row: Difficulty, ID, Step Pill & Interactive Indicator ── */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2 min-w-0 flex-wrap">
            {/* Minimalist Difficulty Indicator */}
            <div className={`flex items-center gap-1.5 text-[11px] font-mono font-medium ${diffCfg.textClass}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${diffCfg.dotClass}`} />
              <span>{diffCfg.label}</span>
            </div>

            <span className="text-[var(--text-tertiary)] text-xs">·</span>

            {/* Problem Display ID */}
            <span className="text-[11px] font-mono text-[var(--text-tertiary)]">
              {displayId}
            </span>

            {/* Step badge */}
            {question.step_no && (
              <>
                <span className="text-[var(--text-tertiary)] text-xs hidden sm:inline">·</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[var(--bg-surface)] text-[var(--text-tertiary)] border border-[var(--border-subtle)] truncate max-w-[150px] hidden sm:inline" title={`${question.step_name || ''} - ${question.substep_name || ''}`}>
                  Step {question.step_no} {question.substep_name ? `· ${question.substep_name}` : ''}
                </span>
              </>
            )}
          </div>

          {/* Quick Actions (Interactive Badge + Bookmark) */}
          <div className="flex items-center gap-1.5 shrink-0">
            {hasVisualizer && (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[rgba(212,160,60,0.08)] border border-[var(--border-accent)]/40 text-[var(--accent)]"
                title="Interactive algorithm visualizer available"
              >
                <Sparkles className="w-2.5 h-2.5 text-[var(--accent)]" />
                <span>Visualizer</span>
              </span>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                sound.playStep(720);
                onToggleFavorite(question.id);
              }}
              className={`p-1 rounded-lg transition-colors cursor-pointer ${
                question.is_favorite
                  ? 'text-[var(--accent)]'
                  : 'text-[var(--text-tertiary)] hover:text-[var(--accent)] hover:bg-[rgba(255,248,230,0.04)]'
              }`}
              title={question.is_favorite ? 'Saved in bookmarks' : 'Bookmark problem'}
            >
              <Star
                className={`w-3.5 h-3.5 ${
                  question.is_favorite ? 'fill-[var(--accent)] text-[var(--accent)]' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* ── Problem Title ── */}
        <h3 className="font-sans font-semibold text-sm sm:text-[14.5px] text-[var(--text-primary)] group-hover:text-[var(--accent-bright)] transition-colors leading-snug mb-2.5 line-clamp-2">
          {question.title}
        </h3>

        {/* ── Topics / Tags ── */}
        {tags.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap mb-3">
            {tags.slice(0, 3).map((tag) => (
              <button
                key={tag}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onSelectTag) onSelectTag(tag);
                }}
                className={`text-[10px] font-mono px-2 py-0.5 rounded-md transition-colors cursor-pointer border ${
                  activeTag === tag
                    ? 'bg-[var(--accent)]/15 text-[var(--accent-bright)] border-[var(--accent)]/40 font-medium'
                    : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)] bg-[rgba(255,248,230,0.03)] border-[var(--border-subtle)] hover:border-[var(--border-medium)]'
                }`}
              >
                #{tag}
              </button>
            ))}
            {tags.length > 3 && (
              <span className="text-[10px] font-mono text-[var(--text-tertiary)]">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* ── Approaches & Languages Metadata ── */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="text-[10px] font-mono text-[var(--text-tertiary)] px-2 py-0.5 rounded-md bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
            {approachesCount} {approachesCount === 1 ? 'approach' : 'approaches'}
          </span>
          <div className="flex items-center gap-1 text-[10px] font-mono text-[var(--text-tertiary)]">
            <span>C++</span>
            <span>·</span>
            <span>Java</span>
            <span>·</span>
            <span>Py</span>
            <span>·</span>
            <span>JS</span>
          </div>
        </div>
      </div>

      {/* ── Card Footer: Complexity & Actions ── */}
      <div className="pt-3 border-t border-[var(--border-subtle)]">
        {/* Complexity & Resource Links Metadata Row */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--text-tertiary)]">
            <span className="flex items-center gap-1" title="Time Complexity">
              <Clock className="w-3 h-3 text-[var(--accent)]" />
              <span>{cleanComplexity(question.time_complexity, 'O(N)')}</span>
            </span>
            <span className="text-[var(--border-medium)]">·</span>
            <span className="flex items-center gap-1" title="Auxiliary Space Complexity">
              <Cpu className="w-3 h-3 text-[#3d9e5c]" />
              <span>{cleanComplexity(question.space_complexity, 'O(1)')}</span>
            </span>
          </div>

          <div className="flex items-center gap-0.5">
            {question.youtube_url && (
              <a
                href={question.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[var(--text-tertiary)] hover:text-rose-400 p-1.5 rounded-md hover:bg-[rgba(255,248,230,0.04)] transition-colors"
                title="Watch tutorial"
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
                className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] p-1.5 rounded-md hover:bg-[rgba(255,248,230,0.04)] transition-colors"
                title="Read article"
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
                className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] p-1.5 rounded-md hover:bg-[rgba(255,248,230,0.04)] transition-colors"
                title="Open on LeetCode"
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
              className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10.5px] font-mono border transition-all cursor-pointer ${statusCfg.badgeClass}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dotClass}`} />
              <span>{statusCfg.label}</span>
              <ChevronDown className="w-2.5 h-2.5 opacity-60 ml-0.5" />
            </button>

            {/* Status Dropdown Menu */}
            {statusMenuOpen && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute bottom-full left-0 mb-1.5 w-32 rounded-xl bg-[var(--bg-card)] border border-[var(--border-medium)] shadow-xl p-1.5 z-30 fade-in"
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
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] font-mono text-left transition-colors cursor-pointer ${
                        isCur
                          ? 'bg-[var(--accent)]/15 text-[var(--accent-bright)] font-medium'
                          : 'text-[var(--text-body)] hover:bg-[rgba(255,248,230,0.04)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${itemCfg.dotClass}`} />
                        <span>{itemCfg.label}</span>
                      </div>
                      {isCur && <CheckCircle2 className="w-3 h-3 text-[var(--accent)]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Launch Studio Action */}
          <div className="flex items-center gap-1 text-[11px] font-mono font-medium text-[var(--accent)] group-hover:translate-x-0.5 transition-transform">
            <span>Explore</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
