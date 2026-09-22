import React, { useState, useMemo } from 'react';
import ArrayView from '../components/primitives/ArrayView';

export const meta = {
  leetcode_id: 704,
  title: 'Binary Search',
  category: 'Binary Search',
  difficulty: 'Easy',
  timeComplexity: 'O(log N)',
  spaceComplexity: 'O(1)',
  leetcodeUrl: 'https://leetcode.com/problems/binary-search/',
  description: 'Search for target in a sorted array by halving the search space at each step.'
};

const DEFAULT_ARRAY = [3, 8, 12, 17, 24, 31, 45, 59, 72, 88];
const DEFAULT_TARGET = 45;

export const defaultSteps = [
  {
    title: "1. Search Space [0..9], Midpoint at Index 4 (val=24)",
    low: 0,
    high: 9,
    mid: 4,
    codeLine: 6,
    variables: { low: 0, high: 9, mid: 4, target: 45, 'nums[mid]': 24 },
    code: "int low = 0, high = 9;\nint mid = low + (high - low) / 2; // mid = 4, nums[mid] = 24",
    explanation: "Initial range spans entire array. Calculate mid = 4 (value 24). Comparing 24 with target 45.",
    status: 'comparing'
  },
  {
    title: "2. 24 < 45 ➔ Discard Left Half [0..4]",
    low: 5,
    high: 9,
    mid: 4,
    codeLine: 8,
    variables: { low: 5, high: 9, mid: 4, target: 45, 'nums[mid]': 24 },
    code: "if (nums[mid] < target) {\n  low = mid + 1; // low becomes 5\n}",
    explanation: "Because the array is sorted, all elements up to index 4 are too small. Slide low pointer to index 5.",
    status: 'eliminate-left'
  },
  {
    title: "3. Search Space [5..9], Midpoint at Index 7 (val=59)",
    low: 5,
    high: 9,
    mid: 7,
    codeLine: 6,
    variables: { low: 5, high: 9, mid: 7, target: 45, 'nums[mid]': 59 },
    code: "mid = 5 + (9 - 5) / 2; // mid = 7, nums[mid] = 59",
    explanation: "Recalculate mid in interval [5..9]. Mid is index 7 (value 59). Comparing 59 with target 45.",
    status: 'comparing'
  },
  {
    title: "4. 59 > 45 ➔ Discard Right Half [7..9]",
    low: 5,
    high: 6,
    mid: 7,
    codeLine: 9,
    variables: { low: 5, high: 6, mid: 7, target: 45, 'nums[mid]': 59 },
    code: "else if (nums[mid] > target) {\n  high = mid - 1; // high becomes 6\n}",
    explanation: "59 exceeds target 45. All elements at or above index 7 are too large. Slide high pointer to index 6.",
    status: 'eliminate-right'
  },
  {
    title: "5. Search Space [5..6], Midpoint at Index 5 (val=31)",
    low: 5,
    high: 6,
    mid: 5,
    codeLine: 8,
    variables: { low: 5, high: 6, mid: 5, target: 45, 'nums[mid]': 31 },
    code: "mid = 5 + (6 - 5) / 2; // mid = 5, nums[mid] = 31 < 45\nlow = mid + 1; // low becomes 6",
    explanation: "Mid is 5 (value 31). 31 < 45, so low slides to mid + 1 (index 6).",
    status: 'comparing'
  },
  {
    title: "6. Target Match Found at Index 6! (val=45)",
    low: 6,
    high: 6,
    mid: 6,
    codeLine: 7,
    variables: { low: 6, high: 6, mid: 6, target: 45, 'nums[mid]': 45, found: true },
    code: "if (nums[mid] == target) {\n  return mid; // Found at index 6!\n}",
    explanation: "nums[6] == 45 == target! Target located in O(log N) operations with O(1) auxiliary space.",
    status: 'found'
  }
];

export const steps = defaultSteps;

// Dynamically generate step trace for any custom array & target
function generateBinarySearchTrace(arr, target) {
  const trace = [];
  let low = 0;
  let high = arr.length - 1;

  trace.push({
    title: `1. Initialize search range [0..${high}] for target ${target}`,
    low,
    high,
    mid: Math.floor((low + high) / 2),
    codeLine: 4,
    variables: { low, high, mid: Math.floor((low + high) / 2), target, 'nums[mid]': arr[Math.floor((low + high) / 2)] },
    explanation: `Searching for target ${target} across sorted array of ${arr.length} elements.`,
    status: 'comparing'
  });

  let stepNum = 2;
  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);
    const midVal = arr[mid];

    if (midVal === target) {
      trace.push({
        title: `${stepNum}. Match Found! nums[${mid}] == ${target}`,
        low,
        high,
        mid,
        codeLine: 7,
        variables: { low, high, mid, target, 'nums[mid]': midVal, found: true },
        explanation: `Target ${target} located at index ${mid} in optimal O(log N) time!`,
        status: 'found'
      });
      return trace;
    } else if (midVal < target) {
      trace.push({
        title: `${stepNum}. nums[${mid}] (${midVal}) < ${target} ➔ Discard Left Half`,
        low: mid + 1,
        high,
        mid,
        codeLine: 8,
        variables: { low: mid + 1, high, mid, target, 'nums[mid]': midVal },
        explanation: `${midVal} is less than ${target}. Since array is sorted, eliminate left half and advance low to ${mid + 1}.`,
        status: 'eliminate-left'
      });
      low = mid + 1;
    } else {
      trace.push({
        title: `${stepNum}. nums[${mid}] (${midVal}) > ${target} ➔ Discard Right Half`,
        low,
        high: mid - 1,
        mid,
        codeLine: 9,
        variables: { low, high: mid - 1, mid, target, 'nums[mid]': midVal },
        explanation: `${midVal} is greater than ${target}. Eliminate right half and retreat high to ${mid - 1}.`,
        status: 'eliminate-right'
      });
      high = mid - 1;
    }
    stepNum++;
  }

  trace.push({
    title: `${stepNum}. Search Excluded: Target ${target} not in array`,
    low,
    high,
    mid: Math.max(0, Math.min(arr.length - 1, Math.floor((low + high) / 2))),
    codeLine: 11,
    variables: { low, high, target, found: false },
    explanation: `low (${low}) crossed high (${high}). Search interval is empty. Target ${target} is not in array. Return -1.`,
    status: 'not-found'
  });

  return trace;
}

