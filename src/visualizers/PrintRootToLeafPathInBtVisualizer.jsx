import React from 'react';

export const meta = {
  title: 'Root to Leaf Paths in Binary Tree',
  category: 'Binary Trees',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(H) recursion stack',
  description: 'Finds and prints all paths extending from the root node down to every leaf node in a binary tree using recursive backtracking.'
};

export const solutions = {
  cpp: `// C++: Root to Leaf Paths in Binary Tree
// Time Complexity: O(N) | Space Complexity: O(H)
#include <vector>
#include <string>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
private:
    void getPaths(TreeNode* root, vector<int>& current, vector<vector<int>>& allPaths) {
        if (!root) return;

        current.push_back(root->val);

        // If leaf node, save completed path
        if (!root->left && !root->right) {
            allPaths.push_back(current);
        } else {
            getPaths(root->left, current, allPaths);
            getPaths(root->right, current, allPaths);
        }

        // Backtrack
        current.pop_back();
    }

public:
    vector<vector<int>> allRootToLeaf(TreeNode* root) {
        vector<vector<int>> allPaths;
        vector<int> current;
        getPaths(root, current, allPaths);
        return allPaths;
    }
};`,
  java: `// Java: Root to Leaf Paths in Binary Tree
import java.util.*;

class Solution {
    private static void getPaths(TreeNode root, List<Integer> current, List<List<Integer>> allPaths) {
        if (root == null) return;

        current.add(root.val);

        if (root.left == null && root.right == null) {
            allPaths.add(new ArrayList<>(current));
        } else {
            getPaths(root.left, current, allPaths);
            getPaths(root.right, current, allPaths);
        }

        current.remove(current.size() - 1);
    }

    public static List<List<Integer>> Paths(TreeNode root) {
        List<List<Integer>> allPaths = new ArrayList<>();
        List<Integer> current = new ArrayList<>();
        getPaths(root, current, allPaths);
        return allPaths;
    }
}`,
  python: `# Python 3: Root to Leaf Paths in Binary Tree
def root_to_leaf_paths(root):
    all_paths = []

    def dfs(node, path):
        if not node:
            return
        path.append(node.val)
        if not node.left and not node.right:
            all_paths.append(list(path))
        else:
            dfs(node.left, path)
            dfs(node.right, path)
        path.pop()

    dfs(root, [])
    return all_paths`,
  javascript: `// JavaScript: Root to Leaf Paths in Binary Tree
function binaryTreePaths(root) {
    const allPaths = [];

    function dfs(node, path) {
        if (!node) return;
        path.push(node.val);

        if (!node.left && !node.right) {
            allPaths.push([...path]);
        } else {
            dfs(node.left, path);
            dfs(node.right, path);
        }

        path.pop();
    }

    dfs(root, []);
    return allPaths;
}`
};

export const steps = [
  {
    title: '1. Root 1: Start Path with [1]',
    phase: 'ROOT',
    codeLine: 18,
    activePath: [1],
    savedPaths: [],
    explain: 'Start DFS at root 1. Path = [1].'
  },
  {
    title: '2. Traverse Left: Path = [1, 2] &rarr; Reach Leaf 4',
    phase: 'LEAF_HIT',
    codeLine: 23,
    activePath: [1, 2, 4],
    savedPaths: [[1, 2, 4]],
    explain: 'Node 4 is a leaf! First root-to-leaf path recorded: 1 &rarr; 2 &rarr; 4.'
  },
  {
    title: '3. Backtrack to 2 & Traverse to Leaf 5: Path = [1, 2, 5]',
    phase: 'LEAF_HIT',
    codeLine: 23,
    activePath: [1, 2, 5],
    savedPaths: [[1, 2, 4], [1, 2, 5]],
    explain: 'Backtrack pops 4, pushes 5. Second leaf reached: 1 &rarr; 2 &rarr; 5.'
  },
  {
    title: '4. Backtrack to Root 1 & Traverse to Leaf 3: Path = [1, 3]',
    phase: 'LEAF_HIT',
    codeLine: 23,
    activePath: [1, 3],
    savedPaths: [[1, 2, 4], [1, 2, 5], [1, 3]],
    explain: 'Right child 3 is a leaf node! Third path recorded: 1 &rarr; 3.'
  },
  {
    title: '5. Complete: All 3 Root-to-Leaf Paths Identified',
    phase: 'COMPLETE',
    codeLine: 34,
    activePath: [],
    savedPaths: [[1, 2, 4], [1, 2, 5], [1, 3]],
    explain: 'All paths collected: ["1 &rarr; 2 &rarr; 4", "1 &rarr; 2 &rarr; 5", "1 &rarr; 3"].'
  }
];

export default function PrintRootToLeafPathInBtVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-[#161824] border border-[#272b3c] text-[#8a8ea3]">
          Active Path: <strong className="text-amber-400">[{step.activePath.join(' &rarr; ')}]</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Paths Saved: <strong>{step.savedPaths.length}</strong>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl w-full">
        <div className="text-xs font-mono text-[#8a8ea3] flex items-center justify-between w-full px-2">
          <span>Collected Root-to-Leaf Paths</span>
          <span className="text-emerald-400 font-bold">Backtracking DFS</span>
        </div>

        <div className="flex flex-col gap-2.5 w-full py-2">
          {step.savedPaths.length === 0 ? (
            <span className="text-xs font-mono text-[#4e5370] text-center py-4">Searching for leaf paths...</span>
          ) : (
            step.savedPaths.map((p, idx) => (
              <div key={idx} className="flex items-center gap-2 p-3 rounded-xl bg-[#0f1016] border border-[#242738]">
                <span className="text-xs font-mono text-purple-400 font-bold w-14">Path {idx + 1}:</span>
                <div className="flex items-center gap-1.5">
                  {p.map((val, i) => (
                    <span key={i} className="flex items-center gap-1.5 font-mono text-xs">
                      <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-200 font-bold border border-emerald-500/30">
                        {val}
                      </span>
                      {i < p.length - 1 && <span className="text-[#555a79]">&rarr;</span>}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="text-xs font-mono text-[#8a8ea3] bg-[#161824] px-4 py-2 rounded-xl border border-[#272b3c] text-center w-full">
          Backtracking pops the current node when returning up the call stack to explore alternative branches.
        </div>
      </div>
    </div>
  );
}
