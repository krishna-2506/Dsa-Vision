import React from 'react';

export const meta = {
  title: 'Maximum XOR With an Element From an Array',
  category: 'Tries',
  difficulty: 'Hard',
  timeComplexity: 'O(N log N + Q log Q + (N + Q) * 32)',
  spaceComplexity: 'O(N * 32 + Q)',
  description: 'Solves offline queries of finding max(x ^ arr[i]) subject to arr[i] <= m. By sorting both the array and queries by threshold m, elements are inserted incrementally into a Bitwise Trie.'
};

export const ideaMap = {
  problemArchetype: 'Offline Queries & Monotonic Bitwise Trie',
  trigger: 'Multiple queries asking for max XOR with a conditional constraint: arr[i] <= m. Online filtering per query causes TLE.',
  coreInsight: 'Convert online filtering into offline monotonic insertion: sort queries by m ascending and nums ascending. Insert numbers into the Bitwise Trie only when they satisfy nums[idx] <= m. Each number is inserted at most once across all queries!',
  naiveApproach: {
    title: 'Per-Query Filtering + Bitwise Search',
    time: 'O(Q * N * 32) time',
    space: 'O(N * 32) rebuilt per query',
    bottleneck: 'Filtering eligible elements for every query or repeatedly clearing and rebuilding the Trie takes quadratic time.'
  },
  optimalApproach: {
    title: 'Offline Sorted Queries + Incremental Trie',
    time: 'O(N log N + Q log Q + (N + Q) * 32)',
    space: 'O(N * 32 + Q)',
    breakthrough: 'Threshold m monotonically increases across sorted queries. Array pointer idx moves strictly forward from 0 to N. Total insertion time is bounded by N * 32.'
  },
  flowNodes: [
    { id: '1', title: 'Sort Nums & Queries', subtitle: 'Offline order', description: 'Sort nums ascending. Tag queries with original indices and sort by threshold m ascending.', tag: 'Sorting' },
    { id: '2', title: 'Monotonic Ingestion', subtitle: 'Single sweep', description: 'Advance pointer idx while nums[idx] <= m, inserting 32-bit representations into the Bitwise Trie.', tag: 'Ingestion' },
    { id: '3', title: 'Empty Check', subtitle: 'idx === 0', description: 'If idx == 0, no element in the array is <= m. Immediately assign answer = -1.', tag: 'Edge Case' },
    { id: '4', title: 'Greedy Bit Traversal', subtitle: 'MSB to LSB', description: 'Traverse Trie seeking opposite bit (1 - bit) to maximize XOR sum in O(32) time.', tag: 'Max XOR' }
  ],
  pitfalls: [
    'Forgetting original query indices: Must record origIdx before sorting queries so final answers can be mapped back to their required output positions.',
    'Empty Trie condition: If no elements are <= m (e.g. idx == 0), must return -1 instead of querying the Trie.',
    'Bit depth: Numbers can be up to 10^9, requiring 31 or 32 bits (i from 30 or 31 down to 0).'
  ],
  interviewCheatSheet: 'When queries have a threshold constraint (<= m) and operations are commutative/independent, always ask: "Can I sort the queries offline?"'
};

