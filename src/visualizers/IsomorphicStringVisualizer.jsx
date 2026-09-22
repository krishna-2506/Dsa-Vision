// DATA-ONLY — rendered by DualArrayRenderer via rendererType

export const meta = {
  title: 'Isomorphic Strings',
  category: 'Strings & Hash Map',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Auxiliary (bounded by alphabet size 256)',
  description: 'Determines if characters in string S can be mapped bijectively one-to-one to characters in string T while preserving character order and relative recurrence.'
};

export const rendererType = 'dual-array';

export const ideaMap = {
  title: 'Bijection Mapping Invariant',
  nodes: [
    { id: 'root', label: 'Dual-Array Bijective Sync Strategy', children: ['length-guard', 'last-seen-sync', 'bijection-check', 'map-mutation', 'complexity'] },
    { id: 'length-guard', label: '1. Length Parity Check', detail: 'Strings S and T must have identical lengths; if len(s) != len(t), isomorphism is impossible.' },
    { id: 'last-seen-sync', label: '2. Synchronized Position Arrays', detail: 'Maintain m1[256] and m2[256] tracking the 1-based index of the most recent occurrence of each character.' },
    { id: 'bijection-check', label: '3. Pattern Consistency Check', detail: 'At index i, require m1[s[i]] == m2[t[i]]; any discrepancy indicates that one character is mapped to multiple targets.' },
    { id: 'map-mutation', label: '4. Update Positional Signatures', detail: 'Assign m1[s[i]] = i + 1 and m2[t[i]] = i + 1, ensuring subsequent occurrences match this temporal timestamp.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Single pass O(N) time with strictly O(1) space (two fixed arrays of size 256).' }
  ]
};

export const solutions = {
  cpp: `// C++ Check if Two Strings are Isomorphic (Dual Last-Seen Array)
// Time Complexity: O(N) | Space Complexity: O(1)
#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    bool isIsomorphic(string s, string t) {
        if (s.length() != t.length()) return false;

        vector<int> m1(256, 0); // Last seen position for s
        vector<int> m2(256, 0); // Last seen position for t

        for (int i = 0; i < (int)s.length(); i++) {
            if (m1[(unsigned char)s[i]] != m2[(unsigned char)t[i]]) {
                return false; // Mismatch in character recurrence pattern
            }
            m1[(unsigned char)s[i]] = i + 1;
            m2[(unsigned char)t[i]] = i + 1;
        }

        return true;
    }
};`,
  python: `# Python 3 Check if Two Strings are Isomorphic
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def isIsomorphic(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False

        map_s_to_t = {}
        map_t_to_s = {}

        for c1, c2 in zip(s, t):
            if (c1 in map_s_to_t and map_s_to_t[c1] != c2) or \\
               (c2 in map_t_to_s and map_t_to_s[c2] != c1):
                return False
            map_s_to_t[c1] = c2
            map_t_to_s[c2] = c1

        return True`,
  java: `// Java Check if Two Strings are Isomorphic
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
    public boolean isIsomorphic(String s, String t) {
        if (s.length() != t.length()) return false;

        int[] m1 = new int[256];
        int[] m2 = new int[256];

        for (int i = 0; i < s.length(); i++) {
            if (m1[s.charAt(i)] != m2[t.charAt(i)]) {
                return false;
            }
            m1[s.charAt(i)] = i + 1;
            m2[t.charAt(i)] = i + 1;
        }

        return true;
    }
}`,
  javascript: `// JavaScript Check if Two Strings are Isomorphic
// Time Complexity: O(N) | Space Complexity: O(1)
var isIsomorphic = function(s, t) {
    if (s.length !== t.length) return false;

    const m1 = new Array(256).fill(0);
    const m2 = new Array(256).fill(0);

    for (let i = 0; i < s.length; i++) {
        const c1 = s.charCodeAt(i);
        const c2 = t.charCodeAt(i);

        if (m1[c1] !== m2[c2]) {
            return false;
        }

        m1[c1] = i + 1;
        m2[c2] = i + 1;
    }

    return true;
};`
};

