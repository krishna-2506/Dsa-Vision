// DATA-ONLY — rendered by DpGridRenderer via rendererType

export const meta = {
  title: 'Edit Distance (Levenshtein Distance)',
  category: 'Dynamic Programming',
  difficulty: 'Hard',
  timeComplexity: 'O(N × M) Time',
  spaceComplexity: 'O(M) Space-Optimized',
  description: 'Calculates the minimum number of single-character operations (Insert, Delete, Replace) to transform word1 into word2. If characters match, cost is 0; otherwise take 1 + min(delete, insert, replace).'
};

export const rendererType = 'dp-grid';

export const ideaMap = {
  title: 'Edit Distance (Levenshtein Distance)',
  nodes: [
    { id: 'root', label: 'Levenshtein Edit Distance', children: ['base-boundaries', 'three-operations', 'space-compression'] },
    { id: 'base-boundaries', label: '1. Boundary Conditions', detail: 'dp[0][j] = j (insert j chars) | dp[i][0] = i (delete i chars)' },
    { id: 'three-operations', label: '2. Optimal Substructure', children: ['match-case', 'delete-op', 'insert-op', 'replace-op'] },
    { id: 'match-case', label: 'Match (Cost 0)', detail: 'word1[i-1] == word2[j-1] => dp[i][j] = dp[i-1][j-1]' },
    { id: 'delete-op', label: 'Delete (Cost 1)', detail: 'Top neighbor: dp[i-1][j] + 1' },
    { id: 'insert-op', label: 'Insert (Cost 1)', detail: 'Left neighbor: dp[i][j-1] + 1' },
    { id: 'replace-op', label: 'Replace (Cost 1)', detail: 'Diagonal neighbor: dp[i-1][j-1] + 1' },
    { id: 'space-compression', label: '3. Rolling Memory', detail: 'Tabulation only requires prev and cur row vectors (O(M) space).' }
  ]
};

