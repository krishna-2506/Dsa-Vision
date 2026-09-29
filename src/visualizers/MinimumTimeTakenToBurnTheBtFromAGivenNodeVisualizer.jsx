export const rendererType = 'tree';

export const meta = {
  title: 'Minimum Time to Burn Binary Tree',
  category: 'Binary Trees',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) parent map & BFS queue',
  description: 'Calculates the minimum time required to burn an entire binary tree starting from a designated target node. Maps parent pointers via an initial BFS, then simulates radial fire spread (left, right, parent) using multi-directional level-order BFS.'
};

export const ideaMap = {
  title: 'Radial Burning BFS Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Parent Pointer Mapping',
      detail: 'Traverse the tree with BFS to build parentMap[child] = parent, converting the directed tree into an undirected graph.'
    },
    {
      id: 'step2',
      label: 'Target Node Ignition (t = 0)',
      detail: 'Locate the start node and enqueue it into burnQueue with visited set initialized to {target}.'
    },
    {
      id: 'step3',
      label: '3-Way Radial Spread',
      detail: 'At each time second, pop all currently burning nodes and spread to unburned left child, right child, and parent.'
    },
    {
      id: 'step4',
      label: 'Total Burn Time',
      detail: 'Increment timer for each wave that burns at least one new node until all tree vertices are engulfed.'
    }
  ]
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

                // 3 Directions: Left, Right, Parent
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
// Time Complexity: O(N) | Space Complexity: O(N)
import java.util.*;

class Solution {
    private TreeNode mapParents(TreeNode root, Map<TreeNode, TreeNode> parentMap, int start) {
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        TreeNode target = null;

        while (!q.isEmpty()) {
            TreeNode curr = q.poll();
            if (curr.val == start) target = curr;

            if (curr.left != null) {
                parentMap.put(curr.left, curr);
                q.offer(curr.left);
            }
            if (curr.right != null) {
                parentMap.put(curr.right, curr);
                q.offer(curr.right);
            }
        }
        return target;
    }

    public int minTimeToBurn(TreeNode root, int start) {
        Map<TreeNode, TreeNode> parentMap = new HashMap<>();
        TreeNode target = mapParents(root, parentMap, start);

        Queue<TreeNode> q = new LinkedList<>();
        Set<TreeNode> visited = new HashSet<>();
        q.offer(target);
        visited.add(target);
        int time = 0;

        while (!q.isEmpty()) {
            int size = q.size();
            boolean burnedNew = false;

            for (int i = 0; i < size; i++) {
                TreeNode curr = q.poll();

                if (curr.left != null && !visited.contains(curr.left)) {
                    burnedNew = true;
                    visited.add(curr.left);
                    q.offer(curr.left);
                }
                if (curr.right != null && !visited.contains(curr.right)) {
                    burnedNew = true;
                    visited.add(curr.right);
                    q.offer(curr.right);
                }
                if (parentMap.containsKey(curr) && !visited.contains(parentMap.get(curr))) {
                    burnedNew = true;
                    visited.add(parentMap.get(curr));
                    q.offer(parentMap.get(curr));
                }
            }
            if (burnedNew) time++;
        }
        return time;
    }
}`,
  python: `# Python: Minimum Time to Burn Binary Tree
# Time Complexity: O(N) | Space Complexity: O(N)
from collections import deque

def minTimeToBurn(root, start):
    parent_map = {}
    target = None
    q = deque([root])

    # Pass 1: Map parent references
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

    # Pass 2: Radial BFS fire spread
    burn_q = deque([target])
    visited = {target}
    time = 0

    while burn_q:
        burned_new = False
        for _ in range(len(burn_q)):
            curr = burn_q.popleft()
            for neighbor in [curr.left, curr.right, parent_map.get(curr)]:
                if neighbor and neighbor not in visited:
                    visited.add(neighbor)
                    burn_q.append(neighbor)
                    burned_new = True
        if burned_new:
            time += 1

    return time`,
  javascript: `// JavaScript: Minimum Time to Burn Binary Tree
