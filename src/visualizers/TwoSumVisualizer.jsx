import React, { useState } from 'react';
import ArrayView from '../components/primitives/ArrayView';

export const meta = {
  leetcode_id: 167,
  title: 'Two Sum II - Input Array Is Sorted',
  category: 'Arrays & Two Pointers',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  leetcodeUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
  description: 'Find two numbers in a sorted array that sum up to target using two converging pointers.'
};

const ARRAY = [2, 7, 11, 15, 19, 23];
const TARGET = 26;

export const steps = [
  {
    title: "1. Initialize Left & Right Pointers",
    left: 0,
    right: 5,
    codeLine: 4, // "int left = 0, right = numbers.size() - 1;"
    code: "// Initialize pointers at opposite array boundaries\nint left = 0, right = numbers.size() - 1;\nint target = 26;",
    explanation: "Left pointer starts at index 0 (val=2), right pointer starts at index 5 (val=23). Target sum = 26.",
    currentSum: 25,
    status: 'less'
  },
  {
    title: "2. Compute Sum: 2 + 23 = 25 (< 26)",
    left: 0,
    right: 5,
    codeLine: 9, // "else if (sum < target) left++;"
    code: "int sum = numbers[left] + numbers[right]; // 2 + 23 = 25\nif (sum < target) left++; // Need larger sum",
    explanation: "Sum 25 is strictly less than target 26. Since the array is sorted, increment left pointer to increase our sum.",
    currentSum: 25,
    status: 'less'
  },
  {
    title: "3. Shift Left Pointer: index 0 ➔ 1",
    left: 1,
    right: 5,
    codeLine: 10, // "left++;"
    code: "// Left pointer slides right to index 1 (val = 7)\nleft++;",
    explanation: "Left pointer slides to index 1. New pair under evaluation is numbers[1] (7) and numbers[5] (23).",
    currentSum: 30,
    status: 'calc'
  },
  {
    title: "4. Compute Sum: 7 + 23 = 30 (> 26)",
    left: 1,
    right: 5,
    codeLine: 11, // "else right--;"
    code: "int sum = numbers[left] + numbers[right]; // 7 + 23 = 30\nif (sum > target) right--; // Need smaller sum",
    explanation: "Sum 30 exceeds target 26. Decrement right pointer to reduce our total sum.",
    currentSum: 30,
    status: 'greater'
  },
  {
    title: "5. Shift Right Pointer: index 5 ➔ 4",
    left: 1,
    right: 4,
    codeLine: 12, // "right--;"
    code: "// Right pointer slides left to index 4 (val = 19)\nright--;",
    explanation: "Right pointer slides to index 4. Next evaluation pair: numbers[1] (7) and numbers[4] (19).",
    currentSum: 26,
    status: 'calc'
  },
  {
    title: "6. Target Match Found! 7 + 19 == 26",
    left: 1,
    right: 4,
    codeLine: 8, // "return {left + 1, right + 1};"
    code: "if (sum == target) return { left + 1, right + 1 }; // Return [2, 5]",
    explanation: "Match confirmed! numbers[1] (7) + numbers[4] (19) equals 26. Completed in O(N) time with O(1) space.",
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
      {/* Visualizer Top Bar */}
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

      {/* Array Animation Canvas with Fluid Sliding Pointers */}
      <div className="p-6 flex flex-col items-center justify-center bg-[#08090e]/60 min-h-[220px]">
        <ArrayView
          items={ARRAY}
          pointers={pointers}
          matchIndices={matchIndices}
        />

        {/* Real-time Comparison HUD */}
        <div className="mt-4 flex items-center gap-4 px-4 py-2 rounded-lg bg-[#0e111a] border border-white/5 font-mono text-xs">
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
            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${
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

      {/* Step Explanation Footer */}
      <div className="px-5 py-3 bg-[#0c0e16] border-t border-white/5 text-xs text-slate-300 leading-relaxed font-sans">
        <span className="text-slate-500 font-mono text-[11px] uppercase mr-2 font-bold">Explanation:</span>
        {stepData.explanation}
      </div>
    </div>
  );
}
