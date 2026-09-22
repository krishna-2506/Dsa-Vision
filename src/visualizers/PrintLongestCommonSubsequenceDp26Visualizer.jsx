// DATA-ONLY — rendered by DpGridRenderer via rendererType

export const meta = {
  title: 'Print Longest Common Subsequence (DP-26)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N × M) Table + O(N + M) Traceback',
  spaceComplexity: 'O(N × M) Grid',
  description: 'Constructs the exact string of the Longest Common Subsequence between s1 and s2 by building the 2D DP matrix and backtracking from (N, M) following character match diagonals and maximum neighbor paths.'
};

export const rendererType = 'dp-grid';

export const ideaMap = {
  title: 'Print Longest Common Subsequence (DP-26)',
  nodes: [
    { id: 'root', label: 'Print LCS Rebuilder', children: ['dp-matrix', 'backtrack-rules', 'complexity'] },
    { id: 'dp-matrix', label: '1. Tabulation Matrix dp[i][j]', detail: 'dp[i][j] = length of LCS between s1[0..i-1] and s2[0..j-1]' },
    { id: 'backtrack-rules', label: '2. Traceback Protocol from (N, M)', children: ['diag-match', 'max-step'] },
    { id: 'diag-match', label: 'Match s1[i-1] == s2[j-1]', detail: 'Character belongs to LCS! Prepend to result and jump diagonally to dp[i-1][j-1]' },
    { id: 'max-step', label: 'Mismatch', detail: 'Step towards max(dp[i-1][j], dp[i][j-1]) without collecting character' },
    { id: 'complexity', label: '3. Efficiency', detail: 'Reconstruction takes linear O(N + M) time after O(N * M) table fill' }
  ]
};

export const solutions = {
  cpp: `// C++ Print Longest Common Subsequence
// Time: O(N * M) | Space: O(N * M)
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    string printLCS(string s1, string s2) {
        int n = s1.size(), m = s2.size();
        vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));

        // 1. Build LCS table
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (s1[i - 1] == s2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
                else dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }

        // 2. Backtrack to reconstruct string
        string lcs = "";
        int i = n, j = m;
        while (i > 0 && j > 0) {
            if (s1[i - 1] == s2[j - 1]) {
                lcs += s1[i - 1];
                i--; j--;
            } else if (dp[i - 1][j] > dp[i][j - 1]) {
                i--;
            } else {
                j--;
            }
        }

        reverse(lcs.begin(), lcs.end());
        return lcs;
    }
};`,
  python: `# Python 3 Print Longest Common Subsequence
# Time: O(N * M) | Space: O(N * M)
class Solution:
    def printLCS(self, s1: str, s2: str) -> str:
        n, m = len(s1), len(s2)
        dp = [[0] * (m + 1) for _ in range(n + 1)]

        for i in range(1, n + 1):
            for j in range(1, m + 1):
                if s1[i - 1] == s2[j - 1]:
                    dp[i][j] = 1 + dp[i - 1][j - 1]
                else:
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

        lcs = []
        i, j = n, m
        while i > 0 and j > 0:
            if s1[i - 1] == s2[j - 1]:
                lcs.append(s1[i - 1])
                i -= 1
                j -= 1
            elif dp[i - 1][j] > dp[i][j - 1]:
                i -= 1
            else:
                j -= 1

        return "".join(reversed(lcs))`,
  java: `// Java Print Longest Common Subsequence
// Time: O(N * M) | Space: O(N * M)
class Solution {
    public String printLCS(String s1, String s2) {
        int n = s1.length(), m = s2.length();
        int[][] dp = new int[n + 1][m + 1];

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        StringBuilder lcs = new StringBuilder();
        int i = n, j = m;
        while (i > 0 && j > 0) {
            if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                lcs.append(s1.charAt(i - 1));
                i--; j--;
            } else if (dp[i - 1][j] > dp[i][j - 1]) {
                i--;
            } else {
                j--;
            }
        }

        return lcs.reverse().toString();
    }
}`,
  javascript: `// JavaScript Print Longest Common Subsequence
// Time: O(N * M) | Space: O(N * M)
var printLCS = function(s1, s2) {
    const n = s1.length, m = s2.length;
    const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    const lcs = [];
    let i = n, j = m;
    while (i > 0 && j > 0) {
        if (s1[i - 1] === s2[j - 1]) {
            lcs.push(s1[i - 1]);
            i--; j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }

    return lcs.reverse().join('');
};`
};

