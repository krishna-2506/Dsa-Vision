import React from 'react';

export const meta = {
  title: 'Replace Elements by Their Rank in Array',
  category: 'Heaps',
  difficulty: 'Easy',
  timeComplexity: 'O(N log N)',
  spaceComplexity: 'O(N)',
  description: 'Replaces each element in an array with its 1-indexed relative rank (smallest distinct number gets rank 1, duplicate values share the same rank) using sorting or a Min-Heap.'
};

export const solutions = {
  cpp: `// C++ Replace Elements by Their Rank
// Time: O(N log N) | Space: O(N)
#include <vector>
#include <algorithm>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> replaceWithRank(vector<int>& arr) {
        vector<int> sorted = arr;
        sort(sorted.begin(), sorted.end());

        unordered_map<int, int> rankMap;
        int rank = 1;

        for (int x : sorted) {
            if (rankMap.find(x) == rankMap.end()) {
                rankMap[x] = rank++;
            }
        }

        vector<int> result(arr.size());
        for (int i = 0; i < arr.size(); i++) {
            result[i] = rankMap[arr[i]];
        }
        return result;
    }
};`,
  python: `# Python 3 Replace Elements by Their Rank
# Time: O(N log N) | Space: O(N)
class Solution:
    def replaceWithRank(self, arr: list[int]) -> list[int]:
        sorted_unique = sorted(set(arr))
        rank_map = {val: rank + 1 for rank, val in enumerate(sorted_unique)}
        return [rank_map[x] for x in arr]`,
  java: `// Java Replace Elements by Their Rank
// Time: O(N log N) | Space: O(N)
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] replaceWithRank(int[] arr) {
        int[] sorted = arr.clone();
        Arrays.sort(sorted);

        Map<Integer, Integer> rankMap = new HashMap<>();
        int rank = 1;

        for (int x : sorted) {
            if (!rankMap.containsKey(x)) {
                rankMap.put(x, rank++);
            }
        }

        int[] result = new int[arr.length];
        for (int i = 0; i < arr.length; i++) {
            result[i] = rankMap.get(arr[i]);
        }
        return result;
    }
}`,
  javascript: `// JavaScript Replace Elements by Their Rank
// Time: O(N log N) | Space: O(N)
var replaceWithRank = function(arr) {
    const sortedUnique = Array.from(new Set(arr)).sort((a, b) => a - b);
    const rankMap = new Map();
    sortedUnique.forEach((val, idx) => rankMap.set(val, idx + 1));

    return arr.map(x => rankMap.get(x));
};`
};

export const steps = [
  {
    title: '1. Input Array: [20, 15, 26, 2, 98, 6]',
    phase: 'INIT',
    codeLine: 12,
    arr: [20, 15, 26, 2, 98, 6],
    sorted: [],
    rankMap: {},
    result: [],
    variables: { original: '[20, 15, 26, 2, 98, 6]', length: 6 },
    explain: 'Goal is to assign 1-based ranks to elements based on their relative magnitude without altering original positions.',
    intuition: 'Duplicates must receive identical ranks; ranks increase strictly by 1 for each new distinct value.'
  },
  {
    title: '2. Sort Distinct Elements: [2, 6, 15, 20, 26, 98]',
    phase: 'SORT',
    codeLine: 13,
    arr: [20, 15, 26, 2, 98, 6],
    sorted: [2, 6, 15, 20, 26, 98],
    rankMap: {},
    result: [],
    variables: { sortedDistinct: '[2, 6, 15, 20, 26, 98]' },
    explain: 'Extract distinct values and sort in ascending order using quicksort or a Min-Heap.',
    intuition: 'Sorted order establishes canonical ranking.'
  },
  {
    title: '3. Assign 1-Indexed Ranks: 2->1, 6->2, 15->3, 20->4, 26->5, 98->6',
    phase: 'ASSIGN_RANKS',
    codeLine: 19,
    arr: [20, 15, 26, 2, 98, 6],
    sorted: [2, 6, 15, 20, 26, 98],
    rankMap: { 2: 1, 6: 2, 15: 3, 20: 4, 26: 5, 98: 6 },
    result: [],
    variables: { '2': 'Rank 1', '6': 'Rank 2', '15': 'Rank 3', '20': 'Rank 4', '26': 'Rank 5', '98': 'Rank 6' },
    explain: 'Iterate sorted elements and assign consecutive ranks 1 through 6 into a hash map.',
    intuition: 'Hash map gives O(1) rank lookups per element.'
  },
  {
    title: '4. Output Ranked Array: [4, 3, 5, 1, 6, 2]',
    phase: 'COMPLETED',
    codeLine: 26,
    arr: [20, 15, 26, 2, 98, 6],
    sorted: [2, 6, 15, 20, 26, 98],
    rankMap: { 2: 1, 6: 2, 15: 3, 20: 4, 26: 5, 98: 6 },
    result: [4, 3, 5, 1, 6, 2],
    variables: { output: '[4, 3, 5, 1, 6, 2]', complexity: 'O(N log N) Time, O(N) Space' },
    explain: 'Substitute each original value with its mapped rank: 20->4, 15->3, 26->5, 2->1, 98->6, 6->2.',
    intuition: 'Preserves the relative value ranking in compact 1-based integers.'
  }
];

export default function ReplaceElementsByTheirRankVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Step: {step.phase}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Ranked Elements: {step.result.length > 0 ? step.result.length : 'Mapping...'}
        </span>
      </div>

      {/* Array Elements with Ranks Display */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Elements with Assigned Ranks
        </span>

        <div className="flex items-center justify-center gap-3 py-2 font-mono">
          {step.arr.map((val, idx) => {
            const rank = step.rankMap[val];

            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                <div
                  className={`w-14 h-22 rounded-2xl border flex flex-col items-center justify-center transition-all duration-300 ${
                    step.result.length > 0
                      ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300'
                      : 'border-[#272b3c] bg-[#161824] text-slate-300'
                  }`}
                >
                  <span className="text-[9px] text-[#8a8ea3]">[{idx}]</span>
                  <span className="text-base font-bold text-amber-300 mt-0.5">{val}</span>
                  <span className="text-xs font-bold text-cyan-400 mt-1">
                    {rank !== undefined ? `R: ${rank}` : '-'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}
