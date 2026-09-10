import React, { useState } from 'react';
import ArrayView from '../components/primitives/ArrayView';

export const meta = {
  display_id: 'Q-002',
  title: "Second Largest Element In Array",
  category: "1. Arrays",
  difficulty: "Easy",
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  description: "Given an array Arr of size N, print second largest distinct element from an array.\r\n\r\nExample:\r\n\r\nInput:\r\nN = 6\r\nArr[] = {12, 35, 1, 10, 34, 1}\r\nOutput: 34"
};

// Realistic sample array for this problem (matching the problem description)
const SAMPLE_DATA = [12, 35, 1, 10, 34, 1];

export const steps = [
  {
    title: "1. Initialize State",
    codeLine: 3, 
    code: "int prev = -1, curr = arr[0];",
    explanation: "We initialize `curr` to the first element (12) to track the largest value seen so far, and `prev` to -1 to act as a placeholder for the second largest value. We will then iterate through the rest of the array starting from index 1.",
    pointers: [{ index: 0, label: 'curr (12)', color: 'emerald' }],
    highlightIndices: [0],
    hudText: "prev = -1 | curr = 12"
  },
  {
    title: "2. Process Index 1 (Value: 35)",
    codeLine: 8,
    code: "prev = curr; curr = arr[i];",
    explanation: "At index 1, the value is 35. Since 35 is strictly greater than our current maximum (`curr` = 12), we have found a new largest element! We must demote the old largest element to second largest by setting `prev` = 12, and then update `curr` to 35.",
    pointers: [{ index: 1, label: 'i', color: 'indigo' }],
    highlightIndices: [1],
    hudText: "prev = 12 | curr = 35"
  },
  {
    title: "3. Process Index 2 (Value: 1)",
    codeLine: 11,
    code: "else if (arr[i] > prev && arr[i] != curr)",
    explanation: "At index 2, the value is 1. We first check if 1 > `curr` (35). It is not. We then fall back to the `else if` to check if 1 is greater than `prev` (12) and strictly not equal to `curr` (to maintain distinctness). It fails both checks, so we do nothing.",
    pointers: [{ index: 2, label: 'i', color: 'indigo' }],
    highlightIndices: [2],
    hudText: "prev = 12 | curr = 35 (No change)"
  },
  {
    title: "4. Process Index 3 (Value: 10)",
    codeLine: 11,
    code: "else if (arr[i] > prev && arr[i] != curr)",
    explanation: "At index 3, the value is 10. 10 is neither greater than the largest value (`curr` = 35), nor is it greater than the second largest value (`prev` = 12). The state variables remain unchanged and we continue.",
    pointers: [{ index: 3, label: 'i', color: 'indigo' }],
    highlightIndices: [3],
    hudText: "prev = 12 | curr = 35 (No change)"
  },
  {
    title: "5. Process Index 4 (Value: 34)",
    codeLine: 12,
    code: "prev = arr[i];",
    explanation: "At index 4, the value is 34. 34 is not greater than `curr` (35), so it's not a new absolute maximum. However, it IS greater than our current `prev` (12) AND it is distinctly different from `curr` (35). This means we've found a new second largest element. We update `prev` to 34.",
    pointers: [{ index: 4, label: 'i', color: 'indigo' }],
    highlightIndices: [4],
    hudText: "prev = 34 | curr = 35"
  },
  {
    title: "6. Process Index 5 (Value: 1)",
    codeLine: 11,
    code: "else if (arr[i] > prev && arr[i] != curr)",
    explanation: "At index 5, the value is 1. Once again, 1 is too small. It is neither greater than 35 nor greater than 34. No updates are made.",
    pointers: [{ index: 5, label: 'i', color: 'indigo' }],
    highlightIndices: [5],
    hudText: "prev = 34 | curr = 35 (No change)"
  },
  {
    title: "7. Return Result",
    codeLine: 14,
    code: "return prev;",
    explanation: "The loop terminates as we have traversed the entire array. The variable `prev` now reliably holds the second largest distinct element in the array, which is 34. The function returns 34.",
    pointers: [],
    highlightIndices: [1, 4],
    hudText: "Result: 34"
  }
];

export default function SecondLargestElementInArrayVisualizer({ currentStep: externalStep, onStepChange }) {
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
        <div className="mt-5 flex items-center gap-3 px-4 py-2 rounded-lg bg-[#0e111a] border border-white/5 font-mono text-xs">
          <span>Status: <strong className="text-indigo-400">{stepData.hudText || 'Processing...'}</strong></span>
        </div>
      </div>

      {/* 4. Explanation Footer */}
      <div className="px-5 py-3 bg-[#0c0e16] border-t border-white/5 text-xs text-slate-300 leading-relaxed font-sans">
        <span className="text-slate-500 font-mono text-[11px] uppercase mr-2 font-bold">Explanation:</span>
        {stepData.explanation}
      </div>
    </div>
  );
}