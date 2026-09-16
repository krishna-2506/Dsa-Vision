import React from 'react';

export const meta = {
  title: 'Binary Heap Theory, Representation & Heapify',
  category: 'Heaps',
  difficulty: 'Easy',
  timeComplexity: 'O(N) build, O(log N) push/pop',
  spaceComplexity: 'O(N)',
  description: 'Explores the fundamentals of Binary Heaps: Complete Binary Tree array indexing (parent=(i-1)/2, left=2i+1, right=2i+2), Min/Max Heap properties, and the O(N) Build-Heap algorithm.'
};

export const solutions = {
  cpp: `// C++ Binary Max-Heap Implementation & Build Heap
// Time: O(N) Build, O(log N) Heapify | Space: O(1) in-place
#include <vector>
#include <utility>
using namespace std;

class MaxHeap {
    void heapify(vector<int>& arr, int n, int i) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) largest = left;
        if (right < n && arr[right] > arr[largest]) largest = right;

        if (largest != i) {
            swap(arr[i], arr[largest]);
            heapify(arr, n, largest);
        }
    }
public:
    void buildHeap(vector<int>& arr) {
        int n = arr.size();
        // Start from last non-leaf node down to root
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }
    }
};`,
  python: `# Python 3 Max-Heap Implementation & Build Heap
# Time: O(N) Build, O(log N) Heapify | Space: O(1) in-place
class MaxHeap:
    def heapify(self, arr: list[int], n: int, i: int) -> None:
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2

        if left < n and arr[left] > arr[largest]:
            largest = left
        if right < n and arr[right] > arr[largest]:
            largest = right

        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            self.heapify(arr, n, largest)

    def build_heap(self, arr: list[int]) -> None:
        n = len(arr)
        for i in range(n // 2 - 1, -1, -1):
            self.heapify(arr, n, i)`,
  java: `// Java Binary Max-Heap Implementation & Build Heap
// Time: O(N) Build, O(log N) Heapify | Space: O(1) in-place
class MaxHeap {
    private void heapify(int[] arr, int n, int i) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) largest = left;
        if (right < n && arr[right] > arr[largest]) largest = right;

        if (largest != i) {
            int temp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = temp;
            heapify(arr, n, largest);
        }
    }

    public void buildHeap(int[] arr) {
        int n = arr.length;
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }
    }
}`,
  javascript: `// JavaScript Binary Max-Heap Implementation & Build Heap
// Time: O(N) Build, O(log N) Heapify | Space: O(1) in-place
class MaxHeap {
    heapify(arr, n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) largest = left;
        if (right < n && arr[right] > arr[largest]) largest = right;

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            this.heapify(arr, n, largest);
        }
    }

    buildHeap(arr) {
        const n = arr.length;
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            this.heapify(arr, n, i);
        }
    }
}`
};

