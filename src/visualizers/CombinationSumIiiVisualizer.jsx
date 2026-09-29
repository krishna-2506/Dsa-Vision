export const rendererType = 'array-scan';

export const meta = {
  title: 'Combination Sum III',
  category: 'Recursion / Backtracking',
  difficulty: 'Medium',
  timeComplexity: 'O(C(9, K) * K)',
  spaceComplexity: 'O(K) recursion stack',
  description: 'Finds all valid combinations of K distinct numbers chosen from the digits 1 through 9 such that their sum equals N. Each number is used at most once.'
};

export const ideaMap = [
  {
    title: 'Bounded Search Space {1..9}',
    description: 'The search space is strictly confined to digits 1 through 9. Each digit can be used at most once, so iterating from start to 9 naturally enforces strictly increasing combinations and avoids permutations.'
  },
  {
    title: 'Dual Pruning Conditions',
    description: 'Pruning occurs when: 1) The current combination size reaches K (if target == 0 record solution, else return), 2) Candidate digit i > remaining target (since digits only increase, all subsequent loop branches would exceed target).'
  },
  {
    title: 'Combination Size Constraint',
    description: 'If the combination size exceeds K or the remaining target becomes negative, terminate recursion immediately to preserve optimal O(C(9, K)) performance.'
  }
];

