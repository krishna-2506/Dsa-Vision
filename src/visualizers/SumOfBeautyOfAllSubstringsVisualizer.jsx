// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Sum of Beauty of All Substrings',
  category: 'Strings & Hash Map',
  difficulty: 'Medium',
  timeComplexity: 'O(N^2 * 26)',
  spaceComplexity: 'O(1) Auxiliary (26 frequency counters)',
  description: 'Calculates the sum of beauties across all substrings, where the beauty of a substring is defined as the difference between the maximum and minimum non-zero character frequencies.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Incremental Substring Beauty Accumulator Invariant',
  nodes: [
    { id: 'root', label: 'Substring Beauty Search', children: ['beauty-definition', 'fixed-start-expansion', 'running-frequency-table', 'extremum-scan', 'complexity'] },
    { id: 'beauty-definition', label: '1. Beauty Metric Formalization', detail: 'For any substring s[i..j], beauty = max(freq) - min(freq > 0). If all characters appear with identical frequencies, beauty is 0.' },
    { id: 'fixed-start-expansion', label: '2. Fixed-Start Expansion Loop', detail: 'Fix start index i and expand right endpoint j from i to N - 1, generating every prefix of s[i..N-1].' },
    { id: 'running-frequency-table', label: '3. O(1) Incremental Frequency Update', detail: 'As j increments, update only freq[s[j] - "a"]++ in O(1) rather than recounting the entire substring.' },
    { id: 'extremum-scan', label: '4. 26-Bucket Extremum Resolution', detail: 'Inspect the 26-element frequency table in constant time O(26) to determine current maxFreq and minFreq.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'O(N^2 * 26) = O(N^2) total operations with strictly O(1) auxiliary space (26 integer buckets).' }
  ]
};

export const solutions = {
  cpp: `// C++ Sum of Beauty of All Substrings
// Time Complexity: O(N^2 * 26) | Space Complexity: O(1)
#include <string>
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

class Solution {
public:
    int beautySum(string s) {
        int n = s.size();
        int totalBeauty = 0;

        for (int i = 0; i < n; i++) {
            vector<int> freq(26, 0);
            for (int j = i; j < n; j++) {
                freq[s[j] - 'a']++;

                int maxFreq = 0;
                int minFreq = INT_MAX;
                for (int c = 0; c < 26; c++) {
                    if (freq[c] > 0) {
                        maxFreq = max(maxFreq, freq[c]);
                        minFreq = min(minFreq, freq[c]);
                    }
                }

                totalBeauty += (maxFreq - minFreq);
            }
        }

        return totalBeauty;
    }
};`,
  python: `# Python 3 Sum of Beauty of All Substrings
# Time Complexity: O(N^2 * 26) | Space Complexity: O(1)
class Solution:
    def beautySum(self, s: str) -> int:
        n = len(s)
        total_beauty = 0

        for i in range(n):
            freq = [0] * 26
            for j in range(i, n):
                freq[ord(s[j]) - ord('a')] += 1

                counts = [c for c in freq if c > 0]
                if counts:
                    total_beauty += (max(counts) - min(counts))

        return total_beauty`,
  java: `// Java Sum of Beauty of All Substrings
// Time Complexity: O(N^2 * 26) | Space Complexity: O(1)
class Solution {
    public int beautySum(String s) {
        int n = s.length();
        int totalBeauty = 0;

        for (int i = 0; i < n; i++) {
            int[] freq = new int[26];
            for (int j = i; j < n; j++) {
                freq[s.charAt(j) - 'a']++;

                int maxFreq = 0;
                int minFreq = Integer.MAX_VALUE;
                for (int c = 0; c < 26; c++) {
                    if (freq[c] > 0) {
                        maxFreq = Math.max(maxFreq, freq[c]);
                        minFreq = Math.min(minFreq, freq[c]);
                    }
                }

                totalBeauty += (maxFreq - minFreq);
            }
        }

        return totalBeauty;
    }
}`,
  javascript: `// JavaScript Sum of Beauty of All Substrings
// Time Complexity: O(N^2 * 26) | Space Complexity: O(1)
var beautySum = function(s) {
    const n = s.length;
    let totalBeauty = 0;
    const base = 'a'.charCodeAt(0);

    for (let i = 0; i < n; i++) {
        const freq = new Array(26).fill(0);
        for (let j = i; j < n; j++) {
            freq[s.charCodeAt(j) - base]++;

            let maxFreq = 0;
            let minFreq = Infinity;
            for (let c = 0; c < 26; c++) {
                if (freq[c] > 0) {
                    if (freq[c] > maxFreq) maxFreq = freq[c];
                    if (freq[c] < minFreq) minFreq = freq[c];
                }
            }

            totalBeauty += (maxFreq - minFreq);
        }
    }

    return totalBeauty;
};`
};

