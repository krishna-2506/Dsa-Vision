// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Count Number of Substrings with Exactly K Distinct Characters',
  category: 'Strings & Sliding Window',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Auxiliary (26 character frequency array)',
  description: 'Counts the number of substrings containing exactly K distinct characters using the algebraic sliding window reduction: exact(K) = atMost(K) - atMost(K - 1).'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'AtMost Subtraction Reduction Invariant',
  nodes: [
    { id: 'root', label: 'Exact-K Sliding Window Reduction', children: ['reduction-identity', 'at-most-k-window', 'distinct-expansion', 'left-contraction', 'complexity'] },
    { id: 'reduction-identity', label: '1. Set Difference Reduction', detail: 'The count of substrings with exactly K distinct characters equals atMost(K) - atMost(K - 1).' },
    { id: 'at-most-k-window', label: '2. Monotonic Upper Bound Window', detail: 'atMost(K) maintains a window with at most K distinct characters; each right expansion contributes (right - left + 1) valid substrings.' },
    { id: 'distinct-expansion', label: '3. Frequency Cardinality', detail: 'Maintain freq[26] and a distinct count; whenever freq[s[right]] increments from 0, distinct increases by 1.' },
    { id: 'left-contraction', label: '4. Left Boundary Eviction', detail: 'When distinct > K, increment left and decrement freq[s[left]] until distinct <= K.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Two sliding window passes yield O(N) linear time and O(1) space with 26-entry tables.' }
  ]
};

export const solutions = {
  cpp: `// C++ Count Substrings with Exactly K Distinct Characters
// Time Complexity: O(N) | Space Complexity: O(1)
#include <string>
#include <vector>
using namespace std;

class Solution {
private:
    long long atMostK(const string& s, int k) {
        if (k <= 0) return 0;
        vector<int> freq(26, 0);
        int distinct = 0, left = 0;
        long long count = 0;

        for (int right = 0; right < (int)s.size(); right++) {
            if (freq[s[right] - 'a'] == 0) distinct++;
            freq[s[right] - 'a']++;

            while (distinct > k) {
                freq[s[left] - 'a']--;
                if (freq[s[left] - 'a'] == 0) distinct--;
                left++;
            }

            count += (right - left + 1);
        }
        return count;
    }

public:
    long long substrCount(string s, int k) {
        return atMostK(s, k) - atMostK(s, k - 1);
    }
};`,
  python: `# Python 3 Count Substrings with Exactly K Distinct Characters
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def substrCount(self, s: str, k: int) -> int:
        def at_most(limit: int) -> int:
            if limit <= 0:
                return 0
            freq = {}
            left = 0
            total = 0

            for right, ch in enumerate(s):
                freq[ch] = freq.get(ch, 0) + 1

                while len(freq) > limit:
                    left_ch = s[left]
                    freq[left_ch] -= 1
                    if freq[left_ch] == 0:
                        del freq[left_ch]
                    left += 1

                total += (right - left + 1)
            return total

        return at_most(k) - at_most(k - 1)`,
  java: `// Java Count Substrings with Exactly K Distinct Characters
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
    private long atMost(String s, int k) {
        if (k <= 0) return 0;
        int[] freq = new int[26];
        int distinct = 0, left = 0;
        long count = 0;

        for (int right = 0; right < s.length(); right++) {
            if (freq[s.charAt(right) - 'a'] == 0) distinct++;
            freq[s.charAt(right) - 'a']++;

            while (distinct > k) {
                freq[s.charAt(left) - 'a']--;
                if (freq[s.charAt(left) - 'a'] == 0) distinct--;
                left++;
            }

            count += (right - left + 1);
        }
        return count;
    }

    public long substrCount(String s, int k) {
        return atMost(s, k) - atMost(s, k - 1);
    }
}`,
  javascript: `// JavaScript Count Substrings with Exactly K Distinct Characters
// Time Complexity: O(N) | Space Complexity: O(1)
var substrCount = function(s, k) {
    function atMost(limit) {
        if (limit <= 0) return 0;
        const freq = new Array(26).fill(0);
        const base = 'a'.charCodeAt(0);
        let left = 0, distinct = 0, count = 0;

        for (let right = 0; right < s.length; right++) {
            const rCode = s.charCodeAt(right) - base;
            if (freq[rCode] === 0) distinct++;
            freq[rCode]++;

            while (distinct > limit) {
                const lCode = s.charCodeAt(left) - base;
                freq[lCode]--;
                if (freq[lCode] === 0) distinct--;
                left++;
            }

            count += (right - left + 1);
        }
        return count;
    }

    return atMost(k) - atMost(k - 1);
};`
};

