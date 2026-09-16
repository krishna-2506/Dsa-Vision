import React from 'react';

export const meta = {
  title: 'Floor and Ceil in Sorted Array',
  category: 'Binary Search Basics',
  difficulty: 'Easy',
  timeComplexity: 'O(log N)',
  spaceComplexity: 'O(1)',
  description: 'Finds the Floor (largest element ≤ X) and Ceil (smallest element ≥ X) in a sorted array using binary search.'
};

export const solutions = {
  cpp: `// C++ Floor and Ceil in Sorted Array
// Time Complexity: O(log N) | Space Complexity: O(1)
#include <vector>
#include <utility>
using namespace std;

pair<int, int> getFloorAndCeil(vector<int> &a, int n, int x) {
    int low = 0, high = n - 1;
    int floorVal = -1, ceilVal = -1;

    // Binary search for floor (largest element <= x)
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (a[mid] <= x) {
            floorVal = a[mid];
            low = mid + 1; // Look for a larger valid floor to the right
        } else {
            high = mid - 1;
        }
    }

    // Binary search for ceil (smallest element >= x)
    low = 0; high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (a[mid] >= x) {
            ceilVal = a[mid];
            high = mid - 1; // Look for a smaller valid ceil to the left
        } else {
            low = mid + 1;
        }
    }

    return {floorVal, ceilVal};
}`,
  python: `# Python 3 Floor and Ceil in Sorted Array
def getFloorAndCeil(a: list[int], n: int, x: int) -> tuple[int, int]:
    # Floor: largest <= x
    low, high = 0, n - 1
    floor_val = -1
    while low <= high:
        mid = (low + high) // 2
        if a[mid] <= x:
            floor_val = a[mid]
            low = mid + 1
        else:
            high = mid - 1

    # Ceil: smallest >= x
    low, high = 0, n - 1
    ceil_val = -1
    while low <= high:
        mid = (low + high) // 2
        if a[mid] >= x:
            ceil_val = a[mid]
            high = mid - 1
        else:
            low = mid + 1

    return (floor_val, ceil_val)`,
  java: `// Java Floor and Ceil in Sorted Array
class Solution {
    public static int[] getFloorAndCeil(int[] a, int n, int x) {
        int low = 0, high = n - 1;
        int floor = -1, ceil = -1;

        // Floor Search
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (a[mid] <= x) {
                floor = a[mid];
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        // Ceil Search
        low = 0; high = n - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (a[mid] >= x) {
                ceil = a[mid];
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return new int[]{floor, ceil};
    }
}`,
  javascript: `// JavaScript Floor and Ceil in Sorted Array
function getFloorAndCeil(a, n, x) {
    let low = 0, high = n - 1;
    let floorVal = -1, ceilVal = -1;

    // Floor
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (a[mid] <= x) {
            floorVal = a[mid];
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    // Ceil
    low = 0; high = n - 1;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (a[mid] >= x) {
            ceilVal = a[mid];
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    return [floorVal, ceilVal];
}`
};

