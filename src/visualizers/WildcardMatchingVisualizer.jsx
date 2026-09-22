// DATA-ONLY — rendered by DpGridRenderer via rendererType

export const meta = {
  title: 'Wildcard Matching (DP-34)',
  category: 'Dynamic Programming',
  difficulty: 'Hard',
  timeComplexity: 'O(N × M)',
  spaceComplexity: 'O(M) Space-Optimized',
  description: 'Implements regular wildcard pattern matching supporting "?" (matches any single character) and "*" (matches any sequence of characters, including empty string) via 2D DP grid tabulation.'
};

export const rendererType = 'dp-grid';

export const ideaMap = {
  title: 'Wildcard Matching (DP-34)',
  nodes: [
    { id: 'root', label: 'Wildcard Matching', children: ['state', 'rules', 'star-insight'] },
    { id: 'state', label: '1. 2D Table dp[i][j]', detail: 'dp[i][j] = true if s[0..i-1] matches p[0..j-1]' },
    { id: 'rules', label: '2. Matching Rules', children: ['exact', 'question-mark', 'star'] },
    { id: 'exact', label: 'Exact Match', detail: 's[i-1] == p[j-1] => dp[i][j] = dp[i-1][j-1]' },
    { id: 'question-mark', label: 'Wildcard "?"', detail: 'Matches any single character => dp[i][j] = dp[i-1][j-1]' },
    { id: 'star', label: 'Wildcard "*"', detail: 'dp[i][j] = dp[i-1][j] (match 1+) OR dp[i][j-1] (match 0)' },
    { id: 'star-insight', label: '3. Star Branching Insight', detail: 'Top cell absorbs current character; left cell skips star entirely' }
  ]
};

