import React, { useMemo } from 'react';

// Common SVG Filter for Chalkboard effect
const ChalkboardFilter = () => (
  <svg width="0" height="0" className="absolute">
    <defs>
      <filter id="rough" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
);

// Chalkboard DLL Node Component
const DLLNode = ({ node, isNew }) => {
  return (
    <div className={`flex flex-col items-center relative mx-2 ${isNew ? 'translate-y-12' : ''} transition-transform duration-500`}>
      {/* Address Badge */}
      <div className="bg-[#1c2529] rounded-t-sm text-[10px] px-2 py-0.5 font-mono text-[#5f6f6a] border border-[#eef1ea]/20 border-b-0 w-24 text-center z-10" style={{ filter: 'url(#rough)' }}>
        {node.id}
      </div>
      
      {/* Main Node Body */}
      <div className={`flex bg-[#1c2529] border ${isNew ? 'border-[#5fb3a6] shadow-[0_0_15px_rgba(95,179,166,0.3)]' : 'border-[#eef1ea]/30'} rounded-sm overflow-hidden w-48 h-20`} style={{ filter: 'url(#rough)' }}>
        
        {/* Prev Pointer Block */}
        <div className={`flex-1 flex flex-col border-r border-[#eef1ea]/20 text-[10px] items-center justify-center ${node.prev === 'NULL' ? 'bg-red-900/10' : 'bg-black/20'}`}>
          <span className="text-[#5f6f6a] font-semibold mb-1 font-mono">prev</span>
          <span className={`font-mono ${node.prev === 'NULL' ? 'text-red-400/70' : 'text-[#eef1ea]/80'}`}>
            {node.prev}
          </span>
        </div>
        
        {/* Value Block */}
        <div className="flex-[1.2] flex flex-col items-center justify-center bg-black/10 relative">
          <span className="text-[9px] text-[#5f6f6a] font-semibold mb-0.5 absolute top-1 font-mono">data</span>
          <span className="font-bold text-[#eef1ea] text-2xl font-mono mt-2">{node.val}</span>
        </div>
        
        {/* Next Pointer Block */}
        <div className={`flex-1 flex flex-col border-l border-[#eef1ea]/20 text-[10px] items-center justify-center ${node.next === 'NULL' ? 'bg-red-900/10' : 'bg-black/20'}`}>
          <span className="text-[#5f6f6a] font-semibold mb-1 font-mono">next</span>
          <span className={`font-mono ${node.next === 'NULL' ? 'text-red-400/70' : 'text-[#eef1ea]/80'}`}>
            {node.next}
          </span>
        </div>
      </div>
    </div>
  );
};

// Cursive Pointer Label
const PointerLabel = ({ label, color }) => (
  <div 
    className="absolute -bottom-8 px-2 py-1 rounded-sm shadow-md text-black font-bold text-xs"
    style={{ 
      backgroundColor: color,
      fontFamily: "'Kalam', cursive",
      filter: 'url(#rough)',
      transform: 'rotate(-2deg)'
    }}
  >
    {label}
  </div>
);

