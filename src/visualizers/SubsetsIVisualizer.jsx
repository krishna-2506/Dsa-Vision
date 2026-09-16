import React from 'react';

export const meta = {
  title: 'Subsets I (Power Set)',
  category: 'Recursion / Backtracking',
  difficulty: 'Medium',
  timeComplexity: 'O(2^N * N)',
  spaceComplexity: 'O(N) recursion stack',
  description: 'Generates all 2^N possible subsets (the power set) of an array of distinct integers using pick / not-pick recursive binary decision branches.'
};

export const solutions = {
  cpp: `// C++ Subsets I (Backtracking - Pick / Not Pick)
// Time: O(2^N) | Space: O(N)
#include <vector>
using namespace std;

class Solution {
private:
    void generateSubsets(int ind, vector<int>& nums, vector<int>& current, vector<vector<int>>& result) {
        // Base case: leaf of the decision tree
        if (ind == nums.size()) {
            result.push_back(current);
            return;
        }

        // Choice 1: PICK the element
        current.push_back(nums[ind]);
        generateSubsets(ind + 1, nums, current, result);
        current.pop_back(); // backtrack

        // Choice 2: NOT PICK the element
        generateSubsets(ind + 1, nums, current, result);
    }
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> result;
        vector<int> current;
        generateSubsets(0, nums, current, result);
        return result;
    }
};`,
  python: `# Python 3 Subsets I (Backtracking)
class Solution:
    def subsets(self, nums: list[int]) -> list[list[int]]:
        result = []

        def backtrack(ind: int, current: list[int]):
            if ind == len(nums):
                result.append(list(current))
                return

            # Pick
            current.append(nums[ind])
            backtrack(ind + 1, current)
            current.pop()

            # Not Pick
            backtrack(ind + 1, current)

        backtrack(0, [])
        return result`,
  java: `// Java Subsets I (Backtracking)
import java.util.*;

class Solution {
    private void backtrack(int ind, int[] nums, List<Integer> curr, List<List<Integer>> result) {
        if (ind == nums.length) {
            result.add(new ArrayList<>(curr));
            return;
        }

        curr.add(nums[ind]);
        backtrack(ind + 1, nums, curr, result);
        curr.remove(curr.size() - 1);

        backtrack(ind + 1, nums, curr, result);
    }

    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(0, nums, new ArrayList<>(), result);
        return result;
    }
}`,
  javascript: `// JavaScript Subsets I (Backtracking)
var subsets = function(nums) {
    const result = [];

    function backtrack(ind, current) {
        if (ind === nums.length) {
            result.push([...current]);
            return;
        }

        // Pick
        current.push(nums[ind]);
        backtrack(ind + 1, current);
        current.pop();

        // Not Pick
        backtrack(ind + 1, current);
    }

    backtrack(0, []);
    return result;
};`
};

export const steps = [
  {
    title: '1. Array: [1, 2, 3], Total Expected Subsets = 2^3 = 8',
    phase: 'INITIAL',
    codeLine: 27,
    nums: [1, 2, 3],
    current: [],
    index: 0,
    subsets: [],
    variables: { n: 3, totalSubsets: 8, current: '[]' },
    explain: 'Binary decision at each element: either include it (Pick) or exclude it (Not Pick). Depth of recursion is N = 3.',
    intuition: 'Each element has 2 choices, generating 2^N leaves in the recursion tree.'
  },
  {
    title: '2. Pick 1 -> Pick 2 -> Pick 3: Leaf reached -> Subset [1, 2, 3]',
    phase: 'LEAF_REACHED',
    codeLine: 12,
    nums: [1, 2, 3],
    current: [1, 2, 3],
    index: 3,
    subsets: [[1, 2, 3]],
    variables: { subset: '[1, 2, 3]', path: 'Pick 1, Pick 2, Pick 3' },
    explain: 'Branch where all elements are picked. [1, 2, 3] is saved.',
    intuition: 'Full array subset.'
  },
  {
    title: '3. Backtrack 3, Not-Pick 3: Leaf reached -> Subset [1, 2]',
    phase: 'LEAF_REACHED',
    codeLine: 12,
    nums: [1, 2, 3],
    current: [1, 2],
    index: 3,
    subsets: [[1, 2, 3], [1, 2]],
    variables: { subset: '[1, 2]', path: 'Pick 1, Pick 2, Skip 3' },
    explain: 'Element 3 is popped, and the Not-Pick branch is explored to index 3. [1, 2] is saved.',
    intuition: 'Excluded 3.'
  },
  {
    title: '4. Backtrack 2, Pick 3: [1, 3]; then Not-Pick 3: [1]',
    phase: 'LEAF_REACHED',
    codeLine: 12,
    nums: [1, 2, 3],
    current: [1],
    index: 3,
    subsets: [[1, 2, 3], [1, 2], [1, 3], [1]],
    variables: { subsetsCount: 4, generated: '[1, 2, 3], [1, 2], [1, 3], [1]' },
    explain: 'All 4 subsets that include 1 have been explored and recorded.',
    intuition: 'Half of the 2^N tree is complete.'
  },
  {
    title: '5. Completed: Not-Pick 1 branch finishes -> All 8 Subsets Generated!',
    phase: 'COMPLETED',
    codeLine: 29,
    nums: [1, 2, 3],
    current: [],
    index: 3,
    subsets: [[1, 2, 3], [1, 2], [1, 3], [1], [2, 3], [2], [3], []],
    variables: { totalSubsets: 8, emptySetIncluded: true },
    explain: 'Every combination including the empty set [] has been produced. Total subsets = 2^3 = 8.',
    intuition: 'The power set is complete.'
  }
];

export default function SubsetsIVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Decisions: Index {step.index} / {step.nums.length}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Subsets Generated: {step.subsets.length} / 8
        </span>
      </div>

      {/* Array Elements */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-5 flex flex-col items-center gap-3">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">Array Elements (Pick / Not-Pick)</span>

        <div className="flex items-center justify-center gap-4">
          {step.nums.map((num, idx) => {
            const isPicked = step.current.includes(num);

            let borderClass = 'border-[#272b3c] bg-[#161824] text-slate-400';
            if (isPicked) {
              borderClass = 'border-amber-500 bg-amber-500/20 text-amber-300 ring-2 ring-amber-500/40 shadow-lg';
            }

            return (
              <div key={idx} className={`w-16 h-20 rounded-2xl border flex flex-col items-center justify-center font-mono font-bold transition-all ${borderClass}`}>
                <span className="text-xl">{num}</span>
                <span className="text-[10px] text-slate-500">{isPicked ? 'PICKED' : 'EXCLUDED'}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Generated Subsets Grid */}
      <div className="w-full bg-[#12131b] border border-emerald-500/30 rounded-2xl p-5 flex flex-col gap-2">
        <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">Generated Power Set</span>
        <div className="flex items-center gap-2 flex-wrap">
          {step.subsets.map((s, idx) => (
            <span key={idx} className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono font-bold text-xs">
              [{s.join(', ')}]
            </span>
          ))}
          {step.subsets.length === 0 && <span className="text-xs text-slate-500 italic">Exploring paths...</span>}
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}