export const solutions = {
  cpp: `// C++ Edit Distance (Levenshtein Distance)
// Time: O(N * M) | Space: O(M)
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minDistance(string word1, string word2) {
        int n = word1.size(), m = word2.size();
        vector<int> prev(m + 1, 0);

        for (int j = 0; j <= m; j++) prev[j] = j;

        for (int i = 1; i <= n; i++) {
            vector<int> cur(m + 1, 0);
            cur[0] = i;
            for (int j = 1; j <= m; j++) {
                if (word1[i - 1] == word2[j - 1]) {
                    cur[j] = prev[j - 1];
                } else {
                    int del = prev[j];
                    int ins = cur[j - 1];
                    int rep = prev[j - 1];
                    cur[j] = 1 + min({del, ins, rep});
                }
            }
            prev = cur;
        }

        return prev[m];
    }
};`,
  python: `# Python 3 Edit Distance (Levenshtein Distance)
# Time: O(N * M) | Space: O(M)
class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        n, m = len(word1), len(word2)
        prev = list(range(m + 1))

        for i in range(1, n + 1):
            cur = [i] + [0] * m
            for j in range(1, m + 1):
                if word1[i - 1] == word2[j - 1]:
                    cur[j] = prev[j - 1]
                else:
                    del_op = prev[j]
                    ins_op = cur[j - 1]
                    rep_op = prev[j - 1]
                    cur[j] = 1 + min(del_op, ins_op, rep_op)
            prev = cur

        return prev[m]`,
  java: `// Java Edit Distance (Levenshtein Distance)
// Time: O(N * M) | Space: O(M)
class Solution {
    public int minDistance(String word1, String word2) {
        int n = word1.length(), m = word2.length();
        int[] prev = new int[m + 1];

        for (int j = 0; j <= m; j++) prev[j] = j;

        for (int i = 1; i <= n; i++) {
            int[] cur = new int[m + 1];
            cur[0] = i;
            for (int j = 1; j <= m; j++) {
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                    cur[j] = prev[j - 1];
                } else {
                    int del = prev[j];
                    int ins = cur[j - 1];
                    int rep = prev[j - 1];
                    cur[j] = 1 + Math.min(del, Math.min(ins, rep));
                }
            }
            prev = cur;
        }

        return prev[m];
    }
}`,
  javascript: `// JavaScript Edit Distance (Levenshtein Distance)
// Time: O(N * M) | Space: O(M)
var minDistance = function(word1, word2) {
    const n = word1.length, m = word2.length;
    let prev = Array.from({ length: m + 1 }, (_, j) => j);

    for (let i = 1; i <= n; i++) {
        const cur = new Array(m + 1).fill(0);
        cur[0] = i;
        for (let j = 1; j <= m; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                cur[j] = prev[j - 1];
            } else {
                const del = prev[j];
                const ins = cur[j - 1];
                const rep = prev[j - 1];
                cur[j] = 1 + Math.min(del, ins, rep);
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
      [0, 1, 2, 3],
      [1, 0, 0, 0],
      [2, 0, 0, 0],
      [3, 0, 0, 0],
      [4, 0, 0, 0],
      [5, 0, 0, 0]
    ],
    rowLabels: ['∅', 'h', 'o', 'r', 's', 'e'],
    colLabels: ['∅', 'r', 'o', 's'],
    activeCell: { r: 0, c: 0 },
    formula: 'Base Boundaries: dp[0][j] = j (Insertions), dp[i][0] = i (Deletions)',
    action: 'Initialize grid boundaries for word1 = "horse" (rows) and word2 = "ros" (columns).',
    explain: 'Row 0 represents converting "" into prefix of word2 (only insertions possible). Column 0 represents converting prefix of word1 into "" (only deletions possible).',
    intuition: 'Each boundary cell directly counts the trivial insertions or deletions required.',
    metrics: [
      { label: '|word1|', value: 5 },
      { label: '|word2|', value: 3 },
      { label: 'Min Edits', value: '...' }
    ]
  },
  {
    phase: 'ROW_1_REPLACE',
    grid: [
      [0, 1, 2, 3],
      [1, 1, 0, 0],
      [2, 0, 0, 0],
      [3, 0, 0, 0],
      [4, 0, 0, 0],
      [5, 0, 0, 0]
    ],
    rowLabels: ['∅', 'h', 'o', 'r', 's', 'e'],
    colLabels: ['∅', 'r', 'o', 's'],
    activeCell: { r: 1, c: 1 },
    dependencyCells: [
      { r: 0, c: 1, label: 'del=1' },
      { r: 1, c: 0, label: 'ins=1' },
      { r: 0, c: 0, label: 'rep=0' }
    ],
    formula: '"h" != "r" => 1 + min(del:1, ins:1, rep:0) = 1 + 0 = 1',
    action: 'Evaluate [1, 1]: "h" != "r". Choose minimal operation among 3 choices.',
    explain: 'Comparing "h" and "r": Mismatch. Delete costs 1+1=2, insert costs 1+1=2, replace costs 0+1=1. Replacing "h" with "r" is optimal with cost 1.',
    intuition: 'Replacing the mismatched character takes 1 operation.',
    metrics: [
      { label: 'Active Cell', value: '[1, 1]' },
      { label: 'Chosen Op', value: 'Replace "h"-> "r"' },
      { label: 'Cost', value: 1, highlight: true }
    ]
  },
  {
    phase: 'ROW_1_COMPLETE',
    grid: [
      [0, 1, 2, 3],
      [1, 1, 2, 3],
      [2, 0, 0, 0],
      [3, 0, 0, 0],
      [4, 0, 0, 0],
      [5, 0, 0, 0]
    ],
    rowLabels: ['∅', 'h', 'o', 'r', 's', 'e'],
    colLabels: ['∅', 'r', 'o', 's'],
    activeCell: { r: 1, c: 3 },
    formula: 'dp[1][j] completed: [1, 1, 2, 3]',
    action: 'Complete row 1: transforming "h" into prefixes of "ros".',
    explain: '"h" to "ro" requires replace "h"->"r" + insert "o" (cost 2). "h" to "ros" requires replace "h"->"r" + insert "o" + insert "s" (cost 3).',
    intuition: 'Insertions accumulate along columns.',
    metrics: [
      { label: 'Word1 Prefix', value: '"h"' },
      { label: 'Row 1 Max', value: 3 }
    ]
  },
  {
    phase: 'ROW_2_MATCH_O',
    grid: [
      [0, 1, 2, 3],
      [1, 1, 2, 3],
      [2, 2, 1, 2],
      [3, 0, 0, 0],
      [4, 0, 0, 0],
      [5, 0, 0, 0]
    ],
    rowLabels: ['∅', 'h', 'o', 'r', 's', 'e'],
    colLabels: ['∅', 'r', 'o', 's'],
    activeCell: { r: 2, c: 2 },
    dependencyCells: [{ r: 1, c: 1, label: 'diag=1' }],
    formula: 'word1[1] == word2[1] ("o" == "o") => dp[2][2] = dp[1][1] = 1',
    action: 'Evaluate [2, 2]: match found! "o" == "o". Cost is 0 added.',
    explain: 'Because characters are identical, no edit is required for this position! We directly take the diagonal cost dp[1][1] = 1.',
    intuition: 'Character match costs 0 and copies the diagonal subproblem answer.',
    metrics: [
      { label: 'Match Char', value: '"o"' },
      { label: 'dp[2][2]', value: 1, highlight: true }
    ]
  },
  {
    phase: 'ROW_3_MATCH_R',
    grid: [
      [0, 1, 2, 3],
      [1, 1, 2, 3],
      [2, 2, 1, 2],
      [3, 2, 2, 2],
      [4, 0, 0, 0],
      [5, 0, 0, 0]
    ],
    rowLabels: ['∅', 'h', 'o', 'r', 's', 'e'],
    colLabels: ['∅', 'r', 'o', 's'],
    activeCell: { r: 3, c: 1 },
    dependencyCells: [{ r: 2, c: 0, label: 'diag=2' }],
    formula: 'word1[2] == word2[0] ("r" == "r") => dp[3][1] = dp[2][0] = 2',
    action: 'Evaluate row 3: "r" matches "r" at column 1. Row fills with [3, 2, 2, 2].',
    explain: 'Diagonal match at [3, 1] takes dp[2][0] = 2. Transforming "hor" into "ros" evaluates to cost 2.',
    intuition: 'Matching "r" anchors the transformation.',
    metrics: [
      { label: 'Word1 Prefix', value: '"hor"' },
      { label: 'dp[3][3]', value: 2 }
    ]
  },
  {
    phase: 'ROW_4_MATCH_S',
    grid: [
      [0, 1, 2, 3],
      [1, 1, 2, 3],
      [2, 2, 1, 2],
      [3, 2, 2, 2],
      [4, 3, 3, 2],
      [5, 0, 0, 0]
    ],
    rowLabels: ['∅', 'h', 'o', 'r', 's', 'e'],
    colLabels: ['∅', 'r', 'o', 's'],
    activeCell: { r: 4, c: 3 },
    dependencyCells: [{ r: 3, c: 2, label: 'diag=2' }],
    formula: 'word1[3] == word2[2] ("s" == "s") => dp[4][3] = dp[3][2] = 2',
    action: 'Evaluate row 4: "s" matches "s" at column 3. Cell [4, 3] = 2!',
    explain: 'At cell [4, 3], matching "s" copies diagonal predecessor dp[3][2] = 2. Transforming "hors" into "ros" requires only 2 edits (replace "h"->"r", delete "r").',
    intuition: 'Subproblem cost holds steady at 2 due to the match.',
    metrics: [
      { label: 'Match Char', value: '"s"' },
      { label: 'dp[4][3]', value: 2, highlight: true }
    ]
  },
  {
    phase: 'ROW_5_FINAL_CELL',
    grid: [
      [0, 1, 2, 3],
      [1, 1, 2, 3],
      [2, 2, 1, 2],
      [3, 2, 2, 2],
      [4, 3, 3, 2],
      [5, 4, 4, 3]
    ],
    rowLabels: ['∅', 'h', 'o', 'r', 's', 'e'],
    colLabels: ['∅', 'r', 'o', 's'],
    activeCell: { r: 5, c: 3 },
    dependencyCells: [
      { r: 4, c: 3, label: 'del=2' },
      { r: 5, c: 2, label: 'ins=4' },
      { r: 4, c: 2, label: 'rep=3' }
    ],
    formula: '"e" != "s" => 1 + min(del:2, ins:4, rep:3) = 1 + 2 = 3',
    action: 'Evaluate terminal cell [5, 3]: "e" != "s". Choose deletion from top neighbor.',
    explain: 'At terminal cell [5, 3], character "e" != "s". The three options are: Delete "e" (top: 2 + 1 = 3), Insert (left: 4 + 1 = 5), Replace (diag: 3 + 1 = 4). Deleting "e" gives minimum cost 3!',
    intuition: 'Deleting the terminal "e" completes the match to "ros" in 3 edits.',
    metrics: [
      { label: 'Terminal Cell', value: '[5, 3]' },
      { label: 'Delete Cost', value: '2 + 1 = 3' },
      { label: 'Final Distance', value: 3, highlight: true }
    ]
  },
  {
    phase: 'COMPLETED',
    grid: [
      [0, 1, 2, 3],
      [1, 1, 2, 3],
      [2, 2, 1, 2],
      [3, 2, 2, 2],
      [4, 3, 3, 2],
      [5, 4, 4, 3]
    ],
    rowLabels: ['∅', 'h', 'o', 'r', 's', 'e'],
    colLabels: ['∅', 'r', 'o', 's'],
    activeCell: { r: 5, c: 3 },
    formula: 'Output: 3 | Edit Sequence: Replace "h"->"r", Delete "r", Delete "e"',
    action: 'Algorithm complete! Minimum Edit Distance is 3.',
    explain: 'Optimal 3-step sequence: "horse" ➔ (replace \'h\' with \'r\') ➔ "rorse" ➔ (delete middle \'r\') ➔ "rose" ➔ (delete terminal \'e\') ➔ "ros". Guaranteed minimal in O(N × M) time.',
    intuition: 'The Levenshtein dynamic programming table proves 3 is mathematically optimal.',
    metrics: [
      { label: 'word1', value: '"horse"' },
      { label: 'word2', value: '"ros"' },
      { label: 'Edit Distance', value: 3, highlight: true }
    ]
  }
];
