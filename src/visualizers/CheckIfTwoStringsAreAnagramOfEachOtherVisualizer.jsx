// DATA-ONLY — rendered by DualArrayRenderer via rendererType

export const meta = {
  title: 'Check if Two Strings are Anagrams (Valid Anagram)',
  category: 'Strings & Hashing',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) (26 English lowercase characters)',
  description: 'Determines whether string T is an anagram of string S by comparing character frequencies using a single fixed-size 26-element frequency delta buffer in one pass.'
};

export const rendererType = 'dual-array';

export const ideaMap = {
  title: 'Character Frequency Delta Invariant',
  nodes: [
    { id: 'root', label: 'Frequency Balancing Strategy', children: ['length-guard', 'single-pass-delta', 'hash-cancellation', 'zero-verification', 'complexity'] },
    { id: 'length-guard', label: '1. Cardinality Guard', detail: 'If len(s) != len(t), string T cannot be a rearrangement of S; terminate immediately with false.' },
    { id: 'single-pass-delta', label: '2. Synchronized Delta Pass', detail: 'Increment freq[s[i] - "a"] for S while simultaneously decrementing freq[t[i] - "a"] for T in the same loop.' },
    { id: 'hash-cancellation', label: '3. Mutual Cancellation', detail: 'Characters appearing with identical frequencies in both strings cancel out to net 0 in the count table.' },
    { id: 'zero-verification', label: '4. Non-Zero Check', detail: 'After the traversal, if any element in freq[26] != 0, a frequency discrepancy exists; return false.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'O(N) time with strictly O(1) auxiliary space (fixed 26-entry integer table).' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal 26-element Frequency Hash Array
// Time Complexity: O(N) | Space Complexity: O(1)
#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.length() != t.length()) return false;

        vector<int> freq(26, 0);

        for (int i = 0; i < (int)s.length(); i++) {
            freq[s[i] - 'a']++;
            freq[t[i] - 'a']--;
        }

        for (int count : freq) {
            if (count != 0) return false;
        }

        return true;
    }
};`,
  python: `# Python 3 Optimal Frequency Array Anagram Check
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False

        freq = [0] * 26

        for char_s, char_t in zip(s, t):
            freq[ord(char_s) - ord('a')] += 1
            freq[ord(char_t) - ord('a')] -= 1

        return all(count == 0 for count in freq)`,
  java: `// Java Optimal 26-element Frequency Array
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;

        int[] freq = new int[26];

        for (int i = 0; i < s.length(); i++) {
            freq[s.charAt(i) - 'a']++;
            freq[t.charAt(i) - 'a']--;
        }

        for (int count : freq) {
            if (count != 0) return false;
        }

        return true;
    }
}`,
  javascript: `// JavaScript Optimal 26-element Frequency Array