export const solutions = {
  cpp: `// C++ Maximum XOR With an Element From Array (Offline Queries)
// Time: O(N log N + Q log Q + (N + Q)*32) | Space: O(N*32 + Q)
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
    Node* root = new Node();
public:
    void insert(int num) {
        Node* node = root;
        for (int i = 31; i >= 0; i--) {
            int bit = (num >> i) & 1;
            if (!node->containsKey(bit)) node->put(bit, new Node());
            node = node->get(bit);
        }
    }

    int getMax(int num) {
        Node* node = root;
        int maxVal = 0;
        for (int i = 31; i >= 0; i--) {
            int bit = (num >> i) & 1;
            int opp = 1 - bit;
            if (node->containsKey(opp)) {
                maxVal |= (1 << i);
                node = node->get(opp);
            } else {
                node = node->get(bit);
            }
        }
        return maxVal;
    }
};

class Solution {
public:
    vector<int> maximizeXor(vector<int>& nums, vector<vector<int>>& queries) {
        sort(nums.begin(), nums.end());
        int q = queries.size();
        // offline queries: {m, x, originalIndex}
        vector<pair<int, pair<int, int>>> oQ(q);
        for (int i = 0; i < q; i++) {
            oQ[i] = {queries[i][1], {queries[i][0], i}};
        }
        sort(oQ.begin(), oQ.end());

        vector<int> ans(q);
        Trie trie;
        int idx = 0, n = nums.size();

        for (int i = 0; i < q; i++) {
            int m = oQ[i].first;
            int x = oQ[i].second.first;
            int qIdx = oQ[i].second.second;

            while (idx < n && nums[idx] <= m) {
                trie.insert(nums[idx]);
                idx++;
            }

            if (idx == 0) ans[qIdx] = -1; // No element <= m
            else ans[qIdx] = trie.getMax(x);
        }

        return ans;
    }
};`,
  python: `# Python 3 Maximum XOR With Element (Offline Queries)
# Time: O(N log N + Q log Q + (N + Q)*32) | Space: O(N*32 + Q)
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
    def maximizeXor(self, nums: list[int], queries: list[list[int]]) -> list[int]:
        nums.sort()
        # Sort queries by threshold m
        sorted_q = sorted(enumerate(queries), key=lambda x: x[1][1])
        ans = [-1] * len(queries)
        trie = Trie()
        idx = 0
        n = len(nums)

        for q_idx, (x, m) in sorted_q:
            while idx < n and nums[idx] <= m:
                trie.insert(nums[idx])
                idx += 1
            if idx > 0:
                ans[q_idx] = trie.get_max(x)

        return ans`,
  java: `// Java Maximum XOR With Element (Offline Queries)
// Time: O(N log N + Q log Q + (N + Q)*32) | Space: O(N*32 + Q)
import java.util.Arrays;
import java.util.Comparator;

class Solution {
    class Node {
        Node[] links = new Node[2];
        boolean containsKey(int bit) { return links[bit] != null; }
        Node get(int bit) { return links[bit]; }
        void put(int bit, Node node) { links[bit] = node; }
    }

    class Trie {
        Node root = new Node();
        void insert(int num) {
            Node node = root;
            for (int i = 31; i >= 0; i--) {
                int bit = (num >> i) & 1;
                if (!node.containsKey(bit)) node.put(bit, new Node());
                node = node.get(bit);
            }
        }
        int getMax(int num) {
            Node node = root;
            int maxVal = 0;
            for (int i = 31; i >= 0; i--) {
                int bit = (num >> i) & 1;
                int opp = 1 - bit;
                if (node.containsKey(opp)) {
                    maxVal |= (1 << i);
                    node = node.get(opp);
                } else {
                    node = node.get(bit);
                }
            }
            return maxVal;
        }
    }

    public int[] maximizeXor(int[] nums, int[][] queries) {
        Arrays.sort(nums);
        int q = queries.length;
        int[][] sortedQ = new int[q][3];
        for (int i = 0; i < q; i++) {
            sortedQ[i][0] = queries[i][0];
            sortedQ[i][1] = queries[i][1];
            sortedQ[i][2] = i;
        }
        Arrays.sort(sortedQ, Comparator.comparingInt(a -> a[1]));

        int[] ans = new int[q];
        Trie trie = new Trie();
        int idx = 0, n = nums.length;

        for (int i = 0; i < q; i++) {
            int x = sortedQ[i][0];
            int m = sortedQ[i][1];
            int origIdx = sortedQ[i][2];

            while (idx < n && nums[idx] <= m) {
                trie.insert(nums[idx]);
                idx++;
            }

            if (idx == 0) ans[origIdx] = -1;
            else ans[origIdx] = trie.getMax(x);
        }

        return ans;
    }
}`,
  javascript: `// JavaScript Maximum XOR With Element (Offline Queries)
// Time: O(N log N + Q log Q + (N + Q)*32) | Space: O(N*32 + Q)
var maximizeXor = function(nums, queries) {
    nums.sort((a, b) => a - b);
    const sortedQ = queries.map(([x, m], i) => ({ x, m, idx: i })).sort((a, b) => a.m - b.m);

    class Node {
        constructor() { this.links = [null, null]; }
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

    const ans = new Array(queries.length).fill(-1);
    let idx = 0;

    for (const { x, m, idx: qIdx } of sortedQ) {
        while (idx < nums.length && nums[idx] <= m) {
            insert(nums[idx]);
            idx++;
        }
        if (idx > 0) {
            ans[qIdx] = getMax(x);
        }
    }

    return ans;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: Offline Queries & Constraint arr[i] <= m',
    phase: 'INIT',
    nums: [5, 2, 4, 6, 3],
    sortedNums: [2, 3, 4, 5, 6],
    queries: [
      { origIdx: 0, x: 12, m: 4 },
      { origIdx: 1, x: 8, m: 1 },
      { origIdx: 2, x: 1, m: 0 }
    ],
    activeQueryIdx: null,
    pointerIdx: 0,
    trieElements: [],
    ans: ['?', '?', '?'],
    bitInspection: null,
    variables: { totalNums: 5, totalQueries: 3, strategy: 'Offline Queries sorted by m' },
    explain: 'Problem: For each query (x, m), find max(x ^ val) among elements val <= m. Re-filtering per query takes O(Q * N) TLE. The breakthrough is Offline Queries: sort queries by m ascending so numbers are inserted incrementally into a Bitwise Trie!',
    intuition: 'Because m only increases, each number in nums is inserted into the Bitwise Trie at most once.'
  },
  {
    title: '2. Sort Array & Sort Queries by Threshold m',
    phase: 'SORT',
    nums: [5, 2, 4, 6, 3],
    sortedNums: [2, 3, 4, 5, 6],
    queries: [
      { origIdx: 2, x: 1, m: 0 },
      { origIdx: 1, x: 8, m: 1 },
      { origIdx: 0, x: 12, m: 4 }
    ],
    activeQueryIdx: null,
    pointerIdx: 0,
    trieElements: [],
    ans: ['?', '?', '?'],
    bitInspection: null,
    variables: { 'Sorted nums': '[2, 3, 4, 5, 6]', 'Offline Query Queue': 'm=0, then m=1, then m=4' },
    explain: 'Sorted nums: [2, 3, 4, 5, 6]. Offline Query processing order: Q_2 [x=1, m=0] -> Q_1 [x=8, m=1] -> Q_0 [x=12, m=4]. We preserve original query indices to output answers in correct order.',
    intuition: 'Sorting queries converts an online filter problem into a monotonic sliding window over nums.'
  },
  {
    title: '3. Query 2 [x=1, m=0] -> nums[0]=2 > 0 -> No elements <= 0 -> ans[2] = -1',
    phase: 'QUERY_EMPTY',
    nums: [5, 2, 4, 6, 3],
    sortedNums: [2, 3, 4, 5, 6],
    queries: [
      { origIdx: 2, x: 1, m: 0, status: 'active' },
      { origIdx: 1, x: 8, m: 1 },
      { origIdx: 0, x: 12, m: 4 }
    ],
    activeQueryIdx: 2,
    pointerIdx: 0,
    trieElements: [],
    ans: ['?', '?', -1],
    bitInspection: null,
    variables: { query: 'Q_2: x=1, m=0', 'nums[0]': 2, 'Is 2 <= 0?': 'NO', 'Trie Size': 0, 'ans[2]': -1 },
    explain: 'Process Q_2: We look for elements <= 0. But smallest element is nums[0] = 2 > 0! Zero elements are <= 0, so Trie is empty. By problem definition, return -1.',
    intuition: 'When idx == 0, no element meets the condition <= m. Immediate -1 without any Trie traversal.'
  },
  {
    title: '4. Query 1 [x=8, m=1] -> nums[0]=2 > 1 -> Still empty -> ans[1] = -1',
    phase: 'QUERY_EMPTY_2',
    nums: [5, 2, 4, 6, 3],
    sortedNums: [2, 3, 4, 5, 6],
    queries: [
      { origIdx: 2, x: 1, m: 0, status: 'done' },
      { origIdx: 1, x: 8, m: 1, status: 'active' },
      { origIdx: 0, x: 12, m: 4 }
    ],
    activeQueryIdx: 1,
    pointerIdx: 0,
    trieElements: [],
    ans: ['?', -1, -1],
    bitInspection: null,
    variables: { query: 'Q_1: x=8, m=1', 'nums[0]': 2, 'Is 2 <= 1?': 'NO', 'Trie Size': 0, 'ans[1]': -1 },
    explain: 'Process Q_1: We look for elements <= 1. Again, nums[0] = 2 > 1! Trie still has 0 elements. Result is -1.',
    intuition: 'The pointer idx stays at 0. Zero redundant operations performed.'
  },
  {
    title: '5. Query 0 [x=12, m=4] -> Ingest elements <= 4 -> Insert [2, 3, 4]',
    phase: 'INGEST',
    nums: [5, 2, 4, 6, 3],
    sortedNums: [2, 3, 4, 5, 6],
    queries: [
      { origIdx: 2, x: 1, m: 0, status: 'done' },
      { origIdx: 1, x: 8, m: 1, status: 'done' },
      { origIdx: 0, x: 12, m: 4, status: 'active' }
    ],
    activeQueryIdx: 0,
    pointerIdx: 3,
    trieElements: [2, 3, 4],
    ans: ['?', -1, -1],
    bitInspection: null,
    variables: { query: 'Q_0: x=12, m=4', 'Inserted Elements': '[2, 3, 4]', 'Stopped at nums[3]': '5 > 4', 'Trie Size': 3 },
    explain: 'Process Q_0: Threshold m = 4. We advance idx through nums: insert 2 <= 4, insert 3 <= 4, insert 4 <= 4. Next element is 5 > 4, so stop! Trie now contains {2, 3, 4}.',
    intuition: 'Only valid elements (<= 4) are now in the Trie. Any bitwise search is guaranteed valid!'
  },
  {
    title: '6. Bitwise Trie Inspection: {2, 3, 4} Binary Representation',
    phase: 'TRIE_INSPECT',
    nums: [5, 2, 4, 6, 3],
    sortedNums: [2, 3, 4, 5, 6],
    queries: [
      { origIdx: 2, x: 1, m: 0, status: 'done' },
      { origIdx: 1, x: 8, m: 1, status: 'done' },
      { origIdx: 0, x: 12, m: 4, status: 'active' }
    ],
    activeQueryIdx: 0,
    pointerIdx: 3,
    trieElements: [2, 3, 4],
    ans: ['?', -1, -1],
    bitInspection: {
      items: [
        { val: 2, bin: '00010' },
        { val: 3, bin: '00011' },
        { val: 4, bin: '00100' }
      ],
      query: { val: 12, bin: '01100' }
    },
    variables: { queryX: '12 (01100 in 5-bit binary)', bitCandidates: '2: 00010, 3: 00011, 4: 00100', 'Goal': 'Greedily match opposite bits' },
    explain: 'We now query x = 12 (binary 01100) against the Bitwise Trie of {2, 3, 4}. For maximum XOR, at each bit position from MSB (bit 4) to LSB (bit 0), we desire the opposite bit (1 - bit).',
    intuition: 'Bit 4 corresponds to value 16, Bit 3 to 8, Bit 2 to 4, Bit 1 to 2, Bit 0 to 1.'
  },
  {
    title: '7. Query x=12: Bit 4 (val 16) -> Bit is 0 -> Wants 1 -> None -> Takes 0',
    phase: 'BIT_4',
    nums: [5, 2, 4, 6, 3],
    sortedNums: [2, 3, 4, 5, 6],
    queries: [
      { origIdx: 2, x: 1, m: 0, status: 'done' },
      { origIdx: 1, x: 8, m: 1, status: 'done' },
      { origIdx: 0, x: 12, m: 4, status: 'active' }
    ],
    activeQueryIdx: 0,
    pointerIdx: 3,
    trieElements: [2, 3, 4],
    ans: ['?', -1, -1],
    bitInspection: {
      activeBit: 4,
      bitVal: 16,
      xBit: 0,
      desiredBit: 1,
      takenBit: 0,
      xorContribution: 0,
      runningXor: 0,
      candidatesLeft: [2, 3, 4]
    },
    variables: { bitPosition: 'Bit 4 (16)', 'x bit': 0, 'Desired opp bit': 1, 'Branch 1 exists?': 'NO', 'XOR Gain': 0 },
    explain: 'Bit 4: x has bit 0. We want opposite bit 1. But none of {2, 3, 4} have bit 4 = 1. We must take branch 0. XOR contribution is 0.',
    intuition: 'If the opposite branch does not exist, we are forced to take the existing matching branch.'
  },
  {
    title: '8. Query x=12: Bit 3 (val 8) -> Bit is 1 -> Wants 0 -> YES! Takes 0 (+8)',
    phase: 'BIT_3',
    nums: [5, 2, 4, 6, 3],
    sortedNums: [2, 3, 4, 5, 6],
    queries: [
      { origIdx: 2, x: 1, m: 0, status: 'done' },
      { origIdx: 1, x: 8, m: 1, status: 'done' },
      { origIdx: 0, x: 12, m: 4, status: 'active' }
    ],
    activeQueryIdx: 0,
    pointerIdx: 3,
    trieElements: [2, 3, 4],
    ans: ['?', -1, -1],
    bitInspection: {
      activeBit: 3,
      bitVal: 8,
      xBit: 1,
      desiredBit: 0,
      takenBit: 0,
      xorContribution: 8,
      runningXor: 8,
      candidatesLeft: [2, 3, 4]
    },
    variables: { bitPosition: 'Bit 3 (8)', 'x bit': 1, 'Desired opp bit': 0, 'Branch 0 exists?': 'YES! (All {2, 3, 4})', 'Running XOR': 8 },
    explain: 'Bit 3: x has bit 1. Desired opposite bit is 0. Branch 0 exists! Take branch 0. XOR adds (1 << 3) = 8. Running XOR = 8.',
    intuition: 'Greedy choice succeeds: this guarantees our XOR result has an 8 in its binary representation.'
  },
  {
    title: '9. Query x=12: Bit 2 (val 4) -> Bit is 1 -> Wants 0 -> YES! Takes 0 (+4)',
    phase: 'BIT_2',
    nums: [5, 2, 4, 6, 3],
    sortedNums: [2, 3, 4, 5, 6],
    queries: [
      { origIdx: 2, x: 1, m: 0, status: 'done' },
      { origIdx: 1, x: 8, m: 1, status: 'done' },
      { origIdx: 0, x: 12, m: 4, status: 'active' }
    ],
    activeQueryIdx: 0,
    pointerIdx: 3,
    trieElements: [2, 3, 4],
    ans: ['?', -1, -1],
    bitInspection: {
      activeBit: 2,
      bitVal: 4,
      xBit: 1,
      desiredBit: 0,
      takenBit: 0,
      xorContribution: 4,
      runningXor: 12,
      candidatesLeft: [2, 3]
    },
    variables: { bitPosition: 'Bit 2 (4)', 'x bit': 1, 'Desired opp bit': 0, 'Branch 0 exists?': 'YES! (Elements 2 & 3)', 'Running XOR': 12 },
    explain: 'Bit 2: x has bit 1. Desired opposite bit is 0. Both 2 (00010) and 3 (00011) have bit 2 = 0. Take branch 0! XOR adds +4. Running XOR = 12. Element 4 (00100) is eliminated.',
    intuition: 'Candidates narrowed down to {2, 3}.'
  },
  {
    title: '10. Query x=12: Bits 1 & 0 -> Chooses Element 3 -> Final XOR = 15!',
    phase: 'FINAL_BITS',
    nums: [5, 2, 4, 6, 3],
    sortedNums: [2, 3, 4, 5, 6],
    queries: [
      { origIdx: 2, x: 1, m: 0, status: 'done' },
      { origIdx: 1, x: 8, m: 1, status: 'done' },
      { origIdx: 0, x: 12, m: 4, status: 'active' }
    ],
    activeQueryIdx: 0,
    pointerIdx: 3,
    trieElements: [2, 3, 4],
    ans: [15, -1, -1],
    bitInspection: {
      activeBit: 0,
      bitVal: 1,
      xBit: 0,
      desiredBit: 1,
      takenBit: 1,
      xorContribution: 3,
      runningXor: 15,
      matchedElement: 3
    },
    variables: { 'Matched Element': 3, 'Query x': 12, 'Calculation': '12 ^ 3 = 15', 'Valid?': '3 <= 4 (YES!)', 'ans[0]': 15 },
    explain: 'Bit 1 (val 0) takes 1 branch (+2). Bit 0 (val 0) takes 1 branch (+1). Matched element is 3. 12 ^ 3 = 15! Answer for query 0 is 15.',
    intuition: '12 (01100) ^ 3 (00011) = 15 (01111) — all 4 lower bits are 1s!'
  },
  {
    title: '11. Assemble Answers by Original Query Order: [15, -1, -1]',
    phase: 'COMPLETED',
    nums: [5, 2, 4, 6, 3],
    sortedNums: [2, 3, 4, 5, 6],
    queries: [
      { origIdx: 0, x: 12, m: 4, result: 15 },
      { origIdx: 1, x: 8, m: 1, result: -1 },
      { origIdx: 2, x: 1, m: 0, result: -1 }
    ],
    activeQueryIdx: null,
    pointerIdx: 3,
    trieElements: [2, 3, 4],
    ans: [15, -1, -1],
    bitInspection: null,
    variables: { 'ans[0] (x=12, m=4)': 15, 'ans[1] (x=8, m=1)': -1, 'ans[2] (x=1, m=0)': -1, finalResult: '[15, -1, -1]' },
    explain: 'Final vector reassembled using origIdx: ans[0] = 15, ans[1] = -1, ans[2] = -1. Final output: [15, -1, -1]. Total time: O(N log N + Q log Q + (N + Q) * 32).',
    intuition: 'Offline Trie query processing reduces an intractable problem into clean linear sweeps.'
  }
];

export default function MaximumXorWithAnElementFromAnArrayVisualizer({ currentStep = 0 }) {
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
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--chalk-dim)]">Elements in Trie (val &le; m)</span>
          <span className="text-sm font-mono font-bold text-emerald-400 mt-0.5">
            {step.trieElements.length > 0 ? `[${step.trieElements.join(', ')}]` : '(Empty Trie)'}
          </span>
        </div>
        <div className="bg-[var(--board-raised)] border border-[var(--line)] rounded-xl p-3 flex flex-col items-center justify-center">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--chalk-dim)]">Answer Vector [ans[0], ans[1], ans[2]]</span>
          <span className="text-sm font-mono font-bold text-amber-300 mt-0.5">[{step.ans.join(', ')}]</span>
        </div>
      </div>

      {/* Sorted Array & Ingestion Threshold Tape */}
      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-2xl p-4 flex flex-col gap-3 shadow-xl">
        <div className="w-full flex items-center justify-between text-xs font-mono text-[var(--chalk-dim)] pb-1 border-b border-[var(--line)]/60">
          <span>SORTED NUMS ARRAY & INGESTION POINTER</span>
          <span className="text-emerald-400 font-bold">Pointer idx = {step.pointerIdx}</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 py-2">
          {step.sortedNums.map((val, idx) => {
            const isInsideTrie = idx < step.pointerIdx;
            const isAtPointer = idx === step.pointerIdx;

            return (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                    isInsideTrie
                      ? 'bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/20'
                      : isAtPointer
                      ? 'bg-amber-500/20 border-2 border-amber-400 text-amber-200 animate-pulse'
                      : 'bg-[var(--board-raised)] border border-[var(--line)] text-[var(--chalk-faint)]'
                  }`}
                >
                  <span className="text-base font-bold">{val}</span>
                  <span className="text-[9px] opacity-75">{val.toString(2).padStart(5, '0')}</span>
                </div>
                <span className={`text-[10px] font-mono mt-1 ${isInsideTrie ? 'text-emerald-400' : 'text-[var(--chalk-faint)]'}`}>
                  {isInsideTrie ? 'In Trie' : `idx ${idx}`}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Offline Queries Queue View */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 flex flex-col gap-3 shadow-xl">
        <span className="text-xs font-mono text-[var(--chalk-dim)] uppercase tracking-wider">
          OFFLINE QUERIES QUEUE (Sorted by Threshold m)
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {step.queries.map((q, idx) => {
            const isActive = q.origIdx === step.activeQueryIdx;
            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border font-mono text-xs flex flex-col gap-1 transition-all duration-300 ${
                  isActive
                    ? 'border-amber-400 bg-amber-500/15 shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/40'
                    : q.status === 'done'
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-[var(--chalk-dim)]'
                    : 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk-faint)]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[var(--chalk)]">Q_{q.origIdx}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-[var(--chalk-dim)]">
                    Orig Idx: {q.origIdx}
                  </span>
                </div>
                <div className="text-[var(--chalk-dim)]">x: <span className="text-cyan-300 font-bold">{q.x}</span>, m: <span className="text-amber-300 font-bold">&le; {q.m}</span></div>
                <div className="mt-1 pt-1 border-t border-[var(--line)]/60 flex items-center justify-between text-[11px]">
                  <span>Answer:</span>
                  <span className={`font-bold ${step.ans[q.origIdx] === -1 ? 'text-rose-400' : step.ans[q.origIdx] !== '?' ? 'text-emerald-400 font-mono text-sm' : 'text-[var(--chalk-faint)]'}`}>
                    {step.ans[q.origIdx] !== undefined ? step.ans[q.origIdx] : '?'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bit Inspection HUD when actively matching bits */}
      {step.bitInspection && (
        <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-2xl p-4 flex flex-col gap-3 shadow-xl">
          <div className="w-full flex items-center justify-between text-xs font-mono text-[var(--chalk-dim)] pb-1 border-b border-[var(--line)]/60">
            <span>BIT-BY-BIT GREEDY XOR CALCULATOR</span>
            {step.bitInspection.runningXor !== undefined && (
              <span className="text-emerald-400 font-bold">Running XOR = {step.bitInspection.runningXor}</span>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono">
            <div className="bg-[var(--board-raised)] p-2.5 rounded-lg border border-[var(--line)]/60 flex flex-col">
              <span className="text-[10px] text-[var(--chalk-faint)]">ACTIVE BIT</span>
              <span className="text-cyan-300 font-bold mt-0.5">
                Bit {step.bitInspection.activeBit ?? '4'} (Value {step.bitInspection.bitVal ?? '16'})
              </span>
            </div>
            <div className="bg-[var(--board-raised)] p-2.5 rounded-lg border border-[var(--line)]/60 flex flex-col">
              <span className="text-[10px] text-[var(--chalk-faint)]">QUERY BIT</span>
              <span className="text-amber-300 font-bold mt-0.5">
                {step.bitInspection.xBit ?? '0'}
              </span>
            </div>
            <div className="bg-[var(--board-raised)] p-2.5 rounded-lg border border-[var(--line)]/60 flex flex-col">
              <span className="text-[10px] text-[var(--chalk-faint)]">DESIRED OPPOSITE BIT</span>
              <span className="text-emerald-300 font-bold mt-0.5">
                {step.bitInspection.desiredBit ?? '1'}
              </span>
            </div>
            <div className="bg-[var(--board-raised)] p-2.5 rounded-lg border border-[var(--line)]/60 flex flex-col">
              <span className="text-[10px] text-[var(--chalk-faint)]">BRANCH TAKEN</span>
              <span className="text-purple-300 font-bold mt-0.5">
                Branch {step.bitInspection.takenBit ?? '0'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Variables */}
      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl p-3 grid grid-cols-2 md:grid-cols-3 gap-2 text-xs font-mono">
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
          <span className="font-bold text-cyan-400">💡 Offline Query Intuition:</span>
          <span>{step.intuition}</span>
        </div>
      </div>
    </div>
  );
}
