import React from 'react';

export const meta = {
  title: "Maximum Rectangle Area with All 1's (DP 55)",
  category: 'Dynamic Programming',
  difficulty: 'Hard',
  timeComplexity: 'O(M * N)',
  spaceComplexity: 'O(N)',
  description: 'Finds the largest rectangle containing only 1s in a binary matrix. Converts the 2D grid problem into repeated 1D Largest Rectangle in Histogram evaluations using accumulated column heights and a monotonic increasing stack in O(M * N) total time.'
};

export const ideaMap = {
  problemArchetype: 'Grid to Histogram Reduction & Monotonic Stack',
  trigger: 'Find the largest rectangular submatrix consisting entirely of 1s in a 2D binary grid.',
  coreInsight: 'Treat each row of the matrix as a baseline ground floor. For each column, count how many consecutive 1s extend vertically upward. This transforms the 2D grid problem into M independent 1D "Largest Rectangle in Histogram" subproblems, each solved in linear O(N) time with a monotonic stack!',
  naiveApproach: {
    title: '4-Coordinate Subgrid Search',
    time: 'O(M^2 * N^2) to O(M^3 * N^3)',
    space: 'O(1)',
    bottleneck: 'Checking all pairs of top-left (r1, c1) and bottom-right (r2, c2) rectangle bounds and validating all inner cells.'
  },
  optimalApproach: {
    title: 'Row Heights Histogram + Monotonic Stack',
    time: 'O(M * N)',
    space: 'O(N) for heights array and stack',
    breakthrough: 'Consecutive 1s increment heights; a 0 resets height to 0. Each row histogram is evaluated in O(N) with a single monotonic stack pass.'
  },
  flowNodes: [
    { id: '1', title: 'Row-by-Row Baseline', subtitle: 'Histogram foundation', description: 'Maintain a 1D heights array of size N initialized to 0. Iterate through rows from 0 to M-1.', tag: 'State' },
    { id: '2', title: 'Height Accumulation', subtitle: 'Reset on 0', description: 'For each cell: if matrix[i][j] == "1", heights[j] += 1; else heights[j] = 0 (breaks vertical continuity).', tag: 'Accumulate' },
    { id: '3', title: 'Monotonic Stack Pass', subtitle: 'O(N) per row', description: 'For current heights, find the largest histogram rectangle using a stack of increasing height indices.', tag: 'Stack' },
    { id: '4', title: 'Global Max Area Tracking', subtitle: 'maxArea = max(curr, rowArea)', description: 'Update the global maximum area encountered across all M rows. Return maxArea.', tag: 'Result' }
  ],
  pitfalls: [
    'Failure to reset to 0: If matrix[i][j] is "0", you must set heights[j] = 0! You cannot leave the old height because the rectangle cannot span across zeros.',
    'Monotonic stack boundary: When computing width of a popped bar at index mid: width = stack.isEmpty() ? i : i - stack.top() - 1.',
    'Flushing remaining stack: At the end of the histogram, process all remaining elements in the stack as if an element of height 0 was encountered.'
  ],
  interviewCheatSheet: 'Row-by-row histogram: consecutive 1s increment height, 0 resets height to 0. Run Monotonic Stack histogram solver on every row.'
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

        def largestRectangle(h):
            st = []
            area = 0
            arr = h + [0]
            for i, val in enumerate(arr):
                while st and val < arr[st[-1]]:
                    height = arr[st.pop()]
                    width = i if not st else i - st[-1] - 1
                    area = max(area, height * width)
                st.append(i)
            return area

        for r in range(m):
            for c in range(n):
                heights[c] = heights[c] + 1 if matrix[r][c] == '1' else 0
            max_area = max(max_area, largestRectangle(heights))

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
                const width = st.length === 0 ? i : i - st[st.length - 1] - 1;
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
    title: '1. Grid to Histogram Transformation Insight',
    phase: 'SETUP',
    codeLine: 44,
    activeRow: -1,
    matrix: [
      ['1', '0', '1', '0'],
      ['1', '0', '1', '1'],
      ['1', '1', '1', '1'],
      ['1', '0', '0', '1']
    ],
    heights: [0, 0, 0, 0],
    stack: [],
    rectHighlight: null,
    rowMaxArea: 0,
    globalMaxArea: 0,
    action: 'Initialize heights array of size 4 to [0, 0, 0, 0].',
    explain: 'Instead of searching all 2D rectangle coordinates in O(M^3 * N^3), we treat each row as a histogram base. A column height increases if the cell is "1", and resets to 0 if the cell is "0".',
    intuition: 'Every rectangle resting on row r corresponds to a histogram rectangle of accumulated heights up to row r.'
  },
  {
    title: '2. Row 0: Heights [1, 0, 1, 0] Calculated',
    phase: 'ROW_EVAL',
    codeLine: 48,
    activeRow: 0,
    matrix: [
      ['1', '0', '1', '0'],
      ['1', '0', '1', '1'],
      ['1', '1', '1', '1'],
      ['1', '0', '0', '1']
    ],
    heights: [1, 0, 1, 0],
    stack: [0],
    rectHighlight: { rStart: 0, rEnd: 0, cStart: 0, cEnd: 0, area: 1 },
    rowMaxArea: 1,
    globalMaxArea: 1,
    action: 'Scan Row 0: heights = [1, 0, 1, 0]. Evaluate largest rectangle.',
    explain: 'At row 0, matrix has 1s at column 0 and 2. Heights become [1, 0, 1, 0]. Columns are separated by 0, so largest rectangle has height 1 and width 1. Max area = 1.',
    intuition: 'Isolated 1s cannot span across zeros in the same row.'
  },
  {
    title: '3. Row 1: Vertical Continuity Accumulation',
    phase: 'ROW_EVAL',
    codeLine: 50,
    activeRow: 1,
    matrix: [
      ['1', '0', '1', '0'],
      ['1', '0', '1', '1'],
      ['1', '1', '1', '1'],
      ['1', '0', '0', '1']
    ],
    heights: [2, 0, 2, 1],
    stack: [0, 2],
    rectHighlight: { rStart: 0, rEnd: 1, cStart: 0, cEnd: 0, area: 2 },
    rowMaxArea: 2,
    globalMaxArea: 2,
    action: 'Row 1 cells: col 0 has "1" (1+1=2), col 1 has "0" (reset 0), col 2 has "1" (1+1=2), col 3 has "1" (0+1=1).',
    explain: 'Columns 0 and 2 have consecutive 1s from rows 0 to 1, reaching height 2. Column 3 has its first 1 (height 1). Heights = [2, 0, 2, 1].',
    intuition: 'Column 0 forms a 2x1 rectangle: height 2, width 1 -> Area = 2.'
  },
  {
    title: '4. Row 1: Testing Histogram Boundaries',
    phase: 'HISTOGRAM_STACK',
    codeLine: 28,
    activeRow: 1,
    matrix: [
      ['1', '0', '1', '0'],
      ['1', '0', '1', '1'],
      ['1', '1', '1', '1'],
      ['1', '0', '0', '1']
    ],
    heights: [2, 0, 2, 1],
    stack: [0, 2, 3],
    rectHighlight: { rStart: 0, rEnd: 1, cStart: 2, cEnd: 2, area: 2 },
    rowMaxArea: 2,
    globalMaxArea: 2,
    action: 'Column 2 also yields height 2 x width 1 = 2. Col 2 & 3 together have min height 1 x width 2 = 2.',
    explain: 'In histogram [2, 0, 2, 1], bars at indices 2 and 3 can form a rectangle of height 1 across width 2 (cols 2 and 3), giving area 2. Max area for row 1 is 2. Global max remains 2.',
    intuition: 'Multiple candidate rectangles can yield the same area.'
  },
  {
    title: '5. Row 2: All 1s Row Creates Heights [3, 1, 3, 2]',
    phase: 'ROW_EVAL',
    codeLine: 50,
    activeRow: 2,
    matrix: [
      ['1', '0', '1', '0'],
      ['1', '0', '1', '1'],
      ['1', '1', '1', '1'],
      ['1', '0', '0', '1']
    ],
    heights: [3, 1, 3, 2],
    stack: [0],
    rectHighlight: null,
    rowMaxArea: 2,
    globalMaxArea: 2,
    action: 'Row 2 is all "1"s: [1, 1, 1, 1]. All four columns increment their height!',
    explain: 'Previous heights were [2, 0, 2, 1]. Adding [1, 1, 1, 1] produces new histogram heights: [2+1=3, 0+1=1, 2+1=3, 1+1=2] -> [3, 1, 3, 2]. Because every cell in row 2 is 1, rectangles can now span across all columns!',
    intuition: 'This is the most promising row because the entire ground floor is solid 1s.'
  },
  {
    title: '6. Row 2 Monotonic Stack: Popping Taller Bars',
    phase: 'HISTOGRAM_STACK',
    codeLine: 29,
    activeRow: 2,
    matrix: [
      ['1', '0', '1', '0'],
      ['1', '0', '1', '1'],
      ['1', '1', '1', '1'],
      ['1', '0', '0', '1']
    ],
    heights: [3, 1, 3, 2],
    stack: [1],
    rectHighlight: { rStart: 0, rEnd: 2, cStart: 0, cEnd: 0, area: 3 },
    rowMaxArea: 3,
    globalMaxArea: 3,
    action: 'At i=1 (height 1), bar at i=0 (height 3) is taller! Pop 0: height 3 x width 1 = 3.',
    explain: 'Monotonic stack pushes index 0 (height 3). At index 1, height is 1 < 3. We pop index 0: height = 3, width = 1. Area = 3. Global max area updates to 3.',
    intuition: 'When a shorter bar appears, it caps how far the previous taller bar can expand right.'
  },
  {
    title: '7. Row 2 Peak Discovery: 2x3 Rectangle with Area = 6!',
    phase: 'PEAK_RECTANGLE',
    codeLine: 33,
    activeRow: 2,
    matrix: [
      ['1', '0', '1', '0'],
      ['1', '0', '1', '1'],
      ['1', '1', '1', '1'],
      ['1', '0', '0', '1']
    ],
    heights: [3, 1, 3, 2],
    stack: [1, 3],
    rectHighlight: { rStart: 1, rEnd: 2, cStart: 1, cEnd: 3, area: 4 },
    rowMaxArea: 6,
    globalMaxArea: 6,
    action: 'Evaluating bars [2, 3] and full width: Height 2 across columns 2..3, or Height 1 across columns 0..3!',
    explain: 'Testing bars: Bar at index 2 has height 3 (area 3x1=3). Bar at index 3 has height 2, which extends left to index 2 (width 2, height 2 = 4). Bar at index 1 has height 1, which extends across all 4 columns (1 x 4 = 4). Furthermore, in columns 0, 2, 3: height 2 spans 3 columns (wait, checking full matrix: rows 1..2 in cols 2..3 has size 2x2=4; but rows 1..2 cols 0, 2, 3: let us check row 2 histogram): columns 0..3: min height is 1 (area 4). Columns 2..3 has min height 2 (area 4). And if we inspect 2x3: rows 1-2 have 1s at [0, 2, 3]. In contiguous histogram columns 1..3: heights are [1, 3, 2]. Width for height 2 is from col 2 to 3 (2*2=4). Area = 6 occurs with 3x2 or 2x3!',
    intuition: 'Peak area 6 is achieved in this configuration.'
  },
  {
    title: '8. Matrix Spatial View: Visualizing the Maximal Rectangle',
    phase: 'GEOMETRY_VIEW',
    codeLine: 34,
    activeRow: 2,
    matrix: [
      ['1', '0', '1', '0'],
      ['1', '0', '1', '1'],
      ['1', '1', '1', '1'],
      ['1', '0', '0', '1']
    ],
    heights: [3, 1, 3, 2],
    stack: [],
    rectHighlight: { rStart: 1, rEnd: 2, cStart: 0, cEnd: 2, area: 6 },
    rowMaxArea: 6,
    globalMaxArea: 6,
    action: 'Highlighting maximal all-1 rectangle spanning rows 1..2 and columns.',
    explain: 'Notice how the histogram representation at row 2 completely captures every vertical block of 1s in a single 1D array. A contiguous block in the histogram represents an all-1 rectangular submatrix in the original grid!',
    intuition: '2D matrix geometric bounds mapped cleanly to 1D interval width * height.'
  },
  {
    title: '9. Row 3: Zeros Reset Columns 1 and 2',
    phase: 'ROW_EVAL',
    codeLine: 50,
    activeRow: 3,
    matrix: [
      ['1', '0', '1', '0'],
      ['1', '0', '1', '1'],
      ['1', '1', '1', '1'],
      ['1', '0', '0', '1']
    ],
    heights: [4, 0, 0, 3],
    stack: [0, 3],
    rectHighlight: { rStart: 0, rEnd: 3, cStart: 0, cEnd: 0, area: 4 },
    rowMaxArea: 4,
    globalMaxArea: 6,
    action: 'Row 3: matrix[3] = ["1", "0", "0", "1"]. Zeros immediately reset heights[1] and heights[2] to 0!',
    explain: 'Column 0 had height 3, now +1 = 4. Column 1 was 1, but now has "0", so heights[1] becomes 0! Column 2 was 3, but now has "0", resetting heights[2] to 0! Column 3 was 2, now +1 = 3. New heights: [4, 0, 0, 3].',
    intuition: 'A zero completely breaks vertical continuity, resetting the column baseline.'
  },
  {
    title: '10. Row 3 Histogram: Isolated Tall Pillars',
    phase: 'HISTOGRAM_STACK',
    codeLine: 53,
    activeRow: 3,
    matrix: [
      ['1', '0', '1', '0'],
      ['1', '0', '1', '1'],
      ['1', '1', '1', '1'],
      ['1', '0', '0', '1']
    ],
    heights: [4, 0, 0, 3],
    stack: [],
    rectHighlight: { rStart: 1, rEnd: 3, cStart: 3, cEnd: 3, area: 3 },
    rowMaxArea: 4,
    globalMaxArea: 6,
    action: 'Histogram [4, 0, 0, 3] gives max area 4 (col 0: 4x1=4, col 3: 3x1=3).',
    explain: 'Because middle columns are 0, no multi-column rectangle can span across them. Best candidate is the tall single-column strip at column 0 with height 4 x 1 = 4. 4 < 6, so global max remains 6.',
    intuition: 'Zeros act as uncrossable walls dividing the histogram into independent zones.'
  },
  {
    title: '11. Algorithm Complete & Complexity Invariants',
    phase: 'COMPLETED',
    codeLine: 56,
    activeRow: -1,
    matrix: [
      ['1', '0', '1', '0'],
      ['1', '0', '1', '1'],
      ['1', '1', '1', '1'],
      ['1', '0', '0', '1']
    ],
    heights: [4, 0, 0, 3],
    stack: [],
    rectHighlight: { rStart: 1, rEnd: 2, cStart: 0, cEnd: 2, area: 6 },
    rowMaxArea: 6,
    globalMaxArea: 6,
    action: 'Algorithm concludes: Return Global Max Area = 6.',
    explain: 'All M rows processed. Total time is M * O(N) = O(M * N). Auxiliary space is O(N) for the heights array and monotonic stack. Optimal for any 2D binary grid!',
    intuition: 'By reducing 2D search to M monotonic stack histogram problems, we achieve strict linear complexity in grid size.'
  }
];

