import React from 'react';

export const meta = {
  title: 'Matrix Median',
  category: 'Binary Search',
  difficulty: 'Hard',
  timeComplexity: 'O(log(Max - Min) * R * log C)',
  spaceComplexity: 'O(1)',
  description: 'Finds the median in a row-wise sorted matrix with odd dimensions by binary searching the value range and counting elements less than or equal to each guess using upper_bound.'
};

export const solutions = {
  cpp: `// C++ Binary Search on Value Range for Matrix Median
// Time Complexity: O(log(1e9) * R * log C) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

class Solution {
    // Counts elements <= x in a sorted row using upper_bound
    int countSmallEqual(const vector<int>& row, int x) {
        return upper_bound(row.begin(), row.end(), x) - row.begin();
    }

public:
    int findMedian(vector<vector<int>>& mat) {
        int r = mat.size(), c = mat[0].size();
        int low = INT_MAX, high = INT_MIN;

        for (int i = 0; i < r; i++) {
            low = min(low, mat[i][0]);
            high = max(high, mat[i][c - 1]);
        }

        int req = (r * c) / 2;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            int count = 0;

            for (int i = 0; i < r; i++) {
                count += countSmallEqual(mat[i], mid);
            }

            if (count <= req) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return low;
    }
};`,
  python: `# Python 3 Binary Search on Value Range for Matrix Median
import bisect

class Solution:
    def findMedian(self, mat: list[list[int]]) -> int:
        r, c = len(mat), len(mat[0])
        low = min(row[0] for row in mat)
        high = max(row[-1] for row in mat)
        req = (r * c) // 2

        while low <= high:
            mid = (low + high) // 2
            count = sum(bisect.bisect_right(row, mid) for row in mat)

            if count <= req:
                low = mid + 1
            else:
                high = mid - 1

        return low`,
  java: `// Java Binary Search on Value Range for Matrix Median
import java.util.Arrays;

class Solution {
    private int upperBound(int[] row, int x) {
        int low = 0, high = row.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (row[mid] <= x) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return low;
    }

    public int findMedian(int[][] mat) {
        int r = mat.length, c = mat[0].length;
        int low = Integer.MAX_VALUE, high = Integer.MIN_VALUE;

        for (int i = 0; i < r; i++) {
            low = Math.min(low, mat[i][0]);
            high = Math.max(high, mat[i][c - 1]);
        }

        int req = (r * c) / 2;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            int count = 0;

            for (int i = 0; i < r; i++) {
                count += upperBound(mat[i], mid);
            }

            if (count <= req) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return low;
    }
}`,
  javascript: `// JavaScript Binary Search on Value Range for Matrix Median
var findMedian = function(mat) {
    const r = mat.length, c = mat[0].length;
    let low = Infinity, high = -Infinity;

    for (let i = 0; i < r; i++) {
        low = Math.min(low, mat[i][0]);
        high = Math.max(high, mat[i][c - 1]);
    }

    const upperBound = (row, x) => {
        let l = 0, h = row.length - 1;
        while (l <= h) {
            const m = Math.floor((l + h) / 2);
            if (row[m] <= x) {
                l = m + 1;
            } else {
                h = m - 1;
            }
        }
        return l;
    };

    const req = Math.floor((r * c) / 2);

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        let count = 0;

        for (let i = 0; i < r; i++) {
            count += upperBound(mat[i], mid);
        }

        if (count <= req) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return low;
};`
};

