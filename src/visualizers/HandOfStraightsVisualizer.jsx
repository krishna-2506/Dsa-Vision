export const rendererType = 'array-scan';

export const meta = {
  title: 'Hand of Straights',
  category: 'Heaps / Priority Queues',
  difficulty: 'Medium',
  timeComplexity: 'O(N log N)',
  spaceComplexity: 'O(N) frequency map & heap',
  description: 'Determines whether an array of cards can be partitioned into consecutive straight groups of size W. Uses a frequency map and Min-Heap to greedily extract and complete runs starting with the smallest available card (LeetCode 846).'
};

export const ideaMap = {
  title: 'Greedy Min-Heap Consecutive Grouping Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Divisibility Check',
      detail: 'If hand.length % groupSize != 0, it is impossible to partition cards evenly into groups of size W; return false.'
    },
    {
      id: 'step2',
      label: 'Frequency Map & Min-Heap',
      detail: 'Count frequencies of all cards and push unique card values into a Min-Heap to easily retrieve minimums.'
    },
    {
      id: 'step3',
      label: 'Greedy Straight Formation',
      detail: 'Pop smallest available card start. Check if consecutive cards start + i for i in 0..W-1 exist in required quantities.'
    },
    {
      id: 'step4',
      label: 'Decrement & Repeat',
      detail: 'Subtract the needed frequency from the map. If any required card is missing, return false. If all exhausted, return true.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Hand of Straights (LeetCode 846)
// Time Complexity: O(N log N) | Space Complexity: O(N)
#include <vector>
#include <map>
#include <queue>
using namespace std;

class Solution {
public:
    bool isNStraightHand(vector<int>& hand, int groupSize) {
        if (hand.size() % groupSize != 0) return false;

        map<int, int> count;
        for (int card : hand) count[card]++;

        priority_queue<int, vector<int>, greater<int>> minHeap;
        for (auto& [card, freq] : count) minHeap.push(card);

        while (!minHeap.empty()) {
            int first = minHeap.top();
            if (count[first] == 0) {
                minHeap.pop();
                continue;
            }

            int req = count[first];
            for (int i = 0; i < groupSize; i++) {
                int card = first + i;
                if (count[card] < req) return false;
                count[card] -= req;
            }
            minHeap.pop();
        }

        return true;
    }
};`,
  java: `// Java: Hand of Straights (LeetCode 846)
// Time Complexity: O(N log N) | Space Complexity: O(N)
import java.util.*;

class Solution {
    public boolean isNStraightHand(int[] hand, int groupSize) {
        if (hand.length % groupSize != 0) return false;

        TreeMap<Integer, Integer> count = new TreeMap<>();
        for (int card : hand) {
            count.put(card, count.getOrDefault(card, 0) + 1);
        }

        for (int card : count.keySet()) {
            int freq = count.get(card);
            if (freq > 0) {
                for (int i = 0; i < groupSize; i++) {
                    int nextCard = card + i;
                    if (count.getOrDefault(nextCard, 0) < freq) {
                        return false;
                    }
                    count.put(nextCard, count.get(nextCard) - freq);
                }
            }
        }
        return true;
    }
}`,
  python: `# Python: Hand of Straights (LeetCode 846)
# Time Complexity: O(N log N) | Space Complexity: O(N)
import heapq
from collections import Counter

class Solution:
    def isNStraightHand(self, hand: list[int], groupSize: int) -> bool:
        if len(hand) % groupSize != 0:
            return False

        count = Counter(hand)
        min_heap = list(count.keys())
        heapq.heapify(min_heap)

        while min_heap:
            first = min_heap[0]
            if count[first] == 0:
                heapq.heappop(min_heap)
                continue

            req = count[first]
            for i in range(groupSize):
                card = first + i
                if count[card] < req:
                    return False
                count[card] -= req

            heapq.heappop(min_heap)

        return True`,
  javascript: `// JavaScript: Hand of Straights (LeetCode 846)
// Time Complexity: O(N log N) | Space Complexity: O(N)
function isNStraightHand(hand, groupSize) {
  if (hand.length % groupSize !== 0) return false;

  const count = new Map();
  for (const card of hand) {
    count.set(card, (count.get(card) || 0) + 1);
  }

  const sortedCards = Array.from(count.keys()).sort((a, b) => a - b);

  for (const card of sortedCards) {
    const freq = count.get(card);
    if (freq > 0) {
      for (let i = 0; i < groupSize; i++) {
        const nextCard = card + i;
        const currentCount = count.get(nextCard) || 0;
        if (currentCount < freq) return false;
        count.set(nextCard, currentCount - freq);
      }
    }
  }

  return true;
}`
};

export const steps = [
  {
    phase: 'INITIAL_CARDS',
    title: '1. Sorted Cards Array: [1, 2, 2, 3, 3, 4, 6, 7, 8], groupSize = 3',
    arr: [1, 2, 2, 3, 3, 4, 6, 7, 8],
    auxiliaryTrack: ['freq: 1', 'freq: 2', 'freq: 2', 'freq: 2', 'freq: 2', 'freq: 1', 'freq: 1', 'freq: 1', 'freq: 1'],
    auxiliaryLabel: 'Card Status',
    activeIndices: [],
    customCard: {
      title: 'Hand Partitioning Setup',
      rows: [
        { label: 'Total Cards (N)', value: '9 cards' },
        { label: 'Group Size (W)', value: '3 consecutive cards per group' },
        { label: 'Expected Groups', value: '9 / 3 = 3 groups', accent: true },
        { label: 'Strategy', value: 'Min-Heap greedy selection from smallest' }
      ]
    },
    variables: {
      totalCards: 9,
      groupSize: 3,
      groupsFormed: 0,
      minCardAvailable: 1
    },
    explanation: 'Check hand of 9 cards. Since 9 % 3 == 0, we must form exactly 3 consecutive straight groups of 3 cards each.'
  },
  {
    phase: 'GROUP_1',
    title: '2. Form Group 1: Smallest Card 1 &rarr; Run [1, 2, 3]',
    arr: [1, 2, 2, 3, 3, 4, 6, 7, 8],
    auxiliaryTrack: ['Group 1 [1]', 'Group 1 [2]', 'Unused [2]', 'Group 1 [3]', 'Unused [3]', 'Unused [4]', 'Unused [6]', 'Unused [7]', 'Unused [8]'],
    auxiliaryLabel: 'Group Assignments',
    activeIndices: [0, 1, 3],
    customCard: {
      title: 'Group 1 Formed',
      rows: [
        { label: 'Min Card Available', value: '1', accent: true },
        { label: 'Straight Run', value: '[1, 2, 3] formed', accent: true },
        { label: 'Remaining Frequencies', value: 'count[1]=0, count[2]=1, count[3]=1' },
        { label: 'Groups Formed', value: '1 / 3' }
      ]
    },
    variables: {
      activeGroup: '[1, 2, 3]',
      groupsFormed: 1,
      minCardAvailable: 2
    },
    explanation: 'Min card is 1. Form group [1, 2, 3]. Deduct 1 frequency each from 1, 2, and 3. All required cards exist!'
  },
  {
    phase: 'GROUP_2',
    title: '3. Form Group 2: Smallest Card 2 &rarr; Run [2, 3, 4]',
    arr: [1, 2, 2, 3, 3, 4, 6, 7, 8],
    auxiliaryTrack: ['Group 1', 'Group 1', 'Group 2 [2]', 'Group 1', 'Group 2 [3]', 'Group 2 [4]', 'Unused [6]', 'Unused [7]', 'Unused [8]'],
    auxiliaryLabel: 'Group Assignments',
    activeIndices: [2, 4, 5],
    customCard: {
      title: 'Group 2 Formed',
      rows: [
        { label: 'Min Card Available', value: '2', accent: true },
        { label: 'Straight Run', value: '[2, 3, 4] formed', accent: true },
        { label: 'Remaining Frequencies', value: 'count[2]=0, count[3]=0, count[4]=0' },
        { label: 'Groups Formed', value: '2 / 3' }
      ]
    },
    variables: {
      activeGroup: '[2, 3, 4]',
      groupsFormed: 2,
      minCardAvailable: 6
    },
    explanation: 'Next smallest card with positive count is 2. Check for 2, 3, 4. All exist! Group 2 formed successfully.'
  },
  {
    phase: 'GROUP_3',
    title: '4. Form Group 3: Smallest Card 6 &rarr; Run [6, 7, 8]',
    arr: [1, 2, 2, 3, 3, 4, 6, 7, 8],
    auxiliaryTrack: ['Group 1', 'Group 1', 'Group 2', 'Group 1', 'Group 2', 'Group 2', 'Group 3 [6]', 'Group 3 [7]', 'Group 3 [8]'],
    auxiliaryLabel: 'Group Assignments',
    activeIndices: [6, 7, 8],
    customCard: {
      title: 'Group 3 Formed',
      rows: [
        { label: 'Min Card Available', value: '6', accent: true },
        { label: 'Straight Run', value: '[6, 7, 8] formed', accent: true },
        { label: 'Remaining Frequencies', value: 'All cards exhausted (count = 0)' },
        { label: 'Groups Formed', value: '3 / 3 (All complete)' }
      ]
    },
    variables: {
      activeGroup: '[6, 7, 8]',
      groupsFormed: 3,
      minCardAvailable: 'None'
    },
    explanation: 'Next smallest card is 6. Form group [6, 7, 8]. All cards have been completely consumed into valid consecutive groups.'
  },
  {
    phase: 'COMPLETE',
    title: '5. Result: TRUE &mdash; 3 Valid Consecutive Straight Groups Formed',
    arr: [1, 2, 2, 3, 3, 4, 6, 7, 8],
    auxiliaryTrack: ['G1', 'G1', 'G2', 'G1', 'G2', 'G2', 'G3', 'G3', 'G3'],
    auxiliaryLabel: 'Group Partition',
    activeIndices: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    customCard: {
      title: 'Hand of Straights Summary',
      rows: [
        { label: 'Group 1', value: '[1, 2, 3]' },
        { label: 'Group 2', value: '[2, 3, 4]' },
        { label: 'Group 3', value: '[6, 7, 8]' },
        { label: 'Result', value: 'TRUE (Valid Partition)', accent: true },
        { label: 'Time Complexity', value: 'O(N log N) greedy min-heap' }
      ]
    },
    variables: {
      result: true,
      totalGroups: 3,
      isValidStraightHand: true
    },
    explanation: 'All 9 cards partitioned into 3 consecutive groups: [1,2,3], [2,3,4], and [6,7,8]. Return true in O(N log N) time.'
  }
];
