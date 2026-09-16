import React from 'react';

export const meta = {
  title: 'Trie Implementation and Operations (Trie I)',
  category: 'Tries',
  difficulty: 'Medium',
  timeComplexity: 'O(L) per operation',
  spaceComplexity: 'O(N * L * 26)',
  description: 'Implements a Prefix Tree (Trie) supporting insert(word), search(word), and startsWith(prefix) using fixed 26-element pointer arrays and terminal boolean flags.'
};

export const solutions = {
  cpp: `// C++ Trie Implementation (Trie I)
// Time: O(L) per op | Space: O(N * L * 26)
#include <string>
#include <vector>
using namespace std;

struct Node {
    Node* links[26] = {nullptr};
    bool flag = false;

    bool containsKey(char ch) { return links[ch - 'a'] != nullptr; }
    void put(char ch, Node* node) { links[ch - 'a'] = node; }
    Node* get(char ch) { return links[ch - 'a']; }
    void setEnd() { flag = true; }
    bool isEnd() { return flag; }
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
        }
        node->setEnd();
    }

    bool search(string word) {
        Node* node = root;
        for (char ch : word) {
            if (!node->containsKey(ch)) return false;
            node = node->get(ch);
        }
        return node->isEnd();
    }

    bool startsWith(string prefix) {
        Node* node = root;
        for (char ch : prefix) {
            if (!node->containsKey(ch)) return false;
            node = node->get(ch);
        }
        return true;
    }
};`,
  python: `# Python 3 Trie Implementation
# Time: O(L) per op | Space: O(N * L * 26)
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        curr = self.root
        for ch in word:
            if ch not in curr.children:
                curr.children[ch] = TrieNode()
            curr = curr.children[ch]
        curr.is_end = True

    def search(self, word: str) -> bool:
        curr = self.root
        for ch in word:
            if ch not in curr.children:
                return False
            curr = curr.children[ch]
        return curr.is_end

    def startsWith(self, prefix: str) -> bool:
        curr = self.root
        for ch in prefix:
            if ch not in curr.children:
                return False
            curr = curr.children[ch]
        return True`,
  java: `// Java Trie Implementation
// Time: O(L) per op | Space: O(N * L * 26)
class Node {
    Node[] links = new Node[26];
    boolean flag = false;

    boolean containsKey(char ch) { return links[ch - 'a'] != null; }
    void put(char ch, Node node) { links[ch - 'a'] = node; }
    Node get(char ch) { return links[ch - 'a']; }
    void setEnd() { flag = true; }
    boolean isEnd() { return flag; }
}

class Trie {
    private Node root;

    public Trie() { root = new Node(); }

    public void insert(String word) {
        Node node = root;
        for (char ch : word.toCharArray()) {
            if (!node.containsKey(ch)) node.put(ch, new Node());
            node = node.get(ch);
        }
        node.setEnd();
    }

    public boolean search(String word) {
        Node node = root;
        for (char ch : word.toCharArray()) {
            if (!node.containsKey(ch)) return false;
            node = node.get(ch);
        }
        return node.isEnd();
    }

    public boolean startsWith(String prefix) {
        Node node = root;
        for (char ch : prefix.toCharArray()) {
            if (!node.containsKey(ch)) return false;
            node = node.get(ch);
        }
        return true;
    }
}`,
  javascript: `// JavaScript Trie Implementation
// Time: O(L) per op | Space: O(N * L * 26)
class TrieNode {
    constructor() {
        this.children = {};
        this.isEnd = false;
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
        }
        node.isEnd = true;
    }

    search(word) {
        let node = this.root;
        for (const ch of word) {
            if (!node.children[ch]) return false;
            node = node.children[ch];
        }
        return node.isEnd;
    }

    startsWith(prefix) {
        let node = this.root;
        for (const ch of prefix) {
            if (!node.children[ch]) return false;
            node = node.children[ch];
        }
        return true;
    }
}`
};

