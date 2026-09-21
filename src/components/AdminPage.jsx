import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  Shield,
  ArrowLeft,
  Search,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  BookOpen,
  ExternalLink,
  Layers,
  Sparkles,
  Save,
  Download,
  X,
  FileCode,
  Database,
  AlertCircle,
  Copy,
  Check,
  Upload,
  Code,
  Tag,
  AlertTriangle
} from 'lucide-react';

function YoutubeIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}
import { api } from '../services/api';
import { sound } from '../services/audio';

export default function AdminPage({
  onNavigateHome,
  onNavigateQuestion,
  onNavigateArticle,
  initialQuestion = null,
  initialQuestionId = null
}) {
  const resolvedTargetId = initialQuestion?.id || initialQuestionId;
  const [activeTab, setActiveTab] = useState(resolvedTargetId ? 'customizer' : 'questions'); // 'questions' | 'customizer' | 'add' | 'visualizers' | 'database' | 'reports'
  const [questions, setQuestions] = useState([]);
  const [adminStats, setAdminStats] = useState(null);
  const [diskFiles, setDiskFiles] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  // Filters for Questions Hub
  const [searchQuery, setSearchQuery] = useState('');
  const [stepFilter, setStepFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [visFilter, setVisFilter] = useState('all'); // 'all' | 'has_vis' | 'missing_vis'

  // Active question being edited in the Customizer
  const [selectedQuestionId, setSelectedQuestionId] = useState(resolvedTargetId);
  const [editingData, setEditingData] = useState(() => {
    if (!initialQuestion) return null;
    const vids = Array.isArray(initialQuestion.youtube_videos) && initialQuestion.youtube_videos.length > 0
      ? initialQuestion.youtube_videos
      : (initialQuestion.youtube_url ? [{ id: 'striver-main', title: "Striver's Solution", url: initialQuestion.youtube_url, channel: 'take U forward', is_primary: true }] : []);
    return {
      ...initialQuestion,
      youtube_videos: vids,
      article_content: initialQuestion.article_content || '',
      article_url: initialQuestion.article_url || '',
      gfg_url: initialQuestion.gfg_url || '',
      leetcode_url: initialQuestion.leetcode_url || '',
      time_complexity: initialQuestion.time_complexity || 'O(N)',
      space_complexity: initialQuestion.space_complexity || 'O(1)',
      component_key: initialQuestion.component_key || ''
    };
  });
  const [editingSolutions, setEditingSolutions] = useState({
    cpp: '',
    java: '',
    python: '',
    javascript: ''
  });
  const [editingTier, setEditingTier] = useState('optimal');
  const [savingQuestion, setSavingQuestion] = useState(false);

  // Display ID uniqueness validation
  const [displayIdConflict, setDisplayIdConflict] = useState(null); // { id, title } | null | 'checking'
  const displayIdCheckTimer = useRef(null);

  // Visualizer upload in customizer
  const [vizUploadCode, setVizUploadCode] = useState('');
  const [vizUploadKey, setVizUploadKey] = useState('');
  const [vizUploading, setVizUploading] = useState(false);
  const [vizUploadResult, setVizUploadResult] = useState(null);

  // Tags editing
  const [tagInput, setTagInput] = useState('');

  // New question form state
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    display_id: '',
    step_no: 1,
    step_name: 'Learn the basics',
    substep_no: 1,
    substep_name: 'Overview',
    difficulty: 'Easy',
    time_complexity: 'O(N)',
    space_complexity: 'O(1)',
    leetcode_url: '',
    article_url: '',
    article_content: '',
    description: '',
    approach: '',
    component_key: '',
    tags: ['Algorithm'],
    youtube_videos: [
      {
        id: 'vid-1',
        title: "Striver's Tutorial",
        url: '',
        channel: 'take U forward',
        is_primary: true
      }
    ]
  });

  // Gemini Research Importer State
  const [geminiJsonInput, setGeminiJsonInput] = useState('');
  const [importingGemini, setImportingGemini] = useState(false);
  const [geminiResult, setGeminiResult] = useState(null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [selectedBatchNumber, setSelectedBatchNumber] = useState('1');

  // Load all admin data
  const loadAdminData = useCallback(async () => {
    setLoading(true);
    try {
      const [qList, stats, files, repList] = await Promise.all([
        api.getQuestions(),
        api.getAdminStats(),
        api.getAdminVisualizers(),
        api.getReports()
      ]);
      if (qList) {
        setQuestions(qList);
        const targetId = initialQuestionId || selectedQuestionId;
        if (targetId) {
          const match = qList.find(
            (q) => q.id === targetId || q.slug === targetId || q.title?.toLowerCase() === String(targetId).toLowerCase()
          );
          if (match) {
            setupEditingData(match);
          }
        }
      }
      if (stats) setAdminStats(stats);
      if (files) setDiskFiles(files);
      if (repList) setReports(repList);
    } finally {
      setLoading(false);
    }
  }, [selectedQuestionId, initialQuestionId]);

  useEffect(() => {
    loadAdminData();
  }, [loadAdminData]);

  // When initialQuestion/initialQuestionId changes or questions load, auto-select and open customizer
  useEffect(() => {
    if (initialQuestion) {
      setSelectedQuestionId(initialQuestion.id);
      setActiveTab('customizer');
      setupEditingData(initialQuestion);
    } else if (initialQuestionId) {
      setSelectedQuestionId(initialQuestionId);
      setActiveTab('customizer');
      if (questions.length > 0) {
        const match = questions.find(
          (q) => q.id === initialQuestionId || q.slug === initialQuestionId || q.title?.toLowerCase() === String(initialQuestionId).toLowerCase()
        );
        if (match) {
          setupEditingData(match);
        }
      }
    }
  }, [initialQuestion, initialQuestionId, questions]);

  // Setup question for editing
  const setupEditingData = async (q) => {
    if (!q) return;
    const vids = Array.isArray(q.youtube_videos) && q.youtube_videos.length > 0
      ? q.youtube_videos
      : (q.youtube_url ? [{ id: 'striver-main', title: "Striver's Solution", url: q.youtube_url, channel: 'take U forward', is_primary: true }] : []);

    setEditingData({
      ...q,
      youtube_videos: vids,
      article_content: q.article_content || '',
      article_url: q.article_url || '',
      gfg_url: q.gfg_url || '',
      leetcode_url: q.leetcode_url || '',
      time_complexity: q.time_complexity || 'O(N)',
      space_complexity: q.space_complexity || 'O(1)',
      component_key: q.component_key || ''
    });

    // Reset per-question editing state
    setDisplayIdConflict(null);
    setTagInput('');
    setVizUploadCode('');
    setVizUploadKey('');
    setVizUploadResult(null);

    // Fetch solutions for this question
    const sols = await api.getCodeSolutions(q.id, 'optimal');
    if (sols) {
      setEditingSolutions({
        cpp: sols.cpp || '',
        java: sols.java || '',
        python: sols.python || '',
        javascript: sols.javascript || ''
      });
    }
  };


  const handleSelectToEdit = (q) => {
    sound.playStep(600);
    setSelectedQuestionId(q.id);
    setupEditingData(q);
    setActiveTab('customizer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add a new YouTube video row in customizer
  const handleAddVideoRow = () => {
    if (!editingData) return;
    sound.playStep(640);
    const newVid = {
      id: `vid-${Date.now()}`,
      title: '',
      url: '',
      channel: 'take U forward',
      is_primary: false
    };
    setEditingData((prev) => ({
      ...prev,
      youtube_videos: [...(prev.youtube_videos || []), newVid]
    }));
  };

  // Validate display_id uniqueness (debounced)
  const validateDisplayId = useCallback((display_id, exclude_id) => {
    if (!display_id || !display_id.trim()) {
      setDisplayIdConflict(null);
      return;
    }
    clearTimeout(displayIdCheckTimer.current);
    setDisplayIdConflict('checking');
    displayIdCheckTimer.current = setTimeout(async () => {
      const res = await api.checkDisplayId(display_id.trim(), exclude_id);
      if (res.success) {
        setDisplayIdConflict(res.isUnique ? null : res.conflict);
      } else {
        setDisplayIdConflict(null);
      }
    }, 600);
  }, []);

  // Handle visualizer upload for currently-editing question
  const handleUploadVisualizer = async () => {
    if (!editingData?.id || !vizUploadCode.trim()) {
      setStatusMsg({ type: 'error', text: 'Please paste a visualizer component code first.' });
      return;
    }
    setVizUploading(true);
    setVizUploadResult(null);
    const key = vizUploadKey.trim() || `${editingData.title?.replace(/[^a-zA-Z0-9]/g, '')}Visualizer`;
    const res = await api.uploadVisualizer({
      questionId: editingData.id,
      componentKey: key,
      code: vizUploadCode
    });
    if (res.success) {
      sound?.playSuccess?.();
      setVizUploadResult({ success: true, key: res.componentKey });
      setEditingData(prev => ({ ...prev, component_key: res.componentKey }));
      setStatusMsg({ type: 'success', text: `Visualizer "${res.componentKey}" saved and linked successfully!` });
      loadAdminData();
    } else {
      setVizUploadResult({ success: false, error: res.error });
      setStatusMsg({ type: 'error', text: res.error || 'Failed to save visualizer.' });
    }
    setVizUploading(false);
    setTimeout(() => setStatusMsg(null), 4000);
  };


  // Update a video row
  const handleUpdateVideoRow = (idx, field, val) => {
    if (!editingData) return;
    const updated = [...(editingData.youtube_videos || [])];
    updated[idx] = { ...updated[idx], [field]: val };
    setEditingData((prev) => ({ ...prev, youtube_videos: updated }));
  };

  // Remove a video row
  const handleRemoveVideoRow = (idx) => {
    if (!editingData) return;
    sound.playStep(450);
    const updated = editingData.youtube_videos.filter((_, i) => i !== idx);
    setEditingData((prev) => ({ ...prev, youtube_videos: updated }));
  };

  // Save changes to editing question
  const handleSaveQuestionChanges = async () => {
    if (!editingData || !editingData.id) return;

    // Validate display_id uniqueness before saving
    if (editingData.display_id && displayIdConflict && displayIdConflict !== 'checking') {
      setStatusMsg({ type: 'error', text: `Display ID "${editingData.display_id}" is already used by "${displayIdConflict.title}". Please use a unique ID.` });
      setTimeout(() => setStatusMsg(null), 4000);
      return;
    }

    setSavingQuestion(true);
    sound?.playSuccess?.();

    // Primary YouTube URL sync
    const primaryVid = editingData.youtube_videos?.find((v) => v.is_primary) || editingData.youtube_videos?.[0];
    const primaryYtUrl = primaryVid?.url || '';

    const payload = {
      title: editingData.title,
      display_id: editingData.display_id,
      difficulty: editingData.difficulty,
      step_no: editingData.step_no ? Number(editingData.step_no) : null,
      step_name: editingData.step_name,
      substep_no: editingData.substep_no ? Number(editingData.substep_no) : null,
      substep_name: editingData.substep_name,
      time_complexity: editingData.time_complexity,
      space_complexity: editingData.space_complexity,
      leetcode_url: editingData.leetcode_url,
      youtube_url: primaryYtUrl,
      youtube_videos: editingData.youtube_videos,
      article_url: editingData.article_url,
      gfg_url: editingData.gfg_url,
      article_content: editingData.article_content,
      description: editingData.description,
      approach: editingData.approach,
      component_key: editingData.component_key,
      tags: Array.isArray(editingData.tags) ? editingData.tags : []
    };

    const res = await api.updateQuestion(editingData.id, payload);
    if (res) {
      // Also save code solutions
      await api.saveCodeSolutions(editingData.id, editingSolutions, editingTier);
      setStatusMsg({ type: 'success', text: `Saved updates to "${editingData.title}"!` });
      loadAdminData();
    } else {
      setStatusMsg({ type: 'error', text: 'Failed to save question updates.' });
    }
    setSavingQuestion(false);
    setTimeout(() => setStatusMsg(null), 3000);
  };

  // Handle create new question
  const handleCreateNewQuestion = async (e) => {
    e.preventDefault();
    if (!newQuestion.title.trim()) {
      setStatusMsg({ type: 'error', text: 'Problem title is required.' });
      return;
    }
    sound?.playSuccess?.();
    const id = newQuestion.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const primaryVid = newQuestion.youtube_videos?.[0]?.url || '';

    const payload = {
      ...newQuestion,
      id,
      slug: id,
      youtube_url: primaryVid,
      category: `Step ${newQuestion.step_no}: ${newQuestion.step_name}`
    };

    const res = await api.addQuestion(payload);
    if (res) {
      setStatusMsg({ type: 'success', text: `Added new problem "${newQuestion.title}"!` });
      loadAdminData();
      setActiveTab('questions');
    } else {
      setStatusMsg({ type: 'error', text: 'Failed to add problem.' });
    }
    setTimeout(() => setStatusMsg(null), 3000);
  };

  // Delete question
  const handleDeleteQuestion = async (q) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${q.title}" (${q.id})?`)) return;
    sound.playStep(400);
    const res = await api.deleteQuestion(q.id);
    if (res.success) {
      setStatusMsg({ type: 'success', text: `Deleted "${q.title}".` });
      if (selectedQuestionId === q.id) {
        setSelectedQuestionId(null);
        setEditingData(null);
      }
      loadAdminData();
    } else {
      setStatusMsg({ type: 'error', text: res.error || 'Failed to delete problem.' });
    }
    setTimeout(() => setStatusMsg(null), 3000);
  };

  // Export DB
  const handleExportDB = async () => {
    sound?.playSuccess?.();
    const dump = await api.exportDatabaseDump();
    if (dump) {
      const blob = new Blob([JSON.stringify(dump, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `algovision_dsa_backup_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setStatusMsg({ type: 'success', text: 'Database backup downloaded successfully.' });
      setTimeout(() => setStatusMsg(null), 3000);
    }
  };

  // Auto-link visualizers
  const handleAutoLink = async () => {
    sound.playStep(620);
    const res = await api.autolinkVisualizers();
    if (res.success) {
      sound?.playSuccess?.();
      setStatusMsg({ type: 'success', text: `Auto-linked ${res.linkedCount} visualizer components!` });
      loadAdminData();
    } else {
      setStatusMsg({ type: 'error', text: 'Failed to autolink.' });
    }
    setTimeout(() => setStatusMsg(null), 3000);
  };

  // Download all 450 problems as JSON database
  const handleDownloadMasterDB = () => {
    sound?.playStep?.(640);
    const cleanList = questions.map(q => ({
      id: q.id,
      display_id: q.display_id,
      title: q.title,
      step_no: q.step_no,
      step_name: q.step_name,
      substep_name: q.substep_name,
      difficulty: q.difficulty,
      leetcode_url: q.leetcode_url,
      article_url: q.article_url,
      gfg_url: q.gfg_url,
      youtube_videos: q.youtube_videos
    }));
    const blob = new Blob([JSON.stringify(cleanList, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `algovision_all_problems_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setStatusMsg({ type: 'success', text: 'Master problems database downloaded!' });
    setTimeout(() => setStatusMsg(null), 3000);
  };

  // Download all 450 problems as CSV
  const handleDownloadCsv = () => {
    sound?.playStep?.(640);
    const escapeCsv = (str) => `"${String(str || '').replace(/"/g, '""')}"`;
    const header = 'id,display_id,title,step_no,step_name,substep_name,difficulty,leetcode_url,article_url,gfg_url\n';
    const rows = questions.map(q => [
      escapeCsv(q.id),
      escapeCsv(q.display_id),
      escapeCsv(q.title),
      q.step_no,
      escapeCsv(q.step_name),
      escapeCsv(q.substep_name),
      escapeCsv(q.difficulty),
      escapeCsv(q.leetcode_url),
      escapeCsv(q.article_url),
      escapeCsv(q.gfg_url)
    ].join(',')).join('\n');

    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `algovision_problems_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setStatusMsg({ type: 'success', text: 'Problems CSV downloaded!' });
    setTimeout(() => setStatusMsg(null), 3000);
  };

  // Import Gemini Spark JSON research response
  const handleImportGemini = async () => {
    if (!geminiJsonInput.trim()) {
      setStatusMsg({ type: 'error', text: 'Please paste Gemini JSON output first.' });
      return;
    }
    sound?.playStep?.(640);
    setImportingGemini(true);
    setGeminiResult(null);

    try {
      let content = geminiJsonInput.trim();
      if (content.startsWith('```json')) content = content.slice(7);
      else if (content.startsWith('```')) content = content.slice(3);
      if (content.endsWith('```')) content = content.slice(0, -3);
      content = content.trim();

      const firstBracket = content.indexOf('[');
      const lastBracket = content.lastIndexOf(']');
      if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
        content = content.substring(firstBracket, lastBracket + 1);
      }

      const items = JSON.parse(content);
      if (!Array.isArray(items)) {
        throw new Error('Input must be a valid JSON array of problems.');
      }

      const res = await api.bulkUpdateResearch(items);
      if (res && res.success) {
        setGeminiResult(res);
        setStatusMsg({
          type: 'success',
          text: `Successfully merged research updates for ${res.updatedCount} problem(s)!`
        });
        sound?.playSuccess?.();
        loadAdminData();
      } else {
        throw new Error(res?.error || 'Import failed');
      }
    } catch (err) {
      setGeminiResult({ error: err.message });
      setStatusMsg({ type: 'error', text: `Failed to import: ${err.message}` });
    } finally {
      setImportingGemini(false);
    }
  };

  // Pre-load sample research JSON for Two Sum
  const handleLoadSampleTwoSum = () => {
    sound?.playStep?.(560);
    setGeminiJsonInput(JSON.stringify([
      {
        "id": "two-sum",
        "title": "Two Sum",
        "gfg_url": "https://www.geeksforgeeks.org/check-if-pair-with-given-sum-exists-in-array/",
        "alternate_articles": [
          {
            "title": "GeeksforGeeks - Key Pair (Two Sum Problem)",
            "url": "https://www.geeksforgeeks.org/check-if-pair-with-given-sum-exists-in-array/",
            "source": "GeeksforGeeks"
          },
          {
            "title": "LeetCode Official Two Sum Editorial",
            "url": "https://leetcode.com/problems/two-sum/editorial/",
            "source": "LeetCode"
          }
        ],
        "alternate_videos": [
          {
            "id": "neetcode-two-sum",
            "title": "NeetCode - Two Sum - Leetcode 1",
            "url": "https://www.youtube.com/watch?v=KLlXCFG5TnA",
            "channel": "NeetCode",
            "notes": "Optimal single-pass hash map explanation in Python & C++"
          },
          {
            "id": "abdul-bari-two-sum",
            "title": "Abdul Bari - Two Sum & Hash Table Walkthrough",
            "url": "https://www.youtube.com/watch?v=sAQT4fl9V28",
            "channel": "Abdul Bari",
            "notes": "Diagrammatic algorithmic invariant walkthrough"
          }
        ]
      }
    ], null, 2));
  };

  // Copy Gemini Master System Prompt
  const handleCopyMasterPrompt = async () => {
    sound?.playStep?.(600);
    const text = `You are an expert Data Structures & Algorithms (DSA) research assistant.
Your task is to use Google Search and YouTube Search grounding to find high-quality alternate learning resources for the provided DSA problems.

For each problem in the batch:
1. Search YouTube for popular, top-rated explanations by trusted channels:
   - NeetCode / NeetCodeIO
   - Abdul Bari
   - Aditya Verma (for DP, Recursion, Stack, Heap, Sliding Window)
   - Take U forward / Striver
   - CodeWithHarry / Love Babbar / Kunal Kushwaha / TechDose / Pepcoding
   * CRITICAL: ONLY include REAL, VERIFIED YouTube URLs (https://www.youtube.com/watch?v=...). Never fabricate links.
2. Search Google for official GeeksforGeeks article URL (https://www.geeksforgeeks.org/...) and practice link.
3. Return STRICT JSON array matching this schema:
[
  {
    "id": "problem-slug",
    "title": "Problem Title",
    "gfg_url": "https://www.geeksforgeeks.org/...",
    "alternate_articles": [
      { "title": "GeeksforGeeks - Problem Name", "url": "https://www.geeksforgeeks.org/...", "source": "GeeksforGeeks" }
    ],
    "alternate_videos": [
      { "id": "channel-slug", "title": "Channel - Title", "url": "https://www.youtube.com/watch?v=...", "channel": "ChannelName", "notes": "Notes" }
    ]
  }
]`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2500);
    } catch {}
  };

  // Filtered questions list
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = q.title?.toLowerCase().includes(query);
        const matchId = q.display_id?.toLowerCase().includes(query) || q.id?.toLowerCase().includes(query);
        const matchSub = q.substep_name?.toLowerCase().includes(query);
        if (!matchTitle && !matchId && !matchSub) return false;
      }
      if (stepFilter !== 'all' && q.step_no !== Number(stepFilter)) return false;
      if (difficultyFilter !== 'all' && q.difficulty !== difficultyFilter) return false;
      if (visFilter === 'has_vis') {
        const has = diskFiles.includes(`${q.component_key}.jsx`) || diskFiles.includes(`${q.component_key}.js`);
        if (!has) return false;
      }
      if (visFilter === 'missing_vis') {
        const has = diskFiles.includes(`${q.component_key}.jsx`) || diskFiles.includes(`${q.component_key}.js`);
        if (has) return false;
      }
      return true;
    });
  }, [questions, searchQuery, stepFilter, difficultyFilter, visFilter, diskFiles]);

  return (
    <div className="min-h-screen bg-[#0c0d10] text-[#f2f3f5] font-sans pb-16">
      
      {/* ── Top Header Bar ── */}
      <header className="sticky top-0 z-50 bg-[#121318]/95 backdrop-blur-md border-b border-[#20222a] px-4 sm:px-8 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          
          {/* Brand & Back Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playStep(520);
                onNavigateHome();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181920] hover:bg-[#22242d] border border-[#272933] text-xs font-medium text-[#8e92a4] hover:text-[#f2f3f5] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sheet</span>
            </button>

            <div className="flex items-center gap-2.5">
              <img
                src="/logo.png"
                alt="AlgoVision Logo"
                className="w-8 h-8 rounded-lg object-contain shadow-sm border border-[#272933]"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm font-bold text-white tracking-tight">Admin &amp; Content Center</h1>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 font-semibold flex items-center gap-1">
                    <Shield className="w-2.5 h-2.5" />
                    Admin Pro
                  </span>
                </div>
                <p className="text-[11px] text-[#5b5e6e]">
                  Customize Multiple YouTube Videos, Articles, Editorials &amp; Problem Sets
                </p>
              </div>
            </div>
          </div>

          {/* Quick Telemetry Counters */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <div className="px-3 py-1 rounded-lg bg-[#181920] border border-[#272933] text-[#8e92a4]">
              Problems: <strong className="text-white">{questions.length}</strong>
            </div>
            <div className="px-3 py-1 rounded-lg bg-[#181920] border border-[#272933] text-[#8e92a4] hidden sm:block">
              Visualizers: <strong className="text-indigo-400">{diskFiles.length}</strong>
            </div>
            <button
              onClick={handleExportDB}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#181920] hover:bg-[#22242d] border border-[#272933] text-[#8e92a4] hover:text-white transition-colors cursor-pointer"
              title="Download full SQLite database JSON backup"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Export Backup</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Status Toast Message ── */}
      {statusMsg && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-4">
          <div
            className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs font-medium animate-fade-in ${
              statusMsg.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}
          >
            <div className="flex items-center gap-2">
              {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              <span>{statusMsg.text}</span>
            </div>
            <button onClick={() => setStatusMsg(null)} className="text-[#8e92a4] hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ── Navigation Tabs ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6">
        <div className="border-b border-[#22242b] flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-4 py-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'questions'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-[#8e92a4] hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Problem Catalog ({questions.length})</span>
          </button>

          <button
            onClick={() => {
              if (!selectedQuestionId && questions.length > 0) {
                handleSelectToEdit(questions[0]);
              } else {
                setActiveTab('customizer');
              }
            }}
            className={`px-4 py-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'customizer'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-[#8e92a4] hover:text-white'
            }`}
          >
            <Edit className="w-4 h-4" />
            <span>Problem Customizer &amp; Video Manager</span>
            {editingData && (
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {editingData.title?.slice(0, 18)}…
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('gemini')}
            className={`px-4 py-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'gemini'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-[#8e92a4] hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>⚡ Gemini Research Importer</span>
          </button>

          <button
            onClick={() => setActiveTab('add')}
            className={`px-4 py-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'add'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-[#8e92a4] hover:text-white'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Add New Problem</span>
          </button>

          <button
            onClick={() => setActiveTab('visualizers')}
            className={`px-4 py-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'visualizers'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-[#8e92a4] hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Visualizers ({diskFiles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`px-4 py-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'database'
                ? 'border-indigo-500 text-white'
                : 'border-transparent text-[#8e92a4] hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Database Tools</span>
          </button>
        </div>
      </div>

      {/* ── Main Content Body ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
        
        {/* ============================================================ */}
        {/* TAB 1: QUESTIONS HUB                                         */}
        {/* ============================================================ */}
        {activeTab === 'questions' && (
          <div className="space-y-4">
            
            {/* Filter Bar */}
            <div className="p-4 rounded-2xl bg-[#15161c] border border-[#22242b] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 min-w-[240px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#5b5e6e]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search problem title, display ID (#167), subtopic..."
                  className="w-full pl-9 pr-4 py-2 bg-[#111217] border border-[#22242b] focus:border-indigo-500 rounded-xl text-xs text-[#f2f3f5] placeholder-[#5b5e6e] focus:outline-none"
                />
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Step Filter */}
                <select
                  value={stepFilter}
                  onChange={(e) => setStepFilter(e.target.value)}
                  className="px-3 py-2 bg-[#111217] border border-[#22242b] rounded-xl text-xs text-[#8e92a4] focus:outline-none cursor-pointer"
                >
                  <option value="all">All Steps (1..18)</option>
                  {Array.from({ length: 18 }, (_, i) => i + 1).map((s) => (
                    <option key={s} value={s}>Step {s}</option>
                  ))}
                </select>

                {/* Difficulty Filter */}
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="px-3 py-2 bg-[#111217] border border-[#22242b] rounded-xl text-xs text-[#8e92a4] focus:outline-none cursor-pointer"
                >
                  <option value="all">All Difficulties</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>

                {/* Visualizer Filter */}
                <select
                  value={visFilter}
                  onChange={(e) => setVisFilter(e.target.value)}
                  className="px-3 py-2 bg-[#111217] border border-[#22242b] rounded-xl text-xs text-[#8e92a4] focus:outline-none cursor-pointer"
                >
                  <option value="all">All Visualizers</option>
                  <option value="has_vis">Has Component</option>
                  <option value="missing_vis">Needs Component</option>
                </select>

                <button
                  onClick={() => setActiveTab('add')}
                  className="btn-primary text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Problem</span>
                </button>
              </div>
            </div>

            {/* Questions Table / List */}
            <div className="rounded-2xl bg-[#15161c] border border-[#22242b] overflow-hidden">
              <div className="px-5 py-3 border-b border-[#20222a] flex items-center justify-between text-xs text-[#8e92a4] bg-[#13141a]">
                <span>Showing <strong className="text-white">{filteredQuestions.length}</strong> of {questions.length} problems</span>
                <span className="hidden sm:inline font-mono">Click 'Edit' to customize videos or articles</span>
              </div>

              <div className="divide-y divide-[#1e2029] max-h-[70vh] overflow-y-auto scrollbar-thin">
                {filteredQuestions.map((q) => {
                  const hasVis = diskFiles.includes(`${q.component_key}.jsx`) || diskFiles.includes(`${q.component_key}.js`);
                  const videoCount = Array.isArray(q.youtube_videos) ? q.youtube_videos.length : (q.youtube_url ? 1 : 0);
                  const hasArticleContent = Boolean(q.article_content);

                  return (
                    <div
                      key={q.id}
                      className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-[#181921] transition-colors"
                    >
                      {/* Left: Problem Details */}
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap text-[11px] font-mono">
                          <span className="px-1.5 py-0.2 rounded bg-[#1c1e26] text-[#8e92a4] border border-[#272935]">
                            {q.display_id || `ID-${q.id.slice(0, 8)}`}
                          </span>
                          <span className="text-[#5b5e6e]">Step {q.step_no || 1} • {q.substep_name || q.category}</span>
                          <span className={`px-2 py-0.2 rounded-full font-semibold ${
                            q.difficulty === 'Easy'
                              ? 'text-emerald-400 bg-emerald-500/10'
                              : q.difficulty === 'Medium'
                              ? 'text-amber-400 bg-amber-500/10'
                              : 'text-rose-400 bg-rose-500/10'
                          }`}>
                            {q.difficulty}
                          </span>
                        </div>

                        <h3 className="text-sm font-semibold text-white truncate max-w-xl">
                          {q.title}
                        </h3>

                        {/* Resource Badges */}
                        <div className="flex items-center gap-2 text-xs flex-wrap pt-0.5">
                          {/* Videos Tag */}
                          <span className="inline-flex items-center gap-1 text-[10.5px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
                            <YoutubeIcon className="w-3 h-3" />
                            <span>{videoCount} {videoCount === 1 ? 'Video' : 'Videos'}</span>
                          </span>

                          {/* Article Tag */}
                          {hasArticleContent && (
                            <span className="inline-flex items-center gap-1 text-[10.5px] px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20">
                              <BookOpen className="w-3 h-3" />
                              <span>Custom Article</span>
                            </span>
                          )}

                          {/* Visualizer Tag */}
                          {hasVis ? (
                            <span className="inline-flex items-center gap-1 text-[10.5px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                              <Layers className="w-3 h-3" />
                              <span>{q.component_key}</span>
                            </span>
                          ) : (
                            <span className="text-[10px] text-[#5b5e6e]">
                              No visualizer
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        {/* Edit in Customizer */}
                        <button
                          onClick={() => handleSelectToEdit(q)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors cursor-pointer shadow-sm"
                          title="Customize YouTube videos, article and code solutions"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Customize</span>
                        </button>

                        {/* View Article Hub */}
                        <button
                          onClick={() => onNavigateArticle(q)}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#111217] hover:bg-[#1f202a] border border-[#272933] text-xs text-[#8e92a4] hover:text-white transition-colors cursor-pointer"
                          title="View Article & Learning Hub"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                        </button>

                        {/* View in Studio */}
                        {hasVis && (
                          <button
                            onClick={() => onNavigateQuestion(q)}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#111217] hover:bg-[#1f202a] border border-[#272933] text-xs text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
                            title="Launch in Interactive Visualizer Studio"
                          >
                            <Layers className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Delete */}
                        <button
                          onClick={() => handleDeleteQuestion(q)}
                          className="p-1.5 rounded-lg bg-[#111217] hover:bg-rose-500/20 border border-[#272933] text-[#5b5e6e] hover:text-rose-400 transition-colors cursor-pointer"
                          title="Permanently delete problem"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: PROBLEM CUSTOMIZER & MULTI-VIDEO MANAGER              */}
        {/* ============================================================ */}
        {activeTab === 'customizer' && (
          <div className="space-y-6">
            {editingData ? (
              <div className="space-y-6">
                
                {/* Top Action Bar */}
                <div className="p-4 rounded-2xl bg-[#15161c] border border-[#22242b] space-y-3">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <h2 className="text-base font-bold text-white flex items-center gap-2">
                        <span>Customizing:</span>
                        <span className="text-indigo-400">{editingData.title}</span>
                      </h2>
                      <p className="text-xs text-[#8e92a4]">
                        Edit multiple video links, custom article editorial, complexities, and code solutions.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onNavigateArticle(editingData)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#111217] hover:bg-[#1f202a] border border-[#272933] text-xs font-medium text-[#8e92a4] hover:text-white transition-colors cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Preview Article Hub</span>
                      </button>

                      <button
                        onClick={handleSaveQuestionChanges}
                        disabled={savingQuestion}
                        className="btn-primary text-xs flex items-center gap-2 cursor-pointer shadow-md shadow-indigo-600/25"
                      >
                        <Save className="w-4 h-4" />
                        <span>{savingQuestion ? 'Saving Changes...' : 'Save All Changes'}</span>
                      </button>
                    </div>
                  </div>

                  {/* ── Problem Quick-Navigate Dropdown ── */}
                  <div className="flex items-center gap-2 pt-1 border-t border-[#20222a]">
                    <span className="text-[11px] font-mono text-[#5b5e6e] shrink-0">Jump to problem:</span>
                    <select
                      value={editingData?.id || ''}
                      onChange={(e) => {
                        const found = questions.find((q) => q.id === e.target.value);
                        if (found) handleSelectToEdit(found);
                      }}
                      className="flex-1 max-w-lg px-3 py-1.5 bg-[#111217] border border-[#22242b] focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none cursor-pointer"
                    >
                      {questions.map((q) => (
                        <option key={q.id} value={q.id}>
                          [{q.display_id || q.id.slice(0,8)}] {q.title} (Step {q.step_no})
                        </option>
                      ))}
                    </select>
                    <span className="text-[11px] font-mono text-[#5b5e6e] shrink-0">{questions.length} problems</span>
                  </div>
                </div>

                {/* Section 1: Core Problem Metadata */}
                <section className="p-6 rounded-2xl bg-[#15161c] border border-[#22242b] space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-[#8e92a4]">
                    1. Problem Details &amp; Taxonomy
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs text-[#8e92a4] mb-1 font-medium">Problem Title</label>
                      <input
                        type="text"
                        value={editingData.title || ''}
                        onChange={(e) => setEditingData({ ...editingData, title: e.target.value })}
                        className="w-full px-3 py-2 bg-[#111217] border border-[#22242b] focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-[#8e92a4] mb-1 font-medium flex items-center gap-1.5">
                        Display ID
                        {displayIdConflict === 'checking' && <span className="text-[10px] text-amber-400 font-mono">checking…</span>}
                        {displayIdConflict && displayIdConflict !== 'checking' && <span className="text-[10px] text-rose-400 font-mono">⚠ conflict</span>}
                        {displayIdConflict === null && editingData.display_id && <span className="text-[10px] text-emerald-400 font-mono">✓ unique</span>}
                      </label>
                      <input
                        type="text"
                        value={editingData.display_id || ''}
                        onChange={(e) => {
                          setEditingData({ ...editingData, display_id: e.target.value });
                          validateDisplayId(e.target.value, editingData.id);
                        }}
                        placeholder="e.g. Q-1216"
                        className={`w-full px-3 py-2 bg-[#111217] border focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none font-mono ${
                          displayIdConflict && displayIdConflict !== 'checking'
                            ? 'border-rose-500/60'
                            : 'border-[#22242b]'
                        }`}
                      />
                      {displayIdConflict && displayIdConflict !== 'checking' && (
                        <p className="text-[10px] text-rose-400 mt-1 font-mono">
                          Already used by: {displayIdConflict.title}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs text-[#8e92a4] mb-1 font-medium">Difficulty</label>
                      <select
                        value={editingData.difficulty || 'Medium'}
                        onChange={(e) => setEditingData({ ...editingData, difficulty: e.target.value })}
                        className="w-full px-3 py-2 bg-[#111217] border border-[#22242b] focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none cursor-pointer"
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-[#8e92a4] mb-1 font-medium">Visualizer Component Key</label>
                      <input
                        type="text"
                        value={editingData.component_key || ''}
                        onChange={(e) => setEditingData({ ...editingData, component_key: e.target.value })}
                        placeholder="e.g. TwoSumVisualizer"
                        className="w-full px-3 py-2 bg-[#111217] border border-[#22242b] focus:border-indigo-500 rounded-xl text-xs text-indigo-400 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                    <div>
                      <label className="block text-xs text-[#8e92a4] mb-1 font-medium">Step Number (1..18)</label>
                      <input
                        type="number"
                        min="1"
                        max="18"
                        value={editingData.step_no || 1}
                        onChange={(e) => setEditingData({ ...editingData, step_no: e.target.value })}
                        className="w-full px-3 py-2 bg-[#111217] border border-[#22242b] focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-[#8e92a4] mb-1 font-medium">Step Name</label>
                      <input
                        type="text"
                        value={editingData.step_name || ''}
                        onChange={(e) => setEditingData({ ...editingData, step_name: e.target.value })}
                        className="w-full px-3 py-2 bg-[#111217] border border-[#22242b] focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-[#8e92a4] mb-1 font-medium">Subtopic Name</label>
                      <input
                        type="text"
                        value={editingData.substep_name || ''}
                        onChange={(e) => setEditingData({ ...editingData, substep_name: e.target.value })}
                        className="w-full px-3 py-2 bg-[#111217] border border-[#22242b] focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-[#8e92a4] mb-1 font-medium">LeetCode Problem URL</label>
                      <input
                        type="text"
                        value={editingData.leetcode_url || ''}
                        onChange={(e) => setEditingData({ ...editingData, leetcode_url: e.target.value })}
                        placeholder="https://leetcode.com/problems/..."
                        className="w-full px-3 py-2 bg-[#111217] border border-[#22242b] focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  {/* Complexities row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs text-[#8e92a4] mb-1 font-medium">Time Complexity</label>
                      <input
                        type="text"
                        value={editingData.time_complexity || ''}
                        onChange={(e) => setEditingData({ ...editingData, time_complexity: e.target.value })}
                        placeholder="e.g. O(N log N)"
                        className="w-full px-3 py-2 bg-[#111217] border border-[#22242b] focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#8e92a4] mb-1 font-medium">Space Complexity</label>
                      <input
                        type="text"
                        value={editingData.space_complexity || ''}
                        onChange={(e) => setEditingData({ ...editingData, space_complexity: e.target.value })}
                        placeholder="e.g. O(1)"
                        className="w-full px-3 py-2 bg-[#111217] border border-[#22242b] focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  {/* Tags chip editor */}
                  <div>
                    <label className="block text-xs text-[#8e92a4] mb-1 font-medium flex items-center gap-1.5">
                      <Tag className="w-3 h-3" />
                      Tags (press Enter or comma to add)
                    </label>
                    <div className="flex items-center flex-wrap gap-2 p-3 bg-[#111217] border border-[#22242b] rounded-xl min-h-[42px] cursor-text">
                      {(Array.isArray(editingData.tags) ? editingData.tags : []).map((tag, ti) => (
                        <span key={ti} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-[11px] font-mono">
                          {tag}
                          <button
                            type="button"
                            onClick={() => setEditingData(prev => ({ ...prev, tags: prev.tags.filter((_, i) => i !== ti) }))}
                            className="text-indigo-400 hover:text-rose-400 ml-0.5 cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                      <input
                        type="text"
                        value={tagInput}
                        onChange={e => setTagInput(e.target.value)}
                        onKeyDown={e => {
                          if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
                            e.preventDefault();
                            const newTag = tagInput.trim().replace(/,$/, '');
                            if (newTag && !(editingData.tags || []).includes(newTag)) {
                              setEditingData(prev => ({ ...prev, tags: [...(prev.tags || []), newTag] }));
                            }
                            setTagInput('');
                          } else if (e.key === 'Backspace' && !tagInput && editingData.tags?.length) {
                            setEditingData(prev => ({ ...prev, tags: prev.tags.slice(0, -1) }));
                          }
                        }}
                        placeholder="Add tag… (Enter or comma)"
                        className="flex-1 min-w-[120px] bg-transparent text-xs text-white focus:outline-none placeholder-[#5b5e6e]"
                      />
                    </div>
                  </div>
                </section>

                {/* Section 2: MULTIPLE YOUTUBE VIDEOS MANAGER (User feature request!) */}
                <section className="p-6 rounded-2xl bg-[#15161c] border border-[#22242b] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#20222a]">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
                        <YoutubeIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">Multiple YouTube Video Resources</h3>
                        <p className="text-xs text-[#8e92a4]">Add video solutions from Striver, NeetCode, Abdul Bari, etc.</p>
                      </div>
                    </div>

                    <button
                      onClick={handleAddVideoRow}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Another Video Link</span>
                    </button>
                  </div>

                  {/* Video List */}
                  <div className="space-y-3">
                    {Array.isArray(editingData.youtube_videos) && editingData.youtube_videos.map((vid, idx) => (
                      <div
                        key={vid.id || idx}
                        className="p-4 rounded-xl bg-[#111217] border border-[#22242b] space-y-3"
                      >
                        <div className="flex items-center justify-between text-xs font-mono text-[#8e92a4]">
                          <span className="font-semibold text-white">Video #{idx + 1}</span>
                          <div className="flex items-center gap-3">
                            <label className="flex items-center gap-1.5 cursor-pointer text-xs">
                              <input
                                type="radio"
                                name="primary_video"
                                checked={Boolean(vid.is_primary) || idx === 0}
                                onChange={() => {
                                  const updated = editingData.youtube_videos.map((v, i) => ({
                                    ...v,
                                    is_primary: i === idx
                                  }));
                                  setEditingData({ ...editingData, youtube_videos: updated });
                                }}
                              />
                              <span>Primary Tutorial</span>
                            </label>

                            <button
                              onClick={() => handleRemoveVideoRow(idx)}
                              className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                              title="Delete this video"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[11px] text-[#8e92a4] mb-1 font-medium">Video Title / Label</label>
                            <input
                              type="text"
                              value={vid.title || ''}
                              onChange={(e) => handleUpdateVideoRow(idx, 'title', e.target.value)}
                              placeholder="e.g. Striver's Full Solution"
                              className="w-full px-3 py-1.5 bg-[#16171d] border border-[#22242b] focus:border-indigo-500 rounded-lg text-xs text-white focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] text-[#8e92a4] mb-1 font-medium">Channel / Creator Name</label>
                            <input
                              type="text"
                              value={vid.channel || ''}
                              onChange={(e) => handleUpdateVideoRow(idx, 'channel', e.target.value)}
                              placeholder="e.g. take U forward, NeetCode, Abdul Bari"
                              className="w-full px-3 py-1.5 bg-[#16171d] border border-[#22242b] focus:border-indigo-500 rounded-lg text-xs text-white focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] text-[#8e92a4] mb-1 font-medium">YouTube URL</label>
                            <div className="flex items-center gap-1.5">
                              <input
                                type="text"
                                value={vid.url || ''}
                                onChange={(e) => handleUpdateVideoRow(idx, 'url', e.target.value)}
                                placeholder="https://youtu.be/..."
                                className="flex-1 px-3 py-1.5 bg-[#16171d] border border-[#22242b] focus:border-indigo-500 rounded-lg text-xs text-white focus:outline-none font-mono"
                              />
                              {vid.url && (
                                <a
                                  href={vid.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 rounded-lg bg-[#16171d] border border-[#22242b] text-[#8e92a4] hover:text-white"
                                  title="Test link"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {(!editingData.youtube_videos || editingData.youtube_videos.length === 0) && (
                      <div className="py-6 text-center text-xs text-[#5b5e6e]">
                        No videos attached yet. Click 'Add Another Video Link' to add one.
                      </div>
                    )}
                  </div>
                </section>

                {/* Section 3: Article & Editorial Customizer */}
                <section className="p-6 rounded-2xl bg-[#15161c] border border-[#22242b] space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-[#20222a]">
                    <BookOpen className="w-4 h-4 text-teal-400" />
                    <div>
                      <h3 className="text-sm font-bold text-white">Article &amp; Editorial Content</h3>
                      <p className="text-xs text-[#8e92a4]">Provide TakeUForward link and write curated editorial insights.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-[#8e92a4] mb-1 font-medium">External Article URL (TakeUForward)</label>
                        <input
                          type="text"
                          value={editingData.article_url || ''}
                          onChange={(e) => setEditingData({ ...editingData, article_url: e.target.value })}
                          placeholder="https://takeuforward.org/data-structure/..."
                          className="w-full px-3 py-2 bg-[#111217] border border-[#22242b] focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-emerald-400 mb-1 font-medium flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                          <span>GeeksforGeeks Article URL</span>
                        </label>
                        <input
                          type="text"
                          value={editingData.gfg_url || ''}
                          onChange={(e) => setEditingData({ ...editingData, gfg_url: e.target.value })}
                          placeholder="https://www.geeksforgeeks.org/..."
                          className="w-full px-3 py-2 bg-[#111217] border border-[#22242b] focus:border-emerald-500 rounded-xl text-xs text-white focus:outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-[#8e92a4] mb-1 font-medium">
                        Curated Editorial &amp; Problem Article Content (Markdown / Text)
                      </label>
                      <textarea
                        value={editingData.article_content || ''}
                        onChange={(e) => setEditingData({ ...editingData, article_content: e.target.value })}
                        rows={8}
                        placeholder="Write detailed intuition, step-by-step algorithms, memory diagrams, edge cases for learners..."
                        className="w-full p-4 bg-[#111217] border border-[#22242b] focus:border-indigo-500 rounded-xl text-xs text-[#f2f3f5] focus:outline-none font-mono leading-relaxed"
                      />
                    </div>
                  </div>
                </section>

                {/* Section 4: Multi-Language Code Solutions */}
                <section className="p-6 rounded-2xl bg-[#15161c] border border-[#22242b] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#20222a]">
                    <div className="flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-indigo-400" />
                      <h3 className="text-sm font-bold text-white">Code Solutions Editor</h3>
                    </div>

                    {/* Tier Switcher */}
                    <div className="flex items-center gap-1.5 bg-[#111217] p-1 rounded-xl border border-[#20222a]">
                      {['intuitive', 'better', 'optimal'].map((t) => (
                        <button
                          key={t}
                          onClick={() => setEditingTier(t)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                            editingTier === t
                              ? 'bg-indigo-600 text-white'
                              : 'text-[#8e92a4] hover:text-white'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-indigo-300 mb-1">C++ Solution</label>
                      <textarea
                        value={editingSolutions.cpp || ''}
                        onChange={(e) => setEditingSolutions({ ...editingSolutions, cpp: e.target.value })}
                        rows={7}
                        className="w-full p-3 bg-[#111217] border border-[#22242b] focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-amber-300 mb-1">Java Solution</label>
                      <textarea
                        value={editingSolutions.java || ''}
                        onChange={(e) => setEditingSolutions({ ...editingSolutions, java: e.target.value })}
                        rows={7}
                        className="w-full p-3 bg-[#111217] border border-[#22242b] focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-teal-300 mb-1">Python Solution</label>
                      <textarea
                        value={editingSolutions.python || ''}
                        onChange={(e) => setEditingSolutions({ ...editingSolutions, python: e.target.value })}
                        rows={7}
                        className="w-full p-3 bg-[#111217] border border-[#22242b] focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-yellow-300 mb-1">JavaScript Solution</label>
                      <textarea
                        value={editingSolutions.javascript || ''}
                        onChange={(e) => setEditingSolutions({ ...editingSolutions, javascript: e.target.value })}
                        rows={7}
                        className="w-full p-3 bg-[#111217] border border-[#22242b] focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                </section>

                {/* Section 5: Visualizer Upload */}
                <section className="p-6 rounded-2xl bg-[#15161c] border border-[#22242b] space-y-4">
                  <div className="flex items-center justify-between gap-3 pb-2 border-b border-[#20222a]">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                        <Code className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">Upload New Visualization Component</h3>
                        <p className="text-xs text-[#8e92a4]">Paste your .jsx React component to create a new interactive visualizer for this problem.</p>
                      </div>
                    </div>
                    {editingData.component_key && (
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Current: {editingData.component_key}
                      </span>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-[#8e92a4] mb-1 font-medium">Component Key / File Name (without .jsx)</label>
                      <input
                        type="text"
                        value={vizUploadKey}
                        onChange={e => setVizUploadKey(e.target.value)}
                        placeholder={`e.g. ${editingData.title?.replace(/[^a-zA-Z0-9]/g, '')}Visualizer`}
                        className="w-full px-3 py-2 bg-[#111217] border border-[#22242b] focus:border-indigo-500 rounded-xl text-xs text-indigo-400 focus:outline-none font-mono"
                      />
                      <p className="text-[10px] text-[#5b5e6e] mt-1">Leave blank to auto-generate from problem title. This becomes the filename: <code className="text-indigo-400">{vizUploadKey || `${editingData.title?.replace(/[^a-zA-Z0-9]/g, '') || 'MyProblem'}Visualizer`}.jsx</code></p>
                    </div>

                    <div>
                      <label className="block text-xs text-[#8e92a4] mb-1 font-medium">Visualizer JSX Component Code</label>
                      <textarea
                        value={vizUploadCode}
                        onChange={e => setVizUploadCode(e.target.value)}
                        rows={12}
                        placeholder={`Paste your complete React .jsx visualizer component here:\n\nexport default function MyVisualizer() {\n  return (\n    <div>...</div>\n  );\n}`}
                        className="w-full p-4 bg-[#0d0e12] border border-[#22242b] focus:border-indigo-500 rounded-xl text-xs text-[#f2f3f5] focus:outline-none font-mono leading-relaxed"
                        spellCheck={false}
                      />
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div className="text-xs text-[#5b5e6e]">
                        {vizUploadCode.trim() ? (
                          <span className="text-emerald-400 font-mono">{vizUploadCode.trim().split('\n').length} lines ready to save</span>
                        ) : (
                          <span>Paste a JSX visualizer component above to upload it.</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {vizUploadCode && (
                          <button
                            type="button"
                            onClick={() => { setVizUploadCode(''); setVizUploadKey(''); setVizUploadResult(null); }}
                            className="px-3 py-1.5 rounded-xl bg-[#111217] border border-[#22242b] text-xs text-[#8e92a4] hover:text-rose-400 transition-colors cursor-pointer"
                          >
                            Clear
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={handleUploadVisualizer}
                          disabled={vizUploading || !vizUploadCode.trim()}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>{vizUploading ? 'Saving Visualizer...' : 'Save & Link Visualizer'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Upload result */}
                    {vizUploadResult && (
                      <div className={`p-3 rounded-xl border text-xs font-mono ${
                        vizUploadResult.success
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                          : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                      }`}>
                        <div className="flex items-center gap-2">
                          {vizUploadResult.success
                            ? <><CheckCircle2 className="w-4 h-4" /><span>Saved as <strong>{vizUploadResult.key}.jsx</strong> and linked to this problem.</span></>
                            : <><AlertCircle className="w-4 h-4" /><span>Error: {vizUploadResult.error}</span></>
                          }
                        </div>
                      </div>
                    )}

                    {/* Info about existing visualizers */}
                    <div className="p-3 rounded-xl bg-[#0d0e12] border border-[#1e2029] text-xs text-[#5b5e6e] space-y-1">
                      <p className="font-mono text-[#8e92a4] font-semibold">Already have a component?</p>
                      <p>If the visualizer file already exists in <code className="text-indigo-400">src/visualizers/</code>, just type its name in the <strong className="text-white">"Visualizer Component Key"</strong> field above (Section 1) and save — no upload needed.</p>
                      <p className="pt-1">Current disk components: <strong className="text-white">{diskFiles.length}</strong> files. Go to the <button onClick={() => setActiveTab('visualizers')} className="text-indigo-400 hover:underline cursor-pointer">Visualizers tab</button> to see all.</p>
                    </div>
                  </div>
                </section>
              </div>
            ) : (
              <div className="p-12 rounded-2xl bg-[#15161c] border border-[#22242b] text-center space-y-3">
                <BookOpen className="w-8 h-8 text-[#5b5e6e] mx-auto" />
                <h3 className="text-sm font-semibold text-white">No Problem Selected</h3>
                <p className="text-xs text-[#8e92a4]">Select a problem from the Problem Catalog tab to customize its videos, article and code.</p>
                <button
                  onClick={() => setActiveTab('questions')}
                  className="btn-primary text-xs"
                >
                  Go to Problem Catalog
                </button>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: ADD NEW PROBLEM                                       */}
        {/* ============================================================ */}
        {activeTab === 'add' && (
          <form onSubmit={handleCreateNewQuestion} className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#15161c] border border-[#22242b] space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-indigo-400" />
                <span>Add New Problem to Sheet</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-[#8e92a4] mb-1 font-medium">Problem Title *</label>
                  <input
                    type="text"
                    required
                    value={newQuestion.title}
                    onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                    placeholder="e.g. Longest Palindromic Substring"
                    className="w-full px-3 py-2 bg-[#111217] border border-[#22242b] focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#8e92a4] mb-1 font-medium">Display ID</label>
                  <input
                    type="text"
                    value={newQuestion.display_id}
                    onChange={(e) => setNewQuestion({ ...newQuestion, display_id: e.target.value })}
                    placeholder="e.g. Q-500"
                    className="w-full px-3 py-2 bg-[#111217] border border-[#22242b] focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#8e92a4] mb-1 font-medium">Difficulty</label>
                  <select
                    value={newQuestion.difficulty}
                    onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}
                    className="w-full px-3 py-2 bg-[#111217] border border-[#22242b] focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none cursor-pointer"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                <div>
                  <label className="block text-xs text-[#8e92a4] mb-1 font-medium">Step Number</label>
                  <input
                    type="number"
                    min="1"
                    max="18"
                    value={newQuestion.step_no}
                    onChange={(e) => setNewQuestion({ ...newQuestion, step_no: e.target.value })}
                    className="w-full px-3 py-2 bg-[#111217] border border-[#22242b] focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#8e92a4] mb-1 font-medium">Step Name</label>
                  <input
                    type="text"
                    value={newQuestion.step_name}
                    onChange={(e) => setNewQuestion({ ...newQuestion, step_name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#111217] border border-[#22242b] focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#8e92a4] mb-1 font-medium">Subtopic Name</label>
                  <input
                    type="text"
                    value={newQuestion.substep_name}
                    onChange={(e) => setNewQuestion({ ...newQuestion, substep_name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#111217] border border-[#22242b] focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#8e92a4] mb-1 font-medium">Visualizer Component Key</label>
                  <input
                    type="text"
                    value={newQuestion.component_key}
                    onChange={(e) => setNewQuestion({ ...newQuestion, component_key: e.target.value })}
                    placeholder="e.g. MyNewVisualizer"
                    className="w-full px-3 py-2 bg-[#111217] border border-[#22242b] focus:border-indigo-500 rounded-xl text-xs text-indigo-400 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-xs text-[#8e92a4] mb-1 font-medium">Primary YouTube Video URL</label>
                <input
                  type="text"
                  value={newQuestion.youtube_videos[0]?.url || ''}
                  onChange={(e) => {
                    const updated = [...newQuestion.youtube_videos];
                    updated[0] = { ...updated[0], url: e.target.value };
                    setNewQuestion({ ...newQuestion, youtube_videos: updated });
                  }}
                  placeholder="https://youtu.be/..."
                  className="w-full px-3 py-2 bg-[#111217] border border-[#22242b] focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs text-[#8e92a4] mb-1 font-medium">Problem Statement / Description</label>
                <textarea
                  value={newQuestion.description}
                  onChange={(e) => setNewQuestion({ ...newQuestion, description: e.target.value })}
                  rows={4}
                  placeholder="Provide problem statement..."
                  className="w-full p-3 bg-[#111217] border border-[#22242b] focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none font-sans"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button type="submit" className="btn-primary text-xs flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span>Create Problem</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* ============================================================ */}
        {/* TAB 4: VISUALIZERS MANAGER                                   */}
        {/* ============================================================ */}
        {activeTab === 'visualizers' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#15161c] border border-[#22242b] flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-base font-bold text-white">Visualizer Components on Disk</h2>
                <p className="text-xs text-[#8e92a4]">
                  {diskFiles.length} interactive visualizer components detected in `src/visualizers/`.
                </p>
              </div>

              <button
                onClick={handleAutoLink}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Auto-Link Visualizers to Problems</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {diskFiles.map((file) => {
                const key = file.replace(/\.(jsx|js)$/, '');
                const matchedQ = questions.find((q) => q.component_key === key);

                return (
                  <div
                    key={file}
                    className="p-4 rounded-xl bg-[#15161c] border border-[#22242b] space-y-2 hover:border-[#2e313d] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileCode className="w-4 h-4 text-indigo-400" />
                        <span className="font-mono text-xs font-bold text-white">{file}</span>
                      </div>
                      {matchedQ ? (
                        <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                          Linked ✓
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/25">
                          Unlinked
                        </span>
                      )}
                    </div>

                    {matchedQ ? (
                      <div className="text-xs text-[#8e92a4] pt-1">
                        Bound to: <strong className="text-white">{matchedQ.title}</strong>
                      </div>
                    ) : (
                      <div className="text-xs text-[#5b5e6e] pt-1">
                        Not bound to any active question
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 5: DATABASE TOOLS                                        */}
        {/* ============================================================ */}
        {activeTab === 'database' && (
          <div className="space-y-6 max-w-2xl">
            <div className="p-6 rounded-2xl bg-[#15161c] border border-[#22242b] space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-indigo-400" />
                <span>SQLite Database Backup &amp; Recovery</span>
              </h2>
              <p className="text-xs text-[#8e92a4] leading-relaxed">
                Export the entire dataset (all 450 problems, multiple video links, custom articles, and code solutions) as a clean JSON backup, or restore from a previous backup file.
              </p>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={handleExportDB}
                  className="btn-primary text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Backup JSON</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB: GEMINI SPARK RESEARCH IMPORTER                          */}
        {/* ============================================================ */}
        {activeTab === 'gemini' && (
          <div className="space-y-6 max-w-5xl">
            {/* Header Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-[#15161c] to-[#121318] border border-indigo-500/30 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-400" />
                    <h2 className="text-lg font-bold text-white">Gemini Spark DSA Research Center</h2>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                      Google Search &amp; YouTube Grounding
                    </span>
                  </div>
                  <p className="text-xs text-[#8e92a4] max-w-2xl leading-relaxed">
                    Feed your problems database to Gemini Spark to discover verified alternate video solutions (NeetCode, Abdul Bari, Aditya Verma, CodeWithHarry) and GeeksforGeeks articles, then paste the output here to merge instantly into SQLite!
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap shrink-0">
                  <button
                    onClick={handleCopyMasterPrompt}
                    className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    {copiedPrompt ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedPrompt ? 'Prompt Copied!' : 'Copy Master Prompt'}</span>
                  </button>

                  <button
                    onClick={handleDownloadMasterDB}
                    className="px-3.5 py-2 rounded-xl bg-[#1c1d25] hover:bg-[#252834] border border-[#2e3140] text-[#c5c8d6] hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-indigo-400" />
                    <span>Download Master DB (JSON)</span>
                  </button>

                  <button
                    onClick={handleDownloadCsv}
                    className="px-3.5 py-2 rounded-xl bg-[#1c1d25] hover:bg-[#252834] border border-[#2e3140] text-[#c5c8d6] hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-emerald-400" />
                    <span>Download CSV</span>
                  </button>
                </div>
              </div>

              {/* Research Pipeline Stepper */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#20222e]">
                <div className="p-3 rounded-xl bg-[#101117] border border-[#1e202b] space-y-1">
                  <span className="text-[10px] font-mono font-bold text-indigo-400">STEP 1: GET PROMPT</span>
                  <div className="text-xs font-semibold text-white">Copy System Prompt &amp; Batch</div>
                  <p className="text-[11px] text-[#5b5e6e]">Use pre-generated batch files in <code className="text-[#8e92a4]">data/gemini_research/prompts/</code></p>
                </div>
                <div className="p-3 rounded-xl bg-[#101117] border border-[#1e202b] space-y-1">
                  <span className="text-[10px] font-mono font-bold text-teal-400">STEP 2: RUN IN GEMINI</span>
                  <div className="text-xs font-semibold text-white">Gemini Spark Real-time Search</div>
                  <p className="text-[11px] text-[#5b5e6e]">Searches YouTube &amp; Google to find verified links &amp; channels</p>
                </div>
                <div className="p-3 rounded-xl bg-[#101117] border border-[#1e202b] space-y-1">
                  <span className="text-[10px] font-mono font-bold text-emerald-400">STEP 3: MERGE DATA</span>
                  <div className="text-xs font-semibold text-white">Paste &amp; Instant Merge</div>
                  <p className="text-[11px] text-[#5b5e6e]">Preserves Striver's primary video, adds alternates and GFG links</p>
                </div>
              </div>
            </div>

            {/* Importer Form Card */}
            <div className="p-6 rounded-2xl bg-[#15161c] border border-[#22242b] space-y-4">
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#20222a]">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-sm font-bold text-white">Paste Gemini Spark JSON Output</h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleLoadSampleTwoSum}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
                  >
                    Load Sample (Two Sum)
                  </button>
                  {geminiJsonInput && (
                    <button
                      onClick={() => setGeminiJsonInput('')}
                      className="text-xs text-[#8e92a4] hover:text-rose-400 font-medium cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              <div>
                <textarea
                  value={geminiJsonInput}
                  onChange={(e) => setGeminiJsonInput(e.target.value)}
                  rows={12}
                  placeholder={`Paste Gemini's JSON array response here, for example:
[
  {
    "id": "two-sum",
    "title": "Two Sum",
    "gfg_url": "https://www.geeksforgeeks.org/check-if-pair-with-given-sum-exists-in-array/",
    "alternate_videos": [
      {
        "id": "neetcode-two-sum",
        "title": "NeetCode - Two Sum",
        "url": "https://www.youtube.com/watch?v=KLlXCFG5TnA",
        "channel": "NeetCode"
      }
    ]
  }
]`}
                  className="w-full p-4 bg-[#101116] border border-[#22242b] focus:border-indigo-500 rounded-xl text-xs text-[#f2f3f5] focus:outline-none font-mono leading-relaxed"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <div className="text-xs text-[#5b5e6e]">
                  {geminiJsonInput.trim() ? (
                    <span className="text-emerald-400 font-mono">
                      Ready to parse ({geminiJsonInput.trim().length} characters)
                    </span>
                  ) : (
                    <span>Waiting for input. You can test with the sample button above.</span>
                  )}
                </div>

                <button
                  onClick={handleImportGemini}
                  disabled={importingGemini || !geminiJsonInput.trim()}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{importingGemini ? 'Merging into SQLite...' : 'Merge Research into Database'}</span>
                </button>
              </div>

              {/* Import Result Notification */}
              {geminiResult && (
                <div className={`p-4 rounded-xl border text-xs font-mono space-y-2 ${
                  geminiResult.error
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                    : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                }`}>
                  <div className="flex items-center gap-2 font-bold">
                    {geminiResult.error ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                    <span>{geminiResult.error ? `Error: ${geminiResult.error}` : `Successfully updated ${geminiResult.updatedCount} problem(s)!`}</span>
                  </div>

                  {Array.isArray(geminiResult.results) && geminiResult.results.length > 0 && (
                    <div className="max-h-48 overflow-y-auto space-y-1 pt-1 border-t border-emerald-500/20">
                      {geminiResult.results.map((r, idx) => (
                        <div key={idx} className="flex items-center justify-between text-[11px]">
                          <span>{idx + 1}. [{r.id}] {r.title}</span>
                          <span className="text-[#8e92a4]">updated: {r.updatedFields.join(', ')}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Ready-Made Batch Guides Quick Reference */}
            <div className="p-6 rounded-2xl bg-[#15161c] border border-[#22242b] space-y-4">
              <div className="flex items-center justify-between gap-3 pb-2 border-b border-[#20222a]">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-teal-400" />
                  <h3 className="text-sm font-bold text-white">Pre-Generated Research Batches</h3>
                </div>
                <span className="text-xs text-[#8e92a4]">20 Batches • 450 Problems Total</span>
              </div>
              <p className="text-xs text-[#8e92a4] leading-relaxed">
                All 450 problems are pre-divided into 20 bite-sized prompt files in your project directory at <code className="text-indigo-400 font-mono">data/gemini_research/prompts/</code>.
                You can also run the CLI importer anytime:
              </p>
              <div className="p-3 rounded-xl bg-[#101116] border border-[#20222b] font-mono text-xs text-indigo-300">
                node scripts/import_gemini_research.mjs data/gemini_research/results/batch_01.json
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
