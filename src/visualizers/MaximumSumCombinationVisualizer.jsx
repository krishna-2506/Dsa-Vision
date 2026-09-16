import React from 'react';

export const meta = {
  title: 'Maximum Sum Combinations',
  category: 'Heaps',
  difficulty: 'Hard',
  timeComplexity: 'O(N log N + C log C)',
  spaceComplexity: 'O(C)',
  description: 'Finds the C maximum sum combinations formed by pairing one element from array A and one element from array B. Uses descending sorting and a Max-Heap with coordinate tracking in optimal O(C log C) time.'
};

export const solutions = {
  cpp: `// C++ Maximum Sum Combinations
// Time: O(N log N + C log C) | Space: O(C)
#include <vector>
#include <algorithm>
#include <queue>
#include <set>
using namespace std;

class Solution {
public:
    vector<int> solve(vector<int>& A, vector<int>& B, int C) {
        sort(A.rbegin(), A.rend());
        sort(B.rbegin(), B.rend());

        // Max-Heap: {sum, {i, j}}
        priority_queue<pair<int, pair<int, int>>> maxHeap;
        set<pair<int, int>> visited;

        maxHeap.push({A[0] + B[0], {0, 0}});
        visited.insert({0, 0});

        vector<int> result;
        while (C-- && !maxHeap.empty()) {
            auto top = maxHeap.top();
            maxHeap.pop();

            int sum = top.first;
            int i = top.second.first;
            int j = top.second.second;
            result.push_back(sum);

            if (i + 1 < A.size() && !visited.count({i + 1, j})) {
                maxHeap.push({A[i + 1] + B[j], {i + 1, j}});
                visited.insert({i + 1, j});
            }

            if (j + 1 < B.size() && !visited.count({i, j + 1})) {
                maxHeap.push({A[i] + B[j + 1], {i, j + 1}});
                visited.insert({i, j + 1});
            }
        }

        return result;
    }
};`,
  python: `# Python 3 Maximum Sum Combinations
# Time: O(N log N + C log C) | Space: O(C)
import heapq

class Solution:
    def solve(self, A: list[int], B: list[int], C: int) -> list[int]:
        A.sort(reverse=True)
        B.sort(reverse=True)

        max_heap = [(-(A[0] + B[0]), 0, 0)]
        visited = {(0, 0)}
        result = []

        while C > 0 and max_heap:
            neg_sum, i, j = heapq.heappop(max_heap)
            result.append(-neg_sum)
            C -= 1

            if i + 1 < len(A) and (i + 1, j) not in visited:
                heapq.heappush(max_heap, (-(A[i + 1] + B[j]), i + 1, j))
                visited.add((i + 1, j))

            if j + 1 < len(B) and (i, j + 1) not in visited:
                heapq.heappush(max_heap, (-(A[i] + B[j + 1]), i, j + 1))
                visited.add((i, j + 1))

        return result`,
  java: `// Java Maximum Sum Combinations
// Time: O(N log N + C log C) | Space: O(C)
import java.util.*;

class Solution {
    public int[] solve(int[] A, int[] B, int C) {
        Arrays.sort(A);
        Arrays.sort(B);
        int n = A.length, m = B.length;

        // Reverse to descending
        for (int i = 0; i < n / 2; i++) {
            int t = A[i]; A[i] = A[n - 1 - i]; A[n - 1 - i] = t;
        }
        for (int i = 0; i < m / 2; i++) {
            int t = B[i]; B[i] = B[m - 1 - i]; B[m - 1 - i] = t;
        }

        PriorityQueue<int[]> maxHeap = new PriorityQueue<>((a, b) -> b[0] - a[0]);
        Set<String> visited = new HashSet<>();

        maxHeap.offer(new int[]{A[0] + B[0], 0, 0});
        visited.add("0,0");

        int[] result = new int[C];
        int idx = 0;

        while (C > 0 && !maxHeap.isEmpty()) {
            int[] top = maxHeap.poll();
            result[idx++] = top[0];
            C--;

            int i = top[1], j = top[2];

            if (i + 1 < n && !visited.contains((i + 1) + "," + j)) {
                maxHeap.offer(new int[]{A[i + 1] + B[j], i + 1, j});
                visited.add((i + 1) + "," + j);
            }

            if (j + 1 < m && !visited.contains(i + "," + (j + 1))) {
                maxHeap.offer(new int[]{A[i] + B[j + 1], i, j + 1});
                visited.add(i + "," + (j + 1));
            }
        }

        return result;
    }
}`,
  javascript: `// JavaScript Maximum Sum Combinations
// Time: O(N log N + C log C) | Space: O(C)
var solve = function(A, B, C) {
    A.sort((a, b) => b - a);
    B.sort((a, b) => b - a);

    const heap = [{ sum: A[0] + B[0], i: 0, j: 0 }];
    const visited = new Set(['0,0']);
    const result = [];

    while (C > 0 && heap.length > 0) {
        heap.sort((a, b) => b.sum - a.sum);
        const { sum, i, j } = heap.shift();
        result.push(sum);
        C--;

        if (i + 1 < A.length && !visited.has(\`\${i + 1},\${j}\`)) {
            heap.push({ sum: A[i + 1] + B[j], i: i + 1, j });
            visited.add(\`\${i + 1},\${j}\`);
        }

        if (j + 1 < B.length && !visited.has(\`\${i},\${j + 1}\`)) {
            heap.push({ sum: A[i] + B[j + 1], i, j: j + 1 });
            visited.add(\`\${i},\${j + 1}\`);
        }
    }

    return result;
};`
};

