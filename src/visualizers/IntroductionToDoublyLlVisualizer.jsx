import React from 'react';

export const meta = {
  title: 'Introduction to Doubly Linked List',
  category: 'Linked List',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Constructs a Doubly Linked List (DLL) from an array, where each node stores bidirectional pointers (prev and next), enabling two-way traversal.'
};

export const solutions = {
  cpp: `// C++ Construct Doubly Linked List from Array
#include <vector>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node* prev;
    Node(int val) : data(val), next(nullptr), prev(nullptr) {}
};

class Solution {
public:
    Node* constructDLL(vector<int>& arr) {
        if (arr.empty()) return nullptr;

        Node* head = new Node(arr[0]);
        Node* prev = head;

        for (size_t i = 1; i < arr.size(); i++) {
            Node* curr = new Node(arr[i]);
            prev->next = curr;
            curr->prev = prev;
            prev = curr;
        }

        return head;
    }
};`,
  python: `# Python 3 Construct Doubly Linked List
class Node:
    def __init__(self, data=0, next=None, prev=None):
        self.data = data
        self.next = next
        self.prev = prev

class Solution:
    def constructDLL(self, arr: list[int]) -> Node:
        if not arr:
            return None

        head = Node(arr[0])
        prev = head

        for i in range(1, len(arr)):
            curr = Node(arr[i])
            prev.next = curr
            curr.prev = prev
            prev = curr

        return head`,
  java: `// Java Construct Doubly Linked List
class Node {
    int data;
    Node next;
    Node prev;
    Node(int data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class Solution {
    public Node constructDLL(int[] arr) {
        if (arr.length == 0) return null;

        Node head = new Node(arr[0]);
        Node prev = head;

        for (int i = 1; i < arr.length; i++) {
            Node curr = new Node(arr[i]);
            prev.next = curr;
            curr.prev = prev;
            prev = curr;
        }

        return head;
    }
}`,
  javascript: `// JavaScript Construct Doubly Linked List
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

var constructDLL = function(arr) {
    if (arr.length === 0) return null;

    const head = new Node(arr[0]);
    let prev = head;

    for (let i = 1; i < arr.length; i++) {
        const curr = new Node(arr[i]);
        prev.next = curr;
        curr.prev = prev;
        prev = curr;
    }

    return head;
};`
};

export const steps = [
  {
    title: '1. Array Input: [1, 2, 3, 4] -> Doubly Linked List Concept',
    phase: 'INITIAL',
    codeLine: 18,
    constructedCount: 0,
    activeIdx: null,
    nodes: [1, 2, 3, 4],
    variables: { array: '[1, 2, 3, 4]', structure: 'Node { prev, data, next }' },
    explain: 'Unlike Singly Linked Lists, each Doubly Linked List node maintains TWO pointers: prev (points to preceding node) and next (points to succeeding node).',
    intuition: 'Enables backward traversal and O(1) deletion given a pointer to a node.'
  },
  {
    title: '2. Create Head Node: Node(1) with prev = NULL',
    phase: 'CREATE_HEAD',
    codeLine: 20,
    constructedCount: 1,
    activeIdx: 0,
    nodes: [1, 2, 3, 4],
    variables: { head: 'Node(1)', 'head->prev': 'NULL', prevPointer: 'Node(1)' },
    explain: 'Initialize head with arr[0] (1). Since it is the very first node, its prev pointer is set to NULL.',
    intuition: 'First node anchor established.'
  },
  {
    title: '3. Append Node(2): Connect prev->next = curr and curr->prev = prev',
    phase: 'LINK_NODE',
    codeLine: 25,
    constructedCount: 2,
    activeIdx: 1,
    nodes: [1, 2, 3, 4],
    variables: { curr: 'Node(2)', '1->next': 'Node(2)', '2->prev': 'Node(1)' },
    explain: 'Create Node(2). Establish forward link 1->next = 2 AND backward link 2->prev = 1. Update prev = 2.',
    intuition: 'Two symmetric links wired simultaneously.'
  },
  {
    title: '4. Append Node(3): Bidirectional link with Node(2)',
    phase: 'LINK_NODE',
    codeLine: 25,
    constructedCount: 3,
    activeIdx: 2,
    nodes: [1, 2, 3, 4],
    variables: { curr: 'Node(3)', '2->next': 'Node(3)', '3->prev': 'Node(2)' },
    explain: 'Wire Node(3) with prev node 2. Both forward and backward pointers connect the pair.',
    intuition: 'Two-way connection secured.'
  },
  {
    title: '5. Append Node(4): Complete DLL Construction',
    phase: 'COMPLETE',
    codeLine: 30,
    constructedCount: 4,
    activeIdx: 3,
    nodes: [1, 2, 3, 4],
    variables: { length: 4, tail: 'Node(4)', 'tail->next': 'NULL' },
    explain: 'All 4 nodes converted from array to DLL. Head has prev = NULL; Tail (4) has next = NULL.',
    intuition: 'Construction completed in O(N) linear time and O(N) memory.'
  }
];

export default function IntroductionToDoublyLlVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          Doubly Linked List [prev &larr; data &rarr; next]
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
          Nodes Linked: {step.constructedCount} / {step.nodes.length}
        </span>
      </div>

      {/* Visual DLL Chain */}
      <div className="w-full p-6 rounded-2xl bg-[#161824] border border-[#272b3c] flex items-center justify-center overflow-x-auto gap-2 py-8">
        {/* Left NULL */}
        <div className="w-12 h-16 rounded-xl border border-dashed border-[#3b4261] bg-[#101117] flex items-center justify-center font-mono text-[10px] text-[#8a8ea3]">
          NULL
        </div>

        {step.nodes.slice(0, step.constructedCount).map((val, idx) => {
          const isActive = step.activeIdx === idx;
          const isHead = idx === 0;
          const isTail = idx === step.constructedCount - 1;

          return (
            <React.Fragment key={idx}>
              {/* Bidirectional Arrow */}
              <div className="flex flex-col items-center justify-center text-xs font-mono text-cyan-400 font-bold px-1">
                <span>&rarr;</span>
                <span>&larr;</span>
              </div>

              {/* 3-Compartment DLL Node */}
              <div className="relative flex flex-col items-center">
                {/* Indicators */}
                <div className="absolute -top-6 flex items-center gap-1">
                  {isHead && <span className="text-[9px] font-mono text-blue-400 bg-blue-500/20 px-1.5 py-0.5 rounded border border-blue-500/30">head</span>}
                  {isTail && <span className="text-[9px] font-mono text-purple-400 bg-purple-500/20 px-1.5 py-0.5 rounded border border-purple-500/30">tail</span>}
                </div>

                <div className={`h-16 rounded-xl border flex items-center overflow-hidden transition-all ${
                  isActive ? 'border-cyan-400 shadow-lg shadow-cyan-500/20 scale-105' : 'border-[#272b3c] bg-[#12131b]'
                }`}>
                  {/* Prev pointer slot */}
                  <div className="w-6 h-full bg-[#161824] border-r border-[#272b3c] flex items-center justify-center text-[9px] font-mono text-[#8a8ea3]">
                    &bull;
                  </div>

                  {/* Data slot */}
                  <div className="w-12 h-full flex items-center justify-center font-mono font-bold text-base text-white px-2">
                    {val}
                  </div>

                  {/* Next pointer slot */}
                  <div className="w-6 h-full bg-[#161824] border-l border-[#272b3c] flex items-center justify-center text-[9px] font-mono text-[#8a8ea3]">
                    &bull;
                  </div>
                </div>

                <span className="text-[9px] font-mono text-[#5b6076] mt-1">[prev|{val}|next]</span>
              </div>
            </React.Fragment>
          );
        })}

        {/* Right NULL */}
        {step.constructedCount > 0 && (
          <>
            <div className="flex flex-col items-center justify-center text-xs font-mono text-[#3b4261] font-bold px-1">
              <span>&rarr;</span>
            </div>
            <div className="w-12 h-16 rounded-xl border border-dashed border-[#3b4261] bg-[#101117] flex items-center justify-center font-mono text-[10px] text-[#8a8ea3]">
              NULL
            </div>
          </>
        )}
      </div>

      {/* Feature comparison */}
      <div className="w-full p-4 rounded-xl bg-[#12131b] border border-[#202436] grid grid-cols-2 gap-4 text-xs font-mono text-[#8a8ea3]">
        <div className="flex flex-col gap-1">
          <span className="text-white font-bold">Advantages of DLL:</span>
          <span>&bull; Bi-directional traversal</span>
          <span>&bull; O(1) deletion with node pointer</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-white font-bold">Trade-offs:</span>
          <span>&bull; Extra memory for prev pointer</span>
          <span>&bull; Two pointer updates per operation</span>
        </div>
      </div>
    </div>
  );
}
