import React from 'react';

export const meta = {
  title: 'Longest Happy Prefix (KMP LPS)',
  category: 'Strings',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Finds the longest proper prefix of a string that is also a suffix in linear O(N) time using the KMP LPS (Longest Prefix Suffix) array with dual pointer backtracking.'
};

export const ideaMap = {
  problemArchetype: 'String Self-Symmetry & KMP LPS',
  trigger: 'Find the longest proper prefix of a string that is also a suffix (same substring at start and end without covering the entire string).',
  coreInsight: 'The definition of a "happy prefix" is identical to the KMP algorithm\'s Longest Prefix Suffix (LPS) value at index N-1! By computing the LPS array using two pointers (i, len), we resolve the longest boundary in linear O(N) time.',
  naiveApproach: {
    title: 'Brute Force Substring Comparison',
    time: 'O(N^2)',
    space: 'O(N) slice allocations',
    bottleneck: 'Comparing prefix s[0...k] with suffix s[N-k...N] for each length k from N-1 down to 1 takes quadratic string comparisons.'
  },
  optimalApproach: {
    title: 'KMP LPS Array Pointer Backtracking',
    time: 'O(N) linear scan',
    space: 'O(N) for LPS table',
    breakthrough: 'When characters match, increment length. On mismatch, backtrack len = lps[len - 1] without resetting the outer pointer i.'
  },
  flowNodes: [
    { id: '1', title: 'LPS Initialization', subtitle: 'Base prefix', description: 'Allocate lps array of size N initialized to 0. Pointer i starts at 1, length pointer len starts at 0.', tag: 'Init' },
    { id: '2', title: 'Character Match', subtitle: 'Extend match', description: 'If s[i] == s[len], the current prefix-suffix extends by 1. Set lps[i] = ++len and advance i.', tag: 'Extend' },
    { id: '3', title: 'Mismatch Fallback', subtitle: 'len = lps[len-1]', description: 'If s[i] != s[len] and len > 0, backtrack len to lps[len-1] to test smaller candidate prefix without advancing i.', tag: 'Backtrack' },
    { id: '4', title: 'Final Slice Extraction', subtitle: 's.substr(0, lps[n-1])', description: 'The answer is directly the prefix of length lps[N-1], representing the longest proper prefix matching the suffix.', tag: 'Extract' }
  ],
  pitfalls: [
    'Proper prefix restriction: The prefix must not be the whole string itself (length must be < N). The LPS definition natively guarantees this.',
    'Infinite loop on mismatch: Ensure you do NOT advance i when backtracking len = lps[len - 1].',
    'Off-by-one in substring slicing: Remember that lps[n-1] is a length, so slice(0, lps[n-1]) or substr(0, lps[n-1]) captures the exact characters.'
  ],
  interviewCheatSheet: '"Longest prefix that is also a suffix" is literally the textbook definition of KMP LPS[N-1]!'
};

export const solutions = {
  cpp: `// C++ Longest Happy Prefix using KMP LPS Array
// Time: O(N) | Space: O(N)
#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    string longestPrefix(string s) {
        int n = s.size();
        if (n <= 1) return "";

        vector<int> lps(n, 0);
        int len = 0; // length of previous longest prefix suffix
        int i = 1;

        while (i < n) {
            if (s[i] == s[len]) {
                len++;
                lps[i] = len;
                i++;
            } else {
                if (len != 0) {
                    // Backtrack to previous longest prefix
                    len = lps[len - 1];
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }

        int happyLen = lps[n - 1];
        return s.substr(0, happyLen);
    }
};`,
  python: `# Python 3 Longest Happy Prefix
# Time: O(N) | Space: O(N)
class Solution:
    def longestPrefix(self, s: str) -> str:
        n = len(s)
        if n <= 1:
            return ""

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

        happy_len = lps[-1]
        return s[:happy_len]`,
  java: `// Java Longest Happy Prefix
// Time: O(N) | Space: O(N)
class Solution {
    public String longestPrefix(String s) {
        int n = s.length();
        if (n <= 1) return "";

        int[] lps = new int[n];
        int len = 0;
        int i = 1;

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

        int happyLen = lps[n - 1];
        return s.substring(0, happyLen);
    }
}`,
  javascript: `// JavaScript Longest Happy Prefix
// Time: O(N) | Space: O(N)
var longestPrefix = function(s) {
    const n = s.length;
    if (n <= 1) return "";

    const lps = new Array(n).fill(0);
    let len = 0;
    let i = 1;

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

    const happyLen = lps[n - 1];
    return s.slice(0, happyLen);
};`
};

