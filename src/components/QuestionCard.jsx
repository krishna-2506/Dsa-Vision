import React from 'react';
import { Star, ExternalLink, Play, Clock, Cpu, Sparkles } from 'lucide-react';
import { sound } from '../services/audio';
import { visualizersRegistry } from '../visualizers';

function formatComplexity(text, maxChars = 28) {
  if (!text) return 'O(1)';
  let cleaned = String(text).replace(/^[-:=*#\s]+/, '').replace(/[*\/#\s]+$/, '').trim();
  cleaned = cleaned.replace(/^(?:time|space)\s*complexity\s*[:=-]\s*/i, '').replace(/^(?:time|space)\s*[:=-]\s*/i, '').trim();
  if (cleaned.length <= maxChars) return cleaned;
  return cleaned.slice(0, maxChars).trim() + '...';
}

export default function QuestionCard({
  question,
  onOpen,
  onToggleFavorite,
  onStatusChange,
  isFeatured = false,
  activeTag = null,
  onSelectTag
}) {
  const hasVisualizer = Boolean(visualizersRegistry[question.component_key || question.componentKey]);

  const getDifficultyBadge = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'easy':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'medium':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'hard':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      default:
        return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30';
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case 'mastered':
        return { dot: 'bg-emerald-400', text: 'Mastered' };
      case 'in_progress':
        return { dot: 'bg-amber-400', text: 'In Progress' };
      default:
        return { dot: 'bg-slate-500', text: 'To Learn' };
    }
  };

  const statusInfo = getStatusDot(question.status);

  return (
    <div
      className={`group relative bg-[#0e111a] border border-white/[0.08] hover:border-white/20 rounded-xl transition-all duration-200 flex flex-col justify-between ${
        isFeatured
          ? 'p-6 md:p-8 bg-gradient-to-br from-[#0e111a] via-[#111422] to-[#0e111a] border-indigo-500/30 shadow-2xl'
          : 'p-5 shadow-xl'
      }`}
    >
      <div>
        {/* Top meta row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            {question.display_id ? (
              <span className="font-mono text-xs font-bold text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded-[4px] border border-indigo-500/20">
                #{question.display_id}
              </span>
            ) : question.leetcode_id ? (
              <span className="font-mono text-xs font-bold text-slate-300 bg-white/5 px-2 py-0.5 rounded-[4px] border border-white/10">
                #{question.leetcode_id}
              </span>
            ) : null}

            {question.leetcode_id && question.display_id && question.leetcode_id !== question.display_id && (
              <span className="font-mono text-[10px] text-slate-400 bg-white/5 px-1.5 py-0.5 rounded-[4px] border border-white/10" title="LeetCode Problem ID">
                LC #{question.leetcode_id}
              </span>
            )}

            {/* Rectangular solid chip (not rounded-full) */}
            <span
              className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px] border ${getDifficultyBadge(
                question.difficulty
              )}`}
            >
              {question.difficulty}
            </span>

            {/* Visualizer Status */}
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded-[4px] border ${
                hasVisualizer
                  ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                  : 'text-slate-500 bg-white/[0.02] border-white/5'
              }`}
            >
              {hasVisualizer ? '● Visualizer' : '○ Upload Ready'}
            </span>

            <span className="text-[11px] font-mono text-slate-400 truncate max-w-[120px]">
              {question.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isFeatured && (
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-[4px] border border-indigo-500/30">
                Featured Algorithm
              </span>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                sound.playStep(700);
                onToggleFavorite(question.id);
              }}
              className={`p-1 rounded transition ${
                question.is_favorite
                  ? 'text-amber-400 hover:text-amber-300'
                  : 'text-slate-600 hover:text-slate-400'
              }`}
              title={question.is_favorite ? 'Favorited' : 'Bookmark'}
            >
              <Star className={`w-3.5 h-3.5 ${question.is_favorite ? 'fill-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3
          onClick={() => onOpen(question)}
          className={`font-mono font-bold text-white group-hover:text-indigo-400 transition-colors cursor-pointer mb-2 ${
            isFeatured ? 'text-lg sm:text-xl' : 'text-base line-clamp-1'
          }`}
          title={question.title}
        >
          {question.title}
        </h3>

        {/* Description */}
        <p className={`text-xs text-slate-400 leading-relaxed mb-3 ${isFeatured ? 'line-clamp-3' : 'line-clamp-2'}`}>
          {question.description}
        </p>

        {/* Clickable Tags */}
        {question.tags && question.tags.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap mb-3.5">
            {question.tags.slice(0, 3).map((tag) => (
              <button
                key={tag}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectTag && onSelectTag(tag);
                }}
                className={`text-[10px] font-mono px-2 py-0.5 rounded-[4px] border transition cursor-pointer ${
                  activeTag === tag
                    ? 'bg-indigo-600 text-white border-indigo-500 font-bold shadow-sm'
                    : 'bg-white/[0.03] hover:bg-indigo-500/15 text-slate-400 hover:text-indigo-300 border-white/5 hover:border-indigo-500/30'
                }`}
                title={`Filter library by #${tag}`}
              >
                #{tag}
              </button>
            ))}
            {question.tags.length > 3 && (
              <span className="text-[10px] font-mono text-slate-500">
                +{question.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      <div>
        {/* Complexity HUD - Separate lines with clean ellipsis */}
        <div className="space-y-1.5 py-2 px-3 rounded-lg bg-[#08090e] border border-white/5 mb-3 text-[11px] font-mono">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-slate-400 min-w-0 flex-1">
              <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="text-slate-400 shrink-0">Time:</span>
              <span className="text-slate-200 font-semibold truncate" title={question.time_complexity}>
                {formatComplexity(question.time_complexity, 28)}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 border-t border-white/5 pt-1">
            <div className="flex items-center gap-1.5 text-slate-400 min-w-0 flex-1">
              <Cpu className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="text-slate-400 shrink-0">Space:</span>
              <span className="text-slate-200 font-semibold truncate" title={question.space_complexity}>
                {formatComplexity(question.space_complexity, 28)}
              </span>
            </div>
          </div>
        </div>

        {/* Status indicator & Actions */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/5">
          {/* Subtle status dot + clean inline text selector */}
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${statusInfo.dot}`}></span>
            <select
              value={question.status || 'to_learn'}
              onChange={(e) => onStatusChange(question.id, e.target.value)}
              className="text-[11px] font-mono bg-transparent text-slate-300 focus:outline-none cursor-pointer hover:text-white"
            >
              <option value="to_learn" className="bg-[#0e111a] text-slate-300">To Learn</option>
              <option value="in_progress" className="bg-[#0e111a] text-amber-300">In Progress</option>
              <option value="mastered" className="bg-[#0e111a] text-emerald-300">Mastered</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            {question.leetcode_url && (
              <a
                href={question.leetcode_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded text-slate-400 hover:text-amber-400 hover:bg-white/5 transition"
                title="View on LeetCode"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={() => {
                sound.playStep(520);
                onOpen(question);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-medium shadow-sm transition"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Launch Studio</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
