import React from 'react';

export const meta = {
  title: 'Minimum Time to Burn Binary Tree',
  category: 'Binary Trees',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) parent map & BFS queue',
  description: 'Calculates the minimum time required to burn an entire binary tree starting from a designated target node by tracking parent pointers and simulating radial BFS fire propagation.'
};

export const solutions = {
  cpp: `// C++: Minimum Time to Burn Binary Tree
// Time Complexity: O(N) | Space Complexity: O(N)
#include <unordered_map>
#include <unordered_set>
#include <queue>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
private:
    TreeNode* mapParents(TreeNode* root, unordered_map<TreeNode*, TreeNode*>& parentMap, int target) {
        queue<TreeNode*> q;
        q.push(root);
        TreeNode* targetNode = nullptr;

        while (!q.empty()) {
            TreeNode* curr = q.front();
            q.pop();

            if (curr->val == target) targetNode = curr;

            if (curr->left) {
                parentMap[curr->left] = curr;
                q.push(curr->left);
            }
            if (curr->right) {
                parentMap[curr->right] = curr;
                q.push(curr->right);
            }
        }
        return targetNode;
    }

public:
    int minTimeToBurn(TreeNode* root, int start) {
        unordered_map<TreeNode*, TreeNode*> parentMap;
        TreeNode* target = mapParents(root, parentMap, start);

        queue<TreeNode*> q;
        unordered_set<TreeNode*> visited;
        q.push(target);
        visited.insert(target);

        int time = 0;

        while (!q.empty()) {
            int size = q.size();
            bool burnedNew = false;

            for (int i = 0; i < size; i++) {
                TreeNode* curr = q.front();
                q.pop();

                // Spread to left, right, and parent
                if (curr->left && !visited.count(curr->left)) {
                    burnedNew = true;
                    visited.insert(curr->left);
                    q.push(curr->left);
                }
                if (curr->right && !visited.count(curr->right)) {
                    burnedNew = true;
                    visited.insert(curr->right);
                    q.push(curr->right);
                }
                if (parentMap.count(curr) && !visited.count(parentMap[curr])) {
                    burnedNew = true;
                    visited.insert(parentMap[curr]);
                    q.push(parentMap[curr]);
                }
            }
            if (burnedNew) time++;
        }
        return time;
    }
};`,
  java: `// Java: Minimum Time to Burn Binary Tree
import java.util.*;

class Solution {
    private static TreeNode mapParents(TreeNode root, Map<TreeNode, TreeNode> parentMap, int target) {
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        TreeNode targetNode = null;

        while (!q.isEmpty()) {
            TreeNode curr = q.poll();
            if (curr.val == target) targetNode = curr;

            if (curr.left != null) {
                parentMap.put(curr.left, curr);
                q.add(curr.left);
            }
            if (curr.right != null) {
                parentMap.put(curr.right, curr);
                q.add(curr.right);
            }
        }
        return targetNode;
    }

    public static int minTimeToBurn(TreeNode root, int start) {
        Map<TreeNode, TreeNode> parentMap = new HashMap<>();
        TreeNode target = mapParents(root, parentMap, start);

        Queue<TreeNode> q = new LinkedList<>();
        Set<TreeNode> visited = new HashSet<>();
        q.add(target);
        visited.add(target);

        int time = 0;

        while (!q.isEmpty()) {
            int size = q.size();
            boolean burned = false;

            for (int i = 0; i < size; i++) {
                TreeNode curr = q.poll();

                if (curr.left != null && !visited.contains(curr.left)) {
                    burned = true;
                    visited.add(curr.left);
                    q.add(curr.left);
                }
                if (curr.right != null && !visited.contains(curr.right)) {
                    burned = true;
                    visited.add(curr.right);
                    q.add(curr.right);
                }
                if (parentMap.containsKey(curr) && !visited.contains(parentMap.get(curr))) {
                    burned = true;
                    visited.add(parentMap.get(curr));
                    q.add(parentMap.get(curr));
                }
            }
            if (burned) time++;
        }
        return time;
    }
}`,
  python: `# Python 3: Minimum Time to Burn Binary Tree
from collections import deque

def min_time_to_burn(root, start):
    parent_map = {}
    target = None
    q = deque([root])

    while q:
        curr = q.popleft()
        if curr.val == start:
            target = curr
        if curr.left:
            parent_map[curr.left] = curr
            q.append(curr.left)
        if curr.right:
            parent_map[curr.right] = curr
            q.append(curr.right)

    burn_q = deque([target])
    visited = {target}
    time = 0

    while burn_q:
        burned_new = False
        for _ in range(len(burn_q)):
            curr = burn_q.popleft()
            for neighbor in (curr.left, curr.right, parent_map.get(curr)):
                if neighbor and neighbor not in visited:
                    visited.add(neighbor)
                    burn_q.append(neighbor)
                    burned_new = True
        if burned_new:
            time += 1

    return time`,
  javascript: `// JavaScript: Minimum Time to Burn Binary Tree
function minTimeToBurn(root, start) {
    const parentMap = new Map();
    let target = null;
    const q = [root];

    while (q.length > 0) {
        const curr = q.shift();
        if (curr.val === start) target = curr;

        if (curr.left) {
            parentMap.set(curr.left, curr);
            q.push(curr.left);
        }
        if (curr.right) {
            parentMap.set(curr.right, curr);
            q.push(curr.right);
        }
    }

    const burnQ = [target];
    const visited = new Set([target]);
    let time = 0;

    while (burnQ.length > 0) {
        let burnedNew = false;
        const size = burnQ.length;

        for (let i = 0; i < size; i++) {
            const curr = burnQ.shift();
            const neighbors = [curr.left, curr.right, parentMap.get(curr)];

            for (const n of neighbors) {
                if (n && !visited.has(n)) {
                    visited.add(n);
                    burnQ.push(n);
                    burnedNew = true;
                }
            }
        }
        if (burnedNew) time++;
    }
    return time;
}`
};

