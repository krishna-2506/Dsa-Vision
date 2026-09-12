import React from 'react';

export const approaches = {
  intuitive: {
    title: 'Intuitive: Two Pass (Stack)',
    badge: 'O(N) Space',
    complexity: { time: 'O(N)', space: 'O(N)' },
    steps: [
      {
        title: '1. Traverse and store values',
        codeLine: 4,
        status: '<span class="prev-b">Stack: []</span>, <b>curr = 75</b>',
        explain: 'First pass: Traverse the list and push all node values into a stack.',
        nodes: [75, 122, 59],
        links: [
          { next: 1, prev: null },
          { next: 2, prev: 0 },
          { next: null, prev: 1 }
        ],
        currIdx: 0,
        stack: []
      },
      {
        title: '2. Push to stack',
        codeLine: 6,
        status: '<span class="prev-b">Stack: [75]</span>, <b>curr = 122</b>',
        explain: 'Push 75 into stack, move to next node.',
        nodes: [75, 122, 59],
        links: [
          { next: 1, prev: null },
          { next: 2, prev: 0 },
          { next: null, prev: 1 }
        ],
        currIdx: 1,
        stack: [75]
      },
      {
        title: '3. Push to stack',
        codeLine: 6,
        status: '<span class="prev-b">Stack: [75, 122]</span>, <b>curr = 59</b>',
        explain: 'Push 122 into stack, move to next node.',
        nodes: [75, 122, 59],
        links: [
          { next: 1, prev: null },
          { next: 2, prev: 0 },
          { next: null, prev: 1 }
        ],
        currIdx: 2,
        stack: [75, 122]
      },
      {
        title: '4. Push to stack',
        codeLine: 6,
        status: '<span class="prev-b">Stack: [75, 122, 59]</span>, <b>curr = null</b>',
        explain: 'Push 59. Reached end of list. Stack now has values in reverse order.',
        nodes: [75, 122, 59],
        links: [
          { next: 1, prev: null },
          { next: 2, prev: 0 },
          { next: null, prev: 1 }
        ],
        currIdx: null,
        stack: [75, 122, 59]
      },
      {
        title: '5. Second pass: Overwrite values',
        codeLine: 10,
        status: '<span class="prev-b">Stack: [75, 122]</span>, <b>curr = 75 (updates to 59)</b>',
        explain: 'Reset curr to head. Pop from stack and overwrite current node value.',
        nodes: [59, 122, 59],
        links: [
          { next: 1, prev: null },
          { next: 2, prev: 0 },
          { next: null, prev: 1 }
        ],
        currIdx: 0,
        stack: [75, 122]
      },
      {
        title: '6. Overwrite values',
        codeLine: 10,
        status: '<span class="prev-b">Stack: [75]</span>, <b>curr = 122 (updates to 122)</b>',
        explain: 'Pop from stack and overwrite current node value.',
        nodes: [59, 122, 59],
        links: [
          { next: 1, prev: null },
          { next: 2, prev: 0 },
          { next: null, prev: 1 }
        ],
        currIdx: 1,
        stack: [75]
      },
      {
        title: '7. Overwrite values',
        codeLine: 10,
        status: '<span class="prev-b">Stack: []</span>, <b>curr = 59 (updates to 75)</b>',
        explain: 'Pop from stack and overwrite current node value.',
        nodes: [59, 122, 75],
        links: [
          { next: 1, prev: null },
          { next: 2, prev: 0 },
          { next: null, prev: 1 }
        ],
        currIdx: 2,
        stack: []
      },
      {
        title: '8. Return head',
        codeLine: 14,
        status: '<b>Done</b>',
        explain: 'The linked list values are reversed. Pointers remain exactly the same.',
        nodes: [59, 122, 75],
        links: [
          { next: 1, prev: null },
          { next: 2, prev: 0 },
          { next: null, prev: 1 }
        ],
        currIdx: null,
        stack: []
      }
    ],
    solutions: {
      cpp: `// C++ Intuitive approach - O(N) Time, O(N) Space
#include <stack>
Node* reverseDLL(Node *head) {
    stack<int> st;
    Node* curr = head;
    while(curr != NULL) {
        st.push(curr->data);
        curr = curr->next;
    }
    curr = head;
    while(curr != NULL) {
        curr->data = st.top();
        st.pop();
        curr = curr->next;
    }
    return head;
}`,
      java: `// Java Intuitive approach - O(N) Time, O(N) Space
import java.util.Stack;
class Solution {
    public Node reverseDLL(Node head) {
        Stack<Integer> st = new Stack<>();
        Node curr = head;
        while(curr != null) {
            st.push(curr.data);
            curr = curr.next;
        }
        curr = head;
        while(curr != null) {
            curr.data = st.pop();
            curr = curr.next;
        }
        return head;
    }
}`,
      python: `# Python Intuitive approach - O(N) Time, O(N) Space
def reverseDLL(head):
    st = []
    curr = head
    while curr:
        st.append(curr.data)
        curr = curr.next
    curr = head
    while curr:
        curr.data = st.pop()
        curr = curr.next
    return head`
    }
  },
  better: {
    title: 'Better: Pointer Swap Recursive',
    badge: 'Recursive',
    complexity: { time: 'O(N)', space: 'O(N) Stack' },
    steps: [
      {
        title: 'See Optimal for full pointer swap logic.',
        codeLine: 1,
        status: '<b>Note:</b> Same logic as optimal but using call stack',
        explain: 'The recursive approach swaps pointers on the way back up the call stack, but uses O(N) space. Skip to Optimal for the true O(1) space iterative solution.',
        nodes: [75, 122, 59],
        links: [
          { next: 1, prev: null },
          { next: 2, prev: 0 },
          { next: null, prev: 1 }
        ],
        currIdx: null
      }
    ],
    solutions: {
      cpp: `// C++ Recursive Pointer Swap
Node* reverseDLL(Node* curr) {
    if (!curr) return NULL;
    Node* temp = curr->next;
    curr->next = curr->prev;
    curr->prev = temp;
    if (!curr->prev) return curr;
    return reverseDLL(curr->prev);
}`,
      java: `// Java Recursive Pointer Swap
class Solution {
    public Node reverseDLL(Node curr) {
        if (curr == null) return null;
        Node temp = curr.next;
        curr.next = curr.prev;
        curr.prev = temp;
        if (curr.prev == null) return curr;
        return reverseDLL(curr.prev);
    }
}`,
      python: `# Python Recursive Pointer Swap
def reverseDLL(curr):
    if not curr: return None
    temp = curr.next
    curr.next = curr.prev
    curr.prev = temp
    if not curr.prev: return curr
    return reverseDLL(curr.prev)`
    }
  },
  optimal: {
    title: 'Optimal: Single Pass Pointer Swap',
    badge: 'O(1) Space',
    complexity: { time: 'O(N)', space: 'O(1)' },
    steps: [
      {
        title: '1. Initialize pointers',
        codeLine: 2,
        status: '<b>curr = Node(75)</b>, <span class="prev-b">ans = NULL</span>',
        explain: 'We begin at the head node. We will swap the <code>next</code> and <code>prev</code> pointers for every node we visit.',
        nodes: [75, 122, 59],
        links: [
          { next: 1, prev: null },
          { next: 2, prev: 0 },
          { next: null, prev: 1 }
        ],
        currIdx: 0,
        nxtIdx: null,
        ansIdx: null
      },
      {
        title: '2. Save next node',
        codeLine: 5,
        status: '<b>curr = Node(75)</b>, <span class="prev-b">nxt = Node(122)</span>',
        explain: 'Before modifying pointers, we must save <code>curr->next</code> in <code>nxt</code> so we don\'t lose track of the rest of the list.',
        nodes: [75, 122, 59],
        links: [
          { next: 1, prev: null },
          { next: 2, prev: 0 },
          { next: null, prev: 1 }
        ],
        currIdx: 0,
        nxtIdx: 1,
        ansIdx: null
      },
      {
        title: '3. Swap pointers for curr',
        codeLine: 7,
        status: '<b>curr = Node(75)</b>, <span class="prev-b">nxt = Node(122)</span>',
        explain: 'Swap <code>curr->next</code> to point to <code>curr->prev</code> (NULL), and <code>curr->prev</code> to point to <code>nxt</code> (Node 122).',
        nodes: [75, 122, 59],
        links: [
          { next: null, prev: 1 },
          { next: 2, prev: 0 },
          { next: null, prev: 1 }
        ],
        currIdx: 0,
        nxtIdx: 1,
        ansIdx: null
      },
      {
        title: '4. Advance curr',
        codeLine: 11,
        status: '<b>curr = Node(122)</b>',
        explain: 'Move curr forward. Since we swapped pointers, moving "forward" in the original list actually means traversing <code>curr->prev</code>!',
        nodes: [75, 122, 59],
        links: [
          { next: null, prev: 1 },
          { next: 2, prev: 0 },
          { next: null, prev: 1 }
        ],
        currIdx: 1,
        nxtIdx: null,
        ansIdx: null
      },
      {
        title: '5. Save next node',
        codeLine: 5,
        status: '<b>curr = Node(122)</b>, <span class="prev-b">nxt = Node(59)</span>',
        explain: 'Save <code>curr->next</code> (which is Node 59).',
        nodes: [75, 122, 59],
        links: [
          { next: null, prev: 1 },
          { next: 2, prev: 0 },
          { next: null, prev: 1 }
        ],
        currIdx: 1,
        nxtIdx: 2,
        ansIdx: null
      },
      {
        title: '6. Swap pointers for curr',
        codeLine: 7,
        status: '<b>curr = Node(122)</b>, <span class="prev-b">nxt = Node(59)</span>',
        explain: 'Swap! <code>next</code> becomes Node 75, and <code>prev</code> becomes Node 59.',
        nodes: [75, 122, 59],
        links: [
          { next: null, prev: 1 },
          { next: 0, prev: 2 },
          { next: null, prev: 1 }
        ],
        currIdx: 1,
        nxtIdx: 2,
        ansIdx: null
      },
      {
        title: '7. Advance curr',
        codeLine: 11,
        status: '<b>curr = Node(59)</b>',
        explain: 'Move curr to <code>curr->prev</code> (which points to Node 59).',
        nodes: [75, 122, 59],
        links: [
          { next: null, prev: 1 },
          { next: 0, prev: 2 },
          { next: null, prev: 1 }
        ],
        currIdx: 2,
        nxtIdx: null,
        ansIdx: null
      },
      {
        title: '8. Save next node',
        codeLine: 5,
        status: '<b>curr = Node(59)</b>, <span class="prev-b">nxt = NULL</span>',
        explain: 'Save <code>curr->next</code>. This is the last node, so <code>nxt</code> is NULL.',
        nodes: [75, 122, 59],
        links: [
          { next: null, prev: 1 },
          { next: 0, prev: 2 },
          { next: null, prev: 1 }
        ],
        currIdx: 2,
        nxtIdx: null,
        ansIdx: null
      },
      {
        title: '9. Swap pointers for curr',
        codeLine: 7,
        status: '<b>curr = Node(59)</b>, <span class="prev-b">nxt = NULL</span>',
        explain: 'Swap pointers for the last node. <code>next</code> points to Node 122, <code>prev</code> points to NULL.',
        nodes: [75, 122, 59],
        links: [
          { next: null, prev: 1 },
          { next: 0, prev: 2 },
          { next: 1, prev: null }
        ],
        currIdx: 2,
        nxtIdx: null,
        ansIdx: null
      },
      {
        title: '10. Check new head',
        codeLine: 9,
        status: '<b>curr = Node(59)</b>, <span class="prev-b">ans = Node(59)</span>',
        explain: 'Since <code>curr->prev == NULL</code> after swapping, this node is the new head of the reversed list! Save it in <code>ans</code>.',
        nodes: [75, 122, 59],
        links: [
          { next: null, prev: 1 },
          { next: 0, prev: 2 },
          { next: 1, prev: null }
        ],
        currIdx: 2,
        nxtIdx: null,
        ansIdx: 2
      },
      {
        title: '11. Advance curr to NULL',
        codeLine: 11,
        status: '<b>curr = NULL</b>',
        explain: 'Move curr to <code>curr->prev</code>, which is NULL. The loop will terminate.',
        nodes: [75, 122, 59],
        links: [
          { next: null, prev: 1 },
          { next: 0, prev: 2 },
          { next: 1, prev: null }
        ],
        currIdx: null,
        nxtIdx: null,
        ansIdx: 2
      },
      {
        title: '12. Return reversed list',
        codeLine: 13,
        status: '<b>ans = Node(59)</b>',
        explain: 'Return the new head pointer. The doubly linked list is fully reversed!',
        nodes: [75, 122, 59],
        links: [
          { next: null, prev: 1 },
          { next: 0, prev: 2 },
          { next: 1, prev: null }
        ],
        currIdx: null,
        nxtIdx: null,
        ansIdx: 2
      }
    ],
    solutions: {
      cpp: `Node* reverseDLL(Node *head) {
    Node* curr = head;
    Node* ans = NULL;
    while(curr != NULL) {
        Node* nxt = curr->next;
        curr->next = curr->prev;
        curr->prev = nxt;
        if(curr->prev == NULL) {
            ans = curr;
        }
        curr = curr->prev;
    }
    return ans;
}`,
      java: `class Solution {
    public Node reverseDLL(Node head) {
        Node curr = head;
        Node ans = null;
        while (curr != null) {
            Node nxt = curr.next;
            curr.next = curr.prev;
            curr.prev = nxt;
            if (curr.prev == null) {
                ans = curr;
            }
            curr = curr.prev;
        }
        return ans;
    }
}`,
      python: `def reverseDLL(head):
    curr = head
    ans = None
    while curr is not None:
        nxt = curr.next
        curr.next = curr.prev
        curr.prev = nxt
        if curr.prev is None:
            ans = curr
        curr = curr.prev
    return ans`
    }
  }
};

