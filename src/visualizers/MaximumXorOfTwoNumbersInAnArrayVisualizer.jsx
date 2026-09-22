import React from 'react';

export const meta = {
  title: 'Maximum XOR of Two Numbers in an Array',
  category: 'Tries',
  difficulty: 'Medium',
  timeComplexity: 'O(N * 32) = O(N)',
  spaceComplexity: 'O(N * 32)',
  description: 'Finds the maximum XOR pair in an array in linear O(32 * N) time using a Binary Bitwise Trie by greedily seeking opposite bits at each power of 2 from MSB to LSB.'
};

export const ideaMap = {
  problemArchetype: 'Greedy Bitwise Trie & Maximum XOR',
  trigger: 'Find two elements in an array that maximize a ^ b, or maximize x ^ a[i]. Quadratic O(N^2) pairwise comparisons fail time limits.',
  coreInsight: 'View every number as a 32-bit binary string. At every bit position k from MSB down to LSB, having a 1 at position k adds 2^k to the XOR sum. Since 2^k > sum(2^0 + ... + 2^(k-1)), an MSB decision ALWAYS beats any lower-bit combination! A binary Trie lets us greedily pick the opposite bit (1 - bit) whenever available.',
  naiveApproach: {
    title: 'Nested Pairwise Loops',
    time: 'O(N^2) comparisons',
    space: 'O(1)',
    bottleneck: 'Comparing every pair of numbers (i, j) requires N*(N-1)/2 XOR calculations, exceeding 10^8 operations when N >= 10^5.'
  },
  optimalApproach: {
    title: 'Binary Bitwise Trie (2 Links)',
    time: 'O(32 * N) = O(N) linear time',
    space: 'O(32 * N) nodes',
    breakthrough: 'Insert all numbers into a 2-way Trie. For each number, descend from bit 31 to 0 greedily following the opposite bit link. Guarantees the maximum XOR pair in 32 operations per query.'
  },
  flowNodes: [
    { id: '1', title: 'Binary Representation', subtitle: 'MSB to LSB', description: 'Each number is viewed as a fixed 31 or 32-bit binary integer string.', tag: 'Encoding' },
    { id: '2', title: 'Bitwise Trie Insertion', subtitle: 'Left=0, Right=1', description: 'Insert each number from bit 31 down to 0 into a Trie with links[0] and links[1].', tag: 'Trie Build' },
    { id: '3', title: 'Greedy Opposite Choice', subtitle: 'opp = 1 - bit', description: 'If current bit is b, check if link[1 - b] exists. If yes, take it and add (1 << i) to maxVal.', tag: 'Greedy Choice' },
    { id: '4', title: 'Forced Same Branch', subtitle: 'Gain = 0', description: 'If link[1 - b] is null, we are forced to take link[b] and gain 0 for this bit position.', tag: 'Fallback' }
  ],
  pitfalls: [
    'Bit ordering: MUST traverse from MSB down to LSB (e.g. 31 down to 0). Going LSB to MSB fails because greedy choices at lower bits can sabotage higher bits.',
    'Bit extraction bug: (num >> i) & 1 gives the i-th bit from the right (0-indexed).',
    'Signed bit shift: For 32-bit integers in JavaScript/Java, ensure bit 31 does not cause negative signed integer overflow (use unsigned shift or 30 bits if positive only).'
  ],
  interviewCheatSheet: 'Maximum XOR is mathematically greedy: opposite bits from MSB to LSB. Use a Binary Bitwise Trie.'
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
    title: '1. Problem Overview & Bitwise Trie Strategy',
    phase: 'INIT',
    nums: [3, 10, 5, 25, 2, 8],
    binaryNums: [
      { val: 25, bin: '11001' },
      { val: 10, bin: '01010' },
      { val: 8,  bin: '01000' },
      { val: 5,  bin: '00101' },
      { val: 3,  bin: '00011' },
      { val: 2,  bin: '00010' }
    ],
    queryNum: null,
    activeBit: null,
    bitVal: null,
    activeCandidates: [3, 10, 5, 25, 2, 8],
    runningXor: 0,
    maxXor: 0,
    variables: { nums: '[3, 10, 5, 25, 2, 8]', bitDepth: '5-bit visualization', bruteForce: 'O(N^2) pairs', trieTime: 'O(32 * N) linear' },
    explain: 'Goal: Find two numbers a, b such that (a ^ b) is maximized. To maximize XOR, we want 1s at highest bit positions (MSB). By storing numbers in a 2-way Bitwise Trie (branch 0 and 1), we greedily choose the opposite bit (1 - bit) at each step.',
    intuition: 'XOR truth table: 1 ^ 0 = 1, 0 ^ 1 = 1. Matching opposite bits always yields 1.'
  },
  {
    title: '2. Binary Encoding Matrix (5-Bit Representation)',
    phase: 'BINARY_ENCODING',
    nums: [3, 10, 5, 25, 2, 8],
    binaryNums: [
      { val: 25, bin: '11001', highlight: true },
      { val: 10, bin: '01010' },
      { val: 8,  bin: '01000' },
      { val: 5,  bin: '00101' },
      { val: 3,  bin: '00011' },
      { val: 2,  bin: '00010' }
    ],
    queryNum: 25,
    activeBit: null,
    bitVal: null,
    activeCandidates: [3, 10, 5, 25, 2, 8],
    runningXor: 0,
    maxXor: 0,
    variables: { 'Bit 4 (16)': 'Only 25 has bit 4 = 1', 'Bit 3 (8)': '25, 10, 8 have bit 3 = 1', candidatePrime: '25 is the highest MSB number' },
    explain: 'Observe bit 4 (value 16): 25 is the ONLY number with bit 4 = 1! Any number paired with 25 that has bit 4 = 0 immediately gets at least 16 in the XOR result.',
    intuition: 'Prioritizing MSB decisions always yields a strictly higher result than any combination of lower bits (16 > 8 + 4 + 2 + 1).'
  },
  {
    title: '3. Query X = 25 (11001): Bit 4 (Val 16) -> Desires 0 -> Takes Branch 0 (+16)',
    phase: 'BIT_4',
    nums: [3, 10, 5, 25, 2, 8],
    binaryNums: [
      { val: 25, bin: '11001' },
      { val: 10, bin: '01010' },
      { val: 8,  bin: '01000' },
      { val: 5,  bin: '00101' },
      { val: 3,  bin: '00011' },
      { val: 2,  bin: '00010' }
    ],
    queryNum: 25,
    activeBit: 4,
    bitVal: 16,
    xBit: 1,
    desiredBit: 0,
    branchTaken: 0,
    activeCandidates: [10, 8, 5, 3, 2],
    runningXor: 16,
    maxXor: 16,
    variables: { query: 'X = 25', bitPosition: 'Bit 4 (16)', 'X bit': 1, 'Desired opp bit': 0, 'Branch 0 exists?': 'YES! {10, 8, 5, 3, 2}', runningXor: 16 },
    explain: 'Querying 25: At Bit 4, 25 has 1. Greedily seek opposite bit 0. Branch 0 exists in the Trie (contains {10, 8, 5, 3, 2}). Take branch 0! XOR gains +16. Running XOR = 16.',
    intuition: 'We successfully lock in 16 at the most significant bit!'
  },
  {
    title: '4. Query X = 25: Bit 3 (Val 8) -> Desires 0 -> Takes Branch 0 (+8)',
    phase: 'BIT_3',
    nums: [3, 10, 5, 25, 2, 8],
    binaryNums: [
      { val: 25, bin: '11001' },
      { val: 10, bin: '01010' },
      { val: 8,  bin: '01000' },
      { val: 5,  bin: '00101' },
      { val: 3,  bin: '00011' },
      { val: 2,  bin: '00010' }
    ],
    queryNum: 25,
    activeBit: 3,
    bitVal: 8,
    xBit: 1,
    desiredBit: 0,
    branchTaken: 0,
    activeCandidates: [5, 3, 2],
    runningXor: 24,
    maxXor: 24,
    variables: { bitPosition: 'Bit 3 (8)', 'X bit': 1, 'Desired opp bit': 0, 'Branch 0 candidates': '{5, 3, 2} (10 & 8 eliminated)', runningXor: 24 },
    explain: 'Bit 3: 25 has 1. Desired opposite bit is 0. Numbers 10 (01010) and 8 (01000) have bit 3 = 1, but 5, 3, 2 have bit 3 = 0. Branch 0 exists! Take branch 0. XOR gains +8! Running XOR = 24.',
    intuition: 'Eliminating 10 and 8 was necessary to achieve an extra +8 contribution.'
  },
  {
    title: '5. Query X = 25: Bit 2 (Val 4) -> Desires 1 -> Branch 1 Exists (5!) (+4)',
    phase: 'BIT_2',
    nums: [3, 10, 5, 25, 2, 8],
    binaryNums: [
      { val: 25, bin: '11001' },
      { val: 10, bin: '01010' },
      { val: 8,  bin: '01000' },
      { val: 5,  bin: '00101', highlight: true },
      { val: 3,  bin: '00011' },
      { val: 2,  bin: '00010' }
    ],
    queryNum: 25,
    activeBit: 2,
    bitVal: 4,
    xBit: 0,
    desiredBit: 1,
    branchTaken: 1,
    activeCandidates: [5],
    runningXor: 28,
    maxXor: 28,
    variables: { bitPosition: 'Bit 2 (4)', 'X bit': 0, 'Desired opp bit': 1, 'Branch 1 exists?': 'YES! (Number 5: 00101)', runningXor: 28 },
    explain: 'Bit 2: 25 has 0. Desired opposite bit is 1. Among {5, 3, 2}, only 5 (00101) has bit 2 = 1! Take branch 1! XOR gains +4. Running XOR = 28. Sole candidate remaining is 5.',
    intuition: 'Numbers 3 and 2 are pruned. Only candidate 5 survives.'
  },
  {
    title: '6. Query X = 25: Bit 1 (Val 2) -> Desires 1 -> Candidate 5 has 0 -> Forced Branch 0 (+0)',
    phase: 'BIT_1',
    nums: [3, 10, 5, 25, 2, 8],
    binaryNums: [
      { val: 25, bin: '11001' },
      { val: 10, bin: '01010' },
      { val: 8,  bin: '01000' },
      { val: 5,  bin: '00101', highlight: true },
      { val: 3,  bin: '00011' },
      { val: 2,  bin: '00010' }
    ],
    queryNum: 25,
    activeBit: 1,
    bitVal: 2,
    xBit: 0,
    desiredBit: 1,
    branchTaken: 0,
    activeCandidates: [5],
    runningXor: 28,
    maxXor: 28,
    variables: { bitPosition: 'Bit 1 (2)', 'X bit': 0, 'Desired opp bit': 1, 'Candidate 5 bit 1': '0 (Cannot give 1)', runningXor: 28 },
    explain: 'Bit 1: 25 has 0. We want 1. But candidate 5 has bit 1 = 0! Forced to take branch 0. XOR contribution is 0. Running XOR stays 28.',
    intuition: 'When the opposite bit is unavailable, we take the only surviving path with 0 penalty.'
  },
  {
    title: '7. Query X = 25: Bit 0 (Val 1) -> Desires 0 -> Candidate 5 has 1 -> Forced Branch 1 (+0)',
    phase: 'BIT_0',
    nums: [3, 10, 5, 25, 2, 8],
    binaryNums: [
      { val: 25, bin: '11001' },
      { val: 10, bin: '01010' },
      { val: 8,  bin: '01000' },
      { val: 5,  bin: '00101', highlight: true },
      { val: 3,  bin: '00011' },
      { val: 2,  bin: '00010' }
    ],
    queryNum: 25,
    activeBit: 0,
    bitVal: 1,
    xBit: 1,
    desiredBit: 0,
    branchTaken: 1,
    activeCandidates: [5],
    runningXor: 28,
    maxXor: 28,
    variables: { bitPosition: 'Bit 0 (1)', 'X bit': 1, 'Desired opp bit': 0, 'Candidate 5 bit 0': '1 (Cannot give 0)', runningXor: 28 },
    explain: 'Bit 0: 25 has 1. We want 0. But candidate 5 has bit 0 = 1! Forced to take branch 1. XOR contribution is 0. Traversal complete! Matched partner is 5.',
    intuition: 'All 5 bits evaluated. Traversal terminates at node representing 5.'
  },
  {
    title: '8. Pair Evaluation: 25 ^ 5 = 28 (Binary 11100)',
    phase: 'PAIR_EVAL',
    nums: [3, 10, 5, 25, 2, 8],
    binaryNums: [
      { val: 25, bin: '11001', match: true },
      { val: 10, bin: '01010' },
      { val: 8,  bin: '01000' },
      { val: 5,  bin: '00101', match: true },
      { val: 3,  bin: '00011' },
      { val: 2,  bin: '00010' }
    ],
    queryNum: 25,
    matchedNum: 5,
    activeBit: null,
    bitVal: null,
    activeCandidates: [5],
    runningXor: 28,
    maxXor: 28,
    variables: { 'Number 1': '25 (11001)', 'Number 2': '5 (00101)', 'Bitwise XOR': '28 (11100)', formula: '16 + 8 + 4 = 28' },
    explain: 'Calculation breakdown: 25 (11001) ^ 5 (00101) = 28 (11100). The top three most significant bits (16, 8, 4) all successfully matched opposites!',
    intuition: '11100 in binary = 28 in decimal.'
  },
  {
    title: '9. Competitive Comparison: Why 28 Beats All Other Pairs',
    phase: 'COMPARISON',
    nums: [3, 10, 5, 25, 2, 8],
    binaryNums: [
      { val: 25, bin: '11001', match: true },
      { val: 10, bin: '01010' },
      { val: 8,  bin: '01000' },
      { val: 5,  bin: '00101', match: true },
      { val: 3,  bin: '00011' },
      { val: 2,  bin: '00010' }
    ],
    queryNum: null,
    matchedNum: null,
    activeBit: null,
    bitVal: null,
    activeCandidates: [],
    runningXor: 28,
    maxXor: 28,
    variables: { '25 ^ 5': '28 (WINNER 🏆)', '25 ^ 10': '19', '25 ^ 8': '17', '25 ^ 3': '26', '10 ^ 5': '15' },
    explain: 'Comparison with other candidates: 25 ^ 3 = 26, 25 ^ 10 = 19, 25 ^ 8 = 17, 10 ^ 5 = 15. The pair (25, 5) unambiguously produces the global maximum.',
    intuition: 'The Trie guarantees discovery of the global maximum because the greedy choice at each bit is mathematically optimal.'
  },
  {
    title: '10. Final Result & Complexity: 28 in O(32 * N) Linear Time',
    phase: 'COMPLETED',
    nums: [3, 10, 5, 25, 2, 8],
    binaryNums: [
      { val: 25, bin: '11001', match: true },
      { val: 10, bin: '01010' },
      { val: 8,  bin: '01000' },
      { val: 5,  bin: '00101', match: true },
      { val: 3,  bin: '00011' },
      { val: 2,  bin: '00010' }
    ],
    queryNum: null,
    matchedNum: null,
    activeBit: null,
    bitVal: null,
    activeCandidates: [],
    runningXor: 28,
    maxXor: 28,
    variables: { maximumXor: 28, optimalPair: '(25, 5)', timeComplexity: 'O(32 * N) = O(N)', spaceComplexity: 'O(32 * N)' },
    explain: 'Result = 28. By inserting all N numbers into a binary Trie and executing N queries of length 32, the maximum XOR of two numbers is solved in O(N) linear time without any quadratic O(N^2) comparison.',
    intuition: 'Bitwise Trie transforms pairwise bit comparisons into simple tree descents.'
  }
];

