import React, { useState } from 'react';

const steps = [
  {
    title: "Initialization",
    code: "Node *head = NULL;\nint arr[5] = {1,2,3,4,5};",
    explanation: "The 'head' pointer is created on the Stack pointing to nothing (NULL). The array is ready.",
    nodes: [],
    headPointer: null,
    tempPointer: null,
    i: null,
  },
  {
    title: "Iteration i=0 (First Node)",
    code: "if(!head) {\n  head = new Node(arr[0]);\n}",
    explanation: "Because head is NULL, we create the first Node (1) in the Heap. The 'head' pointer now stores the memory address of this new node.",
    nodes: [{ id: '0xA1', val: 1, next: null, prev: null }],
    headPointer: 0,
    tempPointer: null,
    i: 0,
  },
  {
    title: "Iteration i=1 (Create Temp)",
    code: "Node *temp = new Node(arr[1]);",
    explanation: "i is 1. Head is NOT null. We create a new Node (2) in the heap and temporarily point to it using 'temp'.",
    nodes: [
      { id: '0xB2', val: 2, next: null, prev: null, isTemp: true },
      { id: '0xA1', val: 1, next: null, prev: null }
    ],
    headPointer: 1,
    tempPointer: 0,
    i: 1,
  },
  {
    title: "Iteration i=1 (Link Forward)",
    code: "temp->next = head;",
    explanation: "We set the 'next' pointer of our new temp node to point to where 'head' is currently pointing (Node 1).",
    nodes: [
      { id: '0xB2', val: 2, next: '0xA1', prev: null, isTemp: true },
      { id: '0xA1', val: 1, next: null, prev: null }
    ],
    headPointer: 1,
    tempPointer: 0,
    i: 1,
  },
  {
    title: "Iteration i=1 (Link Backward)",
    code: "head->prev = temp;",
    explanation: "We set the 'prev' pointer of Node 1 to point back to our temp node (Node 2). The double link is established!",
    nodes: [
      { id: '0xB2', val: 2, next: '0xA1', prev: null, isTemp: true },
      { id: '0xA1', val: 1, next: null, prev: '0xB2' }
    ],
    headPointer: 1,
    tempPointer: 0,
    i: 1,
  },
  {
    title: "Iteration i=1 (Shift Head)",
    code: "head = temp;",
    explanation: "Finally, we update the 'head' pointer to point to our new node (Node 2). It is now the official start of the list.",
    nodes: [
      { id: '0xB2', val: 2, next: '0xA1', prev: null },
      { id: '0xA1', val: 1, next: null, prev: '0xB2' }
    ],
    headPointer: 0,
    tempPointer: null,
    i: 1,
  },
  {
    title: "Iteration i=2 (Fast Forward)",
    code: "head = temp;",
    explanation: "The same process happens for 3. It is created, linked forward to 2, 2 is linked backward to 3, and head shifts to 3.",
    nodes: [
      { id: '0xC3', val: 3, next: '0xB2', prev: null },
      { id: '0xB2', val: 2, next: '0xA1', prev: '0xC3' },
      { id: '0xA1', val: 1, next: null, prev: '0xB2' }
    ],
    headPointer: 0,
    tempPointer: null,
    i: 2,
  },
  {
    title: "Final State (After loop completes)",
    code: "printDLL(head);",
    explanation: "The loop finishes after adding 4 and 5. The final list is a reverse of the array. The while loop traverses from head (5) to NULL, printing: 5 4 3 2 1",
    nodes: [
      { id: '0xE5', val: 5, next: '0xD4', prev: null },
      { id: '0xD4', val: 4, next: '0xC3', prev: '0xE5' },
      { id: '0xC3', val: 3, next: '0xB2', prev: '0xD4' },
      { id: '0xB2', val: 2, next: '0xA1', prev: '0xC3' },
      { id: '0xA1', val: 1, next: null, prev: '0xB2' }
    ],
    headPointer: 0,
    tempPointer: null,
    i: 5,
  }
];

