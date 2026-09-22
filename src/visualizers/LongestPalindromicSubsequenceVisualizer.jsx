// DATA-ONLY — rendered by DpGridRenderer via rendererType

export const meta = {
  title: 'Longest Palindromic Subsequence (DP-28)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N²) Time',
  spaceComplexity: 'O(N) Space-Optimized',
  description: 'Finds the length of the longest palindromic subsequence in a string s. Uses the mathematical principle that LPS(s) is equivalent to the Longest Common Subsequence between s and its reversed copy reverse(s).'
};

export const rendererType = 'dp-grid';

export const ideaMap = {
  title: 'Longest Palindromic Subsequence (DP-28)',
  nodes: [
    { id: 'root', label: 'Longest Palindromic Subsequence', children: ['reduction-identity', 'tabulation-model', 'invariants'] },
    { id: 'reduction-identity', label: '1. Reversal Equivalence', detail: 'A palindrome reads the same forwards and backwards => LPS(s) == LCS(s, reverse(s)).' },
    { id: 'tabulation-model', label: '2. 2D DP State Machine', children: ['char-match', 'char-mismatch'] },
    { id: 'char-match', label: 'Character Match', detail: 's[i-1] == t[j-1] => dp[i][j] = 1 + dp[i-1][j-1]' },
    { id: 'char-mismatch', label: 'Character Mismatch', detail: 'dp[i][j] = max(dp[i-1][j], dp[i][j-1])' },
    { id: 'invariants', label: '3. Space Optimization', detail: 'Only the previous and current rows are required during calculation (O(N) memory).' }
  ]
};