export const steps = [
  {
    title: '1. Problem Setup & String Inspection: s = "aabcb"',
    phase: 'INITIAL',
    codeLine: 12,
    track: {
      label: 'Input String: s = "aabcb"',
      items: [
        { val: 'a', status: 'default' },
        { val: 'a', status: 'default' },
        { val: 'b', status: 'default' },
        { val: 'c', status: 'default' },
        { val: 'b', status: 'default' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: null,
    windowEnd: null,
    metrics: [
      { label: 'String Length', value: '5' },
      { label: 'Substrings', value: '15 total' },
      { label: 'Beauty Metric', value: 'maxFreq - minFreq' },
      { label: 'Total Beauty', value: '0' }
    ],
    formula: 'totalBeauty = 0; for (int i = 0; i < n; i++) ...',
    action: 'Initialize total beauty accumulator = 0. Prepare nested loop with start pointer i.',
    explain: 'For every possible substring s[i..j], we count character frequencies, find max and non-zero min frequency, and accumulate their difference.',
    intuition: 'Fixing start index i and expanding j rightward allows updating frequency counts incrementally in O(1).'
  },
  {
    title: '2. Substring [0..0] "a": Frequencies Balanced -> Beauty = 0',
    phase: 'EVALUATE',
    codeLine: 20,
    track: {
      label: 'Current Substring: "a"',
      items: [
        { val: 'a', status: 'current' },
        { val: 'a', status: 'dim' },
        { val: 'b', status: 'dim' },
        { val: 'c', status: 'dim' },
        { val: 'b', status: 'dim' }
      ],
      pointers: { i: { idx: 0, color: 'var(--accent-bright)' }, j: { idx: 0, color: 'var(--accent-bright)' } }
    },
    activeI: 0,
    activeJ: 0,
    windowStart: 0,
    windowEnd: 0,
    metrics: [
      { label: 'Window', value: '[0..0] ("a")' },
      { label: 'maxFreq', value: '1 (\'a\')' },
      { label: 'minFreq', value: '1 (\'a\')' },
      { label: 'Beauty', value: '0 (1 - 1)' },
      { label: 'Total Beauty', value: '0' }
    ],
    formula: 'maxFreq = 1, minFreq = 1; beauty = 1 - 1 = 0;',
    action: 'Add char "a". freq[\'a\'] = 1. max = 1, min = 1. Beauty = 0. totalBeauty += 0.',
    explain: 'Single-character substrings have equal max and min frequencies (1), so beauty is always 0.',
    intuition: 'Mono-character and uniform substrings have 0 beauty.'
  },
  {
    title: '3. Substring [0..1] "aa": All Same Character -> Beauty = 0',
    phase: 'EVALUATE',
    codeLine: 20,
    track: {
      label: 'Current Substring: "aa"',
      items: [
        { val: 'a', status: 'selected' },
        { val: 'a', status: 'current' },
        { val: 'b', status: 'dim' },
        { val: 'c', status: 'dim' },
        { val: 'b', status: 'dim' }
      ],
      pointers: { i: { idx: 0, color: 'var(--accent-bright)' }, j: { idx: 1, color: 'var(--accent-bright)' } }
    },
    activeI: 0,
    activeJ: 1,
    windowStart: 0,
    windowEnd: 1,
    metrics: [
      { label: 'Window', value: '[0..1] ("aa")' },
      { label: 'maxFreq', value: '2 (\'a\')' },
      { label: 'minFreq', value: '2 (\'a\')' },
      { label: 'Beauty', value: '0 (2 - 2)' },
      { label: 'Total Beauty', value: '0' }
    ],
    formula: 'maxFreq = 2, minFreq = 2; beauty = 2 - 2 = 0;',
    action: 'Expand j to 1. freq[\'a\'] = 2. Only character present is \'a\'. max = 2, min = 2. Beauty = 0.',
    explain: 'Only one distinct character exists in the window. maxFreq == minFreq == 2, so beauty = 0.',
    intuition: 'Beauty requires at least two distinct characters with differing frequencies to be strictly positive.'
  },
  {
    title: '4. Substring [0..2] "aab": First Non-Zero Beauty (+1)',
    phase: 'EVALUATE',
    codeLine: 28,
    track: {
      label: 'Current Substring: "aab"',
      items: [
        { val: 'a', status: 'selected' },
        { val: 'a', status: 'selected' },
        { val: 'b', status: 'current' },
        { val: 'c', status: 'dim' },
        { val: 'b', status: 'dim' }
      ],
      pointers: { i: { idx: 0, color: 'var(--accent-bright)' }, j: { idx: 2, color: 'var(--accent-bright)' } }
    },
    activeI: 0,
    activeJ: 2,
    windowStart: 0,
    windowEnd: 2,
    metrics: [
      { label: 'Window', value: '[0..2] ("aab")' },
      { label: 'maxFreq', value: '2 (\'a\')' },
      { label: 'minFreq', value: '1 (\'b\')' },
      { label: 'Beauty', value: '1 (2 - 1)', highlight: true },
      { label: 'Total Beauty', value: '1', highlight: true }
    ],
    formula: 'beauty = max(2, 1) - min(2, 1) = 2 - 1 = 1; total += 1;',
    action: 'Add char "b". freq[\'a\'] = 2, freq[\'b\'] = 1. max = 2, min = 1. Beauty = 1. totalBeauty = 1.',
    explain: 'In "aab", "a" appears twice and "b" appears once. Difference is 2 - 1 = 1.',
    intuition: 'Unequal character distribution creates positive beauty.',
    customCard: {
      title: 'Active Substring Frequencies',
      rows: [
        { label: 'freq[\'a\']', value: '2 (Max Frequency)', accent: true },
        { label: 'freq[\'b\']', value: '1 (Min Frequency)', accent: true }
      ]
    }
  },
  {
    title: '5. Substring [0..3] "aabc": Frequency Disparity -> Beauty = 1',
    phase: 'EVALUATE',
    codeLine: 28,
    track: {
      label: 'Current Substring: "aabc"',
      items: [
        { val: 'a', status: 'selected' },
        { val: 'a', status: 'selected' },
        { val: 'b', status: 'selected' },
        { val: 'c', status: 'current' },
        { val: 'b', status: 'dim' }
      ],
      pointers: { i: { idx: 0, color: 'var(--accent-bright)' }, j: { idx: 3, color: 'var(--accent-bright)' } }
    },
    activeI: 0,
    activeJ: 3,
    windowStart: 0,
    windowEnd: 3,
    metrics: [
      { label: 'Window', value: '[0..3] ("aabc")' },
      { label: 'maxFreq', value: '2 (\'a\')' },
      { label: 'minFreq', value: '1 (\'b\', \'c\')' },
      { label: 'Beauty', value: '1 (2 - 1)', highlight: true },
      { label: 'Total Beauty', value: '2', highlight: true }
    ],
    formula: 'beauty = 2 - 1 = 1; total = 1 + 1 = 2;',
    action: 'Add char "c". freq[\'a\'] = 2, freq[\'b\'] = 1, freq[\'c\'] = 1. max = 2, min = 1. totalBeauty = 2.',
    explain: 'Non-zero frequencies are {2, 1, 1}. Maximum is 2 and minimum is 1. Beauty = 1.',
    intuition: 'Multiple characters having min frequency does not affect minFreq calculation.'
  },
  {
    title: '6. Substring [0..4] "aabcb": Full String -> Beauty = 1',
    phase: 'EVALUATE',
    codeLine: 28,
    track: {
      label: 'Current Substring: "aabcb"',
      items: [
        { val: 'a', status: 'selected' },
        { val: 'a', status: 'selected' },
        { val: 'b', status: 'selected' },
        { val: 'c', status: 'selected' },
        { val: 'b', status: 'current' }
      ],
      pointers: { i: { idx: 0, color: 'var(--accent-bright)' }, j: { idx: 4, color: 'var(--accent-bright)' } }
    },
    activeI: 0,
    activeJ: 4,
    windowStart: 0,
    windowEnd: 4,
    metrics: [
      { label: 'Window', value: '[0..4] ("aabcb")' },
      { label: 'maxFreq', value: '2 (\'a\', \'b\')' },
      { label: 'minFreq', value: '1 (\'c\')' },
      { label: 'Beauty', value: '1 (2 - 1)', highlight: true },
      { label: 'Total Beauty', value: '3', highlight: true }
    ],
    formula: 'freq: a=2, b=2, c=1; beauty = 2 - 1 = 1; total = 2 + 1 = 3;',
    action: 'Add second "b". freq[\'a\'] = 2, freq[\'b\'] = 2, freq[\'c\'] = 1. max = 2, min = 1. totalBeauty = 3.',
    explain: 'Both "a" and "b" appear twice, "c" appears once. Max = 2, Min = 1. Beauty = 1. Substrings starting at 0 contribute 3 total.',
    intuition: 'Prefix scan for start index i = 0 is now complete.'
  },
  {
    title: '7. Scan Subsequent Starts i = 1 and i = 2',
    phase: 'EVALUATE',
    codeLine: 28,
    track: {
      label: 'Substrings with Beauty: "abcb" [1..4] and "bcb" [2..4]',
      items: [
        { val: 'a', status: 'dim' },
        { val: 'a', status: 'dim' },
        { val: 'b', status: 'selected' },
        { val: 'c', status: 'selected' },
        { val: 'b', status: 'selected' }
      ],
      pointers: { i: { idx: 2, color: 'var(--accent-bright)' }, j: { idx: 4, color: 'var(--accent-bright)' } }
    },
    activeI: 2,
    activeJ: 4,
    windowStart: 2,
    windowEnd: 4,
    metrics: [
      { label: 'Substr "abcb"', value: 'Beauty = 1 (b=2, a=1, c=1)' },
      { label: 'Substr "bcb"', value: 'Beauty = 1 (b=2, c=1)' },
      { label: 'Remaining', value: 'Beauty = 0' },
      { label: 'Total Beauty', value: '5', highlight: true }
    ],
    formula: 'total = 3 + 1 ("abcb") + 1 ("bcb") = 5;',
    action: 'Iterate i = 1, 2, 3, 4. Substring "abcb" adds +1. Substring "bcb" adds +1. All other substrings have beauty 0.',
    explain: 'Starting at i = 1, substring "abcb" has b=2, a=1, c=1 (2-1=1). Starting at i = 2, substring "bcb" has b=2, c=1 (2-1=1). Total reaches 5.',
    intuition: 'All non-zero beauties in "aabcb" are accounted for across all start positions.'
  },
  {
    title: '8. Complete Substring Enumeration: Total Beauty = 5',
    phase: 'COMPLETED',
    codeLine: 35,
    track: {
      label: 'Full String: s = "aabcb" (All 15 Substrings Processed)',
      items: [
        { val: 'a', status: 'match' },
        { val: 'a', status: 'match' },
        { val: 'b', status: 'match' },
        { val: 'c', status: 'match' },
        { val: 'b', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: null,
    windowEnd: null,
    metrics: [
      { label: 'Total Beauty', value: '5', highlight: true },
      { label: 'Substrings Evaluated', value: '15 / 15' },
      { label: 'Time Complexity', value: 'O(N^2 * 26)' },
      { label: 'Space Complexity', value: 'O(1) (26 counters)' }
    ],
    formula: 'return totalBeauty; // 5',
    action: 'Nested loops terminate. Return total beauty = 5.',
    explain: 'Exactly 5 substrings had beauty 1 ("aab", "aabc", "aabcb", "abcb", "bcb") while the remaining 10 had beauty 0. Total sum = 5.',
    intuition: 'Updating running character frequencies incrementally reduces an O(N^3) brute-force into O(N^2 * 26).',
    customCard: {
      title: 'Beauty Aggregation Summary',
      rows: [
        { label: 'Final Beauty Sum', value: '5', accent: true },
        { label: 'Complexity', value: 'O(N^2) time, O(1) space', accent: true }
      ]
    }
  }
];
