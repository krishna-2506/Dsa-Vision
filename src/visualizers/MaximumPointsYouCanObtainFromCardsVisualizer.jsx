import React from 'react';

export const meta = {
  title: 'Maximum Points You Can Obtain from Cards',
  category: 'Sliding Window',
  difficulty: 'Medium',
  timeComplexity: 'O(K)',
  spaceComplexity: 'O(1)',
  description: 'Finds the maximum points obtainable by taking exactly K cards from either the beginning or end of a row using a sliding boundary window.'
};

export const solutions = {
  cpp: `// C++ Maximum Points You Can Obtain from Cards
// Time Complexity: O(K) | Space Complexity: O(1)
#include <vector>
#include <numeric>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxScore(vector<int>& cardPoints, int k) {
        int leftSum = 0, rightSum = 0;
        int n = cardPoints.size();

        // Step 1: Take all k cards from the left
        for (int i = 0; i < k; i++) {
            leftSum += cardPoints[i];
        }

        int maxScore = leftSum;
        int rightIndex = n - 1;

        // Step 2: Swap one left card for one right card
        for (int i = k - 1; i >= 0; i--) {
            leftSum -= cardPoints[i];
            rightSum += cardPoints[rightIndex--];
            maxScore = max(maxScore, leftSum + rightSum);
        }

        return maxScore;
    }
};`,
  python: `# Python 3 Maximum Points You Can Obtain from Cards
class Solution:
    def maxScore(self, cardPoints: list[int], k: int) -> int:
        left_sum = sum(cardPoints[:k])
        max_score = left_sum
        right_sum = 0
        n = len(cardPoints)

        for i in range(k - 1, -1, -1):
            left_sum -= cardPoints[i]
            right_sum += cardPoints[n - (k - i)]
            max_score = max(max_score, left_sum + right_sum)

        return max_score`,
  java: `// Java Maximum Points You Can Obtain from Cards
class Solution {
    public int maxScore(int[] cardPoints, int k) {
        int leftSum = 0, rightSum = 0;
        int n = cardPoints.length;

        for (int i = 0; i < k; i++) {
            leftSum += cardPoints[i];
        }

        int maxScore = leftSum;
        int rightIdx = n - 1;

        for (int i = k - 1; i >= 0; i--) {
            leftSum -= cardPoints[i];
            rightSum += cardPoints[rightIdx--];
            maxScore = Math.max(maxScore, leftSum + rightSum);
        }

        return maxScore;
    }
}`,
  javascript: `// JavaScript Maximum Points You Can Obtain from Cards
var maxScore = function(cardPoints, k) {
    let leftSum = 0, rightSum = 0;
    const n = cardPoints.length;

    for (let i = 0; i < k; i++) {
        leftSum += cardPoints[i];
    }

    let maxScore = leftSum;
    let rightIdx = n - 1;

    for (let i = k - 1; i >= 0; i--) {
        leftSum -= cardPoints[i];
        rightSum += cardPoints[rightIdx--];
        maxScore = Math.max(maxScore, leftSum + rightSum);
    }

    return maxScore;
};`
};

