import React from 'react';

export const meta = {
  title: 'KMP Algorithm & LPS Array Construction',
  category: 'Strings',
  difficulty: 'Hard',
  timeComplexity: 'O(N + M)',
  spaceComplexity: 'O(M)',
  description: 'Implements the Knuth-Morris-Pratt (KMP) pattern searching algorithm and step-by-step construction of the Longest Proper Prefix which is also Suffix (LPS) array in linear O(N + M) time.'
};

export const solutions = {
  cpp: `// C++ KMP Algorithm and LPS Array
// Time: O(N + M) | Space: O(M)
#include <string>
#include <vector>
using namespace std;

class Solution {
    vector<int> buildLPS(const string& pat) {
        int m = pat.size();
        vector<int> lps(m, 0);
        int len = 0, i = 1;

        while (i < m) {
            if (pat[i] == pat[len]) {
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
                matches.push_back(i - j); // Found match at index i - j
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
                    length = lps[length - 1]
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
    title: '1. Pattern: "aabaabaaa", Goal: Compute LPS Array',
    phase: 'INIT',
    codeLine: 11,
    pattern: 'aabaabaaa',
    lps: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    i: 1,
    len: 0,
    variables: { pattern: '"aabaabaaa"', length: 9, 'lps[0]': 'Always 0' },
    explain: 'LPS[k] denotes the length of the longest proper prefix of pat[0..k] that is also a suffix of pat[0..k].',
    intuition: 'Precomputing self-repeats allows the search pointer to jump directly upon mismatch.'
  },
  {
    title: '2. Match at i=1: pat[1] == pat[0] ("a" == "a") -> lps[1] = 1',
    phase: 'EXTEND',
    codeLine: 16,
    pattern: 'aabaabaaa',
    lps: [0, 1, 0, 0, 0, 0, 0, 0, 0],
    i: 2,
    len: 1,
    variables: { match: 'pat[1] == pat[0]', 'lps[1]': 1, nextLen: 1 },
    explain: '"aa" has prefix "a" and suffix "a". Hence lps[1] = 1, increment len to 1.',
    intuition: 'Matching characters increase prefix-suffix match length.'
  },
  {
    title: '3. Fill through "aabaaba": lps reaches 5',
    phase: 'BUILD_MID',
    codeLine: 16,
    pattern: 'aabaabaaa',
    lps: [0, 1, 0, 1, 2, 3, 4, 0, 0],
    i: 7,
    len: 4,
    variables: { 'Subpattern "aabaaba"': 'lps = 4 (prefix "aaba" == suffix "aaba")' },
    explain: 'At index 6 (pat="aabaaba"): prefix "aaba" matches suffix "aaba". lps[6] = 4.',
    intuition: 'Longer matching blocks build incrementally from earlier ones.'
  },
  {
    title: '4. Final LPS Array: [0, 1, 0, 1, 2, 3, 4, 5, 2]',
    phase: 'COMPLETED',
    codeLine: 26,
    pattern: 'aabaabaaa',
    lps: [0, 1, 0, 1, 2, 3, 4, 5, 2],
    i: 9,
    len: 2,
    variables: { finalLPS: '[0, 1, 0, 1, 2, 3, 4, 5, 2]' },
    explain: 'LPS array completed in O(M) time. Enables KMP to search text of length N in strictly O(N + M) total steps.',
    intuition: 'When a mismatch occurs at j, jump j to lps[j - 1] without ever backtracking text pointer i.'
  }
];

export default function KmpAlgorithmOrLpsArrayVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Pattern: "{step.pattern}"
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Complexity: O(N + M) Linear Search
        </span>
      </div>

      {/* Pattern and LPS Grid */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Pattern Characters &amp; LPS Alignment
        </span>

        <div className="flex flex-wrap items-center justify-center gap-2 py-2 font-mono">
          {step.pattern.split('').map((ch, idx) => {
            const isProcessed = idx < step.i;
            const lpsVal = step.lps[idx];

            return (
              <div
                key={idx}
                className={`w-12 h-20 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 ${
                  isProcessed
                    ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300'
                    : 'border-[#272b3c] bg-[#161824] text-slate-500'
                }`}
              >
                <span className="text-[9px] text-[#8a8ea3]">[{idx}]</span>
                <span className="text-base font-bold text-amber-300 mt-0.5">{ch}</span>
                <span className="text-xs font-bold text-cyan-400 mt-1">
                  {lpsVal}
                </span>
                <span className="text-[7px] text-[#8a8ea3]">lps</span>
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