export default function MaximumXorOfTwoNumbersInAnArrayVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-4 space-y-5">
      {/* Top HUD */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-[var(--board-raised)] border border-[var(--line)] rounded-xl p-3 flex flex-col items-center justify-center">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--chalk-dim)]">Current Phase</span>
          <span className="text-xs font-mono font-bold text-cyan-300 mt-0.5">{step.phase}</span>
        </div>
        <div className="bg-[var(--board-raised)] border border-[var(--line)] rounded-xl p-3 flex flex-col items-center justify-center">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--chalk-dim)]">Current Running XOR</span>
          <span className="text-xl font-mono font-black text-emerald-400 mt-0.5">{step.runningXor}</span>
        </div>
        <div className="bg-[var(--board-raised)] border border-[var(--line)] rounded-xl p-3 flex flex-col items-center justify-center">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--chalk-dim)]">Max XOR Discovered</span>
          <span className="text-xl font-mono font-black text-amber-300 mt-0.5">{step.maxXor}</span>
        </div>
      </div>

      {/* Binary Table & Candidates Matrix */}
      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-2xl p-4 flex flex-col gap-3 shadow-xl">
        <div className="w-full flex items-center justify-between text-xs font-mono text-[var(--chalk-dim)] pb-1 border-b border-[var(--line)]/60">
          <span>5-BIT BINARY ENCODING & ACTIVE CANDIDATES</span>
          <span className="text-cyan-400 font-bold">Bit 4 (16) &rarr; Bit 0 (1)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 py-2">
          {step.binaryNums.map((item, idx) => {
            const isQuery = item.val === step.queryNum;
            const isMatch = item.val === step.matchedNum || item.match;
            const isCandidate = step.activeCandidates.includes(item.val);

            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                  isQuery
                    ? 'border-amber-400 bg-amber-500/20 text-amber-200 ring-2 ring-amber-400/30'
                    : isMatch
                    ? 'border-emerald-400 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-400/30'
                    : isCandidate
                    ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-200'
                    : 'border-[var(--line)] bg-[var(--board-raised)] text-[var(--chalk-faint)] opacity-60'
                }`}
              >
                <span className="text-base font-bold">{item.val}</span>
                <span className="text-[11px] tracking-widest mt-1 font-semibold">{item.bin}</span>
                <span className="text-[9px] mt-1 uppercase text-[var(--chalk-dim)]">
                  {isQuery ? 'QUERY X' : isMatch ? 'PARTNER' : isCandidate ? 'ELIGIBLE' : 'PRUNED'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bit Decision Tape during bit traversal */}
      {step.activeBit !== null && (
        <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 flex flex-col gap-3 shadow-xl">
          <div className="w-full flex items-center justify-between text-xs font-mono text-[var(--chalk-dim)] pb-1 border-b border-[var(--line)]/60">
            <span>ACTIVE BIT DECISION TAPE</span>
            <span className="text-amber-300 font-bold">Bit {step.activeBit} (Weight: {step.bitVal})</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
            <div className="bg-[var(--board-raised-2)] p-3 rounded-xl border border-[var(--line)]/60 flex flex-col">
              <span className="text-[10px] text-[var(--chalk-faint)]">QUERY BIT</span>
              <span className="text-amber-300 text-sm font-bold mt-1">x[{step.activeBit}] = {step.xBit}</span>
            </div>
            <div className="bg-[var(--board-raised-2)] p-3 rounded-xl border border-[var(--line)]/60 flex flex-col">
              <span className="text-[10px] text-[var(--chalk-faint)]">DESIRED OPPOSITE BIT</span>
              <span className="text-emerald-300 text-sm font-bold mt-1">1 - {step.xBit} = {step.desiredBit}</span>
            </div>
            <div className="bg-[var(--board-raised-2)] p-3 rounded-xl border border-[var(--line)]/60 flex flex-col">
              <span className="text-[10px] text-[var(--chalk-faint)]">BRANCH TAKEN</span>
              <span className="text-cyan-300 text-sm font-bold mt-1">Branch {step.branchTaken}</span>
            </div>
            <div className="bg-[var(--board-raised-2)] p-3 rounded-xl border border-[var(--line)]/60 flex flex-col">
              <span className="text-[10px] text-[var(--chalk-faint)]">SURVIVING CANDIDATES</span>
              <span className="text-purple-300 text-sm font-bold mt-1">[{step.activeCandidates.join(', ')}]</span>
            </div>
          </div>
        </div>
      )}

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
          <span className="font-bold text-cyan-400">💡 Bitwise Trie Intuition:</span>
          <span>{step.intuition}</span>
        </div>
      </div>
    </div>
  );
}
