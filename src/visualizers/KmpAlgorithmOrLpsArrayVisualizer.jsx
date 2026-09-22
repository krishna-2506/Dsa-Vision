import React from 'react';

export const meta = {
  title: 'KMP Algorithm & LPS Array Construction',
  category: 'Strings',
  difficulty: 'Hard',
  timeComplexity: 'O(N + M)',
  spaceComplexity: 'O(M)',
  description: 'Implements Knuth-Morris-Pratt (KMP) linear string matching and Longest Proper Prefix which is also Suffix (LPS) array construction. Never backtracks the text pointer i by exploiting pattern self-symmetry.'
};

export const ideaMap = {
  problemArchetype: 'Deterministic String Pattern Matching (KMP)',
  trigger: 'Find occurrences of a pattern P inside text T in linear time without ever rewinding or backtracking the text pointer.',
  coreInsight: 'Precompute the LPS (Longest Proper Prefix which is also Suffix) array for the pattern. When a mismatch occurs after matching k characters, the text pointer i never rolls back; instead, the pattern pointer j jumps back to LPS[j - 1], preserving already-matched prefix info.',
  naiveApproach: {
    title: 'Naive Sliding Window Matcher',
    time: 'O(N * M)',
    space: 'O(1)',
    bottleneck: 'On mismatch, the text pointer is rewound to (i - j + 1) and pattern pointer resets to 0, repeating identical comparisons on repetitive text like "AAAAAAAAB".'
  },
  optimalApproach: {
    title: 'Knuth-Morris-Pratt (KMP)',
    time: 'O(N + M)',
    space: 'O(M) for pattern LPS',
    breakthrough: 'Text index i is strictly monotonically increasing. Mismatch drops pattern index j to lps[j-1], skipping redundant prefix verifications.'
  },
  flowNodes: [
    { id: '1', title: 'LPS Construction', subtitle: 'Pattern preprocessing', description: 'Build lps table for pattern P in O(M) using two pointers. lps[k] stores length of longest proper prefix equal to suffix in P[0...k].', tag: 'Precompute' },
    { id: '2', title: 'Linear Text Scan', subtitle: 'Monotonic i pointer', description: 'Iterate text pointer i from 0 to N-1. Increment both i and j while characters match: text[i] == pat[j].', tag: 'Scan' },
    { id: '3', title: 'Mismatch Redirection', subtitle: 'j = lps[j - 1]', description: 'If characters mismatch at index j > 0, fallback to j = lps[j - 1] while keeping text index i pinned in place.', tag: 'Shift' },
    { id: '4', title: 'Match Found Record', subtitle: 'Report index', description: 'When j == M, full pattern is matched at (i - M). Record match and transition j = lps[j - 1] to continue finding overlapping matches.', tag: 'Collect' }
  ],
  pitfalls: [
    'Index bounds when j reaches 0: If mismatch occurs at j == 0, we cannot do j = lps[j-1]; we simply increment text pointer i.',
    'Overlapping occurrences: After finding a match (j == M), do NOT reset j to 0; reset j to lps[j-1] to capture overlapping matches (e.g. "ABA" in "ABABA").',
    'LPS vs full string match: LPS is built on the PATTERN string, not the text string.'
  ],
  interviewCheatSheet: 'KMP guarantees text pointer i NEVER moves backwards. When mismatch happens at j, pattern snaps to LPS[j-1].'
};

