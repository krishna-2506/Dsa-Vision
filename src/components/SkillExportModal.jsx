import React, { useState } from 'react';
import { X, Copy, Check, Download, Sparkles, Terminal, FileCode, Code2, BookOpen, Layers } from 'lucide-react';

const SKILL_MD = `---
name: dsa-visualizer
description: Production-grade Gemini Skill for generating interactive React algorithm animations, fluid sliding pointer visualizers, thoroughly commented multi-language code solutions, and SQLite database entries for AlgoVision Studio.
---

# DSA Visualizer Skill for AlgoVision Studio (Production Guide)

Use this skill whenever asked to visualize any Data Structures & Algorithms problem, Striver's A2Z DSA Sheet question, or LeetCode challenge for AlgoVision Studio.

## 1. Unified Visualizer UI Architecture
Every React visualizer component generated for AlgoVision Studio MUST adhere to the standard 5-layer layout:
- Sub-Header Bar: Step Counter (Step 1/6) | Title | Prev / Next buttons
- Canvas Zone: Dark Obsidian (#08090e) Canvas with animated items, sliding pointers (L, R, mid), and SVG connector arrows
- Real-Time HUD: Active Variables & Comparison Inspector (e.g. nums[L] + nums[R] == Target)
- Explanation Footer: Educational breakdown of why pointers shifted & loop invariants

### Color Palette & Tokens:
- Dark Backgrounds: #0b0d14 (card), #0e111a (sub-header/HUD), #08090e (canvas), #0c0e16 (footer)
- Primary Accent: Indigo (#6366f1)
- Semantic Scale: Emerald (#10b981) for match/success, Amber (#f59e0b) for active evaluation, Rose (#f43f5e) for eliminated bounds
- Shape Language: Rectangular micro-badges with rounded-[4px] and font-mono text-[10px]

## 2. Mandatory Component Exports
1. export const meta = { display_id, title, category, difficulty, timeComplexity, spaceComplexity, leetcodeUrl, description };
2. export const steps = [ { title, codeLine, code, explanation, ...stateVars } ];
3. export default function ComponentNameVisualizer({ currentStep, onStepChange }) { ... }
`;

