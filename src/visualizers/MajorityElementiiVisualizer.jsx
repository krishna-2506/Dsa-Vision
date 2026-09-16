import React from 'react';

export const meta = {
  title: 'Majority Element II (> N/3 times)',
  category: 'Arrays & Boyer-Moore Voting',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Finds all elements that appear strictly more than ⌊ N/3 ⌋ times using the extended Boyer-Moore Voting Algorithm with two candidates and two count registers.'
};

export const solutions = {
  cpp: `// C++ Extended Boyer-Moore Voting Algorithm (> N/3)
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> majorityElement(vector<int>& nums) {
        int n = nums.size();
        int cand1 = 0, cand2 = 0;
        int count1 = 0, count2 = 0;

        // Pass 1: Elect up to 2 candidates
        for (int x : nums) {
            if (count1 > 0 && x == cand1) {
                count1++;
            } else if (count2 > 0 && x == cand2) {
                count2++;
            } else if (count1 == 0) {
                cand1 = x;
                count1 = 1;
            } else if (count2 == 0) {
                cand2 = x;
                count2 = 1;
            } else {
                count1--;
                count2--;
            }
        }

        // Pass 2: Verify candidates exceed floor(n / 3)
        count1 = 0; count2 = 0;
        for (int x : nums) {
            if (x == cand1) count1++;
            else if (x == cand2) count2++;
        }

        vector<int> ans;
        if (count1 > n / 3) ans.push_back(cand1);
        if (count2 > n / 3) ans.push_back(cand2);
        return ans;
    }
};`,
  python: `# Python 3 Extended Boyer-Moore Voting (> N/3)
class Solution:
    def majorityElement(self, nums: list[int]) -> list[int]:
        n = len(nums)
        cand1, cand2 = None, None
        count1, count2 = 0, 0

        for x in nums:
            if count1 > 0 and x == cand1:
                count1 += 1
            elif count2 > 0 and x == cand2:
                count2 += 1
            elif count1 == 0:
                cand1 = x
                count1 = 1
            elif count2 == 0:
                cand2 = x
                count2 = 1
            else:
                count1 -= 1
                count2 -= 1

        # Verification pass
        c1 = nums.count(cand1)
        c2 = nums.count(cand2)

        ans = []
        if c1 > n // 3:
            ans.append(cand1)
        if cand2 != cand1 and c2 > n // 3:
            ans.append(cand2)
        return ans`,
  java: `// Java Extended Boyer-Moore Voting (> N/3)
import java.util.*;

class Solution {
    public List<Integer> majorityElement(int[] nums) {
        int n = nums.length;
        int cand1 = 0, cand2 = 0;
        int count1 = 0, count2 = 0;

        for (int x : nums) {
            if (count1 > 0 && x == cand1) {
                count1++;
            } else if (count2 > 0 && x == cand2) {
                count2++;
            } else if (count1 == 0) {
                cand1 = x;
                count1 = 1;
            } else if (count2 == 0) {
                cand2 = x;
                count2 = 1;
            } else {
                count1--;
                count2--;
            }
        }

        count1 = 0; count2 = 0;
        for (int x : nums) {
            if (x == cand1) count1++;
            else if (x == cand2) count2++;
        }

        List<Integer> ans = new ArrayList<>();
        if (count1 > n / 3) ans.add(cand1);
        if (count2 > n / 3 && cand2 != cand1) ans.add(cand2);
        return ans;
    }
}`,
  javascript: `// JavaScript Extended Boyer-Moore Voting (> N/3)
var majorityElement = function(nums) {
    const n = nums.length;
    let cand1 = null, cand2 = null;
    let count1 = 0, count2 = 0;

    for (const x of nums) {
        if (count1 > 0 && x === cand1) {
            count1++;
        } else if (count2 > 0 && x === cand2) {
            count2++;
        } else if (count1 === 0) {
            cand1 = x;
            count1 = 1;
        } else if (count2 === 0) {
            cand2 = x;
            count2 = 1;
        } else {
            count1--;
            count2--;
        }
    }

    let c1 = 0, c2 = 0;
    for (const x of nums) {
        if (x === cand1) c1++;
        else if (x === cand2) c2++;
    }

    const ans = [];
    if (c1 > Math.floor(n / 3)) ans.push(cand1);
    if (cand2 !== cand1 && c2 > Math.floor(n / 3)) ans.push(cand2);
    return ans;
};`
};

