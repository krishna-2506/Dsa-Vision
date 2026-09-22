import React from 'react';

export const meta = {
  title: 'Different Ways to Evaluate a Boolean Expression | DP-52',
  category: 'Dynamic Programming',
  difficulty: 'Hard',
  timeComplexity: 'O(N^3)',
  spaceComplexity: 'O(N^2)',
  description: 'Calculates the number of ways to parenthesize a boolean expression (containing T, F, &, |, ^) so that the entire expression evaluates to True using 3D Partition Dynamic Programming (MCM pattern) in O(N^3) time.'
};

export const ideaMap = {
  problemArchetype: 'MCM / Boolean Parenthesization Partition DP',
  trigger: 'Count the number of ways to parenthesize a boolean expression with operators (&, |, ^) to evaluate to True.',
  coreInsight: 'For any interval [i...j], iterate over every operator index k (k = i+1, i+3, ...). Partition into left [i...k-1] and right [k+1...j]. Because boolean operators require both True and False child outcomes, recursively calculate both (lT, lF) and (rT, rF), then combine them according to the operator truth table modulo 10^9 + 7.',
  naiveApproach: {
    title: 'Exhaustive Parenthesization Generation',
    time: 'O(Catalan(N)) ~ O(4^N / N^(1.5))',
    space: 'O(N) recursion call stack',
    bottleneck: 'The number of valid parenthesizations corresponds to the Catalan numbers, exploding exponentially.'
  },
  optimalApproach: {
    title: '3D Interval Partition DP: dp[i][j][isTrue]',
    time: 'O(N^3)',
    space: 'O(N^2 * 2) = O(N^2)',
    breakthrough: 'Only O(N^2) distinct intervals [i, j] exist. Memoizing (interval, targetBool) evaluates each state in O(N) partition cuts.'
  },
  flowNodes: [
    { id: '1', title: 'State Definition', subtitle: 'dp[i][j][isTrue]', description: 'dp[i][j][1] is ways exp[i...j] evaluates to True; dp[i][j][0] is ways it evaluates to False.', tag: 'State' },
    { id: '2', title: 'Base Operands', subtitle: 'i == j (T or F)', description: 'If exp[i] == "T", True ways = 1, False ways = 0. If "F", True ways = 0, False ways = 1.', tag: 'Base' },
    { id: '3', title: 'Operator Split Loop', subtitle: 'k = i+1, i+3, ...', description: 'Split at each operator k. Recursively obtain left (lT, lF) and right (rT, rF).', tag: 'Partition' },
    { id: '4', title: 'Truth Table Combine', subtitle: '&, |, ^ truth logic', description: 'Multiply matching subproblem counts based on operator truth tables and accumulate modulo 10^9 + 7.', tag: 'Combine' }
  ],
  pitfalls: [
    'Ignoring False combinations: You cannot compute True ways without knowing False ways! For example, XOR requires (lT * rF + lF * rT).',
    'Iterating over operands instead of operators: Operators only live at odd indices (k = i+1, i+3, ...). Never split on an operand.',
    '64-bit integer overflow: Multiplying ways (lT * rF) can exceed standard 32-bit integers before modulo; use 64-bit integers (long long / BigInt).'
  ],
  interviewCheatSheet: 'Interval partition DP: always return dual counts (waysTrue, waysFalse) for every subproblem, then combine using boolean truth tables.'
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
  python: `# Python 3 Boolean Evaluation (Partition DP)
# Time: O(N^3) | Space: O(N^2)
class Solution:
    def countWays(self, exp: str) -> int:
        MOD = 1000000007
        n = len(exp)
        dp = {}

        def solve(i: int, j: int, is_true: bool) -> int:
            if i > j:
                return 0
            if i == j:
                if is_true:
                    return 1 if exp[i] == 'T' else 0
                else:
                    return 1 if exp[i] == 'F' else 0

            key = (i, j, is_true)
            if key in dp:
                return dp[key]

            ways = 0
            for k in range(i + 1, j, 2):
                lT = solve(i, k - 1, True)
                lF = solve(i, k - 1, False)
                rT = solve(k + 1, j, True)
                rF = solve(k + 1, j, False)

                op = exp[k]
                if op == '&':
                    if is_true:
                        ways += (lT * rT)
                    else:
                        ways += (lT * rF + lF * rT + lF * rF)
                elif op == '|':
                    if is_true:
                        ways += (lT * rT + lT * rF + lF * rT)
                    else:
                        ways += (lF * rF)
                elif op == '^':
                    if is_true:
                        ways += (lT * rF + lF * rT)
                    else:
                        ways += (lT * rT + lF * rF)

                ways %= MOD

            dp[key] = ways
            return ways

        return solve(0, n - 1, True)`,
  java: `// Java Boolean Evaluation (Partition DP)
// Time: O(N^3) | Space: O(N^2)
import java.util.Arrays;

class Solution {
    private final int MOD = 1000000007;

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
  javascript: `// JavaScript Boolean Evaluation (Partition DP)
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
    title: '1. Expression Setup: "F | T ^ F"',
    phase: 'SETUP',
    codeLine: 20,
    tokens: ['F', '|', 'T', '^', 'F'],
    activeInterval: [0, 4],
    splitK: null,
    parentheses: 'F | T ^ F',
    leftStats: null,
    rightStats: null,
    opFormula: null,
    totalWaysTrue: 0,
    action: 'Target: "F | T ^ F". Query: Count parenthesizations evaluating to True.',
    explain: 'Operands are at even indices (0: F, 2: T, 4: F). Operators are at odd indices (1: |, 3: ^). We must partition at every operator k and combine left and right child subproblems.',
    intuition: 'Every choice of operator k defines a root node in an expression tree.'
  },
  {
    title: '2. Base Cases: Single Operands (i == j)',
    phase: 'BASE_CASES',
    codeLine: 24,
    tokens: ['F', '|', 'T', '^', 'F'],
    activeInterval: [0, 0],
    splitK: null,
    parentheses: 'exp[0] = F, exp[2] = T, exp[4] = F',
    leftStats: null,
    rightStats: null,
    opFormula: 'T -> {True:1, False:0} | F -> {True:0, False:1}',
    totalWaysTrue: 0,
    action: 'Evaluate base cases: single operands cannot be partitioned further.',
    explain: 'For index 0 ("F"): True ways = 0, False ways = 1. For index 2 ("T"): True ways = 1, False ways = 0. For index 4 ("F"): True ways = 0, False ways = 1.',
    intuition: 'Leaves of the recursion tree are deterministic boolean constants.'
  },
  {
    title: '3. Partition Split at k = 1 (Operator "|")',
    phase: 'SPLIT_K',
    codeLine: 31,
    tokens: ['F', '|', 'T', '^', 'F'],
    activeInterval: [0, 4],
    splitK: 1,
    parentheses: '(F) | (T ^ F)',
    leftStats: { text: 'Left: "F"', t: 0, f: 1 },
    rightStats: { text: 'Right: "T ^ F"', t: '?', f: '?' },
    opFormula: 'Operator "|" at k=1 separates [0..0] and [2..4]',
    totalWaysTrue: 0,
    action: 'First top-level partition: Split at operator "|" at index 1.',
    explain: 'Left side is [0..0] = "F". Right side is [2..4] = "T ^ F". Left subproblem is solved: lT = 0, lF = 1. Now we recursively evaluate the right subexpression "T ^ F".',
    intuition: 'Breaking the expression into two smaller subexpressions.'
  },
  {
    title: '4. Right Subproblem: Evaluate "T ^ F" at k = 3',
    phase: 'SUBPROBLEM',
    codeLine: 31,
    tokens: ['F', '|', 'T', '^', 'F'],
    activeInterval: [2, 4],
    splitK: 3,
    parentheses: '(F) | ((T) ^ (F))',
    leftStats: { text: 'Sub-Left: "T"', t: 1, f: 0 },
    rightStats: { text: 'Sub-Right: "F"', t: 0, f: 1 },
    opFormula: 'XOR: True ways = (lT * rF) + (lF * rT)',
    totalWaysTrue: 0,
    action: 'Evaluate "T ^ F" at k = 3. Left is "T" (1, 0), Right is "F" (0, 1).',
    explain: 'In interval [2..4], only one operator exists: "^" at index 3. Left child is "T" (lT=1, lF=0). Right child is "F" (rT=0, rF=1). XOR is True when inputs differ.',
    intuition: '1 True on left combined with 1 False on right makes XOR True!'
  },
  {
    title: '5. XOR Truth Table: "T ^ F" Resolves to True',
    phase: 'TRUTH_EVAL',
    codeLine: 45,
    tokens: ['F', '|', 'T', '^', 'F'],
    activeInterval: [2, 4],
    splitK: 3,
    parentheses: '(F) | ((T) ^ (F))',
    leftStats: { text: 'Sub-Left: "T"', t: 1, f: 0 },
    rightStats: { text: 'Sub-Right: "F"', t: 0, f: 1 },
    opFormula: 'rT = (1 * 1) + (0 * 0) = 1 | rF = (1 * 0) + (0 * 1) = 0',
    totalWaysTrue: 0,
    action: 'Right subexpression "T ^ F" yields rT = 1, rF = 0.',
    explain: 'XOR calculation: True ways = (lT * rF) + (lF * rT) = (1 * 1) + (0 * 0) = 1 way. False ways = (lT * rT) + (lF * rF) = 0 ways. Suffix "T ^ F" is evaluated!',
    intuition: 'Subproblem [2..4] is fully memoized: {True: 1, False: 0}.'
  },
  {
    title: '6. Resolve Split at k = 1: (F) | (T ^ F)',
    phase: 'COMBINE_OR',
    codeLine: 41,
    tokens: ['F', '|', 'T', '^', 'F'],
    activeInterval: [0, 4],
    splitK: 1,
    parentheses: '(F) | (T ^ F)',
    leftStats: { text: 'Left: "F"', t: 0, f: 1 },
    rightStats: { text: 'Right: "T ^ F"', t: 1, f: 0 },
    opFormula: 'OR True: (lT*rT + lT*rF + lF*rT) = 0 + 0 + (1*1) = 1',
    totalWaysTrue: 1,
    action: 'Combine across "|": lF * rT = 1 * 1 = 1 way evaluating to True!',
    explain: 'Left is False (lF=1), Right is True (rT=1). In boolean OR: False | True = True! Product is 1 * 1 = 1. Way 1 discovered: (F) | (T ^ F) = True.',
    intuition: 'Total valid parenthesizations for split k=1 is 1.'
  },
  {
    title: '7. Partition Split at k = 3 (Operator "^")',
    phase: 'SPLIT_K',
    codeLine: 31,
    tokens: ['F', '|', 'T', '^', 'F'],
    activeInterval: [0, 4],
    splitK: 3,
    parentheses: '(F | T) ^ (F)',
    leftStats: { text: 'Left: "F | T"', t: '?', f: '?' },
    rightStats: { text: 'Right: "F"', t: 0, f: 1 },
    opFormula: 'Operator "^" at k=3 separates [0..2] and [4..4]',
    totalWaysTrue: 1,
    action: 'Second top-level partition: Split at operator "^" at index 3.',
    explain: 'Left side is [0..2] = "F | T". Right side is [4..4] = "F" (rT=0, rF=1). Now we recursively evaluate the left subexpression "F | T".',
    intuition: 'Testing the alternative root of the expression tree.'
  },
  {
    title: '8. Left Subproblem: Evaluate "F | T" at k = 1',
    phase: 'SUBPROBLEM',
    codeLine: 31,
    tokens: ['F', '|', 'T', '^', 'F'],
    activeInterval: [0, 2],
    splitK: 1,
    parentheses: '((F) | (T)) ^ (F)',
    leftStats: { text: 'Sub-Left: "F"', t: 0, f: 1 },
    rightStats: { text: 'Sub-Right: "T"', t: 1, f: 0 },
    opFormula: 'OR: True ways = (lT*rT + lT*rF + lF*rT)',
    totalWaysTrue: 1,
    action: 'Evaluate "F | T" at k = 1. Left is "F" (0, 1), Right is "T" (1, 0).',
    explain: 'In interval [0..2], operator is "|". Left child is "F" (lT=0, lF=1). Right child is "T" (rT=1, rF=0). OR is True if either side is True.',
    intuition: '0 True on left and 1 True on right yields True!'
  },
  {
    title: '9. OR Truth Table: "F | T" Resolves to True',
    phase: 'TRUTH_EVAL',
    codeLine: 41,
    tokens: ['F', '|', 'T', '^', 'F'],
    activeInterval: [0, 2],
    splitK: 1,
    parentheses: '((F) | (T)) ^ (F)',
    leftStats: { text: 'Sub-Left: "F"', t: 0, f: 1 },
    rightStats: { text: 'Sub-Right: "T"', t: 1, f: 0 },
    opFormula: 'lT = (0*1) + (0*0) + (1*1) = 1 | lF = (1*0) = 0',
    totalWaysTrue: 1,
    action: 'Left subexpression "F | T" yields lT = 1, lF = 0.',
    explain: 'OR calculation: True ways = lF * rT = 1 * 1 = 1. False ways = lF * rF = 1 * 0 = 0. Suffix [0..2] evaluates to True with 1 way.',
    intuition: 'Subproblem [0..2] is memoized: {True: 1, False: 0}.'
  },
  {
    title: '10. Resolve Split at k = 3: (F | T) ^ (F)',
    phase: 'COMBINE_XOR',
    codeLine: 45,
    tokens: ['F', '|', 'T', '^', 'F'],
    activeInterval: [0, 4],
    splitK: 3,
    parentheses: '(F | T) ^ (F)',
    leftStats: { text: 'Left: "F | T"', t: 1, f: 0 },
    rightStats: { text: 'Right: "F"', t: 0, f: 1 },
    opFormula: 'XOR True: (lT * rF) + (lF * rT) = (1 * 1) + 0 = 1',
    totalWaysTrue: 2,
    action: 'Combine across "^": lT * rF = 1 * 1 = 1 way evaluating to True!',
    explain: 'Left is True (lT=1), Right is False (rF=1). True ^ False = True! Product is 1 * 1 = 1. Way 2 discovered: (F | T) ^ (F) = True. Grand total becomes 1 + 1 = 2 ways!',
    intuition: 'Both top-level parenthesizations evaluate to True.'
  },
  {
    title: '11. Algorithm Complete & Complexity Summary',
    phase: 'COMPLETED',
    codeLine: 54,
    tokens: ['F', '|', 'T', '^', 'F'],
    activeInterval: [0, 4],
    splitK: null,
    parentheses: 'Two Valid Ways: (F) | (T ^ F) and (F | T) ^ (F)',
    leftStats: null,
    rightStats: null,
    opFormula: 'Total Ways to Evaluate to True = 2',
    totalWaysTrue: 2,
    action: 'Return 2 ways. Time: O(N^3) | Space: O(N^2).',
    explain: 'Both possible parenthesizations evaluate to True: 1) (F) | (T ^ F) = F | T = True. 2) (F | T) ^ (F) = T ^ F = True. Memoization table stores N^2 intervals with 2 boolean outcomes.',
    intuition: 'By memoizing both True and False outcomes, any length expression is solved in polynomial O(N^3) time.'
  }
];

