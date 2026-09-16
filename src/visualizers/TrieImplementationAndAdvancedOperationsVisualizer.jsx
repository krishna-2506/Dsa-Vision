import React from 'react';

export const meta = {
  title: 'Trie Implementation and Advanced Operations (Trie II)',
  category: 'Tries',
  difficulty: 'Hard',
  timeComplexity: 'O(L) per operation',
  spaceComplexity: 'O(N * L * 26)',
  description: 'Extends Trie functionality with duplicate counts and erasure: countWordsEqualTo(word), countWordsStartingWith(prefix), and erase(word) by tracking prefix and terminal counts on each node.'
};

export const solutions = {
  cpp: `// C++ Trie II (Advanced Operations: Counts & Erase)
// Time: O(L) per op | Space: O(N * L * 26)
#include <string>
using namespace std;

struct Node {
    Node* links[26] = {nullptr};
    int cntEndWith = 0;
    int cntPrefix = 0;

    bool containsKey(char ch) { return links[ch - 'a'] != nullptr; }
    void put(char ch, Node* node) { links[ch - 'a'] = node; }
    Node* get(char ch) { return links[ch - 'a']; }
    void increaseEnd() { cntEndWith++; }
    void increasePrefix() { cntPrefix++; }
    void deleteEnd() { cntEndWith--; }
    void reducePrefix() { cntPrefix--; }
    int getEnd() { return cntEndWith; }
    int getPrefix() { return cntPrefix; }
};

class Trie {
    Node* root;
public:
    Trie() { root = new Node(); }

    void insert(string word) {
        Node* node = root;
        for (char ch : word) {
            if (!node->containsKey(ch)) {
                node->put(ch, new Node());
            }
            node = node->get(ch);
            node->increasePrefix();
        }
        node->increaseEnd();
    }

    int countWordsEqualTo(string word) {
        Node* node = root;
        for (char ch : word) {
            if (!node->containsKey(ch)) return 0;
            node = node->get(ch);
        }
        return node->getEnd();
    }

    int countWordsStartingWith(string prefix) {
        Node* node = root;
        for (char ch : prefix) {
            if (!node->containsKey(ch)) return 0;
            node = node->get(ch);
        }
        return node->getPrefix();
    }

    void erase(string word) {
        Node* node = root;
        for (char ch : word) {
            if (!node->containsKey(ch)) return;
            node = node->get(ch);
            node->reducePrefix();
        }
        node->deleteEnd();
    }
};`,
  python: `# Python 3 Trie II (Advanced Counts & Erase)
# Time: O(L) per op | Space: O(N * L * 26)
class TrieNode:
    def __init__(self):
        self.children = {}
        self.cnt_end = 0
        self.cnt_prefix = 0

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        curr = self.root
        for ch in word:
            if ch not in curr.children:
                curr.children[ch] = TrieNode()
            curr = curr.children[ch]
            curr.cnt_prefix += 1
        curr.cnt_end += 1

    def countWordsEqualTo(self, word: str) -> int:
        curr = self.root
        for ch in word:
            if ch not in curr.children:
                return 0
            curr = curr.children[ch]
        return curr.cnt_end

    def countWordsStartingWith(self, prefix: str) -> int:
        curr = self.root
        for ch in prefix:
            if ch not in curr.children:
                return 0
            curr = curr.children[ch]
        return curr.cnt_prefix

    def erase(self, word: str) -> None:
        curr = self.root
        for ch in word:
            if ch not in curr.children:
                return
            curr = curr.children[ch]
            curr.cnt_prefix -= 1
        curr.cnt_end -= 1`,
  java: `// Java Trie II (Advanced Counts & Erase)
// Time: O(L) per op | Space: O(N * L * 26)
class Node {
    Node[] links = new Node[26];
    int cntEndWith = 0;
    int cntPrefix = 0;

    boolean containsKey(char ch) { return links[ch - 'a'] != null; }
    void put(char ch, Node node) { links[ch - 'a'] = node; }
    Node get(char ch) { return links[ch - 'a']; }
    void increaseEnd() { cntEndWith++; }
    void increasePrefix() { cntPrefix++; }
    void deleteEnd() { cntEndWith--; }
    void reducePrefix() { cntPrefix--; }
}

class Trie {
    private Node root;

    public Trie() { root = new Node(); }

    public void insert(String word) {
        Node node = root;
        for (char ch : word.toCharArray()) {
            if (!node.containsKey(ch)) node.put(ch, new Node());
            node = node.get(ch);
            node.increasePrefix();
        }
        node.increaseEnd();
    }

    public int countWordsEqualTo(String word) {
        Node node = root;
        for (char ch : word.toCharArray()) {
            if (!node.containsKey(ch)) return 0;
            node = node.get(ch);
        }
        return node.cntEndWith;
    }

    public int countWordsStartingWith(String prefix) {
        Node node = root;
        for (char ch : prefix.toCharArray()) {
            if (!node.containsKey(ch)) return 0;
            node = node.get(ch);
        }
        return node.cntPrefix;
    }

    public void erase(String word) {
        Node node = root;
        for (char ch : word.toCharArray()) {
            if (!node.containsKey(ch)) return;
            node = node.get(ch);
            node.reducePrefix();
        }
        node.deleteEnd();
    }
}`,
  javascript: `// JavaScript Trie II (Advanced Counts & Erase)
// Time: O(L) per op | Space: O(N * L * 26)
class TrieNode {
    constructor() {
        this.children = {};
        this.cntEnd = 0;
        this.cntPrefix = 0;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (const ch of word) {
            if (!node.children[ch]) node.children[ch] = new TrieNode();
            node = node.children[ch];
            node.cntPrefix++;
        }
        node.cntEnd++;
    }

    countWordsEqualTo(word) {
        let node = this.root;
        for (const ch of word) {
            if (!node.children[ch]) return 0;
            node = node.children[ch];
        }
        return node.cntEnd;
    }

    countWordsStartingWith(prefix) {
        let node = this.root;
        for (const ch of prefix) {
            if (!node.children[ch]) return 0;
            node = node.children[ch];
        }
        return node.cntPrefix;
    }

    erase(word) {
        let node = this.root;
        for (const ch of word) {
            if (!node.children[ch]) return;
            node = node.children[ch];
            node.cntPrefix--;
        }
        node.cntEnd--;
    }
}`
};

