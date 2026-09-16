import React from 'react';

export const meta = {
  title: 'Find the Repeating and Missing Number (Math Formulation)',
  category: 'Arrays & Mathematics',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Calculates the single repeating number X and missing number Y from [1 ... N] in linear time and O(1) space using natural sum and sum-of-squares difference equations.'
};

export const solutions = {
  cpp: `// C++ Optimal Math Solution using Sum & Sum of Squares
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> findMissingRepeatingNumbers(vector<int> a) {
        long long n = a.size();

        // Sum of first n natural numbers
        long long SN = (n * (n + 1)) / 2;
        long long S2N = (n * (n + 1) * (2 * n + 1)) / 6;

        long long S = 0, S2 = 0;
        for (int x : a) {
            S += x;
            S2 += (long long)x * x;
        }

        // val1 = X - Y
        long long val1 = S - SN;

        // val2 = X^2 - Y^2 = (X - Y)(X + Y)
        long long val2 = S2 - S2N;

        // X + Y = val2 / val1
        val2 = val2 / val1;

        long long X = (val1 + val2) / 2;
        long long Y = X - val1;

        return {(int)X, (int)Y};
    }
};`,
  python: `# Python 3 Optimal Math Solution
class Solution:
    def findMissingRepeatingNumbers(self, a: list[int]) -> list[int]:
        n = len(a)
        SN = (n * (n + 1)) // 2
        S2N = (n * (n + 1) * (2 * n + 1)) // 6

        S = sum(a)
        S2 = sum(x * x for x in a)

        val1 = S - SN          # X - Y
        val2 = (S2 - S2N) // val1  # X + Y

        X = (val1 + val2) // 2 # Repeating
        Y = X - val1           # Missing

        return [X, Y]`,
  java: `// Java Optimal Math Solution
class Solution {
    public int[] findMissingRepeatingNumbers(int[] a) {
        long n = a.length;
        long SN = (n * (n + 1)) / 2;
        long S2N = (n * (n + 1) * (2 * n + 1)) / 6;

        long S = 0, S2 = 0;
        for (int x : a) {
            S += x;
            S2 += (long) x * x;
        }

        long val1 = S - SN;
        long val2 = (S2 - S2N) / val1;

        int X = (int)((val1 + val2) / 2);
        int Y = (int)(X - val1);

        return new int[]{X, Y};
    }
}`,
  javascript: `// JavaScript Optimal Math Solution
var findMissingRepeatingNumbers = function(a) {
    const n = a.length;
    const SN = (n * (n + 1)) / 2;
    const S2N = (n * (n + 1) * (2 * n + 1)) / 6;

    let S = 0, S2 = 0;
    for (const x of a) {
        S += x;
        S2 += x * x;
    }

    const val1 = S - SN;
    const val2 = (S2 - S2N) / val1;

    const X = Math.floor((val1 + val2) / 2);
    const Y = X - val1;

    return [X, Y];
};`
};

