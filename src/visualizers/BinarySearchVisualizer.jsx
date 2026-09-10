import React, { useState } from 'react';
import ArrayView from '../components/primitives/ArrayView';

export const meta = {
  leetcode_id: 704,
  title: 'Binary Search',
  category: 'Binary Search',
  difficulty: 'Easy',
  timeComplexity: 'O(log N)',
  spaceComplexity: 'O(1)',
  leetcodeUrl: 'https://leetcode.com/problems/binary-search/',
  description: 'Search for target 45 in sorted array by halving search space at each step.'
};

const ARRAY = [3, 8, 12, 17, 24, 31, 45, 59, 72, 88];
const TARGET = 45;

export const steps = [
  {
    title: "1. Search Space [0..9], Midpoint at Index 4 (val=24)",
    low: 0,
    high: 9,
    mid: 4,
    codeLine: 6, // "int mid = low + (high - low) / 2;"
    code: "int low = 0, high = 9;\nint mid = low + (high - low) / 2; // mid = 4, nums[mid] = 24",
    explanation: "Initial range spans entire array. Calculate mid = 4 (value 24). Comparing 24 with target 45.",
    status: 'comparing'
  },
  {
    title: "2. 24 < 45 ➔ Discard Left Half [0..4]",
    low: 5,
    high: 9,
    mid: 4,
    codeLine: 8, // "else if (nums[mid] < target) low = mid + 1;"
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
    code: "mid = 5 + (9 - 5) / 2; // mid = 7, nums[mid] = 59",
    explanation: "Recalculate mid in interval [5..9]. Mid is index 7 (value 59). Comparing 59 with target 45.",
    status: 'comparing'
  },
  {
    title: "4. 59 > 45 ➔ Discard Right Half [7..9]",
    low: 5,
    high: 6,
    mid: 7,
    codeLine: 9, // "else high = mid - 1;"
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
    code: "mid = 5 + (6 - 5) / 2; // mid = 5, nums[mid] = 31 < 45\nlow = mid + 1; // low becomes 6",
    explanation: "Mid is 5 (value 31). 31 < 45, so low slides to mid + 1 (index 6).",
    status: 'comparing'
  },
  {
    title: "6. Target Match Found at Index 6! (val=45)",
    low: 6,
    high: 6,
    mid: 6,
    codeLine: 7, // "if (nums[mid] == target) return mid;"
    code: "if (nums[mid] == target) {\n  return mid; // Found at index 6!\n}",
    explanation: "nums[6] == 45 == target! Target located in O(log N) operations with O(1) auxiliary space.",
    status: 'found'
  }
];

export default function BinarySearchVisualizer({ currentStep: externalStep, onStepChange }) {
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

      {/* Array Canvas with animated sliding pointers */}
      <div className="p-6 flex flex-col items-center justify-center bg-[#08090e]/60 min-h-[220px]">
        <ArrayView
          items={ARRAY}
          pointers={pointers}
          matchIndices={matchIndices}
          isDimmed={(idx) => idx < stepData.low || idx > stepData.high}
        />

        {/* Pointers State HUD */}
        <div className="mt-4 flex items-center gap-4 px-4 py-2 rounded-lg bg-[#0e111a] border border-white/5 font-mono text-xs">
          <span className="text-indigo-400 font-bold">LOW: {stepData.low}</span>
          <span className="text-slate-700">|</span>
          <span className="text-amber-400 font-bold">MID: {stepData.mid} (val: {ARRAY[stepData.mid]})</span>
          <span className="text-slate-700">|</span>
          <span className="text-indigo-400 font-bold">HIGH: {stepData.high}</span>
          <span className="text-slate-700">|</span>
          <span className="text-slate-400">Target: <strong className="text-white">{TARGET}</strong></span>
        </div>
      </div>

      {/* Footer Explanation */}
      <div className="px-5 py-3 bg-[#0c0e16] border-t border-white/5 text-xs text-slate-300 leading-relaxed font-sans">
        <span className="text-slate-500 font-mono text-[11px] uppercase mr-2 font-bold">Analysis:</span>
        {stepData.explanation}
      </div>
    </div>
  );
}
