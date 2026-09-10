import React, { useState } from 'react';
import ArrayView from '../components/primitives/ArrayView';

export const meta = {
  display_id: 'Q-085',
  title: "Intro To Linked List",
  category: "4. Linked List",
  difficulty: "Medium",
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",
  description: "Construct the linked list from arr and return the head of the linked list.\r\n\r\nExample 1:\r\n\r\nInput:\r\nn = 5\r\narr = [1,2,3,4,5]\r\nOutput:\r\n1 2 3 4 5"
};

// Realistic sample array for this problem matching Example 1
const SAMPLE_DATA = [1, 2, 3, 4, 5];

export const steps = [
  {
    title: "1. Create Head Node",
    codeLine: 2, 
    code: "Node* head = new Node(arr[0]);",
    explanation: "We begin by allocating memory for the very first node of our linked list, known as the 'head'. We initialize its data payload using the first element of the array (arr[0], which is 1). This head node serves as the permanent anchor and entry point for our entire linked list.",
    pointers: [{ index: 0, label: 'head', color: 'emerald' }],
    highlightIndices: [0],
    hudText: "List: 1 -> null"
  },
  {
    title: "2. Initialize Current Pointer",
    codeLine: 3, 
    code: "Node* curr = head;",
    explanation: "To dynamically build the rest of the list without losing our 'head' reference, we create a traversal pointer called 'curr' (current). We point it to the head node. We will use 'curr' to traverse the list and attach new nodes to the tail as we iterate through the array.",
    pointers: [{ index: 0, label: 'head, curr', color: 'emerald' }],
    highlightIndices: [0],
    hudText: "curr positioned at node(1)"
  },
  {
    title: "3. Process Index 1",
    codeLine: 5, 
    code: "curr->next = new Node(arr[i]); curr = curr->next;",
    explanation: "Entering the loop at index i=1, the array value is 2. We dynamically allocate a new node with this value. We then set the 'next' pointer of our current node (which holds 1) to point to this new node. Finally, we advance the 'curr' pointer forward to the newly appended node.",
    pointers: [{ index: 1, label: 'i / curr', color: 'indigo' }],
    highlightIndices: [0, 1],
    hudText: "List: 1 -> 2 -> null"
  },
  {
    title: "4. Process Index 2",
    codeLine: 5, 
    code: "curr->next = new Node(arr[i]); curr = curr->next;",
    explanation: "At index i=2, the array value is 3. We repeat the identical operation: allocate a new node for 3, link the 'next' of the previous tail (currently 2) to this new node, and advance the 'curr' pointer so it rests on node 3, ready for the next iteration.",
    pointers: [{ index: 2, label: 'i / curr', color: 'indigo' }],
    highlightIndices: [0, 1, 2],
    hudText: "List: 1 -> 2 -> 3 -> null"
  },
  {
    title: "5. Process Index 3",
    codeLine: 5, 
    code: "curr->next = new Node(arr[i]); curr = curr->next;",
    explanation: "At index i=3, we read the value 4. We allocate a new node for 4, link the previous tail (3) to it, and advance the 'curr' pointer forward.",
    pointers: [{ index: 3, label: 'i / curr', color: 'indigo' }],
    highlightIndices: [0, 1, 2, 3],
    hudText: "List: 1 -> 2 -> 3 -> 4 -> null"
  },
  {
    title: "6. Process Index 4 (Last Element)",
    codeLine: 5, 
    code: "curr->next = new Node(arr[i]); curr = curr->next;",
    explanation: "Finally, at index i=4, we reach the last element: 5. We create the final node, link it to the chain, and advance 'curr'. The loop condition (i < arr.size()) will fail on the next check, ending our traversal.",
    pointers: [{ index: 4, label: 'i / curr', color: 'indigo' }],
    highlightIndices: [0, 1, 2, 3, 4],
    hudText: "List: 1 -> 2 -> 3 -> 4 -> 5 -> null"
  },
  {
    title: "7. Return Head",
    codeLine: 8, 
    code: "return head;",
    explanation: "The entire array has been traversed and sequentially mapped into a chain of linked nodes. The 'head' pointer has remained safely at the beginning of the sequence. We return 'head' to yield the completely constructed linked list.",
    pointers: [{ index: 0, label: 'head', color: 'emerald' }],
    highlightIndices: [0, 1, 2, 3, 4],
    hudText: "Result: 1 -> 2 -> 3 -> 4 -> 5 -> null"
  }
];

export default function IntroToLinkedListVisualizer({ currentStep: externalStep, onStepChange }) {
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