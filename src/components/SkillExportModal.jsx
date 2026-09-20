import React, { useState } from 'react';
import { X, Copy, Check, Download, FileCode, Code2, BookOpen, Layers } from 'lucide-react';

const SKILL_MD = `---
name: dsa-visualizer
description: Skill for generating interactive React algorithm visualizers, step animations, multi-language code solutions, and database records for AlgoVision.
---

# DSA Visualizer Skill for AlgoVision

Use this skill when developing visualizers for Data Structures & Algorithms problems, Striver's A2Z DSA Sheet questions, or LeetCode challenges.

## 1. Architecture & Context
AlgoVision provides an interactive visualizer environment:
- Approach Tier Switcher: Segmented control (Intuitive / Better / Optimal)
- Split-Screen Layout: Interactive visualizer canvas on the left, syntax-highlighted code viewer on the right
- Transport Controls: Play/Pause, step slider, Reset, and playback speed (0.5x–2x)
- State & Invariant Inspector: Displays current step intuition, code line pointers, and variable memory badges

CRITICAL RULE: Do NOT render card frames, outer borders, step counters, or copy-code buttons inside your visualizer component. Just render the internal visual canvas and primitives.

## 2. Design System
The visualizer component uses the platform's theme tokens:

CSS Variables (Supports Light & Dark Modes Automatically):
- Stage Background: var(--board)
- Card / Node Box Fill: var(--board-raised)
- Subtle Container: var(--board-raised-2)
- Hairline Border: var(--line)
- Primary Text: var(--chalk)
- Secondary / Dim Text: var(--chalk-dim)
- Faint Index Labels: var(--chalk-faint)

Apple HIG Accent Palette:
- Active Focus / Pointers: var(--indigo) (#0a84ff - Apple System Blue)
- Comparison / Scanning: var(--amber) (#ff9f0a - Apple System Orange)
- Success / Matched / Done: var(--easy) (#30d158 - Apple System Mint/Green)
- Conflict / Eliminated: var(--hard) (#ff453a - Apple System Coral Red)
- Secondary Pointer / Aux: var(--teal) (#64d2ff - Apple System Cyan)
- Special Structure / Hash: var(--purple) (#bf5af2 - Apple System Purple)

Geometry & Motion:
- Rounded Squircles: rx="10" or rx="8"
- Glassmorphism: Translucent frosted fills, subtle drop shadows, delicate 1px specular borders
- Floating Pill Pointers: Apple rounded pill badges with indicator arrows (↓ top, ↑ bottom)
- Motion: CSS transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1)

## 3. Mandatory Multi-Tier Exports
1. export const approaches = {
     intuitive: { title, badge, complexity, steps, solutions },
     better:    { title, badge, complexity, steps, solutions },
     optimal:   { title, badge, complexity, steps, solutions }
   };
2. export const solutions = approaches.optimal.solutions;
3. export const steps = approaches.optimal.steps;
4. export const meta = { display_id, title, category, difficulty, timeComplexity, spaceComplexity, description };
5. export default function ComponentVisualizer({ currentStep, onStepChange, approachTier = 'optimal' }) { ... }
`;

