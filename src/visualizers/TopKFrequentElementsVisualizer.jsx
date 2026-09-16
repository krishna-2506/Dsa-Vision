import React from 'react';

export const meta = {
  title: 'Top K Frequent Elements',
  category: 'Heaps / Priority Queues',
  difficulty: 'Medium',
  timeComplexity: 'O(N log K)',
  spaceComplexity: 'O(N + K)',
  description: 'Finds the k most frequent elements using a hash map to tally occurrences followed by a min-heap of size k ordered by frequency.'
};

export const solutions = {
  cpp: `// C++ Top K Frequent Elements (Min-Heap)
// Time: O(N log K) | Space: O(N + K)
#include <vector>
#include <unordered_map>
#include <queue>
using namespace std;

class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> count;
        for (int num : nums) {
            count[num]++;
        }

        // Min-heap storing pair: {frequency, element}
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> minHeap;

        for (auto& entry : count) {
            minHeap.push({entry.second, entry.first});
            if (minHeap.size() > k) {
                minHeap.pop(); // Evict lowest frequency
            }
        }

        vector<int> result;
        while (!minHeap.empty()) {
            result.push_back(minHeap.top().second);
            minHeap.pop();
        }

        return result;
    }
};`,
  python: `# Python 3 Top K Frequent Elements (Min-Heap)
from collections import Counter
import heapq

class Solution:
    def topKFrequent(self, nums: list[int], k: int) -> list[int]:
        count = Counter(nums)
        # Min-heap based on frequency
        min_heap = []

        for num, freq in count.items():
            heapq.heappush(min_heap, (freq, num))
            if len(min_heap) > k:
                heapq.heappop(min_heap)

        return [num for freq, num in min_heap]`,
  java: `// Java Top K Frequent Elements (Min-Heap)
import java.util.*;

class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int n : nums) count.put(n, count.getOrDefault(n, 0) + 1);

        PriorityQueue<int[]> minHeap = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));

        for (Map.Entry<Integer, Integer> entry : count.entrySet()) {
            minHeap.offer(new int[]{entry.getValue(), entry.getKey()});
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }

        int[] result = new int[k];
        for (int i = 0; i < k; i++) result[i] = minHeap.poll()[1];
        return result;
    }
}`,
  javascript: `// JavaScript Top K Frequent Elements
var topKFrequent = function(nums, k) {
    const count = new Map();
    for (const n of nums) count.set(n, (count.get(n) || 0) + 1);

    const entries = Array.from(count.entries());
    entries.sort((a, b) => b[1] - a[1]); // sort by freq descending

    return entries.slice(0, k).map(e => e[0]);
};`
};

