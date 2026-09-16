import React from 'react';

export const meta = {
  title: 'Insertion at the Head of Linked List',
  category: 'Linked List',
  difficulty: 'Easy',
  timeComplexity: 'O(1)',
  spaceComplexity: 'O(1)',
  description: 'Inserts a new node at the beginning of a singly linked list in O(1) time by creating a new node, pointing its next pointer to the current head, and reassigning head.'
};

export const solutions = {
  cpp: `// C++ O(1) Insertion at Head of Singly Linked List
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class Solution {
public:
    Node* insertAtHead(Node* head, int val) {
        Node* newNode = new Node(val);
        newNode->next = head;
        head = newNode;
        return head;
    }
};`,
  python: `# Python 3 O(1) Insertion at Head of Linked List
class Node:
    def __init__(self, data=0, next=None):
        self.data = data
        self.next = next

class Solution:
    def insertAtHead(self, head: Node, val: int) -> Node:
        new_node = Node(val)
        new_node.next = head
        head = new_node
        return head`,
  java: `// Java O(1) Insertion at Head of Linked List
class Node {
    int data;
    Node next;
    Node(int data) {
        this.data = data;
        this.next = null;
    }
}

class Solution {
    public Node insertAtHead(Node head, int val) {
        Node newNode = new Node(val);
        newNode.next = head;
        head = newNode;
        return head;
    }
}`,
  javascript: `// JavaScript O(1) Insertion at Head of Linked List
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

var insertAtHead = function(head, val) {
    const newNode = new Node(val);
    newNode.next = head;
    head = newNode;
    return head;
};`
};

export const steps = [
  {
    title: '1. Initial State: Existing List [10 -> 20 -> 30 -> NULL], Insert Val = 5',
    phase: 'INITIAL',
    codeLine: 14,
    nodes: [10, 20, 30],
    newNodeVal: 5,
    newNodeLinked: false,
    headIdx: 0,
    variables: { insertVal: 5, currentHead: 10, list: '[10 -> 20 -> 30]' },
    explain: 'Current list has head pointing to node 10. We want to prepend node with value 5.',
    intuition: 'Inserting at head requires zero traversals — only 2 pointer assignments in constant O(1) time.'
  },
  {
    title: '2. Allocate New Node(5) in Memory',
    phase: 'CREATE_NODE',
    codeLine: 15,
    nodes: [10, 20, 30],
    newNodeVal: 5,
    newNodeLinked: false,
    headIdx: 0,
    variables: { newNode: 'Node(5)', 'newNode->next': 'NULL', head: 'Node(10)' },
    explain: 'Node* newNode = new Node(5) creates the new element in heap memory. Its next pointer initially defaults to NULL.',
    intuition: 'Prepare the node before linking it into the chain.'
  },
  {
    title: '3. Link newNode->next = head',
    phase: 'LINK_NEXT',
    codeLine: 16,
    nodes: [10, 20, 30],
    newNodeVal: 5,
    newNodeLinked: true,
    headIdx: 0,
    variables: { 'newNode->next': 'Node(10)', status: 'Connected to existing list' },
    explain: 'Point newNode->next to the current head (10). Now newNode references the entire subsequent list.',
    intuition: 'Crucial order: always connect newNode->next to head BEFORE moving head, otherwise references to the rest of the list are lost!'
  },
  {
    title: '4. Update head = newNode: List is now [5 -> 10 -> 20 -> 30 -> NULL]',
    phase: 'UPDATE_HEAD',
    codeLine: 17,
    nodes: [5, 10, 20, 30],
    newNodeVal: null,
    newNodeLinked: false,
    headIdx: 0,
    variables: { newHead: 5, length: 4, operation: 'Complete O(1)' },
    explain: 'Reassign head to point to the new node (5). The insertion is complete in O(1) time and O(1) auxiliary space.',
    intuition: 'Head pointer updated. Return new head.'
  }
];

export default function InsertionAtTheHeadOfLinkedListVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          Operation: Insert at Head
        </span>
        {step.newNodeVal !== null && (
          <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold">
            New Node Value = {step.newNodeVal}
          </span>
        )}
      </div>

      {/* Visual LinkedList Chain */}
      <div className="w-full p-6 rounded-2xl bg-[#161824] border border-[#272b3c] flex flex-col items-center gap-6">
        {/* Floating New Node Stage */}
        {step.newNodeVal !== null && (
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
              newNode
            </span>
            <div className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center font-mono text-lg font-bold ${
              step.newNodeLinked ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300' : 'border-amber-400 bg-amber-500/20 text-amber-300'
            }`}>
              {step.newNodeVal}
            </div>
            {step.newNodeLinked && (
              <span className="text-xs font-mono text-emerald-400">newNode &rarr; head (10)</span>
            )}
          </div>
        )}

        {/* Existing List Nodes */}
        <div className="flex items-center justify-center flex-wrap gap-2 py-2">
          {step.nodes.map((val, idx) => {
            const isHead = idx === 0;

            return (
              <React.Fragment key={idx}>
                <div className="relative flex flex-col items-center">
                  {isHead && (
                    <span className="absolute -top-6 text-[10px] font-mono text-cyan-400 font-bold bg-cyan-500/20 px-2 py-0.5 rounded border border-cyan-500/30">
                      head
                    </span>
                  )}
                  <div className={`w-14 h-14 rounded-xl border flex items-center justify-center font-mono text-base font-bold ${
                    isHead ? 'bg-cyan-500/15 border-cyan-400 text-cyan-200' : 'bg-[#12131b] border-[#272b3c] text-white'
                  }`}>
                    {val}
                  </div>
                </div>

                {/* Pointer Arrow */}
                <div className="text-[#8a8ea3] text-lg font-bold">&rarr;</div>
              </React.Fragment>
            );
          })}

          {/* NULL Terminator */}
          <div className="w-14 h-14 rounded-xl border border-dashed border-[#3b4261] bg-[#101117] flex items-center justify-center font-mono text-xs text-[#8a8ea3]">
            NULL
          </div>
        </div>
      </div>

      {/* Complexity Banner */}
      <div className="w-full p-3 rounded-xl bg-[#12131b] border border-[#202436] flex items-center justify-around font-mono text-xs text-[#8a8ea3]">
        <div>Time Complexity: <strong className="text-emerald-400">O(1)</strong></div>
        <div>Auxiliary Space: <strong className="text-emerald-400">O(1)</strong></div>
      </div>
    </div>
  );
}
