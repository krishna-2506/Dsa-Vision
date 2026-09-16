import React from 'react';

export const meta = {
  title: 'Maximum XOR of Two Numbers in an Array',
  category: 'Tries',
  difficulty: 'Medium',
  timeComplexity: 'O(N * 32) = O(N)',
  spaceComplexity: 'O(N * 32)',
  description: 'Finds the maximum XOR pair in an array in linear O(32 * N) time using a Binary Bitwise Trie by greedily seeking opposite bits at each power of 2 from MSB to LSB.'
};

export const solutions = {
  cpp: `// C++ Maximum XOR using Bitwise Trie
// Time: O(32 * N) | Space: O(32 * N)
#include <vector>
#include <algorithm>
using namespace std;

struct Node {
    Node* links[2] = {nullptr};
    bool containsKey(int bit) { return links[bit] != nullptr; }
    Node* get(int bit) { return links[bit]; }
    void put(int bit, Node* node) { links[bit] = node; }
};

class Trie {
    Node* root;
public:
    Trie() { root = new Node(); }

    void insert(int num) {
        Node* node = root;
        for (int i = 31; i >= 0; i--) {
            int bit = (num >> i) & 1;
            if (!node->containsKey(bit)) {
                node->put(bit, new Node());
            }
            node = node->get(bit);
        }
    }

    int getMax(int num) {
        Node* node = root;
        int maxNum = 0;
        for (int i = 31; i >= 0; i--) {
            int bit = (num >> i) & 1;
            int oppBit = 1 - bit;
            if (node->containsKey(oppBit)) {
                maxNum |= (1 << i);
                node = node->get(oppBit);
            } else {
                node = node->get(bit);
            }
        }
        return maxNum;
    }
};

class Solution {
public:
    int findMaximumXOR(vector<int>& nums) {
        Trie trie;
        for (int x : nums) trie.insert(x);
        int maxXor = 0;
        for (int x : nums) {
            maxXor = max(maxXor, trie.getMax(x));
        }
        return maxXor;
    }
};`,
  python: `# Python 3 Maximum XOR using Bitwise Trie
# Time: O(32 * N) | Space: O(32 * N)
class TrieNode:
    def __init__(self):
        self.children = {}

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, num: int):
        curr = self.root
        for i in range(31, -1, -1):
            bit = (num >> i) & 1
            if bit not in curr.children:
                curr.children[bit] = TrieNode()
            curr = curr.children[bit]

    def get_max(self, num: int) -> int:
        curr = self.root
        max_val = 0
        for i in range(31, -1, -1):
            bit = (num >> i) & 1
            opp = 1 - bit
            if opp in curr.children:
                max_val |= (1 << i)
                curr = curr.children[opp]
            else:
                curr = curr.children[bit]
        return max_val

class Solution:
    def findMaximumXOR(self, nums: list[int]) -> int:
        trie = Trie()
        for x in nums:
            trie.insert(x)
        return max(trie.get_max(x) for x in nums)`,
  java: `// Java Maximum XOR using Bitwise Trie
// Time: O(32 * N) | Space: O(32 * N)
class Node {
    Node[] links = new Node[2];
    boolean containsKey(int bit) { return links[bit] != null; }
    Node get(int bit) { return links[bit]; }
    void put(int bit, Node node) { links[bit] = node; }
}

class Trie {
    private Node root = new Node();

    public void insert(int num) {
        Node node = root;
        for (int i = 31; i >= 0; i--) {
            int bit = (num >> i) & 1;
            if (!node.containsKey(bit)) node.put(bit, new Node());
            node = node.get(bit);
        }
    }

    public int getMax(int num) {
        Node node = root;
        int maxNum = 0;
        for (int i = 31; i >= 0; i--) {
            int bit = (num >> i) & 1;
            int opp = 1 - bit;
            if (node.containsKey(opp)) {
                maxNum |= (1 << i);
                node = node.get(opp);
            } else {
                node = node.get(bit);
            }
        }
        return maxNum;
    }
}

class Solution {
    public int findMaximumXOR(int[] nums) {
        Trie trie = new Trie();
        for (int x : nums) trie.insert(x);
        int maxVal = 0;
        for (int x : nums) {
            maxVal = Math.max(maxVal, trie.getMax(x));
        }
        return maxVal;
    }
}`,
  javascript: `// JavaScript Maximum XOR using Bitwise Trie
// Time: O(32 * N) | Space: O(32 * N)
var findMaximumXOR = function(nums) {
    class Node {
        constructor() {
            this.links = [null, null];
        }
    }

    const root = new Node();

    function insert(num) {
        let node = root;
        for (let i = 31; i >= 0; i--) {
            const bit = (num >> i) & 1;
            if (!node.links[bit]) node.links[bit] = new Node();
            node = node.links[bit];
        }
    }

    function getMax(num) {
        let node = root;
        let maxVal = 0;
        for (let i = 31; i >= 0; i--) {
            const bit = (num >> i) & 1;
            const opp = 1 - bit;
            if (node.links[opp]) {
                maxVal |= (1 << i);
                node = node.links[opp];
            } else {
                node = node.links[bit];
            }
        }
        return maxVal;
    }

    for (const x of nums) insert(x);
    let maxXor = 0;
    for (const x of nums) {
        maxXor = Math.max(maxXor, getMax(x));
    }
    return maxXor;
};`
};