const TEMPLATE_CODE = `import React, { useState } from 'react';
import ArrayView from '../components/primitives/ArrayView';

export const meta = {
  display_id: 'Q-001',
  leetcode_id: 167,
  title: 'Two Sum II - Input Array Is Sorted',
  category: '1. Arrays',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  leetcodeUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
  description: 'Find two numbers in a 1-indexed sorted array that add up to a target number using two converging pointers.'
};

const ARRAY = [2, 7, 11, 15, 19, 23];
const TARGET = 26;

export const steps = [
  {
    title: '1. Initialize Left & Right Boundaries',
    left: 0,
    right: 5,
    codeLine: 3,
    code: 'int left = 0, right = numbers.size() - 1;\\nint target = 26;',
    explanation: 'Place left pointer at index 0 (val=2) and right pointer at index 5 (val=23). Target = 26.',
    currentSum: 25,
    status: 'less'
  },
  {
    title: '2. Evaluate Pair: 2 + 23 = 25 (< 26)',
    left: 0,
    right: 5,
    codeLine: 8,
    code: 'int sum = numbers[left] + numbers[right]; // 2 + 23 = 25\\nif (sum < target) left++; // Need larger sum',
    explanation: 'Sum 25 is less than target 26. Since array is sorted, incrementing left increases our sum.',
    currentSum: 25,
    status: 'less'
  },
  {
    title: '3. Increment Left: index 0 -> 1',
    left: 1,
    right: 5,
    codeLine: 9,
    code: 'left++; // Left slides to index 1 (val = 7)',
    explanation: 'Left pointer advances to index 1. New candidate pair is numbers[1] (7) and numbers[5] (23).',
    currentSum: 30,
    status: 'calc'
  },
  {
    title: '4. Target Match Found! 7 + 19 == 26',
    left: 1,
    right: 4,
    codeLine: 7,
    code: 'if (sum == target) return { left + 1, right + 1 }; // Return [2, 5]',
    explanation: 'Match found! numbers[1] (7) + numbers[4] (19) equals target 26. Optimal O(N) time and O(1) space.',
    currentSum: 26,
    status: 'found'
  }
];

export default function ProblemVisualizer({ currentStep: externalStep, onStepChange }) {
  const [internalStep, setInternalStep] = useState(0);
  const stepIndex = externalStep !== undefined ? externalStep : internalStep;
  const setStep = onStepChange || setInternalStep;
  const stepData = steps[stepIndex] || steps[0];

  const handleNext = () => {
    if (stepIndex < steps.length - 1) setStep(stepIndex + 1);
  };

  const handlePrev = () => {
    if (stepIndex > 0) setStep(stepIndex - 1);
  };

  const pointers = [
    { index: stepData.left, label: 'L', color: stepData.status === 'found' ? 'emerald' : 'indigo' },
    { index: stepData.right, label: 'R', color: stepData.status === 'found' ? 'emerald' : 'amber' }
  ];

  const matchIndices = stepData.status === 'found' ? [stepData.left, stepData.right] : [];

  return (
    <div className="w-full flex flex-col bg-[#0b0d14] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
      {/* Sub-Header Bar */}
      <div className="px-5 py-3 bg-[#0e111a] border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
            Step {stepIndex + 1} / {steps.length}
          </span>
          <h3 className="text-sm font-bold text-white font-mono">{stepData.title}</h3>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrev}
            disabled={stepIndex === 0}
            className="px-2.5 py-1 bg-white/5 hover:bg-white/10 disabled:opacity-30 text-slate-300 text-xs font-mono rounded border border-white/5 transition"
          >
            ← Prev
          </button>
          <button
            onClick={handleNext}
            disabled={stepIndex === steps.length - 1}
            className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-white text-xs font-mono font-medium rounded transition"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Canvas Zone */}
      <div className="p-6 flex flex-col items-center justify-center bg-[#08090e]/60 min-h-[220px]">
        <ArrayView
          items={ARRAY}
          pointers={pointers}
          matchIndices={matchIndices}
        />

        {/* Real-Time HUD */}
        <div className="mt-5 flex items-center gap-4 px-4 py-2 rounded-lg bg-[#0e111a] border border-white/5 font-mono text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-indigo-400 font-bold">nums[{stepData.left}]</span>
            <span className="text-slate-600">+</span>
            <span className="text-amber-400 font-bold">nums[{stepData.right}]</span>
            <span className="text-slate-600">=</span>
            <span className="font-bold text-emerald-400">
              {stepData.currentSum}
            </span>
          </div>

          <span className="text-slate-700">|</span>

          <div className="flex items-center gap-2">
            <span className="text-slate-500">Target: <strong className="text-white">{TARGET}</strong></span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded border bg-emerald-500/20 text-emerald-400 border-emerald-500/40">
              MATCH ✓
            </span>
          </div>
        </div>
      </div>

      {/* Explanation Footer */}
      <div className="px-5 py-3 bg-[#0c0e16] border-t border-white/5 text-xs text-slate-300 leading-relaxed font-sans">
        <span className="text-slate-500 font-mono text-[11px] uppercase mr-2 font-bold">Explanation:</span>
        {stepData.explanation}
      </div>
    </div>
  );
}
`;

