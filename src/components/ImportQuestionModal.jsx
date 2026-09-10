import React, { useState, useRef } from 'react';
import { Upload, FileCode, Download, Copy, Check, AlertCircle, Sparkles, X, FileText, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

const JSON_TEMPLATE = [
  {
    "title": "Valid Anagram",
    "display_id": "Q-242",
    "leetcode_id": 242,
    "category": "Arrays & Hashing",
    "difficulty": "Easy",
    "time_complexity": "O(N)",
    "space_complexity": "O(1)",
    "leetcode_url": "https://leetcode.com/problems/valid-anagram/",
    "description": "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    "approach": "Count frequency of characters in string s, then decrement count with characters in string t. If all counts reach zero, it is a valid anagram.",
    "tags": ["Array", "Hash Table", "String", "Sorting"],
    "code_cpp": "class Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        if (s.length() != t.length()) return false;\n        vector<int> count(26, 0);\n        for (char c : s) count[c - 'a']++;\n        for (char c : t) {\n            if (--count[c - 'a'] < 0) return false;\n        }\n        return true;\n    }\n};",
    "code_python": "class Solution:\n    def isAnagram(self, s: str, t: str) -> bool:\n        if len(s) != len(t):\n            return False\n        count = {}\n        for char in s:\n            count[char] = count.get(char, 0) + 1\n        for char in t:\n            if char not in count or count[char] == 0:\n                return False\n            count[char] -= 1\n        return True",
    "code_java": "class Solution {\n    public boolean isAnagram(String s, String t) {\n        if (s.length() != t.length()) return false;\n        int[] count = new int[26];\n        for (char c : s.toCharArray()) count[c - 'a']++;\n        for (char c : t.toCharArray()) {\n            if (--count[c - 'a'] < 0) return false;\n        }\n        return true;\n    }\n}",
    "code_javascript": "var isAnagram = function(s, t) {\n    if (s.length !== t.length) return false;\n    const map = {};\n    for (let c of s) map[c] = (map[c] || 0) + 1;\n    for (let c of t) {\n        if (!map[c]) return false;\n        map[c]--;\n    }\n    return true;\n};"
  }
];

const CSV_TEMPLATE = `title,leetcode_id,category,difficulty,time_complexity,space_complexity,leetcode_url,description,approach,tags
"Valid Anagram",242,"Arrays & Hashing","Easy","O(N)","O(1)","https://leetcode.com/problems/valid-anagram/","Given two strings s and t return true if anagram","Character frequency counting array","Array,Hash Table,String"`;

export default function ImportQuestionModal({ isOpen, onClose, onImportSuccess }) {
  const [activeTab, setActiveTab] = useState('json'); // 'json' | 'csv' | 'template'
  const [inputText, setInputText] = useState('');
  const [parsedQuestions, setParsedQuestions] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [successCount, setSuccessCount] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // Handle JSON Text Validation
  const validateJson = (text) => {
    try {
      if (!text.trim()) {
        setParsedQuestions([]);
        setErrorMsg(null);
        return;
      }
      const parsed = JSON.parse(text);
      const list = Array.isArray(parsed) ? parsed : [parsed];
      if (list.length === 0 || !list[0].title) {
        setErrorMsg('Each question object must contain at least a "title" field.');
        setParsedQuestions([]);
        return;
      }
      setParsedQuestions(list);
      setErrorMsg(null);
    } catch (e) {
      setErrorMsg('Invalid JSON format: ' + e.message);
      setParsedQuestions([]);
    }
  };

  // Handle CSV Parsing
  const parseCsvText = (text) => {
    try {
      const lines = text.trim().split(/\r?\n/);
      if (lines.length < 2) {
        setErrorMsg('CSV must contain a header row and at least one data row.');
        setParsedQuestions([]);
        return;
      }

      // Basic CSV splitter with quoted string support
      const splitCsvLine = (line) => {
        const result = [];
        let cur = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            result.push(cur.trim().replace(/^"|"$/g, ''));
            cur = '';
          } else {
            cur += char;
          }
        }
        result.push(cur.trim().replace(/^"|"$/g, ''));
        return result;
      };

      const headers = splitCsvLine(lines[0]).map(h => h.toLowerCase().trim());
      const questions = [];

      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const values = splitCsvLine(lines[i]);
        const qObj = {};
        headers.forEach((h, idx) => {
          qObj[h] = values[idx] || '';
        });
        if (qObj.title) {
          questions.push(qObj);
        }
      }

      if (questions.length === 0) {
        setErrorMsg('No valid question rows found in CSV.');
        setParsedQuestions([]);
        return;
      }

      setParsedQuestions(questions);
      setErrorMsg(null);
    } catch (e) {
      setErrorMsg('CSV parsing error: ' + e.message);
      setParsedQuestions([]);
    }
  };

  const handleTextChange = (val) => {
    setInputText(val);
    if (activeTab === 'json') {
      validateJson(val);
    } else if (activeTab === 'csv') {
      parseCsvText(val);
    }
  };

  // Handle File Upload Drop / Select
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        setInputText(content);
        if (file.name.endsWith('.csv')) {
          setActiveTab('csv');
          parseCsvText(content);
        } else {
          setActiveTab('json');
          validateJson(content);
        }
      }
    };
    reader.readAsText(file);
  };

  // Download Templates
  const downloadFile = (filename, content, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyTemplateJson = () => {
    navigator.clipboard.writeText(JSON.stringify(JSON_TEMPLATE, null, 2));
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  // Submit Import
  const handleImport = async () => {
    if (parsedQuestions.length === 0) return;
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const result = await api.bulkImportQuestions(parsedQuestions);
      if (result.success) {
        setSuccessCount(result.importedCount);
        setTimeout(() => {
          if (onImportSuccess) onImportSuccess(result.importedCount);
          onClose();
        }, 1200);
      } else {
        setErrorMsg(result.error || 'Import failed. Check your data format.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Import failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#0e111a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Import & Add DSA Questions
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Bulk or Single
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Import DSA problems via JSON or CSV with multi-language starter code & intuition.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="px-6 pt-3 flex items-center justify-between border-b border-white/5 bg-zinc-950/40">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setActiveTab('json'); validateJson(inputText); }}
              className={`px-3 py-2 text-xs font-mono font-medium rounded-t-lg transition flex items-center gap-1.5 border-b-2 ${
                activeTab === 'json'
                  ? 'border-amber-400 text-amber-300 bg-white/5'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" /> JSON Import
            </button>
            <button
              onClick={() => { setActiveTab('csv'); parseCsvText(inputText); }}
              className={`px-3 py-2 text-xs font-mono font-medium rounded-t-lg transition flex items-center gap-1.5 border-b-2 ${
                activeTab === 'csv'
                  ? 'border-emerald-400 text-emerald-300 bg-white/5'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> CSV Import
            </button>
            <button
              onClick={() => setActiveTab('template')}
              className={`px-3 py-2 text-xs font-mono font-medium rounded-t-lg transition flex items-center gap-1.5 border-b-2 ${
                activeTab === 'template'
                  ? 'border-indigo-400 text-indigo-300 bg-white/5'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" /> Format Schema & Templates
            </button>
          </div>

          <div className="flex items-center gap-2 pb-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".json,.csv"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1 text-xs font-mono rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 transition flex items-center gap-1.5"
            >
              <Upload className="w-3 h-3" /> Select File
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-4">
          {activeTab === 'template' ? (
            /* Template & Schema Documentation */
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-indigo-500/20 bg-indigo-950/20">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
                    <Download className="w-4 h-4" /> Download Official Import Templates
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyTemplateJson}
                      className="px-2.5 py-1 text-xs font-mono rounded bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-200 border border-indigo-500/40 transition flex items-center gap-1"
                    >
                      {copiedTemplate ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      {copiedTemplate ? 'Copied' : 'Copy JSON'}
                    </button>
                    <button
                      onClick={() => downloadFile('dsa-import-template.json', JSON.stringify(JSON_TEMPLATE, null, 2), 'application/json')}
                      className="px-2.5 py-1 text-xs font-mono rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 transition flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" /> .JSON Template
                    </button>
                    <button
                      onClick={() => downloadFile('dsa-import-template.csv', CSV_TEMPLATE, 'text/csv')}
                      className="px-2.5 py-1 text-xs font-mono rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-500/40 transition flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" /> .CSV Template
                    </button>
                  </div>
                </div>
                <p className="text-xs text-zinc-400">
                  Use these templates to create single problems or entire sheets (like Striver 79, NeetCode 150, Grind 75) and import them with one click.
                </p>
              </div>

              {/* Field Reference Table */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4 space-y-2">
                <h4 className="text-xs font-mono font-semibold uppercase text-zinc-300">Supported Schema Fields</h4>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 rounded bg-zinc-900 border border-zinc-800"><span className="text-amber-400 font-bold">title*</span>: Problem title (Required)</div>
                  <div className="p-2 rounded bg-zinc-900 border border-zinc-800"><span className="text-zinc-300 font-bold">difficulty</span>: Easy | Medium | Hard</div>
                  <div className="p-2 rounded bg-zinc-900 border border-zinc-800"><span className="text-zinc-300 font-bold">category</span>: Topic (e.g. Arrays, Trees, DP)</div>
                  <div className="p-2 rounded bg-zinc-900 border border-zinc-800"><span className="text-zinc-300 font-bold">leetcode_id</span>: Integer ID (e.g. 242)</div>
                  <div className="p-2 rounded bg-zinc-900 border border-zinc-800"><span className="text-zinc-300 font-bold">time_complexity</span>: e.g. O(N log N)</div>
                  <div className="p-2 rounded bg-zinc-900 border border-zinc-800"><span className="text-zinc-300 font-bold">space_complexity</span>: e.g. O(1)</div>
                  <div className="p-2 rounded bg-zinc-900 border border-zinc-800"><span className="text-zinc-300 font-bold">description</span>: Full problem statement</div>
                  <div className="p-2 rounded bg-zinc-900 border border-zinc-800"><span className="text-zinc-300 font-bold">approach</span>: Intuition & algorithm steps</div>
                  <div className="p-2 rounded bg-zinc-900 border border-zinc-800"><span className="text-zinc-300 font-bold">tags</span>: Array of string tags</div>
                  <div className="p-2 rounded bg-zinc-900 border border-zinc-800"><span className="text-zinc-300 font-bold">code_cpp / code_python</span>: Solution snippets</div>
                </div>
              </div>

              {/* Preview sample */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 overflow-x-auto max-h-48 text-[11px] font-mono text-zinc-300">
                <pre>{JSON.stringify(JSON_TEMPLATE[0], null, 2)}</pre>
              </div>
            </div>
          ) : (
            /* Input Area for JSON / CSV */
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono text-zinc-400">
                  Paste {activeTab.toUpperCase()} content or drag & drop file:
                </label>
                <button
                  onClick={() => {
                    const sample = activeTab === 'json' ? JSON.stringify(JSON_TEMPLATE, null, 2) : CSV_TEMPLATE;
                    handleTextChange(sample);
                  }}
                  className="text-xs font-mono text-amber-400 hover:text-amber-300 hover:underline"
                >
                  Load Sample {activeTab.toUpperCase()}
                </button>
              </div>

              <textarea
                value={inputText}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder={activeTab === 'json' ? '[\n  {\n    "title": "Two Sum",\n    "difficulty": "Easy",\n    ...\n  }\n]' : 'title,leetcode_id,difficulty,category\n"Two Sum",1,"Easy","Arrays"'}
                className="w-full h-56 p-3 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-200 font-mono text-xs focus:outline-none focus:border-amber-500/60 custom-scrollbar resize-none"
              />

              {/* Error Message */}
              {errorMsg && (
                <div className="flex items-start gap-2 p-3 rounded-xl border border-rose-500/30 bg-rose-950/20 text-rose-300 text-xs font-mono">
                  <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Valid parsed indicator */}
              {parsedQuestions.length > 0 && !errorMsg && (
                <div className="flex items-center justify-between p-3 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-emerald-300 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Ready to import <strong>{parsedQuestions.length}</strong> question{parsedQuestions.length > 1 ? 's' : ''}.</span>
                  </div>
                  <span className="text-[11px] text-emerald-400/80">
                    {parsedQuestions.map(q => q.title).slice(0, 3).join(', ')}{parsedQuestions.length > 3 ? '...' : ''}
                  </span>
                </div>
              )}

              {successCount !== null && (
                <div className="flex items-center gap-2 p-3 rounded-xl border border-emerald-500 bg-emerald-950/50 text-emerald-200 font-mono text-xs animate-bounce">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Successfully imported {successCount} question(s)! Closing...</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-zinc-900/60 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-mono text-zinc-400 hover:text-white hover:bg-white/5 transition"
          >
            Cancel
          </button>

          {activeTab !== 'template' && (
            <button
              onClick={handleImport}
              disabled={parsedQuestions.length === 0 || isSubmitting}
              className={`px-5 py-2 rounded-xl text-xs font-mono font-semibold transition flex items-center gap-2 shadow-lg ${
                parsedQuestions.length > 0 && !isSubmitting
                  ? 'bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-amber-500/20 cursor-pointer'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <>Importing...</>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5" />
                  Import {parsedQuestions.length > 0 ? `${parsedQuestions.length} Questions` : 'Questions'}
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
