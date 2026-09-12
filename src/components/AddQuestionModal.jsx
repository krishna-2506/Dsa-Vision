import React, { useState } from 'react';
import { X, Download, Upload, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { db, CATEGORIES } from '../services/db';
import { getAllVisualizerKeys } from '../visualizers';

export default function AddQuestionModal({ isOpen, onClose, onQuestionAdded }) {
  const availableKeys = getAllVisualizerKeys();

  const [tab, setTab] = useState('add'); // 'add' | 'backup'
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Linked Lists');
  const [difficulty, setDifficulty] = useState('Medium');
  const [componentKey, setComponentKey] = useState(availableKeys[0] || '');
  const [description, setDescription] = useState('');
  const [leetCodeUrl, setLeetCodeUrl] = useState('');
  const [timeComplexity, setTimeComplexity] = useState('O(N)');
  const [spaceComplexity, setSpaceComplexity] = useState('O(1)');

  const [statusMsg, setStatusMsg] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newQuestion = {
      title,
      category,
      difficulty,
      componentKey: componentKey || title.replace(/[^a-zA-Z0-9]/g, ''),
      description,
      leetCodeUrl,
      timeComplexity,
      spaceComplexity,
      tags: [category, difficulty]
    };

    const created = db.addQuestion(newQuestion);
    onQuestionAdded(created);
    onClose();
  };

  const handleExport = () => {
    const jsonStr = db.exportJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `algovision_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setStatusMsg({ type: 'success', text: 'Backup downloaded successfully!' });
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target.result;
      const res = db.importJSON(content);
      if (res.success) {
        setStatusMsg({ type: 'success', text: `Imported ${res.count} questions!` });
        onQuestionAdded();
      } else {
        setStatusMsg({ type: 'error', text: res.error });
      }
    };
    reader.readAsText(file);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset questions back to starter defaults? Your custom questions will be overwritten.')) {
      db.resetDefaults();
      setStatusMsg({ type: 'success', text: 'Reset to starter questions!' });
      onQuestionAdded();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTab('add')}
              className={`text-sm font-bold pb-1 border-b-2 transition ${
                tab === 'add'
                  ? 'text-blue-400 border-blue-500'
                  : 'text-slate-400 border-transparent hover:text-white'
              }`}
            >
              Add Question
            </button>
            <button
              onClick={() => setTab('backup')}
              className={`text-sm font-bold pb-1 border-b-2 transition ${
                tab === 'backup'
                  ? 'text-blue-400 border-blue-500'
                  : 'text-slate-400 border-transparent hover:text-white'
              }`}
            >
              Database Backup & Restore
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {statusMsg && (
          <div className={`px-6 py-2.5 text-xs flex items-center gap-2 ${
            statusMsg.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border-b border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-b border-rose-500/20'
          }`}>
            {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {tab === 'add' ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Question Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Invert Binary Tree"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  {CATEGORIES.filter(c => c !== 'All').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Attached Component Key
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={componentKey}
                  onChange={(e) => setComponentKey(e.target.value)}
                  placeholder="e.g. DoublyLinkedList or new filename"
                  className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                />
                {availableKeys.length > 0 && (
                  <select
                    onChange={(e) => setComponentKey(e.target.value)}
                    value=""
                    className="px-2.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-300"
                  >
                    <option value="" disabled>Choose existing</option>
                    {availableKeys.map(k => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                )}
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Matches the filename in <code className="text-slate-400">src/visualizers/[Key].jsx</code>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Time Complexity</label>
                <input
                  type="text"
                  value={timeComplexity}
                  onChange={(e) => setTimeComplexity(e.target.value)}
                  placeholder="e.g. O(N)"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Space Complexity</label>
                <input
                  type="text"
                  value={spaceComplexity}
                  onChange={(e) => setSpaceComplexity(e.target.value)}
                  placeholder="e.g. O(1)"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">LeetCode / Problem URL</label>
              <input
                type="url"
                value={leetCodeUrl}
                onChange={(e) => setLeetCodeUrl(e.target.value)}
                placeholder="https://leetcode.com/problems/..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Summary / Approach</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Key idea, algorithmic technique, or edge cases..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/25 transition"
              >
                Save to Library
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6 space-y-6">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-white">Export Library Backup</h4>
                <p className="text-xs text-slate-400">Download your questions, tags, mastery statuses, and notes as a JSON file.</p>
              </div>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
              >
                <Download className="w-4 h-4 text-blue-400" />
                Export JSON
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-white">Restore / Import Backup</h4>
                <p className="text-xs text-slate-400">Load questions from a previously exported JSON backup file.</p>
              </div>
              <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition cursor-pointer">
                <Upload className="w-4 h-4 text-emerald-400" />
                Import JSON
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/30 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-rose-300">Reset to Defaults</h4>
                <p className="text-xs text-rose-400/80">Restore the initial curated suite of starter visualizers.</p>
              </div>
              <button
                onClick={handleResetDefaults}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-900/30 hover:bg-rose-900/50 text-rose-300 text-xs font-semibold border border-rose-700/50 transition"
              >
                <RefreshCw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
