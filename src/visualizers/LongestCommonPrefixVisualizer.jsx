// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Longest Common Prefix',
  category: 'Strings & Sorting',
  difficulty: 'Easy',
  timeComplexity: 'O(N log N * M)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Finds the longest common prefix string among an array of words by sorting the array lexicographically and comparing only the first and last words.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Lexicographical Extremum Invariant',
  nodes: [
    { id: 'root', label: 'Boundary Prefix Reduction Strategy', children: ['empty-guard', 'lexicographical-sort', 'extremum-comparison', 'character-mismatch-exit', 'complexity'] },
    { id: 'empty-guard', label: '1. Array Guard', detail: 'If array is empty, return "" immediately.' },
    { id: 'lexicographical-sort', label: '2. Lexicographical Sorting', detail: 'Sort strings alphabetically; any prefix shared by all strings must be shared by the two most dissimilar words: strs[0] and strs[n-1].' },
    { id: 'extremum-comparison', label: '3. Compare First and Last', detail: 'Compare first = strs[0] and last = strs[n-1] character by character from index 0.' },
    { id: 'character-mismatch-exit', label: '4. Early Exit on Mismatch', detail: 'The moment first[i] != last[i], no longer common to both boundaries; break and return prefix up to index i.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'O(N log N * M) sorting followed by O(M) comparison with strictly O(1) auxiliary space.' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Lexicographical Sorting Approach
// Time Complexity: O(N log N * M) | Space Complexity: O(1)
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        if (strs.empty()) return "";

        // Sort strings lexicographically
        sort(strs.begin(), strs.end());

        string first = strs[0];
        string last = strs.back();
        string ans = "";

        // Compare first and last words character by character
        for (int i = 0; i < (int)min(first.size(), last.size()); i++) {
            if (first[i] != last[i]) {
                break;
            }
            ans += first[i];
        }

        return ans;
    }
};`,
  python: `# Python 3 Optimal Lexicographical Sorting
# Time Complexity: O(N log N * M) | Space Complexity: O(1)
class Solution:
    def longestCommonPrefix(self, strs: list[str]) -> str:
        if not strs:
            return ""

        strs.sort()
        first, last = strs[0], strs[-1]
        ans = []

        for i in range(min(len(first), len(last))):
            if first[i] != last[i]:
                break
            ans.append(first[i])

        return "".join(ans)`,
  java: `// Java Optimal Lexicographical Sorting
// Time Complexity: O(N log N * M) | Space Complexity: O(1)
import java.util.Arrays;

class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs == null || strs.length == 0) return "";

        Arrays.sort(strs);
        String first = strs[0];
        String last = strs[strs.length - 1];
        StringBuilder ans = new StringBuilder();

        for (int i = 0; i < Math.min(first.length(), last.length()); i++) {
            if (first.charAt(i) != last.charAt(i)) {
                break;
            }
            ans.append(first.charAt(i));
        }

        return ans.toString();
    }
}`,
  javascript: `// JavaScript Optimal Lexicographical Sorting
