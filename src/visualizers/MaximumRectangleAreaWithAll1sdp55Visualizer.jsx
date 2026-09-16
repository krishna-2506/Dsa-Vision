import React from 'react';

export const meta = {
  title: "Maximum Rectangle Area with All 1's (DP 55)",
  category: 'Dynamic Programming',
  difficulty: 'Hard',
  timeComplexity: 'O(M * N)',
  spaceComplexity: 'O(N)',
  description: 'Finds the largest rectangle containing only 1s in a binary matrix. Converts the 2D grid problem into repeated 1D Largest Rectangle in Histogram evaluations using accumulated column heights.'
};

export const solutions = {
  cpp: `// C++ Maximum Rectangle Area with All 1's
// Time: O(M * N) | Space: O(N)
#include <vector>
#include <stack>
#include <algorithm>
using namespace std;

class Solution {
private:
    int largestRectangleArea(vector<int>& heights) {
        int n = heights.size();
        stack<int> st;
        int maxArea = 0;

        for (int i = 0; i <= n; i++) {
            int h = (i == n) ? 0 : heights[i];
            while (!st.empty() && h < heights[st.top()]) {
                int height = heights[st.top()];
                st.pop();
                int width = st.empty() ? i : i - st.top() - 1;
                maxArea = max(maxArea, height * width);
            }
            st.push(i);
        }

        return maxArea;
    }

public:
    int maximalRectangle(vector<vector<char>>& matrix) {
        if (matrix.empty()) return 0;
        int m = matrix.size(), n = matrix[0].size();
        vector<int> heights(n, 0);
        int maxArea = 0;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == '1') heights[j]++;
                else heights[j] = 0; // Reset height on '0'
            }
            maxArea = max(maxArea, largestRectangleArea(heights));
        }

        return maxArea;
    }
};`,
  python: `# Python 3 Maximum Rectangle Area with All 1's
# Time: O(M * N) | Space: O(N)
class Solution:
    def maximalRectangle(self, matrix: list[list[str]]) -> int:
        if not matrix:
            return 0
        m, n = len(matrix), len(matrix[0])
        heights = [0] * n
        max_area = 0

        def largest_rectangle(h):
            st = []
            area = 0
            for i, val in enumerate(h + [0]):
                while st and val < h[st[-1]]:
                    height = h[st.pop()]
                    width = i if not st else i - st[-1] - 1
                    area = max(area, height * width)
                st.append(i)
            return area

        for row in matrix:
            for j in range(n):
                heights[j] = heights[j] + 1 if row[j] == '1' else 0
            max_area = max(max_area, largest_rectangle(heights))

        return max_area`,
  java: `// Java Maximum Rectangle Area with All 1's
// Time: O(M * N) | Space: O(N)
import java.util.Stack;

class Solution {
    private int largestRectangleArea(int[] heights) {
        int n = heights.length;
        Stack<Integer> st = new Stack<>();
        int maxArea = 0;

        for (int i = 0; i <= n; i++) {
            int h = (i == n) ? 0 : heights[i];
            while (!st.isEmpty() && h < heights[st.peek()]) {
                int height = heights[st.pop()];
                int width = st.isEmpty() ? i : i - st.peek() - 1;
                maxArea = Math.max(maxArea, height * width);
            }
            st.push(i);
        }

        return maxArea;
    }

    public int maximalRectangle(char[][] matrix) {
        if (matrix.length == 0) return 0;
        int m = matrix.length, n = matrix[0].length;
        int[] heights = new int[n];
        int maxArea = 0;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == '1') heights[j]++;
                else heights[j] = 0;
            }
            maxArea = Math.max(maxArea, largestRectangleArea(heights));
        }

        return maxArea;
    }
}`,
  javascript: `// JavaScript Maximum Rectangle Area with All 1's
// Time: O(M * N) | Space: O(N)
var maximalRectangle = function(matrix) {
    if (!matrix.length) return 0;
    const m = matrix.length, n = matrix[0].length;
    let heights = new Array(n).fill(0);
    let maxArea = 0;

    const largestRectangle = (h) => {
        const st = [];
        let area = 0;
        const arr = [...h, 0];
        for (let i = 0; i < arr.length; i++) {
            while (st.length && arr[i] < arr[st[st.length - 1]]) {
                const height = arr[st.pop()];
                const width = !st.length ? i : i - st[st.length - 1] - 1;
                area = Math.max(area, height * width);
            }
            st.push(i);
        }
        return area;
    };

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            heights[j] = matrix[i][j] === '1' ? heights[j] + 1 : 0;
        }
        maxArea = Math.max(maxArea, largestRectangle(heights));
    }

    return maxArea;
};`
};