// Time Complexity: O(N) | Space Complexity: O(N)
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
    phase: 'IGNITE',
    title: '1. Ignition at t = 0: Fire Ignited at Target Node 2',
    tree: sampleTree,
    activeVal: 2,
    visitedVals: [2],
    nodeLabels: { 2: 'Ignited (t=0)' },
    customCard: {
      title: 'Target Ignition & Parent Map',
      rows: [
        { label: 'Target Node', value: 'Node 2 (Ignition Origin)', accent: true },
        { label: 'Parent Mapping', value: '2 -> 1, 4 -> 2, 5 -> 2, 3 -> 1, 6 -> 3' },
        { label: 'Burning Set', value: '{ Node 2 }' },
        { label: 'Elapsed Time', value: 't = 0 sec' }
      ]
    },
    variables: {
      time: 0,
      activeFireWave: '[2]',
      newlyBurned: '[2]',
      totalBurned: 1
    },
    metrics: [
      { label: 'Time Elapsed', value: '0s' },
      { label: 'Active Fire', value: 'Node 2' },
      { label: 'Burned Count', value: '1 / 6', highlight: true }
    ],
    explain: 'Parent references have been mapped via initial BFS. At time t = 0, fire is ignited at target Node 2.'
  },
  {
    phase: 'SPREAD_T1',
    title: '2. Time t = 1: Fire Spreads 3-Ways to Parent (1) & Children (4, 5)',
    tree: sampleTree,
    activeVal: 2,
    visitedVals: [2, 1, 4, 5],
    nodeLabels: { 2: 'Burned', 1: 'Burned (t=1)', 4: 'Burned (t=1)', 5: 'Burned (t=1)' },
    customCard: {
      title: 'Radial Spread at t = 1',
      rows: [
        { label: 'Spread Source', value: 'Node 2' },
        { label: 'Upward to Parent', value: 'Node 1 (parent of 2)', accent: true },
        { label: 'Downward to Children', value: 'Node 4 (left), Node 5 (right)', accent: true },
        { label: 'Newly Engulfed', value: '{ 1, 4, 5 }' }
      ]
    },
    variables: {
      time: 1,
      activeFireWave: '[1, 4, 5]',
      newlyBurned: '[1, 4, 5]',
      totalBurned: 4
    },
    metrics: [
      { label: 'Time Elapsed', value: '1s' },
      { label: 'Wave Size', value: '3 nodes' },
      { label: 'Burned Count', value: '4 / 6', highlight: true }
    ],
    explain: 'At t = 1, fire spreads simultaneously to unburned adjacent neighbors: parent 1, left child 4, and right child 5.'
  },
  {
    phase: 'SPREAD_T2',
    title: '3. Time t = 2: Fire Reaches Node 3 via Parent (1)',
    tree: sampleTree,
    activeVal: 3,
    visitedVals: [2, 1, 4, 5, 3],
    nodeLabels: { 2: 'Burned', 1: 'Burned', 4: 'Burned', 5: 'Burned', 3: 'Burned (t=2)' },
    customCard: {
      title: 'Radial Spread at t = 2',
      rows: [
        { label: 'Spread Source', value: 'Node 1 (right branch)' },
        { label: 'Infected Node', value: 'Node 3 (right child of 1)', accent: true },
        { label: 'Leaf Nodes 4 & 5', value: 'No unvisited neighbors' },
        { label: 'Newly Engulfed', value: '{ 3 }' }
      ]
    },
    variables: {
      time: 2,
      activeFireWave: '[3]',
      newlyBurned: '[3]',
      totalBurned: 5
    },
    metrics: [
      { label: 'Time Elapsed', value: '2s' },
      { label: 'Active Fire', value: 'Node 3' },
      { label: 'Burned Count', value: '5 / 6', highlight: true }
    ],
    explain: 'From Node 1, fire catches right child Node 3 at t = 2. Leaves 4 and 5 have no unburned neighbors.'
  },
  {
    phase: 'COMPLETE',
    title: '4. Time t = 3: Node 6 Engulfed & Entire Tree Burned in 3 Seconds!',
    tree: sampleTree,
    activeVal: 6,
    visitedVals: [2, 1, 4, 5, 3, 6],
    nodeLabels: { 1: 'Burned', 2: 'Burned', 3: 'Burned', 4: 'Burned', 5: 'Burned', 6: 'Burned (t=3)' },
    customCard: {
      title: 'Complete Tree Engulfed',
      rows: [
        { label: 'Final Burned Node', value: 'Node 6 (child of 3)', accent: true },
        { label: 'Total Burn Time', value: '3 seconds', accent: true },
        { label: 'Total Tree Nodes', value: 'All 6 nodes consumed' },
        { label: 'Time Complexity', value: 'O(N) parent mapping + O(N) BFS' }
      ]
    },
    variables: {
      time: 3,
      status: 'Entire Tree Burned',
      totalBurned: 6,
      minTimeToBurn: 3
    },
    metrics: [
      { label: 'Total Time', value: '3s', highlight: true },
      { label: 'Burned Count', value: '6 / 6' },
      { label: 'Status', value: 'Engulfed' }
    ],
    explain: 'At t = 3, fire from Node 3 burns Node 6. The entire tree is engulfed. Minimum time to burn the complete tree from target Node 2 is 3 seconds.'
  }
];
