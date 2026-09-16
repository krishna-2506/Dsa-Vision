import React from 'react';

export const meta = {
  title: 'Number of Greater Elements to the Right',
  category: 'Stack and Queues',
  difficulty: 'Medium',
  timeComplexity: 'O(Q * N) or O(N log N) with Fenwick Tree',
  spaceComplexity: 'O(N)',
  description: 'Given an array and query indices, count how many elements strictly greater than `arr[idx]` appear to the right of `idx`.'
};

export const solutions = {
  cpp: `// C++: Count of Greater Elements to the Right for Queries
// Time Complexity: O(Q * N) | Space: O(Q)
#include <vector>
using namespace std;

vector<int> countGreater(int n, vector<int>& arr, int q, vector<int>& queries) {
    vector<int> ans;
    for (int idx : queries) {
        int count = 0;
        for (int j = idx + 1; j < n; j++) {
            if (arr[j] > arr[idx]) {
                count++;
            }
        }
        ans.push_back(count);
    }
    return ans;
}`,
  java: `// Java: Count of Greater Elements to the Right
import java.util.ArrayList;

class Solution {
    public static int[] count_NGEs(int N, int arr[], int queries, int indices[]) {
        int[] ans = new int[queries];
        for (int i = 0; i < queries; i++) {
            int idx = indices[i];
            int count = 0;
            for (int j = idx + 1; j < N; j++) {
                if (arr[j] > arr[idx]) {
                    count++;
                }
            }
            ans[i] = count;
        }
        return ans;
    }
}`,
  python: `# Python 3: Count Greater Elements to the Right
def count_greater(n: int, arr: list[int], queries: list[int]) -> list[int]:
    ans = []
    for idx in queries:
        count = sum(1 for j in range(idx + 1, n) if arr[j] > arr[idx])
        ans.append(count)
    return ans`,
  javascript: `// JavaScript: Count Greater Elements to the Right
function countGreater(n, arr, queries) {
    const ans = [];
    for (const idx of queries) {
        let count = 0;
        for (let j = idx + 1; j < n; j++) {
            if (arr[j] > arr[idx]) {
                count++;
            }
        }
        ans.push(count);
    }
    return ans;
}`
};

export const steps = [
  {
    title: '1. Array: [3, 4, 2, 7, 5, 8, 10, 6], Query: idx = 1 (val = 4)',
    phase: 'INIT_QUERY',
    codeLine: 10,
    targetIdx: 1,
    targetVal: 4,
    currentScan: null,
    greaterCount: 0,
    arr: [3, 4, 2, 7, 5, 8, 10, 6],
    highlighted: [],
    explain: 'Query asks for number of elements to the right of index 1 (value 4) that are strictly greater than 4.'
  },
  {
    title: '2. Scan idx 2 (val = 2): 2 <= 4 &rarr; Skip',
    phase: 'SCAN',
    codeLine: 13,
    targetIdx: 1,
    targetVal: 4,
    currentScan: 2,
    greaterCount: 0,
    arr: [3, 4, 2, 7, 5, 8, 10, 6],
    highlighted: [],
    explain: '2 is not strictly greater than 4. Count remains 0.'
  },
  {
    title: '3. Scan idx 3 (val = 7): 7 > 4 &rarr; Count = 1',
    phase: 'MATCH',
    codeLine: 14,
    targetIdx: 1,
    targetVal: 4,
    currentScan: 3,
    greaterCount: 1,
    arr: [3, 4, 2, 7, 5, 8, 10, 6],
    highlighted: [3],
    explain: '7 > 4! Valid element found to right. Increment count to 1.'
  },
  {
    title: '4. Scan idx 4 (val = 5): 5 > 4 &rarr; Count = 2',
    phase: 'MATCH',
    codeLine: 14,
    targetIdx: 1,
    targetVal: 4,
    currentScan: 4,
    greaterCount: 2,
    arr: [3, 4, 2, 7, 5, 8, 10, 6],
    highlighted: [3, 4],
    explain: '5 > 4! Valid element found. Increment count to 2.'
  },
  {
    title: '5. Scan idx 5 (val = 8) & idx 6 (val = 10): Both > 4 &rarr; Count = 4',
    phase: 'MATCH',
    codeLine: 14,
    targetIdx: 1,
    targetVal: 4,
    currentScan: 6,
    greaterCount: 4,
    arr: [3, 4, 2, 7, 5, 8, 10, 6],
    highlighted: [3, 4, 5, 6],
    explain: '8 > 4 and 10 > 4! Both counted. Count reaches 4.'
  },
  {
    title: '6. Scan idx 7 (val = 6): 6 > 4 &rarr; Final Count = 5 elements!',
    phase: 'DONE',
    codeLine: 17,
    targetIdx: 1,
    targetVal: 4,
    currentScan: 7,
    greaterCount: 5,
    arr: [3, 4, 2, 7, 5, 8, 10, 6],
    highlighted: [3, 4, 5, 6, 7],
    explain: '6 > 4. Final total for index 1 (value 4) is 5 elements: [7, 5, 8, 10, 6].'
  }
];

export default function NumberOfGreaterElementsToTheRightVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-[#161824] border border-[#272b3c] text-[#8a8ea3]">
          Target: <strong className="text-amber-400">arr[{step.targetIdx}] = {step.targetVal}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Strictly Greater Count: <strong>{step.greaterCount}</strong>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl w-full">
        <div className="text-xs font-mono text-[#8a8ea3] flex items-center justify-between w-full px-2">
          <span>Array Elements</span>
          <span className="text-amber-400 font-bold">Right Window Range</span>
        </div>

        <div className="grid grid-cols-8 gap-2 w-full pt-2">
          {step.arr.map((val, idx) => {
            const isTarget = idx === step.targetIdx;
            const isScanning = idx === step.currentScan;
            const isCounted = step.highlighted.includes(idx);

            return (
              <div key={idx} className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-11 h-12 rounded-xl border-2 flex flex-col items-center justify-center font-mono font-bold text-sm transition-all ${
                    isTarget
                      ? 'bg-amber-500/25 border-amber-400 text-amber-200 scale-105 shadow-md shadow-amber-500/20'
                      : isScanning
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 animate-pulse'
                      : isCounted
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                      : 'bg-[#181a26] border-[#31364d] text-[#6d7392]'
                  }`}
                >
                  {val}
                </div>
                <span className="text-[9px] font-mono text-[#5b617d]">[{idx}]</span>
              </div>
            );
          })}
        </div>

        <div className="text-xs font-mono text-[#8a8ea3] bg-[#161824] px-4 py-2 rounded-xl border border-[#272b3c] text-center w-full">
          Green blocks signify numbers strictly greater than target ({step.targetVal}) located to its right.
        </div>
      </div>
    </div>
  );
}