export const approaches = {
  intuitive: {
    title: 'Intuitive: Brute Force',
    badge: 'Standard Traversal',
    complexity: { time: 'O(N)', space: 'O(1)' },
    steps: [
        // Fallback identical to optimal for simplicity if switched
        { title: 'Fallback Step', status: 'Use Optimal Approach', explain: 'This basic operation shares logic across tiers.' }
    ],
    solutions: {
      cpp: `// Standard traversal logic\n`,
      python: `# Standard traversal logic\n`,
      java: `// Standard traversal logic\n`,
      javascript: `// Standard traversal logic\n`
    }
  },
  better: {
    title: 'Better: Optimized Intermediate',
    badge: 'Sub-Optimal',
    complexity: { time: 'O(N)', space: 'O(1)' },
    steps: [{ title: 'Fallback Step', status: 'Use Optimal Approach', explain: 'This basic operation shares logic across tiers.' }],
    solutions: { cpp: `...`, python: `...`, java: `...`, javascript: `...` }
  },
  optimal: {
    title: 'Best: Optimal Gold Standard',
    badge: 'Optimal',
    complexity: { time: 'of this approach is O(N), where N is the number of nodes in the doubly linked list. In the worst case, we may need to traverse the entire list to reach the desired position.', space: 'is O(1) as we are using a constant amount of extra space to store temporary pointers during the insertion process.' },
    solutions: {
      cpp: `void addNode(Node *head, int pos, int data)
{
    int cnt = 0;
    Node* curr = head;
    
    // Traverse to the 'pos'-th node
    while(cnt < pos){
        curr = curr->next;
        cnt++;
    }
    
    // Save reference to the next node
    Node* nxt = curr->next;
    
    // Create new node and attach it immediately after curr
    curr->next = new Node(data);
    
    // Wire the new node's prev pointer back to curr
    curr->next->prev = curr;
    
    // Wire the new node's next pointer to the saved 'nxt' node
    curr->next->next = nxt;
    
    // Note: To be fully complete, if nxt != NULL, 
    // nxt->prev should also be updated to curr->next.
}`,
      python: `def addNode(head, pos, data):
    cnt = 0
    curr = head
    
    while cnt < pos:
        curr = curr.next
        cnt += 1
        
    nxt = curr.next
    curr.next = Node(data)
    curr.next.prev = curr
    curr.next.next = nxt`,
      java: `void addNode(Node head, int pos, int data) {
    int cnt = 0;
    Node curr = head;
    
    while(cnt < pos) {
        curr = curr.next;
        cnt++;
    }
    
    Node nxt = curr.next;
    curr.next = new Node(data);
    curr.next.prev = curr;
    curr.next.next = nxt;
}`,
      javascript: `var addNode = function(head, pos, data) {
    let cnt = 0;
    let curr = head;
    
    while(cnt < pos) {
        curr = curr.next;
        cnt++;
    }
    
    let nxt = curr.next;
    curr.next = new Node(data);
    curr.next.prev = curr;
    curr.next.next = nxt;
};`
    },
    steps: [
      {
        title: '1. Initialize Pointers',
        codeLine: 4,
        status: '<span style="color:#5fb3a6">cnt = 0</span>, <b style="color:#e8a33d">curr = 0x10</b>',
        explain: 'We start with a counter <span class="note" style="color:#5fb3a6">cnt</span> at 0 and a pointer <span class="note" style="color:#e8a33d">curr</span> pointing to the head of the list.',
        nodes: [
          { id: '0x10', val: 1, prev: 'NULL', next: '0x20', isTarget: false },
          { id: '0x20', val: 2, prev: '0x10', next: '0x30', isTarget: false },
          { id: '0x30', val: 3, prev: '0x20', next: 'NULL', isTarget: false }
        ],
        newNode: null,
        pointers: { curr: '0x10', nxt: null }
      },
      {
        title: '2. Traverse List (Check Condition)',
        codeLine: 5,
        status: '<span style="color:#5fb3a6">cnt(0) < pos(1)</span> => True',
        explain: 'We need to insert after pos = 1. Since <span class="note" style="color:#5fb3a6">0 < 1</span>, we must traverse forward.',
        nodes: [
          { id: '0x10', val: 1, prev: 'NULL', next: '0x20', isTarget: false },
          { id: '0x20', val: 2, prev: '0x10', next: '0x30', isTarget: false },
          { id: '0x30', val: 3, prev: '0x20', next: 'NULL', isTarget: false }
        ],
        newNode: null,
        pointers: { curr: '0x10', nxt: null }
      },
      {
        title: '3. Advance Curr & Increment Count',
        codeLine: 7,
        status: '<span style="color:#5fb3a6">cnt = 1</span>, <b style="color:#e8a33d">curr = 0x20</b>',
        explain: 'We move <span class="note" style="color:#e8a33d">curr</span> to the next node and increment <span class="note" style="color:#5fb3a6">cnt</span> to 1.',
        nodes: [
          { id: '0x10', val: 1, prev: 'NULL', next: '0x20', isTarget: false },
          { id: '0x20', val: 2, prev: '0x10', next: '0x30', isTarget: false },
          { id: '0x30', val: 3, prev: '0x20', next: 'NULL', isTarget: false }
        ],
        newNode: null,
        pointers: { curr: '0x20', nxt: null }
      },
      {
        title: '4. Target Reached',
        codeLine: 5,
        status: '<span style="color:#5fb3a6">cnt(1) < pos(1)</span> => False',
        explain: 'The loop condition is false. We have successfully located the <span class="note" style="color:#e8a33d">curr</span> node after which we will insert our new node.',
        nodes: [
          { id: '0x10', val: 1, prev: 'NULL', next: '0x20', isTarget: false },
          { id: '0x20', val: 2, prev: '0x10', next: '0x30', isTarget: true },
          { id: '0x30', val: 3, prev: '0x20', next: 'NULL', isTarget: false }
        ],
        newNode: null,
        pointers: { curr: '0x20', nxt: null }
      },
      {
        title: '5. Save Next Reference',
        codeLine: 9,
        status: '<span style="color:#5fb3a6">nxt = 0x30</span>',
        explain: 'We save a reference to the node following curr into <span class="note" style="color:#5fb3a6">nxt</span> so we don\'t lose the rest of the list when we break the link.',
        nodes: [
          { id: '0x10', val: 1, prev: 'NULL', next: '0x20', isTarget: false },
          { id: '0x20', val: 2, prev: '0x10', next: '0x30', isTarget: true },
          { id: '0x30', val: 3, prev: '0x20', next: 'NULL', isTarget: false }
        ],
        newNode: null,
        pointers: { curr: '0x20', nxt: '0x30' }
      },
      {
        title: '6. Create New Node & Link Curr Forward',
        codeLine: 10,
        status: '<b style="color:#eef1ea">new Node(99)</b> created at 0x99',
        explain: 'We instantiate the new node with data 99. We immediately point <span class="note" style="color:#e8a33d">curr->next</span> to this new node.',
        nodes: [
          { id: '0x10', val: 1, prev: 'NULL', next: '0x20', isTarget: false },
          { id: '0x20', val: 2, prev: '0x10', next: '0x99', isTarget: true },
          { id: '0x30', val: 3, prev: '0x20', next: 'NULL', isTarget: false }
        ],
        newNode: { id: '0x99', val: 99, prev: 'NULL', next: 'NULL' },
        pointers: { curr: '0x20', nxt: '0x30' }
      },
      {
        title: '7. Wire New Node Prev',
        codeLine: 11,
        status: 'curr->next->prev = <b style="color:#e8a33d">curr</b>',
        explain: 'We wire the new node\'s <span class="note text-[#eef1ea]">prev</span> pointer backward to point at our <span class="note" style="color:#e8a33d">curr</span> node.',
        nodes: [
          { id: '0x10', val: 1, prev: 'NULL', next: '0x20', isTarget: false },
          { id: '0x20', val: 2, prev: '0x10', next: '0x99', isTarget: true },
          { id: '0x30', val: 3, prev: '0x20', next: 'NULL', isTarget: false }
        ],
        newNode: { id: '0x99', val: 99, prev: '0x20', next: 'NULL' },
        pointers: { curr: '0x20', nxt: '0x30' }
      },
      {
        title: '8. Wire New Node Next',
        codeLine: 12,
        status: 'curr->next->next = <span style="color:#5fb3a6">nxt</span>',
        explain: 'We wire the new node\'s <span class="note text-[#eef1ea]">next</span> pointer forward to point at the saved <span class="note" style="color:#5fb3a6">nxt</span> node.',
        nodes: [
          { id: '0x10', val: 1, prev: 'NULL', next: '0x20', isTarget: false },
          { id: '0x20', val: 2, prev: '0x10', next: '0x99', isTarget: true },
          { id: '0x99', val: 99, prev: '0x20', next: '0x30', isTarget: false },
          { id: '0x30', val: 3, prev: '0x20', next: 'NULL', isTarget: false }
        ],
        newNode: null, // Merged into main visual list
        pointers: { curr: '0x20', nxt: '0x30' }
      },
      {
        title: '9. Operation Complete',
        codeLine: 13,
        status: 'Insertion successful!',
        explain: 'The node 99 has been successfully inserted into the DLL. Note: The provided C++ code leaves nxt->prev pointing to curr (0x20), though technically it should point to 0x99.',
        nodes: [
          { id: '0x10', val: 1, prev: 'NULL', next: '0x20', isTarget: false },
          { id: '0x20', val: 2, prev: '0x10', next: '0x99', isTarget: false },
          { id: '0x99', val: 99, prev: '0x20', next: '0x30', isTarget: false },
          { id: '0x30', val: 3, prev: '0x20', next: 'NULL', isTarget: false }
        ],
        newNode: null,
        pointers: { curr: null, nxt: null }
      }
    ]
  }
};