export const solutions = {
  cpp: `// C++ KMP Algorithm and LPS Array Construction
// Time: O(N + M) | Space: O(M)
#include <string>
#include <vector>
using namespace std;

class Solution {
    vector<int> buildLPS(const string& pat) {
        int m = pat.size();
        vector<int> lps(m, 0);
        int len = 0; // length of previous longest prefix suffix
        int i = 1;

        while (i < m) {
            if (pat[i] == pat[len]) {
                len++;
                lps[i] = len;
                i++;
            } else {
                if (len != 0) {
                    len = lps[len - 1]; // Backtrack without advancing i
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }
        return lps;
    }

public:
    vector<int> search(string pat, string txt) {
        vector<int> lps = buildLPS(pat);
        vector<int> matches;
        int n = txt.size(), m = pat.size();
        int i = 0, j = 0;

        while (i < n) {
            if (txt[i] == pat[j]) {
                i++;
                j++;
            }
            if (j == m) {
                matches.push_back(i - j); // Full match found!
                j = lps[j - 1];
            } else if (i < n && txt[i] != pat[j]) {
                if (j != 0) j = lps[j - 1];
                else i++;
            }
        }
        return matches;
    }
};`,
  python: `# Python 3 KMP Algorithm & LPS Array
# Time: O(N + M) | Space: O(M)
class Solution:
    def build_lps(self, pat: str) -> list[int]:
        m = len(pat)
        lps = [0] * m
        length = 0
        i = 1

        while i < m:
            if pat[i] == pat[length]:
                length += 1
                lps[i] = length
                i += 1
            else:
                if length != 0:
                    length = lps[length - 1] # Backtrack
                else:
                    lps[i] = 0
                    i += 1
        return lps

    def search(self, pat: str, txt: str) -> list[int]:
        lps = self.build_lps(pat)
        matches = []
        i = j = 0
        n, m = len(txt), len(pat)

        while i < n:
            if txt[i] == pat[j]:
                i += 1
                j += 1
            if j == m:
                matches.append(i - j)
                j = lps[j - 1]
            elif i < n and txt[i] != pat[j]:
                if j != 0:
                    j = lps[j - 1]
                else:
                    i += 1
        return matches`,
  java: `// Java KMP Algorithm & LPS Array
// Time: O(N + M) | Space: O(M)
import java.util.ArrayList;
import java.util.List;

class Solution {
    private int[] buildLPS(String pat) {
        int m = pat.length();
        int[] lps = new int[m];
        int len = 0, i = 1;

        while (i < m) {
            if (pat.charAt(i) == pat.charAt(len)) {
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
        return lps;
    }

    public List<Integer> search(String pat, String txt) {
        int[] lps = buildLPS(pat);
        List<Integer> matches = new ArrayList<>();
        int i = 0, j = 0;
        int n = txt.length(), m = pat.length();

        while (i < n) {
            if (txt.charAt(i) == pat.charAt(j)) {
                i++;
                j++;
            }
            if (j == m) {
                matches.add(i - j);
                j = lps[j - 1];
            } else if (i < n && txt.charAt(i) != pat.charAt(j)) {
                if (j != 0) j = lps[j - 1];
                else i++;
            }
        }
        return matches;
    }
}`,
  javascript: `// JavaScript KMP Algorithm & LPS Array
// Time: O(N + M) | Space: O(M)
var kmpSearch = function(pat, txt) {
    const m = pat.length;
    const lps = new Array(m).fill(0);
    let len = 0, i = 1;

    while (i < m) {
        if (pat[i] === pat[len]) {
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

    const matches = [];
    let ti = 0, pj = 0;
    const n = txt.length;

    while (ti < n) {
        if (txt[ti] === pat[pj]) {
            ti++;
            pj++;
        }
        if (pj === m) {
            matches.push(ti - pj);
            pj = lps[pj - 1];
        } else if (ti < n && txt[ti] !== pat[pj]) {
            if (pj !== 0) pj = lps[pj - 1];
            else ti++;
        }
    }

    return matches;
};`
};

