import React from 'react';

export const meta = {
  title: "Find Row with Maximum 1's",
  category: 'Binary Search & 2D Matrix',
  difficulty: 'Easy',
  timeComplexity: 'O(M log N)',
  spaceComplexity: 'O(1)',
  description: "Finds the row index with the highest count of 1's in a boolean matrix where each row is sorted, using Lower Bound binary search on each row in O(M log N) time."
};

export const solutions = {
  cpp: `// C++ Optimal Binary Search (Lower Bound for First 1) per row
// Time Complexity: O(M * log N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
private:
    int lowerBound(const vector<int>& row, int n) {
        int low = 0, high = n - 1;
        int ans = n;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (row[mid] >= 1) {
                ans = mid;
                high = mid - 1; // Look for earlier 1
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }

public:
    int rowWithMax1s(vector<vector<int>>& mat) {
        int m = mat.size(), n = mat[0].size();
        int maxCount = 0;
        int maxRowIdx = -1;

        for (int i = 0; i < m; i++) {
            int firstOne = lowerBound(mat[i], n);
            int countOnes = n - firstOne;

            if (countOnes > maxCount) {
                maxCount = countOnes;
                maxRowIdx = i;
            }
        }

        return maxRowIdx;
    }
};`,
  python: `# Python 3 Optimal Binary Search per Row
class Solution:
    def rowWithMax1s(self, mat: list[list[int]]) -> int:
        m, n = len(mat), len(mat[0])
        max_count = 0
        max_row = -1

        for r in range(m):
            # Binary search for first 1
            low, high = 0, n - 1
            first_one = n

            while low <= high:
                mid = (low + high) // 2
                if mat[r][mid] >= 1:
                    first_one = mid
                    high = mid - 1
                else:
                    low = mid + 1

            count = n - first_one
            if count > max_count:
                max_count = count
                max_row = r

        return max_row`,
  java: `// Java Optimal Binary Search per Row
class Solution {
    public int rowWithMax1s(int[][] mat) {
        int m = mat.length, n = mat[0].length;
        int maxCount = 0;
        int maxRow = -1;

        for (int r = 0; r < m; r++) {
            int low = 0, high = n - 1;
            int firstOne = n;

            while (low <= high) {
                int mid = low + (high - low) / 2;
                if (mat[r][mid] >= 1) {
                    firstOne = mid;
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            }

            int count = n - firstOne;
            if (count > maxCount) {
                maxCount = count;
                maxRow = r;
            }
        }

        return maxRow;
    }
}`,
  javascript: `// JavaScript Optimal Binary Search per Row
var rowWithMax1s = function(mat) {
    const m = mat.length, n = mat[0].length;
    let maxCount = 0;
    let maxRow = -1;

    for (let r = 0; r < m; r++) {
        let low = 0, high = n - 1;
        let firstOne = n;

        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if (mat[r][mid] >= 1) {
                firstOne = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        const count = n - firstOne;
        if (count > maxCount) {
            maxCount = count;
            maxRow = r;
        }
    }

    return maxRow;
};`
};

