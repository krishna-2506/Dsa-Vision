export const rendererType = 'tree';

export const meta = {
  title: 'Maximum Width of Binary Tree',
  category: 'Binary Trees',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) BFS queue',
  description: 'Calculates the maximum width among all levels of a binary tree (including null slots between non-null endpoints) using level-order BFS with zero-normalized index coordinates to prevent integer overflow.'
};

export const ideaMap = {
  title: 'Maximum Binary Tree Width BFS Strategy',
  nodes: [
    {
      id: 'step1',
      label: '1-Based Heap Indexing',
      detail: 'Assign index i to node; left child gets 2*i + 1 and right child gets 2*i + 2 (in 0-indexed terms).'
    },
    {
      id: 'step2',
      label: 'Zero-Normalization per Level',
      detail: 'Subtract the level minimum index (minIndex = q.front().index) from each node to eliminate coordinate explosion.'
    },
    {
      id: 'step3',
      label: 'Span Calculation (last - first + 1)',
      detail: 'Record the first index and last index popped at each level. Width = last - first + 1.'
    },
    {
      id: 'step4',
      label: 'Global Peak Retention',
      detail: 'Update maxWidth = max(maxWidth, currentLevelWidth) across all tree tiers.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Maximum Width of Binary Tree (LeetCode 662)
// Time Complexity: O(N) | Space Complexity: O(N)
#include <queue>
#include <algorithm>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

int widthOfBinaryTree(TreeNode* root) {
    if (!root) return 0;
    long long maxWidth = 0;
    queue<pair<TreeNode*, long long>> q; // {node, index}
    q.push({root, 0});

    while (!q.empty()) {
        int size = q.size();
        long long minIndex = q.front().second; // level offset to prevent overflow
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
    return (int)maxWidth;
}`,
  java: `// Java: Maximum Width of Binary Tree (LeetCode 662)
// Time Complexity: O(N) | Space Complexity: O(N)
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
                Pair p = q.poll();
                long currId = p.index - minIndex;
                if (i == 0) first = currId;
                if (i == size - 1) last = currId;

                if (p.node.left != null) q.offer(new Pair(p.node.left, currId * 2 + 1));
                if (p.node.right != null) q.offer(new Pair(p.node.right, currId * 2 + 2));
            }
            maxWidth = Math.max(maxWidth, last - first + 1);
        }
        return (int) maxWidth;
    }
}`,
  python: `# Python: Maximum Width of Binary Tree (LeetCode 662)
# Time Complexity: O(N) | Space Complexity: O(N)
from collections import deque

def widthOfBinaryTree(root):
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

            if i == 0:
                first = curr_id
            if i == size - 1:
                last = curr_id

            if node.left:
                q.append((node.left, curr_id * 2 + 1))
            if node.right:
                q.append((node.right, curr_id * 2 + 2))

        max_width = max(max_width, last - first + 1)

    return max_width`,
  javascript: `// JavaScript: Maximum Width of Binary Tree (LeetCode 662)
