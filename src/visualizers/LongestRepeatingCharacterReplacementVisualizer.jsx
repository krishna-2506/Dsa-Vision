import React from 'react';

export const meta = {
  title: 'Longest Repeating Character Replacement',
  category: 'Sliding Window',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(26) = O(1)',
  description: 'Finds the length of the longest substring containing the same letter after at most K character replacements using a sliding window tracking peak character frequency.'
};

export const solutions = {
  cpp: `// C++ Longest Repeating Character Replacement
// Time Complexity: O(N) | Space Complexity: O(26) = O(1)
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int characterReplacement(string s, int k) {
        vector<int> freq(26, 0);
        int left = 0, right = 0;
        int maxFreq = 0;
        int maxLen = 0;
        int n = s.length();

        while (right < n) {
            freq[s[right] - 'A']++;
            maxFreq = max(maxFreq, freq[s[right] - 'A']);

            // If changes required (windowLen - maxFreq) exceed k, shrink
            if ((right - left + 1) - maxFreq > k) {
                freq[s[left] - 'A']--;
                left++;
            }

            maxLen = max(maxLen, right - left + 1);
            right++;
        }

        return maxLen;
    }
};`,
  python: `# Python 3 Longest Repeating Character Replacement
class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        counts = {}
        left = 0
        max_freq = 0
        max_len = 0

        for right, ch in enumerate(s):
            counts[ch] = counts.get(ch, 0) + 1
            max_freq = max(max_freq, counts[ch])

            if (right - left + 1) - max_freq > k:
                counts[s[left]] -= 1
                left += 1

            max_len = max(max_len, right - left + 1)

        return max_len`,
  java: `// Java Longest Repeating Character Replacement
class Solution {
    public int characterReplacement(String s, int k) {
        int[] freq = new int[26];
        int left = 0, maxFreq = 0, maxLen = 0;

        for (int right = 0; right < s.length(); right++) {
            freq[s.charAt(right) - 'A']++;
            maxFreq = Math.max(maxFreq, freq[s.charAt(right) - 'A']);

            if ((right - left + 1) - maxFreq > k) {
                freq[s.charAt(left) - 'A']--;
                left++;
            }

            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }
}`,
  javascript: `// JavaScript Longest Repeating Character Replacement
var characterReplacement = function(s, k) {
    const freq = new Array(26).fill(0);
    let left = 0, maxFreq = 0, maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        const idx = s.charCodeAt(right) - 65;
        freq[idx]++;
        maxFreq = Math.max(maxFreq, freq[idx]);

        if ((right - left + 1) - maxFreq > k) {
            freq[s.charCodeAt(left) - 65]--;
            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
};`
};

export const steps = [
  {
    title: '1. String: "AABABBA", Allowed Replacements K = 1',
    phase: 'INITIAL',
    codeLine: 13,
    s: 'AABABBA',
    k: 1,
    left: 0,
    right: 0,
    maxFreq: 1,
    maxLen: 1,
    variables: { left: 0, right: 0, maxFreq: 1, k: 1, maxLen: 1 },
    explain: 'Number of replacements needed in window is (windowLen - maxFreq). Must be <= K.',
    intuition: 'Keep the most frequent character unchanged, replace the remaining.'
  },
  {
    title: '2. R = 3: Window [0...3] is "AABA" -> maxFreq = 3 (\'A\'), replacements = 4 - 3 = 1 ≤ 1',
    phase: 'FEASIBLE',
    codeLine: 25,
    s: 'AABABBA',
    k: 1,
    left: 0,
    right: 3,
    maxFreq: 3,
    maxLen: 4,
    variables: { window: '"AABA"', windowLen: 4, maxFreq: 3, replacementsNeeded: 1, maxLen: 4 },
    explain: 'Inside "AABA", \'A\' appears 3 times. Changing 1 \'B\' to \'A\' makes all four characters \'A\'. Feasible! maxLen = 4.',
    intuition: 'Single replacement transforms window into "AAAA".'
  },
  {
    title: '3. R = 4 (char \'B\'): Window "AABAB" -> 5 - 3 = 2 > 1! Shrink L = 1',
    phase: 'SHRINK_WINDOW',
    codeLine: 20,
    s: 'AABABBA',
    k: 1,
    left: 1,
    right: 4,
    maxFreq: 3,
    maxLen: 4,
    variables: { windowLen: 5, maxFreq: 3, replacements: 2, action: 'Exceeds K=1, advance left to 1' },
    explain: '5 - 3 = 2 replacements needed, which exceeds K=1. Advance left pointer to index 1.',
    intuition: 'Too many distinct characters to fix.'
  },
  {
    title: '4. R = 6: Window [2...6] -> "BABBA" has 4 \'B\'s -> maxLen = 4',
    phase: 'EVALUATE',
    codeLine: 25,
    s: 'AABABBA',
    k: 1,
    left: 3,
    right: 6,
    maxFreq: 3,
    maxLen: 4,
    variables: { window: '"ABBA"', windowLen: 4, maxLen: 4 },
    explain: 'Window maintains max allowable length of 4.',
    intuition: 'Peak length stabilized.'
  },
  {
    title: '5. Completed: Longest Repeating Substring Length = 4',
    phase: 'COMPLETED',
    codeLine: 29,
    s: 'AABABBA',
    k: 1,
    left: 3,
    right: 6,
    maxFreq: 3,
    maxLen: 4,
    variables: { maxSubstringLength: 4, optimalForm: '"AAAA" or "BBBB"', timeComplexity: 'O(N)' },
    explain: 'Longest repeating character replacement has length 4.',
    intuition: 'O(N) single-pass complete.'
  }
];

export default function LongestRepeatingCharacterReplacementVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Peak Char Frequency: {step.maxFreq}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
          Max Flips K = {step.k}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Max Length = {step.maxLen}
        </span>
      </div>

      {/* Characters Stream */}
      <div className="w-full flex items-center justify-center gap-1.5 py-4 overflow-x-auto">
        {step.s.split('').map((ch, idx) => {
          const inWindow = idx >= step.left && idx <= step.right;

          let ringClass = 'border-[#272b3c] bg-[#12131b] text-slate-400';
          if (inWindow) {
            ringClass = 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300 font-bold';
          }

          return (
            <div key={idx} className="flex flex-col items-center gap-1 min-w-[36px]">
              <div className={`w-9 h-11 rounded-xl border flex items-center justify-center font-mono font-bold text-sm transition-all ${ringClass}`}>
                {ch}
              </div>
              <span className="text-[8px] font-mono text-[#5b6076]">[{idx}]</span>
            </div>
          );
        })}
      </div>

      {/* Formula notice */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-xl p-3 flex items-center justify-between text-xs font-mono">
        <span className="text-[#8a8ea3]">Condition: <strong className="text-amber-400">(windowLen - maxFreq) &le; K</strong></span>
        <span className="text-emerald-400 font-semibold">Current Window: {step.s.slice(step.left, step.right + 1)}</span>
      </div>
    </div>
  );
}
