import React from 'react';

export const meta = {
  title: 'Check if LL is Palindrome',
  category: 'Linked List',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Determines if a linked list reads the same forwards and backwards by finding the middle using slow and fast pointers, reversing the second half, and comparing node-by-node.'
};

export const solutions = {
  cpp: `// C++ Optimal O(N) Time and O(1) Space Palindrome Check
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class Solution {
    Node* reverseList(Node* head) {
        Node* prev = nullptr;
        Node* curr = head;
        while (curr != nullptr) {
            Node* nextNode = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextNode;
        }
        return prev;
    }

public:
    bool isPalindrome(Node* head) {
        if (!head || !head->next) return true;

        // 1. Find middle using slow and fast pointers
        Node* slow = head;
        Node* fast = head;
        while (fast->next != nullptr && fast->next->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;
        }

        // 2. Reverse second half
        Node* secondHalfHead = reverseList(slow->next);

        // 3. Compare halves
        Node* first = head;
        Node* second = secondHalfHead;
        bool palindrome = true;
        while (second != nullptr) {
            if (first->data != second->data) {
                palindrome = false;
                break;
            }
            first = first->next;
            second = second->next;
        }

        // 4. Restore original list
        reverseList(secondHalfHead);
        return palindrome;
    }
};`,
  python: `# Python 3 Optimal Palindrome Check in LL
class Node:
    def __init__(self, data=0, next=None):
        self.data = data
        self.next = next

class Solution:
    def isPalindrome(self, head: Node) -> bool:
        if not head or not head.next:
            return True

        # 1. Find middle
        slow = fast = head
        while fast.next and fast.next.next:
            slow = slow.next
            fast = fast.next.next

        # 2. Reverse second half
        prev = None
        curr = slow.next
        while curr:
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt

        # 3. Compare halves
        first, second = head, prev
        while second:
            if first.data != second.data:
                return False
            first = first.next
            second = second.next

        return True`,
  java: `// Java Optimal Palindrome Check in LL
class Node {
    int data;
    Node next;
    Node(int data) {
        this.data = data;
        this.next = null;
    }
}

class Solution {
    private Node reverseList(Node head) {
        Node prev = null, curr = head;
        while (curr != null) {
            Node nxt = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nxt;
        }
        return prev;
    }

    public boolean isPalindrome(Node head) {
        if (head == null || head.next == null) return true;

        Node slow = head, fast = head;
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        Node second = reverseList(slow.next);
        Node first = head;

        while (second != null) {
            if (first.data != second.data) return false;
            first = first.next;
            second = second.next;
        }

        return true;
    }
}`,
  javascript: `// JavaScript Optimal Palindrome Check in LL
var isPalindrome = function(head) {
    if (!head || !head.next) return true;

    let slow = head, fast = head;
    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    let prev = null, curr = slow.next;
    while (curr) {
        const nxt = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nxt;
    }

    let first = head, second = prev;
    while (second) {
        if (first.data !== second.data) return false;
        first = first.next;
        second = second.next;
    }
    return true;
};`
};

