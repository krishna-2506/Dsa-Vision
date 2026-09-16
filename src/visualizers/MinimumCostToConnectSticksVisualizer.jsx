import React from 'react';

export const meta = {
  title: 'Minimum Cost to Connect Sticks',
  category: 'Heaps / Priority Queues',
  difficulty: 'Medium',
  timeComplexity: 'O(N log N)',
  spaceComplexity: 'O(N)',
  description: 'Connects all sticks into one stick with minimum total cost by repeatedly pairing and combining the two shortest available sticks using a min-heap (Huffman Coding principle).'
};

export const solutions = {
  cpp: `// C++ Minimum Cost to Connect Sticks (Min-Heap / Huffman)
// Time: O(N log N) | Space: O(N)
#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    int connectSticks(vector<int>& sticks) {
        priority_queue<int, vector<int>, greater<int>> minHeap(sticks.begin(), sticks.end());
        int totalCost = 0;

        // Continuously merge the two shortest sticks
        while (minHeap.size() > 1) {
            int first = minHeap.top(); minHeap.pop();
            int second = minHeap.top(); minHeap.pop();

            int combined = first + second;
            totalCost += combined;

            minHeap.push(combined);
        }

        return totalCost;
    }
};`,
  python: `# Python 3 Minimum Cost to Connect Sticks (Min-Heap)
import heapq

class Solution:
    def connectSticks(self, sticks: list[int]) -> int:
        heapq.heapify(sticks)
        total_cost = 0

        while len(sticks) > 1:
            first = heapq.heappop(sticks)
            second = heapq.heappop(sticks)

            combined = first + second
            total_cost += combined

            heapq.heappush(sticks, combined)

        return total_cost`,
  java: `// Java Minimum Cost to Connect Sticks (Min-Heap)
import java.util.PriorityQueue;

class Solution {
    public int connectSticks(int[] sticks) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        for (int s : sticks) minHeap.offer(s);

        int totalCost = 0;

        while (minHeap.size() > 1) {
            int first = minHeap.poll();
            int second = minHeap.poll();

            int combined = first + second;
            totalCost += combined;

            minHeap.offer(combined);
        }

        return totalCost;
    }
}`,
  javascript: `// JavaScript Minimum Cost to Connect Sticks (Min-Heap)
function connectSticks(sticks) {
    const heap = [...sticks].sort((a, b) => a - b);
    let totalCost = 0;

    while (heap.length > 1) {
        const first = heap.shift();
        const second = heap.shift();

        const combined = first + second;
        totalCost += combined;

        // Insert combined back in sorted order
        let idx = 0;
        while (idx < heap.length && heap[idx] < combined) idx++;
        heap.splice(idx, 0, combined);
    }

    return totalCost;
}`
};

export const steps = [
  {
    title: '1. Initial Sticks: [2, 4, 3], Insert into Min-Heap -> [2, 3, 4]',
    phase: 'INITIAL',
    codeLine: 12,
    sticks: [2, 3, 4],
    first: null,
    second: null,
    combined: null,
    totalCost: 0,
    variables: { sticks: '[2, 3, 4]', totalCost: 0 },
    explain: 'Greedy insight: every connection adds its sum to the running cost. Smaller sticks should participate in more merges than larger sticks.',
    intuition: 'Huffman algorithm: repeatedly combine the two smallest elements.'
  },
  {
    title: '2. Pop 2 Smallest: first = 2, second = 3 -> Combined = 5 (Cost += 5)',
    phase: 'MERGE_1',
    codeLine: 18,
    sticks: [4],
    first: 2,
    second: 3,
    combined: 5,
    totalCost: 5,
    variables: { first: 2, second: 3, combined: 5, totalCost: 5 },
    explain: 'Connecting stick 2 and stick 3 creates a stick of length 5 with cost 5. Total cost is now 5.',
    intuition: 'Smallest two sticks merged first.'
  },
  {
    title: '3. Push 5 back to Min-Heap: Heap now contains [4, 5]',
    phase: 'PUSH_HEAP',
    codeLine: 23,
    sticks: [4, 5],
    first: null,
    second: null,
    combined: null,
    totalCost: 5,
    variables: { heap: '[4, 5]', totalCost: 5 },
    explain: 'The merged stick of length 5 is pushed back into the heap for future connections.',
    intuition: 'Sticks left: 4 and 5.'
  },
  {
    title: '4. Pop 2 Smallest: first = 4, second = 5 -> Combined = 9 (Cost += 9)',
    phase: 'MERGE_2',
    codeLine: 18,
    sticks: [],
    first: 4,
    second: 5,
    combined: 9,
    totalCost: 14,
    variables: { first: 4, second: 5, combined: 9, totalCost: 14 },
    explain: 'Connecting remaining sticks 4 and 5 yields single stick of length 9 with cost 9. Total cost = 5 + 9 = 14.',
    intuition: 'All original sticks are now united.'
  },
  {
    title: '5. Single Stick Remaining [9]: Process Complete -> Min Cost = 14',
    phase: 'COMPLETED',
    codeLine: 26,
    sticks: [9],
    first: null,
    second: null,
    combined: null,
    totalCost: 14,
    variables: { finalStickLength: 9, minimumTotalCost: 14 },
    explain: 'Only one stick remains. The minimum total cost to connect all sticks is 14.',
    intuition: 'Provably minimal total cost.'
  }
];

export default function MinimumCostToConnectSticksVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Active Merge: {step.first !== null ? `${step.first} + ${step.second} = ${step.combined}` : 'Awaiting Pair'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Total Accrued Cost = {step.totalCost}
        </span>
      </div>

      {/* Sticks in Heap visualizer */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">Available Sticks in Min-Heap</span>

        <div className="flex items-center justify-center gap-4 py-2">
          {step.sticks.map((len, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1.5">
              <div 
                className="w-12 bg-amber-500/25 border-2 border-amber-500 rounded-xl flex items-center justify-center font-mono font-bold text-amber-300 shadow-md transition-all"
                style={{ height: `${Math.max(48, len * 14)}px` }}
              >
                {len}
              </div>
              <span className="text-[10px] font-mono text-slate-400">Stick {idx + 1}</span>
            </div>
          ))}
          {step.sticks.length === 0 && <span className="text-xs text-slate-500 italic">Merging in progress...</span>}
        </div>
      </div>

      {/* Merging Stage */}
      {step.first !== null && (
        <div className="w-full bg-[#12131b] border border-amber-500/30 rounded-2xl p-4 flex items-center justify-around font-mono text-xs">
          <div className="flex items-center gap-2 text-blue-300">
            <span>First:</span>
            <span className="px-2 py-1 bg-blue-500/20 border border-blue-500/40 rounded font-bold">{step.first}</span>
          </div>
          <span className="text-amber-400 font-black text-lg">+</span>
          <div className="flex items-center gap-2 text-blue-300">
            <span>Second:</span>
            <span className="px-2 py-1 bg-blue-500/20 border border-blue-500/40 rounded font-bold">{step.second}</span>
          </div>
          <span className="text-amber-400 font-black text-lg">=</span>
          <div className="flex items-center gap-2 text-emerald-300">
            <span>New Stick:</span>
            <span className="px-2 py-1 bg-emerald-500/20 border border-emerald-500/40 rounded font-bold">{step.combined}</span>
          </div>
        </div>
      )}

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}
