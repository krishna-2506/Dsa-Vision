export const rendererType = 'linked-list';

export const meta = {
  title: 'Middle of a Linked List (Tortoise & Hare Method)',
  category: 'Linked List & Two Pointers',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Finds the middle node of a singly linked list in a single pass using the Tortoise and Hare algorithm where fast pointer advances by 2 while slow pointer advances by 1.'
};

export const ideaMap = [
  {
    id: 'two-speed-ratio',
    title: 'Two-to-One Speed Ratio',
    description: 'Because fast travels at 2x the speed of slow, whenever fast reaches the end of the list (distance N), slow has traveled exactly distance N/2.'
  },
  {
    id: 'odd-termination',
    title: 'Odd Length Termination',
    description: 'If N is odd, fast terminates exactly on the last node (fast.next == null). Slow rests at the exact unique middle node.'
  },
  {
    id: 'even-termination',
    title: 'Even Length Termination',
    description: 'If N is even, fast hops past the last node to NULL (fast == null). Slow lands on the second middle node, conforming to standard LeetCode conventions.'
  },
  {
    id: 'single-pass-efficiency',
    title: 'Strict Single Pass',
    description: 'Eliminates the two-pass approach (counting length then iterating N/2). Finds the middle node in N/2 iterations.'
  },
  {
    id: 'constant-space',
    title: 'O(1) Auxiliary Memory',
    description: 'Requires only two node reference pointers (slow and fast) with zero memory reallocation.'
  }
];

export const solutions = {
  cpp: `// C++: Tortoise and Hare (Slow & Fast Pointers)
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
public:
    ListNode* middleNode(ListNode* head) {
        ListNode* slow = head;
        ListNode* fast = head;

        while (fast != nullptr && fast->next != nullptr) {
            slow = slow->next;       // 1 step
            fast = fast->next->next; // 2 steps
        }

        return slow; // Middle node
    }
};`,
  java: `// Java: Tortoise and Hare (Slow & Fast Pointers)
class Solution {
    public ListNode middleNode(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        return slow;
    }
}`,
  python: `# Python 3: Tortoise and Hare
class Solution:
    def middleNode(self, head: Optional[ListNode]) -> Optional[ListNode]:
        slow = fast = head

        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

        return slow`,
  javascript: `// JavaScript: Tortoise and Hare
function middleNode(head) {
    let slow = head;
    let fast = head;

    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    return slow;
}`
};

