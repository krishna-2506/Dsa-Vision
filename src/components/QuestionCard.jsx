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
  easy:   'bg-emerald-400',
  medium: 'bg-amber-400',
  hard:   'bg-rose-400',
};
const DIFF_TEXT = {
  easy:   'text-emerald-400',
  medium: 'text-amber-400',
  hard:   'text-rose-400',
};

const STATUS_RING = {
  mastered:    'border-emerald-500/60 bg-emerald-500/10',
  in_progress: 'border-amber-500/50  bg-amber-500/10',
  to_learn:    'border-white/[0.06]  bg-transparent',
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
  const diff  = (question.difficulty || '').toLowerCase();
  const tags  = Array.isArray(question.tags) ? question.tags : [];

  return (
    <div
      className={`card group flex flex-col justify-between p-4 hover:shadow-lg transition-all duration-200 ${STATUS_RING[question.status] || STATUS_RING.to_learn}`}
    >
      {/* Top row */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2 min-w-0">
            {/* Difficulty dot */}
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${DIFF_DOT[diff] || 'bg-slate-500'}`}
              title={question.difficulty}
            />
            {/* ID */}
            <span className="font-mono text-[11px] text-slate-500 shrink-0">
              {question.display_id || (question.leetcode_id ? `LC-${question.leetcode_id}` : '—')}
            </span>
            {/* Category */}
            <span className="font-mono text-[11px] text-slate-600 truncate">
              {(question.category || '').replace(/^\d+\.\s*/, '')}
            </span>
          </div>

          {/* Favorite + visualizer dot */}
          <div className="flex items-center gap-1.5 shrink-0">
            {hasVisualizer && (
              <span
                className="w-1.5 h-1.5 rounded-full bg-indigo-400"
                title="Has visualizer"
              />
            )}
            <button
              onClick={(e) => { e.stopPropagation(); sound.playStep(700); onToggleFavorite(question.id); }}
              className={`transition ${question.is_favorite ? 'text-amber-400' : 'text-slate-700 hover:text-slate-400'}`}
              title={question.is_favorite ? 'Saved' : 'Save'}
            >
              <Star className={`w-3.5 h-3.5 ${question.is_favorite ? 'fill-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3
          onClick={() => onOpen(question)}
          className="font-mono font-semibold text-[14px] text-white group-hover:text-indigo-300 transition-colors cursor-pointer leading-snug mb-2 line-clamp-2"
        >
          {question.title}
        </h3>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap mb-3">
            {tags.slice(0, 2).map((tag) => (
              <button
                key={tag}
                onClick={(e) => { e.stopPropagation(); onSelectTag && onSelectTag(tag); }}
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded transition ${
                  activeTag === tag
                    ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-600 hover:text-slate-400 border border-white/[0.05] hover:border-white/10'
                }`}
              >
                #{tag}
              </button>
            ))}
            {tags.length > 2 && (
              <span className="text-[10px] font-mono text-slate-700">+{tags.length - 2}</span>
            )}
          </div>
        )}
      </div>

      {/* Bottom */}
      <div>
        {/* Complexity */}
        <div className="flex items-center gap-3 py-2 mb-3 border-t border-b border-white/[0.05] text-[11px] font-mono text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-indigo-500" />
            {formatComplexity(question.time_complexity)}
          </span>
          <span className="text-white/10">·</span>
          <span className="flex items-center gap-1">
            <Cpu className="w-3 h-3 text-indigo-500" />
            {formatComplexity(question.space_complexity)}
          </span>
        </div>

        {/* Status + actions */}
        <div className="flex items-center justify-between gap-2">
          <select
            value={question.status || 'to_learn'}
            onChange={(e) => { e.stopPropagation(); onStatusChange(question.id, e.target.value); }}
            className={`text-[11px] font-mono bg-transparent focus:outline-none cursor-pointer transition ${
              question.status === 'mastered'    ? 'text-emerald-400' :
              question.status === 'in_progress' ? 'text-amber-400'   : 'text-slate-500'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <option value="to_learn"    className="bg-[#0d0f18] text-slate-300">To learn</option>
            <option value="in_progress" className="bg-[#0d0f18] text-amber-300">In progress</option>
            <option value="mastered"    className="bg-[#0d0f18] text-emerald-300">Mastered</option>
          </select>

          <div className="flex items-center gap-1.5">
            {question.leetcode_url && (
              <a
                href={question.leetcode_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 text-slate-600 hover:text-slate-400 transition"
                title="Open on LeetCode"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={() => { sound.playStep(520); onOpen(question); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-mono font-semibold transition shadow-sm shadow-indigo-900/40"
            >
              <Play className="w-3 h-3 fill-current" />
              Open
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