export const solutions = approaches.optimal.solutions;
export const steps = approaches.optimal.steps;
export const meta = {
  display_id: 'Q-093',
  title: 'Reverse DLL',
  category: '4. Linked List',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Given a doubly linked list of n elements. The task is to reverse the doubly linked list.'
};

export default function ReverseDllVisualizer({
  currentStep = 0,
  approachTier = 'optimal'
}) {
  const activeApproach = approaches[approachTier] || approaches.optimal;
  const activeSteps = activeApproach.steps;
  const stepIndex = Math.min(Math.max(0, currentStep), activeSteps.length - 1);
  const stepData = activeSteps[stepIndex] || activeSteps[0];

  const nodeWidth = 60;
  const nodeHeight = 40;
  const nodeSpacing = 160;
  const startX = 100;
  const startY = 80;

  const renderArrow = (fromIdx, toIdx, type, isNull) => {
    const isSwapped = (type === 'next' && toIdx < fromIdx) || (type === 'prev' && toIdx > fromIdx);
    
    const x1 = startX + fromIdx * nodeSpacing;
    const y1 = startY;
    
    if (isNull) {
      // Draw short line dropping down to represent NULL
      const nullX = x1 + (type === 'next' ? (isSwapped ? -30 : 30) : (isSwapped ? 30 : -30));
      const nullY = y1 + (type === 'next' ? -35 : 35);
      
      return (
        <g key={`null-${fromIdx}-${type}`}>
          <path
            d={`M ${type === 'next' ? x1 + 10 : x1 - 10} ${type === 'next' ? y1 - nodeHeight/2 : y1 + nodeHeight/2} L ${nullX} ${nullY}`}
            stroke="var(--chalk-dim)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            markerEnd="url(#arrowhead)"
            fill="none"
          />
          <text x={nullX} y={nullY + (type === 'next' ? -5 : 12)} fill="var(--chalk-faint)" fontSize="10" fontWeight="bold" textAnchor="middle">
            NULL
          </text>
        </g>
      );
    }
    
    const x2 = startX + toIdx * nodeSpacing;
    const y2 = startY;

    let pathD = '';
    
    if (type === 'next') {
      if (toIdx > fromIdx) { // Normal Next (rightward)
        pathD = `M ${x1 + nodeWidth/2} ${y1 - 10} Q ${(x1 + x2)/2} ${y1 - 30} ${x2 - nodeWidth/2 - 4} ${y2 - 10}`;
      } else { // Swapped Next (leftward)
        pathD = `M ${x1 - nodeWidth/2} ${y1 - 10} Q ${(x1 + x2)/2} ${y1 - 70} ${x2 + nodeWidth/2 + 4} ${y2 - 10}`;
      }
    } else {
      if (toIdx < fromIdx) { // Normal Prev (leftward)
        pathD = `M ${x1 - nodeWidth/2} ${y1 + 10} Q ${(x1 + x2)/2} ${y1 + 30} ${x2 + nodeWidth/2 + 4} ${y2 + 10}`;
      } else { // Swapped Prev (rightward)
        pathD = `M ${x1 + nodeWidth/2} ${y1 + 10} Q ${(x1 + x2)/2} ${y1 + 70} ${x2 - nodeWidth/2 - 4} ${y2 + 10}`;
      }
    }

    const strokeColor = type === 'next' ? 'var(--indigo)' : 'var(--teal)';

    return (
      <path
        key={`${fromIdx}-${toIdx}-${type}`}
        d={pathD}
        stroke={strokeColor}
        strokeWidth="2"
        fill="none"
        markerEnd={`url(#arrowhead-${type})`}
      />
    );
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full py-6 flex items-center justify-center">
        <svg viewBox="0 0 620 220" width="100%" height="220" className="max-w-full">
          <defs>
            <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--chalk-dim)"/>
            </marker>
            <marker id="arrowhead-next" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--indigo)"/>
            </marker>
            <marker id="arrowhead-prev" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--teal)"/>
            </marker>
          </defs>

          {/* Draw Links */}
          {stepData.links && stepData.links.map((link, idx) => (
            <g key={`links-${idx}`}>
              {renderArrow(idx, link.next, 'next', link.next === null)}
              {renderArrow(idx, link.prev, 'prev', link.prev === null)}
            </g>
          ))}

          {/* Draw Nodes */}
          {stepData.nodes && stepData.nodes.map((val, idx) => {
            const cx = startX + idx * nodeSpacing;
            const cy = startY;
            const isActive = stepData.currIdx === idx;
            const isAns = stepData.ansIdx === idx;
            const isNxt = stepData.nxtIdx === idx;

            return (
              <g key={`node-${idx}`}>
                <rect
                  x={cx - nodeWidth / 2}
                  y={cy - nodeHeight / 2}
                  width={nodeWidth}
                  height={nodeHeight}
                  rx="6"
                  fill="var(--board-raised)"
                  stroke={isActive ? "var(--indigo)" : (isAns ? "var(--easy)" : "var(--line)")}
                  strokeWidth={isActive || isAns ? "2.4" : "1.5"}
                />
                <text
                  x={cx}
                  y={cy + 5}
                  fill="var(--chalk)"
                  fontFamily="'JetBrains Mono', monospace"
                  fontSize="15"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  {val}
                </text>
                
                {/* Labels */}
                {isActive && (
                  <text x={cx} y={cy - nodeHeight/2 - 12} fill="var(--indigo)" fontSize="13" fontWeight="bold" textAnchor="middle">
                    curr
                  </text>
                )}
                {isNxt && (
                  <text x={cx} y={cy - nodeHeight/2 - (isActive ? 28 : 12)} fill="var(--teal)" fontSize="13" fontWeight="bold" textAnchor="middle">
                    nxt
                  </text>
                )}
                {isAns && (
                  <text x={cx} y={cy + nodeHeight/2 + 20} fill="var(--easy)" fontSize="13" fontWeight="bold" textAnchor="middle">
                    ans
                  </text>
                )}
              </g>
            );
          })}

          {/* Intuitive Stack Visualization */}
          {stepData.stack !== undefined && (
            <g transform="translate(480, 50)">
              <text x="0" y="-10" fill="var(--chalk)" fontSize="13" fontWeight="bold">Stack (LIFO)</text>
              <rect x="-10" y="0" width="70" height="120" fill="none" stroke="var(--line)" strokeWidth="1.5" strokeDasharray="4 4" />
              {stepData.stack.map((val, i) => (
                <g key={`stack-${i}`} transform={`translate(0, ${100 - i * 30})`}>
                  <rect x="0" y="-20" width="50" height="26" rx="4" fill="var(--board-raised)" stroke="var(--teal)" strokeWidth="1.5" />
                  <text x="25" y="-2" fill="var(--chalk)" fontFamily="'JetBrains Mono', monospace" fontSize="13" fontWeight="600" textAnchor="middle">{val}</text>
                </g>
              ))}
            </g>
          )}

          {/* Pointer Legend for Optimal Approach */}
          {!stepData.stack && (
            <g transform="translate(10, 190)">
              <rect x="0" y="0" width="12" height="12" rx="2" fill="var(--indigo)" />
              <text x="18" y="10" fill="var(--chalk-dim)" fontSize="11" fontFamily="'Plus Jakarta Sans', sans-serif">Next Pointer</text>
              
              <rect x="100" y="0" width="12" height="12" rx="2" fill="var(--teal)" />
              <text x="118" y="10" fill="var(--chalk-dim)" fontSize="11" fontFamily="'Plus Jakarta Sans', sans-serif">Prev Pointer</text>
            </g>
          )}
        </svg>
      </div>

      {stepData.status && (
        <div className="status-line text-center w-full mt-2" dangerouslySetInnerHTML={{ __html: stepData.status }} />
      )}

      {stepData.explain && (
        <p className="explain text-center w-full mt-2 text-sm text-[var(--chalk-dim)]" dangerouslySetInnerHTML={{ __html: stepData.explain }} />
      )}
    </div>
  );
}