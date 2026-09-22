// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Leaders in an Array (Superior Elements)',
  category: 'Arrays & Suffix Scan',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Finds all leaders in an array (elements strictly greater than all elements to their right) in linear time by scanning backwards from right to left while maintaining the maximum element seen so far.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Leaders in Array Strategy',
  nodes: [
    { id: 'root', label: 'Right-to-Left Suffix Maximum', children: ['rightmost-base', 'suffix-max', 'leader-condition', 'reverse-order', 'complexity'] },
    { id: 'rightmost-base', label: '1. Rightmost Element Base Case', detail: 'The last element arr[n-1] has no right neighbors, so it is unconditionally a leader.' },
    { id: 'suffix-max', label: '2. Track Running Suffix Max', detail: 'Maintain maxFromRight = arr[n-1]. Eliminates redundant inner loop scans.' },
    { id: 'leader-condition', label: '3. Single Comparison Check', detail: 'If arr[i] > maxFromRight, arr[i] dominates all right elements; append to leaders and update max.' },
    { id: 'reverse-order', label: '4. Order Preservation', detail: 'Collected leaders [6, 12, 22] are reversed to restore original left-to-right order [22, 12, 6].' },
    { id: 'complexity', label: '5. Optimal Linear Bounds', detail: 'Single backward pass takes O(N) time with O(1) extra space outside the output array.' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal O(N) Right-to-Left Suffix Scan
// Time Complexity: O(N) | Space Complexity: O(1) Auxiliary
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<int> leaders(vector<int>& arr) {
        int n = arr.size();
        if (n == 0) return {};

        vector<int> result;
        int maxFromRight = arr[n - 1];
        result.push_back(maxFromRight); // Rightmost element is always a leader

        // Scan backwards from n - 2 down to 0
        for (int i = n - 2; i >= 0; i--) {
            if (arr[i] > maxFromRight) {
                result.push_back(arr[i]);
                maxFromRight = arr[i]; // Update running suffix maximum
            }
        }

        // Reverse to match original left-to-right order
        reverse(result.begin(), result.end());
        return result;
    }
};`,
  python: `# Python 3 Optimal O(N) Right-to-Left Suffix Scan
# Time Complexity: O(N) | Space Complexity: O(1) Auxiliary
class Solution:
    def leaders(self, arr: list[int]) -> list[int]:
        if not arr:
            return []

        n = len(arr)
        result = [arr[n - 1]]
        max_from_right = arr[n - 1]

        # Traverse backwards
        for i in range(n - 2, -1, -1):
            if arr[i] > max_from_right:
                result.append(arr[i])
                max_from_right = arr[i]

        result.reverse()
        return result`,
  java: `// Java Optimal O(N) Right-to-Left Suffix Scan
// Time Complexity: O(N) | Space Complexity: O(1) Auxiliary
import java.util.*;

class Solution {
    public static ArrayList<Integer> leaders(int[] arr) {
        ArrayList<Integer> result = new ArrayList<>();
        int n = arr.length;
        if (n == 0) return result;

        int maxFromRight = arr[n - 1];
        result.add(maxFromRight);

        for (int i = n - 2; i >= 0; i--) {
            if (arr[i] > maxFromRight) {
                result.add(arr[i]);
                maxFromRight = arr[i];
            }
        }

        Collections.reverse(result);
        return result;
    }
}`,
  javascript: `// JavaScript Optimal O(N) Right-to-Left Suffix Scan
// Time Complexity: O(N) | Space Complexity: O(1) Auxiliary
var leaders = function(arr) {
    const n = arr.length;
    if (n === 0) return [];

    const result = [arr[n - 1]];
    let maxFromRight = arr[n - 1];

    for (let i = n - 2; i >= 0; i--) {
        if (arr[i] > maxFromRight) {
            result.push(arr[i]);
            maxFromRight = arr[i];
        }
    }

    return result.reverse();
};`
};

export const steps = [
  {
    title: '1. Setup: Array nums = [10, 22, 12, 3, 0, 6]',
    phase: 'SETUP',
    track: {
      label: 'Input Array (Size = 6)',
      items: [
        { val: 10 },
        { val: 22 },
        { val: 12 },
        { val: 3 },
        { val: 0 },
        { val: 6, status: 'active', badge: 'Tail' }
      ],
      pointers: [
        { index: 5, label: 'i = 5 (Start)' }
      ]
    },
    activeI: 5,
    activeJ: null,
    metrics: [
      { label: 'Array Size N', value: 6 },
      { label: 'maxFromRight', value: 'Unset' },
      { label: 'Leaders Found', value: '[]' }
    ],
    formula: 'Leader condition: arr[i] > all elements to its right',
    action: 'Initialize backward scan from rightmost index (i = 5).',
    explain: 'A brute-force forward scan tests each element against all right neighbors in O(N^2) time. Traversing from right to left lets us test against a single running maximum in O(N) time.',
    intuition: 'If arr[i] is greater than the maximum of all elements to its right, it is strictly greater than every individual element to its right.',
    variables: { i: 5, n: 6, maxFromRight: 'None', leaders: [] }
  },
  {
    title: '2. Index 5: nums[5] = 6 is Unconditionally a Leader',
    phase: 'LEADER_FOUND',
    track: {
      label: 'Rightmost Element Processed',
      items: [
        { val: 10 },
        { val: 22 },
        { val: 12 },
        { val: 3 },
        { val: 0 },
        { val: 6, status: 'match', badge: 'Leader #1' }
      ],
      pointers: [
        { index: 5, label: 'i = 5 (Leader)' }
      ]
    },
    activeI: 5,
    activeJ: null,
    metrics: [
      { label: 'nums[5]', value: 6 },
      { label: 'maxFromRight', value: 6, highlight: true },
      { label: 'Leaders', value: '[6]' }
    ],
    formula: 'maxFromRight = arr[n-1] = 6; leaders.push(6);',
    action: 'The rightmost element (6) has no elements to its right, so it is always a leader.',
    explain: 'Set maxFromRight = 6. Append 6 to the leaders list. Move pointer left to index 4.',
    intuition: 'Base case of the suffix scan.',
    variables: { i: 5, 'nums[5]': 6, maxFromRight: 6, leaders: [6] }
  },
  {
    title: '3. Index 4: nums[4] = 0 <= maxFromRight (6) -> Discarded',
    phase: 'SCANNING',
    track: {
      label: 'Comparing nums[4] vs maxFromRight',
      items: [
        { val: 10 },
        { val: 22 },
        { val: 12 },
        { val: 3 },
        { val: 0, status: 'discarded', badge: '< 6' },
        { val: 6, status: 'match', badge: 'Leader' }
      ],
      pointers: [
        { index: 4, label: 'i = 4' },
        { index: 5, label: 'max (6)' }
      ]
    },
    activeI: 4,
    activeJ: 5,
    metrics: [
      { label: 'nums[4]', value: 0 },
      { label: 'maxFromRight', value: 6 },
      { label: '0 > 6 ?', value: 'False (Skip)' }
    ],
    formula: 'arr[4] <= maxFromRight (0 <= 6)',
    action: 'Compare nums[4] (0) with maxFromRight (6). Since 0 <= 6, 0 cannot be a leader.',
    explain: 'Element 6 exists to the right and is greater than 0. Thus, 0 fails the leader condition. maxFromRight remains 6.',
    intuition: 'A single O(1) comparison prunes the entire right suffix.',
    variables: { i: 4, 'nums[4]': 0, maxFromRight: 6, isLeader: false }
  },
  {
    title: '4. Index 3: nums[3] = 3 <= maxFromRight (6) -> Discarded',
    phase: 'SCANNING',
    track: {
      label: 'Comparing nums[3] vs maxFromRight',
      items: [
        { val: 10 },
        { val: 22 },
        { val: 12 },
        { val: 3, status: 'discarded', badge: '< 6' },
        { val: 0, status: 'discarded' },
        { val: 6, status: 'match', badge: 'Leader' }
      ],
      pointers: [
        { index: 3, label: 'i = 3' },
        { index: 5, label: 'max (6)' }
      ]
    },
    activeI: 3,
    activeJ: 5,
    metrics: [
      { label: 'nums[3]', value: 3 },
      { label: 'maxFromRight', value: 6 },
      { label: '3 > 6 ?', value: 'False (Skip)' }
    ],
    formula: 'arr[3] <= maxFromRight (3 <= 6)',
    action: 'Compare nums[3] (3) with maxFromRight (6). 3 <= 6, not a leader.',
    explain: 'Node 3 is dominated by 6 to its right. Skip and decrement i to 2.',
    intuition: 'Fast forward past non-dominant elements.',
    variables: { i: 3, 'nums[3]': 3, maxFromRight: 6, isLeader: false }
  },
  {
    title: '5. Index 2: nums[2] = 12 > maxFromRight (6) -> New Leader!',
    phase: 'LEADER_FOUND',
    track: {
      label: 'New Suffix Maximum Discovered',
      items: [
        { val: 10 },
        { val: 22 },
        { val: 12, status: 'match', badge: 'Leader #2' },
        { val: 3, status: 'discarded' },
        { val: 0, status: 'discarded' },
        { val: 6, status: 'match', badge: 'Leader #1' }
      ],
      pointers: [
        { index: 2, label: 'i = 2 (Leader)' }
      ]
    },
    activeI: 2,
    activeJ: null,
    metrics: [
      { label: 'nums[2]', value: 12 },
      { label: 'New maxFromRight', value: 12, highlight: true },
      { label: 'Leaders', value: '[6, 12]' }
    ],
    formula: 'arr[2] > maxFromRight (12 > 6) ==> maxFromRight = 12',
    action: '12 > 6: nums[2] dominates every element to its right! Append 12 to leaders.',
    explain: 'Because 12 is greater than the maximum of all right elements, it is strictly greater than all elements {3, 0, 6}. Update maxFromRight = 12.',
    intuition: 'New highest bar established for all elements to the left.',
    variables: { i: 2, 'nums[2]': 12, oldMax: 6, newMax: 12, leaders: [6, 12] }
  },
  {
    title: '6. Index 1: nums[1] = 22 > maxFromRight (12) -> New Leader!',
    phase: 'LEADER_FOUND',
    track: {
      label: 'Highest Peak Reached',
      items: [
        { val: 10 },
        { val: 22, status: 'match', badge: 'Leader #3' },
        { val: 12, status: 'match', badge: 'Leader #2' },
        { val: 3, status: 'discarded' },
        { val: 0, status: 'discarded' },
        { val: 6, status: 'match', badge: 'Leader #1' }
      ],
      pointers: [
        { index: 1, label: 'i = 1 (Leader)' }
      ]
    },
    activeI: 1,
    activeJ: null,
    metrics: [
      { label: 'nums[1]', value: 22 },
      { label: 'New maxFromRight', value: 22, highlight: true },
      { label: 'Leaders', value: '[6, 12, 22]' }
    ],
    formula: 'arr[1] > maxFromRight (22 > 12) ==> maxFromRight = 22',
    action: '22 > 12: nums[1] is strictly greater than all subsequent elements! Append 22 to leaders.',
    explain: '22 is greater than the current suffix max (12). It is crowned a leader. Update maxFromRight = 22.',
    intuition: 'Any element to the left must now exceed 22 to be a leader.',
    variables: { i: 1, 'nums[1]': 22, oldMax: 12, newMax: 22, leaders: [6, 12, 22] }
  },
  {
    title: '7. Index 0: nums[0] = 10 <= maxFromRight (22) -> Discarded',
    phase: 'SCANNING',
    track: {
      label: 'Final Element Checked',
      items: [
        { val: 10, status: 'discarded', badge: '< 22' },
        { val: 22, status: 'match', badge: 'Leader #3' },
        { val: 12, status: 'match', badge: 'Leader #2' },
        { val: 3, status: 'discarded' },
        { val: 0, status: 'discarded' },
        { val: 6, status: 'match', badge: 'Leader #1' }
      ],
      pointers: [
        { index: 0, label: 'i = 0' },
        { index: 1, label: 'max (22)' }
      ]
    },
    activeI: 0,
    activeJ: 1,
    metrics: [
      { label: 'nums[0]', value: 10 },
      { label: 'maxFromRight', value: 22 },
      { label: '10 > 22 ?', value: 'False (Skip)' }
    ],
    formula: 'arr[0] <= maxFromRight (10 <= 22)',
    action: 'nums[0] (10) <= 22. Element is dominated by 22. Scan finished.',
    explain: 'All indices from n-1 down to 0 have been inspected in exactly one pass.',
    intuition: 'Backward scan completed in exactly N iterations.',
    variables: { i: 0, 'nums[0]': 10, maxFromRight: 22, completed: true }
  },
  {
    title: '8. Complete: Reverse Leaders -> [22, 12, 6]',
    phase: 'COMPLETED',
    track: {
      label: 'Final Leaders in Left-to-Right Order',
      items: [
        { val: 22, status: 'match', badge: 'Leader' },
        { val: 12, status: 'match', badge: 'Leader' },
        { val: 6, status: 'match', badge: 'Leader' }
      ],
      pointers: [
        { index: 0, label: 'Leader 1' },
        { index: 1, label: 'Leader 2' },
        { index: 2, label: 'Leader 3' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Result', value: '[22, 12, 6]', highlight: true },
      { label: 'Total Leaders', value: 3 },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Auxiliary Space', value: 'O(1)' }
    ],
    formula: 'result.reverse() ==> [22, 12, 6]',
    action: 'Reverse the collected leaders array to restore original left-to-right order.',
    explain: 'Because we scanned from right to left, leaders were collected as [6, 12, 22]. Reversing yields the final answer [22, 12, 6] in O(N) total time.',
    intuition: 'Right-to-left traversal turns an O(N^2) comparison nightmare into a clean, single-pass O(N) scan.',
    variables: { collected: [6, 12, 22], finalLeaders: [22, 12, 6], time: 'O(N)', space: 'O(1) aux' }
  }
];