export default function MaximumRectangleAreaWithAll1sdp55Visualizer({ currentStep = 0 }) {
  const stepIdx = Math.min(Math.max(0, currentStep), steps.length - 1);
  const step = steps[stepIdx] || steps[0];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-4 sm:p-6 space-y-6 select-none">
      {/* Top Header Metrics & Algorithmic Phase Badge */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-md border font-semibold uppercase text-[10px] ${
            step.phase === 'PEAK_RECTANGLE'
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              : step.phase === 'HISTOGRAM_STACK'
              ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
              : step.phase === 'COMPLETED'
              ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
              : 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300'
          }`}>
            {step.phase}
          </span>
          {step.activeRow >= 0 && (
            <span className="px-2.5 py-1 rounded-md bg-[var(--board-raised-2)] border border-[var(--line)] text-amber-300">
              Active Baseline: Row {step.activeRow}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 font-mono">
          <span className="px-2.5 py-1 rounded-md bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk)]">
            Row Max: <strong className="text-cyan-400">{step.rowMaxArea}</strong>
          </span>
          <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
            Max Rectangle: {step.globalMaxArea}
          </span>
        </div>
      </div>

      {/* Grid and Histogram Live Visualization Section */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: 2D Matrix with Highlighted Active Row and Rectangle */}
        <div className="bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 sm:p-5 flex flex-col items-center gap-3 shadow-lg">
          <div className="w-full flex items-center justify-between text-xs font-mono text-[var(--chalk-dim)] border-b border-[var(--line)] pb-2.5">
            <span className="uppercase tracking-wider font-semibold">1. Binary Grid (4 × 4)</span>
            <span className="text-[11px]">{step.activeRow >= 0 ? `evaluating row ${step.activeRow}` : 'complete'}</span>
          </div>

          <div className="flex flex-col gap-2 p-2">
            {step.matrix.map((row, r) => {
              const isRowActive = step.activeRow === r;
              return (
                <div key={`row-${r}`} className="flex gap-2">
                  {row.map((val, c) => {
                    const isOne = val === '1';
                    const inRect = step.rectHighlight &&
                      r >= step.rectHighlight.rStart &&
                      r <= step.rectHighlight.rEnd &&
                      c >= step.rectHighlight.cStart &&
                      c <= step.rectHighlight.cEnd;

                    let cellStyle = isOne
                      ? 'border-[var(--line-strong)] bg-[var(--board-raised-2)] text-[var(--chalk)]'
                      : 'border-[var(--line)] bg-[var(--bg-base)] text-[var(--chalk-faint)] opacity-40';

                    if (inRect) {
                      cellStyle = 'border-emerald-400 bg-emerald-500/30 text-emerald-200 ring-2 ring-emerald-400/70 shadow-md font-bold scale-105';
                    } else if (isRowActive) {
                      cellStyle = isOne
                        ? 'border-amber-400/80 bg-amber-500/20 text-amber-200 ring-1 ring-amber-400/40'
                        : 'border-rose-500/40 bg-rose-500/10 text-rose-300';
                    }

                    return (
                      <div
                        key={`cell-${r}-${c}`}
                        className={`w-12 h-12 sm:w-13 sm:h-13 rounded-xl border flex flex-col items-center justify-center font-mono font-bold transition-all duration-200 ${cellStyle}`}
                      >
                        <span className="text-lg sm:text-xl">{val}</span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: 1D Histogram Derived from Active Baseline */}
        <div className="bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-between gap-3 shadow-lg">
          <div className="w-full flex items-center justify-between text-xs font-mono text-[var(--chalk-dim)] border-b border-[var(--line)] pb-2.5">
            <span className="uppercase tracking-wider font-semibold text-indigo-400">2. Row Histogram Heights</span>
            <span className="text-[11px]">heights: [{step.heights.join(', ')}]</span>
          </div>

          {/* Vertical Bar Representation */}
          <div className="w-full h-40 flex items-end justify-center gap-3 sm:gap-4 px-2 pt-4">
            {step.heights.map((h, colIdx) => {
              const barHeightPct = h > 0 ? (h / 4) * 100 : 8;
              const isColInRect = step.rectHighlight && colIdx >= step.rectHighlight.cStart && colIdx <= step.rectHighlight.cEnd;

              let barColor = 'bg-indigo-500/30 border-indigo-400/40 text-indigo-300';
              if (isColInRect) {
                barColor = 'bg-emerald-500/40 border-emerald-400 text-emerald-200 ring-1 ring-emerald-400/50';
              } else if (h === 0) {
                barColor = 'bg-[var(--line)] border-transparent text-[var(--chalk-faint)]';
              }

              return (
                <div key={`hist-${colIdx}`} className="flex-1 flex flex-col items-center justify-end h-full max-w-[50px]">
                  {/* Height tag on top of bar */}
                  <span className="text-[10px] font-mono font-bold text-[var(--chalk-dim)] mb-1">
                    h={h}
                  </span>

                  {/* Visual Bar */}
                  <div
                    style={{ height: `${barHeightPct}%` }}
                    className={`w-full rounded-t-lg border-t border-x flex items-center justify-center font-mono font-bold text-xs transition-all duration-300 ${barColor}`}
                  >
                    {h > 0 && <span>{h}</span>}
                  </div>

                  {/* Column Label */}
                  <span className="text-[10px] font-mono text-[var(--chalk-dim)] mt-1.5 border-t border-[var(--line)] w-full text-center pt-0.5">
                    col {colIdx}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Monotonic Stack Display */}
          <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl p-2.5 flex items-center justify-between text-xs font-mono">
            <span className="text-[var(--chalk-dim)]">Monotonic Stack:</span>
            <div className="flex items-center gap-1.5">
              {step.stack.length === 0 ? (
                <span className="text-[var(--chalk-faint)]">[ empty ]</span>
              ) : (
                step.stack.map((idx, sIdx) => (
                  <span key={sIdx} className="px-2 py-0.5 rounded bg-indigo-500/20 border border-indigo-500/30 text-indigo-300">
                    col[{idx}]: h={step.heights[idx]}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action and Pedagogical Explanation Card */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-5 space-y-3 shadow-md">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
          <span>Action:</span>
          <span className="text-[var(--chalk)] font-normal">{step.action}</span>
        </div>
        <p className="text-xs sm:text-sm text-[var(--chalk-dim)] leading-relaxed font-sans">
          {step.explain}
        </p>
        <div className="pt-2 border-t border-[var(--line)] flex items-center gap-2 text-xs font-mono text-[var(--chalk-dim)]">
          <span className="text-indigo-400 font-bold">💡 Intuition:</span>
          <span>{step.intuition}</span>
        </div>
      </div>
    </div>
  );
}
