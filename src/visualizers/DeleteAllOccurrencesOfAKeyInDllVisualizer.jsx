import React from 'react';

export const approaches = {
  intuitive: {
    title: 'Intuitive: Linear Traversal',
    badge: 'Standard Traversal',
    complexity: { time: 'O(N)', space: 'O(1)' },
    steps: [
      {
        title: '1. Initialize traversal pointer',
        codeLine: 3,
        status: '<b>temp = Node(1)</b>',
        explain: 'Start at the head of the list. We need to delete the node at position <span class="note">x = 3</span>.',
        temp: 0, prev: null, nxt: null,
        nextLinks: [{ f: 0, t: 1 }, { f: 1, t: 2 }, { f: 2, t: 3 }],
        prevLinks: [{ f: 1, t: 0 }, { f: 2, t: 1 }, { f: 3, t: 2 }],
        fadedNodes: []
      },
      {
        title: '2. Check head condition',
        codeLine: 6,
        status: '<span class="prev-b">x == 1</span> is false',
        explain: 'The node to delete is not the head, so we skip the head deletion logic and prepare to traverse.',
        temp: 0, prev: null, nxt: null,
        nextLinks: [{ f: 0, t: 1 }, { f: 1, t: 2 }, { f: 2, t: 3 }],
        prevLinks: [{ f: 1, t: 0 }, { f: 2, t: 1 }, { f: 3, t: 2 }],
        fadedNodes: []
      },
      {
        title: '3. Traverse to position (i=1)',
        codeLine: 15,
        status: '<b>temp = Node(5)</b>',
        explain: 'Advance <span class="note">temp</span> pointer to the next node. We are now at position 2.',
        temp: 1, prev: null, nxt: null,
        nextLinks: [{ f: 0, t: 1 }, { f: 1, t: 2 }, { f: 2, t: 3 }],
        prevLinks: [{ f: 1, t: 0 }, { f: 2, t: 1 }, { f: 3, t: 2 }],
        fadedNodes: []
      },
      {
        title: '4. Traverse to position (i=2)',
        codeLine: 15,
        status: '<b>temp = Node(2)</b>',
        explain: 'Advance <span class="note">temp</span> again. We have now reached position <span class="note">x = 3</span>, the node to delete.',
        temp: 2, prev: null, nxt: null,
        nextLinks: [{ f: 0, t: 1 }, { f: 1, t: 2 }, { f: 2, t: 3 }],
        prevLinks: [{ f: 1, t: 0 }, { f: 2, t: 1 }, { f: 3, t: 2 }],
        fadedNodes: []
      },
      {
        title: '5. Identify adjacent nodes',
        codeLine: 20,
        status: '<span class="prev-b">previous = Node(5)</span>, <span class="prev-b">nextNode = Node(9)</span>',
        explain: 'Capture the nodes immediately before and after <span class="note">temp</span> so we can link them directly.',
        temp: 2, prev: 1, nxt: 3,
        nextLinks: [{ f: 0, t: 1 }, { f: 1, t: 2 }, { f: 2, t: 3 }],
        prevLinks: [{ f: 1, t: 0 }, { f: 2, t: 1 }, { f: 3, t: 2 }],
        fadedNodes: []
      },
      {
        title: '6. Update forward link',
        codeLine: 22,
        status: 'previous->next = <span class="prev-b">nextNode</span>',
        explain: 'Route the forward arrow from Node(5) to bypass Node(2) and point straight to Node(9).',
        temp: 2, prev: 1, nxt: 3,
        nextLinks: [{ f: 0, t: 1 }, { f: 1, t: 3, arc: true }, { f: 2, t: 3, faded: true }],
        prevLinks: [{ f: 1, t: 0 }, { f: 2, t: 1 }, { f: 3, t: 2 }],
        fadedNodes: []
      },
      {
        title: '7. Update backward link',
        codeLine: 24,
        status: 'nextNode->prev = <span class="prev-b">previous</span>',
        explain: 'Route the backward arrow from Node(9) to bypass Node(2) and point straight back to Node(5).',
        temp: 2, prev: 1, nxt: 3,
        nextLinks: [{ f: 0, t: 1 }, { f: 1, t: 3, arc: true }, { f: 2, t: 3, faded: true }],
        prevLinks: [{ f: 1, t: 0 }, { f: 3, t: 1, arc: true }, { f: 2, t: 1, faded: true }],
        fadedNodes: []
      },
      {
        title: '8. Delete target node',
        codeLine: 27,
        status: 'delete <b>temp</b>',
        explain: 'Free the memory of the bypassed node. The doubly linked list is now fully contiguous without it.',
        temp: null, prev: 1, nxt: 3,
        nextLinks: [{ f: 0, t: 1 }, { f: 1, t: 3, arc: true }],
        prevLinks: [{ f: 1, t: 0 }, { f: 3, t: 1, arc: true }],
        fadedNodes: [2]
      }
    ],
    solutions: {
      cpp: `// C++ Optimal Solution — O(N)
Node* deleteNode(Node *head_ref, int x) {
  Node* temp = head_ref;
  
  // If the node to be deleted is the head node
  if (x == 1) {
    head_ref = head_ref->next;
    if (head_ref) head_ref->prev = NULL;
    delete temp;
    return head_ref;
  }
  
  // Traverse to the node at position x
  for (int i = 1; i < x; i++) {
    temp = temp->next;
  }
  
  // Update next and prev pointers to bypass the node
  Node* previous = temp->prev;
  Node* nextNode = temp->next;
  
  previous->next = nextNode;
  if (nextNode) {
    nextNode->prev = previous;
  }
  
  delete temp;
  return head_ref;
}`,
      java: `// Java Optimal Solution — O(N)
class Solution {
    public Node deleteNode(Node head_ref, int x) {
        Node temp = head_ref;
        
        // If the node to be deleted is the head node
        if (x == 1) {
            head_ref = head_ref.next;
            if (head_ref != null) head_ref.prev = null;
            return head_ref;
        }
        
        // Traverse to the node at position x
        for (int i = 1; i < x; i++) {
            temp = temp.next;
        }
        
        // Update next and prev pointers to bypass the node
        Node previous = temp.prev;
        Node nextNode = temp.next;
        
        previous.next = nextNode;
        if (nextNode != null) {
            nextNode.prev = previous;
        }
        
        return head_ref;
    }
}`,
      python: `# Python Optimal Solution — O(N)
def deleteNode(head_ref, x):
    temp = head_ref
    
    # If the node to be deleted is the head node
    if x == 1:
        head_ref = head_ref.next
        if head_ref:
            head_ref.prev = None
        return head_ref
        
    # Traverse to the node at position x
    for i in range(1, x):
        temp = temp.next
        
    # Update next and prev pointers to bypass the node
    previous = temp.prev
    nextNode = temp.next
    
    previous.next = nextNode
    if nextNode:
        nextNode.prev = previous
        
    return head_ref
`
    }
  },
  better: {
    title: 'Better: Linear Traversal',
    badge: 'Standard Traversal',
    complexity: { time: 'O(N)', space: 'O(1)' },
    steps: [ /* Fallback to same as intuitive */ ],
    solutions: { cpp: '', java: '', python: '' }
  },
  optimal: {
    title: 'Optimal: In-Place Deletion',
    badge: 'Optimal',
    complexity: { time: 'O(N) traversal in the worst case (deleting tail). If deleting head, O(1).', space: 'O(1) auxiliary space as we only store temporary pointer references.' },
    steps: [ /* Fallback to same as intuitive */ ],
    solutions: { cpp: '', java: '', python: '' }
  }
};

