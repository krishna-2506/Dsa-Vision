export const rendererType = 'tree';

export const meta = {
  title: 'Bottom View of Binary Tree',
  category: 'Binary Trees',
  difficulty: 'Medium',
  timeComplexity: 'O(N log N) or O(N)',
  spaceComplexity: 'O(N) queue and vertical column map',
  description: 'Calculates the bottom-most visible node for each vertical column line in a binary tree using breadth-first search (BFS). Nodes processed later in BFS with the same horizontal coordinate overwrite earlier ancestors.'
};

export const ideaMap = {
  title: 'Bottom View Vertical Column BFS Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Horizontal Line Coordinates',
      detail: 'Assign coordinate 0 to root; moving to left child subtracts 1 (line - 1), moving right adds 1 (line + 1).'
    },
    {
      id: 'step2',
      label: 'Queue-Based BFS Propagation',
      detail: 'Traverse level by level using a queue holding pairs of (node, line).'
    },
    {
      id: 'step3',
      label: 'Unconditional Column Overwrite',
      detail: 'For bottom view, every newly popped node at column line updates map[line] = node.val, naturally retaining the lowest node.'
    },
    {
      id: 'step4',
      label: 'Sort Keys Left to Right',
      detail: 'Extract entries sorted by vertical column coordinate from minLine to maxLine.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Bottom View of Binary Tree
// Time Complexity: O(N log N) with map | Space Complexity: O(N)
#include <vector>
#include <map>
#include <queue>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

vector<int> bottomView(TreeNode* root) {
    vector<int> ans;
    if (!root) return ans;

    map<int, int> mpp; // line -> node value
    queue<pair<TreeNode*, int>> q; // {node, line}
    q.push({root, 0});

    while (!q.empty()) {
        auto [node, line] = q.front();
        q.pop();

        // Overwrite earlier nodes at same line (BFS ensures lower nodes overwrite)
        mpp[line] = node->val;

        if (node->left) q.push({node->left, line - 1});
        if (node->right) q.push({node->right, line + 1});
    }

    for (auto& [line, val] : mpp) {
        ans.push_back(val);
    }
    return ans;
}`,
  java: `// Java: Bottom View of Binary Tree
// Time Complexity: O(N log N) | Space Complexity: O(N)
import java.util.*;

class Solution {
    static class Pair {
        TreeNode node;
        int line;
        Pair(TreeNode n, int l) { node = n; line = l; }
    }

    public ArrayList<Integer> bottomView(TreeNode root) {
        ArrayList<Integer> ans = new ArrayList<>();
        if (root == null) return ans;

        Map<Integer, Integer> map = new TreeMap<>(); // Sorted by column line
        Queue<Pair> q = new LinkedList<>();
        q.offer(new Pair(root, 0));

        while (!q.isEmpty()) {
            Pair p = q.poll();
            map.put(p.line, p.node.val);

            if (p.node.left != null) q.offer(new Pair(p.node.left, p.line - 1));
            if (p.node.right != null) q.offer(new Pair(p.node.right, p.line + 1));
        }

        for (int val : map.values()) {
            ans.add(val);
        }
        return ans;
    }
}`,
  python: `# Python: Bottom View of Binary Tree
# Time Complexity: O(N log N) | Space Complexity: O(N)
from collections import deque

def bottomView(root):
    if not root:
        return []

    line_map = {}
    q = deque([(root, 0)]) # (node, line)

    while q:
        node, line = q.popleft()
        line_map[line] = node.val

        if node.left:
            q.append((node.left, line - 1))
        if node.right:
            q.append((node.right, line + 1))

    return [line_map[k] for k in sorted(line_map.keys())]`,
  javascript: `// JavaScript: Bottom View of Binary Tree
// Time Complexity: O(N log N) | Space Complexity: O(N)
function bottomView(root) {
  if (!root) return [];
  const map = new Map();
  const q = [[root, 0]];

  while (q.length > 0) {
    const [node, line] = q.shift();
    map.set(line, node.val);

    if (node.left) q.push([node.left, line - 1]);
    if (node.right) q.push([node.right, line + 1]);
  }

  const sortedKeys = Array.from(map.keys()).sort((a, b) => a - b);
  return sortedKeys.map(k => map.get(k));
}`
};

const sampleTree = {
  val: 1,
  left: {
    val: 2,
    left: { val: 4, left: null, right: null },
    right: { val: 5, left: null, right: null }
  },
  right: {
    val: 3,
    left: null,
    right: { val: 6, left: null, right: null }
  }
};

export const steps = [
  {
    phase: 'INIT',
    title: '1. Root 1 at Coordinate Line 0: map[0] = 1',
    tree: sampleTree,
    activeVal: 1,
    visitedVals: [1],
    nodeLabels: { 1: 'col: 0' },
    customCard: {
      title: 'Vertical Column Map State',
      rows: [
        { label: 'Popped Node', value: 'Node 1 (line = 0)', accent: true },
        { label: 'Column Mapping', value: 'col 0 -> Node 1' },
        { label: 'Queue Enqueue', value: '2 (col -1), 3 (col +1)' },
        { label: 'Current Bottom View', value: '[1]' }
      ]
    },
    variables: {
      currNode: 1,
      currLine: 0,
      columnsMapped: '{ 0: 1 }',
      bottomViewList: '[1]'
    },
    metrics: [
      { label: 'Active Node', value: '1' },
      { label: 'Column Line', value: '0' },
      { label: 'Bottom View', value: '[1]', highlight: true }
    ],
    explain: 'Root 1 enqueued at horizontal coordinate 0. Mapped to column 0. Pushes left child 2 (col -1) and right child 3 (col +1).'
  },
  {
    phase: 'BFS_LEVEL_1',
    title: '2. Enqueue Children: Node 2 (col -1) & Node 3 (col +1)',
    tree: sampleTree,
    activeVal: 2,
    visitedVals: [1, 2, 3],
    nodeLabels: { 1: 'col: 0', 2: 'col: -1', 3: 'col: +1' },
    customCard: {
      title: 'Level 1 Column Expansion',
      rows: [
        { label: 'Node 2 Mapping', value: 'col -1 -> Node 2', accent: true },
        { label: 'Node 3 Mapping', value: 'col +1 -> Node 3', accent: true },
        { label: 'Current Columns', value: '[-1: 2, 0: 1, 1: 3]' },
        { label: 'Current Bottom View', value: '[2, 1, 3]' }
      ]
    },
    variables: {
      currNode: 2,
      currLine: -1,
      columnsMapped: '{ -1: 2, 0: 1, 1: 3 }',
      bottomViewList: '[2, 1, 3]'
    },
    metrics: [
      { label: 'Active Node', value: '2' },
      { label: 'Column Line', value: '-1' },
      { label: 'Bottom View', value: '[2, 1, 3]', highlight: true }
    ],
    explain: 'Node 2 is at col -1 and Node 3 is at col +1. Level 1 nodes expand the horizontal coordinate range to [-1, +1].'
  },
  {
    phase: 'OVERWRITE_COLUMN_0',
    title: '3. Process Node 5 (col 0): Overwrites Earlier Node 1!',
    tree: sampleTree,
    activeVal: 5,
    visitedVals: [1, 2, 3, 4, 5],
    nodeLabels: { 1: 'occluded', 2: 'col: -1', 3: 'col: +1', 4: 'col: -2', 5: 'col: 0 (new)' },
    customCard: {
      title: 'Column 0 Overwrite Event',
      rows: [
        { label: 'Incoming Node', value: 'Node 5 (child of 2 at line -1 + 1 = 0)', accent: true },
        { label: 'Collision at Col 0', value: 'Node 1 was at col 0; Node 5 is lower down' },
        { label: 'Action', value: 'map[0] updated from 1 to 5' },
        { label: 'Current Bottom View', value: '[4, 2, 5, 3]' }
      ]
    },
    variables: {
      currNode: 5,
      currLine: 0,
      columnsMapped: '{ -2: 4, -1: 2, 0: 5, 1: 3 }',
      bottomViewList: '[4, 2, 5, 3]'
    },
    metrics: [
      { label: 'Active Node', value: '5' },
      { label: 'Column Line', value: '0 (Overwritten)' },
      { label: 'Bottom View', value: '[4, 2, 5, 3]', highlight: true }
    ],
    explain: 'Node 5 is at column line 0. Because Node 5 appears in a later BFS tier than Node 1, it lies strictly lower down and occludes Node 1 from the bottom view!'
  },
  {
    phase: 'COMPLETE',
    title: '4. Process Node 6 (col +2): Final Bottom View = [4, 2, 5, 3, 6]',
    tree: sampleTree,
    activeVal: 6,
    visitedVals: [1, 2, 3, 4, 5, 6],
    nodeLabels: { 1: 'occluded', 2: 'col: -1', 3: 'col: +1', 4: 'col: -2', 5: 'col: 0', 6: 'col: +2' },
    customCard: {
      title: 'Bottom View Extraction Result',
      rows: [
        { label: 'Sorted Columns', value: '[-2, -1, 0, 1, 2]' },
        { label: 'Bottom View Nodes', value: '[4, 2, 5, 3, 6]', accent: true },
        { label: 'Occluded Nodes', value: 'Node 1 (occluded by Node 5 at col 0)' },
        { label: 'Runtime Complexity', value: 'O(N log N) with ordered map' }
      ]
    },
    variables: {
      currNode: 6,
      currLine: 2,
      columnsMapped: '{ -2: 4, -1: 2, 0: 5, 1: 3, 2: 6 }',
      bottomViewList: '[4, 2, 5, 3, 6]'
    },
    metrics: [
      { label: 'Active Node', value: '6' },
      { label: 'Total Columns', value: '5' },
      { label: 'Bottom View', value: '[4, 2, 5, 3, 6]', highlight: true }
    ],
    explain: 'Node 6 is mapped to col +2. Sorting vertical columns from -2 to +2 yields the complete bottom view: [4, 2, 5, 3, 6].'
  }
];