export const steps = [
  {
    title: '1. Pattern Setup & LPS Definition: pat = "ABABCABAB"',
    phase: 'INIT',
    codeLine: 12,
    pat: 'ABABCABAB',
    i: 1,
    len: 0,
    lps: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    action: 'lps[0] = 0 by definition (single char has no proper prefix)',
    prefixIdx: [],
    suffixIdx: [],
    explain: 'LPS stands for "Longest Proper Prefix which is also a Suffix". lps[k] represents the length of the longest matching prefix of pat[0..k] that is also a suffix of pat[0..k]. By definition, a single character cannot be a proper prefix of itself, so lps[0] = 0 always.',
    intuition: 'If we know where the pattern repeats itself, we never need to re-read text characters when a mismatch occurs.'
  },
  {
    title: '2. Compare pat[1] ("B") vs pat[len=0] ("A")',
    phase: 'SCAN',
    codeLine: 26,
    pat: 'ABABCABAB',
    i: 1,
    len: 0,
    lps: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    action: 'Mismatch! "B" != "A" and len == 0 -> lps[1] = 0, advance i to 2',
    prefixIdx: [0],
    suffixIdx: [1],
    explain: 'pat[i=1] ("B") does not match pat[len=0] ("A"). Since len == 0, we cannot fall back to any earlier prefix. We set lps[1] = 0 and advance i to 2.',
    intuition: 'Substring "AB" has zero matching prefix and suffix.'
  },
  {
    title: '3. Compare pat[2] ("A") vs pat[len=0] ("A") — Match!',
    phase: 'MATCH',
    codeLine: 17,
    pat: 'ABABCABAB',
    i: 2,
    len: 0,
    nextLen: 1,
    lps: [0, 0, 1, 0, 0, 0, 0, 0, 0],
    action: 'MATCH! "A" == "A" -> len becomes 1, lps[2] = 1, advance i to 3',
    prefixIdx: [0],
    suffixIdx: [2],
    explain: 'pat[i=2] ("A") matches pat[len=0] ("A")! We increment len from 0 to 1 and assign lps[2] = 1. Substring "ABA" has a 1-character prefix-suffix "A". Advance i to 3.',
    intuition: 'When characters match, len expands by 1 to record the growing identical prefix and suffix.'
  },
  {
    title: '4. Compare pat[3] ("B") vs pat[len=1] ("B") — Match!',
    phase: 'MATCH',
    codeLine: 17,
    pat: 'ABABCABAB',
    i: 3,
    len: 1,
    nextLen: 2,
    lps: [0, 0, 1, 2, 0, 0, 0, 0, 0],
    action: 'MATCH! "B" == "B" -> len becomes 2, lps[3] = 2, advance i to 4',
    prefixIdx: [0, 1],
    suffixIdx: [2, 3],
    explain: 'pat[i=3] ("B") matches pat[len=1] ("B")! Prefix "AB" matches suffix "AB". len increments to 2, so lps[3] = 2. Advance i to 4.',
    intuition: 'Substring "ABAB" has common prefix and suffix of length 2 ("AB").'
  },
  {
    title: '5. Compare pat[4] ("C") vs pat[len=2] ("A") — Backtracking Triggered!',
    phase: 'BACKTRACK',
    codeLine: 23,
    pat: 'ABABCABAB',
    i: 4,
    len: 2,
    nextLen: 0,
    lps: [0, 0, 1, 2, 0, 0, 0, 0, 0],
    action: 'MISMATCH! "C" != "A" with len=2 -> Backtrack len = lps[len-1] = lps[1] = 0',
    prefixIdx: [2],
    suffixIdx: [4],
    explain: 'pat[4] ("C") != pat[2] ("A")! Crucial KMP rule: because len != 0, we DO NOT increment i. Instead, we fallback: len = lps[len - 1] = lps[1] = 0. We test if a shorter prefix matches.',
    intuition: 'Rather than resetting all the way back to index 0 blindly, KMP queries its own LPS table to jump to the next viable candidate.'
  },
  {
    title: '6. Retry pat[4] ("C") vs pat[len=0] ("A") after Backtracking',
    phase: 'SCAN',
    codeLine: 26,
    pat: 'ABABCABAB',
    i: 4,
    len: 0,
    lps: [0, 0, 1, 2, 0, 0, 0, 0, 0],
    action: 'Mismatch again! "C" != "A" with len=0 -> lps[4] = 0, advance i to 5',
    prefixIdx: [0],
    suffixIdx: [4],
    explain: 'Now len is 0. pat[4] ("C") still does not match pat[0] ("A"). Since len is 0, no proper prefix matches. We record lps[4] = 0 and advance i to 5.',
    intuition: 'Character "C" broke all prefix continuity. LPS resets to 0.'
  },
  {
    title: '7. Compare pat[5] ("A") vs pat[len=0] ("A") — Match!',
    phase: 'MATCH',
    codeLine: 17,
    pat: 'ABABCABAB',
    i: 5,
    len: 0,
    nextLen: 1,
    lps: [0, 0, 1, 2, 0, 1, 0, 0, 0],
    action: 'MATCH! "A" == "A" -> len becomes 1, lps[5] = 1, advance i to 6',
    prefixIdx: [0],
    suffixIdx: [5],
    explain: 'pat[5] ("A") matches pat[0] ("A")! Prefix "A" matches suffix "A". len becomes 1, lps[5] = 1. Advance i to 6.',
    intuition: 'New prefix sequence begins matching after the character "C".'
  },
  {
    title: '8. Compare pat[6] ("B") vs pat[len=1] ("B") — Match!',
    phase: 'MATCH',
    codeLine: 17,
    pat: 'ABABCABAB',
    i: 6,
    len: 1,
    nextLen: 2,
    lps: [0, 0, 1, 2, 0, 1, 2, 0, 0],
    action: 'MATCH! "B" == "B" -> len becomes 2, lps[6] = 2, advance i to 7',
    prefixIdx: [0, 1],
    suffixIdx: [5, 6],
    explain: 'pat[6] ("B") matches pat[1] ("B")! Prefix "AB" matches suffix "AB". len becomes 2, lps[6] = 2. Advance i to 7.',
    intuition: 'Two-character prefix-suffix overlap restored.'
  },
  {
    title: '9. Compare pat[7] ("A") vs pat[len=2] ("A") — Match!',
    phase: 'MATCH',
    codeLine: 17,
    pat: 'ABABCABAB',
    i: 7,
    len: 2,
    nextLen: 3,
    lps: [0, 0, 1, 2, 0, 1, 2, 3, 0],
    action: 'MATCH! "A" == "A" -> len becomes 3, lps[7] = 3, advance i to 8',
    prefixIdx: [0, 1, 2],
    suffixIdx: [5, 6, 7],
    explain: 'pat[7] ("A") matches pat[2] ("A")! Prefix "ABA" matches suffix "ABA". len becomes 3, lps[7] = 3. Advance i to 8.',
    intuition: 'Three-character overlap confirmed: prefix "ABA" == suffix "ABA".'
  },
  {
    title: '10. Compare pat[8] ("B") vs pat[len=3] ("B") — Match!',
    phase: 'MATCH',
    codeLine: 17,
    pat: 'ABABCABAB',
    i: 8,
    len: 3,
    nextLen: 4,
    lps: [0, 0, 1, 2, 0, 1, 2, 3, 4],
    action: 'MATCH! "B" == "B" -> len becomes 4, lps[8] = 4, LPS construction complete!',
    prefixIdx: [0, 1, 2, 3],
    suffixIdx: [5, 6, 7, 8],
    explain: 'pat[8] ("B") matches pat[3] ("B")! The 4-character prefix "ABAB" matches the suffix "ABAB"! len becomes 4, lps[8] = 4. All characters processed!',
    intuition: 'Final LPS table completely built in linear O(M) time.'
  },
  {
    title: '11. KMP Pattern Search in Action',
    phase: 'SEARCH',
    codeLine: 48,
    pat: 'ABABCABAB',
    txt: 'ABABDABABCABAB',
    txtMatchedRange: [5, 13],
    action: 'Text search uses LPS to skip redundant checks: Match found at index 5!',
    lps: [0, 0, 1, 2, 0, 1, 2, 3, 4],
    explain: 'When searching txt = "ABABDABABCABAB" for pat = "ABABCABAB": At index 4, "D" != "C". Instead of restarting the text at index 1, KMP looks up lps[3] = 2 and keeps searching! Full match found at index 5.',
    intuition: 'The text pointer i strictly moves forward from 0 to N. It NEVER moves backward!'
  },
  {
    title: '12. Optimal Complexity Proof',
    phase: 'COMPLETED',
    codeLine: 35,
    pat: 'ABABCABAB',
    lps: [0, 0, 1, 2, 0, 1, 2, 3, 4],
    action: 'KMP Guarantees O(N + M) Time Complexity and O(M) Auxiliary Space',
    explain: 'LPS construction takes O(M) time and O(M) space. Text search takes O(N) time with at most 2N total comparisons. Total Time = O(N + M), compared to naive search O(N * M).',
    intuition: 'Knuth, Morris, and Pratt achieved linear pattern matching by turning failure into forward progress.'
  }
];

