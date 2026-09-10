---
name: dsa-visualizer
description: Production-grade Gemini Skill for generating interactive React algorithm animations, fluid sliding pointer visualizers, thoroughly commented multi-language code solutions, and SQLite database entries for AlgoVision Studio.
---

# DSA Visualizer Skill for AlgoVision Studio (Production Guide)

Use this skill whenever asked to visualize any Data Structures & Algorithms problem, Striver's A2Z DSA Sheet question, or LeetCode challenge for **AlgoVision Studio**.

---

## 1. Unified Visualizer UI Architecture

Every React visualizer component generated for AlgoVision Studio **MUST** adhere to the standard 5-layer layout:

```
+-----------------------------------------------------------------------+
| 1. Sub-Header: Step Counter (Step 1/6) | Title | [← Prev] [Next →]    |
+-----------------------------------------------------------------------+
| 2. Canvas Zone: Dark Obsidian (#08090e) Canvas                        |
|    - Animated Array / Tree / Grid / Linked List                       |
|    - Sliding Pointers (L↓, R↓, i↓, mid) with smooth CSS transitions    |
|    - SVG Connector Arrows pointing directly to active indices         |
+-----------------------------------------------------------------------+
| 3. Real-Time HUD: Active Variables & Comparison Inspector             |
|    - e.g. nums[L] (2) + nums[R] (23) = 25 | Target: 26 | SUM < TARGET |
+-----------------------------------------------------------------------+
| 4. Explanation Footer: In-depth step explanation                      |
|    - Educational breakdown of why pointers shifted & loop invariants  |
+-----------------------------------------------------------------------+
```

### Color Palette & Semantic Tokens:
- **Obsidian Dark Background**: `#0b0d14` (card), `#0e111a` (header/HUD), `#08090e` (canvas), `#0c0e16` (footer).
- **Primary Accent**: Indigo (`#6366f1` / `bg-indigo-600` / `text-indigo-400`).
- **Semantic Feedback**:
  - **Match / Sorted / Success**: Emerald (`#10b981` / `text-emerald-400` / `bg-emerald-500/15`).
  - **Active Evaluation / Comparison**: Amber (`#f59e0b` / `text-amber-400` / `bg-amber-500/15`).
  - **Eliminated Range / Upper Boundary**: Rose (`#f43f5e` / `text-rose-400` / `bg-rose-500/15`).
- **Pills vs Badges**: Use sharp micro-badges with `rounded-[4px]` and `font-mono text-[10px]`. Avoid rounded-full pills.

---

## 2. Mandatory Component Exports

Every visualizer file **MUST export**:
1. `export const meta = { ... }`: Problem metadata.
2. `export const steps = [ ... ]`: Array of animation frames with codeLine synchronization.
3. `export default function <Name>Visualizer({ currentStep, onStepChange })`: The React component.

---

## 3. Template A: Array & Two Pointers / Sliding Window

Use this template for: Two Sum, 3Sum, Container With Most Water, Trapping Rainwater, Sort 0 1 2, Rotate Array, etc.

