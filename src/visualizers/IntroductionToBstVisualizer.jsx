export const rendererType = 'tree';

export const meta = {
  title: 'Introduction to Binary Search Trees (BST)',
  category: 'Binary Search Trees',
  difficulty: 'Easy',
  timeComplexity: 'O(H) search, O(N) traversal',
  spaceComplexity: 'O(H) recursion stack',
  description: 'Explores foundational properties of Binary Search Trees (BST): Left Subtree < Root < Right Subtree, logarithmic search pruning, and why Inorder traversal yields a strictly ascending sorted stream.'
};

export const ideaMap = [
  {
    id: 'bst-invariant',
    title: 'Core BST Ordering Invariant',
    description: 'For any node X, all values in X.left are strictly less than X.val, and all values in X.right are strictly greater than X.val.'
  },
  {
    id: 'logarithmic-pruning',
    title: 'Binary Search Pruning O(H)',
    description: 'A single comparison against the current node eliminates half of the remaining subtrees, achieving O(log N) average search time.'
  },
  {
    id: 'inorder-sorted-property',
    title: 'Inorder Unrolling Property',
    description: 'Visiting nodes in Left-Root-Right order recursively produces elements in strictly ascending numerical sequence.'
  },
  {
    id: 'height-complexity',
    title: 'Height Dependency O(H)',
    description: 'Operations depend on tree height H. Balanced trees achieve H = O(log N), while degenerate trees degrade to linear chains O(N).'
  },
  {
    id: 'no-duplicates-convention',
    title: 'Strict Distinct Key Invariant',
    description: 'Standard BST definitions enforce strictly distinct keys. Duplicates are either prohibited or mapped to frequency counters.'
  }
];

export const solutions = {
  cpp: `// C++: BST Search & Inorder Traversal
// Time: O(H) Search | Space: O(H) Stack
class Solution {
public:
    TreeNode* searchBST(TreeNode* root, int val) {
        while (root != nullptr && root->val != val) {
            if (val < root->val) {
                root = root->left;  // Prune right subtree
            } else {
                root = root->right; // Prune left subtree
            }
        }
        return root;
    }

    void inorder(TreeNode* root, vector<int>& res) {
        if (!root) return;
        inorder(root->left, res);
        res.push_back(root->val);
        inorder(root->right, res);
    }
};`,
  java: `// Java: BST Search & Inorder Traversal
class Solution {
    public TreeNode searchBST(TreeNode root, int val) {
        while (root != null && root.val != val) {
            root = (val < root.val) ? root.left : root.right;
        }
        return root;
    }

    public void inorder(TreeNode root, List<Integer> res) {
        if (root == null) return;
        inorder(root.left, res);
        res.add(root.val);
        inorder(root.right, res);
    }
}`,
  python: `# Python 3: BST Search & Inorder Traversal
class Solution:
    def searchBST(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:
        curr = root
        while curr and curr.val != val:
            curr = curr.left if val < curr.val else curr.right
        return curr

    def inorder(self, root: Optional[TreeNode]) -> List[int]:
        res = []
        def dfs(node):
            if not node:
                return
            dfs(node.left)
            res.append(node.val)
            dfs(node.right)
        dfs(root)
        return res`,
  javascript: `// JavaScript: BST Search & Inorder Traversal
function searchBST(root, val) {
    let curr = root;
    while (curr !== null && curr.val !== val) {
        curr = val < curr.val ? curr.left : curr.right;
    }
    return curr;
}

function inorder(root, res = []) {
    if (!root) return res;
    inorder(root.left, res);
    res.push(root.val);
    inorder(root.right, res);
    return res;
}`
};

const baseTree = {
  val: 8,
  left: {
    val: 3,
    left: { val: 1 },
    right: { val: 6, left: { val: 4 }, right: { val: 7 } }
  },
  right: {
    val: 10,
    right: { val: 14, left: { val: 13 } }
  }
};

