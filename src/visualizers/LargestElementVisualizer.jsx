import React from 'react';

export const meta = {
  display_id: 'Q-001',
  title: 'Largest Element In Array',
  category: 'Arrays',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Find the maximum value present in an unsorted array of integers.'
};

export const solutions = {
  cpp: `// C++ Optimal Solution: Single Pass Traversal
// Time Complexity: O(N) — each element inspected exactly once
// Space Complexity: O(1) — constant auxiliary space
#include <vector>
using namespace std;

class Solution {
public:
    int largest(vector<int>& arr) {
        if (arr.empty()) return -1;

        // Line 12: Initialize max tracker with first element
        int maxVal = arr[0];

        // Line 15: Iterate through remaining elements
        for (int i = 1; i < (int)arr.size(); ++i) {
            // Line 17: Compare current element against recorded max
            if (arr[i] > maxVal) {
                // Line 19: Update global maximum
                maxVal = arr[i];
            }
        }

        // Line 24: Return largest element found
        return maxVal;
    }
};`,
  python: `# Python 3 Optimal Solution: Single Pass Traversal
# Time Complexity: O(N) | Space Complexity: O(1)

class Solution:
    def largest(self, arr: list[int]) -> int:
        if not arr:
            return -1

        # Line 9: Initialize max with first element
        max_val = arr[0]

        # Line 12: Iterate through remaining elements
        for i in range(1, len(arr)):
            # Line 14: Compare and update max if current is larger
            if arr[i] > max_val:
                max_val = arr[i]

        # Line 18: Return final maximum
        return max_val
`,
  java: `// Java Optimal Solution: Single Pass Traversal
// Time Complexity: O(N) | Space Complexity: O(1)

class Solution {
    public int largest(int[] arr) {
        if (arr == null || arr.length == 0) return -1;

        // Line 9: Track current largest element
        int maxVal = arr[0];

        // Line 12: Single pass inspection
        for (int i = 1; i < arr.length; i++) {
            // Line 14: Update max when larger item found
            if (arr[i] > maxVal) {
                maxVal = arr[i];
            }
        }

        // Line 20: Return maximum
        return maxVal;
    }
}
`,
  typescript: `// TypeScript Optimal Solution
// Time Complexity: O(N) | Space Complexity: O(1)

function largest(arr: number[]): number {
  if (arr.length === 0) return -1;

  let maxVal = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxVal) {
      maxVal = arr[i];
    }
  }

  return maxVal;
}
`
};

export const steps = [
  {
    i: null,
    ans: 0,
    codeLine: 12,
    title: "Initialize 'maxVal' = arr[0] (1)",
    operation: "Initialize maxVal with arr[0]",
    state: { current: 1, maxVal: 1, i: 0 },
    decision: "Array non-empty (n = 5)",
    result: "maxVal initialized to 1",
    msg: "Initialize 'maxVal' with the first element (arr[0] = 1)."
  },
  {
    i: 1,
    ans: 0,
    codeLine: 15,
    title: "Start Loop at Index 1",
    operation: "Initialize loop iteration pointer i = 1",
    state: { current: 8, maxVal: 1, i: 1 },
    decision: "1 < 5 → True",
    result: "Inspect element arr[1] = 8",
    msg: "Start iteration with pointer 'i' at index 1 (val = 8)."
  },
  {
    i: 1,
    ans: 0,
    codeLine: 17,
    title: "Compare: arr[1] (8) > maxVal (1)",
    operation: "Comparing arr[1] against maxVal",
    state: { current: 8, maxVal: 1, i: 1 },
    decision: "8 > 1 → True",
    result: "Condition met: arr[1] is greater than current max",
    msg: "Compare: Is arr[1] (8) > current 'maxVal' (1)? True."
  },
  {
    i: 1,
    ans: 1,
    codeLine: 19,
    title: "Update maxVal = 8",
    operation: "Update maxVal = arr[1]",
    state: { current: 8, maxVal: 8, i: 1 },
    decision: "State assignment executed",
    result: "maxVal updated from 1 to 8",
    msg: "Update 'maxVal' to 8 at index 1."
  },
  {
    i: 2,
    ans: 1,
    codeLine: 15,
    title: "Advance to Index 2",
    operation: "Incrementing pointer i to 2",
    state: { current: 7, maxVal: 8, i: 2 },
    decision: "2 < 5 → True",
    result: "Inspect element arr[2] = 7",
    msg: "Increment 'i' to index 2 (val = 7)."
  },
  {
    i: 2,
    ans: 1,
    codeLine: 17,
    title: "Compare: arr[2] (7) > maxVal (8)",
    operation: "Comparing arr[2] against maxVal",
    state: { current: 7, maxVal: 8, i: 2 },
    decision: "7 > 8 → False",
    result: "Maximum unchanged (maxVal remains 8)",
    msg: "7 > 8 is False. 'maxVal' remains 8."
  },
  {
    i: 3,
    ans: 1,
    codeLine: 15,
    title: "Advance to Index 3",
    operation: "Incrementing pointer i to 3",
    state: { current: 56, maxVal: 8, i: 3 },
    decision: "3 < 5 → True",
    result: "Inspect element arr[3] = 56",
    msg: "Increment 'i' to index 3 (val = 56)."
  },
  {
    i: 3,
    ans: 1,
    codeLine: 17,
    title: "Compare: arr[3] (56) > maxVal (8)",
    operation: "Comparing arr[3] against maxVal",
    state: { current: 56, maxVal: 8, i: 3 },
    decision: "56 > 8 → True",
    result: "Condition met: arr[3] is greater than current max",
    msg: "56 > 8 is True. Update 'maxVal'."
  },
  {
    i: 3,
    ans: 3,
    codeLine: 19,
    title: "Update maxVal = 56",
    operation: "Update maxVal = arr[3]",
    state: { current: 56, maxVal: 56, i: 3 },
    decision: "State assignment executed",
    result: "maxVal updated from 8 to 56",
    msg: "Update 'maxVal' to 56 at index 3."
  },
  {
    i: 4,
    ans: 3,
    codeLine: 15,
    title: "Advance to Index 4",
    operation: "Incrementing pointer i to 4",
    state: { current: 90, maxVal: 56, i: 4 },
    decision: "4 < 5 → True",
    result: "Inspect element arr[4] = 90",
    msg: "Increment 'i' to index 4 (val = 90)."
  },
  {
    i: 4,
    ans: 3,
    codeLine: 17,
    title: "Compare: arr[4] (90) > maxVal (56)",
    operation: "Comparing arr[4] against maxVal",
    state: { current: 90, maxVal: 56, i: 4 },
    decision: "90 > 56 → True",
    result: "Condition met: arr[4] is greater than current max",
    msg: "90 > 56 is True. Update 'maxVal'."
  },
  {
    i: 4,
    ans: 4,
    codeLine: 19,
    title: "Update maxVal = 90",
    operation: "Update maxVal = arr[4]",
    state: { current: 90, maxVal: 90, i: 4 },
    decision: "State assignment executed",
    result: "maxVal updated from 56 to 90",
    msg: "Update 'maxVal' to 90 at index 4."
  },
  {
    i: null,
    ans: 4,
    codeLine: 24,
    title: "Traversal Complete",
    operation: "Return largest element found",
    state: { current: null, maxVal: 90, i: "done" },
    decision: "5 < 5 → False (loop finished)",
    result: "Return final maxVal = 90",
    msg: "Array traversal complete. Return maxVal = 90."
  }
];