export const steps = [
  {
    title: '1. Initialize: N=8, Threshold = ⌊8/3⌋ = 2 elements',
    phase: 'INITIALIZATION',
    codeLine: 12,
    array: [1, 1, 1, 3, 3, 2, 2, 2],
    currentIdx: null,
    cand1: null,
    count1: 0,
    cand2: null,
    count2: 0,
    variables: { n: 8, threshold: '> 2 occurrences', cand1: 'None', cand2: 'None' },
    explain: 'At most 2 numbers can occur > N/3 times. We track 2 candidates (cand1, cand2) and their vote balances.',
    intuition: 'If 3 candidates had > N/3 times, their sum would exceed N, which is impossible!'
  },
  {
    title: '2. Process [1, 1, 1]: cand1 = 1, count1 = 3',
    phase: 'VOTE_CAND1',
    codeLine: 17,
    array: [1, 1, 1, 3, 3, 2, 2, 2],
    currentIdx: 2,
    cand1: 1,
    count1: 3,
    cand2: null,
    count2: 0,
    variables: { cand1: 1, count1: 3, cand2: 'None', count2: 0 },
    explain: 'First 3 elements are all 1s. cand1 is set to 1 with count1 = 3.',
    intuition: 'Candidate 1 secures strong early lead.'
  },
  {
    title: '3. Process [3, 3]: count2 was 0 -> cand2 = 3, count2 = 2',
    phase: 'VOTE_CAND2',
    codeLine: 24,
    array: [1, 1, 1, 3, 3, 2, 2, 2],
    currentIdx: 4,
    cand1: 1,
    count1: 3,
    cand2: 3,
    count2: 2,
    variables: { cand1: 1, count1: 3, cand2: 3, count2: 2 },
    explain: 'Next elements are 3s. Since count2 was 0, cand2 becomes 3 with count2 = 2.',
    intuition: 'Both candidate slots are now filled.'
  },
  {
    title: '4. Process [2, 2, 2]: Element 2 doesn\'t match either -> Cancels votes',
    phase: 'VOTE_CANCEL',
    codeLine: 27,
    array: [1, 1, 1, 3, 3, 2, 2, 2],
    currentIdx: 7,
    cand1: 1,
    count1: 1,
    cand2: 2,
    count2: 1,
    variables: { cand1: 1, count1: 1, cand2: 2, count2: 1 },
    explain: 'Encountering 2 decrements both counts. cand2\'s counter drops to 0 and becomes replaced by 2! Final candidates: 1 and 2.',
    intuition: 'Triplets of distinct numbers cancel out, leaving the true frequent elements surviving.'
  },
  {
    title: '5. Pass 2 Verification: Confirm occurrences > 2',
    phase: 'COMPLETED',
    codeLine: 34,
    array: [1, 1, 1, 3, 3, 2, 2, 2],
    currentIdx: null,
    cand1: 1,
    count1: 3,
    cand2: 2,
    count2: 3,
    variables: { 'actual count(1)': '3 > 2 (Valid)', 'actual count(2)': '3 > 2 (Valid)', result: '[1, 2]' },
    explain: 'Verification pass confirms 1 appears 3 times (> 2) and 2 appears 3 times (> 2). Return [1, 2]!',
    intuition: 'Linear two-pass time with strictly O(1) auxiliary variables.'
  }
];

export default function MajorityElementiiVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* 2 Candidate Registers */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#161824] border border-[#272b3c] text-xs font-mono">
          <span className="text-[#8a8ea3]">Candidate 1:</span>
          <span className="text-amber-300 font-bold text-base">{step.cand1 ?? 'None'}</span>
          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold ml-1">
            Votes: {step.count1}
          </span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#161824] border border-[#272b3c] text-xs font-mono">
          <span className="text-[#8a8ea3]">Candidate 2:</span>
          <span className="text-indigo-300 font-bold text-base">{step.cand2 ?? 'None'}</span>
          <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold ml-1">
            Votes: {step.count2}
          </span>
        </div>
      </div>

      {/* Array Display */}
      <div className="w-full flex items-center justify-center gap-2 py-4 overflow-x-auto">
        {step.array.map((val, idx) => {
          const isCurrent = step.currentIdx === idx;
          const isCand1 = step.cand1 === val;
          const isCand2 = step.cand2 === val;

          let style = 'bg-[#181a24] text-white border-[#2b2e40]';
          if (step.phase === 'COMPLETED' && (isCand1 || isCand2)) {
            style = 'bg-emerald-500/25 text-emerald-300 border-emerald-400 scale-105 shadow-md shadow-emerald-500/20';
          } else if (isCurrent) {
            style = 'bg-amber-500/25 text-amber-300 border-amber-400 scale-105 shadow-md shadow-amber-500/20';
          } else if (isCand1) {
            style = 'bg-amber-500/15 text-amber-200 border-amber-500/30';
          } else if (isCand2) {
            style = 'bg-indigo-500/15 text-indigo-200 border-indigo-500/30';
          }

          return (
            <div key={idx} className="flex flex-col items-center gap-1.5 min-w-[46px]">
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center font-mono text-base font-bold transition-all duration-300 ${style}`}>
                {val}
              </div>
              <span className="text-[9px] font-mono text-[#5b6076]">[{idx}]</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
