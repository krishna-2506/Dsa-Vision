// DATA-ONLY — rendered by DpGridRenderer via rendererType

export const meta = {
  title: 'Longest Common Substring (DP-27)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N × M) Time',
  spaceComplexity: 'O(M) Space-Optimized',
  description: 'Finds the length of the longest contiguous substring common to both text1 and text2. Unlike Longest Common Subsequence, characters must be strictly adjacent; any mismatch immediately resets the streak in that cell to 0.'
};

export const rendererType = 'dp-grid';

export const ideaMap = {
  title: 'Longest Common Substring (DP-27)',
  nodes: [
    { id: 'root', label: 'Longest Common Substring', children: ['contiguity-rule', 'recurrence', 'global-max'] },
    { id: 'contiguity-rule', label: '1. Contiguity Invariant', detail: 'Characters must form an unbroken contiguous block in both strings.' },
    { id: 'recurrence', label: '2. DP Transition Rule', children: ['match-streak', 'mismatch-reset'] },
    { id: 'match-streak', label: 'Match text1[i-1] == text2[j-1]', detail: 'dp[i][j] = 1 + dp[i-1][j-1]' },
    { id: 'mismatch-reset', label: 'Mismatch text1[i-1] != text2[j-1]', detail: 'dp[i][j] = 0 (Contiguity broken, streak resets!)' },
    { id: 'global-max', label: '3. Max Over All Cells', detail: 'Answer is max(dp[i][j]) across all (i, j), not necessarily dp[N][M].' }
  ]
};