const TEMPLATE_CODE = `import React from 'react';
import ArrayView from '../components/primitives/ArrayView';

export const approaches = {
  intuitive: {
    title: 'Intuitive: Brute Force',
    badge: 'Brute Force',
    complexity: { time: 'O(N²)', space: 'O(1)' },
    steps: [
      {
        title: '1. Initialize Iteration',
        phase: 'INITIALIZING',
        codeLine: 3,
        variables: { i: 0, j: 1 },
        explain: 'Start at index 0 and inspect all pairs sequentially.',
        intuition: 'Brute force checks every possible combination to guarantee finding a solution.',
        activeIndex: 0,
        compareIndex: 1
      }
    ],
    solutions: {
      cpp: \`// C++ Brute Force — O(N²)\`,
      java: \`// Java Brute Force — O(N²)\`,
      python: \`# Python Brute Force — O(N²)\`
    }
  },
  better: {
    title: 'Better: Binary Search',
    badge: 'Sub-Optimal',
    complexity: { time: 'O(N log N)', space: 'O(1)' },
    steps: [ /* rich pedagogical steps */ ],
    solutions: { cpp: \`...\`, java: \`...\`, python: \`...\` }
  },
  optimal: {
    title: 'Optimal: Two Pointers',
    badge: 'Optimal',
    complexity: { time: 'O(N)', space: 'O(1)' },
    steps: [
      {
        title: '1. Initialize Left & Right Boundaries',
        phase: 'INITIALIZING',
        codeLine: 3,
        variables: { left: 0, right: 5, sum: 25, target: 26 },
        explain: 'Place left pointer at index 0 (val=2) and right pointer at index 5 (val=23). Target = 26.',
        intuition: 'The array is sorted, so sum < target requires left++, and sum > target requires right--.',
        activeIndex: 0,
        compareIndex: 5
      },
      {
        title: '2. Evaluate Pair: 2 + 23 = 25 (< 26)',
        phase: 'COMPARING',
        codeLine: 8,
        variables: { left: 0, right: 5, sum: 25, target: 26 },
        explain: 'Sum 25 is less than target 26. Since the array is sorted, incrementing left increases our sum.',
        intuition: 'Incrementing left prunes all pairs (left, <= right) from the search space.',
        activeIndex: 0,
        compareIndex: 5
      },
      {
        title: '3. Match Found! 7 + 19 == 26',
        phase: 'MATCH_FOUND',
        codeLine: 7,
        variables: { left: 1, right: 4, sum: 26, target: 26 },
        explain: 'Match found! numbers[1] (7) + numbers[4] (19) equals target 26.',
        intuition: 'Optimal O(N) single-pass complete with zero auxiliary space.',
        activeIndex: 1,
        compareIndex: 4
      }
    ],
    solutions: {
      cpp: \`// C++ Optimal Two Pointers
vector<int> twoSum(vector<int>& numbers, int target) {
    int left = 0, right = numbers.size() - 1;
    while (left < right) {
        int sum = numbers[left] + numbers[right];
        if (sum == target) return {left + 1, right + 1};
        else if (sum < target) left++;
        else right--;
    }
    return {};
}\`,
      java: \`// Java Solution\`,
      python: \`# Python Solution\`
    }
  }
};

export const solutions = approaches.optimal.solutions;
export const steps     = approaches.optimal.steps;
export const meta = {
  display_id:      'Q-001',
  leetcode_id:     167,
  title:           'Two Sum II - Input Array Is Sorted',
  category:        '1. Arrays',
  difficulty:      'Medium',
  timeComplexity:  'O(N)',
  spaceComplexity: 'O(1)',
  description:     'Find two numbers in a sorted array that add up to a target number using converging pointers.'
};

export default function TwoSumIIInputArrayIsSortedVisualizer({
  currentStep = 0,
  approachTier = 'optimal'
}) {
  const activeApproach = approaches[approachTier] || approaches.optimal;
  const activeSteps    = activeApproach.steps;
  const stepIndex      = Math.min(Math.max(0, currentStep), activeSteps.length - 1);
  const stepData       = activeSteps[stepIndex] || activeSteps[0];

  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      <ArrayView
        items={[2, 7, 11, 15, 19, 23]}
        pointers={[
          { index: stepData.activeIndex ?? 0, label: 'L', color: 'blue' },
          { index: stepData.compareIndex ?? 5, label: 'R', color: 'amber' }
        ]}
      />
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="macos-window max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-[var(--line-strong)] bg-[var(--board-raised)]/95 backdrop-blur-2xl rounded-2xl">
        {/* macOS Titlebar */}
        <div className="macos-titlebar px-5 py-3.5 bg-[var(--board-raised-2)]/80 border-b border-[var(--line)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="traffic-lights">
              <span className="close" onClick={onClose} />
              <span className="minimize" />
              <span className="maximize" />
            </div>
            <div className="flex items-center gap-2 ml-2">
              <FileCode className="w-4 h-4 text-[var(--indigo)]" />
              <span className="text-xs font-semibold text-[var(--chalk)] tracking-tight">
                Apple HIG Skill & Architecture Hub
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--indigo-dim)] text-[var(--indigo)] border border-[var(--indigo)]/20 font-semibold">
                HIG Spec
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[var(--chalk-dim)] hover:text-[var(--chalk)] hover:bg-[var(--board-raised-2)] transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Apple Segmented Tab Navigation */}
        <div className="flex items-center px-6 py-2 border-b border-[var(--line)] bg-[var(--board-raised)] text-xs">
          <div className="segmented-control p-0.5 rounded-lg flex items-center gap-1">
            <button
              onClick={() => setActiveTab('skill')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium transition cursor-pointer ${
                activeTab === 'skill'
                  ? 'active shadow-sm font-semibold'
                  : 'text-[var(--chalk-dim)] hover:text-[var(--chalk)]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[var(--indigo)]" />
              <span>1. SKILL.md (Rules)</span>
            </button>

            <button
              onClick={() => setActiveTab('template')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium transition cursor-pointer ${
                activeTab === 'template'
                  ? 'active shadow-sm font-semibold'
                  : 'text-[var(--chalk-dim)] hover:text-[var(--chalk)]'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-[var(--indigo)]" />
              <span>2. Visualizer JSX Template</span>
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium transition cursor-pointer ${
                activeTab === 'guide'
                  ? 'active shadow-sm font-semibold'
                  : 'text-[var(--chalk-dim)] hover:text-[var(--chalk)]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[var(--indigo)]" />
              <span>3. Setup Guide</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 overflow-y-auto font-sans">
          {activeTab === 'skill' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[var(--chalk)]">Complete SKILL.md Rules & Design Specification</span>
                <span className="font-mono text-[var(--chalk-faint)] text-[11px]">skills/dsa-visualizer/SKILL.md</span>
              </div>
              <pre className="w-full p-4 bg-[var(--board)] border border-[var(--line)] rounded-xl text-xs text-[var(--chalk-dim)] font-mono whitespace-pre-wrap leading-relaxed max-h-[380px] overflow-y-auto selection:bg-[var(--indigo)] select-all">
                {SKILL_MD}
              </pre>
            </div>
          )}

          {activeTab === 'template' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[var(--chalk)]">Visualizer Component Scaffold</span>
              </div>
              <p className="text-xs text-[var(--chalk-dim)]">
                React component scaffold containing state models, step transitions, and synchronized code line tracking.
              </p>
              <pre className="w-full p-4 bg-[var(--board)] border border-[var(--line)] rounded-xl text-xs text-[var(--chalk-dim)] font-mono whitespace-pre-wrap leading-relaxed max-h-[340px] overflow-y-auto selection:bg-[var(--indigo)] select-all">
                {TEMPLATE_CODE}
              </pre>
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-[var(--board-raised-2)]/50 border border-[var(--line)] rounded-xl space-y-2">
                <span className="text-[var(--indigo)] font-semibold block text-sm">Option A: Antigravity IDE / CLI Skill</span>
                <p className="text-[var(--chalk-dim)]">
                  Save <code className="text-[var(--indigo)] bg-[var(--board)] px-1.5 py-0.5 rounded font-mono">SKILL.md</code> directly into your local configuration:
                </p>
                <div className="p-2.5 bg-[var(--board)] rounded-lg border border-[var(--line)] font-mono text-[11px] text-[var(--chalk)] select-all">
                  C:\Users\&lt;username&gt;\.gemini\config\skills\dsa-visualizer\SKILL.md
                </div>
                <p className="text-[var(--chalk-dim)]">Antigravity will automatically detect and activate this skill when working on DSA visualization tasks.</p>
              </div>

              <div className="p-4 bg-[var(--board-raised-2)]/50 border border-[var(--line)] rounded-xl space-y-2">
                <span className="text-[var(--indigo)] font-semibold block text-sm">Option B: Gemini Custom Gem</span>
                <p className="text-[var(--chalk-dim)]">
                  Create a new Gem named <strong>AlgoVision Engineer</strong> at <a href="https://gemini.google.com/gems" target="_blank" rel="noreferrer" className="text-[var(--indigo)] underline">gemini.google.com</a> and paste the contents of SKILL.md into its <em>Instructions</em> box.
                </p>
              </div>

              <div className="p-4 bg-[var(--board-raised-2)]/50 border border-[var(--line)] rounded-xl space-y-2">
                <span className="text-[var(--easy)] font-semibold block text-sm">Option C: Problem Context Prompt</span>
                <p className="text-[var(--chalk-dim)]">
                  In AlgoVision, open any problem and click <strong>"AI Prompt"</strong> to copy the problem specification, test cases, and template prompt.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[var(--board-raised-2)]/60 border-t border-[var(--line)] flex items-center justify-between">
          <button
            onClick={handleDownload}
            className="btn-ghost flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold cursor-pointer"
          >
            <Download className="w-4 h-4 text-[var(--indigo)]" />
            <span>Download {activeTab === 'template' ? 'Template (.jsx)' : 'SKILL.md'}</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="btn-ghost px-4 py-2 rounded-full text-xs font-medium cursor-pointer"
            >
              Done
            </button>
            <button
              onClick={handleCopy}
              className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold shadow-md cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
              <span>{copied ? 'Copied to Clipboard!' : activeTab === 'template' ? 'Copy React Template' : 'Copy SKILL.md'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