export const steps = [
  {
    title: '1. Array: [1, 1, 1, 2, 2, 3], k = 2 (Find Top 2 Frequent Elements)',
    phase: 'INITIAL',
    codeLine: 13,
    nums: [1, 1, 1, 2, 2, 3],
    frequencies: { 1: 3, 2: 2, 3: 1 },
    minHeap: [],
    evicted: null,
    k: 2,
    variables: { k: 2, strategy: 'Count freq + min-heap of size 2' },
    explain: 'Count occurrences: 1 appears 3 times, 2 appears 2 times, 3 appears 1 time.',
    intuition: 'Hash map counts in O(N). Min-heap extracts top K in O(N log K).'
  },
  {
    title: '2. Push element 1 (freq 3) and element 2 (freq 2): Heap size = 2',
    phase: 'PUSH_INITIAL',
    codeLine: 21,
    nums: [1, 1, 1, 2, 2, 3],
    frequencies: { 1: 3, 2: 2, 3: 1 },
    minHeap: [
      { elem: 2, freq: 2 },
      { elem: 1, freq: 3 }
    ],
    evicted: null,
    k: 2,
    variables: { pushed: '2 (freq 2)', heapSize: 2 },
    explain: 'Elements 1 and 2 fill the heap. Min frequency in heap is at root: elem 2 with freq 2.',
    intuition: 'Min-heap orders by frequency ascending.'
  },
  {
    title: '3. Push element 3 (freq 1): Size 3 > k -> Evict Root {elem: 3, freq: 1}',
    phase: 'EVICT_LOW_FREQ',
    codeLine: 24,
    nums: [1, 1, 1, 2, 2, 3],
    frequencies: { 1: 3, 2: 2, 3: 1 },
    minHeap: [
      { elem: 2, freq: 2 },
      { elem: 1, freq: 3 }
    ],
    evicted: { elem: 3, freq: 1 },
    k: 2,
    variables: { evicted: '3 (freq 1)', remaining: '[2 (freq 2), 1 (freq 3)]' },
    explain: 'Element 3 has lowest frequency 1, so it is popped. Elements 1 and 2 remain.',
    intuition: 'Lowest frequency element discarded.'
  },
  {
    title: '4. Extract Result: Heap holds [1, 2] -> return [1, 2]',
    phase: 'COMPLETED',
    codeLine: 33,
    nums: [1, 1, 1, 2, 2, 3],
    frequencies: { 1: 3, 2: 2, 3: 1 },
    minHeap: [
      { elem: 2, freq: 2 },
      { elem: 1, freq: 3 }
    ],
    evicted: null,
    k: 2,
    variables: { topKFrequent: '[1, 2]', counts: '1: 3x, 2: 2x' },
    explain: 'The top 2 most frequent numbers in the array are 1 and 2.',
    intuition: 'Optimal top-k extraction.'
  }
];

export default function TopKFrequentElementsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Target: k = {step.k} Most Frequent
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Heap Size: {step.minHeap.length} / {step.k}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Top Elements: {step.minHeap.map(h => h.elem).join(', ') || 'N/A'}
        </span>
      </div>

      {/* Frequency Tally Cards */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-5 flex flex-col items-center gap-3">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">Occurrences Table (Hash Map)</span>

        <div className="flex items-center justify-center gap-4 py-1">
          {Object.entries(step.frequencies).map(([elem, freq]) => {
            const inHeap = step.minHeap.some(h => h.elem === Number(elem));

            let borderClass = 'border-[#272b3c] bg-[#161824] text-slate-400';
            if (inHeap) {
              borderClass = 'border-emerald-500 bg-emerald-500/20 text-emerald-300 ring-2 ring-emerald-500/30';
            }

            return (
              <div key={elem} className={`w-20 h-20 rounded-xl border flex flex-col items-center justify-center font-mono font-bold transition-all ${borderClass}`}>
                <span className="text-sm">Value {elem}</span>
                <span className="text-xs text-amber-300 font-bold">{freq} times</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Min-Heap (Ordered by Frequency) */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4">
        <div className="flex items-center justify-between w-full text-xs font-mono text-[#8a8ea3] border-b border-[#272b3c] pb-2">
          <span>Min-Heap (Capacity K = {step.k})</span>
          {step.evicted && (
            <span className="text-rose-400 font-bold">Evicted: Value {step.evicted.elem} ({step.evicted.freq}×)</span>
          )}
        </div>

        <div className="flex items-center justify-center gap-4 py-2">
          {step.minHeap.map((item, idx) => (
            <div key={idx} className={`w-24 h-22 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all ${
              idx === 0 
                ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg' 
                : 'border-blue-500/50 bg-blue-500/15 text-blue-300'
            }`}>
              <span className="text-[10px] text-slate-400">{idx === 0 ? 'HEAP ROOT' : 'NODE'}</span>
              <span className="text-base font-black">Val: {item.elem}</span>
              <span className="text-[11px] text-amber-300 font-bold">Freq: {item.freq}×</span>
            </div>
          ))}
          {step.minHeap.length === 0 && <span className="text-xs text-slate-500 italic">Empty Heap</span>}
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}