export const steps = [
  {
    title: '1. Sort Descending: A = [4, 2, 1], B = [3, 2, 1], C = 3',
    phase: 'INIT',
    codeLine: 12,
    A: [4, 2, 1],
    B: [3, 2, 1],
    C: 3,
    heap: [{ sum: 7, i: 0, j: 0 }],
    result: [],
    variables: { A: '[4, 2, 1]', B: '[3, 2, 1]', C: 3, rootPair: 'A[0]+B[0] = 4+3 = 7' },
    explain: 'After descending sort, the absolute maximum sum combination is A[0] + B[0] = 4 + 3 = 7. Push (7, 0, 0) into the Max-Heap.',
    intuition: 'Subsequent candidate maximums are adjacent successors (i+1, j) and (i, j+1).'
  },
  {
    title: '2. Pop Max 1: (4 + 3 = 7), Push Successors (i+1, j) and (i, j+1)',
    phase: 'EXTRACT_1',
    codeLine: 24,
    A: [4, 2, 1],
    B: [3, 2, 1],
    C: 2,
    heap: [
      { sum: 6, i: 0, j: 1 },
      { sum: 5, i: 1, j: 0 }
    ],
    result: [7],
    variables: { extracted: 7, 'Next candidates': 'A[1]+B[0]=2+3=5, A[0]+B[1]=4+2=6', heapTop: 6 },
    explain: 'Extracted 7. Successors pushed: (0, 1) with sum 4+2=6, and (1, 0) with sum 2+3=5.',
    intuition: 'Branching outwards navigates the 2D sum matrix greedily.'
  },
  {
    title: '3. Pop Max 2: (4 + 2 = 6), Push Successors',
    phase: 'EXTRACT_2',
    codeLine: 24,
    A: [4, 2, 1],
    B: [3, 2, 1],
    C: 1,
    heap: [
      { sum: 5, i: 1, j: 0 },
      { sum: 5, i: 0, j: 2 },
      { sum: 4, i: 1, j: 1 }
    ],
    result: [7, 6],
    variables: { extracted: 6, newCandidates: 'A[0]+B[2]=4+1=5, A[1]+B[1]=2+2=4', heapTop: 5 },
    explain: 'Extracted 6 (pair 4 + 2). Pushed successors (0, 2) [sum 5] and (1, 1) [sum 4].',
    intuition: 'Max-Heap naturally prioritizes the highest remaining candidate.'
  },
  {
    title: '4. Pop Max 3: (2 + 3 = 5) -> Final Result: [7, 6, 5]',
    phase: 'COMPLETED',
    codeLine: 35,
    A: [4, 2, 1],
    B: [3, 2, 1],
    C: 0,
    heap: [],
    result: [7, 6, 5],
    variables: { topCResults: '[7, 6, 5]', pairs: '[(4,3), (4,2), (2,3)]' },
    explain: 'The 3 largest sum combinations are 7, 6, and 5. Query satisfied in O(C log C) without evaluating all N^2 combinations.',
    intuition: 'Best-first search explores only the upper-left boundary of the sum matrix.'
  }
];

export default function MaximumSumCombinationVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Target Combinations (C): 3
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Combinations Found: {step.result.length} / 3
        </span>
      </div>

      {/* Heap & Extracted Stream */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Max-Heap Active Candidates
        </span>

        <div className="flex flex-wrap items-center justify-center gap-3 py-2 font-mono">
          {step.heap.length === 0 ? (
            <span className="text-xs text-slate-500 italic">Heap is empty</span>
          ) : (
            step.heap.map((item, idx) => (
              <div
                key={idx}
                className="px-4 py-2.5 rounded-xl border border-cyan-500/40 bg-cyan-500/15 flex flex-col items-center gap-0.5"
              >
                <span className="text-sm font-bold text-amber-300">Sum: {item.sum}</span>
                <span className="text-[10px] text-slate-400">
                  (A[{item.i}], B[{item.j}])
                </span>
              </div>
            ))
          )}
        </div>

        {/* Extracted Result */}
        {step.result.length > 0 && (
          <div className="w-full border-t border-[#272b3c] pt-3 flex flex-col items-center gap-2">
            <span className="text-[11px] font-mono text-emerald-400 font-semibold">
              Max Sum Combinations (Top C):
            </span>
            <div className="flex items-center gap-2 font-mono text-base text-emerald-300 font-bold">
              [{step.result.join(', ')}]
            </div>
          </div>
        )}
      </div>

      {/* Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}
