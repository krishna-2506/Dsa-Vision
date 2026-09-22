// DATA-ONLY — rendered by DpGridRenderer via rendererType

export const meta = {
  title: 'Distinct Subsequences (DP-32)',
  category: 'Dynamic Programming',
  difficulty: 'Hard',
  timeComplexity: 'O(N × M) Time',
  spaceComplexity: 'O(M) Space-Optimized',
  description: 'Counts the number of distinct subsequences of string s that equal string t. When characters match (s[i-1] == t[j-1]), the total ways sum the branch including s[i-1] (dp[i-1][j-1]) plus the branch excluding it (dp[i-1][j]).'
};

export const rendererType = 'dp-grid';

export const ideaMap = {
  title: 'Distinct Subsequences (DP-32)',
  nodes: [
    { id: 'root', label: 'Distinct Subsequences Counter', children: ['base-state', 'transition-branches', 'space-compression'] },
    { id: 'base-state', label: '1. Boundary Conditions', detail: 'dp[i][0] = 1 (Empty target formed by deleting all characters) | dp[0][j] = 0 for j > 0' },
    { id: 'transition-branches', label: '2. Recurrence Relation', children: ['match-branch', 'mismatch-branch'] },
    { id: 'match-branch', label: 'Match s[i-1] == t[j-1]', detail: 'dp[i][j] = dp[i-1][j-1] (use char) + dp[i-1][j] (skip char)' },
    { id: 'mismatch-branch', label: 'Mismatch s[i-1] != t[j-1]', detail: 'dp[i][j] = dp[i-1][j] (must skip char in source s)' },
    { id: 'space-compression', label: '3. 1D Array Optimization', detail: 'Traversing right-to-left (j from M down to 1) allows rolling 1D DP with O(M) space.' }
  ]
};

export const solutions = {
  cpp: `// C++ Distinct Subsequences
// Time: O(N * M) | Space: O(M)
#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    int numDistinct(string s, string t) {
        int n = s.size(), m = t.size();
        vector<unsigned long long> dp(m + 1, 0);
        dp[0] = 1; // Empty string t can always be formed 1 way

        for (int i = 1; i <= n; i++) {
            for (int j = m; j >= 1; j--) {
                if (s[i - 1] == t[j - 1]) {
                    dp[j] = dp[j] + dp[j - 1];
                }
            }
        }

        return dp[m];
    }
};`,
  python: `# Python 3 Distinct Subsequences
# Time: O(N * M) | Space: O(M)
class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        n, m = len(s), len(t)
        dp = [0] * (m + 1)
        dp[0] = 1

        for i in range(1, n + 1):
            for j in range(m, 0, -1):
                if s[i - 1] == t[j - 1]:
                    dp[j] = dp[j] + dp[j - 1]

        return dp[m]`,
  java: `// Java Distinct Subsequences
// Time: O(N * M) | Space: O(M)
class Solution {
    public int numDistinct(String s, String t) {
        int n = s.length(), m = t.length();
        double[] dp = new double[m + 1];
        dp[0] = 1;

        for (int i = 1; i <= n; i++) {
            for (int j = m; j >= 1; j--) {
                if (s.charAt(i - 1) == t.charAt(j - 1)) {
                    dp[j] = dp[j] + dp[j - 1];
                }
            }
        }

        return (int) dp[m];
    }
}`,
  javascript: `// JavaScript Distinct Subsequences
// Time: O(N * M) | Space: O(M)
var numDistinct = function(s, t) {
    const n = s.length, m = t.length;
    const dp = new Array(m + 1).fill(0);
    dp[0] = 1;

    for (let i = 1; i <= n; i++) {
        for (let j = m; j >= 1; j--) {
            if (s[i - 1] === t[j - 1]) {
                dp[j] = dp[j] + dp[j - 1];
            }
        }
    }

    return dp[m];
};`
};