export const steps = [
  {
    title: '1. Insert "apple" and "apple" (Duplicates Allowed)',
    phase: 'INSERT_DUPLICATES',
    codeLine: 26,
    operation: 'insert("apple") x 2',
    nodes: [
      { id: 'a', char: 'a', cp: 2, ce: 0, y: 30 },
      { id: 'p1', char: 'p', cp: 2, ce: 0, y: 70 },
      { id: 'p2', char: 'p', cp: 2, ce: 0, y: 110 },
      { id: 'l', char: 'l', cp: 2, ce: 0, y: 150 },
      { id: 'e', char: 'e', cp: 2, ce: 2, y: 190 }
    ],
    variables: { 'cntPrefix on all': 2, 'cntEndWith on "e"': 2 },
    explain: 'Inserting "apple" twice increments cntPrefix by 1 for each node along the path on both passes, and cntEndWith on node "e" becomes 2.',
    intuition: 'Counting endpoints and prefix frequencies allows the Trie to serve as a multiset.'
  },
  {
    title: '2. Insert "app" (Branching Prefix Count)',
    phase: 'INSERT_APP',
    codeLine: 26,
    operation: 'insert("app")',
    nodes: [
      { id: 'a', char: 'a', cp: 3, ce: 0, y: 30 },
      { id: 'p1', char: 'p', cp: 3, ce: 0, y: 70 },
      { id: 'p2', char: 'p', cp: 3, ce: 1, y: 110 },
      { id: 'l', char: 'l', cp: 2, ce: 0, y: 150 },
      { id: 'e', char: 'e', cp: 2, ce: 2, y: 190 }
    ],
    variables: { 'Prefix "app" count': 3, 'Words equal to "app"': 1, 'Words equal to "apple"': 2 },
    explain: 'Prefix path a -> p -> p now has cntPrefix = 3. Node p2 has cntEndWith = 1.',
    intuition: 'Different depths record different word counts and prefix branch counts.'
  },
  {
    title: '3. countWordsEqualTo("apple") -> 2 & countWordsStartingWith("app") -> 3',
    phase: 'COUNT_QUERIES',
    codeLine: 40,
    operation: 'Count Queries',
    nodes: [
      { id: 'a', char: 'a', cp: 3, ce: 0, y: 30 },
      { id: 'p1', char: 'p', cp: 3, ce: 0, y: 70 },
      { id: 'p2', char: 'p', cp: 3, ce: 1, y: 110, queryHit: true },
      { id: 'l', char: 'l', cp: 2, ce: 0, y: 150 },
      { id: 'e', char: 'e', cp: 2, ce: 2, y: 190, queryHit: true }
    ],
    variables: { 'countWordsEqualTo("apple")': 2, 'countWordsStartingWith("app")': 3 },
    explain: 'Navigating to node "e" gives cntEndWith = 2. Navigating to node "p2" gives cntPrefix = 3 in instant O(L) time!',
    intuition: 'No subtrees need to be traversed at query time because counts are precomputed during insertion.'
  },
  {
    title: '4. erase("apple") Decrements All Counters Along Path',
    phase: 'COMPLETED',
    codeLine: 58,
    operation: 'erase("apple")',
    nodes: [
      { id: 'a', char: 'a', cp: 2, ce: 0, y: 30 },
      { id: 'p1', char: 'p', cp: 2, ce: 0, y: 70 },
      { id: 'p2', char: 'p', cp: 2, ce: 1, y: 110 },
      { id: 'l', char: 'l', cp: 1, ce: 0, y: 150 },
      { id: 'e', char: 'e', cp: 1, ce: 1, y: 190 }
    ],
    variables: { 'After erase("apple")': 'equal("apple") = 1, startingWith("app") = 2' },
    explain: 'Erasing "apple" decrements cntPrefix on every node along the word path and decrements cntEndWith on node "e" to 1.',
    intuition: 'Symmetric counter decrementation gracefully removes instances without destroying shared nodes.'
  }
];

export default function TrieImplementationAndAdvancedOperationsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Operation: {step.operation}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Features: cntEndWith + cntPrefix
        </span>
      </div>

      {/* Nodes and Counters Display */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Node Counters (cp = cntPrefix, ce = cntEndWith)
        </span>

        <div className="flex flex-col items-center gap-2 py-2">
          {step.nodes.map((n, idx) => (
            <div
              key={idx}
              className={`w-56 h-12 px-4 rounded-xl border flex items-center justify-between font-mono text-xs transition-all duration-300 ${
                n.queryHit
                  ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300 ring-2 ring-cyan-500/40 shadow-lg'
                  : 'border-[#272b3c] bg-[#161824] text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#12131b] border border-[#3b4261] flex items-center justify-center font-bold text-amber-300">
                  {n.char}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="text-cyan-400">prefix: {n.cp}</span>
                <span className="text-emerald-400 font-bold">ends: {n.ce}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}