export const steps = [
  {
    title: '1. Initialize Empty Trie (Root Node)',
    phase: 'INIT',
    codeLine: 20,
    operation: 'Trie()',
    activeWord: null,
    treeNodes: [{ id: 'root', char: 'ROOT', isEnd: false, x: 200, y: 30 }],
    edges: [],
    variables: { totalWords: 0, status: 'Root created' },
    explain: 'The root node is initialized with 26 empty links and isEnd = false. Every query begins from root.',
    intuition: 'The root represents the empty prefix "" for all words.'
  },
  {
    title: '2. insert("apple")',
    phase: 'INSERT',
    codeLine: 22,
    operation: 'insert("apple")',
    activeWord: 'apple',
    treeNodes: [
      { id: 'root', char: 'ROOT', isEnd: false, x: 200, y: 30 },
      { id: 'a', char: 'a', isEnd: false, x: 200, y: 70 },
      { id: 'p1', char: 'p', isEnd: false, x: 200, y: 110 },
      { id: 'p2', char: 'p', isEnd: false, x: 200, y: 150 },
      { id: 'l', char: 'l', isEnd: false, x: 200, y: 190 },
      { id: 'e', char: 'e', isEnd: true, x: 200, y: 230 }
    ],
    edges: [
      { from: 'root', to: 'a' },
      { from: 'a', to: 'p1' },
      { from: 'p1', to: 'p2' },
      { from: 'p2', to: 'l' },
      { from: 'l', to: 'e' }
    ],
    variables: { inserted: '"apple"', terminal: 'node "e" marked isEnd=true' },
    explain: 'Path created: a -> p -> p -> l -> e. The terminal node "e" has flag set to true.',
    intuition: 'Each node stores single characters; words are paths from root to isEnd nodes.'
  },
  {
    title: '3. insert("app") Sharing Prefix',
    phase: 'INSERT_PREFIX',
    codeLine: 22,
    operation: 'insert("app")',
    activeWord: 'app',
    treeNodes: [
      { id: 'root', char: 'ROOT', isEnd: false, x: 200, y: 30 },
      { id: 'a', char: 'a', isEnd: false, x: 200, y: 70 },
      { id: 'p1', char: 'p', isEnd: false, x: 200, y: 110 },
      { id: 'p2', char: 'p', isEnd: true, x: 200, y: 150 },
      { id: 'l', char: 'l', isEnd: false, x: 200, y: 190 },
      { id: 'e', char: 'e', isEnd: true, x: 200, y: 230 }
    ],
    edges: [
      { from: 'root', to: 'a' },
      { from: 'a', to: 'p1' },
      { from: 'p1', to: 'p2' },
      { from: 'p2', to: 'l' },
      { from: 'l', to: 'e' }
    ],
    variables: { inserted: '"app"', sharedPrefix: '"app"', newTerminal: 'node "p2" marked isEnd=true' },
    explain: '"app" reuses existing nodes a -> p -> p without allocating new memory, simply setting isEnd = true on the 2nd p.',
    intuition: 'Prefix sharing provides massive memory compression across common word prefixes.'
  },
  {
    title: '4. search("app") -> True & startsWith("appl") -> True',
    phase: 'COMPLETED',
    codeLine: 34,
    operation: 'search("app") & startsWith("appl")',
    activeWord: 'app / appl',
    treeNodes: [
      { id: 'root', char: 'ROOT', isEnd: false, x: 200, y: 30 },
      { id: 'a', char: 'a', isEnd: false, x: 200, y: 70 },
      { id: 'p1', char: 'p', isEnd: false, x: 200, y: 110 },
      { id: 'p2', char: 'p', isEnd: true, x: 200, y: 150, highlight: true },
      { id: 'l', char: 'l', isEnd: false, x: 200, y: 190 },
      { id: 'e', char: 'e', isEnd: true, x: 200, y: 230 }
    ],
    edges: [
      { from: 'root', to: 'a' },
      { from: 'a', to: 'p1' },
      { from: 'p1', to: 'p2' },
      { from: 'p2', to: 'l' },
      { from: 'l', to: 'e' }
    ],
    variables: { 'search("app")': 'True (isEnd=true)', 'startsWith("appl")': 'True (path exists)', 'search("appl")': 'False (isEnd=false)' },
    explain: 'search("app") lands on node p2 which isEnd=true (returns true). startsWith("appl") finds all prefix letters (returns true).',
    intuition: 'Search verifies both path existence and isEnd flag; startsWith only requires path existence.'
  }
];

export default function TrieImplementationAndOperationsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Operation: {step.operation}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Complexity: O(L)
        </span>
      </div>

      {/* SVG Canvas for Trie Path */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Prefix Tree Node Hierarchy
        </span>

        <svg width="400" height="260" className="overflow-visible">
          {/* Edges */}
          {step.edges.map((e, idx) => {
            const fromNode = step.treeNodes.find(n => n.id === e.from);
            const toNode = step.treeNodes.find(n => n.id === e.to);
            if (!fromNode || !toNode) return null;
            return (
              <line
                key={idx}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="#3b4261"
                strokeWidth="2"
              />
            );
          })}

          {/* Nodes */}
          {step.treeNodes.map(node => (
            <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
              <circle
                r={node.char === 'ROOT' ? 20 : 15}
                className={`transition-all duration-300 ${
                  node.highlight
                    ? 'fill-cyan-500/30 stroke-cyan-400 stroke-2 ring-4 ring-cyan-500/40'
                    : node.isEnd
                    ? 'fill-emerald-500/30 stroke-emerald-400 stroke-2 ring-2 ring-emerald-500/30'
                    : 'fill-[#161824] stroke-[#3b4261]'
                }`}
                strokeWidth="2"
              />
              <text
                textAnchor="middle"
                dy="4"
                className={`font-mono font-bold ${
                  node.char === 'ROOT'
                    ? 'text-[9px] fill-purple-300'
                    : node.isEnd
                    ? 'text-xs fill-emerald-300'
                    : 'text-xs fill-amber-300'
                }`}
              >
                {node.char}
              </text>
              {node.isEnd && (
                <text
                  x="24"
                  dy="4"
                  className="text-[9px] font-mono fill-emerald-400 font-semibold"
                >
                  [END]
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>

      {/* Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}
