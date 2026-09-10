import React, { useState } from 'react';
import ArrayView from '../components/primitives/ArrayView';

export const meta = {
  display_id: 'Q-086',
  title: "Inserting Node To Linked List",
  category: "4. Linked List",
  difficulty: "Medium",
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  description: "Create a link list of size N according to the given input literals. Each integer input is accompanied by an indicator which can either be 0 (insert at beginning) or 1 (insert at end)."
};

// Realistic sample array representing pairs of [value, indicator]
// Format: "Value (Indicator)". Indicator 0 = Begin, 1 = End.
const SAMPLE_DATA = ['9 (0)', '5 (1)', '6 (1)', '2 (0)'];

export const steps = [
  {
    title: "1. Empty List - Insert 9 at Beginning (0)",
    codeLine: 2,
    code: "if(head==NULL) return new Node(x);",
    explanation: "We read our first input pair (9, 0). The indicator 0 means 'insert at beginning'. Since our linked list is currently completely empty (head is NULL), creating a new node and setting it as the head is all that's required.",
    pointers: [{ index: 0, label: 'curr input', color: 'emerald' }],
    highlightIndices: [0],
    hudText: "Head is NULL. Created and returned Node(9).",
    linkedList: [{ val: 9, label: 'head', processing: true }],
    detached: false
  },
  {
    title: "2. Read Input - Insert 5 at End (1)",
    codeLine: 12,
    code: "Node* curr = head;",
    explanation: "Reading (5, 1). The indicator 1 tells us to insert at the end. To do this without losing our list, we initialize a temporary traversal pointer called `curr` starting at the `head`.",
    pointers: [{ index: 1, label: 'curr input', color: 'indigo' }],
    highlightIndices: [1],
    hudText: "Indicator 1. Set curr = head to traverse.",
    linkedList: [{ val: 9, label: 'head / curr', processing: false }],
    detached: false
  },
  {
    title: "3. Found End - Link Node(5)",
    codeLine: 16,
    code: "curr->next = new Node(x);",
    explanation: "The `while(curr->next)` loop checks if there is a next node. For node 9, `next` is NULL, so the loop terminates immediately. We are at the end! We dynamically allocate a new Node(5) and link it to `curr->next`.",
    pointers: [{ index: 1, label: 'curr input', color: 'indigo' }],
    highlightIndices: [1],
    hudText: "curr->next was NULL. Linked 9 -> 5.",
    linkedList: [
      { val: 9, label: 'head / curr', processing: false }, 
      { val: 5, label: 'new Node', processing: true }
    ],
    detached: false
  },
  {
    title: "4. Read Input - Insert 6 at End (1)",
    codeLine: 12,
    code: "Node* curr = head;",
    explanation: "Reading (6, 1). Again, indicator 1 means insert at the end. We must restart our traversal from the beginning, so we reset `curr` to point to `head` (which holds 9).",
    pointers: [{ index: 2, label: 'curr input', color: 'indigo' }],
    highlightIndices: [2],
    hudText: "Indicator 1. Reset curr = head.",
    linkedList: [
      { val: 9, label: 'head / curr', processing: false }, 
      { val: 5, label: '', processing: false }
    ],
    detached: false
  },
  {
    title: "5. Traverse List (Step Forward)",
    codeLine: 14,
    code: "curr = curr->next;",
    explanation: "The `while(curr->next)` loop checks if the current node has a successor. Node 9 has a successor (Node 5), so the condition is true. We advance `curr` to the next node to continue our search for the tail.",
    pointers: [{ index: 2, label: 'curr input', color: 'indigo' }],
    highlightIndices: [2],
    hudText: "Traversed forward to node 5.",
    linkedList: [
      { val: 9, label: 'head', processing: false }, 
      { val: 5, label: 'curr', processing: false }
    ],
    detached: false
  },
  {
    title: "6. Found End - Link Node(6)",
    codeLine: 16,
    code: "curr->next = new Node(x);",
    explanation: "Now `curr` is at Node 5. `curr->next` is NULL, so the loop exits. We create our new Node(6) and assign it to `curr->next`, successfully appending it to the list.",
    pointers: [{ index: 2, label: 'curr input', color: 'indigo' }],
    highlightIndices: [2],
    hudText: "curr->next was NULL. Linked 5 -> 6.",
    linkedList: [
      { val: 9, label: 'head', processing: false }, 
      { val: 5, label: 'curr', processing: false },
      { val: 6, label: 'new Node', processing: true }
    ],
    detached: false
  },
  {
    title: "7. Read Input - Insert 2 at Beginning (0)",
    codeLine: 4,
    code: "Node* temp = new Node(x);",
    explanation: "Reading (2, 0). Indicator 0 means insert at the beginning. We do NOT need to traverse. We simply allocate a new node `temp` with value 2 in memory. It is currently detached from the rest of the list.",
    pointers: [{ index: 3, label: 'curr input', color: 'emerald' }],
    highlightIndices: [3],
    hudText: "Indicator 0. Created isolated temp Node(2).",
    linkedList: [
      { val: 2, label: 'temp', processing: true }, 
      { val: 9, label: 'head', processing: false }, 
      { val: 5, label: '', processing: false },
      { val: 6, label: '', processing: false }
    ],
    detached: true // Indicates we shouldn't draw a solid line between index 0 and 1 yet
  },
  {
    title: "8. Link New Head & Complete",
    codeLine: 5,
    code: "temp->next = head; return temp;",
    explanation: "We set the `next` pointer of our new `temp` node to point to the current `head` (node 9). Finally, we return `temp` so it becomes the official new `head` of our linked list structure.",
    pointers: [{ index: 3, label: 'curr input', color: 'emerald' }],
    highlightIndices: [3],
    hudText: "Linked 2 -> 9. Updated head pointer.",
    linkedList: [
      { val: 2, label: 'head (was temp)', processing: false }, 
      { val: 9, label: '', processing: false }, 
      { val: 5, label: '', processing: false },
      { val: 6, label: '', processing: false }
    ],
    detached: false
  }
];