// Time Complexity: O(N) | Space Complexity: O(1)
var isAnagram = function(s, t) {
    if (s.length !== t.length) return false;

    const freq = new Array(26).fill(0);
    const base = 'a'.charCodeAt(0);

    for (let i = 0; i < s.length; i++) {
        freq[s.charCodeAt(i) - base]++;
        freq[t.charCodeAt(i) - base]--;
    }

    return freq.every(count => count === 0);
};`
};

export const steps = [
  {
    title: '1. Length Validation & Frequency Array Initialization',
    phase: 'INITIAL',
    codeLine: 13,
    tracks: [
      {
        label: 'String S: "anagram"',
        items: [
          { val: 'a', status: 'default' },
          { val: 'n', status: 'default' },
          { val: 'a', status: 'default' },
          { val: 'g', status: 'default' },
          { val: 'r', status: 'default' },
          { val: 'a', status: 'default' },
          { val: 'm', status: 'default' }
        ]
      },
      {
        label: 'String T: "nagaram"',
        items: [
          { val: 'n', status: 'default' },
          { val: 'a', status: 'default' },
          { val: 'g', status: 'default' },
          { val: 'a', status: 'default' },
          { val: 'r', status: 'default' },
          { val: 'a', status: 'default' },
          { val: 'm', status: 'default' }
        ]
      }
    ],
    activeI: null,
    activePrev: null,
    metrics: [
      { label: 'Length S', value: '7' },
      { label: 'Length T', value: '7' },
      { label: 'Length Match', value: 'true' },
      { label: 'Delta Table', value: 'freq[26] = 0' }
    ],
    formula: 'if (s.length() != t.length()) return false; freq[26] = 0;',
    action: 'Verify lengths match (7 == 7). Allocate 26-entry integer delta array initialized to 0.',
    explain: 'Both strings have identical length 7. If lengths differed, they could never be anagrams.',
    intuition: 'A fixed 26-integer table avoids the overhead of dynamic hash maps and provides O(1) indexing.'
  },
  {
    title: '2. Index 0: s[0] = "a" (+1) and t[0] = "n" (-1)',
    phase: 'SCANNING',
    codeLine: 18,
    tracks: [
      {
        label: 'String S: "anagram"',
        items: [
          { val: 'a', status: 'current' },
          { val: 'n', status: 'default' },
          { val: 'a', status: 'default' },
          { val: 'g', status: 'default' },
          { val: 'r', status: 'default' },
          { val: 'a', status: 'default' },
          { val: 'm', status: 'default' }
        ]
      },
      {
        label: 'String T: "nagaram"',
        items: [
          { val: 'n', status: 'current' },
          { val: 'a', status: 'default' },
          { val: 'g', status: 'default' },
          { val: 'a', status: 'default' },
          { val: 'r', status: 'default' },
          { val: 'a', status: 'default' },
          { val: 'm', status: 'default' }
        ]
      }
    ],
    activeI: 0,
    activePrev: null,
    metrics: [
      { label: 'Current s[0]', value: "'a' (+1)" },
      { label: 'Current t[0]', value: "'n' (-1)" },
      { label: "freq['a']", value: '+1' },
      { label: "freq['n']", value: '-1' }
    ],
    formula: "freq[s[0]-'a']++; freq[t[0]-'a']--;",
    action: 'Increment bucket for "a" to +1. Decrement bucket for "n" to -1.',
    explain: 'String S contributes one "a", while string T consumes one "n". Frequencies diverge temporarily.',
    intuition: 'Any valid anagram will cancel out these temporary positive and negative deltas before the end.',
    customCard: {
      title: 'Frequency Delta Status',
      rows: [
        { label: "freq['a']", value: '+1 (pending match in T)', accent: true },
        { label: "freq['n']", value: '-1 (pending match in S)', accent: true }
      ]
    }
  },
  {
    title: '3. Index 1: s[1] = "n" (+1) and t[1] = "a" (-1) -> Mutual Cancellation',
    phase: 'SCANNING',
    codeLine: 18,
    tracks: [
      {
        label: 'String S: "anagram"',
        items: [
          { val: 'a', status: 'visited' },
          { val: 'n', status: 'match' },
          { val: 'a', status: 'default' },
          { val: 'g', status: 'default' },
          { val: 'r', status: 'default' },
          { val: 'a', status: 'default' },
          { val: 'm', status: 'default' }
        ]
      },
      {
        label: 'String T: "nagaram"',
        items: [
          { val: 'n', status: 'visited' },
          { val: 'a', status: 'match' },
          { val: 'g', status: 'default' },
          { val: 'a', status: 'default' },
          { val: 'r', status: 'default' },
          { val: 'a', status: 'default' },
          { val: 'm', status: 'default' }
        ]
      }
    ],
    activeI: 1,
    activePrev: 0,
    metrics: [
      { label: 'Current s[1]', value: "'n' (+1)" },
      { label: 'Current t[1]', value: "'a' (-1)" },
      { label: "freq['a']", value: '0 (Balanced)', highlight: true },
      { label: "freq['n']", value: '0 (Balanced)', highlight: true }
    ],
    formula: "freq['n']++ => (-1 + 1 = 0); freq['a']-- => (1 - 1 = 0);",
    action: 'Characters "n" and "a" in opposite strings cancel out existing deltas, restoring both buckets to 0.',
    explain: 'S has now supplied one "a" and one "n"; T has consumed one "n" and one "a". Net balance is 0.',
    intuition: 'Opposing occurrences naturally restore the net balance without sorting.',
    customCard: {
      title: 'Frequency Delta Status',
      rows: [
        { label: "freq['a']", value: '0 (Perfect cancellation)' },
        { label: "freq['n']", value: '0 (Perfect cancellation)' }
      ]
    }
  },
  {
    title: '4. Index 2: s[2] = "a" (+1) and t[2] = "g" (-1)',
    phase: 'SCANNING',
    codeLine: 18,
    tracks: [
      {
        label: 'String S: "anagram"',
        items: [
          { val: 'a', status: 'visited' },
          { val: 'n', status: 'visited' },
          { val: 'a', status: 'current' },
          { val: 'g', status: 'default' },
          { val: 'r', status: 'default' },
          { val: 'a', status: 'default' },
          { val: 'm', status: 'default' }
        ]
      },
      {
        label: 'String T: "nagaram"',
        items: [
          { val: 'n', status: 'visited' },
          { val: 'a', status: 'visited' },
          { val: 'g', status: 'current' },
          { val: 'a', status: 'default' },
          { val: 'r', status: 'default' },
          { val: 'a', status: 'default' },
          { val: 'm', status: 'default' }
        ]
      }
    ],
    activeI: 2,
    activePrev: 1,
    metrics: [
      { label: 'Current s[2]', value: "'a' (+1)" },
      { label: 'Current t[2]', value: "'g' (-1)" },
      { label: "freq['a']", value: '+1' },
      { label: "freq['g']", value: '-1' }
    ],
    formula: "freq['a']++; freq['g']--;",
    action: 'Second "a" in S increments freq[0] to +1. Character "g" in T decrements freq[6] to -1.',
    explain: 'S holds an excess "a"; T holds an excess "g". Pending subsequent matching positions.',
    intuition: 'The order of characters does not matter; only the aggregate count per letter matters.'
  },
  {
    title: '5. Index 3: s[3] = "g" (+1) and t[3] = "a" (-1) -> Mutual Cancellation',
    phase: 'SCANNING',
    codeLine: 18,
    tracks: [
      {
        label: 'String S: "anagram"',
        items: [
          { val: 'a', status: 'visited' },
          { val: 'n', status: 'visited' },
          { val: 'a', status: 'visited' },
          { val: 'g', status: 'match' },
          { val: 'r', status: 'default' },
          { val: 'a', status: 'default' },
          { val: 'm', status: 'default' }
        ]
      },
      {
        label: 'String T: "nagaram"',
        items: [
          { val: 'n', status: 'visited' },
          { val: 'a', status: 'visited' },
          { val: 'g', status: 'visited' },
          { val: 'a', status: 'match' },
          { val: 'r', status: 'default' },
          { val: 'a', status: 'default' },
          { val: 'm', status: 'default' }
        ]
      }
    ],
    activeI: 3,
    activePrev: 2,
    metrics: [
      { label: 'Current s[3]', value: "'g' (+1)" },
      { label: 'Current t[3]', value: "'a' (-1)" },
      { label: "freq['a']", value: '0 (Balanced)', highlight: true },
      { label: "freq['g']", value: '0 (Balanced)', highlight: true }
    ],
    formula: "freq['g']++ => (-1 + 1 = 0); freq['a']-- => (1 - 1 = 0);",
    action: '"g" in S cancels -1 on "g"; "a" in T cancels +1 on "a". Both return to 0.',
    explain: 'Indices 0-3 now completely balance all counts for characters "a", "g", and "n".',
    intuition: 'Each letter subset reaches equilibrium as its matching partner is encountered.'
  },
  {
    title: '6. Indices 4 & 5: Characters "r" and "a" Match In-Place',
    phase: 'SCANNING',
    codeLine: 18,
    tracks: [
      {
        label: 'String S: "anagram"',
        items: [
          { val: 'a', status: 'visited' },
          { val: 'n', status: 'visited' },
          { val: 'a', status: 'visited' },
          { val: 'g', status: 'visited' },
          { val: 'r', status: 'match' },
          { val: 'a', status: 'match' },
          { val: 'm', status: 'default' }
        ]
      },
      {
        label: 'String T: "nagaram"',
        items: [
          { val: 'n', status: 'visited' },
          { val: 'a', status: 'visited' },
          { val: 'g', status: 'visited' },
          { val: 'a', status: 'visited' },
          { val: 'r', status: 'match' },
          { val: 'a', status: 'match' },
          { val: 'm', status: 'default' }
        ]
      }
    ],
    activeI: 5,
    activePrev: 4,
    metrics: [
      { label: 's[4], t[4]', value: "'r' == 'r' (net 0)" },
      { label: 's[5], t[5]', value: "'a' == 'a' (net 0)" },
      { label: "freq['r']", value: '0' },
      { label: "freq['a']", value: '0 (3rd a matched)' }
    ],
    formula: "freq['r'](+1-1=0); freq['a'](+1-1=0);",
    action: 'Both positions 4 and 5 contain identical characters in both strings, incurring net 0 delta.',
    explain: 'All 3 occurrences of letter "a" in both strings have now been mutually resolved.',
    intuition: 'Identical characters at identical indices keep delta at 0 without deviation.'
  },
  {
    title: '7. Index 6: Final Character "m" Balanced -> Pass Complete',
    phase: 'SCANNING',
    codeLine: 18,
    tracks: [
      {
        label: 'String S: "anagram"',
        items: [
          { val: 'a', status: 'visited' },
          { val: 'n', status: 'visited' },
          { val: 'a', status: 'visited' },
          { val: 'g', status: 'visited' },
          { val: 'r', status: 'visited' },
          { val: 'a', status: 'visited' },
          { val: 'm', status: 'match' }
        ]
      },
      {
        label: 'String T: "nagaram"',
        items: [
          { val: 'n', status: 'visited' },
          { val: 'a', status: 'visited' },
          { val: 'g', status: 'visited' },
          { val: 'a', status: 'visited' },
          { val: 'r', status: 'visited' },
          { val: 'a', status: 'visited' },
          { val: 'm', status: 'match' }
        ]
      }
    ],
    activeI: 6,
    activePrev: 5,
    metrics: [
      { label: 's[6], t[6]', value: "'m' == 'm' (net 0)" },
      { label: "freq['m']", value: '0' },
      { label: 'Scanned', value: '7 / 7 characters' },
      { label: 'Discrepancies', value: '0' }
    ],
    formula: "freq['m']++ and freq['m']--; => net 0",
    action: 'Final character "m" processed. Both strings fully consumed. Proceed to zero check.',
    explain: 'Every character pair across both strings has been processed through the delta table.',
    intuition: 'The single-pass traversal finishes in exactly N iterations.'
  },
  {
    title: '8. Frequency Verification: All 26 Entries Zero -> Valid Anagram',
    phase: 'COMPLETED',
    codeLine: 24,
    tracks: [
      {
        label: 'String S: "anagram"',
        items: [
          { val: 'a', status: 'match' },
          { val: 'n', status: 'match' },
          { val: 'a', status: 'match' },
          { val: 'g', status: 'match' },
          { val: 'r', status: 'match' },
          { val: 'a', status: 'match' },
          { val: 'm', status: 'match' }
        ]
      },
      {
        label: 'String T: "nagaram"',
        items: [
          { val: 'n', status: 'match' },
          { val: 'a', status: 'match' },
          { val: 'g', status: 'match' },
          { val: 'a', status: 'match' },
          { val: 'r', status: 'match' },
          { val: 'a', status: 'match' },
          { val: 'm', status: 'match' }
        ]
      }
    ],
    activeI: null,
    activePrev: null,
    metrics: [
      { label: 'Result', value: 'true (Valid Anagram)', highlight: true },
      { label: 'Non-zero Buckets', value: '0 / 26' },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1) (26 buckets)' }
    ],
    formula: 'for (int c : freq) if (c != 0) return false; return true;',
    action: 'All 26 character buckets verified to be exactly 0. Return true.',
    explain: 'Strings "anagram" and "nagaram" have identical character multisets. They are valid anagrams.',
    intuition: 'One pass O(N) frequency counting beats O(N log N) string sorting in both time and space.',
    customCard: {
      title: 'Algorithm Verification Summary',
      rows: [
        { label: 'Outcome', value: 'true (Anagram Confirmed)', accent: true },
        { label: 'Efficiency', value: 'O(N) linear time, O(1) auxiliary memory', accent: true }
      ]
    }
  }
];