export const steps = [
  {
    title: '1. Problem Definition & String Setup: s = "abacaba"',
    phase: 'INIT',
    codeLine: 12,
    s: 'abacaba',
    i: 1,
    len: 0,
    lps: [0, 0, 0, 0, 0, 0, 0],
    action: 'Initialize LPS array of size 7 with lps[0] = 0',
    prefixIndices: [],
    suffixIndices: [],
    explain: 'A "happy prefix" is a non-empty proper prefix that is also a suffix of s (excluding s itself). We use the KMP LPS (Longest Prefix Suffix) array. lps[i] stores the length of the longest proper prefix of s[0..i] that is also a suffix.',
    intuition: 'The answer for the entire string is simply the last entry: s[0 .. lps[n - 1] - 1].'
  },
  {
    title: '2. Compare s[1] ("b") vs s[0] ("a")',
    phase: 'SCAN',
    codeLine: 27,
    s: 'abacaba',
    i: 1,
    len: 0,
    lps: [0, 0, 0, 0, 0, 0, 0],
    action: 'Mismatch! s[1] ("b") != s[0] ("a") with len = 0 -> lps[1] = 0, i = 2',
    prefixIndices: [0],
    suffixIndices: [1],
    explain: 'We compare s[i=1] ("b") with s[len=0] ("a"). They do not match! Since len == 0, there is no previous prefix to backtrack to. We assign lps[1] = 0 and increment i to 2.',
    intuition: 'Substring "ab" has no common prefix and suffix.'
  },
  {
    title: '3. Compare s[2] ("a") vs s[0] ("a") — Match Found!',
    phase: 'MATCH',
    codeLine: 18,
    s: 'abacaba',
    i: 2,
    len: 0,
    nextLen: 1,
    lps: [0, 0, 1, 0, 0, 0, 0],
    action: 'MATCH! s[2] ("a") == s[0] ("a") -> len becomes 1, lps[2] = 1, i = 3',
    prefixIndices: [0],
    suffixIndices: [2],
    explain: 's[i=2] ("a") matches s[len=0] ("a")! We increment len to 1 and record lps[2] = 1. Substring "aba" has common prefix/suffix "a". Increment i to 3.',
    intuition: 'Whenever characters match, we extend our running prefix suffix by 1.'
  },
  {
    title: '4. Compare s[3] ("c") vs s[1] ("b") — Mismatch with Backtracking!',
    phase: 'BACKTRACK',
    codeLine: 24,
    s: 'abacaba',
    i: 3,
    len: 1,
    nextLen: 0,
    lps: [0, 0, 1, 0, 0, 0, 0],
    action: 'MISMATCH! s[3] ("c") != s[1] ("b") -> Backtrack len = lps[0] = 0',
    prefixIndices: [1],
    suffixIndices: [3],
    explain: 'We compare s[3] ("c") with s[len=1] ("b"). They do NOT match! But len is 1 (not 0), so we DO NOT increment i yet. Instead, we backtrack: len = lps[len - 1] = lps[0] = 0.',
    intuition: 'Backtracking allows us to test if a shorter prefix still matches without restarting the outer pointer i.'
  },
  {
    title: '5. Retry s[3] ("c") vs s[0] ("a") after Backtracking',
    phase: 'SCAN',
    codeLine: 27,
    s: 'abacaba',
    i: 3,
    len: 0,
    lps: [0, 0, 1, 0, 0, 0, 0],
    action: 'Mismatch again: s[3] ("c") != s[0] ("a") -> lps[3] = 0, advance i to 4',
    prefixIndices: [0],
    suffixIndices: [3],
    explain: 'Now with len = 0, we compare s[3] ("c") with s[0] ("a"). Still a mismatch! Since len is now 0, we record lps[3] = 0 and finally advance i to 4.',
    intuition: 'Substring "abac" has no prefix that is also a suffix.'
  },
  {
    title: '6. Compare s[4] ("a") vs s[0] ("a") — New Match Begins!',
    phase: 'MATCH',
    codeLine: 18,
    s: 'abacaba',
    i: 4,
    len: 0,
    nextLen: 1,
    lps: [0, 0, 1, 0, 1, 0, 0],
    action: 'MATCH! s[4] ("a") == s[0] ("a") -> len becomes 1, lps[4] = 1, advance i to 5',
    prefixIndices: [0],
    suffixIndices: [4],
    explain: 's[i=4] ("a") matches s[len=0] ("a")! len increments to 1, lps[4] = 1. Substring "abaca" has common prefix/suffix "a". Advance i to 5.',
    intuition: 'The character "a" starts building a potential happy prefix candidate.'
  },
  {
    title: '7. Compare s[5] ("b") vs s[1] ("b") — Extending Match!',
    phase: 'MATCH',
    codeLine: 18,
    s: 'abacaba',
    i: 5,
    len: 1,
    nextLen: 2,
    lps: [0, 0, 1, 0, 1, 2, 0],
    action: 'MATCH! s[5] ("b") == s[1] ("b") -> len becomes 2, lps[5] = 2, advance i to 6',
    prefixIndices: [0, 1],
    suffixIndices: [4, 5],
    explain: 's[i=5] ("b") matches s[len=1] ("b")! The prefix "ab" matches suffix "ab". len becomes 2, and lps[5] = 2. Advance i to 6.',
    intuition: 'We now have a 2-character matched prefix and suffix: "ab".'
  },
  {
    title: '8. Compare s[6] ("a") vs s[2] ("a") — Full Extension!',
    phase: 'MATCH',
    codeLine: 18,
    s: 'abacaba',
    i: 6,
    len: 2,
    nextLen: 3,
    lps: [0, 0, 1, 0, 1, 2, 3],
    action: 'MATCH! s[6] ("a") == s[2] ("a") -> len becomes 3, lps[6] = 3, loop terminates',
    prefixIndices: [0, 1, 2],
    suffixIndices: [4, 5, 6],
    explain: 's[i=6] ("a") matches s[len=2] ("a")! The 3-character prefix "aba" matches the suffix "aba"! len becomes 3, lps[6] = 3. All characters processed!',
    intuition: 'lps[n - 1] = 3 confirms that "aba" is the longest prefix that is also a suffix.'
  },
  {
    title: '9. Inspect Final LPS Array & Result Length',
    phase: 'RESULT_INSPECT',
    codeLine: 32,
    s: 'abacaba',
    i: 7,
    len: 3,
    lps: [0, 0, 1, 0, 1, 2, 3],
    happyPrefix: 'aba',
    prefixIndices: [0, 1, 2],
    suffixIndices: [4, 5, 6],
    action: 'Final LPS computed! Longest Happy Prefix length = lps[6] = 3',
    explain: 'The final cell lps[n - 1] = lps[6] = 3 gives the exact length of the longest happy prefix. We slice s.substr(0, 3) to extract "aba".',
    intuition: 'KMP ensures we never backtrack the text pointer i, guaranteeing strict linear O(N) runtime.'
  },
  {
    title: '10. Verified Result: "aba" (Length 3)',
    phase: 'RESULT',
    codeLine: 33,
    s: 'abacaba',
    i: 7,
    len: 3,
    lps: [0, 0, 1, 0, 1, 2, 3],
    happyPrefix: 'aba',
    prefixIndices: [0, 1, 2],
    suffixIndices: [4, 5, 6],
    action: 'Prefix "aba" == Suffix "aba" -> Return "aba"',
    explain: 'Prefix s[0..2] ("aba") is identical to Suffix s[4..6] ("aba"). It is the longest such substring without being the entire string. Result = "aba". Time O(N), Space O(N).',
    intuition: 'Optimal O(N) solution replaces the naive O(N²) substring comparison with dynamic LPS matching.'
  }
];