export const steps = [
  {
    title: '1. Problem Overview: List [1 -> 2 -> 3 -> 2 -> 1]',
    phase: 'INITIAL',
    codeLine: 29,
    nodes: [1, 2, 3, 2, 1],
    slowIdx: 0,
    fastIdx: 0,
    p1Idx: null,
    p2Idx: null,
    reversed: false,
    variables: { list: '[1, 2, 3, 2, 1]', strategy: 'Find Mid -> Reverse 2nd Half -> Two Pointer Compare' },
    explain: 'Check whether the singly linked list is a palindrome in O(N) time and O(1) space without allocating arrays.',
    intuition: 'If we reverse only the right half in-place, two pointers moving inwards can compare corresponding values.'
  },
  {
    title: '2. Tortoise & Hare: Find Middle Node (slow reaches 3)',
    phase: 'FIND_MID',
    codeLine: 35,
    nodes: [1, 2, 3, 2, 1],
    slowIdx: 2,
    fastIdx: 4,
    p1Idx: null,
    p2Idx: null,
    reversed: false,
    variables: { slow: 'Node(3)', fast: 'Node(1)', middleNode: 'Node(3)' },
    explain: 'When fast pointer reaches the tail, slow pointer sits at the exact middle node (3).',
    intuition: 'slow->next (Node 2) marks the start of the second half.'
  },
  {
    title: '3. Reverse Second Half: [2 -> 1] becomes [1 -> 2]',
    phase: 'REVERSE_HALF',
    codeLine: 40,
    nodes: [1, 2, 3, 1, 2],
    slowIdx: null,
    fastIdx: null,
    p1Idx: 0,
    p2Idx: 3,
    reversed: true,
    variables: { firstHalf: '[1 -> 2]', secondHalfReversed: '[1 -> 2]' },
    explain: 'The nodes following the middle are reversed in place. Now both halves point in comparable order from outer ends inward.',
    intuition: 'Reversed second half begins at node 1 (original tail).'
  },
  {
    title: '4. Compare 1st Elements: first (1) == second (1)',
    phase: 'COMPARE',
    codeLine: 47,
    nodes: [1, 2, 3, 1, 2],
    slowIdx: null,
    fastIdx: null,
    p1Idx: 0,
    p2Idx: 3,
    reversed: true,
    variables: { 'first->data': 1, 'second->data': 1, match: 'TRUE' },
    explain: 'Node 1 from first half matches Node 1 from reversed second half. Advance both pointers.',
    intuition: 'Outer mirror elements match.'
  },
  {
    title: '5. Compare 2nd Elements: first (2) == second (2)',
    phase: 'COMPARE',
    codeLine: 47,
    nodes: [1, 2, 3, 1, 2],
    slowIdx: null,
    fastIdx: null,
    p1Idx: 1,
    p2Idx: 4,
    reversed: true,
    variables: { 'first->data': 2, 'second->data': 2, match: 'TRUE' },
    explain: 'Node 2 from first half matches Node 2 from reversed second half. Second pointer reaches end of half.',
    intuition: 'Inner mirror elements match.'
  },
  {
    title: '6. All Nodes Matched! The Linked List is a Palindrome (Return true)',
    phase: 'RESULT',
    codeLine: 56,
    nodes: [1, 2, 3, 1, 2],
    slowIdx: null,
    fastIdx: null,
    p1Idx: null,
    p2Idx: null,
    reversed: true,
    variables: { isPalindrome: 'TRUE', timeComplexity: 'O(N)', spaceComplexity: 'O(1)' },
    explain: 'All corresponding pairs matched symmetrically. The linked list is confirmed to be a palindrome.',
    intuition: 'In-place half reversal achieves O(1) space guarantee.'
  }
];

export default function CheckIfLlIsPalindromeOrNotVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          Strategy: Mid &rarr; Reverse 2nd Half &rarr; Compare
        </span>
        {step.reversed && (
          <span className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
            Second Half Reversed In-Place
          </span>
        )}
      </div>

      {/* Visual LinkedList Chain */}
      <div className="w-full p-6 rounded-2xl bg-[var(--board-raised-2)] border border-[var(--line)] flex items-center justify-center overflow-x-auto gap-2 py-8">
        {step.nodes.map((val, idx) => {
          const isSlow = step.slowIdx === idx;
          const isFast = step.fastIdx === idx;
          const isP1 = step.p1Idx === idx;
          const isP2 = step.p2Idx === idx;
          const isSecondHalf = idx >= 3;

          let style = 'bg-[var(--board-raised)] border-[var(--line)] text-[var(--chalk)]';
          if (isP1 || isP2) {
            style = 'bg-emerald-500/25 border-emerald-400 text-emerald-200 scale-105 shadow-md shadow-emerald-500/20';
          } else if (isSlow) {
            style = 'bg-blue-500/25 border-blue-400 text-blue-200';
          } else if (step.reversed && isSecondHalf) {
            style = 'bg-cyan-500/15 border-cyan-500/30 text-cyan-200';
          }

          return (
            <React.Fragment key={idx}>
              <div className="relative flex flex-col items-center">
                {/* Pointer Markers */}
                <div className="absolute -top-7 flex items-center gap-1">
                  {isSlow && <span className="text-[9px] font-mono text-blue-400 bg-blue-500/20 px-1 py-0.5 rounded border border-blue-500/30">slow</span>}
                  {isFast && <span className="text-[9px] font-mono text-amber-400 bg-amber-500/20 px-1 py-0.5 rounded border border-amber-500/30">fast</span>}
                  {isP1 && <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/20 px-1 py-0.5 rounded border border-emerald-500/30">p1</span>}
                  {isP2 && <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/20 px-1 py-0.5 rounded border border-emerald-500/30">p2</span>}
                </div>

                <div className={`w-13 h-13 rounded-xl border flex items-center justify-center font-mono font-bold text-base transition-all ${style}`}>
                  {val}
                </div>

                <span className="text-[10px] font-mono text-[#5b6076] mt-1">
                  {idx === 2 ? 'middle' : idx < 2 ? `L${idx}` : `R${idx-3}`}
                </span>
              </div>

              {idx < step.nodes.length - 1 && (
                <div className="text-base font-bold text-[var(--chalk-dim)]">&rarr;</div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Result Banner */}
      {step.phase === 'RESULT' && (
        <div className="w-full p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center gap-2 text-emerald-300 font-mono text-base font-bold">
          <span>🎉 Symmetrical Palindrome Confirmed! (Return true)</span>
        </div>
      )}
    </div>
  );
}