export const steps = [
  {
    title: '1. Sorted Array: [3, 4, 4, 7, 8, 10], Target X = 5',
    phase: 'INITIAL',
    codeLine: 10,
    arr: [3, 4, 4, 7, 8, 10],
    x: 5,
    low: 0,
    high: 5,
    mid: null,
    floorVal: -1,
    ceilVal: -1,
    variables: { x: 5, floor: -1, ceil: -1 },
    explain: 'Floor is the largest element ≤ 5, and Ceil is the smallest element ≥ 5.',
    intuition: 'Since the array is sorted, binary search quickly bounds target X.'
  },
  {
    title: '2. Search Floor: mid = 2 (val = 4) -> 4 ≤ 5: floor = 4, search right',
    phase: 'FLOOR_SEARCH',
    codeLine: 16,
    arr: [3, 4, 4, 7, 8, 10],
    x: 5,
    low: 3,
    high: 5,
    mid: 2,
    floorVal: 4,
    ceilVal: -1,
    variables: { mid: 2, val: 4, condition: '4 <= 5', floor: 4, low: 3 },
    explain: 'a[2] = 4 is ≤ 5. We record 4 as our best floor so far and move right to see if a larger valid element exists.',
    intuition: 'Floor candidate found.'
  },
  {
    title: '3. Search Floor: mid = 4 (val = 8) -> 8 > 5: high = 3, search left',
    phase: 'FLOOR_SEARCH',
    codeLine: 19,
    arr: [3, 4, 4, 7, 8, 10],
    x: 5,
    low: 3,
    high: 3,
    mid: 4,
    floorVal: 4,
    ceilVal: -1,
    variables: { mid: 4, val: 8, condition: '8 > 5', high: 3 },
    explain: 'a[4] = 8 exceeds 5. Move high to 3. Floor remains 4.',
    intuition: 'Too large for floor.'
  },
  {
    title: '4. Search Ceil: mid = 2 (val = 4) -> 4 < 5: low = 3, search right',
    phase: 'CEIL_SEARCH',
    codeLine: 31,
    arr: [3, 4, 4, 7, 8, 10],
    x: 5,
    low: 3,
    high: 5,
    mid: 2,
    floorVal: 4,
    ceilVal: -1,
    variables: { mid: 2, val: 4, condition: '4 < 5', low: 3 },
    explain: 'Now searching for Ceil (smallest element ≥ 5). a[2] = 4 is < 5, so move low = 3.',
    intuition: 'Ceil must be greater than or equal to 5.'
  },
  {
    title: '5. Search Ceil: mid = 4 (val = 8) -> 8 ≥ 5: ceil = 8, high = 3',
    phase: 'CEIL_SEARCH',
    codeLine: 27,
    arr: [3, 4, 4, 7, 8, 10],
    x: 5,
    low: 3,
    high: 3,
    mid: 4,
    floorVal: 4,
    ceilVal: 8,
    variables: { mid: 4, val: 8, condition: '8 >= 5', ceil: 8, high: 3 },
    explain: 'a[4] = 8 is ≥ 5. Record ceil = 8 and move high left to find smaller candidates.',
    intuition: 'Candidate ceil found.'
  },
  {
    title: '6. Search Ceil: mid = 3 (val = 7) -> 7 ≥ 5: ceil = 7! Final Results: Floor = 4, Ceil = 7',
    phase: 'COMPLETED',
    codeLine: 35,
    arr: [3, 4, 4, 7, 8, 10],
    x: 5,
    low: 3,
    high: 2,
    mid: 3,
    floorVal: 4,
    ceilVal: 7,
    variables: { target: 5, floorResult: 4, ceilResult: 7, timeComplexity: 'O(log N)' },
    explain: 'a[3] = 7 is ≥ 5 and smaller than 8. Ceil updates to 7. Search terminates. Floor = 4, Ceil = 7.',
    intuition: 'Exact tight boundary elements located in O(log N).'
  }
];

export default function FloorAndCeilInSortedArrayVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Target X = {step.x}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Floor (≤ X): {step.floorVal !== -1 ? step.floorVal : 'Searching'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-bold">
          Ceil (≥ X): {step.ceilVal !== -1 ? step.ceilVal : 'Searching'}
        </span>
      </div>

      {/* Array Elements */}
      <div className="w-full flex items-center justify-center gap-2 py-3 overflow-x-auto">
        {step.arr.map((val, idx) => {
          const isMid = idx === step.mid;
          const isFloor = val === step.floorVal && step.floorVal !== -1;
          const isCeil = val === step.ceilVal && step.ceilVal !== -1;

          let borderClass = 'border-[#272b3c] bg-[#12131b] text-slate-200';
          if (isMid) {
            borderClass = 'border-amber-500 bg-amber-500/20 text-amber-300 ring-2 ring-amber-500/30 shadow-lg';
          } else if (isFloor) {
            borderClass = 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/40';
          } else if (isCeil) {
            borderClass = 'border-indigo-500/50 bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-500/40';
          }

          return (
            <div key={idx} className="flex flex-col items-center gap-1 min-w-[44px]">
              <div className={`w-11 h-12 rounded-xl border flex items-center justify-center font-mono font-bold text-sm transition-all ${borderClass}`}>
                {val}
              </div>
              <span className="text-[9px] font-mono text-[#5b6076]">[{idx}]</span>
            </div>
          );
        })}
      </div>

      {/* Floor and Ceil definition cards */}
      <div className="w-full grid grid-cols-2 gap-3 text-xs font-mono">
        <div className="p-3 rounded-xl bg-[#12131b] border border-emerald-500/20 flex flex-col gap-1">
          <span className="text-emerald-400 font-semibold">Floor = {step.floorVal}</span>
          <span className="text-[#717691] text-[11px]">Largest element in array ≤ {step.x}</span>
        </div>
        <div className="p-3 rounded-xl bg-[#12131b] border border-indigo-500/20 flex flex-col gap-1">
          <span className="text-indigo-400 font-semibold">Ceil = {step.ceilVal}</span>
          <span className="text-[#717691] text-[11px]">Smallest element in array ≥ {step.x}</span>
        </div>
      </div>
    </div>
  );
}
