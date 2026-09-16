import React from 'react';

export const meta = {
  title: 'Longest Consecutive Sequence in an Array',
  category: 'Arrays & Hashing',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Finds the length of the longest consecutive elements sequence in an unsorted array in O(N) time using a Hash Set to only initiate counting from the sequence start (where x - 1 does not exist).'
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
            // Only start count if x is the beginning of a sequence
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
class Solution:
    def longestConsecutive(self, nums: list[int]) -> int:
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
import java.util.*;

class Solution {
    public int longestConsecutive(int[] nums) {
        if (nums.length == 0) return 0;
        Set<Integer> set = new HashSet<>();
        for (int num : nums) set.add(num);

        int longest = 0;
        for (int x : set) {
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
var longestConsecutive = function(nums) {
    if (nums.length === 0) return 0;
    const set = new Set(nums);
    let longest = 0;

    for (const x of set) {
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
    title: '1. Build Hash Set: {100, 4, 200, 1, 3, 2}',
    phase: 'SET_CREATION',
    codeLine: 13,
    setValues: [1, 2, 3, 4, 100, 200],
    currentNum: null,
    activeStreak: [],
    longest: 0,
    variables: { setSize: 6, longest: 0 },
    explain: 'Insert all numbers into an unordered hash set for O(1) average lookup.',
    intuition: 'A number x can only be the start of a consecutive streak if (x - 1) is NOT in the set.'
  },
  {
    title: '2. Inspect 100: (100 - 1 = 99) not in set -> Streak: [100] (len: 1)',
    phase: 'STREAK_CHECK',
    codeLine: 17,
    setValues: [1, 2, 3, 4, 100, 200],
    currentNum: 100,
    activeStreak: [100],
    longest: 1,
    variables: { x: 100, 'has(99)': false, streak: 1, longest: 1 },
    explain: '99 is not in the set, so 100 is a streak starter. 101 is not in set. Streak ends at length 1. longest = 1.',
    intuition: 'Isolated number forms a streak of length 1.'
  },
  {
    title: '3. Inspect 4: (4 - 1 = 3) is in set -> Skip (Not Streak Starter)',
    phase: 'SKIP_NON_STARTER',
    codeLine: 17,
    setValues: [1, 2, 3, 4, 100, 200],
    currentNum: 4,
    activeStreak: [],
    longest: 1,
    variables: { x: 4, 'has(3)': true, action: 'Skip to avoid redundant O(N^2) work' },
    explain: '3 is already in the set, meaning 4 is part of an ongoing chain that starts earlier. Skipping ensures every element is visited at most twice.',
    intuition: 'This simple check guarantees strictly linear O(N) overall runtime!'
  },
  {
    title: '4. Inspect 200: (200 - 1 = 199) not in set -> Streak: [200] (len: 1)',
    phase: 'STREAK_CHECK',
    codeLine: 17,
    setValues: [1, 2, 3, 4, 100, 200],
    currentNum: 200,
    activeStreak: [200],
    longest: 1,
    variables: { x: 200, 'has(199)': false, streak: 1, longest: 1 },
    explain: '199 not in set. 201 not in set. Streak = 1. longest remains 1.',
    intuition: 'Isolated number.'
  },
  {
    title: '5. Inspect 1: (1 - 1 = 0) not in set -> Expand Streak: [1, 2, 3, 4]',
    phase: 'STREAK_EXPANSION',
    codeLine: 21,
    setValues: [1, 2, 3, 4, 100, 200],
    currentNum: 1,
    activeStreak: [1, 2, 3, 4],
    longest: 4,
    variables: { x: 1, 'has(0)': false, expanded: '1 -> 2 -> 3 -> 4', streak: 4, longest: 4 },
    explain: '0 is not in set, so 1 is a starter! Look up 2 (yes), 3 (yes), 4 (yes), 5 (no). Streak length is 4! Update longest = max(1, 4) = 4.',
    intuition: 'Found consecutive sequence: [1, 2, 3, 4] with length 4.'
  },
  {
    title: '6. Inspect Remaining (2, 3): Skipped (predecessors exist) -> Finished!',
    phase: 'COMPLETED',
    codeLine: 28,
    setValues: [1, 2, 3, 4, 100, 200],
    currentNum: null,
    activeStreak: [1, 2, 3, 4],
    longest: 4,
    variables: { resultLength: 4, sequence: '[1, 2, 3, 4]', complexity: 'O(N) Time' },
    explain: '2 and 3 both have predecessors and are skipped. Scan ends. Longest consecutive sequence length is 4.',
    intuition: 'Optimal O(N) execution achieved without sorting!'
  }
];

export default function LongestConsecutiveSequenceInAnArrayVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Longest Streak Banner */}
      <div className="flex items-center gap-4">
        <span className="px-4 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-sm font-semibold">
          Longest Streak = {step.longest}
        </span>
        <span className="text-xs font-mono text-[#8a8ea3] px-3 py-1.5 rounded-xl bg-[#141622] border border-[#272b3d]">
          Phase: {step.phase}
        </span>
      </div>

      {/* Set Elements Display */}
      <div className="w-full flex flex-col items-center gap-2">
        <span className="text-xs font-mono text-[#8a8ea3]">Hash Set Elements:</span>
        <div className="flex items-center justify-center gap-3 py-2 flex-wrap">
          {step.setValues.map((val, idx) => {
            const isCurrent = step.currentNum === val;
            const inActiveStreak = step.activeStreak.includes(val);

            let style = 'bg-[#181a24] text-white border-[#2b2e40]';
            if (inActiveStreak) {
              style = 'bg-emerald-500/25 text-emerald-300 border-emerald-400 scale-105 shadow-md shadow-emerald-500/20';
            } else if (isCurrent) {
              style = 'bg-amber-500/25 text-amber-300 border-amber-400 scale-105 shadow-md shadow-amber-500/20';
            }

            return (
              <div
                key={idx}
                className={`w-14 h-14 rounded-xl border flex flex-col items-center justify-center font-mono font-bold transition-all duration-300 ${style}`}
              >
                <span className="text-lg">{val}</span>
                <span className="text-[8px] text-[#5b6076]">val</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Sequence Chain */}
      {step.activeStreak.length > 0 && (
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#141622] border border-[#272b3d] text-xs font-mono">
          <span className="text-[#8a8ea3]">Active Chain:</span>
          {step.activeStreak.map((num, idx) => (
            <React.Fragment key={idx}>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                {num}
              </span>
              {idx < step.activeStreak.length - 1 && <span className="text-[#555a72]">→</span>}
            </React.Fragment>
          ))}
          <span className="text-emerald-400 ml-2 font-bold">(len: {step.activeStreak.length})</span>
        </div>
      )}
    </div>
  );
}
