
const fs = require('fs');
const path = require('path');

const filePath = path.resolve('src/components/VisualizerUploader.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Find geminiPrompt declaration and its end (backtick template literal)
const startMarker = '  // Generate question-specific prompt for Gemini with exact AlgoVision Studio UI template\n  const geminiPrompt = `Act as an expert';
const startIdx = content.indexOf(startMarker);
console.log('startIdx:', startIdx);

// Find the ending backtick of the template literal
// It ends with: Return ONLY the complete, ready-to-run React JSX code.`;
const endPattern = "Return ONLY the complete, ready-to-run React JSX code.`;";
const endIdx = content.indexOf(endPattern, startIdx) + endPattern.length;
console.log('endIdx:', endIdx);

const newPromptBlock = `  // AI Prompt — Chalkboard theme + multi-language (C++/Java/Python) per tier
  const geminiPrompt = \`Act as an expert algorithm educator and React visualization engineer for AlgoVision Studio.
Create an interactive, animated React visualizer component for this DSA problem:

Problem ID: \${question.display_id || (question.leetcode_id ? '#' + question.leetcode_id : 'Q-001')}
Problem: "\${question.title}" (\${question.category} - \${question.difficulty})

Problem Statement & Examples:
\${question.description}

Approach & Logic:
\${question.approach || 'Provide intuitive brute force, optimized intermediate, and optimal algorithm approaches.'}

C++ Reference (basis for all solution code):
\\\`\\\`\\\`cpp
\${solutions.cpp || '// Provide full C++ solution here'}
\\\`\\\`\\\`

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

\\\`\\\`\\\`jsx
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
      cpp: \\\`// C++ Brute Force — O(N²)
int solution(int arr[], int n) {   // line 1
  // ...
}\\\`,
      java: \\\`// Java Brute Force — O(N²)
class Solution {
  public int solution(int[] arr) {
    // ...
  }
}\\\`,
      python: \\\`# Python Brute Force — O(N²)
def solution(arr: list[int]) -> int:
    # ...
\\\`
    }
  },
  better: {
    title: 'Better: Intermediate',
    badge: 'Sub-Optimal',
    complexity: { time: 'O(N log N)', space: 'O(N)' },
    steps: [ /* all steps with codeLine */ ],
    solutions: { cpp: \\\`...\\\`, java: \\\`...\\\`, python: \\\`...\\\` }
  },
  optimal: {
    title: 'Optimal: Single Pass',
    badge: 'Optimal',
    complexity: { time: '\${question.time_complexity || 'O(N)'}', space: '\${question.space_complexity || 'O(1)'}' },
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
  timeComplexity:  "\${question.time_complexity || 'O(N)'}",
  spaceComplexity: "\${question.space_complexity || 'O(1)'}",
  description:     \${JSON.stringify((question.description || '').slice(0, 140))}
};

export default function \${componentKey}({
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
\\\`\\\`\\\`

Return ONLY the complete, ready-to-run React JSX code. No markdown outside the code block.\`;`;

const newContent = content.slice(0, startIdx) + newPromptBlock + content.slice(endIdx);
fs.writeFileSync(filePath, newContent, 'utf8');
console.log('VisualizerUploader.jsx updated successfully.');
console.log('Block size:', newPromptBlock.length);
