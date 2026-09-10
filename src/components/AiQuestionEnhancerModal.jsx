import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  X,
  FileText,
  Save,
  RefreshCw,
  AlertCircle,
  HelpCircle,
  Code2
} from 'lucide-react';
import { api } from '../services/api';
import { sound } from '../services/audio';

export default function AiQuestionEnhancerModal({
  isOpen,
  onClose,
  question,
  solutions = {},
  onQuestionUpdated
}) {
  if (!isOpen || !question) return null;

  const [activeTab, setActiveTab] = useState('ai_enhance'); // 'ai_enhance' | 'manual_edit'
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [pasteInput, setPasteInput] = useState('');
  const [parseError, setParseError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Manual edit form fields
  const [formData, setFormData] = useState({
    title: question.title || '',
    display_id: question.display_id || '',
    category: question.category || '',
    difficulty: question.difficulty || 'Easy',
    time_complexity: question.time_complexity || 'O(N)',
    space_complexity: question.space_complexity || 'O(1)',
    description: question.description || '',
    approach: question.approach || '',
    tags: Array.isArray(question.tags) ? question.tags.join(', ') : (question.tags || '')
  });

  useEffect(() => {
    if (question) {
      setFormData({
        title: question.title || '',
        display_id: question.display_id || '',
        category: question.category || '',
        difficulty: question.difficulty || 'Easy',
        time_complexity: question.time_complexity || 'O(N)',
        space_complexity: question.space_complexity || 'O(1)',
        description: question.description || '',
        approach: question.approach || '',
        tags: Array.isArray(question.tags) ? question.tags.join(', ') : (question.tags || '')
      });
      setPasteInput('');
      setParseError(null);
    }
  }, [question]);

  const generateEnhancePrompt = () => {
    const cppCode = solutions?.cpp || '// Reference solution';
    return `Act as a Principal Algorithms Curriculum Engineer (Striver / NeetCode caliber) and technical writer for AlgoVision.
Transform and upgrade this raw DSA problem specification into an elite, crystal-clear, highly educational problem statement:

Target Problem:
- ID: ${question.display_id || question.leetcode_id || 'Q-001'}
- Title: "${question.title}"
- Category: "${question.category || 'Algorithms'}"
- Difficulty: "${question.difficulty || 'Medium'}"

Raw Description:
${question.description || 'N/A'}

Raw Approach:
${question.approach || 'N/A'}

Reference Code:
\`\`\`cpp
${cppCode}
\`\`\`

Strict Editorial Directives:
1. Problem Statement: Crystal clear, concise, standard LeetCode/Striver style.
2. Formatted Examples: 2-3 detailed examples with:
   - Input: ...
   - Output: ...
   - Explanation: Step-by-step trace showing WHY the output is correct.
3. Constraints: Realistic constraints (e.g. 1 <= N <= 10^5, -10^9 <= arr[i] <= 10^9).
4. Multi-Tier Approaches & Invariants:
   - Intuitive: Brute force baseline intuition, limitations.
   - Better: Optimized intermediate approach (e.g. Hash Map, Prefix Sum, Stack).
   - Optimal: Optimal invariant, two-pointer/sliding window/greedy/DP insight with edge-case handling.
5. Exact Complexities: Time & Space in Big-O notation (e.g., O(N) and O(1)).
6. Tags: 3-5 relevant algorithmic tags (e.g., ["arrays", "two-pointers", "sliding-window"]).

CRITICAL: Return your response strictly as a JSON object matching this schema so it can be automatically applied into AlgoVision SQLite database:
\`\`\`json
{
  "title": "${question.title}",
  "display_id": "${question.display_id || ''}",
  "category": "${question.category || ''}",
  "difficulty": "${question.difficulty || 'Easy'}",
  "time_complexity": "O(...)",
  "space_complexity": "O(...)",
  "description": "Problem statement with formatted Examples and Constraints...",
  "approach": "Detailed breakdown of Intuitive, Better, and Optimal approaches with invariants...",
  "tags": ["tag1", "tag2", "tag3"]
}
\`\`\``;
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(generateEnhancePrompt());
    setCopiedPrompt(true);
    sound?.playStep?.(580);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  const handleApplyPaste = () => {
    setParseError(null);
    if (!pasteInput.trim()) {
      setParseError('Please paste the JSON response from the AI.');
      return;
    }

    try {
      // Extract json from markdown code fences if present
      let rawJson = pasteInput.trim();
      const jsonMatch = rawJson.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        rawJson = jsonMatch[1].trim();
      }

      const parsed = JSON.parse(rawJson);

      setFormData((prev) => ({
        ...prev,
        title: parsed.title || prev.title,
        display_id: parsed.display_id || prev.display_id,
        category: parsed.category || prev.category,
        difficulty: parsed.difficulty || prev.difficulty,
        time_complexity: parsed.time_complexity || prev.time_complexity,
        space_complexity: parsed.space_complexity || prev.space_complexity,
        description: parsed.description || prev.description,
        approach: parsed.approach || prev.approach,
        tags: Array.isArray(parsed.tags) ? parsed.tags.join(', ') : (parsed.tags || prev.tags)
      }));

      sound?.playSuccess?.();
      setActiveTab('manual_edit'); // switch to review & save
    } catch (err) {
      setParseError(`JSON parse error: ${err.message}. Ensure valid JSON was pasted.`);
    }
  };

  const handleSaveToDb = async () => {
    setIsSaving(true);
    setParseError(null);

    const tagsArray = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const updates = {
      title: formData.title.trim(),
      display_id: formData.display_id.trim() || undefined,
      category: formData.category.trim(),
      difficulty: formData.difficulty,
      time_complexity: formData.time_complexity.trim(),
      space_complexity: formData.space_complexity.trim(),
      description: formData.description.trim(),
      approach: formData.approach.trim(),
      tags: tagsArray
    };

    try {
      const res = await api.updateQuestion(question.id, updates);
      if (res) {
        sound?.playSuccess?.();
        setSaveSuccess(true);
        if (onQuestionUpdated) {
          onQuestionUpdated({ ...question, ...updates });
        }
        setTimeout(() => {
          setSaveSuccess(false);
          onClose();
        }, 1200);
      } else {
        setParseError('Failed to save updates to SQLite.');
      }
    } catch (err) {
      setParseError(err.message || 'Error updating question');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[var(--board-raised)] border border-[var(--line-strong)] rounded-[4px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-5 py-4 bg-[var(--board)] border-b border-[var(--line)] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[var(--amber-dim)] border border-[var(--amber)] flex items-center justify-center text-[var(--amber)]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-[14px] font-bold font-sans text-[var(--chalk)]">
                AI Question Enhancer & Specification Editor
              </h2>
              <p className="text-[11.5px] font-mono text-[var(--chalk-faint)]">
                {question.display_id || question.leetcode_id} · {question.title}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded text-[var(--chalk-faint)] hover:text-[var(--chalk)] hover:bg-[var(--line)] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-5 pt-2 bg-[var(--board-raised-2)] border-b border-[var(--line)] flex items-center gap-4 text-[12.5px] font-mono">
          <button
            onClick={() => setActiveTab('ai_enhance')}
            className={`pb-2.5 border-b-2 transition ${
              activeTab === 'ai_enhance'
                ? 'border-[var(--amber)] text-[var(--amber)] font-semibold'
                : 'border-transparent text-[var(--chalk-faint)] hover:text-[var(--chalk-dim)]'
            }`}
          >
            1. ✨ AI Enhancement Workflow
          </button>
          <button
            onClick={() => setActiveTab('manual_edit')}
            className={`pb-2.5 border-b-2 transition ${
              activeTab === 'manual_edit'
                ? 'border-[var(--amber)] text-[var(--amber)] font-semibold'
                : 'border-transparent text-[var(--chalk-faint)] hover:text-[var(--chalk-dim)]'
            }`}
          >
            2. ✍ Review & Edit Specification
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {parseError && (
            <div className="p-3 rounded bg-[#e06c75]/10 border border-[#e06c75]/30 text-[#e06c75] text-[12px] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{parseError}</span>
            </div>
          )}

          {saveSuccess && (
            <div className="p-3 rounded bg-[var(--easy)]/15 border border-[var(--easy)]/40 text-[var(--easy)] text-[12px] flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>Question specification successfully updated in SQLite database!</span>
            </div>
          )}

          {activeTab === 'ai_enhance' ? (
            <div className="space-y-4">
              <div className="p-3.5 rounded bg-[var(--board-raised-2)] border border-[var(--line)] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[12.5px] font-medium text-[var(--chalk)]">
                    Step 1: Copy AI Prompt for Gemini / Claude / ChatGPT
                  </span>
                  <button
                    onClick={handleCopyPrompt}
                    className="chalk-btn chalk-btn-amber"
                  >
                    {copiedPrompt ? <Check className="w-3 h-3 text-[var(--easy)]" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedPrompt ? 'Copied Prompt!' : 'Copy AI Prompt'}</span>
                  </button>
                </div>
                <p className="text-[11.5px] text-[var(--chalk-dim)] leading-relaxed">
                  This prompt instructs the AI to format the raw problem with formal descriptions, structured input/output examples with explanations, constraints, and algorithmic invariants.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-mono text-[var(--chalk-dim)]">
                  Step 2: Paste AI Response (JSON or Markdown)
                </label>
                <textarea
                  value={pasteInput}
                  onChange={(e) => setPasteInput(e.target.value)}
                  placeholder="Paste the generated JSON here (e.g. { 'title': '...', 'description': '...', 'approach': '...' })..."
                  rows={8}
                  className="w-full p-3 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-[12px] font-mono text-[var(--chalk)] focus:outline-none focus:border-[var(--amber)] transition resize-none"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleApplyPaste}
                    className="chalk-btn chalk-btn-amber"
                    disabled={!pasteInput.trim()}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Parse & Review Fields</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3.5 font-mono text-[11.5px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[var(--chalk-faint)] block mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk)] focus:outline-none focus:border-[var(--amber)]"
                  />
                </div>
                <div>
                  <label className="text-[var(--chalk-faint)] block mb-1">Display ID</label>
                  <input
                    type="text"
                    value={formData.display_id}
                    onChange={(e) => setFormData({ ...formData, display_id: e.target.value })}
                    placeholder="Q-001 or LC 1"
                    className="w-full px-2.5 py-1.5 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk)] focus:outline-none focus:border-[var(--amber)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-[var(--chalk-faint)] block mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk)] focus:outline-none focus:border-[var(--amber)]"
                  />
                </div>
                <div>
                  <label className="text-[var(--chalk-faint)] block mb-1">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk)] focus:outline-none focus:border-[var(--amber)]"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                <div>
                  <label className="text-[var(--chalk-faint)] block mb-1">Time Complexity</label>
                  <input
                    type="text"
                    value={formData.time_complexity}
                    onChange={(e) => setFormData({ ...formData, time_complexity: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk)] focus:outline-none focus:border-[var(--amber)]"
                  />
                </div>
                <div>
                  <label className="text-[var(--chalk-faint)] block mb-1">Space Complexity</label>
                  <input
                    type="text"
                    value={formData.space_complexity}
                    onChange={(e) => setFormData({ ...formData, space_complexity: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk)] focus:outline-none focus:border-[var(--amber)]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[var(--chalk-faint)] block mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="arrays, two-pointers, sliding-window"
                  className="w-full px-2.5 py-1.5 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk)] focus:outline-none focus:border-[var(--amber)]"
                />
              </div>

              <div>
                <label className="text-[var(--chalk-faint)] block mb-1">Problem Description &amp; Examples</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={6}
                  className="w-full p-2.5 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-[12px] font-sans text-[var(--chalk)] focus:outline-none focus:border-[var(--amber)] leading-relaxed resize-none"
                />
              </div>

              <div>
                <label className="text-[var(--chalk-faint)] block mb-1">Approach &amp; Invariants</label>
                <textarea
                  value={formData.approach}
                  onChange={(e) => setFormData({ ...formData, approach: e.target.value })}
                  rows={4}
                  className="w-full p-2.5 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-[12px] font-sans text-[var(--chalk)] focus:outline-none focus:border-[var(--amber)] leading-relaxed resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-[var(--board)] border-t border-[var(--line)] flex items-center justify-between">
          <button
            onClick={onClose}
            className="chalk-btn"
          >
            Cancel
          </button>

          <button
            onClick={handleSaveToDb}
            disabled={isSaving}
            className="chalk-btn chalk-btn-amber"
          >
            {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>{isSaving ? 'Saving to SQLite...' : 'Save to SQLite DB'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
