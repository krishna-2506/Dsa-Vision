import React from 'react';

export const meta = {
  title: 'Spiral Matrix (Print Matrix in Spiral Manner)',
  category: 'Arrays & 2D Matrix',
  difficulty: 'Medium',
  timeComplexity: 'O(M x N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Traverses a 2D matrix in clockwise spiral order by contracting four boundary pointers (top, bottom, left, right) after each direction pass.'
};

export const solutions = {
  cpp: `// C++ Optimal Clockwise Spiral Matrix Traversal
// Time Complexity: O(M x N) | Space Complexity: O(1) auxiliary
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        vector<int> ans;
        int m = matrix.size(), n = matrix[0].size();
        int top = 0, bottom = m - 1;
        int left = 0, right = n - 1;

        while (top <= bottom && left <= right) {
            // 1. Traverse Left to Right along top boundary
            for (int i = left; i <= right; i++) ans.push_back(matrix[top][i]);
            top++;

            // 2. Traverse Top to Bottom along right boundary
            for (int i = top; i <= bottom; i++) ans.push_back(matrix[i][right]);
            right--;

            // 3. Traverse Right to Left along bottom boundary
            if (top <= bottom) {
                for (int i = right; i >= left; i--) ans.push_back(matrix[bottom][i]);
                bottom--;
            }

            // 4. Traverse Bottom to Top along left boundary
            if (left <= right) {
                for (int i = bottom; i >= top; i--) ans.push_back(matrix[i][left]);
                left++;
            }
        }
        return ans;
    }
};`,
  python: `# Python 3 Optimal Spiral Matrix Traversal
class Solution:
    def spiralOrder(self, matrix: list[list[int]]) -> list[int]:
        ans = []
        top, bottom = 0, len(matrix) - 1
        left, right = 0, len(matrix[0]) - 1

        while top <= bottom and left <= right:
            # 1. Left to Right
            for i in range(left, right + 1):
                ans.append(matrix[top][i])
            top += 1

            # 2. Top to Bottom
            for i in range(top, bottom + 1):
                ans.append(matrix[i][right])
            right -= 1

            # 3. Right to Left
            if top <= bottom:
                for i in range(right, left - 1, -1):
                    ans.append(matrix[bottom][i])
                bottom -= 1

            # 4. Bottom to Top
            if left <= right:
                for i in range(bottom, top - 1, -1):
                    ans.append(matrix[i][left])
                left += 1

        return ans`,
  java: `// Java Optimal Spiral Matrix Traversal
import java.util.*;

class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> ans = new ArrayList<>();
        int m = matrix.length, n = matrix[0].length;
        int top = 0, bottom = m - 1;
        int left = 0, right = n - 1;

        while (top <= bottom && left <= right) {
            for (int i = left; i <= right; i++) ans.add(matrix[top][i]);
            top++;

            for (int i = top; i <= bottom; i++) ans.add(matrix[i][right]);
            right--;

            if (top <= bottom) {
                for (int i = right; i >= left; i--) ans.add(matrix[bottom][i]);
                bottom--;
            }

            if (left <= right) {
                for (int i = bottom; i >= top; i--) ans.add(matrix[i][left]);
                left++;
            }
        }
        return ans;
    }
}`,
  javascript: `// JavaScript Optimal Spiral Matrix Traversal
var spiralOrder = function(matrix) {
    const ans = [];
    let top = 0, bottom = matrix.length - 1;
    let left = 0, right = matrix[0].length - 1;

    while (top <= bottom && left <= right) {
        for (let i = left; i <= right; i++) ans.push(matrix[top][i]);
        top++;

        for (let i = top; i <= bottom; i++) ans.push(matrix[i][right]);
        right--;

        if (top <= bottom) {
            for (let i = right; i >= left; i--) ans.push(matrix[bottom][i]);
            bottom--;
        }

        if (left <= right) {
            for (let i = bottom; i >= top; i--) ans.push(matrix[i][left]);
            left++;
        }
    }
    return ans;
};`
};

