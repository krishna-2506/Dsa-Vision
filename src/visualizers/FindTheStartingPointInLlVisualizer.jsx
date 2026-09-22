// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Find Starting Point of Loop in Linked List (Floyd Cycle II)',
  category: 'Linked List & Cycle Detection',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: "Finds the exact entry node of a cycle in a linked list using Floyd's two-phase algorithm. Phase 1 detects meeting point; Phase 2 resets one pointer to head and advances both by 1 step until they meet at the cycle entrance."
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Cycle Starting Point Strategy',
  nodes: [
    { id: 'root', label: 'Floyd Cycle II (Entry Detection)', children: ['phase1-detect', 'math-invariant', 'phase2-sync', 'entrance-found', 'complexity'] },
    { id: 'phase1-detect', label: '1. Phase 1: Meeting Detection', detail: 'Advance slow by 1 and fast by 2 until they collide at node M inside the loop.' },
    { id: 'math-invariant', label: '2. Distance Proof (L1 = C - d)', detail: 'Algebra proves distance from Head to Cycle Start equals distance from Meeting Point to Cycle Start.' },
    { id: 'phase2-sync', label: '3. Phase 2: Head Reset', detail: 'Reset slow to head; keep fast at meeting node M. Advance both at 1 step per turn.' },
    { id: 'entrance-found', label: '4. Entrance Convergence', detail: 'Because speeds and remaining distances are equal, they must collide exactly at the cycle entrance.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Completes in linear time O(N) using strictly O(1) auxiliary pointer memory.' }
  ]
};

export const solutions = {
  cpp: `// C++ Floyd's Cycle II: Find Starting Point of Loop
// Time Complexity: O(N) | Space Complexity: O(1)
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        if (!head || !head->next) return nullptr;

        ListNode *slow = head;
        ListNode *fast = head;

        // Phase 1: Detect whether a cycle exists
        while (fast != nullptr && fast->next != nullptr) {
            slow = slow->next;          // 1 step
            fast = fast->next->next;    // 2 steps

            if (slow == fast) {
                // Phase 2: Find the exact cycle entry point
                slow = head;            // Reset slow to head
                while (slow != fast) {  // Both move 1 step at a time
                    slow = slow->next;
                    fast = fast->next;
                }
                return slow;            // Entrance node where they meet!
            }
        }

        return nullptr; // No cycle found
    }
};`,
  python: `# Python 3 Floyd's Cycle II: Find Starting Point of Loop
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def detectCycle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return None

        slow = head
        fast = head

        # Phase 1: Locate meeting point in cycle
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

            if slow == fast:
                # Phase 2: Reset slow to head and move at equal pace
                slow = head
                while slow != fast:
                    slow = slow.next
                    fast = fast.next
                return slow             # Cycle start node

        return None`,
  java: `// Java Floyd's Cycle II: Find Starting Point of Loop
// Time Complexity: O(N) | Space Complexity: O(1)
public class Solution {
    public ListNode detectCycle(ListNode head) {
        if (head == null || head.next == null) return null;

        ListNode slow = head;
        ListNode fast = head;

        // Phase 1: Detect cycle meeting point
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;

            if (slow == fast) {
                // Phase 2: Synchronize from head
                slow = head;
                while (slow != fast) {
                    slow = slow.next;
                    fast = fast.next;
                }
                return slow;            // Collision at cycle start
            }
        }

        return null;
    }
}`,
  javascript: `// JavaScript Floyd's Cycle II: Find Starting Point of Loop
// Time Complexity: O(N) | Space Complexity: O(1)
var detectCycle = function(head) {
    if (!head || !head.next) return null;

    let slow = head;
    let fast = head;

    // Phase 1: Locate meeting point
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            // Phase 2: Synchronize from head
            slow = head;
            while (slow !== fast) {
                slow = slow.next;
                fast = fast.next;
            }
            return slow;                // Cycle start
        }
    }

    return null;
};`
};

