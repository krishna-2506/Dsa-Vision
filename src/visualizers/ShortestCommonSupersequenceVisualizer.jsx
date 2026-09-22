// DATA-ONLY — rendered by DpGridRenderer via rendererType

export const meta = {
  title: 'Shortest Common Supersequence (DP-31)',
  category: 'Dynamic Programming',
  difficulty: 'Hard',
  timeComplexity: 'O(N × M) Table + O(N + M) Reconstruction',
  spaceComplexity: 'O(N × M) Auxiliary Grid',
  description: 'Constructs the shortest string containing both str1 and str2 as subsequences. Characters belonging to their Longest Common Subsequence (LCS) are included once, while non-matching characters are interleaved via table backtracking.'
};

export const rendererType = 'dp-grid';

export const ideaMap = {
  title: 'Shortest Common Supersequence (DP-31)',
  nodes: [
    { id: 'root', label: 'Shortest Common Supersequence', children: ['length-rule', 'lcs-core', 'backtrack-strategy'] },
    { id: 'length-rule', label: '1. Supersequence Theorem', detail: '|SCS| = |str1| + |str2| - |LCS(str1, str2)|' },
    { id: 'lcs-core', label: '2. 2D LCS Dynamic Programming', children: ['match-trans', 'mismatch-trans'] },
    { id: 'match-trans', label: 'Character Match', detail: 'str1[i-1] == str2[j-1] => dp[i][j] = 1 + dp[i-1][j-1]' },
    { id: 'mismatch-trans', label: 'Character Mismatch', detail: 'dp[i][j] = max(dp[i-1][j], dp[i][j-1])' },
    { id: 'backtrack-strategy', label: '3. Dual-Pointer Table Traceback', detail: 'Match: take char once & move diagonal. Mismatch: take char from larger neighbor & move towards it.' }
  ]
};

export const solutions = {
  cpp: `// C++ Shortest Common Supersequence
// Time: O(N * M) | Space: O(N * M)
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    string shortestCommonSupersequence(string str1, string str2) {
        int n = str1.size(), m = str2.size();
        vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));

        // 1. Build LCS table
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (str1[i - 1] == str2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
                else dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }

        // 2. Backtrack to reconstruct SCS string
        string scs = "";
        int i = n, j = m;
        while (i > 0 && j > 0) {
            if (str1[i - 1] == str2[j - 1]) {
                scs += str1[i - 1]; // Common character shared once
                i--; j--;
            } else if (dp[i - 1][j] > dp[i][j - 1]) {
                scs += str1[i - 1];
                i--;
            } else {
                scs += str2[j - 1];
                j--;
            }
        }

        while (i > 0) { scs += str1[i - 1]; i--; }
        while (j > 0) { scs += str2[j - 1]; j--; }

        reverse(scs.begin(), scs.end());
        return scs;
    }
};`,
  python: `# Python 3 Shortest Common Supersequence
# Time: O(N * M) | Space: O(N * M)
class Solution:
    def shortestCommonSupersequence(self, str1: str, str2: str) -> str:
        n, m = len(str1), len(str2)
        dp = [[0] * (m + 1) for _ in range(n + 1)]

        for i in range(1, n + 1):
            for j in range(1, m + 1):
                if str1[i - 1] == str2[j - 1]:
                    dp[i][j] = 1 + dp[i - 1][j - 1]
                else:
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

        scs = []
        i, j = n, m
        while i > 0 and j > 0:
            if str1[i - 1] == str2[j - 1]:
                scs.append(str1[i - 1])
                i -= 1
                j -= 1
            elif dp[i - 1][j] > dp[i][j - 1]:
                scs.append(str1[i - 1])
                i -= 1
            else:
                scs.append(str2[j - 1])
                j -= 1

        while i > 0:
            scs.append(str1[i - 1])
            i -= 1
        while j > 0:
            scs.append(str2[j - 1])
            j -= 1

        return "".join(reversed(scs))`,
  java: `// Java Shortest Common Supersequence
// Time: O(N * M) | Space: O(N * M)
class Solution {
    public String shortestCommonSupersequence(String str1, String str2) {
        int n = str1.length(), m = str2.length();
        int[][] dp = new int[n + 1][m + 1];

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (str1.charAt(i - 1) == str2.charAt(j - 1)) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        StringBuilder scs = new StringBuilder();
        int i = n, j = m;
        while (i > 0 && j > 0) {
            if (str1.charAt(i - 1) == str2.charAt(j - 1)) {
                scs.append(str1.charAt(i - 1));
                i--; j--;
            } else if (dp[i - 1][j] > dp[i][j - 1]) {
                scs.append(str1.charAt(i - 1));
                i--;
            } else {
                scs.append(str2.charAt(j - 1));
                j--;
            }
        }

        while (i > 0) { scs.append(str1.charAt(i - 1)); i--; }
        while (j > 0) { scs.append(str2.charAt(j - 1)); j--; }

        return scs.reverse().toString();
    }
}`,
  javascript: `// JavaScript Shortest Common Supersequence
// Time: O(N * M) | Space: O(N * M)
var shortestCommonSupersequence = function(str1, str2) {
    const n = str1.length, m = str2.length;
    const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    const scs = [];
    let i = n, j = m;
    while (i > 0 && j > 0) {
        if (str1[i - 1] === str2[j - 1]) {
            scs.push(str1[i - 1]);
            i--; j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            scs.push(str1[i - 1]);
            i--;
        } else {
            scs.push(str2[j - 1]);
            j--;
        }
    }

    while (i > 0) { scs.push(str1[i - 1]); i--; }
    while (j > 0) { scs.push(str2[j - 1]); j--; }

    return scs.reverse().join('');
};`
};

