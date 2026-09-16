import React from 'react';

export const meta = {
  title: 'Level Order Traversal of Binary Tree (BFS)',
  category: 'Binary Trees',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) queue space',
  description: 'Traverses a binary tree level by level from top to bottom and left to right using a First-In-First-Out (FIFO) queue.'
};

export const solutions = {
  cpp: `// C++ Level Order Traversal (BFS)
// Time: O(N) | Space: O(N)
#include <vector>
#include <queue>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> result;
        if (root == nullptr) return result;

        queue<TreeNode*> q;
        q.push(root);

        while (!q.empty()) {
            int levelSize = q.size();
            vector<int> currentLevel;

            for (int i = 0; i < levelSize; i++) {
                TreeNode* node = q.front();
                q.pop();

                currentLevel.push_back(node->val);

                if (node->left != nullptr) q.push(node->left);
                if (node->right != nullptr) q.push(node->right);
            }

            result.push_back(currentLevel);
        }

        return result;
    }
};`,
  python: `# Python 3 Level Order Traversal (BFS)
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def levelOrder(self, root: TreeNode | None) -> list[list[int]]:
        if not root:
            return []

        result = []
        q = deque([root])

        while q:
            level_size = len(q)
            current_level = []

            for _ in range(level_size):
                node = q.popleft()
                current_level.append(node.val)

                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)

            result.append(current_level)

        return result`,
  java: `// Java Level Order Traversal (BFS)
import java.util.*;

class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;

        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);

        while (!q.isEmpty()) {
            int levelSize = q.size();
            List<Integer> currentLevel = new ArrayList<>();

            for (int i = 0; i < levelSize; i++) {
                TreeNode node = q.poll();
                currentLevel.add(node.val);

                if (node.left != null) q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }

            result.add(currentLevel);
        }

        return result;
    }
}`,
  javascript: `// JavaScript Level Order Traversal (BFS)
var levelOrder = function(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.push(currentLevel);
    }

    return result;
};`
};

export const steps = [
  {
    title: '1. Initialize BFS Queue: Push Root (Node 1) into Queue',
    phase: 'INITIAL',
    codeLine: 21,
    queue: [1],
    levels: [],
    activeLevel: 0,
    variables: { queue: '[1]', levelSize: 1 },
    explain: 'Queue holds current active frontier nodes. Level 0 contains just the root [1].',
    intuition: 'FIFO queue ensures nodes are visited in breadth-first order.'
  },
  {
    title: '2. Process Level 0: Pop 1 -> Enqueue children (2, 3) -> Level 0 = [1]',
    phase: 'PROCESS_LEVEL',
    codeLine: 28,
    queue: [2, 3],
    levels: [[1]],
    activeLevel: 0,
    variables: { popped: 1, enqueued: '[2, 3]', completedLevel: '[1]' },
    explain: 'Node 1 popped. Its left child 2 and right child 3 are enqueued. Level 0 completed: [1].',
    intuition: 'Level 0 finished.'
  },
  {
    title: '3. Process Level 1: Pop 2 (enqueue 4, 5) -> Pop 3 (children null) -> Level 1 = [2, 3]',
    phase: 'PROCESS_LEVEL',
    codeLine: 28,
    queue: [4, 5],
    levels: [[1], [2, 3]],
    activeLevel: 1,
    variables: { popped: '2 and 3', enqueued: '[4, 5]', completedLevel: '[2, 3]' },
    explain: 'Node 2 enqueues 4 and 5. Node 3 has no children. Level 1 completed: [2, 3].',
    intuition: 'Level 1 finished.'
  },
  {
    title: '4. Process Level 2: Pop 4 and 5 (leaves) -> Level 2 = [4, 5], Queue Empty!',
    phase: 'COMPLETED',
    codeLine: 38,
    queue: [],
    levels: [[1], [2, 3], [4, 5]],
    activeLevel: 2,
    variables: { finalLevels: '[[1], [2, 3], [4, 5]]', queueSize: 0 },
    explain: 'Nodes 4 and 5 are leaf nodes. Queue is empty. All levels grouped successfully.',
    intuition: 'Total 3 levels traversed.'
  }
];

export default function LevelOrderTraversalVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Current Level: {step.activeLevel}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Queue: [{step.queue.join(', ')}]
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Levels Completed = {step.levels.length}
        </span>
      </div>

      {/* Levels Breakdown */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-3">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">Level-by-Level Tree Breakdown</span>

        <div className="flex flex-col gap-3 w-full max-w-md">
          {[
            { lvl: 0, nodes: [1] },
            { lvl: 1, nodes: [2, 3] },
            { lvl: 2, nodes: [4, 5] }
          ].map((row) => {
            const isCompleted = step.levels.length > row.lvl;
            const isActive = step.activeLevel === row.lvl && !isCompleted;

            let borderClass = 'border-[#272b3c] bg-[#161824] text-slate-500';
            if (isCompleted) {
              borderClass = 'border-emerald-500 bg-emerald-500/20 text-emerald-300';
            } else if (isActive) {
              borderClass = 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40';
            }

            return (
              <div key={row.lvl} className={`p-3 rounded-xl border flex items-center justify-between font-mono transition-all ${borderClass}`}>
                <span className="text-xs font-bold">Level {row.lvl}:</span>
                <div className="flex items-center gap-2">
                  {row.nodes.map((n) => (
                    <span key={n} className="w-8 h-8 rounded-full border border-current flex items-center justify-center font-bold text-xs">
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}
