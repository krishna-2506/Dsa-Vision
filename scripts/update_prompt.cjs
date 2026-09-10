
const fs = require('fs');
const path = require('path');

const filePath = path.resolve('src/components/VisualizerStudio.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const startMarker = '  const handleDirectCopyPrompt = () => {';
const startIdx = content.indexOf(startMarker);

// Find end by brace counting
let braceCount = 0;
let inFunction = false;
let endIdx = -1;
for (let i = startIdx; i < content.length; i++) {
  if (content[i] === '{') { braceCount++; inFunction = true; }
  if (content[i] === '}') { braceCount--; }
  if (inFunction && braceCount === 0) {
    endIdx = content.indexOf(';', i) + 1;
    break;
  }
}

const newFunction = `  const handleDirectCopyPrompt = () => {
    const key = question.component_key || toCamelCase(question.title) + 'Visualizer';
    const cppCode = solutions.cpp || '// Provide full C++ solution here';
    const timeC = question.time_complexity || 'O(N)';
    const spaceC = question.space_complexity || 'O(1)';
    const desc = JSON.stringify((question.description || '').slice(0, 160));

    const promptText = \`Act as an expert algorithm educator and React visualization engineer for AlgoVision Studio.
Create an interactive, animated React visualizer component for this DSA problem:

Problem ID: \${question.display_id || (question.leetcode_id ? '#' + question.leetcode_id : 'Q-001')}
Problem: "\${question.title}" (\${question.category} - \${question.difficulty})

Problem Statement & Examples:
\${question.description}

Approach & Logic:
\${question.approach || 'Provide intuitive brute force, optimized intermediate, and optimal algorithm approaches.'}

C++ Reference (basis for all solution code):
\\\`\\\`\\\`cpp
\${cppCode}
\\\`\\\`\\\`

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALGOVISION STUDIO ARCHITECTURE — READ CAREFULLY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The Studio already provides:
  • Approach tier tabs (Intuitive / Better / Optimal) above the stage
  • Split-screen: your canvas LEFT, syntax-highlighted code viewer RIGHT
  • Transport controls: Play/Pause, step ticks bar, Reset, Speed 0.5x-2x
  • Step title ("1. Initialize pointers") displayed above your canvas
  • Prev/Next step buttons and Prev/Next problem navigation

DO NOT render any of: outer card frames, "Step X of Y" counters, prev/next buttons,
language tabs, or copy-code buttons. The Studio already wraps you. Just render canvas content.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VISUAL STYLE — CHALKBOARD / WHITEBOARD AESTHETIC
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Match this exact design system. All colours are enforced by the app's CSS variables:

PALETTE (use these exact hex values):
  Stage background:     #12181a
  Card / node fill:     #1c2529
  Divider lines:        rgba(238,241,234,0.09)
  Primary text:         #eef1ea
  Secondary (dim) text: #8fa09a
  Faint index text:     #5f6f6a
  Amber / curr-active:  #e8a33d
  Teal  / prev-second:  #5fb3a6
  Easy green: #7cb473 | Hard red: #e06c75

SVG DRAWING RULES (all visualizers are SVG-based):
  Array/node boxes:
    fill="#1c2529"  stroke="#5f6f6a"  strokeWidth=1.4  rx=3
    filter="url(#rough)"  ← gives hand-drawn chalk-edge look
    (The SVG filter id="rough" is already in the page's root HTML — just reference it)

  Active element (curr / selected):
    Amber glow ring: stroke="#e8a33d" strokeWidth=2.2 rx=6 (box padded +5px each side)

  Previous / secondary element:
    Teal dashed ring: stroke="#5fb3a6" strokeWidth=1.6 strokeDasharray="3 4"

  Value inside box:
    font-family="IBM Plex Mono, monospace" fontSize=16 fontWeight=500 fill="#eef1ea"

  Index label below box:
    font-family="IBM Plex Mono, monospace" fontSize=10.5 fill="#5f6f6a"

  Pointer labels (curr, prev, L, R, head, slow, fast, i, j):
    font-family="Kalam, cursive" fontSize=14 fill=#e8a33d (active) or #5fb3a6 (secondary)
    Place ABOVE the box for curr/active, BELOW for prev/secondary

  SVG arrows: stroke="#5f6f6a" strokeWidth=1.2 with arrowhead marker
  Linked-List nodes: 3-compartment boxes (PREV | VAL | NEXT) with hex address tags above
  Tree nodes: circles fill="#1c2529" stroke="#5f6f6a"
  Hash Map: key→value badge grid in amber/teal

STATUS HUD — always render directly below canvas:
  <div className="status-line"><span className="prev-b">prev = 12</span>, <b>curr = 35</b></div>
  CSS already defined: .status-line (mono, dim), .status-line b (amber), .status-line .prev-b (teal)

EXPLANATION — render below status HUD:
  <p className="explain">35 beats curr, so <span className="note">prev</span> inherits old value.</p>
  CSS already defined: .explain (13.5px, dim), .explain .note (Kalam cursive, amber)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MULTI-LANGUAGE CODE — 3 LANGUAGES × 3 TIERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

For EACH approach tier, provide COMPLETE, fully written solutions in:
  • C++    (always required, full function)
  • Java   (required — full "class Solution { public ... }" wrapper)
  • Python (required — def with type hints, "# type: ignore" if needed)

Add educational line-by-line comments in each language explaining WHAT happens and WHY.
Do NOT write "..." or placeholder stubs — the code viewer shows the full source.

CRITICAL — codeLine sync with animation:
  Each step object needs codeLine: N where N = the EXACT line number in the C++ solution.
  The code viewer highlights that line live as the animation plays.
  Count lines carefully starting from line 1.
  (Java/Python have different line counts — only C++ line is used for sync.)

  If a tier doesn't meaningfully differ, you may reuse the same steps array and
  write "// Same approach as optimal" in the other tier's solutions.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXPORT FORMAT (scaffold — complete all sections)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

\\\`\\\`\\\`jsx
import React, { useMemo } from 'react';
// Available primitives: ArrayView, LinkedListView, TreeGraphView, MatrixView, StackQueueView
// import ArrayView from '../components/primitives/ArrayView';

export const approaches = {
  intuitive: {
    title: 'Intuitive: Brute Force',
    badge: 'Brute Force',
    complexity: { time: 'O(N²)', space: 'O(1)' },
    steps: [
      {
        title: '1. Initialize pointers',   // shown as step title above canvas
        codeLine: 3,                        // ← exact C++ line number, count carefully
        variables: { i: 0, j: 1 },         // shown in variable inspector
        status: '<span class="prev-b">i = 0</span>, <b>j = 1</b>',
        explain: 'Start at index 0 and scan every element...',
        // add problem-specific visual state here:
        activeIndex: 0,
        compareIndex: 1,
      },
      // ... every meaningful algorithm step
    ],
    solutions: {
      cpp: \\\`// C++ Brute Force — O(N²)
// Scan all pairs to find the second largest
int solution(int arr[], int n) {   // line 3
  int first = -1, second = -1;     // line 4  ← codeLine 4 for steps that touch this
  for (int i = 0; i < n; i++) {   // line 5
    // ...
  }
  return second;                   // line N
}\\\`,
      java: \\\`// Java Brute Force — O(N²)
class Solution {
  public int solution(int[] arr) {
    int first = Integer.MIN_VALUE, second = Integer.MIN_VALUE;
    // ...
    return second;
  }
}\\\`,
      python: \\\`# Python Brute Force — O(N²)
def solution(arr: list[int]) -> int:
    first = second = float('-inf')
    # ...
    return second
\\\`
    }
  },
  better: {
    title: 'Better: Sort + Scan',
    badge: 'Sub-Optimal',
    complexity: { time: 'O(N log N)', space: 'O(1)' },
    steps: [ /* all steps with codeLine */ ],
    solutions: { cpp: \\\`...\\\`, java: \\\`...\\\`, python: \\\`...\\\` }
  },
  optimal: {
    title: 'Optimal: Single Pass',
    badge: 'Optimal',
    complexity: { time: '\${timeC}', space: '\${spaceC}' },
    steps: [ /* all steps with codeLine */ ],
    solutions: { cpp: \\\`...\\\`, java: \\\`...\\\`, python: \\\`...\\\` }
  }
};

export const solutions = approaches.optimal.solutions;
export const steps     = approaches.optimal.steps;
export const meta = {
  display_id:      '\${question.display_id || 'Q-001'}',
  title:           "\${question.title}",
  category:        "\${question.category}",
  difficulty:      "\${question.difficulty}",
  timeComplexity:  "\${timeC}",
  spaceComplexity: "\${spaceC}",
  description:     \${desc}
};

export default function \${key}({
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
          {/* Render boxes / arrows / pointers based on stepData */}
        </svg>
      </div>

      {/* ── Status HUD ── */}
      {stepData.status && (
        <div className="status-line" dangerouslySetInnerHTML={{ __html: stepData.status }} />
      )}

      {/* ── Explanation ── */}
      {stepData.explain && (
        <p className="explain" dangerouslySetInnerHTML={{ __html: stepData.explain }} />
      )}
    </div>
  );
}
\\\`\\\`\\\`

Return ONLY the complete, ready-to-run React JSX code. No markdown outside the code block.\`;

    navigator.clipboard.writeText(promptText);
    sound.playStep(640);
    setCopiedDirect(true);
    setTimeout(() => setCopiedDirect(false), 2500);
  };`;

const newContent = content.slice(0, startIdx) + newFunction + content.slice(endIdx);
fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Done! File updated successfully.');
console.log('New function chars:', newFunction.length);
