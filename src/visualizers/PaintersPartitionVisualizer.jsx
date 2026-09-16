import React from 'react';

export const meta = {
  title: "Painter's Partition Problem",
  category: 'Binary Search on Answers',
  difficulty: 'Medium',
  timeComplexity: 'O(N * log(sum - max))',
  spaceComplexity: 'O(1)',
  description: 'Finds the minimum time required for K painters to paint contiguous wooden boards by binary searching over the maximum allowable workload per painter.'
};

export const solutions = {
  cpp: `// C++ Painter's Partition using Binary Search
// Time Complexity: O(N * log(sum - max)) | Space Complexity: O(1)
#include <vector>
#include <numeric>
#include <algorithm>
using namespace std;

class Solution {
private:
    int countPainters(const vector<int>& boards, int timeLimit) {
        int painters = 1;
        long long currentLoad = 0;
        for (int b : boards) {
            if (currentLoad + b <= timeLimit) {
                currentLoad += b;
            } else {
                painters++;
                currentLoad = b;
            }
        }
        return painters;
    }

public:
    int findLargestMinDistance(vector<int>& boards, int k) {
        int low = *max_element(boards.begin(), boards.end());
        int high = accumulate(boards.begin(), boards.end(), 0);
        int ans = high;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            int paintersNeeded = countPainters(boards, mid);

            if (paintersNeeded <= k) {
                ans = mid;
                high = mid - 1; // Try minimizing the max time
            } else {
                low = mid + 1;  // Workload cap too low, increase
            }
        }
        return ans;
    }
};`,
  python: `# Python 3 Painter's Partition using Binary Search
class Solution:
    def findLargestMinDistance(self, boards: list[int], k: int) -> int:
        low = max(boards)
        high = sum(boards)
        ans = high

        def count_painters(limit: int) -> int:
            painters = 1
            load = 0
            for b in boards:
                if load + b <= limit:
                    load += b
                else:
                    painters += 1
                    load = b
            return painters

        while low <= high:
            mid = (low + high) // 2
            if count_painters(mid) <= k:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1

        return ans`,
  java: `// Java Painter's Partition using Binary Search
import java.util.Arrays;

class Solution {
    private static int countPainters(int[] boards, int timeLimit) {
        int painters = 1;
        int load = 0;
        for (int b : boards) {
            if (load + b <= timeLimit) {
                load += b;
            } else {
                painters++;
                load = b;
            }
        }
        return painters;
    }

    public static int findLargestMinDistance(int[] boards, int k) {
        int low = Arrays.stream(boards).max().getAsInt();
        int high = Arrays.stream(boards).sum();
        int ans = high;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (countPainters(boards, mid) <= k) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }
}`,
  javascript: `// JavaScript Painter's Partition using Binary Search
function findLargestMinDistance(boards, k) {
    let low = Math.max(...boards);
    let high = boards.reduce((a, b) => a + b, 0);
    let ans = high;

    function countPainters(limit) {
        let painters = 1;
        let load = 0;
        for (const b of boards) {
            if (load + b <= limit) {
                load += b;
            } else {
                painters++;
                load = b;
            }
        }
        return painters;
    }

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (countPainters(mid) <= k) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
}`
};

export const steps = [
  {
    title: '1. Boards: [10, 20, 30, 40], Painters K = 2',
    phase: 'INITIAL',
    codeLine: 26,
    boards: [10, 20, 30, 40],
    k: 2,
    low: 40,
    high: 100,
    mid: null,
    paintersNeeded: null,
    ans: 100,
    variables: { low: 'max = 40', high: 'sum = 100', k: 2 },
    explain: 'Each painter paints contiguous boards. Search range is [max(boards)=40 ... sum(boards)=100].',
    intuition: 'If max time per painter is too low, we will need more than K painters. Monotonic property.'
  },
  {
    title: '2. Try Max Workload = 70: Painters Needed = 2 ≤ 2 -> Feasible! ans = 70, high = 69',
    phase: 'TEST_CAPACITY',
    codeLine: 31,
    boards: [10, 20, 30, 40],
    k: 2,
    low: 40,
    high: 69,
    mid: 70,
    paintersNeeded: 2,
    ans: 70,
    variables: { mid: 70, painters: 2, limitK: 2, action: 'ans = 70, try smaller high = 69' },
    explain: 'At limit 70: Painter 1 takes [10, 20, 30] = 60; Painter 2 takes [40] = 40. Total 2 painters <= 2! Record ans = 70.',
    intuition: '70 units of time easily handles the job.'
  },
  {
    title: '3. Try Max Workload = 54: Painters Needed = 3 > 2 -> Infeasible! low = 55',
    phase: 'TOO_RESTRICTIVE',
    codeLine: 34,
    boards: [10, 20, 30, 40],
    k: 2,
    low: 55,
    high: 69,
    mid: 54,
    paintersNeeded: 3,
    ans: 70,
    variables: { mid: 54, painters: 3, limitK: 2, action: 'Workload too small, low = mid + 1 = 55' },
    explain: 'At limit 54: P1 takes [10, 20]=30; P2 takes [30]=30; P3 takes [40]=40. 3 painters required > 2! Limit is too tight.',
    intuition: 'Cannot finish with only 2 painters under 54 workload.'
  },
  {
    title: '4. Try Max Workload = 60: Painters Needed = 2 ≤ 2 -> Optimal ans = 60!',
    phase: 'OPTIMAL_FOUND',
    codeLine: 31,
    boards: [10, 20, 30, 40],
    k: 2,
    low: 60,
    high: 59,
    mid: 60,
    paintersNeeded: 2,
    ans: 60,
    variables: { mid: 60, painters: 2, minTime: 60 },
    explain: 'At limit 60: P1 takes [10, 20, 30]=60; P2 takes [40]=40. Exactly 2 painters! Search range exhausts (low > high). Optimal time = 60.',
    intuition: 'Boundary found at 60 units of time.'
  }
];

export default function PaintersPartitionVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Testing Time Limit = {step.mid ?? 'Init'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-[#161824] border border-[#272b3c] text-[#8a8ea3]">
          Painters: <strong className={step.paintersNeeded && step.paintersNeeded <= step.k ? 'text-emerald-300' : 'text-rose-400'}>
            {step.paintersNeeded ?? '-'} / {step.k} max
          </strong>
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Best Min Time = {step.ans}
        </span>
      </div>

      {/* Wooden Boards */}
      <div className="w-full flex items-center justify-center gap-3 py-3 overflow-x-auto">
        {step.boards.map((b, idx) => (
          <div key={idx} className="flex flex-col items-center gap-1 min-w-[54px]">
            <div className="w-14 h-16 rounded-xl bg-gradient-to-b from-amber-500/15 to-amber-950/30 border border-amber-500/30 text-amber-200 flex flex-col items-center justify-center font-mono font-bold text-sm shadow-md">
              <span className="text-[10px] text-amber-400">🪵</span>
              <span>{b}m</span>
            </div>
            <span className="text-[9px] font-mono text-[#5b6076]">b[{idx}]</span>
          </div>
        ))}
      </div>

      {/* Domain info */}
      <div className="flex items-center gap-4 text-xs font-mono text-[#8a8ea3]">
        <span>Domain: [{step.low} ... {Math.max(step.low, step.high)}]</span>
        <span>•</span>
        <span>Painters K = {step.k}</span>
      </div>
    </div>
  );
}
