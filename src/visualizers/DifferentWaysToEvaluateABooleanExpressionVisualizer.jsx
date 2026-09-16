import React from 'react';

export const meta = {
  title: 'Different Ways to Evaluate a Boolean Expression | DP-52',
  category: 'Dynamic Programming',
  difficulty: 'Hard',
  timeComplexity: 'O(N^3)',
  spaceComplexity: 'O(N^2)',
  description: 'Calculates the number of ways to parenthesize a boolean expression (containing T, F, &, |, ^) so that the entire expression evaluates to True using 3D Partition DP.'
};

export const solutions = {
  cpp: `// C++ Boolean Evaluation (Partition DP)
// Time: O(N^3) | Space: O(N^2)
#include <string>
#include <vector>
using namespace std;

class Solution {
    const int MOD = 1000000007;

    long long solve(int i, int j, bool isTrue, string& exp, vector<vector<vector<long long>>>& dp) {
        if (i > j) return 0;
        if (i == j) {
            if (isTrue) return exp[i] == 'T' ? 1 : 0;
            else return exp[i] == 'F' ? 1 : 0;
        }
        if (dp[i][j][isTrue] != -1) return dp[i][j][isTrue];

        long long ways = 0;
        for (int k = i + 1; k <= j - 1; k += 2) {
            long long lT = solve(i, k - 1, 1, exp, dp);
            long long lF = solve(i, k - 1, 0, exp, dp);
            long long rT = solve(k + 1, j, 1, exp, dp);
            long long rF = solve(k + 1, j, 0, exp, dp);

            char op = exp[k];
            if (op == '&') {
                if (isTrue) ways = (ways + (lT * rT)) % MOD;
                else ways = (ways + (lT * rF + lF * rT + lF * rF)) % MOD;
            } else if (op == '|') {
                if (isTrue) ways = (ways + (lT * rT + lT * rF + lF * rT)) % MOD;
                else ways = (ways + (lF * rF)) % MOD;
            } else if (op == '^') {
                if (isTrue) ways = (ways + (lT * rF + lF * rT)) % MOD;
                else ways = (ways + (lT * rT + lF * rF)) % MOD;
            }
        }
        return dp[i][j][isTrue] = ways;
    }
public:
    int countWays(int n, string exp) {
        vector<vector<vector<long long>>> dp(n, vector<vector<long long>>(n, vector<long long>(2, -1)));
        return solve(0, n - 1, 1, exp, dp);
    }
};`,
  python: `# Python 3 Boolean Evaluation
# Time: O(N^3) | Space: O(N^2)
class Solution:
    def countWays(self, exp: str) -> int:
        MOD = 1000000007
        n = len(exp)
        memo = {}

        def solve(i: int, j: int, is_true: bool) -> int:
            if i > j:
                return 0
            if i == j:
                if is_true:
                    return 1 if exp[i] == 'T' else 0
                return 1 if exp[i] == 'F' else 0

            state = (i, j, is_true)
            if state in memo:
                return memo[state]

            ways = 0
            for k in range(i + 1, j, 2):
                lT = solve(i, k - 1, True)
                lF = solve(i, k - 1, False)
                rT = solve(k + 1, j, True)
                rF = solve(k + 1, j, False)

                op = exp[k]
                if op == '&':
                    ways += (lT * rT) if is_true else (lT * rF + lF * rT + lF * rF)
                elif op == '|':
                    ways += (lT * rT + lT * rF + lF * rT) if is_true else (lF * rF)
                elif op == '^':
                    ways += (lT * rF + lF * rT) if is_true else (lT * rT + lF * rF)

            memo[state] = ways % MOD
            return memo[state]

        return solve(0, n - 1, True)`,
  java: `// Java Boolean Evaluation
// Time: O(N^3) | Space: O(N^2)
import java.util.Arrays;

class Solution {
    static final int MOD = 1000000007;

    private long solve(int i, int j, int isTrue, String exp, long[][][] dp) {
        if (i > j) return 0;
        if (i == j) {
            if (isTrue == 1) return exp.charAt(i) == 'T' ? 1 : 0;
            else return exp.charAt(i) == 'F' ? 1 : 0;
        }
        if (dp[i][j][isTrue] != -1) return dp[i][j][isTrue];

        long ways = 0;
        for (int k = i + 1; k <= j - 1; k += 2) {
            long lT = solve(i, k - 1, 1, exp, dp);
            long lF = solve(i, k - 1, 0, exp, dp);
            long rT = solve(k + 1, j, 1, exp, dp);
            long rF = solve(k + 1, j, 0, exp, dp);

            char op = exp.charAt(k);
            if (op == '&') {
                if (isTrue == 1) ways = (ways + (lT * rT)) % MOD;
                else ways = (ways + (lT * rF + lF * rT + lF * rF)) % MOD;
            } else if (op == '|') {
                if (isTrue == 1) ways = (ways + (lT * rT + lT * rF + lF * rT)) % MOD;
                else ways = (ways + (lF * rF)) % MOD;
            } else if (op == '^') {
                if (isTrue == 1) ways = (ways + (lT * rF + lF * rT)) % MOD;
                else ways = (ways + (lT * rT + lF * rF)) % MOD;
            }
        }
        return dp[i][j][isTrue] = ways;
    }

    public int countWays(int n, String exp) {
        long[][][] dp = new long[n][n][2];
        for (long[][] mat : dp)
            for (long[] row : mat)
                Arrays.fill(row, -1);
        return (int) solve(0, n - 1, 1, exp, dp);
    }
}`,
  javascript: `// JavaScript Boolean Evaluation
// Time: O(N^3) | Space: O(N^2)
var countWays = function(exp) {
    const MOD = 1000000007n;
    const n = exp.length;
    const memo = new Map();

    function solve(i, j, isTrue) {
        if (i > j) return 0n;
        if (i === j) {
            if (isTrue) return exp[i] === 'T' ? 1n : 0n;
            else return exp[i] === 'F' ? 1n : 0n;
        }
        const key = \`\${i},\${j},\${isTrue}\`;
        if (memo.has(key)) return memo.get(key);

        let ways = 0n;
        for (let k = i + 1; k < j; k += 2) {
            const lT = solve(i, k - 1, true);
            const lF = solve(i, k - 1, false);
            const rT = solve(k + 1, j, true);
            const rF = solve(k + 1, j, false);

            const op = exp[k];
            if (op === '&') {
                ways += isTrue ? (lT * rT) : (lT * rF + lF * rT + lF * rF);
            } else if (op === '|') {
                ways += isTrue ? (lT * rT + lT * rF + lF * rT) : (lF * rF);
            } else if (op === '^') {
                ways += isTrue ? (lT * rF + lF * rT) : (lT * rT + lF * rF);
            }
            ways %= MOD;
        }

        memo.set(key, ways);
        return ways;
    }

    return Number(solve(0, n - 1, true));
};`
};

