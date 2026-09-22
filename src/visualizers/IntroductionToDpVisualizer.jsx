// DATA-ONLY — rendered by DualArrayRenderer via rendererType

export const meta = {
  title: 'Introduction to Dynamic Programming (DP-1)',
  category: 'Dynamic Programming',
  difficulty: 'Easy',
  timeComplexity: 'O(N) Tabulation vs O(2^N) Naive Recursion',
  spaceComplexity: 'O(1) Space-Optimized vs O(N) Memoization',
  description: 'Explores Dynamic Programming fundamentals: Overlapping Subproblems and Optimal Substructure using the Fibonacci sequence. Contrasts Naive Recursion, Top-Down Memoization, and Bottom-Up Space-Optimized Tabulation.'
};

export const rendererType = 'dual-array';

export const ideaMap = {
  title: 'Introduction to DP (DP-1)',
  nodes: [
    { id: 'root', label: 'Dynamic Programming Foundations', children: ['overlapping-subproblems', 'optimal-substructure', 'top-down-memo', 'bottom-up-tab'] },
    { id: 'overlapping-subproblems', label: '1. Overlapping Subproblems', detail: 'The same subproblems are solved repeatedly. In F(5), F(3) is recomputed twice and F(2) three times in naive recursion.' },
    { id: 'optimal-substructure', label: '2. Optimal Substructure', detail: 'The global optimal solution can be constructed directly from the optimal solutions of its subproblems: F(n) = F(n-1) + F(n-2).' },
    { id: 'top-down-memo', label: '3. Top-Down Memoization', detail: 'Recursion with a cache table (dp[]). Check cache before making recursive calls: O(N) time and O(N) stack + table space.' },
    { id: 'bottom-up-tab', label: '4. Bottom-Up Tabulation', detail: 'Iterative construction from base cases F(0), F(1) up to F(N). Can be compressed to O(1) space with rolling variables.' }
  ]
};

export const solutions = {
  cpp: `// C++ Introduction to DP (Fibonacci: Memoization & Tabulation)
#include <vector>
using namespace std;

class Solution {
public:
    // 1. Top-Down Memoization: O(N) time | O(N) stack + O(N) table
    int memoFib(int n, vector<int>& dp) {
        if (n <= 1) return n;
        if (dp[n] != -1) return dp[n];
        return dp[n] = memoFib(n - 1, dp) + memoFib(n - 2, dp);
    }

    // 2. Bottom-Up Tabulation (Space-Optimized): O(N) time | O(1) space
    int fib(int n) {
        if (n <= 1) return n;
        int prev2 = 0, prev = 1;
        for (int i = 2; i <= n; i++) {
            int cur = prev + prev2;
            prev2 = prev;
            prev = cur;
        }
        return prev;
    }
};`,
  python: `# Python 3 Introduction to DP (Fibonacci)
class Solution:
    # 1. Top-Down Memoization: O(N) time | O(N) space
    def fib_memo(self, n: int, dp: list[int]) -> int:
        if n <= 1:
            return n
        if dp[n] != -1:
            return dp[n]
        dp[n] = self.fib_memo(n - 1, dp) + self.fib_memo(n - 2, dp)
        return dp[n]

    # 2. Bottom-Up Space-Optimized Tabulation: O(N) time | O(1) space
    def fib(self, n: int) -> int:
        if n <= 1:
            return n
        prev2, prev = 0, 1
        for i in range(2, n + 1):
            cur = prev + prev2
            prev2 = prev
            prev = cur
        return prev`,
  java: `// Java Introduction to DP (Fibonacci)
import java.util.Arrays;

class Solution {
    // 1. Top-Down Memoization: O(N) time | O(N) space
    public int memoFib(int n, int[] dp) {
        if (n <= 1) return n;
        if (dp[n] != -1) return dp[n];
        return dp[n] = memoFib(n - 1, dp) + memoFib(n - 2, dp);
    }

    // 2. Bottom-Up Tabulation (Space-Optimized): O(N) time | O(1) space
    public int fib(int n) {
        if (n <= 1) return n;
        int prev2 = 0, prev = 1;
        for (int i = 2; i <= n; i++) {
            int cur = prev + prev2;
            prev2 = prev;
            prev = cur;
        }
        return prev;
    }
}`,
  javascript: `// JavaScript Introduction to DP (Fibonacci)
// 1. Top-Down Memoization
var fibMemo = function(n, dp = {}) {
    if (n <= 1) return n;
    if (dp[n] !== undefined) return dp[n];
    return dp[n] = fibMemo(n - 1, dp) + fibMemo(n - 2, dp);
};

// 2. Bottom-Up Tabulation (Space-Optimized)
var fib = function(n) {
    if (n <= 1) return n;
    let prev2 = 0, prev = 1;
    for (let i = 2; i <= n; i++) {
        const cur = prev + prev2;
        prev2 = prev;
        prev = cur;
    }
    return prev;
};`
};