export const steps = [
  {
    title: '1. Problem Overview: 3x3 Row-Wise Sorted Matrix',
    phase: 'INITIAL',
    codeLine: 20,
    matrix: [
      [1, 3, 5],
      [2, 6, 9],
      [3, 6, 9]
    ],
    low: 1,
    high: 9,
    mid: null,
    rowCounts: null,
    totalCount: null,
    median: null,
    variables: { rows: 3, cols: 3, totalElements: 9, requiredLessEqual: '4 + 1 = 5th element', minVal: 1, maxVal: 9 },
    explain: 'Each row is sorted independently. With 9 total elements, the median is the 5th smallest element (strictly requires count of elements <= median to be >= 5).',
    intuition: 'Instead of full flattening and sorting O(R*C log(R*C)), binary search the value space [1..9].'
  },
  {
    title: '2. Iteration 1: Guess mid = 5. Count elements <= 5 across rows',
    phase: 'EVALUATE_MID',
    codeLine: 28,
    matrix: [
      [1, 3, 5],
      [2, 6, 9],
      [3, 6, 9]
    ],
    low: 1,
    high: 9,
    mid: 5,
    rowCounts: [3, 1, 1],
    totalCount: 5,
    median: null,
    variables: { mid: 5, row0_count: 3, row1_count: 1, row2_count: 1, totalCount: 5, req: 4 },
    explain: 'Row 0 has 3 elements <= 5 [1, 3, 5]. Row 1 has 1 element [2]. Row 2 has 1 element [3]. Total count = 5 > req (4). 5 is a valid upper bound candidate! Try smaller: high = mid - 1 = 4.',
    intuition: 'Since count (5) > 4, median could be 5 or smaller. Shrink upper bound.'
  },
  {
    title: '3. Iteration 2: Guess mid = 2. Count elements <= 2',
    phase: 'EVALUATE_MID',
    codeLine: 28,
    matrix: [
      [1, 3, 5],
      [2, 6, 9],
      [3, 6, 9]
    ],
    low: 1,
    high: 4,
    mid: 2,
    rowCounts: [1, 1, 0],
    totalCount: 2,
    median: null,
    variables: { mid: 2, row0_count: 1, row1_count: 1, row2_count: 0, totalCount: 2, req: 4 },
    explain: 'Total elements <= 2 is only 2. But we need at least 5 elements! 2 is too small. Set low = mid + 1 = 3.',
    intuition: 'Count (2) <= 4, so median must be strictly greater than 2.'
  },
  {
    title: '4. Iteration 3: Guess mid = 3. Count elements <= 3',
    phase: 'EVALUATE_MID',
    codeLine: 28,
    matrix: [
      [1, 3, 5],
      [2, 6, 9],
      [3, 6, 9]
    ],
    low: 3,
    high: 4,
    mid: 3,
    rowCounts: [2, 1, 1],
    totalCount: 4,
    median: null,
    variables: { mid: 3, totalCount: 4, req: 4, action: 'low = mid + 1 = 4' },
    explain: 'Total elements <= 3 is 4 <= 4. Still not enough elements to reach the median rank (5). Set low = mid + 1 = 4.',
    intuition: 'Median must be >= 4.'
  },
  {
    title: '5. Iteration 4: Guess mid = 4. Count elements <= 4 is 4 => low becomes 5',
    phase: 'EVALUATE_MID',
    codeLine: 35,
    matrix: [
      [1, 3, 5],
      [2, 6, 9],
      [3, 6, 9]
    ],
    low: 4,
    high: 4,
    mid: 4,
    rowCounts: [2, 1, 1],
    totalCount: 4,
    median: null,
    variables: { mid: 4, totalCount: 4, lowNext: 5, high: 4 },
    explain: 'Elements <= 4 is still 4. Set low = mid + 1 = 5. Now low (5) > high (4), search space converges.',
    intuition: 'The binary search pointer low terminates exactly at the median value 5.'
  },
  {
    title: '6. Matrix Median Found: 5',
    phase: 'RESULT',
    codeLine: 40,
    matrix: [
      [1, 3, 5],
      [2, 6, 9],
      [3, 6, 9]
    ],
    low: 5,
    high: 4,
    mid: null,
    rowCounts: [3, 1, 1],
    totalCount: 5,
    median: 5,
    variables: { median: 5, sortedFlat: '[1, 2, 3, 3, 5, 6, 6, 9, 9]' },
    explain: 'Sorted sequence is [1, 2, 3, 3, 5, 6, 6, 9, 9]. The 5th element is 5! Solved with zero matrix copying.',
    intuition: 'Answer space binary search works across multidimensional sorted data seamlessly.'
  }
];

export default function MatrixMedianVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          3x3 Row-Sorted Matrix (9 elements)
        </span>
        {step.mid !== null && (
          <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold">
            Testing Guess: {step.mid}
          </span>
        )}
        {step.totalCount !== null && (
          <span className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
            Count &le; {step.mid || step.median}: {step.totalCount} (Need &ge; 5)
          </span>
        )}
      </div>

      {/* 2D Matrix Rows */}
      <div className="p-4 rounded-2xl bg-[#161824] border border-[#272b3c] flex flex-col items-center gap-3">
        {step.matrix.map((row, rIdx) => {
          const countInThisRow = step.rowCounts ? step.rowCounts[rIdx] : null;

          return (
            <div key={rIdx} className="flex items-center gap-3">
              <span className="w-12 text-xs font-mono text-[#8a8ea3] text-right">Row {rIdx}</span>
              <div className="flex items-center gap-2">
                {row.map((val, cIdx) => {
                  const isSmallEqual = step.mid !== null && val <= step.mid;
                  const isMedianCell = step.median !== null && val === step.median && rIdx === 0 && cIdx === 2;

                  let cellStyle = 'bg-[#12131b] border-[#272b3c] text-white';
                  if (isMedianCell) {
                    cellStyle = 'bg-emerald-500/30 border-emerald-400 text-emerald-200 scale-110 shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400';
                  } else if (isSmallEqual) {
                    cellStyle = 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300';
                  }

                  return (
                    <div
                      key={cIdx}
                      className={`w-12 h-12 rounded-xl border flex items-center justify-center font-mono font-bold text-base transition-all ${cellStyle}`}
                    >
                      {val}
                    </div>
                  );
                })}
              </div>

              {countInThisRow !== null && (
                <span className="text-xs font-mono text-cyan-400 ml-2">
                  ({countInThisRow} &le; {step.mid})
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Answer Space Range */}
      <div className="w-full p-4 rounded-xl bg-[#12131b] border border-[#202436] flex items-center justify-around font-mono text-sm">
        <div className="flex items-center gap-2">
          <span className="text-[#8a8ea3]">Low:</span>
          <span className="text-blue-400 font-bold">{step.low}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#8a8ea3]">High:</span>
          <span className="text-purple-400 font-bold">{step.high}</span>
        </div>
      </div>

      {/* Result Card */}
      {step.phase === 'RESULT' && (
        <div className="w-full p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center gap-3 text-emerald-300 font-mono text-base font-bold">
          <span>👑 Matrix Median = {step.median}</span>
        </div>
      )}
    </div>
  );
}