```jsx
import React, { useState } from 'react';
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
    code: 'int left = 0, right = numbers.size() - 1;\nint target = 26;',
    explanation: 'Place left pointer at index 0 (val=2) and right pointer at index 5 (val=23). Target = 26.',
    currentSum: 25,
    status: 'less'
  },
  {
    title: '2. Evaluate Pair: 2 + 23 = 25 (< 26)',
    left: 0,
    right: 5,
    codeLine: 8,
    code: 'int sum = numbers[left] + numbers[right]; // 2 + 23 = 25\nif (sum < target) left++; // Need larger sum',
    explanation: 'Sum 25 is less than target 26. Since the array is sorted, incrementing left increases our sum.',
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
    title: '4. Evaluate Pair: 7 + 23 = 30 (> 26)',
    left: 1,
    right: 5,
    codeLine: 10,
    code: 'int sum = numbers[left] + numbers[right]; // 7 + 23 = 30\nif (sum > target) right--; // Need smaller sum',
    explanation: 'Sum 30 exceeds target 26. Decrement right pointer to reduce the total sum.',
    currentSum: 30,
    status: 'greater'
  },
  {
    title: '5. Decrement Right: index 5 -> 4',
    left: 1,
    right: 4,
    codeLine: 11,
    code: 'right--; // Right slides to index 4 (val = 19)',
    explanation: 'Right pointer moves to index 4. Evaluating numbers[1] (7) and numbers[4] (19).',
    currentSum: 26,
    status: 'calc'
  },
  {
    title: '6. Target Match Found! 7 + 19 == 26',
    left: 1,
    right: 4,
    codeLine: 7,
    code: 'if (sum == target) return { left + 1, right + 1 }; // Return [2, 5]',
    explanation: 'Match found! numbers[1] (7) + numbers[4] (19) equals target 26. Optimal O(N) time and O(1) space.',
    currentSum: 26,
    status: 'found'
  }
];

export default function TwoSumVisualizer({ currentStep: externalStep, onStepChange }) {
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
            <span className="text-indigo-400 font-bold">nums[{stepData.left}] ({ARRAY[stepData.left]})</span>
            <span className="text-slate-600">+</span>
            <span className="text-amber-400 font-bold">nums[{stepData.right}] ({ARRAY[stepData.right]})</span>
            <span className="text-slate-600">=</span>
            <span className={`font-bold ${stepData.status === 'found' ? 'text-emerald-400 text-sm' : 'text-slate-200'}`}>
              {stepData.currentSum}
            </span>
          </div>

          <span className="text-slate-700">|</span>

          <div className="flex items-center gap-2">
            <span className="text-slate-500">Target: <strong className="text-white">{TARGET}</strong></span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
              stepData.status === 'found'
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : stepData.status === 'less'
                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
            }`}>
              {stepData.status === 'found' ? 'MATCH ✓' : stepData.status === 'less' ? 'SUM < TARGET' : 'SUM > TARGET'}
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
```

---

## 4. Template B: Binary Search & Monotonic Search Space

Use this template for: Binary Search, Search in Rotated Sorted Array, Find Peak Element, Kth Element in Sorted Array, Aggressive Cows, Book Allocation, etc.

```jsx
import React, { useState } from 'react';
import ArrayView from '../components/primitives/ArrayView';

export const meta = {
  display_id: 'Q-042',
  leetcode_id: 704,
  title: 'Binary Search',
  category: '2. Binary Search',
  difficulty: 'Easy',
  timeComplexity: 'O(log N)',
  spaceComplexity: 'O(1)',
  leetcodeUrl: 'https://leetcode.com/problems/binary-search/',
  description: 'Search target value in a sorted array by halving search space at each step.'
};

const ARRAY = [-1, 0, 3, 5, 9, 12];
const TARGET = 9;

export const steps = [
  {
    title: '1. Initialize Boundaries: low=0, high=5',
    low: 0,
    high: 5,
    mid: 2,
    codeLine: 3,
    code: 'int low = 0, high = nums.size() - 1;\nint mid = low + (high - low) / 2; // mid = 2 (val = 3)',
    explanation: 'Set low boundary at index 0 (-1) and high at index 5 (12). Midpoint is 0 + (5-0)/2 = index 2 (val=3).',
    status: 'eval'
  },
  {
    title: '2. Compare mid value: 3 < target 9',
    low: 0,
    high: 5,
    mid: 2,
    codeLine: 7,
    code: 'if (nums[mid] < target) low = mid + 1; // 3 < 9, discard left half',
    explanation: 'Value at mid (3) is strictly less than target 9. Discard left partition by updating low = mid + 1.',
    status: 'discard_left'
  },
  {
    title: '3. Recompute Mid: low=3, high=5 -> mid=4',
    low: 3,
    high: 5,
    mid: 4,
    codeLine: 4,
    code: 'low = mid + 1; // low = 3\nmid = low + (high - low) / 2; // mid = 4 (val = 9)',
    explanation: 'Search space narrowed to [3..5]. Midpoint is 3 + (5-3)/2 = index 4 (val=9).',
    status: 'eval'
  },
  {
    title: '4. Target Found at Index 4!',
    low: 3,
    high: 5,
    mid: 4,
    codeLine: 5,
    code: 'if (nums[mid] == target) return mid; // nums[4] == 9',
    explanation: 'Target 9 found at index 4! Search terminates in O(log N) operations.',
    status: 'found'
  }
];

