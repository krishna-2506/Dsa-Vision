import React, { useState, useMemo } from 'react';

// DLL Node Visual Component
const DLLNode = ({ node, isCurr, isNxt, isAns }) => {
  return (
    <div className="flex flex-col items-center relative mx-2">
      {/* Address Badge */}
      <div className="bg-slate-800/80 rounded-t-md text-[10px] px-2 py-0.5 font-mono text-slate-300 border border-slate-700/50 border-b-0 w-24 text-center z-10 shadow-md">
        {node.id}
      </div>
      
      {/* Main Node Body */}
      <div className={`flex bg-slate-900 border ${isCurr ? 'border-2 border-indigo-500' : isNxt ? 'border-2 border-amber-500' : 'border-slate-700'} rounded-lg overflow-hidden shadow-sm w-40 h-20 transition-all duration-200`}>
        
        {/* Prev Pointer Block */}
        <div className={`flex-1 flex flex-col border-r border-slate-700 text-[10px] items-center justify-center ${node.prev === 'NULL' ? 'bg-rose-900/20' : 'bg-slate-800/40'} transition-colors`}>
          <span className="text-slate-500 font-semibold mb-1">PREV</span>
          <span className={`font-mono ${node.prev === 'NULL' ? 'text-rose-400' : 'text-emerald-400'}`}>
            {node.prev}
          </span>
        </div>
        
        {/* Value Block */}
        <div className="flex-[1.2] flex flex-col items-center justify-center bg-slate-800/20">
          <span className="text-[9px] text-slate-500 font-semibold mb-0.5">DATA</span>
          <span className="font-bold text-white text-xl">{node.val}</span>
        </div>
        
        {/* Next Pointer Block */}
        <div className={`flex-1 flex flex-col border-l border-slate-700 text-[10px] items-center justify-center ${node.next === 'NULL' ? 'bg-rose-900/20' : 'bg-slate-800/40'} transition-colors`}>
          <span className="text-slate-500 font-semibold mb-1">NEXT</span>
          <span className={`font-mono ${node.next === 'NULL' ? 'text-rose-400' : 'text-emerald-400'}`}>
            {node.next}
          </span>
        </div>
      </div>

      {/* Pointer Indicators */}
      <div className="mt-3 flex flex-wrap gap-1.5 justify-center min-h-[24px]">
        {isCurr && (
          <span className="bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded font-mono shadow-sm flex items-center gap-1 animate-pulse">
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span> CURR
          </span>
        )}
        {isNxt && (
          <span className="bg-amber-600 text-white text-[10px] px-2 py-0.5 rounded font-mono shadow-sm flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span> NXT
          </span>
        )}
        {isAns && (
          <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded font-mono shadow-sm flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span> ANS
          </span>
        )}
      </div>
    </div>
  );
};

