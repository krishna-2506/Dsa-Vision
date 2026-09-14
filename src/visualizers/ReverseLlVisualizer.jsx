import React from 'react';

export const approaches = {
  intuitive: {
    title: 'Intuitive: Array / Stack',
    badge: 'O(N) Space',
    complexity: { time: 'O(N)', space: 'O(N)' },
    steps: [
      {
        title: '1. Initialize array and pointer',
        codeLine: 6,
        status: '<span class="prev-b">vals = []</span>, <b>curr = 1</b>',
        explain: 'Create an array to store values, and point <code>curr</code> to the head.',
        pointers: { curr: '1' },
        vals: [],
        nodeVals: {'1':1, '2':2, '3':3, '4':4},
        edges: {'1':'2', '2':'3', '3':'4', '4':'null_R'}
      },
      {
        title: '2. Traverse and push values',
        codeLine: 8,
        status: '<b>curr = 1</b> (not NULL)',
        explain: 'While <code>curr</code> is not NULL, store its value.',
        pointers: { curr: '1' }, vals: [], nodeVals: {'1':1, '2':2, '3':3, '4':4}, edges: {'1':'2', '2':'3', '3':'4', '4':'null_R'}
      },
      {
        title: '3. Push to array',
        codeLine: 9,
        status: '<b>vals = [1]</b>',
        explain: 'Push 1 into the <code>vals</code> array.',
        pointers: { curr: '1' }, vals: [1], nodeVals: {'1':1, '2':2, '3':3, '4':4}, edges: {'1':'2', '2':'3', '3':'4', '4':'null_R'}
      },
      {
        title: '4. Move forward',
        codeLine: 10,
        status: '<b>curr = 2</b>',
        explain: 'Move <code>curr</code> to the next node.',
        pointers: { curr: '2' }, vals: [1], nodeVals: {'1':1, '2':2, '3':3, '4':4}, edges: {'1':'2', '2':'3', '3':'4', '4':'null_R'}
      },
      { title: '5. Continue traversal', codeLine: 8, status: '<b>curr = 2</b> (not NULL)', explain: 'Continue the loop.', pointers: { curr: '2' }, vals: [1], nodeVals: {'1':1, '2':2, '3':3, '4':4}, edges: {'1':'2', '2':'3', '3':'4', '4':'null_R'} },
      { title: '6. Push to array', codeLine: 9, status: '<b>vals = [1, 2]</b>', explain: 'Push 2.', pointers: { curr: '2' }, vals: [1, 2], nodeVals: {'1':1, '2':2, '3':3, '4':4}, edges: {'1':'2', '2':'3', '3':'4', '4':'null_R'} },
      { title: '7. Move forward', codeLine: 10, status: '<b>curr = 3</b>', explain: 'Move to next.', pointers: { curr: '3' }, vals: [1, 2], nodeVals: {'1':1, '2':2, '3':3, '4':4}, edges: {'1':'2', '2':'3', '3':'4', '4':'null_R'} },
      { title: '8. Continue traversal', codeLine: 8, status: '<b>curr = 3</b>', explain: 'Continue the loop.', pointers: { curr: '3' }, vals: [1, 2], nodeVals: {'1':1, '2':2, '3':3, '4':4}, edges: {'1':'2', '2':'3', '3':'4', '4':'null_R'} },
      { title: '9. Push to array', codeLine: 9, status: '<b>vals = [1, 2, 3]</b>', explain: 'Push 3.', pointers: { curr: '3' }, vals: [1, 2, 3], nodeVals: {'1':1, '2':2, '3':3, '4':4}, edges: {'1':'2', '2':'3', '3':'4', '4':'null_R'} },
      { title: '10. Move forward', codeLine: 10, status: '<b>curr = 4</b>', explain: 'Move to next.', pointers: { curr: '4' }, vals: [1, 2, 3], nodeVals: {'1':1, '2':2, '3':3, '4':4}, edges: {'1':'2', '2':'3', '3':'4', '4':'null_R'} },
      { title: '11. Continue traversal', codeLine: 8, status: '<b>curr = 4</b>', explain: 'Continue the loop.', pointers: { curr: '4' }, vals: [1, 2, 3], nodeVals: {'1':1, '2':2, '3':3, '4':4}, edges: {'1':'2', '2':'3', '3':'4', '4':'null_R'} },
      { title: '12. Push to array', codeLine: 9, status: '<b>vals = [1, 2, 3, 4]</b>', explain: 'Push 4. The array now holds all values.', pointers: { curr: '4' }, vals: [1, 2, 3, 4], nodeVals: {'1':1, '2':2, '3':3, '4':4}, edges: {'1':'2', '2':'3', '3':'4', '4':'null_R'} },
      { title: '13. Move forward', codeLine: 10, status: '<b>curr = NULL</b>', explain: 'Move to next (NULL).', pointers: { curr: 'null_R' }, vals: [1, 2, 3, 4], nodeVals: {'1':1, '2':2, '3':3, '4':4}, edges: {'1':'2', '2':'3', '3':'4', '4':'null_R'} },
      { title: '14. End push phase', codeLine: 8, status: '<b>curr = NULL</b>', explain: 'End of list reached. Exit first loop.', pointers: { curr: 'null_R' }, vals: [1, 2, 3, 4], nodeVals: {'1':1, '2':2, '3':3, '4':4}, edges: {'1':'2', '2':'3', '3':'4', '4':'null_R'} },
      {
        title: '15. Reset for overwrite',
        codeLine: 12,
        status: '<span class="prev-b">curr = 1</span>, <b>i = 3</b>',
        explain: 'Reset <code>curr</code> to head, and set index <code>i</code> to the last array element.',
        pointers: { curr: '1' }, vals: [1, 2, 3, 4], activeIndex: 3, nodeVals: {'1':1, '2':2, '3':3, '4':4}, edges: {'1':'2', '2':'3', '3':'4', '4':'null_R'}
      },
      { title: '16. Check loop condition', codeLine: 14, status: '<b>curr = 1</b>', explain: 'Start second pass to overwrite values.', pointers: { curr: '1' }, vals: [1, 2, 3, 4], activeIndex: 3, nodeVals: {'1':1, '2':2, '3':3, '4':4}, edges: {'1':'2', '2':'3', '3':'4', '4':'null_R'} },
      {
        title: '17. Overwrite value',
        codeLine: 15,
        status: '<b>Node(1).val = 4</b>',
        explain: 'Pop from array and overwrite the current node\'s value.',
        pointers: { curr: '1' }, vals: [1, 2, 3, 4], activeIndex: 3, nodeVals: {'1':4, '2':2, '3':3, '4':4}, edges: {'1':'2', '2':'3', '3':'4', '4':'null_R'}
      },
      { title: '18. Move forward', codeLine: 16, status: '<b>curr = 2</b>, <span class="prev-b">i = 2</span>', explain: 'Move to the next node and decrement <code>i</code>.', pointers: { curr: '2' }, vals: [1, 2, 3, 4], activeIndex: 2, nodeVals: {'1':4, '2':2, '3':3, '4':4}, edges: {'1':'2', '2':'3', '3':'4', '4':'null_R'} },
      { title: '19. Overwrite value', codeLine: 15, status: '<b>Node(2).val = 3</b>', explain: 'Overwrite second node with 3.', pointers: { curr: '2' }, vals: [1, 2, 3, 4], activeIndex: 2, nodeVals: {'1':4, '2':3, '3':3, '4':4}, edges: {'1':'2', '2':'3', '3':'4', '4':'null_R'} },
      { title: '20. Move forward', codeLine: 16, status: '<b>curr = 3</b>, <span class="prev-b">i = 1</span>', explain: 'Move to the next node.', pointers: { curr: '3' }, vals: [1, 2, 3, 4], activeIndex: 1, nodeVals: {'1':4, '2':3, '3':3, '4':4}, edges: {'1':'2', '2':'3', '3':'4', '4':'null_R'} },
      { title: '21. Overwrite value', codeLine: 15, status: '<b>Node(3).val = 2</b>', explain: 'Overwrite third node with 2.', pointers: { curr: '3' }, vals: [1, 2, 3, 4], activeIndex: 1, nodeVals: {'1':4, '2':3, '3':2, '4':4}, edges: {'1':'2', '2':'3', '3':'4', '4':'null_R'} },
      { title: '22. Move forward', codeLine: 16, status: '<b>curr = 4</b>, <span class="prev-b">i = 0</span>', explain: 'Move to the last node.', pointers: { curr: '4' }, vals: [1, 2, 3, 4], activeIndex: 0, nodeVals: {'1':4, '2':3, '3':2, '4':4}, edges: {'1':'2', '2':'3', '3':'4', '4':'null_R'} },
      { title: '23. Overwrite value', codeLine: 15, status: '<b>Node(4).val = 1</b>', explain: 'Overwrite fourth node with 1. Values are now reversed.', pointers: { curr: '4' }, vals: [1, 2, 3, 4], activeIndex: 0, nodeVals: {'1':4, '2':3, '3':2, '4':1}, edges: {'1':'2', '2':'3', '3':'4', '4':'null_R'} },
      { title: '24. Finish traversal', codeLine: 16, status: '<b>curr = NULL</b>', explain: '<code>curr</code> becomes NULL. List values are successfully reversed.', pointers: { curr: 'null_R' }, vals: [1, 2, 3, 4], activeIndex: -1, nodeVals: {'1':4, '2':3, '3':2, '4':1}, edges: {'1':'2', '2':'3', '3':'4', '4':'null_R'} },
      { title: '25. Return', codeLine: 18, status: '<b>Complete!</b>', explain: 'Return the original head (which now contains the reversed values).', pointers: { curr: 'null_R' }, vals: [1, 2, 3, 4], activeIndex: -1, nodeVals: {'1':4, '2':3, '3':2, '4':1}, edges: {'1':'2', '2':'3', '3':'4', '4':'null_R'} }
    ],
    solutions: {
      cpp: `// C++ Intuitive — O(N) Space
#include <vector>
class Solution {
public:
    ListNode* reverseList(ListNode* head) {   // line 5
        std::vector<int> vals;                // line 6
        ListNode* curr = head;                // line 7
        while (curr != NULL) {                // line 8
            vals.push_back(curr->val);        // line 9
            curr = curr->next;                // line 10
        }                                     // line 11
        curr = head;                          // line 12
        int i = vals.size() - 1;              // line 13
        while (curr != NULL) {                // line 14
            curr->val = vals[i--];            // line 15
            curr = curr->next;                // line 16
        }                                     // line 17
        return head;                          // line 18
    }
};`,
      java: `// Java Intuitive — O(N) Space
import java.util.ArrayList;
import java.util.List;

class Solution {
    public ListNode reverseList(ListNode head) {
        List<Integer> vals = new ArrayList<>();
        ListNode curr = head;
        while (curr != null) {
            vals.add(curr.val);
            curr = curr.next;
        }
        curr = head;
        int i = vals.size() - 1;
        while (curr != null) {
            curr.val = vals.get(i--);
            curr = curr.next;
        }
        return head;
    }
}`,
      python: `# Python Intuitive — O(N) Space
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        vals = []
        curr = head
        while curr:
            vals.append(curr.val)
            curr = curr.next
            
        curr = head
        i = len(vals) - 1
        while curr:
            curr.val = vals[i]
            i -= 1
            curr = curr.next
            
        return head`
    }
  },
  better: {
    title: 'Better: Recursive',
    badge: 'O(N) Call Stack',
    complexity: { time: 'O(N)', space: 'O(N)' },
    steps: [
      { title: '1. Recurse Node 1', codeLine: 7, status: '<b>head = 1</b>', explain: 'Call <code>reverseList(head->next)</code> to process the rest of the list.', pointers: { head: '1' }, edges: {'1':'2', '2':'3', '3':'4', '4':'null_R'} },
      { title: '2. Recurse Node 2', codeLine: 7, status: '<b>head = 2</b>', explain: 'Recursively call on Node 2.', pointers: { head: '2' }, edges: {'1':'2', '2':'3', '3':'4', '4':'null_R'} },
      { title: '3. Recurse Node 3', codeLine: 7, status: '<b>head = 3</b>', explain: 'Recursively call on Node 3.', pointers: { head: '3' }, edges: {'1':'2', '2':'3', '3':'4', '4':'null_R'} },
      { title: '4. Recurse Node 4', codeLine: 5, status: '<b>head = 4</b>', explain: 'Base case reached: <code>head->next</code> is NULL.', pointers: { head: '4' }, edges: {'1':'2', '2':'3', '3':'4', '4':'null_R'} },
      { title: '5. Return from base case', codeLine: 6, status: '<b>return 4</b>', explain: 'Return Node 4 as the new head of the reversed list.', pointers: { head: '4' }, edges: {'1':'2', '2':'3', '3':'4', '4':'null_R'} },
      { title: '6. Unwind to Node 3', codeLine: 7, status: '<span class="prev-b">head = 3</span>, <b>newHead = 4</b>', explain: 'Call stack unwinds back to Node 3. <code>newHead</code> is Node 4.', pointers: { head: '3', newHead: '4' }, edges: {'1':'2', '2':'3', '3':'4', '4':'null_R'} },
      { title: '7. Reverse local link', codeLine: 8, status: '<b>Node(4).next = Node(3)</b>', explain: '<code>head->next->next = head</code>. Node 4 now points back to Node 3.', pointers: { head: '3', newHead: '4' }, edges: {'1':'2', '2':'3', '3':'4', '4':'3'} },
      { title: '8. Break forward link', codeLine: 9, status: '<b>Node(3).next = NULL</b>', explain: '<code>head->next = NULL</code>. Prevent cycles by breaking Node 3\'s forward link.', pointers: { head: '3', newHead: '4' }, edges: {'1':'2', '2':'3', '3':'null_L', '4':'3'} },
      { title: '9. Return newHead', codeLine: 10, status: '<b>return 4</b>', explain: 'Pass <code>newHead</code> (Node 4) up the call stack.', pointers: { head: '3', newHead: '4' }, edges: {'1':'2', '2':'3', '3':'null_L', '4':'3'} },
      { title: '10. Unwind to Node 2', codeLine: 7, status: '<span class="prev-b">head = 2</span>, <b>newHead = 4</b>', explain: 'Call stack unwinds back to Node 2.', pointers: { head: '2', newHead: '4' }, edges: {'1':'2', '2':'3', '3':'null_L', '4':'3'} },
      { title: '11. Reverse local link', codeLine: 8, status: '<b>Node(3).next = Node(2)</b>', explain: 'Node 3 now points back to Node 2.', pointers: { head: '2', newHead: '4' }, edges: {'1':'2', '2':'3', '3':'2', '4':'3'} },
      { title: '12. Break forward link', codeLine: 9, status: '<b>Node(2).next = NULL</b>', explain: 'Break Node 2\'s forward link.', pointers: { head: '2', newHead: '4' }, edges: {'1':'2', '2':'null_L', '3':'2', '4':'3'} },
      { title: '13. Return newHead', codeLine: 10, status: '<b>return 4</b>', explain: 'Pass <code>newHead</code> (Node 4) up the call stack.', pointers: { head: '2', newHead: '4' }, edges: {'1':'2', '2':'null_L', '3':'2', '4':'3'} },
      { title: '14. Unwind to Node 1', codeLine: 7, status: '<span class="prev-b">head = 1</span>, <b>newHead = 4</b>', explain: 'Call stack unwinds back to the original head (Node 1).', pointers: { head: '1', newHead: '4' }, edges: {'1':'2', '2':'null_L', '3':'2', '4':'3'} },
      { title: '15. Reverse local link', codeLine: 8, status: '<b>Node(2).next = Node(1)</b>', explain: 'Node 2 now points back to Node 1.', pointers: { head: '1', newHead: '4' }, edges: {'1':'2', '2':'1', '3':'2', '4':'3'} },
      { title: '16. Break forward link', codeLine: 9, status: '<b>Node(1).next = NULL</b>', explain: 'Node 1 (the new tail) points to NULL.', pointers: { head: '1', newHead: '4' }, edges: {'1':'null_L', '2':'1', '3':'2', '4':'3'} },
      { title: '17. Complete!', codeLine: 10, status: '<b>return 4</b>', explain: 'Recursion finished! Return <code>newHead</code> (Node 4) as the new head of the reversed list.', pointers: { head: '1', newHead: '4' }, edges: {'1':'null_L', '2':'1', '3':'2', '4':'3'} }
    ],
    solutions: {
      cpp: `// C++ Better — Recursive
class Solution {
public:
    ListNode* reverseList(ListNode* head) {      // line 4
        if (head == NULL || head->next == NULL)  // line 5
            return head;                         // line 6
        ListNode* newHead = reverseList(head->next); // line 7
        head->next->next = head;                 // line 8
        head->next = NULL;                       // line 9
        return newHead;                          // line 10
    }
};`,
      java: `// Java Better — Recursive
class Solution {
    public ListNode reverseList(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }
        ListNode newHead = reverseList(head.next);
        head.next.next = head;
        head.next = null;
        return newHead;
    }
}`,
      python: `# Python Better — Recursive
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return head
            
        new_head = self.reverseList(head.next)
        
        # Reverse the link between head and head.next
        head.next.next = head
        head.next = None
        
        return new_head`
    }
  },
  optimal: {
    title: 'Optimal: In-Place Iterative',
    badge: 'Optimal',
    complexity: { time: 'O(N)', space: 'O(1)' },
    steps: [
      {
        title: '1. Initialize pointers',
        codeLine: 5,
        status: '<span class="prev-b">prev = NULL</span>, <b>curr = 1</b>',
        explain: 'Initialize <code>prev</code> to NULL and <code>curr</code> to the head of the list.',
        pointers: { prev: 'null_L', curr: '1' },
        edges: {'1':'2', '2':'3', '3':'4', '4':'null_R'}
      },
      {
        title: '2. Check loop condition',
        codeLine: 7,
        status: '<b>curr = 1</b> (not NULL)',
        explain: 'Enter the loop as long as <code>curr</code> points to a valid node.',
        pointers: { prev: 'null_L', curr: '1' },
        edges: {'1':'2', '2':'3', '3':'4', '4':'null_R'}
      },
      {
        title: '3. Save forward node',
        codeLine: 8,
        status: '<b>frwd = 2</b>',
        explain: 'Store <code>curr->next</code> in <code>frwd</code> so we don\'t lose the rest of the list when we break the link.',
        pointers: { prev: 'null_L', curr: '1', frwd: '2' },
        edges: {'1':'2', '2':'3', '3':'4', '4':'null_R'}
      },
      {
        title: '4. Reverse the link',
        codeLine: 9,
        status: '<b>Node(1).next = NULL</b>',
        explain: 'Point <code>curr->next</code> to <code>prev</code>, effectively reversing this single link.',
        pointers: { prev: 'null_L', curr: '1', frwd: '2' },
        edges: {'1':'null_L', '2':'3', '3':'4', '4':'null_R'}
      },
      {
        title: '5. Move prev forward',
        codeLine: 10,
        status: '<b>prev = 1</b>',
        explain: 'Shift <code>prev</code> forward to where <code>curr</code> is currently pointing.',
        pointers: { prev: '1', curr: '1', frwd: '2' },
        edges: {'1':'null_L', '2':'3', '3':'4', '4':'null_R'}
      },
      {
        title: '6. Move curr forward',
        codeLine: 11,
        status: '<b>curr = 2</b>',
        explain: 'Shift <code>curr</code> forward to the saved <code>frwd</code> node.',
        pointers: { prev: '1', curr: '2', frwd: '2' },
        edges: {'1':'null_L', '2':'3', '3':'4', '4':'null_R'}
      },
      { title: '7. Check loop condition', codeLine: 7, status: '<b>curr = 2</b> (not NULL)', explain: 'Continue the loop.', pointers: { prev: '1', curr: '2' }, edges: {'1':'null_L', '2':'3', '3':'4', '4':'null_R'} },
      { title: '8. Save forward node', codeLine: 8, status: '<b>frwd = 3</b>', explain: 'Store Node 3.', pointers: { prev: '1', curr: '2', frwd: '3' }, edges: {'1':'null_L', '2':'3', '3':'4', '4':'null_R'} },
      { title: '9. Reverse the link', codeLine: 9, status: '<b>Node(2).next = Node(1)</b>', explain: 'Node 2 now points back to Node 1.', pointers: { prev: '1', curr: '2', frwd: '3' }, edges: {'1':'null_L', '2':'1', '3':'4', '4':'null_R'} },
      { title: '10. Move prev forward', codeLine: 10, status: '<b>prev = 2</b>', explain: 'Shift <code>prev</code> to Node 2.', pointers: { prev: '2', curr: '2', frwd: '3' }, edges: {'1':'null_L', '2':'1', '3':'4', '4':'null_R'} },
      { title: '11. Move curr forward', codeLine: 11, status: '<b>curr = 3</b>', explain: 'Shift <code>curr</code> to Node 3.', pointers: { prev: '2', curr: '3', frwd: '3' }, edges: {'1':'null_L', '2':'1', '3':'4', '4':'null_R'} },
      
      { title: '12. Check loop condition', codeLine: 7, status: '<b>curr = 3</b> (not NULL)', explain: 'Continue the loop.', pointers: { prev: '2', curr: '3' }, edges: {'1':'null_L', '2':'1', '3':'4', '4':'null_R'} },
      { title: '13. Save forward node', codeLine: 8, status: '<b>frwd = 4</b>', explain: 'Store Node 4.', pointers: { prev: '2', curr: '3', frwd: '4' }, edges: {'1':'null_L', '2':'1', '3':'4', '4':'null_R'} },
      { title: '14. Reverse the link', codeLine: 9, status: '<b>Node(3).next = Node(2)</b>', explain: 'Node 3 now points back to Node 2.', pointers: { prev: '2', curr: '3', frwd: '4' }, edges: {'1':'null_L', '2':'1', '3':'2', '4':'null_R'} },
      { title: '15. Move prev forward', codeLine: 10, status: '<b>prev = 3</b>', explain: 'Shift <code>prev</code> to Node 3.', pointers: { prev: '3', curr: '3', frwd: '4' }, edges: {'1':'null_L', '2':'1', '3':'2', '4':'null_R'} },
      { title: '16. Move curr forward', codeLine: 11, status: '<b>curr = 4</b>', explain: 'Shift <code>curr</code> to Node 4.', pointers: { prev: '3', curr: '4', frwd: '4' }, edges: {'1':'null_L', '2':'1', '3':'2', '4':'null_R'} },
      
      { title: '17. Check loop condition', codeLine: 7, status: '<b>curr = 4</b> (not NULL)', explain: 'Continue the loop for the last node.', pointers: { prev: '3', curr: '4' }, edges: {'1':'null_L', '2':'1', '3':'2', '4':'null_R'} },
      { title: '18. Save forward node', codeLine: 8, status: '<b>frwd = NULL</b>', explain: 'Node 4 is the tail, so its next is NULL.', pointers: { prev: '3', curr: '4', frwd: 'null_R' }, edges: {'1':'null_L', '2':'1', '3':'2', '4':'null_R'} },
      { title: '19. Reverse the link', codeLine: 9, status: '<b>Node(4).next = Node(3)</b>', explain: 'Node 4 now points back to Node 3. The entire list is reversed.', pointers: { prev: '3', curr: '4', frwd: 'null_R' }, edges: {'1':'null_L', '2':'1', '3':'2', '4':'3'} },
      { title: '20. Move prev forward', codeLine: 10, status: '<b>prev = 4</b>', explain: 'Shift <code>prev</code> to Node 4 (the new head).', pointers: { prev: '4', curr: '4', frwd: 'null_R' }, edges: {'1':'null_L', '2':'1', '3':'2', '4':'3'} },
      { title: '21. Move curr forward', codeLine: 11, status: '<b>curr = NULL</b>', explain: 'Shift <code>curr</code> to NULL, ending our traversal.', pointers: { prev: '4', curr: 'null_R', frwd: 'null_R' }, edges: {'1':'null_L', '2':'1', '3':'2', '4':'3'} },
      
      { title: '22. Loop terminates', codeLine: 7, status: '<b>curr = NULL</b>', explain: '<code>curr</code> is NULL, so the while loop exits.', pointers: { prev: '4', curr: 'null_R' }, edges: {'1':'null_L', '2':'1', '3':'2', '4':'3'} },
      { title: '23. Return new head', codeLine: 13, status: '<b>return prev (4)</b>', explain: '<code>prev</code> points to Node 4, which is the new head of the completely reversed list.', pointers: { prev: '4' }, edges: {'1':'null_L', '2':'1', '3':'2', '4':'3'} }
    ],
    solutions: {
      cpp: `// C++ Optimal — In-place reversal
class Solution {
public:
    ListNode* reverseList(ListNode* head) { // line 4
        ListNode* prev = NULL;              // line 5
        ListNode* curr = head;              // line 6
        while (curr != NULL) {              // line 7
            ListNode* frwd = curr->next;    // line 8
            curr->next = prev;              // line 9
            prev = curr;                    // line 10
            curr = frwd;                    // line 11
        }                                   // line 12
        return prev;                        // line 13
    }
};`,
      java: `// Java Optimal — In-place reversal
class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode frwd = curr.next;
            curr.next = prev;
            prev = curr;
            curr = frwd;
        }
        return prev;
    }
}`,
      python: `# Python Optimal — In-place reversal
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev = None
        curr = head
        
        while curr:
            frwd = curr.next
            curr.next = prev
            prev = curr
            curr = frwd
            
        return prev`
    }
  }
};