export default function DLLVisualizer() {
  const [currentStep, setCurrentStep] = useState(0);
  const stepData = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-8 font-sans">
      <div className="max-w-4xl w-full bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
        
        {/* Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-700 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-blue-400">Doubly Linked List Execution</h1>
            <p className="text-slate-400 text-sm mt-1">{stepData.title}</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handlePrev} disabled={currentStep === 0}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded transition-colors"
            >
              Previous
            </button>
            <button 
              onClick={handleNext} disabled={currentStep === steps.length - 1}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded transition-colors"
            >
              Next Step
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row h-full">
          {/* Left Panel: Code & Explanation */}
          <div className="w-full md:w-1/3 p-6 border-r border-slate-700 bg-slate-900 flex flex-col gap-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Executing Code</h3>
              <pre className="bg-slate-950 p-4 rounded-lg text-green-400 text-sm font-mono overflow-x-auto border border-slate-800 shadow-inner">
                {stepData.code}
              </pre>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">What is happening?</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {stepData.explanation}
              </p>
            </div>
            {stepData.i !== null && (
              <div className="bg-blue-900/30 border border-blue-800/50 p-4 rounded-lg">
                <p className="text-sm">Current <code className="text-blue-400">i</code> = {stepData.i}</p>
                {stepData.i < 5 && <p className="text-sm">Current <code className="text-blue-400">arr[i]</code> = {stepData.i + 1}</p>}
              </div>
            )}
          </div>

          {/* Right Panel: Memory Visualization */}
          <div className="w-full md:w-2/3 p-8 flex flex-col items-center justify-center relative bg-slate-800/50">
            
            {stepData.nodes.length === 0 ? (
              <div className="text-slate-500 italic">Heap memory is empty.</div>
            ) : (
              <div className="flex flex-col gap-6 items-center w-full">
                
                {/* Pointers Row */}
                <div className="flex w-full justify-around h-12">
                   <div className="flex w-full absolute top-8 justify-center gap-4 px-12">
                     {stepData.nodes.map((node, idx) => (
                       <div key={'ptr-'+idx} className="w-32 flex flex-col items-center justify-end">
                         {stepData.headPointer === idx && (
                           <div className="text-emerald-400 font-mono text-sm font-bold flex flex-col items-center animate-bounce">
                             HEAD ↓
                           </div>
                         )}
                         {stepData.tempPointer === idx && (
                           <div className="text-amber-400 font-mono text-sm font-bold flex flex-col items-center animate-bounce">
                             TEMP ↓
                           </div>
                         )}
                       </div>
                     ))}
                   </div>
                </div>

                {/* Nodes Row */}
                <div className="flex flex-row items-center gap-4 relative mt-4">
                  {stepData.nodes.map((node, index) => (
                    <React.Fragment key={node.id}>
                      {/* DLL Node Box */}
                      <div className={`flex flex-col w-32 border-2 rounded-lg bg-slate-900 shadow-xl transition-all duration-500 ${node.isTemp ? 'border-amber-500 scale-105' : 'border-slate-600'}`}>
                        <div className="text-[10px] text-center bg-slate-950 py-1 font-mono text-slate-500 rounded-t-md border-b border-slate-700">
                          {node.id}
                        </div>
                        <div className="flex flex-row text-center font-mono text-sm h-12">
                          <div className="w-1/3 border-r border-slate-700 flex items-center justify-center bg-slate-800 text-xs">
                            {node.prev ? '⟵' : 'NULL'}
                          </div>
                          <div className="w-1/3 flex items-center justify-center font-bold text-white bg-slate-700">
                            {node.val}
                          </div>
                          <div className="w-1/3 border-l border-slate-700 flex items-center justify-center bg-slate-800 text-xs">
                            {node.next ? '⟶' : 'NULL'}
                          </div>
                        </div>
                      </div>

                      {/* Connecting Arrows */}
                      {index < stepData.nodes.length - 1 && (
                        <div className="flex flex-col justify-center items-center px-1">
                          {stepData.nodes[index].next && (
                             <span className="text-slate-400 font-bold text-xl leading-3">→</span>
                          )}
                          {stepData.nodes[index+1].prev && (
                             <span className="text-slate-400 font-bold text-xl leading-3">←</span>
                          )}
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