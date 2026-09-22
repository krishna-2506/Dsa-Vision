import React from 'react';

export const meta = {
  title: 'Vertical Order Traversal',
  category: 'Binary Trees',
  difficulty: 'Hard',
  timeComplexity: 'O(N log N)',
  spaceComplexity: 'O(N)',
  description: 'Groups tree nodes by vertical columns (x-coordinates) and row depths (y-coordinates), sorting ties by node value in ascending order.'
};

export const solutions = {
  cpp: `// C++: Vertical Order Traversal of Binary Tree
// Time Complexity: O(N log N) | Space Complexity: O(N)
#include <vector>
#include <map>
#include <set>
#include <queue>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

vector<vector<int>> verticalTraversal(TreeNode* root) {
    // map<x, map<y, multiset<val>>>
    map<int, map<int, multiset<int>>> nodes;
    queue<pair<TreeNode*, pair<int, int>>> todo; // {node, {x, y}}
    todo.push({root, {0, 0}});

    while (!todo.empty()) {
        auto p = todo.front();
        todo.pop();
        TreeNode* node = p.first;
        int x = p.second.first, y = p.second.second;
        nodes[x][y].insert(node->val);

        if (node->left) todo.push({node->left, {x - 1, y + 1}});
        if (node->right) todo.push({node->right, {x + 1, y + 1}});
    }

    vector<vector<int>> ans;
    for (auto p : nodes) {
        vector<int> col;
        for (auto q : p.second) {
            col.insert(col.end(), q.second.begin(), q.second.end());
        }
        ans.push_back(col);
    }
    return ans;
}`,
  java: `// Java: Vertical Order Traversal of Binary Tree
import java.util.*;

class Tuple {
    TreeNode node;
    int row, col;
    Tuple(TreeNode n, int r, int c) { node = n; row = r; col = c; }
}

class Solution {
    public List<List<Integer>> verticalTraversal(TreeNode root) {
        TreeMap<Integer, TreeMap<Integer, PriorityQueue<Integer>>> map = new TreeMap<>();
        Queue<Tuple> q = new LinkedList<>();
        q.offer(new Tuple(root, 0, 0));

        while (!q.isEmpty()) {
            Tuple tuple = q.poll();
            TreeNode node = tuple.node;
            int x = tuple.col, y = tuple.row;

            map.putIfAbsent(x, new TreeMap<>());
            map.get(x).putIfAbsent(y, new PriorityQueue<>());
            map.get(x).get(y).offer(node.val);

            if (node.left != null) q.offer(new Tuple(node.left, y + 1, x - 1));
            if (node.right != null) q.offer(new Tuple(node.right, y + 1, x + 1));
        }

        List<List<Integer>> list = new ArrayList<>();
        for (TreeMap<Integer, PriorityQueue<Integer>> ys : map.values()) {
            list.add(new ArrayList<>());
            for (PriorityQueue<Integer> nodes : ys.values()) {
                while (!nodes.isEmpty()) {
                    list.get(list.size() - 1).add(nodes.poll());
                }
            }
        }
        return list;
    }
}`,
  python: `# Python 3: Vertical Order Traversal
from collections import defaultdict, deque

def vertical_traversal(root):
    if not root:
        return []

    nodes = defaultdict(lambda: defaultdict(list))
    q = deque([(root, 0, 0)]) # (node, x, y)

    while q:
        node, x, y = q.popleft()
        nodes[x][y].append(node.val)
        if node.left:
            q.append((node.left, x - 1, y + 1))
        if node.right:
            q.append((node.right, x + 1, y + 1))

    ans = []
    for x in sorted(nodes.keys()):
        col = []
        for y in sorted(nodes[x].keys()):
            col.extend(sorted(nodes[x][y]))
        ans.append(col)

    return ans`,
  javascript: `// JavaScript: Vertical Order Traversal
function verticalTraversal(root) {
    if (!root) return [];
    const nodes = new Map(); // x -> Map(y -> array)
    const q = [[root, 0, 0]]; // [node, x, y]

    while (q.length > 0) {
        const [node, x, y] = q.shift();
        if (!nodes.has(x)) nodes.set(x, new Map());
        if (!nodes.get(x).has(y)) nodes.get(x).set(y, []);
        nodes.get(x).get(y).push(node.val);

        if (node.left) q.push([node.left, x - 1, y + 1]);
        if (node.right) q.push([node.right, x + 1, y + 1]);
    }

    const sortedX = Array.from(nodes.keys()).sort((a, b) => a - b);
    const ans = [];

    for (const x of sortedX) {
        const col = [];
        const yMap = nodes.get(x);
        const sortedY = Array.from(yMap.keys()).sort((a, b) => a - b);
        for (const y of sortedY) {
            col.push(...yMap.get(y).sort((a, b) => a - b));
        }
        ans.push(col);
    }
    return ans;
}`
};

