import React from 'react';

export const meta = {
  title: 'Sort Linked List (Merge Sort)',
  category: 'Linked List',
  difficulty: 'Medium',
  timeComplexity: 'O(N log N)',
  spaceComplexity: 'O(log N) recursion stack',
  description: 'Sorts a singly linked list in O(N log N) time using Divide and Conquer Merge Sort, splitting the list at the middle node and merging sorted halves in-place.'
};

export const solutions = {
  cpp: `// C++ Merge Sort on Linked List
// Time: O(N log N) | Space: O(log N) stack
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class Solution {
    Node* findMiddle(Node* head) {
        Node* slow = head;
        Node* fast = head->next;
        while (fast != nullptr && fast->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;
        }
        return slow;
    }

    Node* merge(Node* l1, Node* l2) {
        Node dummy(0);
        Node* curr = &dummy;

        while (l1 != nullptr && l2 != nullptr) {
            if (l1->data <= l2->data) {
                curr->next = l1;
                l1 = l1->next;
            } else {
                curr->next = l2;
                l2 = l2->next;
            }
            curr = curr->next;
        }

        if (l1 != nullptr) curr->next = l1;
        if (l2 != nullptr) curr->next = l2;

        return dummy.next;
    }

public:
    Node* sortList(Node* head) {
        if (head == nullptr || head->next == nullptr) return head;

        Node* mid = findMiddle(head);
        Node* rightHead = mid->next;
        mid->next = nullptr; // Disconnect left and right halves

        Node* left = sortList(head);
        Node* right = sortList(rightHead);

        return merge(left, right);
    }
};`,
  python: `# Python 3 Merge Sort on Linked List
class Node:
    def __init__(self, data=0, next=None):
        self.data = data
        self.next = next

class Solution:
    def sortList(self, head: Node) -> Node:
        if not head or not head.next:
            return head

        # Find middle
        slow, fast = head, head.next
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

        right_head = slow.next
        slow.next = None

        left = self.sortList(head)
        right = self.sortList(right_head)

        # Merge
        dummy = Node(0)
        curr = dummy
        while left and right:
            if left.data <= right.data:
                curr.next = left
                left = left.next
            else:
                curr.next = right
                right = right.next
            curr = curr.next

        curr.next = left if left else right
        return dummy.next`,
  java: `// Java Merge Sort on Linked List
class Node {
    int data;
    Node next;
    Node(int data) {
        this.data = data;
        this.next = null;
    }
}

class Solution {
    private Node findMiddle(Node head) {
        Node slow = head, fast = head.next;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }

    private Node merge(Node l1, Node l2) {
        Node dummy = new Node(0);
        Node curr = dummy;

        while (l1 != null && l2 != null) {
            if (l1.data <= l2.data) {
                curr.next = l1;
                l1 = l1.next;
            } else {
                curr.next = l2;
                l2 = l2.next;
            }
            curr = curr.next;
        }

        if (l1 != null) curr.next = l1;
        if (l2 != null) curr.next = l2;

        return dummy.next;
    }

    public Node sortList(Node head) {
        if (head == null || head.next == null) return head;

        Node mid = findMiddle(head);
        Node rightHead = mid.next;
        mid.next = null;

        Node left = sortList(head);
        Node right = sortList(rightHead);

        return merge(left, right);
    }
}`,
  javascript: `// JavaScript Merge Sort on Linked List
var sortList = function(head) {
    if (!head || !head.next) return head;

    let slow = head, fast = head.next;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    const rightHead = slow.next;
    slow.next = null;

    const left = sortList(head);
    const right = sortList(rightHead);

    const dummy = { data: 0, next: null };
    let curr = dummy;
    let l1 = left, l2 = right;

    while (l1 && l2) {
        if (l1.data <= l2.data) {
            curr.next = l1;
            l1 = l1.next;
        } else {
            curr.next = l2;
            l2 = l2.next;
        }
        curr = curr.next;
    }

    curr.next = l1 ? l1 : l2;
    return dummy.next;
};`
};

