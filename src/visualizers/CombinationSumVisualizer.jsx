export const rendererType = 'array-scan';

export const meta = {
  title: 'Combination Sum',
  category: 'Recursion / Backtracking',
  difficulty: 'Medium',
  timeComplexity: 'O(2^T * K) where T = target / min(candidates)',
  spaceComplexity: 'O(K * X) combinations recursion stack',
  description: 'Finds all unique combinations in candidates where the candidate numbers sum to target. The same number may be chosen from candidates an unlimited number of times.'
};

export const ideaMap = [
  {
    title: 'Pick / Not-Pick Backtracking',
    description: 'At each index, we decide to either pick candidates[ind] (subtracting from remaining target and remaining at ind for unlimited reuse) or not pick it (advancing to ind + 1).'
  },
  {
    title: 'Base Cases & Termination',
    description: 'If remaining target == 0, the current combination is recorded. If remaining target < 0 or ind == candidates.length, backtrack and try alternate branches.'
  },
  {
    title: 'Exhaustive Solution Space',
    description: 'Because we only advance forward or reuse the current element, all discovered combinations are guaranteed unique without duplicates.'
  }
];

export const solutions = {
  cpp: `// C++ Combination Sum (Backtracking - Pick / Not Pick)
// Time: O(2^T * K) | Space: O(K * X)
#include <vector>
using namespace std;

class Solution {
private:
    void findCombinations(int ind, int target, vector<int>& arr, vector<int>& current, vector<vector<int>>& result) {
        // Base case: target satisfied
        if (target == 0) {
            result.push_back(current);
            return;
        }

        // Base case: out of bounds
        if (ind == arr.size()) return;

        // Pick choice: pick current element if it does not exceed remaining target
        if (arr[ind] <= target) {
            current.push_back(arr[ind]);
            findCombinations(ind, target - arr[ind], arr, current, result); // stay at ind for reuse
            current.pop_back(); // backtrack
        }

        // Not-pick choice: advance to next candidate without picking
        findCombinations(ind + 1, target, arr, current, result);
    }
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> result;
        vector<int> current;
        findCombinations(0, target, candidates, current, result);
        return result;
    }
};`,
  python: `# Python 3 Combination Sum (Backtracking)
class Solution:
    def combinationSum(self, candidates: list[int], target: int) -> list[list[int]]:
        result = []

        def backtrack(ind: int, remain: int, current: list[int]):
            if remain == 0:
                result.append(list(current))
                return
            if ind == len(candidates):
                return

            # Pick choice (stay at ind for multiple picks)
            if candidates[ind] <= remain:
                current.append(candidates[ind])
                backtrack(ind, remain - candidates[ind], current)
                current.pop()

            # Not-pick choice (advance index)
            backtrack(ind + 1, remain, current)

        backtrack(0, target, [])
        return result`,
  java: `// Java Combination Sum (Backtracking)
import java.util.*;

class Solution {
    private void backtrack(int ind, int target, int[] arr, List<Integer> curr, List<List<Integer>> result) {
        if (target == 0) {
            result.add(new ArrayList<>(curr));
            return;
        }
        if (ind == arr.length) return;

        // Pick choice
        if (arr[ind] <= target) {
            curr.add(arr[ind]);
            backtrack(ind, target - arr[ind], arr, curr, result);
            curr.remove(curr.size() - 1);
        }

        // Not-pick choice
        backtrack(ind + 1, target, arr, curr, result);
    }

    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(0, target, candidates, new ArrayList<>(), result);
        return result;
    }
}`,
  javascript: `// JavaScript Combination Sum (Backtracking)
var combinationSum = function(candidates, target) {
    const result = [];

    function backtrack(ind, remain, current) {
        if (remain === 0) {
            result.push([...current]);
            return;
        }
        if (ind === candidates.length) return;

        // Pick choice (unlimited reuse: remain at ind)
        if (candidates[ind] <= remain) {
            current.push(candidates[ind]);
            backtrack(ind, remain - candidates[ind], current);
            current.pop();
        }

        // Not-pick choice (move to ind + 1)
        backtrack(ind + 1, remain, current);
    }

    backtrack(0, target, []);
    return result;
};`
};