export const steps = [
  {
    title: '1. Decomposition Setup: exact(K) = atMost(K) - atMost(K - 1)',
    phase: 'INITIAL',
    codeLine: 26,
    track: {
      label: 'Input String: s = "pqpqs", Target K = 2',
      items: [
        { val: 'p', status: 'default' },
        { val: 'q', status: 'default' },
        { val: 'p', status: 'default' },
        { val: 'q', status: 'default' },
        { val: 's', status: 'default' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: null,
    windowEnd: null,
    metrics: [
      { label: 'Target K', value: '2' },
      { label: 'Strategy', value: 'atMost(2) - atMost(1)' },
      { label: 'String Length', value: '5' }
    ],
    formula: 'exact(2) = atMost(2) - atMost(1)',
    action: 'Initialize sliding window to compute atMost(2), counting all substrings with <= 2 distinct characters.',
    explain: 'Enforcing exactly K directly in a sliding window is non-monotonic. Computing atMost(K) - atMost(K-1) guarantees monotonic expansion and shrinking.',
    intuition: 'Every valid window of length L ending at right adds exactly L new valid substrings.'
  },
  {
    title: '2. atMost(2) - Step 1: Right = 0 ("p"), Window [0..0]',
    phase: 'AT_MOST_2',
    codeLine: 16,
    track: {
      label: 'atMost(2) Window: "p"',
      items: [
        { val: 'p', status: 'current' },
        { val: 'q', status: 'default' },
        { val: 'p', status: 'default' },
        { val: 'q', status: 'default' },
        { val: 's', status: 'default' }
      ],
      pointers: { L: { idx: 0, color: 'var(--accent-bright)' }, R: { idx: 0, color: 'var(--accent-bright)' } }
    },
    activeI: 0,
    activeJ: 0,
    windowStart: 0,
    windowEnd: 0,
    metrics: [
      { label: 'Distinct', value: '1 <= 2' },
      { label: 'Window Len', value: '1' },
      { label: 'Added Substrings', value: '+1 (["p"])' },
      { label: 'atMost(2) Total', value: '1' }
    ],
    formula: 'count += (0 - 0 + 1) = 1; // Substrings ending at 0: ["p"]',
    action: 'Add char "p". Distinct = 1 <= 2. Add (0 - 0 + 1) = 1 to total.',
    explain: 'Single-char substring "p" has 1 distinct character <= 2.',
    intuition: 'A window of size 1 adds 1 new substring.'
  },
  {
    title: '3. atMost(2) - Step 2: Right = 1 ("q"), Window [0..1]',
    phase: 'AT_MOST_2',
    codeLine: 16,
    track: {
      label: 'atMost(2) Window: "pq"',
      items: [
        { val: 'p', status: 'selected' },
        { val: 'q', status: 'current' },
        { val: 'p', status: 'default' },
        { val: 'q', status: 'default' },
        { val: 's', status: 'default' }
      ],
      pointers: { L: { idx: 0, color: 'var(--accent-bright)' }, R: { idx: 1, color: 'var(--accent-bright)' } }
    },
    activeI: 0,
    activeJ: 1,
    windowStart: 0,
    windowEnd: 1,
    metrics: [
      { label: 'Distinct', value: '2 <= 2' },
      { label: 'Window Len', value: '2' },
      { label: 'Added Substrings', value: '+2 (["pq", "q"])' },
      { label: 'atMost(2) Total', value: '3' }
    ],
    formula: 'count += (1 - 0 + 1) = 1 + 2 = 3; // ["pq", "q"]',
    action: 'Add char "q". Distinct = 2 <= 2. Add (1 - 0 + 1) = 2 new substrings ending at index 1.',
    explain: 'Substrings ending at index 1: "pq" and "q", both having <= 2 distinct characters.',
    intuition: 'Right pointer expansion adds all suffixes of the current valid window.'
  },
  {
    title: '4. atMost(2) - Step 3: Right = 2 ("p"), Window [0..2]',
    phase: 'AT_MOST_2',
    codeLine: 16,
    track: {
      label: 'atMost(2) Window: "pqp"',
      items: [
        { val: 'p', status: 'selected' },
        { val: 'q', status: 'selected' },
        { val: 'p', status: 'current' },
        { val: 'q', status: 'default' },
        { val: 's', status: 'default' }
      ],
      pointers: { L: { idx: 0, color: 'var(--accent-bright)' }, R: { idx: 2, color: 'var(--accent-bright)' } }
    },
    activeI: 0,
    activeJ: 2,
    windowStart: 0,
    windowEnd: 2,
    metrics: [
      { label: 'Distinct', value: '2 <= 2' },
      { label: 'Window Len', value: '3' },
      { label: 'Added Substrings', value: '+3 (["pqp", "qp", "p"])' },
      { label: 'atMost(2) Total', value: '6' }
    ],
    formula: 'count += (2 - 0 + 1) = 3 + 3 = 6; // ["pqp", "qp", "p"]',
    action: '"p" is already present. Distinct remains 2. Add (2 - 0 + 1) = 3 substrings.',
    explain: 'Substrings ending at index 2: "pqp", "qp", "p". All satisfy <= 2 distinct characters.',
    intuition: 'Re-occurrence of known characters does not increase distinct cardinality.'
  },
  {
    title: '5. atMost(2) - Step 4: Right = 3 ("q"), Window [0..3]',
    phase: 'AT_MOST_2',
    codeLine: 16,
    track: {
      label: 'atMost(2) Window: "pqpq"',
      items: [
        { val: 'p', status: 'selected' },
        { val: 'q', status: 'selected' },
        { val: 'p', status: 'selected' },
        { val: 'q', status: 'current' },
        { val: 's', status: 'default' }
      ],
      pointers: { L: { idx: 0, color: 'var(--accent-bright)' }, R: { idx: 3, color: 'var(--accent-bright)' } }
    },
    activeI: 0,
    activeJ: 3,
    windowStart: 0,
    windowEnd: 3,
    metrics: [
      { label: 'Distinct', value: '2 <= 2' },
      { label: 'Window Len', value: '4' },
      { label: 'Added Substrings', value: '+4 (["pqpq", "qpq", "pq", "q"])' },
      { label: 'atMost(2) Total', value: '10' }
    ],
    formula: 'count += (3 - 0 + 1) = 6 + 4 = 10;',
    action: '"q" re-occurs. Distinct = 2 <= 2. Add 4 substrings ending at index 3.',
    explain: 'Substrings ending at 3: "pqpq", "qpq", "pq", "q". All contain only "p" and "q". Total reaches 10.',
    intuition: 'Window reaches length 4 with only 2 distinct characters.'
  },
  {
    title: '6. atMost(2) - Step 5: Right = 4 ("s"), Evict Left to 3 -> Total = 12',
    phase: 'AT_MOST_2',
    codeLine: 21,
    track: {
      label: 'atMost(2) Window: "qs" after Left Shifts',
      items: [
        { val: 'p', status: 'visited' },
        { val: 'q', status: 'visited' },
        { val: 'p', status: 'visited' },
        { val: 'q', status: 'selected' },
        { val: 's', status: 'current' }
      ],
      pointers: { L: { idx: 3, color: 'var(--accent-bright)' }, R: { idx: 4, color: 'var(--accent-bright)' } }
    },
    activeI: 3,
    activeJ: 4,
    windowStart: 3,
    windowEnd: 4,
    metrics: [
      { label: 'Distinct', value: '2 ("q", "s")' },
      { label: 'Left Shifted', value: '0 -> 3 (evicted "p")' },
      { label: 'Added Substrings', value: '+2 (["qs", "s"])' },
      { label: 'atMost(2) Result', value: '12', highlight: true }
    ],
    formula: 'while (distinct > 2) left++; count += (4 - 3 + 1) = 10 + 2 = 12;',
    action: 'Char "s" makes distinct = 3 > 2. Advance left from 0 to 3 to completely eliminate "p". Add (4 - 3 + 1) = 2.',
    explain: 'Shrinking drops all occurrences of "p". New valid window [3..4] has 2 distinct chars ("q", "s"). Total atMost(2) = 12.',
    intuition: 'Contraction restores the <= K invariant before adding the new window size.'
  },
  {
    title: '7. Compute atMost(1): Substrings with <= 1 Distinct Character',
    phase: 'AT_MOST_1',
    codeLine: 31,
    track: {
      label: 'atMost(1) Mono-Character Runs: "p", "q", "p", "q", "s"',
      items: [
        { val: 'p', status: 'match' },
        { val: 'q', status: 'match' },
        { val: 'p', status: 'match' },
        { val: 'q', status: 'match' },
        { val: 's', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: null,
    windowEnd: null,
    metrics: [
      { label: 'atMost(2)', value: '12' },
      { label: 'atMost(1)', value: '5 (all single chars)', highlight: true },
      { label: 'Single Chars', value: '["p", "q", "p", "q", "s"]' }
    ],
    formula: 'atMost(1) = 1 + 1 + 1 + 1 + 1 = 5;',
    action: 'Run atMost with limit = 1. Substrings with <= 1 distinct character are exactly the 5 single-letter substrings.',
    explain: 'No adjacent identical letters exist in "pqpqs", so every length > 1 substring has >= 2 distinct characters. Hence atMost(1) = 5.',
    intuition: 'Subtracting atMost(1) from atMost(2) strips away all mono-character substrings.'
  },
  {
    title: '8. Exact-K Subtraction: 12 - 5 = 7 Substrings with Exactly 2 Distinct',
    phase: 'COMPLETED',
    codeLine: 31,
    track: {
      label: 'Input String: s = "pqpqs" (All 7 Substrings Enumerated)',
      items: [
        { val: 'p', status: 'match' },
        { val: 'q', status: 'match' },
        { val: 'p', status: 'match' },
        { val: 'q', status: 'match' },
        { val: 's', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: null,
    windowEnd: null,
    metrics: [
      { label: 'Exact(2) Count', value: '7', highlight: true },
      { label: 'Formula', value: '12 - 5 = 7' },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1) (26 buckets)' }
    ],
    formula: 'return atMostK(s, 2) - atMostK(s, 1); // 12 - 5 = 7',
    action: 'Return 7. The 7 substrings with exactly 2 distinct characters are: ["pq", "pqp", "pqpq", "qp", "qpq", "pq", "qs"].',
    explain: 'By algebraic set difference, exactly(K) = atMost(K) - atMost(K - 1) seamlessly solves exact-cardinality substring problems in O(N).',
    intuition: 'Avoid complex lookaheads by reducing exact queries into two monotonic prefix sliding windows.'
  }
];
