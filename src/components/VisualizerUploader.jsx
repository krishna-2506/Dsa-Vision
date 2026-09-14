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

  // AI Prompt — Apple HIG theme + deep educational explanation + multi-language per tier
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
1. ALGOVISION STUDIO ARCHITECTURE & CONTEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The Studio already provides:
  • Approach tier tabs (Intuitive / Better / Optimal) above the stage
  • Split-screen layout: your canvas LEFT, syntax-highlighted code viewer RIGHT
  • Transport controls: Play/Pause, step ticks bar, Reset, Speed 0.5x-2x
  • Step title and Prev/Next navigation
  • Educational Explanation & Live Variables Inspector Panel below the stage

DO NOT render: outer card frames, "Step X of Y" counters, prev/next buttons, language tabs, or copy-code buttons. Just render the visualization canvas content.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. AESTHETIC: APPLE macOS & HIG DESIGN SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The visualizer must feel like an Apple native product (macOS Sequoia / iOS).
Keep the visualizer theme and the site theme IDENTICAL:

CSS VARIABLES (Mandatory — automatically supports Light & Dark themes):
  Canvas / Stage bg:    var(--board)
  Card / Node fill:     var(--board-raised)
  Subtle container:     var(--board-raised-2)
  Hairline border:      var(--line)
  Primary text:         var(--chalk)
  Secondary / dim text: var(--chalk-dim)
  Faint index text:     var(--chalk-faint)