export const steps = [
  {
    title: '1. Problem Overview: Unsorted Linked List [4 -> 2 -> 1 -> 3]',
    phase: 'INITIAL',
    codeLine: 49,
    stage: 'DIVIDE',
    leftHalf: [4, 2],
    rightHalf: [1, 3],
    merged: [],
    variables: { list: '[4, 2, 1, 3]', algorithm: 'Merge Sort', targetComplexity: 'O(N log N)' },
    explain: 'Merge Sort is optimal for linked lists because finding mid takes O(N) and merging requires zero auxiliary arrays (unlike array merge sort).',
    intuition: 'Divide the list into halves, sort them recursively, and merge using two pointers.'
  },
  {
    title: '2. Divide Step: Split into Left [4, 2] and Right [1, 3]',
    phase: 'SPLIT',
    codeLine: 53,
    stage: 'DIVIDE',
    leftHalf: [4, 2],
    rightHalf: [1, 3],
    merged: [],
    variables: { mid: 'Node(2)', 'mid->next': 'NULL', left: '[4, 2]', right: '[1, 3]' },
    explain: 'Using slow & fast pointers, identify mid (2). Cut connection by setting mid->next = NULL.',
    intuition: 'Isolated sublists can now be sorted independently.'
  },
  {
    title: '3. Conquer Left: Sort [4, 2] -> [2, 4]',
    phase: 'SORT_LEFT',
    codeLine: 56,
    stage: 'CONQUER',
    leftHalf: [2, 4],
    rightHalf: [1, 3],
    merged: [],
    variables: { sortedLeft: '[2, 4]', state: 'Left half sorted' },
    explain: 'Recursive base cases sort the left branch into [2 -> 4].',
    intuition: 'Left subproblem resolved.'
  },
  {
    title: '4. Conquer Right: Sort [1, 3] -> [1, 3]',
    phase: 'SORT_RIGHT',
    codeLine: 57,
    stage: 'CONQUER',
    leftHalf: [2, 4],
    rightHalf: [1, 3],
    merged: [],
    variables: { sortedRight: '[1, 3]', state: 'Right half sorted' },
    explain: 'Recursive base cases sort the right branch into [1 -> 3].',
    intuition: 'Right subproblem resolved.'
  },
  {
    title: '5. Merge Step: Stitch sorted halves [2, 4] and [1, 3]',
    phase: 'MERGE_PROGRESS',
    codeLine: 31,
    stage: 'MERGE',
    leftHalf: [4],
    rightHalf: [3],
    merged: [1, 2],
    variables: { compare: '1 < 2 -> pick 1, then 2 < 3 -> pick 2', mergedSoFar: '[1 -> 2]' },
    explain: 'Two pointers traverse left and right halves, selecting the smaller head element at each step.',
    intuition: 'In-place pointer rewiring merges in linear O(N) time.'
  },
  {
    title: '6. Sorted Linked List Complete: [1 -> 2 -> 3 -> 4 -> NULL]',
    phase: 'RESULT',
    codeLine: 59,
    stage: 'COMPLETE',
    leftHalf: [],
    rightHalf: [],
    merged: [1, 2, 3, 4],
    variables: { finalSorted: '[1, 2, 3, 4]', time: 'O(N log N)', auxSpace: 'O(1) (excluding stack)' },
    explain: 'All nodes merged into fully sorted linked list. Total runtime is strictly O(N log N).',
    intuition: 'Merge Sort is the gold standard for singly linked list sorting.'
  }
];

export default function SortLlVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          Stage: {step.stage}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
          Merge Sort on Linked List O(N log N)
        </span>
      </div>

      {/* Visual Sublists Display */}
      <div className="w-full p-6 rounded-2xl bg-[#161824] border border-[#272b3c] flex flex-col gap-6">
        {step.stage !== 'COMPLETE' ? (
          <div className="grid grid-cols-2 gap-4">
            {/* Left Sublist */}
            <div className="p-3 rounded-xl bg-[#12131b] border border-[#272b3c] flex flex-col gap-2">
              <span className="text-xs font-mono text-amber-400 font-bold">Left Sublist:</span>
              <div className="flex items-center gap-2">
                {step.leftHalf.map((val, idx) => (
                  <div key={idx} className="w-11 h-11 rounded-lg border border-amber-500/30 bg-amber-500/15 text-amber-300 flex items-center justify-center font-mono font-bold text-base">
                    {val}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sublist */}
            <div className="p-3 rounded-xl bg-[#12131b] border border-[#272b3c] flex flex-col gap-2">
              <span className="text-xs font-mono text-cyan-400 font-bold">Right Sublist:</span>
              <div className="flex items-center gap-2">
                {step.rightHalf.map((val, idx) => (
                  <div key={idx} className="w-11 h-11 rounded-lg border border-cyan-500/30 bg-cyan-500/15 text-cyan-300 flex items-center justify-center font-mono font-bold text-base">
                    {val}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {/* Merged Chain */}
        {step.merged.length > 0 && (
          <div className="p-4 rounded-xl bg-[#12131b] border border-[#272b3c] flex flex-col gap-2">
            <span className="text-xs font-mono text-emerald-400 font-bold">Sorted Merged Chain:</span>
            <div className="flex items-center gap-2 overflow-x-auto py-2">
              {step.merged.map((val, idx) => (
                <React.Fragment key={idx}>
                  <div className="w-12 h-12 rounded-xl border border-emerald-400/50 bg-emerald-500/20 text-emerald-200 flex items-center justify-center font-mono font-bold text-base shadow-md shadow-emerald-500/20">
                    {val}
                  </div>
                  <span className="text-emerald-400 font-bold">&rarr;</span>
                </React.Fragment>
              ))}
              <span className="text-xs font-mono text-[#8a8ea3]">NULL</span>
            </div>
          </div>
        )}
      </div>

      {/* Result Card */}
      {step.stage === 'COMPLETE' && (
        <div className="w-full p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center gap-2 text-emerald-300 font-mono text-base font-bold">
          <span>🎉 List Fully Sorted: [1 &rarr; 2 &rarr; 3 &rarr; 4 &rarr; NULL]</span>
        </div>
      )}
    </div>
  );
}