export const steps = [
  {
    title: '1. Array: [3, 1, 2, 5, 3], N = 5',
    phase: 'INITIAL',
    codeLine: 12,
    array: [3, 1, 2, 5, 3],
    n: 5,
    variables: { n: 5, expectedRange: '[1 ... 5]', goal: 'Find repeating (X) and missing (Y)' },
    explain: 'Array of size 5 contains numbers from 1 to 5 with one duplicate and one missing. Instead of a hash map, we use pure mathematics to solve it in O(1) space.',
    intuition: 'Two unknowns (X, Y) can be uniquely identified using two independent polynomial equations.'
  },
  {
    title: '2. Equation 1: Sum Difference (X - Y)',
    phase: 'EQUATION_1',
    codeLine: 23,
    array: [3, 1, 2, 5, 3],
    n: 5,
    variables: { 'Actual Sum (S)': 14, 'Expected Sum (SN)': 15, 'val1 = X - Y': -1 },
    explain: 'Expected sum SN = 5 * 6 / 2 = 15. Actual sum S = 3 + 1 + 2 + 5 + 3 = 14. Therefore: X - Y = 14 - 15 = -1.',
    intuition: 'First linear relation established.'
  },
  {
    title: '3. Equation 2: Squares Difference (X^2 - Y^2)',
    phase: 'EQUATION_2',
    codeLine: 26,
    array: [3, 1, 2, 5, 3],
    n: 5,
    variables: { 'Actual S2': 48, 'Expected S2N': 55, 'X^2 - Y^2': -7, 'val2 = X + Y': '(-7) / (-1) = 7' },
    explain: 'Expected S2N = (5 * 6 * 11) / 6 = 55. Actual S2 = 9 + 1 + 4 + 25 + 9 = 48. S2 - S2N = -7. Dividing by (X - Y) gives X + Y = 7.',
    intuition: 'Factoring difference of squares: (X - Y)(X + Y) = -7.'
  },
  {
    title: '4. Solve Simultaneous Equations for X and Y',
    phase: 'SOLVE',
    codeLine: 31,
    array: [3, 1, 2, 5, 3],
    n: 5,
    variables: { 'Eq 1': 'X - Y = -1', 'Eq 2': 'X + Y = 7', 'X = (-1 + 7)/2': 3, 'Y = 3 - (-1)': 4 },
    explain: 'Add both equations: 2X = 6 -> X = 3 (Repeating). Substitute X into Eq 1: 3 - Y = -1 -> Y = 4 (Missing).',
    intuition: 'System of linear equations solved directly.'
  },
  {
    title: '5. Completed: Repeating X = 3, Missing Y = 4',
    phase: 'COMPLETED',
    codeLine: 34,
    array: [3, 1, 2, 5, 3],
    n: 5,
    variables: { repeating: 3, missing: 4, timeComplexity: 'O(N)', spaceComplexity: 'O(1)' },
    explain: 'Output: [3, 4]. Executed in a single linear pass with 0 extra memory allocation!',
    intuition: 'Mathematical elegance replaces hash table overhead.'
  }
];

export default function FindTheRepeatingAndMissingNumberVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Target Array */}
      <div className="w-full flex flex-col items-center gap-1.5">
        <span className="text-xs font-mono text-[#8a8ea3]">Input Array (size 5):</span>
        <div className="flex items-center gap-2">
          {step.array.map((val, idx) => {
            const isRepeating = step.phase === 'COMPLETED' && val === 3;

            return (
              <div
                key={idx}
                className={`w-12 h-12 rounded-xl border flex items-center justify-center font-mono text-base font-bold transition-all duration-300 ${
                  isRepeating ? 'bg-amber-500/25 text-amber-300 border-amber-400 scale-105 shadow-md shadow-amber-500/20' : 'bg-[#181a24] text-white border-[#2b2e40]'
                }`}
              >
                {val}
              </div>
            );
          })}
        </div>
      </div>

      {/* Math Equations Board */}
      <div className="w-full flex flex-col items-center gap-2 p-5 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl">
        <span className="text-xs font-mono text-[#8a8ea3]">Simultaneous Mathematical Formulation:</span>
        <div className="flex flex-col gap-2 font-mono text-xs text-left w-full px-4">
          <div className="flex items-center justify-between py-1 border-b border-[#212434]">
            <span className="text-[#8a8ea3]">1. Difference:</span>
            <span className="text-indigo-300 font-bold">X - Y = S - S_N = -1</span>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-[#212434]">
            <span className="text-[#8a8ea3]">2. Squares:</span>
            <span className="text-purple-300 font-bold">X² - Y² = S² - S²_N = -7</span>
          </div>
          <div className="flex items-center justify-between py-1 border-b border-[#212434]">
            <span className="text-[#8a8ea3]">3. Sum:</span>
            <span className="text-blue-300 font-bold">X + Y = (-7) / (-1) = 7</span>
          </div>
        </div>
      </div>

      {/* Results Header */}
      {step.phase === 'COMPLETED' && (
        <div className="flex items-center gap-6">
          <div className="px-4 py-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-xs font-mono">
            <span className="text-amber-400 font-bold">Repeating (X):</span>
            <span className="text-amber-200 font-bold text-sm ml-2">3</span>
          </div>
          <div className="px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono">
            <span className="text-emerald-400 font-bold">Missing (Y):</span>
            <span className="text-emerald-200 font-bold text-sm ml-2">4</span>
          </div>
        </div>
      )}
    </div>
  );
}
