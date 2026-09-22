import React from 'react';

export const meta = {
  title: 'Number of Distinct Substrings in a String',
  category: 'Tries',
  difficulty: 'Medium',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(N^2 * 26)',
  description: 'Counts the number of distinct substrings in a string in O(N^2) time using a Trie. Every newly created node during the insertion of all suffixes represents exactly one unique substring.'
};

export const ideaMap = {
  problemArchetype: 'Suffix Expansion & Unique Substring Counting',
  trigger: 'Asked to count all unique/distinct substrings of a string where N <= 1000 and HashSet hashing triggers high overhead or TLE.',
  coreInsight: 'Every substring of string S is a prefix of some suffix of S! By inserting all N suffixes into a single Trie, every newly allocated Trie node represents a unique substring discovered for the very first time.',
  naiveApproach: {
    title: 'Nested Loop + HashSet',
    time: 'O(N^3) time',
    space: 'O(N^3) memory',
    bottleneck: 'Generating N*(N+1)/2 substrings and copying/hashing each substring takes O(N) per string, resulting in massive cubic memory allocations.'
  },
  optimalApproach: {
    title: 'Suffix Trie Node Counting',
    time: 'O(N^2) time',
    space: 'O(N^2 * 26) pointers',
    breakthrough: 'No strings are ever allocated or copied! Each transition (i -> j) simply checks if node.links[s[j]] exists. If null, allocate node and increment distinctCount.'
  },
  flowNodes: [
    { id: '1', title: 'Suffix Theorem', subtitle: 'Prefix of Suffix', description: 'Any substring s[i..j] is simply a prefix of the suffix s[i..N-1].', tag: 'Concept' },
    { id: '2', title: 'Outer Loop (i)', subtitle: 'Reset to Root', description: 'For each starting index i from 0 to N-1, begin traversal from Trie root.', tag: 'Loop i' },
    { id: '3', title: 'Inner Loop (j)', subtitle: 'Char check', description: 'For each j from i to N-1: if child link is null, create new node and count++. If link exists, advance pointer without incrementing.', tag: 'Loop j' },
    { id: '4', title: 'Total Nodes = Substrings', subtitle: 'Automatic dedup', description: 'Total distinct substrings = total nodes created in the Trie (add +1 if empty string is counted).', tag: 'Result' }
  ],
  pitfalls: [
    'Empty string convention: Check whether the platform expects non-empty substrings (e.g. 7 for "abab") or includes the empty string "" (+1 = 8).',
    'Reusing the same Trie: All suffixes MUST be inserted into the SAME single root to ensure cross-suffix duplicate pruning.',
    'Memory limit: For N > 2000, O(N^2 * 26) can exceed 256MB memory. In that case, Suffix Automaton or Suffix Array in O(N log N) is required.'
  ],
  interviewCheatSheet: 'Substrings are prefixes of suffixes. Total distinct substrings equals the number of nodes in the Suffix Trie.'
};