export const steps = [
  {
    title: '1. Target Ignition at t = 0: Fire starts at Target Node 2',
    phase: 'IGNITE',
    codeLine: 43,
    time: 0,
    burning: [2],
    explain: 'Parent pointers mapped. Fire ignited at target Node 2 at time t = 0.'
  },
  {
    title: '2. Time t = 1: Fire spreads to Parent (1) and Children (4, 5)',
    phase: 'SPREAD_T1',
    codeLine: 50,
    time: 1,
    burning: [2, 1, 4, 5],
    explain: 'Adjacent nodes infected: Node 1 (parent), Node 4 (left child), Node 5 (right child).'
  },
  {
    title: '3. Time t = 2: Fire reaches Node 3 (right child of 1)',
    phase: 'SPREAD_T2',
    codeLine: 50,
    time: 2,
    burning: [2, 1, 4, 5, 3],
    explain: 'Fire spreads from Node 1 to Node 3.'
  },
  {
    title: '4. Time t = 3: Fire reaches Node 6 (right child of 3) & Complete!',
    phase: 'COMPLETE',
    codeLine: 65,
    time: 3,
    burning: [2, 1, 4, 5, 3, 6],
    explain: 'All 6 nodes consumed by fire. Total burn time = 3 units!'
  }
];

export default function MinimumTimeTakenToBurnTheBtFromAGivenNodeVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300">
          Elapsed Time: <strong className="text-base text-amber-200">{step.time}s</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300">
          Burned Nodes: <strong>{step.burning.length} / 6</strong>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl w-full">
        <div className="text-xs font-mono text-[#8a8ea3] flex items-center justify-between w-full px-2">
          <span>Radial Fire Propagation Wavefront</span>
          <span className="text-amber-400 font-bold">BFS with Parent Pointers</span>
        </div>

        {/* Tree Topology with Flame Visuals */}
        <div className="flex flex-col items-center gap-4 py-3 w-full">
          {/* Level 0: 1 */}
          <div
            className={`w-11 h-11 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm transition-all ${
              step.burning.includes(1)
                ? 'bg-amber-500/30 border-amber-400 text-amber-200 shadow-lg shadow-amber-500/30'
                : 'bg-[#181a26] border-[#31364d] text-white'
            }`}
          >
            1
          </div>

          {/* Level 1: 2 (Target) and 3 */}
          <div className="flex justify-center gap-16 w-full">
            <div
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs transition-all ${
                step.burning.includes(2)
                  ? 'bg-rose-500/35 border-rose-400 text-rose-200 shadow-xl shadow-rose-500/30 ring-2 ring-rose-400/40'
                  : 'bg-[#181a26] border-[#31364d] text-white'
              }`}
            >
              2 (Target)
            </div>
            <div
              className={`w-11 h-11 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs transition-all ${
                step.burning.includes(3)
                  ? 'bg-amber-500/30 border-amber-400 text-amber-200 shadow-md'
                  : 'bg-[#181a26] border-[#31364d] text-white'
              }`}
            >
              3
            </div>
          </div>

          {/* Level 2: 4, 5, 6 */}
          <div className="flex justify-between w-full px-12">
            <div className="flex gap-4">
              {[4, 5].map(v => (
                <div
                  key={v}
                  className={`w-9 h-9 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs transition-all ${
                    step.burning.includes(v)
                      ? 'bg-amber-500/30 border-amber-400 text-amber-200 shadow-md'
                      : 'bg-[#181a26] border-[#31364d] text-white'
                  }`}
                >
                  {v}
                </div>
              ))}
            </div>

            <div
              className={`w-9 h-9 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs transition-all ${
                step.burning.includes(6)
                  ? 'bg-amber-500/30 border-amber-400 text-amber-200 shadow-md'
                  : 'bg-[#181a26] border-[#31364d] text-white'
              }`}
            >
              6
            </div>
          </div>
        </div>

        <div className="text-xs font-mono text-[#8a8ea3] bg-[#161824] px-4 py-2 rounded-xl border border-[#272b3c] text-center w-full">
          Fire spreads simultaneously in 3 directions per node: left child, right child, and parent.
        </div>
      </div>
    </div>
  );
}