AUTHENTIC APPLE ACCENT PALETTE:
  Active Focus / Pointers:  var(--indigo) (#0a84ff - Apple System Blue)
  Comparison / Scanning:    var(--amber)  (#ff9f0a - Apple System Orange)
  Success / Matched / Done: var(--easy)   (#30d158 - Apple System Mint/Green)
  Conflict / Eliminated:    var(--hard)   (#ff453a - Apple System Coral Red)
  Secondary Pointer / Aux:  var(--teal)   (#64d2ff - Apple System Cyan)
  Special Structure / Hash: var(--purple) (#bf5af2 - Apple System Purple)

GEOMETRY & STYLING RULES:
  • Rounded Squircles: Use rx="10" or rx="8" for array/node boxes.
  • Glassmorphism: Frosted translucent fills, subtle drop shadows, and delicate 1px specular borders.
  • Floating Pointers: Render pointers as floating Apple rounded pill badges with indicator arrows (↓ top, ↑ bottom), NOT hand-drawn scratchy text.
  • Typography: font-family="'SF Mono', 'JetBrains Mono', monospace" for data values; "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" for badges.
  • Prohibited: Do NOT use rough chalkboard filters (filter="url(#rough)"), dark chalkboard slate (#12181a), or Kalam cursive font.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. DEEP EDUCATIONAL EXPLANATION & PEDAGOGY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Every step object in the \`steps\` array MUST be rich, intuitive, and teach the algorithm with senior clarity:

Each step MUST contain:
  • title: Concise action title (e.g. "2. Compare nums[left] (2) + nums[right] (23) == 25")
  • phase: Semantic phase badge (e.g. 'INITIALIZING' | 'SCANNING' | 'COMPARING' | 'SWAPPING' | 'PARTITIONING' | 'MATCH_FOUND' | 'PRUNING')
  • explain: 2-3 clear educational sentences explaining WHAT happened, WHY this step is taken, and how it progresses the algorithm.
  • intuition: A "Why this works / Key takeaway" note explaining how this decision prunes candidates or maintains the loop invariant.
  • variables: An object of all live pointers and accumulators (e.g. { left: 0, right: 5, sum: 25, target: 26 })
  • codeLine: EXACT 1-indexed line number in the C++ solution corresponding to this execution step!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. SUPERIOR ANIMATIONS & DYNAMIC MOTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  • Fluid transitions on moving elements: CSS transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1).
  • Distinct Visual States:
      - Unprocessed / Inactive: Subdued frosted opacity (0.5).
      - Scanning / In-Focus: Apple System Blue glow halo with scale(1.03).
      - Comparing: Apple Orange dual-focus with comparison badge or connecting arc.
      - Matched / Solved: Apple Mint emerald glow halo with soft spring pop.
      - Eliminated / Discarded: Muted strike or dimming.
  • Data Structure Primitives:
      - Arrays: Sleek squircle cells with indices below and floating pill pointers above.
      - Linked Lists: Apple 3-compartment squircle nodes (prev | val | next) + bezier arrow curves.
      - Trees: Apple frosted glass circles with glowing branch lines.
      - DP Matrices: Heatmap grid with glowing active cell and reference source arrows.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. MULTI-LANGUAGE SOLUTIONS (3 TIERS × 3 LANGUAGES)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
For EACH approach tier (Intuitive, Better, Optimal), provide complete working code:
  • C++    (Full function with line comments, codeLine sync basis)
  • Java   (Full class Solution { public ... } wrapper)
  • Python (Full function with type hints)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. COMPLETE COMPONENT SCAFFOLD (DROP-IN READY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
\`\`\`jsx
import React, { useMemo } from 'react';
// Available primitives: ArrayView, LinkedListView, TreeGraphView, MatrixView, StackQueueView
import ArrayView from '../components/primitives/ArrayView';

export const approaches = {
  intuitive: {
    title: 'Intuitive: Brute Force',
    badge: 'Brute Force',
    complexity: { time: 'O(N²)', space: 'O(1)' },
    steps: [
      {
        title: '1. Initialize pointers',
        phase: 'INITIALIZING',
        codeLine: 3,
        variables: { i: 0, j: 1 },
        explain: 'Start at index 0 and inspect all pairs sequentially.',
        intuition: 'Brute force checks every possible combination to guarantee finding a solution.',
        activeIndex: 0,
        compareIndex: 1,
      }
    ],
    solutions: {
      cpp: \`// C++ Brute Force — O(N²)\`,
      java: \`// Java Brute Force — O(N²)\`,
      python: \`# Python Brute Force — O(N²)\`
    }
  },
  better: {
    title: 'Better: Hash / Sub-Optimal',
    badge: 'Sub-Optimal',
    complexity: { time: 'O(N)', space: 'O(N)' },
    steps: [ /* rich steps with phase, explain, intuition, variables, codeLine */ ],
    solutions: { cpp: \`...\`, java: \`...\`, python: \`...\` }
  },
  optimal: {
    title: 'Optimal: Optimal Two Pointers / Direct',
    badge: 'Optimal',
    complexity: { time: '${question.time_complexity || 'O(N)'}', space: '${question.space_complexity || 'O(1)'}' },
    steps: [ /* rich steps with phase, explain, intuition, variables, codeLine */ ],
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
  description:     ${JSON.stringify((question.description || '').slice(0, 160))}
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
    <div className="w-full flex flex-col items-center justify-center p-4">
      {/* Visual Canvas using Apple Design Primitives */}
      <ArrayView
        items={stepData.items || [2, 7, 11, 15]}
        pointers={[
          { index: stepData.activeIndex ?? 0, label: 'curr', color: 'blue' },
          { index: stepData.compareIndex ?? 1, label: 'scan', color: 'amber' }
        ]}
      />
    </div>
  );
}
\`\`\`

Return ONLY the complete, ready-to-run React JSX code block. No text outside the code block.`;

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
    <div className="apple-card border border-[var(--line)] rounded-2xl p-6 sm:p-7 space-y-6 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
      {/* Header & Prompt Generator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[var(--line)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[var(--indigo)] bg-[var(--indigo-dim)] px-2.5 py-0.5 rounded-full border border-[var(--indigo)]/20">
              Visualizer Studio
            </span>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[var(--amber-dim)] text-[var(--amber)] border border-[var(--amber)]/20 font-semibold">
              +150 XP Contributor
            </span>
          </div>
          <h3 className="text-base font-semibold text-[var(--chalk)] mt-1.5 tracking-tight">
            Add or Update Visualizer Component
          </h3>
          <p className="text-xs text-[var(--chalk-dim)] font-normal mt-0.5">
            Generate with the Apple HIG architecture prompt below, then drop the compiled <code className="text-[var(--indigo)]">.jsx</code> file.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopyPrompt}
            className="btn-primary flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full shadow-sm cursor-pointer"
          >
            {copiedPrompt ? <Check className="w-3.5 h-3.5 text-white" /> : <Sparkles className="w-3.5 h-3.5 text-white" />}
            <span>{copiedPrompt ? 'Copied Apple HIG Prompt!' : 'Copy Apple HIG Prompt'}</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[var(--chalk-dim)] hover:text-[var(--chalk)] hover:bg-[var(--board-raised-2)] transition cursor-pointer"
              title="Close Uploader"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {statusMsg && (
        <div
          className={`p-3.5 rounded-xl text-xs font-mono flex items-center gap-2.5 ${
            statusMsg.type === 'success'
              ? 'bg-[var(--easy)]/15 text-[var(--easy)] border border-[var(--easy)]/30'
              : 'bg-[var(--hard)]/15 text-[var(--hard)] border border-[var(--hard)]/30'
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
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition duration-200 flex flex-col items-center justify-center space-y-2 cursor-pointer select-none ${
          isDragging
            ? 'border-[var(--indigo)] bg-[var(--indigo-dim)] scale-[1.01]'
            : 'border-[var(--line-strong)] hover:border-[var(--indigo)] bg-[var(--board-raised-2)]/50 backdrop-blur-sm'
        }`}
      >
        <div className="w-12 h-12 rounded-full bg-[var(--indigo-dim)] flex items-center justify-center text-[var(--indigo)] mb-1">
          <Upload className="w-6 h-6 pointer-events-none" />
        </div>
        <p className="text-xs font-medium text-[var(--chalk)] pointer-events-none">
          Drag & drop your visualizer <code className="text-[var(--indigo)] font-mono font-semibold">.jsx</code> file here
        </p>
        <p className="text-[11px] text-[var(--chalk-dim)] font-normal pointer-events-none">
          or click anywhere in this area to browse files
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
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-[var(--chalk)]">
            Or Paste Component Source Code
          </label>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[var(--chalk-dim)]">Component Key:</span>
            <input
              type="text"
              value={componentKey}
              onChange={(e) => setComponentKey(e.target.value)}
              placeholder="e.g. TwoSumVisualizer"
              className="px-3 py-1 bg-[var(--board-raised-2)] border border-[var(--line)] rounded-lg text-xs font-mono text-[var(--chalk)] focus:outline-none focus:border-[var(--indigo)] transition"
            />
          </div>
        </div>

        <textarea
          rows={9}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="// Paste React visualizer component code here...
import React from 'react';
export default function MyVisualizer() { ... }"
          className="w-full p-3.5 bg-[var(--board-raised-2)]/60 border border-[var(--line)] rounded-xl text-xs font-mono text-[var(--chalk)] focus:outline-none focus:border-[var(--indigo)] leading-relaxed resize-y transition"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-[11px] text-[var(--chalk-dim)]">
          Components hot-reload instantly into the AlgoVision registry
        </span>

        <button
          onClick={handleSave}
          disabled={isUploading || !code.trim()}
          className="btn-primary flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-full shadow-md disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
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
