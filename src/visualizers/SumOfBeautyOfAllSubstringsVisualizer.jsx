import React from 'react';

export const meta = {
  title: 'Sum of Beauty of All Substrings',
  category: 'Strings',
  difficulty: 'Medium',
  timeComplexity: 'O(N^2 * 26)',
  spaceComplexity: 'O(26) = O(1)',
  description: 'Calculates the sum of beauties across all substrings, where the beauty of a substring is defined as the difference between the maximum and minimum frequencies of non-zero occurring characters.'
};

export const solutions = {
  cpp: `// C++ Sum of Beauty of All Substrings
// Time: O(N^2 * 26) | Space: O(1)
#include <string>
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

class Solution {
public:
    int beautySum(string s) {
        int n = s.size();
        int totalBeauty = 0;

        for (int i = 0; i < n; i++) {
            vector<int> freq(26, 0);
            for (int j = i; j < n; j++) {
                freq[s[j] - 'a']++;

                int maxFreq = 0;
                int minFreq = INT_MAX;
                for (int c = 0; c < 26; c++) {
                    if (freq[c] > 0) {
                        maxFreq = max(maxFreq, freq[c]);
                        minFreq = min(minFreq, freq[c]);
                    }
                }

                totalBeauty += (maxFreq - minFreq);
            }
        }

        return totalBeauty;
    }
};`,
  python: `# Python 3 Sum of Beauty of All Substrings
# Time: O(N^2 * 26) | Space: O(1)
class Solution:
    def beautySum(self, s: str) -> int:
        n = len(s)
        total_beauty = 0

        for i in range(n):
            freq = [0] * 26
            for j in range(i, n):
                freq[ord(s[j]) - ord('a')] += 1

                counts = [c for c in freq if c > 0]
                total_beauty += max(counts) - min(counts)

        return total_beauty`,
  java: `// Java Sum of Beauty of All Substrings
// Time: O(N^2 * 26) | Space: O(1)
class Solution {
    public int beautySum(String s) {
        int n = s.length();
        int totalBeauty = 0;

        for (int i = 0; i < n; i++) {
            int[] freq = new int[26];
            for (int j = i; j < n; j++) {
                freq[s.charAt(j) - 'a']++;

                int maxFreq = 0;
                int minFreq = Integer.MAX_VALUE;
                for (int c = 0; c < 26; c++) {
                    if (freq[c] > 0) {
                        maxFreq = Math.max(maxFreq, freq[c]);
                        minFreq = Math.min(minFreq, freq[c]);
                    }
                }

                totalBeauty += (maxFreq - minFreq);
            }
        }

        return totalBeauty;
    }
}`,
  javascript: `// JavaScript Sum of Beauty of All Substrings
// Time: O(N^2 * 26) | Space: O(1)
var beautySum = function(s) {
    const n = s.length;
    let totalBeauty = 0;

    for (let i = 0; i < n; i++) {
        const freq = new Array(26).fill(0);
        for (let j = i; j < n; j++) {
            freq[s.charCodeAt(j) - 97]++;

            let maxFreq = 0;
            let minFreq = Infinity;
            for (let c = 0; c < 26; c++) {
                if (freq[c] > 0) {
                    maxFreq = Math.max(maxFreq, freq[c]);
                    minFreq = Math.min(minFreq, freq[c]);
                }
            }

            totalBeauty += (maxFreq - minFreq);
        }
    }

    return totalBeauty;
};`
};

export const steps = [
  {
    title: '1. Definition: Beauty = maxFreq - minFreq',
    phase: 'INIT',
    codeLine: 12,
    s: 'aabcb',
    activeSub: null,
    maxFreq: 0,
    minFreq: 0,
    beauty: 0,
    totalBeauty: 0,
    variables: { s: '"aabcb"', formula: 'beauty = max(freq) - min(freq > 0)' },
    explain: 'For any substring, find the most frequent and least frequent character count. If all characters have equal counts, beauty is 0.',
    intuition: 'Substrings with imbalanced character frequencies have high beauty.'
  },
  {
    title: '2. Substring "aab": max(a)=2, min(b)=1 -> Beauty = 1',
    phase: 'SUB_AAB',
    codeLine: 23,
    s: 'aabcb',
    activeSub: 'aab',
    subRange: [0, 2],
    maxFreq: 2,
    minFreq: 1,
    beauty: 1,
    totalBeauty: 1,
    variables: { substring: '"aab"', counts: '{a: 2, b: 1}', beauty: '2 - 1 = 1' },
    explain: 'In "aab", "a" appears twice and "b" appears once. Beauty = 2 - 1 = 1.',
    intuition: 'The dominance of "a" produces non-zero beauty.'
  },
  {
    title: '3. Substring "aabc": max(a)=2, min(b,c)=1 -> Beauty = 1',
    phase: 'SUB_AABC',
    codeLine: 23,
    s: 'aabcb',
    activeSub: 'aabc',
    subRange: [0, 3],
    maxFreq: 2,
    minFreq: 1,
    beauty: 1,
    totalBeauty: 2,
    variables: { substring: '"aabc"', counts: '{a: 2, b: 1, c: 1}', beauty: '2 - 1 = 1' },
    explain: 'Extending to "aabc": maxFreq is still 2 (a), minFreq is 1 (b and c). Beauty = 1.',
    intuition: 'Every character addition incrementally updates frequency metrics.'
  },
  {
    title: '4. Total Sum Across All Substrings: Total Beauty = 5',
    phase: 'COMPLETED',
    codeLine: 30,
    s: 'aabcb',
    activeSub: 'aabcb',
    subRange: [0, 4],
    maxFreq: 2,
    minFreq: 1,
    beauty: 1,
    totalBeauty: 5,
    variables: { totalBeautySum: 5, timeComplexity: 'O(N^2 * 26)' },
    explain: 'Summing beauties across all substrings of "aabcb" yields total beauty = 5.',
    intuition: 'Scanning pairs (i, j) with 26-element array handles any input length up to 500 efficiently.'
  }
];

export default function SumOfBeautyOfAllSubstringsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Current Beauty: {step.beauty}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Cumulative Total: {step.totalBeauty}
        </span>
      </div>

      {/* String Stream */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Substring Frequency Window
        </span>

        <div className="flex items-center justify-center gap-2 py-2 font-mono">
          {step.s.split('').map((ch, idx) => {
            const inRange =
              step.subRange &&
              idx >= step.subRange[0] &&
              idx <= step.subRange[1];

            return (
              <div
                key={idx}
                className={`w-12 h-16 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 ${
                  inRange
                    ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-500/40 scale-105'
                    : 'border-[#272b3c] bg-[#161824] text-slate-400'
                }`}
              >
                <span className="text-[9px] text-[#8a8ea3]">[{idx}]</span>
                <span className="text-base font-bold text-amber-300 mt-0.5">{ch}</span>
              </div>
            );
          })}
        </div>

        {step.activeSub && (
          <div className="w-full border-t border-[#272b3c] pt-3 flex flex-col items-center gap-1 font-mono text-xs">
            <span className="text-cyan-300">
              Active Substring: "{step.activeSub}" &rarr; maxFreq = {step.maxFreq}, minFreq = {step.minFreq}
            </span>
          </div>
        )}
      </div>

      {/* Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}
