// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Majority Element (> N/2) — Boyer-Moore Voting Algorithm',
  category: 'Arrays & Voting Algorithm',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Finds the element that appears more than ⌊n / 2⌋ times in an array of size n using the Boyer-Moore Majority Voting Algorithm with constant O(1) space.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Boyer-Moore Voting Strategy',
  nodes: [
    { id: 'root', label: 'Boyer-Moore Principle', children: ['cancellation', 'candidate-pick', 'vote-tally', 'verification'] },
    { id: 'cancellation', label: '1. Pairwise Cancellation', detail: 'Any two distinct elements cancel each other out; the majority (> N/2) element will strictly outnumber all other elements combined' },
    { id: 'candidate-pick', label: '2. Elect Candidate', detail: 'When vote balance (count) drops to 0, current element becomes the new candidate with count = 1' },
    { id: 'vote-tally', label: '3. Increment / Decrement', detail: 'If element matches candidate, count increases by 1; if mismatch, count decreases by 1' },
    { id: 'verification', label: '4. Majority Guarantee', detail: 'If a majority is guaranteed by the problem statement, candidate is the answer in 1 pass' }
  ]
};

export const solutions = {
  cpp: `// C++ Boyer-Moore Voting Algorithm
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int count = 0;
        int candidate = 0;

        for (int num : nums) {
            if (count == 0) {
                candidate = num;
            }
            if (num == candidate) {
                count += 1;
            } else {
                count -= 1;
            }
        }

        return candidate;
    }
};`,
  python: `# Python 3 Boyer-Moore Voting Algorithm
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def majorityElement(self, nums: list[int]) -> int:
        count = 0
        candidate = None
        
        for num in nums:
            if count == 0:
                candidate = num
            count += (1 if num == candidate else -1)
            
        return candidate`,
  java: `// Java Boyer-Moore Voting Algorithm
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
    public int majorityElement(int[] nums) {
        int count = 0;
        int candidate = 0;

        for (int num : nums) {
            if (count == 0) {
                candidate = num;
            }
            if (num == candidate) {
                count++;
            } else {
                count--;
            }
        }
        return candidate;
    }
}`,
  javascript: `// JavaScript Boyer-Moore Voting Algorithm
// Time Complexity: O(N) | Space Complexity: O(1)
var majorityElement = function(nums) {
    let count = 0;
    let candidate = null;

    for (let num of nums) {
        if (count === 0) {
            candidate = num;
        }
        count += (num === candidate ? 1 : -1);
    }
    return candidate;
};`
};