export const steps = [
  {
    title: '1. Problem Anatomy: Linked List with Cycle (5 loops back to 3)',
    phase: 'SETUP',
    track: {
      label: 'Linked List Structure',
      items: [
        { val: '1 (Head)', status: 'active' },
        { val: '2' },
        { val: '3 (Cycle Start)', badge: '🎯 Target' },
        { val: '4' },
        { val: '5 (Tail -> 3)', badge: '↩ Loop' }
      ],
      pointers: [
        { index: 0, label: '🐢 slow' },
        { index: 0, label: '🐇 fast' }
      ]
    },
    activeI: 0,
    activeJ: 0,
    metrics: [
      { label: 'Phase', value: '1: Find Meeting Point' },
      { label: 'Linear Path L1', value: '2 edges (1 -> 2 -> 3)' },
      { label: 'Cycle Length C', value: '3 nodes (3, 4, 5)' }
    ],
    formula: 'slow = head; fast = head;',
    action: 'Initialize Phase 1: Start slow and fast at head (Node 1).',
    explain: 'Goal: Find the starting entry node of the cycle (Node 3). Linear distance L1 = 2 edges, cycle length C = 3 nodes.',
    intuition: 'We first use Tortoise and Hare (slow moves 1 step, fast moves 2 steps) to locate an arbitrary meeting node inside the loop.',
    variables: { head: 1, cycleEntry: 3, L1: 2, C: 3, phase: 'Cycle Detection' }
  },
  {
    title: '2. Phase 1 - Iteration 1: slow -> Node 2, fast -> Node 3',
    phase: 'TRAVERSAL',
    track: {
      label: 'Phase 1: Approaching the Cycle',
      items: [
        { val: '1' },
        { val: '2', status: 'active' },
        { val: '3 (Cycle Start)', status: 'active', badge: '🎯 Target' },
        { val: '4' },
        { val: '5 (Tail -> 3)', badge: '↩ Loop' }
      ],
      pointers: [
        { index: 1, label: '🐢 slow' },
        { index: 2, label: '🐇 fast' }
      ]
    },
    activeI: 1,
    activeJ: 2,
    metrics: [
      { label: 'slow.val', value: 2 },
      { label: 'fast.val', value: 3 },
      { label: 'Status', value: 'fast entered cycle' }
    ],
    formula: 'slow = slow.next; fast = fast.next.next;',
    action: 'slow advances 1 step to Node 2; fast leaps 2 steps to Node 3.',
    explain: 'fast enters the cycle at Node 3. slow is 1 node behind the entrance.',
    intuition: 'Fast begins circulating inside the cycle while slow approaches the entrance threshold.',
    variables: { 'slow.val': 2, 'fast.val': 3 }
  },
  {
    title: '3. Phase 1 - Iteration 2: slow -> Node 3, fast -> Node 5',
    phase: 'TRAVERSAL',
    track: {
      label: 'Phase 1: Both Pointers in Cycle',
      items: [
        { val: '1' },
        { val: '2' },
        { val: '3 (Cycle Start)', status: 'active', badge: '🎯 Target' },
        { val: '4' },
        { val: '5 (Tail -> 3)', status: 'active', badge: '↩ Loop' }
      ],
      pointers: [
        { index: 2, label: '🐢 slow' },
        { index: 4, label: '🐇 fast' }
      ]
    },
    activeI: 2,
    activeJ: 4,
    metrics: [
      { label: 'slow.val', value: 3 },
      { label: 'fast.val', value: 5 },
      { label: 'Relative Gap', value: '1 step' }
    ],
    formula: 'slow = slow.next; fast = fast.next.next;',
    action: 'slow reaches cycle entry (Node 3); fast moves to tail (Node 5).',
    explain: 'Both pointers are now circulating in the loop {3, 4, 5}. Node 5 connects back to Node 3.',
    intuition: 'Inside the loop, fast closes the gap by 1 node per turn.',
    variables: { 'slow.val': 3, 'fast.val': 5, inLoop: true }
  },
  {
    title: '4. Phase 1 Collision: Both Meet at Node 4!',
    phase: 'COLLISION',
    track: {
      label: 'Phase 1 Complete: Collision Node Detected',
      items: [
        { val: '1' },
        { val: '2' },
        { val: '3 (Cycle Start)', badge: '🎯 Target' },
        { val: '4 (MEETING POINT)', status: 'match', badge: '💥 Meet' },
        { val: '5 (Tail -> 3)', badge: '↩ Loop' }
      ],
      pointers: [
        { index: 3, label: '💥 slow == fast' }
      ]
    },
    activeI: 3,
    activeJ: 3,
    metrics: [
      { label: 'Meeting Node', value: 'Node 4', highlight: true },
      { label: 'Meeting Offset d', value: '1 node past entrance' },
      { label: 'Phase 1', value: 'Complete' }
    ],
    formula: 'slow == fast (4 == 4)',
    action: 'slow moves to Node 4; fast wraps around (5 -> 3 -> 4) and collides at Node 4.',
    explain: 'Both pointers collide at Node 4. The offset from cycle start (Node 3) to meeting node (Node 4) is d = 1 step.',
    intuition: 'Collision confirms the cycle and pinpoints the reference anchor required for Phase 2.',
    variables: { meetingNode: 4, d: 1, collision: true }
  },
  {
    title: '5. Mathematical Proof: Distance(Head -> Start) = Distance(Meet -> Start)',
    phase: 'ANALYSIS',
    track: {
      label: 'Mathematical Derivation',
      items: [
        { val: 'L1: Head -> Entry', status: 'match' },
        { val: 'd: Entry -> Meet' },
        { val: 'C - d: Meet -> Entry', status: 'match' },
        { val: 'Result: L1 = C - d', badge: 'Invariant' }
      ],
      pointers: [
        { index: 0, label: 'L1 = 2 steps' },
        { index: 2, label: 'C - d = 2 steps' }
      ]
    },
    activeI: 0,
    activeJ: 2,
    metrics: [
      { label: 'Linear Dist L1', value: '2 steps (1 -> 2 -> 3)' },
      { label: 'Cycle Remainder C - d', value: '2 steps (4 -> 5 -> 3)' },
      { label: 'Equal Distances', value: 'L1 == C - d', highlight: true }
    ],
    formula: '2(L1 + d) = L1 + k*C + d  ==>  L1 = k*C - d',
    action: 'Analyze Floyd’s Cycle equation relating linear distance to cycle perimeter.',
    explain: 'Since fast traveled twice the distance of slow: 2*(L1 + d) = L1 + k*C + d. Simplifying yields L1 = k*C - d. For k = 1, L1 = C - d = 3 - 1 = 2 steps!',
    intuition: 'This is the breakthrough: Walking from Head takes the EXACT same number of steps as walking from the Meeting Point to reach the Cycle Entrance!',
    variables: { L1: 2, C: 3, d: 1, 'C - d': 2, identity: 'L1 == C - d' }
  },
  {
    title: '6. Phase 2 Setup: Reset slow = Head (1), Keep fast at Meeting Point (4)',
    phase: 'RESET',
    track: {
      label: 'Phase 2: Reset slow to Head',
      items: [
        { val: '1 (slow reset)', status: 'active', badge: 'Head' },
        { val: '2' },
        { val: '3 (Cycle Start)', badge: '🎯 Target' },
        { val: '4 (fast stays)', status: 'match', badge: 'Meet' },
        { val: '5 (Tail -> 3)', badge: '↩ Loop' }
      ],
      pointers: [
        { index: 0, label: '🐢 slow (head)' },
        { index: 3, label: '🐇 fast (meet)' }
      ]
    },
    activeI: 0,
    activeJ: 3,
    metrics: [
      { label: 'Phase', value: '2: Synchronize' },
      { label: 'slow Speed', value: '1 step / iter' },
      { label: 'fast Speed', value: '1 step / iter (Equal!)' }
    ],
    formula: 'slow = head;  // fast remains at meeting node',
    action: 'Reset slow to head (Node 1); leave fast at collision node (Node 4). Now both advance 1 step each!',
    explain: 'Crucial speed change: fast drops from 2 steps/turn down to 1 step/turn. Both pointers now advance at the identical pace of 1 node per iteration.',
    intuition: 'Because both pointers move at 1 step/iteration and their distances to the entrance are identical (2 steps each), they must arrive at the entrance simultaneously!',
    variables: { slow: 1, fast: 4, slowSpeed: 1, fastSpeed: 1 }
  },
  {
    title: '7. Phase 2 - Step 1: Advance both 1 step (slow -> 2, fast -> 5)',
    phase: 'SYNCHRONIZATION',
    track: {
      label: 'Phase 2: Advancing Toward Entrance',
      items: [
        { val: '1' },
        { val: '2 (slow)', status: 'active' },
        { val: '3 (Cycle Start)', badge: '🎯 Target' },
        { val: '4' },
        { val: '5 (fast)', status: 'active', badge: '↩ Loop' }
      ],
      pointers: [
        { index: 1, label: '🐢 slow' },
        { index: 4, label: '🐇 fast' }
      ]
    },
    activeI: 1,
    activeJ: 4,
    metrics: [
      { label: 'slow.val', value: 2 },
      { label: 'fast.val', value: 5 },
      { label: 'Remaining to Target', value: '1 step each' }
    ],
    formula: 'slow = slow.next; fast = fast.next;',
    action: 'Both pointers advance 1 step: slow moves from 1 to 2; fast moves from 4 to 5.',
    explain: 'slow is 1 step away from Cycle Entry (Node 3). fast is at Node 5, whose next pointer loops directly back to Node 3!',
    intuition: 'Both pointers are now exactly 1 step away from the cycle entrance.',
    variables: { 'slow.val': 2, 'fast.val': 5, remainingSteps: 1 }
  },
  {
    title: '8. Phase 2 - Step 2: Both Land on Node 3 — Cycle Entrance Found!',
    phase: 'COMPLETED',
    track: {
      label: 'Convergence at Cycle Start',
      items: [
        { val: '1' },
        { val: '2' },
        { val: '3 (CYCLE ENTRANCE)', status: 'match', badge: '🎯 Start' },
        { val: '4' },
        { val: '5 (Tail -> 3)', badge: '↩ Loop' }
      ],
      pointers: [
        { index: 2, label: '🎯 slow == fast == Cycle Start' }
      ]
    },
    activeI: 2,
    activeJ: 2,
    metrics: [
      { label: 'Cycle Entry Node', value: 'Node 3', highlight: true },
      { label: 'Phase 2 Steps', value: '2 steps (== L1)' },
      { label: 'slow == fast', value: 'True' }
    ],
    formula: 'while (slow != fast) exited: slow == fast == Node 3',
    action: 'slow moves to Node 3; fast follows cycle back-edge (5 -> 3) and lands on Node 3!',
    explain: 'Both pointers collide at Node 3! Node 3 is mathematically confirmed as the exact starting entry point of the loop.',
    intuition: 'The proof holds: L1 steps from head and C - d steps from collision point meet precisely at the entry node.',
    variables: { cycleStart: 3, val: 3, status: 'ENTRANCE_FOUND' }
  },
  {
    title: '9. Completion & Complexity Summary: Return Node 3',
    phase: 'COMPLETED',
    track: {
      label: 'Final Result: Cycle Entrance Identified',
      items: [
        { val: '1 (Head)' },
        { val: '2' },
        { val: '3 (Cycle Start)', status: 'match', badge: '🎯 Result' },
        { val: '4' },
        { val: '5 (Tail -> 3)', badge: '↩ Loop' }
      ],
      pointers: [
        { index: 2, label: 'Return Node(3)' }
      ]
    },
    activeI: 2,
    activeJ: 2,
    metrics: [
      { label: 'Return Value', value: 'Node(3)', highlight: true },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1)' }
    ],
    formula: 'return slow; // Node 3',
    action: 'Algorithm concludes: Returns pointer to Node 3.',
    explain: 'Phase 1 takes O(L1 + C) steps. Phase 2 takes O(L1) steps. Total time is strictly O(N) operations with O(1) auxiliary memory.',
    intuition: 'Floyd Cycle II is widely considered the optimal standard solution for cycle entry identification in singly linked lists.',
    variables: { result: 'Node(3)', timeComplexity: 'O(N)', spaceComplexity: 'O(1)' }
  }
];