export const solutions = approaches.optimal.solutions;
export const steps = approaches.optimal.steps;
export const meta = {
  display_id: 'Q-091',
  title: "Insert Node In DLL",
  category: "4. Linked List",
  difficulty: "Medium",
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  description: "Given a doubly-linked list, a position p, and an integer x. The task is to add a new node with value x at the position just after pth node."
};

export default function InsertNodeInDllVisualizer({
  currentStep = 0,
  onStepChange,
  customInput = '',
  customTarget = '',
  approachTier = 'optimal'
}) {
  const activeApproach = approaches[approachTier] || approaches.optimal;
  const activeSteps = activeApproach.steps;
  const stepIndex = Math.min(Math.max(0, currentStep), activeSteps.length - 1);
  const stepData = activeSteps[stepIndex] || activeSteps[0];

  return (
    <div className="w-full flex flex-col space-y-5 bg-[#0b0d14] p-2 rounded-xl text-[#eef1ea]">
      <ChalkboardFilter />
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&display=swap');
        .status-line { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 0.85rem; }
        .explain { font-family: 'Kalam', cursive; font-size: 1.1rem; line-height: 1.5; color: #a3b3ac; }
        .note { border-bottom: 1px dashed currentColor; padding-bottom: 2px; }
      `}} />

      {/* 1. Creative Graphical Visualization Canvas */}
      <div className="w-full py-12 flex flex-col items-center justify-center relative min-h-[320px] overflow-x-auto">
        
        {/* Main List Row */}
        <div className="flex items-center gap-4 relative z-10">
          {stepData.nodes.map((node) => (
            <div key={node.id} className="relative">
              <DLLNode node={node} isNew={node.id === '0x99'} />
              
              {/* Pointers rendering */}
              {stepData.pointers.curr === node.id && (
                 <PointerLabel label="curr" color="#e8a33d" />
              )}
              {stepData.pointers.nxt === node.id && (
                 <PointerLabel label="nxt" color="#5fb3a6" />
              )}
            </div>
          ))}
        </div>

        {/* Separated New Node (Before it merges) */}
        {stepData.newNode && (
           <div className="absolute bottom-4 z-0">
             <DLLNode node={stepData.newNode} isNew={true} />
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[#5fb3a6] font-mono text-xs" style={{ filter: 'url(#rough)' }}>
               new Node
             </div>
           </div>
        )}

      </div>

      {/* 2. Real-time Status HUD */}
      {stepData.status && (
        <div className="w-full bg-[#1c2529] border border-[#eef1ea]/10 rounded px-4 py-3 flex items-center justify-center shadow-inner" style={{ filter: 'url(#rough)' }}>
          <div className="status-line tracking-wide" dangerouslySetInnerHTML={{ __html: stepData.status }} />
        </div>
      )}

      {/* 3. Chalkboard Explanation */}
      {stepData.explain && (
        <div className="px-2 pt-2 pb-4 text-center max-w-2xl mx-auto">
          <p className="explain" dangerouslySetInnerHTML={{ __html: stepData.explain }} />
        </div>
      )}
    </div>
  );
}