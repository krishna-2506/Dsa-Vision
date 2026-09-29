export const rendererType = 'tree';

export const meta = {
  title: 'Level Order Traversal of Binary Tree (BFS)',
  category: 'Binary Trees',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) queue space',
  description: 'Traverses a binary tree level by level from top to bottom and left to right using a First-In-First-Out (FIFO) queue, processing each horizontal tier in optimal O(N) time.'
};

export const ideaMap = {
  title: 'Breadth-First Level Traversal Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Enqueue Root Node',
      detail: 'Push root node into a FIFO queue to seed the breadth-first frontier.'
    },
    {
      id: 'step2',
      label: 'Snapshot Level Width',
      detail: 'Measure queue.size() at the start of each level to isolate the current tier.'
    },
    {
      id: 'step3',
      label: 'Dequeue & Enqueue Children',
      detail: 'Pop nodes of current level and push their non-null left and right children.'
    },
    {
      id: 'step4',
      label: 'Iterate Until Queue Empty',
      detail: 'Repeat until queue is exhausted, capturing each horizontal layer in order.'
    }
  ]
};

export const solutions = {
  cpp: `// C++ Level Order Traversal (BFS)
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
        if (!root) return result;

        queue<TreeNode*> q;
        q.push(root);

        while (!q.empty()) {
            int levelSize = q.size();
            vector<int> currentLevel;

            for (int i = 0; i < levelSize; i++) {
                TreeNode* node = q.front();
                q.pop();
                currentLevel.push_back(node->val);

                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
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
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        result = []
        if not root:
            return result

        queue = deque([root])

        while queue:
            level_size = len(queue)
            current_level = []

            for _ in range(level_size):
                node = queue.popleft()
                current_level.append(node.val)

                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

            result.append(current_level)

        return result`,
  java: `// Java Level Order Traversal (BFS)
import java.util.*;

class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}

public class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> currentLevel = new ArrayList<>();

            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                currentLevel.add(node.val);

                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }

            result.add(currentLevel);
        }

        return result;
    }
}`,
  javascript: `// JavaScript Level Order Traversal (BFS)
function levelOrder(root) {
    const result = [];
    if (!root) return result;

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
}`
};

const tree = {
  val: 1,
  left: {
    val: 2,
    left: { val: 4 },
    right: { val: 5 }
  },
  right: {
    val: 3,
    left: { val: 6 },
    right: { val: 7 }
  }
};

