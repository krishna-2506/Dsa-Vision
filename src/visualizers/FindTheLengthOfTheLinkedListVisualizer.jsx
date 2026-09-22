import React, { useState } from 'react';

export const meta = {
  display_id: 'Q-088',
  title: "Count The Number Of Nodes Linked List",
  category: "4. Linked List",
  difficulty: "Medium",
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  description: "Given a singly linked list. The task is to find the length of the linked list, where length is defined as the number of nodes in the linked list."
};

// Realistic sample array representing the linked list values
const SAMPLE_DATA = [1, 2, 3, 4, 5];

export const steps = [
  {
    title: "1. Initialize State",
    codeLine: 2,
    code: "int cnt = 0; Node* curr = head;",
    explanation: "We initialize our counter `cnt` to 0. We also create a traversal pointer `curr` and point it to the `head` (the first node) of the linked list. This allows us to traverse without losing the reference to the start of the list.",
    currIdx: 0,
    cnt: 0,
    hudText: "cnt = 0, curr points to head"
  },
  {
    title: "2. Check Condition & Process Node 1",
    codeLine: 5,
    code: "cnt++; curr = curr->next;",
    explanation: "The while loop checks if `curr` is not NULL. Since it points to Node(1), we enter the loop. We increment `cnt` to 1, signifying we've counted one node, and then advance `curr` to the next node.",
    currIdx: 1,
    cnt: 1,
    hudText: "Counted Node 1, advanced curr"
  },
  {
    title: "3. Check Condition & Process Node 2",
    codeLine: 5,
    code: "cnt++; curr = curr->next;",
    explanation: "Again, `curr` is not NULL (points to Node(2)). We increment `cnt` to 2 and advance `curr` to the third node. The pointer gracefully 'hops' along the links.",
    currIdx: 2,
    cnt: 2,
    hudText: "Counted Node 2, advanced curr"
  },
  {
    title: "4. Check Condition & Process Node 3",
    codeLine: 5,
    code: "cnt++; curr = curr->next;",
    explanation: "`curr` points to Node(3). We count it by incrementing `cnt` to 3, then advance the `curr` pointer to the fourth node.",
    currIdx: 3,
    cnt: 3,
    hudText: "Counted Node 3, advanced curr"
  },
  {
    title: "5. Check Condition & Process Node 4",
    codeLine: 5,
    code: "cnt++; curr = curr->next;",
    explanation: "`curr` points to Node(4). We increment `cnt` to 4, then move `curr` to the fifth and final node.",
    currIdx: 4,
    cnt: 4,
    hudText: "Counted Node 4, advanced curr"
  },
  {
    title: "6. Check Condition & Process Node 5",
    codeLine: 5,
    code: "cnt++; curr = curr->next;",
    explanation: "`curr` points to Node(5). We increment `cnt` to 5. Notice that `curr->next` for the last node is NULL, so advancing `curr` now makes it point to NULL.",
    currIdx: 5, // 5 represents NULL
    cnt: 5,
    hudText: "Counted Node 5, curr becomes NULL"
  },
  {
    title: "7. Loop Termination",
    codeLine: 4,
    code: "while(curr) { ... }",
    explanation: "The condition `while(curr)` is evaluated. Since `curr` is now NULL, the condition evaluates to false. The traversal loop safely terminates without causing a segmentation fault.",
    currIdx: 5,
    cnt: 5,
    hudText: "curr is NULL. Loop terminates."
  },
  {
    title: "8. Return Result",
    codeLine: 8,
    code: "return cnt;",
    explanation: "The traversal is complete. We return `cnt`, which holds the exact number of nodes we visited (5). The time complexity is O(N) because we visited every node exactly once.",
    currIdx: 5,
    cnt: 5,
    hudText: "Final count returned: 5"
  }
];

