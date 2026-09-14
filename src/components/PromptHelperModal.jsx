import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, Terminal, Lightbulb } from 'lucide-react';

export default function PromptHelperModal({ isOpen, onClose }) {
  const [topic, setTopic] = useState('Invert Binary Tree');
  const [category, setCategory] = useState('Trees & BST');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const componentKey = topic.replace(/[^a-zA-Z0-9]/g, '') + 'Visualizer';

  const generatedPrompt = `Act as an expert algorithm educator and React visualization engineer for AlgoVision Studio.
Create an interactive, animated React visualizer component for this DSA problem:

Problem: "${topic}" (${category})

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
  • title: Concise action title (e.g. "2. Inspect node (4) and swap left/right children")
  • phase: Semantic phase badge (e.g. 'INITIALIZING' | 'SCANNING' | 'COMPARING' | 'SWAPPING' | 'PARTITIONING' | 'MATCH_FOUND' | 'PRUNING')
  • explain: 2-3 clear educational sentences explaining WHAT happened, WHY this step is taken, and how it progresses the algorithm.
  • intuition: A "Why this works / Key takeaway" note explaining how this decision prunes candidates or maintains the loop invariant.
  • variables: An object of all live pointers and accumulators (e.g. { curr: 4, left: 2, right: 7 })
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
    title: 'Intuitive: Brute Force / Recursive',
    badge: 'Recursive',
    complexity: { time: 'O(N)', space: 'O(H)' },
    steps: [
      {
        title: '1. Inspect root node',
        phase: 'INITIALIZING',
        codeLine: 3,
        variables: { node: 4 },
        explain: 'Begin recursive traversal starting from the root of the tree.',
        intuition: 'Every subtree root must swap its left and right subtrees recursively.',
        activeIndex: 0,
      }
    ],
    solutions: {
      cpp: \`// C++ Solution\`,
      java: \`// Java Solution\`,
      python: \`# Python Solution\`
    }
  },
  better: {
    title: 'Better: Iterative BFS',
    badge: 'Iterative BFS',
    complexity: { time: 'O(N)', space: 'O(W)' },
    steps: [ /* rich steps with phase, explain, intuition, variables, codeLine */ ],
    solutions: { cpp: \`...\`, java: \`...\`, python: \`...\` }
  },
  optimal: {
    title: 'Optimal: In-Place DFS / Pointer Inversion',
    badge: 'Optimal',
    complexity: { time: 'O(N)', space: 'O(1)' },
    steps: [ /* rich steps with phase, explain, intuition, variables, codeLine */ ],
    solutions: { cpp: \`...\`, java: \`...\`, python: \`...\` }
  }
};

export const solutions = approaches.optimal.solutions;
export const steps     = approaches.optimal.steps;
export const meta = {
  title:           "${topic}",
  category:        "${category}",
  difficulty:      "Medium",
  timeComplexity:  "O(N)",
  spaceComplexity: "O(1)",
  description:     "Comprehensive step-by-step visualizer for ${topic}."
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
      {/* Render Apple Visualizer Canvas */}
    </div>
  );
}
\`\`\`

Return ONLY the complete, ready-to-run React JSX code block. No text outside the code block.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="macos-window max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-[var(--line-strong)] bg-[var(--board-raised)]/95 backdrop-blur-2xl rounded-2xl">
        {/* macOS Titlebar */}
        <div className="macos-titlebar px-5 py-3.5 bg-[var(--board-raised-2)]/80 border-b border-[var(--line)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="traffic-lights">
              <span className="close" onClick={onClose} />
              <span className="minimize" />
              <span className="maximize" />
            </div>
            <div className="flex items-center gap-2 ml-2">
              <Sparkles className="w-4 h-4 text-[var(--indigo)]" />
              <span className="text-xs font-semibold text-[var(--chalk)]">
                AI Visualizer Prompt Generator
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

        {/* Form Inputs */}
        <div className="p-6 space-y-5 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--chalk)] mb-1.5">
                Problem / Algorithm Name
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Invert Binary Tree, LRU Cache..."
                className="w-full px-3.5 py-2 bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl text-xs font-medium text-[var(--chalk)] focus:outline-none focus:border-[var(--indigo)] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--chalk)] mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl text-xs font-medium text-[var(--chalk)] focus:outline-none focus:border-[var(--indigo)] transition"
              >
                <option>Linked Lists</option>
                <option>Arrays & Two Pointers</option>
                <option>Binary Search</option>
                <option>Trees & BST</option>
                <option>Graphs & BFS/DFS</option>
                <option>Sorting & Searching</option>
                <option>Dynamic Programming</option>
                <option>Stacks & Queues</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-[var(--chalk)]">
                Generated Apple HIG Prompt
              </label>
              <span className="text-[11px] text-[var(--indigo)] font-medium">
                Ready to paste into Gemini
              </span>
            </div>
            <div className="relative">
              <pre className="w-full p-4 bg-[var(--board)] border border-[var(--line)] rounded-xl text-[11px] text-[var(--chalk-dim)] font-mono whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto select-all">
                {generatedPrompt}
              </pre>
            </div>
          </div>

          {/* Quick Tip Box */}
          <div className="p-3.5 rounded-xl bg-[var(--indigo-dim)] border border-[var(--indigo)]/20 flex items-start gap-3 text-xs text-[var(--chalk)]">
            <Lightbulb className="w-4 h-4 text-[var(--indigo)] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[var(--chalk)]">How to mount Gemini's code:</p>
              <p className="text-[var(--chalk-dim)] text-[11px] mt-0.5">
                Drop Gemini's response directly into the visualizer dropzone, or save as a <code className="text-[var(--indigo)] font-semibold">.jsx</code> file inside <code className="text-[var(--indigo)] font-semibold">src/visualizers/</code>. AlgoVision compiles and mounts it live!
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[var(--board-raised-2)]/60 border-t border-[var(--line)] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="btn-ghost px-4 py-2 rounded-full text-xs font-medium cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handleCopy}
            className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold shadow-md cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5 text-white" />}
            <span>{copied ? 'Copied Prompt!' : 'Copy Apple HIG Prompt'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
