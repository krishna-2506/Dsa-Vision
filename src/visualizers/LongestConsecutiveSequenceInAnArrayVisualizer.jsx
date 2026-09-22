// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Longest Consecutive Sequence in an Array',
  category: 'Arrays & Hashing',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Finds the length of the longest consecutive sequence in an unsorted array in O(N) time using a Hash Set to only initiate counting streaks from true sequence starters (where x - 1 does not exist).'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Longest Consecutive Sequence Strategy',
  nodes: [
    { id: 'root', label: 'Hash Set Sequence Start Pruning', children: ['build-set', 'starter-predicate', 'streak-expansion', 'skip-interior', 'complexity'] },
    { id: 'build-set', label: '1. O(1) Hash Set Lookup', detail: 'Store all array elements in an unordered hash set to allow instant O(1) membership checks.' },
    { id: 'starter-predicate', label: '2. Starter Predicate (x - 1)', detail: 'Only count if (x - 1) is NOT in the set. If (x - 1) exists, x is part of a streak explored elsewhere.' },
    { id: 'streak-expansion', label: '3. Expand Consecutive Chain', detail: 'While (x + 1) exists in set, increment currNum and streak length. Update longest = max(longest, streak).' },
    { id: 'skip-interior', label: '4. Skip Non-Starters', detail: 'Skipping interior elements guarantees each number is traversed at most twice, preventing O(N^2) worst case.' },
    { id: 'complexity', label: '5. Strictly Linear Time O(N)', detail: 'Total operations bounded by 2N lookups: O(N) time and O(N) space without sorting.' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal O(N) Longest Consecutive Sequence using Hash Set
// Time Complexity: O(N) | Space Complexity: O(N)
#include <vector>
#include <unordered_set>
#include <algorithm>
using namespace std;

class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        if (nums.empty()) return 0;

        unordered_set<int> st(nums.begin(), nums.end());
        int longest = 0;

        for (int x : st) {
            // Only initiate streak count if x is the start of a sequence
            if (st.find(x - 1) == st.end()) {
                int currentNum = x;
                int currentStreak = 1;

                while (st.find(currentNum + 1) != st.end()) {
                    currentNum++;
                    currentStreak++;
                }

                longest = max(longest, currentStreak);
            }
        }

        return longest;
    }
};`,
  python: `# Python 3 Optimal O(N) Longest Consecutive Sequence
# Time Complexity: O(N) | Space Complexity: O(N)
class Solution:
    def longestConsecutive(self, nums: list[int]) -> int:
        if not nums:
            return 0

        num_set = set(nums)
        longest = 0

        for x in num_set:
            # Check if x is the start of a streak
            if x - 1 not in num_set:
                curr_num = x
                streak = 1

                while curr_num + 1 in num_set:
                    curr_num += 1
                    streak += 1

                longest = max(longest, streak)

        return longest`,
  java: `// Java Optimal O(N) Longest Consecutive Sequence
// Time Complexity: O(N) | Space Complexity: O(N)
import java.util.*;

class Solution {
    public int longestConsecutive(int[] nums) {
        if (nums.length == 0) return 0;

        Set<Integer> set = new HashSet<>();
        for (int num : nums) set.add(num);

        int longest = 0;
        for (int x : set) {
            // Check if x is streak starter
            if (!set.contains(x - 1)) {
                int curr = x;
                int streak = 1;

                while (set.contains(curr + 1)) {
                    curr++;
                    streak++;
                }
                longest = Math.max(longest, streak);
            }
        }

        return longest;
    }
}`,
  javascript: `// JavaScript Optimal O(N) Longest Consecutive Sequence
