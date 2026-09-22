import React from 'react';

export const meta = {
  title: "Merge Two BST's into a Balanced BST",
  category: 'Binary Search Trees',
  difficulty: 'Hard',
  timeComplexity: 'O(M + N)',
  spaceComplexity: 'O(M + N)',
  description: "Merges two separate Binary Search Trees into a single height-balanced BST in optimal O(M + N) time by extracting inorders, merging sorted lists, and building a balanced tree recursively."
};

export const solutions = {
  cpp: `// C++ Merge Two BST's
// Time: O(M + N) | Space: O(M + N)
#include <vector>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
    void inorder(TreeNode* root, vector<int>& res) {
        if (!root) return;
        inorder(root->left, res);
        res.push_back(root->val);
        inorder(root->right, res);
    }

    vector<int> mergeSorted(const vector<int>& a, const vector<int>& b) {
        vector<int> merged;
        int i = 0, j = 0;
        while (i < a.size() && j < b.size()) {
            if (a[i] <= b[j]) merged.push_back(a[i++]);
            else merged.push_back(b[j++]);
        }
        while (i < a.size()) merged.push_back(a[i++]);
        while (j < b.size()) merged.push_back(b[j++]);
        return merged;
    }

    TreeNode* buildBalancedBST(const vector<int>& arr, int l, int r) {
        if (l > r) return nullptr;
        int mid = l + (r - l) / 2;
        TreeNode* root = new TreeNode(arr[mid]);
        root->left = buildBalancedBST(arr, l, mid - 1);
        root->right = buildBalancedBST(arr, mid + 1, r);
        return root;
    }
public:
    TreeNode* mergeBSTs(TreeNode* root1, TreeNode* root2) {
        vector<int> in1, in2;
        inorder(root1, in1);
        inorder(root2, in2);
        vector<int> merged = mergeSorted(in1, in2);
        return buildBalancedBST(merged, 0, merged.size() - 1);
    }
};`,
  python: `# Python 3 Merge Two BST's
# Time: O(M + N) | Space: O(M + N)
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def mergeBSTs(self, root1: TreeNode, root2: TreeNode) -> TreeNode:
        def inorder(node):
            return inorder(node.left) + [node.val] + inorder(node.right) if node else []

        in1 = inorder(root1)
        in2 = inorder(root2)

        # Merge two sorted lists
        merged = []
        i = j = 0
        while i < len(in1) and j < len(in2):
            if in1[i] <= in2[j]:
                merged.append(in1[i])
                i += 1
            else:
                merged.append(in2[j])
                j += 1
        merged.extend(in1[i:])
        merged.extend(in2[j:])

        # Build balanced BST
        def build(l, r):
            if l > r:
                return None
            mid = (l + r) // 2
            root = TreeNode(merged[mid])
            root.left = build(l, mid - 1)
            root.right = build(mid + 1, r)
            return root

        return build(0, len(merged) - 1)`,
  java: `// Java Merge Two BST's
// Time: O(M + N) | Space: O(M + N)
import java.util.ArrayList;
import java.util.List;

class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}

class Solution {
    private void inorder(TreeNode root, List<Integer> list) {
        if (root == null) return;
        inorder(root.left, list);
        list.add(root.val);
        inorder(root.right, list);
    }

    private TreeNode build(List<Integer> list, int l, int r) {
        if (l > r) return null;
        int mid = l + (r - l) / 2;
        TreeNode root = new TreeNode(list.get(mid));
        root.left = build(list, l, mid - 1);
        root.right = build(list, mid + 1, r);
        return root;
    }

    public TreeNode mergeBSTs(TreeNode root1, TreeNode root2) {
        List<Integer> in1 = new ArrayList<>();
        List<Integer> in2 = new ArrayList<>();
        inorder(root1, in1);
        inorder(root2, in2);

        List<Integer> merged = new ArrayList<>();
        int i = 0, j = 0;
        while (i < in1.size() && j < in2.size()) {
            if (in1.get(i) <= in2.get(j)) merged.add(in1.get(i++));
            else merged.add(in2.get(j++));
        }
        while (i < in1.size()) merged.add(in1.get(i++));
        while (j < in2.size()) merged.add(in2.get(j++));

        return build(merged, 0, merged.size() - 1);
    }
}`,
  javascript: `// JavaScript Merge Two BST's
// Time: O(M + N) | Space: O(M + N)
var mergeBSTs = function(root1, root2) {
    const in1 = [], in2 = [];

    function inorder(node, arr) {
        if (!node) return;
        inorder(node.left, arr);
        arr.push(node.val);
        inorder(node.right, arr);
    }

    inorder(root1, in1);
    inorder(root2, in2);

    const merged = [];
    let i = 0, j = 0;
    while (i < in1.length && j < in2.length) {
        if (in1[i] <= in2[j]) merged.push(in1[i++]);
        else merged.push(in2[j++]);
    }
    while (i < in1.length) merged.push(in1[i++]);
    while (j < in2.length) merged.push(in2[j++]);

    function build(l, r) {
        if (l > r) return null;
        const mid = Math.floor((l + r) / 2);
        const node = { val: merged[mid], left: null, right: null };
        node.left = build(l, mid - 1);
        node.right = build(mid + 1, r);
        return node;
    }

    return build(0, merged.length - 1);
};`
};