export const steps = [
  {
    title: '1. Cards: [1, 2, 3, 4, 5, 6, 1], K = 3 Cards',
    phase: 'INITIAL',
    codeLine: 14,
    cards: [1, 2, 3, 4, 5, 6, 1],
    k: 3,
    leftCards: [0, 1, 2],
    rightCards: [],
    leftSum: 6,
    rightSum: 0,
    maxScore: 6,
    variables: { k: 3, leftSum: 6, rightSum: 0, score: 6 },
    explain: 'Start by taking all 3 cards from the left: cards[0...2] = [1, 2, 3]. Total = 6.',
    intuition: 'Baseline all-left choice.'
  },
  {
    title: '2. Drop left card 3, take right card 1: [1, 2] + [1] = 4 (max remains 6)',
    phase: 'SWAPPING',
    codeLine: 23,
    cards: [1, 2, 3, 4, 5, 6, 1],
    k: 3,
    leftCards: [0, 1],
    rightCards: [6],
    leftSum: 3,
    rightSum: 1,
    maxScore: 6,
    variables: { leftTaken: '[1, 2]', rightTaken: '[1]', total: 4, maxScore: 6 },
    explain: 'Drop card 3 from left, pick card 1 from right. Score = 3 + 1 = 4. Less than 6.',
    intuition: 'Evaluating combination: 2 from left, 1 from right.'
  },
  {
    title: '3. Drop left card 2, take right card 6: [1] + [6, 1] = 8 (New Max = 8!)',
    phase: 'SWAPPING',
    codeLine: 25,
    cards: [1, 2, 3, 4, 5, 6, 1],
    k: 3,
    leftCards: [0],
    rightCards: [5, 6],
    leftSum: 1,
    rightSum: 7,
    maxScore: 8,
    variables: { leftTaken: '[1]', rightTaken: '[6, 1]', total: 8, maxScore: 8 },
    explain: 'Drop card 2 from left, pick card 6 from right. Score = 1 + 7 = 8! Max updates to 8.',
    intuition: 'Better score found.'
  },
  {
    title: '4. Drop left card 1, take right card 5: [5, 6, 1] = 12 (Optimal Max = 12!)',
    phase: 'OPTIMAL_FOUND',
    codeLine: 25,
    cards: [1, 2, 3, 4, 5, 6, 1],
    k: 3,
    leftCards: [],
    rightCards: [4, 5, 6],
    leftSum: 0,
    rightSum: 12,
    maxScore: 12,
    variables: { leftTaken: '[]', rightTaken: '[5, 6, 1]', total: 12, maxScore: 12 },
    explain: 'All 3 cards taken from right side [5, 6, 1] = 12! Optimal maximum points reached.',
    intuition: 'Best partition discovered.'
  },
  {
    title: '5. Completed: Maximum Score = 12',
    phase: 'COMPLETED',
    codeLine: 28,
    cards: [1, 2, 3, 4, 5, 6, 1],
    k: 3,
    leftCards: [],
    rightCards: [4, 5, 6],
    leftSum: 0,
    rightSum: 12,
    maxScore: 12,
    variables: { maxScore: 12, timeComplexity: 'O(K)', spaceComplexity: 'O(1)' },
    explain: 'Scanning all K combinations took only O(K) steps. Maximum points = 12.',
    intuition: 'Sliding boundary complete.'
  }
];

export default function MaximumPointsYouCanObtainFromCardsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Left Sum = {step.leftSum}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-semibold">
          Right Sum = {step.rightSum}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Max Score = {step.maxScore}
        </span>
      </div>

      {/* Cards in Row */}
      <div className="w-full flex items-center justify-center gap-2 py-4 overflow-x-auto">
        {step.cards.map((val, idx) => {
          const isLeftPick = step.leftCards.includes(idx);
          const isRightPick = step.rightCards.includes(idx);

          let ringClass = 'border-[#272b3c] bg-[#12131b] text-slate-400 opacity-60';
          if (isLeftPick) {
            ringClass = 'border-amber-500 bg-amber-500/20 text-amber-300 font-bold ring-2 ring-amber-500/40 shadow-lg';
          } else if (isRightPick) {
            ringClass = 'border-indigo-500 bg-indigo-500/20 text-indigo-300 font-bold ring-2 ring-indigo-500/40 shadow-lg';
          }

          return (
            <div key={idx} className="flex flex-col items-center gap-1 min-w-[44px]">
              <div className={`w-11 h-14 rounded-xl border flex flex-col items-center justify-center font-mono text-sm transition-all ${ringClass}`}>
                <span className="text-base font-bold">{val}</span>
                <span className="text-[8px]">{isLeftPick ? 'L' : isRightPick ? 'R' : ''}</span>
              </div>
              <span className="text-[8px] font-mono text-[#5b6076]">[{idx}]</span>
            </div>
          );
        })}
      </div>

      {/* Status banner */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-xl p-3 flex items-center justify-between text-xs font-mono">
        <span className="text-[#8a8ea3]">Strategy: <strong className="text-emerald-400">Shift K boundary across ends</strong></span>
        <span className="text-amber-400 font-semibold">O(K) Time</span>
      </div>
    </div>
  );
}