export const steps = [
  {
    stepIndex: 1,
    title: 'The Binary Search Tree Ordering Invariant',
    explanation: 'BST property: for every node, left subtree < node < right subtree. Root = 8. Left subtree contains {1, 3, 4, 6, 7}; right subtree contains {10, 13, 14}.',
    activeLine: 6,
    activeIdeaId: 'bst-invariant',
    tree: baseTree,
    activeVal: 8,
    nodeLabels: { 8: 'Root', 3: '< 8', 10: '> 8' },
    traversal: [],
    variables: { root: 8, height: 4, property: 'Left < Node < Right' },
    customCard: {
      title: 'Structural Invariant',
      rows: [
        { label: 'Root Value', value: '8' },
        { label: 'Left Subtree Range', value: 'All values < 8' },
        { label: 'Right Subtree Range', value: 'All values > 8' },
        { label: 'Total Nodes', value: '8 nodes' }
      ]
    }
  },
  {
    stepIndex: 2,
    title: 'Search Query: Key = 6 (Start at Root 8)',
    explanation: 'Begin search for Key = 6 at root (8). Since 6 < 8, the target cannot exist in the right subtree. Prune entire right subtree and branch left to Node 3.',
    activeLine: 9,
    activeIdeaId: 'logarithmic-pruning',
    tree: baseTree,
    activeVal: 8,
    nodeLabels: { 8: '6 < 8 (Go Left)', 3: 'Next' },
    traversal: [],
    variables: { searchKey: 6, current: 8, comparison: '6 < 8', action: 'Branch Left' },
    customCard: {
      title: 'Comparison 1: Root Node',
      rows: [
        { label: 'Current Node', value: '8' },
        { label: 'Key Comparison', value: '6 < 8 (Go Left)', accent: true },
        { label: 'Subtree Pruned', value: 'Entire right subtree {10, 13, 14} eliminated' },
        { label: 'Remaining Nodes', value: '5 of 8 nodes' }
      ]
    }
  },
  {
    stepIndex: 3,
    title: 'At Node 3: Compare 6 > 3 (Branch Right)',
    explanation: 'Current node is 3. Compare: 6 > 3. Target cannot exist in left subtree of 3. Prune {1} and branch right to Node 6.',
    activeLine: 11,
    activeIdeaId: 'logarithmic-pruning',
    tree: baseTree,
    activeVal: 3,
    visitedVals: [8],
    nodeLabels: { 8: 'Visited', 3: '6 > 3 (Go Right)', 6: 'Next' },
    traversal: [],
    variables: { searchKey: 6, current: 3, comparison: '6 > 3', action: 'Branch Right' },
    customCard: {
      title: 'Comparison 2: Left Child',
      rows: [
        { label: 'Current Node', value: '3' },
        { label: 'Key Comparison', value: '6 > 3 (Go Right)', accent: true },
        { label: 'Subtree Pruned', value: 'Left subtree {1} eliminated' },
        { label: 'Remaining Candidates', value: '{6, 4, 7}' }
      ]
    }
  },
  {
    stepIndex: 4,
    title: 'At Node 6: Key == Node.val (Target Found!)',
    explanation: 'Current node is 6. 6 == 6! Target located in only 3 comparisons instead of inspecting all 8 nodes.',
    activeLine: 14,
    activeIdeaId: 'logarithmic-pruning',
    tree: baseTree,
    activeVal: 6,
    targetVal: 6,
    visitedVals: [8, 3],
    nodeLabels: { 8: 'Visited', 3: 'Visited', 6: 'FOUND!' },
    traversal: [],
    variables: { searchKey: 6, current: 6, status: 'MATCH FOUND', comparisons: 3 },
    customCard: {
      title: 'Target Located',
      rows: [
        { label: 'Match Found', value: 'Node 6 matches search key 6', accent: true },
        { label: 'Comparisons Needed', value: '3 comparisons (Height bound O(H))' },
        { label: 'Linear Search Cost', value: 'Up to 8 comparisons avoided' },
        { label: 'Path Traversed', value: '8 -> 3 -> 6' }
      ]
    }
  },
  {
    stepIndex: 5,
    title: 'Inorder Traversal: Leftmost Minimum First',
    explanation: 'Inorder traversal visits Left -> Root -> Right. Deepest left node is Node 1. Output stream begins: [1].',
    activeLine: 18,
    activeIdeaId: 'inorder-sorted-property',
    tree: baseTree,
    activeVal: 1,
    targetVal: 1,
    nodeLabels: { 1: '1st (Min)' },
    traversal: [1],
    traversalLabel: 'Inorder Traversal Stream (Sorted)',
    variables: { visited: 1, current: 1, inorderStream: '[1]' },
    customCard: {
      title: 'Inorder Step 1',
      rows: [
        { label: 'Traversal Order', value: 'Left -> Root -> Right' },
        { label: 'Deepest Left Node', value: 'Node 1 (Global Minimum)', accent: true },
        { label: 'Stream Output', value: '[1]' }
      ]
    }
  },
  {
    stepIndex: 6,
    title: 'Inorder Traversal Unrolls: [1, 3, 4, 6, 7]',
    explanation: 'After 1: visit parent 3, then 3.right (6 subtree). In 6 subtree: left 4 -> root 6 -> right 7. Stream: [1, 3, 4, 6, 7].',
    activeLine: 19,
    activeIdeaId: 'inorder-sorted-property',
    tree: baseTree,
    activeVal: 7,
    visitedVals: [1, 3, 4, 6],
    highlightedVals: [7],
    traversal: [1, 3, 4, 6, 7],
    traversalLabel: 'Inorder Traversal Stream (Sorted)',
    variables: { leftSubtree: 'Done', streamCount: 5 },
    customCard: {
      title: 'Left Subtree Fully Streamed',
      rows: [
        { label: 'Visited Chain', value: '1 -> 3 -> 4 -> 6 -> 7', accent: true },
        { label: 'Observation', value: 'Every successive element is strictly larger' },
        { label: 'Next Node in Order', value: 'Root 8' }
      ]
    }
  },
  {
    stepIndex: 7,
    title: 'Visit Root 8 and Traverse Right Subtree',
    explanation: 'Visit root 8, then traverse right subtree: 10 -> 13 -> 14. All 8 nodes streamed in perfect ascending order.',
    activeLine: 20,
    activeIdeaId: 'inorder-sorted-property',
    tree: baseTree,
    activeVal: 14,
    visitedVals: [1, 3, 4, 6, 7, 8, 10, 13],
    highlightedVals: [14],
    traversal: [1, 3, 4, 6, 7, 8, 10, 13, 14],
    traversalLabel: 'Inorder Traversal Stream (Sorted)',
    variables: { completedNodes: 8, isSorted: 'TRUE' },
    customCard: {
      title: 'Right Subtree Streamed',
      rows: [
        { label: 'Right Subtree Sequence', value: '10 -> 13 -> 14' },
        { label: 'Complete Stream', value: '[1, 3, 4, 6, 7, 8, 10, 13, 14]', accent: true },
        { label: 'Sorted Guarantee', value: 'Strictly increasing' }
      ]
    }
  },
  {
    stepIndex: 8,
    title: 'Summary: The Power of BSTs',
    explanation: 'BST combines fast O(log N) lookup, insertion, and deletion with effortless sorted in-order unrolling in O(N) time.',
    activeLine: 24,
    activeIdeaId: 'height-complexity',
    tree: baseTree,
    activeVal: 8,
    traversal: [1, 3, 4, 6, 7, 8, 10, 13, 14],
    variables: { searchCost: 'O(log N)', traversalCost: 'O(N)', space: 'O(H)' },
    customCard: {
      title: 'BST Operational Complexity',
      rows: [
        { label: 'Search Complexity', value: 'O(H) = O(log N) balanced', accent: true },
        { label: 'Insert / Delete', value: 'O(H) = O(log N)' },
        { label: 'Inorder Traversal', value: 'O(N) yields sorted list' },
        { label: 'Auxiliary Memory', value: 'O(H) recursion stack' }
      ]
    }
  }
];
