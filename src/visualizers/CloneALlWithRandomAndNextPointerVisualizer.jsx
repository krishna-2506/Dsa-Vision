import React from 'react';

export const meta = {
  title: 'Clone List with Random and Next Pointer',
  category: 'Linked List',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) auxiliary (no hash map)',
  description: 'Creates a deep copy of a linked list where each node has a next and a random pointer, using a 3-step interleaved node insertion technique in O(N) time and O(1) extra space.'
};

export const solutions = {
  cpp: `// C++ O(1) Auxiliary Space Cloning with Interleaved Nodes
#include <iostream>
using namespace std;

struct Node {
    int val;
    Node* next;
    Node* random;
    Node(int _val) : val(_val), next(nullptr), random(nullptr) {}
};

class Solution {
public:
    Node* copyRandomList(Node* head) {
        if (!head) return nullptr;

        // Step 1: Insert copy nodes interleaved: A -> A' -> B -> B'
        Node* curr = head;
        while (curr != nullptr) {
            Node* copy = new Node(curr->val);
            copy->next = curr->next;
            curr->next = copy;
            curr = copy->next;
        }

        // Step 2: Connect random pointers for copy nodes
        curr = head;
        while (curr != nullptr) {
            if (curr->random != nullptr) {
                curr->next->random = curr->random->next;
            }
            curr = curr->next->next;
        }

        // Step 3: Separate original and cloned lists
        Node* dummy = new Node(0);
        Node* copyCurr = dummy;
        curr = head;

        while (curr != nullptr) {
            Node* front = curr->next->next;
            copyCurr->next = curr->next;
            curr->next = front;
            copyCurr = copyCurr->next;
            curr = front;
        }

        return dummy->next;
    }
};`,
  python: `# Python 3 O(1) Space Interleaved List Cloning
class Node:
    def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
        self.val = int(x)
        self.next = next
        self.random = random

class Solution:
    def copyRandomList(self, head: 'Node') -> 'Node':
        if not head:
            return None

        # Step 1: Interleave copy nodes
        curr = head
        while curr:
            copy = Node(curr.val, curr.next)
            curr.next = copy
            curr = copy.next

        # Step 2: Assign random pointers
        curr = head
        while curr:
            if curr.random:
                curr.next.random = curr.random.next
            curr = curr.next.next

        # Step 3: Unweave lists
        dummy = Node(0)
        copy_curr = dummy
        curr = head

        while curr:
            front = curr.next.next
            copy_curr.next = curr.next
            curr.next = front
            copy_curr = copy_curr.next
            curr = front

        return dummy.next`,
  java: `// Java O(1) Space Interleaved List Cloning
class Node {
    int val;
    Node next;
    Node random;
    Node(int val) {
        this.val = val;
        this.next = null;
        this.random = null;
    }
}

class Solution {
    public Node copyRandomList(Node head) {
        if (head == null) return null;

        // Step 1: Interleave copy nodes
        Node curr = head;
        while (curr != null) {
            Node copy = new Node(curr.val);
            copy.next = curr.next;
            curr.next = copy;
            curr = copy.next;
        }

        // Step 2: Assign random pointers
        curr = head;
        while (curr != null) {
            if (curr.random != null) {
                curr.next.random = curr.random.next;
            }
            curr = curr.next.next;
        }

        // Step 3: Unweave
        Node dummy = new Node(0);
        Node copyCurr = dummy;
        curr = head;

        while (curr != null) {
            Node front = curr.next.next;
            copyCurr.next = curr.next;
            curr.next = front;
            copyCurr = copyCurr.next;
            curr = front;
        }

        return dummy.next;
    }
}`,
  javascript: `// JavaScript O(1) Space Interleaved List Cloning
var copyRandomList = function(head) {
    if (!head) return null;

    let curr = head;
    while (curr) {
        const copy = { val: curr.val, next: curr.next, random: null };
        curr.next = copy;
        curr = copy.next;
    }

    curr = head;
    while (curr) {
        if (curr.random) {
            curr.next.random = curr.random.next;
        }
        curr = curr.next.next;
    }

    const dummy = { val: 0, next: null };
    let copyCurr = dummy;
    curr = head;

    while (curr) {
        const front = curr.next.next;
        copyCurr.next = curr.next;
        curr.next = front;
        copyCurr = copyCurr.next;
        curr = front;
    }

    return dummy.next;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: Original List with Random Pointers',
    phase: 'INITIAL',
    codeLine: 18,
    mode: 'ORIGINAL',
    nodes: [
      { id: 'A', val: 7, random: 'null' },
      { id: 'B', val: 13, random: 'A' },
      { id: 'C', val: 11, random: 'B' }
    ],
    variables: { nodes: 'A(7), B(13), C(11)', randomPointers: 'B.random -> A, C.random -> B' },
    explain: 'Each node has next and random pointers. Standard cloning with HashMaps takes O(N) auxiliary space. We will do this in O(1) auxiliary space.',
    intuition: 'Interleave cloned nodes right beside their parents to track mappings without a hash table.'
  },
  {
    title: '2. Step 1: Interleave Cloned Nodes: A -> A\' -> B -> B\' -> C -> C\'',
    phase: 'INTERLEAVE',
    codeLine: 23,
    mode: 'INTERLEAVED',
    nodes: [
      { id: 'A', val: 7, isCopy: false },
      { id: "A'", val: 7, isCopy: true },
      { id: 'B', val: 13, isCopy: false },
      { id: "B'", val: 13, isCopy: true },
      { id: 'C', val: 11, isCopy: false },
      { id: "C'", val: 11, isCopy: true }
    ],
    variables: { transformation: "curr->next = new Node(curr->val); copy->next = nextOriginal" },
    explain: 'For every original node X, insert copy X\' directly after X. The copy node X\' can be accessed in O(1) via X->next.',
    intuition: 'No hash table needed: X->next is X\'!'
  },
  {
    title: '3. Step 2: Connect Random Pointers: curr->next->random = curr->random->next',
    phase: 'RANDOM_CONNECT',
    codeLine: 32,
    mode: 'RANDOM_CONNECTED',
    nodes: [
      { id: 'A', val: 7, isCopy: false },
      { id: "A'", val: 7, isCopy: true, randomTarget: 'null' },
      { id: 'B', val: 13, isCopy: false },
      { id: "B'", val: 13, isCopy: true, randomTarget: "A'" },
      { id: 'C', val: 11, isCopy: false },
      { id: "C'", val: 11, isCopy: true, randomTarget: "B'" }
    ],
    variables: { "B'->random": "B->random->next = A'", "C'->random": "C->random->next = B'" },
    explain: 'Because A\' is A->next, B\'->random is simply B->random->next (which is A\'). Connect all cloned random pointers.',
    intuition: 'Random pointers replicate flawlessly.'
  },
  {
    title: '4. Step 3: Unweave and Separate Cloned List from Original',
    phase: 'UNWEAVE',
    codeLine: 43,
    mode: 'SEPARATED',
    clonedList: [
      { id: "A'", val: 7, random: 'null' },
      { id: "B'", val: 13, random: "A'" },
      { id: "C'", val: 11, random: "B'" }
    ],
    originalList: [
      { id: 'A', val: 7, random: 'null' },
      { id: 'B', val: 13, random: 'A' },
      { id: 'C', val: 11, random: 'B' }
    ],
    variables: { clonedList: "A'(7) -> B'(13) -> C'(11)", originalRestored: 'A(7) -> B(13) -> C(11)' },
    explain: 'Restore original next pointers and stitch cloned next pointers into an independent linked list.',
    intuition: 'Both lists separated with zero memory leaks.'
  },
  {
    title: '5. Result: Independent Deep Cloned List Returned',
    phase: 'RESULT',
    codeLine: 52,
    mode: 'COMPLETE',
    clonedList: [
      { id: "A'", val: 7, random: 'null' },
      { id: "B'", val: 13, random: "A'" },
      { id: "C'", val: 11, random: "B'" }
    ],
    variables: { timeComplexity: 'O(N)', auxSpaceComplexity: 'O(1)', success: 'True Deep Copy' },
    explain: 'Cloning completes in O(N) time with 0 extra hash map overhead.',
    intuition: 'Interleaving technique achieves optimal complexity.'
  }
];

export default function CloneALlWithRandomAndNextPointerVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          3-Step Interleaved Cloning
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
          Aux Space: O(1) (No HashMap)
        </span>
      </div>

      {/* Visual Interleaved / Separated Display */}
      <div className="w-full p-6 rounded-2xl bg-[#161824] border border-[#272b3c] flex flex-col gap-4">
        {step.mode !== 'SEPARATED' && step.mode !== 'COMPLETE' ? (
          <div className="flex items-center justify-center overflow-x-auto gap-2 py-4">
            {step.nodes.map((node, idx) => {
              const isCopy = node.isCopy;

              return (
                <React.Fragment key={idx}>
                  <div className="flex flex-col items-center gap-1">
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      isCopy ? 'text-amber-400 bg-amber-500/20 border border-amber-500/30' : 'text-blue-400 bg-blue-500/20 border border-blue-500/30'
                    }`}>
                      {node.id}
                    </span>

                    <div className={`w-13 h-13 rounded-xl border flex flex-col items-center justify-center font-mono font-bold text-sm ${
                      isCopy ? 'border-amber-400 bg-amber-500/15 text-amber-200' : 'border-blue-400/50 bg-[#12131b] text-white'
                    }`}>
                      <span>{node.val}</span>
                      {node.randomTarget && (
                        <span className="text-[8px] text-amber-400">rnd:{node.randomTarget}</span>
                      )}
                    </div>
                  </div>

                  {idx < step.nodes.length - 1 && (
                    <span className="text-xs font-mono text-[#8a8ea3]">&rarr;</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Cloned List */}
            <div className="p-3 rounded-xl bg-[#12131b] border border-emerald-500/30 flex flex-col gap-2">
              <span className="text-xs font-mono text-emerald-400 font-bold">Cloned Deep Copy List:</span>
              <div className="flex items-center gap-3 overflow-x-auto py-1">
                {step.clonedList.map((node, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">{node.id}</span>
                      <div className="w-12 h-12 rounded-xl border border-emerald-400/50 bg-emerald-500/20 text-emerald-200 flex flex-col items-center justify-center font-mono font-bold text-sm">
                        <span>{node.val}</span>
                        <span className="text-[8px] text-emerald-400">rnd:{node.random}</span>
                      </div>
                    </div>
                    {idx < step.clonedList.length - 1 && <span className="text-emerald-400">&rarr;</span>}
                  </React.Fragment>
                ))}
                <span className="text-xs font-mono text-[#8a8ea3] ml-2">&rarr; NULL</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Result Banner */}
      {step.phase === 'RESULT' && (
        <div className="w-full p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center gap-2 text-emerald-300 font-mono text-base font-bold">
          <span>🎉 Independent Deep Clone Created in O(N) Time and O(1) Auxiliary Space</span>
        </div>
      )}
    </div>
  );
}
