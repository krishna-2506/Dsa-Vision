import React from 'react';

export const meta = {
  title: 'Wildcard Matching (DP 34)',
  category: 'Dynamic Programming',
  difficulty: 'Hard',
  timeComplexity: 'O(N * M)',
  spaceComplexity: 'O(M) Space-Optimized',
  description: 'Implements regular wildcard pattern matching with support for "?" (matches any single character) and "*" (matches any sequence of characters, including empty string).'
};

export const solutions = {
  cpp: `// C++ Wildcard Matching
// Time: O(N * M) | Space: O(M)
#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    bool isMatch(string s, string p) {
        int n = s.size(), m = p.size();
        vector<bool> prev(m + 1, false);
        prev[0] = true;

        // Base case: Leading stars match empty string
        for (int j = 1; j <= m; j++) {
            if (p[j - 1] == '*') prev[j] = prev[j - 1];
        }

        for (int i = 1; i <= n; i++) {
            vector<bool> cur(m + 1, false);
            for (int j = 1; j <= m; j++) {
                if (p[j - 1] == s[i - 1] || p[j - 1] == '?') {
                    cur[j] = prev[j - 1];
                } else if (p[j - 1] == '*') {
                    cur[j] = prev[j] || cur[j - 1];
                }
            }
            prev = cur;
        }

        return prev[m];
    }
};`,
  python: `# Python 3 Wildcard Matching
# Time: O(N * M) | Space: O(M)
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        n, m = len(s), len(p)
        prev = [False] * (m + 1)
        prev[0] = True

        for j in range(1, m + 1):
            if p[j - 1] == '*':
                prev[j] = prev[j - 1]

        for i in range(1, n + 1):
            cur = [False] * (m + 1)
            for j in range(1, m + 1):
                if p[j - 1] == s[i - 1] or p[j - 1] == '?':
                    cur[j] = prev[j - 1]
                elif p[j - 1] == '*':
                    cur[j] = prev[j] or cur[j - 1]
            prev = cur

        return prev[m]`,
  java: `// Java Wildcard Matching
// Time: O(N * M) | Space: O(M)
class Solution {
    public boolean isMatch(String s, String p) {
        int n = s.length(), m = p.length();
        boolean[] prev = new boolean[m + 1];
        prev[0] = true;

        for (int j = 1; j <= m; j++) {
            if (p.charAt(j - 1) == '*') prev[j] = prev[j - 1];
        }

        for (int i = 1; i <= n; i++) {
            boolean[] cur = new boolean[m + 1];
            for (int j = 1; j <= m; j++) {
                if (p.charAt(j - 1) == s.charAt(i - 1) || p.charAt(j - 1) == '?') {
                    cur[j] = prev[j - 1];
                } else if (p.charAt(j - 1) == '*') {
                    cur[j] = prev[j] || cur[j - 1];
                }
            }
            prev = cur;
        }

        return prev[m];
    }
}`,
  javascript: `// JavaScript Wildcard Matching
// Time: O(N * M) | Space: O(M)
var isMatch = function(s, p) {
    const n = s.length, m = p.length;
    let prev = new Array(m + 1).fill(false);
    prev[0] = true;

    for (let j = 1; j <= m; j++) {
        if (p[j - 1] === '*') prev[j] = prev[j - 1];
    }

    for (let i = 1; i <= n; i++) {
        const cur = new Array(m + 1).fill(false);
        for (let j = 1; j <= m; j++) {
            if (p[j - 1] === s[i - 1] || p[j - 1] === '?') {
                cur[j] = prev[j - 1];
            } else if (p[j - 1] === '*') {
                cur[j] = prev[j] || cur[j - 1];
            }
        }
        prev = cur;
    }

    return prev[m];
};`
};

export const steps = [
  {
    title: '1. Text s = "cb", Pattern p = "?a", Evaluate Initial State',
    phase: 'INITIAL',
    codeLine: 12,
    s: 'cb',
    p: '?a',
    matched: false,
    variables: { s: 'cb', p: '?a', wildcards: '? matches any char, * matches 0 or more' },
    explain: 'Testing whether pattern "?a" matches string "cb".',
    intuition: 'Character by character alignment.'
  },
  {
    title: '2. Index 0: p[0]=\'?\' matches s[0]=\'c\'',
    phase: 'MATCH_Q',
    codeLine: 20,
    s: 'cb',
    p: '?a',
    activeChar: 'c vs ?',
    matched: false,
    variables: { char1: 'c', charPattern: '?', result: 'MATCH (single character wildcard)' },
    explain: '\'?\' can match any single character, so it matches \'c\'. Move to index 1.',
    intuition: 'Valid step forward.'
  },
  {
    title: '3. Index 1 Mismatch: p[1]=\'a\' != s[1]=\'b\' -> FAILS',
    phase: 'MISMATCH',
    codeLine: 20,
    s: 'cb',
    p: '?a',
    activeChar: 'b vs a',
    matched: false,
    variables: { char1: 'b', charPattern: 'a', result: 'MISMATCH: \'a\' != \'b\'' },
    explain: 'Pattern requires letter \'a\', but string has \'b\'. Match fails. Result = false.',
    intuition: 'No wildcard exists to forgive this mismatch.'
  },
  {
    title: '4. Case 2 Example: s = "aa", p = "*" -> MATCHES TRUE',
    phase: 'COMPLETED',
    codeLine: 22,
    s: 'aa',
    p: '*',
    matched: true,
    variables: { s: 'aa', p: '*', starRule: '* matches any sequence including "aa"' },
    explain: 'Star wildcard "*" matches any string sequence of arbitrary length, matching "aa" perfectly with true!',
    intuition: 'DP transitions for \'*\' check cur[j-1] (empty) and prev[j] (1 or more).'
  }
];

export default function WildcardMatchingVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Text: "{step.s}" | Pattern: "{step.p}"
        </span>
        <span className={`px-3 py-1.5 rounded-xl border font-bold ${
          step.matched 
            ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300' 
            : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
        }`}>
          Pattern Match: {step.matched ? '✅ TRUE' : '❌ FALSE'}
        </span>
      </div>

      {/* Wildcard Rule Card */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Wildcard Matching Rule Engine
        </span>

        <div className="flex items-center justify-around w-full max-w-md pt-2">
          {/* Rule ? */}
          <div className="flex-1 bg-[#161824] border border-blue-500/40 rounded-2xl p-4 flex flex-col items-center gap-1.5">
            <span className="text-lg font-bold text-blue-400 font-mono">?</span>
            <span className="text-xs text-slate-300 font-semibold">Single Char</span>
            <span className="text-[10px] text-slate-500 text-center">Matches any 1 letter</span>
          </div>

          <div className="w-4" />

          {/* Rule * */}
          <div className="flex-1 bg-[#161824] border border-amber-500/40 rounded-2xl p-4 flex flex-col items-center gap-1.5">
            <span className="text-lg font-bold text-amber-400 font-mono">*</span>
            <span className="text-xs text-slate-300 font-semibold">Sequence</span>
            <span className="text-[10px] text-slate-500 text-center">Matches 0 or more chars</span>
          </div>
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}
