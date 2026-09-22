// DATA-ONLY — rendered by DpGridRenderer via rendererType

export const meta = {
  title: 'Longest Common Subsequence (DP-25)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N × M) Time',
  spaceComplexity: 'O(M) Space-Optimized',
  description: 'Finds the length of the longest subsequence present in both strings text1 and text2 in the same relative order. If characters match, dp[i][j] = 1 + dp[i-1][j-1]; otherwise take the maximum of excluding one character: max(dp[i-1][j], dp[i][j-1]).'
};

export const rendererType = 'dp-grid';

export const ideaMap = {
  title: 'Longest Common Subsequence (DP-25)',
  nodes: [
    { id: 'root', label: 'Longest Common Subsequence', children: ['state-def', 'transitions', 'space-optim'] },
    { id: 'state-def', label: '1. DP State Formulation', detail: 'dp[i][j] = length of LCS between text1[0..i-1] and text2[0..j-1]' },
    { id: 'transitions', label: '2. Recurrence Relation', children: ['match', 'mismatch'] },
    { id: 'match', label: 'Match text1[i-1] == text2[j-1]', detail: 'Character included: 1 + dp[i-1][j-1] (Diagonal jump)' },
    { id: 'mismatch', label: 'Mismatch', detail: 'Branching: max(dp[i-1][j], dp[i][j-1]) (Take best of top or left)' },
    { id: 'space-optim', label: '3. Rolling Row Compression', detail: 'Only row (i-1) is required to calculate row i => O(M) space.' }
  ]
};

export const solutions = {
  cpp: `// C++ Longest Common Subsequence
// Time: O(N * M) | Space: O(M)
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int n = text1.size(), m = text2.size();
        vector<int> prev(m + 1, 0), cur(m + 1, 0);

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (text1[i - 1] == text2[j - 1]) {
                    cur[j] = 1 + prev[j - 1];
                } else {
                    cur[j] = max(prev[j], cur[j - 1]);
                }
            }
            prev = cur;
        }

        return prev[m];
    }
};`,
  python: `# Python 3 Longest Common Subsequence
# Time: O(N * M) | Space: O(M)
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        n, m = len(text1), len(text2)
        prev = [0] * (m + 1)

        for i in range(1, n + 1):
            cur = [0] * (m + 1)
            for j in range(1, m + 1):
                if text1[i - 1] == text2[j - 1]:
                    cur[j] = 1 + prev[j - 1]
                else:
                    cur[j] = max(prev[j], cur[j - 1])
            prev = cur

        return prev[m]`,
  java: `// Java Longest Common Subsequence
// Time: O(N * M) | Space: O(M)
class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int n = text1.length(), m = text2.length();
        int[] prev = new int[m + 1];
        int[] cur = new int[m + 1];

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    cur[j] = 1 + prev[j - 1];
                } else {
                    cur[j] = Math.max(prev[j], cur[j - 1]);
                }
            }
            prev = cur.clone();
        }

        return prev[m];
    }
}`,
  javascript: `// JavaScript Longest Common Subsequence
// Time: O(N * M) | Space: O(M)
var longestCommonSubsequence = function(text1, text2) {
    const n = text1.length, m = text2.length;
    let prev = new Array(m + 1).fill(0);

    for (let i = 1; i <= n; i++) {
        const cur = new Array(m + 1).fill(0);
        for (let j = 1; j <= m; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                cur[j] = 1 + prev[j - 1];
            } else {
                cur[j] = Math.max(prev[j], cur[j - 1]);
            }
        }
        prev = cur;
    }

    return prev[m];
};`
};

