---
name: dsa-visualizer
description: Apple HIG-grade Gemini Skill for generating interactive React algorithm animations, fluid sliding pointer visualizers, thoroughly commented multi-language code solutions, and SQLite database entries for AlgoVision Studio.
---

# DSA Visualizer Skill for AlgoVision Studio (Apple HIG Architecture)

Use this skill whenever asked to visualize any Data Structures & Algorithms problem, Striver's A2Z DSA Sheet question, or LeetCode challenge for **AlgoVision Studio**.

---

## 1. AlgoVision Studio Architecture & Context

The AlgoVision Studio provides an Apple macOS-grade interactive environment:
- **Approach Tier Switcher**: Segmented control pill (Intuitive / Better / Optimal) above the stage.
- **Split-Screen Layout**: Interactive visualizer canvas on the LEFT, syntax-highlighted multi-language code viewer on the RIGHT.
- **macOS Floating Dock Transport HUD**: Play/Pause, step ticks bar, Reset, Speed 0.5x-2x, and keyboard shortcuts (`Space`, `[`, `]`, `1`, `2`, `3`).
- **Apple Invariant & Memory Inspector**: Automatically renders below the stage displaying:
  - Semantic Phase Pill (`INITIALIZING`, `SCANNING`, `COMPARING`, `SWAPPING`, `MATCH_FOUND`, etc.)
  - Synchronized C++ Line Indicator (`codeLine: N`)
  - Multi-Sentence Educational Reasoning (`explain`)
  - Algorithmic Loop Invariant & Pruning Takeaway (`intuition`)
  - Real-Time Live Memory Badges (`variables: { left: 0, right: 5, sum: 25 }`)

**CRITICAL RULE**: Do **NOT** render card frames, outer borders, "Step X of Y" counters, prev/next buttons, language switchers, or copy-code buttons inside your visualizer component. Just render the internal visual canvas and primitives.

---

## 2. Design System: Apple macOS & HIG Dual-Theme

Your visualizer must feel like a native Apple product (macOS Sequoia / iOS). The visualizer canvas theme and the application theme are **100% IDENTICAL**.

### Mandatory CSS Variables (Supports Light & Dark Modes Automatically):
- **Stage Background**: `var(--board)`
- **Card / Node Box Fill**: `var(--board-raised)`
- **Subtle Container**: `var(--board-raised-2)`
- **Hairline Border**: `var(--line)`
- **Primary Text**: `var(--chalk)`
- **Secondary / Dim Text**: `var(--chalk-dim)`
- **Faint Index Labels**: `var(--chalk-faint)`

### Apple HIG Accent Palette:
- **Active Focus / Pointers**: `var(--indigo)` (`#0a84ff` - Apple System Blue)
- **Comparison / Scanning**: `var(--amber)` (`#ff9f0a` - Apple System Orange)
- **Success / Matched / Done**: `var(--easy)` (`#30d158` - Apple System Mint/Green)
- **Conflict / Eliminated**: `var(--hard)` (`#ff453a` - Apple System Coral Red)
- **Secondary Pointer / Aux**: `var(--teal)` (`#64d2ff` - Apple System Cyan)
- **Special Structure / Hash**: `var(--purple)` (`#bf5af2` - Apple System Purple)

### Geometry & Animation Dynamics:
- **Rounded Squircles**: Use `rx="10"` or `rx="8"` for array cells, memory nodes, and matrix boxes.
- **Glassmorphism**: Translucent frosted fills, subtle drop shadow filters (`feDropShadow`), and delicate 1px specular borders.
- **Floating Pill Pointers**: Render pointers as floating Apple rounded pills with directional arrows (`↓ top`, `↑ bottom`), NOT hand-drawn scratchy text.
- **Motion**: Fluid transitions on moving elements (`transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1)`).
- **Prohibited**: Do NOT use rough chalkboard SVG filters, chalkboard green/slate (`#12181a`), or cursive/handwriting fonts.

---

## 3. Deep Educational Pedagogy Schema

Every step in the `steps` array MUST contain:
```javascript
{
  title: "2. Evaluate Pair: nums[left] (2) + nums[right] (23) == 25",
  phase: "COMPARING", // 'INITIALIZING' | 'SCANNING' | 'COMPARING' | 'SWAPPING' | 'PARTITIONING' | 'MATCH_FOUND' | 'PRUNING'
  codeLine: 8,        // EXACT 1-indexed line number in C++ solution for live sync!
  variables: { left: 0, right: 5, sum: 25, target: 26 },
  explain: "Sum 25 is less than target 26. Because the input array is strictly sorted in ascending order, any pair with this right element and a smaller left element will yield an even smaller sum.",
  intuition: "Incrementing the left pointer eliminates all pairs (left, <= right) from consideration, maintaining the invariant that the target must lie strictly within [left, right].",
  activeIndex: 0,
  compareIndex: 5,
}
```

---

## 4. Multi-Language Solutions (3 Tiers × 3 Languages)

For each approach tier (`intuitive`, `better`, `optimal`), provide complete, compilable, idiomatic solutions with educational line comments:
1. **C++** (Basis for `codeLine` synchronization)
2. **Java** (Complete class `Solution` with method)
3. **Python** (Clean function with type annotations)

---

## 5. Standard Component Scaffold

```jsx
import React from 'react';
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
        intuition: 'Brute force exhaustively checks all pairs to guarantee finding a solution.',
        activeIndex: 0,
        compareIndex: 1
      }
    ],
    solutions: {
      cpp: `// Full C++ Brute Force`,
      java: `// Full Java Brute Force`,
      python: `# Full Python Brute Force`
    }
  },
  better: {
    title: 'Better: Hash Map / Binary Search',
    badge: 'Sub-Optimal',
    complexity: { time: 'O(N log N)', space: 'O(1)' },
    steps: [ /* rich pedagogical steps */ ],
    solutions: { cpp: `...`, java: `...`, python: `...` }
  },
  optimal: {
    title: 'Optimal: Two Pointers',
    badge: 'Optimal',
    complexity: { time: 'O(N)', space: 'O(1)' },
    steps: [ /* rich pedagogical steps */ ],
    solutions: { cpp: `...`, java: `...`, python: `...` }
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
        items={stepData.items || [2, 7, 11, 15, 19, 23]}
        pointers={[
          { index: stepData.activeIndex ?? 0, label: 'L', color: 'blue' },
          { index: stepData.compareIndex ?? 5, label: 'R', color: 'amber' }
        ]}
      />
    </div>
  );
}
```