export default function BinarySearchVisualizer({ currentStep: externalStep, onStepChange }) {
  const [internalStep, setInternalStep] = useState(0);
  const stepIndex = externalStep !== undefined ? externalStep : internalStep;
  const setStep = onStepChange || setInternalStep;
  const stepData = steps[stepIndex] || steps[0];

  const pointers = [
    { index: stepData.low, label: 'L', color: 'indigo' },
    { index: stepData.mid, label: 'MID', color: stepData.status === 'found' ? 'emerald' : 'amber' },
    { index: stepData.high, label: 'H', color: 'rose' }
  ];

  return (
    <div className="w-full flex flex-col bg-[#0b0d14] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
      <div className="px-5 py-3 bg-[#0e111a] border-b border-white/5 flex items-center justify-between">
        <span className="font-mono text-xs text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
          Step {stepIndex + 1} / {steps.length}
        </span>
        <h3 className="text-sm font-bold text-white font-mono">{stepData.title}</h3>
      </div>
      <div className="p-6 flex flex-col items-center justify-center bg-[#08090e]/60 min-h-[220px]">
        <ArrayView
          items={ARRAY}
          pointers={pointers}
          matchIndices={stepData.status === 'found' ? [stepData.mid] : []}
        />
        <div className="mt-4 flex items-center gap-3 px-4 py-2 rounded-lg bg-[#0e111a] border border-white/5 font-mono text-xs">
          <span>Range: <strong className="text-indigo-400">[{stepData.low} .. {stepData.high}]</strong></span>
          <span className="text-slate-700">|</span>
          <span>Mid: <strong className="text-amber-400">nums[{stepData.mid}] = {ARRAY[stepData.mid]}</strong></span>
          <span className="text-slate-700">|</span>
          <span className="text-slate-400">Target: <strong className="text-white">{TARGET}</strong></span>
        </div>
      </div>
      <div className="px-5 py-3 bg-[#0c0e16] border-t border-white/5 text-xs text-slate-300 font-sans">
        <strong className="text-slate-500 font-mono mr-2">Explanation:</strong>
        {stepData.explanation}
      </div>
    </div>
  );
}
```

---

## 5. In-Line Code Solutions (Exhaustive & Commented)

Whenever providing code alongside a visualizer, provide all 4 standard languages:
- **C++**: Focus on STL containers (`std::vector`, `std::unordered_map`), references (`&`), and zero-copy iteration.
- **Python 3**: Idiomatic Python, type hints, list comprehensions where clear, explicit loop invariants.
- **Java**: Robust typed solutions with proper bounds checking and object lifecycle.
- **TypeScript**: Typed arrays, clean closures, and clean modern ECMAScript idioms.

### Critical Rule for Comments:
**Every single line of the main loop MUST have an in-line comment explaining the mathematical or algorithmic reason why.**
- ❌ BAD: `left++; // increment left`
- ✅ GOOD: `left++; // Since array is sorted and sum < target, sliding left rightward increases total sum`

---

## 6. Verification Checklist
Before outputting code, verify:
- [ ] Component is exported as `default` and accepts `({ currentStep, onStepChange })`.
- [ ] `export const meta = { ... }` has title, category, difficulty, timeComplexity, spaceComplexity.
- [ ] `export const steps = [ ... ]` has `title`, `codeLine`, `code`, and `explanation` on EVERY step.
- [ ] Styling uses Obsidian `#0b0d14`, `#0e111a`, `#08090e`, Indigo `#6366f1`, Emerald, Amber, and Rose.
- [ ] No generic AI rounded-full pills or bright purple background gradients.
