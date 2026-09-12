import React, { useMemo } from 'react';

const optimalSteps = [
  {
    title: "1. Initial State",
    codeLine: 10,
    status: "Stack is empty.",
    explain: "<code>top</code> pointer is initialized to <code>NULL</code>.",
    nodes: [],
    top: null, temp: null, arrows: []
  },
  {
    title: "2. Push(10) - Create Node",
    codeLine: 15,
    status: "Action: <b style='color:#7cb473'>push(10)</b>",
    explain: "Allocate a new <code>StackNode</code> with data = 10.",
    nodes: [ { id: 'n1', val: 10, x: 400, y: 80 } ],
    top: null, temp: 'n1', arrows: []
  },
  {
    title: "3. Push(10) - Set Next",
    codeLine: 16,
    status: "Link new node",
    explain: "<code>temp->next = top</code>. Since <code>top</code> is NULL, it points to NULL.",
    nodes: [ { id: 'n1', val: 10, x: 400, y: 80 } ],
    top: null, temp: 'n1', arrows: [{from: 'n1', to: 'null'}]
  },
  {
    title: "4. Push(10) - Update Top",
    codeLine: 17,
    status: "Update <b style='color:#e8a33d'>top</b> pointer",
    explain: "<code>top = temp</code>. The new node is now the top of the stack.",
    nodes: [ { id: 'n1', val: 10, x: 400, y: 80 } ],
    top: 'n1', temp: null, arrows: [{from: 'n1', to: 'null'}]
  },
  {
    title: "5. Push(20) - Create Node",
    codeLine: 15,
    status: "Action: <b style='color:#7cb473'>push(20)</b>",
    explain: "Allocate another <code>StackNode</code> with data = 20.",
    nodes: [ { id: 'n1', val: 10, x: 400, y: 80 }, { id: 'n2', val: 20, x: 220, y: 80 } ],
    top: 'n1', temp: 'n2', arrows: [{from: 'n1', to: 'null'}]
  },
  {
    title: "6. Push(20) - Set Next",
    codeLine: 16,
    status: "Link new node",
    explain: "<code>temp->next = top</code>. It now points to the previous top (10).",
    nodes: [ { id: 'n1', val: 10, x: 400, y: 80 }, { id: 'n2', val: 20, x: 220, y: 80 } ],
    top: 'n1', temp: 'n2', arrows: [{from: 'n1', to: 'null'}, {from: 'n2', to: 'n1'}]
  },
  {
    title: "7. Push(20) - Update Top",
    codeLine: 17,
    status: "Update <b style='color:#e8a33d'>top</b> pointer",
    explain: "<code>top = temp</code>. 20 is now the top of the stack.",
    nodes: [ { id: 'n1', val: 10, x: 400, y: 80 }, { id: 'n2', val: 20, x: 220, y: 80 } ],
    top: 'n2', temp: null, arrows: [{from: 'n1', to: 'null'}, {from: 'n2', to: 'n1'}]
  },
  {
    title: "8. Pop() - Check Empty",
    codeLine: 20,
    status: "Action: <b style='color:#e06c75'>pop()</b>",
    explain: "Check if stack is empty. <code>top</code> is not NULL, so proceed.",
    nodes: [ { id: 'n1', val: 10, x: 400, y: 80 }, { id: 'n2', val: 20, x: 220, y: 80 } ],
    top: 'n2', temp: null, arrows: [{from: 'n1', to: 'null'}, {from: 'n2', to: 'n1'}]
  },
  {
    title: "9. Pop() - Save Data",
    codeLine: 21,
    status: "Save data to return",
    explain: "<code>int popped = top->data</code> (20).",
    nodes: [ { id: 'n1', val: 10, x: 400, y: 80 }, { id: 'n2', val: 20, x: 220, y: 80, active: true } ],
    top: 'n2', temp: null, arrows: [{from: 'n1', to: 'null'}, {from: 'n2', to: 'n1'}], poppedVal: 20
  },
  {
    title: "10. Pop() - Temp to Top",
    codeLine: 22,
    status: "Set temp to top",
    explain: "<code>StackNode* temp = top</code> so we can delete it later.",
    nodes: [ { id: 'n1', val: 10, x: 400, y: 80 }, { id: 'n2', val: 20, x: 220, y: 80, active: true } ],
    top: 'n2', temp: 'n2', arrows: [{from: 'n1', to: 'null'}, {from: 'n2', to: 'n1'}], poppedVal: 20
  },
  {
    title: "11. Pop() - Move Top",
    codeLine: 23,
    status: "Move <b style='color:#e8a33d'>top</b> pointer",
    explain: "<code>top = top->next</code>. The new top is 10.",
    nodes: [ { id: 'n1', val: 10, x: 400, y: 80 }, { id: 'n2', val: 20, x: 220, y: 80, active: true } ],
    top: 'n1', temp: 'n2', arrows: [{from: 'n1', to: 'null'}, {from: 'n2', to: 'n1'}], poppedVal: 20
  },
  {
    title: "12. Pop() - Return Data",
    codeLine: 25,
    status: "Return popped value",
    explain: "Memory for 20 is freed, return 20.",
    nodes: [ { id: 'n1', val: 10, x: 400, y: 80 } ],
    top: 'n1', temp: null, arrows: [{from: 'n1', to: 'null'}], poppedVal: 20
  }
];

