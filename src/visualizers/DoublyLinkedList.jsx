import React, { useState } from 'react';

export const meta = {
  title: 'Doubly Linked List Construction & Reverse',
  category: 'Linked Lists',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Step-by-step memory pointer execution of creating and prepending nodes to a Doubly Linked List from an array.'
};

export const steps = [
  {
    title: "Initialization",
    codeLine: 12,
    code: "Node *head = NULL;\nint arr[5] = {1, 2, 3, 4, 5};",
    explanation: "The 'head' pointer is created on the Stack pointing to NULL. The input array is loaded into memory.",
    nodes: [],
    headPointer: null,
    tempPointer: null,
    i: null,
    stackState: { head: 'NULL', arr: '[1, 2, 3, 4, 5]', i: '-' }
  },
  {
    title: "Iteration i=0 (First Node)",
    codeLine: 16,
    code: "if (!head) {\n  head = new Node(arr[0]);\n}",
    explanation: "Because head is NULL, we allocate the first Node (val=1) in Heap memory at address 0xA1. 'head' now points to 0xA1.",
    nodes: [{ id: '0xA1', val: 1, next: null, prev: null }],
    headPointer: 0,
    tempPointer: null,
    i: 0,
    stackState: { head: '0xA1', arr: '[1, 2, 3, 4, 5]', i: '0' }
  },
  {
    title: "Iteration i=1 (Allocate Temp)",
    codeLine: 14,
    code: "Node *temp = new Node(arr[1]);",
    explanation: "i is 1. Head is NOT NULL. We allocate a new Node (val=2) at address 0xB2 on Heap. Pointer 'temp' points to it.",
    nodes: [
      { id: '0xB2', val: 2, next: null, prev: null, isTemp: true },
      { id: '0xA1', val: 1, next: null, prev: null }
    ],
    headPointer: 1,
    tempPointer: 0,
    i: 1,
    stackState: { head: '0xA1', temp: '0xB2', i: '1' }
  },
  {
    title: "Iteration i=1 (Link Forward)",
    codeLine: 18,
    code: "temp->next = head;",
    explanation: "We set temp->next to point to the current head (Node 0xA1). Notice the forward link is now active.",
    nodes: [
      { id: '0xB2', val: 2, next: '0xA1', prev: null, isTemp: true },
      { id: '0xA1', val: 1, next: null, prev: null }
    ],
    headPointer: 1,
    tempPointer: 0,
    i: 1,
    stackState: { head: '0xA1', temp: '0xB2', 'temp->next': '0xA1' }
  },
  {
    title: "Iteration i=1 (Link Backward)",
    codeLine: 19,
    code: "head->prev = temp;",
    explanation: "We set head->prev to point back to temp (Node 0xB2). The bidirectional link between Node 2 and Node 1 is complete!",
    nodes: [
      { id: '0xB2', val: 2, next: '0xA1', prev: null, isTemp: true },
      { id: '0xA1', val: 1, next: null, prev: '0xB2' }
    ],
    headPointer: 1,
    tempPointer: 0,
    i: 1,
    stackState: { head: '0xA1', temp: '0xB2', 'head->prev': '0xB2' }
  },
  {
    title: "Iteration i=1 (Shift Head)",
    code: "head = temp;",
    explanation: "Finally, we shift 'head' pointer to point to our new node (0xB2). It is now the official head of the doubly linked list.",
    nodes: [
      { id: '0xB2', val: 2, next: '0xA1', prev: null },
      { id: '0xA1', val: 1, next: null, prev: '0xB2' }
    ],
    headPointer: 0,
    tempPointer: null,
    i: 1,
    stackState: { head: '0xB2', temp: 'NULL (out of scope)', i: '1' }
  },
  {
    title: "Iteration i=2 (Node 3 Linked)",
    code: "temp = new Node(arr[2]);\ntemp->next = head;\nhead->prev = temp;\nhead = temp;",
    explanation: "Repeating the cycle for arr[2]=3: Heap node 0xC3 is created, linked bidirectionally to 0xB2, and head shifts to 0xC3.",
    nodes: [
      { id: '0xC3', val: 3, next: '0xB2', prev: null },
      { id: '0xB2', val: 2, next: '0xA1', prev: '0xC3' },
      { id: '0xA1', val: 1, next: null, prev: '0xB2' }
    ],
    headPointer: 0,
    tempPointer: null,
    i: 2,
    stackState: { head: '0xC3', i: '2' }
  },
  {
    title: "Iteration i=3 (Node 4 Linked)",
    code: "// Prepend arr[3] = 4\nhead = temp;",
    explanation: "Node 0xD4 (val=4) is prepended. Head shifts to 0xD4.",
    nodes: [
      { id: '0xD4', val: 4, next: '0xC3', prev: null },
      { id: '0xC3', val: 3, next: '0xB2', prev: '0xD4' },
      { id: '0xB2', val: 2, next: '0xA1', prev: '0xC3' },
      { id: '0xA1', val: 1, next: null, prev: '0xB2' }
    ],
    headPointer: 0,
    tempPointer: null,
    i: 3,
    stackState: { head: '0xD4', i: '3' }
  },
  {
    title: "Iteration i=4 (Final Node 5 Linked)",
    code: "// Prepend arr[4] = 5\nhead = temp;",
    explanation: "Node 0xE5 (val=5) is prepended. The loop finishes as all 5 elements from the array have been processed.",
    nodes: [
      { id: '0xE5', val: 5, next: '0xD4', prev: null },
      { id: '0xD4', val: 4, next: '0xC3', prev: '0xE5' },
      { id: '0xC3', val: 3, next: '0xB2', prev: '0xD4' },
      { id: '0xB2', val: 2, next: '0xA1', prev: '0xC3' },
      { id: '0xA1', val: 1, next: null, prev: '0xB2' }
    ],
    headPointer: 0,
    tempPointer: null,
    i: 4,
    stackState: { head: '0xE5', i: '4' }
  },
  {
    title: "Traversal / Print Reversed List",
    code: "void printDLL(Node* head) {\n  while (head) {\n    cout << head->val << \" \";\n    head = head->next;\n  }\n}",
    explanation: "Traversing from head yields: 5 ⇄ 4 ⇄ 3 ⇄ 2 ⇄ 1. We have successfully reversed the original array into a Doubly Linked List!",
    nodes: [
      { id: '0xE5', val: 5, next: '0xD4', prev: null, isFinal: true },
      { id: '0xD4', val: 4, next: '0xC3', prev: '0xE5', isFinal: true },
      { id: '0xC3', val: 3, next: '0xB2', prev: '0xD4', isFinal: true },
      { id: '0xB2', val: 2, next: '0xA1', prev: '0xC3', isFinal: true },
      { id: '0xA1', val: 1, next: null, prev: '0xB2', isFinal: true }
    ],
    headPointer: 0,
    tempPointer: null,
    i: 5,
    stackState: { head: '0xE5', output: '5 4 3 2 1' }
  }
];