export const steps = [
  {
    title: '1. Array as a Complete Binary Tree',
    phase: 'INIT',
    codeLine: 12,
    arr: [4, 10, 3, 5, 1],
    nodes: [
      { id: 0, val: 4, x: 200, y: 30, left: 1, right: 2 },
      { id: 1, val: 10, x: 120, y: 90, left: 3, right: 4 },
      { id: 2, val: 3, x: 280, y: 90 },
      { id: 3, val: 5, x: 80, y: 150 },
      { id: 4, val: 1, x: 160, y: 150 }
    ],
    variables: { array: '[4, 10, 3, 5, 1]', indexing: 'left = 2i+1, right = 2i+2, parent = (i-1)/2' },
    explain: 'Binary Heaps avoid pointer overhead by mapping tree levels directly into contiguous array indices.',
    intuition: 'Complete binary tree property guarantees zero wasted array slots.'
  },
  {
    title: '2. Check Non-Leaf Nodes: i = 1 (val 10)',
    phase: 'HEAPIFY_1',
    codeLine: 18,
    arr: [4, 10, 3, 5, 1],
    nodes: [
      { id: 0, val: 4, x: 200, y: 30 },
      { id: 1, val: 10, x: 120, y: 90, isMax: true },
      { id: 2, val: 3, x: 280, y: 90 },
      { id: 3, val: 5, x: 80, y: 150 },
      { id: 4, val: 1, x: 160, y: 150 }
    ],
    variables: { 'Subtree at i=1': 'Node 10 > children (5, 1)', valid: 'True' },
    explain: 'Node at index 1 is 10, children are 5 and 1. Max-heap property is satisfied (10 >= 5 and 10 >= 1).',
    intuition: 'Subtrees are heapified bottom-up.'
  },
  {
    title: '3. Heapify Root: i = 0 (val 4 violates Max-Heap)',
    phase: 'HEAPIFY_0',
    codeLine: 21,
    arr: [10, 4, 3, 5, 1],
    nodes: [
      { id: 0, val: 10, x: 200, y: 30 },
      { id: 1, val: 4, x: 120, y: 90, needsSwap: true },
      { id: 2, val: 3, x: 280, y: 90 },
      { id: 3, val: 5, x: 80, y: 150 },
      { id: 4, val: 1, x: 160, y: 150 }
    ],
    variables: { swap: '4 with 10', nextViolation: '4 < child 5' },
    explain: 'Root 4 is smaller than left child 10. Swap 4 with 10. Sifting down continues because 4 is now smaller than its child 5.',
    intuition: 'Sifting down bubbles small elements to their rightful depth.'
  },
  {
    title: '4. Sift Down 4 < 5 -> Final Max-Heap [10, 5, 3, 4, 1]',
    phase: 'COMPLETED',
    codeLine: 26,
    arr: [10, 5, 3, 4, 1],
    nodes: [
      { id: 0, val: 10, x: 200, y: 30, isRoot: true },
      { id: 1, val: 5, x: 120, y: 90 },
      { id: 2, val: 3, x: 280, y: 90 },
      { id: 3, val: 4, x: 80, y: 150 },
      { id: 4, val: 1, x: 160, y: 150 }
    ],
    variables: { finalMaxHeap: '[10, 5, 3, 4, 1]', timeComplexity: 'O(N) Total Build' },
    explain: '4 swaps with 5. Entire array now strictly satisfies arr[parent] >= arr[child]. Max-heap built in O(N) time.',
    intuition: 'Mathematical summation of node heights proves Build-Heap takes O(N) rather than O(N log N).'
  }
];

export default function HeapsTheoryVideoVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Array: [{step.arr.join(', ')}]
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Max Element (Root): {step.arr[0]}
        </span>
      </div>

      {/* Complete Binary Tree SVG */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Binary Heap Tree Structure
        </span>

        <svg width="360" height="190" className="overflow-visible">
          {/* Edges */}
          <line x1="200" y1="35" x2="120" y2="90" stroke="#3b4261" strokeWidth="2" />
          <line x1="200" y1="35" x2="280" y2="90" stroke="#3b4261" strokeWidth="2" />
          <line x1="120" y1="90" x2="80" y2="150" stroke="#3b4261" strokeWidth="2" />
          <line x1="120" y1="90" x2="160" y2="150" stroke="#3b4261" strokeWidth="2" />

          {/* Nodes */}
          {step.nodes.map(node => (
            <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
              <circle
                r="18"
                className={`transition-all duration-300 ${
                  node.id === 0
                    ? 'fill-amber-500/30 stroke-amber-400 stroke-2 ring-4 ring-amber-500/40'
                    : 'fill-[#161824] stroke-cyan-500/50'
                }`}
                strokeWidth="2"
              />
              <text
                textAnchor="middle"
                dy="5"
                className="text-xs font-mono font-bold fill-emerald-300"
              >
                {node.val}
              </text>
              <text
                textAnchor="middle"
                dy="28"
                className="text-[9px] font-mono fill-slate-500"
              >
                idx {node.id}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}