// Time Complexity: O(N log N * M) | Space Complexity: O(1)
var longestCommonPrefix = function(strs) {
    if (!strs.length) return "";

    strs.sort();
    const first = strs[0];
    const last = strs[strs.length - 1];
    let ans = "";

    for (let i = 0; i < Math.min(first.length, last.length); i++) {
        if (first[i] !== last[i]) {
            break;
        }
        ans += first[i];
    }

    return ans;
};`
};

export const steps = [
  {
    title: '1. Problem Setup & Extremum Invariant',
    phase: 'INITIAL',
    track: {
      label: 'Input Words: ["flower", "flow", "flight"] (Unsorted)',
      items: [
        { val: '"flower"' },
        { val: '"flow"' },
        { val: '"flight"' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Words Count (N)', value: 3 },
      { label: 'Strategy', value: 'Sort lexicographically & compare extremes', highlight: true },
      { label: 'Common Prefix', value: '""' },
      { label: 'Time Complexity', value: 'O(N log N * M)' }
    ],
    formula: 'sort(strs.begin(), strs.end());',
    action: 'State the sorting theorem: in an alphabetically sorted list, the first and last words have the minimum possible common prefix among all pairs.',
    explain: 'Goal: Find the longest string that prefixes every word in strs.',
    intuition: 'If the first and last words share prefix P, then EVERY word in between also begins with P.',
    variables: {
      'strs': '["flower", "flow", "flight"]',
      'ans': '""'
    }
  },
  {
    title: '2. Lexicographical Sorting: ["flight", "flow", "flower"]',
    phase: 'SORTING',
    track: {
      label: 'Sorted Alphabetically: ["flight", "flow", "flower"]',
      items: [
        { val: '"flight"', status: 'match', badge: 'First (strs[0])' },
        { val: '"flow"', badge: 'strs[1]' },
        { val: '"flower"', status: 'match', badge: 'Last (strs[2])' }
      ]
    },
    activeI: 0,
    activeJ: 2,
    metrics: [
      { label: 'first = strs[0]', value: '"flight"' },
      { label: 'last = strs[N-1]', value: '"flower"' },
      { label: 'Comparison Length', value: 'min(6, 6) = 6 chars', highlight: true },
      { label: 'Intermediate Words', value: 'Bypassed in O(1)' }
    ],
    formula: 'string first = strs[0]; string last = strs.back();',
    action: 'Select first = "flight" and last = "flower". All intermediate words can now be safely ignored.',
    explain: 'Because strings are sorted, checking the extremities guarantees prefix validity across the entire collection.',
    intuition: 'Sorting reduces an N-word comparison to a 2-word comparison.',
    variables: {
      'first': 'flight',
      'last': 'flower',
      'ans': '""'
    }
  },
  {
    title: '3. Character 0: \'f\' == \'f\' -> Match! ans = "f"',
    phase: 'CHARACTER_MATCH',
    track: {
      label: 'Comparing first[0] (\'f\') vs last[0] (\'f\'): MATCH!',
      items: [
        { val: 'f', status: 'match', badge: 'first[0]' },
        { val: 'l' },
        { val: 'i' },
        { val: 'g' },
        { val: 'h' },
        { val: 't' }
      ]
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'Character index', value: 0 },
      { label: 'first[0] vs last[0]', value: "'f' == 'f' (Equal!)" },
      { label: 'Common Prefix', value: '"f"', highlight: true }
    ],
    formula: 'first[0] == last[0] -> ans += \'f\';',
    action: 'Both words start with "f". Append \'f\' to common prefix.',
    explain: 'Every word in the array is guaranteed to start with "f".',
    intuition: 'First character matched.',
    variables: {
      'i': 0,
      'first[i]': 'f',
      'last[i]': 'f',
      'ans': 'f'
    }
  },
  {
    title: '4. Character 1: \'l\' == \'l\' -> Match! ans = "fl"',
    phase: 'CHARACTER_MATCH',
    track: {
      label: 'Comparing first[1] (\'l\') vs last[1] (\'l\'): MATCH!',
      items: [
        { val: 'f', status: 'match' },
        { val: 'l', status: 'match', badge: 'first[1]' },
        { val: 'i' },
        { val: 'g' },
        { val: 'h' },
        { val: 't' }
      ]
    },
    activeI: 1,
    activeJ: null,
    metrics: [
      { label: 'Character index', value: 1 },
      { label: 'first[1] vs last[1]', value: "'l' == 'l' (Equal!)" },
      { label: 'Common Prefix', value: '"fl"', highlight: true }
    ],
    formula: 'first[1] == last[1] -> ans += \'l\';',
    action: 'Both words share \'l\' at index 1. Append \'l\' to common prefix.',
    explain: 'Prefix "fl" is shared by both boundaries.',
    intuition: 'Prefix grows to length 2.',
    variables: {
      'i': 1,
      'first[i]': 'l',
      'last[i]': 'l',
      'ans': 'fl'
    }
  },
  {
    title: '5. Character 2: \'i\' != \'o\' -> MISMATCH! Early Exit',
    phase: 'MISMATCH_EXIT',
    track: {
      label: 'Comparing first[2] (\'i\') vs last[2] (\'o\'): MISMATCH! Break loop.',
      items: [
        { val: 'f', status: 'match' },
        { val: 'l', status: 'match' },
        { val: 'i', status: 'mismatch', badge: '\'i\' != \'o\'' },
        { val: 'g' },
        { val: 'h' },
        { val: 't' }
      ]
    },
    activeI: 2,
    activeJ: null,
    metrics: [
      { label: 'Character index', value: 2 },
      { label: 'first[2] (\'i\') vs last[2] (\'o\')', value: 'MISMATCH!', highlight: true },
      { label: 'Action', value: 'break loop immediately' },
      { label: 'Final Prefix', value: '"fl"' }
    ],
    formula: 'if (first[2] != last[2]) break; // \'i\' != \'o\'',
    action: 'At index 2, first has \'i\' while last has \'o\'. Discrepancy detected! Break.',
    explain: 'Because "flight" has \'i\' and "flower" has \'o\', no prefix longer than "fl" can be common to all strings.',
    intuition: 'Mismatch halts the search immediately; remaining characters are never checked.',
    variables: {
      'i': 2,
      'first[i]': 'i',
      'last[i]': 'o',
      'ans': 'fl'
    }
  },
  {
    title: '6. Verification Across All Input Words',
    phase: 'VERIFICATION',
    track: {
      label: 'Prefix "fl" verified against all original words',
      items: [
        { val: '"flower"', status: 'match', badge: '"fl" + "ower"' },
        { val: '"flow"', status: 'match', badge: '"fl" + "ow"' },
        { val: '"flight"', status: 'match', badge: '"fl" + "ight"' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Word 1', value: '"flower" starts with "fl"' },
      { label: 'Word 2', value: '"flow" starts with "fl"' },
      { label: 'Word 3', value: '"flight" starts with "fl"' },
      { label: 'Consensus', value: 'Universal Prefix', highlight: true }
    ],
    formula: 'all(w.startswith("fl") for w in strs) == True;',
    action: 'Verify that "fl" is a valid prefix for every word in the input.',
    explain: '"flower", "flow", and "flight" all cleanly begin with "fl".',
    intuition: 'The extremum sorting invariant is mathematically foolproof.',
    variables: {
      'verified': true
    }
  },
  {
    title: '7. Complexity: O(N log N * M) Sorting + O(M) Scan',
    phase: 'COMPLEXITY',
    track: {
      label: 'Asymptotic performance analysis',
      items: [
        { val: 'N words' },
        { val: 'Max length M' },
        { val: 'Sort: O(N log N * M)' },
        { val: 'Compare: O(M)' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Sorting Cost', value: 'O(N log N * M)' },
      { label: 'Scan Cost', value: 'O(M)' },
      { label: 'Total Time', value: 'O(N log N * M)', highlight: true },
      { label: 'Auxiliary Space', value: 'O(1) in-place' }
    ],
    formula: 'T(N, M) = O(N log N * M); S(N, M) = O(1);',
    action: 'Confirm complexity characteristics.',
    explain: 'Compared to vertical scanning O(N * M), sorting is extremely fast when M is small, and requires zero auxiliary data structures.',
    intuition: 'Comparing only 2 strings is simple, elegant, and cache-friendly.',
    variables: {
      'timeComplexity': 'O(N log N * M)',
      'spaceComplexity': 'O(1)'
    }
  },
  {
    title: '8. Result: Longest Common Prefix = "fl"',
    phase: 'COMPLETED',
    track: {
      label: 'Optimal Longest Common Prefix: "fl"',
      items: [
        { val: 'f', status: 'match', badge: '1' },
        { val: 'l', status: 'match', badge: '2 (Prefix = "fl")' },
        { val: 'i' },
        { val: 'g' },
        { val: 'h' },
        { val: 't' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Longest Prefix', value: '"fl"', highlight: true },
      { label: 'Length', value: 2 },
      { label: 'Algorithm', value: 'Lexicographical Extremum' },
      { label: 'Status', value: 'Complete' }
    ],
    formula: 'return ans = "fl";',
    action: 'Return the computed common prefix "fl".',
    explain: 'The longest common prefix across ["flower", "flow", "flight"] is "fl".',
    intuition: 'Extreme-boundary reduction is a foundational technique in string algorithms.',
    variables: {
      'result': 'fl',
      'timeComplexity': 'O(N log N * M)',
      'spaceComplexity': 'O(1)'
    }
  }
];
