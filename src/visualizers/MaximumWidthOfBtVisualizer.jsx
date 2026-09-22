import React from 'react';

export const meta = {
  title: 'Maximum Width of Binary Tree',
  category: 'Binary Trees',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) BFS queue',
  description: 'Calculates the maximum width among all levels of a binary tree (including null slots between end nodes) using level-order BFS with zero-normalized index coordinates.'
};

export const solutions = {
  cpp: `// C++: Maximum Width of Binary Tree
// Time Complexity: O(N) | Space: O(N)
#include <queue>
#include <algorithm>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

int widthOfBinaryTree(TreeNode* root) {
    if (root == nullptr) return 0;
    long long maxWidth = 0;
    queue<pair<TreeNode*, long long>> q; // {node, index}
    q.push({root, 0});

    while (!q.empty()) {
        int size = q.size();
        long long minIndex = q.front().second; // to prevent integer overflow
        long long first = 0, last = 0;

        for (int i = 0; i < size; i++) {
            long long currId = q.front().second - minIndex;
            TreeNode* node = q.front().first;
            q.pop();

            if (i == 0) first = currId;
            if (i == size - 1) last = currId;

            if (node->left) q.push({node->left, currId * 2 + 1});
            if (node->right) q.push({node->right, currId * 2 + 2});
        }
        maxWidth = max(maxWidth, last - first + 1);
    }
    return maxWidth;
}`,
  java: `// Java: Maximum Width of Binary Tree
import java.util.*;

class Solution {
    static class Pair {
        TreeNode node;
        long index;
        Pair(TreeNode n, long i) { node = n; index = i; }
    }

    public int widthOfBinaryTree(TreeNode root) {
        if (root == null) return 0;
        long maxWidth = 0;
        Queue<Pair> q = new LinkedList<>();
        q.offer(new Pair(root, 0));

        while (!q.isEmpty()) {
            int size = q.size();
            long minIndex = q.peek().index;
            long first = 0, last = 0;

            for (int i = 0; i < size; i++) {
                long currId = q.peek().index - minIndex;
                TreeNode node = q.poll().node;

                if (i == 0) first = currId;
                if (i == size - 1) last = currId;

                if (node.left != null) q.offer(new Pair(node.left, currId * 2 + 1));
                if (node.right != null) q.offer(new Pair(node.right, currId * 2 + 2));
            }
            maxWidth = Math.max(maxWidth, last - first + 1);
        }
        return (int) maxWidth;
    }
}`,
  python: `# Python 3: Maximum Width of Binary Tree
from collections import deque

def width_of_binary_tree(root):
    if not root:
        return 0

    max_width = 0
    q = deque([(root, 0)]) # (node, index)

    while q:
        size = len(q)
        _, min_index = q[0]
        first, last = 0, 0

        for i in range(size):
            node, index = q.popleft()
            curr_id = index - min_index

            if i == 0: first = curr_id
            if i == size - 1: last = curr_id

            if node.left: q.append((node.left, curr_id * 2 + 1))
            if node.right: q.append((node.right, curr_id * 2 + 2))

        max_width = max(max_width, last - first + 1)

    return max_width`,
  javascript: `// JavaScript: Maximum Width of Binary Tree
function widthOfBinaryTree(root) {
    if (!root) return 0;
    let maxWidth = 0;
    const q = [[root, 0n]]; // BigInt to avoid precision loss

    while (q.length > 0) {
        const size = q.length;
        const minIndex = q[0][1];
        let first = 0n, last = 0n;

        for (let i = 0; i < size; i++) {
            const [node, index] = q.shift();
            const currId = index - minIndex;

            if (i === 0) first = currId;
            if (i === size - 1) last = currId;

            if (node.left) q.push([node.left, currId * 2n + 1n]);
            if (node.right) q.push([node.right, currId * 2n + 2n]);
        }
        const width = Number(last - first + 1n);
        maxWidth = Math.max(maxWidth, width);
    }
    return maxWidth;
}`
};

export const steps = [
  {
    title: '1. Level 0: Root 1 &rarr; Index 0, Width = 1',
    phase: 'LEVEL_0',
    codeLine: 20,
    level: 0,
    nodes: [{ val: 1, id: 0 }],
    levelWidth: 1,
    maxWidth: 1,
    explain: 'Single root node at index 0. Level width = 0 - 0 + 1 = 1.'
  },
  {
    title: '2. Level 1: Node 3 (idx 0) & Node 2 (idx 1) &rarr; Width = 2',
    phase: 'LEVEL_1',
    codeLine: 28,
    level: 1,
    nodes: [{ val: 3, id: 0 }, { val: 2, id: 1 }],
    levelWidth: 2,
    maxWidth: 2,
    explain: 'Left child at 2*0 + 1 = 1, right child at 2*0 + 2 = 2. Normalized to 0 and 1. Width = 2.'
  },
  {
    title: '3. Level 2: Node 5 (idx 0) and Node 9 (idx 3) &rarr; Width = 4!',
    phase: 'MAX_FOUND',
    codeLine: 35,
    level: 2,
    nodes: [{ val: 5, id: 0 }, { val: 3, id: 1 }, { val: 9, id: 3 }],
    levelWidth: 4,
    maxWidth: 4,
    explain: 'Node 5 is at index 0; Node 9 is at index 3 (with null space in between). Width = 3 - 0 + 1 = 4!'
  },
  {
    title: '4. Summary: Maximum Binary Tree Width = 4',
    phase: 'COMPLETE',
    codeLine: 37,
    level: null,
    nodes: [{ val: 5, id: 0 }, { val: 3, id: 1 }, { val: 9, id: 3 }],
    levelWidth: 4,
    maxWidth: 4,
    explain: 'Max width across all levels is 4 (achieved at level 2). Zero-normalization prevents integer overflow.'
  }
];

export default function MaximumWidthOfBtVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Max Width: <strong className="text-base text-cyan-200">{step.maxWidth}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Level Width: <strong>lastId &minus; firstId + 1 = {step.levelWidth}</strong>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl w-full">
        <div className="text-xs font-mono text-[var(--chalk-dim)] flex items-center justify-between w-full px-2">
          <span>Level Index Span (Including Nulls)</span>
          <span className="text-cyan-400 font-bold">Overflow-Safe BFS</span>
        </div>

        {/* Level slots */}
        <div className="flex items-center justify-center gap-3 w-full py-4">
          {[0, 1, 2, 3].map(colIdx => {
            const node = step.nodes.find(n => n.id === colIdx);
            return (
              <div key={colIdx} className="flex flex-col items-center gap-1.5">
                <span className="text-[10px] font-mono text-[#6c7292]">id {colIdx}</span>
                <div
                  className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center font-mono font-bold text-base transition-all ${
                    node
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-md'
                      : 'bg-[var(--board-raised)] border-dashed border-[var(--line)] text-[#444862]'
                  }`}
                >
                  {node ? node.val : 'null'}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-xs font-mono text-[var(--chalk-dim)] bg-[var(--board-raised-2)] px-4 py-2 rounded-xl border border-[var(--line)] text-center w-full">
          Width spans from the leftmost non-null node to the rightmost non-null node on the same level.
        </div>
      </div>
    </div>
  );
}