export const steps = [
  {
    stepIndex: 1,
    title: 'Initialize Slow and Fast Pointers at Head',
    explanation: 'Linked list nodes: [1 -> 2 -> 3 -> 4 -> 5 -> 6]. Initialize slow = head (node 1) and fast = head (node 1).',
    activeLine: 6,
    activeIdeaId: 'two-speed-ratio',
    nodes: [1, 2, 3, 4, 5, 6],
    pointers: { head: 0, slow: 0, fast: 0 },
    highlightIndices: [0],
    variables: { slow: 'Node(1)', fast: 'Node(1)', stepCount: 0 },
    customCard: {
      title: 'Initial Position',
      rows: [
        { label: 'List Length', value: '6 (Even)' },
        { label: 'slow pointer', value: 'node[0] (val=1)' },
        { label: 'fast pointer', value: 'node[0] (val=1)' },
        { label: 'Loop Check', value: 'fast != null && fast.next != null (True)' }
      ]
    }
  },
  {
    stepIndex: 2,
    title: 'Iteration 1: Slow -> Node 2, Fast -> Node 3',
    explanation: 'slow advances 1 step from node 1 to node 2. fast advances 2 steps from node 1 to node 3.',
    activeLine: 9,
    activeIdeaId: 'two-speed-ratio',
    nodes: [1, 2, 3, 4, 5, 6],
    pointers: { head: 0, slow: 1, fast: 2 },
    highlightIndices: [1, 2],
    variables: { slow: 'Node(2)', fast: 'Node(3)', stepCount: 1 },
    customCard: {
      title: 'First Hop (2:1 Ratio)',
      rows: [
        { label: 'slow', value: 'node 2 (index 1)' },
        { label: 'fast', value: 'node 3 (index 2)' },
        { label: 'Loop Condition', value: 'fast.next != null (True)' }
      ]
    }
  },
  {
    stepIndex: 3,
    title: 'Iteration 2: Slow -> Node 3, Fast -> Node 5',
    explanation: 'slow advances 1 step to node 3. fast advances 2 steps across node 4 to node 5.',
    activeLine: 10,
    activeIdeaId: 'two-speed-ratio',
    nodes: [1, 2, 3, 4, 5, 6],
    pointers: { head: 0, slow: 2, fast: 4 },
    highlightIndices: [2, 4],
    variables: { slow: 'Node(3)', fast: 'Node(5)', stepCount: 2 },
    customCard: {
      title: 'Second Hop',
      rows: [
        { label: 'slow position', value: 'node 3 (index 2)' },
        { label: 'fast position', value: 'node 5 (index 4)' },
        { label: 'Upcoming', value: 'fast is one node away from list tail' }
      ]
    }
  },
  {
    stepIndex: 4,
    title: 'Iteration 3: Slow -> Node 4, Fast -> NULL',
    explanation: 'slow advances 1 step to node 4. fast advances 2 steps past node 6 into NULL. Loop condition fails.',
    activeLine: 9,
    activeIdeaId: 'even-termination',
    nodes: [1, 2, 3, 4, 5, 6],
    pointers: { head: 0, slow: 3 },
    highlightIndices: [3],
    variables: { slow: 'Node(4)', fast: 'NULL', stepCount: 3 },
    customCard: {
      title: 'Fast Pointer Exits (Even Length)',
      rows: [
        { label: 'fast', value: 'NULL (hopped past node 6)' },
        { label: 'slow', value: 'node 4 (val=4)', accent: true },
        { label: 'Loop Check', value: 'fast == null -> Loop Terminates' }
      ]
    }
  },
  {
    stepIndex: 5,
    title: 'Middle Node Identified: Node 4 (Second Middle)',
    explanation: 'For an even length list of 6 nodes, the two middle candidates are 3 and 4. Standard definition returns the second middle (node 4).',
    activeLine: 13,
    activeIdeaId: 'even-termination',
    nodes: [1, 2, 3, 4, 5, 6],
    pointers: { head: 0, slow: 3 },
    highlightIndices: [3],
    modifiedIndices: [3],
    variables: { middleNode: 'Node(4)', value: 4 },
    customCard: {
      title: 'Result Verification',
      rows: [
        { label: 'Middle Node Value', value: '4', accent: true },
        { label: 'Sublist from Middle', value: '4 -> 5 -> 6 -> NULL' },
        { label: 'Total Iterations', value: '3 steps (N/2)' }
      ]
    }
  },
  {
    stepIndex: 6,
    title: 'Proof for Odd Length Lists (N = 5)',
    explanation: 'Consider odd list [1, 2, 3, 4, 5]. Step 1: slow=2, fast=3. Step 2: slow=3, fast=5. fast.next is NULL, terminating with slow exactly at node 3.',
    activeLine: 8,
    activeIdeaId: 'odd-termination',
    nodes: [1, 2, 3, 4, 5],
    pointers: { head: 0, slow: 2, fast: 4 },
    highlightIndices: [2, 4],
    variables: { slow: 'Node(3)', fast: 'Node(5) (tail)' },
    customCard: {
      title: 'Odd Length Behavior',
      rows: [
        { label: 'Odd Count Termination', value: 'fast.next == NULL' },
        { label: 'Exact Middle Node', value: 'Node 3 (index 2)' },
        { label: 'Equidistant', value: '2 nodes before, 2 nodes after' }
      ]
    }
  },
  {
    stepIndex: 7,
    title: 'Complexity Comparison: 1-Pass vs 2-Pass',
    explanation: '2-pass approach visits N nodes to count length + N/2 nodes to locate middle = 1.5N operations. Tortoise & Hare visits exactly N nodes in a single forward sweep.',
    activeLine: 8,
    activeIdeaId: 'single-pass-efficiency',
    nodes: [1, 2, 3, 4, 5, 6],
    pointers: { head: 0, slow: 3 },
    highlightIndices: [3],
    variables: { onePassOps: 'N', twoPassOps: '1.5N', speedup: '33% fewer reads' },
    customCard: {
      title: 'Algorithmic Efficiency',
      rows: [
        { label: 'Tortoise & Hare', value: 'O(N) time, 1 pass' },
        { label: 'Length-Count method', value: 'O(N) time, 2 passes' },
        { label: 'Auxiliary Memory', value: 'O(1) (2 pointers)' }
      ]
    }
  },
  {
    stepIndex: 8,
    title: 'Algorithm Complete: Return Slow Pointer',
    explanation: 'Return slow pointer referencing Node 4. Time complexity is O(N) and auxiliary space complexity is O(1).',
    activeLine: 13,
    activeIdeaId: 'constant-space',
    nodes: [1, 2, 3, 4, 5, 6],
    pointers: { middle: 3 },
    highlightIndices: [3],
    modifiedIndices: [3],
    variables: { result: 'Node(4)', time: 'O(N)', space: 'O(1)' },
    customCard: {
      title: 'Final Summary',
      rows: [
        { label: 'Returned Node', value: 'Node(4)', accent: true },
        { label: 'Time Complexity', value: 'O(N) Linear' },
        { label: 'Space Complexity', value: 'O(1) Constant' }
      ]
    }
  }
];
