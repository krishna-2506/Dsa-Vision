import React, { useState } from 'react';
import ArrayView from '../components/primitives/ArrayView';

export const meta = {
  display_id: 'Q-010',
  title: "Missing Number",
  category: "1. Arrays",
  difficulty: "Easy",
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  description: "Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.\r\n"
};

// Realistic sample array for this problem (n=3, missing=2)
const SAMPLE_DATA = [3, 0, 1];

export const steps = [
  {
    title: "1. Determine Range (n)",
    codeLine: 3,
    code: "int n = nums.size();",
    explanation: "The algorithm begins by determining the size of the input array using nums.size(). In this specific example, the array contains 3 elements, which establishes that n = 3. This crucial first step dictates that our array is expected to hold a sequence of distinct integers ranging precisely from 0 up to 3. Any deviation means a number is missing.",
    pointers: [],
    highlightIndices: [],
    hudText: "n = 3 | actual_sum = 0"
  },
  {
    title: "2. Calculate Optimum Sum",
    codeLine: 4,
    code: "long long optimum_sum = (n * (n + 1)) / 2;",
    explanation: "Next, we calculate the 'optimum sum'—the total sum if absolutely no numbers were missing from the sequence 0 to n. This leverages the mathematical formula for the sum of the first N natural numbers: (n * (n + 1)) / 2. By plugging in our n value of 3, the operation evaluates to (3 * 4) / 2, resulting in an optimum sum of 6. This acts as our theoretical baseline.",
    pointers: [],
    highlightIndices: [],
    hudText: "optimum_sum = 6 | actual_sum = 0"
  },
  {
    title: "3. Accumulate Actual Sum (Index 0)",
    codeLine: 8,
    code: "actual_sum += it; // it = 3",
    explanation: "We initiate a linear scan through the given array to tally the 'actual sum' of the elements currently present. The iteration points to the first element at index 0, which holds the value 3. We take this value and add it to our running actual_sum variable. Consequently, actual_sum updates from 0 to 3.",
    pointers: [{ index: 0, label: 'it', color: 'indigo' }],
    highlightIndices: [0],
    hudText: "optimum_sum = 6 | actual_sum = 0 + 3 = 3"
  },
  {
    title: "4. Accumulate Actual Sum (Index 1)",
    codeLine: 8,
    code: "actual_sum += it; // it = 0",
    explanation: "The loop progresses to the next element at index 1, where it encounters the value 0. We continuously update our actual_sum by adding this new value. Adding 0 to our existing total of 3 leaves the actual_sum unchanged at 3. This step emphasizes that the presence of 0 seamlessly integrates into our cumulative addition strategy without inflating the total.",
    pointers: [{ index: 1, label: 'it', color: 'indigo' }],
    highlightIndices: [1],
    hudText: "optimum_sum = 6 | actual_sum = 3 + 0 = 3"
  },
  {
    title: "5. Accumulate Actual Sum (Index 2)",
    codeLine: 8,
    code: "actual_sum += it; // it = 1",
    explanation: "Our loop pointer reaches the final element of the array at index 2, which contains the value 1. This value is added to our ongoing actual_sum (currently 3). The new actual_sum evaluates to 4. Having successfully traversed the entire array, we have now accurately aggregated the sum of all existing elements.",
    pointers: [{ index: 2, label: 'it', color: 'indigo' }],
    highlightIndices: [2],
    hudText: "optimum_sum = 6 | actual_sum = 3 + 1 = 4"
  },
  {
    title: "6. Compute and Return Missing Number",
    codeLine: 10,
    code: "return optimum_sum - actual_sum;",
    explanation: "In the final step of the algorithm, we isolate the missing number by comparing our theoretical baseline against our practical result. We subtract the actual_sum (4) from the optimum_sum (6). The mathematical difference perfectly represents the value that was omitted from the sequence. The algorithm successfully concludes and returns 2.",
    pointers: [],
    highlightIndices: [0, 1, 2],
    hudText: "Result: 6 - 4 = 2 (Missing Number)"
  }
];

export default function MissingNumberVisualizer({ currentStep: externalStep, onStepChange }) {
  const [internalStep, setInternalStep] = useState(0);
  const stepIndex = externalStep !== undefined ? externalStep : internalStep;
  const setStep = onStepChange || setInternalStep;
  const stepData = steps[stepIndex] || steps[0];

  const handleNext = () => { if (stepIndex < steps.length - 1) setStep(stepIndex + 1); };
  const handlePrev = () => { if (stepIndex > 0) setStep(stepIndex - 1); };

  return (
    <div className="w-full flex flex-col bg-[#0b0d14] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
      {/* 1. Sub-Header Bar */}
      <div className="px-5 py-3 bg-[#0e111a] border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
            Step {stepIndex + 1} / {steps.length}
          </span>
          <h3 className="text-sm font-bold text-white font-mono">{stepData.title}</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={handlePrev} disabled={stepIndex === 0} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 disabled:opacity-30 text-slate-300 text-xs font-mono rounded border border-white/5 transition">
            ← Prev
          </button>
          <button onClick={handleNext} disabled={stepIndex === steps.length - 1} className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-white text-xs font-mono font-medium rounded transition">
            Next →
          </button>
        </div>
      </div>

      {/* 2. Visualizer Canvas */}
      <div className="p-6 flex flex-col items-center justify-center bg-[#08090e]/60 min-h-[220px]">
        <ArrayView
          items={SAMPLE_DATA}
          pointers={stepData.pointers || []}
          matchIndices={stepData.highlightIndices || []}
        />

        {/* 3. Real-Time HUD */}
        <div className="mt-5 flex flex-col gap-2 w-full max-w-md">
          <div className="flex items-center justify-center gap-3 px-4 py-2 rounded-lg bg-[#0e111a] border border-white/5 font-mono text-xs">
            <span className="text-slate-400">Status: <strong className="text-indigo-400">{stepData.hudText || 'Processing...'}</strong></span>
          </div>
          <div className="flex items-center justify-center gap-3 px-4 py-2 rounded-lg bg-[#0e111a] border border-white/5 font-mono text-xs">
            <span className="text-slate-400">Executing: <strong className="text-emerald-400">{stepData.code}</strong></span>
          </div>
        </div>
      </div>

      {/* 4. Explanation Footer */}
      <div className="px-5 py-4 bg-[#0c0e16] border-t border-white/5 text-sm text-slate-300 leading-relaxed font-sans">
        <span className="text-slate-500 font-mono text-[11px] uppercase mr-2 font-bold tracking-wider">Explanation:</span>
        {stepData.explanation}
      </div>
    </div>
  );
}