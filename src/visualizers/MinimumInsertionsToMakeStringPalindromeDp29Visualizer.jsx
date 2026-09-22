// DATA-ONLY — rendered by DpGridRenderer via rendererType

export const meta = {
  title: 'Minimum Insertions to Make String Palindrome (DP-29)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N²) Time',
  spaceComplexity: 'O(N) Space-Optimized',
  description: 'Calculates the minimum insertions required to convert a string into a palindrome. By finding the Longest Palindromic Subsequence (LPS = LCS(s, reverse(s))), all characters outside the LPS must be mirrored: Min Insertions = N - LPS(s).'
};

export const rendererType = 'dp-grid';

export const ideaMap = {
  title: 'Minimum Insertions to Make String Palindrome (DP-29)',
  nodes: [
    { id: 'root', label: 'Palindrome Insertion Minimizer', children: ['reduction', 'lps-calc', 'result-rule'] },
    { id: 'reduction', label: '1. Mathematical Reduction', detail: 'To make s a palindrome with fewest insertions, keep as many palindromic characters intact as possible (LPS).' },
    { id: 'lps-calc', label: '2. LPS as LCS(s, reverse(s))', children: ['grid-tab', 'recurrence'] },
    { id: 'grid-tab', label: 'Grid Tabulation', detail: 'Compare string s against its reversal t. Matches step diagonally.' },
    { id: 'recurrence', label: 'Recurrence', detail: 's[i-1] == t[j-1] => 1 + dp[i-1][j-1], else max(dp[i-1][j], dp[i][j-1])' },
    { id: 'result-rule', label: '3. Final Formula', detail: 'Min Insertions = Length(s) - LPS(s)' }
  ]
};

export const solutions = {
  cpp: `// C++ Minimum Insertions to Make String Palindrome
// Time: O(N^2) | Space: O(N)
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minInsertions(string s) {
        string t = s;
        reverse(t.begin(), t.end());
        int n = s.size();

        vector<int> prev(n + 1, 0), cur(n + 1, 0);

        // Compute LPS(s) = LCS(s, reverse(s))
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (s[i - 1] == t[j - 1]) cur[j] = 1 + prev[j - 1];
                else cur[j] = max(prev[j], cur[j - 1]);
            }
            prev = cur;
        }

        int lps = prev[n];
        return n - lps;
    }
};`,
  python: `# Python 3 Minimum Insertions to Make String Palindrome
# Time: O(N^2) | Space: O(N)
class Solution:
    def minInsertions(self, s: str) -> int:
        t = s[::-1]
        n = len(s)
        prev = [0] * (n + 1)

        for i in range(1, n + 1):
            cur = [0] * (n + 1)
            for j in range(1, n + 1):
                if s[i - 1] == t[j - 1]:
                    cur[j] = 1 + prev[j - 1]
                else:
                    cur[j] = max(prev[j], cur[j - 1])
            prev = cur

        return n - prev[n]`,
  java: `// Java Minimum Insertions to Make String Palindrome
// Time: O(N^2) | Space: O(N)
class Solution {
    public int minInsertions(String s) {
        String t = new StringBuilder(s).reverse().toString();
        int n = s.length();
        int[] prev = new int[n + 1];
        int[] cur = new int[n + 1];

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (s.charAt(i - 1) == t.charAt(j - 1)) {
                    cur[j] = 1 + prev[j - 1];
                } else {
                    cur[j] = Math.max(prev[j], cur[j - 1]);
                }
            }
            prev = cur.clone();
        }

        return n - prev[n];
    }
}`,
  javascript: `// JavaScript Minimum Insertions to Make String Palindrome
// Time: O(N^2) | Space: O(N)
var minInsertions = function(s) {
    const t = s.split('').reverse().join('');
    const n = s.length;
    let prev = new Array(n + 1).fill(0);

    for (let i = 1; i <= n; i++) {
        const cur = new Array(n + 1).fill(0);
        for (let j = 1; j <= n; j++) {
            if (s[i - 1] === t[j - 1]) {
                cur[j] = 1 + prev[j - 1];
            } else {
                cur[j] = Math.max(prev[j], cur[j - 1]);
            }
        }
        prev = cur;
    }

    return n - prev[n];
};`
};