export default function DifferentWaysToEvaluateABooleanExpressionVisualizer({ currentStep = 0 }) {
  const stepIdx = Math.min(Math.max(0, currentStep), steps.length - 1);
  const step = steps[stepIdx] || steps[0];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-4 sm:p-6 space-y-6 select-none">
      {/* Top Header Metrics & Algorithmic Phase Badge */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-md border font-semibold uppercase text-[10px] ${
            step.phase.startsWith('COMBINE')
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              : step.phase === 'SPLIT_K'
              ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
              : step.phase === 'COMPLETED'
              ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
              : 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300'
          }`}>
            {step.phase}
          </span>
          {step.splitK !== null && (
            <span className="px-2.5 py-1 rounded-md bg-[var(--board-raised-2)] border border-[var(--line)] text-cyan-300">
              Split Operator: '{step.tokens[step.splitK]}' at k={step.splitK}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 font-mono">
          <span className="px-2.5 py-1 rounded-md bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk)]">
            Tokens: <strong className="text-cyan-400">{step.tokens.length}</strong>
          </span>
          <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
            True Ways: {step.totalWaysTrue}
          </span>
        </div>
      </div>

      {/* Expression Parenthesization Display Banner */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="text-indigo-400 font-bold">PARENTHESIZATION:</span>
          <span className="text-[var(--chalk)] font-bold text-sm bg-[var(--board-raised-2)] px-2.5 py-0.5 rounded border border-[var(--line)]">
            {step.parentheses}
          </span>
        </div>
        {step.opFormula && (
          <span className="text-[11px] text-amber-300 font-semibold">{step.opFormula}</span>
        )}
      </div>

      {/* Token Stream & Active Split Visualization */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-5 sm:p-6 space-y-6 shadow-lg">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--chalk-dim)] border-b border-[var(--line)] pb-2.5">
          <span className="uppercase tracking-wider font-semibold">Expression Token Stream</span>
          <span>interval [{step.activeInterval[0]} .. {step.activeInterval[1]}]</span>
        </div>

        {/* Tokens Row */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 py-3 overflow-x-auto">
          {step.tokens.map((tok, idx) => {
            const isOperator = idx % 2 === 1;
            const isSplitOp = step.splitK === idx;
            const inInterval = idx >= step.activeInterval[0] && idx <= step.activeInterval[1];

            let tokStyle = 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk)]';

            if (isSplitOp) {
              tokStyle = 'border-amber-400 bg-amber-500/30 text-amber-200 ring-2 ring-amber-400/80 shadow-lg scale-110 font-black';
            } else if (isOperator) {
              tokStyle = 'border-indigo-500/40 bg-indigo-500/15 text-indigo-300 font-bold';
            } else if (tok === 'T') {
              tokStyle = 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300 font-bold';
            } else if (tok === 'F') {
              tokStyle = 'border-rose-500/50 bg-rose-500/20 text-rose-300 font-bold';
            }

            if (!inInterval) {
              tokStyle += ' opacity-40';
            }

            return (
              <div key={`tok-${idx}`} className="flex flex-col items-center gap-1.5 min-w-[42px] sm:min-w-[48px]">
                {/* Pointer indicators */}
                <div className="h-4 flex items-center justify-center text-[10px] font-mono font-bold">
                  {isSplitOp ? (
                    <span className="text-amber-400 animate-bounce">split▼</span>
                  ) : null}
                </div>

                <div className={`w-11 h-13 sm:w-13 sm:h-15 rounded-xl border flex flex-col items-center justify-center font-mono transition-all duration-200 ${tokStyle}`}>
                  <span className="text-xl font-bold">{tok}</span>
                  <span className="text-[8px] opacity-60 uppercase">{isOperator ? 'op' : 'val'}</span>
                </div>

                <span className="text-[10px] font-mono text-[var(--chalk-faint)]">[{idx}]</span>
              </div>
            );
          })}
        </div>

        {/* Subexpression Dual Cards (Left vs Right) */}
        {(step.leftStats || step.rightStats) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[var(--line)]">
            {step.leftStats && (
              <div className="bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl p-3 text-xs font-mono space-y-1">
                <span className="text-indigo-300 font-bold">{step.leftStats.text}</span>
                <div className="flex items-center gap-3 pt-1">
                  <span>True: <strong className="text-emerald-400">{step.leftStats.t}</strong></span>
                  <span>False: <strong className="text-rose-400">{step.leftStats.f}</strong></span>
                </div>
              </div>
            )}
            {step.rightStats && (
              <div className="bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl p-3 text-xs font-mono space-y-1">
                <span className="text-cyan-300 font-bold">{step.rightStats.text}</span>
                <div className="flex items-center gap-3 pt-1">
                  <span>True: <strong className="text-emerald-400">{step.rightStats.t}</strong></span>
                  <span>False: <strong className="text-rose-400">{step.rightStats.f}</strong></span>
                </div>
              </div>
            )}
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