export const approaches = {
  intuitive: {
    title: 'Intuitive: Stack (2 Passes)',
    badge: 'O(N) Space',
    complexity: { time: 'O(N)', space: 'O(N)' },
    solutions: {
      cpp: `// C++ Intuitive Solution using Stack
class Solution {
public:
    Node* reverseDLL(Node* head) {
        if (!head || !head->next) return head;
        
        stack<int> st;
        Node* curr = head;
        
        // Pass 1: Push all values onto the stack
        while (curr != NULL) {
            st.push(curr->data);
            curr = curr->next;
        }
        
        // Pass 2: Overwrite values in reverse order
        curr = head;
        while (curr != NULL) {
            curr->data = st.top();
            st.pop();
            curr = curr->next;
        }
        
        return head; // The structure is intact, just values swapped
    }
};`,
      python: `# Python Intuitive Solution using Stack
class Solution:
    def reverseDLL(self, head: 'Node') -> 'Node':
        if not head or not head.next:
            return head
            
        stack = []
        curr = head
        
        # Pass 1: Push values
        while curr:
            stack.append(curr.data)
            curr = curr.next
            
        # Pass 2: Pop and overwrite
        curr = head
        while curr:
            curr.data = stack.pop()
            curr = curr.next
            
        return head`,
      java: `// Java Intuitive Solution using Stack
class Solution {
    public Node reverseDLL(Node head) {
        if (head == null || head.next == null) return head;
        
        Stack<Integer> st = new Stack<>();
        Node curr = head;
        
        // Pass 1
        while (curr != null) {
            st.push(curr.data);
            curr = curr.next;
        }
        
        // Pass 2
        curr = head;
        while (curr != null) {
            curr.data = st.pop();
            curr = curr.next;
        }
        
        return head;
    }
}`,
      javascript: `// JavaScript Intuitive Solution using Array as Stack
var reverseDLL = function(head) {
    if (!head || !head.next) return head;
    
    let stack = [];
    let curr = head;
    
    // Pass 1
    while (curr) {
        stack.push(curr.data);
        curr = curr.next;
    }
    
    // Pass 2
    curr = head;
    while (curr) {
        curr.data = stack.pop();
        curr = curr.next;
    }
    
    return head;
};`
    },
    steps: [
        {
            title: '1. Initialize Traversal',
            explanation: 'Start traversing the linked list from the head to store all values in a stack.',
            hudText: 'curr = 0x10, Stack is empty',
            pointers: { curr: '0x10' },
            stack: [],
            nodes: [
                { id: '0x10', val: 3, prev: 'NULL', next: '0x20' },
                { id: '0x20', val: 4, prev: '0x10', next: '0x30' },
                { id: '0x30', val: 5, prev: '0x20', next: 'NULL' }
            ]
        },
        {
            title: '2. Push and Advance',
            explanation: 'Push 3 onto the stack and move curr to the next node.',
            hudText: 'Stack.push(3), curr = 0x20',
            pointers: { curr: '0x20' },
            stack: [3],
            nodes: [
                { id: '0x10', val: 3, prev: 'NULL', next: '0x20' },
                { id: '0x20', val: 4, prev: '0x10', next: '0x30' },
                { id: '0x30', val: 5, prev: '0x20', next: 'NULL' }
            ]
        },
        {
            title: '3. Push and Advance',
            explanation: 'Push 4 onto the stack and move curr to the next node.',
            hudText: 'Stack.push(4), curr = 0x30',
            pointers: { curr: '0x30' },
            stack: [3, 4],
            nodes: [
                { id: '0x10', val: 3, prev: 'NULL', next: '0x20' },
                { id: '0x20', val: 4, prev: '0x10', next: '0x30' },
                { id: '0x30', val: 5, prev: '0x20', next: 'NULL' }
            ]
        },
        {
            title: '4. Finish First Pass',
            explanation: 'Push 5 onto the stack. curr becomes NULL. The stack now holds all elements in original order.',
            hudText: 'Stack.push(5), curr = NULL',
            pointers: { curr: null },
            stack: [3, 4, 5],
            nodes: [
                { id: '0x10', val: 3, prev: 'NULL', next: '0x20' },
                { id: '0x20', val: 4, prev: '0x10', next: '0x30' },
                { id: '0x30', val: 5, prev: '0x20', next: 'NULL' }
            ]
        },
        {
            title: '5. Second Pass: Reset Curr',
            explanation: 'Reset curr back to the head of the list for the second pass to overwrite values.',
            hudText: 'curr = 0x10',
            pointers: { curr: '0x10' },
            stack: [3, 4, 5],
            nodes: [
                { id: '0x10', val: 3, prev: 'NULL', next: '0x20' },
                { id: '0x20', val: 4, prev: '0x10', next: '0x30' },
                { id: '0x30', val: 5, prev: '0x20', next: 'NULL' }
            ]
        },
        {
            title: '6. Pop and Overwrite',
            explanation: 'Pop the top value (5) from the stack and overwrite curr->data. Then move to the next node.',
            hudText: 'curr->data = 5, curr = 0x20',
            pointers: { curr: '0x20' },
            stack: [3, 4],
            nodes: [
                { id: '0x10', val: 5, prev: 'NULL', next: '0x20' },
                { id: '0x20', val: 4, prev: '0x10', next: '0x30' },
                { id: '0x30', val: 5, prev: '0x20', next: 'NULL' }
            ]
        },
        {
            title: '7. Pop and Overwrite',
            explanation: 'Pop 4 and overwrite curr->data. Move to the next node.',
            hudText: 'curr->data = 4, curr = 0x30',
            pointers: { curr: '0x30' },
            stack: [3],
            nodes: [
                { id: '0x10', val: 5, prev: 'NULL', next: '0x20' },
                { id: '0x20', val: 4, prev: '0x10', next: '0x30' },
                { id: '0x30', val: 5, prev: '0x20', next: 'NULL' }
            ]
        },
        {
            title: '8. Pop and Overwrite',
            explanation: 'Pop 3 and overwrite curr->data. Move to the next node.',
            hudText: 'curr->data = 3, curr = NULL',
            pointers: { curr: null },
            stack: [],
            nodes: [
                { id: '0x10', val: 5, prev: 'NULL', next: '0x20' },
                { id: '0x20', val: 4, prev: '0x10', next: '0x30' },
                { id: '0x30', val: 3, prev: '0x20', next: 'NULL' }
            ]
        },
        {
            title: '9. Done',
            explanation: 'The linked list values have been reversed using O(N) extra space. The pointers remained unchanged.',
            hudText: 'Reversal complete!',
            pointers: { curr: null },
            stack: [],
            nodes: [
                { id: '0x10', val: 5, prev: 'NULL', next: '0x20' },
                { id: '0x20', val: 4, prev: '0x10', next: '0x30' },
                { id: '0x30', val: 3, prev: '0x20', next: 'NULL' }
            ]
        }
    ]
  },
  optimal: {
    title: 'Best: In-place Pointer Swap',
    badge: 'Optimal O(1) Space',
    complexity: { time: 'O(N)', space: 'O(1)' },
    solutions: {
      cpp: `// C++ Optimal Solution: In-place Pointer Reversal
class Solution {
public:
    Node* reverseDLL(Node * head) {
        Node* curr = head;
        Node* ans = NULL;
        
        while(curr) {
            // 1. Temporarily store the original next node
            Node* nxt = curr->next;
            
            // 2. Swap prev and next pointers
            curr->next = curr->prev;
            curr->prev = nxt;
            
            // 3. Keep track of the new head (the last node of original list)
            if(curr->prev == NULL) {
                ans = curr;
            }
            
            // 4. Move curr forward in original list (which is now curr->prev)
            curr = curr->prev; 
        }
        return ans;
    }
};`,
      python: `# Python Optimal Solution: In-place Pointer Reversal
class Solution:
    def reverseDLL(self, head: 'Node') -> 'Node':
        curr = head
        ans = None
        
        while curr:
            nxt = curr.next
            curr.next = curr.prev
            curr.prev = nxt
            
            if curr.prev is None:
                ans = curr
                
            curr = curr.prev
            
        return ans`,
      java: `// Java Optimal Solution: In-place Pointer Reversal
class Solution {
    public Node reverseDLL(Node head) {
        Node curr = head;
        Node ans = null;
        
        while(curr != null) {
            Node nxt = curr.next;
            
            curr.next = curr.prev;
            curr.prev = nxt;
            
            if(curr.prev == null) {
                ans = curr;
            }
            
            curr = curr.prev;
        }
        
        return ans;
    }
}`,
      javascript: `// JavaScript Optimal Solution: In-place Pointer Reversal
var reverseDLL = function(head) {
    let curr = head;
    let ans = null;
    
    while(curr) {
        let nxt = curr.next;
        
        curr.next = curr.prev;
        curr.prev = nxt;
        
        if(curr.prev === null) {
            ans = curr;
        }
        
        curr = curr.prev;
    }
    
    return ans;
};`
    },
    steps: [
        {
            title: '1. Initialize Pointers',
            explanation: 'Set curr to head (0x10) and ans to NULL. We will traverse the list until curr becomes NULL.',
            hudText: 'curr = 0x10, nxt = NULL',
            pointers: { curr: '0x10', nxt: null, ans: null },
            nodes: [
                { id: '0x10', val: 3, prev: 'NULL', next: '0x20' },
                { id: '0x20', val: 4, prev: '0x10', next: '0x30' },
                { id: '0x30', val: 5, prev: '0x20', next: 'NULL' }
            ]
        },
        {
            title: '2. Save Next Node',
            explanation: 'Before modifying pointers, save curr->next in nxt so we do not lose our path forward.',
            hudText: 'nxt = curr->next (0x20)',
            pointers: { curr: '0x10', nxt: '0x20', ans: null },
            nodes: [
                { id: '0x10', val: 3, prev: 'NULL', next: '0x20' },
                { id: '0x20', val: 4, prev: '0x10', next: '0x30' },
                { id: '0x30', val: 5, prev: '0x20', next: 'NULL' }
            ]
        },
        {
            title: '3. Swap Pointers for Curr',
            explanation: 'Swap the prev and next pointers of the current node (0x10). next becomes NULL, prev becomes 0x20.',
            hudText: 'curr->next = NULL, curr->prev = 0x20',
            pointers: { curr: '0x10', nxt: '0x20', ans: null },
            nodes: [
                { id: '0x10', val: 3, prev: '0x20', next: 'NULL' },
                { id: '0x20', val: 4, prev: '0x10', next: '0x30' },
                { id: '0x30', val: 5, prev: '0x20', next: 'NULL' }
            ]
        },
        {
            title: '4. Advance Curr',
            explanation: 'Move curr to the next node in the original sequence. Since we swapped pointers, this is now accessed via curr->prev!',
            hudText: 'curr = curr->prev (0x20)',
            pointers: { curr: '0x20', nxt: '0x20', ans: null },
            nodes: [
                { id: '0x10', val: 3, prev: '0x20', next: 'NULL' },
                { id: '0x20', val: 4, prev: '0x10', next: '0x30' },
                { id: '0x30', val: 5, prev: '0x20', next: 'NULL' }
            ]
        },
        {
            title: '5. Save Next Node',
            explanation: 'For the new curr (0x20), save its original next node (0x30) into nxt.',
            hudText: 'nxt = curr->next (0x30)',
            pointers: { curr: '0x20', nxt: '0x30', ans: null },
            nodes: [
                { id: '0x10', val: 3, prev: '0x20', next: 'NULL' },
                { id: '0x20', val: 4, prev: '0x10', next: '0x30' },
                { id: '0x30', val: 5, prev: '0x20', next: 'NULL' }
            ]
        },
        {
            title: '6. Swap Pointers for Curr',
            explanation: 'Swap prev and next for 0x20. next becomes 0x10, prev becomes 0x30.',
            hudText: 'curr->next = 0x10, curr->prev = 0x30',
            pointers: { curr: '0x20', nxt: '0x30', ans: null },
            nodes: [
                { id: '0x10', val: 3, prev: '0x20', next: 'NULL' },
                { id: '0x20', val: 4, prev: '0x30', next: '0x10' },
                { id: '0x30', val: 5, prev: '0x20', next: 'NULL' }
            ]
        },
        {
            title: '7. Advance Curr',
            explanation: 'Move curr to the next node using curr->prev.',
            hudText: 'curr = curr->prev (0x30)',
            pointers: { curr: '0x30', nxt: '0x30', ans: null },
            nodes: [
                { id: '0x10', val: 3, prev: '0x20', next: 'NULL' },
                { id: '0x20', val: 4, prev: '0x30', next: '0x10' },
                { id: '0x30', val: 5, prev: '0x20', next: 'NULL' }
            ]
        },
        {
            title: '8. Save Next Node',
            explanation: 'Save original next node of 0x30 in nxt, which is NULL (end of list).',
            hudText: 'nxt = curr->next (NULL)',
            pointers: { curr: '0x30', nxt: null, ans: null },
            nodes: [
                { id: '0x10', val: 3, prev: '0x20', next: 'NULL' },
                { id: '0x20', val: 4, prev: '0x30', next: '0x10' },
                { id: '0x30', val: 5, prev: '0x20', next: 'NULL' }
            ]
        },
        {
            title: '9. Swap Pointers for Curr',
            explanation: 'Swap prev and next for 0x30. next becomes 0x20, prev becomes NULL.',
            hudText: 'curr->next = 0x20, curr->prev = NULL',
            pointers: { curr: '0x30', nxt: null, ans: null },
            nodes: [
                { id: '0x10', val: 3, prev: '0x20', next: 'NULL' },
                { id: '0x20', val: 4, prev: '0x30', next: '0x10' },
                { id: '0x30', val: 5, prev: 'NULL', next: '0x20' }
            ]
        },
        {
            title: '10. Check if Last Node',
            explanation: 'Since curr->prev is NULL, this was the last node of the original list. It becomes the new head, so we point ans to it.',
            hudText: 'curr->prev == NULL. ans = 0x30',
            pointers: { curr: '0x30', nxt: null, ans: '0x30' },
            nodes: [
                { id: '0x10', val: 3, prev: '0x20', next: 'NULL' },
                { id: '0x20', val: 4, prev: '0x30', next: '0x10' },
                { id: '0x30', val: 5, prev: 'NULL', next: '0x20' }
            ]
        },
        {
            title: '11. Terminate Execution',
            explanation: 'Move curr using curr->prev, which is NULL. The loop terminates and ans is returned as the new head.',
            hudText: 'curr = curr->prev (NULL). Return ans.',
            pointers: { curr: null, nxt: null, ans: '0x30' },
            nodes: [
                { id: '0x10', val: 3, prev: '0x20', next: 'NULL' },
                { id: '0x20', val: 4, prev: '0x30', next: '0x10' },
                { id: '0x30', val: 5, prev: 'NULL', next: '0x20' }
            ]
        }
    ]
  }
};

