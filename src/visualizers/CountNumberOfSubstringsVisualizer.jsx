import React from 'react';

export const meta = {
  title: 'Count Number of Substrings with Exactly K Distinct Characters',
  category: 'Strings',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Counts the number of substrings containing exactly K distinct characters using the exact(K) = atMost(K) - atMost(K - 1) sliding window technique.'
};

export const solutions = {
  cpp: `// C++ Count Substrings with Exactly K Distinct Characters
// Time: O(N) | Space: O(1)
#include <string>
#include <vector>
using namespace std;

class Solution {
    long long atMostK(const string& s, int k) {
        if (k < 0) return 0;
        vector<int> freq(26, 0);
        int distinct = 0, left = 0;
        long long count = 0;

        for (int right = 0; right < s.size(); right++) {
            if (freq[s[right] - 'a'] == 0) distinct++;
            freq[s[right] - 'a']++;

            while (distinct > k) {
                freq[s[left] - 'a']--;
                if (freq[s[left] - 'a'] == 0) distinct--;
                left++;
            }

            count += (right - left + 1);
        }
        return count;
    }
public:
    long long substrCount(string s, int k) {
        return atMostK(s, k) - atMostK(s, k - 1);
    }
};`,
  python: `# Python 3 Count Substrings with Exactly K Distinct Characters
# Time: O(N) | Space: O(1)
class Solution:
    def substrCount(self, s: str, k: int) -> int:
        def at_most(k: int) -> int:
            if k <= 0:
                return 0
            freq = {}
            left = 0
            count = 0

            for right in range(len(s)):
                ch = s[right]
                freq[ch] = freq.get(ch, 0) + 1

                while len(freq) > k:
                    freq[s[left]] -= 1
                    if freq[s[left]] == 0:
                        del freq[s[left]]
                    left += 1

                count += (right - left + 1)
            return count

        return at_most(k) - at_most(k - 1)`,
  java: `// Java Count Substrings with Exactly K Distinct Characters
// Time: O(N) | Space: O(1)
class Solution {
    private long atMost(String s, int k) {
        if (k <= 0) return 0;
        int[] freq = new int[26];
        int distinct = 0, left = 0;
        long count = 0;

        for (int right = 0; right < s.length(); right++) {
            if (freq[s.charAt(right) - 'a'] == 0) distinct++;
            freq[s.charAt(right) - 'a']++;

            while (distinct > k) {
                freq[s.charAt(left) - 'a']--;
                if (freq[s.charAt(left) - 'a'] == 0) distinct--;
                left++;
            }

            count += (right - left + 1);
        }
        return count;
    }

    public long substrCount(String s, int k) {
        return atMost(s, k) - atMost(s, k - 1);
    }
}`,
  javascript: `// JavaScript Count Substrings with Exactly K Distinct Characters
// Time: O(N) | Space: O(1)
var substrCount = function(s, k) {
    function atMost(k) {
        if (k <= 0) return 0;
        const freq = new Map();
        let left = 0, count = 0;

        for (let right = 0; right < s.length; right++) {
            const ch = s[right];
            freq.set(ch, (freq.get(ch) || 0) + 1);

            while (freq.size > k) {
                const lCh = s[left];
                freq.set(lCh, freq.get(lCh) - 1);
                if (freq.get(lCh) === 0) freq.delete(lCh);
                left++;
            }

            count += (right - left + 1);
        }
        return count;
    }

    return atMost(k) - atMost(k - 1);
};`
};

export const steps = [
  {
    title: '1. Problem Setup: s = "abaaca", k = 1',
    phase: 'INIT',
    codeLine: 28,
    s: 'abaaca',
    k: 1,
    activeWindow: [0, 0],
    atMostK: null,
    atMostKMinus1: null,
    variables: { s: '"abaaca"', k: 1, strategy: 'exact(k) = atMost(k) - atMost(k-1)' },
    explain: 'Directly maintaining exactly K distinct characters in a sliding window is tricky because shrinking can violate lower bounds. Decomposing into atMost(K) - atMost(K-1) makes shrinking monotonic and easy.',
    intuition: 'Every window with <= K distinct characters includes all windows with <= K-1 distinct characters.'
  },
  {
    title: '2. Compute atMost(1): Substrings with <= 1 Distinct',
    phase: 'AT_MOST_1',
    codeLine: 24,
    s: 'abaaca',
    k: 1,
    activeWindow: [3, 4],
    atMostK: 7,
    atMostKMinus1: 0,
    variables: { 'Substrings with <= 1 char': '["a", "b", "a", "a", "aa", "c", "a"]', count: 7 },
    explain: 'Only single identical character runs qualify: "a", "b", "a", "a", "aa", "c", "a". atMost(1) = 7.',
    intuition: 'Substrings with at most 1 distinct character.'
  },
  {
    title: '3. Compute atMost(0): Substrings with 0 Distinct',
    phase: 'AT_MOST_0',
    codeLine: 11,
    s: 'abaaca',
    k: 1,
    activeWindow: [0, 0],
    atMostK: 7,
    atMostKMinus1: 0,
    variables: { 'atMost(0)': '0 (no non-empty substring has 0 chars)' },
    explain: 'A non-empty string cannot have 0 distinct characters, so atMost(0) = 0.',
    intuition: 'Base boundary condition.'
  },
  {
    title: '4. Result: exact(1) = 7 - 0 = 7 Substrings',
    phase: 'COMPLETED',
    codeLine: 29,
    s: 'abaaca',
    k: 1,
    activeWindow: [0, 5],
    exactCount: 7,
    variables: { 'atMost(1)': 7, 'atMost(0)': 0, 'exact(1)': '7 - 0 = 7' },
    explain: 'For s = "abaaca" and k = 1, there are exactly 7 substrings containing exactly 1 distinct character.',
    intuition: 'The exact(k) = atMost(k) - atMost(k - 1) identity works for any value of k in linear O(N) time.'
  }
];

export default function CountNumberOfSubstringsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Target K Distinct: {step.k}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Exact Substrings: {step.exactCount || 7}
        </span>
      </div>

      {/* String Stream */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          String Stream &amp; Window Decomposition
        </span>

        <div className="flex items-center justify-center gap-2 py-2 font-mono">
          {step.s.split('').map((ch, idx) => (
            <div
              key={idx}
              className="w-12 h-16 rounded-xl border border-[#272b3c] bg-[#161824] flex flex-col items-center justify-center text-slate-300"
            >
              <span className="text-[9px] text-[#8a8ea3]">[{idx}]</span>
              <span className="text-base font-bold text-amber-300 mt-0.5">{ch}</span>
            </div>
          ))}
        </div>

        {/* Math Formula Card */}
        <div className="w-full border-t border-[#272b3c] pt-3 flex flex-col items-center gap-1 font-mono text-xs">
          <span className="text-cyan-300">
            Formula:{' '}
            <span className="text-emerald-400 font-bold">
              exact({step.k}) = atMost({step.k}) - atMost({step.k - 1})
            </span>
          </span>
        </div>
      </div>

      {/* Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}
