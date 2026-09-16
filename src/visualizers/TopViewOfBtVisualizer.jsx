import React from 'react';

export const meta = {
  title: 'Top View of Binary Tree',
  category: 'Binary Trees',
  difficulty: 'Medium',
  timeComplexity: 'O(N log N) or O(N)',
  spaceComplexity: 'O(N)',
  description: 'Calculates the top-most visible node for each vertical column line in a binary tree using breadth-first traversal (BFS), storing only the first node encountered at each horizontal coordinate.'
};

export const solutions = {
  cpp: `// C++: Top View of Binary Tree
// Time Complexity: O(N log N) | Space Complexity: O(N)
#include <vector>
#include <map>
#include <queue>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

vector<int> topView(TreeNode* root) {
    vector<int> ans;
    if (root == nullptr) return ans;

    map<int, int> mpp; // line -> node value
    queue<pair<TreeNode*, int>> q; // {node, line}
    q.push({root, 0});

    while (!q.empty()) {
        auto it = q.front();
        q.pop();
        TreeNode* node = it.first;
        int line = it.second;

        // BFS: Only store first node encountered at this line
        if (mpp.find(line) == mpp.end()) {
            mpp[line] = node->val;
        }

        if (node->left) q.push({node->left, line - 1});
        if (node->right) q.push({node->right, line + 1});
    }

    for (auto it : mpp) {
        ans.push_back(it.second);
    }
    return ans;
}`,
  java: `// Java: Top View of Binary Tree
import java.util.*;

class Solution {
    static class Pair {
        TreeNode node;
        int line;
        Pair(TreeNode n, int l) { node = n; line = l; }
    }

    public ArrayList<Integer> topView(TreeNode root) {
        ArrayList<Integer> ans = new ArrayList<>();
        if (root == null) return ans;

        Map<Integer, Integer> map = new TreeMap<>();
        Queue<Pair> q = new LinkedList<>();
        q.add(new Pair(root, 0));

        while (!q.isEmpty()) {
            Pair it = q.poll();

            if (!map.containsKey(it.line)) {
                map.put(it.line, it.node.val);
            }

            if (it.node.left != null) q.add(new Pair(it.node.left, it.line - 1));
            if (it.node.right != null) q.add(new Pair(it.node.right, it.line + 1));
        }

        for (int val : map.values()) {
            ans.add(val);
        }
        return ans;
    }
}`,
  python: `# Python 3: Top View of Binary Tree
from collections import deque

def top_view(root):
    if not root:
        return []

    line_map = {}
    q = deque([(root, 0)])

    while q:
        node, line = q.popleft()

        if line not in line_map:
            line_map[line] = node.val

        if node.left:
            q.append((node.left, line - 1))
        if node.right:
            q.append((node.right, line + 1))

    return [line_map[k] for k in sorted(line_map.keys())]`,
  javascript: `// JavaScript: Top View of Binary Tree
function topView(root) {
    if (!root) return [];
    const map = new Map();
    const q = [[root, 0]];

    while (q.length > 0) {
        const [node, line] = q.shift();

        if (!map.has(line)) {
            map.set(line, node.val);
        }

        if (node.left) q.push([node.left, line - 1]);
        if (node.right) q.push([node.right, line + 1]);
    }

    const sortedLines = Array.from(map.keys()).sort((a, b) => a - b);
    return sortedLines.map(k => map.get(k));
}`
};

export const steps = [
  {
    title: '1. Root Node 1 at line 0 &rarr; First at line 0 &rarr; map[0] = 1',
    phase: 'INIT',
    codeLine: 20,
    currNode: 1,
    currLine: 0,
    lineMap: { 0: 1 },
    explain: 'Root 1 enqueued at line 0. Stored in map.'
  },
  {
    title: '2. Enqueue Node 2 (line -1) & Node 3 (line +1)',
    phase: 'ENQUEUE',
    codeLine: 34,
    currNode: 2,
    currLine: -1,
    lineMap: { '-1': 2, 0: 1, 1: 3 },
    explain: 'Both line -1 and line +1 are seen for the first time. Node 2 and Node 3 registered in map.'
  },
  {
    title: '3. Process Node 4 (2.left, line -2) & Node 5 (2.right, line 0)',
    phase: 'PROCESS',
    codeLine: 29,
    currNode: 5,
    currLine: 0,
    lineMap: { '-2': 4, '-1': 2, 0: 1, 1: 3 },
    explain: 'Node 4 stored at line -2. For Node 5 at line 0, map[0] already contains 1 &rarr; Node 5 is blocked from above and ignored!'
  },
  {
    title: '4. Process Node 7 (3.right, line +2) & Complete',
    phase: 'COMPLETE',
    codeLine: 38,
    currNode: 7,
    currLine: 2,
    lineMap: { '-2': 4, '-1': 2, 0: 1, 1: 3, 2: 7 },
    explain: 'Node 7 stored at line 2. Final Top View in line order: [4, 2, 1, 3, 7]!'
  }
];

export default function TopViewOfBtVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];
  const sortedLines = Object.keys(step.lineMap).map(Number).sort((a, b) => a - b);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-[#161824] border border-[#272b3c] text-[#8a8ea3]">
          Active: <strong className="text-cyan-400">Node {step.currNode} (line {step.currLine})</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Rule: <strong>First Node at Each Line Wins</strong>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl w-full">
        <div className="text-xs font-mono text-[#8a8ea3] flex items-center justify-between w-full px-2">
          <span>Top-Down Aerial Projection</span>
          <span className="text-cyan-400 font-bold">Top View Vector</span>
        </div>

        <div className="flex items-center justify-center gap-4 w-full py-4">
          {sortedLines.map(line => (
            <div key={line} className="flex flex-col items-center gap-1.5">
              <span className="text-[10px] font-mono text-[#71789a]">line {line}</span>
              <div className="w-14 h-14 rounded-xl bg-cyan-500/20 border-2 border-cyan-400 text-cyan-200 font-mono font-bold text-lg flex items-center justify-center shadow-md">
                {step.lineMap[line]}
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-[#0f1016] border border-[#242738] text-xs font-mono">
          <span className="text-[#8a8ea3]">Top View Result:</span>
          <span className="text-cyan-300 font-bold">[{sortedLines.map(l => step.lineMap[l]).join(', ')}]</span>
        </div>
      </div>
    </div>
  );
}
