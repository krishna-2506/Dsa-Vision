import React from 'react';

export const meta = {
  title: 'Maximum Rectangles in Binary Matrix',
  category: 'Stack and Queues',
  difficulty: 'Hard',
  timeComplexity: 'O(R * C)',
  spaceComplexity: 'O(C)',
  description: 'Finds the largest rectangle containing only 1s in a 2D binary matrix by maintaining a running histogram of consecutive 1s per column and applying the Largest Rectangle in Histogram algorithm row by row.'
};

export const solutions = {
  cpp: `// C++: Maximal Rectangle in Binary Matrix
// Time Complexity: O(R * C) | Space Complexity: O(C)
#include <vector>
#include <stack>
#include <algorithm>
using namespace std;

int largestRectangleArea(vector<int>& heights) {
    int n = heights.size();
    stack<int> st;
    int maxArea = 0;

    for (int i = 0; i <= n; i++) {
        while (!st.empty() && (i == n || heights[st.top()] >= heights[i])) {
            int h = heights[st.top()]; st.pop();
            int w = st.empty() ? i : i - st.top() - 1;
            maxArea = max(maxArea, h * w);
        }
        st.push(i);
    }
    return maxArea;
}

int maximalRectangle(vector<vector<char>>& matrix) {
    if (matrix.empty()) return 0;
    int r = matrix.size(), c = matrix[0].size();
    vector<int> heights(c, 0);
    int maxRect = 0;

    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            if (matrix[i][j] == '1') heights[j]++;
            else heights[j] = 0;
        }
        maxRect = max(maxRect, largestRectangleArea(heights));
    }
    return maxRect;
}`,
  java: `// Java: Maximal Rectangle in Binary Matrix
import java.util.Stack;

class Solution {
    private int largestRectangleArea(int[] heights) {
        int n = heights.length;
        Stack<Integer> st = new Stack<>();
        int maxArea = 0;

        for (int i = 0; i <= n; i++) {
            while (!st.isEmpty() && (i == n || heights[st.peek()] >= heights[i])) {
                int h = heights[st.pop()];
                int w = st.isEmpty() ? i : i - st.peek() - 1;
                maxArea = Math.max(maxArea, h * w);
            }
            st.push(i);
        }
        return maxArea;
    }

    public int maximalRectangle(char[][] matrix) {
        if (matrix.length == 0) return 0;
        int r = matrix.length, c = matrix[0].length;
        int[] heights = new int[c];
        int maxRect = 0;

        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                if (matrix[i][j] == '1') heights[j]++;
                else heights[j] = 0;
            }
            maxRect = Math.max(maxRect, largestRectangleArea(heights));
        }
        return maxRect;
    }
}`,
  python: `# Python 3: Maximal Rectangle in Binary Matrix
def maximal_rectangle(matrix: list[list[str]]) -> int:
    if not matrix:
        return 0
    r, c = len(matrix), len(matrix[0])
    heights = [0] * c
    max_rect = 0

    def largest_histogram(h):
        stack = []
        best = 0
        for i in range(len(h) + 1):
            while stack and (i == len(h) or h[stack[-1]] >= h[i]):
                height = h[stack.pop()]
                width = i if not stack else i - stack[-1] - 1
                best = max(best, height * width)
            stack.append(i)
        return best

    for row in matrix:
        for j in range(c):
            heights[j] = heights[j] + 1 if row[j] == '1' else 0
        max_rect = max(max_rect, largest_histogram(heights))

    return max_rect`,
  javascript: `// JavaScript: Maximal Rectangle in Binary Matrix
function maximalRectangle(matrix) {
    if (matrix.length === 0) return 0;
    const r = matrix.length, c = matrix[0].length;
    const heights = new Array(c).fill(0);
    let maxRect = 0;

    function largestHistogram(h) {
        const stack = [];
        let best = 0;
        for (let i = 0; i <= h.length; i++) {
            while (stack.length > 0 && (i === h.length || h[stack[stack.length - 1]] >= h[i])) {
                const height = h[stack.pop()];
                const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
                best = Math.max(best, height * width);
            }
            stack.push(i);
        }
        return best;
    }

    for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) {
            heights[j] = matrix[i][j] === '1' ? heights[j] + 1 : 0;
        }
        maxRect = Math.max(maxRect, largestHistogram(heights));
    }
    return maxRect;
}`
};