export const solutions = {
  cpp: `// C++ Wildcard Matching
// Time: O(N * M) | Space: O(M)
#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    bool isMatch(string s, string p) {
        int n = s.size(), m = p.size();
        vector<bool> prev(m + 1, false);
        prev[0] = true;

        for (int j = 1; j <= m; j++) {
            if (p[j - 1] == '*') prev[j] = prev[j - 1];
        }

        for (int i = 1; i <= n; i++) {
            vector<bool> cur(m + 1, false);
            for (int j = 1; j <= m; j++) {
                if (p[j - 1] == s[i - 1] || p[j - 1] == '?') {
                    cur[j] = prev[j - 1];
                } else if (p[j - 1] == '*') {
                    cur[j] = prev[j] || cur[j - 1];
                }
            }
            prev = cur;
        }

        return prev[m];
    }
};`,
  python: `# Python 3 Wildcard Matching
# Time: O(N * M) | Space: O(M)
class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        n, m = len(s), len(p)
        prev = [False] * (m + 1)
        prev[0] = True

        for j in range(1, m + 1):
            if p[j - 1] == '*':
                prev[j] = prev[j - 1]

        for i in range(1, n + 1):
            cur = [False] * (m + 1)
            for j in range(1, m + 1):
                if p[j - 1] == s[i - 1] or p[j - 1] == '?':
                    cur[j] = prev[j - 1]
                elif p[j - 1] == '*':
                    cur[j] = prev[j] or cur[j - 1]
            prev = cur

        return prev[m]`,
  java: `// Java Wildcard Matching
// Time: O(N * M) | Space: O(M)
class Solution {
    public boolean isMatch(String s, String p) {
        int n = s.length(), m = p.length();
        boolean[] prev = new boolean[m + 1];
        prev[0] = true;

        for (int j = 1; j <= m; j++) {
            if (p.charAt(j - 1) == '*') prev[j] = prev[j - 1];
        }

        for (int i = 1; i <= n; i++) {
            boolean[] cur = new boolean[m + 1];
            for (int j = 1; j <= m; j++) {
                if (p.charAt(j - 1) == s.charAt(i - 1) || p.charAt(j - 1) == '?') {
                    cur[j] = prev[j - 1];
                } else if (p.charAt(j - 1) == '*') {
                    cur[j] = prev[j] || cur[j - 1];
                }
            }
            prev = cur;
        }

        return prev[m];
    }
}`,
  javascript: `// JavaScript Wildcard Matching
// Time: O(N * M) | Space: O(M)
var isMatch = function(s, p) {
    const n = s.length, m = p.length;
    let prev = new Array(m + 1).fill(false);
    prev[0] = true;

    for (let j = 1; j <= m; j++) {
        if (p[j - 1] === '*') prev[j] = prev[j - 1];
    }

    for (let i = 1; i <= n; i++) {
        const cur = new Array(m + 1).fill(false);
        for (let j = 1; j <= m; j++) {
            if (p[j - 1] === s[i - 1] || p[j - 1] === '?') {
                cur[j] = prev[j - 1];
            } else if (p[j - 1] === '*') {
                cur[j] = prev[j] || cur[j - 1];
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
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'a', 'b', 'c', 'e', 'b'],
    colLabels: ['∅', 'a', '*', 'c', '?', 'b'],
    activeCell: { r: 0, c: 0 },
    formula: 'dp[0][0] = 1 (Empty text matches empty pattern)',
    action: 'Initialize DP grid: s = "abceb" (rows), p = "a*c?b" (columns).',
    explain: 'dp[i][j] represents whether prefix s[0..i-1] matches pattern prefix p[0..j-1]. The empty string matches empty pattern, so base cell dp[0][0] = 1 (True).',
    intuition: 'Every string comparison problem begins with the empty-prefix boundary.',
    metrics: [
      { label: 's length', value: 5 },
      { label: 'p length', value: 5 },
      { label: 'dp[0][0]', value: 'TRUE', highlight: true }
    ],
    customCard: {
      title: 'Wildcard Semantics',
      rows: [
        { label: 'Char "?"', value: 'Matches exactly 1 arbitrary character (diagonal move)' },
        { label: 'Char "*"', value: 'Matches 0 chars (left cell) or 1+ chars (top cell)' }
      ]
    }
  },
  {
    phase: 'BASE_ROW',
    grid: [
      [1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'a', 'b', 'c', 'e', 'b'],
    colLabels: ['∅', 'a', '*', 'c', '?', 'b'],
    activeCell: { r: 0, c: 1 },
    formula: 'p[0] = "a" != ∅ => dp[0][1] = 0 | All subsequent dp[0][j] = 0',
    action: 'Evaluate Row 0: Empty string cannot match literal "a".',
    explain: 'Non-empty pattern starting with "a" cannot match empty string s="". Thus dp[0][1] = 0, and by extension all dp[0][j] = 0.',
    intuition: 'Only leading asterisks can match an empty string.',
    metrics: [
      { label: 'Row', value: 'i = 0 (empty s)' },
      { label: 'dp[0][1]', value: 'FALSE' },
      { label: 'Base Row', value: 'Complete' }
    ]
  },
  {
    phase: 'MATCH_CHAR',
    grid: [
      [1, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'a', 'b', 'c', 'e', 'b'],
    colLabels: ['∅', 'a', '*', 'c', '?', 'b'],
    activeCell: { r: 1, c: 1 },
    dependencyCells: [{ r: 0, c: 0, label: 'diag' }],
    formula: 's[0] == p[0] ("a" == "a") => dp[1][1] = dp[0][0] = 1',
    action: 'Cell [1, 1]: "a" matches "a" diagonally. Then [1, 2]: "*" absorbs empty.',
    explain: 'Character match: s[0]="a" matches p[0]="a", inheriting dp[0][0]=1 into dp[1][1]. Then at cell [1, 2] (pattern "*"), * can match empty string, taking left neighbor dp[1][1]=1.',
    intuition: 'Literal match transfers truth along the diagonal.',
    metrics: [
      { label: 'Active Cell', value: '[1, 1]' },
      { label: 'Match', value: '"a" == "a"', highlight: true },
      { label: 'dp[1][1]', value: 'TRUE' }
    ],
    decision: {
      label: 'Wildcard Transition at [1, 2] (*)',
      left: 'Match empty: dp[1][1] = 1',
      right: 'Match 1+: dp[0][2] = 0',
      chosen: 'left'
    }
  },
  {
    phase: 'STAR_ABSORB',
    grid: [
      [1, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'a', 'b', 'c', 'e', 'b'],
    colLabels: ['∅', 'a', '*', 'c', '?', 'b'],
    activeCell: { r: 2, c: 2 },
    dependencyCells: [{ r: 1, c: 2, label: 'top' }],
    formula: 'p[1] = "*" => dp[2][2] = dp[1][2] (top) || dp[2][1] (left) = 1 || 0 = 1',
    action: 'Cell [2, 2]: Wildcard "*" absorbs character "b" from string s.',
    explain: 'Because p[1]="*", it can absorb character "b" (extending the sequence) by inheriting from top cell dp[1][2]=1. Thus s="ab" matches pattern "a*".',
    intuition: 'Top dependency allows the star wildcard to consume multiple characters sequentially.',
    metrics: [
      { label: 'Active Cell', value: '[2, 2]' },
      { label: 'Char Absorbed', value: '"b"' },
      { label: 'dp[2][2]', value: 'TRUE', highlight: true }
    ],
    decision: {
      label: 'Star Decision at [2, 2]',
      left: 'Match 0 chars: dp[2][1] = 0',
      right: 'Match 1+ chars: dp[1][2] = 1',
      chosen: 'right'
    }
  },
  {
    phase: 'MATCH_CHAR',
    grid: [
      [1, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'a', 'b', 'c', 'e', 'b'],
    colLabels: ['∅', 'a', '*', 'c', '?', 'b'],
    activeCell: { r: 3, c: 3 },
    dependencyCells: [{ r: 2, c: 2, label: 'diag' }],
    formula: 's[2] == p[2] ("c" == "c") => dp[3][3] = dp[2][2] = 1',
    action: 'Cell [3, 3]: "c" matches "c" diagonally from [2, 2].',
    explain: 'Both s[2] and p[2] are "c". The diagonal predecessor dp[2][2] is 1, so dp[3][3] becomes 1. s="abc" matches p="a*c".',
    intuition: 'Resuming literal matching after a wildcard run.',
    metrics: [
      { label: 'Active Cell', value: '[3, 3]' },
      { label: 'Matched', value: '"c" == "c"', highlight: true },
      { label: 'dp[3][3]', value: 'TRUE' }
    ]
  },
  {
    phase: 'MATCH_QUESTION',
    grid: [
      [1, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 1, 1, 0, 0],
      [0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['∅', 'a', 'b', 'c', 'e', 'b'],
    colLabels: ['∅', 'a', '*', 'c', '?', 'b'],
    activeCell: { r: 4, c: 4 },
    dependencyCells: [{ r: 3, c: 3, label: 'diag' }],
    formula: 'p[3] = "?" matches s[3] = "e" => dp[4][4] = dp[3][3] = 1',
    action: 'Cell [4, 4]: "?" matches character "e" diagonally.',
    explain: 'The "?" wildcard accepts any single character. It accepts s[3]="e", inheriting dp[3][3]=1. Therefore s="abce" matches p="a*c?".',
    intuition: '"?" acts as a universal single-character bridge.',
    metrics: [
      { label: 'Active Cell', value: '[4, 4]' },
      { label: 'Wildcard', value: 'p[3] = "?"', highlight: true },
      { label: 'Char Matched', value: 's[3] = "e"' }
    ]
  },
  {
    phase: 'MATCH_FINAL',
    grid: [
      [1, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 1, 1, 0, 0],
      [0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 1]
    ],
    rowLabels: ['∅', 'a', 'b', 'c', 'e', 'b'],
    colLabels: ['∅', 'a', '*', 'c', '?', 'b'],
    activeCell: { r: 5, c: 5 },
    dependencyCells: [{ r: 4, c: 4, label: 'diag' }],
    formula: 's[4] == p[4] ("b" == "b") => dp[5][5] = dp[4][4] = 1 (MATCH!)',
    action: 'Cell [5, 5]: Final literal "b" matches "b", confirming full string match!',
    explain: 'Final characters match: s[4]="b" == p[4]="b". Inheriting dp[4][4]=1 sets dp[5][5] = 1. The full string "abceb" matches pattern "a*c?b"!',
    intuition: 'Bottom-right cell dp[N][M] holds the definitive boolean result.',
    metrics: [
      { label: 'Final Result', value: 'TRUE', highlight: true },
      { label: 'Matched String', value: '"abceb"' },
      { label: 'Pattern', value: '"a*c?b"' }
    ],
    customCard: {
      title: 'Full Alignment Established',
      rows: [
        { label: 'String Alignment', value: 's: [a] [b] [c] [e] [b]' },
        { label: 'Pattern Alignment', value: 'p: [a] [*] [c] [?] [b]', accent: true }
      ]
    }
  },
  {
    phase: 'EVALUATE',
    grid: [
      [1, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 1, 1, 0, 0],
      [0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 1]
    ],
    rowLabels: ['∅', 'a', 'b', 'c', 'e', 'b'],
    colLabels: ['∅', 'a', '*', 'c', '?', 'b'],
    activeCell: { r: 5, c: 5 },
    dependencyCells: [
      { r: 0, c: 0, label: 'start' },
      { r: 1, c: 1, label: 'a' },
      { r: 2, c: 2, label: '*' },
      { r: 3, c: 3, label: 'c' },
      { r: 4, c: 4, label: '?' },
      { r: 5, c: 5, label: 'b' }
    ],
    formula: 'Optimal Path: [0,0] -> [1,1] -> [2,2] -> [3,3] -> [4,4] -> [5,5]',
    action: 'Trace the valid state trajectory through the DP matrix.',
    explain: 'Tracing dependencies backwards: [5,5] (char b) <- [4,4] (wildcard ?) <- [3,3] (char c) <- [2,2] (wildcard * absorbing b) <- [1,1] (char a) <- [0,0] (base).',
    intuition: 'The DP path proves the existence of a valid alignment without exhaustive recursion.',
    metrics: [
      { label: 'Path Length', value: '5 transitions' },
      { label: 'Result', value: 'Match Valid' },
      { label: 'Complexity', value: 'O(N × M)' }
    ]
  },
  {
    phase: 'COMPLETED',
    grid: [
      [1, 0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0],
      [0, 0, 1, 0, 0, 0],
      [0, 0, 1, 1, 0, 0],
      [0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 1]
    ],
    rowLabels: ['∅', 'a', 'b', 'c', 'e', 'b'],
    colLabels: ['∅', 'a', '*', 'c', '?', 'b'],
    activeCell: null,
    formula: 'Result: isMatch("abceb", "a*c?b") = true',
    action: 'Algorithm completed in O(N × M) time and O(M) auxiliary space.',
    explain: 'By storing only the previous and current row of size M+1, wildcard matching runs in O(N × M) time and minimal O(M) memory. Output is true.',
    intuition: '2D DP tabulation solves arbitrary wildcard patterns predictably in linear-matrix time.',
    metrics: [
      { label: 'Final Output', value: 'true', highlight: true },
      { label: 'Time Complexity', value: 'O(N × M)' },
      { label: 'Space Complexity', value: 'O(M)' }
    ],
    customCard: {
      title: 'Algorithm Summary',
      rows: [
        { label: 'Input Text', value: '"abceb"' },
        { label: 'Pattern', value: '"a*c?b"' },
        { label: 'Decision', value: 'TRUE (Pattern matches text successfully)', accent: true }
      ]
    }
  }
];