export default function CountTheNumberOfNodesLinkedListVisualizer({ currentStep: externalStep, onStepChange }) {
  const [internalStep, setInternalStep] = useState(0);
  const stepIndex = externalStep !== undefined ? externalStep : internalStep;
  const setStep = onStepChange || setInternalStep;
  const stepData = steps[stepIndex] || steps[0];

  const handleNext = () => { if (stepIndex < steps.length - 1) setStep(stepIndex + 1); };
  const handlePrev = () => { if (stepIndex > 0) setStep(stepIndex - 1); };

  // Generate nodes array including the final NULL node
  const nodes = [...SAMPLE_DATA, 'NULL'];

  return (
    <div className="w-full flex flex-col bg-[#0b0d14] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
      {/* 1. Sub-Header Bar */}
      <div className="px-5 py-3 bg-[#0e111a] border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
            Step {stepIndex + 1} / {steps.length}
          </span>
          <h3 className="text-sm font-bold text-[var(--chalk)] font-mono">{stepData.title}</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={handlePrev} disabled={stepIndex === 0} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 disabled:opacity-30 text-[var(--chalk-dim)] text-xs font-mono rounded border border-white/5 transition">
            ← Prev
          </button>
          <button onClick={handleNext} disabled={stepIndex === steps.length - 1} className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-[var(--chalk)] text-xs font-mono font-medium rounded transition">
            Next →
          </button>
        </div>
      </div>

      {/* 2. Visualizer Canvas */}
      <div className="p-6 flex flex-col items-center justify-center bg-[#08090e]/60 min-h-[280px]">
        
        {/* Dynamic Variables Display */}
        <div className="flex gap-6 mb-12">
          <div className="flex flex-col items-center p-3 rounded-lg bg-[#0e111a] border border-white/10 min-w-[100px] shadow-lg">
            <span className="text-[10px] uppercase tracking-wider text-[var(--chalk-faint)] font-bold mb-1">cnt (Count)</span>
            <span className="text-3xl font-mono text-emerald-400 font-bold transition-all duration-300">{stepData.cnt}</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg bg-[#0e111a] border border-white/10 min-w-[100px] shadow-lg">
            <span className="text-[10px] uppercase tracking-wider text-[var(--chalk-faint)] font-bold mb-1">curr points to</span>
            <span className="text-3xl font-mono text-indigo-400 font-bold transition-all duration-300">
              {stepData.currIdx === nodes.length - 1 ? 'NULL' : SAMPLE_DATA[stepData.currIdx]}
            </span>
          </div>
        </div>

        {/* Custom Linked List View */}
        <div className="flex items-center justify-center flex-wrap gap-y-12">
          {nodes.map((val, idx) => {
            const isNull = idx === nodes.length - 1;
            const isCurrent = stepData.currIdx === idx;
            const isVisited = idx < stepData.cnt;

            return (
              <React.Fragment key={idx}>
                <div className="relative flex flex-col items-center">
                  {/* Pointer Label */}
                  <div className={`absolute -top-8 transition-all duration-300 ${isCurrent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                    <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-500/20 px-2 py-0.5 rounded border border-indigo-500/30">
                      curr
                    </span>
                    <div className="w-px h-3 bg-indigo-500/50 mx-auto mt-1"></div>
                  </div>

                  {/* Node Box */}
                  <div className={`w-14 h-14 flex items-center justify-center rounded-lg border-2 font-mono text-lg font-bold transition-all duration-200 relative z-10 ${
                    isCurrent ? 'border-indigo-500 bg-indigo-500/20 text-indigo-100' :
                    isNull ? 'border-white/10 bg-[#0e111a] text-[var(--chalk-faint)]' :
                    isVisited ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300' :
                    'border-white/20 bg-white/5 text-[var(--chalk-dim)]'
                  }`}>
                    {val}
                  </div>
                  
                  {/* Head/Tail Indicators */}
                  {!isNull && idx === 0 && (
                    <span className="absolute -bottom-6 text-[10px] font-mono text-[var(--chalk-faint)]">head</span>
                  )}
                  {!isNull && idx === SAMPLE_DATA.length - 1 && (
                    <span className="absolute -bottom-6 text-[10px] font-mono text-[var(--chalk-faint)]">tail</span>
                  )}
                </div>

                {/* Arrow connecting nodes */}
                {!isNull && (
                  <div className="px-2 z-0 relative">
                    <svg className={`w-6 h-6 transition-colors duration-300 ${isVisited ? 'text-emerald-500/50' : 'text-[var(--chalk)]/20'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
        
        {/* Code & Status HUD */}
        <div className="mt-12 flex items-center gap-3 px-4 py-2 rounded-lg bg-[#0e111a] border border-white/5 font-mono text-xs shadow-lg max-w-full overflow-hidden">
          <span className="text-[var(--chalk-faint)] flex-shrink-0">Exec:</span>
          <code className="text-rose-300 bg-rose-500/10 px-1.5 py-0.5 rounded truncate">{stepData.code}</code>
          <div className="w-px h-4 bg-white/10 mx-1 flex-shrink-0"></div>
          <span className="text-[var(--chalk-faint)] flex-shrink-0">Status:</span>
          <strong className="text-indigo-400 truncate">{stepData.hudText || 'Processing...'}</strong>
        </div>
      </div>

      {/* 4. Explanation Footer */}
      <div className="px-5 py-4 bg-[#0c0e16] border-t border-white/5 text-sm text-[var(--chalk-dim)] leading-relaxed font-sans min-h-[90px]">
        <span className="text-emerald-500/80 font-mono text-[11px] uppercase mr-2 font-bold tracking-widest">Explanation:</span>
        {stepData.explanation}
      </div>
    </div>
  );
}