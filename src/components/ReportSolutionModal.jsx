import React, { useState } from 'react';
import { Flag, X, AlertCircle, CheckCircle2, Send, Code2, Layers } from 'lucide-react';
import { api } from '../services/api';
import { sound } from '../services/audio';

const REPORT_TYPES = [
  { id: 'incorrect_code', label: 'Incorrect Code / Fails Test Cases' },
  { id: 'wrong_complexity', label: 'Wrong Time or Space Complexity' },
  { id: 'broken_animation', label: 'Visualizer Animation / Stepping Bug' },
  { id: 'missing_edge_case', label: 'Missing Edge Case (Negative, Zero, Duplicates)' },
  { id: 'typo_explanation', label: 'Typo or Unclear Explanation' },
  { id: 'other', label: 'Other Issue or Enhancement' }
];

export default function ReportSolutionModal({
  isOpen,
  onClose,
  question,
  activeLanguage = 'cpp',
  activeTier = 'optimal',
  currentUser
}) {
  const [reportType, setReportType] = useState('incorrect_code');
  const [details, setDetails] = useState('');
  const [suggestedFix, setSuggestedFix] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  if (!isOpen || !question) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!details.trim()) {
      setStatusMsg({ type: 'error', text: 'Please provide details about the issue.' });
      return;
    }

    setIsSubmitting(true);
    setStatusMsg(null);

    const res = await api.submitReport({
      question_id: question.id,
      user_id: currentUser?.id || 'usr_guest',
      username: currentUser?.username || 'Guest Learner',
      language: activeLanguage,
      approach_tier: activeTier,
      report_type: reportType,
      details: details.trim(),
      suggested_fix: suggestedFix.trim() || null
    });

    setIsSubmitting(false);

    if (res.success) {
      sound?.playSuccess?.();
      setStatusMsg({ type: 'success', text: 'Report submitted! Thank you for improving AlgoVision.' });
      setTimeout(() => {
        onClose();
        setDetails('');
        setSuggestedFix('');
        setStatusMsg(null);
      }, 1500);
    } else {
      setStatusMsg({ type: 'error', text: res.error || 'Failed to submit report.' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0e111a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0a0c12] border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <Flag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-mono font-bold text-white">Report Solution / Visualizer Issue</h3>
              <p className="text-[11px] font-mono text-slate-400">
                Help us keep algorithmic solutions 100% bug-free
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 font-mono text-xs">
          {/* Context pill */}
          <div className="p-3 rounded-xl bg-[#08090e] border border-white/5 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-semibold">{question.display_id || 'Problem'}: {question.title}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 uppercase">
                {activeLanguage.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <Layers className="w-3 h-3 text-amber-400" />
                Approach Tier: <strong className="text-slate-300 capitalize">{activeTier}</strong>
              </span>
            </div>
          </div>

          {/* Issue Type */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-medium flex items-center gap-1">
              <span>Issue Type</span>
              <span className="text-rose-400">*</span>
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 bg-[#08090e] border border-white/10 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 text-xs"
            >
              {REPORT_TYPES.map((t) => (
                <option key={t.id} value={t.id} className="bg-[#0e111a]">
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Details */}
          <div className="space-y-1.5">
            <label className="text-slate-300 font-medium flex items-center gap-1">
              <span>Problem Details</span>
              <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows={4}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe specifically what is wrong (e.g., 'In line 14 the while loop doesn't check start <= end causing index overflow when...')"
              className="w-full p-3 bg-[#08090e] border border-white/10 rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 leading-relaxed text-xs resize-y"
            />
          </div>

          {/* Suggested Fix (Optional) */}
          <div className="space-y-1.5">
            <label className="text-slate-400 font-medium flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Suggested Code or Solution Fix (Optional)</span>
            </label>
            <textarea
              rows={3}
              value={suggestedFix}
              onChange={(e) => setSuggestedFix(e.target.value)}
              placeholder="Paste your corrected code or suggestion here..."
              className="w-full p-3 bg-[#08090e] border border-white/10 rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 leading-relaxed text-xs resize-y"
            />
          </div>

          {statusMsg && (
            <div
              className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
                statusMsg.type === 'success'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}
            >
              {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              <span>{statusMsg.text}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !details.trim()}
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white text-xs font-mono font-bold shadow-lg shadow-rose-950/40 transition"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Submitting...' : 'Submit Report'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