export const solutions = {
  cpp: `// C++ Count Distinct Substrings using Trie
// Time: O(N^2) | Space: O(N^2 * 26)
#include <string>
using namespace std;

struct Node {
    Node* links[26] = {nullptr};
    bool containsKey(char ch) { return links[ch - 'a'] != nullptr; }
    void put(char ch, Node* node) { links[ch - 'a'] = node; }
    Node* get(char ch) { return links[ch - 'a']; }
};

class Solution {
public:
    int countDistinctSubstrings(string s) {
        Node* root = new Node();
        int count = 0;

        for (int i = 0; i < s.size(); i++) {
            Node* node = root;
            for (int j = i; j < s.size(); j++) {
                if (!node->containsKey(s[j])) {
                    node->put(s[j], new Node());
                    count++; // New unique substring created!
                }
                node = node->get(s[j]);
            }
        }

        return count; // Add 1 if empty substring "" is included
    }
};`,
  python: `# Python 3 Count Distinct Substrings using Trie
# Time: O(N^2) | Space: O(N^2 * 26)
class TrieNode:
    def __init__(self):
        self.children = {}

class Solution:
    def countDistinctSubstrings(self, s: str) -> int:
        root = TrieNode()
        count = 0

        for i in range(len(s)):
            curr = root
            for j in range(i, len(s)):
                ch = s[j]
                if ch not in curr.children:
                    curr.children[ch] = TrieNode()
                    count += 1
                curr = curr.children[ch]

        return count`,
  java: `// Java Count Distinct Substrings using Trie
// Time: O(N^2) | Space: O(N^2 * 26)
class Node {
    Node[] links = new Node[26];
    boolean containsKey(char ch) { return links[ch - 'a'] != null; }
    void put(char ch, Node node) { links[ch - 'a'] = node; }
    Node get(char ch) { return links[ch - 'a']; }
}

class Solution {
    public int countDistinctSubstrings(String s) {
        Node root = new Node();
        int count = 0;

        for (int i = 0; i < s.length(); i++) {
            Node node = root;
            for (int j = i; j < s.length(); j++) {
                char ch = s.charAt(j);
                if (!node.containsKey(ch)) {
                    node.put(ch, new Node());
                    count++;
                }
                node = node.get(ch);
            }
        }

        return count;
    }
}`,
  javascript: `// JavaScript Count Distinct Substrings using Trie
// Time: O(N^2) | Space: O(N^2 * 26)
var countDistinctSubstrings = function(s) {
    class Node {
        constructor() {
            this.links = {};
        }
    }

    const root = new Node();
    let count = 0;

    for (let i = 0; i < s.length; i++) {
        let node = root;
        for (let j = i; j < s.length; j++) {
            const ch = s[j];
            if (!node.links[ch]) {
                node.links[ch] = new Node();
                count++;
            }
            node = node.links[ch];
        }
    }

    return count;
};`
};

