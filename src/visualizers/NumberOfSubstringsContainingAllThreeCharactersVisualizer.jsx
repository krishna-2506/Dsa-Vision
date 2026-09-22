// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Number of Substrings Containing All Three Characters',
  category: 'Sliding Window & Two Pointers',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: "Counts all contiguous substrings containing at least one occurrence of 'a', 'b', and 'c' using the minimal last-seen index formula: 1 + min(lastA, lastB, lastC)."
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Last-Seen Pointers Invariant',
  nodes: [
    { id: 'root', label: 'Minimum Boundary Window Counting', children: ['last-seen-registers', 'all-three-condition', 'prefix-counting-formula', 'running-total', 'complexity'] },
    { id: 'last-seen-registers', label: '1. Track Last-Seen Indices', detail: 'Maintain array lastSeen = [-1, -1, -1] storing the most recent 0-based index of \'a\', \'b\', and \'c\'.' },
    { id: 'all-three-condition', label: '2. Triplet Presence Guard', detail: 'A substring ending at index i can only be valid if all three characters have appeared at least once: min(lastSeen) != -1.' },
    { id: 'prefix-counting-formula', label: '3. Counting Formula', detail: 'If min(lastSeen) = m, any start index from 0 to m forms a valid substring ending at i. Exactly 1 + m valid substrings end at index i.' },
    { id: 'running-total', label: '4. Cumulative Accumulation', detail: 'Directly add (1 + m) to totalCount at each step without iterating through previous characters.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Strictly O(N) time with O(1) space (array of size 3), completely eliminating brute-force O(N^2).' }
  ]
};

export const solutions = {
  cpp: `// C++ Number of Substrings Containing All Three Characters
// Time Complexity: O(N) | Space Complexity: O(1)
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int numberOfSubstrings(string s) {
        vector<int> lastSeen(3, -1);
        int count = 0;

        for (int i = 0; i < (int)s.length(); i++) {
            lastSeen[s[i] - 'a'] = i;

            // If all three characters have appeared at least once
            if (lastSeen[0] != -1 && lastSeen[1] != -1 && lastSeen[2] != -1) {
                count += 1 + min({lastSeen[0], lastSeen[1], lastSeen[2]});
            }
        }

        return count;
    }
};`,
  python: `# Python 3 Number of Substrings Containing All Three Characters
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def numberOfSubstrings(self, s: str) -> int:
        last_seen = [-1, -1, -1]
        count = 0

        for i, ch in enumerate(s):
            last_seen[ord(ch) - ord('a')] = i

            if all(idx != -1 for idx in last_seen):
                count += 1 + min(last_seen)

        return count`,
  java: `// Java Number of Substrings Containing All Three Characters
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
    public int numberOfSubstrings(String s) {
        int[] lastSeen = {-1, -1, -1};
        int count = 0;

        for (int i = 0; i < s.length(); i++) {
            lastSeen[s.charAt(i) - 'a'] = i;

            if (lastSeen[0] != -1 && lastSeen[1] != -1 && lastSeen[2] != -1) {
                count += 1 + Math.min(lastSeen[0], Math.min(lastSeen[1], lastSeen[2]));
            }
        }

        return count;
    }
}`,
  javascript: `// JavaScript Number of Substrings Containing All Three Characters
// Time Complexity: O(N) | Space Complexity: O(1)
var numberOfSubstrings = function(s) {
    const lastSeen = [-1, -1, -1];
    let count = 0;

    for (let i = 0; i < s.length; i++) {
        lastSeen[s.charCodeAt(i) - 97] = i;

        if (lastSeen[0] !== -1 && lastSeen[1] !== -1 && lastSeen[2] !== -1) {
            count += 1 + Math.min(lastSeen[0], lastSeen[1], lastSeen[2]);
        }
    }

    return count;
};`
};