// Time Complexity: O(N) | Space Complexity: O(N)
var longestConsecutive = function(nums) {
    if (nums.length === 0) return 0;

    const set = new Set(nums);
    let longest = 0;

    for (const x of set) {
        // Only initiate count from start of streak
        if (!set.has(x - 1)) {
            let curr = x;
            let streak = 1;

            while (set.has(curr + 1)) {
                curr++;
                streak++;
            }
            longest = Math.max(longest, streak);
        }
    }

    return longest;
};`
};

export const steps = [
  {
    title: '1. Setup: Build Hash Set from Array [100, 4, 200, 1, 3, 2]',
    phase: 'SETUP',
    track: {
      label: 'Unique Hash Set Elements',
      items: [
        { val: 1 },
        { val: 2 },
        { val: 3 },
        { val: 4 },
        { val: 100 },
        { val: 200 }
      ],
      pointers: [
        { index: 4, label: 'x = 100' }
      ]
    },
    activeI: 4,
    activeJ: null,
    metrics: [
      { label: 'Set Size', value: 6 },
      { label: 'Longest Streak', value: 0 },
      { label: 'Status', value: 'Ready to scan' }
    ],
    formula: 'Set = {100, 4, 200, 1, 3, 2}',
    action: 'Insert all array elements into an unordered Hash Set for O(1) membership queries.',
    explain: 'Unsorted array contains 6 numbers. To achieve O(N) time without O(N log N) sorting, we store elements in a Hash Set and inspect streak starter candidates.',
    intuition: 'A number x can only be the beginning of a consecutive chain if (x - 1) is NOT in the set.',
    variables: { setSize: 6, longest: 0, currentStreak: 0 }
  },
  {
    title: '2. Inspect x = 100: (100 - 1 = 99) in Set? No -> Streak Starter!',
    phase: 'STREAK_CHECK',
    track: {
      label: 'Checking Starter Predicate for 100',
      items: [
        { val: 1 },
        { val: 2 },
        { val: 3 },
        { val: 4 },
        { val: 100, status: 'match', badge: 'Starter' },
        { val: 200 }
      ],
      pointers: [
        { index: 4, label: 'x = 100 (Starter)' }
      ]
    },
    activeI: 4,
    activeJ: null,
    metrics: [
      { label: 'Current x', value: 100 },
      { label: 'Set contains 99?', value: 'False (Starter!)', highlight: true },
      { label: 'Streak', value: 1 }
    ],
    formula: 'st.find(x - 1) == st.end()  // 99 not found',
    action: 'Check if 99 exists in set. 99 is absent, meaning 100 begins a sequence!',
    explain: 'Because no predecessor exists for 100, 100 is verified as the root of its own consecutive run. We set currentNum = 100, streak = 1.',
    intuition: 'Every sequence must have a unique lowest number. Only that lowest number triggers an expansion.',
    variables: { x: 100, 'x - 1': 99, isStarter: true, streak: 1 }
  },
  {
    title: '3. Expand from 100: (100 + 1 = 101) in Set? No -> Streak Ends (len: 1)',
    phase: 'STREAK_CHECK',
    track: {
      label: 'Streak Finished for 100',
      items: [
        { val: 1 },
        { val: 2 },
        { val: 3 },
        { val: 4 },
        { val: 100, status: 'match', badge: 'Streak = 1' },
        { val: 200 }
      ],
      pointers: [
        { index: 4, label: 'Streak [100]' }
      ]
    },
    activeI: 4,
    activeJ: null,
    metrics: [
      { label: 'Sequence', value: '[100]' },
      { label: 'Streak Length', value: 1 },
      { label: 'Longest Streak', value: 1, highlight: true }
    ],
    formula: 'longest = max(0, 1) = 1',
    action: 'Lookup 101 in set. Not found. Streak [100] terminates at length 1.',
    explain: '101 does not exist. Update longest = max(0, 1) = 1.',
    intuition: 'Isolated number forms a streak of length 1.',
    variables: { x: 100, sequence: [100], streak: 1, longest: 1 }
  },
  {
    title: '4. Inspect x = 4: (4 - 1 = 3) in Set? Yes -> Skip! (Not a Starter)',
    phase: 'SKIP_NON_STARTER',
    track: {
      label: 'Pruning Non-Starter Node 4',
      items: [
        { val: 1 },
        { val: 2 },
        { val: 3, status: 'match', badge: 'Predecessor' },
        { val: 4, status: 'discarded', badge: 'Skip' },
        { val: 100 },
        { val: 200 }
      ],
      pointers: [
        { index: 3, label: '3 exists' },
        { index: 2, label: 'x = 4 (Skip)' }
      ]
    },
    activeI: 3,
    activeJ: 2,
    metrics: [
      { label: 'Current x', value: 4 },
      { label: 'Set contains 3?', value: 'True (Skip!)', highlight: true },
      { label: 'Longest Streak', value: 1 }
    ],
    formula: 'st.contains(x - 1) == true  // 3 exists ==> skip 4',
    action: 'Check if 3 exists. 3 is present in set, so 4 is NOT a sequence starter. Skip immediately!',
    explain: 'If we counted streaks starting at 4, we would re-traverse elements redundantly. Skipping non-starters ensures each element is visited at most twice.',
    intuition: 'This single conditional check prevents worst-case O(N^2) runtime.',
    variables: { x: 4, 'x - 1': 3, isStarter: false, action: 'Skip' }
  },
  {
    title: '5. Inspect x = 200: (200 - 1 = 199) in Set? No -> Streak Starter!',
    phase: 'STREAK_CHECK',
    track: {
      label: 'Checking Starter Predicate for 200',
      items: [
        { val: 1 },
        { val: 2 },
        { val: 3 },
        { val: 4 },
        { val: 100 },
        { val: 200, status: 'match', badge: 'Starter' }
      ],
      pointers: [
        { index: 5, label: 'x = 200 (Starter)' }
      ]
    },
    activeI: 5,
    activeJ: null,
    metrics: [
      { label: 'Current x', value: 200 },
      { label: 'Set contains 199?', value: 'False (Starter!)' },
      { label: 'Streak', value: 1 }
    ],
    formula: 'st.find(199) == st.end()  // 199 not found',
    action: '199 is not in set. 200 is a valid sequence starter. Lookup 201.',
    explain: '201 is not in set. Sequence [200] has length 1. longest = max(1, 1) = 1.',
    intuition: 'Another isolated streak processed in O(1) checks.',
    variables: { x: 200, isStarter: true, streak: 1, longest: 1 }
  },
  {
    title: '6. Inspect x = 1: (1 - 1 = 0) in Set? No -> Master Streak Starter!',
    phase: 'STREAK_EXPANSION',
    track: {
      label: 'Major Streak Starter Found',
      items: [
        { val: 1, status: 'match', badge: 'Starter' },
        { val: 2 },
        { val: 3 },
        { val: 4 },
        { val: 100 },
        { val: 200 }
      ],
      pointers: [
        { index: 0, label: 'x = 1 (Starter)' }
      ]
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'Current x', value: 1 },
      { label: 'Set contains 0?', value: 'False (Starter!)', highlight: true },
      { label: 'Streak Starting', value: 1 }
    ],
    formula: 'st.find(0) == st.end()  // 0 not found',
    action: '0 does not exist in set. 1 is verified as a streak starter! Begin expansion loop.',
    explain: 'Node 1 has no predecessor. We now iteratively check for consecutive successors 2, 3, 4, 5...',
    intuition: 'We are about to uncover the longest continuous chain.',
    variables: { x: 1, 'x - 1': 0, isStarter: true, currentNum: 1, streak: 1 }
  },
  {
    title: '7. Expanding Chain from 1: Look up 2 (Yes), 3 (Yes), 4 (Yes)',
    phase: 'STREAK_EXPANSION',
    track: {
      label: 'Consecutive Chain [1, 2, 3, 4]',
      items: [
        { val: 1, status: 'match', badge: '#1' },
        { val: 2, status: 'match', badge: '#2' },
        { val: 3, status: 'match', badge: '#3' },
        { val: 4, status: 'match', badge: '#4' },
        { val: 100 },
        { val: 200 }
      ],
      pointers: [
        { index: 0, label: '1 (Start)' },
        { index: 3, label: '4 (End)' }
      ]
    },
    activeI: 0,
    activeJ: 3,
    metrics: [
      { label: 'Chain Discovered', value: '[1, 2, 3, 4]', highlight: true },
      { label: 'Chain Length', value: 4, highlight: true },
      { label: 'Lookup 5?', value: 'Absent (Stop)' }
    ],
    formula: 'while (set.contains(curr + 1)) ==> curr = 4, streak = 4',
    action: 'Look up 2 (found, streak=2) -> 3 (found, streak=3) -> 4 (found, streak=4) -> 5 (not found).',
    explain: 'Successive lookups find 2, 3, and 4 in the set. When querying 5, the lookup fails. The streak [1, 2, 3, 4] of length 4 terminates.',
    intuition: 'We update longest = max(1, 4) = 4.',
    variables: { chain: [1, 2, 3, 4], streak: 4, oldLongest: 1, newLongest: 4 }
  },
  {
    title: '8. Inspect Remaining x = 2 and x = 3: Both Skipped (Predecessors Exist)',
    phase: 'SKIP_NON_STARTER',
    track: {
      label: 'Fast-Forward Remaining Set Elements',
      items: [
        { val: 1, status: 'match', badge: 'Chain' },
        { val: 2, status: 'match', badge: 'Skip (1 in set)' },
        { val: 3, status: 'match', badge: 'Skip (2 in set)' },
        { val: 4, status: 'match', badge: 'Chain' },
        { val: 100 },
        { val: 200 }
      ],
      pointers: [
        { index: 1, label: '2 (Skip)' },
        { index: 2, label: '3 (Skip)' }
      ]
    },
    activeI: 1,
    activeJ: 2,
    metrics: [
      { label: 'x = 2', value: '1 in set -> Skip' },
      { label: 'x = 3', value: '2 in set -> Skip' },
      { label: 'Longest Maintained', value: 4 }
    ],
    formula: 'has(x - 1) == true for both 2 and 3',
    action: 'Inspect 2 (predecessor 1 exists -> skip). Inspect 3 (predecessor 2 exists -> skip).',
    explain: 'Because both elements were already counted as part of the sequence starting from 1, skipping them guarantees O(N) overall runtime.',
    intuition: 'Zero redundant work performed.',
    variables: { x2_skipped: true, x3_skipped: true, longest: 4 }
  },
  {
    title: '9. Complete: Return Longest Streak = 4 ([1, 2, 3, 4])',
    phase: 'COMPLETED',
    track: {
      label: 'Longest Consecutive Run Identified',
      items: [
        { val: 1, status: 'match', badge: '1' },
        { val: 2, status: 'match', badge: '2' },
        { val: 3, status: 'match', badge: '3' },
        { val: 4, status: 'match', badge: '4' },
        { val: 100 },
        { val: 200 }
      ],
      pointers: [
        { index: 0, label: 'Start = 1' },
        { index: 3, label: 'End = 4' }
      ]
    },
    activeI: 0,
    activeJ: 3,
    metrics: [
      { label: 'Result', value: 4, highlight: true },
      { label: 'Max Sequence', value: '[1, 2, 3, 4]' },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(N)' }
    ],
    formula: 'return longest; // 4',
    action: 'Algorithm terminates: Longest consecutive sequence length is 4.',
    explain: 'By checking only streak starters (where x - 1 does not exist), the algorithm achieves optimal O(N) time and O(N) space without sorting.',
    intuition: 'Optimal hash-based sequence discovery.',
    variables: { longestStreak: 4, sequence: [1, 2, 3, 4], time: 'O(N)', space: 'O(N)' }
  }
];