export const steps = [
  {
    title: '1. Binary Matrix 4x5 & Row 0: heights = [1, 0, 1, 0, 0]',
    phase: 'ROW_0',
    codeLine: 29,
    currentRow: 0,
    heights: [1, 0, 1, 0, 0],
    rowArea: 1,
    maxRect: 1,
    explain: 'Process Row 0. Base heights correspond directly to 1s in Row 0. Max area for this row is 1.'
  },
  {
    title: '2. Row 1: heights = [2, 0, 2, 1, 1] &rarr; Row Area = 3',
    phase: 'ROW_1',
    codeLine: 29,
    currentRow: 1,
    heights: [2, 0, 2, 1, 1],
    rowArea: 3,
    maxRect: 3,
    explain: 'Column 0 and 2 have consecutive 1s (height 2). Sub-histogram yields max area = 3 (height 1 across cols 2, 3, 4).'
  },
  {
    title: '3. Row 2: heights = [3, 1, 3, 2, 2] &rarr; Max Rectangle = 6!',
    phase: 'ROW_2',
    codeLine: 29,
    currentRow: 2,
    heights: [3, 1, 3, 2, 2],
    rowArea: 6,
    maxRect: 6,
    explain: 'Consecutive 1s expand in cols 2, 3, 4 with heights [3, 2, 2]. Height 2 across 3 columns gives 2 * 3 = 6! Global max updated to 6.'
  },
  {
    title: '4. Row 3: heights = [4, 0, 0, 3, 0] &rarr; Row Area = 4',
    phase: 'ROW_3',
    codeLine: 29,
    currentRow: 3,
    heights: [4, 0, 0, 3, 0],
    rowArea: 4,
    maxRect: 6,
    explain: 'Zeros reset column heights to 0. Row 3 yields max 4. Global max remains 6.'
  },
  {
    title: '5. Completed Matrix Scan: Overall Maximal Rectangle Area = 6',
    phase: 'DONE',
    codeLine: 35,
    currentRow: null,
    heights: [4, 0, 0, 3, 0],
    rowArea: null,
    maxRect: 6,
    explain: 'Maximal rectangle discovered spanning 2 rows by 3 columns of all 1s with area = 6!'
  }
];

export default function MaximumRectanglesVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];
  const matrix = [
    ['1', '0', '1', '0', '0'],
    ['1', '0', '1', '1', '1'],
    ['1', '1', '1', '1', '1'],
    ['1', '0', '0', '1', '0']
  ];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Max Rectangle Area: <strong className="text-base text-emerald-200">{step.maxRect}</strong>
        </div>
        {step.currentRow !== null && (
          <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
            Active Row: <strong>Row {step.currentRow}</strong>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Matrix Grid */}
        <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-xl">
          <span className="text-xs font-mono text-[var(--chalk-dim)]">Binary Matrix (4&times;5)</span>

          <div className="flex flex-col gap-1.5 p-2 bg-[#0f1016] rounded-xl border border-[#26293a]">
            {matrix.map((row, rIdx) => {
              const isRowActive = step.currentRow === rIdx;
              return (
                <div key={rIdx} className="flex gap-1.5">
                  {row.map((val, cIdx) => {
                    const isOne = val === '1';
                    const isMaxSub = rIdx >= 1 && rIdx <= 2 && cIdx >= 2 && cIdx <= 4;

                    return (
                      <div
                        key={cIdx}
                        className={`w-9 h-9 rounded-lg border flex items-center justify-center font-mono font-bold text-sm transition-all ${
                          isMaxSub
                            ? 'bg-emerald-500/35 border-emerald-400 text-emerald-200'
                            : isRowActive && isOne
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                            : isOne
                            ? 'bg-[#1c1f2e] border-[#31364d] text-[var(--chalk)]'
                            : 'bg-[#10121a] border-[#202331] text-[#424761]'
                        }`}
                      >
                        {val}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Histogram per Column */}
        <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-xl">
          <span className="text-xs font-mono text-[var(--chalk-dim)]">Column Height Accumulator</span>

          <div className="flex items-end justify-center gap-2 w-full h-36 pt-2 px-2 border-b border-[#26293a]">
            {step.heights.map((h, col) => (
              <div key={col} className="flex flex-col items-center flex-1 h-full justify-end">
                <div
                  style={{ height: `${(h / 4) * 100}%` }}
                  className="w-full bg-cyan-500/30 border border-cyan-400 rounded-t-sm flex items-center justify-center font-mono text-xs text-cyan-200 font-bold transition-all duration-300"
                >
                  {h > 0 ? h : ''}
                </div>
                <span className="text-[9px] font-mono text-[#585e7c] mt-1">C{col}</span>
              </div>
            ))}
          </div>

          <div className="text-[11px] font-mono text-[#7e85a6] text-center">
            Row reduction gives O(R &times; C) time complexity.
          </div>
        </div>
      </div>
    </div>
  );
}
