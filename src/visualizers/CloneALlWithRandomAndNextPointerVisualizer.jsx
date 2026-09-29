export const rendererType = 'linked-list';

export const meta = {
  title: 'Clone List with Random and Next Pointer',
  category: 'Linked List',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) auxiliary (no hash map)',
  description: 'Creates a deep copy of a linked list where each node has a next and a random pointer, using a 3-step interleaved node insertion technique in O(N) time and O(1) auxiliary space.'
};

export const ideaMap = {
  title: 'Interleaved 3-Step Deep Copy',
  nodes: [
    {
      id: 'step1',
      label: 'Interleave Cloned Nodes',
      detail: 'Insert a cloned node directly after each original node: A -> A\' -> B -> B\'.'
    },
    {
      id: 'step2',
      label: 'Map Random Pointers',
      detail: 'Set curr.next.random = curr.random ? curr.random.next : null in O(1) space.'
    },
    {
      id: 'step3',
      label: 'Separate Lists',
      detail: 'Unweave original and cloned nodes to restore original list and return cloned head.'
    }
  ]
};

export const solutions = {
  cpp: `// C++ O(1) Auxiliary Space Cloning with Interleaved Nodes
#include <iostream>
using namespace std;

struct Node {
    int val;
    Node* next;
    Node* random;
    Node(int _val) : val(_val), next(nullptr), random(nullptr) {}
};

class Solution {
public:
    Node* copyRandomList(Node* head) {
        if (!head) return nullptr;

        // Step 1: Insert copy nodes interleaved: A -> A' -> B -> B'
        Node* curr = head;
        while (curr) {
            Node* copy = new Node(curr->val);
            copy->next = curr->next;
            curr->next = copy;
            curr = copy->next;
        }

        // Step 2: Assign random pointers to copy nodes
        curr = head;
        while (curr) {
            if (curr->random) {
                curr->next->random = curr->random->next;
            }
            curr = curr->next->next;
        }

        // Step 3: Separate original and cloned lists
        curr = head;
        Node* dummy = new Node(0);
        Node* copyCurr = dummy;

        while (curr) {
            Node* copy = curr->next;
            curr->next = copy->next;
            copyCurr->next = copy;
            copyCurr = copy;
            curr = curr->next;
        }

        Node* clonedHead = dummy->next;
        delete dummy;
        return clonedHead;
    }
};`,
  python: `# Python 3 O(1) Auxiliary Space Cloning with Interleaved Nodes
class Node:
    def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
        self.val = int(x)
        self.next = next
        self.random = random

class Solution:
    def copyRandomList(self, head: 'Node') -> 'Node':
        if not head:
            return None

        # Step 1: Interleave cloned nodes
        curr = head
        while curr:
            copy = Node(curr.val, curr.next)
            curr.next = copy
            curr = copy.next

        # Step 2: Copy random pointers
        curr = head
        while curr:
            if curr.random:
                curr.next.random = curr.random.next
            curr = curr.next.next

        # Step 3: Separate lists
        curr = head
        dummy = Node(0)
        copy_curr = dummy

        while curr:
            copy = curr.next
            curr.next = copy.next
            copy_curr.next = copy
            copy_curr = copy
            curr = curr.next

        return dummy.next`,
  java: `// Java O(1) Auxiliary Space Cloning with Interleaved Nodes
class Node {
    int val;
    Node next;
    Node random;
    public Node(int val) {
        this.val = val;
        this.next = null;
        this.random = null;
    }
}

public class Solution {
    public Node copyRandomList(Node head) {
        if (head == null) return null;

        // Step 1: Interleave
        Node curr = head;
        while (curr != null) {
            Node copy = new Node(curr.val);
            copy.next = curr.next;
            curr.next = copy;
            curr = copy.next;
        }

        // Step 2: Random pointers
        curr = head;
        while (curr != null) {
            if (curr.random != null) {
                curr.next.random = curr.random.next;
            }
            curr = curr.next.next;
        }

        // Step 3: Separate
        curr = head;
        Node dummy = new Node(0);
        Node copyCurr = dummy;

        while (curr != null) {
            Node copy = curr.next;
            curr.next = copy.next;
            copyCurr.next = copy;
            copyCurr = copy;
            curr = curr.next;
        }

        return dummy.next;
    }
}`,
  javascript: `// JavaScript O(1) Auxiliary Space Cloning with Interleaved Nodes
class Node {
  constructor(val, next = null, random = null) {
    this.val = val;
    this.next = next;
    this.random = random;
  }
}

function copyRandomList(head) {
  if (!head) return null;

  // Step 1: Interleave copy nodes
  let curr = head;
  while (curr) {
    const copy = new Node(curr.val, curr.next);
    curr.next = copy;
    curr = copy.next;
  }

  // Step 2: Wire random pointers
  curr = head;
  while (curr) {
    if (curr.random) {
      curr.next.random = curr.random.next;
    }
    curr = curr.next.next;
  }

  // Step 3: Separate lists
  curr = head;
  const dummy = new Node(0);
  let copyCurr = dummy;

  while (curr) {
    const copy = curr.next;
    curr.next = copy.next;
    copyCurr.next = copy;
    copyCurr = copy;
    curr = curr.next;
  }

  return dummy.next;
}`
};