export const solutions = approaches.optimal.solutions;
export const steps = approaches.optimal.steps;
export const meta = {
  display_id: 'Q-090',
  title: "Introduction To Double LL",
  category: "4. Linked List",
  difficulty: "Medium",
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  description: "Given a doubly linked list of n elements. The task is to reverse the doubly linked list in-place."
};

export default function IntroductionToDoubleLlVisualizer({
  currentStep: externalStep,
  onStepChange,
  customInput = '',
  customTarget = '',
  approachTier = 'optimal'
}) {
  const [internalStep, setInternalStep] = useState(0);
  const activeApproach = approaches[approachTier] || approaches.optimal;
  const activeSteps = activeApproach.steps;
  const stepIndex = externalStep !== undefined ? Math.min(externalStep, activeSteps.length - 1) : internalStep;
  const setStep = onStepChange || setInternalStep;
  const stepData = activeSteps[stepIndex] || activeSteps[0];

  const handleNext = () => { if (stepIndex < activeSteps.length - 1) setStep(stepIndex + 1); };
  const handlePrev = () => { if (stepIndex > 0) setStep(stepIndex - 1); };

  return (
    <div className="w-full flex flex-col bg-[#0b0d14] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
      {/* 1. Header Bar */}
      <div className="px-5 py-3 bg-[#0e111a] border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
            Step {stepIndex + 1} / {activeSteps.length}
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold bg-white/5 text-slate-300 border border-white/10">
            {activeApproach.badge}
          </span>
          <h3 className="text-sm font-bold text-white font-mono truncate max-w-md hidden md:block">{stepData.title}</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={handlePrev} disabled={stepIndex === 0} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 disabled:opacity-30 text-slate-300 text-xs font-mono rounded border border-white/5 transition cursor-pointer">
            ← Prev
          </button>
          <button onClick={handleNext} disabled={stepIndex === activeSteps.length - 1} className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-white text-xs font-mono font-medium rounded transition cursor-pointer">
            Next →
          </button>
        </div>
      </div>

      {/* 2. Visualizer Graphical Canvas */}
      <div className="p-6 flex flex-col items-center justify-center bg-[#08090e]/60 min-h-[300px] relative overflow-hidden">
        
        {/* Stack Visualization for Intuitive Approach */}
        {activeApproach.badge.includes('Space') && (
            <div className="absolute left-6 top-6 border border-white/10 rounded-lg p-3 bg-[#0c0e16]/80 backdrop-blur-sm shadow-xl z-20">
                <h4 className="text-[10px] uppercase tracking-wider font-mono text-slate-400 mb-2 text-center">Stack</h4>
                <div className="flex flex-col-reverse gap-1 items-center min-w-[60px] min-h-[100px] justify-start bg-slate-900/50 p-2 rounded border border-slate-800">
                    {stepData.stack?.map((val, idx) => (
                        <div key={idx} className="bg-indigo-500/20 border border-indigo-500/40 text-indigo-200 font-mono text-xs px-4 py-1 rounded w-full text-center shadow-sm">
                            {val}
                        </div>
                    ))}
                    {(!stepData.stack || stepData.stack.length === 0) && <span className="text-[10px] text-slate-600 font-mono mt-auto mb-auto">Empty</span>}
                </div>
            </div>
        )}

        {/* Doubly Linked List View */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center relative mt-8 sm:mt-0">
          
          {/* Render Nodes */}
          {stepData.nodes.map((node, index) => (
            <React.Fragment key={node.id}>
                <DLLNode 
                  node={node} 
                  isCurr={stepData.pointers.curr === node.id}
                  isNxt={stepData.pointers.nxt === node.id}
                  isAns={stepData.pointers.ans === node.id}
                />
                
                {/* Visual Connector (Static spacer for physical layout only) */}
                {index < stepData.nodes.length - 1 && (
                    <div className="hidden sm:flex h-0.5 w-8 bg-slate-800 relative"></div>
                )}
            </React.Fragment>
          ))}
          
        </div>

        {/* Real-time Comparison HUD */}
        <div className="mt-8 flex items-center gap-3 px-5 py-2.5 rounded-lg bg-[#0e111a] border border-slate-800 shadow-inner max-w-full overflow-x-auto">
          <span className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold">Status:</span>
          <strong className="text-emerald-400 font-mono text-xs whitespace-nowrap">{stepData.hudText}</strong>
        </div>
      </div>

      {/* 3. Explanation Footer */}
      <div className="px-5 py-4 bg-[#0c0e16] border-t border-white/5 text-xs text-slate-300 leading-relaxed font-sans">
        <span className="text-slate-500 font-mono text-[11px] uppercase mr-2 font-bold tracking-wider">Explanation:</span>
        <span className="opacity-90">{stepData.explanation}</span>
      </div>
    </div>
  );
}