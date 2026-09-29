export const rendererType = 'array-scan';

export const meta = {
  title: 'Combination Sum II',
  category: 'Recursion / Backtracking',
  difficulty: 'Medium',
  timeComplexity: 'O(2^N * K)',
  spaceComplexity: 'O(K * X) combinations recursion stack',
  description: 'Finds all unique combinations in candidates where the candidate numbers sum to target. Each number in candidates may only be used once in the combination, and duplicate combinations are skipped by sorting and level pruning.'
};

export const ideaMap = [
  {
    title: 'Sort for Level-Order Deduplication',
    description: 'Sorting the candidate array places identical numbers adjacent to each other. During the loop at depth ind, if i > ind and candidates[i] == candidates[i - 1], we skip that branch to prevent identical combinations.'
  },
  {
    title: 'Single-Use Forward Movement',
    description: 'Unlike Combination Sum I, each element may only be used once. After picking candidates[i], the recursive call advances to i + 1.'
  },
  {
    title: 'Early Pruning',
    description: 'Because the array is sorted in ascending order, if candidates[i] exceeds the remaining target, all subsequent candidates in the current loop will also exceed it, allowing an immediate break.'
  }
];

export const solutions = {
  cpp: `// C++ Combination Sum II (Backtracking with Duplicate Pruning)
// Time: O(2^N * K) | Space: O(K * X)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
private:
    void backtrack(int ind, int target, vector<int>& arr, vector<int>& current, vector<vector<int>>& result) {
        if (target == 0) {
            result.push_back(current);
            return;
        }

        for (int i = ind; i < arr.size(); i++) {
            // Skip duplicates at the same recursion level
            if (i > ind && arr[i] == arr[i - 1]) continue;

            // Early pruning: array is sorted, so if arr[i] > target, subsequent elements will also exceed
            if (arr[i] > target) break;

            current.push_back(arr[i]);
            backtrack(i + 1, target - arr[i], arr, current, result); // i + 1: each used once
            current.pop_back(); // backtrack
        }
    }
public:
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        sort(candidates.begin(), candidates.end());
        vector<vector<int>> result;
        vector<int> current;
        backtrack(0, target, candidates, current, result);
        return result;
    }
};`,
  python: `# Python 3 Combination Sum II (Backtracking)
class Solution:
    def combinationSum2(self, candidates: list[int], target: int) -> list[list[int]]:
        candidates.sort()
        result = []

        def backtrack(ind: int, remain: int, current: list[int]):
            if remain == 0:
                result.append(list(current))
                return

            for i in range(ind, len(candidates)):
                # Skip duplicate elements at the same level
                if i > ind and candidates[i] == candidates[i - 1]:
                    continue
                # Early break since candidates are sorted
                if candidates[i] > remain:
                    break

                current.append(candidates[i])
                backtrack(i + 1, remain - candidates[i], current)
                current.pop()

        backtrack(0, target, [])
        return result`,
  java: `// Java Combination Sum II (Backtracking)
import java.util.*;

class Solution {
    private void backtrack(int ind, int target, int[] arr, List<Integer> curr, List<List<Integer>> result) {
        if (target == 0) {
            result.add(new ArrayList<>(curr));
            return;
        }

        for (int i = ind; i < arr.length; i++) {
            if (i > ind && arr[i] == arr[i - 1]) continue;
            if (arr[i] > target) break;

            curr.add(arr[i]);
            backtrack(i + 1, target - arr[i], arr, curr, result);
            curr.remove(curr.size() - 1);
        }
    }

    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        Arrays.sort(candidates);
        List<List<Integer>> result = new ArrayList<>();
        backtrack(0, target, candidates, new ArrayList<>(), result);
        return result;
    }
}`,
  javascript: `// JavaScript Combination Sum II (Backtracking)
var combinationSum2 = function(candidates, target) {
    candidates.sort((a, b) => a - b);
    const result = [];

    function backtrack(ind, remain, current) {
        if (remain === 0) {
            result.push([...current]);
            return;
        }

        for (let i = ind; i < candidates.length; i++) {
            if (i > ind && candidates[i] === candidates[i - 1]) continue;
            if (candidates[i] > remain) break;

            current.push(candidates[i]);
            backtrack(i + 1, remain - candidates[i], current);
            current.pop();
        }
    }

    backtrack(0, target, []);
    return result;
};`
};

