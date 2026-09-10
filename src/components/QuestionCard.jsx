import React from 'react';
import { Star, ExternalLink, Play, Clock, Cpu } from 'lucide-react';
import { sound } from '../services/audio';
import { visualizersRegistry } from '../visualizers';

function formatComplexity(text, max = 22) {
  if (!text) return 'O(1)';
  let s = String(text)
    .replace(/^[-:=*#\s]+/, '')
    .replace(/[*\/#\s]+$/, '')
    .trim()
    .replace(/^(?:time|space)\s*complexity\s*[:=-]\s*/i, '')
    .replace(/^(?:time|space)\s*[:=-]\s*/i, '')
    .trim();
  return s.length <= max ? s : s.slice(0, max - 1) + '…';
}

const DIFF_DOT = {
  easy:   'dot-easy',
  medium: 'dot-medium',
  hard:   'dot-hard',
};
const DIFF_TEXT = {
  easy:   'text-[var(--easy)]',
  medium: 'text-[var(--amber)]',
  hard:   'text-[#e06c75]',
};

const STATUS_BORDER = {
  mastered:    'border-[rgba(124,180,115,0.4)] bg-[rgba(124,180,115,0.04)]',
  in_progress: 'border-[rgba(232,163,61,0.4)] bg-[rgba(232,163,61,0.04)]',
  to_learn:    'border-[var(--line)] bg-[var(--board-raised)]',
};

export default function QuestionCard({
  question,
  onOpen,
  onToggleFavorite,
  onStatusChange,
  activeTag = null,
  onSelectTag
}) {
  const hasVisualizer = Boolean(
    visualizersRegistry[question.component_key || question.componentKey]
  );
  const diff = (question.difficulty || '').toLowerCase();
  const tags = Array.isArray(question.tags) ? question.tags : [];

  return (
    <div
      className={`card group flex flex-col justify-between p-4 hover:border-[var(--line-strong)] transition-all duration-150 ${STATUS_BORDER[question.status] || STATUS_BORDER.to_learn}`}
    >
      {/* Top row */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2 min-w-0">
            {/* Difficulty dot */}
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${DIFF_DOT[diff] || 'dot-easy'}`}
              title={question.difficulty}
            />
            {/* ID */}
            <span className="font-mono text-[11px] text-[var(--chalk-faint)] shrink-0">
              {question.display_id || (question.leetcode_id ? `LC-${question.leetcode_id}` : '—')}
            </span>
            {/* Category */}
            <span className="font-mono text-[11px] text-[var(--chalk-dim)] truncate">
              {(question.category || '').replace(/^\d+\.\s*/, '')}
            </span>
          </div>

          {/* Favorite + visualizer dot */}
          <div className="flex items-center gap-1.5 shrink-0">
            {hasVisualizer && (
              <span
                className="w-1.5 h-1.5 rounded-full bg-[var(--teal)]"
                title="Has animated visualizer"
              />
            )}
            <button
              onClick={(e) => { e.stopPropagation(); sound.playStep(700); onToggleFavorite(question.id); }}
              className={`transition cursor-pointer ${question.is_favorite ? 'text-[var(--amber)]' : 'text-[var(--chalk-faint)] hover:text-[var(--chalk-dim)]'}`}
              title={question.is_favorite ? 'Saved' : 'Save'}
            >
              <Star className={`w-3.5 h-3.5 ${question.is_favorite ? 'fill-[var(--amber)]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3
          onClick={() => onOpen(question)}
          className="font-sans font-medium text-[14.5px] text-[var(--chalk)] group-hover:text-[var(--amber)] transition-colors cursor-pointer leading-snug mb-2 line-clamp-2"
        >
          {question.title}
        </h3>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap mb-3">
            {tags.slice(0, 2).map((tag) => (
              <button
                key={tag}
                onClick={(e) => { e.stopPropagation(); onSelectTag && onSelectTag(tag); }}
                className={`text-[10.5px] font-mono px-1.5 py-0.5 rounded-[2px] transition cursor-pointer ${
                  activeTag === tag
                    ? 'bg-[var(--amber-dim)] text-[var(--amber)] border border-[var(--amber)]'
                    : 'text-[var(--chalk-faint)] hover:text-[var(--chalk)] border border-[var(--line)] hover:border-[var(--line-strong)]'
                }`}
              >
                #{tag}
              </button>
            ))}
            {tags.length > 2 && (
              <span className="text-[10px] font-mono text-[var(--chalk-faint)]">+{tags.length - 2}</span>
            )}
          </div>
        )}
      </div>

      {/* Bottom */}
      <div>
        {/* Complexity */}
        <div className="flex items-center gap-3 py-2 mb-3 border-t border-b border-[var(--line)] text-[11px] font-mono text-[var(--chalk-faint)]">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-[var(--amber)]" />
            {formatComplexity(question.time_complexity)}
          </span>
          <span className="opacity-30">·</span>
          <span className="flex items-center gap-1">
            <Cpu className="w-3 h-3 text-[var(--teal)]" />
            {formatComplexity(question.space_complexity)}
          </span>
        </div>

        {/* Status + actions */}
        <div className="flex items-center justify-between gap-2">
          <select
            value={question.status || 'to_learn'}
            onChange={(e) => { e.stopPropagation(); onStatusChange(question.id, e.target.value); }}
            className={`text-[11px] font-mono bg-transparent focus:outline-none cursor-pointer transition ${
              question.status === 'mastered'    ? 'text-[var(--easy)]' :
              question.status === 'in_progress' ? 'text-[var(--amber)]' : 'text-[var(--chalk-faint)]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <option value="to_learn"    className="bg-[#171f22] text-[var(--chalk-dim)]">To learn</option>
            <option value="in_progress" className="bg-[#171f22] text-[var(--amber)]">In progress</option>
            <option value="mastered"    className="bg-[#171f22] text-[var(--easy)]">Mastered</option>
          </select>

          <div className="flex items-center gap-1.5">
            {question.leetcode_url && (
              <a
                href={question.leetcode_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 text-[var(--chalk-faint)] hover:text-[var(--chalk)] transition"
                title="Open on LeetCode"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={() => { sound.playStep(520); onOpen(question); }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] bg-[var(--board-raised-2)] hover:bg-[var(--board-hover)] text-[var(--chalk)] text-[11px] font-mono border border-[var(--line)] hover:border-[var(--amber)] transition cursor-pointer"
            >
              <Play className="w-3 h-3 text-[var(--amber)] fill-current" />
              Open
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
