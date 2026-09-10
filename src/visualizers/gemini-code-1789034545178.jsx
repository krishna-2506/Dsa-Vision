import React, { useState } from 'react';
import ArrayView from '../components/primitives/ArrayView';

export const meta = {
  display_id: 'Q-087',
  title: "Deleting Node In Linked List",
  category: "4. Linked List",
  difficulty: "Medium",
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  description: "Given a singly linked list and an integer x. Delete the x-th node from the singly linked list (1-based indexing)."
};

// Original sequence of values in the Linked List
const SAMPLE_DATA = [1, 5, 2, 9];

export const steps = [
  {
    title: "1. Initial Head Check (x = 3)",
    codeLine: 3,
    code: "if(x==1) return head->next;",
    explanation: "We want to delete the 3rd node (x = 3). We first check if the target is the head itself (x = 1). If it were, we would simply return `head->next`. Since x is 3, this condition is bypassed.",
    pointers: [],
    highlightIndices: [],
    hudText: "Target x = 3. Check x==1 is False.",
    linkedList: [
      { val: 1, label: 'head', active: false },
      { val: 5, label: '', active: false },
      { val: 2, label: 'target (x=3)', active: false, isTarget: true },
      { val: 9, label: '', active: false }
    ]
  },
  {
    title: "2. Initialize Pointer & Counter",
    codeLine: 6,
    code: "int cnt = 1; Node* curr = head;",
    explanation: "To reach the node strictly BEFORE our target, we initialize a counter `cnt` to 1, and point `curr` to the head of the list. We will traverse until `cnt` reaches `x - 1`.",
    pointers: [{ index: 0, label: 'curr', color: 'indigo' }],
    highlightIndices: [0],
    hudText: "cnt = 1, curr points to Node(1)",
    linkedList: [
      { val: 1, label: 'head / curr', active: true },
      { val: 5, label: '', active: false },
      { val: 2, label: 'target', active: false, isTarget: true },
      { val: 9, label: '', active: false }
    ]
  },
  {
    title: "3. Evaluate Traversal Condition",
    codeLine: 8,
    code: "while(cnt < x-1) // 1 < 2",
    explanation: "We need to stop at node `x - 1` (which is node 2). Currently `cnt` is 1 and `x - 1` is 2. Since 1 < 2 is True, we enter the while loop to move forward.",
    pointers: [{ index: 0, label: 'curr', color: 'indigo' }],
    highlightIndices: [0],
    hudText: "1 < 2 is True. Entering loop.",
    linkedList: [
      { val: 1, label: 'head / curr', active: true },
      { val: 5, label: '', active: false },
      { val: 2, label: 'target', active: false, isTarget: true },
      { val: 9, label: '', active: false }
    ]
  },
  {
    title: "4. Advance Pointer & Counter",
    codeLine: 9,
    code: "cnt++; curr = curr->next;",
    explanation: "Inside the loop, we advance `curr` to the next node and increment `cnt`. Now `curr` points to the 2nd node (val 5) and `cnt` becomes 2.",
    pointers: [{ index: 1, label: 'curr', color: 'indigo' }],
    highlightIndices: [1],
    hudText: "cnt = 2, curr moved to Node(5)",
    linkedList: [
      { val: 1, label: 'head', active: false },
      { val: 5, label: 'curr', active: true },
      { val: 2, label: 'target', active: false, isTarget: true },
      { val: 9, label: '', active: false }
    ]
  },
  {
    title: "5. Exit Traversal Loop",
    codeLine: 8,
    code: "while(cnt < x-1) // 2 < 2",
    explanation: "We check the condition again. Now `cnt` is 2 and `x - 1` is 2. Since 2 < 2 is False, the loop terminates. `curr` is now perfectly positioned exactly one node before the one we want to delete.",
    pointers: [{ index: 1, label: 'curr', color: 'indigo' }],
    highlightIndices: [1],
    hudText: "2 < 2 is False. Loop ends.",
    linkedList: [
      { val: 1, label: 'head', active: false },
      { val: 5, label: 'curr', active: true },
      { val: 2, label: 'curr->next (target)', active: false, isTarget: true },
      { val: 9, label: 'curr->next->next', active: false }
    ]
  },
  {
    title: "6. Bypass Target Node",
    codeLine: 12,
    code: "curr->next = curr->next->next;",
    explanation: "Crucial step: We update the `next` pointer of `curr` (Node 5) to skip over the target node and point directly to `curr->next->next` (Node 9). The target node (Node 2) is now unlinked from the list.",
    pointers: [{ index: 1, label: 'curr', color: 'indigo' }],
    highlightIndices: [1, 3],
    hudText: "Node(5) linked directly to Node(9)",
    linkedList: [
      { val: 1, label: 'head', active: false },
      { val: 5, label: 'curr', active: true },
      { val: 9, label: 'new curr->next', active: true }
    ],
    droppedNode: { val: 2, label: 'Unlinked / Garbage' }
  },
  {
    title: "7. Return Modified List",
    codeLine: 13,
    code: "return head;",
    explanation: "The deletion is structurally complete in memory. We return the original `head` pointer, which now leads to the successfully modified linked list [1 -> 5 -> 9].",
    pointers: [],
    highlightIndices: [0, 1, 3],
    hudText: "Execution finished. Return head.",
    linkedList: [
      { val: 1, label: 'head', active: false },
      { val: 5, label: '', active: false },
      { val: 9, label: '', active: false }
    ]
  }
];

