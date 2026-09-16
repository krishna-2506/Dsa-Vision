import React from 'react';

export const meta = {
  title: "Pascal's Triangle I (Row Generation)",
  category: 'Arrays & Dynamic Programming',
  difficulty: 'Easy',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(N^2)',
  description: "Generates the first N rows of Pascal's Triangle. Each interior number is formed by summing the two directly adjacent numbers from the previous row above."
};

export const solutions = {
  cpp: `// C++ Optimal Pascal's Triangle Generation
// Time Complexity: O(N^2) | Space Complexity: O(N^2)
#include <vector>
using namespace std;

class Solution {
public:
    vector<vector<int>> generate(int numRows) {
        vector<vector<int>> triangle;

        for (int r = 0; r < numRows; r++) {
            vector<int> row(r + 1, 1);

            for (int c = 1; c < r; c++) {
                row[c] = triangle[r - 1][c - 1] + triangle[r - 1][c];
            }

            triangle.push_back(row);
        }

        return triangle;
    }
};`,
  python: `# Python 3 Optimal Pascal's Triangle Generation
class Solution:
    def generate(self, numRows: int) -> list[list[int]]:
        triangle = []

        for r in range(numRows):
            row = [1] * (r + 1)
            for c in range(1, r):
                row[c] = triangle[r - 1][c - 1] + triangle[r - 1][c]
            triangle.append(row)

        return triangle`,
  java: `// Java Optimal Pascal's Triangle Generation
import java.util.*;

class Solution {
    public List<List<Integer>> generate(int numRows) {
        List<List<Integer>> triangle = new ArrayList<>();

        for (int r = 0; r < numRows; r++) {
            List<Integer> row = new ArrayList<>();
            for (int c = 0; c <= r; c++) {
                if (c == 0 || c == r) {
                    row.add(1);
                } else {
                    int val = triangle.get(r - 1).get(c - 1) + triangle.get(r - 1).get(c);
                    row.add(val);
                }
            }
            triangle.add(row);
        }

        return triangle;
    }
}`,
  javascript: `// JavaScript Optimal Pascal's Triangle Generation
var generate = function(numRows) {
    const triangle = [];

    for (let r = 0; r < numRows; r++) {
        const row = new Array(r + 1).fill(1);
        for (let c = 1; c < r; c++) {
            row[c] = triangle[r - 1][c - 1] + triangle[r - 1][c];
        }
        triangle.push(row);
    }

    return triangle;
};`
};

export const steps = [
  {
    title: '1. Row 0: Base Element [1]',
    phase: 'BASE_ROW',
    codeLine: 11,
    triangle: [
      [1]
    ],
    activeRow: 0,
    activeCol: 0,
    parents: null,
    variables: { row: 0, elements: '[1]' },
    explain: "Row 0 contains the apex element 1.",
    intuition: "Pascal's triangle starts with a single unit at the top."
  },
  {
    title: '2. Row 1: Boundary Elements [1, 1]',
    phase: 'EXPANDING',
    codeLine: 12,
    triangle: [
      [1],
      [1, 1]
    ],
    activeRow: 1,
    activeCol: null,
    parents: null,
    variables: { row: 1, elements: '[1, 1]' },
    explain: 'Row 1 has 2 elements, both outer boundaries with value 1.',
    intuition: 'Edges of every row are always 1.'
  },
  {
    title: '3. Row 2, Col 1: Sum Parents (1 + 1 = 2) -> [1, 2, 1]',
    phase: 'SUM_PARENTS',
    codeLine: 15,
    triangle: [
      [1],
      [1, 1],
      [1, 2, 1]
    ],
    activeRow: 2,
    activeCol: 1,
    parents: [[1, 0], [1, 1]],
    variables: { r: 2, c: 1, 'triangle[1][0]': 1, 'triangle[1][1]': 1, sum: 2 },
    explain: 'Sum triangle[1][0] (1) + triangle[1][1] (1) = 2. Row 2 is [1, 2, 1].',
    intuition: 'Combinatorial identity: C(n, k) = C(n-1, k-1) + C(n-1, k).'
  },
  {
    title: '4. Row 3: Compute [1, 3, 3, 1] from Row 2',
    phase: 'SUM_PARENTS',
    codeLine: 15,
    triangle: [
      [1],
      [1, 1],
      [1, 2, 1],
      [1, 3, 3, 1]
    ],
    activeRow: 3,
    activeCol: 1,
    parents: [[2, 0], [2, 1]],
    variables: { r: 3, sums: '1+2=3, 2+1=3', row: '[1, 3, 3, 1]' },
    explain: 'First interior cell is 1+2 = 3. Second interior cell is 2+1 = 3.',
    intuition: 'Binomial coefficients of degree 3.'
  },
  {
    title: '5. Row 4: Compute [1, 4, 6, 4, 1] -> 5 Rows Complete!',
    phase: 'COMPLETED',
    codeLine: 18,
    triangle: [
      [1],
      [1, 1],
      [1, 2, 1],
      [1, 3, 3, 1],
      [1, 4, 6, 4, 1]
    ],
    activeRow: 4,
    activeCol: 2,
    parents: [[3, 1], [3, 2]],
    variables: { r: 4, center: '3 + 3 = 6', totalRows: 5, timeComplexity: 'O(N^2)' },
    explain: 'Row 4 completes with interior cells 1+3=4, 3+3=6, 3+1=4. First 5 rows of Pascal’s Triangle fully generated!',
    intuition: 'Each layer dynamically constructed from the immediate prior layer.'
  }
];

export default function PascalsTriangleIVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Active Phase Badge */}
      <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#161824] border border-[#272b3c] text-indigo-300">
        Phase: {step.phase} • Row {step.activeRow}
      </span>

      {/* Pyramid Representation */}
      <div className="flex flex-col items-center gap-2.5 py-4">
        {step.triangle.map((row, rIdx) => (
          <div key={rIdx} className="flex items-center gap-2">
            {row.map((val, cIdx) => {
              const isActive = step.activeRow === rIdx && step.activeCol === cIdx;
              const isParent = step.parents && step.parents.some(([pr, pc]) => pr === rIdx && pc === cIdx);

              let style = 'bg-[#181a24] text-white border-[#2b2e40]';
              if (isActive) {
                style = 'bg-amber-500/25 text-amber-300 border-amber-400 scale-110 shadow-lg shadow-amber-500/20 font-extrabold';
              } else if (isParent) {
                style = 'bg-indigo-500/25 text-indigo-300 border-indigo-400 scale-105 shadow-md shadow-indigo-500/20 font-bold';
              }

              return (
                <div
                  key={cIdx}
                  className={`w-11 h-11 rounded-xl border flex flex-col items-center justify-center font-mono text-sm font-bold transition-all duration-300 ${style}`}
                >
                  <span>{val}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-xs font-mono text-[#8a8ea3]">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-indigo-500/30 border border-indigo-500"></span>
          <span>Parent Cells</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-amber-500/30 border border-amber-500"></span>
          <span>Computed Child Sum</span>
        </div>
      </div>
    </div>
  );
}
