// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Majority Element II (> N/3 times)',
  category: 'Arrays & Boyer-Moore Voting',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Finds all elements that appear strictly more than ⌊ N/3 ⌋ times in an array using the extended Boyer-Moore Voting Algorithm with two candidates and two count registers in O(N) time and O(1) space.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Extended Boyer-Moore (> N/3) Invariant',
  nodes: [
    { id: 'root', label: 'Boyer-Moore (> N/3) Strategy', children: ['pigeonhole-max-2', 'triplet-cancellation', 'candidate-registers', 'verification-pass'] },
    { id: 'pigeonhole-max-2', label: '1. At Most 2 Majority Elements', detail: 'By the Pigeonhole Principle, at most 2 distinct elements can each appear > N/3 times in any array' },
    { id: 'triplet-cancellation', label: '2. Triplet Mutual Cancellation', detail: 'Three distinct elements cancel each other out simultaneously; majority elements (> N/3) survive' },
    { id: 'candidate-registers', label: '3. Dual Registers (cand1, cand2)', detail: 'Track two candidates and two counts (count1, count2); increment matching candidate, or decrement both on mismatch' },
    { id: 'verification-pass', label: '4. Mandatory Verification Pass', detail: 'Unlike > N/2 where majority is guaranteed, candidates here might not exceed N/3; a second linear pass verifies actual frequencies' }
  ]
};