export default function InsertingNodeToLinkedListVisualizer({ currentStep: externalStep, onStepChange }) {
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
      <div className="p-6 flex flex-col items-center justify-center bg-[#08090e]/60 min-h-[300px]">
        
        {/* Source Array View */}
        <div className="mb-2 text-xs font-mono text-slate-500 uppercase tracking-widest">Input Stream: Value (Indicator)</div>
        <ArrayView items={SAMPLE_DATA} pointers={stepData.pointers || []} matchIndices={stepData.highlightIndices || []} />
        
        {/* Custom Linked List Rendering Area */}
        <div className="mt-10 flex flex-col items-center w-full">
          <div className="mb-6 text-xs font-mono text-slate-500 uppercase tracking-widest">Constructed Linked List</div>
          <div className="flex items-center justify-center w-full overflow-x-auto min-h-[80px]">
            {stepData.linkedList && stepData.linkedList.map((node, i) => (
              <React.Fragment key={i}>
                <div className="relative flex flex-col items-center mx-1">
                  {node.label && (
                    <span className={`absolute -top-7 text-[10px] font-mono font-bold whitespace-nowrap transition-colors duration-300 ${node.label.includes('head') ? 'text-emerald-400' : 'text-indigo-300'}`}>
                      {node.label}
                    </span>
                  )}
                  <div className={`w-12 h-12 flex items-center justify-center rounded-lg border-2 transition-all duration-300 ${node.processing ? 'border-amber-500/80 bg-amber-500/20 scale-110 shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'border-indigo-500/50 bg-indigo-500/10 shadow-lg'} font-mono text-white text-lg`}>
                    {node.val}
                  </div>
                </div>
                
                {/* Connecting Arrows */}
                {i < stepData.linkedList.length - 1 && (
                  <div className="mx-1 flex items-center">
                    {stepData.detached && i === 0 ? (
                      // Dashed broken arrow to represent an unlinked node waiting to attach
                      <svg className="w-8 h-8 text-amber-500/50 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} strokeDasharray="3 3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    ) : (
                      // Standard solid link arrow
                      <svg className={`w-8 h-8 transition-all duration-300 ${stepData.linkedList[i+1].processing ? 'text-amber-400' : 'text-indigo-400/70'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    )}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="mt-10 flex items-center gap-3 px-4 py-2 rounded-lg bg-[#0e111a] border border-white/5 font-mono text-xs w-full max-w-2xl">
          <span className="whitespace-nowrap text-slate-400">Code:</span> 
          <code className="text-rose-400 px-2 py-1 bg-rose-400/10 rounded flex-1 truncate">{stepData.code}</code>
          <div className="w-px h-4 bg-white/10 mx-1"></div>
          <span className="whitespace-nowrap text-slate-400">Status:</span> 
          <strong className="text-indigo-400 whitespace-nowrap truncate max-w-[200px]">{stepData.hudText || 'Processing...'}</strong>
        </div>
      </div>

      {/* 4. Explanation Footer */}
      <div className="px-5 py-4 bg-[#0c0e16] border-t border-white/5 text-sm text-slate-300 leading-relaxed font-sans shadow-inner min-h-[80px]">
        <span className="text-slate-500 font-mono text-[11px] uppercase mr-2 font-bold tracking-wider">Explanation:</span>
        {stepData.explanation}
      </div>
    </div>
  );
}