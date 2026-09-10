import React, { useState, useRef } from 'react';
import { Upload, Sparkles, Copy, Check, FileCode, CheckCircle2, AlertCircle, ArrowUpRight, X } from 'lucide-react';
import { api } from '../services/api';

export default function VisualizerUploader({
  question,
  onUploadSuccess,
  onClose,
  solutions = {},
  userId,
  initialCode = ''
}) {
  const fileInputRef = useRef(null);
  const [code, setCode] = useState(initialCode || '');
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

Problem ID: ${question.display_id || (question.leetcode_id ? '#' + question.leetcode_id : 'Q-001')}
Problem: "${question.title}" (${question.category} - ${question.difficulty})

Problem Statement & Examples:
${question.description}

Approach & Logic:
${question.approach || 'Provide intuitive brute force, optimized intermediate, and optimal algorithm.'}

C++ Reference Code:
\`\`\`cpp
${solutions.cpp || '// C++ solution'}
\`\`\`

IMPORTANT ARCHITECTURAL DIRECTIVE:
The AlgoVision Studio already hosts a dedicated, syntax-highlighted code execution viewer (C++, Python, Java, JavaScript) beside this visualizer in Split Screen mode with synchronized step line tracking.
DO NOT waste the visualizer canvas space rendering a duplicate code editor!
INSTEAD, focus 100% on crafting the MOST BEAUTIFUL, INTUITIVE, AND DYNAMIC GRAPHICAL VISUALIZATION POSSIBLE!

Strict Requirements:
1. Multi-Tier Approaches: Provide 3 approach tiers whenever applicable:
   - "intuitive" (Brute Force / Direct baseline, e.g. O(N²) nested loops)
   - "better" (Optimized intermediate, e.g. O(N) Hash Map / Stack / Sorting)
   - "optimal" (Optimal Gold Standard, e.g. O(N) Two Pointers / Sliding Window / In-place DP)
2. Component must accept props:
   ({ currentStep: externalStep, onStepChange, customInput = '', customTarget = '', approachTier = 'optimal' })
   and dynamically switch its internal trace, animated state, HUD, and pointers when approachTier changes!
3. Visual Styling & Chalkboard Whiteboard Uniformity:
   - Container: bg-[var(--board-raised)] rounded-[3px] overflow-hidden (or cleanly nested inside Studio stage)
   - Canvas: centered graphical layout with rough chalk filters or clean SVG diagrams:
     * Memory / Pointers (Linked Lists): Heap node boxes with address badges, PREV/VAL/NEXT slots, SVG bidirectional arrows, and handwritten pointer labels (HEAD, TEMP, CURR).
     * Arrays / Sequences: ArrayView component or SVG boxes with rough filter (url(#rough)), index numbers, and handwritten Kalam cursive pointers.
     * Trees / Graphs: Node circles, connection lines, visited states.
     * Sliding Window: Bounding box around active window, running sum meter, max length tracker.
     * Hash Map: Key-value badge collection (val ➔ index).
   - Real-time HUD: status-line format with monospace text (e.g. <b>curr = 12</b>, <span class="prev-b">prev = -1</span>).
   - Explanation: explain class with <span class="note"> cursive annotations.
4. Export format:
   - export const approaches = { intuitive: { ... }, better: { ... }, optimal: { ... } };
   - export const solutions = approaches.optimal.solutions; // multi-language solutions with thorough comments
   - export const steps = approaches.optimal.steps;
   - export const meta = { display_id, title, category, difficulty, timeComplexity, spaceComplexity, description };
   - export default function ${componentKey}(...) { ... }

\`\`\`jsx
import React, { useState, useMemo } from 'react';
import ArrayView from '../components/primitives/ArrayView';
// (Or import other primitives if needed: LinkedListView, TreeGraphView, MatrixView, StackQueueView, CallStackView, VariableInspector)

export const approaches = {
  intuitive: {
    title: 'Intuitive: Brute Force',
    badge: 'Brute Force',
    complexity: { time: 'O(N²)', space: 'O(1)' },
    steps: [
      {
        title: '1. Begin Brute Force Scan',
        codeLine: 4,
        variables: { i: 0, j: 1 },
        explanation: 'Check all pairs sequentially...',
        // topic specific state...
      }
    ],
    solutions: {
      cpp: \`// C++ Intuitive Solution with comments\\n\`,
      python: \`# Python Intuitive Solution with comments\\n\`,
      java: \`// Java Intuitive Solution with comments\\n\`,
      javascript: \`// JavaScript Intuitive Solution with comments\\n\`
    }
  },
  better: {
    title: 'Better: Optimized Intermediate',
    badge: 'Sub-Optimal',
    complexity: { time: 'O(N)', space: 'O(N)' },
    steps: [ /* intermediate steps */ ],
    solutions: { cpp: \`...\`, python: \`...\`, java: \`...\`, javascript: \`...\` }
  },
  optimal: {
    title: 'Best: Optimal Gold Standard',
    badge: 'Optimal',
    complexity: { time: '${question.time_complexity || 'O(N)'}', space: '${question.space_complexity || 'O(1)'}' },
    steps: [ /* optimal steps */ ],
    solutions: { cpp: \`...\`, python: \`...\`, java: \`...\`, javascript: \`...\` }
  }
};

export const solutions = approaches.optimal.solutions;
export const steps = approaches.optimal.steps;
export const meta = {
  display_id: '${question.display_id || 'Q-001'}',
  title: "${question.title}",
  category: "${question.category}",
  difficulty: "${question.difficulty}",
  timeComplexity: "${question.time_complexity || 'O(N)'}",
  spaceComplexity: "${question.space_complexity || 'O(1)'}",
  description: ${JSON.stringify((question.description || '').slice(0, 140))}
};

export default function ${componentKey}({
  currentStep = 0,
  onStepChange,
  customInput = '',
  customTarget = '',
  approachTier = 'optimal'
}) {
  const activeApproach = approaches[approachTier] || approaches.optimal;
  const activeSteps = activeApproach.steps;
  const stepIndex = Math.min(Math.max(0, currentStep), activeSteps.length - 1);
  const stepData = activeSteps[stepIndex] || activeSteps[0];

  return (
    <div className="w-full flex flex-col space-y-4">
      {/* 1. Creative Graphical Visualization Canvas (SVG or Interactive Primitive) */}
      <div className="w-full py-4 flex items-center justify-center">
        {/* Render dynamic arrays / linked list / tree / pointers with filter="url(#rough)" */}
      </div>

      {/* 2. Real-time Status HUD */}
      {stepData.status && (
        <div className="status-line" dangerouslySetInnerHTML={{ __html: stepData.status }} />
      )}

      {/* 3. Chalkboard Explanation with Handwritten Callouts */}
      {stepData.explain && (
        <p className="explain" dangerouslySetInnerHTML={{ __html: stepData.explain }} />
      )}
    </div>
  );
}
\`\`\`

Return ONLY the complete, ready-to-run React JSX code.`;

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
    <div className="bg-[var(--board-raised)] border border-[var(--line)] rounded-[3px] p-6 space-y-6 shadow-2xl relative">
      {/* Header & Prompt Generator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--line)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--amber)]">
              Interactive Animation Studio
            </span>
            <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-[var(--amber-dim)] text-[var(--amber)] border border-[rgba(232,163,61,0.3)]">
              +150 XP Contributor Reward
            </span>
          </div>
          <h3 className="text-base font-mono font-bold text-[var(--chalk)] mt-0.5">
            Add or Update Visualizer for This Problem
          </h3>
          <p className="text-xs text-[var(--chalk-dim)] font-sans mt-0.5">
            Ask Gemini for this visualizer with 1-click prompt, then drop the generated code below.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyPrompt}
            className="chalk-btn chalk-btn-amber"
          >
            {copiedPrompt ? <Check className="w-3.5 h-3.5 text-[var(--easy)]" /> : <Sparkles className="w-3.5 h-3.5 text-[var(--amber)]" />}
            <span>{copiedPrompt ? 'Copied Prompt for Gemini!' : 'Copy Gemini Prompt'}</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded text-[var(--chalk-faint)] hover:text-[var(--chalk)] hover:bg-[var(--board-raised-2)] transition cursor-pointer"
              title="Close Uploader"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {statusMsg && (
        <div
          className={`p-3 rounded text-xs font-mono flex items-center gap-2 ${
            statusMsg.type === 'success'
              ? 'bg-[rgba(124,180,115,0.15)] text-[var(--easy)] border border-[rgba(124,180,115,0.3)]'
              : 'bg-[rgba(224,108,117,0.15)] text-[#e06c75] border border-[rgba(224,108,117,0.3)]'
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
        className={`relative border border-dashed rounded-[3px] p-8 text-center transition flex flex-col items-center justify-center space-y-2 cursor-pointer select-none ${
          isDragging
            ? 'border-[var(--amber)] bg-[var(--amber-dim)]'
            : 'border-[var(--line-strong)] hover:border-[var(--amber)] bg-[var(--board-raised-2)]'
        }`}
      >
        <Upload className="w-8 h-8 text-[var(--amber)] pointer-events-none" />
        <p className="text-xs font-mono text-[var(--chalk)] pointer-events-none">
          Drag & drop Gemini's <code className="text-[var(--amber)] font-bold">.jsx</code> visualizer file here
        </p>
        <p className="text-[11px] text-[var(--chalk-faint)] font-mono pointer-events-none">
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
          <label className="text-xs font-mono font-medium text-[var(--chalk)]">
            Or Paste Visualizer JSX Code
          </label>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[var(--chalk-faint)]">Component Key:</span>
            <input
              type="text"
              value={componentKey}
              onChange={(e) => setComponentKey(e.target.value)}
              placeholder="e.g. TwoSumVisualizer"
              className="px-2.5 py-1 bg-[var(--board-raised-2)] border border-[var(--line)] rounded-[3px] text-xs font-mono text-[var(--chalk)] focus:outline-none focus:border-[var(--amber)]"
            />
          </div>
        </div>

        <textarea
          rows={10}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="// Paste React visualizer component code here...
import React from 'react';
export default function MyVisualizer() { ... }"
          className="w-full p-3 bg-[var(--board)] border border-[var(--line)] rounded-[3px] text-xs font-mono text-[var(--chalk)] focus:outline-none focus:border-[var(--amber)] leading-relaxed resize-y"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-[11px] font-mono text-[var(--chalk-faint)]">
          Saved components compile instantly into the AlgoVision registry
        </span>

        <button
          onClick={handleSave}
          disabled={isUploading || !code.trim()}
          className="chalk-btn chalk-btn-amber disabled:opacity-30 disabled:pointer-events-none"
        >
          {isUploading ? 'Compiling & Saving...' : 'Save & Mount Visualizer'}
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