export const steps = [
  {
    title: '1. Input: [3, 10, 5, 25, 2, 8] in Binary',
    phase: 'INIT',
    codeLine: 18,
    nums: [3, 10, 5, 25, 2, 8],
    binaryNums: [
      { val: 3, bin: '00011' },
      { val: 10, bin: '01010' },
      { val: 5, bin: '00101' },
      { val: 25, bin: '11001' },
      { val: 2, bin: '00010' },
      { val: 8, bin: '01000' }
    ],
    activePair: null,
    maxXor: 0,
    variables: { nums: '[3, 10, 5, 25, 2, 8]', bitDepth: '5-bit visualization' },
    explain: 'All numbers are inserted into a binary tree with branch 0 (left) and 1 (right). Maximum XOR greedily desires opposite bits at each position.',
    intuition: 'If current bit is 1, choosing a branch with 0 yields 1 ^ 0 = 1.'
  },
  {
    title: '2. Querying 25 (11001): Seeking (00110)',
    phase: 'QUERY_25',
    codeLine: 35,
    nums: [3, 10, 5, 25, 2, 8],
    activePair: [25, 5],
    activeBits: { num1: '11001 (25)', num2: '00101 (5)', xorResult: '11100 (28)' },
    maxXor: 28,
    variables: { target: 25, complementDesired: '00110', bestMatch: 5, xorScore: 28 },
    explain: 'For 25 (11001): at MSB bit 4 (val 1), trie finds path with 0. Resulting matched partner is 5 (00101). 25 ^ 5 = 28!',
    intuition: 'MSB matching provides the largest possible value (16 or 32).'
  },
  {
    title: '3. Querying 5 (00101): Pairs with 25',
    phase: 'QUERY_5',
    codeLine: 35,
    nums: [3, 10, 5, 25, 2, 8],
    activePair: [5, 25],
    activeBits: { num1: '00101 (5)', num2: '11001 (25)', xorResult: '11100 (28)' },
    maxXor: 28,
    variables: { query: 5, bestMatch: 25, maxXor: 28 },
    explain: 'Querying 5 seeks opposite bit 1 at MSB, which takes the branch towards 25. Reaffirms XOR = 28.',
    intuition: 'Symmetric pair discovery confirms 28 as the candidate maximum.'
  },
  {
    title: '4. Optimal Result: 28 (from 5 ^ 25)',
    phase: 'COMPLETED',
    codeLine: 50,
    nums: [3, 10, 5, 25, 2, 8],
    activePair: [5, 25],
    activeBits: { optimalPair: '5 ^ 25', binary: '00101 ^ 11001 = 11100 (28)' },
    maxXor: 28,
    variables: { maxPair: '(5, 25)', maxXor: 28, complexity: 'O(32 * N)' },
    explain: 'After testing all numbers in O(32 * N) time, the global maximum XOR is 28.',
    intuition: 'Bitwise Trie avoids O(N^2) pairwise comparisons entirely.'
  }
];

export default function MaximumXorOfTwoNumbersInAnArrayVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Bitwise Trie: 32 Levels
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Max XOR: {step.maxXor}
        </span>
      </div>

      {/* Bitwise Comparison Display */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Binary Representations &amp; Bit Flipping
        </span>

        {step.activePair ? (
          <div className="flex flex-col items-center gap-3 py-2 font-mono">
            <div className="flex items-center gap-4 text-sm">
              <span className="text-cyan-400">Num A: {step.activePair[0]}</span>
              <span className="text-slate-500">&oplus;</span>
              <span className="text-amber-400">Num B: {step.activePair[1]}</span>
              <span className="text-slate-500">=</span>
              <span className="text-emerald-300 font-bold text-base">{step.maxXor}</span>
            </div>
            <div className="p-3 bg-[#161824] rounded-xl border border-[#3b4261] text-xs text-slate-300">
              {step.activeBits?.binary || `${step.activeBits?.num1} ^ ${step.activeBits?.num2}`}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3 py-2 font-mono text-xs">
            {step.binaryNums?.map((item, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-[#161824] border border-[#272b3c] flex flex-col items-center"
              >
                <span className="text-amber-300 font-bold">{item.val}</span>
                <span className="text-[10px] text-slate-400 font-mono mt-0.5">{item.bin}</span>
              </div>
            ))}
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