export const steps = [
  {
    title: '1. Setup & Minimal Boundary Formula Invariant',
    phase: 'INITIAL',
    track: {
      label: 's = "bbacba" (N = 6)',
      items: [
        { val: 'b' },
        { val: 'b' },
        { val: 'a' },
        { val: 'c' },
        { val: 'b' },
        { val: 'a' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'lastSeen', value: '[-1, -1, -1]' },
      { label: 'Valid Substrings Found', value: 0 },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Formula', value: '1 + min(lastA, lastB, lastC)', highlight: true }
    ],
    formula: 'vector<int> lastSeen(3, -1); int count = 0;',
    action: 'Initialize lastSeen indices for \'a\', \'b\', \'c\' to -1 and cumulative count to 0.',
    explain: 'Goal: Count how many contiguous substrings contain at least one \'a\', \'b\', and \'c\'.',
    intuition: 'If at index i, the earliest of the three characters occurred at index m = min(lastSeen), then every start index from 0 to m produces a valid substring ending at i. Count added = 1 + m.',
    variables: {
      's': 'bbacba',
      'lastA': -1,
      'lastB': -1,
      'lastC': -1,
      'count': 0
    }
  },
  {
    title: '2. Index 0: s[0] = \'b\' (Missing \'a\' and \'c\')',
    phase: 'SCANNING',
    track: {
      label: 's[0] = \'b\': lastSeen[b] = 0. \'a\' and \'c\' not yet seen.',
      items: [
        { val: 'b', status: 'active', badge: 'lastB = 0' },
        { val: 'b' },
        { val: 'a' },
        { val: 'c' },
        { val: 'b' },
        { val: 'a' }
      ]
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 's[0]', value: "'b'" },
      { label: 'lastSeen [a, b, c]', value: '[-1, 0, -1]' },
      { label: 'All 3 Seen?', value: 'No (Missing a, c)' },
      { label: 'Substrings Added', value: 0 }
    ],
    formula: 'lastSeen[\'b\'] = 0; min = -1 -> count += 0;',
    action: 'Update lastSeen[\'b\'] = 0. Since \'a\' and \'c\' have not appeared, no valid substring can end here.',
    explain: 'Substring "b" does not contain all three characters. Count added = 0.',
    intuition: 'Cannot form valid triplet without all three characters present.',
    variables: {
      'i': 0,
      'lastA': -1,
      'lastB': 0,
      'lastC': -1,
      'count': 0
    }
  },
  {
    title: '3. Index 1: s[1] = \'b\' (lastB Updates to 1)',
    phase: 'SCANNING',
    track: {
      label: 's[1] = \'b\': lastB = 1. Still missing \'a\' and \'c\'.',
      items: [
        { val: 'b' },
        { val: 'b', status: 'active', badge: 'lastB = 1' },
        { val: 'a' },
        { val: 'c' },
        { val: 'b' },
        { val: 'a' }
      ]
    },
    activeI: 1,
    activeJ: null,
    metrics: [
      { label: 's[1]', value: "'b'" },
      { label: 'lastSeen [a, b, c]', value: '[-1, 1, -1]' },
      { label: 'All 3 Seen?', value: 'No' },
      { label: 'Substrings Added', value: 0 }
    ],
    formula: 'lastSeen[\'b\'] = 1; count += 0;',
    action: 'Update lastSeen[\'b\'] = 1. \'a\' and \'c\' are still missing.',
    explain: 'Substrings "bb" and "b" do not contain all three characters. count remains 0.',
    intuition: 'Only the latest occurrence of each character needs to be stored.',
    variables: {
      'i': 1,
      'lastA': -1,
      'lastB': 1,
      'lastC': -1,
      'count': 0
    }
  },
  {
    title: '4. Index 2: s[2] = \'a\' (lastA = 2, Still Missing \'c\')',
    phase: 'SCANNING',
    track: {
      label: 's[2] = \'a\': lastA = 2, lastB = 1. Still missing \'c\'.',
      items: [
        { val: 'b' },
        { val: 'b', status: 'match', badge: 'lastB = 1' },
        { val: 'a', status: 'active', badge: 'lastA = 2' },
        { val: 'c' },
        { val: 'b' },
        { val: 'a' }
      ]
    },
    activeI: 2,
    activeJ: null,
    metrics: [
      { label: 's[2]', value: "'a'" },
      { label: 'lastSeen [a, b, c]', value: '[2, 1, -1]' },
      { label: 'Missing', value: "'c'" },
      { label: 'Substrings Added', value: 0 }
    ],
    formula: 'lastSeen[\'a\'] = 2; min = -1 -> count += 0;',
    action: 'Record lastSeen[\'a\'] = 2. Missing \'c\', so count remains 0.',
    explain: 'Substrings "bba", "ba", "a" are missing \'c\'.',
    intuition: 'All three registers must be >= 0 before substrings can be credited.',
    variables: {
      'i': 2,
      'lastA': 2,
      'lastB': 1,
      'lastC': -1,
      'count': 0
    }
  },
  {
    title: '5. Index 3: s[3] = \'c\' (All 3 Seen! +2 Substrings)',
    phase: 'COUNT_VALID',
    track: {
      label: 'lastSeen = [a:2, b:1, c:3]. min = 1 -> +2 Substrings: "bbac", "bac"',
      items: [
        { val: 'b', status: 'match', badge: 'Start 0 ("bbac")' },
        { val: 'b', status: 'match', badge: 'Start 1 ("bac")' },
        { val: 'a', status: 'match', badge: 'lastA = 2' },
        { val: 'c', status: 'active', badge: 'lastC = 3' },
        { val: 'b' },
        { val: 'a' }
      ]
    },
    activeI: 3,
    activeJ: null,
    metrics: [
      { label: 'lastSeen [a, b, c]', value: '[2, 1, 3]' },
      { label: 'min(lastSeen)', value: 'min(2, 1, 3) = 1', highlight: true },
      { label: 'Added at Index 3', value: '1 + 1 = 2 Substrings', highlight: true },
      { label: 'Cumulative Count', value: 2 }
    ],
    formula: 'count += 1 + min(2, 1, 3) = 1 + 1 = 2;',
    action: 'First occurrence of \'c\'! min(lastSeen) = 1. Add 1 + 1 = 2 valid substrings.',
    explain: 'Substrings ending at index 3 that contain all 3 characters are: "bbac" (starts at 0) and "bac" (starts at 1). Total count = 2.',
    intuition: 'Any starting index <= min(lastSeen) is guaranteed to contain at least one of every character.',
    variables: {
      'i': 3,
      'lastA': 2,
      'lastB': 1,
      'lastC': 3,
      'minLast': 1,
      'count': 2
    }
  },
  {
    title: '6. Index 4: s[4] = \'b\' (lastB = 4 -> min = 2, +3 Substrings)',
    phase: 'COUNT_VALID',
    track: {
      label: 'lastSeen = [a:2, b:4, c:3]. min = 2 -> +3 Substrings: "bbacb", "bacb", "acb"',
      items: [
        { val: 'b', status: 'match', badge: 'Start 0' },
        { val: 'b', status: 'match', badge: 'Start 1' },
        { val: 'a', status: 'match', badge: 'Start 2' },
        { val: 'c', status: 'match', badge: 'lastC = 3' },
        { val: 'b', status: 'active', badge: 'lastB = 4' },
        { val: 'a' }
      ]
    },
    activeI: 4,
    activeJ: null,
    metrics: [
      { label: 'lastSeen [a, b, c]', value: '[2, 4, 3]' },
      { label: 'min(lastSeen)', value: 'min(2, 4, 3) = 2', highlight: true },
      { label: 'Added at Index 4', value: '1 + 2 = 3 Substrings', highlight: true },
      { label: 'Cumulative Count', value: '2 + 3 = 5', highlight: true }
    ],
    formula: 'count += 1 + min(2, 4, 3) = 1 + 2 = 3; total = 5;',
    action: 'Update lastSeen[\'b\'] = 4. min(lastSeen) increases to 2. Add 1 + 2 = 3 substrings.',
    explain: 'Valid substrings ending at index 4: "bbacb" (start 0), "bacb" (start 1), "acb" (start 2). Total count becomes 5.',
    intuition: 'Because lastB advanced to 4, the bottleneck min index shifted forward from 1 to 2.',
    variables: {
      'i': 4,
      'lastA': 2,
      'lastB': 4,
      'lastC': 3,
      'minLast': 2,
      'count': 5
    }
  },
  {
    title: '7. Index 5: s[5] = \'a\' (lastA = 5 -> min = 3, +4 Substrings)',
    phase: 'COUNT_VALID',
    track: {
      label: 'lastSeen = [a:5, b:4, c:3]. min = 3 -> +4 Substrings: "bbacba", "bacba", "acba", "cba"',
      items: [
        { val: 'b', status: 'match', badge: 'Start 0' },
        { val: 'b', status: 'match', badge: 'Start 1' },
        { val: 'a', status: 'match', badge: 'Start 2' },
        { val: 'c', status: 'match', badge: 'Start 3' },
        { val: 'b', status: 'match', badge: 'lastB = 4' },
        { val: 'a', status: 'active', badge: 'lastA = 5' }
      ]
    },
    activeI: 5,
    activeJ: null,
    metrics: [
      { label: 'lastSeen [a, b, c]', value: '[5, 4, 3]' },
      { label: 'min(lastSeen)', value: 'min(5, 4, 3) = 3', highlight: true },
      { label: 'Added at Index 5', value: '1 + 3 = 4 Substrings', highlight: true },
      { label: 'Cumulative Count', value: '5 + 4 = 9', highlight: true }
    ],
    formula: 'count += 1 + min(5, 4, 3) = 1 + 3 = 4; total = 9;',
    action: 'Update lastSeen[\'a\'] = 5. min(lastSeen) = 3. Add 1 + 3 = 4 substrings.',
    explain: 'Valid substrings ending at index 5: "bbacba", "bacba", "acba", "cba" (starts at 0, 1, 2, 3). Total reaches 9.',
    intuition: 'Each step directly adds the exact number of valid substrings without scanning backwards.',
    variables: {
      'i': 5,
      'lastA': 5,
      'lastB': 4,
      'lastC': 3,
      'minLast': 3,
      'count': 9
    }
  },
  {
    title: '8. Result: Total Substrings With (a, b, c) = 9',
    phase: 'COMPLETED',
    track: {
      label: 'Complete String Traversed: Total 9 Substrings Identified',
      items: [
        { val: 'b', status: 'match' },
        { val: 'b', status: 'match' },
        { val: 'a', status: 'match' },
        { val: 'c', status: 'match' },
        { val: 'b', status: 'match' },
        { val: 'a', status: 'match', badge: '👑 Total = 9' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'String Length', value: 6 },
      { label: 'Valid Substrings', value: 9, highlight: true },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1) Auxiliary' }
    ],
    formula: 'return count = 9;',
    action: 'Traversal finished. Return cumulative total count 9.',
    explain: 'Total valid substrings: 2 (ending at 3) + 3 (ending at 4) + 4 (ending at 5) = 9.',
    intuition: 'The last-seen pointer technique calculates all valid windows in purely linear O(N) time with O(1) space.',
    variables: {
      'result': 9,
      'timeComplexity': 'O(N)',
      'spaceComplexity': 'O(1)'
    }
  }
];