export const steps = [
  {
    title: '1. Initialize: 4x4 Matrix with Sorted Rows',
    phase: 'INITIAL',
    codeLine: 28,
    matrix: [
      [0, 1, 1, 1],
      [0, 0, 1, 1],
      [1, 1, 1, 1],
      [0, 0, 0, 0]
    ],
    currentRow: null,
    rowCounts: [null, null, null, null],
    maxRow: -1,
    maxCount: 0,
    variables: { m: 4, n: 4, maxCount: 0, maxRow: -1 },
    explain: 'Because rows are sorted, 1s always form a contiguous suffix. Finding the first index of 1 via lower bound gives the count of 1s in O(log N) time: count = n - first1.',
    intuition: 'Avoids linear O(M x N) counting by finding the 0-to-1 transition boundary.'
  },
  {
    title: '2. Row 0: First 1 at col 1 -> Count = 4 - 1 = 3 1s (maxCount = 3)',
    phase: 'EVALUATING',
    codeLine: 34,
    matrix: [
      [0, 1, 1, 1],
      [0, 0, 1, 1],
      [1, 1, 1, 1],
      [0, 0, 0, 0]
    ],
    currentRow: 0,
    rowCounts: [3, null, null, null],
    maxRow: 0,
    maxCount: 3,
    variables: { row: 0, firstOneIndex: 1, count: 3, 'maxCount updated': 3, maxRow: 0 },
    explain: 'Row 0 has first 1 at col 1. Total 1s = 4 - 1 = 3. maxCount updated to 3 (Row 0).',
    intuition: 'Benchmark established with 3 ones.'
  },
  {
    title: '3. Row 1: First 1 at col 2 -> Count = 4 - 2 = 2 1s (2 <= 3, No Change)',
    phase: 'EVALUATING',
    codeLine: 34,
    matrix: [
      [0, 1, 1, 1],
      [0, 0, 1, 1],
      [1, 1, 1, 1],
      [0, 0, 0, 0]
    ],
    currentRow: 1,
    rowCounts: [3, 2, null, null],
    maxRow: 0,
    maxCount: 3,
    variables: { row: 1, firstOneIndex: 2, count: 2, maxCount: 3, maxRow: 0 },
    explain: 'Row 1 has 2 ones. Since 2 <= 3, Row 0 remains the best candidate.',
    intuition: 'Fewer 1s than current leader.'
  },
  {
    title: '4. Row 2: First 1 at col 0 -> Count = 4 - 0 = 4 1s (NEW MAXIMUM: 4 1s!)',
    phase: 'NEW_MAX',
    codeLine: 36,
    matrix: [
      [0, 1, 1, 1],
      [0, 0, 1, 1],
      [1, 1, 1, 1],
      [0, 0, 0, 0]
    ],
    currentRow: 2,
    rowCounts: [3, 2, 4, null],
    maxRow: 2,
    maxCount: 4,
    variables: { row: 2, firstOneIndex: 0, count: 4, 'maxCount updated': 4, maxRow: 2 },
    explain: 'Row 2 starts with 1 at col 0! Count = 4. 4 > 3. Update maxCount = 4, maxRow = 2!',
    intuition: 'Complete row of 1s.'
  },
  {
    title: '5. Row 3: No 1s (count = 0) -> Row 2 is the Winner!',
    phase: 'COMPLETED',
    codeLine: 41,
    matrix: [
      [0, 1, 1, 1],
      [0, 0, 1, 1],
      [1, 1, 1, 1],
      [0, 0, 0, 0]
    ],
    currentRow: 3,
    rowCounts: [3, 2, 4, 0],
    maxRow: 2,
    maxCount: 4,
    variables: { bestRowIndex: 2, totalOnes: 4, timeComplexity: 'O(M log N)' },
    explain: 'Row 3 contains all 0s. All rows evaluated. Row 2 has the maximum number of 1s (4 ones). Return 2!',
    intuition: 'Row 2 wins.'
  }
];

export default function FindRowWithMaximum1sVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Top Banner */}
      <div className="flex items-center gap-4 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Evaluating: {step.currentRow !== null ? `Row ${step.currentRow}` : 'Ready'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Winning Row: {step.maxRow !== -1 ? `Row ${step.maxRow} (${step.maxCount} ones)` : 'None'}
        </span>
      </div>

      {/* Grid Display with Row Counts */}
      <div className="p-4 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl flex flex-col gap-2.5">
        {step.matrix.map((row, rIdx) => {
          const isCurrent = step.currentRow === rIdx;
          const isWinner = step.phase === 'COMPLETED' && step.maxRow === rIdx;
          const count = step.rowCounts[rIdx];

          return (
            <div key={rIdx} className="flex items-center gap-3">
              <span className={`text-xs font-mono w-14 ${isWinner ? 'text-emerald-400 font-bold' : isCurrent ? 'text-amber-300 font-bold' : 'text-[#5b6076]'}`}>
                Row {rIdx}:
              </span>

              <div className="flex items-center gap-1.5">
                {row.map((val, cIdx) => (
                  <div
                    key={cIdx}
                    className={`w-11 h-11 rounded-xl border flex items-center justify-center font-mono text-base font-bold transition-all duration-300 ${
                      isWinner && val === 1 ? 'bg-emerald-500/25 text-emerald-300 border-emerald-400 font-bold' :
                      isCurrent && val === 1 ? 'bg-amber-500/25 text-amber-300 border-amber-400' :
                      val === 1 ? 'bg-indigo-500/15 text-indigo-200 border-indigo-500/30' :
                      'bg-[#181a24] text-[#555a72] border-[#2b2e40]'
                    }`}
                  >
                    {val}
                  </div>
                ))}
              </div>

              <div className="w-16 text-right">
                <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                  count !== null ? 'bg-[#181a26] text-white border border-[#2d3144]' : 'text-[#42465c]'
                }`}>
                  {count !== null ? `${count} ones` : '-'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
