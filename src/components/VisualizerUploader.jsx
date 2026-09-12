import React, { useState, useRef } from 'react';
import { Upload, Sparkles, Check, CheckCircle2, AlertCircle, X } from 'lucide-react';
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

  // AI Prompt — Chalkboard theme + multi-language (C++/Java/Python) per tier
  const geminiPrompt = `Act as an expert algorithm educator and React visualization engineer for AlgoVision Studio.
Create an interactive, animated React visualizer component for this DSA problem:

Problem ID: ${question.display_id || (question.leetcode_id ? '#' + question.leetcode_id : 'Q-001')}
Problem: "${question.title}" (${question.category} - ${question.difficulty})

Problem Statement & Examples:
${question.description}

Approach & Logic:
${question.approach || 'Provide intuitive brute force, optimized intermediate, and optimal algorithm approaches.'}

C++ Reference (basis for all solution code):
\`\`\`cpp
${solutions.cpp || '// Provide full C++ solution here'}
\`\`\`

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALGOVISION STUDIO ARCHITECTURE — READ CAREFULLY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The Studio already provides:
  • Approach tier tabs (Intuitive / Better / Optimal) above the stage
  • Split-screen: your canvas LEFT, syntax-highlighted code viewer RIGHT
  • Transport controls: Play/Pause, step ticks bar, Reset, Speed 0.5x-2x
  • Step title above your canvas and Prev/Next navigation

DO NOT render any of: card wrappers, "Step X of Y" counters, prev/next buttons,
language tabs, or copy-code buttons. Just render the visualization canvas content.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VISUAL STYLE — CHALKBOARD / WHITEBOARD AESTHETIC
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PALETTE (use exact hex values):
  Stage background:     #12181a
  Node/box fill:        #1c2529
  Divider lines:        rgba(238,241,234,0.09)
  Primary text:         #eef1ea
  Dim text:             #8fa09a
  Faint index labels:   #5f6f6a
  Amber / active:       #e8a33d
  Teal  / secondary:    #5fb3a6
  Easy green: #7cb473 | Hard red: #e06c75

SVG DRAWING RULES:
  Array/node boxes:
    fill="#1c2529" stroke="#5f6f6a" strokeWidth=1.4 rx=3
    filter="url(#rough)"  ← already defined in the page's HTML root

  Active element (curr/selected):
    Amber glow ring: stroke="#e8a33d" strokeWidth=2.2 rx=6 (+5px each side)

  Previous/secondary element:
    Teal dashed ring: stroke="#5fb3a6" strokeWidth=1.6 strokeDasharray="3 4"

  Value inside box:
    font-family="IBM Plex Mono, monospace" fontSize=16 fontWeight=500 fill="#eef1ea"

  Index label below:
    font-family="IBM Plex Mono, monospace" fontSize=10.5 fill="#5f6f6a"

  Pointer labels (curr, prev, L, R, head, slow, fast):
    font-family="Kalam, cursive" fontSize=14
    fill=#e8a33d (active/curr — place ABOVE) or #5fb3a6 (secondary/prev — place BELOW)

  Arrows: stroke="#5f6f6a" strokeWidth=1.2 with arrowhead marker
  Linked-List nodes: 3-compartment (PREV | VAL | NEXT) + hex address tags above
  Tree: circles fill="#1c2529" stroke="#5f6f6a"

STATUS HUD — render below canvas:
  <div className="status-line"><span className="prev-b">prev = 12</span>, <b>curr = 35</b></div>

EXPLANATION — render below status:
  <p className="explain">35 beats curr, so <span className="note">prev</span> inherits old value.</p>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MULTI-LANGUAGE CODE — 3 LANGUAGES × 3 TIERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

For EACH approach tier, provide COMPLETE solutions in:
  • C++    (always required, full function)
  • Java   (required — full class Solution { public ... } wrapper)
  • Python (required — def with type hints)

Add educational line-by-line comments explaining WHAT and WHY.
Do NOT write "..." or stubs — write full working code.

CRITICAL — codeLine sync:
  Each step needs codeLine: N = the EXACT line number in C++ (count from line 1).
  The code viewer highlights that line live as the animation plays.

\`\`\`jsx
import React, { useMemo } from 'react';
// Primitives: ArrayView, LinkedListView, TreeGraphView, MatrixView, StackQueueView
// import ArrayView from '../components/primitives/ArrayView';

export const approaches = {
  intuitive: {
    title: 'Intuitive: Brute Force',
    badge: 'Brute Force',
    complexity: { time: 'O(N²)', space: 'O(1)' },
    steps: [
      {
        title: '1. Initialize pointers',
        codeLine: 3,          // exact C++ line number
        variables: { i: 0, j: 1 },
        status: '<span class="prev-b">i = 0</span>, <b>j = 1</b>',
        explain: 'Start at index 0...',
        activeIndex: 0,
      }
    ],
    solutions: {
      cpp: \`// C++ Brute Force — O(N²)
int solution(int arr[], int n) {   // line 1
  // ...
}\`,
      java: \`// Java Brute Force — O(N²)
class Solution {
  public int solution(int[] arr) {
    // ...
  }
}\`,
      python: \`# Python Brute Force — O(N²)
def solution(arr: list[int]) -> int:
    # ...
\`
    }
  },
  better: {
    title: 'Better: Intermediate',
    badge: 'Sub-Optimal',
    complexity: { time: 'O(N log N)', space: 'O(N)' },
    steps: [ /* all steps with codeLine */ ],
    solutions: { cpp: \`...\`, java: \`...\`, python: \`...\` }
  },
  optimal: {
    title: 'Optimal: Single Pass',
    badge: 'Optimal',
    complexity: { time: '${question.time_complexity || 'O(N)'}', space: '${question.space_complexity || 'O(1)'}' },
    steps: [ /* all steps with codeLine */ ],
    solutions: { cpp: \`...\`, java: \`...\`, python: \`...\` }
  }
};

export const solutions = approaches.optimal.solutions;
export const steps     = approaches.optimal.steps;
export const meta = {
  display_id:      '${question.display_id || 'Q-001'}',
  title:           "${question.title}",
  category:        "${question.category}",
  difficulty:      "${question.difficulty}",
  timeComplexity:  "${question.time_complexity || 'O(N)'}",
  spaceComplexity: "${question.space_complexity || 'O(1)'}",
  description:     ${JSON.stringify((question.description || '').slice(0, 140))}
};

export default function ${componentKey}({
  currentStep  = 0,
  onStepChange,
  customInput  = '',
  customTarget = '',
  approachTier = 'optimal'
}) {
  const activeApproach = approaches[approachTier] || approaches.optimal;
  const activeSteps    = activeApproach.steps;
  const stepIndex      = Math.min(Math.max(0, currentStep), activeSteps.length - 1);
  const stepData       = activeSteps[stepIndex] || activeSteps[0];

  return (
    <div className="w-full flex flex-col">
      {/* ── Chalkboard Canvas ── */}
      <div className="w-full py-6 flex items-center justify-center">
        <svg viewBox="0 0 620 180" width="100%" height="180">
          <defs>
            <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#5f6f6a"/>
            </marker>
          </defs>
          {/* render based on stepData */}
        </svg>
      </div>
      {stepData.status && (
        <div className="status-line" dangerouslySetInnerHTML={{ __html: stepData.status }} />
      )}
      {stepData.explain && (
        <p className="explain" dangerouslySetInnerHTML={{ __html: stepData.explain }} />
      )}
    </div>
  );
}
\`\`\`

Return ONLY the complete, ready-to-run React JSX code. No markdown outside the code block.`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(geminiPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
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
        onDrop={handleFileDrop}
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
