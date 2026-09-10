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
  Filter,
  Sparkles
} from 'lucide-react';
import { api } from '../services/api';
import { sound } from '../services/audio';
import AiQuestionEnhancerModal from './AiQuestionEnhancerModal';

export default function AdminPanelModal({
  isOpen,
  onClose,
  onQuestionsUpdated,
  onNavigateQuestion
}) {
  const [activeTab, setActiveTab] = useState('questions'); // 'questions' | 'visualizers' | 'reports' | 'database'
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
  const [enhancerQuestion, setEnhancerQuestion] = useState(null);
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
        setIsAddingQuestion(false);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-6xl bg-[var(--board-raised)] border border-[var(--line-strong)] rounded-[4px] shadow-2xl overflow-hidden flex flex-col h-[90vh]">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-[var(--board)] border-b border-[var(--line)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[var(--amber-dim)] border border-[var(--amber)] flex items-center justify-center text-[var(--amber)]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold font-sans text-[var(--chalk)]">
                  AlgoVision Studio Admin &amp; Database Center
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--board-raised-2)] text-[var(--amber)] border border-[var(--line)]">
                  Pro Engine v2.0
                </span>
              </div>
              <p className="text-[11.5px] font-mono text-[var(--chalk-dim)]">
                CRUD Questions • Manage SQLite DB • Inspect Visualizer Bindings • Review User Reports
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded text-[var(--chalk-faint)] hover:text-[var(--chalk)] hover:bg-[var(--line)] transition"
            title="Close Admin Panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-2 bg-[var(--board-raised-2)] border-b border-[var(--line)] flex items-center justify-between overflow-x-auto">
          <div className="flex items-center gap-1 font-mono text-xs">
            <button
              onClick={() => setActiveTab('questions')}
              className={`px-3.5 py-2.5 transition flex items-center gap-1.5 border-b-2 ${
                activeTab === 'questions'
                  ? 'border-[var(--amber)] text-[var(--chalk)] font-bold bg-[var(--amber-dim)]'
                  : 'border-transparent text-[var(--chalk-faint)] hover:text-[var(--chalk-dim)]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Questions Hub ({questions.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('visualizers')}
              className={`px-3.5 py-2.5 transition flex items-center gap-1.5 border-b-2 ${
                activeTab === 'visualizers'
                  ? 'border-[var(--amber)] text-[var(--chalk)] font-bold bg-[var(--amber-dim)]'
                  : 'border-transparent text-[var(--chalk-faint)] hover:text-[var(--chalk-dim)]'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Visualizer Manager ({diskFiles.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`px-3.5 py-2.5 transition flex items-center gap-1.5 border-b-2 ${
                activeTab === 'reports'
                  ? 'border-[var(--amber)] text-[var(--chalk)] font-bold bg-[var(--amber-dim)]'
                  : 'border-transparent text-[var(--chalk-faint)] hover:text-[var(--chalk-dim)]'
              }`}
            >
              <Flag className="w-3.5 h-3.5" />
              <span>Issue Reports</span>
              {adminStats?.pendingReports > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#e06c75] text-white text-[9px] font-bold flex items-center justify-center ml-1">
                  {adminStats.pendingReports}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('database')}
              className={`px-3.5 py-2.5 transition flex items-center gap-1.5 border-b-2 ${
                activeTab === 'database'
                  ? 'border-[var(--amber)] text-[var(--chalk)] font-bold bg-[var(--amber-dim)]'
                  : 'border-transparent text-[var(--chalk-faint)] hover:text-[var(--chalk-dim)]'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Database Operations</span>
            </button>
          </div>

          {/* Refresh button */}
          <button
            onClick={loadAdminData}
            className="p-1.5 rounded text-[var(--chalk-faint)] hover:text-[var(--chalk)] hover:bg-[var(--line)] text-xs font-mono flex items-center gap-1"
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
                ? 'bg-[var(--easy)]/15 text-[var(--easy)] border-[var(--easy)]/30'
                : 'bg-[#e06c75]/15 text-[#e06c75] border-[#e06c75]/30'
            }`}
          >
            <div className="flex items-center gap-2">
              {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              <span>{statusMsg.text}</span>
            </div>
            <button onClick={() => setStatusMsg(null)} className="text-[var(--chalk-faint)] hover:text-[var(--chalk)]">
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
                <div className="flex items-center gap-1.5 bg-[var(--board)] border border-[var(--line)] rounded px-3 py-1.5 flex-1 max-w-xs">
                  <Search className="w-3.5 h-3.5 text-[var(--chalk-faint)]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title, ID, tag..."
                    className="bg-transparent text-[var(--chalk)] focus:outline-none placeholder-[var(--chalk-faint)] w-full text-xs font-mono"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="text-[var(--chalk-faint)] hover:text-[var(--chalk)]">
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Category filter */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-[var(--board)] border border-[var(--line)] rounded px-2.5 py-1.5 text-[var(--chalk-dim)] focus:outline-none text-xs font-mono"
                >
                  <option value="all" className="bg-[#171f22]">All Categories</option>
                  {categories.map((c) => (
                    <option key={c} value={c} className="bg-[#171f22]">{c}</option>
                  ))}
                </select>

                {/* Difficulty filter */}
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="bg-[var(--board)] border border-[var(--line)] rounded px-2.5 py-1.5 text-[var(--chalk-dim)] focus:outline-none text-xs font-mono"
                >
                  <option value="all" className="bg-[#171f22]">All Difficulties</option>
                  <option value="Easy" className="bg-[#171f22]">Easy</option>
                  <option value="Medium" className="bg-[#171f22]">Medium</option>
                  <option value="Hard" className="bg-[#171f22]">Hard</option>
                </select>

                {/* Visualizer file filter */}
                <select
                  value={visFilter}
                  onChange={(e) => setVisFilter(e.target.value)}
                  className="bg-[var(--board)] border border-[var(--line)] rounded px-2.5 py-1.5 text-[var(--chalk-dim)] focus:outline-none text-xs font-mono"
                >
                  <option value="all" className="bg-[#171f22]">All Visualizer Status</option>
                  <option value="has_vis" className="bg-[#171f22]">🟢 Has Visualizer File</option>
                  <option value="missing_vis" className="bg-[#171f22]">🟡 Missing Visualizer</option>
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
                className="chalk-btn chalk-btn-amber gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Question</span>
              </button>
            </div>

            {/* Questions Table */}
            <div className="flex-1 overflow-auto rounded border border-[var(--line)] bg-[var(--board-raised-2)]">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead className="bg-[var(--board)] border-b border-[var(--line)] sticky top-0 z-10 text-[var(--chalk-faint)]">
                  <tr>
                    <th className="p-3 w-20">ID</th>
                    <th className="p-3">Title</th>
                    <th className="p-3 w-40">Category</th>
                    <th className="p-3 w-28">Difficulty</th>
                    <th className="p-3 w-52">Bound Visualizer</th>
                    <th className="p-3 w-36 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--line)] text-[var(--chalk-dim)]">
                  {filteredQuestions.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-[var(--chalk-faint)]">
                        No questions matching the active filter.
                      </td>
                    </tr>
                  ) : (
                    filteredQuestions.map((q) => {
                      const hasFile = diskFiles.includes(`${q.component_key}.jsx`) || diskFiles.includes(`${q.component_key}.js`);
                      return (
                        <tr key={q.id} className="hover:bg-[var(--board-hover)] transition">
                          <td className="p-3 font-bold text-[var(--amber)]">{q.display_id || '—'}</td>
                          <td className="p-3 font-sans">
                            <div className="font-medium text-[var(--chalk)]">{q.title}</div>
                            <div className="text-[11px] font-mono text-[var(--chalk-faint)] truncate max-w-md">
                              {q.time_complexity} • {q.space_complexity}
                            </div>
                          </td>
                          <td className="p-3 text-[var(--chalk-dim)] truncate max-w-[140px]">{q.category}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10.5px] font-mono font-medium ${
                                q.difficulty === 'Easy'
                                  ? 'text-[var(--easy)] bg-[var(--board)] border border-[var(--easy)]/30'
                                  : q.difficulty === 'Medium'
                                  ? 'text-[var(--amber)] bg-[var(--board)] border border-[var(--amber)]/30'
                                  : 'text-[#e06c75] bg-[var(--board)] border border-[#e06c75]/30'
                              }`}
                            >
                              {q.difficulty}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`w-2 h-2 rounded-full shrink-0 ${
                                  hasFile ? 'bg-[var(--easy)]' : 'bg-[var(--amber)]'
                                }`}
                                title={hasFile ? 'File exists on disk' : 'Missing visualizer file'}
                              />
                              <span className="font-mono text-[11px] text-[var(--chalk-dim)] truncate max-w-[170px]">
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
                                className="p-1.5 rounded hover:bg-[var(--line)] text-[var(--chalk-faint)] hover:text-[var(--chalk)] transition"
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
                                className="p-1.5 rounded hover:bg-[var(--line)] text-[var(--chalk-faint)] hover:text-[var(--amber)] transition"
                                title="Edit Question"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setEnhancerQuestion(q)}
                                className="p-1.5 rounded hover:bg-[var(--line)] text-[var(--chalk-faint)] hover:text-[var(--amber)] transition"
                                title="✨ AI Enhance Question"
                              >
                                <Sparkles className="w-3.5 h-3.5 text-[var(--amber)]" />
                              </button>
                              <button
                                onClick={() => handleDeleteQuestion(q.id, q.title)}
                                className="p-1.5 rounded hover:bg-[#e06c75]/20 text-[var(--chalk-faint)] hover:text-[#e06c75] transition"
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
                <h3 className="text-sm font-bold text-[var(--chalk)]">Visualizer Components on Disk</h3>
                <p className="text-[11px] text-[var(--chalk-dim)]">
                  Scanned from <code className="text-[var(--amber)]">src/visualizers/*.jsx</code>. Registered automatically via Vite.
                </p>
              </div>
              <button onClick={handleAutoLink} className="chalk-btn gap-1.5">
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
                    className="p-4 rounded bg-[var(--board-raised-2)] border border-[var(--line)] hover:border-[var(--amber)] transition flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[var(--chalk)] flex items-center gap-1.5">
                          <FileCode className="w-4 h-4 text-[var(--amber)]" />
                          {file}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--board)] text-[var(--easy)] border border-[var(--easy)]/30">
                          Active
                        </span>
                      </div>
                      <div className="mt-2 text-[11px] text-[var(--chalk-dim)]">
                        {boundQuestion ? (
                          <span>
                            Bound to:{' '}
                            <strong className="text-[var(--chalk)]">
                              {boundQuestion.display_id} {boundQuestion.title}
                            </strong>
                          </span>
                        ) : (
                          <span className="text-[var(--amber)] italic">Unbound / Standalone component</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-[var(--line)]">
                      {boundQuestion && (
                        <button
                          onClick={() => {
                            if (onNavigateQuestion) {
                              onNavigateQuestion(boundQuestion);
                              onClose();
                            }
                          }}
                          className="flex-1 py-1 px-2.5 rounded bg-[var(--board)] hover:bg-[var(--board-hover)] text-[var(--chalk)] border border-[var(--line)] text-center transition"
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
                <h3 className="text-sm font-bold text-[var(--chalk)]">Solution &amp; Animation Bug Reports</h3>
                <p className="text-[11px] text-[var(--chalk-dim)]">
                  User-reported broken solutions, animation errors, or complexity fixes.
                </p>
              </div>
              <div className="flex items-center gap-1.5 bg-[var(--board)] p-1 rounded border border-[var(--line)]">
                {['all', 'pending', 'resolved', 'dismissed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setReportFilter(status)}
                    className={`px-3 py-1 rounded text-xs capitalize transition ${
                      reportFilter === status
                        ? 'bg-[var(--amber-dim)] text-[var(--amber)] font-bold border border-[var(--amber)]'
                        : 'text-[var(--chalk-faint)] hover:text-[var(--chalk)]'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-auto rounded border border-[var(--line)] bg-[var(--board-raised-2)]">
              {reports.length === 0 ? (
                <div className="p-12 text-center text-[var(--chalk-faint)] space-y-2">
                  <CheckCircle2 className="w-8 h-8 mx-auto text-[var(--easy)]" />
                  <p className="text-sm font-medium text-[var(--chalk)]">No reports found!</p>
                  <p className="text-xs text-[var(--chalk-faint)]">Everything is running cleanly.</p>
                </div>
              ) : (
                <div className="divide-y divide-[var(--line)]">
                  {reports.map((r) => (
                    <div key={r.id} className="p-4 space-y-3 hover:bg-[var(--board-hover)] transition">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[var(--amber)]">
                            {r.question_display_id || 'Q'}: {r.question_title}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-[var(--board)] text-[var(--chalk-dim)] border border-[var(--line)] text-[10px] uppercase">
                            {r.language}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-[var(--board)] text-[var(--amber)] border border-[var(--line)] text-[10px] capitalize">
                            Tier: {r.approach_tier || 'optimal'}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-[var(--board)] text-[#e06c75] border border-[var(--line)] text-[10px]">
                            {r.report_type}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              r.status === 'pending'
                                ? 'bg-[var(--amber-dim)] text-[var(--amber)] border border-[var(--amber)]'
                                : r.status === 'resolved'
                                ? 'bg-[var(--easy)]/15 text-[var(--easy)] border border-[var(--easy)]/30'
                                : 'bg-[var(--board)] text-[var(--chalk-faint)] border border-[var(--line)]'
                            }`}
                          >
                            {r.status}
                          </span>
                          <span className="text-[var(--chalk-faint)] text-[11px]">{r.created_at?.slice(0, 10)}</span>
                        </div>
                      </div>

                      <div className="p-3 rounded bg-[var(--board)] border border-[var(--line)] space-y-1.5">
                        <div className="text-[var(--chalk)] leading-relaxed font-sans text-xs">
                          <strong>Details:</strong> {r.details}
                        </div>
                        {r.suggested_fix && (
                          <div className="pt-2 border-t border-[var(--line)] text-[var(--amber)] font-mono text-[11px]">
                            <strong>Suggested Fix:</strong>
                            <pre className="mt-1 p-2 bg-[var(--board-raised-2)] rounded border border-[var(--line)] overflow-x-auto text-[var(--chalk-dim)]">
                              {r.suggested_fix}
                            </pre>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-[var(--chalk-faint)]">Reported by: {r.username}</span>
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
                                className="chalk-btn"
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
                                className="chalk-btn"
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
                            className="p-1 rounded text-[var(--chalk-faint)] hover:text-[#e06c75] transition"
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
              <div className="p-4 rounded bg-[var(--board-raised-2)] border border-[var(--line)]">
                <span className="text-[var(--chalk-faint)] text-[11px]">Total Questions</span>
                <p className="text-2xl font-bold text-[var(--chalk)] mt-1">{adminStats?.totalQuestions || 0}</p>
              </div>
              <div className="p-4 rounded bg-[var(--board-raised-2)] border border-[var(--line)]">
                <span className="text-[var(--chalk-faint)] text-[11px]">Total Solutions</span>
                <p className="text-2xl font-bold text-[var(--amber)] mt-1">{adminStats?.totalSolutions || 0}</p>
              </div>
              <div className="p-4 rounded bg-[var(--board-raised-2)] border border-[var(--line)]">
                <span className="text-[var(--chalk-faint)] text-[11px]">Visualizers on Disk</span>
                <p className="text-2xl font-bold text-[var(--teal)] mt-1">{adminStats?.diskVisualizersCount || 0}</p>
              </div>
              <div className="p-4 rounded bg-[var(--board-raised-2)] border border-[var(--line)]">
                <span className="text-[var(--chalk-faint)] text-[11px]">Pending Reports</span>
                <p className="text-2xl font-bold text-[#e06c75] mt-1">{adminStats?.pendingReports || 0}</p>
              </div>
            </div>

            {/* Backup & Restore Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1-Click Export */}
              <div className="p-6 rounded bg-[var(--board)] border border-[var(--line)] space-y-3">
                <div className="flex items-center gap-2 text-[var(--amber)] font-bold">
                  <Download className="w-4 h-4" />
                  <span>1-Click JSON Backup Export</span>
                </div>
                <p className="text-[var(--chalk-dim)] leading-relaxed text-[11px] font-sans">
                  Export all 370+ problems, multi-language solutions, user notes, discussion comments, and reports as a single portable JSON snapshot.
                </p>
                <button
                  onClick={handleExportDatabase}
                  className="chalk-btn chalk-btn-amber w-full justify-center gap-2 mt-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Database (.json)</span>
                </button>
              </div>

              {/* 1-Click Restore */}
              <div className="p-6 rounded bg-[var(--board)] border border-[var(--line)] space-y-3">
                <div className="flex items-center gap-2 text-[var(--teal)] font-bold">
                  <Upload className="w-4 h-4" />
                  <span>Restore or Merge Backup</span>
                </div>
                <p className="text-[var(--chalk-dim)] leading-relaxed text-[11px] font-sans">
                  Import a database dump or bulk question list to restore questions and multi-language solutions instantly.
                </p>
                <label className="chalk-btn w-full justify-center gap-2 mt-2 cursor-pointer">
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
            <div className="p-5 rounded bg-[var(--board)] border border-[var(--line)] space-y-2">
              <div className="flex items-center gap-2 text-[var(--amber)] font-bold">
                <Shield className="w-4 h-4" />
                <span>Enterprise Local SQLite Architecture</span>
              </div>
              <p className="text-[11.5px] text-[var(--chalk-dim)] leading-relaxed font-sans">
                AlgoVision Studio uses Node 22 native <code className="text-[var(--amber)]">node:sqlite</code> synchronous database engine (`algovision.sqlite`) with zero external binary driver dependencies. Scales up to 100,000+ problems and millions of solution executions effortlessly.
              </p>
            </div>
          </div>
        )}

        {/* ── MODAL: ADD / EDIT QUESTION FORM ── */}
        {isAddingQuestion && (
          <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-sm p-6 flex items-center justify-center animate-fade-in">
            <div className="w-full max-w-2xl bg-[var(--board)] border border-[var(--line-strong)] rounded-[4px] p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[var(--chalk)]">
                    {editingQuestion ? `Edit Question: ${editingQuestion.title}` : 'Add New DSA Question'}
                  </h3>
                  {editingQuestion && (
                    <button
                      type="button"
                      onClick={() => setEnhancerQuestion(editingQuestion)}
                      className="chalk-btn chalk-btn-amber py-0.5 text-[10.5px] flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>AI Enhance</span>
                    </button>
                  )}
                </div>
                <button
                  onClick={() => {
                    setIsAddingQuestion(false);
                    setEditingQuestion(null);
                  }}
                  className="p-1 rounded text-[var(--chalk-faint)] hover:text-[var(--chalk)]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveQuestion} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[var(--chalk-faint)]">Problem Title *</label>
                    <input
                      type="text"
                      required
                      value={formQuestion.title}
                      onChange={(e) => setFormQuestion({ ...formQuestion, title: e.target.value })}
                      placeholder="e.g. Trapping Rain Water"
                      className="w-full px-3 py-2 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk)] focus:outline-none focus:border-[var(--amber)]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[var(--chalk-faint)]">Display ID</label>
                    <input
                      type="text"
                      value={formQuestion.display_id}
                      onChange={(e) => setFormQuestion({ ...formQuestion, display_id: e.target.value })}
                      placeholder="Q-373"
                      className="w-full px-3 py-2 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--amber)] focus:outline-none focus:border-[var(--amber)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[var(--chalk-faint)]">Category</label>
                    <input
                      type="text"
                      value={formQuestion.category}
                      onChange={(e) => setFormQuestion({ ...formQuestion, category: e.target.value })}
                      placeholder="1. Arrays"
                      className="w-full px-3 py-2 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk)] focus:outline-none focus:border-[var(--amber)]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[var(--chalk-faint)]">Difficulty</label>
                    <select
                      value={formQuestion.difficulty}
                      onChange={(e) => setFormQuestion({ ...formQuestion, difficulty: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk)] focus:outline-none focus:border-[var(--amber)]"
                    >
                      <option value="Easy" className="bg-[#171f22]">Easy</option>
                      <option value="Medium" className="bg-[#171f22]">Medium</option>
                      <option value="Hard" className="bg-[#171f22]">Hard</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[var(--chalk-faint)]">Visualizer Component Key</label>
                    <input
                      type="text"
                      value={formQuestion.component_key}
                      onChange={(e) => setFormQuestion({ ...formQuestion, component_key: e.target.value })}
                      placeholder="e.g. TwoSumVisualizer"
                      className="w-full px-3 py-2 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--amber)] focus:outline-none focus:border-[var(--amber)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[var(--chalk-faint)]">Time Complexity</label>
                    <input
                      type="text"
                      value={formQuestion.time_complexity}
                      onChange={(e) => setFormQuestion({ ...formQuestion, time_complexity: e.target.value })}
                      placeholder="O(N)"
                      className="w-full px-3 py-2 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk)] focus:outline-none focus:border-[var(--amber)]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[var(--chalk-faint)]">Space Complexity</label>
                    <input
                      type="text"
                      value={formQuestion.space_complexity}
                      onChange={(e) => setFormQuestion({ ...formQuestion, space_complexity: e.target.value })}
                      placeholder="O(1)"
                      className="w-full px-3 py-2 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk)] focus:outline-none focus:border-[var(--amber)]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[var(--chalk-faint)]">Problem Description</label>
                  <textarea
                    rows={3}
                    value={formQuestion.description}
                    onChange={(e) => setFormQuestion({ ...formQuestion, description: e.target.value })}
                    placeholder="Enter problem statement, input/output formats, and examples..."
                    className="w-full p-3 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk)] focus:outline-none focus:border-[var(--amber)] leading-relaxed font-sans"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[var(--chalk-faint)]">Optimal Approach &amp; Intuition</label>
                  <textarea
                    rows={2}
                    value={formQuestion.approach}
                    onChange={(e) => setFormQuestion({ ...formQuestion, approach: e.target.value })}
                    placeholder="Explain the intuition (e.g., sliding window, two pointers, bit manipulation)..."
                    className="w-full p-3 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk)] focus:outline-none focus:border-[var(--amber)] leading-relaxed font-sans"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-[var(--line)]">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingQuestion(false);
                      setEditingQuestion(null);
                    }}
                    className="chalk-btn"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="chalk-btn chalk-btn-amber">
                    <Check className="w-4 h-4" />
                    <span>{editingQuestion ? 'Update Question' : 'Save Question'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── AI Question Enhancer Modal Integration ── */}
        {enhancerQuestion && (
          <AiQuestionEnhancerModal
            isOpen={Boolean(enhancerQuestion)}
            question={enhancerQuestion}
            onClose={() => setEnhancerQuestion(null)}
            onQuestionUpdated={() => {
              setEnhancerQuestion(null);
              loadAdminData();
              if (onQuestionsUpdated) onQuestionsUpdated();
            }}
          />
        )}

      </div>
    </div>
  );
}