export default function BinarySearchVisualizer({
  currentStep: externalStep,
  onStepChange,
  customInput = '',
  customTarget = ''
}) {
  const [internalStep, setInternalStep] = useState(0);

  // Parse custom input or fallback
  const { activeArray, activeTarget, activeSteps } = useMemo(() => {
    let arr = DEFAULT_ARRAY;
    let tgt = DEFAULT_TARGET;

    if (customInput && customInput.trim()) {
      try {
        const parsed = JSON.parse(customInput.trim());
        if (Array.isArray(parsed) && parsed.length > 0) {
          arr = parsed.map(Number).filter(n => !isNaN(n)).sort((a, b) => a - b);
        }
      } catch {
        const parts = customInput.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
        if (parts.length > 0) arr = parts.sort((a, b) => a - b);
      }
    }

    if (customTarget && customTarget.trim() !== '') {
      const parsedTgt = Number(customTarget);
      if (!isNaN(parsedTgt)) tgt = parsedTgt;
    }

    const computedTrace = (customInput || customTarget)
      ? generateBinarySearchTrace(arr, tgt)
      : defaultSteps;

    return {
      activeArray: arr,
      activeTarget: tgt,
      activeSteps: computedTrace
    };
  }, [customInput, customTarget]);

  const stepIndex = externalStep !== undefined ? Math.min(externalStep, activeSteps.length - 1) : internalStep;
  const setStep = onStepChange || setInternalStep;
  const stepData = activeSteps[stepIndex] || activeSteps[0];

  const handleNext = () => {
    if (stepIndex < activeSteps.length - 1) setStep(stepIndex + 1);
  };

  const handlePrev = () => {
    if (stepIndex > 0) setStep(stepIndex - 1);
  };

  const pointers = [
    { index: stepData.low, label: 'L', color: 'indigo' },
    { index: stepData.mid, label: 'MID', color: stepData.status === 'found' ? 'emerald' : 'amber' },
    { index: stepData.high, label: 'R', color: 'indigo' }
  ];

  const matchIndices = stepData.status === 'found' ? [stepData.mid] : [];

  return (
    <div className="w-full flex flex-col bg-[#0b0d14] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
      {/* Top Bar */}
      <div className="px-5 py-3 bg-[#0e111a] border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
            Step {stepIndex + 1} / {activeSteps.length}
          </span>
          <h3 className="text-sm font-bold text-[var(--chalk)] font-mono">{stepData.title}</h3>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrev}
            disabled={stepIndex === 0}
            className="px-2.5 py-1 bg-white/5 hover:bg-white/10 disabled:opacity-30 text-[var(--chalk-dim)] text-xs font-mono rounded border border-white/5 transition cursor-pointer"
          >
            ← Prev
          </button>
          <button
            onClick={handleNext}
            disabled={stepIndex === activeSteps.length - 1}
            className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-[var(--chalk)] text-xs font-mono font-medium rounded transition cursor-pointer"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Array Canvas with animated sliding pointers */}
      <div className="p-6 flex flex-col items-center justify-center bg-[#08090e]/60 min-h-[220px]">
        <ArrayView
          items={activeArray}
          pointers={pointers}
          matchIndices={matchIndices}
          isDimmed={(idx) => idx < stepData.low || idx > stepData.high}
        />

        {/* Pointers State HUD */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 px-4 py-2 rounded-lg bg-[#0e111a] border border-white/5 font-mono text-xs">
          <span className="text-indigo-400 font-bold">LOW: {stepData.low}</span>
          <span className="text-slate-700">|</span>
          <span className="text-amber-400 font-bold">
            MID: {stepData.mid} (val: {activeArray[stepData.mid] ?? '—'})
          </span>
          <span className="text-slate-700">|</span>
          <span className="text-indigo-400 font-bold">HIGH: {stepData.high}</span>
          <span className="text-slate-700">|</span>
          <span className="text-[var(--chalk-dim)]">Target: <strong className="text-[var(--chalk)]">{activeTarget}</strong></span>
        </div>
      </div>

      {/* Footer Explanation */}
      <div className="px-5 py-3 bg-[#0c0e16] border-t border-white/5 text-xs text-[var(--chalk-dim)] leading-relaxed font-sans">
        <span className="text-[var(--chalk-faint)] font-mono text-[11px] uppercase mr-2 font-bold">Analysis:</span>
        {stepData.explanation}
      </div>
    </div>
  );
}
