import React from 'react';

export const meta = {
  title: 'Check if an Array Represents a Min Heap',
  category: 'Heaps / Priority Queues',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Validates whether a binary tree stored in an array satisfies the min-heap order property: parent node must be less than or equal to both of its children.'
};

export const solutions = {
  cpp: `// C++ Check if Array Represents a Min Heap
// Time: O(N) | Space: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    bool isMinHeap(vector<int>& arr, int n) {
        // Only internal nodes (from 0 to (n - 2) / 2) have children
        for (int i = 0; i <= (n - 2) / 2; i++) {
            int left = 2 * i + 1;
            int right = 2 * i + 2;

            // Check left child
            if (left < n && arr[i] > arr[left]) {
                return false;
            }

            // Check right child
            if (right < n && arr[i] > arr[right]) {
                return false;
            }
        }

        return true;
    }
};`,
  python: `# Python 3 Check if Array Represents a Min Heap
class Solution:
    def isMinHeap(self, arr: list[int], n: int) -> bool:
        # Check all internal nodes up to (n - 2) // 2
        for i in range((n - 2) // 2 + 1):
            left = 2 * i + 1
            right = 2 * i + 2

            if left < n and arr[i] > arr[left]:
                return False
            if right < n and arr[i] > arr[right]:
                return False

        return True`,
  java: `// Java Check if Array Represents a Min Heap
class Solution {
    public boolean isMinHeap(int[] arr, int n) {
        for (int i = 0; i <= (n - 2) / 2; i++) {
            int left = 2 * i + 1;
            int right = 2 * i + 2;

            if (left < n && arr[i] > arr[left]) return false;
            if (right < n && arr[i] > arr[right]) return false;
        }

        return true;
    }
}`,
  javascript: `// JavaScript Check if Array Represents a Min Heap
function isMinHeap(arr, n) {
    for (let i = 0; i <= Math.floor((n - 2) / 2); i++) {
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n && arr[i] > arr[left]) return false;
        if (right < n && arr[i] > arr[right]) return false;
    }

    return true;
}`
};

export const steps = [
  {
    title: '1. Array: [10, 20, 30, 40, 50, 60], Check Min-Heap Order',
    phase: 'INITIAL',
    codeLine: 11,
    arr: [10, 20, 30, 40, 50, 60],
    currentNode: 0,
    leftChild: 1,
    rightChild: 2,
    isValid: true,
    variables: { internalNodes: '0 to 2', totalNodes: 6 },
    explain: 'A min-heap requires parent node val <= left child val AND parent node val <= right child val for all nodes with children.',
    intuition: 'Only nodes up to index (N - 2) / 2 have children in a 0-indexed complete binary tree.'
  },
  {
    title: '2. Check Node 0 (val 10): Left Child = 20, Right Child = 30 -> 10 <= 20 and 10 <= 30 (Valid)',
    phase: 'VALID_NODE',
    codeLine: 16,
    arr: [10, 20, 30, 40, 50, 60],
    currentNode: 0,
    leftChild: 1,
    rightChild: 2,
    isValid: true,
    variables: { 'arr[0]': 10, 'arr[1]': 20, 'arr[2]': 30, valid: true },
    explain: 'Root 10 is smaller than both children 20 and 30. Min-heap property holds for node 0.',
    intuition: 'Root satisfies min-heap property.'
  },
  {
    title: '3. Check Node 1 (val 20): Left Child = 40, Right Child = 50 -> 20 <= 40 and 20 <= 50 (Valid)',
    phase: 'VALID_NODE',
    codeLine: 16,
    arr: [10, 20, 30, 40, 50, 60],
    currentNode: 1,
    leftChild: 3,
    rightChild: 4,
    isValid: true,
    variables: { 'arr[1]': 20, 'arr[3]': 40, 'arr[4]': 50, valid: true },
    explain: 'Node 20 is smaller than children 40 and 50. Min-heap property holds for node 1.',
    intuition: 'Subtree rooted at 20 satisfies min-heap property.'
  },
  {
    title: '4. Check Node 2 (val 30): Left Child = 60 -> 30 <= 60 (Valid)',
    phase: 'VALID_NODE',
    codeLine: 16,
    arr: [10, 20, 30, 40, 50, 60],
    currentNode: 2,
    leftChild: 5,
    rightChild: 6,
    isValid: true,
    variables: { 'arr[2]': 30, 'arr[5]': 60, valid: true },
    explain: 'Node 30 has left child 60 (right child index 6 is beyond array size N=6). 30 <= 60 is valid.',
    intuition: 'All internal nodes tested.'
  },
  {
    title: '5. Completed: All internal nodes satisfy Min-Heap Property -> return true',
    phase: 'COMPLETED',
    codeLine: 26,
    arr: [10, 20, 30, 40, 50, 60],
    currentNode: -1,
    leftChild: -1,
    rightChild: -1,
    isValid: true,
    variables: { isMinHeap: true, checkedNodes: 3 },
    explain: 'Every parent node is smaller than or equal to its children. The array is a valid min-heap.',
    intuition: 'Time complexity O(N), space complexity O(1).'
  }
];

