import React from 'react';

export const meta = {
  title: 'Zig Zag (Spiral) Level Order Traversal',
  category: 'Binary Trees',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) queue space',
  description: 'Traverses a binary tree in zig-zag spiral order: left-to-right at even levels and right-to-left at odd levels using a level-order queue and direction flag.'
};

export const solutions = {
  cpp: `// C++ Zig Zag Level Order Traversal
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
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        vector<vector<int>> result;
        if (root == nullptr) return result;

        queue<TreeNode*> q;
        q.push(root);
        bool leftToRight = true;

        while (!q.empty()) {
            int size = q.size();
            vector<int> row(size);

            for (int i = 0; i < size; i++) {
                TreeNode* node = q.front();
                q.pop();

                // Compute destination index based on direction flag
                int index = leftToRight ? i : (size - 1 - i);
                row[index] = node->val;

                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }

            // Flip direction for next level
            leftToRight = !leftToRight;
            result.push_back(row);
        }

        return result;
    }
};`,
  python: `# Python 3 Zig Zag Level Order Traversal
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def zigzagLevelOrder(self, root: TreeNode | None) -> list[list[int]]:
        if not root:
            return []

        result = []
        q = deque([root])
        left_to_right = True

        while q:
            size = len(q)
            level = [0] * size

            for i in range(size):
                node = q.popleft()
                idx = i if left_to_right else (size - 1 - i)
                level[idx] = node.val

                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)

            left_to_right = not left_to_right
            result.append(level)

        return result`,
  java: `// Java Zig Zag Level Order Traversal
import java.util.*;

class Solution {
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;

        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        boolean leftToRight = true;

        while (!q.isEmpty()) {
            int size = q.size();
            Integer[] row = new Integer[size];

            for (int i = 0; i < size; i++) {
                TreeNode node = q.poll();
                int idx = leftToRight ? i : (size - 1 - i);
                row[idx] = node.val;

                if (node.left != null) q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }

            leftToRight = !leftToRight;
            result.add(Arrays.asList(row));
        }

        return result;
    }
}`,
  javascript: `// JavaScript Zig Zag Level Order Traversal
var zigzagLevelOrder = function(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];
    let leftToRight = true;

    while (queue.length > 0) {
        const size = queue.length;
        const row = new Array(size);

        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            const idx = leftToRight ? i : (size - 1 - i);
            row[idx] = node.val;

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        leftToRight = !leftToRight;
        result.push(row);
    }

    return result;
};`
};

export const steps = [
  {
    title: '1. Root 3: Start BFS with Direction Flag leftToRight = true (→)',
    phase: 'INITIAL',
    codeLine: 24,
    queue: [3],
    currentLevel: 0,
    leftToRight: true,
    levels: [],
    variables: { level: 0, dir: 'Left-to-Right (→)', queue: '[3]' },
    explain: 'Start at root level 0 with direction Left-to-Right. Queue holds root node 3.',
    intuition: 'Alternate direction at every level.'
  },
  {
    title: '2. Process Level 0: [3] -> Flip direction to Right-to-Left (←) for Level 1',
    phase: 'LEVEL_DONE',
    codeLine: 40,
    queue: [9, 20],
    currentLevel: 1,
    leftToRight: false,
    levels: [[3]],
    variables: { completedLevel0: '[3]', nextDir: 'Right-to-Left (←)' },
    explain: 'Level 0 is stored as [3]. Direction flag flips to false (Right-to-Left). Queue holds [9, 20].',
    intuition: 'Next level is reversed.'
  },
  {
    title: '3. Process Level 1 in Reverse: Node 20 first, Node 9 second -> Level 1 = [20, 9]',
    phase: 'REVERSE_LEVEL',
    codeLine: 32,
    queue: [15, 7],
    currentLevel: 2,
    leftToRight: true,
    levels: [[3], [20, 9]],
    variables: { completedLevel1: '[20, 9]', nextDir: 'Left-to-Right (→)' },
    explain: 'Because direction is Right-to-Left, node values are stored in reverse: [20, 9]. Direction flips back to true.',
    intuition: 'Zig-zag reversal in action.'
  },
  {
    title: '4. Process Level 2 (→): [15, 7] -> Queue Empty -> Traversal Complete!',
    phase: 'COMPLETED',
    codeLine: 44,
    queue: [],
    currentLevel: 2,
    leftToRight: false,
    levels: [[3], [20, 9], [15, 7]],
    variables: { allLevels: '[[3], [20, 9], [15, 7]]', totalLevels: 3 },
    explain: 'Level 2 processed Left-to-Right: [15, 7]. All nodes processed in spiral sequence: [[3], [20, 9], [15, 7]].',
    intuition: 'Spiral zig-zag traversal completed.'
  }
];

export default function ZigZagOrSpiralTraversalVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Active Level: {step.currentLevel} ({step.leftToRight ? '→ Left-to-Right' : '← Right-to-Left'})
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Levels Output = {step.levels.length} / 3
        </span>
      </div>

      {/* Zig-Zag Level Cards */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">Alternating Direction Levels</span>

        <div className="flex flex-col gap-3 w-full max-w-md">
          {[
            { lvl: 0, dir: '→', nodes: [3] },
            { lvl: 1, dir: '←', nodes: [20, 9] },
            { lvl: 2, dir: '→', nodes: [15, 7] }
          ].map((row) => {
            const isCompleted = step.levels.length > row.lvl;
            const isActive = step.currentLevel === row.lvl && !isCompleted;

            let borderClass = 'border-[#272b3c] bg-[#161824] text-slate-500';
            if (isCompleted) {
              borderClass = 'border-emerald-500 bg-emerald-500/20 text-emerald-300';
            } else if (isActive) {
              borderClass = 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40';
            }

            return (
              <div key={row.lvl} className={`p-3 rounded-xl border flex items-center justify-between font-mono transition-all ${borderClass}`}>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold">Level {row.lvl}</span>
                  <span className="text-xs text-amber-400 font-bold">({row.dir})</span>
                </div>
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