export const steps = [
  {
    title: '1. Sorted Candidates: [1, 1, 2, 5, 6, 7, 10], Target = 8',
    phase: 'INITIAL',
    codeLine: 41,
    arr: [
      { val: 1, state: 'pointer', label: 'ind=0' },
      { val: 1, state: 'inactive' },
      { val: 2, state: 'inactive' },
      { val: 5, state: 'inactive' },
      { val: 6, state: 'inactive' },
      { val: 7, state: 'inactive' },
      { val: 10, state: 'inactive' }
    ],
    pointers: [{ name: 'ind', index: 0 }],
    auxiliaryTrack: [
      { label: 'Current Combination', items: [] },
      { label: 'Found Combinations', items: [] }
    ],
    customCard: {
      title: 'Initial State',
      rows: [
        { label: 'Target', value: '8' },
        { label: 'Array Sorted', value: 'Yes: [1, 1, 2, 5, 6, 7, 10]' },
        { label: 'Pruning Strategy', value: 'Skip if i > ind && arr[i] == arr[i-1]' },
        { label: 'Early Exit', value: 'Break if arr[i] > remain' }
      ]
    },
    variables: { ind: 0, target: 8, remain: 8, current: '[]', resultCount: 0 },
    explain: 'Candidates are sorted to enable duplicate pruning and early break when candidate exceeds remaining target.',
    intuition: 'Sorting places duplicate values together so we only pick the first occurrence at any specific tree level.'
  },
  {
    title: '2. Pick candidates[0] = 1, then candidates[1] = 1: Target = 8 - 1 - 1 = 6',
    phase: 'PICK',
    codeLine: 34,
    arr: [
      { val: 1, state: 'active', label: 'pick i=0' },
      { val: 1, state: 'active', label: 'pick i=1' },
      { val: 2, state: 'inactive' },
      { val: 5, state: 'inactive' },
      { val: 6, state: 'inactive' },
      { val: 7, state: 'inactive' },
      { val: 10, state: 'inactive' }
    ],
    pointers: [{ name: 'i', index: 1 }],
    auxiliaryTrack: [
      { label: 'Current Combination', items: [1, 1] },
      { label: 'Found Combinations', items: [] }
    ],
    customCard: {
      title: 'Deeper Recursion Level',
      rows: [
        { label: 'Selected So Far', value: '[1, 1]' },
        { label: 'Remaining Target', value: '6' },
        { label: 'Next Start Index', value: 'i = 2 (advance to prevent reuse)' }
      ]
    },
    variables: { ind: 2, remain: 6, current: '[1, 1]', resultCount: 0 },
    explain: 'Picking identical elements across different recursion depths is valid. Current combo is [1, 1] with target 6.',
    intuition: 'Duplicates across different depths are legitimate; duplicates at the same depth are pruned.'
  },
  {
    title: '3. Pick candidates[4] = 6: 1 + 1 + 6 = 8 -> Match 1 Found!',
    phase: 'MATCH_FOUND',
    codeLine: 23,
    arr: [
      { val: 1, state: 'match' },
      { val: 1, state: 'match' },
      { val: 2, state: 'inactive' },
      { val: 5, state: 'inactive' },
      { val: 6, state: 'match', label: 'pick i=4' },
      { val: 7, state: 'inactive' },
      { val: 10, state: 'inactive' }
    ],
    pointers: [{ name: 'i', index: 4 }],
    auxiliaryTrack: [
      { label: 'Current Combination', items: [1, 1, 6] },
      { label: 'Found Combinations', items: ['[1, 1, 6]'] }
    ],
    customCard: {
      title: 'Match 1 Recorded',
      rows: [
        { label: 'Combination', value: '[1, 1, 6]' },
        { label: 'Sum', value: '1 + 1 + 6 = 8' },
        { label: 'Remaining Target', value: '0' },
        { label: 'Result Set', value: '[[1, 1, 6]]' }
      ]
    },
    variables: { remain: 0, current: '[1, 1, 6]', resultCount: 1 },
    explain: 'Candidate 6 matches remaining target 6 exactly. First unique combination [1, 1, 6] recorded.',
    intuition: 'Base case remain == 0 saves the valid combination.'
  },
  {
    title: '4. Backtrack to [1], Pick 2 then 5: 1 + 2 + 5 = 8 -> Match 2 Found!',
    phase: 'MATCH_FOUND',
    codeLine: 23,
    arr: [
      { val: 1, state: 'match' },
      { val: 1, state: 'inactive' },
      { val: 2, state: 'match' },
      { val: 5, state: 'match' },
      { val: 6, state: 'inactive' },
      { val: 7, state: 'inactive' },
      { val: 10, state: 'inactive' }
    ],
    pointers: [{ name: 'i', index: 3 }],
    auxiliaryTrack: [
      { label: 'Current Combination', items: [1, 2, 5] },
      { label: 'Found Combinations', items: ['[1, 1, 6]', '[1, 2, 5]'] }
    ],
    customCard: {
      title: 'Match 2 Recorded',
      rows: [
        { label: 'Combination', value: '[1, 2, 5]' },
        { label: 'Sum', value: '1 + 2 + 5 = 8' },
        { label: 'Remaining Target', value: '0' },
        { label: 'Result Set', value: '[[1, 1, 6], [1, 2, 5]]' }
      ]
    },
    variables: { remain: 0, current: '[1, 2, 5]', resultCount: 2 },
    explain: 'Backtracking explores [1, 2, 5]. Sum equals 8, so second unique combination [1, 2, 5] is stored.',
    intuition: 'Backtracking pops elements and restores the search state.'
  },
  {
    title: '5. Backtrack to [1], Pick 7: 1 + 7 = 8 -> Match 3 Found!',
    phase: 'MATCH_FOUND',
    codeLine: 23,
    arr: [
      { val: 1, state: 'match' },
      { val: 1, state: 'inactive' },
      { val: 2, state: 'inactive' },
      { val: 5, state: 'inactive' },
      { val: 6, state: 'inactive' },
      { val: 7, state: 'match' },
      { val: 10, state: 'inactive' }
    ],
    pointers: [{ name: 'i', index: 5 }],
    auxiliaryTrack: [
      { label: 'Current Combination', items: [1, 7] },
      { label: 'Found Combinations', items: ['[1, 1, 6]', '[1, 2, 5]', '[1, 7]'] }
    ],
    customCard: {
      title: 'Match 3 Recorded',
      rows: [
        { label: 'Combination', value: '[1, 7]' },
        { label: 'Sum', value: '1 + 7 = 8' },
        { label: 'Remaining Target', value: '0' },
        { label: 'Result Set', value: '[[1, 1, 6], [1, 2, 5], [1, 7]]' }
      ]
    },
    variables: { remain: 0, current: '[1, 7]', resultCount: 3 },
    explain: 'Backtracking finds combination [1, 7] = 8.',
    intuition: 'Each branch discovers valid subsets without redundant search.'
  },
  {
    title: '6. Backtrack to Root: Skip Duplicate candidates[1] = 1 at Same Level!',
    phase: 'PRUNE',
    codeLine: 29,
    arr: [
      { val: 1, state: 'visited', label: 'explored' },
      { val: 1, state: 'inactive', label: 'SKIPPED' },
      { val: 2, state: 'pointer', label: 'ind=2' },
      { val: 5, state: 'inactive' },
      { val: 6, state: 'inactive' },
      { val: 7, state: 'inactive' },
      { val: 10, state: 'inactive' }
    ],
    pointers: [{ name: 'i', index: 1 }],
    auxiliaryTrack: [
      { label: 'Current Combination', items: [] },
      { label: 'Found Combinations', items: ['[1, 1, 6]', '[1, 2, 5]', '[1, 7]'] }
    ],
    customCard: {
      title: 'Duplicate Pruned',
      rows: [
        { label: 'Index', value: 'i = 1' },
        { label: 'Condition', value: 'i > ind (1 > 0) && arr[1] == arr[0]' },
        { label: 'Decision', value: 'SKIP! Avoid duplicate subtree' },
        { label: 'Next Candidate', value: 'Advance to arr[2] = 2' }
      ]
    },
    variables: { i: 1, ind: 0, skipped: true, current: '[]', resultCount: 3 },
    explain: 'At recursion level ind=0, candidate at index 1 is identical to candidate at index 0. Skipping it completely avoids generating duplicate combinations.',
    intuition: 'Level-order duplicate pruning ensures unique output without needing an expensive hash set.'
  },
  {
    title: '7. Pick 2, then Pick 6: 2 + 6 = 8 -> Match 4 Found!',
    phase: 'MATCH_FOUND',
    codeLine: 23,
    arr: [
      { val: 1, state: 'visited' },
      { val: 1, state: 'visited' },
      { val: 2, state: 'match' },
      { val: 5, state: 'inactive' },
      { val: 6, state: 'match' },
      { val: 7, state: 'inactive' },
      { val: 10, state: 'inactive' }
    ],
    pointers: [{ name: 'i', index: 4 }],
    auxiliaryTrack: [
      { label: 'Current Combination', items: [2, 6] },
      { label: 'Found Combinations', items: ['[1, 1, 6]', '[1, 2, 5]', '[1, 7]', '[2, 6]'] }
    ],
    customCard: {
      title: 'Match 4 Recorded',
      rows: [
        { label: 'Combination', value: '[2, 6]' },
        { label: 'Sum', value: '2 + 6 = 8' },
        { label: 'Remaining Target', value: '0' },
        { label: 'Result Set Count', value: '4 combinations' }
      ]
    },
    variables: { remain: 0, current: '[2, 6]', resultCount: 4 },
    explain: 'Branch starting with 2 picks 6: 2 + 6 = 8. Fourth unique combination recorded.',
    intuition: 'Subtree beginning with 2 is cleanly evaluated.'
  },
  {
    title: '8. Early Pruning at candidates[6] = 10 > 8: Break Loop',
    phase: 'PRUNE',
    codeLine: 32,
    arr: [
      { val: 1, state: 'visited' },
      { val: 1, state: 'visited' },
      { val: 2, state: 'visited' },
      { val: 5, state: 'visited' },
      { val: 6, state: 'visited' },
      { val: 7, state: 'visited' },
      { val: 10, state: 'inactive', label: '10 > 8 (BREAK)' }
    ],
    pointers: [{ name: 'i', index: 6 }],
    auxiliaryTrack: [
      { label: 'Current Combination', items: [] },
      { label: 'Found Combinations', items: ['[1, 1, 6]', '[1, 2, 5]', '[1, 7]', '[2, 6]'] }
    ],
    customCard: {
      title: 'Early Break Pruning',
      rows: [
        { label: 'Candidate', value: 'arr[6] = 10' },
        { label: 'Remaining Target', value: '8' },
        { label: 'Condition', value: '10 > 8 -> BREAK loop' },
        { label: 'Benefit', value: 'Stops useless recursion branch instantly' }
      ]
    },
    variables: { i: 6, remain: 8, broken: true, resultCount: 4 },
    explain: 'Since candidates[6] = 10 > 8 and the array is sorted, no subsequent elements can sum to 8. Break out of loop.',
    intuition: 'Sorted order enables early termination of entire loop iterations.'
  },
  {
    title: '9. Completed: All Unique Combinations Discovered',
    phase: 'COMPLETED',
    codeLine: 45,
    arr: [
      { val: 1, state: 'match' },
      { val: 1, state: 'match' },
      { val: 2, state: 'match' },
      { val: 5, state: 'match' },
      { val: 6, state: 'match' },
      { val: 7, state: 'match' },
      { val: 10, state: 'inactive' }
    ],
    pointers: [],
    auxiliaryTrack: [
      { label: 'Final Unique Combinations', items: ['[1, 1, 6]', '[1, 2, 5]', '[1, 7]', '[2, 6]'] }
    ],
    customCard: {
      title: 'Final Summary',
      rows: [
        { label: 'Total Unique Combinations', value: '4' },
        { label: 'Results', value: '[[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]]' },
        { label: 'Deduplication', value: 'O(1) condition i > ind && arr[i] == arr[i-1]' },
        { label: 'Complexity', value: 'O(2^N * K) Time | O(K * X) Space' }
      ]
    },
    variables: { totalCount: 4, finalResult: '[[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]]' },
    explain: 'Backtracking complete. Exactly 4 unique combinations sum to 8 without duplicates.',
    intuition: 'Sorted level-order skipping guarantees zero duplicate combinations with maximum efficiency.'
  }
];