export const steps = [
  {
    title: '1. The Two Pillars of Dynamic Programming',
    phase: 'INITIAL',
    tracks: [
      { label: 'n Index', items: ['n=0', 'n=1', 'n=2', 'n=3', 'n=4', 'n=5', 'n=6'] },
      { label: 'F(n) Target', items: ['0', '1', '—', '—', '—', '—', '—'] }
    ],
    activeI: null,
    activePrev: null,
    trackTitle: 'DP Foundations Overview',
    metrics: [
      { label: 'Core Rule 1', value: 'Overlapping Subproblems' },
      { label: 'Core Rule 2', value: 'Optimal Substructure' },
      { label: 'Goal', value: 'Compute F(6) efficiently' }
    ],
    customCard: {
      title: 'Prerequisites for Dynamic Programming',
      rows: [
        { label: '1. Overlapping Subproblems', value: 'The same subproblems are called repeatedly during recursion' },
        { label: '2. Optimal Substructure', value: 'Optimal solution to problem contains optimal solutions to subproblems' },
        { label: 'Conclusion', value: 'Store subproblem results to avoid redundant work!', accent: true }
      ]
    },
    formula: 'F(n) = F(n-1) + F(n-2) for n >= 2',
    action: 'Establish DP criteria: Overlapping Subproblems and Optimal Substructure',
    explain: 'Dynamic Programming is optimization over plain recursion. When a recursive algorithm visits identical states repeatedly, memoizing or tabulating these states collapses exponential O(2^N) runtime into polynomial O(N) runtime.',
    intuition: 'Those who cannot remember the past are condemned to repeat it.'
  },
  {
    title: '2. The Naive Recursion Problem: Exponential Explosion',
    phase: 'INITIAL',
    tracks: [
      { label: 'Call Count', items: ['F(6): 1x', 'F(5): 1x', 'F(4): 2x', 'F(3): 3x', 'F(2): 5x', 'F(1): 8x', 'F(0): 5x'] },
      { label: 'Total Calls', items: ['O(2^N)', '25 calls for F(6)', '335M calls for F(40)', '—', '—', '—', '—'] }
    ],
    activeI: null,
    activePrev: null,
    trackTitle: 'Naive Recursive Redundancy',
    metrics: [
      { label: 'Naive Time', value: 'O(2^N) Exponential', highlight: true },
      { label: 'F(2) Calls in F(6)', value: '5 redundant calls' },
      { label: 'Stack Depth', value: 'O(N)' }
    ],
    customCard: {
      title: 'Exponential Redundancy Analysis',
      rows: [
        { label: 'F(4) Evaluation', value: 'Evaluated independently in both left and right subtrees' },
        { label: 'F(2) Evaluation', value: 'Evaluated 5 separate times from scratch' },
        { label: 'Bottleneck', value: 'Duplicate subtree branching wastes exponential operations', accent: true }
      ]
    },
    formula: 'T(n) = T(n-1) + T(n-2) + O(1) -> O(2^n)',
    action: 'Identify overlapping subproblems that cause exponential explosion in naive recursion',
    explain: 'In naive recursion fib(n), computing fib(6) spawns fib(5) and fib(4). But fib(5) ALSO spawns fib(4)! Both branches recompute fib(4) and all its descendants independently, wasting massive CPU cycles.',
    intuition: 'Eliminating duplicate subtree evaluations is the foundational goal of DP.'
  },
  {
    title: '3. Top-Down Memoization: The Cache Solution',
    phase: 'BASE_CASES',
    tracks: [
      { label: 'Memo Table dp[]', items: ['dp[0]=0', 'dp[1]=1', 'dp[2]=-1', 'dp[3]=-1', 'dp[4]=-1', 'dp[5]=-1', 'dp[6]=-1'] },
      { label: 'Cache Action', items: ['Cached', 'Cached', 'Uncomputed', 'Uncomputed', 'Uncomputed', 'Uncomputed', 'Uncomputed'] }
    ],
    activeI: 1,
    activePrev: 0,
    trackTitle: 'Memoization Table (Top-Down)',
    metrics: [
      { label: 'Time Complexity', value: 'O(N) Linear' },
      { label: 'Space Complexity', value: 'O(N) Stack + O(N) Array' },
      { label: 'Cache Miss Penalty', value: '1st time only' }
    ],
    customCard: {
      title: 'Top-Down Execution Pattern',
      rows: [
        { label: '1. Check Cache', value: 'if (dp[n] != -1) return dp[n];' },
        { label: '2. Compute & Store', value: 'return dp[n] = memoFib(n-1) + memoFib(n-2);' },
        { label: 'Effect', value: 'Subtrees are solved once; subsequent calls return in O(1)', accent: true }
      ]
    },
    formula: 'if (dp[n] != -1) return dp[n]; else dp[n] = f(n-1) + f(n-2);',
    action: 'Introduce top-down memoization: cache subproblem answers in an array',
    explain: 'Before computing any subproblem, check if dp[n] is already filled. If yes, return it immediately in O(1) time. Otherwise, compute it recursively once, store it into dp[n], and return it.',
    intuition: 'Memoization trades a small amount of memory to eliminate exponential time.'
  },
  {
    title: '4. Bottom-Up Tabulation: Base Cases F(0) and F(1)',
    phase: 'BASE_CASES',
    tracks: [
      { label: 'n Index', items: ['n=0', 'n=1', 'n=2', 'n=3', 'n=4', 'n=5', 'n=6'] },
      { label: 'Tabulation dp[]', items: [0, 1, '—', '—', '—', '—', '—'] }
    ],
    activeI: 1,
    activePrev: 0,
    trackTitle: 'Tabulation Base Cases',
    metrics: [
      { label: 'Approach', value: 'Bottom-Up (Iterative)' },
      { label: 'dp[0]', value: '0' },
      { label: 'dp[1]', value: '1' },
      { label: 'Stack Overhead', value: '0 (No recursion)' }
    ],
    customCard: {
      title: 'Bottom-Up Invariant',
      rows: [
        { label: 'Start from Seeds', value: 'dp[0] = 0, dp[1] = 1' },
        { label: 'Direction', value: 'Compute iteratively: 2 -> 3 -> ... -> N' },
        { label: 'Advantage', value: 'Zero recursion call-stack overhead', accent: true }
      ]
    },
    formula: 'dp[0] = 0, dp[1] = 1',
    action: 'Initialize base values dp[0] = 0 and dp[1] = 1 for bottom-up computation',
    explain: 'Instead of recursing top-down, tabulation starts from the simplest base subproblems and builds upward. No recursive stack frames are consumed, eliminating risk of stack overflow.',
    intuition: 'Building forward from base cases is cleaner, faster, and cache-friendly.'
  },
  {
    title: '5. Tabulation Step i = 2: dp[2] = 0 + 1 = 1',
    phase: 'COMPUTE',
    tracks: [
      { label: 'n Index', items: ['n=0', 'n=1', 'n=2', 'n=3', 'n=4', 'n=5', 'n=6'] },
      { label: 'Tabulation dp[]', items: [0, 1, 1, '—', '—', '—', '—'] }
    ],
    activeI: 2,
    activePrev: 1,
    trackTitle: 'Step i = 2 Computation',
    metrics: [
      { label: 'Step i', value: '2' },
      { label: 'dp[i-2]', value: 'dp[0] = 0' },
      { label: 'dp[i-1]', value: 'dp[1] = 1' },
      { label: 'dp[2]', value: '1' }
    ],
    customCard: {
      title: 'Step i = 2',
      rows: [
        { label: 'dp[1] (prev)', value: '1' },
        { label: 'dp[0] (prev2)', value: '0' },
        { label: 'dp[2]', value: '1 + 0 = 1', accent: true }
      ]
    },
    formula: 'dp[2] = dp[1] + dp[0] = 1 + 0 = 1',
    action: 'Compute dp[2] from dp[1] and dp[0]',
    explain: 'dp[2] is the sum of the preceding two elements: dp[1] (1) + dp[0] (0) = 1.',
    intuition: 'Each table entry is determined solely by the two preceding entries.'
  },
  {
    title: '6. Tabulation Step i = 3 & 4: dp[3]=2, dp[4]=3',
    phase: 'COMPUTE',
    tracks: [
      { label: 'n Index', items: ['n=0', 'n=1', 'n=2', 'n=3', 'n=4', 'n=5', 'n=6'] },
      { label: 'Tabulation dp[]', items: [0, 1, 1, 2, 3, '—', '—'] }
    ],
    activeI: 4,
    activePrev: 3,
    trackTitle: 'Step i = 4 Computation',
    metrics: [
      { label: 'dp[3]', value: 'dp[2] + dp[1] = 1 + 1 = 2' },
      { label: 'dp[4]', value: 'dp[3] + dp[2] = 2 + 1 = 3' },
      { label: 'Operations', value: 'Constant O(1) per step' }
    ],
    customCard: {
      title: 'Linear State Evolution',
      rows: [
        { label: 'At i = 3', value: 'dp[3] = 1 + 1 = 2' },
        { label: 'At i = 4', value: 'dp[4] = 2 + 1 = 3' },
        { label: 'Progress', value: 'Advancing smoothly toward target N = 6', accent: true }
      ]
    },
    formula: 'dp[4] = dp[3] + dp[2] = 2 + 1 = 3',
    action: 'Fill dp[3] = 2 and dp[4] = 3 iteratively',
    explain: 'Each step takes exactly one addition: dp[3] = 1 + 1 = 2, and dp[4] = 2 + 1 = 3.',
    intuition: 'Tabulation processes every subproblem in topological order.'
  },
  {
    title: '7. Tabulation Step i = 5 & 6: Target F(6) = 8',
    phase: 'COMPUTE',
    tracks: [
      { label: 'n Index', items: ['n=0', 'n=1', 'n=2', 'n=3', 'n=4', 'n=5', 'n=6'] },
      { label: 'Tabulation dp[]', items: [0, 1, 1, 2, 3, 5, 8] }
    ],
    activeI: 6,
    activePrev: 5,
    trackTitle: 'Step i = 6 (Target Reached)',
    metrics: [
      { label: 'dp[5]', value: 'dp[4] + dp[3] = 3 + 2 = 5' },
      { label: 'dp[6]', value: 'dp[5] + dp[4] = 5 + 3 = 8', highlight: true },
      { label: 'Status', value: 'Target Computed' }
    ],
    customCard: {
      title: 'Final Tabulation Steps',
      rows: [
        { label: 'At i = 5', value: 'dp[5] = 3 + 2 = 5' },
        { label: 'At i = 6', value: 'dp[6] = 5 + 3 = 8' },
        { label: 'Total Operations', value: 'Exactly 5 additions', accent: true }
      ]
    },
    formula: 'dp[6] = dp[5] + dp[4] = 5 + 3 = 8',
    action: 'Compute dp[5] = 5 and dp[6] = 8; target reached',
    explain: 'At i=5, dp[5] = 3 + 2 = 5. At i=6, dp[6] = 5 + 3 = 8. Where naive recursion needed 25 call stack frames, tabulation needed only 5 linear operations!',
    intuition: 'Linear time replaces exponential branching.'
  },
  {
    title: '8. Space Optimization: Two Rolling Variables O(1)',
    phase: 'COMPUTE',
    tracks: [
      { label: 'Rolling Variables', items: ['prev2 = 3', 'prev = 5', 'cur = 8', '—', '—', '—', '—'] },
      { label: 'Next State', items: ['prev2 = 5', 'prev = 8', '—', '—', '—', '—', '—'] }
    ],
    activeI: 6,
    activePrev: null,
    trackTitle: 'Space Compression to O(1)',
    metrics: [
      { label: 'prev2', value: 'F(n-2) = 3' },
      { label: 'prev', value: 'F(n-1) = 5' },
      { label: 'cur', value: 'prev + prev2 = 8' },
      { label: 'Auxiliary Memory', value: 'O(1) Constant' }
    ],
    customCard: {
      title: 'Memory Optimization Principle',
      rows: [
        { label: 'Observation', value: 'F(i) only depends on F(i-1) and F(i-2)' },
        { label: 'Array Waste', value: 'Past history (F(0)..F(i-3)) is never accessed again' },
        { label: 'Optimization', value: 'Keep only prev and prev2 -> O(1) space!', accent: true }
      ]
    },
    formula: 'cur = prev + prev2; prev2 = prev; prev = cur;',
    action: 'Compress storage from O(N) array to O(1) two rolling integer variables',
    explain: 'Notice that after computing F(i), we never need F(i-2) again for subsequent terms. Discarding older values and keeping only prev and prev2 slashes memory from O(N) to O(1).',
    intuition: 'If state dependency has bounded historical depth, space can be compressed to constant size.'
  },
  {
    title: '9. Final Paradigm Comparison: Recursion vs DP',
    phase: 'COMPLETED',
    tracks: [
      { label: 'Paradigm', items: ['1. Naive Recursion', '2. Top-Down Memo', '3. Bottom-Up Tab', '4. Space-Optimized'] },
      { label: 'Complexity', items: ['O(2^N) / O(N) stack', 'O(N) / O(N) mem', 'O(N) / O(N) array', 'O(N) / O(1) space'] }
    ],
    activeI: 3,
    activePrev: null,
    trackTitle: 'Mastery Summary',
    metrics: [
      { label: 'F(6) Answer', value: '8', highlight: true },
      { label: 'Optimal Time', value: 'O(N)' },
      { label: 'Optimal Space', value: 'O(1)' },
      { label: 'Core Takeaway', value: 'Memoize or Tabulate!' }
    ],
    customCard: {
      title: 'The 4 Stages of Dynamic Programming',
      rows: [
        { label: 'Stage 1: Naive Recursion', value: 'O(2^N) Time, O(N) Stack' },
        { label: 'Stage 2: Top-Down Memoization', value: 'O(N) Time, O(N) Stack + Array' },
        { label: 'Stage 3: Bottom-Up Tabulation', value: 'O(N) Time, O(N) Array' },
        { label: 'Stage 4: Space Optimization', value: 'O(N) Time, O(1) Auxiliary Space', accent: true }
      ]
    },
    formula: 'Result: F(6) = 8 in O(N) time and O(1) space',
    action: 'Return final answer 8; dynamic programming complete',
    explain: 'Dynamic Programming turns intractable exponential recursion into lightning-fast linear computation. The four progression stages (Naive -> Memoization -> Tabulation -> Space-Optimized) form the foundation of all advanced algorithmic optimization.',
    intuition: 'Mastering the 4 stages of DP unlocks the ability to conquer complex optimization problems.'
  }
];