export const steps = [
  {
    phase: 'SETUP',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'a', 'c', 'e'],
    colLabels: ['∅', 'a', 'b', 'c', 'd', 'e'],
    activeCell: { r: 0, c: 0 },
    formula: 'dp[i][j] = 0 when i = 0 or j = 0',
    action: 'Initialize DP table for text1 = "ace" (rows) and text2 = "abcde" (columns).',
    explain: 'dp[i][j] represents the length of the Longest Common Subsequence between text1[0..i-1] and text2[0..j-1]. Empty prefixes match with length 0.',
    intuition: 'Subsequence preserves relative ordering without needing contiguous adjacency.',
    metrics: [
      { label: '|text1|', value: 3 },
      { label: '|text2|', value: 5 },
      { label: 'Current LCS', value: 0 }
    ]
  },
  {
    phase: 'ROW_1_MATCH',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'a', 'c', 'e'],
    colLabels: ['∅', 'a', 'b', 'c', 'd', 'e'],
    activeCell: { r: 1, c: 1 },
    dependencyCells: [{ r: 0, c: 0, label: 'diag' }],
    formula: 'text1[0] == text2[0] ("a" == "a") => dp[1][1] = 1 + dp[0][0] = 1',
    action: 'Process text1[0] = "a": matches text2[0] = "a" at column 1.',
    explain: 'At cell [1, 1], characters match. We take diagonal cell dp[0][0] + 1 = 1. Subsequence "a" of length 1 is formed.',
    intuition: 'Matching characters always step diagonally to extend previous subsequence length.',
    metrics: [
      { label: 'Active Char', value: '"a"' },
      { label: 'dp[1][1]', value: 1, highlight: true }
    ]
  },
  {
    phase: 'ROW_1_PROPAGATE',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'a', 'c', 'e'],
    colLabels: ['∅', 'a', 'b', 'c', 'd', 'e'],
    activeCell: { r: 1, c: 5 },
    formula: 'text1[0] mismatch with subsequent chars => dp[1][j] = max(dp[0][j], dp[1][j-1]) = 1',
    action: 'Propagate length 1 across remaining columns in row 1.',
    explain: 'Once "a" is matched, any longer prefix of text2 ("ab", "abc", "abcd", "abcde") still contains "a", so row 1 fills with 1.',
    intuition: 'Subsequence matches are monotonically non-decreasing along rows and columns.',
    metrics: [
      { label: 'Subsequence', value: '"a"' },
      { label: 'Row 1 Max', value: 1 }
    ]
  },
  {
    phase: 'ROW_2_COL_1_2',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1],
      [0, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'a', 'c', 'e'],
    colLabels: ['∅', 'a', 'b', 'c', 'd', 'e'],
    activeCell: { r: 2, c: 2 },
    dependencyCells: [{ r: 1, c: 2, label: 'top=1' }, { r: 2, c: 1, label: 'left=1' }],
    formula: 'text1[1] ("c") != text2[1] ("b") => dp[2][2] = max(dp[1][2], dp[2][1]) = 1',
    action: 'Process text1[1] = "c": compares with "a" and "b" (no matches).',
    explain: 'Neither "a" nor "b" matches "c". Values at [2, 1] and [2, 2] take the maximum of top and left neighbors: max(1, 1) = 1.',
    intuition: 'Prefix "ac" against "ab" only shares subsequence "a".',
    metrics: [
      { label: 'Active Char', value: '"c"' },
      { label: 'LCS so far', value: 1 }
    ]
  },
  {
    phase: 'ROW_2_MATCH_C',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1],
      [0, 1, 1, 2, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'a', 'c', 'e'],
    colLabels: ['∅', 'a', 'b', 'c', 'd', 'e'],
    activeCell: { r: 2, c: 3 },
    dependencyCells: [{ r: 1, c: 2, label: 'diag=1' }],
    formula: 'text1[1] == text2[2] ("c" == "c") => dp[2][3] = 1 + dp[1][2] = 2',
    action: 'Process text1[1] = "c": matches text2[2] = "c" at column 3!',
    explain: 'At cell [2, 3], character "c" matches. Taking diagonal neighbor dp[1][2] (1) + 1 yields 2! Subsequence "ac" of length 2 is formed.',
    intuition: 'Common subsequence extends from "a" to "ac".',
    metrics: [
      { label: 'Match Char', value: '"c"' },
      { label: 'dp[2][3]', value: 2, highlight: true }
    ]
  },
  {
    phase: 'ROW_2_PROPAGATE',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1],
      [0, 1, 1, 2, 2, 2],
      [0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'a', 'c', 'e'],
    colLabels: ['∅', 'a', 'b', 'c', 'd', 'e'],
    activeCell: { r: 2, c: 5 },
    formula: 'Propagate dp[2][3] = 2 to cols 4 and 5 via max(top, left)',
    action: 'Complete row 2: cells [2, 4] and [2, 5] carry over length 2.',
    explain: 'Remaining characters "d" and "e" in text2 mismatch "c". The optimal subsequence "ac" is preserved across columns 4 and 5.',
    intuition: 'LCS("ac", "abcde") is confirmed as 2.',
    metrics: [
      { label: 'Subsequence', value: '"ac"' },
      { label: 'Row 2 Max', value: 2 }
    ]
  },
  {
    phase: 'ROW_3_SEARCH',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1],
      [0, 1, 1, 2, 2, 2],
      [0, 1, 1, 2, 2, 0]
    ],
    rowLabels: ['∅', 'a', 'c', 'e'],
    colLabels: ['∅', 'a', 'b', 'c', 'd', 'e'],
    activeCell: { r: 3, c: 4 },
    dependencyCells: [{ r: 2, c: 4, label: 'top=2' }],
    formula: 'text1[2] ("e") mismatches cols 1..4 => dp[3][1..4] = 1, 1, 2, 2',
    action: 'Process text1[2] = "e": evaluate columns 1 through 4.',
    explain: 'No matches occur with "a", "b", "c", or "d". Each cell inherits the maximum from its top neighbor, holding value 2.',
    intuition: 'Waiting for terminal match "e".',
    metrics: [
      { label: 'Active Char', value: '"e"' },
      { label: 'dp[3][4]', value: 2 }
    ]
  },
  {
    phase: 'ROW_3_MATCH_E',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1],
      [0, 1, 1, 2, 2, 2],
      [0, 1, 1, 2, 2, 3]
    ],
    rowLabels: ['∅', 'a', 'c', 'e'],
    colLabels: ['∅', 'a', 'b', 'c', 'd', 'e'],
    activeCell: { r: 3, c: 5 },
    dependencyCells: [{ r: 2, c: 4, label: 'diag=2' }],
    formula: 'text1[2] == text2[4] ("e" == "e") => dp[3][5] = 1 + dp[2][4] = 3',
    action: 'Final match! text1[2] == text2[4] ("e" == "e") at terminal cell [3, 5].',
    explain: 'At cell [3, 5], both strings end with "e". Taking 1 + dp[2][4] (1 + 2) yields 3! Subsequence "ace" has length 3.',
    intuition: 'Complete match of all characters in "ace" inside "abcde".',
    metrics: [
      { label: 'Terminal Match', value: '"e"' },
      { label: 'dp[3][5]', value: 3, highlight: true }
    ]
  },
  {
    phase: 'COMPLETED',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1],
      [0, 1, 1, 2, 2, 2],
      [0, 1, 1, 2, 2, 3]
    ],
    rowLabels: ['∅', 'a', 'c', 'e'],
    colLabels: ['∅', 'a', 'b', 'c', 'd', 'e'],
    activeCell: { r: 3, c: 5 },
    formula: 'Output: 3 | Longest Common Subsequence = "ace"',
    action: 'Algorithm complete! Terminal cell dp[3][5] = 3.',
    explain: 'The LCS between "ace" and "abcde" has length 3. The matched subsequence is "ace" (found at indices 0, 2, 4 in "abcde"). Can be computed with O(M) space using two rolling rows.',
    intuition: 'Optimal O(N × M) dynamic programming solution.',
    metrics: [
      { label: 'text1', value: '"ace"' },
      { label: 'text2', value: '"abcde"' },
      { label: 'LCS Length', value: 3, highlight: true },
      { label: 'LCS String', value: '"ace"' }
    ]
  }
];