export default function CheckIfAnArrayRepresentsAMinHeapVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Active Parent Node: {step.currentNode >= 0 ? `idx [${step.currentNode}] (val ${step.arr[step.currentNode]})` : 'Done'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Left: {step.leftChild < step.arr.length && step.leftChild >= 0 ? `idx [${step.leftChild}]` : 'None'} | Right: {step.rightChild < step.arr.length && step.rightChild >= 0 ? `idx [${step.rightChild}]` : 'None'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Valid Min-Heap: {step.isValid ? 'YES' : 'NO'}
        </span>
      </div>

      {/* Binary Heap Tree View */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-6 flex flex-col items-center gap-4">
        <span className="text-xs font-mono text-[var(--chalk-dim)] uppercase tracking-wider">Complete Binary Tree Representation</span>

        {/* Level 0: Root */}
        <div className="flex justify-center">
          <div className={`w-14 h-14 rounded-full border flex flex-col items-center justify-center font-mono font-bold ${
            step.currentNode === 0 ? 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40' : 'border-emerald-500 bg-emerald-500/15 text-emerald-300'
          }`}>
            <span className="text-sm">{step.arr[0]}</span>
            <span className="text-[9px] text-[var(--chalk-dim)]">[0]</span>
          </div>
        </div>

        {/* Level 1: Left & Right children */}
        <div className="flex justify-center gap-16">
          {[1, 2].map((idx) => {
            const isParent = step.currentNode === idx;
            const isChild = step.leftChild === idx || step.rightChild === idx;

            let borderClass = 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk-dim)]';
            if (isParent) {
              borderClass = 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40';
            } else if (isChild) {
              borderClass = 'border-blue-500 bg-blue-500/20 text-blue-300 ring-2 ring-blue-500/40';
            }

            return (
              <div key={idx} className={`w-12 h-12 rounded-full border flex flex-col items-center justify-center font-mono font-bold ${borderClass}`}>
                <span className="text-xs">{step.arr[idx]}</span>
                <span className="text-[8px] text-[var(--chalk-dim)]">[{idx}]</span>
              </div>
            );
          })}
        </div>

        {/* Level 2: Leaves */}
        <div className="flex justify-center gap-6">
          {[3, 4, 5].map((idx) => {
            const isChild = step.leftChild === idx || step.rightChild === idx;

            let borderClass = 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk-dim)]';
            if (isChild) {
              borderClass = 'border-blue-500 bg-blue-500/20 text-blue-300 ring-2 ring-blue-500/40';
            }

            return (
              <div key={idx} className={`w-11 h-11 rounded-full border flex flex-col items-center justify-center font-mono font-bold ${borderClass}`}>
                <span className="text-xs">{step.arr[idx]}</span>
                <span className="text-[8px] text-[var(--chalk-faint)]">[{idx}]</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl p-3 text-xs font-mono text-center text-[var(--chalk-dim)]">
        {step.explain}
      </div>
    </div>
  );
}