export default function DeletingNodeInLinkedListVisualizer({ currentStep: externalStep, onStepChange }) {
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
      <div className="p-6 flex flex-col items-center justify-center bg-[#08090e]/60 min-h-[340px]">
        {/* Source Array View */}
        <div className="mb-2 text-xs font-mono text-slate-500 uppercase tracking-widest">Original Data Sequence</div>
        <ArrayView items={SAMPLE_DATA} pointers={stepData.pointers || []} matchIndices={stepData.highlightIndices || []} />
        
        {/* Custom Linked List Rendering Area */}
        <div className="mt-8 flex flex-col items-center w-full relative">
          <div className="mb-6 text-xs font-mono text-slate-500 uppercase tracking-widest">Linked List Memory State</div>
          
          <div className="flex items-center justify-center w-full overflow-visible min-h-[100px]">
            {stepData.linkedList && stepData.linkedList.map((node, i) => (
              <React.Fragment key={i}>
                <div className="relative flex flex-col items-center mx-1">
                  {node.label && (
                    <span className={`absolute -top-7 text-[10px] font-mono font-bold whitespace-nowrap transition-colors duration-300 ${node.label.includes('head') ? 'text-emerald-400' : node.isTarget ? 'text-rose-400' : 'text-indigo-300'}`}>
                      {node.label}
                    </span>
                  )}
                  <div className={`w-12 h-12 flex items-center justify-center rounded-lg border-2 transition-all duration-300 ${
                    node.active ? 'border-indigo-500 bg-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.3)] scale-110 z-10' : 
                    node.isTarget ? 'border-rose-500/80 bg-rose-500/10 shadow-[0_0_10px_rgba(244,63,94,0.2)]' : 
                    'border-white/20 bg-white/5'
                  } font-mono text-white text-lg`}>
                    {node.val}
                  </div>
                </div>
                
                {/* Connecting Arrows */}
                {i < stepData.linkedList.length - 1 && (
                  <div className="mx-2 flex items-center z-0">
                    <svg className={`w-8 h-8 transition-all duration-500 ${node.active && i === stepData.linkedList.length - 2 && stepIndex === 5 ? 'text-emerald-400' : 'text-slate-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Dropped / Unlinked Node Visualization */}
          {stepData.droppedNode && (
            <div className="absolute top-[110px] left-1/2 transform -translate-x-1/2 flex flex-col items-center transition-all duration-700 opacity-60 translate-y-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg border-2 border-rose-500/50 bg-rose-500/5 border-dashed font-mono text-rose-200/50 text-lg">
                {stepData.droppedNode.val}
              </div>
              <span className="mt-2 text-[10px] font-mono font-bold text-rose-500/70 whitespace-nowrap">
                {stepData.droppedNode.label}
              </span>
            </div>
          )}
        </div>

        <div className="mt-12 flex items-center gap-3 px-4 py-2 rounded-lg bg-[#0e111a] border border-white/5 font-mono text-xs w-full max-w-2xl">
          <span className="whitespace-nowrap text-slate-400">Code:</span> 
          <code className="text-emerald-400 px-2 py-1 bg-emerald-400/10 rounded flex-1 truncate">{stepData.code}</code>
          <div className="w-px h-4 bg-white/10 mx-1"></div>
          <span className="whitespace-nowrap text-slate-400">Status:</span> 
          <strong className="text-indigo-400 whitespace-nowrap truncate max-w-[200px]">{stepData.hudText || 'Processing...'}</strong>
        </div>
      </div>

      {/* 4. Explanation Footer */}
      <div className="px-5 py-4 bg-[#0c0e16] border-t border-white/5 text-sm text-slate-300 leading-relaxed font-sans shadow-inner min-h-[85px]">
        <span className="text-slate-500 font-mono text-[11px] uppercase mr-2 font-bold tracking-wider">Explanation:</span>
        {stepData.explanation}
      </div>
    </div>
  );
}