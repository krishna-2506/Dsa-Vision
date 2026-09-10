import React, { useState, useEffect } from 'react';
import {
  Shield,
  X,
  Plus,
  Trash2,
  Edit,
  Search,
  Check,
  AlertCircle,
  CheckCircle2,
  FileCode,
  Download,
  Upload,
  RefreshCw,
  ExternalLink,
  Layers,
  Flag,
  Database,
  Sliders,
  Code2,
  BookOpen,
  Filter
} from 'lucide-react';
import { api } from '../services/api';
import { sound } from '../services/audio';

export default function AdminPanelModal({
  isOpen,
  onClose,
  onQuestionsUpdated,
  onNavigateQuestion
}) {
  const [activeTab, setActiveTab] = useState('questions'); // 'questions' | 'visualizers' | 'reports' | 'database' | 'solutions'
  const [questions, setQuestions] = useState([]);
  const [adminStats, setAdminStats] = useState(null);
  const [diskFiles, setDiskFiles] = useState([]);
  const [reports, setReports] = useState([]);
  const [reportFilter, setReportFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [visFilter, setVisFilter] = useState('all'); // 'all' | 'has_vis' | 'missing_vis'

  // Edit / Add Question Form State
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [formQuestion, setFormQuestion] = useState({
    title: '',
    display_id: '',
    category: '1. Arrays',
    difficulty: 'Easy',
    time_complexity: 'O(N)',
    space_complexity: 'O(1)',
    description: '',
    approach: '',
    component_key: '',
    tags: []
  });

  // Code Inspector / Editor State
  const [inspectedFile, setInspectedFile] = useState(null);
  const [inspectedCode, setInspectedCode] = useState('');
  const [isSavingCode, setIsSavingCode] = useState(false);

  // Status Notification
  const [statusMsg, setStatusMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load Admin Data
  const loadAdminData = async () => {
    setLoading(true);
    const [qList, stats, files, repList] = await Promise.all([
      api.getQuestions(),
      api.getAdminStats(),
      api.getAdminVisualizers(),
      api.getReports(reportFilter === 'all' ? null : reportFilter)
    ]);
    if (qList) setQuestions(qList);
    if (stats) setAdminStats(stats);
    if (files) setDiskFiles(files);
    if (repList) setReports(repList);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadAdminData();
    }
  }, [isOpen, reportFilter]);

  if (!isOpen) return null;

  // Filter questions for Question Hub
  const filteredQuestions = questions.filter((q) => {
    if (searchQuery.trim()) {
      const s = searchQuery.toLowerCase();
      const matchTitle = q.title?.toLowerCase().includes(s);
      const matchId = q.display_id?.toLowerCase().includes(s) || q.id?.toLowerCase().includes(s);
      const matchCat = q.category?.toLowerCase().includes(s);
      if (!matchTitle && !matchId && !matchCat) return false;
    }
    if (categoryFilter !== 'all' && q.category !== categoryFilter) return false;
    if (difficultyFilter !== 'all' && q.difficulty !== difficultyFilter) return false;
    if (visFilter === 'has_vis') {
      const hasFile = diskFiles.includes(`${q.component_key}.jsx`) || diskFiles.includes(`${q.component_key}.js`);
      if (!hasFile) return false;
    }
    if (visFilter === 'missing_vis') {
      const hasFile = diskFiles.includes(`${q.component_key}.jsx`) || diskFiles.includes(`${q.component_key}.js`);
      if (hasFile) return false;
    }
    return true;
  });

  const categories = Array.from(new Set(questions.map((q) => q.category))).filter(Boolean);

  // Handle Delete Question
  const handleDeleteQuestion = async (id, title) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${title}" (${id})? This cascades to all solutions and notes.`)) {
      return;
    }
    sound?.playStep?.(400);
    const res = await api.deleteQuestion(id);
    if (res.success) {
      setStatusMsg({ type: 'success', text: `Deleted question "${title}".` });
      setQuestions((prev) => prev.filter((q) => q.id !== id));
      if (onQuestionsUpdated) onQuestionsUpdated();
    } else {
      setStatusMsg({ type: 'error', text: res.error || 'Failed to delete question.' });
    }
  };

  // Handle Save (Add or Edit) Question
  const handleSaveQuestion = async (e) => {
    e.preventDefault();
    if (!formQuestion.title.trim()) {
      setStatusMsg({ type: 'error', text: 'Problem title is required.' });
      return;
    }

    sound?.playSuccess?.();
    if (editingQuestion) {
      // Update existing
      const res = await api.updateQuestion(editingQuestion.id, {
        title: formQuestion.title,
        display_id: formQuestion.display_id,
        category: formQuestion.category,
        difficulty: formQuestion.difficulty,
        time_complexity: formQuestion.time_complexity,
        space_complexity: formQuestion.space_complexity,
        description: formQuestion.description,
        approach: formQuestion.approach,
        component_key: formQuestion.component_key || editingQuestion.component_key,
        tags: Array.isArray(formQuestion.tags) ? formQuestion.tags : []
      });
      if (res) {
        setStatusMsg({ type: 'success', text: `Updated question "${formQuestion.title}".` });
        setEditingQuestion(null);
        loadAdminData();
        if (onQuestionsUpdated) onQuestionsUpdated();
      }
    } else {
      // Add new question
      const res = await api.addQuestion({
        ...formQuestion,
        id: formQuestion.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      });
      if (res) {
        setStatusMsg({ type: 'success', text: `Added new question "${formQuestion.title}".` });
        setIsAddingQuestion(false);
        loadAdminData();
        if (onQuestionsUpdated) onQuestionsUpdated();
      }
    }
  };

  // Handle Export DB Dump
  const handleExportDatabase = async () => {
    sound?.playSuccess?.();
    const dump = await api.exportDatabaseDump();
    if (dump) {
      const blob = new Blob([JSON.stringify(dump, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `algovision_database_backup_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setStatusMsg({ type: 'success', text: 'Database exported successfully.' });
    }
  };

  // Handle Import DB Dump
  const handleImportDatabase = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const json = JSON.parse(evt.target.result);
        const res = await api.importDatabaseDump(json);
        if (res.success) {
          sound?.playSuccess?.();
          setStatusMsg({
            type: 'success',
            text: `Restored ${res.importedQuestions} questions and ${res.importedSolutions} solutions!`
          });
          loadAdminData();
          if (onQuestionsUpdated) onQuestionsUpdated();
        } else {
          setStatusMsg({ type: 'error', text: res.error || 'Failed to restore dump.' });
        }
      } catch (err) {
        setStatusMsg({ type: 'error', text: 'Invalid JSON file.' });
      }
    };
    reader.readAsText(file);
  };

  // Handle Auto-Link
  const handleAutoLink = async () => {
    sound?.playStep?.(600);
    const res = await api.autolinkVisualizers();
    if (res.success) {
      sound?.playSuccess?.();
      setStatusMsg({ type: 'success', text: `Auto-linked ${res.linkedCount} visualizers to problems!` });
      loadAdminData();
      if (onQuestionsUpdated) onQuestionsUpdated();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-6xl bg-[#0b0d14] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[90vh]">
        
        {/* Header Bar */}
        <div className="px-6 py-3.5 bg-[#0e111a] border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold font-mono text-white">AlgoVision Studio Admin & Database Center</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  Pro Engine v2.0
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400">
                CRUD Questions • Manage SQLite DB • Inspect Visualizer Bindings • Review User Reports
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition"
            title="Close Admin Panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-2 bg-[#0a0c12] border-b border-white/5 flex items-center justify-between overflow-x-auto">
          <div className="flex items-center gap-1 font-mono text-xs">
            <button
              onClick={() => setActiveTab('questions')}
              className={`px-3.5 py-2 rounded-t-lg transition flex items-center gap-1.5 border-b-2 ${
                activeTab === 'questions'
                  ? 'border-indigo-500 text-indigo-300 font-bold bg-white/[0.03]'
                  : 'border-transparent text-slate-400 hover:text-white hover:bg-white/[0.01]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Questions Hub ({questions.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('visualizers')}
              className={`px-3.5 py-2 rounded-t-lg transition flex items-center gap-1.5 border-b-2 ${
                activeTab === 'visualizers'
                  ? 'border-indigo-500 text-indigo-300 font-bold bg-white/[0.03]'
                  : 'border-transparent text-slate-400 hover:text-white hover:bg-white/[0.01]'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Visualizer Manager ({diskFiles.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`px-3.5 py-2 rounded-t-lg transition flex items-center gap-1.5 border-b-2 ${
                activeTab === 'reports'
                  ? 'border-indigo-500 text-indigo-300 font-bold bg-white/[0.03]'
                  : 'border-transparent text-slate-400 hover:text-white hover:bg-white/[0.01]'
              }`}
            >
              <Flag className="w-3.5 h-3.5" />
              <span>Issue Reports</span>
              {adminStats?.pendingReports > 0 && (
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center ml-1">
                  {adminStats.pendingReports}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('database')}
              className={`px-3.5 py-2 rounded-t-lg transition flex items-center gap-1.5 border-b-2 ${
                activeTab === 'database'
                  ? 'border-indigo-500 text-indigo-300 font-bold bg-white/[0.03]'
                  : 'border-transparent text-slate-400 hover:text-white hover:bg-white/[0.01]'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Database Operations</span>
            </button>
          </div>

          {/* Refresh button */}
          <button
            onClick={loadAdminData}
            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-white/5 text-xs font-mono flex items-center gap-1"
            title="Refresh data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Sync</span>
          </button>
        </div>

        {/* Global Alert Notification */}
        {statusMsg && (
          <div
            className={`px-6 py-2.5 text-xs font-mono flex items-center justify-between border-b ${
              statusMsg.type === 'success'
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                : 'bg-rose-500/10 text-rose-300 border-rose-500/20'
            }`}
          >
            <div className="flex items-center gap-2">
              {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              <span>{statusMsg.text}</span>
            </div>
            <button onClick={() => setStatusMsg(null)} className="text-slate-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* ── TAB 1: QUESTIONS HUB ── */}
        {activeTab === 'questions' && (
          <div className="flex-1 overflow-hidden flex flex-col p-6 space-y-4">
            {/* Filter & Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
              <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[280px]">
                {/* Search */}
                <div className="flex items-center gap-1.5 bg-[#08090e] border border-white/10 rounded-lg px-3 py-1.5 flex-1 max-w-xs">
                  <Search className="w-3.5 h-3.5 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title, ID, tag..."
                    className="bg-transparent text-slate-200 focus:outline-none placeholder-slate-600 w-full text-xs"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="text-slate-500 hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Category filter */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-[#08090e] border border-white/10 rounded-lg px-2.5 py-1.5 text-slate-300 focus:outline-none text-xs"
                >
                  <option value="all">All Categories</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                {/* Difficulty filter */}
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="bg-[#08090e] border border-white/10 rounded-lg px-2.5 py-1.5 text-slate-300 focus:outline-none text-xs"
                >
                  <option value="all">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>

                {/* Visualizer file filter */}
                <select
                  value={visFilter}
                  onChange={(e) => setVisFilter(e.target.value)}
                  className="bg-[#08090e] border border-white/10 rounded-lg px-2.5 py-1.5 text-slate-300 focus:outline-none text-xs"
                >
                  <option value="all">All Visualizer Status</option>
                  <option value="has_vis">🟢 Has Visualizer File</option>
                  <option value="missing_vis">🟡 Missing Visualizer</option>
                </select>
              </div>

              {/* Add Question Button */}
              <button
                onClick={() => {
                  setEditingQuestion(null);
                  setFormQuestion({
                    title: '',
                    display_id: `Q-${String(questions.length + 1).padStart(3, '0')}`,
                    category: '1. Arrays',
                    difficulty: 'Easy',
                    time_complexity: 'O(N)',
                    space_complexity: 'O(1)',
                    description: '',
                    approach: '',
                    component_key: '',
                    tags: []
                  });
                  setIsAddingQuestion(true);
                }}
                className="btn-primary gap-1.5 shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Add Question</span>
              </button>
            </div>

            {/* Questions Table */}
            <div className="flex-1 overflow-auto rounded-xl border border-white/10 bg-[#08090e]">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead className="bg-[#0e111a] border-b border-white/5 sticky top-0 z-10 text-slate-400">
                  <tr>
                    <th className="p-3 w-16">ID</th>
                    <th className="p-3">Title</th>
                    <th className="p-3 w-36">Category</th>
                    <th className="p-3 w-24">Difficulty</th>
                    <th className="p-3 w-48">Bound Visualizer</th>
                    <th className="p-3 w-28 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {filteredQuestions.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-500">
                        No questions matching the active filter.
                      </td>
                    </tr>
                  ) : (
                    filteredQuestions.map((q) => {
                      const hasFile = diskFiles.includes(`${q.component_key}.jsx`) || diskFiles.includes(`${q.component_key}.js`);
                      return (
                        <tr key={q.id} className="hover:bg-white/[0.02] transition">
                          <td className="p-3 font-bold text-indigo-400">{q.display_id || '—'}</td>
                          <td className="p-3 font-sans">
                            <div className="font-medium text-slate-100">{q.title}</div>
                            <div className="text-[11px] font-mono text-slate-500 truncate max-w-md">
                              {q.time_complexity} • {q.space_complexity}
                            </div>
                          </td>
                          <td className="p-3 text-slate-400 truncate max-w-[140px]">{q.category}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                q.difficulty === 'Easy'
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                  : q.difficulty === 'Medium'
                                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                              }`}
                            >
                              {q.difficulty}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`w-2 h-2 rounded-full shrink-0 ${
                                  hasFile ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]' : 'bg-amber-400'
                                }`}
                                title={hasFile ? 'File exists on disk' : 'Missing visualizer file'}
                              />
                              <span className="font-mono text-[11px] text-slate-300 truncate max-w-[170px]">
                                {q.component_key || '—'}
                              </span>
                            </div>
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => {
                                  if (onNavigateQuestion) {
                                    onNavigateQuestion(q);
                                    onClose();
                                  }
                                }}
                                className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-indigo-300 transition"
                                title="Open in Studio"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  setEditingQuestion(q);
                                  setFormQuestion({
                                    title: q.title || '',
                                    display_id: q.display_id || '',
                                    category: q.category || '1. Arrays',
                                    difficulty: q.difficulty || 'Easy',
                                    time_complexity: q.time_complexity || 'O(N)',
                                    space_complexity: q.space_complexity || 'O(1)',
                                    description: q.description || '',
                                    approach: q.approach || '',
                                    component_key: q.component_key || '',
                                    tags: q.tags || []
                                  });
                                  setIsAddingQuestion(true);
                                }}
                                className="p-1.5 rounded hover:bg-white/10 text-slate-400 hover:text-amber-300 transition"
                                title="Edit Question"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteQuestion(q.id, q.title)}
                                className="p-1.5 rounded hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition"
                                title="Delete Question"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB 2: VISUALIZER MANAGER ── */}
        {activeTab === 'visualizers' && (
          <div className="flex-1 overflow-hidden flex flex-col p-6 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Visualizer Components on Disk</h3>
                <p className="text-[11px] text-slate-400">
                  Scanned from <code className="text-indigo-300">src/visualizers/*.jsx</code>. Registered automatically via Vite.
                </p>
              </div>
              <button onClick={handleAutoLink} className="btn-secondary gap-1.5">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Auto-Link Files to Problems</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto flex-1">
              {diskFiles.map((file) => {
                const key = file.replace(/\.(jsx|js)$/, '');
                const boundQuestion = questions.find((q) => q.component_key === key);

                return (
                  <div
                    key={file}
                    className="p-4 rounded-xl bg-[#08090e] border border-white/10 hover:border-indigo-500/40 transition flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-100 flex items-center gap-1.5">
                          <FileCode className="w-4 h-4 text-indigo-400" />
                          {file}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Active
                        </span>
                      </div>
                      <div className="mt-2 text-[11px] text-slate-400">
                        {boundQuestion ? (
                          <span>
                            Bound to:{' '}
                            <strong className="text-indigo-300">
                              {boundQuestion.display_id} {boundQuestion.title}
                            </strong>
                          </span>
                        ) : (
                          <span className="text-amber-400 italic">Unbound / Standalone component</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                      {boundQuestion && (
                        <button
                          onClick={() => {
                            if (onNavigateQuestion) {
                              onNavigateQuestion(boundQuestion);
                              onClose();
                            }
                          }}
                          className="flex-1 py-1 px-2.5 rounded bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-center transition"
                        >
                          Open in Studio
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── TAB 3: REPORTS DESK ── */}
        {activeTab === 'reports' && (
          <div className="flex-1 overflow-hidden flex flex-col p-6 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Solution & Animation Bug Reports</h3>
                <p className="text-[11px] text-slate-400">
                  User-reported broken solutions, animation errors, or complexity fixes.
                </p>
              </div>
              <div className="flex items-center gap-1.5 bg-[#08090e] p-1 rounded-lg border border-white/10">
                {['all', 'pending', 'resolved', 'dismissed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setReportFilter(status)}
                    className={`px-3 py-1 rounded text-xs capitalize transition ${
                      reportFilter === status
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-auto rounded-xl border border-white/10 bg-[#08090e]">
              {reports.length === 0 ? (
                <div className="p-12 text-center text-slate-500 space-y-2">
                  <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-400" />
                  <p className="text-sm font-medium text-slate-300">No reports found!</p>
                  <p className="text-xs text-slate-500">Everything is running cleanly.</p>
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {reports.map((r) => (
                    <div key={r.id} className="p-4 space-y-3 hover:bg-white/[0.01] transition">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-indigo-400">
                            {r.question_display_id || 'Q'}: {r.question_title}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10 text-[10px] uppercase">
                            {r.language}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px] capitalize">
                            Tier: {r.approach_tier || 'optimal'}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 text-[10px]">
                            {r.report_type}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              r.status === 'pending'
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                : r.status === 'resolved'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                            }`}
                          >
                            {r.status}
                          </span>
                          <span className="text-slate-500 text-[11px]">{r.created_at?.slice(0, 10)}</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-[#0e111a] border border-white/5 space-y-1.5">
                        <div className="text-slate-300 leading-relaxed font-sans text-xs">
                          <strong>Details:</strong> {r.details}
                        </div>
                        {r.suggested_fix && (
                          <div className="pt-2 border-t border-white/5 text-indigo-300 font-mono text-[11px]">
                            <strong>Suggested Fix:</strong>
                            <pre className="mt-1 p-2 bg-[#06080d] rounded border border-white/5 overflow-x-auto">
                              {r.suggested_fix}
                            </pre>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-slate-500">Reported by: {r.username}</span>
                        <div className="flex items-center gap-1.5">
                          {r.status === 'pending' && (
                            <>
                              <button
                                onClick={async () => {
                                  sound?.playSuccess?.();
                                  await api.updateReportStatus(r.id, 'resolved');
                                  setReports((prev) =>
                                    prev.map((item) => (item.id === r.id ? { ...item, status: 'resolved' } : item))
                                  );
                                }}
                                className="px-2.5 py-1 rounded bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs transition"
                              >
                                Mark Resolved
                              </button>
                              <button
                                onClick={async () => {
                                  await api.updateReportStatus(r.id, 'dismissed');
                                  setReports((prev) =>
                                    prev.map((item) => (item.id === r.id ? { ...item, status: 'dismissed' } : item))
                                  );
                                }}
                                className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 text-xs transition"
                              >
                                Dismiss
                              </button>
                            </>
                          )}
                          <button
                            onClick={async () => {
                              await api.deleteReport(r.id);
                              setReports((prev) => prev.filter((item) => item.id !== r.id));
                            }}
                            className="p-1 rounded text-slate-500 hover:text-rose-400 transition"
                            title="Delete Report"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TAB 4: DATABASE OPERATIONS ── */}
        {activeTab === 'database' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6 font-mono text-xs">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-[#08090e] border border-white/10">
                <span className="text-slate-500 text-[11px]">Total Questions</span>
                <p className="text-2xl font-bold text-white mt-1">{adminStats?.totalQuestions || 0}</p>
              </div>
              <div className="p-4 rounded-xl bg-[#08090e] border border-white/10">
                <span className="text-slate-500 text-[11px]">Total Solutions</span>
                <p className="text-2xl font-bold text-indigo-400 mt-1">{adminStats?.totalSolutions || 0}</p>
              </div>
              <div className="p-4 rounded-xl bg-[#08090e] border border-white/10">
                <span className="text-slate-500 text-[11px]">Visualizers on Disk</span>
                <p className="text-2xl font-bold text-emerald-400 mt-1">{adminStats?.diskVisualizersCount || 0}</p>
              </div>
              <div className="p-4 rounded-xl bg-[#08090e] border border-white/10">
                <span className="text-slate-500 text-[11px]">Pending Reports</span>
                <p className="text-2xl font-bold text-amber-400 mt-1">{adminStats?.pendingReports || 0}</p>
              </div>
            </div>

            {/* Backup & Restore Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1-Click Export */}
              <div className="p-6 rounded-xl bg-[#0e111a] border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-indigo-400 font-bold">
                  <Download className="w-4 h-4" />
                  <span>1-Click JSON Backup Export</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px] font-sans">
                  Export all 370+ problems, multi-language solutions, user notes, discussion comments, and reports as a single portable JSON snapshot.
                </p>
                <button
                  onClick={handleExportDatabase}
                  className="btn-primary w-full justify-center gap-2 mt-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Database (.json)</span>
                </button>
              </div>

              {/* 1-Click Restore */}
              <div className="p-6 rounded-xl bg-[#0e111a] border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <Upload className="w-4 h-4" />
                  <span>Restore or Merge Backup</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px] font-sans">
                  Import a database dump or bulk question list to restore questions and multi-language solutions instantly.
                </p>
                <label className="btn-secondary w-full justify-center gap-2 mt-2 cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span>Select JSON Dump File</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportDatabase}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Architecture & Scaling Notice */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-indigo-950/20 to-purple-950/20 border border-indigo-500/20 space-y-2">
              <div className="flex items-center gap-2 text-indigo-300 font-bold">
                <Shield className="w-4 h-4" />
                <span>Enterprise Local SQLite Architecture</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                AlgoVision Studio uses Node 22 native <code className="text-indigo-300">node:sqlite</code> synchronous database engine (`algovision.sqlite`) with zero external binary driver dependencies. Scales up to 100,000+ problems and millions of solution executions effortlessly.
              </p>
            </div>
          </div>
        )}

        {/* ── MODAL: ADD / EDIT QUESTION FORM ── */}
        {isAddingQuestion && (
          <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-sm p-6 flex items-center justify-center animate-fade-in">
            <div className="w-full max-w-2xl bg-[#0e111a] border border-white/15 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <h3 className="text-sm font-bold text-white">
                  {editingQuestion ? `Edit Question: ${editingQuestion.title}` : 'Add New DSA Question'}
                </h3>
                <button
                  onClick={() => {
                    setIsAddingQuestion(false);
                    setEditingQuestion(null);
                  }}
                  className="p-1 rounded text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveQuestion} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-slate-400">Problem Title *</label>
                    <input
                      type="text"
                      required
                      value={formQuestion.title}
                      onChange={(e) => setFormQuestion({ ...formQuestion, title: e.target.value })}
                      placeholder="e.g. Trapping Rain Water"
                      className="w-full px-3 py-2 rounded-lg bg-[#08090e] border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400">Display ID</label>
                    <input
                      type="text"
                      value={formQuestion.display_id}
                      onChange={(e) => setFormQuestion({ ...formQuestion, display_id: e.target.value })}
                      placeholder="Q-373"
                      className="w-full px-3 py-2 rounded-lg bg-[#08090e] border border-white/10 text-indigo-300 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-400">Category</label>
                    <input
                      type="text"
                      value={formQuestion.category}
                      onChange={(e) => setFormQuestion({ ...formQuestion, category: e.target.value })}
                      placeholder="1. Arrays"
                      className="w-full px-3 py-2 rounded-lg bg-[#08090e] border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400">Difficulty</label>
                    <select
                      value={formQuestion.difficulty}
                      onChange={(e) => setFormQuestion({ ...formQuestion, difficulty: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#08090e] border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400">Visualizer Component Key</label>
                    <input
                      type="text"
                      value={formQuestion.component_key}
                      onChange={(e) => setFormQuestion({ ...formQuestion, component_key: e.target.value })}
                      placeholder="e.g. TwoSumVisualizer"
                      className="w-full px-3 py-2 rounded-lg bg-[#08090e] border border-white/10 text-indigo-300 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-400">Time Complexity</label>
                    <input
                      type="text"
                      value={formQuestion.time_complexity}
                      onChange={(e) => setFormQuestion({ ...formQuestion, time_complexity: e.target.value })}
                      placeholder="O(N)"
                      className="w-full px-3 py-2 rounded-lg bg-[#08090e] border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400">Space Complexity</label>
                    <input
                      type="text"
                      value={formQuestion.space_complexity}
                      onChange={(e) => setFormQuestion({ ...formQuestion, space_complexity: e.target.value })}
                      placeholder="O(1)"
                      className="w-full px-3 py-2 rounded-lg bg-[#08090e] border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Problem Description</label>
                  <textarea
                    rows={3}
                    value={formQuestion.description}
                    onChange={(e) => setFormQuestion({ ...formQuestion, description: e.target.value })}
                    placeholder="Enter problem statement, input/output formats, and examples..."
                    className="w-full p-3 rounded-lg bg-[#08090e] border border-white/10 text-white focus:outline-none focus:border-indigo-500 leading-relaxed font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400">Optimal Approach & Intuition</label>
                  <textarea
                    rows={2}
                    value={formQuestion.approach}
                    onChange={(e) => setFormQuestion({ ...formQuestion, approach: e.target.value })}
                    placeholder="Explain the intuition (e.g., sliding window, two pointers, bit manipulation)..."
                    className="w-full p-3 rounded-lg bg-[#08090e] border border-white/10 text-white focus:outline-none focus:border-indigo-500 leading-relaxed font-sans"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingQuestion(false);
                      setEditingQuestion(null);
                    }}
                    className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    <Check className="w-4 h-4" />
                    <span>{editingQuestion ? 'Update Question' : 'Save Question'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