export const steps = [
  {
    title: '1. Problem Setup & Bijective Sync Invariant',
    phase: 'INITIAL',
    tracks: [
      {
        label: 'String S ("paper")',
        items: [
          { val: 'p' },
          { val: 'a' },
          { val: 'p' },
          { val: 'e' },
          { val: 'r' }
        ]
      },
      {
        label: 'String T ("title")',
        items: [
          { val: 't' },
          { val: 'i' },
          { val: 't' },
          { val: 'l' },
          { val: 'e' }
        ]
      }
    ],
    activeI: null,
    activePrev: null,
    metrics: [
      { label: 'String S', value: '"paper"' },
      { label: 'String T', value: '"title"' },
      { label: 'Length Check', value: '5 == 5 (Valid)' },
      { label: 'Invariant Rule', value: 'm1[s[i]] == m2[t[i]]', highlight: true }
    ],
    formula: 'vector<int> m1(256, 0); vector<int> m2(256, 0);',
    action: 'Verify length equality and initialize synchronized character timestamp arrays.',
    explain: 'Goal: Determine if s and t are isomorphic (every occurrence of a character maps to the same character in the other string, preserving order).',
    intuition: 'If two characters correspond to each other, they must appear at the exact same prior relative positions. Comparing m1[s[i]] and m2[t[i]] validates bijectivity in O(1).',
    customCard: {
      title: 'Bijective Invariant Rule',
      rows: [
        { label: 'Condition', value: 'm1[s[i]] must equal m2[t[i]] at every index i', accent: true },
        { label: 'Timestamping', value: 'Both arrays store 1-based index (i + 1)' }
      ]
    }
  },
  {
    title: '2. Index 0: s[0] = \'p\', t[0] = \'t\' (First Mapping p <-> t)',
    phase: 'MAPPING',
    tracks: [
      {
        label: 'String S',
        items: [
          { val: 'p', status: 'match', badge: 'm1[\'p\'] = 1' },
          { val: 'a' },
          { val: 'p' },
          { val: 'e' },
          { val: 'r' }
        ]
      },
      {
        label: 'String T',
        items: [
          { val: 't', status: 'match', badge: 'm2[\'t\'] = 1' },
          { val: 'i' },
          { val: 't' },
          { val: 'l' },
          { val: 'e' }
        ]
      }
    ],
    activeI: 0,
    activePrev: 0,
    metrics: [
      { label: 's[0] vs t[0]', value: "'p' <-> 't'" },
      { label: 'Prior Timestamps', value: 'm1[\'p\'] = 0, m2[\'t\'] = 0 (Match!)' },
      { label: 'Updated Timestamps', value: 'm1[\'p\'] = 1, m2[\'t\'] = 1', highlight: true }
    ],
    formula: 'm1[\'p\'] == m2[\'t\'] (0 == 0); m1[\'p\'] = 1; m2[\'t\'] = 1;',
    action: 'Both \'p\' and \'t\' are seen for the first time (both previous timestamps are 0). Set m1[\'p\'] = 1, m2[\'t\'] = 1.',
    explain: 'Consistent mapping established: \'p\' maps to \'t\'.',
    intuition: 'First encounter of both characters aligns seamlessly.',
    customCard: {
      title: 'Active Mappings',
      rows: [
        { label: "'p' <-> 't'", value: 'First seen at index 0 (timestamp 1)', accent: true },
        { label: 'Status', value: 'Valid Bijective Pair' }
      ]
    }
  },
  {
    title: '3. Index 1: s[1] = \'a\', t[1] = \'i\' (Second Mapping a <-> i)',
    phase: 'MAPPING',
    tracks: [
      {
        label: 'String S',
        items: [
          { val: 'p', status: 'match' },
          { val: 'a', status: 'match', badge: 'm1[\'a\'] = 2' },
          { val: 'p' },
          { val: 'e' },
          { val: 'r' }
        ]
      },
      {
        label: 'String T',
        items: [
          { val: 't', status: 'match' },
          { val: 'i', status: 'match', badge: 'm2[\'i\'] = 2' },
          { val: 't' },
          { val: 'l' },
          { val: 'e' }
        ]
      }
    ],
    activeI: 1,
    activePrev: 1,
    metrics: [
      { label: 's[1] vs t[1]', value: "'a' <-> 'i'" },
      { label: 'Prior Timestamps', value: '0 == 0 (Match!)' },
      { label: 'Updated Timestamps', value: 'm1[\'a\'] = 2, m2[\'i\'] = 2', highlight: true }
    ],
    formula: 'm1[\'a\'] == m2[\'i\'] (0 == 0); m1[\'a\'] = 2; m2[\'i\'] = 2;',
    action: 'Both \'a\' and \'i\' are seen for the first time. Set timestamps to 2.',
    explain: 'Consistent mapping established: \'a\' maps to \'i\'.',
    intuition: 'New independent character pair confirmed.',
    customCard: {
      title: 'Active Mappings',
      rows: [
        { label: "'p' <-> 't'", value: 'Timestamp 1' },
        { label: "'a' <-> 'i'", value: 'First seen at index 1 (timestamp 2)', accent: true }
      ]
    }
  },
  {
    title: '4. Index 2: s[2] = \'p\', t[2] = \'t\' (Recurrence Verified: 1 == 1)',
    phase: 'RECURRENCE_VERIFIED',
    tracks: [
      {
        label: 'String S',
        items: [
          { val: 'p', status: 'match', badge: 'Prev 1' },
          { val: 'a', status: 'match' },
          { val: 'p', status: 'match', badge: 'm1[\'p\'] = 3' },
          { val: 'e' },
          { val: 'r' }
        ]
      },
      {
        label: 'String T',
        items: [
          { val: 't', status: 'match', badge: 'Prev 1' },
          { val: 'i', status: 'match' },
          { val: 't', status: 'match', badge: 'm2[\'t\'] = 3' },
          { val: 'l' },
          { val: 'e' }
        ]
      }
    ],
    activeI: 2,
    activePrev: 2,
    metrics: [
      { label: 'Recurrence Check', value: "'p' and 't' reappear simultaneously!" },
      { label: 'Prior Timestamps', value: 'm1[\'p\'] = 1, m2[\'t\'] = 1 (1 == 1)', highlight: true },
      { label: 'New Timestamps', value: 'm1[\'p\'] = 3, m2[\'t\'] = 3' }
    ],
    formula: 'm1[\'p\'] == m2[\'t\'] (1 == 1 -> Valid!); m1[\'p\'] = 3; m2[\'t\'] = 3;',
    action: 'Both \'p\' and \'t\' have prior timestamp 1. Since 1 == 1, the recurrence matches perfectly!',
    explain: 'Crucial verification: \'p\' repeats exactly where \'t\' repeats. No conflicting mapping exists.',
    intuition: 'Isomorphism preserved: relative repeat positions are completely identical.',
    customCard: {
      title: 'Recurrence Verification',
      rows: [
        { label: 'Previous Encounter', value: 'Both previously occurred at index 0 (timestamp 1)', accent: true },
        { label: 'Result', value: 'Consistent bijection preserved' }
      ]
    }
  },
  {
    title: '5. Index 3: s[3] = \'e\', t[3] = \'l\' (Third Mapping e <-> l)',
    phase: 'MAPPING',
    tracks: [
      {
        label: 'String S',
        items: [
          { val: 'p', status: 'match' },
          { val: 'a', status: 'match' },
          { val: 'p', status: 'match' },
          { val: 'e', status: 'match', badge: 'm1[\'e\'] = 4' },
          { val: 'r' }
        ]
      },
      {
        label: 'String T',
        items: [
          { val: 't', status: 'match' },
          { val: 'i', status: 'match' },
          { val: 't', status: 'match' },
          { val: 'l', status: 'match', badge: 'm2[\'l\'] = 4' },
          { val: 'e' }
        ]
      }
    ],
    activeI: 3,
    activePrev: 3,
    metrics: [
      { label: 's[3] vs t[3]', value: "'e' <-> 'l'" },
      { label: 'Prior Timestamps', value: '0 == 0 (Match!)' },
      { label: 'Updated Timestamps', value: 'm1[\'e\'] = 4, m2[\'l\'] = 4', highlight: true }
    ],
    formula: 'm1[\'e\'] == m2[\'l\'] (0 == 0); m1[\'e\'] = 4; m2[\'l\'] = 4;',
    action: 'Both characters \'e\' and \'l\' appear for the first time. Record timestamp 4.',
    explain: 'Notice that \'e\' in S maps to \'l\' in T. This is completely valid because \'l\' was not used by any prior character.',
    intuition: 'One-to-one correspondence maintained across distinct characters.',
    customCard: {
      title: 'Active Mappings',
      rows: [
        { label: "'p' <-> 't'", value: 'Timestamp 3' },
        { label: "'e' <-> 'l'", value: 'First seen at index 3 (timestamp 4)', accent: true }
      ]
    }
  },
  {
    title: '6. Index 4: s[4] = \'r\', t[4] = \'e\' (Fourth Mapping r <-> e)',
    phase: 'MAPPING',
    tracks: [
      {
        label: 'String S',
        items: [
          { val: 'p', status: 'match' },
          { val: 'a', status: 'match' },
          { val: 'p', status: 'match' },
          { val: 'e', status: 'match' },
          { val: 'r', status: 'match', badge: 'm1[\'r\'] = 5' }
        ]
      },
      {
        label: 'String T',
        items: [
          { val: 't', status: 'match' },
          { val: 'i', status: 'match' },
          { val: 't', status: 'match' },
          { val: 'l', status: 'match' },
          { val: 'e', status: 'match', badge: 'm2[\'e\'] = 5' }
        ]
      }
    ],
    activeI: 4,
    activePrev: 4,
    metrics: [
      { label: 's[4] vs t[4]', value: "'r' <-> 'e'" },
      { label: 'Prior Timestamps', value: 'm1[\'r\'] = 0, m2[\'e\'] = 0 (Match!)' },
      { label: 'Updated Timestamps', value: 'm1[\'r\'] = 5, m2[\'e\'] = 5', highlight: true }
    ],
    formula: 'm1[\'r\'] == m2[\'e\'] (0 == 0); m1[\'r\'] = 5; m2[\'e\'] = 5;',
    action: '\'r\' in S and \'e\' in T have not been seen in their respective strings. Both have timestamp 0. Valid!',
    explain: 'Although letter \'e\' was in S at index 3, this is letter \'e\' in T, which had not appeared before in T.',
    intuition: 'Each string maintains its own independent mapping namespace.',
    customCard: {
      title: 'Independent Namespaces',
      rows: [
        { label: 'S character', value: "'r' (unseen in S)" },
        { label: 'T character', value: "'e' (unseen in T)", accent: true }
      ]
    }
  },
  {
    title: '7. Contrast With Non-Isomorphic Example: "foo" vs "bar"',
    phase: 'COUNTER_EXAMPLE',
    tracks: [
      {
        label: 'Counterexample: "foo"',
        items: [
          { val: 'f' },
          { val: 'o', badge: 'o -> a' },
          { val: 'o', status: 'mismatch', badge: 'o -> r (Conflict!)' }
        ]
      },
      {
        label: 'Counterexample: "bar"',
        items: [
          { val: 'b' },
          { val: 'a', badge: 'first' },
          { val: 'r', status: 'mismatch', badge: 'differs' }
        ]
      }
    ],
    activeI: 2,
    activePrev: 2,
    metrics: [
      { label: 'In "foo" vs "bar"', value: "'o' maps to both 'a' and 'r'" },
      { label: 'm1[\'o\'] vs m2[\'r\']', value: '2 != 0 (MISMATCH!)', highlight: true },
      { label: 'Outcome', value: 'return false immediately' }
    ],
    formula: 'm1[\'o\'] (2) != m2[\'r\'] (0) -> returns false;',
    action: 'Compare with invalid case: "foo" vs "bar" fails because \'o\' at index 2 has timestamp 2 while \'r\' has timestamp 0.',
    explain: 'In "foo", \'o\' repeats; in "bar", \'r\' does not repeat. 2 != 0 catches this violation instantly.',
    intuition: 'A single timestamp mismatch rejects non-isomorphic pairs in O(1).',
    customCard: {
      title: 'Failure Detection Mechanism',
      rows: [
        { label: 'Conflict', value: 'One character mapped to two different targets' },
        { label: 'Rejection', value: 'm1[c1] != m2[c2] triggers instant early exit', accent: false }
      ]
    }
  },
  {
    title: '8. Result: "paper" and "title" are ISOMORPHIC (true)',
    phase: 'COMPLETED',
    tracks: [
      {
        label: 'String S ("paper")',
        items: [
          { val: 'p', status: 'match' },
          { val: 'a', status: 'match' },
          { val: 'p', status: 'match' },
          { val: 'e', status: 'match' },
          { val: 'r', status: 'match' }
        ]
      },
      {
        label: 'String T ("title")',
        items: [
          { val: 't', status: 'match' },
          { val: 'i', status: 'match' },
          { val: 't', status: 'match' },
          { val: 'l', status: 'match' },
          { val: 'e', status: 'match' }
        ]
      }
    ],
    activeI: null,
    activePrev: null,
    metrics: [
      { label: 'Isomorphic?', value: 'true (Confirmed)', highlight: true },
      { label: 'Comparisons', value: '5 / 5 matched' },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1) (256 entries)' }
    ],
    formula: 'return true; // All character recurrence timestamps matched',
    action: 'End of strings reached with zero discrepancies. Return true.',
    explain: 'String "paper" maps bijectively to "title" with consistent 1-to-1 character correspondence throughout.',
    intuition: 'Dual last-seen arrays provide the fastest O(N) verification with zero hash map overhead.',
    customCard: {
      title: 'Final Summary',
      rows: [
        { label: 'Result', value: 'true (Isomorphic)', accent: true },
        { label: 'Complexity', value: 'O(N) time, O(1) auxiliary space', accent: true }
      ]
    }
  }
];