export const solutions = {
  cpp: `// C++ Longest Common Substring
// Time: O(N * M) | Space: O(M)
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int longestCommonSubstring(string text1, string text2) {
        int n = text1.size(), m = text2.size();
        vector<int> prev(m + 1, 0);
        int maxLen = 0;

        for (int i = 1; i <= n; i++) {
            vector<int> cur(m + 1, 0);
            for (int j = 1; j <= m; j++) {
                if (text1[i - 1] == text2[j - 1]) {
                    cur[j] = 1 + prev[j - 1];
                    maxLen = max(maxLen, cur[j]);
                } else {
                    cur[j] = 0; // Streak severed
                }
            }
            prev = cur;
        }

        return maxLen;
    }
};`,
  python: `# Python 3 Longest Common Substring
# Time: O(N * M) | Space: O(M)
class Solution:
    def longestCommonSubstring(self, text1: str, text2: str) -> int:
        n, m = len(text1), len(text2)
        prev = [0] * (m + 1)
        max_len = 0

        for i in range(1, n + 1):
            cur = [0] * (m + 1)
            for j in range(1, m + 1):
                if text1[i - 1] == text2[j - 1]:
                    cur[j] = 1 + prev[j - 1]
                    max_len = max(max_len, cur[j])
                else:
                    cur[j] = 0
            prev = cur

        return max_len`,
  java: `// Java Longest Common Substring
// Time: O(N * M) | Space: O(M)
class Solution {
    public int longestCommonSubstring(String text1, String text2) {
        int n = text1.length(), m = text2.length();
        int[] prev = new int[m + 1];
        int maxLen = 0;

        for (int i = 1; i <= n; i++) {
            int[] cur = new int[m + 1];
            for (int j = 1; j <= m; j++) {
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    cur[j] = 1 + prev[j - 1];
                    maxLen = Math.max(maxLen, cur[j]);
                } else {
                    cur[j] = 0;
                }
            }
            prev = cur;
        }

        return maxLen;
    }
}`,
  javascript: `// JavaScript Longest Common Substring
// Time: O(N * M) | Space: O(M)
var longestCommonSubstring = function(text1, text2) {
    const n = text1.length, m = text2.length;
    let prev = new Array(m + 1).fill(0);
    let maxLen = 0;

    for (let i = 1; i <= n; i++) {
        const cur = new Array(m + 1).fill(0);
        for (let j = 1; j <= m; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                cur[j] = 1 + prev[j - 1];
                maxLen = Math.max(maxLen, cur[j]);
            } else {
                cur[j] = 0;
            }
        }
        prev = cur;
    }

    return maxLen;
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
    rowLabels: ['∅', 'a', 'b', 'c', 'd', 'e'],
    colLabels: ['∅', 'a', 'b', 'f', 'd', 'e'],
    activeCell: { r: 0, c: 0 },
    formula: 'Match: dp[i][j] = 1 + dp[i-1][j-1] | Mismatch: dp[i][j] = 0',
    action: 'Initialize grid for text1 = "abcde" (rows) and text2 = "abfde" (columns).',
    explain: 'dp[i][j] represents the length of the common contiguous substring ending exactly at text1[i-1] and text2[j-1]. If characters mismatch, the contiguous streak breaks and drops to 0.',
    intuition: 'Substrings cannot skip characters like subsequences do.',
    metrics: [
      { label: '|text1|', value: 5 },
      { label: '|text2|', value: 5 },
      { label: 'Max Len', value: 0 }
    ]
  },
  {
    phase: 'ROW_1_MATCH',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'a', 'b', 'c', 'd', 'e'],
    colLabels: ['∅', 'a', 'b', 'f', 'd', 'e'],
    activeCell: { r: 1, c: 1 },
    dependencyCells: [{ r: 0, c: 0, label: 'diag' }],
    formula: 'text1[0] == text2[0] ("a" == "a") => dp[1][1] = 1 + dp[0][0] = 1',
    action: 'Process row 1 (char "a"): match found at column 1 ("a").',
    explain: 'At cell [1, 1], character "a" matches. dp[1][1] becomes 1 + 0 = 1. Remaining columns mismatch against "a" and reset to 0.',
    intuition: 'A common substring of length 1 ("a") starts here.',
    metrics: [
      { label: 'Active Char', value: '"a"' },
      { label: 'Current Streak', value: 1 },
      { label: 'Max Len', value: 1, highlight: true }
    ]
  },
  {
    phase: 'ROW_2_EXTEND',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'a', 'b', 'c', 'd', 'e'],
    colLabels: ['∅', 'a', 'b', 'f', 'd', 'e'],
    activeCell: { r: 2, c: 2 },
    dependencyCells: [{ r: 1, c: 1, label: 'diag' }],
    formula: 'text1[1] == text2[1] ("b" == "b") => dp[2][2] = 1 + dp[1][1] = 2',
    action: 'Process row 2 (char "b"): matches column 2 ("b"). Streak extended to 2!',
    explain: 'At cell [2, 2], character "b" matches. Diagonal predecessor dp[1][1] is 1, so dp[2][2] = 1 + 1 = 2! Substring "ab" is confirmed.',
    intuition: 'Contiguous characters along diagonal step grow the streak to 2.',
    metrics: [
      { label: 'Active Char', value: '"b"' },
      { label: 'Streak Substring', value: '"ab"' },
      { label: 'Max Len', value: 2, highlight: true }
    ]
  },
  {
    phase: 'ROW_3_RESET',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'a', 'b', 'c', 'd', 'e'],
    colLabels: ['∅', 'a', 'b', 'f', 'd', 'e'],
    activeCell: { r: 3, c: 3 },
    formula: 'text1[2] ("c") != text2[2] ("f") => dp[3][3] = 0 (Streak broken!)',
    action: 'Process row 3 (char "c"): all columns mismatch. Entire row remains 0!',
    explain: 'Character "c" does not match "f" or any other letter in column alignment. In LCS we would carry over 2 from max(top, left), but in substring we MUST reset to 0.',
    intuition: 'A mismatch severs the contiguous chain immediately.',
    metrics: [
      { label: 'Active Char', value: '"c"' },
      { label: 'Streak', value: 0 },
      { label: 'Max Len', value: 2 }
    ]
  },
  {
    phase: 'ROW_4_NEW_STREAK',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'a', 'b', 'c', 'd', 'e'],
    colLabels: ['∅', 'a', 'b', 'f', 'd', 'e'],
    activeCell: { r: 4, c: 4 },
    dependencyCells: [{ r: 3, c: 3, label: 'diag=0' }],
    formula: 'text1[3] == text2[3] ("d" == "d") => dp[4][4] = 1 + dp[3][3] = 1 + 0 = 1',
    action: 'Process row 4 (char "d"): matches column 4 ("d"). New streak started.',
    explain: 'At cell [4, 4], character "d" matches. Because diagonal cell dp[3][3] is 0, dp[4][4] becomes 1 + 0 = 1. A new substring streak starts.',
    intuition: 'A fresh substring candidate begins.',
    metrics: [
      { label: 'Active Char', value: '"d"' },
      { label: 'New Streak', value: 1 },
      { label: 'Max Len', value: 2 }
    ]
  },
  {
    phase: 'ROW_5_EXTEND_STREAK',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 2]
    ],
    rowLabels: ['∅', 'a', 'b', 'c', 'd', 'e'],
    colLabels: ['∅', 'a', 'b', 'f', 'd', 'e'],
    activeCell: { r: 5, c: 5 },
    dependencyCells: [{ r: 4, c: 4, label: 'diag=1' }],
    formula: 'text1[4] == text2[4] ("e" == "e") => dp[5][5] = 1 + dp[4][4] = 2',
    action: 'Process row 5 (char "e"): matches column 5 ("e"). Streak extends to 2.',
    explain: 'At cell [5, 5], character "e" matches. 1 + dp[4][4] (1 + 1) = 2. Substring "de" also has length 2.',
    intuition: 'Two distinct maximal common substrings found: "ab" and "de".',
    metrics: [
      { label: 'Active Char', value: '"e"' },
      { label: 'Streak Substring', value: '"de"' },
      { label: 'Max Len', value: 2 }
    ]
  },
  {
    phase: 'GLOBAL_MAX_EVAL',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 2]
    ],
    rowLabels: ['∅', 'a', 'b', 'c', 'd', 'e'],
    colLabels: ['∅', 'a', 'b', 'f', 'd', 'e'],
    activeCell: { r: 2, c: 2 },
    dependencyCells: [{ r: 5, c: 5, label: 'max=2' }],
    formula: 'Answer = max(dp[i][j]) over all cells = 2 ("ab" or "de")',
    action: 'Scan entire matrix for global maximum. Peaks are at [2, 2] and [5, 5].',
    explain: 'In Longest Common Substring, the result is not strictly at dp[N][M]. Any cell in the table can hold the global maximum streak. Here, both "ab" and "de" reach length 2.',
    intuition: 'Global maximum scanning guarantees finding substrings located anywhere in the strings.',
    metrics: [
      { label: 'Peak 1', value: 'dp[2][2] = 2 ("ab")' },
      { label: 'Peak 2', value: 'dp[5][5] = 2 ("de")' },
      { label: 'Max Substring', value: 2, highlight: true }
    ]
  },
  {
    phase: 'COMPLETED',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0],
      [0, 0, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 2]
    ],
    rowLabels: ['∅', 'a', 'b', 'c', 'd', 'e'],
    colLabels: ['∅', 'a', 'b', 'f', 'd', 'e'],
    activeCell: { r: 2, c: 2 },
    formula: 'Output: 2 | Optimal common substrings: "ab", "de"',
    action: 'Algorithm complete! Maximum contiguous substring length is 2.',
    explain: 'Longest common substring length is 2. (Note: LCS subsequence length would be 4 for "abde", highlighting the strict contiguity requirement). Space-optimized to O(M) using a rolling 1D array.',
    intuition: 'Contiguity enforcement requires O(N × M) comparisons and constant memory per step.',
    metrics: [
      { label: 'text1', value: '"abcde"' },
      { label: 'text2', value: '"abfde"' },
      { label: 'Max Substring', value: 2, highlight: true }
    ]
  }
];
