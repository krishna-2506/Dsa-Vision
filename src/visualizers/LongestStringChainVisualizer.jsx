// DATA-ONLY — rendered by DualArrayRenderer via rendererType

export const meta = {
  title: 'Longest String Chain',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N log N + N × L²)',
  spaceComplexity: 'O(N)',
  description: 'Finds the length of the longest string chain where wordA is predecessor of wordB (inserting 1 character in wordA yields wordB). Sorting by string length reduces this to an LIS-style DP problem.'
};

export const rendererType = 'dual-array';

export const ideaMap = {
  title: 'Longest String Chain',
  nodes: [
    { id: 'root', label: 'Longest String Chain', children: ['sort', 'dp', 'pred'] },
    { id: 'sort', label: 'Sort by Length', detail: 'Process shorter words first so predecessors are already computed' },
    { id: 'dp', label: 'Hash Map DP', children: ['init', 'transition', 'answer'] },
    { id: 'init', label: 'dp[word] = 1', detail: 'Every word alone forms a chain of length 1' },
    { id: 'transition', label: 'Delete 1 Char', detail: 'For each position in word, remove that char to get a predecessor candidate' },
    { id: 'answer', label: 'Max over all dp[word]', detail: 'The longest chain across all words' },
    { id: 'pred', label: 'Predecessor Rule', detail: 'wordA is predecessor of wordB if adding exactly 1 character to wordA gives wordB' }
  ]
};

export const solutions = {
  cpp: `// C++ Longest String Chain
// Time: O(N log N + N * L^2) | Space: O(N)
#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    int longestStrChain(vector<string>& words) {
        sort(words.begin(), words.end(), [](const string& a, const string& b) {
            return a.size() < b.size();
        });

        unordered_map<string, int> dp;
        int maxChain = 1;

        for (const string& w : words) {
            dp[w] = 1;
            for (int i = 0; i < w.size(); i++) {
                string prev = w.substr(0, i) + w.substr(i + 1);
                if (dp.count(prev)) {
                    dp[w] = max(dp[w], 1 + dp[prev]);
                }
            }
            maxChain = max(maxChain, dp[w]);
        }

        return maxChain;
    }
};`,
  python: `# Python 3 Longest String Chain
# Time: O(N log N + N * L^2) | Space: O(N)
class Solution:
    def longestStrChain(self, words: list[str]) -> int:
        words.sort(key=len)
        dp = {}
        max_chain = 1

        for w in words:
            dp[w] = 1
            for i in range(len(w)):
                prev = w[:i] + w[i+1:]
                if prev in dp:
                    dp[w] = max(dp[w], 1 + dp[prev])
            max_chain = max(max_chain, dp[w])

        return max_chain`,
  java: `// Java Longest String Chain
// Time: O(N log N + N * L^2) | Space: O(N)
import java.util.*;

class Solution {
    public int longestStrChain(String[] words) {
        Arrays.sort(words, (a, b) -> a.length() - b.length());
        Map<String, Integer> dp = new HashMap<>();
        int maxChain = 1;

        for (String w : words) {
            dp.put(w, 1);
            for (int i = 0; i < w.length(); i++) {
                String prev = w.substring(0, i) + w.substring(i + 1);
                if (dp.containsKey(prev)) {
                    dp.put(w, Math.max(dp.get(w), 1 + dp.get(prev)));
                }
            }
            maxChain = Math.max(maxChain, dp.get(w));
        }

        return maxChain;
    }
}`,
  javascript: `// JavaScript Longest String Chain
// Time: O(N log N + N * L^2) | Space: O(N)
var longestStrChain = function(words) {
    words.sort((a, b) => a.length - b.length);
    const dp = new Map();
    let maxChain = 1;

    for (const w of words) {
        dp.set(w, 1);
        for (let i = 0; i < w.length; i++) {
            const prev = w.slice(0, i) + w.slice(i + 1);
            if (dp.has(prev)) {
                dp.set(w, Math.max(dp.get(w), 1 + dp.get(prev)));
            }
        }
        maxChain = Math.max(maxChain, dp.get(w));
    }

    return maxChain;
};`
};