export const solutions = {
  cpp: `// C++ Longest Palindromic Subsequence
// Time: O(N^2) | Space: O(N)
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int longestPalindromeSubseq(string s) {
        string t = s;
        reverse(t.begin(), t.end());
        int n = s.size();

        vector<int> prev(n + 1, 0), cur(n + 1, 0);

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (s[i - 1] == t[j - 1]) {
                    cur[j] = 1 + prev[j - 1];
                } else {
                    cur[j] = max(prev[j], cur[j - 1]);
                }
            }
            prev = cur;
        }

        return prev[n];
    }
};`,
  python: `# Python 3 Longest Palindromic Subsequence
# Time: O(N^2) | Space: O(N)
class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
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

        return prev[n]`,
  java: `// Java Longest Palindromic Subsequence
// Time: O(N^2) | Space: O(N)
class Solution {
    public int longestPalindromeSubseq(String s) {
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

        return prev[n];
    }
}`,
  javascript: `// JavaScript Longest Palindromic Subsequence
// Time: O(N^2) | Space: O(N)
var longestPalindromeSubseq = function(s) {
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

    return prev[n];
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
    rowLabels: ['∅', 'b', 'b', 'b', 'a', 'b'],
    colLabels: ['∅', 'b', 'a', 'b', 'b', 'b'],
    activeCell: { r: 0, c: 0 },
    formula: 'LPS(s) = LCS(s, reverse(s)) where s = "bbbab", t = "babbb"',
    action: 'Initialize DP matrix to find Longest Common Subsequence of s and its reversal.',
    explain: 'Because a palindromic string reads identically from front-to-back and back-to-front, any palindromic subsequence of s must also appear in reverse(s). Thus, the maximum palindrome length is precisely LCS(s, reverse(s)).',
    intuition: 'Converting LPS to LCS allows reusing standard 2D dynamic programming.',
    metrics: [
      { label: 'String s', value: '"bbbab"' },
      { label: 'Reverse t', value: '"babbb"' },
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
    rowLabels: ['∅', 'b', 'b', 'b', 'a', 'b'],
    colLabels: ['∅', 'b', 'a', 'b', 'b', 'b'],
    activeCell: { r: 1, c: 1 },
    dependencyCells: [{ r: 0, c: 0, label: 'diag' }],
    formula: 's[0] == t[0] ("b" == "b") => dp[1][1] = 1 + dp[0][0] = 1',
    action: 'Process s[0] = "b": immediate match at column 1 ("b").',
    explain: 'At cell [1, 1], character "b" matches immediately. The diagonal base is 0, so dp[1][1] becomes 1. The rest of row 1 propagates 1.',
    intuition: 'A single character palindrome has length 1.',
    metrics: [
      { label: 'Active Char', value: 's[0]: "b"' },
      { label: 'Row 1 Max', value: 1 }
    ]
  },
  {
    phase: 'FILL_ROW_2',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1],
      [0, 1, 1, 2, 2, 2],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'b', 'b', 'b', 'a', 'b'],
    colLabels: ['∅', 'b', 'a', 'b', 'b', 'b'],
    activeCell: { r: 2, c: 3 },
    dependencyCells: [{ r: 1, c: 2, label: 'diag' }],
    formula: 's[1] == t[2] ("b" == "b") => dp[2][3] = 1 + dp[1][2] = 2',
    action: 'Process s[1] = "b": matches column 3 ("b"). Length becomes 2.',
    explain: 'At cell [2, 3], matching character "b" adds 1 to diagonal cell dp[1][2] (1), yielding length 2. Palindrome "bb" is formed.',
    intuition: 'Two matching characters from opposite ends extend the palindrome length to 2.',
    metrics: [
      { label: 'Active Char', value: 's[1]: "b"' },
      { label: 'LPS so far', value: 2, highlight: true }
    ]
  },
  {
    phase: 'FILL_ROW_3',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1],
      [0, 1, 1, 2, 2, 2],
      [0, 1, 1, 2, 3, 3],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'b', 'b', 'b', 'a', 'b'],
    colLabels: ['∅', 'b', 'a', 'b', 'b', 'b'],
    activeCell: { r: 3, c: 4 },
    dependencyCells: [{ r: 2, c: 3, label: 'diag' }],
    formula: 's[2] == t[3] ("b" == "b") => dp[3][4] = 1 + dp[2][3] = 3',
    action: 'Process s[2] = "b": matches column 4 ("b"). Length becomes 3.',
    explain: 'At cell [3, 4], "b" matches "b". Taking 1 + dp[2][3] (1 + 2) yields 3! A 3-character palindrome ("bbb") is valid.',
    intuition: 'Subsequence length increases to 3.',
    metrics: [
      { label: 'Active Char', value: 's[2]: "b"' },
      { label: 'dp[3][4]', value: 3, highlight: true }
    ]
  },
  {
    phase: 'FILL_ROW_4',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1],
      [0, 1, 1, 2, 2, 2],
      [0, 1, 1, 2, 3, 3],
      [0, 1, 2, 2, 3, 3],
      [0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'b', 'b', 'b', 'a', 'b'],
    colLabels: ['∅', 'b', 'a', 'b', 'b', 'b'],
    activeCell: { r: 4, c: 2 },
    dependencyCells: [{ r: 3, c: 1, label: 'diag' }],
    formula: 's[3] == t[1] ("a" == "a") => dp[4][2] = 1 + dp[3][1] = 2',
    action: 'Process s[3] = "a": matches column 2 ("a").',
    explain: 'At cell [4, 2], character "a" matches. But later cells in this row inherit the higher score 3 from row 3 (max(dp[3][j], dp[4][j-1]) = 3).',
    intuition: 'Choosing "a" yields a shorter subsequence than continuing with multiple "b"s.',
    metrics: [
      { label: 'Active Char', value: 's[3]: "a"' },
      { label: 'Row 4 Max', value: 3 }
    ]
  },
  {
    phase: 'FILL_ROW_5_TERMINAL',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1],
      [0, 1, 1, 2, 2, 2],
      [0, 1, 1, 2, 3, 3],
      [0, 1, 2, 2, 3, 3],
      [0, 1, 2, 3, 3, 4]
    ],
    rowLabels: ['∅', 'b', 'b', 'b', 'a', 'b'],
    colLabels: ['∅', 'b', 'a', 'b', 'b', 'b'],
    activeCell: { r: 5, c: 5 },
    dependencyCells: [{ r: 4, c: 4, label: 'diag' }],
    formula: 's[4] == t[4] ("b" == "b") => dp[5][5] = 1 + dp[4][4] = 4',
    action: 'Process terminal s[4] = "b": matches t[4] = "b". Terminal cell [5, 5] = 4!',
    explain: 'Final diagonal match! s[4] matches t[4]. 1 + dp[4][4] = 1 + 3 = 4. The Longest Palindromic Subsequence has length 4.',
    intuition: 'All four "b" characters in "bbbab" form the optimal palindromic subsequence.',
    metrics: [
      { label: 'Terminal Cell', value: '[5, 5]' },
      { label: 'Max LPS', value: 4, highlight: true }
    ]
  },
  {
    phase: 'BACKTRACK_TRACE',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1],
      [0, 1, 1, 2, 2, 2],
      [0, 1, 1, 2, 3, 3],
      [0, 1, 2, 2, 3, 3],
      [0, 1, 2, 3, 3, 4]
    ],
    rowLabels: ['∅', 'b', 'b', 'b', 'a', 'b'],
    colLabels: ['∅', 'b', 'a', 'b', 'b', 'b'],
    activeCell: { r: 5, c: 5 },
    dependencyCells: [{ r: 4, c: 4, label: 'diag' }, { r: 3, c: 3, label: 'diag' }, { r: 2, c: 2, label: 'diag' }],
    formula: 'Diagonal jumps at indices (5, 5) -> (4, 4) -> (3, 3) -> (2, 2) extract "bbbb"',
    action: 'Reconstruct subsequence by tracing diagonal matching arrows backward.',
    explain: 'Stepping diagonally through matching cells collects four "b" characters. String "a" is bypassed as it does not contribute to the maximal palindrome.',
    intuition: 'The 4 "b" characters are at original indices 0, 1, 2, and 4 in "bbbab".',
    metrics: [
      { label: 'Extracted Subseq', value: '"bbbb"' },
      { label: 'Characters', value: 4 }
    ]
  },
  {
    phase: 'COMPLETED',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1],
      [0, 1, 1, 2, 2, 2],
      [0, 1, 1, 2, 3, 3],
      [0, 1, 2, 2, 3, 3],
      [0, 1, 2, 3, 3, 4]
    ],
    rowLabels: ['∅', 'b', 'b', 'b', 'a', 'b'],
    colLabels: ['∅', 'b', 'a', 'b', 'b', 'b'],
    activeCell: { r: 5, c: 5 },
    formula: 'Output: 4 | Subsequence: "b-b-b-[a]-b" ➔ "bbbb"',
    action: 'Algorithm complete! Longest Palindromic Subsequence length = 4.',
    explain: 'Resulting length is 4. The optimal subsequence "bbbb" is formed by omitting index 3 ("a"). Computes in O(N²) time and can run in O(N) space using two rolling rows.',
    intuition: 'Optimal LPS identified via LCS reduction.',
    metrics: [
      { label: 'Input String', value: '"bbbab"' },
      { label: 'LPS Length', value: 4, highlight: true },
      { label: 'Time Complexity', value: 'O(N²)' }
    ]
  }
];