export const steps = [
  {
    title: 'Initialize BFS Queue with Root (1)',
    phase: 'SETUP',
    tree,
    activeVal: 1,
    nodeLabels: { 1: 'Frontier (Q)' },
    traversal: [],
    traversalLabel: 'Level Order Output: []',
    variables: { queue: '[1]', currentLevel: 0, levelNodes: '[1]' },
    metrics: [
      { label: 'Current Level', value: 'Level 0' },
      { label: 'Queue Size', value: '1' },
      { label: 'Traversed', value: '0 / 7' }
    ],
    explain: 'Initialize a FIFO queue and enqueue the root node (1). Level 0 has 1 node.',
    action: 'queue.push(root);',
    intuition: 'A FIFO queue ensures that all nodes at depth d are visited before any node at depth d + 1.',
    formula: 'queue = [1]'
  },
  {
    title: 'Process Level 0: Dequeue (1) -> Enqueue (2, 3)',
    phase: 'PROCESS_LEVEL_0',
    tree,
    activeVal: 1,
    nodeLabels: { 1: 'Processed', 2: 'Queued', 3: 'Queued' },
    traversal: [1],
    traversalLabel: 'Level Order Output: [1]',
    variables: { dequeued: 1, enqueued: '2, 3', queue: '[2, 3]' },
    metrics: [
      { label: 'Completed Level', value: 'Level 0: [1]' },
      { label: 'Queue Size', value: '2' },
      { label: 'Next Level', value: 'Level 1' }
    ],
    explain: 'Pop Node 1 from queue and record it into output. Enqueue its non-null children: left (2) and right (3).',
    action: 'levelResult = [1]; queue.push(1.left); queue.push(1.right);',
    intuition: 'Children of the current level form the next horizontal tier in the queue.',
    formula: 'Level 0: [1] | Queue: [2, 3]'
  },
  {
    title: 'Process Level 1: Dequeue (2, 3) -> Enqueue (4, 5, 6, 7)',
    phase: 'PROCESS_LEVEL_1',
    tree,
    activeVal: 3,
    nodeLabels: { 1: 'Done', 2: 'Done', 3: 'Done', 4: 'Queued', 5: 'Queued', 6: 'Queued', 7: 'Queued' },
    traversal: [1, 2, 3],
    traversalLabel: 'Level Order Output: [1, 2, 3]',
    variables: { dequeued: '2, then 3', enqueued: '4, 5, 6, 7', queue: '[4, 5, 6, 7]' },
    metrics: [
      { label: 'Completed Level', value: 'Level 1: [2, 3]' },
      { label: 'Queue Size', value: '4 nodes' },
      { label: 'Total Visited', value: '3 / 7' }
    ],
    explain: 'Level 1 size is 2. Dequeue Node 2 (push 4, 5). Dequeue Node 3 (push 6, 7). Level 1 output is [2, 3].',
    action: 'levelResult = [2, 3]; queue = [4, 5, 6, 7];',
    intuition: 'Processing nodes left-to-right preserves standard horizontal reading order.',
    formula: 'Level 1: [2, 3] | Queue: [4, 5, 6, 7]'
  },
  {
    title: 'Process Level 2: Dequeue Leaves (4, 5, 6, 7)',
    phase: 'PROCESS_LEVEL_2',
    tree,
    activeVal: 7,
    nodeLabels: { 4: 'Done', 5: 'Done', 6: 'Done', 7: 'Done' },
    traversal: [1, 2, 3, 4, 5, 6, 7],
    traversalLabel: 'Level Order Output: [1, 2, 3, 4, 5, 6, 7]',
    variables: { dequeued: '4, 5, 6, 7', queue: '[] (Empty)' },
    metrics: [
      { label: 'Completed Level', value: 'Level 2: [4, 5, 6, 7]' },
      { label: 'Queue Size', value: '0 (Empty)' },
      { label: 'Total Visited', value: '7 / 7' }
    ],
    explain: 'Level 2 size is 4. Dequeue 4, 5, 6, 7. None have children, so no new nodes are enqueued. Queue becomes empty.',
    action: 'levelResult = [4, 5, 6, 7]; while loop terminates.',
    intuition: 'When the queue empties, all tree levels have been comprehensively traversed.',
    formula: 'Level 2: [4, 5, 6, 7]'
  },
  {
    title: 'Level Order Traversal Complete',
    phase: 'COMPLETED',
    tree,
    activeVal: null,
    nodeLabels: { 1: 'Level 0', 2: 'Level 1', 3: 'Level 1', 4: 'Level 2', 5: 'Level 2', 6: 'Level 2', 7: 'Level 2' },
    traversal: [1, 2, 3, 4, 5, 6, 7],
    traversalLabel: 'Final BFS Stream: [1, 2, 3, 4, 5, 6, 7]',
    variables: { totalLevels: 3, levels: '[[1], [2, 3], [4, 5, 6, 7]]' },
    metrics: [
      { label: 'Levels Count', value: '3 Levels' },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(N)' }
    ],
    customCard: {
      title: 'Level Order BFS Summary',
      rows: [
        { label: 'Level 0', value: '[1]' },
        { label: 'Level 1', value: '[2, 3]' },
        { label: 'Level 2', value: '[4, 5, 6, 7]', accent: true },
        { label: 'Algorithm', value: 'Breadth-First Search via FIFO Queue' }
      ]
    },
    explain: 'Breadth-First Level Order Traversal completed in linear O(N) time with O(N) maximum queue memory.',
    action: 'Return result = [[1], [2, 3], [4, 5, 6, 7]].',
    intuition: 'BFS traverses hierarchical graphs layer by layer with optimal time complexity.',
    formula: 'Result: [[1], [2, 3], [4, 5, 6, 7]]'
  }
];
