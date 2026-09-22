// DATA-ONLY — rendered by DpGridRenderer via rendererType

export const meta = {
  title: 'Min Insertions / Deletions to Convert String A to B (DP-30)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N × M) Time',
  spaceComplexity: 'O(M) Space-Optimized',
  description: 'Calculates the minimum total deletions and insertions needed to transform word1 into word2. By preserving their Longest Common Subsequence (LCS), Deletions = |word1| - LCS and Insertions = |word2| - LCS.'
};

export const rendererType = 'dp-grid';

export const ideaMap = {
  title: 'Min Insertions & Deletions (DP-30)',
  nodes: [
    { id: 'root', label: 'String Transformation Minimizer', children: ['reduction', 'lcs-tabulation', 'ops-formula'] },
    { id: 'reduction', label: '1. Invariant Reduction', detail: 'Any character present in the LCS of both strings does not need to be deleted or inserted.' },
    { id: 'lcs-tabulation', label: '2. Compute LCS Grid', children: ['match-case', 'mismatch-case'] },
    { id: 'match-case', label: 'Match', detail: 'word1[i-1] == word2[j-1] => 1 + dp[i-1][j-1]' },
    { id: 'mismatch-case', label: 'Mismatch', detail: 'max(dp[i-1][j], dp[i][j-1])' },
    { id: 'ops-formula', label: '3. Minimum Operations Formula', detail: 'Deletions = |word1| - LCS, Insertions = |word2| - LCS, Total = Deletions + Insertions' }
  ]
};

export const solutions = {
  cpp: `// C++ Minimum Insertions/Deletions to Convert A to B
// Time: O(N * M) | Space: O(M)
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minDistance(string word1, string word2) {
        int n = word1.size(), m = word2.size();
        vector<int> prev(m + 1, 0), cur(m + 1, 0);

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (word1[i - 1] == word2[j - 1]) cur[j] = 1 + prev[j - 1];
                else cur[j] = max(prev[j], cur[j - 1]);
            }
            prev = cur;
        }

        int lcs = prev[m];
        return (n - lcs) + (m - lcs);
    }
};`,
  python: `# Python 3 Minimum Insertions/Deletions to Convert A to B
# Time: O(N * M) | Space: O(M)
class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        n, m = len(word1), len(word2)
        prev = [0] * (m + 1)

        for i in range(1, n + 1):
            cur = [0] * (m + 1)
            for j in range(1, m + 1):
                if word1[i - 1] == word2[j - 1]:
                    cur[j] = 1 + prev[j - 1]
                else:
                    cur[j] = max(prev[j], cur[j - 1])
            prev = cur

        lcs = prev[m]
        return (n - lcs) + (m - lcs)`,
  java: `// Java Minimum Insertions/Deletions to Convert A to B
// Time: O(N * M) | Space: O(M)
class Solution {
    public int minDistance(String word1, String word2) {
        int n = word1.length(), m = word2.length();
        int[] prev = new int[m + 1];
        int[] cur = new int[m + 1];

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                    cur[j] = 1 + prev[j - 1];
                } else {
                    cur[j] = Math.max(prev[j], cur[j - 1]);
                }
            }
            prev = cur.clone();
        }

        int lcs = prev[m];
        return (n - lcs) + (m - lcs);
    }
}`,
  javascript: `// JavaScript Minimum Insertions/Deletions to Convert A to B
// Time: O(N * M) | Space: O(M)
var minDistance = function(word1, word2) {
    const n = word1.length, m = word2.length;
    let prev = new Array(m + 1).fill(0);

    for (let i = 1; i <= n; i++) {
        const cur = new Array(m + 1).fill(0);
        for (let j = 1; j <= m; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                cur[j] = 1 + prev[j - 1];
            } else {
                cur[j] = Math.max(prev[j], cur[j - 1]);
            }
        }
        prev = cur;
    }

    const lcs = prev[m];
    return (n - lcs) + (m - lcs);
};`
};

