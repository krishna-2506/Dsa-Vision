import React from 'react';

export const meta = {
  title: 'Palindrome Partitioning II',
  category: 'Dynamic Programming',
  difficulty: 'Hard',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(N) or O(N^2) with precomputed table',
  description: 'Calculates the minimum cuts needed to partition a string such that every resulting substring is a palindrome. Uses Front Partition Dynamic Programming with optional 2D palindrome precomputation to achieve optimal O(N^2) time complexity.'
};

export const ideaMap = {
  problemArchetype: 'Front-Partition DP & Palindrome Verification',
  trigger: 'Asked for the minimum number of cuts/partitions to divide a string into valid palindromic substrings.',
  coreInsight: 'Use Front Partition DP: from starting index i, expand ending index j from i to N-1. If prefix s[i...j] is a valid palindrome, we can place a cut after j, yielding cost = 1 + solve(j + 1). We minimize this over all valid j. Since we counted the number of pieces, the minimum cuts is simply (pieces - 1).',
  naiveApproach: {
    title: 'Backtracking All 2^(N-1) Partitions',
    time: 'O(2^N * N)',
    space: 'O(N) recursion stack',
    bottleneck: 'Generating every binary cut assignment and running a two-pointer palindrome check on each segment.'
  },
  optimalApproach: {
    title: '1D Front Partition DP + Palindrome Table',
    time: 'O(N^2)',
    space: 'O(N) DP table',
    breakthrough: 'Each state dp[i] depends only on suffix states dp[j+1]. Precomputing palindrome truth table in O(N^2) makes each transition O(1).'
  },
  flowNodes: [
    { id: '1', title: 'State Definition', subtitle: 'solve(i) on suffix', description: 'dp[i] represents the minimum palindromic pieces needed to cover suffix s[i...N-1].', tag: 'State' },
    { id: '2', title: 'Palindrome Prefix Check', subtitle: 'isPal(i, j)', description: 'Scan j from i to N-1. If s[i...j] is a palindrome, it can form the first complete segment.', tag: 'Filter' },
    { id: '3', title: 'Transition Recurrence', subtitle: '1 + dp[j + 1]', description: 'If s[i...j] is a palindrome, cost is 1 piece + dp[j+1]. Take min over all valid j.', tag: 'Transition' },
    { id: '4', title: 'Cuts Conversion', subtitle: 'cuts = dp[0] - 1', description: 'K contiguous pieces require K - 1 cuts. Return dp[0] - 1 as the final answer.', tag: 'Result' }
  ],
  pitfalls: [
    'Forgetting the minus one: dp[0] counts total palindrome segments. To get CUTS, you must subtract 1 (e.g. 2 pieces = 1 cut).',
    'O(N^3) palindrome recomputation: Precompute boolean isPal[i][j] table or memoize to prevent O(N) palindrome checks inside the loop.',
    'Whole string already palindrome: If the entire string is a palindrome, 0 cuts are needed. Handled naturally since dp[0] = 1 piece -> 0 cuts.'
  ],
  interviewCheatSheet: 'Front partition: for each j >= i where s[i..j] is palindrome, transition dp[i] = min(1 + dp[j+1]). Answer is dp[0] - 1.'
};