// Time Complexity: O(N) | Space Complexity: O(N)
function widthOfBinaryTree(root) {
  if (!root) return 0;
  let maxWidth = 0;
  const q = [[root, 0n]]; // BigInt avoids large index precision loss

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

const sampleTree = {
  val: 1,
  left: {
    val: 3,
    left: { val: 5, left: null, right: null },
    right: { val: 4, left: null, right: null }
  },
  right: {
    val: 2,
    left: null,
    right: { val: 9, left: null, right: null }
  }
};

export const steps = [
  {
    phase: 'LEVEL_0',
    title: '1. Level 0: Root 1 (Index 0) &rarr; Width = 1',
    tree: sampleTree,
    activeVal: 1,
    visitedVals: [1],
    nodeLabels: { 1: 'idx: 0' },
    customCard: {
      title: 'Level 0 Coordinates',
      rows: [
        { label: 'Active Level', value: 'Level 0' },
        { label: 'Level Boundary Nodes', value: 'First: (1, id=0), Last: (1, id=0)' },
        { label: 'Level Width Formula', value: 'last - first + 1 = 0 - 0 + 1 = 1', accent: true },
        { label: 'Global maxWidth', value: '1' }
      ]
    },
    variables: {
      level: 0,
      firstIdx: 0,
      lastIdx: 0,
      currentWidth: 1,
      maxWidth: 1
    },
    metrics: [
      { label: 'Level', value: '0' },
      { label: 'Level Width', value: '1' },
      { label: 'Max Width', value: '1', highlight: true }
    ],
    explain: 'Level 0 contains only root node 1 at index 0. Level width is 0 - 0 + 1 = 1. Children 3 and 2 are pushed to queue with IDs 1 and 2.'
  },
  {
    phase: 'LEVEL_1',
    title: '2. Level 1: Node 3 (idx 0) & Node 2 (idx 1) &rarr; Width = 2',
    tree: sampleTree,
    activeVal: 3,
    visitedVals: [1, 3, 2],
    nodeLabels: { 1: 'idx: 0', 3: 'idx: 0', 2: 'idx: 1' },
    customCard: {
      title: 'Level 1 Coordinates',
      rows: [
        { label: 'Active Level', value: 'Level 1' },
        { label: 'Normalized IDs', value: 'Node 3: 0, Node 2: 1' },
        { label: 'Level Width Formula', value: 'last - first + 1 = 1 - 0 + 1 = 2', accent: true },
        { label: 'Global maxWidth', value: 'Updated to 2' }
      ]
    },
    variables: {
      level: 1,
      firstIdx: 0,
      lastIdx: 1,
      currentWidth: 2,
      maxWidth: 2
    },
    metrics: [
      { label: 'Level', value: '1' },
      { label: 'Level Width', value: '2' },
      { label: 'Max Width', value: '2', highlight: true }
    ],
    explain: 'At Level 1, minIndex is 1. Zero-normalized: Node 3 is 0, Node 2 is 1. Level width is 1 - 0 + 1 = 2. Global maxWidth updates to 2.'
  },
  {
    phase: 'LEVEL_2_MAX',
    title: '3. Level 2: Node 5 (idx 0) to Node 9 (idx 3) &rarr; Width = 4!',
    tree: sampleTree,
    activeVal: 5,
    visitedVals: [1, 3, 2, 5, 4, 9],
    nodeLabels: { 1: 'idx: 0', 3: 'idx: 0', 2: 'idx: 1', 5: 'idx: 0', 4: 'idx: 1', 9: 'idx: 3' },
    customCard: {
      title: 'Maximum Width Discovered!',
      rows: [
        { label: 'Active Level', value: 'Level 2' },
        { label: 'Leftmost Endpoint', value: 'Node 5 (currId = 0)', accent: true },
        { label: 'Rightmost Endpoint', value: 'Node 9 (currId = 3)', accent: true },
        { label: 'Included Null Gap', value: 'Slot index 2 is null but counts toward width' },
        { label: 'Level Width Formula', value: 'last - first + 1 = 3 - 0 + 1 = 4!', accent: true }
      ]
    },
    variables: {
      level: 2,
      firstIdx: 0,
      lastIdx: 3,
      currentWidth: 4,
      maxWidth: 4
    },
    metrics: [
      { label: 'Level', value: '2' },
      { label: 'Level Width', value: '4' },
      { label: 'Max Width', value: '4', highlight: true }
    ],
    explain: 'Level 2 spans from Node 5 at index 0 to Node 9 at index 3. Even though Node 2\'s left child is null (slot index 2), the problem counts all slots between endpoints. Width = 3 - 0 + 1 = 4!'
  },
  {
    phase: 'COMPLETE',
    title: '4. Summary: Maximum Binary Tree Width = 4',
    tree: sampleTree,
    activeVal: null,
    visitedVals: [1, 3, 2, 5, 4, 9],
    nodeLabels: { 1: 'idx: 0', 3: 'idx: 0', 2: 'idx: 1', 5: 'idx: 0', 4: 'idx: 1', 9: 'idx: 3' },
    customCard: {
      title: 'Level-Order Width Summary',
      rows: [
        { label: 'Level 0 Width', value: '1' },
        { label: 'Level 1 Width', value: '2' },
        { label: 'Level 2 Width', value: '4 (Maximal)' },
        { label: 'Maximum Tree Width', value: '4', accent: true },
        { label: 'Time Complexity', value: 'O(N) level-order BFS' }
      ]
    },
    variables: {
      level: 'Done',
      firstIdx: 0,
      lastIdx: 3,
      currentWidth: 4,
      maxWidth: 4
    },
    metrics: [
      { label: 'Status', value: 'Done' },
      { label: 'Max Width', value: '4', highlight: true }
    ],
    explain: 'BFS traversal finishes with all tiers visited. The maximum width of the binary tree is 4, observed across the bottom tier.'
  }
];