export const steps = [
  {
    title: '1. Root 1 at Coordinate (x=0, y=0)',
    phase: 'INIT',
    codeLine: 20,
    currNode: 1,
    x: 0,
    y: 0,
    cols: { 0: [1] },
    explain: 'Root 1 positioned at column 0 and row 0.'
  },
  {
    title: '2. Enqueue 2 (x=-1, y=1) and 3 (x=1, y=1)',
    phase: 'LEVEL_1',
    codeLine: 28,
    currNode: 2,
    x: -1,
    y: 1,
    cols: { '-1': [2], 0: [1], 1: [3] },
    explain: '2 placed at column -1, 3 placed at column 1.'
  },
  {
    title: '3. Enqueue 4 (x=-2, y=2) and 5 (x=0, y=2)',
    phase: 'LEVEL_2',
    codeLine: 28,
    currNode: 5,
    x: 0,
    y: 2,
    cols: { '-2': [4], '-1': [2], 0: [1, 5], 1: [3] },
    explain: 'Node 4 is at column -2. Node 5 is at column 0 row 2 below root 1.'
  },
  {
    title: '4. Enqueue 6 (x=0, y=2 under 3) and 7 (x=2, y=2)',
    phase: 'OVERLAP',
    codeLine: 28,
    currNode: 6,
    x: 0,
    y: 2,
    cols: { '-2': [4], '-1': [2], 0: [1, 5, 6], 1: [3], 2: [7] },
    explain: 'Column 0 contains Node 5 and Node 6 at the same row depth (y=2). Sorted by value: [5, 6]!'
  },
  {
    title: '5. Complete: Output = [[4], [2], [1, 5, 6], [3], [7]]',
    phase: 'DONE',
    codeLine: 35,
    currNode: null,
    x: null,
    y: null,
    cols: { '-2': [4], '-1': [2], 0: [1, 5, 6], 1: [3], 2: [7] },
    explain: 'Grouped and ordered by column from left to right: [[4], [2], [1, 5, 6], [3], [7]].'
  }
];

export default function VerticalOrderTraversalVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];
  const sortedCols = Object.keys(step.cols).map(Number).sort((a, b) => a - b);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk-dim)]">
          Active: <strong className="text-cyan-400">{step.currNode ? `Node ${step.currNode} (col ${step.x}, row ${step.y})` : 'Done'}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Ordering: <strong>x asc &rarr; y asc &rarr; val asc</strong>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl w-full">
        <div className="text-xs font-mono text-[var(--chalk-dim)] flex items-center justify-between w-full px-2">
          <span>Vertical Column Slices</span>
          <span className="text-purple-400 font-bold">2D Coordinate Matrix</span>
        </div>

        <div className="flex items-start justify-center gap-3 w-full py-4 overflow-x-auto">
          {sortedCols.map(col => (
            <div key={col} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#0f1016] border border-[#26293a] min-w-[70px]">
              <span className="text-[10px] font-mono text-purple-400 font-bold">x = {col}</span>
              <div className="flex flex-col gap-1.5 w-full">
                {step.cols[col].map((val, idx) => (
                  <div
                    key={idx}
                    className="w-12 h-10 rounded-lg bg-purple-500/20 border border-purple-400/50 text-purple-200 font-mono font-bold text-sm flex items-center justify-center shadow-sm"
                  >
                    {val}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs font-mono text-[var(--chalk-dim)] bg-[var(--board-raised-2)] px-4 py-2 rounded-xl border border-[var(--line)] text-center w-full">
          Result: [{sortedCols.map(c => `[${step.cols[c].join(', ')}]`).join(', ')}]
        </div>
      </div>
    </div>
  );
}
