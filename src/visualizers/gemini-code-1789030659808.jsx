import React, { useState } from 'react';
import ArrayView from '../components/primitives/ArrayView';

export const meta = {
  display_id: 'Q-108',
  title: "Pair Sum In Dll",
  category: "4. Linked List",
  difficulty: "Medium",
  timeComplexity: "O(N), where N is the number of nodes in the doubly linked list.",
  spaceComplexity: "O(1).",
  description: "Given a sorted doubly linked list of positive distinct elements, the task is to find pairs in the doubly linked list whose sum is equal to a given value target.\r\n"
};

// Realistic sample data representing a sorted Doubly Linked List for this problem
const SAMPLE_DATA = [1, 2, 4, 5, 6, 8, 9];

export const steps = [
  {
    title: "1. Initialize Two Pointers",
    codeLine: 4,
    code: "Node* start = head; Node* end = head; while(end->next) end = end->next;",
    explanation: "Because the doubly linked list is already sorted, we can optimize our search using the Two-Pointer technique. We initialize our `start` pointer at the head of the list (smallest element) and traverse to place our `end` pointer at the tail (largest element).",
    pointers: [
      { index: 0, label: 'start', color: 'indigo' },
      { index: 6, label: 'end', color: 'indigo' }
    ],
    highlightIndices: [],
    hudText: "Target: 7 | start = 1, end = 9"
  },
  {
    title: "2. Calculate Sum (Too Large)",
    codeLine: 9,
    code: "int sum = start->data + end->data; // sum = 1 + 9 = 10",
    explanation: "We calculate the sum of the values at our two pointers. Here, 1 + 9 = 10. Since 10 is strictly greater than our target (7), we need a smaller sum. Because the list is sorted, moving the `start` pointer forward would only increase the sum. Therefore, we must move the `end` pointer backward.",
    pointers: [
      { index: 0, label: 'start', color: 'indigo' },
      { index: 6, label: 'end', color: 'rose' }
    ],
    highlightIndices: [],
    hudText: "Sum: 10 > Target (7) | Moving end pointer to previous node"
  },
  {
    title: "3. Move End Pointer",
    codeLine: 19,
    code: "else { end = end->prev; }",
    explanation: "The `end` pointer is moved to its previous node (from 9 to 8). We evaluate the new sum in the next iteration: 1 + 8 = 9. This is still greater than our target of 7. Thus, we will need to move the `end` pointer backward once more.",
    pointers: [
      { index: 0, label: 'start', color: 'indigo' },
      { index: 5, label: 'end', color: 'rose' }
    ],
    highlightIndices: [],
    hudText: "Sum: 9 > Target (7) | Moving end pointer again"
  },
  {
    title: "4. Found a Valid Pair",
    codeLine: 10,
    code: "if (sum == target) { ans.push_back({ start->data, end->data }); ... }",
    explanation: "The `end` pointer has moved to 6. Our new sum is 1 + 6 = 7. This matches our target exactly! We record the pair (1, 6) in our answer array. Since all elements are distinct and we've used these two, neither can be part of another valid pair. We must move both pointers inward.",
    pointers: [
      { index: 0, label: 'start', color: 'emerald' },
      { index: 4, label: 'end', color: 'emerald' }
    ],
    highlightIndices: [0, 4],
    hudText: "Sum: 7 == Target | Pair (1, 6) added to ans"
  },
  {
    title: "5. Advance Both Pointers",
    codeLine: 12,
    code: "start = start->next; end = end->prev;",
    explanation: "Following our match, `start` moves forward to 2, and `end` moves backward to 5. We immediately calculate the new sum: 2 + 5 = 7. This is another exact match! We add the pair (2, 5) to our answer array and prepare to shift both pointers inward again.",
    pointers: [
      { index: 1, label: 'start', color: 'emerald' },
      { index: 3, label: 'end', color: 'emerald' }
    ],
    highlightIndices: [1, 3],
    hudText: "Sum: 7 == Target | Pair (2, 5) added to ans"
  },
  {
    title: "6. Loop Termination Condition",
    codeLine: 8,
    code: "while (start->data < end->data)",
    explanation: "Both pointers move inward again. Now, both `start` and `end` point to the value 4. The `while` loop condition checks if `start->data < end->data`. Since 4 is not less than 4, the pointers have met/crossed, meaning we have evaluated all possible pairs. The loop terminates, and we return our recorded pairs.",
    pointers: [
      { index: 2, label: 'start/end', color: 'amber' }
    ],
    highlightIndices: [],
    hudText: "start.data >= end.data | Search complete. Returning ans."
  }
];

export default function PairSumInDllVisualizer({ currentStep: externalStep, onStepChange }) {
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
        <div className="mt-5 flex flex-col gap-2 w-full max-w-lg">
          <div className="flex items-center justify-center gap-3 px-4 py-2 rounded-lg bg-[#0e111a] border border-white/5 font-mono text-xs text-center">
            <span className="text-slate-400">Status: <strong className="text-indigo-400">{stepData.hudText || 'Processing...'}</strong></span>
          </div>
          <div className="flex items-center justify-center gap-3 px-4 py-2 rounded-lg bg-[#0e111a] border border-white/5 font-mono text-xs text-center">
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