export const solutions = {
  cpp: `// C++ Combination Sum III Backtracking
// Time: O(C(9, K) * K) | Space: O(K)
#include <vector>
using namespace std;

class Solution {
private:
    void backtrack(int start, int k, int target, vector<int>& current, vector<vector<int>>& result) {
        // Base case: exactly K numbers and target achieved
        if (current.size() == k && target == 0) {
            result.push_back(current);
            return;
        }

        // Prune if size exceeded or target negative
        if (current.size() >= k || target < 0) return;

        for (int i = start; i <= 9; i++) {
            if (i > target) break; // Prune: numbers only get larger

            current.push_back(i);
            backtrack(i + 1, k, target - i, current, result);
            current.pop_back(); // Backtrack
        }
    }

public:
    vector<vector<int>> combinationSum3(int k, int n) {
        vector<vector<int>> result;
        vector<int> current;
        backtrack(1, k, n, current, result);
        return result;
    }
};`,
  python: `# Python 3 Combination Sum III Backtracking
class Solution:
    def combinationSum3(self, k: int, n: int) -> list[list[int]]:
        result = []
        current = []

        def backtrack(start: int, target: int):
            if len(current) == k and target == 0:
                result.append(list(current))
                return
            if len(current) >= k or target < 0:
                return

            for i in range(start, 10):
                if i > target:
                    break
                current.append(i)
                backtrack(i + 1, target - i)
                current.pop()

        backtrack(1, n)
        return result`,
  java: `// Java Combination Sum III Backtracking
import java.util.*;

class Solution {
    private void backtrack(int start, int k, int target, List<Integer> curr, List<List<Integer>> result) {
        if (curr.size() == k && target == 0) {
            result.add(new ArrayList<>(curr));
            return;
        }
        if (curr.size() >= k || target < 0) return;

        for (int i = start; i <= 9; i++) {
            if (i > target) break; // Prune

            curr.add(i);
            backtrack(i + 1, k, target - i, curr, result);
            curr.remove(curr.size() - 1);
        }
    }

    public List<List<Integer>> combinationSum3(int k, int n) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(1, k, n, new ArrayList<>(), result);
        return result;
    }
}`,
  javascript: `// JavaScript Combination Sum III Backtracking
var combinationSum3 = function(k, n) {
    const result = [];
    const current = [];

    function backtrack(start, target) {
        if (current.length === k && target === 0) {
            result.push([...current]);
            return;
        }
        if (current.length >= k || target < 0) return;

        for (let i = start; i <= 9; i++) {
            if (i > target) break;

            current.push(i);
            backtrack(i + 1, target - i);
            current.pop();
        }
    }

    backtrack(1, n);
    return result;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: Choose K = 3 Digits from {1..9} Summing to N = 7',
    phase: 'INITIAL',
    codeLine: 40,
    arr: [
      { val: 1, state: 'pointer', label: 'start' },
      { val: 2, state: 'inactive' },
      { val: 3, state: 'inactive' },
      { val: 4, state: 'inactive' },
      { val: 5, state: 'inactive' },
      { val: 6, state: 'inactive' },
      { val: 7, state: 'inactive' },
      { val: 8, state: 'inactive' },
      { val: 9, state: 'inactive' }
    ],
    pointers: [{ name: 'start', index: 0 }],
    auxiliaryTrack: [
      { label: 'Current Selection (max K=3)', items: [] },
      { label: 'Valid Combinations', items: [] }
    ],
    customCard: {
      title: 'Problem Constraints',
      rows: [
        { label: 'K (Numbers needed)', value: '3' },
        { label: 'Target Sum (N)', value: '7' },
        { label: 'Allowed Domain', value: 'Digits 1 to 9 (each used <= 1 time)' },
        { label: 'Recursion Depth Limit', value: 'Max depth 3' }
      ]
    },
    variables: { k: 3, n: 7, target: 7, currentSize: 0, resultCount: 0 },
    explain: 'Initialize bounded backtracking. We need exactly 3 distinct numbers summing to 7.',
    intuition: 'Strictly increasing loop (start to 9) prevents duplicate permutations like [1, 2, 4] and [2, 1, 4].'
  },
  {
    title: '2. Pick 1: Current = [1], Remaining Target = 7 - 1 = 6',
    phase: 'PICK',
    codeLine: 30,
    arr: [
      { val: 1, state: 'active', label: 'picked' },
      { val: 2, state: 'pointer', label: 'start=2' },
      { val: 3, state: 'inactive' },
      { val: 4, state: 'inactive' },
      { val: 5, state: 'inactive' },
      { val: 6, state: 'inactive' },
      { val: 7, state: 'inactive' },
      { val: 8, state: 'inactive' },
      { val: 9, state: 'inactive' }
    ],
    pointers: [{ name: 'i', index: 0 }],
    auxiliaryTrack: [
      { label: 'Current Selection (max K=3)', items: [1] },
      { label: 'Valid Combinations', items: [] }
    ],
    customCard: {
      title: 'Backtracking State',
      rows: [
        { label: 'Selected Digit', value: '1' },
        { label: 'Current Combo', value: '[1]' },
        { label: 'Remaining Target', value: '6' },
        { label: 'Next Start Index', value: '2' }
      ]
    },
    variables: { k: 3, n: 7, target: 6, currentSize: 1, resultCount: 0 },
    explain: 'Digit 1 <= 7, so append 1 to current. Remaining sum required is 6, needing 2 more digits.',
    intuition: 'Branching continues from digit 2 upwards.'
  },
  {
    title: '3. Pick 2: Current = [1, 2], Remaining Target = 6 - 2 = 4',
    phase: 'PICK',
    codeLine: 30,
    arr: [
      { val: 1, state: 'active' },
      { val: 2, state: 'active', label: 'picked' },
      { val: 3, state: 'inactive' },
      { val: 4, state: 'pointer', label: 'start=3' },
      { val: 5, state: 'inactive' },
      { val: 6, state: 'inactive' },
      { val: 7, state: 'inactive' },
      { val: 8, state: 'inactive' },
      { val: 9, state: 'inactive' }
    ],
    pointers: [{ name: 'i', index: 1 }],
    auxiliaryTrack: [
      { label: 'Current Selection (max K=3)', items: [1, 2] },
      { label: 'Valid Combinations', items: [] }
    ],
    customCard: {
      title: 'Backtracking State',
      rows: [
        { label: 'Selected Digit', value: '2' },
        { label: 'Current Combo', value: '[1, 2]' },
        { label: 'Remaining Target', value: '4' },
        { label: 'Digits Needed', value: '1 more' }
      ]
    },
    variables: { k: 3, n: 7, target: 4, currentSize: 2, resultCount: 0 },
    explain: 'Pick 2. Current combo is [1, 2], remaining target is 4. Exactly 1 digit remains to be chosen.',
    intuition: 'We now seek a single digit >= 3 that equals 4.'
  },
  {
    title: '4. Try 3: 1 + 2 + 3 = 6 != 7 (Target = 1, size = 3 reached -> Return)',
    phase: 'EVALUATE',
    codeLine: 20,
    arr: [
      { val: 1, state: 'active' },
      { val: 2, state: 'active' },
      { val: 3, state: 'mismatch', label: 'sum=6 < 7' },
      { val: 4, state: 'inactive' },
      { val: 5, state: 'inactive' },
      { val: 6, state: 'inactive' },
      { val: 7, state: 'inactive' },
      { val: 8, state: 'inactive' },
      { val: 9, state: 'inactive' }
    ],
    pointers: [{ name: 'i', index: 2 }],
    auxiliaryTrack: [
      { label: 'Current Selection (max K=3)', items: [1, 2, 3] },
      { label: 'Valid Combinations', items: [] }
    ],
    customCard: {
      title: 'Branch Evaluated',
      rows: [
        { label: 'Combo', value: '[1, 2, 3]' },
        { label: 'Sum', value: '6' },
        { label: 'Remaining Target', value: '1 (not 0)' },
        { label: 'Size Check', value: 'size == 3 but target != 0 -> Backtrack' }
      ]
    },
    variables: { k: 3, n: 7, target: 1, currentSize: 3, resultCount: 0 },
    explain: 'Choosing 3 gives size K=3 but sum is 6 (target remaining = 1). Not a valid solution. Backtrack.',
    intuition: 'Size constraint K reached without target == 0 triggers backtrack.'
  },
  {
    title: '5. Pick 4: 1 + 2 + 4 = 7 -> Match Found! (size = 3, target = 0)',
    phase: 'MATCH_FOUND',
    codeLine: 20,
    arr: [
      { val: 1, state: 'match' },
      { val: 2, state: 'match' },
      { val: 3, state: 'inactive' },
      { val: 4, state: 'match', label: 'match!' },
      { val: 5, state: 'inactive' },
      { val: 6, state: 'inactive' },
      { val: 7, state: 'inactive' },
      { val: 8, state: 'inactive' },
      { val: 9, state: 'inactive' }
    ],
    pointers: [{ name: 'i', index: 3 }],
    auxiliaryTrack: [
      { label: 'Current Selection (max K=3)', items: [1, 2, 4] },
      { label: 'Valid Combinations', items: ['[1, 2, 4]'] }
    ],
    customCard: {
      title: 'Valid Combination Found!',
      rows: [
        { label: 'Combination', value: '[1, 2, 4]' },
        { label: 'Sum', value: '1 + 2 + 4 = 7' },
        { label: 'Count of Digits', value: '3 (equals K)' },
        { label: 'Status', value: 'Base Case Met -> Added to Results' }
      ]
    },
    variables: { k: 3, n: 7, target: 0, currentSize: 3, resultCount: 1 },
    explain: 'Choosing 4 gives combo [1, 2, 4] with sum 7 and size 3. Valid combination recorded!',
    intuition: 'Both conditions (size == K and target == 0) are satisfied.'
  },
  {
    title: '6. Prune: Digits >= 5 Exceed Remaining Target (i > target)',
    phase: 'PRUNE',
    codeLine: 28,
    arr: [
      { val: 1, state: 'active' },
      { val: 2, state: 'active' },
      { val: 3, state: 'inactive' },
      { val: 4, state: 'visited' },
      { val: 5, state: 'inactive', label: '5 > 4 (PRUNE)' },
      { val: 6, state: 'inactive' },
      { val: 7, state: 'inactive' },
      { val: 8, state: 'inactive' },
      { val: 9, state: 'inactive' }
    ],
    pointers: [{ name: 'i', index: 4 }],
    auxiliaryTrack: [
      { label: 'Current Selection (max K=3)', items: [1, 2] },
      { label: 'Valid Combinations', items: ['[1, 2, 4]'] }
    ],
    customCard: {
      title: 'Early Pruning',
      rows: [
        { label: 'Digit Evaluated', value: '5' },
        { label: 'Remaining Target', value: '4' },
        { label: 'Condition', value: '5 > 4 -> break loop' },
        { label: 'Skipped Subtrees', value: 'Digits 5, 6, 7, 8, 9 immediately skipped' }
      ]
    },
    variables: { k: 3, n: 7, target: 4, currentSize: 2, pruned: true, resultCount: 1 },
    explain: 'Digit 5 exceeds remaining target 4. Since digits strictly increase, all remaining digits (5..9) will also exceed target. Break early.',
    intuition: 'Pruning stops unproductive branches from ever executing.'
  },
  {
    title: '7. Completed: Exactly 1 Unique Combination [[1, 2, 4]]',
    phase: 'COMPLETED',
    codeLine: 37,
    arr: [
      { val: 1, state: 'match' },
      { val: 2, state: 'match' },
      { val: 3, state: 'inactive' },
      { val: 4, state: 'match' },
      { val: 5, state: 'inactive' },
      { val: 6, state: 'inactive' },
      { val: 7, state: 'inactive' },
      { val: 8, state: 'inactive' },
      { val: 9, state: 'inactive' }
    ],
    pointers: [],
    auxiliaryTrack: [
      { label: 'Final Result', items: ['[1, 2, 4]'] }
    ],
    customCard: {
      title: 'Final Summary',
      rows: [
        { label: 'Valid Combinations', value: '[[1, 2, 4]]' },
        { label: 'Total Count', value: '1' },
        { label: 'Search Space Explored', value: 'Bounded {1..9} complete' },
        { label: 'Time Complexity', value: 'O(C(9, K) * K)' }
      ]
    },
    variables: { totalCombinations: 1, finalResult: '[[1, 2, 4]]' },
    explain: 'Search concluded. The only combination of 3 distinct digits from 1 to 9 summing to 7 is [1, 2, 4].',
    intuition: 'Ordered backtrack with dual pruning quickly verifies exhaustion.'
  }
];
