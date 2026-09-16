import React from 'react';

export const meta = {
  title: 'Longest Happy Prefix (KMP LPS)',
  category: 'Strings',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Finds the longest prefix of a string that is also a suffix (excluding the string itself) in linear O(N) time using the KMP LPS (Longest Prefix Suffix) array.'
};

export const solutions = {
  cpp: `// C++ Longest Happy Prefix
// Time: O(N) | Space: O(N)
#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    string longestPrefix(string s) {
        int n = s.size();
        vector<int> lps(n, 0);
        int len = 0, i = 1;

        while (i < n) {
            if (s[i] == s[len]) {
                len++;
                lps[i] = len;
                i++;
            } else {
                if (len != 0) {
                    len = lps[len - 1];
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }

        int longestLen = lps[n - 1];
        return s.substr(0, longestLen);
    }
};`,
  python: `# Python 3 Longest Happy Prefix
# Time: O(N) | Space: O(N)
class Solution:
    def longestPrefix(self, s: str) -> str:
        n = len(s)
        lps = [0] * n
        length = 0
        i = 1

        while i < n:
            if s[i] == s[length]:
                length += 1
                lps[i] = length
                i += 1
            else:
                if length != 0:
                    length = lps[length - 1]
                else:
                    lps[i] = 0
                    i += 1

        longest_len = lps[n - 1]
        return s[:longest_len]`,
  java: `// Java Longest Happy Prefix
// Time: O(N) | Space: O(N)
class Solution {
    public String longestPrefix(String s) {
        int n = s.length();
        int[] lps = new int[n];
        int len = 0, i = 1;

        while (i < n) {
            if (s.charAt(i) == s.charAt(len)) {
                len++;
                lps[i] = len;
                i++;
            } else {
                if (len != 0) {
                    len = lps[len - 1];
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }

        int longestLen = lps[n - 1];
        return s.substring(0, longestLen);
    }
}`,
  javascript: `// JavaScript Longest Happy Prefix
// Time: O(N) | Space: O(N)
var longestPrefix = function(s) {
    const n = s.length;
    const lps = new Array(n).fill(0);
    let len = 0, i = 1;

    while (i < n) {
        if (s[i] === s[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }

    const longestLen = lps[n - 1];
    return s.slice(0, longestLen);
};`
};

export const steps = [
  {
    title: '1. Problem Definition: s = "level"',
    phase: 'INIT',
    codeLine: 12,
    s: 'level',
    lps: [0, 0, 0, 0, 0],
    matchLen: 0,
    prefix: '',
    suffix: '',
    variables: { s: '"level"', length: 5, target: 'Longest proper prefix == suffix' },
    explain: 'A "happy prefix" is a non-empty prefix that also equals a suffix of the string (excluding s itself).',
    intuition: 'This is precisely the value computed at the last cell lps[n - 1] of the KMP preprocessing array.'
  },
  {
    title: '2. Compute LPS Array: lps = [0, 0, 0, 0, 1]',
    phase: 'LPS_COMPUTE',
    codeLine: 26,
    s: 'level',
    lps: [0, 0, 0, 0, 1],
    matchLen: 1,
    prefix: 'l',
    suffix: 'l',
    variables: { 's[0] == s[4]': '"l" == "l"', 'lps[4]': 1, matchedChar: '"l"' },
    explain: 'Characters s[0] and s[4] are both "l". lps[4] becomes 1.',
    intuition: 'Prefix "l" matches suffix "l".'
  },
  {
    title: '3. Larger Example: s = "ababab" -> lps[5] = 4',
    phase: 'EXAMPLE_2',
    codeLine: 30,
    s: 'ababab',
    lps: [0, 0, 1, 2, 3, 4],
    matchLen: 4,
    prefix: 'abab',
    suffix: 'abab',
    variables: { string: '"ababab"', 'lps[5]': 4, happyPrefix: '"abab"' },
    explain: 'For "ababab", the prefix "abab" exactly matches the suffix "abab" (length 4).',
    intuition: 'lps[n-1] directly gives the maximum overlapping length.'
  },
  {
    title: '4. Extract Substring: s.slice(0, lps[n - 1])',
    phase: 'COMPLETED',
    codeLine: 31,
    s: 'ababab',
    lps: [0, 0, 1, 2, 3, 4],
    matchLen: 4,
    result: 'abab',
    variables: { result: '"abab"', length: 4 },
    explain: 'Final longest happy prefix is extracted as s.substring(0, 4) = "abab" in linear O(N) time!',
    intuition: 'Direct O(N) solution with no string hashing collisions.'
  }
];

export default function LongestHappyPrefixVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          String: "{step.s}"
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Happy Prefix: "{step.result || step.prefix || 'None'}"
        </span>
      </div>

      {/* Characters and LPS Card */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          String Alignment &amp; LPS Suffix Match
        </span>

        <div className="flex items-center justify-center gap-2.5 py-2 font-mono">
          {step.s.split('').map((ch, idx) => {
            const isMatch =
              step.matchLen > 0 &&
              (idx < step.matchLen || idx >= step.s.length - step.matchLen);

            return (
              <div
                key={idx}
                className={`w-12 h-18 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 ${
                  isMatch
                    ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-500/40 scale-105'
                    : 'border-[#272b3c] bg-[#161824] text-slate-400'
                }`}
              >
                <span className="text-[9px] text-[#8a8ea3]">[{idx}]</span>
                <span className="text-base font-bold text-amber-300 mt-0.5">{ch}</span>
                <span className="text-[10px] text-cyan-400 mt-1">
                  {step.lps[idx]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}