export const solutions = {
  cpp: `// C++ Palindrome Partitioning II
// Time: O(N^2) | Space: O(N)
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
    bool isPalindrome(int i, int j, const string& s) {
        while (i < j) {
            if (s[i++] != s[j--]) return false;
        }
        return true;
    }

    int solve(int i, int n, const string& s, vector<int>& dp) {
        if (i == n) return 0;
        if (dp[i] != -1) return dp[i];

        int minPieces = 1e9;
        for (int j = i; j < n; j++) {
            if (isPalindrome(i, j, s)) {
                int pieces = 1 + solve(j + 1, n, s, dp);
                minPieces = min(minPieces, pieces);
            }
        }
        return dp[i] = minPieces;
    }
public:
    int minCut(string s) {
        int n = s.size();
        vector<int> dp(n, -1);
        return solve(0, n, s, dp) - 1;
    }
};`,
  python: `# Python 3 Palindrome Partitioning II
# Time: O(N^2) | Space: O(N)
class Solution:
    def minCut(self, s: str) -> int:
        n = len(s)
        dp = [-1] * n

        def is_palindrome(i: int, j: int) -> bool:
            while i < j:
                if s[i] != s[j]:
                    return False
                i += 1
                j -= 1
            return True

        def solve(i: int) -> int:
            if i == n:
                return 0
            if dp[i] != -1:
                return dp[i]

            min_pieces = float('inf')
            for j in range(i, n):
                if is_palindrome(i, j):
                    pieces = 1 + solve(j + 1)
                    min_pieces = min(min_pieces, pieces)

            dp[i] = min_pieces
            return dp[i]

        return solve(0) - 1`,
  java: `// Java Palindrome Partitioning II
// Time: O(N^2) | Space: O(N)
import java.util.Arrays;

class Solution {
    private boolean isPalindrome(int i, int j, String s) {
        while (i < j) {
            if (s.charAt(i++) != s.charAt(j--)) return false;
        }
        return true;
    }

    private int solve(int i, int n, String s, int[] dp) {
        if (i == n) return 0;
        if (dp[i] != -1) return dp[i];

        int minPieces = Integer.MAX_VALUE;
        for (int j = i; j < n; j++) {
            if (isPalindrome(i, j, s)) {
                int pieces = 1 + solve(j + 1, n, s, dp);
                minPieces = Math.min(minPieces, pieces);
            }
        }
        return dp[i] = minPieces;
    }

    public int minCut(String s) {
        int n = s.length();
        int[] dp = new int[n];
        Arrays.fill(dp, -1);
        return solve(0, n, s, dp) - 1;
    }
}`,
  javascript: `// JavaScript Palindrome Partitioning II
// Time: O(N^2) | Space: O(N)
var minCut = function(s) {
    const n = s.length;
    const dp = new Array(n).fill(-1);

    function isPal(i, j) {
        while (i < j) {
            if (s[i++] !== s[j--]) return false;
        }
        return true;
    }

    function solve(i) {
        if (i === n) return 0;
        if (dp[i] !== -1) return dp[i];

        let minPieces = Infinity;
        for (let j = i; j < n; j++) {
            if (isPal(i, j)) {
                const pieces = 1 + solve(j + 1);
                minPieces = Math.min(minPieces, pieces);
            }
        }
        return dp[i] = minPieces;
    }

    return solve(0) - 1;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: s = "aabcb"',
    phase: 'SETUP',
    codeLine: 28,
    s: 'aabcb',
    activeI: 0,
    activeJ: null,
    isPalResult: null,
    partitions: [],
    cutsCount: 0,
    action: 'Target string s = "aabcb". Find minimum cuts so every substring is a palindrome.',
    explain: 'Starting at index i = 0. We iterate end index j from i to n-1. If s[i...j] is a palindrome, we can partition after j and recursively solve the remainder.',
    intuition: 'Counting total palindromic substrings (pieces) lets us compute cuts = pieces - 1.'
  },
  {
    title: '2. Index 0, Test j = 0: "a" is Palindrome',
    phase: 'TEST_PALINDROME',
    codeLine: 34,
    s: 'aabcb',
    activeI: 0,
    activeJ: 0,
    isPalResult: true,
    partitions: [[0, 0]],
    cutsCount: 1,
    action: 's[0..0] = "a" is a 1-character palindrome. Cut created: "a" | "abcb".',
    explain: 'Every single character is trivially a palindrome. Cutting after index 0 isolates "a". Remaining suffix to evaluate is "abcb" starting at index 1.',
    intuition: 'Valid partition choice, but might force too many cuts later.'
  },
  {
    title: '3. Index 0, Test j = 1: "aa" is Palindrome!',
    phase: 'TEST_PALINDROME',
    codeLine: 34,
    s: 'aabcb',
    activeI: 0,
    activeJ: 1,
    isPalResult: true,
    partitions: [[0, 1]],
    cutsCount: 1,
    action: 's[0..1] = "aa" is an even palindrome ("a" == "a"). Cut created: "aa" | "bcb".',
    explain: 'Both characters match: "a" == "a"! This gives a 2-character palindrome "aa". Remaining suffix is "bcb" starting at index 2.',
    intuition: 'Grouped two characters into one palindrome, saving a potential cut!'
  },
  {
    title: '4. Index 0, Test j = 2: "aab" Mismatch',
    phase: 'PAL_MISMATCH',
    codeLine: 34,
    s: 'aabcb',
    activeI: 0,
    activeJ: 2,
    isPalResult: false,
    partitions: [[0, 1]],
    cutsCount: 1,
    action: 's[0..2] = "aab". Characters s[0] ("a") != s[2] ("b"). Not a palindrome!',
    explain: 'Because "aab" is not a palindrome, we CANNOT make a cut here. This branch is pruned immediately.',
    intuition: 'Only valid palindromic prefixes are allowed to trigger recursive subproblems.'
  },
  {
    title: '5. Suffix "bcb", Test j = 2: "b"',
    phase: 'TEST_PALINDROME',
    codeLine: 34,
    s: 'aabcb',
    activeI: 2,
    activeJ: 2,
    isPalResult: true,
    partitions: [[0, 1], [2, 2]],
    cutsCount: 2,
    action: 'Evaluating suffix starting at i=2: s[2..2] = "b" is a palindrome. Cut: "aa" | "b" | "cb".',
    explain: 'Testing length-1 prefix "b" at index 2. It is a palindrome, leaving remaining suffix "cb" at index 3.',
    intuition: 'Isolating "b" leaves "cb", which will need another cut since "cb" is not a palindrome.'
  },
  {
    title: '6. Suffix "bcb", Test j = 3: "bc" Mismatch',
    phase: 'PAL_MISMATCH',
    codeLine: 34,
    s: 'aabcb',
    activeI: 2,
    activeJ: 3,
    isPalResult: false,
    partitions: [[0, 1], [2, 2]],
    cutsCount: 2,
    action: 's[2..3] = "bc". "b" != "c" -> Not a palindrome. Skip cut.',
    explain: '"bc" is not symmetric, so no cut can be made at index 3.',
    intuition: 'Pruning invalid choices keeps the state transitions compact.'
  },
  {
    title: '7. Suffix "bcb", Test j = 4: "bcb" is Palindrome!',
    phase: 'TEST_PALINDROME',
    codeLine: 34,
    s: 'aabcb',
    activeI: 2,
    activeJ: 4,
    isPalResult: true,
    partitions: [[0, 1], [2, 4]],
    cutsCount: 1,
    action: 's[2..4] = "bcb": s[2] ("b") == s[4] ("b"). 3-char palindrome found!',
    explain: 'Checking endpoints: s[2] == s[4] == "b". Inner character "c" matches itself. "bcb" is a complete 3-character palindrome! Suffix reaches end of string.',
    intuition: 'Whole remaining suffix "bcb" is a single palindrome!'
  },
  {
    title: '8. Base Case: Reached End of String (i == 5)',
    phase: 'BASE_CASE',
    codeLine: 29,
    s: 'aabcb',
    activeI: 5,
    activeJ: null,
    isPalResult: null,
    partitions: [[0, 1], [2, 4]],
    cutsCount: 1,
    action: 'i == 5 == n. Empty string requires 0 additional pieces. Return 0.',
    explain: 'Base case reached! Suffix at index 5 has length 0. It requires 0 pieces. The recursion unwinds.',
    intuition: '0 pieces needed for an empty string.'
  },
  {
    title: '9. Comparing Partition Schemes',
    phase: 'COMPARE_BRANCHES',
    codeLine: 36,
    s: 'aabcb',
    activeI: -1,
    activeJ: null,
    isPalResult: null,
    partitions: [[0, 1], [2, 4]],
    cutsCount: 1,
    action: 'Compare: ["aa", "bcb"] (2 pieces, 1 cut) vs ["a", "a", "b", "c", "b"] (5 pieces, 4 cuts).',
    explain: 'Scheme 1: "aa" | "bcb" -> 2 palindromic pieces, requiring 1 cut. Scheme 2: "a" | "a" | "bcb" -> 3 pieces, 2 cuts. Scheme 3: "a" | "a" | "b" | "c" | "b" -> 5 pieces, 4 cuts. Minimum cuts is clearly 1!',
    intuition: 'Larger palindromes naturally minimize the number of cuts.'
  },
  {
    title: '10. Optimal Cut Layout: "aa" | "bcb"',
    phase: 'OPTIMAL_RESULT',
    codeLine: 45,
    s: 'aabcb',
    activeI: -1,
    activeJ: null,
    isPalResult: null,
    partitions: [[0, 1], [2, 4]],
    cutsCount: 1,
    action: 'Optimal partitions: ["aa", "bcb"]. Total pieces = 2, Total Cuts = 2 - 1 = 1.',
    explain: 'By placing exactly ONE cut between index 1 and index 2 (between "a" and "b"), the string partitions into "aa" (palindrome) and "bcb" (palindrome).',
    intuition: 'dp[0] = 2 pieces. Answer = dp[0] - 1 = 1 cut.'
  },
  {
    title: '11. Algorithm Complete & Complexity Summary',
    phase: 'COMPLETED',
    codeLine: 45,
    s: 'aabcb',
    activeI: -1,
    activeJ: null,
    isPalResult: null,
    partitions: [[0, 1], [2, 4]],
    cutsCount: 1,
    action: 'Return 1. Time: O(N^2) | Space: O(N) DP table.',
    explain: 'With N states and up to N transitions per state (and O(1) palindrome queries via precomputed table), the total running time is strictly O(N^2).',
    intuition: 'Front partition DP avoids the O(N^3) complexity of standard Matrix Chain Multiplication.'
  }
];

export default function PalindromePartitioningIiVisualizer({ currentStep = 0 }) {
  const stepIdx = Math.min(Math.max(0, currentStep), steps.length - 1);
  const step = steps[stepIdx] || steps[0];

  const chars = step.s.split('');

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-4 sm:p-6 space-y-6 select-none">
      {/* Top Header Metrics & Algorithmic Phase Badge */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-md border font-semibold uppercase text-[10px] ${
            step.phase === 'TEST_PALINDROME'
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              : step.phase === 'PAL_MISMATCH'
              ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
              : step.phase === 'COMPLETED' || step.phase === 'OPTIMAL_RESULT'
              ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
              : 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300'
          }`}>
            {step.phase}
          </span>
          {step.activeJ !== null && (
            <span className="px-2.5 py-1 rounded-md bg-[var(--board-raised-2)] border border-[var(--line)] text-cyan-300">
              Candidate: s[{step.activeI}..{step.activeJ}] = "{step.s.slice(step.activeI, step.activeJ + 1)}"
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 font-mono">
          <span className="px-2.5 py-1 rounded-md bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk)]">
            Length: <strong className="text-cyan-400">{step.s.length}</strong>
          </span>
          <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
            Min Cuts: {step.cutsCount}
          </span>
        </div>
      </div>

      {/* String Stream & Partition Cut Visualization */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-5 sm:p-6 space-y-5 shadow-lg">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--chalk-dim)] border-b border-[var(--line)] pb-2.5">
          <span className="uppercase tracking-wider font-semibold">String with Cut Points</span>
          <span>s = "{step.s}"</span>
        </div>

        {/* Character Stream with Cuts */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 py-4 overflow-x-auto">
          {chars.map((ch, idx) => {
            const inActiveWindow = step.activeJ !== null && idx >= step.activeI && idx <= step.activeJ;
            const isCutAfter = step.partitions.some(([_, end]) => end === idx && end < step.s.length - 1);

            let cardStyle = 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk)]';

            if (inActiveWindow) {
              cardStyle = step.isPalResult === false
                ? 'border-rose-400 bg-rose-500/25 text-rose-200 ring-2 ring-rose-400/50'
                : 'border-emerald-400 bg-emerald-500/25 text-emerald-200 ring-2 ring-emerald-400/60 shadow-md font-bold scale-105';
            }

            return (
              <React.Fragment key={`char-${idx}`}>
                <div className="flex flex-col items-center gap-1.5 min-w-[38px] sm:min-w-[44px]">
                  {/* Pointer indicators */}
                  <div className="h-4 flex items-center justify-center text-[10px] font-mono font-bold">
                    {step.activeI === idx && step.activeJ === idx ? (
                      <span className="text-amber-400">i,j▼</span>
                    ) : step.activeI === idx ? (
                      <span className="text-cyan-400">i▼</span>
                    ) : step.activeJ === idx ? (
                      <span className="text-amber-400">j▼</span>
                    ) : null}
                  </div>

                  {/* Character Box */}
                  <div className={`w-10 h-13 sm:w-12 sm:h-15 rounded-xl border flex flex-col items-center justify-center font-mono transition-all duration-200 ${cardStyle}`}>
                    <span className="text-xl font-bold">{ch}</span>
                  </div>

                  <span className="text-[10px] font-mono text-[var(--chalk-faint)]">[{idx}]</span>
                </div>

                {/* Vertical Cut Separator Line */}
                {isCutAfter && (
                  <div className="flex flex-col items-center justify-center h-16 px-1">
                    <div className="h-10 w-0.5 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                    <span className="text-[9px] font-mono font-bold text-amber-400 mt-0.5">✂ cut</span>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Partition Summary Cards */}
        {step.partitions.length > 0 && (
          <div className="pt-2 border-t border-[var(--line)] flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-[var(--chalk-dim)]">Formed Palindromes:</span>
            {step.partitions.map(([sIdx, eIdx], pIdx) => {
              const sub = step.s.slice(sIdx, eIdx + 1);
              return (
                <span key={pIdx} className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
                  "{sub}" ({sub.length} chars)
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Action and Pedagogical Explanation Card */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-5 space-y-3 shadow-md">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
          <span>Action:</span>
          <span className="text-[var(--chalk)] font-normal">{step.action}</span>
        </div>
        <p className="text-xs sm:text-sm text-[var(--chalk-dim)] leading-relaxed font-sans">
          {step.explain}
        </p>
        <div className="pt-2 border-t border-[var(--line)] flex items-center gap-2 text-xs font-mono text-[var(--chalk-dim)]">
          <span className="text-indigo-400 font-bold">💡 Intuition:</span>
          <span>{step.intuition}</span>
        </div>
      </div>
    </div>
  );
}