export const steps = [
  {
    phase: 'SETUP',
    grid: [
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'r', 'a', 'b', 'b', 'b', 'i', 't'],
    colLabels: ['∅', 'r', 'a', 'b', 'b', 'i', 't'],
    activeCell: { r: 0, c: 0 },
    formula: 'dp[i][0] = 1 (Empty target t can always be formed 1 way)',
    action: 'Initialize grid for source s = "rabbbit" (rows) and target t = "rabbit" (columns).',
    explain: 'Column 0 is initialized to 1 because matching an empty target string t can always be achieved in exactly 1 way: by omitting all characters from the source prefix.',
    intuition: 'The empty target serves as the combinatorial base for every valid subsequence.',
    metrics: [
      { label: '|s|', value: 7 },
      { label: '|t|', value: 6 },
      { label: 'Base dp[i][0]', value: 1 }
    ]
  },
  {
    phase: 'ROW_1_R',
    grid: [
      [1, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'r', 'a', 'b', 'b', 'b', 'i', 't'],
    colLabels: ['∅', 'r', 'a', 'b', 'b', 'i', 't'],
    activeCell: { r: 1, c: 1 },
    dependencyCells: [{ r: 0, c: 0, label: 'diag=1' }, { r: 0, c: 1, label: 'top=0' }],
    formula: 's[0] == t[0] ("r" == "r") => dp[1][1] = dp[0][0] + dp[0][1] = 1 + 0 = 1',
    action: 'Process s[0] = "r": matches target t[0] = "r" at column 1.',
    explain: 'Match found! We sum the ways taking "r" (diagonal dp[0][0] = 1) and ignoring "r" (top dp[0][1] = 0). dp[1][1] = 1.',
    intuition: 'There is exactly 1 way to form prefix "r" so far.',
    metrics: [
      { label: 'Active Char', value: '"r"' },
      { label: 'Target Formed', value: '"r"' },
      { label: 'Ways', value: 1 }
    ]
  },
  {
    phase: 'ROW_2_A',
    grid: [
      [1, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'r', 'a', 'b', 'b', 'b', 'i', 't'],
    colLabels: ['∅', 'r', 'a', 'b', 'b', 'i', 't'],
    activeCell: { r: 2, c: 2 },
    dependencyCells: [{ r: 1, c: 1, label: 'diag=1' }, { r: 1, c: 2, label: 'top=0' }],
    formula: 's[1] == t[1] ("a" == "a") => dp[2][2] = dp[1][1] + dp[1][2] = 1 + 0 = 1',
    action: 'Process s[1] = "a": matches target t[1] = "a" at column 2.',
    explain: 'Characters match! dp[2][2] = diagonal (1) + top (0) = 1. Prefix "ra" is formed in 1 way.',
    intuition: 'Prefix "ra" locked in.',
    metrics: [
      { label: 'Active Char', value: '"a"' },
      { label: 'Target Formed', value: '"ra"' },
      { label: 'Ways', value: 1 }
    ]
  },
  {
    phase: 'ROW_3_FIRST_B',
    grid: [
      [1, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'r', 'a', 'b', 'b', 'b', 'i', 't'],
    colLabels: ['∅', 'r', 'a', 'b', 'b', 'i', 't'],
    activeCell: { r: 3, c: 3 },
    dependencyCells: [{ r: 2, c: 2, label: 'diag=1' }],
    formula: 's[2] == t[2] ("b" == "b") => dp[3][3] = dp[2][2] + dp[2][3] = 1 + 0 = 1',
    action: 'Process s[2] = first "b": matches target t[2] = "b".',
    explain: 'First "b" in source can form prefix "rab" in 1 way. Note that cell [3, 4] ("rabb") remains 0 because one "b" cannot satisfy two "b"s.',
    intuition: 'Single "b" cannot satisfy double "b" target requirement.',
    metrics: [
      { label: 'Active Char', value: 'b₁' },
      { label: 'Target "rab"', value: '1 way' }
    ]
  },
  {
    phase: 'ROW_4_SECOND_B',
    grid: [
      [1, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0],
      [1, 1, 1, 2, 1, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'r', 'a', 'b', 'b', 'b', 'i', 't'],
    colLabels: ['∅', 'r', 'a', 'b', 'b', 'i', 't'],
    activeCell: { r: 4, c: 3 },
    dependencyCells: [{ r: 3, c: 2, label: 'diag=1' }, { r: 3, c: 3, label: 'top=1' }],
    formula: 'dp[4][3] = dp[3][2] + dp[3][3] = 1 + 1 = 2 ways ("rab")',
    action: 'Process s[3] = second "b": 2 ways to form "rab", 1 way to form "rabb".',
    explain: 'At cell [4, 3] ("rab"): we can either use b₂ (diagonal = 1) or keep using b₁ (top = 1), giving 2 ways! At cell [4, 4] ("rabb"): using both b₁ and b₂ gives 1 way.',
    intuition: 'Alternative choices of duplicate characters begin branching.',
    metrics: [
      { label: 'Active Char', value: 'b₂' },
      { label: 'Ways for "rab"', value: 2 },
      { label: 'Ways for "rabb"', value: 1, highlight: true }
    ]
  },
  {
    phase: 'ROW_5_THIRD_B_CRITICAL',
    grid: [
      [1, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0],
      [1, 1, 1, 2, 1, 0, 0],
      [1, 1, 1, 3, 3, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'r', 'a', 'b', 'b', 'b', 'i', 't'],
    colLabels: ['∅', 'r', 'a', 'b', 'b', 'i', 't'],
    activeCell: { r: 5, c: 4 },
    dependencyCells: [{ r: 4, c: 3, label: 'diag=2' }, { r: 4, c: 4, label: 'top=1' }],
    formula: 'dp[5][4] = dp[4][3] + dp[4][4] = 2 + 1 = 3 ways to form "rabb" (C(3, 2) = 3)',
    action: 'Critical combinatorial step: 3 distinct ways to form "rabb" using three "b"s!',
    explain: 'At cell [5, 4] ("rabb"), matching b₃ can pair with either of the 2 prior ways to form "rab" (diagonal = 2) or we ignore b₃ (top = 1). Total ways = 2 + 1 = 3! This corresponds exactly to choosing 2 \'b\'s out of 3: C(3, 2) = 3.',
    intuition: 'Combinations C(3, 2) = 3 directly materialize in the DP table.',
    metrics: [
      { label: 'Active Char', value: 'b₃' },
      { label: 'Combinations', value: 'C(3, 2) = 3' },
      { label: 'Ways for "rabb"', value: 3, highlight: true }
    ]
  },
  {
    phase: 'ROW_6_I',
    grid: [
      [1, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0],
      [1, 1, 1, 2, 1, 0, 0],
      [1, 1, 1, 3, 3, 0, 0],
      [1, 1, 1, 3, 3, 3, 0],
      [1, 0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'r', 'a', 'b', 'b', 'b', 'i', 't'],
    colLabels: ['∅', 'r', 'a', 'b', 'b', 'i', 't'],
    activeCell: { r: 6, c: 5 },
    dependencyCells: [{ r: 5, c: 4, label: 'diag=3' }, { r: 5, c: 5, label: 'top=0' }],
    formula: 's[5] == t[4] ("i" == "i") => dp[6][5] = dp[5][4] + dp[5][5] = 3 + 0 = 3',
    action: 'Process s[5] = "i": matches target t[4] = "i" at column 5.',
    explain: 'Character "i" matches. We take diagonal dp[5][4] (3) + top (0) = 3 ways. Prefix "rabbi" is formed in 3 distinct ways.',
    intuition: 'The 3 branched combinations now carry over through character "i".',
    metrics: [
      { label: 'Active Char', value: '"i"' },
      { label: 'Target Formed', value: '"rabbi"' },
      { label: 'Ways', value: 3 }
    ]
  },
  {
    phase: 'ROW_7_T_TERMINAL',
    grid: [
      [1, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0],
      [1, 1, 1, 2, 1, 0, 0],
      [1, 1, 1, 3, 3, 0, 0],
      [1, 1, 1, 3, 3, 3, 0],
      [1, 1, 1, 3, 3, 3, 3]
    ],
    rowLabels: ['∅', 'r', 'a', 'b', 'b', 'b', 'i', 't'],
    colLabels: ['∅', 'r', 'a', 'b', 'b', 'i', 't'],
    activeCell: { r: 7, c: 6 },
    dependencyCells: [{ r: 6, c: 5, label: 'diag=3' }, { r: 6, c: 6, label: 'top=0' }],
    formula: 's[6] == t[5] ("t" == "t") => dp[7][6] = dp[6][5] + dp[6][6] = 3 + 0 = 3',
    action: 'Process terminal s[6] = "t": matches target t[5] = "t". Final answer = 3!',
    explain: 'Terminal match! Taking diagonal dp[6][5] = 3 + top dp[6][6] = 0 produces 3 distinct subsequences of "rabbit" within "rabbbit".',
    intuition: 'All target characters matched with 3 combinatorial paths.',
    metrics: [
      { label: 'Terminal Cell', value: '[7, 6]' },
      { label: 'Distinct Subseqs', value: 3, highlight: true }
    ]
  },
  {
    phase: 'COMBINATORIAL_BREAKDOWN',
    grid: [
      [1, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0],
      [1, 1, 1, 2, 1, 0, 0],
      [1, 1, 1, 3, 3, 0, 0],
      [1, 1, 1, 3, 3, 3, 0],
      [1, 1, 1, 3, 3, 3, 3]
    ],
    rowLabels: ['∅', 'r', 'a', 'b', 'b', 'b', 'i', 't'],
    colLabels: ['∅', 'r', 'a', 'b', 'b', 'i', 't'],
    activeCell: { r: 7, c: 6 },
    formula: 'Indices used: {0, 1, [2, 3], 5, 6}, {0, 1, [2, 4], 5, 6}, {0, 1, [3, 4], 5, 6}',
    action: 'Enumerate the 3 concrete subsequence occurrences.',
    explain: '1. ra[b₁ b₂]it (omitting b₃)\n2. ra[b₁ b₃]it (omitting b₂)\n3. ra[b₂ b₃]it (omitting b₁)\nEach of these 3 distinct index selections produces the exact word "rabbit".',
    intuition: 'Precise indexing confirms the table calculation.',
    metrics: [
      { label: 'Subseq 1', value: 'ra[b1 b2]it' },
      { label: 'Subseq 2', value: 'ra[b1 b3]it' },
      { label: 'Subseq 3', value: 'ra[b2 b3]it' }
    ]
  },
  {
    phase: 'COMPLETED',
    grid: [
      [1, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0],
      [1, 1, 1, 2, 1, 0, 0],
      [1, 1, 1, 3, 3, 0, 0],
      [1, 1, 1, 3, 3, 3, 0],
      [1, 1, 1, 3, 3, 3, 3]
    ],
    rowLabels: ['∅', 'r', 'a', 'b', 'b', 'b', 'i', 't'],
    colLabels: ['∅', 'r', 'a', 'b', 'b', 'i', 't'],
    activeCell: { r: 7, c: 6 },
    formula: 'Output: 3 | O(N × M) Time, O(M) 1D Space',
    action: 'Algorithm complete! Total distinct subsequences = 3.',
    explain: 'Using reverse 1D column iteration (from M down to 1), this algorithm runs in O(N × M) time with only O(M) additional memory.',
    intuition: 'Reverse 1D scan prevents overwriting dp[j-1] before it is used.',
    metrics: [
      { label: 'Source s', value: '"rabbbit"' },
      { label: 'Target t', value: '"rabbit"' },
      { label: 'Result', value: 3, highlight: true }
    ]
  }
];
