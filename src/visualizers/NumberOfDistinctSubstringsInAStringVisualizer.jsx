import React from 'react';

export const meta = {
  title: 'Number of Distinct Substrings in a String',
  category: 'Tries',
  difficulty: 'Medium',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(N^2 * 26)',
  description: 'Counts the number of distinct substrings in a string in O(N^2) time using a Trie. Every newly created node during the insertion of all suffixes represents exactly one unique substring.'
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
    title: '1. Input: s = "abab", Goal: Count Distinct Substrings',
    phase: 'INIT',
    codeLine: 18,
    s: 'abab',
    activeSuffix: null,
    totalCount: 0,
    newSubstrings: [],
    variables: { string: '"abab"', length: 4, strategy: 'Insert all 4 suffixes into Trie' },
    explain: 'Instead of storing all substrings in a HashSet with O(N^3) memory, each newly created Trie node represents exactly one unique substring.',
    intuition: 'If a path already exists in the Trie, that substring was already encountered.'
  },
  {
    title: '2. Insert Suffix 0: "abab"',
    phase: 'SUFFIX_0',
    codeLine: 24,
    s: 'abab',
    activeSuffix: 'abab',
    totalCount: 4,
    newSubstrings: ['a', 'ab', 'aba', 'abab'],
    variables: { 'Nodes created': 4, substrings: '["a", "ab", "aba", "abab"]', totalUnique: 4 },
    explain: 'Starting from empty root: "a", "ab", "aba", "abab" all create new nodes (+4 count).',
    intuition: 'The first suffix populates the main spine of the Trie.'
  },
  {
    title: '3. Insert Suffix 1: "bab"',
    phase: 'SUFFIX_1',
    codeLine: 24,
    s: 'abab',
    activeSuffix: 'bab',
    totalCount: 7,
    newSubstrings: ['b', 'ba', 'bab'],
    variables: { 'Nodes created': 3, substrings: '["b", "ba", "bab"]', totalUnique: 7 },
    explain: 'Branch starting with "b" is entirely new: "b", "ba", "bab" all create new nodes (+3 count, total = 7).',
    intuition: 'Every new character branching off from a node represents a distinct substring prefix.'
  },
  {
    title: '4. Insert Suffix 2 & 3: "ab" & "b" (Duplicates Skipped!)',
    phase: 'COMPLETED',
    codeLine: 31,
    s: 'abab',
    activeSuffix: 'ab / b',
    totalCount: 7,
    newSubstrings: [],
    variables: { 'Suffix "ab"': 'Already in Trie! (+0)', 'Suffix "b"': 'Already in Trie! (+0)', finalDistinctCount: 7 },
    explain: 'Suffix "ab" reuses nodes a -> b (0 new nodes). Suffix "b" reuses node b (0 new nodes). Total distinct substrings = 7.',
    intuition: 'Total distinct substrings = 7: {"a", "b", "ab", "ba", "aba", "bab", "abab"}.'
  }
];

export default function NumberOfDistinctSubstringsInAStringVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          String: "{step.s}"
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Distinct Substrings: {step.totalCount}
        </span>
      </div>

      {/* Substrings Created Visualizer */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Unique Substrings Harvested by Trie Nodes
        </span>

        <div className="flex flex-wrap items-center justify-center gap-2 py-2">
          {['a', 'b', 'ab', 'ba', 'aba', 'bab', 'abab'].map((sub, idx) => {
            const isDiscovered =
              step.totalCount >= 7 ||
              (step.totalCount >= 4 && ['a', 'ab', 'aba', 'abab'].includes(sub));

            return (
              <div
                key={idx}
                className={`px-3 py-1.5 rounded-xl border font-mono text-xs transition-all duration-300 ${
                  isDiscovered
                    ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300'
                    : 'border-[#272b3c] bg-[#161824] text-slate-600'
                }`}
              >
                "{sub}"
              </div>
            );
          })}
        </div>

        {step.activeSuffix && (
          <div className="w-full border-t border-[#272b3c] pt-3 flex flex-col items-center gap-1 font-mono text-xs">
            <span className="text-slate-400">
              Active Suffix Traversal:{' '}
              <span className="text-amber-300 font-bold">"{step.activeSuffix}"</span>
            </span>
          </div>
        )}
      </div>

      {/* Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}
