import React from 'react';

export const meta = {
  title: 'Find Square Root of a Number (Integer Sqrt)',
  category: 'Binary Search',
  difficulty: 'Medium',
  timeComplexity: 'O(log N)',
  spaceComplexity: 'O(1)',
  description: 'Calculates the floor of the square root of an integer N in logarithmic O(log N) time using binary search over the search interval [1 ... N].'
};

export const solutions = {
  cpp: `// C++ Optimal Binary Search for Integer Square Root
// Time Complexity: O(log N) | Space Complexity: O(1)
class Solution {
public:
    long long floorSqrt(long long n) {
        long long low = 1, high = n;
        long long ans = 0;

        while (low <= high) {
            long long mid = low + (high - low) / 2;
            long long square = mid * mid;

            if (square <= n) {
                ans = mid;      // Valid square root, try larger
                low = mid + 1;
            } else {
                high = mid - 1; // Overshot, try smaller
            }
        }

        return ans;
    }
};`,
  python: `# Python 3 Optimal Binary Search for Sqrt
class Solution:
    def floorSqrt(self, n: int) -> int:
        low, high = 1, n
        ans = 0

        while low <= high:
            mid = (low + high) // 2
            val = mid * mid

            if val <= n:
                ans = mid
                low = mid + 1
            else:
                high = mid - 1

        return ans`,
  java: `// Java Optimal Binary Search for Sqrt
class Solution {
    public long floorSqrt(long n) {
        long low = 1, high = n;
        long ans = 0;

        while (low <= high) {
            long mid = low + (high - low) / 2;
            long val = mid * mid;

            if (val <= n) {
                ans = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return ans;
    }
}`,
  javascript: `// JavaScript Optimal Binary Search for Sqrt
var floorSqrt = function(n) {
    let low = 1, high = n;
    let ans = 0;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const val = mid * mid;

        if (val <= n) {
            ans = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return ans;
};`
};

export const steps = [
  {
    title: '1. Initialize Range: low = 1, high = 28, N = 28',
    phase: 'INITIAL',
    codeLine: 8,
    n: 28,
    low: 1,
    high: 28,
    mid: null,
    square: null,
    ans: 0,
    variables: { n: 28, low: 1, high: 28, ans: 0 },
    explain: 'Binary search range is [1 ... 28]. We want to find the largest integer mid such that mid * mid <= 28.',
    intuition: 'Since x^2 is strictly increasing for positive numbers, binary search finds the transition boundary.'
  },
  {
    title: '2. Try mid = 14: 14^2 = 196 > 28 -> Overshot! high = 13',
    phase: 'OVERSHOT',
    codeLine: 16,
    n: 28,
    low: 1,
    high: 13,
    mid: 14,
    square: 196,
    ans: 0,
    variables: { mid: 14, 'square = 14 * 14': 196, 'action': 'high = mid - 1 = 13' },
    explain: '196 is far greater than 28. Discard [14...28].',
    intuition: 'Values 14 and above are too large.'
  },
  {
    title: '3. Try mid = 7: 7^2 = 49 > 28 -> Overshot! high = 6',
    phase: 'OVERSHOT',
    codeLine: 16,
    n: 28,
    low: 1,
    high: 6,
    mid: 7,
    square: 49,
    ans: 0,
    variables: { mid: 7, 'square = 7 * 7': 49, 'action': 'high = mid - 1 = 6' },
    explain: '49 > 28. Discard [7...13].',
    intuition: 'Continue narrowing search domain.'
  },
  {
    title: '4. Try mid = 3: 3^2 = 9 <= 28 -> Valid! ans = 3, low = 4',
    phase: 'VALID_GUESS',
    codeLine: 13,
    n: 28,
    low: 4,
    high: 6,
    mid: 3,
    square: 9,
    ans: 3,
    variables: { mid: 3, 'square = 3 * 3': 9, ans: 3, 'action': 'low = mid + 1 = 4' },
    explain: '9 <= 28. 3 is a valid square root! Record ans = 3 and search higher to test larger candidates.',
    intuition: 'Candidate found, now check if a larger integer also qualifies.'
  },
  {
    title: '5. Try mid = 5: 5^2 = 25 <= 28 -> Valid! ans = 5, low = 6',
    phase: 'VALID_GUESS',
    codeLine: 13,
    n: 28,
    low: 6,
    high: 6,
    mid: 5,
    square: 25,
    ans: 5,
    variables: { mid: 5, 'square = 5 * 5': 25, ans: 5, 'action': 'low = mid + 1 = 6' },
    explain: '25 <= 28. 5 is valid! Update ans = 5. Search higher in range [6...6].',
    intuition: 'Closer to the true square root.'
  },
  {
    title: '6. Try mid = 6: 6^2 = 36 > 28 -> high = 5 -> Terminated!',
    phase: 'COMPLETED',
    codeLine: 16,
    n: 28,
    low: 6,
    high: 5,
    mid: 6,
    square: 36,
    ans: 5,
    variables: { mid: 6, 'square': 36, result: 5, timeComplexity: 'O(log N)' },
    explain: '36 > 28. high decrements to 5. Since low (6) > high (5), search completes. Final integer square root is 5 (since 25 <= 28 < 36)!',
    intuition: 'Floor(sqrt(28)) = 5.'
  }
];

export default function FindSquareRootOfANumberVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Target & Best Answer Header */}
      <div className="flex items-center gap-4">
        <div className="px-4 py-2 rounded-xl bg-[#161824] border border-[#272b3c] text-xs font-mono">
          <span className="text-[#8a8ea3]">Target Number N:</span>
          <span className="text-amber-300 font-bold text-base ml-2">{step.n}</span>
        </div>
        <div className="px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono">
          <span className="text-emerald-400 font-bold">Floor Sqrt (ans):</span>
          <span className="text-emerald-200 font-bold text-base ml-2">{step.ans}</span>
        </div>
      </div>

      {/* Mid & Mid^2 Evaluation Box */}
      <div className="flex items-center justify-center gap-6 p-5 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl">
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] font-mono text-[#8a8ea3]">mid guess</span>
          <div className="w-16 h-16 rounded-2xl bg-[#181a24] border border-[#2b2e40] flex items-center justify-center font-mono text-2xl font-bold text-blue-300">
            {step.mid ?? '-'}
          </div>
        </div>

        <span className="text-lg font-mono text-[#555a72]">² =</span>

        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] font-mono text-[#8a8ea3]">mid × mid</span>
          <div className={`w-20 h-16 rounded-2xl border flex items-center justify-center font-mono text-xl font-bold transition-all duration-300 ${
            step.square !== null ? (
              step.square <= step.n ? 'bg-emerald-500/25 text-emerald-300 border-emerald-400' : 'bg-rose-500/25 text-rose-300 border-rose-400'
            ) : 'bg-[#181a24] text-[#555a72] border-[#2b2e40]'
          }`}>
            {step.square ?? '-'}
          </div>
        </div>

        <div className="flex flex-col justify-center gap-1 text-xs font-mono">
          <span className="text-[#8a8ea3]">Status:</span>
          {step.square !== null ? (
            step.square <= step.n ? (
              <span className="text-emerald-400 font-bold">≤ {step.n} (Valid)</span>
            ) : (
              <span className="text-rose-400 font-bold">&gt; {step.n} (Too High)</span>
            )
          ) : (
            <span className="text-[#555a72]">Ready</span>
          )}
        </div>
      </div>

      {/* Search Domain Indicator */}
      <div className="flex items-center gap-4 text-xs font-mono text-[#8a8ea3]">
        <span>Current Range: [{step.low} ... {Math.max(step.low, step.high)}]</span>
      </div>
    </div>
  );
}