export default function SkillExportModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('skill'); // 'skill' | 'template' | 'guide'
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentCopyContent = activeTab === 'template' ? TEMPLATE_CODE : SKILL_MD;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCopyContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = activeTab === 'template' ? 'VisualizerTemplate.jsx' : 'SKILL.md';
    const mimeType = activeTab === 'template' ? 'text/javascript' : 'text/markdown';
    const blob = new Blob([currentCopyContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0e1017] border border-white/10 rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0a0c11] border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                <span>Gemini DSA Skill & Template Hub</span>
                <span className="text-[10px] font-mono font-normal px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Standardized UI
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Gives Gemini the blueprint to generate identical, high-fidelity visualizers
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center px-6 border-b border-white/5 bg-[#090b10] text-xs font-mono">
          <button
            onClick={() => setActiveTab('skill')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition ${
              activeTab === 'skill'
                ? 'border-indigo-500 text-white font-bold bg-white/[0.02]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>1. SKILL.md (System Rules)</span>
          </button>

          <button
            onClick={() => setActiveTab('template')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition ${
              activeTab === 'template'
                ? 'border-indigo-500 text-white font-bold bg-white/[0.02]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>2. Visualizer JSX Template</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition ${
              activeTab === 'guide'
                ? 'border-indigo-500 text-white font-bold bg-white/[0.02]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>3. How to Setup in Gemini</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 overflow-y-auto font-sans">
          {activeTab === 'skill' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Complete SKILL.md Rules & Design Specification</span>
                <span className="font-mono text-slate-500 text-[11px]">skills/dsa-visualizer/SKILL.md</span>
              </div>
              <pre className="w-full p-4 bg-[#08090d] border border-white/5 rounded-xl text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed max-h-[380px] overflow-y-auto selection:bg-indigo-600">
                {SKILL_MD}
              </pre>
            </div>
          )}

          {activeTab === 'template' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Standard React Visualizer Template (Copy or Inject)</span>
                <span className="font-mono text-emerald-400 text-[11px]">Unified 5-Layer UI Architecture</span>
              </div>
              <p className="text-xs text-slate-400">
                Gemini uses this scaffold to output ready-to-run React components matching AlgoVision Studio's exact dark obsidian theme, pointer mechanics, and HUD inspector.
              </p>
              <pre className="w-full p-4 bg-[#08090d] border border-white/5 rounded-xl text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed max-h-[340px] overflow-y-auto selection:bg-indigo-600">
                {TEMPLATE_CODE}
              </pre>
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-2">
                <span className="text-indigo-400 font-bold block text-sm">Option A: Antigravity IDE / CLI Skill</span>
                <p className="text-slate-300">
                  Save <code className="text-indigo-300 bg-black/40 px-1.5 py-0.5 rounded">SKILL.md</code> directly into your local configuration:
                </p>
                <div className="p-2.5 bg-[#08090e] rounded border border-white/5 font-mono text-[11px] text-slate-300 select-all">
                  C:\Users\&lt;username&gt;\.gemini\config\skills\dsa-visualizer\SKILL.md
                </div>
                <p className="text-slate-400">Antigravity will automatically detect and activate this skill when working on DSA visualization tasks.</p>
              </div>

              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-2">
                <span className="text-indigo-400 font-bold block text-sm">Option B: Gemini Custom Gem</span>
                <p className="text-slate-300">
                  Create a new Gem named <strong>AlgoVision Engineer</strong> at <a href="https://gemini.google.com/gems" target="_blank" rel="noreferrer" className="text-indigo-400 underline">gemini.google.com</a> and paste the contents of SKILL.md into its <em>Instructions</em> box.
                </p>
              </div>

              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-2">
                <span className="text-emerald-400 font-bold block text-sm">Option C: 1-Click Studio Prompt (Easiest)</span>
                <p className="text-slate-300">
                  In AlgoVision Studio, open any problem and click <strong>"Upload Visualizer"</strong> &gt; <strong>"Copy Gemini Prompt"</strong>. It automatically injects the exact template, test cases, and problem statement into your clipboard!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#0a0c11] border-t border-white/5 flex items-center justify-between">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10 transition"
          >
            <Download className="w-4 h-4 text-indigo-400" />
            <span>Download {activeTab === 'template' ? 'Template (.jsx)' : 'SKILL.md'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Done
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 transition"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : activeTab === 'template' ? 'Copy React Template' : 'Copy SKILL.md'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
