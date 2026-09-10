import React, { useState } from 'react';

export const meta = {
  title: 'Merge Sort - Divide & Conquer',
  category: 'Sorting & Searching',
  difficulty: 'Medium',
  timeComplexity: 'O(N log N)',
  spaceComplexity: 'O(N)',
  description: 'Recursively divides array into two halves, sorts each half independently, and combines them via two-pointer merging.'
};

export const steps = [
  {
    title: "Initial Unsorted Array",
    stage: "divide",
    tree: [
      { id: 'root', items: [38, 27, 43, 3, 9, 82, 10], active: true, label: "Original Array" }
    ],
    code: "void mergeSort(int arr[], int l, int r) {\n  if (l >= r) return;\n  int m = l + (r - l) / 2;\n  mergeSort(arr, l, m);\n  mergeSort(arr, m + 1, r);\n  merge(arr, l, m, r);\n}",
    explanation: "Starting with 7 unsorted elements. We find the midpoint index to divide into left and right subarrays."
  },
  {
    title: "Divide into Two Halves",
    stage: "divide",
    tree: [
      { id: 'left', items: [38, 27, 43], active: true, label: "Left Subarray" },
      { id: 'right', items: [3, 9, 82, 10], active: true, label: "Right Subarray" }
    ],
    code: "int m = l + (r - l) / 2;\nmergeSort(arr, 0, 2); // [38, 27, 43]\nmergeSort(arr, 3, 6); // [3, 9, 82, 10]",
    explanation: "Left partition gets 3 elements [38, 27, 43]. Right partition gets 4 elements [3, 9, 82, 10]."
  },
  {
    title: "Atomic Decomposition (Base Case)",
    stage: "divide",
    tree: [
      { id: 'a1', items: [38], active: true, label: "Base" },
      { id: 'a2', items: [27, 43], active: true, label: "Sub" },
      { id: 'b1', items: [3, 9], active: true, label: "Sub" },
      { id: 'b2', items: [82, 10], active: true, label: "Sub" }
    ],
    code: "if (l >= r) return; // Base case: single element arrays are already sorted",
    explanation: "Subarrays with 1 element are trivially sorted. Now the conquering (merging) phase begins."
  },
  {
    title: "Merge Left Branch [27, 38, 43]",
    stage: "merge",
    tree: [
      { id: 'm-left', items: [27, 38, 43], active: true, label: "Sorted Left Half" },
      { id: 'm-right', items: [3, 9, 10, 82], active: false, label: "Right Half Pending" }
    ],
    code: "merge(arr, 0, 1, 2); // Merging [38] with [27, 43] -> [27, 38, 43]",
    explanation: "Comparing smallest elements: 27 comes first, then 38, then 43. Left half is now fully sorted!"
  },
  {
    title: "Merge Right Branch [3, 9, 10, 82]",
    stage: "merge",
    tree: [
      { id: 'm-left', items: [27, 38, 43], active: false, label: "Sorted Left Half" },
      { id: 'm-right', items: [3, 9, 10, 82], active: true, label: "Sorted Right Half" }
    ],
    code: "merge(arr, 3, 4, 6); // Merging [3, 9] with [10, 82] -> [3, 9, 10, 82]",
    explanation: "Right half is merged using two pointers: [3, 9, 10, 82] is now ordered."
  },
  {
    title: "Final Merge: Complete Sorted Array",
    stage: "complete",
    tree: [
      { id: 'final', items: [3, 9, 10, 27, 38, 43, 82], active: true, label: "Completely Sorted" }
    ],
    code: "merge(arr, 0, 2, 6); // Final merge into destination array\n// Result: [3, 9, 10, 27, 38, 43, 82]",
    explanation: "Final two-way merge takes O(N) time. The entire array is sorted! Total time complexity is O(N log N)."
  }
];

export default function MergeSortVisualizer({ currentStep: externalStep, onStepChange }) {
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

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full bg-slate-900/90 rounded-2xl border border-slate-700/60 shadow-2xl overflow-hidden backdrop-blur-xl">
        <div className="px-6 py-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-violet-500/20 text-violet-400 border border-violet-500/30">
                Phase {stepIndex + 1} of {steps.length}
              </span>
              <h3 className="text-lg font-bold text-white">{stepData.title}</h3>
            </div>
            <p className="text-slate-400 text-xs mt-0.5">Divide & Conquer Tree View</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={stepIndex === 0}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition"
            >
              ← Prev
            </button>
            <button
              onClick={handleNext}
              disabled={stepIndex === steps.length - 1}
              className="px-3 py-1.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white text-xs font-semibold rounded-lg shadow-lg shadow-violet-500/20 transition"
            >
              Next →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
          <div className="lg:col-span-5 p-6 bg-slate-950/40 flex flex-col gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Recursive Logic</span>
              <pre className="bg-slate-950 p-3.5 rounded-xl text-emerald-400 text-xs font-mono overflow-x-auto border border-slate-800 shadow-inner">
                {stepData.code}
              </pre>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">State Breakdown</h4>
              <p className="text-slate-300 text-xs leading-relaxed bg-slate-800/40 p-3 rounded-xl border border-slate-700/50">
                {stepData.explanation}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Current Phase:</span>
              <span className="uppercase px-2.5 py-1 rounded bg-violet-500/20 text-violet-300 font-bold">
                {stepData.stage}
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 p-8 flex flex-col items-center justify-center min-h-[360px] bg-slate-900/50">
            <div className="w-full flex flex-col items-center gap-6">
              {stepData.tree.map((block) => (
                <div key={block.id} className="flex flex-col items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-400">{block.label}</span>
                  <div className="flex items-center gap-2">
                    {block.items.map((num, i) => (
                      <div
                        key={i}
                        className={`w-11 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-sm shadow-md transition-all duration-300 ${
                          stepData.stage === 'complete'
                            ? 'bg-emerald-600 text-white ring-2 ring-emerald-400/40'
                            : block.active
                            ? 'bg-violet-600 text-white ring-2 ring-violet-400/40 scale-105'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
