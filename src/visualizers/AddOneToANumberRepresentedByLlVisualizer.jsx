import React from 'react';

export const meta = {
  title: 'Add One to a Number Represented by LL',
  category: 'Linked List',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) recursive call stack',
  description: 'Adds 1 to a number represented as a linked list (most significant digit at head) using an elegant backtracking recursion to propagate carry from the tail node back to the head.'
};

export const solutions = {
  cpp: `// C++ Recursive Backtracking Carry Propagation
// Time Complexity: O(N) | Space Complexity: O(N) recursive stack
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class Solution {
    int addHelper(Node* temp) {
        if (temp == nullptr) return 1; // Base case: carry 1 from the virtual right
        
        int carry = addHelper(temp->next);
        temp->data += carry;
        
        if (temp->data < 10) return 0; // No further carry
        
        temp->data = 0;
        return 1; // Carry forwards
    }

public:
    Node* addOne(Node* head) {
        int carry = addHelper(head);
        if (carry == 1) {
            Node* newHead = new Node(1);
            newHead->next = head;
            return newHead;
        }
        return head;
    }
};`,
  python: `# Python 3 Recursive Backtracking Add 1 to LL
class Node:
    def __init__(self, data=0, next=None):
        self.data = data
        self.next = next

class Solution:
    def addOne(self, head: Node) -> Node:
        def add_helper(node):
            if not node:
                return 1
            
            carry = add_helper(node.next)
            node.data += carry
            
            if node.data < 10:
                return 0
            
            node.data = 0
            return 1

        carry = add_helper(head)
        if carry == 1:
            new_head = Node(1)
            new_head.next = head
            return new_head
        return head`,
  java: `// Java Recursive Backtracking Add 1 to LL
class Node {
    int data;
    Node next;
    Node(int data) {
        this.data = data;
        this.next = null;
    }
}

class Solution {
    private int addHelper(Node temp) {
        if (temp == null) return 1;

        int carry = addHelper(temp.next);
        temp.data += carry;

        if (temp.data < 10) return 0;

        temp.data = 0;
        return 1;
    }

    public Node addOne(Node head) {
        int carry = addHelper(head);
        if (carry == 1) {
            Node newHead = new Node(1);
            newHead.next = head;
            return newHead;
        }
        return head;
    }
}`,
  javascript: `// JavaScript Recursive Backtracking Add 1 to LL
var addOne = function(head) {
    const addHelper = (temp) => {
        if (!temp) return 1;

        const carry = addHelper(temp.next);
        temp.data += carry;

        if (temp.data < 10) return 0;

        temp.data = 0;
        return 1;
    };

    const carry = addHelper(head);
    if (carry === 1) {
        const newHead = { data: 1, next: head };
        return newHead;
    }
    return head;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: Add 1 to Number [1 -> 9 -> 9] (199 + 1 = 200)',
    phase: 'INITIAL',
    codeLine: 28,
    nodes: [1, 9, 9],
    activeIdx: null,
    carry: null,
    variables: { inputNumber: 199, operation: '+ 1', expected: 200 },
    explain: 'The linked list represents number 199 with head at 1. We must add 1 at the least significant digit (tail 9) and carry leftwards.',
    intuition: 'Instead of reversing the list twice, recursion naturally explores to NULL and unwinds back right-to-left.'
  },
  {
    title: '2. Recurse to Tail Node(9 at index 2): Add Base Carry = 1',
    phase: 'TAIL_ADD',
    codeLine: 16,
    nodes: [1, 9, 0],
    activeIdx: 2,
    carry: 1,
    variables: { nodeIndex: 2, calculation: '9 + 1 = 10', 'node->data': 0, returnCarry: 1 },
    explain: 'Base case returns carry = 1. Tail node becomes 9 + 1 = 10. Since 10 >= 10, set data = 0 and return carry = 1.',
    intuition: 'Digit 9 overflows to 0 with a carry of 1.'
  },
  {
    title: '3. Backtrack to Middle Node(9 at index 1): Add Carry = 1',
    phase: 'PROPAGATE_CARRY',
    codeLine: 18,
    nodes: [1, 0, 0],
    activeIdx: 1,
    carry: 1,
    variables: { nodeIndex: 1, calculation: '9 + 1 = 10', 'node->data': 0, returnCarry: 1 },
    explain: 'Receive carry 1 from right. Middle node becomes 9 + 1 = 10. Set data = 0 and pass carry = 1 to the left.',
    intuition: 'Cascade of carry continues to unwind.'
  },
  {
    title: '4. Backtrack to Head Node(1 at index 0): Add Carry = 1',
    phase: 'HEAD_ADD',
    codeLine: 20,
    nodes: [2, 0, 0],
    activeIdx: 0,
    carry: 0,
    variables: { nodeIndex: 0, calculation: '1 + 1 = 2', 'node->data': 2, returnCarry: 0 },
    explain: 'Receive carry 1 from right. Head node becomes 1 + 1 = 2. Since 2 < 10, data stays 2 and carry becomes 0!',
    intuition: 'Carry absorbed! No extra node needed at front.'
  },
  {
    title: '5. Completed: Result List is [2 -> 0 -> 0] = 200',
    phase: 'COMPLETE',
    codeLine: 34,
    nodes: [2, 0, 0],
    activeIdx: null,
    carry: 0,
    variables: { finalResult: 200, carryOut: 0, newNodesCreated: 0 },
    explain: 'Recursion finishes unwinding. Carry is 0, so original head is returned. Result 200 is correct.',
    intuition: 'Single-pass recursive carry propagation solves in O(N) time without reversing links.'
  }
];

export default function AddOneToANumberRepresentedByLlVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          Operation: Number + 1
        </span>
        {step.carry !== null && (
          <span className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold ${
            step.carry === 1 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
          }`}>
            Active Carry = {step.carry}
          </span>
        )}
      </div>

      {/* Visual LinkedList Chain */}
      <div className="w-full p-6 rounded-2xl bg-[#161824] border border-[#272b3c] flex items-center justify-center overflow-x-auto gap-2 py-8">
        {step.nodes.map((val, idx) => {
          const isActive = step.activeIdx === idx;
          const isUpdated = idx >= (step.activeIdx ?? 99);

          let nodeStyle = 'bg-[#12131b] border-[#272b3c] text-white';
          if (isActive) {
            nodeStyle = 'bg-amber-500/25 border-amber-400 text-amber-200 scale-110 shadow-lg shadow-amber-500/25';
          } else if (isUpdated) {
            nodeStyle = 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300';
          }

          return (
            <React.Fragment key={idx}>
              <div className="relative flex flex-col items-center">
                {isActive && (
                  <div className="absolute -top-7 flex flex-col items-center">
                    <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30 animate-pulse">
                      + carry
                    </span>
                    <div className="w-px h-2 bg-amber-400"></div>
                  </div>
                )}

                <div className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center font-mono font-bold text-lg transition-all ${nodeStyle}`}>
                  {val}
                </div>

                <span className="text-[10px] font-mono text-[#5b6076] mt-1">
                  {idx === 0 ? 'head [100s]' : idx === 1 ? '[10s]' : '[1s]'}
                </span>
              </div>

              {/* Arrow */}
              <div className="text-base font-bold text-[#8a8ea3]">&rarr;</div>
            </React.Fragment>
          );
        })}

        {/* NULL */}
        <div className="w-14 h-14 rounded-xl border border-dashed border-[#3b4261] bg-[#101117] flex items-center justify-center font-mono text-xs text-[#8a8ea3]">
          NULL
        </div>
      </div>

      {/* Result Value Banner */}
      <div className="w-full p-4 rounded-xl bg-[#12131b] border border-[#202436] flex items-center justify-center gap-3 font-mono text-sm">
        <span className="text-[#8a8ea3]">Current List Value:</span>
        <span className="text-2xl font-bold text-white tracking-widest">{step.nodes.join('')}</span>
      </div>
    </div>
  );
}