export const steps = [
  {
    title: '1. Input Trees: BST 1 and BST 2',
    phase: 'INIT',
    codeLine: 14,
    bst1: [1, 3, 5],
    bst2: [2, 4, 6],
    merged: [],
    balancedNodes: [],
    variables: { 'BST 1 values': '[1, 3, 5]', 'BST 2 values': '[2, 4, 6]' },
    explain: 'We have two valid BSTs. Direct tree merging is complex and can result in unbalanced degenerate trees.',
    intuition: 'Extracting inorders translates tree topology into easily mergeable sorted streams.'
  },
  {
    title: '2. Inorder Extractions: in1 = [1, 3, 5] & in2 = [2, 4, 6]',
    phase: 'INORDER',
    codeLine: 24,
    bst1: [1, 3, 5],
    bst2: [2, 4, 6],
    in1: [1, 3, 5],
    in2: [2, 4, 6],
    merged: [],
    balancedNodes: [],
    variables: { in1: '[1, 3, 5]', in2: '[2, 4, 6]' },
    explain: 'Inorder traversals produce sorted sequences for both trees in O(M + N) time.',
    intuition: 'Two sorted arrays can be combined via standard two-pointer merging.'
  },
  {
    title: '3. Merge Two Sorted Arrays: [1, 2, 3, 4, 5, 6]',
    phase: 'MERGE_SORTED',
    codeLine: 35,
    bst1: [1, 3, 5],
    bst2: [2, 4, 6],
    in1: [1, 3, 5],
    in2: [2, 4, 6],
    merged: [1, 2, 3, 4, 5, 6],
    balancedNodes: [],
    variables: { mergedList: '[1, 2, 3, 4, 5, 6]', time: 'O(M + N)' },
    explain: 'Using two pointers i and j, we merge the lists into a single consolidated sorted array of size 6.',
    intuition: 'Linear scan merges both sorted lists in linear time.'
  },
  {
    title: '4. Build Balanced BST: Mid Root = 3, Left = [1, 2], Right = [4, 5, 6]',
    phase: 'COMPLETED',
    codeLine: 45,
    bst1: [1, 3, 5],
    bst2: [2, 4, 6],
    in1: [1, 3, 5],
    in2: [2, 4, 6],
    merged: [1, 2, 3, 4, 5, 6],
    balancedNodes: [
      { val: 3, x: 200, y: 30, role: 'Root' },
      { val: 1, x: 100, y: 90, role: 'Left' },
      { val: 5, x: 300, y: 90, role: 'Right' },
      { val: 2, x: 140, y: 150, role: '> 1' },
      { val: 4, x: 260, y: 150, role: '< 5' },
      { val: 6, x: 340, y: 150, role: '> 5' }
    ],
    variables: { rootVal: 3, height: 3, isBalanced: 'True' },
    explain: 'Recursively picking the middle element creates a perfectly balanced BST of minimum height O(log(M+N)).',
    intuition: 'Binary search divide-and-conquer guarantees balanced left and right subtree heights.'
  }
];

export default function Merge2BstsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Step: {step.phase}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Complexity: O(M + N) Time &amp; Space
        </span>
      </div>

      {/* Merged Stream or Balanced Tree Display */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[var(--chalk-dim)] uppercase tracking-wider">
          {step.balancedNodes.length > 0 ? 'Resulting Balanced BST' : 'Sorted Streams & Merging'}
        </span>

        {step.balancedNodes.length > 0 ? (
          <svg width="380" height="190" className="overflow-visible">
            {/* Edges */}
            <line x1="200" y1="35" x2="100" y2="90" stroke="#3b4261" strokeWidth="2" />
            <line x1="200" y1="35" x2="300" y2="90" stroke="#3b4261" strokeWidth="2" />
            <line x1="100" y1="90" x2="140" y2="150" stroke="#3b4261" strokeWidth="2" />
            <line x1="300" y1="90" x2="260" y2="150" stroke="#3b4261" strokeWidth="2" />
            <line x1="300" y1="90" x2="340" y2="150" stroke="#3b4261" strokeWidth="2" />

            {/* Nodes */}
            {step.balancedNodes.map((node, i) => (
              <g key={i} transform={`translate(${node.x}, ${node.y})`}>
                <circle
                  r="18"
                  className="fill-[#161824] stroke-emerald-500/60"
                  strokeWidth="2"
                />
                <text
                  textAnchor="middle"
                  dy="5"
                  className="text-xs font-mono font-bold fill-amber-300"
                >
                  {node.val}
                </text>
              </g>
            ))}
          </svg>
        ) : (
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="flex items-center justify-center gap-2 font-mono text-xs text-purple-300">
              <span>BST 1:</span>
              {step.bst1.map((v, i) => (
                <span key={i} className="px-2.5 py-1 bg-purple-500/15 border border-purple-500/30 rounded-lg">
                  {v}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2 font-mono text-xs text-cyan-300">
              <span>BST 2:</span>
              {step.bst2.map((v, i) => (
                <span key={i} className="px-2.5 py-1 bg-cyan-500/15 border border-cyan-500/30 rounded-lg">
                  {v}
                </span>
              ))}
            </div>

            {step.merged.length > 0 && (
              <div className="w-full border-t border-[var(--line)] pt-3 flex flex-col items-center gap-2">
                <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                  Merged Sorted Sequence:
                </span>
                <div className="flex items-center gap-2 font-mono text-xs text-emerald-300 font-bold">
                  [{step.merged.join(', ')}]
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Explanation */}
      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl p-3 text-xs font-mono text-center text-[var(--chalk-dim)]">
        {step.explain}
      </div>
    </div>
  );
}
