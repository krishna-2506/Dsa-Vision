import React from 'react';

export const meta = {
  title: 'Maximum XOR With an Element From an Array',
  category: 'Tries',
  difficulty: 'Hard',
  timeComplexity: 'O(N log N + Q log Q + (N + Q) * 32)',
  spaceComplexity: 'O(N * 32 + Q)',
  description: 'Solves offline queries of finding max(x ^ arr[i]) subject to arr[i] <= m. By sorting both the array and queries by threshold m, elements are inserted incrementally into a Bitwise Trie.'
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

class Solution {
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
    title: '1. Problem Setup: nums = [0, 1, 2, 3, 4], Queries = [[3, 1], [1, 3], [5, 6]]',
    phase: 'INIT',
    codeLine: 40,
    nums: [0, 1, 2, 3, 4],
    queries: [
      { id: 0, x: 3, m: 1 },
      { id: 1, x: 1, m: 3 },
      { id: 2, x: 5, m: 6 }
    ],
    insertedUpTo: -1,
    trieElements: [],
    answers: [-1, -1, -1],
    variables: { strategy: 'Sort queries by threshold m (offline queries)' },
    explain: 'Instead of re-filtering elements per query, sort queries by threshold m and insert numbers <= m into the Trie incrementally.',
    intuition: 'Each array element is inserted into the Trie at most once across all queries.'
  },
  {
    title: '2. Query [3, 1]: Insert elements <= 1 ([0, 1])',
    phase: 'QUERY_1',
    codeLine: 55,
    nums: [0, 1, 2, 3, 4],
    insertedUpTo: 1,
    trieElements: [0, 1],
    currentQuery: { x: 3, m: 1 },
    answers: [3, -1, -1],
    variables: { 'Inserted into Trie': '[0, 1]', 'Query': '3 ^ 0 or 3 ^ 1', 'Best XOR': '3 ^ 0 = 3', ans: 3 },
    explain: 'Insert 0 and 1 into Trie. For x=3: 3^0=3, 3^1=2. Maximum XOR with elements <= 1 is 3.',
    intuition: 'Only numbers <= 1 are eligible for XOR pairing.'
  },
  {
    title: '3. Query [1, 3]: Insert elements <= 3 (adds [2, 3])',
    phase: 'QUERY_2',
    codeLine: 55,
    nums: [0, 1, 2, 3, 4],
    insertedUpTo: 3,
    trieElements: [0, 1, 2, 3],
    currentQuery: { x: 1, m: 3 },
    answers: [3, 3, -1],
    variables: { 'Incremental insert': '[2, 3]', 'Total in Trie': '[0, 1, 2, 3]', 'Best for x=1': '1 ^ 2 = 3', ans: 3 },
    explain: 'Insert 2 and 3 into Trie. Now Trie contains [0, 1, 2, 3]. For x=1, best partner is 2: 1 ^ 2 = 3.',
    intuition: 'The Trie expands monotonically with each query.'
  },
  {
    title: '4. Query [5, 6]: Insert element 4 -> Max XOR = 7',
    phase: 'COMPLETED',
    codeLine: 62,
    nums: [0, 1, 2, 3, 4],
    insertedUpTo: 4,
    trieElements: [0, 1, 2, 3, 4],
    currentQuery: { x: 5, m: 6 },
    answers: [3, 3, 7],
    variables: { 'Added': '[4]', 'Total in Trie': '[0, 1, 2, 3, 4]', 'For x=5': '5 ^ 2 = 7', finalAnswers: '[3, 3, 7]' },
    explain: 'Remaining elements <= 6 inserted (element 4). For x=5, best partner is 2: 5 ^ 2 = 7. All queries answered in optimal O((N+Q)*32) time!',
    intuition: 'Final output restored in original query order: [3, 3, 7].'
  }
];

export default function MaximumXorWithAnElementFromAnArrayVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Offline Queries: Sorted by m
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Trie Size: {step.trieElements.length} elements
        </span>
      </div>

      {/* Incremental Trie Content */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Active Trie Elements &amp; Query Results
        </span>

        {/* Array Elements State */}
        <div className="flex items-center justify-center gap-2 py-2">
          {step.nums.map((num, idx) => {
            const inTrie = step.trieElements.includes(num);

            return (
              <div
                key={idx}
                className={`w-12 h-14 rounded-xl border flex flex-col items-center justify-center font-mono text-xs transition-all duration-300 ${
                  inTrie
                    ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300'
                    : 'border-[#272b3c] bg-[#161824] text-slate-500'
                }`}
              >
                <span className="font-bold">{num}</span>
                <span className="text-[8px] text-slate-400">{inTrie ? 'in trie' : 'pending'}</span>
              </div>
            );
          })}
        </div>

        {/* Query Answers Row */}
        <div className="w-full border-t border-[#272b3c] pt-4 flex flex-col items-center gap-2">
          <span className="text-[11px] font-mono text-cyan-300">
            Query Answers Array:
          </span>
          <div className="flex items-center gap-3 font-mono text-xs">
            {step.answers.map((ans, idx) => (
              <div
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-[#161824] border border-[#272b3c] flex items-center gap-2"
              >
                <span className="text-[#8a8ea3]">Q{idx}:</span>
                <span className={`font-bold ${ans !== -1 ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {ans}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}