export const steps = [
  {
    title: '1. Setup: nums = [2, 2, 1, 1, 1, 2, 2], count = 0',
    phase: 'SETUP',
    track: {
      label: 'Array nums',
      items: [2, 2, 1, 1, 1, 2, 2],
      pointers: []
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Array Size N', value: '7' },
      { label: 'Threshold (> N/2)', value: '> 3.5' },
      { label: 'Candidate', value: 'None' },
      { label: 'Vote Count', value: '0' }
    ],
    variables: { candidate: 'None', count: 0, rule: 'Pairwise cancellation leaves majority' },
    formula: 'count == 0 ==> candidate = num, count = 1',
    action: 'Initialize Boyer-Moore Voting Algorithm with count = 0 and candidate = null',
    explain: 'Since the majority element appears more than N/2 times, its occurrences strictly exceed the sum of all other elements. Pairwise cancellation guarantees the majority survives.',
    intuition: 'Every time we pair a majority element with a non-majority element, the ratio of majority elements among the remaining items actually increases.'
  },
  {
    title: '2. Index 0 (num = 2): count was 0 => Candidate = 2, count = 1',
    phase: 'ELECT_CANDIDATE',
    track: {
      label: 'Array nums',
      items: [{ value: 2, status: 'match' }, 2, 1, 1, 1, 2, 2],
      pointers: [{ index: 0, label: 'i' }]
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'Inspected num', value: '2' },
      { label: 'Candidate', value: '2', highlight: true },
      { label: 'Vote Count', value: '1' }
    ],
    variables: { i: 0, num: 2, candidate: 2, count: 1 },
    formula: 'count was 0 ==> candidate = 2; count = 1;',
    action: 'Count is 0. Elect 2 as current leader candidate with count = 1',
    explain: 'At index 0, the vote balance is 0. Candidate becomes 2, and count is set to 1.',
    intuition: 'With no active balance, the first element takes the lead.'
  },
  {
    title: '3. Index 1 (num = 2): Matches Candidate => count = 2',
    phase: 'VOTE_INCREMENT',
    track: {
      label: 'Array nums',
      items: [
        { value: 2, status: 'match' },
        { value: 2, status: 'match' },
        1, 1, 1, 2, 2
      ],
      pointers: [{ index: 1, label: 'i' }]
    },
    activeI: 1,
    activeJ: null,
    metrics: [
      { label: 'Inspected num', value: '2' },
      { label: 'Candidate', value: '2' },
      { label: 'Vote Count', value: '2 (Reinforced)', highlight: true }
    ],
    variables: { i: 1, num: 2, candidate: 2, count: 2 },
    formula: 'num == candidate ==> count++',
    action: 'Element 2 matches candidate 2. Increment count to 2',
    explain: 'At index 1, nums[1] = 2 matches the candidate. Its lead increases to count = 2.',
    intuition: 'Consecutive matching votes strengthen the candidate\'s majority lead.'
  },
  {
    title: '4. Index 2 (num = 1): Mismatch => count decreases to 1',
    phase: 'VOTE_DECREMENT',
    track: {
      label: 'Array nums',
      items: [
        { value: 2, status: 'match' },
        { value: 2, status: 'match' },
        { value: 1, status: 'discarded' },
        1, 1, 2, 2
      ],
      pointers: [{ index: 2, label: 'i' }]
    },
    activeI: 2,
    activeJ: null,
    metrics: [
      { label: 'Inspected num', value: '1' },
      { label: 'Candidate', value: '2' },
      { label: 'Vote Count', value: '1 (Cancelled 1 vote)' }
    ],
    variables: { i: 2, num: 1, candidate: 2, count: 1 },
    formula: 'num != candidate ==> count--',
    action: 'Element 1 disagrees with candidate 2. Decrement count from 2 to 1',
    explain: 'At index 2, nums[2] = 1 cancels one vote for candidate 2. Count drops to 1.',
    intuition: 'Pairwise cancellation at work: one non-candidate cancels out one candidate vote.'
  },
  {
    title: '5. Index 3 (num = 1): Mismatch => count drops to 0!',
    phase: 'BALANCE_ZERO',
    track: {
      label: 'Array nums',
      items: [
        { value: 2, status: 'match' },
        { value: 2, status: 'match' },
        { value: 1, status: 'discarded' },
        { value: 1, status: 'discarded' },
        1, 2, 2
      ],
      pointers: [{ index: 3, label: 'i' }]
    },
    activeI: 3,
    activeJ: null,
    metrics: [
      { label: 'Inspected num', value: '1' },
      { label: 'Candidate', value: '2' },
      { label: 'Vote Count', value: '0 (Nullified)', highlight: true }
    ],
    variables: { i: 3, num: 1, candidate: 2, count: 0, prefixBalanced: 'Prefix [2, 2, 1, 1] cancelled out' },
    formula: 'num != candidate ==> count = 0 (Prefix cancelled)',
    action: 'Element 1 cancels the remaining vote for candidate 2. Count drops to 0',
    explain: 'At index 3, nums[3] = 1. Count decrements to 0. The prefix [2, 2, 1, 1] contains exactly two 2s and two 1s, completely balancing out to 0.',
    intuition: 'When a balanced prefix is removed, the majority element in the whole array remains the majority element in the suffix!'
  },
  {
    title: '6. Index 4 (num = 1): count was 0 => Candidate = 1, count = 1',
    phase: 'ELECT_CANDIDATE',
    track: {
      label: 'Array nums',
      items: [
        2, 2, 1, 1,
        { value: 1, status: 'match' },
        2, 2
      ],
      pointers: [{ index: 4, label: 'i' }]
    },
    activeI: 4,
    activeJ: null,
    metrics: [
      { label: 'Inspected num', value: '1' },
      { label: 'New Candidate', value: '1', highlight: true },
      { label: 'Vote Count', value: '1' }
    ],
    variables: { i: 4, num: 1, candidate: 1, count: 1 },
    formula: 'count == 0 ==> candidate = 1; count = 1;',
    action: 'Balance was 0. Elect 1 as new candidate with count = 1',
    explain: 'At index 4, count was 0. Candidate updates to 1 with count = 1.',
    intuition: 'New unexamined territory begins. The first element claims candidate status.'
  },
  {
    title: '7. Index 5 (num = 2): Mismatch => count drops to 0',
    phase: 'VOTE_DECREMENT',
    track: {
      label: 'Array nums',
      items: [
        2, 2, 1, 1,
        { value: 1, status: 'discarded' },
        { value: 2, status: 'discarded' },
        2
      ],
      pointers: [{ index: 5, label: 'i' }]
    },
    activeI: 5,
    activeJ: null,
    metrics: [
      { label: 'Inspected num', value: '2' },
      { label: 'Candidate', value: '1' },
      { label: 'Vote Count', value: '0 (Nullified)' }
    ],
    variables: { i: 5, num: 2, candidate: 1, count: 0 },
    formula: 'num != candidate ==> count = 0',
    action: 'Element 2 cancels candidate 1. Count falls back to 0',
    explain: 'At index 5, nums[5] = 2 cancels candidate 1. Count drops to 0.',
    intuition: 'Pair [1, 2] cancels out cleanly.'
  },
  {
    title: '8. Index 6 (num = 2): count was 0 => Candidate = 2, count = 1',
    phase: 'ELECT_CANDIDATE',
    track: {
      label: 'Array nums',
      items: [
        2, 2, 1, 1, 1, 2,
        { value: 2, status: 'match' }
      ],
      pointers: [{ index: 6, label: 'i' }]
    },
    activeI: 6,
    activeJ: null,
    metrics: [
      { label: 'Inspected num', value: '2' },
      { label: 'Surviving Candidate', value: '2', highlight: true },
      { label: 'Final Count', value: '1' }
    ],
    variables: { i: 6, num: 2, candidate: 2, count: 1, traversalFinished: true },
    formula: 'count == 0 ==> candidate = 2; count = 1;',
    action: 'Count is 0 at final index. Candidate 2 elected with count = 1. Traversal ends.',
    explain: 'At the final index, count was 0. Candidate becomes 2 with count = 1. Loop completes.',
    intuition: 'Candidate 2 is the lone survivor across the cancellation battles.'
  },
  {
    title: '9. Completed: Majority Element is 2 (Appears 4 times > 3.5)',
    phase: 'COMPLETED',
    track: {
      label: 'Array nums (Majority = 2)',
      items: [
        { value: 2, status: 'match' },
        { value: 2, status: 'match' },
        1, 1, 1,
        { value: 2, status: 'match' },
        { value: 2, status: 'match' }
      ],
      pointers: []
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Majority Element', value: '2', highlight: true },
      { label: 'Frequency in nums', value: '4 / 7 (> 50%)' },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1)' }
    ],
    variables: {
      winner: 2,
      occurrences: 4,
      arrayLength: 7,
      isStrictlyMajority: '4 > 3.5 (True)'
    },
    formula: 'count(2) = 4 > ⌊7 / 2⌋ = 3 ==> Majority Element = 2',
    action: 'Return 2 as the majority element. Constant O(1) space, linear O(N) time.',
    explain: 'Boyer-Moore Voting Algorithm accurately identifies 2 as the majority element. Verification pass confirms 2 appears 4 times out of 7, strictly exceeding the > N/2 threshold.',
    intuition: 'Even when elements cancel each other out throughout the array, the genuine majority element cannot be completely eliminated.'
  }
];
