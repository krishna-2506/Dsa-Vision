import React from 'react';

export const meta = {
  title: 'Check If Two Trees Are Identical',
  category: 'Binary Trees',
  difficulty: 'Easy',
  timeComplexity: 'O(min(N, M))',
  spaceComplexity: 'O(min(H1, H2)) recursion stack',
  description: 'Determines whether two binary trees are structurally identical and have identical values at every corresponding node using synchronized recursive pre-order traversal.'
};

export const solutions = {
  cpp: `// C++: Check if Two Trees are Identical
// Time Complexity: O(min(N, M)) | Space: O(min(H1, H2))
struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

bool isSameTree(TreeNode* p, TreeNode* q) {
    // If one or both are null, they must both be null
    if (p == nullptr || q == nullptr) {
        return (p == q);
    }
    // Value and subtrees must match
    return (p->val == q->val)
        && isSameTree(p->left, q->left)
        && isSameTree(p->right, q->right);
}`,
  java: `// Java: Check if Two Trees are Identical
class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null || q == null) {
            return (p == q);
        }
        return (p.val == q.val)
            && isSameTree(p.left, q.left)
            && isSameTree(p.right, q.right);
    }
}`,
  python: `# Python 3: Check if Two Trees are Identical
def is_same_tree(p, q) -> bool:
    if not p or not q:
        return p == q

    return (p.val == q.val and 
            is_same_tree(p.left, q.left) and 
            is_same_tree(p.right, q.right))`,
  javascript: `// JavaScript: Check if Two Trees are Identical
function isSameTree(p, q) {
    if (!p || !q) {
        return p === q;
    }
    return (
        p.val === q.val &&
        isSameTree(p.left, q.left) &&
        isSameTree(p.right, q.right)
    );
}`
};

export const steps = [
  {
    title: '1. Initialize: Compare Root Nodes Tree A (1) & Tree B (1)',
    phase: 'ROOT_CHECK',
    codeLine: 16,
    nodeA: 1,
    nodeB: 1,
    match: true,
    checkedNodes: [1],
    explain: 'Compare root nodes: A.val (1) == B.val (1) &rarr; match! Proceed to left subtrees.'
  },
  {
    title: '2. Compare Left Children: A.left (2) & B.left (2)',
    phase: 'LEFT_CHECK',
    codeLine: 17,
    nodeA: 2,
    nodeB: 2,
    match: true,
    checkedNodes: [1, 2],
    explain: 'Nodes match with value 2. Proceed to left leaf check.'
  },
  {
    title: '3. Compare Leaves of Node 2: Both left & right are null',
    phase: 'LEAF_CHECK',
    codeLine: 12,
    nodeA: null,
    nodeB: null,
    match: true,
    checkedNodes: [1, 2],
    explain: 'Both children are null (null == null) &rarr; return true.'
  },
  {
    title: '4. Compare Right Children: A.right (3) & B.right (3)',
    phase: 'RIGHT_CHECK',
    codeLine: 18,
    nodeA: 3,
    nodeB: 3,
    match: true,
    checkedNodes: [1, 2, 3],
    explain: 'Right children both equal 3. Node values and structures match.'
  },
  {
    title: '5. Complete: Both Trees Are Identical &rarr; Return True!',
    phase: 'COMPLETE',
    codeLine: 16,
    nodeA: null,
    nodeB: null,
    match: true,
    checkedNodes: [1, 2, 3],
    explain: 'All corresponding pairs of nodes matched perfectly in value and structure!'
  }
];

export default function CheckIfTwoTreesAreIdenticalOrNotVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Comparing: <strong>NodeA({step.nodeA ?? 'null'}) vs NodeB({step.nodeB ?? 'null'})</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Status: <strong>{step.match ? 'MATCHING' : 'MISMATCH'}</strong>
        </div>
      </div>

      {/* Side by side tree display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Tree A */}
        <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-xl">
          <span className="text-xs font-mono text-[var(--chalk-dim)]">Tree A</span>

          <div className="flex flex-col items-center gap-4 py-2">
            <div
              className={`w-11 h-11 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm ${
                step.nodeA === 1
                  ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200'
                  : step.checkedNodes.includes(1)
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                  : 'bg-[#181a26] border-[#31364d] text-[var(--chalk)]'
              }`}
            >
              1
            </div>

            <div className="flex justify-center gap-12">
              {[2, 3].map(v => (
                <div
                  key={v}
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs ${
                    step.nodeA === v
                      ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200'
                      : step.checkedNodes.includes(v)
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                      : 'bg-[#181a26] border-[#31364d] text-[var(--chalk)]'
                  }`}
                >
                  {v}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tree B */}
        <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-xl">
          <span className="text-xs font-mono text-[var(--chalk-dim)]">Tree B</span>

          <div className="flex flex-col items-center gap-4 py-2">
            <div
              className={`w-11 h-11 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm ${
                step.nodeB === 1
                  ? 'bg-purple-500/25 border-purple-400 text-purple-200'
                  : step.checkedNodes.includes(1)
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                  : 'bg-[#181a26] border-[#31364d] text-[var(--chalk)]'
              }`}
            >
              1
            </div>

            <div className="flex justify-center gap-12">
              {[2, 3].map(v => (
                <div
                  key={v}
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs ${
                    step.nodeB === v
                      ? 'bg-purple-500/25 border-purple-400 text-purple-200'
                      : step.checkedNodes.includes(v)
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                      : 'bg-[#181a26] border-[#31364d] text-[var(--chalk)]'
                  }`}
                >
                  {v}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs font-mono text-[var(--chalk-dim)] bg-[var(--board-raised-2)] px-4 py-2 rounded-xl border border-[var(--line)] text-center w-full">
        Synchronized recursion checks: value match AND left subtree match AND right subtree match.
      </div>
    </div>
  );
}