export const steps = [
  {
    title: '1. Problem Overview: String s = "abab"',
    phase: 'INIT',
    s: 'abab',
    suffixIdx: null,
    charIdx: null,
    activeSub: '',
    nodeCount: 0,
    isDuplicate: false,
    allSubs: [],
    treeNodes: [{ id: 'root', char: 'ROOT', x: 200, y: 35 }],
    edges: [],
    variables: { string: '"abab"', length: 4, suffixes: '["abab", "bab", "ab", "b"]', distinctCount: 0 },
    explain: 'Goal: Count total distinct substrings of "abab". Naive HashSet takes O(N^3) time and memory. Using a Trie, every newly allocated node corresponds to exactly one unique substring in O(N^2) time!',
    intuition: 'Total theoretical substrings = N*(N+1)/2 = 10. By sharing prefixes in the Trie, duplicates are detected without hash lookups.'
  },
  {
    title: '2. Suffix 0 (i=0, j=0): char "a" -> New Node Created',
    phase: 'SUFFIX_0_A',
    s: 'abab',
    suffixIdx: 0,
    charIdx: 0,
    activeSub: 'a',
    nodeCount: 1,
    isDuplicate: false,
    allSubs: ['a'],
    treeNodes: [
      { id: 'root', char: 'ROOT', x: 200, y: 35 },
      { id: 'a1', char: 'a', x: 130, y: 95, isNew: true }
    ],
    edges: [{ from: 'root', to: 'a1', label: 'a' }],
    variables: { 'Active Suffix': '"abab"', 'Current Substring': '"a"', 'New Node?': 'YES -> Count++', distinctCount: 1 },
    explain: 'Starting at root with s[0]=\'a\'. root.links[\'a\'] is null! We allocate new node \'a1\'. New substring "a" discovered! Count = 1.',
    intuition: 'Each edge traversed from root spells a prefix of this suffix, which is a valid substring.'
  },
  {
    title: '3. Suffix 0 (i=0, j=1): char "b" -> Substring "ab"',
    phase: 'SUFFIX_0_B',
    s: 'abab',
    suffixIdx: 0,
    charIdx: 1,
    activeSub: 'ab',
    nodeCount: 2,
    isDuplicate: false,
    allSubs: ['a', 'ab'],
    treeNodes: [
      { id: 'root', char: 'ROOT', x: 200, y: 35 },
      { id: 'a1', char: 'a', x: 130, y: 95 },
      { id: 'b1', char: 'b', x: 130, y: 155, isNew: true }
    ],
    edges: [
      { from: 'root', to: 'a1', label: 'a' },
      { from: 'a1', to: 'b1', label: 'b' }
    ],
    variables: { 'Active Suffix': '"abab"', 'Current Substring': '"ab"', 'New Node?': 'YES -> Count++', distinctCount: 2 },
    explain: 'Move to node \'a1\', look for s[1]=\'b\'. Node has no child \'b\'. Allocate new node \'b1\'. Substring "ab" discovered! Count = 2.',
    intuition: 'Path: root -> a -> b forms the substring "ab".'
  },
  {
    title: '4. Suffix 0 (i=0, j=2): char "a" -> Substring "aba"',
    phase: 'SUFFIX_0_A2',
    s: 'abab',
    suffixIdx: 0,
    charIdx: 2,
    activeSub: 'aba',
    nodeCount: 3,
    isDuplicate: false,
    allSubs: ['a', 'ab', 'aba'],
    treeNodes: [
      { id: 'root', char: 'ROOT', x: 200, y: 35 },
      { id: 'a1', char: 'a', x: 130, y: 95 },
      { id: 'b1', char: 'b', x: 130, y: 155 },
      { id: 'a2', char: 'a', x: 130, y: 215, isNew: true }
    ],
    edges: [
      { from: 'root', to: 'a1', label: 'a' },
      { from: 'a1', to: 'b1', label: 'b' },
      { from: 'b1', to: 'a2', label: 'a' }
    ],
    variables: { 'Active Suffix': '"abab"', 'Current Substring': '"aba"', 'New Node?': 'YES -> Count++', distinctCount: 3 },
    explain: 'Move to node \'b1\', look for s[2]=\'a\'. Child is null. Allocate node \'a2\'. Substring "aba" discovered! Count = 3.',
    intuition: 'Depth in the tree is exactly equal to the length of the substring.'
  },
  {
    title: '5. Suffix 0 (i=0, j=3): char "b" -> Substring "abab" Complete',
    phase: 'SUFFIX_0_B2',
    s: 'abab',
    suffixIdx: 0,
    charIdx: 3,
    activeSub: 'abab',
    nodeCount: 4,
    isDuplicate: false,
    allSubs: ['a', 'ab', 'aba', 'abab'],
    treeNodes: [
      { id: 'root', char: 'ROOT', x: 200, y: 35 },
      { id: 'a1', char: 'a', x: 130, y: 95 },
      { id: 'b1', char: 'b', x: 130, y: 155 },
      { id: 'a2', char: 'a', x: 130, y: 215 },
      { id: 'b2', char: 'b', x: 130, y: 275, isNew: true }
    ],
    edges: [
      { from: 'root', to: 'a1', label: 'a' },
      { from: 'a1', to: 'b1', label: 'b' },
      { from: 'b1', to: 'a2', label: 'a' },
      { from: 'a2', to: 'b2', label: 'b' }
    ],
    variables: { 'Active Suffix': '"abab"', 'Current Substring': '"abab"', 'Suffix 0 Distinct': 4, distinctCount: 4 },
    explain: 'Allocate node \'b2\' for s[3]=\'b\'. Substring "abab" discovered! Suffix 0 finished: yielded 4 new unique substrings.',
    intuition: 'Suffix 0 contributed 4 substrings: {"a", "ab", "aba", "abab"}.'
  },
  {
    title: '6. Suffix 1 (i=1, j=1): char "b" -> Branching Substring "b"',
    phase: 'SUFFIX_1_B',
    s: 'abab',
    suffixIdx: 1,
    charIdx: 1,
    activeSub: 'b',
    nodeCount: 5,
    isDuplicate: false,
    allSubs: ['a', 'ab', 'aba', 'abab', 'b'],
    treeNodes: [
      { id: 'root', char: 'ROOT', x: 200, y: 35 },
      { id: 'a1', char: 'a', x: 130, y: 95 },
      { id: 'b1', char: 'b', x: 130, y: 155 },
      { id: 'a2', char: 'a', x: 130, y: 215 },
      { id: 'b2', char: 'b', x: 130, y: 275 },
      { id: 'br_b1', char: 'b', x: 270, y: 95, isNew: true }
    ],
    edges: [
      { from: 'root', to: 'a1', label: 'a' },
      { from: 'a1', to: 'b1', label: 'b' },
      { from: 'b1', to: 'a2', label: 'a' },
      { from: 'a2', to: 'b2', label: 'b' },
      { from: 'root', to: 'br_b1', label: 'b', isNew: true }
    ],
    variables: { 'Active Suffix': '"bab"', 'Current Substring': '"b"', 'New Node?': 'YES (Branch from root)', distinctCount: 5 },
    explain: 'Start Suffix 1 at root with s[1]=\'b\'. root.links[\'b\'] is null! Allocate new node \'br_b1\'. Substring "b" discovered! Count = 5.',
    intuition: 'Root branches rightward for all substrings starting with letter \'b\'.'
  },
  {
    title: '7. Suffix 1 (i=1, j=2): char "a" -> Substring "ba"',
    phase: 'SUFFIX_1_A',
    s: 'abab',
    suffixIdx: 1,
    charIdx: 2,
    activeSub: 'ba',
    nodeCount: 6,
    isDuplicate: false,
    allSubs: ['a', 'ab', 'aba', 'abab', 'b', 'ba'],
    treeNodes: [
      { id: 'root', char: 'ROOT', x: 200, y: 35 },
      { id: 'a1', char: 'a', x: 130, y: 95 },
      { id: 'b1', char: 'b', x: 130, y: 155 },
      { id: 'a2', char: 'a', x: 130, y: 215 },
      { id: 'b2', char: 'b', x: 130, y: 275 },
      { id: 'br_b1', char: 'b', x: 270, y: 95 },
      { id: 'br_a1', char: 'a', x: 270, y: 155, isNew: true }
    ],
    edges: [
      { from: 'root', to: 'a1', label: 'a' },
      { from: 'a1', to: 'b1', label: 'b' },
      { from: 'b1', to: 'a2', label: 'a' },
      { from: 'a2', to: 'b2', label: 'b' },
      { from: 'root', to: 'br_b1', label: 'b' },
      { from: 'br_b1', to: 'br_a1', label: 'a', isNew: true }
    ],
    variables: { 'Active Suffix': '"bab"', 'Current Substring': '"ba"', 'New Node?': 'YES -> Count++', distinctCount: 6 },
    explain: 'From \'br_b1\', look for s[2]=\'a\'. Allocate child node \'br_a1\'. Substring "ba" discovered! Count = 6.',
    intuition: 'Path root -> b -> a represents the substring "ba".'
  },
  {
    title: '8. Suffix 1 (i=1, j=3): char "b" -> Substring "bab" Complete',
    phase: 'SUFFIX_1_B2',
    s: 'abab',
    suffixIdx: 1,
    charIdx: 3,
    activeSub: 'bab',
    nodeCount: 7,
    isDuplicate: false,
    allSubs: ['a', 'ab', 'aba', 'abab', 'b', 'ba', 'bab'],
    treeNodes: [
      { id: 'root', char: 'ROOT', x: 200, y: 35 },
      { id: 'a1', char: 'a', x: 130, y: 95 },
      { id: 'b1', char: 'b', x: 130, y: 155 },
      { id: 'a2', char: 'a', x: 130, y: 215 },
      { id: 'b2', char: 'b', x: 130, y: 275 },
      { id: 'br_b1', char: 'b', x: 270, y: 95 },
      { id: 'br_a1', char: 'a', x: 270, y: 155 },
      { id: 'br_b2', char: 'b', x: 270, y: 215, isNew: true }
    ],
    edges: [
      { from: 'root', to: 'a1', label: 'a' },
      { from: 'a1', to: 'b1', label: 'b' },
      { from: 'b1', to: 'a2', label: 'a' },
      { from: 'a2', to: 'b2', label: 'b' },
      { from: 'root', to: 'br_b1', label: 'b' },
      { from: 'br_b1', to: 'br_a1', label: 'a' },
      { from: 'br_a1', to: 'br_b2', label: 'b', isNew: true }
    ],
    variables: { 'Active Suffix': '"bab"', 'Current Substring': '"bab"', 'Suffix 1 Distinct': 3, distinctCount: 7 },
    explain: 'From \'br_a1\', allocate node \'br_b2\' for s[3]=\'b\'. Substring "bab" discovered! Count = 7. Suffix 1 complete.',
    intuition: 'Suffix 1 contributed 3 substrings: {"b", "ba", "bab"}. Total unique so far: 7.'
  },
  {
    title: '9. Suffix 2 (i=2): "ab" -> DUPLICATE PRUNED! Zero Allocations',
    phase: 'SUFFIX_2_PRUNED',
    s: 'abab',
    suffixIdx: 2,
    charIdx: 3,
    activeSub: 'ab',
    nodeCount: 7,
    isDuplicate: true,
    allSubs: ['a', 'ab', 'aba', 'abab', 'b', 'ba', 'bab'],
    treeNodes: [
      { id: 'root', char: 'ROOT', x: 200, y: 35 },
      { id: 'a1', char: 'a', x: 130, y: 95, reused: true },
      { id: 'b1', char: 'b', x: 130, y: 155, reused: true },
      { id: 'a2', char: 'a', x: 130, y: 215 },
      { id: 'b2', char: 'b', x: 130, y: 275 },
      { id: 'br_b1', char: 'b', x: 270, y: 95 },
      { id: 'br_a1', char: 'a', x: 270, y: 155 },
      { id: 'br_b2', char: 'b', x: 270, y: 215 }
    ],
    edges: [
      { from: 'root', to: 'a1', label: 'a', reused: true },
      { from: 'a1', to: 'b1', label: 'b', reused: true },
      { from: 'b1', to: 'a2', label: 'a' },
      { from: 'a2', to: 'b2', label: 'b' },
      { from: 'root', to: 'br_b1', label: 'b' },
      { from: 'br_b1', to: 'br_a1', label: 'a' },
      { from: 'br_a1', to: 'br_b2', label: 'b' }
    ],
    variables: { 'Active Suffix': '"ab"', 'Substring "a"': 'Exists in Trie (No increment)', 'Substring "ab"': 'Exists in Trie (No increment)', distinctCount: 7 },
    explain: 'Suffix 2 is "ab". From root, \'a\' already exists -> walk to \'a1\'. Then \'b\' already exists -> walk to \'b1\'. No new nodes allocated! Count stays 7.',
    intuition: 'Duplicates are pruned automatically without hash collisions or set lookups.'
  },
  {
    title: '10. Suffix 3 (i=3): "b" -> DUPLICATE PRUNED! Zero Allocations',
    phase: 'SUFFIX_3_PRUNED',
    s: 'abab',
    suffixIdx: 3,
    charIdx: 3,
    activeSub: 'b',
    nodeCount: 7,
    isDuplicate: true,
    allSubs: ['a', 'ab', 'aba', 'abab', 'b', 'ba', 'bab'],
    treeNodes: [
      { id: 'root', char: 'ROOT', x: 200, y: 35 },
      { id: 'a1', char: 'a', x: 130, y: 95 },
      { id: 'b1', char: 'b', x: 130, y: 155 },
      { id: 'a2', char: 'a', x: 130, y: 215 },
      { id: 'b2', char: 'b', x: 130, y: 275 },
      { id: 'br_b1', char: 'b', x: 270, y: 95, reused: true },
      { id: 'br_a1', char: 'a', x: 270, y: 155 },
      { id: 'br_b2', char: 'b', x: 270, y: 215 }
    ],
    edges: [
      { from: 'root', to: 'a1', label: 'a' },
      { from: 'a1', to: 'b1', label: 'b' },
      { from: 'b1', to: 'a2', label: 'a' },
      { from: 'a2', to: 'b2', label: 'b' },
      { from: 'root', to: 'br_b1', label: 'b', reused: true },
      { from: 'br_b1', to: 'br_a1', label: 'a' },
      { from: 'br_a1', to: 'br_b2', label: 'b' }
    ],
    variables: { 'Active Suffix': '"b"', 'Substring "b"': 'Exists in Trie (No increment)', totalNodesAllocated: 7, distinctCount: 7 },
    explain: 'Suffix 3 is "b". From root, child \'b\' already exists! Move to \'br_b1\'. No new node created. Count stays 7.',
    intuition: 'All suffixes processed! Total newly allocated Trie nodes = 7.'
  },
  {
    title: '11. Final Result: Exactly 7 Distinct Substrings',
    phase: 'COMPLETED',
    s: 'abab',
    suffixIdx: null,
    charIdx: null,
    activeSub: '',
    nodeCount: 7,
    isDuplicate: false,
    allSubs: ['a', 'b', 'ab', 'ba', 'aba', 'bab', 'abab'],
    treeNodes: [
      { id: 'root', char: 'ROOT', x: 200, y: 35 },
      { id: 'a1', char: 'a', x: 130, y: 95 },
      { id: 'b1', char: 'b', x: 130, y: 155 },
      { id: 'a2', char: 'a', x: 130, y: 215 },
      { id: 'b2', char: 'b', x: 130, y: 275 },
      { id: 'br_b1', char: 'b', x: 270, y: 95 },
      { id: 'br_a1', char: 'a', x: 270, y: 155 },
      { id: 'br_b2', char: 'b', x: 270, y: 215 }
    ],
    edges: [
      { from: 'root', to: 'a1', label: 'a' },
      { from: 'a1', to: 'b1', label: 'b' },
      { from: 'b1', to: 'a2', label: 'a' },
      { from: 'a2', to: 'b2', label: 'b' },
      { from: 'root', to: 'br_b1', label: 'b' },
      { from: 'br_b1', to: 'br_a1', label: 'a' },
      { from: 'br_a1', to: 'br_b2', label: 'b' }
    ],
    variables: { totalDistinct: 7, emptyStringIncluded: '8 (if "" is counted)', timeComplexity: 'O(N^2)', spaceComplexity: 'O(N^2 * 26)' },
    explain: 'Distinct non-empty substrings = 7: {"a", "b", "ab", "ba", "aba", "bab", "abab"}. Adding the empty substring "" gives 8 (standard problem formulation returns 7 or 7+1 = 8 depending on platform).',
    intuition: 'Theorem: Distinct Substrings = Number of Nodes in Trie of All Suffixes (excluding root).'
  }
];