export default function LongestHappyPrefixVisualizer({ currentStep = 0 }) {
  const stepIdx = Math.min(Math.max(0, currentStep), steps.length - 1);
  const step = steps[stepIdx] || steps[0];

  const chars = step.s.split('');

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-4 sm:p-6 space-y-6 select-none">
      {/* ── Top Header Metrics & Badges ── */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-md border font-semibold uppercase text-[10px] ${
            step.phase === 'MATCH'
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              : step.phase === 'BACKTRACK'
              ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
              : step.phase === 'RESULT' || step.phase === 'RESULT_INSPECT'
              ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
              : 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300'
          }`}>
            {step.phase}
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono">
          <span className="px-2.5 py-1 rounded-md bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk)]">
            i = <strong className="text-amber-400">{step.i}</strong> · len = <strong className="text-cyan-400">{step.len}</strong>
          </span>
          {step.happyPrefix && (
            <span className="px-2.5 py-1 rounded-md bg-purple-500/15 border border-purple-500/30 text-purple-300 font-bold">
              Prefix: "{step.happyPrefix}"
            </span>
          )}
        </div>
      </div>

      {/* ── Interactive String & Dual Pointer Stream ── */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-5 sm:p-6 space-y-5 shadow-lg">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--chalk-dim)] border-b border-[var(--line)] pb-3">
          <span className="uppercase tracking-wider">String Dual Pointer Matching</span>
          <span>Target: Proper Prefix == Suffix</span>
        </div>

        {/* The Character Stream */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 py-2 overflow-x-auto">
          {chars.map((ch, idx) => {
            const isI = step.i === idx;
            const isLen = step.len === idx && step.i !== idx;
            const isPrefix = step.prefixIndices.includes(idx);
            const isSuffix = step.suffixIndices.includes(idx);

            let cardStyle = 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk)]';

            if (isPrefix && isSuffix) {
              cardStyle = 'border-purple-500 bg-purple-500/25 text-purple-300 ring-2 ring-purple-400/50 shadow-md';
            } else if (isPrefix) {
              cardStyle = 'border-cyan-500/60 bg-cyan-500/20 text-cyan-300 font-bold shadow-xs';
            } else if (isSuffix) {
              cardStyle = 'border-amber-500/60 bg-amber-500/20 text-amber-300 font-bold shadow-xs';
            } else if (isI) {
              cardStyle = 'border-amber-400 bg-amber-500/20 text-amber-300 ring-1 ring-amber-400';
            }

            return (
              <div key={idx} className="flex flex-col items-center gap-1.5 min-w-[42px] sm:min-w-[48px]">
                {/* Pointer Indicators */}
                <div className="h-5 flex items-center justify-center text-[10px] font-mono font-bold">
                  {isI && isLen ? (
                    <span className="text-amber-400">i,len▼</span>
                  ) : isI ? (
                    <span className="text-amber-400 animate-bounce">i▼</span>
                  ) : isLen ? (
                    <span className="text-cyan-400">len▼</span>
                  ) : null}
                </div>

                {/* Character Box */}
                <div
                  className={`w-11 h-14 sm:w-13 sm:h-16 rounded-xl border flex flex-col items-center justify-center font-mono transition-all duration-200 relative ${cardStyle}`}
                >
                  <span className="text-xl sm:text-2xl font-bold">{ch}</span>

                  {/* Overlap badge */}
                  {isPrefix && (
                    <span className="text-[8px] font-mono uppercase bg-cyan-500 text-black px-1 rounded-xs absolute -bottom-2">
                      Pref
                    </span>
                  )}
                  {isSuffix && (
                    <span className="text-[8px] font-mono uppercase bg-amber-500 text-black px-1 rounded-xs absolute -top-2">
                      Suff
                    </span>
                  )}
                </div>

                {/* Index tag */}
                <span className="text-[10px] font-mono text-[var(--chalk-faint)]">
                  [{idx}]
                </span>
              </div>
            );
          })}
        </div>

        {/* Action description banner */}
        <div className="p-3 rounded-xl bg-[var(--board)] border border-[var(--line)] text-xs font-mono flex items-center justify-between gap-2">
          <span className="text-[var(--chalk-dim)]">Action:</span>
          <span className="font-semibold text-amber-300 truncate text-right">
            {step.action}
          </span>
        </div>
      </div>

      {/* ── KMP LPS Table Representation ── */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-xl p-5 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--chalk-dim)] border-b border-[var(--line)] pb-2">
          <span className="uppercase tracking-wider">KMP LPS (Longest Prefix Suffix) Array</span>
          <span className="text-emerald-400 font-bold">lps[i]</span>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center font-mono text-xs">
          {chars.map((ch, idx) => {
            const isCurrent = step.i === idx;
            const val = step.lps[idx];
            const isComputed = idx <= Math.min(step.i, step.lps.length - 1);

            return (
              <div
                key={idx}
                className={`p-2 rounded-lg border flex flex-col items-center justify-center transition-all ${
                  isCurrent
                    ? 'border-amber-400 bg-amber-500/20 text-amber-300 ring-2 ring-amber-400/40'
                    : val > 0
                    ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300 font-bold'
                    : 'border-[var(--line)] bg-[var(--board)] text-[var(--chalk-dim)]'
                }`}
              >
                <span className="text-[10px] text-[var(--chalk-faint)]">[{idx}] '{ch}'</span>
                <span className="text-base font-bold mt-1">
                  {isComputed ? val : '—'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Pedagogical Explanation & Intuition Callout ── */}
      <div className="w-full space-y-2">
        <div className="w-full p-4 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] text-xs font-sans text-[var(--chalk)] leading-relaxed shadow-sm">
          <strong className="text-amber-400 font-mono block mb-1">Step Walkthrough:</strong>
          {step.explain}
        </div>

        <div className="w-full p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-sans text-amber-300/90 leading-relaxed">
          <strong className="font-mono text-amber-400">💡 Algorithmic Intuition: </strong>
          {step.intuition}
        </div>
      </div>
    </div>
  );
}