export const steps = [
  {
    phase: 'SETUP',
    grid: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    rowLabels: ['∅', 's', 'e', 'a'],
    colLabels: ['∅', 'e', 'a', 't'],
    activeCell: { r: 0, c: 0 },
    formula: 'Deletions = |word1| - LCS | Insertions = |word2| - LCS',
    action: 'Initialize LCS table for word1 = "sea" (rows) and word2 = "eat" (columns).',
    explain: 'Instead of brute force string mutations, we compute the Longest Common Subsequence. Characters belonging to the LCS stay untouched. All non-LCS characters in word1 must be deleted, and all non-LCS characters in word2 must be inserted.',
    intuition: 'Preserving the maximal common anchor minimizes both deletions and insertions.',
    metrics: [
      { label: '|word1|', value: 3 },
      { label: '|word2|', value: 3 },
      { label: 'LCS', value: 0 }
    ]
  },
  {
    phase: 'FILL_ROW_1',
    grid: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    rowLabels: ['∅', 's', 'e', 'a'],
    colLabels: ['∅', 'e', 'a', 't'],
    activeCell: { r: 1, c: 1 },
    formula: 'word1[0] ("s") not in "eat" => dp[1][1..3] = 0',
    action: 'Process row 1 (char "s"): no match against any character in "eat".',
    explain: 'Character "s" does not appear in "eat". Every cell in row 1 evaluates to max(dp[0][j], dp[1][j-1]) = 0. "s" is a deletion candidate.',
    intuition: 'No common prefix can start with "s".',
    metrics: [
      { label: 'Active Char', value: 'word1[0]: "s"' },
      { label: 'Row 1 Max', value: 0 }
    ]
  },
  {
    phase: 'FILL_ROW_2',
    grid: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 1, 1, 1],
      [0, 0, 0, 0]
    ],
    rowLabels: ['∅', 's', 'e', 'a'],
    colLabels: ['∅', 'e', 'a', 't'],
    activeCell: { r: 2, c: 1 },
    dependencyCells: [{ r: 1, c: 0, label: 'diag' }],
    formula: 'word1[1] == word2[0] ("e" == "e") => dp[2][1] = 1 + dp[1][0] = 1',
    action: 'Process row 2 (char "e"): matches word2[0] = "e" at column 1.',
    explain: 'Match found! Character "e" matches immediately. Cell [2, 1] becomes 1. Subsequent cells [2, 2] and [2, 3] inherit 1.',
    intuition: 'First common subsequence character is "e".',
    metrics: [
      { label: 'Active Char', value: 'word1[1]: "e"' },
      { label: 'Match At', value: 'col 1 ("e")' },
      { label: 'LCS so far', value: 1, highlight: true }
    ]
  },
  {
    phase: 'FILL_ROW_3_MATCH',
    grid: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 1, 1, 1],
      [0, 1, 2, 0]
    ],
    rowLabels: ['∅', 's', 'e', 'a'],
    colLabels: ['∅', 'e', 'a', 't'],
    activeCell: { r: 3, c: 2 },
    dependencyCells: [{ r: 2, c: 1, label: 'diag' }],
    formula: 'word1[2] == word2[1] ("a" == "a") => dp[3][2] = 1 + dp[2][1] = 2',
    action: 'Process row 3 (char "a"): matches word2[1] = "a" at column 2.',
    explain: 'At cell [3, 2], character "a" matches. Diagonal predecessor dp[2][1] is 1, so dp[3][2] = 1 + 1 = 2! Subsequence "ea" is confirmed.',
    intuition: 'Common subsequence extends to "ea" with length 2.',
    metrics: [
      { label: 'Active Char', value: 'word1[2]: "a"' },
      { label: 'dp[3][2]', value: 2, highlight: true }
    ]
  },
  {
    phase: 'FILL_ROW_3_COMPLETE',
    grid: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 1, 1, 1],
      [0, 1, 2, 2]
    ],
    rowLabels: ['∅', 's', 'e', 'a'],
    colLabels: ['∅', 'e', 'a', 't'],
    activeCell: { r: 3, c: 3 },
    dependencyCells: [{ r: 2, c: 3, label: 'up=1' }, { r: 3, c: 2, label: 'left=2' }],
    formula: 'word1[2] != word2[2] ("a" != "t") => dp[3][3] = max(1, 2) = 2',
    action: 'Process terminal cell [3, 3]: mismatch between "a" and "t". LCS = 2.',
    explain: 'Final entry dp[3][3] takes max(dp[2][3], dp[3][2]) = 2. The Longest Common Subsequence between "sea" and "eat" is "ea" with length 2.',
    intuition: 'Table complete! Now calculate operation counts.',
    metrics: [
      { label: 'LCS Length', value: 2, highlight: true },
      { label: 'LCS String', value: '"ea"' }
    ]
  },
  {
    phase: 'DELETION_ANALYSIS',
    grid: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 1, 1, 1],
      [0, 1, 2, 2]
    ],
    rowLabels: ['∅', 's', 'e', 'a'],
    colLabels: ['∅', 'e', 'a', 't'],
    activeCell: { r: 3, c: 3 },
    formula: 'Deletions = |word1| - LCS = 3 - 2 = 1 (Delete "s")',
    action: 'Analyze required deletions from word1.',
    explain: 'String word1 has length 3 ("sea") and LCS has length 2 ("ea"). The remaining character "s" must be deleted from word1. Deletions required = 1.',
    intuition: 'Only non-LCS characters in the source string are deleted.',
    metrics: [
      { label: '|word1|', value: 3 },
      { label: 'LCS', value: 2 },
      { label: 'Deletions', value: 1, highlight: true }
    ]
  },
  {
    phase: 'INSERTION_ANALYSIS',
    grid: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 1, 1, 1],
      [0, 1, 2, 2]
    ],
    rowLabels: ['∅', 's', 'e', 'a'],
    colLabels: ['∅', 'e', 'a', 't'],
    activeCell: { r: 3, c: 3 },
    formula: 'Insertions = |word2| - LCS = 3 - 2 = 1 (Insert "t")',
    action: 'Analyze required insertions into word1.',
    explain: 'String word2 has length 3 ("eat") and LCS has length 2 ("ea"). The character "t" in word2 is missing from the LCS and must be inserted. Insertions required = 1.',
    intuition: 'Only non-LCS characters in the target string are inserted.',
    metrics: [
      { label: '|word2|', value: 3 },
      { label: 'LCS', value: 2 },
      { label: 'Insertions', value: 1, highlight: true }
    ]
  },
  {
    phase: 'COMPLETED',
    grid: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 1, 1, 1],
      [0, 1, 2, 2]
    ],
    rowLabels: ['∅', 's', 'e', 'a'],
    colLabels: ['∅', 'e', 'a', 't'],
    activeCell: { r: 3, c: 3 },
    formula: 'Total Operations = Deletions (1) + Insertions (1) = 2',
    action: 'Transformation pipeline complete: "sea" ➔ delete "s" ➔ "ea" ➔ insert "t" ➔ "eat".',
    explain: 'Minimum operations = 1 deletion + 1 insertion = 2 operations. Optimal time complexity O(N × M) with O(M) space optimization.',
    intuition: '2 operations is mathematically minimal since LCS "ea" is the largest invariant.',
    metrics: [
      { label: 'Deletions', value: 1 },
      { label: 'Insertions', value: 1 },
      { label: 'Total Ops', value: 2, highlight: true }
    ]
  }
];
