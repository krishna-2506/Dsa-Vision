import React, { useState, useRef } from 'react';
import { Upload, Sparkles, Copy, Check, FileCode, CheckCircle2, AlertCircle, ArrowUpRight, X } from 'lucide-react';
import { api } from '../services/api';

export default function VisualizerUploader({
  question,
  onUploadSuccess,
  onClose,
  solutions = {},
  userId
}) {
  const fileInputRef = useRef(null);
  const [code, setCode] = useState('');
  const [componentKey, setComponentKey] = useState(
    question.component_key || toCamelCase(question.title) + 'Visualizer'
  );
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Generate question-specific prompt for Gemini with exact AlgoVision Studio UI template
  const geminiPrompt = `Act as an expert algorithm educator and React visualization engineer for AlgoVision Studio.
Create an interactive, animated React visualizer component for this DSA problem from Striver's A2Z Sheet:

Problem ID: ${question.display_id || 'Q-001'}
Problem: "${question.title}" (${question.category} - ${question.difficulty})

Problem Statement & Examples:
${question.description}

Approach & Logic:
${question.approach || 'Standard optimal algorithm'}

C++ Reference Code:
\`\`\`cpp
${solutions.cpp || '// C++ solution'}
\`\`\`

Strict UI Template Requirements (AlgoVision Studio 5-Layer Layout):
You MUST follow this exact component scaffold:

\`\`\`jsx
import React, { useState } from 'react';
import ArrayView from '../components/primitives/ArrayView';

export const meta = {
  display_id: '${question.display_id || 'Q-001'}',
  title: "${question.title}",
  category: "${question.category}",
  difficulty: "${question.difficulty}",
  timeComplexity: "${question.time_complexity || 'O(N)'}",
  spaceComplexity: "${question.space_complexity || 'O(1)'}",
  description: ${JSON.stringify((question.description || '').slice(0, 140))}
};

// Realistic sample array for this problem
const SAMPLE_DATA = [1, 8, 7, 56, 90];

export const steps = [
  {
    title: "1. Initialize State",
    codeLine: 4, // Exact line of C++ code executing
    code: "// In-line commented executing line...",
    explanation: "Detailed educational explanation of what happens and why...",
    pointers: [{ index: 0, label: 'i', color: 'indigo' }],
    highlightIndices: [0],
    hudText: "Current state: initialized"
  }
  // Add 4-7 thorough steps demonstrating the complete algorithm
];

export default function ${componentKey}({ currentStep: externalStep, onStepChange }) {
  const [internalStep, setInternalStep] = useState(0);
  const stepIndex = externalStep !== undefined ? externalStep : internalStep;
  const setStep = onStepChange || setInternalStep;
  const stepData = steps[stepIndex] || steps[0];

  const handleNext = () => { if (stepIndex < steps.length - 1) setStep(stepIndex + 1); };
  const handlePrev = () => { if (stepIndex > 0) setStep(stepIndex - 1); };

  return (
    <div className="w-full flex flex-col bg-[#0b0d14] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
      {/* 1. Sub-Header Bar */}
      <div className="px-5 py-3 bg-[#0e111a] border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
            Step {stepIndex + 1} / {steps.length}
          </span>
          <h3 className="text-sm font-bold text-white font-mono">{stepData.title}</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={handlePrev} disabled={stepIndex === 0} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 disabled:opacity-30 text-slate-300 text-xs font-mono rounded border border-white/5 transition">
            ← Prev
          </button>
          <button onClick={handleNext} disabled={stepIndex === steps.length - 1} className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-white text-xs font-mono font-medium rounded transition">
            Next →
          </button>
        </div>
      </div>

      {/* 2. Visualizer Canvas */}
      <div className="p-6 flex flex-col items-center justify-center bg-[#08090e]/60 min-h-[220px]">
        <ArrayView
          items={SAMPLE_DATA}
          pointers={stepData.pointers || []}
          matchIndices={stepData.highlightIndices || []}
        />

        {/* 3. Real-Time HUD */}
        <div className="mt-5 flex items-center gap-3 px-4 py-2 rounded-lg bg-[#0e111a] border border-white/5 font-mono text-xs">
          <span>Status: <strong className="text-indigo-400">{stepData.hudText || 'Processing...'}</strong></span>
        </div>
      </div>

      {/* 4. Explanation Footer */}
      <div className="px-5 py-3 bg-[#0c0e16] border-t border-white/5 text-xs text-slate-300 leading-relaxed font-sans">
        <span className="text-slate-500 font-mono text-[11px] uppercase mr-2 font-bold">Explanation:</span>
        {stepData.explanation}
      </div>
    </div>
  );
}
\`\`\`

Rules:
- Palette: Deep obsidian (#0b0d14, #0e111a, #08090e), Indigo (#6366f1), Emerald, Amber, Rose.
- Explain code thoroughly with in-line comments line-by-line.
- Return ONLY the complete, ready-to-run React JSX code.`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(geminiPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) readFile(file);
  };

  const handleFileInput = (e) => {
    const file = e.target.files?.[0];
    if (file) readFile(file);
  };

  const readFile = (file) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target.result;
      setCode(content);

      // Extract component name from file if matched
      const nameMatch = file.name.replace(/\.(jsx|js)$/i, '');
      if (nameMatch) setComponentKey(nameMatch);
    };
    reader.readAsText(file);
  };

  const handleSave = async () => {
    if (!code.trim()) {
      setStatusMsg({ type: 'error', text: 'Please paste code or drop a visualizer .jsx file first.' });
      return;
    }

    setIsUploading(true);
    setStatusMsg(null);

    const result = await api.uploadVisualizer({
      questionId: question.id,
      componentKey,
      code,
      userId
    });

    setIsUploading(false);

    if (result.success) {
      setStatusMsg({ type: 'success', text: `Visualizer saved as ${result.componentKey}.jsx and +150 XP awarded!` });
      if (onUploadSuccess) {
        setTimeout(() => {
          onUploadSuccess(result.componentKey);
        }, 1000);
      }
    } else {
      setStatusMsg({ type: 'error', text: result.error || 'Failed to save visualizer.' });
    }
  };

  return (
    <div className="bg-[#0e111a] border border-white/[0.08] rounded-xl p-6 space-y-6 shadow-2xl relative">
      {/* Header & Prompt Generator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400">
              Interactive Animation Studio
            </span>
            <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              +150 XP Contributor Reward
            </span>
          </div>
          <h3 className="text-base font-mono font-bold text-white mt-0.5">
            Add or Update Visualizer for This Problem
          </h3>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Ask Gemini for this visualizer with 1-click prompt, then drop the generated code below.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyPrompt}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-medium transition self-start sm:self-auto"
          >
            {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Sparkles className="w-3.5 h-3.5 text-indigo-400" />}
            <span>{copiedPrompt ? 'Copied Prompt for Gemini!' : 'Copy Gemini Prompt'}</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 border border-white/5 transition"
              title="Close Uploader"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {statusMsg && (
        <div
          className={`p-3 rounded-lg text-xs font-mono flex items-center gap-2 ${
            statusMsg.type === 'success'
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
          }`}
        >
          {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Drag & Drop Zone */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          fileInputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(false);
          const file = e.dataTransfer?.files?.[0];
          if (file) readFile(file);
        }}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition flex flex-col items-center justify-center space-y-2 cursor-pointer select-none ${
          isDragging
            ? 'border-indigo-500 bg-indigo-500/10'
            : 'border-white/10 hover:border-indigo-500/40 bg-[#090b10]'
        }`}
      >
        <Upload className="w-8 h-8 text-indigo-400 pointer-events-none" />
        <p className="text-xs font-mono text-slate-300 pointer-events-none">
          Drag & drop Gemini's <code className="text-indigo-300 font-bold">.jsx</code> visualizer file here
        </p>
        <p className="text-[11px] text-slate-500 font-mono pointer-events-none">
          or click inside this box to browse files
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".jsx,.js"
          onChange={handleFileInput}
          onClick={(e) => e.stopPropagation()}
          className="hidden"
          style={{ display: 'none' }}
        />
      </div>

      {/* Code Paste Area */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono font-medium text-slate-300">
            Or Paste Visualizer JSX Code
          </label>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-500">Component Key:</span>
            <input
              type="text"
              value={componentKey}
              onChange={(e) => setComponentKey(e.target.value)}
              className="px-2 py-0.5 bg-[#08090e] border border-white/10 rounded text-xs font-mono text-indigo-300 focus:outline-none focus:border-indigo-500 w-48"
            />
          </div>
        </div>

        <textarea
          rows={7}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={`import React, { useState } from 'react';\n\nexport const meta = { ... };\nexport const steps = [ ... ];\n\nexport default function ${componentKey}(...) { ... }`}
          className="w-full p-3.5 bg-[#08090e] border border-white/10 rounded-lg text-xs font-mono text-slate-300 focus:outline-none focus:border-indigo-500 leading-relaxed resize-y"
        />
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        <span className="text-[11px] font-mono text-slate-500">
          Saved to <code className="text-slate-400">src/visualizers/{componentKey}.jsx</code> and bound to SQLite.
        </span>

        <button
          onClick={handleSave}
          disabled={isUploading || !code.trim()}
          className="flex items-center gap-2 px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-mono font-bold shadow-sm transition"
        >
          <FileCode className="w-4 h-4" />
          <span>{isUploading ? 'Saving...' : 'Save & Mount Visualizer'}</span>
        </button>
      </div>
    </div>
  );
}

function toCamelCase(str) {
  if (!str) return 'Custom';
  return str
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('');
}