export const steps = [
  {
    title: '1. Binary Matrix Setup: 4x4 Grid',
    phase: 'INITIAL',
    codeLine: 34,
    activeRow: 0,
    matrix: [
      ['1', '0', '1', '0'],
      ['1', '0', '1', '1'],
      ['1', '1', '1', '1'],
      ['1', '0', '0', '1']
    ],
    heights: [1, 0, 1, 0],
    rowMaxArea: 1,
    globalMaxArea: 1,
    variables: { row: 0, heights: '[1, 0, 1, 0]', maxArea: 1 },
    explain: 'Row 0 creates histogram heights [1, 0, 1, 0]. Largest rectangle in row 0 is 1.',
    intuition: 'Each row acts as the floor baseline for vertical column histograms.'
  },
  {
    title: '2. Row 1: Heights [2, 0, 2, 1], Max Rectangle = 2',
    phase: 'ROW_1',
    codeLine: 38,
    activeRow: 1,
    matrix: [
      ['1', '0', '1', '0'],
      ['1', '0', '1', '1'],
      ['1', '1', '1', '1'],
      ['1', '0', '0', '1']
    ],
    heights: [2, 0, 2, 1],
    rowMaxArea: 2,
    globalMaxArea: 2,
    variables: { row: 1, heights: '[2, 0, 2, 1]', maxArea: 2 },
    explain: 'Consecutive 1s in columns 0 and 2 grow heights to 2. Max rectangle area in row 1 is 2.',
    intuition: 'Height accumulates as long as consecutive 1s continue vertically.'
  },
  {
    title: '3. Row 2: Heights [3, 1, 3, 2], Max Rectangle = 6 (Area = 2 x 3)!',
    phase: 'PEAK_AREA',
    codeLine: 38,
    activeRow: 2,
    matrix: [
      ['1', '0', '1', '0'],
      ['1', '0', '1', '1'],
      ['1', '1', '1', '1'],
      ['1', '0', '0', '1']
    ],
    heights: [3, 1, 3, 2],
    rowMaxArea: 6,
    globalMaxArea: 6,
    variables: { row: 2, heights: '[3, 1, 3, 2]', bestRectangle: 'Height 2 across 3 columns = 6' },
    explain: 'In row 2, columns 0 to 3 have heights [3, 1, 3, 2]. Spanning columns 2 and 3 with height 2, or columns 0, 2, 3 with height 2 gives area 6!',
    intuition: 'Histogram stack evaluation identifies the optimal bounding box.'
  },
  {
    title: '4. Row 3: Heights Reset on Zeros [4, 0, 0, 3] -> Final Max Area = 6',
    phase: 'COMPLETED',
    codeLine: 43,
    activeRow: 3,
    matrix: [
      ['1', '0', '1', '0'],
      ['1', '0', '1', '1'],
      ['1', '1', '1', '1'],
      ['1', '0', '0', '1']
    ],
    heights: [4, 0, 0, 3],
    rowMaxArea: 4,
    globalMaxArea: 6,
    variables: { globalMaxArea: 6, dimensions: '3 columns x 2 rows' },
    explain: 'Row 3 has zeros that reset columns 1 and 2 heights to 0. Global maximum rectangle area remains 6!',
    intuition: 'Solved in O(M * N) time with O(N) stack auxiliary memory.'
  }
];

export default function MaximumRectangleAreaWithAll1sdp55Visualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Active Row: Row {step.activeRow}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Max Rectangle Area: {step.globalMaxArea}
        </span>
      </div>

      {/* Grid & Active Histogram */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-5 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Matrix Rows & Active Column Histogram Heights
        </span>

        {/* Matrix Visualization */}
        <div className="flex flex-col gap-1.5 p-1">
          {step.matrix.map((row, r) => {
            const isRowCurrent = r === step.activeRow;

            return (
              <div key={r} className="flex gap-1.5">
                {row.map((val, c) => {
                  const isOne = val === '1';

                  return (
                    <div
                      key={c}
                      className={`w-12 h-10 rounded-xl border flex items-center justify-center font-mono text-xs transition-all ${
                        isRowCurrent && isOne
                          ? 'border-emerald-500 bg-emerald-500/30 text-emerald-300 ring-1 ring-emerald-500/40 font-bold'
                          : isOne
                          ? 'border-blue-500/40 bg-blue-500/15 text-blue-300'
                          : 'border-[#272b3c] bg-[#161824] text-slate-600'
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

        {/* Column Heights Bar */}
        <div className="w-full max-w-md bg-[#161824] border border-[#272b3c] rounded-xl p-3 flex items-center justify-around text-xs font-mono">
          <span className="text-slate-400 font-semibold">Col Heights:</span>
          {step.heights.map((h, c) => (
            <div key={c} className="flex flex-col items-center">
              <span className="text-[10px] text-slate-500">C{c}</span>
              <span className="text-amber-400 font-bold">{h}</span>
            </div>
          ))}
          <div className="h-6 w-px bg-[#272b3c]" />
          <span className="text-emerald-400 font-bold">Area: {step.rowMaxArea}</span>
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}