export const solutions = approaches.optimal.solutions;
export const steps     = approaches.optimal.steps;
export const meta = {
  display_id:      'Q-095',
  title:           "Reverse LL",
  category:        "4. Linked List",
  difficulty:      "Medium",
  timeComplexity:  "O(N)",
  spaceComplexity: "O(1)",
  description:     "Given the head of a singly linked list, reverse the list, and return the reversed list.\r\n\r\nExample 1:\r\nInput: head = [1,2,3,4,5]\r\nOutput: [5,4,3,2,1]\r\n\r\nExample"
};

export default function ReverseLlVisualizer({
  currentStep  = 0,
  approachTier = 'optimal'
}) {
  const activeApproach = approaches[approachTier] || approaches.optimal;
  const activeSteps    = activeApproach.steps;
  const stepIndex      = Math.min(Math.max(0, currentStep), activeSteps.length - 1);
  const stepData       = activeSteps[stepIndex] || activeSteps[0];

  const { edges = {}, pointers = {}, vals, activeIndex, nodeVals } = stepData;

  // Node Configuration
  const nodeOrder = ['null_L', '1', '2', '3', '4', 'null_R'];
  const NodePositions = {
    'null_L': { x: 50, y: 130, label: 'NULL' },
    '1':      { x: 150, y: 130, label: '1' },
    '2':      { x: 250, y: 130, label: '2' },
    '3':      { x: 350, y: 130, label: '3' },
    '4':      { x: 450, y: 130, label: '4' },
    'null_R': { x: 550, y: 130, label: 'NULL' },
  };

  // Pointers Configuration
  const ptrOffsets = {
    curr:    { dy: -35, color: 'var(--indigo)' },
    head:    { dy: -35, color: 'var(--indigo)' },
    frwd:    { dy: -55, color: 'var(--teal)' },
    newHead: { dy: -55, color: 'var(--teal)' },
    prev:    { dy: 35,  color: 'var(--teal)' },
  };

  return (
    <div className="w-full flex flex-col">
      {/* ── Chalkboard Canvas ── */}
      <div className="w-full py-6 flex items-center justify-center">
        <svg viewBox="0 0 620 180" width="100%" height="180">
          <defs>
            <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--line)"/>
            </marker>
          </defs>

          {/* 1. Draw Edges */}
          {Object.entries(edges).map(([from, to]) => {
            if (!to) return null;
            const p1 = NodePositions[from];
            const p2 = NodePositions[to];
            const LtoR = nodeOrder.indexOf(from) < nodeOrder.indexOf(to);
            
            // Adjust start/end points to hit the edges of the box, with slight vertical offset for clarity
            const startX = p1.x + (LtoR ? 20 : -20);
            const startY = p1.y + (LtoR ? -4 : 4);
            const endX = p2.x + (LtoR ? -26 : 26); // -26 to leave room for arrowhead
            const endY = p2.y + (LtoR ? -4 : 4);
            
            const isDashed = from === 'null_L' || to === 'null_R' || to === 'null_L';

            return (
              <path
                key={`${from}-${to}`}
                d={`M ${startX} ${startY} L ${endX} ${endY}`}
                stroke="var(--line)"
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrowhead)"
                strokeDasharray={isDashed ? '4 4' : 'none'}
              />
            );
          })}

          {/* 2. Draw Nodes */}
          {nodeOrder.map(id => {
            const pos = NodePositions[id];
            const isNull = id.startsWith('null');
            const isActive = pointers.curr === id || pointers.head === id;
            const val = nodeVals && nodeVals[id] !== undefined ? nodeVals[id] : pos.label;

            return (
              <g key={id} transform={`translate(${pos.x - 20}, ${pos.y - 20})`}>
                <rect
                  width={40} height={40} rx={6}
                  fill={isNull ? 'transparent' : 'var(--board-raised)'}
                  stroke={isActive ? 'var(--indigo)' : 'var(--line)'}
                  strokeWidth={isActive ? 2.4 : 1.5}
                  strokeDasharray={isNull ? '4 4' : 'none'}
                />
                <text
                  x={20} y={20}
                  fill={isNull ? 'var(--chalk-faint)' : 'var(--chalk)'}
                  fontSize={15} fontWeight={600}
                  fontFamily="'JetBrains Mono', monospace"
                  textAnchor="middle" alignmentBaseline="middle"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* 3. Draw Pointers */}
          {Object.entries(pointers).map(([ptr, target]) => {
            if (!target) return null;
            const pos = NodePositions[target];
            const config = ptrOffsets[ptr];
            return (
              <text
                key={ptr}
                x={pos.x}
                y={pos.y + config.dy}
                fill={config.color}
                fontSize={13}
                fontWeight={700}
                fontFamily="'Plus Jakarta Sans', sans-serif"
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {ptr}
              </text>
            );
          })}

          {/* 4. Draw Array (Only for Intuitive approach) */}
          {vals && (
            <g transform="translate(180, 20)">
              <text x={-40} y={15} fill="var(--chalk-dim)" fontSize={13} fontFamily="'Plus Jakarta Sans', sans-serif">vals =</text>
              {vals.map((v, idx) => (
                <g key={idx} transform={`translate(${idx * 40}, 0)`}>
                  <rect 
                    width={30} height={30} rx={4} 
                    fill="var(--board-raised)" 
                    stroke={activeIndex === idx ? 'var(--indigo)' : 'var(--line)'} 
                    strokeWidth={activeIndex === idx ? 2 : 1} 
                  />
                  <text 
                    x={15} y={15} 
                    fill="var(--chalk)" 
                    fontSize={14} fontWeight={600} 
                    fontFamily="'JetBrains Mono', monospace" 
                    textAnchor="middle" alignmentBaseline="middle"
                  >
                    {v}
                  </text>
                </g>
              ))}
              {vals.length === 0 && (
                <text x={10} y={15} fill="var(--chalk-faint)" fontSize={13} fontStyle="italic">[ Empty ]</text>
              )}
            </g>
          )}

        </svg>
      </div>

      {/* ── Status HUD ── */}
      {stepData.status && (
        <div className="status-line" dangerouslySetInnerHTML={{ __html: stepData.status }} />
      )}

      {/* ── Explanation ── */}
      {stepData.explain && (
        <p className="explain" dangerouslySetInnerHTML={{ __html: stepData.explain }} />
      )}
    </div>
  );
}