export const steps = [
  {
    title: 'Original List with Random References',
    phase: 'SETUP',
    nodes: [
      { id: 0, val: 1, pointers: ['head', 'random->3'] },
      { id: 1, val: 2, pointers: ['random->1'] },
      { id: 2, val: 3, pointers: ['random->2'] }
    ],
    pointers: { head: 0 },
    variables: { 'Node 1.random': 'Node 3', 'Node 2.random': 'Node 1', 'Node 3.random': 'Node 2' },
    metrics: [
      { label: 'Original Nodes', value: '3' },
      { label: 'Random Pointers', value: '3' },
      { label: 'Space Constraint', value: 'O(1) No Map' }
    ],
    explain: 'Original linked list: Node 1 (random -> 3), Node 2 (random -> 1), Node 3 (random -> 2). We must deep clone without a hash map.',
    action: 'Begin 3-step interleaved deep copying.',
    intuition: 'Interleaving copy nodes immediately after originals preserves relative positions in O(1) auxiliary memory.',
    formula: 'copy.next = curr.next; curr.next = copy;'
  },
  {
    title: 'Step 1: Interleave Cloned Nodes (A -> A\' -> B -> B\')',
    phase: 'INTERLEAVE',
    nodes: [
      { id: 0, val: 1, pointers: ['orig1'] },
      { id: '1c', val: '1\'', pointers: ['copy1'], isHighlighted: true },
      { id: 1, val: 2, pointers: ['orig2'] },
      { id: '2c', val: '2\'', pointers: ['copy2'], isHighlighted: true },
      { id: 2, val: 3, pointers: ['orig3'] },
      { id: '3c', val: '3\'', pointers: ['copy3'], isHighlighted: true }
    ],
    pointers: { orig1: 0, copy1: 1, orig2: 2, copy2: 3, orig3: 4, copy3: 5 },
    highlightIndices: [1, 3, 5],
    variables: { interleavedChains: '1 -> 1\' -> 2 -> 2\' -> 3 -> 3\'', copyCount: 3 },
    metrics: [
      { label: 'Interleaved Size', value: '6 nodes' },
      { label: 'Copies Created', value: '3 nodes' },
      { label: 'Phase', value: 'Interleaving Done' }
    ],
    explain: 'Insert each clone node directly after its original: 1 -> 1\' -> 2 -> 2\' -> 3 -> 3\'.',
    action: 'Interleave copy nodes for each element.',
    intuition: 'For any original node curr, its clone is always accessible at curr.next.',
    formula: 'curr.next.random = curr.random.next'
  },
  {
    title: 'Step 2: Assign Cloned Random Pointers',
    phase: 'CONNECT_RANDOM',
    nodes: [
      { id: 0, val: 1, pointers: [] },
      { id: '1c', val: '1\'', pointers: ['random->3\''], isHighlighted: true, isModified: true },
      { id: 1, val: 2, pointers: [] },
      { id: '2c', val: '2\'', pointers: ['random->1\''], isHighlighted: true, isModified: true },
      { id: 2, val: 3, pointers: [] },
      { id: '3c', val: '3\'', pointers: ['random->2\''], isHighlighted: true, isModified: true }
    ],
    pointers: { copy1: 1, copy2: 3, copy3: 5 },
    highlightIndices: [1, 3, 5],
    variables: { '1\'.random': '3\'', '2\'.random': '1\'', '3\'.random': '2\'' },
    metrics: [
      { label: '1\'.random', value: '3\'' },
      { label: '2\'.random', value: '1\'' },
      { label: '3\'.random', value: '2\'' }
    ],
    customCard: {
      title: 'Random Pointer Translation',
      rows: [
        { label: 'Rule', value: 'curr.next.random = curr.random.next', accent: true },
        { label: 'Node 1\'', value: '1.random is 3 => 3.next is 3\' => 1\'.random = 3\'' },
        { label: 'Node 2\'', value: '2.random is 1 => 1.next is 1\' => 2\'.random = 1\'' },
        { label: 'Node 3\'', value: '3.random is 2 => 2.next is 2\' => 3\'.random = 2\'' }
      ]
    },
    explain: 'Wire random pointers: curr.next.random = curr.random ? curr.random.next : null. Clones now mirror all cross-references.',
    action: 'Assign random references for all cloned nodes.',
    intuition: 'Because copy of X is X.next, curr.random.next gives the exact clone in O(1) time.',
    formula: 'curr.next.random = curr.random.next'
  },
  {
    title: 'Step 3: Unweave and Separate Cloned List',
    phase: 'SEPARATE',
    nodes: [
      { id: 0, val: 1, pointers: ['origHead'] },
      { id: 1, val: 2, pointers: [] },
      { id: 2, val: 3, pointers: ['origTail'] }
    ],
    auxiliaryNodes: [
      { id: '1c', val: '1\'', pointers: ['clonedHead', 'rand->3\''], isHighlighted: true },
      { id: '2c', val: '2\'', pointers: ['rand->1\''], isHighlighted: true },
      { id: '3c', val: '3\'', pointers: ['clonedTail', 'rand->2\''], isHighlighted: true }
    ],
    auxiliaryLabel: 'Deep Cloned List (Fully Isolated)',
    pointers: { origHead: 0, origTail: 2 },
    variables: { originalRestored: '1 -> 2 -> 3', clonedGenerated: '1\' -> 2\' -> 3\'' },
    metrics: [
      { label: 'Original', value: 'Preserved' },
      { label: 'Clone', value: 'Deep Copied' },
      { label: 'Aux Space', value: 'O(1) Constant' }
    ],
    explain: 'Unweave the interleaved chains: restore curr.next = copy.next and build dummy.next = copy. Original list is restored and clone is completely detached.',
    action: 'Unweave original and cloned nodes.',
    intuition: 'Both lists are now fully independent with intact next and random pointers.',
    formula: 'curr.next = copy.next; copy.next = copy.next ? copy.next.next : null;'
  },
  {
    title: 'Deep Cloning Complete in O(1) Aux Space',
    phase: 'COMPLETED',
    nodes: [
      { id: '1c', val: '1\'', pointers: ['head', 'rand->3\''], isHighlighted: true },
      { id: '2c', val: '2\'', pointers: ['rand->1\''], isHighlighted: true },
      { id: '3c', val: '3\'', pointers: ['tail', 'rand->2\''], isHighlighted: true }
    ],
    pointers: { head: 0, tail: 2 },
    variables: { result: '1\' -> 2\' -> 3\'', time: 'O(N)', space: 'O(1)' },
    metrics: [
      { label: 'Cloned Nodes', value: '3' },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Auxiliary Memory', value: 'O(1)' }
    ],
    customCard: {
      title: 'Cloning Execution Summary',
      rows: [
        { label: 'Interleaving Pass', value: 'Created copy nodes in O(N) time' },
        { label: 'Random Linking Pass', value: 'Mapped cross pointers in O(N) time' },
        { label: 'Unweaving Pass', value: 'Separated lists and restored original in O(N) time', accent: true },
        { label: 'Memory Advantage', value: 'O(1) extra space vs O(N) for hash map' }
      ]
    },
    explain: 'Deep copy of the linked list with random pointers is complete. Zero hash map allocations were needed.',
    action: 'Return clonedHead.',
    intuition: 'Interleaving nodes allows using the linked list itself as an in-place mapping table.',
    formula: 'Result: Complete Deep Copy Returned'
  }
];