export const solutions = {
  cpp: `// C++ Extended Boyer-Moore Voting Algorithm (> N/3)
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> majorityElement(vector<int>& nums) {
        int n = nums.size();
        int cand1 = 0, cand2 = 0;
        int count1 = 0, count2 = 0;

        // Pass 1: Elect up to 2 candidates
        for (int x : nums) {
            if (count1 > 0 && x == cand1) {
                count1++;
            } else if (count2 > 0 && x == cand2) {
                count2++;
            } else if (count1 == 0) {
                cand1 = x;
                count1 = 1;
            } else if (count2 == 0) {
                cand2 = x;
                count2 = 1;
            } else {
                count1--;
                count2--;
            }
        }

        // Pass 2: Verify candidates exceed floor(n / 3)
        count1 = 0; count2 = 0;
        for (int x : nums) {
            if (x == cand1) count1++;
            else if (x == cand2) count2++;
        }

        vector<int> ans;
        if (count1 > n / 3) ans.push_back(cand1);
        if (count2 > n / 3) ans.push_back(cand2);
        return ans;
    }
};`,
  python: `# Python 3 Extended Boyer-Moore Voting (> N/3)
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def majorityElement(self, nums: list[int]) -> list[int]:
        n = len(nums)
        cand1, cand2 = None, None
        count1, count2 = 0, 0

        for x in nums:
            if count1 > 0 and x == cand1:
                count1 += 1
            elif count2 > 0 and x == cand2:
                count2 += 1
            elif count1 == 0:
                cand1 = x
                count1 = 1
            elif count2 == 0:
                cand2 = x
                count2 = 1
            else:
                count1 -= 1
                count2 -= 1

        # Verification pass
        c1 = nums.count(cand1)
        c2 = nums.count(cand2)

        ans = []
        if c1 > n // 3:
            ans.append(cand1)
        if cand2 != cand1 and c2 > n // 3:
            ans.append(cand2)
        return ans`,
  java: `// Java Extended Boyer-Moore Voting (> N/3)
// Time Complexity: O(N) | Space Complexity: O(1)
import java.util.*;

class Solution {
    public List<Integer> majorityElement(int[] nums) {
        int n = nums.length;
        int cand1 = 0, cand2 = 0;
        int count1 = 0, count2 = 0;

        for (int x : nums) {
            if (count1 > 0 && x == cand1) {
                count1++;
            } else if (count2 > 0 && x == cand2) {
                count2++;
            } else if (count1 == 0) {
                cand1 = x;
                count1 = 1;
            } else if (count2 == 0) {
                cand2 = x;
                count2 = 1;
            } else {
                count1--;
                count2--;
            }
        }

        count1 = 0;
        count2 = 0;
        for (int x : nums) {
            if (x == cand1) count1++;
            else if (x == cand2) count2++;
        }

        List<Integer> ans = new ArrayList<>();
        if (count1 > n / 3) ans.add(cand1);
        if (cand2 != cand1 && count2 > n / 3) ans.add(cand2);
        return ans;
    }
}`,
  javascript: `// JavaScript Extended Boyer-Moore Voting (> N/3)
// Time Complexity: O(N) | Space Complexity: O(1)
var majorityElement = function(nums) {
    const n = nums.length;
    let cand1 = null, cand2 = null;
    let count1 = 0, count2 = 0;

    for (const x of nums) {
        if (count1 > 0 && x === cand1) {
            count1++;
        } else if (count2 > 0 && x === cand2) {
            count2++;
        } else if (count1 === 0) {
            cand1 = x;
            count1 = 1;
        } else if (count2 === 0) {
            cand2 = x;
            count2 = 1;
        } else {
            count1--;
            count2--;
        }
    }

    let c1 = 0, c2 = 0;
    for (const x of nums) {
        if (x === cand1) c1++;
        else if (x === cand2) c2++;
    }

    const ans = [];
    if (c1 > Math.floor(n / 3)) ans.push(cand1);
    if (cand2 !== cand1 && c2 > Math.floor(n / 3)) ans.push(cand2);
    return ans;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: nums = [1, 1, 1, 3, 3, 2, 2, 2], Threshold > 8/3 = 2',
    phase: 'SETUP',
    track: {
      label: 'Array nums',
      items: [1, 1, 1, 3, 3, 2, 2, 2],
      pointers: []
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Array Size N', value: '8' },
      { label: 'Threshold (> ⌊N/3⌋)', value: '> 2 (>= 3 times)' },
      { label: 'Max Possible Qualifiers', value: 'At most 2' },
      { label: 'Candidates', value: 'None' }
    ],
    variables: { cand1: 'null', cand2: 'null', count1: 0, count2: 0, threshold: 'floor(8/3) = 2' },
    formula: 'Pigeonhole Theorem: 3 * (floor(N/3) + 1) > N ==> At most 2 elements can qualify',
    action: 'Initialize Extended Boyer-Moore Voting with two candidate registers and two vote counters',
    explain: 'To find all elements that appear strictly more than N/3 times, we track up to two candidates. Three distinct elements cancel each other out in triplets.',
    intuition: 'If an element appears more than 1/3 of the total, it cannot be fully eliminated by groups of 3 distinct elements.'
  },
  {
    title: '2. Index 0 (val 1): count1 is 0 => Elect cand1 = 1, count1 = 1',
    phase: 'ELECT_CAND1',
    track: {
      label: 'Array nums',
      items: [
        { value: 1, status: 'match' },
        1, 1, 3, 3, 2, 2, 2
      ],
      pointers: [
        { index: 0, label: 'i' }
      ]
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'cand1', value: '1', highlight: true },
      { label: 'count1', value: '1' },
      { label: 'cand2', value: 'null' },
      { label: 'count2', value: '0' }
    ],
    variables: { i: 0, num: 1, cand1: 1, count1: 1, cand2: 'null', count2: 0 },
    formula: 'count1 == 0 ==> cand1 = 1; count1 = 1;',
    action: 'count1 is 0. Elect 1 as first candidate with count1 = 1',
    explain: 'At index 0, count1 is empty. Candidate 1 becomes 1 with count1 = 1.',
    intuition: 'First candidate registered.'
  },
  {
    title: '3. Indices 1 & 2 (val 1, 1): Matches cand1 => count1 increases to 3',
    phase: 'REINFORCE_CAND1',
    track: {
      label: 'Array nums',
      items: [
        { value: 1, status: 'match' },
        { value: 1, status: 'match' },
        { value: 1, status: 'match' },
        3, 3, 2, 2, 2
      ],
      pointers: [
        { index: 2, label: 'i' }
      ]
    },
    activeI: 2,
    activeJ: null,
    metrics: [
      { label: 'cand1', value: '1' },
      { label: 'count1', value: '3 (Strong)', highlight: true },
      { label: 'cand2', value: 'null' },
      { label: 'count2', value: '0' }
    ],
    variables: { i: 2, num: 1, cand1: 1, count1: 3, cand2: 'null', count2: 0 },
    formula: 'x == cand1 ==> count1++;',
    action: 'Elements at indices 1 and 2 match cand1. count1 increments to 3',
    explain: 'Consecutive 1s match cand1, strengthening count1 to 3. cand2 remains unassigned.',
    intuition: 'Candidate 1 builds a solid buffer.'
  },
  {
    title: '4. Index 3 (val 3): Differs from cand1, count2 is 0 => Elect cand2 = 3',
    phase: 'ELECT_CAND2',
    track: {
      label: 'Array nums',
      items: [
        { value: 1, status: 'match' },
        { value: 1, status: 'match' },
        { value: 1, status: 'match' },
        { value: 3, status: 'match' },
        3, 2, 2, 2
      ],
      pointers: [
        { index: 3, label: 'i' }
      ]
    },
    activeI: 3,
    activeJ: null,
    metrics: [
      { label: 'cand1', value: '1' },
      { label: 'count1', value: '3' },
      { label: 'cand2', value: '3', highlight: true },
      { label: 'count2', value: '1' }
    ],
    variables: { i: 3, num: 3, cand1: 1, count1: 3, cand2: 3, count2: 1 },
    formula: 'count2 == 0 ==> cand2 = 3; count2 = 1;',
    action: 'Element 3 does not match cand1 (1). Elect 3 as second candidate with count2 = 1',
    explain: 'At index 3, num = 3 != cand1. Because count2 is 0, we assign cand2 = 3 with count2 = 1. Both candidate slots are now active.',
    intuition: 'Both candidate slots are now occupied by 1 and 3.'
  },
  {
    title: '5. Index 4 (val 3): Matches cand2 => count2 increases to 2',
    phase: 'REINFORCE_CAND2',
    track: {
      label: 'Array nums',
      items: [
        { value: 1, status: 'match' },
        { value: 1, status: 'match' },
        { value: 1, status: 'match' },
        { value: 3, status: 'match' },
        { value: 3, status: 'match' },
        2, 2, 2
      ],
      pointers: [
        { index: 4, label: 'i' }
      ]
    },
    activeI: 4,
    activeJ: null,
    metrics: [
      { label: 'cand1', value: '1' },
      { label: 'count1', value: '3' },
      { label: 'cand2', value: '3' },
      { label: 'count2', value: '2', highlight: true }
    ],
    variables: { i: 4, num: 3, cand1: 1, count1: 3, cand2: 3, count2: 2 },
    formula: 'x == cand2 ==> count2++;',
    action: 'Element 3 matches cand2. Increment count2 to 2',
    explain: 'nums[4] = 3 reinforces cand2. Both candidates have positive vote balances (cand1: 3, cand2: 2).',
    intuition: 'Both candidates currently hold strong support.'
  },
  {
    title: '6. Index 5 (val 2): Mismatch with Both! Triplet Cancellation',
    phase: 'TRIPLET_CANCEL',
    track: {
      label: 'Array nums',
      items: [
        { value: 1, status: 'match' },
        { value: 1, status: 'match' },
        { value: 1, status: 'match' },
        { value: 3, status: 'match' },
        { value: 3, status: 'match' },
        { value: 2, status: 'discarded' },
        2, 2
      ],
      pointers: [
        { index: 5, label: 'i (2 != 1, 3)' }
      ]
    },
    activeI: 5,
    activeJ: null,
    metrics: [
      { label: 'New Element', value: '2' },
      { label: 'cand1 / count1', value: '1 / 2 (Decremented)' },
      { label: 'cand2 / count2', value: '3 / 1 (Decremented)' },
      { label: 'Action', value: 'Triplet Cancellation', highlight: true }
    ],
    variables: { i: 5, num: 2, count1: 2, count2: 1, rule: 'count1--; count2--;' },
    formula: 'x != cand1 && x != cand2 ==> count1--; count2--;',
    action: 'Element 2 differs from both cand1 (1) and cand2 (3). Decrement both counts',
    explain: 'Element 2 forms a triplet of three distinct values (1, 3, 2). All three cancel each other out. count1 drops to 2, and count2 drops to 1.',
    intuition: 'Triplet elimination ensures no minority group can outlast true majority candidates.'
  },
  {
    title: '7. Index 6 (val 2): Mismatch Again! count2 Drops to 0',
    phase: 'TRIPLET_CANCEL',
    track: {
      label: 'Array nums',
      items: [
        { value: 1, status: 'match' },
        { value: 1, status: 'match' },
        { value: 1, status: 'match' },
        { value: 3, status: 'match' },
        { value: 3, status: 'match' },
        { value: 2, status: 'discarded' },
        { value: 2, status: 'discarded' },
        2
      ],
      pointers: [
        { index: 6, label: 'i' }
      ]
    },
    activeI: 6,
    activeJ: null,
    metrics: [
      { label: 'New Element', value: '2' },
      { label: 'cand1 / count1', value: '1 / 1' },
      { label: 'cand2 / count2', value: '3 / 0 (Exhausted)', highlight: true },
      { label: 'Status', value: 'cand2 Slot Vacated' }
    ],
    variables: { i: 6, num: 2, count1: 1, count2: 0, cand2Vacant: true },
    formula: 'x != cand1 && x != cand2 ==> count1 = 1, count2 = 0',
    action: 'Second 2 cancels another pair of votes. count2 reaches 0, vacating cand2 slot',
    explain: 'Another 2 arrives, decrementing count1 to 1 and count2 to 0. Candidate 3 has lost all its buffer.',
    intuition: 'Candidate 3 is dethroned.'
  },
  {
    title: '8. Index 7 (val 2): count2 is 0 => Elect cand2 = 2',
    phase: 'ELECT_CAND2',
    track: {
      label: 'Array nums',
      items: [
        { value: 1, status: 'match' },
        { value: 1, status: 'match' },
        { value: 1, status: 'match' },
        3, 3,
        { value: 2, status: 'match' },
        { value: 2, status: 'match' },
        { value: 2, status: 'match' }
      ],
      pointers: [
        { index: 7, label: 'i' }
      ]
    },
    activeI: 7,
    activeJ: null,
    metrics: [
      { label: 'cand1', value: '1 (Survivor)' },
      { label: 'count1', value: '1' },
      { label: 'cand2', value: '2 (New Survivor)', highlight: true },
      { label: 'count2', value: '1' }
    ],
    variables: { i: 7, num: 2, cand1: 1, cand2: 2, pass1Complete: true },
    formula: 'count2 == 0 ==> cand2 = 2; count2 = 1;',
    action: 'At the final index, count2 is 0. Elect 2 as cand2 with count2 = 1. Pass 1 finishes!',
    explain: 'Pass 1 concludes with two potential majority candidates: cand1 = 1 and cand2 = 2.',
    intuition: 'Both survivors will now be tested in Pass 2.'
  },
  {
    title: '9. Completed: Verification Pass Confirms Both 1 and 2 Appear 3 Times (> 2)',
    phase: 'COMPLETED',
    track: {
      label: 'Array nums (Qualifiers: 1 and 2)',
      items: [
        { value: 1, status: 'match' },
        { value: 1, status: 'match' },
        { value: 1, status: 'match' },
        3, 3,
        { value: 2, status: 'match' },
        { value: 2, status: 'match' },
        { value: 2, status: 'match' }
      ],
      pointers: []
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Count of 1', value: '3 / 8 (> 2)', highlight: true },
      { label: 'Count of 2', value: '3 / 8 (> 2)', highlight: true },
      { label: 'Final Result', value: '[1, 2]', highlight: true },
      { label: 'Time Complexity', value: 'O(N) Two Passes' },
      { label: 'Space Complexity', value: 'O(1) Auxiliary' }
    ],
    variables: {
      count1: 3,
      count2: 3,
      threshold: 2,
      result: '[1, 2]',
      qualifies1: '3 > 2 (True)',
      qualifies2: '3 > 2 (True)'
    },
    formula: 'count(1) = 3 > 2, count(2) = 3 > 2 ==> Result = [1, 2]',
    action: 'Verification pass confirms both 1 and 2 appear 3 times (> 2). Return [1, 2].',
    explain: 'Both candidates 1 and 2 appear 3 times out of 8, each strictly exceeding the > floor(8/3) = 2 threshold. The algorithm completes in two linear passes with O(1) auxiliary space.',
    intuition: 'Extended Boyer-Moore accurately isolates multiple majority elements.'
  }
];