export const steps = [
  {
    phase: 'SETUP',
    grid: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'a', 'b', 'a', 'c'],
    colLabels: ['∅', 'c', 'a', 'b'],
    activeCell: { r: 0, c: 0 },
    formula: '|SCS| = |str1| + |str2| - |LCS| = 4 + 3 - LCS',
    action: 'Initialize DP table for str1 = "abac" (rows) and str2 = "cab" (columns).',
    explain: 'dp[i][j] stores the LCS length between str1[0..i-1] and str2[0..j-1]. Base row and column are 0 because matching any prefix against the empty string yields length 0.',
    intuition: 'Every character shared between str1 and str2 only needs to be written once in the supersequence.',
    metrics: [
      { label: '|str1|', value: 4 },
      { label: '|str2|', value: 3 },
      { label: 'LCS Len', value: 0 }
    ]
  },
  {
    phase: 'FILL_ROW_1',
    grid: [
      [0, 0, 0, 0],
      [0, 0, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'a', 'b', 'a', 'c'],
    colLabels: ['∅', 'c', 'a', 'b'],
    activeCell: { r: 1, c: 2 },
    dependencyCells: [{ r: 0, c: 1, label: 'diag' }],
    formula: 'str1[0] == str2[1] ("a" == "a") => dp[1][2] = 1 + dp[0][1] = 1',
    action: 'Process row 1 (char "a"): match found at column 2 (char "a").',
    explain: 'At cell [1, 2], both characters are "a". We add 1 to the diagonal predecessor dp[0][1] = 0, giving 1. Cell [1, 3] carries over this value via max(dp[0][3], dp[1][2]) = 1.',
    intuition: 'Matching characters always step diagonally, extending the common subsequence length.',
    metrics: [
      { label: 'Active Char', value: 'str1[0]: "a"' },
      { label: 'Match At', value: 'col 2 ("a")' },
      { label: 'Row 1 Max', value: 1, highlight: true }
    ]
  },
  {
    phase: 'FILL_ROW_2',
    grid: [
      [0, 0, 0, 0],
      [0, 0, 1, 1],
      [0, 0, 1, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'a', 'b', 'a', 'c'],
    colLabels: ['∅', 'c', 'a', 'b'],
    activeCell: { r: 2, c: 3 },
    dependencyCells: [{ r: 1, c: 2, label: 'diag' }],
    formula: 'str1[1] == str2[2] ("b" == "b") => dp[2][3] = 1 + dp[1][2] = 2',
    action: 'Process row 2 (char "b"): match found at column 3 (char "b").',
    explain: 'At cell [2, 3], str1[1] and str2[2] both equal "b". Taking 1 + dp[1][2] (1 + 1) gives 2! The prefix "ab" of str1 matches "ab" of str2.',
    intuition: 'We have found a common subsequence of length 2: "ab".',
    metrics: [
      { label: 'Active Char', value: 'str1[1]: "b"' },
      { label: 'Subsequence', value: '"ab"' },
      { label: 'dp[2][3]', value: 2, highlight: true }
    ]
  },
  {
    phase: 'FILL_ROW_3',
    grid: [
      [0, 0, 0, 0],
      [0, 0, 1, 1],
      [0, 0, 1, 2],
      [0, 0, 1, 2],
      [0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'a', 'b', 'a', 'c'],
    colLabels: ['∅', 'c', 'a', 'b'],
    activeCell: { r: 3, c: 3 },
    dependencyCells: [{ r: 2, c: 3, label: 'top' }, { r: 3, c: 2, label: 'left' }],
    formula: 'str1[2] != str2[2] ("a" != "b") => dp[3][3] = max(dp[2][3], dp[3][2]) = 2',
    action: 'Process row 3 (second "a"): propagate optimal subsequence length.',
    explain: 'For prefix "aba" vs "cab", no longer common subsequence can be formed with terminal "b". The maximum of top neighbor dp[2][3] (2) and left neighbor dp[3][2] (1) is 2.',
    intuition: 'Mismatches preserve the best choice seen so far from either string prefix.',
    metrics: [
      { label: 'Active Char', value: 'str1[2]: "a"' },
      { label: 'Current Best', value: 2 }
    ]
  },
  {
    phase: 'FILL_ROW_4_DONE',
    grid: [
      [0, 0, 0, 0],
      [0, 0, 1, 1],
      [0, 0, 1, 2],
      [0, 0, 1, 2],
      [0, 1, 1, 2]
    ],
    rowLabels: ['∅', 'a', 'b', 'a', 'c'],
    colLabels: ['∅', 'c', 'a', 'b'],
    activeCell: { r: 4, c: 3 },
    formula: 'LCS = dp[4][3] = 2 ("ab") | Target |SCS| = 4 + 3 - 2 = 5',
    action: 'Complete DP matrix! Terminal cell [4, 3] yields LCS length = 2.',
    explain: 'Final entry dp[4][3] is 2, representing the LCS "ab". Using our formula |SCS| = 4 + 3 - 2, we know the shortest supersequence will have length exactly 5.',
    intuition: 'Now we trace backwards from (4, 3) to (0, 0) to collect the characters in order.',
    metrics: [
      { label: '|str1|', value: 4 },
      { label: '|str2|', value: 3 },
      { label: 'LCS Length', value: 2 },
      { label: 'SCS Length', value: 5, highlight: true }
    ]
  },
  {
    phase: 'BACKTRACK_1',
    grid: [
      [0, 0, 0, 0],
      [0, 0, 1, 1],
      [0, 0, 1, 2],
      [0, 0, 1, 2],
      [0, 1, 1, 2]
    ],
    rowLabels: ['∅', 'a', 'b', 'a', 'c'],
    colLabels: ['∅', 'c', 'a', 'b'],
    activeCell: { r: 4, c: 3 },
    dependencyCells: [{ r: 3, c: 3, label: 'larger' }, { r: 4, c: 2, label: 'smaller' }],
    formula: 'dp[3][3] (2) > dp[4][2] (1) => Take str1[3] ("c"), move UP to [3, 3]',
    action: 'Backtrack step 1: Compare characters str1[3]="c" vs str2[2]="b".',
    explain: 'Mismatch between "c" and "b". The top neighbor dp[3][3] has value 2 while left neighbor dp[4][2] has value 1. We must take str1[3] ("c") into the supersequence and move UP to row 3.',
    intuition: 'Moving UP means str1 character was NOT shared; it must be emitted individually.',
    metrics: [
      { label: 'Backtrack Pos', value: '[4, 3]' },
      { label: 'Emitted Char', value: '"c"' },
      { label: 'Reversed SCS', value: '["c"]' }
    ]
  },
  {
    phase: 'BACKTRACK_2',
    grid: [
      [0, 0, 0, 0],
      [0, 0, 1, 1],
      [0, 0, 1, 2],
      [0, 0, 1, 2],
      [0, 1, 1, 2]
    ],
    rowLabels: ['∅', 'a', 'b', 'a', 'c'],
    colLabels: ['∅', 'c', 'a', 'b'],
    activeCell: { r: 3, c: 3 },
    dependencyCells: [{ r: 2, c: 3, label: 'larger' }, { r: 3, c: 2, label: 'smaller' }],
    formula: 'dp[2][3] (2) > dp[3][2] (1) => Take str1[2] ("a"), move UP to [2, 3]',
    action: 'Backtrack step 2: Compare str1[2]="a" vs str2[2]="b".',
    explain: 'Mismatch! Top cell dp[2][3]=2 is strictly larger than left cell dp[3][2]=1. Take character str1[2] ("a") and move UP to cell [2, 3].',
    intuition: 'Another unshared character from str1 is preserved.',
    metrics: [
      { label: 'Backtrack Pos', value: '[3, 3]' },
      { label: 'Emitted Char', value: '"a"' },
      { label: 'Reversed SCS', value: '["c", "a"]' }
    ]
  },
  {
    phase: 'BACKTRACK_3',
    grid: [
      [0, 0, 0, 0],
      [0, 0, 1, 1],
      [0, 0, 1, 2],
      [0, 0, 1, 2],
      [0, 1, 1, 2]
    ],
    rowLabels: ['∅', 'a', 'b', 'a', 'c'],
    colLabels: ['∅', 'c', 'a', 'b'],
    activeCell: { r: 2, c: 3 },
    dependencyCells: [{ r: 1, c: 2, label: 'diag' }],
    formula: 'str1[1] == str2[2] ("b" == "b") => Take "b" ONCE, move DIAG to [1, 2]',
    action: 'Backtrack step 3: Match found! str1[1] == str2[2] == "b".',
    explain: 'Both characters match! Since this character is part of the common subsequence, it is included ONCE in our supersequence. We decrement both pointers and move diagonally to [1, 2].',
    intuition: 'This is where compression occurs: 1 character satisfies subsequences in both strings.',
    metrics: [
      { label: 'Shared Char', value: '"b"', highlight: true },
      { label: 'Next Cell', value: '[1, 2]' },
      { label: 'Reversed SCS', value: '["c", "a", "b"]' }
    ]
  },
  {
    phase: 'BACKTRACK_4',
    grid: [
      [0, 0, 0, 0],
      [0, 0, 1, 1],
      [0, 0, 1, 2],
      [0, 0, 1, 2],
      [0, 1, 1, 2]
    ],
    rowLabels: ['∅', 'a', 'b', 'a', 'c'],
    colLabels: ['∅', 'c', 'a', 'b'],
    activeCell: { r: 1, c: 2 },
    dependencyCells: [{ r: 0, c: 1, label: 'diag' }],
    formula: 'str1[0] == str2[1] ("a" == "a") => Take "a" ONCE, move DIAG to [0, 1]',
    action: 'Backtrack step 4: Match found! str1[0] == str2[1] == "a".',
    explain: 'Another match! Include shared "a" and move diagonally to cell [0, 1]. Now row pointer i = 0 (str1 is exhausted).',
    intuition: 'Both shared characters ("b" and "a") have been accounted for.',
    metrics: [
      { label: 'Shared Char', value: '"a"', highlight: true },
      { label: 'Next Cell', value: '[0, 1]' },
      { label: 'Reversed SCS', value: '["c", "a", "b", "a"]' }
    ]
  },
  {
    phase: 'COMPLETED',
    grid: [
      [0, 0, 0, 0],
      [0, 0, 1, 1],
      [0, 0, 1, 2],
      [0, 0, 1, 2],
      [0, 1, 1, 2]
    ],
    rowLabels: ['∅', 'a', 'b', 'a', 'c'],
    colLabels: ['∅', 'c', 'a', 'b'],
    activeCell: { r: 0, c: 0 },
    formula: 'reverse(["c", "a", "b", "a", "c"]) = "cabac"',
    action: 'Append remaining str2 prefix "c" and reverse the collected tokens!',
    explain: 'At [0, 1], remaining str2 character "c" is appended. Reversing the collected list gives the final Shortest Common Supersequence: "cabac". Both "abac" and "cab" exist as subsequences in "cabac".',
    intuition: 'Optimal length 5 verified: contains c-[aba-c] and [c-ab]-ac.',
    metrics: [
      { label: 'Final SCS', value: '"cabac"', highlight: true },
      { label: 'Length', value: 5 },
      { label: 'LCS Shared', value: '"ab"' }
    ]
  }
];
