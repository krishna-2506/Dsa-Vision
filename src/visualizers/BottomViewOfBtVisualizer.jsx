import React from 'react';

export const meta = {
  title: 'Bottom View of Binary Tree',
  category: 'Binary Trees',
  difficulty: 'Medium',
  timeComplexity: 'O(N log N) or O(N)',
  spaceComplexity: 'O(N)',
  description: 'Calculates the bottom-most visible node for each vertical column line in a binary tree using breadth-first traversal (BFS) with horizontal distance coordinates.'
};

export const solutions = {
  cpp: `// C++: Bottom View of Binary Tree
// Time Complexity: O(N log N) with map | Space: O(N)
#include <vector>
#include <map>
#include <queue>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

vector<int> bottomView(TreeNode* root) {
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

        // BFS: Last node seen at line overwrites earlier nodes
        mpp[line] = node->val;

        if (node->left) q.push({node->left, line - 1});
        if (node->right) q.push({node->right, line + 1});
    }

    for (auto it : mpp) {
        ans.push_back(it.second);
    }
    return ans;
}`,
  java: `// Java: Bottom View of Binary Tree
import java.util.*;

class Solution {
    static class Pair {
        TreeNode node;
        int line;
        Pair(TreeNode n, int l) { node = n; line = l; }
    }

    public ArrayList<Integer> bottomView(TreeNode root) {
        ArrayList<Integer> ans = new ArrayList<>();
        if (root == null) return ans;

        Map<Integer, Integer> map = new TreeMap<>();
        Queue<Pair> q = new LinkedList<>();
        q.add(new Pair(root, 0));

        while (!q.isEmpty()) {
            Pair it = q.poll();
            map.put(it.line, it.node.val);

            if (it.node.left != null) q.add(new Pair(it.node.left, it.line - 1));
            if (it.node.right != null) q.add(new Pair(it.node.right, it.line + 1));
        }

        for (int val : map.values()) {
            ans.add(val);
        }
        return ans;
    }
}`,
  python: `# Python 3: Bottom View of Binary Tree
from collections import deque

def bottom_view(root):
    if not root:
        return []

    line_map = {}
    q = deque([(root, 0)])

    while q:
        node, line = q.popleft()
        line_map[line] = node.val

        if node.left:
            q.append((node.left, line - 1))
        if node.right:
            q.append((node.right, line + 1))

    return [line_map[k] for k in sorted(line_map.keys())]`,
  javascript: `// JavaScript: Bottom View of Binary Tree
function bottomView(root) {
    if (!root) return [];
    const map = new Map();
    const q = [[root, 0]];

    while (q.length > 0) {
        const [node, line] = q.shift();
        map.set(line, node.val);

        if (node.left) q.push([node.left, line - 1]);
        if (node.right) q.push([node.right, line + 1]);
    }

    const sortedKeys = Array.from(map.keys()).sort((a, b) => a - b);
    return sortedKeys.map(k => map.get(k));
}`
};

export const steps = [
  {
    title: '1. Root 1 at line 0: q = [{1, line: 0}]',
    phase: 'INIT',
    codeLine: 20,
    currNode: 1,
    currLine: 0,
    lineMap: { 0: 1 },
    explain: 'Root 1 enqueued at horizontal coordinate line 0.'
  },
  {
    title: '2. Enqueue 2 (line -1) and 3 (line +1)',
    phase: 'BFS',
    codeLine: 31,
    currNode: 2,
    currLine: -1,
    lineMap: { '-1': 2, 0: 1, 1: 3 },
    explain: 'Children 2 (line -1) and 3 (line 1) enqueued and mapped.'
  },
  {
    title: '3. Process 4 (2.left, line -2) & 5 (2.right, line 0)',
    phase: 'OVERWRITE',
    codeLine: 28,
    currNode: 5,
    currLine: 0,
    lineMap: { '-2': 4, '-1': 2, 0: 5, 1: 3 },
    explain: 'Node 5 is at line 0! Overwrites earlier Node 1 because Node 5 is lower down at line 0.'
  },
  {
    title: '4. Process 6 (3.right, line +2) & Completion',
    phase: 'COMPLETE',
    codeLine: 35,
    currNode: 6,
    currLine: 2,
    lineMap: { '-2': 4, '-1': 2, 0: 5, 1: 3, 2: 6 },
    explain: 'Final bottom view (sorted lines -2 to 2): [4, 2, 5, 3, 6]!'
  }
];

export default function BottomViewOfBtVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];
  const sortedLines = Object.keys(step.lineMap).map(Number).sort((a, b) => a - b);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-[#161824] border border-[#272b3c] text-[#8a8ea3]">
          Active: <strong className="text-cyan-400">Node {step.currNode} (line {step.currLine})</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          BFS Overwrite Rule: <strong>Lowest Node Survives</strong>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl w-full">
        <div className="text-xs font-mono text-[#8a8ea3] flex items-center justify-between w-full px-2">
          <span>Vertical Columns Map</span>
          <span className="text-emerald-400 font-bold">Bottom View Vector</span>
        </div>

        {/* Vertical line columns */}
        <div className="flex items-center justify-center gap-4 w-full py-4">
          {sortedLines.map(line => (
            <div key={line} className="flex flex-col items-center gap-1.5">
              <span className="text-[10px] font-mono text-[#71789a]">line {line}</span>
              <div className="w-14 h-14 rounded-xl bg-emerald-500/20 border-2 border-emerald-400 text-emerald-200 font-mono font-bold text-lg flex items-center justify-center shadow-md">
                {step.lineMap[line]}
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-[#0f1016] border border-[#242738] text-xs font-mono">
          <span className="text-[#8a8ea3]">Result:</span>
          <span className="text-emerald-300 font-bold">[{sortedLines.map(l => step.lineMap[l]).join(', ')}]</span>
        </div>
      </div>
    </div>
  );
}