export default function NumberOfDistinctSubstringsInAStringVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-4 space-y-5">
      {/* Top HUD */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-[var(--board-raised)] border border-[var(--line)] rounded-xl p-3 flex flex-col items-center justify-center">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--chalk-dim)]">Input String</span>
          <span className="text-base font-mono font-bold text-amber-300 mt-0.5">"{step.s}"</span>
        </div>
        <div className="bg-[var(--board-raised)] border border-[var(--line)] rounded-xl p-3 flex flex-col items-center justify-center">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--chalk-dim)]">Distinct Substrings Found</span>
          <span className="text-xl font-mono font-black text-emerald-400 mt-0.5">{step.nodeCount}</span>
        </div>
        <div className="bg-[var(--board-raised)] border border-[var(--line)] rounded-xl p-3 flex flex-col items-center justify-center">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--chalk-dim)]">Algorithm Status</span>
          <span className={`text-xs font-mono font-bold mt-1 ${step.isDuplicate ? 'text-rose-400' : 'text-cyan-300'}`}>
            {step.isDuplicate ? '⚠️ Duplicate Pruned' : '✨ Node Inserted'}
          </span>
        </div>
      </div>

      {/* Suffix Pointers & Character Tape */}
      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl p-3 flex flex-col items-center gap-2">
        <div className="flex items-center justify-between w-full px-2 text-xs font-mono text-[var(--chalk-dim)]">
          <span>Active Substring Window:</span>
          <span className="text-amber-300 font-bold">
            {step.activeSub ? `"${step.activeSub}"` : '(Waiting)'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {step.s.split('').map((ch, idx) => {
            const isSuffixStart = idx === step.suffixIdx;
            const isInWindow = step.suffixIdx !== null && idx >= step.suffixIdx && idx <= step.charIdx;

            return (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono text-lg font-bold transition-all duration-300 ${
                    isInWindow
                      ? 'bg-amber-500/25 border-2 border-amber-400 text-amber-200 shadow-lg shadow-amber-500/20'
                      : isSuffixStart
                      ? 'bg-purple-500/20 border border-purple-400 text-purple-300'
                      : 'bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk-faint)]'
                  }`}
                >
                  {ch}
                </div>
                <span className="text-[10px] font-mono text-[var(--chalk-faint)] mt-1">idx {idx}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Discovered Substrings Gallery */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 flex flex-col items-center gap-3 shadow-xl">
        <div className="w-full flex items-center justify-between text-xs font-mono text-[var(--chalk-dim)] pb-2 border-b border-[var(--line)]/60">
          <span>DISCOVERED UNIQUE SUBSTRINGS ({step.allSubs.length})</span>
          <span className="text-emerald-400 font-bold">Trie Node Equivalents</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 py-1">
          {['a', 'b', 'ab', 'ba', 'aba', 'bab', 'abab'].map((sub, idx) => {
            const isHarvested = step.allSubs.includes(sub);
            const isCurrent = step.activeSub === sub;

            return (
              <div
                key={idx}
                className={`px-3 py-1.5 rounded-xl border font-mono text-xs font-semibold transition-all duration-300 ${
                  isCurrent
                    ? 'border-amber-400 bg-amber-500/30 text-amber-200 scale-105 shadow-md shadow-amber-500/20'
                    : isHarvested
                    ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300'
                    : 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk-faint)]'
                }`}
              >
                "{sub}"
              </div>
            );
          })}
        </div>
      </div>

      {/* SVG Suffix Trie Tree */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 flex flex-col items-center shadow-2xl relative overflow-hidden">
        <span className="text-xs font-mono text-[var(--chalk-dim)] uppercase tracking-wider mb-2">
          SUFFIX TRIE HIERARCHY (1 New Node = 1 Distinct Substring)
        </span>

        <svg width="100%" height="320" viewBox="0 0 400 320" className="overflow-visible select-none">
          <defs>
            <marker id="arrow-sub" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#4a5578" />
            </marker>
          </defs>

          {/* Edges */}
          {step.edges.map((e, idx) => {
            const fromNode = step.treeNodes.find(n => n.id === e.from);
            const toNode = step.treeNodes.find(n => n.id === e.to);
            if (!fromNode || !toNode) return null;

            return (
              <g key={idx}>
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={e.reused ? '#a855f7' : e.isNew ? '#10b981' : '#334155'}
                  strokeWidth={e.reused || e.isNew ? '3' : '2'}
                  strokeDasharray={e.reused ? '3 3' : 'none'}
                  markerEnd="url(#arrow-sub)"
                  className="transition-all duration-300"
                />
                <circle
                  cx={(fromNode.x + toNode.x) / 2 + (toNode.x > fromNode.x ? 10 : -10)}
                  cy={(fromNode.y + toNode.y) / 2}
                  r="8"
                  fill="#0b0d14"
                  stroke={e.isNew ? '#10b981' : '#334155'}
                  strokeWidth="1"
                />
                <text
                  x={(fromNode.x + toNode.x) / 2 + (toNode.x > fromNode.x ? 10 : -10)}
                  y={(fromNode.y + toNode.y) / 2}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="font-mono text-[9px] font-bold fill-slate-300"
                >
                  {e.label}
                </text>
              </g>
            );
          })}

          {/* Nodes */}
          {step.treeNodes.map(node => {
            const isRoot = node.char === 'ROOT';
            const isNewNode = node.isNew;
            const isReused = node.reused;

            return (
              <g key={node.id} transform={`translate(${node.x}, ${node.y})`} className="transition-transform duration-300">
                <circle
                  r={isRoot ? 22 : 16}
                  className={`transition-all duration-300 ${
                    isNewNode
                      ? 'fill-emerald-500/30 stroke-emerald-400 stroke-2 ring-4 ring-emerald-500/30'
                      : isReused
                      ? 'fill-purple-500/30 stroke-purple-400 stroke-2'
                      : 'fill-[#161824] stroke-[#38405d] stroke-2'
                  }`}
                />
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={`font-mono font-bold select-none ${
                    isRoot
                      ? 'text-[9px] fill-purple-300'
                      : isNewNode
                      ? 'text-xs fill-emerald-300'
                      : isReused
                      ? 'text-xs fill-purple-300'
                      : 'text-xs fill-slate-300'
                  }`}
                >
                  {node.char}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Dynamic Variables */}
      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl p-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono">
        {Object.entries(step.variables).map(([key, value]) => (
          <div key={key} className="bg-[var(--board-raised)] border border-[var(--line)]/60 rounded-lg p-2 flex flex-col">
            <span className="text-[10px] text-[var(--chalk-dim)] uppercase tracking-wider">{key}</span>
            <span className="text-amber-300 font-semibold truncate mt-0.5">{String(value)}</span>
          </div>
        ))}
      </div>

      {/* Explanation & Intuition */}
      <div className="w-full space-y-2">
        <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl p-3.5 text-xs font-mono text-[#a5abbf] leading-relaxed">
          <span className="text-cyan-400 font-bold mr-1.5">Step Action:</span>
          {step.explain}
        </div>
        <div className="w-full bg-cyan-950/20 border border-cyan-500/25 rounded-xl p-3 text-xs font-mono text-cyan-300 flex items-start gap-2">
          <span className="font-bold text-cyan-400">💡 Trie Substring Intuition:</span>
          <span>{step.intuition}</span>
        </div>
      </div>
    </div>
  );
}