const cppCode = `class MyStack {
private:
    struct StackNode {
        int data;
        StackNode* next;
        StackNode(int x) : data(x), next(NULL) {}
    };
    StackNode* top;
public:
    MyStack() : top(NULL) {}
    void push(int x);
    int pop();
};
void MyStack::push(int x) {
    StackNode* temp = new StackNode(x);
    temp->next = top;
    top = temp;
}
int MyStack::pop() {
    if (!top) return -1;
    int popped = top->data;
    StackNode* temp = top;
    top = top->next;
    delete temp;
    return popped;
}`;

const javaCode = `class StackNode {
    int data;
    StackNode next;
    StackNode(int a) {
        data = a;
        next = null;
    }
}

class MyStack {
    StackNode top;
    
    public MyStack() {
        this.top = null;
    }
    
    public void push(int a) {
        StackNode temp = new StackNode(a);
        temp.next = top;
        top = temp;
    }
    
    public int pop() {
        if (top == null) return -1;
        int popped = top.data;
        top = top.next;
        return popped;
    }
}`;

const pythonCode = `class StackNode:
    def __init__(self, data: int):
        self.data = data
        self.next = None

class MyStack:
    def __init__(self):
        self.top = None
        
    def push(self, x: int) -> None:
        temp = StackNode(x)
        temp.next = self.top
        self.top = temp
        
    def pop(self) -> int:
        if not self.top:
            return -1
        popped = self.top.data
        self.top = self.top.next
        return popped
`;

export const approaches = {
  intuitive: {
    title: 'Intuitive: Linked List',
    badge: 'Standard',
    complexity: { time: 'O(1)', space: 'O(N)' },
    steps: optimalSteps,
    solutions: { cpp: cppCode, java: javaCode, python: pythonCode }
  },
  better: {
    title: 'Better: Linked List',
    badge: 'Standard',
    complexity: { time: 'O(1)', space: 'O(N)' },
    steps: optimalSteps,
    solutions: { cpp: cppCode, java: javaCode, python: pythonCode }
  },
  optimal: {
    title: 'Optimal: Linked List',
    badge: 'Optimal',
    complexity: { time: 'O(1)', space: 'O(N)' },
    steps: optimalSteps,
    solutions: { cpp: cppCode, java: javaCode, python: pythonCode }
  }
};

export const solutions = approaches.optimal.solutions;
export const steps     = approaches.optimal.steps;
export const meta = {
  display_id:      'Q-155',
  title:           "Implement Stack Using Linked List",
  category:        "7. Stack and Queues",
  difficulty:      "Medium",
  timeComplexity:  "O(1) for both push and pop operations since we only update pointers at the head.",
  spaceComplexity: "O(N), where N is the total number of elements stored in the stack.",
  description:     "You have a linked list and you have to implement the functionalities push and pop of stack using this given linked list. Your task is to use the class as shown in the comments in the code editor and complete the functions push() and pop() to implement a stack."
};