export default function KmpAlgorithmOrLpsArrayVisualizer({ currentStep = 0 }) {
  const stepIdx = Math.min(Math.max(0, currentStep), steps.length - 1);
  const step = steps[stepIdx] || steps[0];

  const chars = step.pat.split('');

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
              : step.phase === 'SEARCH' || step.phase === 'COMPLETED'
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
        </div>
      </div>

      {/* ── Pattern Character Stream & Dual Pointer Display ── */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-5 sm:p-6 space-y-5 shadow-lg">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--chalk-dim)] border-b border-[var(--line)] pb-3">
          <span className="uppercase tracking-wider">Pattern Self-Symmetry Stream</span>
          <span>M = {chars.length}</span>
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-3 py-2 overflow-x-auto">
          {chars.map((ch, idx) => {
            const isI = step.i === idx;
            const isLen = step.len === idx && step.i !== idx;
            const isPrefix = step.prefixIdx?.includes(idx);
            const isSuffix = step.suffixIdx?.includes(idx);

            let cardStyle = 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk)]';

            if (isPrefix && isSuffix) {
              cardStyle = 'border-purple-500 bg-purple-500/25 text-purple-300 ring-2 ring-purple-400/50 shadow-md';
            } else if (isPrefix) {
              cardStyle = 'border-cyan-500/60 bg-cyan-500/20 text-cyan-300 font-bold';
            } else if (isSuffix) {
              cardStyle = 'border-amber-500/60 bg-amber-500/20 text-amber-300 font-bold';
            } else if (isI) {
              cardStyle = 'border-amber-400 bg-amber-500/20 text-amber-300 ring-1 ring-amber-400';
            }

            return (
              <div key={idx} className="flex flex-col items-center gap-1.5 min-w-[40px] sm:min-w-[46px]">
                {/* Pointer indicator */}
                <div className="h-5 flex items-center justify-center text-[10px] font-mono font-bold">
                  {isI && isLen ? (
                    <span className="text-amber-400">i,len▼</span>
                  ) : isI ? (
                    <span className="text-amber-400 animate-bounce">i▼</span>
                  ) : isLen ? (
                    <span className="text-cyan-400">len▼</span>
                  ) : null}
                </div>

                {/* Character box */}
                <div
                  className={`w-10 h-13 sm:w-12 sm:h-15 rounded-xl border flex flex-col items-center justify-center font-mono transition-all duration-200 relative ${cardStyle}`}
                >
                  <span className="text-lg sm:text-xl font-bold">{ch}</span>
                  {isPrefix && (
                    <span className="text-[7px] font-mono uppercase bg-cyan-500 text-black px-1 rounded-xs absolute -bottom-2">
                      Pref
                    </span>
                  )}
                  {isSuffix && (
                    <span className="text-[7px] font-mono uppercase bg-amber-500 text-black px-1 rounded-xs absolute -top-2">
                      Suff
                    </span>
                  )}
                </div>

                {/* Index */}
                <span className="text-[10px] font-mono text-[var(--chalk-faint)]">
                  [{idx}]
                </span>
              </div>
            );
          })}
        </div>

        {/* Action description banner */}
        <div className="p-3 rounded-xl bg-[var(--board)] border border-[var(--line)] text-xs font-mono flex items-center justify-between gap-2">
          <span className="text-[var(--chalk-dim)]">Current Action:</span>
          <span className="font-semibold text-amber-300 truncate text-right">
            {step.action}
          </span>
        </div>
      </div>

      {/* ── KMP LPS Table Construction ── */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-xl p-5 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--chalk-dim)] border-b border-[var(--line)] pb-2">
          <span className="uppercase tracking-wider">LPS Array State</span>
          <span className="text-emerald-400 font-bold">lps[0 .. {chars.length - 1}]</span>
        </div>

        <div className="grid grid-cols-9 gap-1.5 text-center font-mono text-xs overflow-x-auto">
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
                <span className="text-[9px] text-[var(--chalk-faint)]">[{idx}] '{ch}'</span>
                <span className="text-base font-bold mt-1">
                  {isComputed ? val : '—'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Optional Text Search Demo Banner (Step 11) */}
      {step.txt && (
        <div className="w-full p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-xs font-mono space-y-2">
          <span className="text-indigo-400 font-bold block uppercase tracking-wider">
            KMP Search Demonstration on Text
          </span>
          <div className="flex items-center gap-1 overflow-x-auto py-1">
            <span className="text-[var(--chalk-dim)] mr-2">txt:</span>
            {step.txt.split('').map((c, idx) => {
              const inMatch = idx >= step.txtMatchedRange[0] && idx <= step.txtMatchedRange[1];
              return (
                <span
                  key={idx}
                  className={`w-6 h-7 rounded flex items-center justify-center border ${
                    inMatch
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                      : 'border-[var(--line)] bg-[var(--board)] text-[var(--chalk)]'
                  }`}
                >
                  {c}
                </span>
              );
            })}
          </div>
        </div>
      )}

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