export default function DoublyLinkedList({ currentStep: externalStep, onStepChange }) {
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
      {/* Visualizer Canvas Area */}
      <div className="w-full bg-slate-900/90 rounded-2xl border border-slate-700/60 shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Top bar inside visualizer */}
        <div className="px-6 py-4 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                Step {stepIndex + 1} of {steps.length}
              </span>
              <h3 className="text-lg font-bold text-white tracking-wide">{stepData.title}</h3>
            </div>
            <p className="text-slate-400 text-xs mt-0.5">Heap & Stack Memory Allocation View</p>
          </div>

          {/* Standalone step buttons (in case Studio controls aren't used) */}
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
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-xs font-semibold rounded-lg shadow-lg shadow-blue-500/20 transition"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Split view: Code & Memory Walkthrough */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
          {/* Left Column: Code, Explanation & Call Stack */}
          <div className="lg:col-span-5 p-6 bg-slate-950/40 flex flex-col gap-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Executing C++ Snippet</span>
                <span className="text-[10px] font-mono text-emerald-400">active</span>
              </div>
              <pre className="bg-slate-950 p-3.5 rounded-xl text-emerald-400 text-xs font-mono overflow-x-auto border border-slate-800 shadow-inner leading-relaxed">
                {stepData.code}
              </pre>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Action & Mechanics</h4>
              <p className="text-slate-300 text-xs leading-relaxed bg-slate-800/40 p-3 rounded-xl border border-slate-700/50">
                {stepData.explanation}
              </p>
            </div>

            {/* Stack Frame Inspector */}
            {stepData.stackState && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping inline-block"></span>
                  Stack Frame Variables
                </h4>
                <div className="bg-slate-900/90 rounded-xl p-3 border border-purple-500/20 grid grid-cols-2 gap-2 text-xs font-mono">
                  {Object.entries(stepData.stackState).map(([varName, val]) => (
                    <div key={varName} className="flex items-center justify-between bg-slate-950/60 px-2.5 py-1.5 rounded border border-slate-800">
                      <span className="text-slate-400">{varName}:</span>
                      <span className="text-purple-300 font-semibold">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Heap Memory & Doubly Linked List Graphic */}
          <div className="lg:col-span-7 p-6 flex flex-col items-center justify-center min-h-[360px] bg-slate-900/50 relative">
            <div className="absolute top-3 left-4 text-[11px] font-mono text-slate-500 uppercase tracking-wider">
              HEAP MEMORY (Dynamic Nodes)
            </div>

            {stepData.nodes.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-slate-500 py-12">
                <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center text-slate-600 mb-3">
                  ∅
                </div>
                <p className="text-sm italic">Heap memory is empty. (head = NULL)</p>
              </div>
            ) : (
              <div className="w-full flex flex-col items-center gap-6 py-6 overflow-x-auto">
                {/* Pointer Indicators Row */}
                <div className="flex items-center gap-4 justify-center min-w-max">
                  {stepData.nodes.map((node, idx) => (
                    <div key={'ptr-' + node.id} className="w-32 flex flex-col items-center h-8 justify-end">
                      {stepData.headPointer === idx && (
                        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 rounded text-[11px] font-mono font-bold animate-bounce flex items-center gap-1">
                          HEAD ↓
                        </span>
                      )}
                      {stepData.tempPointer === idx && (
                        <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/50 rounded text-[11px] font-mono font-bold animate-bounce flex items-center gap-1">
                          TEMP ↓
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Nodes & Double Arrows Row */}
                <div className="flex items-center gap-2 justify-center min-w-max">
                  {stepData.nodes.map((node, idx) => (
                    <React.Fragment key={node.id}>
                      {/* DLL Node Visual Box */}
                      <div
                        className={`flex flex-col w-32 rounded-xl transition-all duration-300 shadow-xl ${
                          node.isTemp
                            ? 'ring-2 ring-amber-400 bg-amber-950/30 scale-105'
                            : node.isFinal
                            ? 'ring-1 ring-emerald-500/50 bg-slate-800/90'
                            : 'ring-1 ring-slate-700 bg-slate-800/80'
                        }`}
                      >
                        {/* Memory Address Header */}
                        <div className="px-2 py-1 bg-slate-950 text-center font-mono text-[11px] text-slate-400 rounded-t-xl border-b border-slate-700/80 flex items-center justify-between">
                          <span>Addr</span>
                          <span className="text-blue-400 font-bold">{node.id}</span>
                        </div>

                        {/* Node Triad: [prev | data | next] */}
                        <div className="grid grid-cols-3 text-center font-mono text-xs divide-x divide-slate-700/80 h-12">
                          <div className="flex flex-col items-center justify-center bg-slate-900/60 p-1">
                            <span className="text-[9px] text-slate-400 uppercase">prev</span>
                            <span className="text-[10px] text-slate-300 truncate max-w-full">
                              {node.prev ? node.prev : 'NULL'}
                            </span>
                          </div>
                          <div className="flex flex-col items-center justify-center bg-blue-900/30 p-1">
                            <span className="text-[9px] text-blue-300 uppercase font-semibold">val</span>
                            <span className="text-base font-bold text-white">{node.val}</span>
                          </div>
                          <div className="flex flex-col items-center justify-center bg-slate-900/60 p-1">
                            <span className="text-[9px] text-slate-400 uppercase">next</span>
                            <span className="text-[10px] text-slate-300 truncate max-w-full">
                              {node.next ? node.next : 'NULL'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Bidirectional Arrow between nodes */}
                      {idx < stepData.nodes.length - 1 && (
                        <div className="flex flex-col items-center justify-center px-1 text-slate-400 select-none">
                          <div className="flex flex-col items-center bg-slate-800/80 px-1.5 py-1 rounded-md border border-slate-700 text-xs font-mono">
                            <span className="text-emerald-400 font-bold leading-none">⇄</span>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