export const steps = [
  {
    phase: 'SETUP',
    grid: [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'a', 'b', 'a', 'd', 'e'],
    colLabels: ['∅', 'b', 'a', 'e', 'd'],
    activeCell: { r: 0, c: 0 },
    formula: 'dp[i][j] = 0 when i = 0 or j = 0',
    action: 'Initialize (N+1) × (M+1) grid for s1 = "abade" and s2 = "baed".',
    explain: 'Row 0 represents the empty string prefix of s1, and column 0 represents the empty prefix of s2. The LCS with any empty string is 0.',
    intuition: 'Building the full 2D table allows recovering the exact characters later via backward pointer traversal.',
    metrics: [
      { label: '|s1|', value: 5 },
      { label: '|s2|', value: 4 },
      { label: 'Reconstructed', value: '""' }
    ]
  },
  {
    phase: 'FILL_ROW_1',
    grid: [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'a', 'b', 'a', 'd', 'e'],
    colLabels: ['∅', 'b', 'a', 'e', 'd'],
    activeCell: { r: 1, c: 2 },
    dependencyCells: [{ r: 0, c: 1, label: 'diag' }],
    formula: 's1[0] == s2[1] ("a" == "a") => dp[1][2] = 1 + dp[0][1] = 1',
    action: 'Process s1[0] = "a": matches s2[1] = "a".',
    explain: 'At cell [1, 2], both characters match. We take diagonal neighbor dp[0][1] (0) + 1 = 1. Remaining cells in row 1 carry over 1.',
    intuition: 'A match of length 1 ("a") is established.',
    metrics: [
      { label: 'Active Char', value: 's1[0]: "a"' },
      { label: 'Row 1 Max', value: 1 }
    ]
  },
  {
    phase: 'FILL_ROW_2',
    grid: [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1],
      [0, 1, 1, 1, 1],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'a', 'b', 'a', 'd', 'e'],
    colLabels: ['∅', 'b', 'a', 'e', 'd'],
    activeCell: { r: 2, c: 1 },
    dependencyCells: [{ r: 1, c: 0, label: 'diag' }],
    formula: 's1[1] == s2[0] ("b" == "b") => dp[2][1] = 1 + dp[1][0] = 1',
    action: 'Process s1[1] = "b": matches s2[0] = "b".',
    explain: 'At cell [2, 1], character "b" matches immediately. Subsequent cells [2, 2..4] evaluate to max(dp[1][j], dp[2][j-1]) = 1.',
    intuition: 'Prefix "ab" of s1 against prefixes of s2 maintains maximum LCS length 1.',
    metrics: [
      { label: 'Active Char', value: 's1[1]: "b"' },
      { label: 'Row 2 Max', value: 1 }
    ]
  },
  {
    phase: 'FILL_ROW_3',
    grid: [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1],
      [0, 1, 1, 1, 1],
      [0, 1, 2, 2, 2],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'a', 'b', 'a', 'd', 'e'],
    colLabels: ['∅', 'b', 'a', 'e', 'd'],
    activeCell: { r: 3, c: 2 },
    dependencyCells: [{ r: 2, c: 1, label: 'diag' }],
    formula: 's1[2] == s2[1] ("a" == "a") => dp[3][2] = 1 + dp[2][1] = 2',
    action: 'Process s1[2] = second "a": matches s2[1] = "a" to create length 2.',
    explain: 'Taking 1 + dp[2][1] (1 + 1) produces length 2! Prefix "aba" and prefix "ba" share subsequence "ba" of length 2.',
    intuition: 'Subsequence length grows to 2 ("ba").',
    metrics: [
      { label: 'Active Char', value: 's1[2]: "a"' },
      { label: 'dp[3][2]', value: 2, highlight: true }
    ]
  },
  {
    phase: 'FILL_ROW_4',
    grid: [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1],
      [0, 1, 1, 1, 1],
      [0, 1, 2, 2, 2],
      [0, 1, 2, 2, 3],
      [0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'a', 'b', 'a', 'd', 'e'],
    colLabels: ['∅', 'b', 'a', 'e', 'd'],
    activeCell: { r: 4, c: 4 },
    dependencyCells: [{ r: 3, c: 3, label: 'diag' }],
    formula: 's1[3] == s2[3] ("d" == "d") => dp[4][4] = 1 + dp[3][3] = 3',
    action: 'Process s1[3] = "d": matches s2[3] = "d" at column 4.',
    explain: 'At cell [4, 4], "d" matches "d", extending LCS from dp[3][3] (2) to 3! Subsequence "bad" is formed.',
    intuition: 'Max LCS length is now 3.',
    metrics: [
      { label: 'Active Char', value: 's1[3]: "d"' },
      { label: 'dp[4][4]', value: 3, highlight: true }
    ]
  },
  {
    phase: 'FILL_ROW_5_COMPLETE',
    grid: [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1],
      [0, 1, 1, 1, 1],
      [0, 1, 2, 2, 2],
      [0, 1, 2, 2, 3],
      [0, 1, 2, 3, 3]
    ],
    rowLabels: ['∅', 'a', 'b', 'a', 'd', 'e'],
    colLabels: ['∅', 'b', 'a', 'e', 'd'],
    activeCell: { r: 5, c: 4 },
    formula: 'Table complete! dp[5][4] = 3 (Max LCS length = 3)',
    action: 'Final cell [5, 4] completed: LCS length is 3. Begin backtracking!',
    explain: 'Row 5 processes terminal "e", which matches col 3 giving dp[5][3] = 3. Final cell [5, 4] = 3. Now we start from [5, 4] and trace the optimal path backward.',
    intuition: 'Backtracking reverses the forward dynamic programming decisions.',
    metrics: [
      { label: 'Total Rows', value: 6 },
      { label: 'Total Cols', value: 5 },
      { label: 'LCS Length', value: 3, highlight: true }
    ]
  },
  {
    phase: 'BACKTRACK_1',
    grid: [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1],
      [0, 1, 1, 1, 1],
      [0, 1, 2, 2, 2],
      [0, 1, 2, 2, 3],
      [0, 1, 2, 3, 3]
    ],
    rowLabels: ['∅', 'a', 'b', 'a', 'd', 'e'],
    colLabels: ['∅', 'b', 'a', 'e', 'd'],
    activeCell: { r: 5, c: 4 },
    dependencyCells: [{ r: 4, c: 4, label: 'up=3' }, { r: 5, c: 3, label: 'left=3' }],
    formula: 's1[4] ("e") != s2[3] ("d") => dp[5][3] >= dp[4][4], move LEFT to [5, 3]',
    action: 'At [5, 4]: characters "e" and "d" do not match. Move LEFT to [5, 3].',
    explain: 'Since s1[4] ("e") != s2[3] ("d"), we compare neighbors. dp[5][3] is 3. We move left into column 3 to inspect character "e".',
    intuition: 'Mismatches guide the pointer towards where the score originated.',
    metrics: [
      { label: 'Current Pointer', value: '[5, 4]' },
      { label: 'Action', value: 'Step LEFT' },
      { label: 'Collected', value: '[]' }
    ]
  },
  {
    phase: 'BACKTRACK_2',
    grid: [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1],
      [0, 1, 1, 1, 1],
      [0, 1, 2, 2, 2],
      [0, 1, 2, 2, 3],
      [0, 1, 2, 3, 3]
    ],
    rowLabels: ['∅', 'a', 'b', 'a', 'd', 'e'],
    colLabels: ['∅', 'b', 'a', 'e', 'd'],
    activeCell: { r: 5, c: 3 },
    dependencyCells: [{ r: 4, c: 2, label: 'diag' }],
    formula: 's1[4] == s2[2] ("e" == "e") => Collect \'e\', jump DIAG to [4, 2]',
    action: 'At [5, 3]: Match found! Character "e" == "e".',
    explain: 'Both characters match! Character "e" is part of our LCS. We collect "e" and step diagonally to cell [4, 2].',
    intuition: 'Every diagonal step captures an identical character in both strings.',
    metrics: [
      { label: 'Collected Char', value: '"e"', highlight: true },
      { label: 'Next Pointer', value: '[4, 2]' },
      { label: 'Tokens', value: '["e"]' }
    ]
  },
  {
    phase: 'BACKTRACK_3',
    grid: [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1],
      [0, 1, 1, 1, 1],
      [0, 1, 2, 2, 2],
      [0, 1, 2, 2, 3],
      [0, 1, 2, 3, 3]
    ],
    rowLabels: ['∅', 'a', 'b', 'a', 'd', 'e'],
    colLabels: ['∅', 'b', 'a', 'e', 'd'],
    activeCell: { r: 4, c: 2 },
    dependencyCells: [{ r: 3, c: 2, label: 'up=2' }, { r: 4, c: 1, label: 'left=1' }],
    formula: 's1[3] ("d") != s2[1] ("a") => dp[3][2] (2) > dp[4][1] (1), move UP to [3, 2]',
    action: 'At [4, 2]: mismatch between "d" and "a". Top neighbor is larger (2 > 1). Move UP.',
    explain: 'Since top neighbor dp[3][2] = 2 is strictly greater than left neighbor dp[4][1] = 1, the optimal path came from above. Move UP to [3, 2].',
    intuition: 'Discarding non-matching character s1[3] ("d").',
    metrics: [
      { label: 'Current Pointer', value: '[4, 2]' },
      { label: 'Action', value: 'Step UP' },
      { label: 'Tokens', value: '["e"]' }
    ]
  },
  {
    phase: 'COMPLETED',
    grid: [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1],
      [0, 1, 1, 1, 1],
      [0, 1, 2, 2, 2],
      [0, 1, 2, 2, 3],
      [0, 1, 2, 3, 3]
    ],
    rowLabels: ['∅', 'a', 'b', 'a', 'd', 'e'],
    colLabels: ['∅', 'b', 'a', 'e', 'd'],
    activeCell: { r: 0, c: 0 },
    formula: 'reverse(["e", "a", "b"]) = "bae"',
    action: 'At [3, 2] match "a" -> [2, 1] match "b". Reversing collected list gives "bae"!',
    explain: 'From [3, 2], "a" matches "a" -> collected ["e", "a"], jump to [2, 1]. At [2, 1], "b" matches "b" -> collected ["e", "a", "b"], jump to [1, 0]. Loop terminates. Reversing ["e", "a", "b"] produces final string "bae"!',
    intuition: 'Linear backtrack reconstructed the optimal LCS "bae" in O(N + M) operations.',
    metrics: [
      { label: 'LCS String', value: '"bae"', highlight: true },
      { label: 'Length', value: 3 },
      { label: 'Matches in s1', value: 'a[b]a[d][e] / a[b][a]d[e]' }
    ]
  }
];