// ─── 10 Micro-Steps: Input words = ["a", "b", "ba", "bca", "bda", "bdca"] ──
export const steps = [
  {
    phase: 'SETUP',
    tracks: [
      { label: 'words (sorted)',  items: ['a', 'b', 'ba', 'bca', 'bda', 'bdca'] },
      { label: 'dp[]',            items: ['—', '—', '—', '—', '—', '—'] },
    ],
    activeI: null,
    metrics: [{ label: 'Max Chain', value: '—' }],
    formula: 'dp[word] = max(dp[word], 1 + dp[predecessor])',
    action: 'Sort words by length; initialize dp map.',
    explain: 'Sorting ensures that when we process a word, all possible predecessors (shorter by exactly 1 character) have already been computed. The dp map stores the longest chain ending at each word.',
    intuition: 'This transforms the problem into a variant of Longest Increasing Subsequence — but on string lengths instead of numeric values.'
  },
  {
    phase: 'EVALUATE',
    tracks: [
      { label: 'words',  items: ['a', 'b', 'ba', 'bca', 'bda', 'bdca'] },
      { label: 'dp[]',   items: [1, '—', '—', '—', '—', '—'] },
    ],
    activeI: 0,
    metrics: [{ label: 'Max Chain', value: 1 }],
    formula: 'dp["a"] = 1 (no predecessors possible for single-char word)',
    action: 'Process word "a" (length 1).',
    explain: '"a" has only 1 character. Removing any character gives "" (empty string), which is not in our word list. So dp["a"] = 1 — the word itself forms a chain of length 1.',
    intuition: 'Single-character words are always base cases with chain length 1.'
  },
  {
    phase: 'EVALUATE',
    tracks: [
      { label: 'words',  items: ['a', 'b', 'ba', 'bca', 'bda', 'bdca'] },
      { label: 'dp[]',   items: [1, 1, '—', '—', '—', '—'] },
    ],
    activeI: 1,
    metrics: [{ label: 'Max Chain', value: 1 }],
    formula: 'dp["b"] = 1 (removing "b" gives "", not found)',
    action: 'Process word "b" (length 1).',
    explain: 'Same as "a" — removing "b" from "b" gives an empty string. No predecessor found. dp["b"] = 1.',
    intuition: 'Both base words start as independent chains of length 1.'
  },
  {
    phase: 'EVALUATE',
    tracks: [
      { label: 'words',  items: ['a', 'b', 'ba', 'bca', 'bda', 'bdca'] },
      { label: 'dp[]',   items: [1, 1, 2, '—', '—', '—'] },
    ],
    activeI: 2,
    activePrev: 1,
    metrics: [{ label: 'Max Chain', value: 2 }],
    formula: 'dp["ba"] = max(1, 1+dp["b"], 1+dp["a"]) = 2',
    action: 'Process word "ba" (length 2): try removing each character.',
    explain: 'Remove "b" → "a" (found, dp["a"]=1). Remove "a" → "b" (found, dp["b"]=1). dp["ba"] = max(1, 1+1, 1+1) = 2. Best chain: "b" → "ba".',
    intuition: 'Both "a" and "b" are valid predecessors. Either gives chain length 2.'
  },
  {
    phase: 'EVALUATE',
    tracks: [
      { label: 'words',  items: ['a', 'b', 'ba', 'bca', 'bda', 'bdca'] },
      { label: 'dp[]',   items: [1, 1, 2, 3, '—', '—'] },
    ],
    activeI: 3,
    activePrev: 2,
    metrics: [{ label: 'Max Chain', value: 3 }],
    formula: 'dp["bca"] = max(1+dp["ca"], 1+dp["ba"], 1+dp["bc"]) = 3',
    action: 'Process "bca" (length 3): delete each char to find predecessors.',
    explain: 'Delete "b" → "ca" (not found ✗). Delete "c" → "ba" (found ✓, dp=2). Delete "a" → "bc" (not found ✗). dp["bca"] = 1 + dp["ba"] = 3. Chain: "b" → "ba" → "bca".',
    intuition: '"ba" is the bridge — it connects the single-char base to the 3-char word.'
  },
  {
    phase: 'EVALUATE',
    tracks: [
      { label: 'words',  items: ['a', 'b', 'ba', 'bca', 'bda', 'bdca'] },
      { label: 'dp[]',   items: [1, 1, 2, 3, 3, '—'] },
    ],
    activeI: 4,
    activePrev: 2,
    metrics: [{ label: 'Max Chain', value: 3 }],
    formula: 'dp["bda"] = max(1+dp["da"], 1+dp["ba"], 1+dp["bd"]) = 3',
    action: 'Process "bda" (length 3): same predecessor check pattern.',
    explain: 'Delete "b" → "da" (not found ✗). Delete "d" → "ba" (found ✓, dp=2). Delete "a" → "bd" (not found ✗). dp["bda"] = 1 + dp["ba"] = 3. Chain: "b" → "ba" → "bda".',
    intuition: 'Multiple words can branch from the same predecessor. "bca" and "bda" are sibling extensions of "ba".'
  },
  {
    phase: 'EVALUATE',
    tracks: [
      { label: 'words',  items: ['a', 'b', 'ba', 'bca', 'bda', 'bdca'] },
      { label: 'dp[]',   items: [1, 1, 2, 3, 3, '—'] },
    ],
    activeI: 5,
    metrics: [{ label: 'Processing', value: '"bdca"' }],
    formula: 'Try: "dca", "bca", "bda", "bdc" — which are in dp?',
    action: 'Process "bdca" (length 4): generate all 4 predecessor candidates.',
    explain: 'By removing each character in turn: remove "b"→"dca", remove "d"→"bca", remove "c"→"bda", remove "a"→"bdc". We check each against the dp map.',
    intuition: 'The key insight: we do not try to build up from shorter words. Instead, we break the current word down by removing one character at each position.'
  },
  {
    phase: 'EVALUATE',
    tracks: [
      { label: 'words',  items: ['a', 'b', 'ba', 'bca', 'bda', 'bdca'] },
      { label: 'dp[]',   items: [1, 1, 2, 3, 3, 4] },
    ],
    activeI: 5,
    activePrev: 4,
    metrics: [{ label: 'Max Chain', value: 4 }],
    formula: 'dp["bdca"] = max(1+dp["bca"], 1+dp["bda"]) = max(4, 4) = 4',
    action: '"bdca" finds two predecessors: "bca" (dp=3) and "bda" (dp=3).',
    explain: '"dca" not found ✗. "bca" found ✓ (dp=3). "bda" found ✓ (dp=3). "bdc" not found ✗. Both give dp["bdca"] = 4. Chain example: "b" → "ba" → "bda" → "bdca".',
    intuition: 'When multiple predecessors tie, either chain is a valid longest chain.'
  },
  {
    phase: 'MERGE',
    tracks: [
      { label: 'words',  items: ['a', 'b', 'ba', 'bca', 'bda', 'bdca'] },
      { label: 'dp[]',   items: [1, 1, 2, 3, 3, 4] },
    ],
    activeI: null,
    metrics: [
      { label: 'Max Chain', value: 4, highlight: true },
    ],
    formula: 'maxChain = max(dp[w] for all w) = 4',
    action: 'Scan all dp values to find the global maximum.',
    explain: 'dp values: a=1, b=1, ba=2, bca=3, bda=3, bdca=4. The maximum is 4.',
    intuition: 'The answer is not necessarily at the last word — it is the maximum over the entire dp map.',
    customCard: {
      title: 'Chain Length Summary',
      rows: [
        { label: '"a"', value: 'dp = 1 (base)' },
        { label: '"b"', value: 'dp = 1 (base)' },
        { label: '"ba"', value: 'dp = 2 (← "b" or "a")' },
        { label: '"bca"', value: 'dp = 3 (← "ba")' },
        { label: '"bda"', value: 'dp = 3 (← "ba")' },
        { label: '"bdca"', value: 'dp = 4 (← "bca" or "bda") ★', accent: true },
      ]
    }
  },
  {
    phase: 'COMPLETED',
    tracks: [
      { label: 'words',  items: ['a', 'b', 'ba', 'bca', 'bda', 'bdca'] },
      { label: 'dp[]',   items: [1, 1, 2, 3, 3, 4] },
    ],
    activeI: null,
    metrics: [
      { label: 'Longest String Chain', value: 4, highlight: true },
      { label: 'Example Chain', value: '"b"→"ba"→"bda"→"bdca"' },
    ],
    formula: 'Answer = 4',
    action: 'Longest String Chain found!',
    explain: 'The longest string chain has length 4: "b" → "ba" → "bda" → "bdca". At each step, exactly one character is inserted to form the next word. The hash map DP approach runs in O(N × L²) where L is the max word length.',
    intuition: 'Sorting by length + hash map predecessor lookup transforms this into an efficient LIS variant. No need for O(N²) pairwise comparison.'
  }
];