export const steps = [
  {
    title: '1. Expression: "F | T ^ F", Query: True Ways',
    phase: 'INIT',
    codeLine: 12,
    tokens: ['F', '|', 'T', '^', 'F'],
    i: 0,
    j: 4,
    activeK: null,
    totalWays: 0,
    variables: { expression: '"F | T ^ F"', length: 5, target: 'Ways evaluating to True' },
    explain: 'We evaluate boolean operators at odd indices (1, 3). For each operator, split into left and right sub-expressions and combine their True/False counts.',
    intuition: 'Truth tables determine how left and right combinations multiply for &, |, and ^.'
  },
  {
    title: '2. Split at k = 1 (Operator "|"): "(F) | (T ^ F)"',
    phase: 'EVAL_OR',
    codeLine: 26,
    tokens: ['F', '|', 'T', '^', 'F'],
    i: 0,
    j: 4,
    activeK: 1,
    totalWays: 1,
    variables: { 'Left: F': 'lT = 0, lF = 1', 'Right: (T ^ F)': 'rT = 1, rF = 0 (since T^F = True)', 'OR True Ways': 'lF * rT = 1 * 1 = 1' },
    explain: 'Splitting at operator "|": left is "F" (0 True, 1 False). Right is "T ^ F" (1 True, 0 False). OR is True if either side is True: 1 way!',
    intuition: 'Parenthesization: (F) | (T ^ F) = F | T = True.'
  },
  {
    title: '3. Split at k = 3 (Operator "^"): "(F | T) ^ (F)"',
    phase: 'EVAL_XOR',
    codeLine: 30,
    tokens: ['F', '|', 'T', '^', 'F'],
    i: 0,
    j: 4,
    activeK: 3,
    totalWays: 2,
    variables: { 'Left: (F | T)': 'lT = 1, lF = 0', 'Right: F': 'rT = 0, rF = 1', 'XOR True Ways': 'lT * rF = 1 * 1 = 1' },
    explain: 'Splitting at operator "^": left is "F | T" (1 True, 0 False). Right is "F" (0 True, 1 False). XOR is True when inputs differ: 1 * 1 = 1 way.',
    intuition: 'Parenthesization: (F | T) ^ (F) = T ^ F = True.'
  },
  {
    title: '4. Sum All Splits: Total True Ways = 2',
    phase: 'COMPLETED',
    codeLine: 35,
    tokens: ['F', '|', 'T', '^', 'F'],
    i: 0,
    j: 4,
    activeK: null,
    totalWays: 2,
    validParentheses: ['(F) | (T ^ F)', '((F | T) ^ F)'],
    variables: { totalWays: 2, parenthesizations: '2 valid bracketings' },
    explain: 'Both splits yield a valid parenthesization evaluating to True. Total ways = 1 + 1 = 2.',
    intuition: 'Every valid bracket placement corresponds to exactly one root operator split.'
  }
];

export default function DifferentWaysToEvaluateABooleanExpressionVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          3D Partition DP: O(N^3)
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Ways to True: {step.totalWays}
        </span>
      </div>

      {/* Expression Visual Tokens */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Boolean Expression Tokens
        </span>

        <div className="flex items-center justify-center gap-2.5 py-2">
          {step.tokens.map((tok, idx) => {
            const isOp = tok === '&' || tok === '|' || tok === '^';
            const isActiveOp = idx === step.activeK;

            return (
              <div
                key={idx}
                className={`min-w-[48px] h-16 rounded-xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                  isActiveOp
                    ? 'border-amber-400 bg-amber-400/25 text-amber-300 ring-2 ring-amber-400/50 scale-110 shadow-lg'
                    : isOp
                    ? 'border-purple-500/40 bg-purple-500/15 text-purple-300'
                    : tok === 'T'
                    ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                    : 'border-rose-500/40 bg-rose-500/15 text-rose-300'
                }`}
              >
                <span className="text-[9px] text-[#8a8ea3]">idx {idx}</span>
                <span className="text-base font-bold mt-0.5">{tok}</span>
              </div>
            );
          })}
        </div>

        {/* Valid Parenthesizations */}
        {step.validParentheses && (
          <div className="w-full border-t border-[#272b3c] pt-4 flex flex-col items-center gap-2">
            <span className="text-[11px] font-mono text-cyan-300">
              Valid True Parenthesizations:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs text-emerald-300">
              {step.validParentheses.map((p, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30"
                >
                  {p}
                </span>
              ))}
            </div>
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