export default function ImplementStackUsingLinkedListVisualizer({
  currentStep  = 0,
  onStepChange,
  customInput  = '',
  customTarget = '',
  approachTier = 'optimal'
}) {
  const activeApproach = approaches[approachTier] || approaches.optimal;
  const activeSteps    = activeApproach.steps;
  const stepIndex      = Math.min(Math.max(0, currentStep), activeSteps.length - 1);
  const stepData       = activeSteps[stepIndex] || activeSteps[0];

  return (
    <div className="w-full flex flex-col">
      {/* ── Chalkboard Canvas ── */}
      <div className="w-full py-6 flex items-center justify-center">
        <svg viewBox="0 0 620 180" width="100%" height="180">
          <defs>
            <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#5f6f6a"/>
            </marker>
          </defs>
          
          {/* Popped Value Indicator */}
          {stepData.poppedVal !== undefined && (
            <g transform="translate(450, 25)">
               <rect x="0" y="0" width="110" height="30" fill="rgba(232, 163, 61, 0.1)" stroke="#e8a33d" strokeWidth="1" rx="4" />
               <text x="55" y="20" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="14" fill="#e8a33d">
                  popped: {stepData.poppedVal}
               </text>
            </g>
          )}

          {/* Render Arrows */}
          {stepData.arrows.map((arr, i) => {
            const fromNode = stepData.nodes.find(n => n.id === arr.from);
            if (!fromNode) return null;
            
            const startX = fromNode.x + 57.5;
            const startY = fromNode.y + 20;

            if (arr.to === 'null') {
               return (
                 <g key={`arrow-${i}`}>
                   <path d={`M${startX},${startY} L${startX},${startY+35}`} stroke="#5f6f6a" strokeWidth="1.6" fill="none" markerEnd="url(#arrowhead)"/>
                   <text x={startX} y={startY+55} textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="12" fill="#5f6f6a">NULL</text>
                 </g>
               );
            }

            const toNode = stepData.nodes.find(n => n.id === arr.to);
            if (!toNode) return null;
            
            const endX = toNode.x - 2; 
            const endY = toNode.y + 20;

            return (
               <path key={`arrow-${i}`} d={`M${startX},${startY} L${endX},${endY}`} stroke="#5fb3a6" strokeWidth="1.6" fill="none" markerEnd="url(#arrowhead)"/>
            );
          })}

          {/* Render Nodes */}
          {stepData.nodes.map(node => (
             <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                {/* Active Highlight */}
                {node.active && (
                   <rect x="-5" y="-5" width="80" height="50" fill="rgba(224, 108, 117, 0.1)" stroke="#e06c75" strokeWidth="2.2" strokeDasharray="4 2" rx="6" />
                )}
                
                {/* Node Box */}
                <rect x="0" y="0" width="70" height="40" fill="#1c2529" stroke="#5f6f6a" strokeWidth="1.4" rx="3" filter="url(#rough)"/>
                <line x1="45" y1="0" x2="45" y2="40" stroke="rgba(238,241,234,0.15)" strokeWidth="1.4"/>
                
                {/* Value & Pointer Dot */}
                <text x="22.5" y="25.5" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="16" fontWeight="500" fill="#eef1ea">
                  {node.val}
                </text>
                <circle cx="57.5" cy="20" r="3.5" fill="#eef1ea"/>

                {/* Top/Temp Pointer Labels */}
                {(() => {
                   const labels = [];
                   if (stepData.top === node.id) labels.push('top');
                   if (stepData.temp === node.id) labels.push('temp');
                   if (labels.length > 0) {
                      const color = labels.includes('top') ? "#e8a33d" : "#5fb3a6"; 
                      return (
                         <text x="35" y="-12" textAnchor="middle" fontFamily="Kalam, cursive" fontSize="15" fill={color}>
                            {labels.join(', ')}
                            <tspan x="35" y="-2" fontSize="18">↓</tspan>
                         </text>
                      );
                   }
                   return null;
                })()}
             </g>
          ))}
        </svg>
      </div>

      {/* ── Status HUD ── */}
      {stepData.status && (
        <div className="status-line" dangerouslySetInnerHTML={{ __html: stepData.status }} />
      )}

      {/* ── Explanation ── */}
      {stepData.explain && (
        <p className="explain" dangerouslySetInnerHTML={{ __html: stepData.explain }} />
      )}
    </div>
  );
}