// Map empty tiers to the intuitive standard implementation since DLL deletion relies on a single fundamental mechanism.
approaches.better.steps = approaches.intuitive.steps;
approaches.optimal.steps = approaches.intuitive.steps;
approaches.better.solutions = approaches.intuitive.solutions;
approaches.optimal.solutions = approaches.intuitive.solutions;

export const solutions = approaches.optimal.solutions;
export const steps = approaches.optimal.steps;
export const meta = {
  display_id: 'Q-092',
  title: "Delete Node In DLL",
  category: "4. Linked List",
  difficulty: "Medium",
  timeComplexity: "O(N) because in the worst case we traverse up to the N-th node to find the position.",
  spaceComplexity: "O(1) since we only use a constant number of pointer variables (`temp`, `previous`, `nextNode`).",
  description: "Given a doubly linked list and a position. The task is to delete a node from given position in a doubly linked list.\r\n\r\nExample 1:\r\n\r\nInput:\r\nLinkedList = 1 <--"
};

export default function DeleteNodeInDllVisualizer({
  currentStep = 0,
  _onStepChange,
  _customInput = '',
  _customTarget = '',
  approachTier = 'optimal'
}) {
  const activeApproach = approaches[approachTier] || approaches.optimal;
  const activeSteps = activeApproach.steps;
  const stepIndex = Math.min(Math.max(0, currentStep), activeSteps.length - 1);
  const stepData = activeSteps[stepIndex] || activeSteps[0];

  // List data configuration
  const nodeValues = [1, 5, 2, 9];
  const nodeWidth = 80;
  const nodeHeight = 40;
  const gap = 50;
  const startX = 60;
  const startY = 90;

  const getX = (id) => startX + id * (nodeWidth + gap);

  return (
    <div className="w-full flex flex-col">
      <style dangerouslySetInnerHTML={{ __html: `
        .status-line { font-family: 'IBM Plex Mono', monospace; color: #8fa09a; font-size: 14px; text-align: center; }
        .status-line b { color: #e8a33d; font-weight: 500; }
        .status-line .prev-b { color: #5fb3a6; font-weight: 500; }
        .explain { font-family: 'IBM Plex Mono', monospace; color: #8fa09a; font-size: 13.5px; margin-top: 8px; text-align: center; }
        .explain .note { font-family: 'Kalam', cursive; color: #e8a33d; font-size: 15px; }
      `}} />

      {/* ── Chalkboard Canvas ── */}
      <div className="w-full py-4 flex items-center justify-center">
        <svg viewBox="0 0 620 230" width="100%" height="230">
          <defs>
            <filter id="rough" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            
            <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#5f6f6a"/>
            </marker>
            <marker id="arrowhead-faded" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#5f6f6a" opacity="0.3"/>
            </marker>
            <marker id="arrowhead-active" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#eef1ea"/>
            </marker>
          </defs>

          {/* ── Draw Next Links ── */}
          {stepData.nextLinks.map((link, idx) => {
            const sx = getX(link.f) + nodeWidth;
            const sy = startY + 12;
            const tx = getX(link.t);
            const ty = startY + 12;
            
            let path;
            if (link.arc) {
              const midX = (sx + tx) / 2;
              path = `M ${sx} ${sy} Q ${midX} ${sy - 60} ${tx} ${ty}`;
            } else {
              path = `M ${sx} ${sy} L ${tx} ${ty}`;
            }

            return (
              <path 
                key={`n-${idx}`} 
                d={path} 
                fill="none" 
                stroke={link.arc ? "#eef1ea" : "#5f6f6a"} 
                strokeWidth={link.arc ? 1.8 : 1.2} 
                opacity={link.faded ? 0.3 : 1}
                markerEnd={`url(#${link.arc ? 'arrowhead-active' : link.faded ? 'arrowhead-faded' : 'arrowhead'})`}
                filter="url(#rough)"
                className="transition-all duration-500 ease-in-out"
              />
            );
          })}

          {/* ── Draw Prev Links ── */}
          {stepData.prevLinks.map((link, idx) => {
            const sx = getX(link.f);
            const sy = startY + 28;
            const tx = getX(link.t) + nodeWidth;
            const ty = startY + 28;
            
            let path;
            if (link.arc) {
              const midX = (sx + tx) / 2;
              path = `M ${sx} ${sy} Q ${midX} ${sy + 60} ${tx} ${ty}`;
            } else {
              path = `M ${sx} ${sy} L ${tx} ${ty}`;
            }

            return (
              <path 
                key={`p-${idx}`} 
                d={path} 
                fill="none" 
                stroke={link.arc ? "#eef1ea" : "#5f6f6a"} 
                strokeWidth={link.arc ? 1.8 : 1.2} 
                opacity={link.faded ? 0.3 : 1}
                markerEnd={`url(#${link.arc ? 'arrowhead-active' : link.faded ? 'arrowhead-faded' : 'arrowhead'})`}
                filter="url(#rough)"
                className="transition-all duration-500 ease-in-out"
              />
            );
          })}

          {/* ── Draw Nodes ── */}
          {nodeValues.map((val, id) => {
            const x = getX(id);
            const y = startY;
            const isFaded = stepData.fadedNodes.includes(id);
            const isTemp = stepData.temp === id;
            const isPrev = stepData.prev === id;
            const isNxt = stepData.nxt === id;

            return (
              <g key={id} style={{ opacity: isFaded ? 0.2 : 1, transition: 'opacity 0.5s' }}>
                {/* Highlight Rings */}
                {isTemp && (
                  <rect x={x-5} y={y-5} width={nodeWidth+10} height={nodeHeight+10} rx="6" fill="none" stroke="#e8a33d" strokeWidth="2.2" filter="url(#rough)" />
                )}
                {(isPrev || isNxt) && !isTemp && (
                  <rect x={x-5} y={y-5} width={nodeWidth+10} height={nodeHeight+10} rx="6" fill="none" stroke="#5fb3a6" strokeWidth="1.6" strokeDasharray="3 4" filter="url(#rough)" />
                )}

                {/* Node Box */}
                <rect x={x} y={y} width={nodeWidth} height={nodeHeight} rx="3" fill="#1c2529" stroke="#5f6f6a" strokeWidth="1.4" filter="url(#rough)" />
                
                {/* Compartment Dividers */}
                <path d={`M ${x+20} ${y} L ${x+20} ${y+nodeHeight}`} stroke="#5f6f6a" strokeWidth="1.4" opacity="0.6" filter="url(#rough)" />
                <path d={`M ${x+60} ${y} L ${x+60} ${y+nodeHeight}`} stroke="#5f6f6a" strokeWidth="1.4" opacity="0.6" filter="url(#rough)" />

                {/* Data Value */}
                <text x={x+40} y={y+26} fontFamily="IBM Plex Mono, monospace" fontSize="16" fontWeight="500" fill="#eef1ea" textAnchor="middle">
                  {val}
                </text>
                
                {/* Labels inside compartments */}
                <text x={x+10} y={y+24} fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="#5f6f6a" textAnchor="middle" transform={`rotate(-90, ${x+10}, ${y+24})`}>
                  PREV
                </text>
                <text x={x+70} y={y+24} fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="#5f6f6a" textAnchor="middle" transform={`rotate(90, ${x+70}, ${y+24})`}>
                  NEXT
                </text>

                {/* Index Label */}
                <text x={x+40} y={y+58} fontFamily="IBM Plex Mono, monospace" fontSize="10.5" fill="#5f6f6a" textAnchor="middle">
                  pos {id + 1}
                </text>

                {/* Pointer Tags */}
                {isTemp && (
                  <text x={x+40} y={y+78} fontFamily="Kalam, cursive" fontSize="15" fill="#e8a33d" textAnchor="middle" filter="url(#rough)">
                    temp
                  </text>
                )}
                {isPrev && (
                  <text x={x+40} y={y-15} fontFamily="Kalam, cursive" fontSize="14" fill="#5fb3a6" textAnchor="middle" filter="url(#rough)">
                    previous
                  </text>
                )}
                {isNxt && (
                  <text x={x+40} y={y-15} fontFamily="Kalam, cursive" fontSize="14" fill="#5fb3a6" textAnchor="middle" filter="url(#rough)">
                    nextNode
                  </text>
                )}
              </g>
            );
          })}
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