export default function LargestElementVisualizer({ currentStep = 0 }) {
  const array = [1, 8, 7, 56, 90];
  const stepIdx = Math.min(Math.max(0, currentStep), steps.length - 1);
  const stepData = steps[stepIdx] || steps[0];

  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      {/* Visualizer Step Explanation Callout */}
      <div className="w-full max-w-2xl mb-6 p-3.5 rounded-lg bg-[var(--board-raised-2)] border border-[var(--line)] flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
        <p className="text-xs sm:text-sm text-[var(--chalk)] font-sans leading-relaxed">
          <span className="font-semibold text-indigo-600 dark:text-indigo-400 mr-1.5">
            Step {stepIdx + 1}:
          </span>
          {stepData.msg}
        </p>
      </div>

      {/* Array Canvas */}
      <div className="relative w-full max-w-2xl min-h-[220px] flex flex-col justify-center items-center bg-[var(--board)] rounded-lg border border-[var(--line)] p-6 overflow-hidden">
        <div className="relative flex gap-3 sm:gap-4.5 z-20">
          {array.map((val, idx) => {
            const isAns = stepData.ans === idx;
            const isI = stepData.i === idx;

            return (
              <div key={idx} className="flex flex-col items-center">
                {/* Fixed Top Indicator for 'i' iterator */}
                <div className="h-7 mb-1.5 flex items-center justify-center">
                  {isI ? (
                    <div className="text-amber-500 font-mono text-xs font-bold flex flex-col items-center animate-bounce">
                      <span>i</span>
                      <span className="text-[10px] -mt-1">↓</span>
                    </div>
                  ) : (
                    <span className="opacity-0 text-xs">·</span>
                  )}
                </div>

                {/* Main Array Element Tile */}
                <div
                  className={`
                    w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center text-lg sm:text-xl font-mono font-bold border transition-all duration-200
                    ${isAns
                      ? 'bg-emerald-500/15 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                      : isI
                      ? 'bg-amber-500/15 border-2 border-amber-500 text-amber-600 dark:text-amber-400'
                      : 'bg-[var(--board-raised-2)] border-[var(--line)] text-[var(--chalk)]'
                    }
                  `}
                >
                  {val}
                </div>

                {/* Index Sub-label */}
                <div className="mt-1.5 text-[11px] text-[var(--chalk-faint)] font-mono">[{idx}]</div>

                {/* Bottom Indicator for 'maxVal' variable */}
                <div className="h-7 mt-1.5 flex items-center justify-center">
                  {isAns ? (
                    <div className="text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold flex flex-col items-center">
                      <span className="text-[10px] -mb-1">↑</span>
                      <span>maxVal</span>
                    </div>
                  ) : (
                    <span className="opacity-0 text-xs">·</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Execution Diagnostics Bar */}
      <div className="w-full max-w-2xl mt-4 flex items-center justify-between text-xs font-mono text-[var(--chalk-dim)] p-2.5 rounded-lg bg-[var(--board-raised-2)] border border-[var(--line)]">
        <div>
          Active Code Line:{' '}
          <span className="text-indigo-600 dark:text-indigo-400 font-bold ml-1">
            L{stepData.codeLine}
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> maxVal
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" /> i
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[var(--board-hover)] border border-[var(--line)]" /> Unvisited
          </span>
        </div>
      </div>
    </div>
  );
}