export const steps = [
  {
    phase: 'SETUP',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'm', 'b', 'a', 'd', 'm'],
    colLabels: ['∅', 'm', 'd', 'a', 'b', 'm'],
    activeCell: { r: 0, c: 0 },
    formula: 'Min Insertions = N - LPS(s) = N - LCS(s, reverse(s))',
    action: 'Initialize LPS computation between s = "mbadm" and reverse(s) = "mdabm".',
    explain: 'To make string s palindromic with the fewest insertions, we must keep its Longest Palindromic Subsequence intact and mirror the remaining characters. LPS(s) equals LCS between s and its reverse.',
    intuition: 'Every character already participating in the palindrome does not need to be duplicated.',
    metrics: [
      { label: 'String s', value: '"mbadm"' },
      { label: 'Reverse t', value: '"mdabm"' },
      { label: 'Length N', value: 5 }
    ]
  },
  {
    phase: 'FILL_ROW_1',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'm', 'b', 'a', 'd', 'm'],
    colLabels: ['∅', 'm', 'd', 'a', 'b', 'm'],
    activeCell: { r: 1, c: 1 },
    dependencyCells: [{ r: 0, c: 0, label: 'diag' }],
    formula: 's[0] == t[0] ("m" == "m") => dp[1][1] = 1 + dp[0][0] = 1',
    action: 'Process s[0] = "m": immediate match with t[0] = "m".',
    explain: 'Matching "m" produces length 1. All remaining cells in row 1 inherit 1 because "m" can match any prefix containing index 0.',
    intuition: 'First palindromic anchor character is found.',
    metrics: [
      { label: 'Active Char', value: '"m"' },
      { label: 'dp[1][1]', value: 1 }
    ]
  },
  {
    phase: 'FILL_ROW_2',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 2, 2],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'm', 'b', 'a', 'd', 'm'],
    colLabels: ['∅', 'm', 'd', 'a', 'b', 'm'],
    activeCell: { r: 2, c: 4 },
    dependencyCells: [{ r: 1, c: 3, label: 'diag' }],
    formula: 's[1] == t[3] ("b" == "b") => dp[2][4] = 1 + dp[1][3] = 2',
    action: 'Process s[1] = "b": matches t[3] = "b" at column 4.',
    explain: 'At cell [2, 4], "b" matches "b". Diagonal value dp[1][3] is 1, so dp[2][4] = 1 + 1 = 2! Subsequence "mb" has length 2.',
    intuition: 'Subsequence length increases to 2.',
    metrics: [
      { label: 'Active Char', value: '"b"' },
      { label: 'dp[2][4]', value: 2, highlight: true }
    ]
  },
  {
    phase: 'FILL_ROW_3',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 2, 2],
      [0, 1, 1, 2, 2, 2],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'm', 'b', 'a', 'd', 'm'],
    colLabels: ['∅', 'm', 'd', 'a', 'b', 'm'],
    activeCell: { r: 3, c: 3 },
    dependencyCells: [{ r: 2, c: 2, label: 'diag' }],
    formula: 's[2] == t[2] ("a" == "a") => dp[3][3] = 1 + dp[2][2] = 2',
    action: 'Process s[2] = "a": matches center character t[2] = "a".',
    explain: 'Center character "a" matches at column 3, yielding subsequence "ma" of length 2.',
    intuition: 'Center characters often serve as the palindromic axis.',
    metrics: [
      { label: 'Active Char', value: '"a"' },
      { label: 'dp[3][3]', value: 2 }
    ]
  },
  {
    phase: 'FILL_ROW_4',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 2, 2],
      [0, 1, 1, 2, 2, 2],
      [0, 1, 2, 2, 2, 2],
      [0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'm', 'b', 'a', 'd', 'm'],
    colLabels: ['∅', 'm', 'd', 'a', 'b', 'm'],
    activeCell: { r: 4, c: 2 },
    dependencyCells: [{ r: 3, c: 1, label: 'diag' }],
    formula: 's[3] == t[1] ("d" == "d") => dp[4][2] = 1 + dp[3][1] = 2',
    action: 'Process s[3] = "d": matches t[1] = "d" at column 2.',
    explain: 'Character "d" matches at column 2. Maximum subsequence length remains 2 across this row.',
    intuition: 'Alternative palindromic prefix candidate "md".',
    metrics: [
      { label: 'Active Char', value: '"d"' },
      { label: 'dp[4][2]', value: 2 }
    ]
  },
  {
    phase: 'FILL_ROW_5_TERMINAL',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 2, 2],
      [0, 1, 1, 2, 2, 2],
      [0, 1, 2, 2, 2, 2],
      [0, 1, 2, 2, 2, 3]
    ],
    rowLabels: ['∅', 'm', 'b', 'a', 'd', 'm'],
    colLabels: ['∅', 'm', 'd', 'a', 'b', 'm'],
    activeCell: { r: 5, c: 5 },
    dependencyCells: [{ r: 4, c: 4, label: 'diag' }],
    formula: 's[4] == t[4] ("m" == "m") => dp[5][5] = 1 + dp[4][4] = 3',
    action: 'Process terminal s[4] = "m": matches t[4] = "m". Final LPS = 3!',
    explain: 'Terminal match! Taking 1 + dp[4][4] (1 + 2) yields 3. The Longest Palindromic Subsequence has length 3 ("mam" or "mdm" or "mbm").',
    intuition: 'LPS found! 3 characters are already in palindrome symmetry.',
    metrics: [
      { label: 'Terminal Cell', value: '[5, 5]' },
      { label: 'LPS Length', value: 3, highlight: true }
    ]
  },
  {
    phase: 'INSERTION_CALCULATION',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 2, 2],
      [0, 1, 1, 2, 2, 2],
      [0, 1, 2, 2, 2, 2],
      [0, 1, 2, 2, 2, 3]
    ],
    rowLabels: ['∅', 'm', 'b', 'a', 'd', 'm'],
    colLabels: ['∅', 'm', 'd', 'a', 'b', 'm'],
    activeCell: { r: 5, c: 5 },
    formula: 'Min Insertions = N - LPS = 5 - 3 = 2',
    action: 'Subtract LPS length from total string length to determine minimum insertions.',
    explain: 'Total length N is 5. LPS is 3 ("m...a...m"). The 2 characters outside the LPS ("b" and "d") lack symmetrical mirrors. We only need to insert their mirrors.',
    intuition: 'Each unmirrored character requires exactly 1 insertion on the opposing side.',
    metrics: [
      { label: 'Total N', value: 5 },
      { label: 'LPS(s)', value: 3 },
      { label: 'Insertions Needed', value: 2, highlight: true }
    ]
  },
  {
    phase: 'COMPLETED',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 2, 2],
      [0, 1, 1, 2, 2, 2],
      [0, 1, 2, 2, 2, 2],
      [0, 1, 2, 2, 2, 3]
    ],
    rowLabels: ['∅', 'm', 'b', 'a', 'd', 'm'],
    colLabels: ['∅', 'm', 'd', 'a', 'b', 'm'],
    activeCell: { r: 5, c: 5 },
    formula: 'Output: 2 | Resulting Palindrome: "mbdadbm"',
    action: 'Algorithm finished! Minimum insertions = 2.',
    explain: 'By inserting \'d\' and \'b\' into appropriate positions, we construct the palindrome "mbdadbm". Minimum insertions needed is 2.',
    intuition: 'Optimal O(N²) time solution using O(N) space.',
    metrics: [
      { label: 'Original', value: '"mbadm"' },
      { label: 'Palindrome', value: '"mbdadbm"' },
      { label: 'Min Insertions', value: 2, highlight: true }
    ]
  }
];