export const steps = [
  {
    title: '1. Initialization: Candidates [2, 3, 6, 7], Target = 7',
    phase: 'INITIAL',
    codeLine: 43,
    arr: [
      { val: 2, state: 'pointer', label: 'ind=0' },
      { val: 3, state: 'inactive' },
      { val: 6, state: 'inactive' },
      { val: 7, state: 'inactive' }
    ],
    pointers: [{ name: 'ind', index: 0 }],
    auxiliaryTrack: [
      { label: 'Current Combination', items: [] },
      { label: 'Found Combinations', items: [] }
    ],
    customCard: {
      title: 'Backtracking State',
      rows: [
        { label: 'Active Candidate', value: '2 (ind: 0)' },
        { label: 'Remaining Target', value: '7' },
        { label: 'Current Branch', value: 'Root [ind=0, remain=7]' },
        { label: 'Action', value: 'Evaluate Pick vs Not-Pick on candidates[0]' }
      ]
    },
    variables: { ind: 0, candidate: 2, remain: 7, current: '[]', resultCount: 0 },
    explain: 'Start recursive backtracking at index 0 with target 7. Each candidate can be picked multiple times or skipped entirely.',
    intuition: 'At each node, we branch into Pick (if candidate <= target, staying at ind) and Not-Pick (advancing to ind + 1).'
  },
  {
    title: '2. Pick 2 (First Time): Target becomes 7 - 2 = 5',
    phase: 'PICK',
    codeLine: 34,
    arr: [
      { val: 2, state: 'active', label: 'picked' },
      { val: 3, state: 'inactive' },
      { val: 6, state: 'inactive' },
      { val: 7, state: 'inactive' }
    ],
    pointers: [{ name: 'ind', index: 0 }],
    auxiliaryTrack: [
      { label: 'Current Combination', items: [2] },
      { label: 'Found Combinations', items: [] }
    ],
    customCard: {
      title: 'Recursive Call',
      rows: [
        { label: 'Candidate Picked', value: '2' },
        { label: 'Remaining Target', value: '5 (7 - 2)' },
        { label: 'Current Stack', value: '[2]' },
        { label: 'Stay at Index', value: 'ind = 0 (unlimited reuse)' }
      ]
    },
    variables: { ind: 0, candidate: 2, remain: 5, current: '[2]', resultCount: 0 },
    explain: '2 <= 7, so we pick 2 and push it to current. We recurse with ind = 0 and remain = 5.',
    intuition: 'Staying at ind = 0 enables picking candidate 2 repeatedly as long as it fits.'
  },
  {
    title: '3. Pick 2 (Second Time): Target becomes 5 - 2 = 3',
    phase: 'PICK',
    codeLine: 34,
    arr: [
      { val: 2, state: 'active', label: 'picked x2' },
      { val: 3, state: 'inactive' },
      { val: 6, state: 'inactive' },
      { val: 7, state: 'inactive' }
    ],
    pointers: [{ name: 'ind', index: 0 }],
    auxiliaryTrack: [
      { label: 'Current Combination', items: [2, 2] },
      { label: 'Found Combinations', items: [] }
    ],
    customCard: {
      title: 'Recursive Call',
      rows: [
        { label: 'Candidate Picked', value: '2' },
        { label: 'Remaining Target', value: '3 (5 - 2)' },
        { label: 'Current Stack', value: '[2, 2]' },
        { label: 'Stay at Index', value: 'ind = 0' }
      ]
    },
    variables: { ind: 0, candidate: 2, remain: 3, current: '[2, 2]', resultCount: 0 },
    explain: '2 <= 5, so we pick 2 again. Current combination is [2, 2] and remaining target is 3.',
    intuition: 'Repeat pick until the element cannot fit into the remaining target.'
  },
  {
    title: '4. Pick 2 (Third Time): Target becomes 3 - 2 = 1',
    phase: 'PICK',
    codeLine: 34,
    arr: [
      { val: 2, state: 'active', label: 'picked x3' },
      { val: 3, state: 'inactive' },
      { val: 6, state: 'inactive' },
      { val: 7, state: 'inactive' }
    ],
    pointers: [{ name: 'ind', index: 0 }],
    auxiliaryTrack: [
      { label: 'Current Combination', items: [2, 2, 2] },
      { label: 'Found Combinations', items: [] }
    ],
    customCard: {
      title: 'Recursive Call',
      rows: [
        { label: 'Candidate Picked', value: '2' },
        { label: 'Remaining Target', value: '1 (3 - 2)' },
        { label: 'Current Stack', value: '[2, 2, 2]' },
        { label: 'Next Candidate Check', value: '2 > 1 (Cannot pick 2 again)' }
      ]
    },
    variables: { ind: 0, candidate: 2, remain: 1, current: '[2, 2, 2]', resultCount: 0 },
    explain: '2 <= 3, pick 2 again. Now remaining target = 1. Since 2 > 1, picking 2 is no longer valid; advance index to explore other candidates.',
    intuition: 'Subsequent candidates (3, 6, 7) all exceed remaining target 1, leading to backtracks.'
  },
  {
    title: '5. Backtrack one 2 to [2, 2], Advance to Index 1 (Candidate 3)',
    phase: 'BACKTRACK',
    codeLine: 36,
    arr: [
      { val: 2, state: 'inactive' },
      { val: 3, state: 'pointer', label: 'ind=1' },
      { val: 6, state: 'inactive' },
      { val: 7, state: 'inactive' }
    ],
    pointers: [{ name: 'ind', index: 1 }],
    auxiliaryTrack: [
      { label: 'Current Combination', items: [2, 2] },
      { label: 'Found Combinations', items: [] }
    ],
    customCard: {
      title: 'Backtrack & Advance',
      rows: [
        { label: 'Popped', value: '2' },
        { label: 'Current Stack', value: '[2, 2]' },
        { label: 'Remaining Target', value: '3' },
        { label: 'Active Candidate', value: 'candidates[1] = 3' }
      ]
    },
    variables: { ind: 1, candidate: 3, remain: 3, current: '[2, 2]', resultCount: 0 },
    explain: 'Pop the last 2 from [2, 2, 2], restoring remaining target to 3. Advance to candidate 3 at ind = 1.',
    intuition: 'Backtracking undoes the state change so sibling branches can be explored cleanly.'
  },
  {
    title: '6. Pick Candidate 3: Remaining Target = 3 - 3 = 0 -> Match 1 Found!',
    phase: 'MATCH_FOUND',
    codeLine: 23,
    arr: [
      { val: 2, state: 'match', label: 'in combo' },
      { val: 3, state: 'match', label: 'in combo' },
      { val: 6, state: 'inactive' },
      { val: 7, state: 'inactive' }
    ],
    pointers: [{ name: 'ind', index: 1 }],
    auxiliaryTrack: [
      { label: 'Current Combination', items: [2, 2, 3] },
      { label: 'Found Combinations', items: ['[2, 2, 3]'] }
    ],
    customCard: {
      title: 'Solution Found!',
      rows: [
        { label: 'Matched Combo', value: '[2, 2, 3]' },
        { label: 'Sum', value: '2 + 2 + 3 = 7' },
        { label: 'Remaining Target', value: '0' },
        { label: 'Status', value: 'Base Case Triggered -> Added to Result' }
      ]
    },
    variables: { ind: 1, candidate: 3, remain: 0, current: '[2, 2, 3]', resultCount: 1 },
    explain: 'Candidate 3 matches remaining target 3 exactly. Remaining target = 0! Record valid combination [2, 2, 3].',
    intuition: 'Base case target == 0 triggers recording of a deep copy of current.'
  },
  {
    title: '7. Backtrack to Root & Advance to Index 3 (Candidate 7)',
    phase: 'EXPLORE',
    codeLine: 40,
    arr: [
      { val: 2, state: 'inactive' },
      { val: 3, state: 'inactive' },
      { val: 6, state: 'inactive' },
      { val: 7, state: 'pointer', label: 'ind=3' }
    ],
    pointers: [{ name: 'ind', index: 3 }],
    auxiliaryTrack: [
      { label: 'Current Combination', items: [] },
      { label: 'Found Combinations', items: ['[2, 2, 3]'] }
    ],
    customCard: {
      title: 'Exploring Candidate 7',
      rows: [
        { label: 'Current Stack', value: '[]' },
        { label: 'Remaining Target', value: '7' },
        { label: 'Active Candidate', value: 'candidates[3] = 7' },
        { label: 'Check', value: '7 <= 7 -> Pick' }
      ]
    },
    variables: { ind: 3, candidate: 7, remain: 7, current: '[]', resultCount: 1 },
    explain: 'After exploring all branches starting with 2, 3, and 6, we backtrack to the root and examine candidate 7.',
    intuition: 'Candidate 7 matches target 7 directly in one step.'
  },
  {
    title: '8. Pick Candidate 7: Remaining Target = 7 - 7 = 0 -> Match 2 Found!',
    phase: 'MATCH_FOUND',
    codeLine: 23,
    arr: [
      { val: 2, state: 'inactive' },
      { val: 3, state: 'inactive' },
      { val: 6, state: 'inactive' },
      { val: 7, state: 'match', label: 'matched' }
    ],
    pointers: [{ name: 'ind', index: 3 }],
    auxiliaryTrack: [
      { label: 'Current Combination', items: [7] },
      { label: 'Found Combinations', items: ['[2, 2, 3]', '[7]'] }
    ],
    customCard: {
      title: 'Solution Found!',
      rows: [
        { label: 'Matched Combo', value: '[7]' },
        { label: 'Sum', value: '7' },
        { label: 'Remaining Target', value: '0' },
        { label: 'Status', value: 'Added to Result' }
      ]
    },
    variables: { ind: 3, candidate: 7, remain: 0, current: '[7]', resultCount: 2 },
    explain: 'Picked candidate 7. Remaining target is 0. Record valid combination [7].',
    intuition: 'A single element can satisfy the target on its own.'
  },
  {
    title: '9. Completed: All Backtracking Branches Explored',
    phase: 'COMPLETED',
    codeLine: 47,
    arr: [
      { val: 2, state: 'match' },
      { val: 3, state: 'match' },
      { val: 6, state: 'inactive' },
      { val: 7, state: 'match' }
    ],
    pointers: [],
    auxiliaryTrack: [
      { label: 'Final Combinations', items: ['[2, 2, 3]', '[7]'] }
    ],
    customCard: {
      title: 'Final Summary',
      rows: [
        { label: 'Total Combinations', value: '2' },
        { label: 'Combinations', value: '[[2, 2, 3], [7]]' },
        { label: 'Search Space', value: 'Exhaustive Pick/Not-Pick Complete' },
        { label: 'Complexity', value: 'O(2^T * K) Time | O(K * X) Space' }
      ]
    },
    variables: { totalCombinations: 2, finalResult: '[[2, 2, 3], [7]]' },
    explain: 'Entire recursion tree traversed. Exactly two unique combinations sum to 7: [2, 2, 3] and [7].',
    intuition: 'Pick / not-pick tree guarantees all unique valid combinations are discovered.'
  }
];