export const steps = [
  {
    title: '1. Initialize Boundaries: top=0, bottom=2, left=0, right=3',
    phase: 'INITIALIZATION',
    codeLine: 13,
    matrix: [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12]
    ],
    top: 0,
    bottom: 2,
    left: 0,
    right: 3,
    direction: 'ready',
    ans: [],
    variables: { top: 0, bottom: 2, left: 0, right: 3 },
    explain: 'Initialize 4 boundary pointers enclosing the entire 3x4 matrix. We will cycle through 4 directions (→, ↓, ←, ↑) until boundaries cross.',
    intuition: 'Each sweep strips away an outer perimeter layer, shrinking the active matrix inwardly.'
  },
  {
    title: '2. Direction 1: Left to Right along top=0 [1, 2, 3, 4] -> top becomes 1',
    phase: 'LEFT_TO_RIGHT',
    codeLine: 17,
    matrix: [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12]
    ],
    top: 1,
    bottom: 2,
    left: 0,
    right: 3,
    direction: 'right',
    ans: [1, 2, 3, 4],
    variables: { row: 0, added: '[1, 2, 3, 4]', top: 1 },
    explain: 'Traversed row 0 from col 0 to col 3. Incremented top to 1 to lock row 0.',
    intuition: 'Top row completed. Contract top down.'
  },
  {
    title: '3. Direction 2: Top to Bottom along right=3 [8, 12] -> right becomes 2',
    phase: 'TOP_TO_BOTTOM',
    codeLine: 21,
    matrix: [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12]
    ],
    top: 1,
    bottom: 2,
    left: 0,
    right: 2,
    direction: 'down',
    ans: [1, 2, 3, 4, 8, 12],
    variables: { col: 3, added: '[8, 12]', right: 2 },
    explain: 'Traversed column 3 from row 1 down to row 2. Decremented right to 2 to lock column 3.',
    intuition: 'Right column completed. Contract right leftward.'
  },
  {
    title: '4. Direction 3: Right to Left along bottom=2 [11, 10, 9] -> bottom becomes 1',
    phase: 'RIGHT_TO_LEFT',
    codeLine: 26,
    matrix: [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12]
    ],
    top: 1,
    bottom: 1,
    left: 0,
    right: 2,
    direction: 'left',
    ans: [1, 2, 3, 4, 8, 12, 11, 10, 9],
    variables: { row: 2, added: '[11, 10, 9]', bottom: 1 },
    explain: 'Traversed row 2 from col 2 down to col 0. Decremented bottom to 1.',
    intuition: 'Bottom row completed. Contract bottom upward.'
  },
  {
    title: '5. Direction 4: Bottom to Top along left=0 [5] -> left becomes 1',
    phase: 'BOTTOM_TO_TOP',
    codeLine: 32,
    matrix: [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12]
    ],
    top: 1,
    bottom: 1,
    left: 1,
    right: 2,
    direction: 'up',
    ans: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5],
    variables: { col: 0, added: '[5]', left: 1 },
    explain: 'Traversed col 0 upwards from row 1 to row 1. Incremented left to 1. One complete outer loop finished!',
    intuition: 'Outer boundary peeled. Remaining submatrix is row 1, cols 1 to 2.'
  },
  {
    title: '6. Inner Sweep: Left to Right along top=1 [6, 7] -> Complete!',
    phase: 'COMPLETED',
    codeLine: 17,
    matrix: [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12]
    ],
    top: 2,
    bottom: 1,
    left: 1,
    right: 2,
    direction: 'done',
    ans: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7],
    variables: { totalElements: 12, result: '[1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]' },
    explain: 'Traversed inner row 1 from col 1 to 2 ([6, 7]). top increments to 2 > bottom (1). Loop terminates! All 12 elements collected in perfect spiral order.',
    intuition: 'Every element visited exactly once in O(M x N) time.'
  }
];

export default function PrintTheMatrixInSpiralMannerVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Boundaries Status */}
      <div className="flex items-center gap-3 text-xs font-mono">
        <span className="px-2.5 py-1 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-300">
          top: {step.top}
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-300">
          bottom: {step.bottom}
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          left: {step.left}
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300">
          right: {step.right}
        </span>
      </div>

      {/* 3x4 Matrix Grid */}
      <div className="p-4 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl flex flex-col gap-2">
        {step.matrix.map((row, rIdx) => (
          <div key={rIdx} className="flex items-center gap-2">
            {row.map((val, cIdx) => {
              const hasBeenVisited = step.ans.includes(val);
              const isNewlyAdded = step.ans.length > 0 && step.ans[step.ans.length - 1] === val;

              let style = 'bg-[#181a24] text-white border-[#2b2e40]';
              if (isNewlyAdded) {
                style = 'bg-amber-500/25 text-amber-300 border-amber-400 scale-105 shadow-md shadow-amber-500/20';
              } else if (hasBeenVisited) {
                style = 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
              }

              return (
                <div
                  key={cIdx}
                  className={`w-14 h-14 rounded-xl border flex flex-col items-center justify-center font-mono font-bold transition-all duration-300 ${style}`}
                >
                  <span className="text-lg">{val}</span>
                  <span className="text-[8px] text-[#5b6076]">[{rIdx}][{cIdx}]</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Spiral Traversal Output Stream */}
      <div className="w-full flex flex-col items-center gap-2">
        <span className="text-xs font-mono text-[#8a8ea3]">Spiral Result Vector (ans):</span>
        <div className="w-full flex items-center justify-center gap-1.5 flex-wrap px-4 py-3 rounded-xl bg-[#141620] border border-[#262a3a]">
          {step.ans.length === 0 ? (
            <span className="text-xs font-mono text-[#5b6076]">Empty</span>
          ) : (
            step.ans.map((val, idx) => (
              <span
                key={idx}
                className={`px-2.5 py-1 rounded-lg font-mono text-xs font-bold border transition-all ${
                  idx === step.ans.length - 1 ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-[#1a1c29] text-emerald-300 border-[#2e3348]'
                }`}
              >
                {val}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
