import React from 'react';

export const meta = {
  title: 'Candy (Two-Pass Greedy)',
  category: 'Greedy Algorithms',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Distributes minimum candies to children such that every child gets at least 1 candy and children with higher ratings get more candies than their immediate neighbors.'
};

export const solutions = {
  cpp: `// C++ Candy (Two-Pass Greedy)
// Time: O(N) | Space: O(N)
#include <vector>
#include <numeric>
#include <algorithm>
using namespace std;

class Solution {
public:
    int candy(vector<int>& ratings) {
        int n = ratings.size();
        vector<int> left(n, 1);

        // Left to right pass: satisfy left neighbor condition
        for (int i = 1; i < n; i++) {
            if (ratings[i] > ratings[i - 1]) {
                left[i] = left[i - 1] + 1;
            }
        }

        // Right to left pass: satisfy right neighbor condition
        int right = 1;
        int total = max(1, left[n - 1]);

        for (int i = n - 2; i >= 0; i--) {
            if (ratings[i] > ratings[i + 1]) {
                right++;
            } else {
                right = 1;
            }
            total += max(left[i], right);
        }

        return total;
    }
};`,
  python: `# Python 3 Candy (Two-Pass Greedy)
class Solution:
    def candy(self, ratings: list[int]) -> int:
        n = len(ratings)
        left = [1] * n

        # Left to right pass
        for i in range(1, n):
            if ratings[i] > ratings[i - 1]:
                left[i] = left[i - 1] + 1

        # Right to left pass
        right = 1
        total = left[-1]

        for i in range(n - 2, -1, -1):
            if ratings[i] > ratings[i + 1]:
                right += 1
            else:
                right = 1
            total += max(left[i], right)

        return total`,
  java: `// Java Candy (Two-Pass Greedy)
import java.util.Arrays;

class Solution {
    public int candy(int[] ratings) {
        int n = ratings.length;
        int[] left = new int[n];
        Arrays.fill(left, 1);

        for (int i = 1; i < n; i++) {
            if (ratings[i] > ratings[i - 1]) {
                left[i] = left[i - 1] + 1;
            }
        }

        int right = 1;
        int total = left[n - 1];

        for (int i = n - 2; i >= 0; i--) {
            if (ratings[i] > ratings[i + 1]) {
                right++;
            } else {
                right = 1;
            }
            total += Math.max(left[i], right);
        }

        return total;
    }
}`,
  javascript: `// JavaScript Candy (Two-Pass Greedy)
var candy = function(ratings) {
    const n = ratings.length;
    const left = new Array(n).fill(1);

    for (let i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) {
            left[i] = left[i - 1] + 1;
        }
    }

    let right = 1;
    let total = left[n - 1];

    for (let i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            right++;
        } else {
            right = 1;
        }
        total += Math.max(left[i], right);
    }

    return total;
};`
};

export const steps = [
  {
    title: '1. Ratings: [1, 0, 2], Initialize Candies = [1, 1, 1]',
    phase: 'INITIAL',
    codeLine: 14,
    ratings: [1, 0, 2],
    left: [1, 1, 1],
    right: [1, 1, 1],
    finalCandies: [1, 1, 1],
    pass: 'Setup',
    activeIdx: 0,
    variables: { ratings: '[1, 0, 2]', minPerChild: 1 },
    explain: 'Each child must receive at least 1 candy regardless of rating.',
    intuition: 'Two-pass greedy decouples left and right neighbor constraints.'
  },
  {
    title: '2. Left Pass: ratings[1]=0 <= ratings[0]=1 (left[1]=1), ratings[2]=2 > ratings[1]=0 (left[2]=2)',
    phase: 'LEFT_PASS',
    codeLine: 18,
    ratings: [1, 0, 2],
    left: [1, 1, 2],
    right: [1, 1, 1],
    finalCandies: [1, 1, 2],
    pass: 'Left-to-Right',
    activeIdx: 2,
    variables: { 'left[0]': 1, 'left[1]': 1, 'left[2]': 2 },
    explain: 'Comparing left neighbors: index 2 has higher rating than index 1, so left[2] = left[1] + 1 = 2.',
    intuition: 'Left neighbor conditions satisfied.'
  },
  {
    title: '3. Right Pass: ratings[0]=1 > ratings[1]=0 -> right[0] = 2',
    phase: 'RIGHT_PASS',
    codeLine: 28,
    ratings: [1, 0, 2],
    left: [1, 1, 2],
    right: [2, 1, 1],
    finalCandies: [2, 1, 2],
    pass: 'Right-to-Left',
    activeIdx: 0,
    variables: { 'right[0]': 2, 'right[1]': 1, 'right[2]': 1 },
    explain: 'Comparing right neighbors backwards: index 0 has rating 1 > rating 0 at index 1, so right[0] = 2.',
    intuition: 'Right neighbor conditions satisfied.'
  },
  {
    title: '4. Combine Passes: max(left[i], right[i]) -> Candies = [2, 1, 2], Total = 5',
    phase: 'COMPLETED',
    codeLine: 34,
    ratings: [1, 0, 2],
    left: [1, 1, 2],
    right: [2, 1, 1],
    finalCandies: [2, 1, 2],
    pass: 'Complete',
    activeIdx: -1,
    variables: { finalAllocation: '[2, 1, 2]', totalCandies: 5 },
    explain: 'Taking max(left[i], right[i]) gives candies [2, 1, 2]. Total minimum candies = 2 + 1 + 2 = 5.',
    intuition: 'Both left and right monotonic slope constraints are strictly satisfied.'
  }
];

export default function CandyVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];
  const total = step.finalCandies.reduce((a, b) => a + b, 0);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Active Phase: {step.pass}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Total Candies = {total}
        </span>
      </div>

      {/* Children Ratings & Candies Display */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">Children Ratings & Candy Distribution</span>

        <div className="flex items-center justify-center gap-6 py-2">
          {step.ratings.map((rating, idx) => {
            const candies = step.finalCandies[idx];
            const isTarget = idx === step.activeIdx;

            return (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className={`w-20 h-24 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all ${
                  isTarget 
                    ? 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40 shadow-lg' 
                    : 'border-[#272b3c] bg-[#161824] text-slate-300'
                }`}>
                  <span className="text-xs text-[#8a8ea3]">Child {idx}</span>
                  <span className="text-xs font-bold text-amber-400">★ Rating {rating}</span>
                  <div className="flex items-center gap-0.5 mt-2">
                    {Array.from({ length: candies }).map((_, c) => (
                      <span key={c} className="text-sm">🍬</span>
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 mt-1">{candies} Candies</span>
                </div>

                <div className="text-[10px] font-mono text-slate-500 flex gap-2">
                  <span>L:{step.left[idx]}</span>
                  <span>R:{step.right[idx]}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}
