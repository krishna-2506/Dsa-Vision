export const rendererType = 'queue';

export const meta = {
  title: 'Minimum Multiplications to Reach End',
  category: 'Graphs',
  difficulty: 'Medium',
  timeComplexity: 'O(100000 * N)',
  spaceComplexity: 'O(100000) Queue & Dist',
  description: 'Finds the minimum number of multiplications to reach end from start using an array of numbers, with values computed modulo 100000. Uses BFS queue as every multiplication step costs exactly 1 unit.'
};

export const ideaMap = {
  title: 'Modulo BFS Shortest Path Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Unit-Weight BFS Queue Setup',
      detail: 'Push (start, steps=0) into a FIFO queue and mark dist[start] = 0 across the 100,000 modulo space.'
    },
    {
      id: 'step2',
      label: 'Modulo Factor Transitions',
      detail: 'For each multiplier factor in arr, compute nextVal = (node * factor) % 100000.'
    },
    {
      id: 'step3',
      label: 'Distance Relaxation & Enqueue',
      detail: 'If steps + 1 < dist[nextVal], update dist[nextVal] and enqueue (nextVal, steps + 1).'
    },
    {
      id: 'step4',
      label: 'Early Target Exit',
      detail: 'The first time nextVal equals end, return steps + 1 since BFS guarantees minimal steps.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Minimum Multiplications to Reach End
// Time Complexity: O(100000 * N) | Space Complexity: O(100000)
#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    int minimumMultiplications(vector<int>& arr, int start, int end) {
        if (start == end) return 0;

        vector<int> dist(100000, 1e9);
        dist[start] = 0;

        queue<pair<int, int>> q; // {node, steps}
        q.push({start, 0});
        int mod = 100000;

        while (!q.empty()) {
            int node = q.front().first;
            int steps = q.front().second;
            q.pop();

            for (int factor : arr) {
                int num = (1LL * node * factor) % mod;

                if (steps + 1 < dist[num]) {
                    dist[num] = steps + 1;
                    if (num == end) return steps + 1;
                    q.push({num, steps + 1});
                }
            }
        }
        return -1;
    }
};`,
  java: `// Java: Minimum Multiplications to Reach End
// Time Complexity: O(100000 * N) | Space Complexity: O(100000)
import java.util.*;

class Solution {
    int minimumMultiplications(int[] arr, int start, int end) {
        if (start == end) return 0;

        int[] dist = new int[100000];
        Arrays.fill(dist, (int) 1e9);
        dist[start] = 0;

        Queue<int[]> q = new LinkedList<>();
        q.add(new int[]{start, 0});
        int mod = 100000;

        while (!q.isEmpty()) {
            int[] top = q.poll();
            int node = top[0];
            int steps = top[1];

            for (int factor : arr) {
                int num = (int) ((1L * node * factor) % mod);

                if (steps + 1 < dist[num]) {
                    dist[num] = steps + 1;
                    if (num == end) return steps + 1;
                    q.add(new int[]{num, steps + 1});
                }
            }
        }
        return -1;
    }
}`,
  python: `# Python: Minimum Multiplications to Reach End
# Time Complexity: O(100000 * N) | Space Complexity: O(100000)
from collections import deque

class Solution:
    def minimumMultiplications(self, arr: list[int], start: int, end: int) -> int:
        if start == end:
            return 0

        mod = 100000
        dist = [float('inf')] * mod
        dist[start] = 0

        q = deque([(start, 0)])

        while q:
            node, steps = q.popleft()

            for factor in arr:
                num = (node * factor) % mod

                if steps + 1 < dist[num]:
                    dist[num] = steps + 1
                    if num == end:
                        return steps + 1
                    q.append((num, steps + 1))

        return -1`,
  javascript: `// JavaScript: Minimum Multiplications to Reach End
// Time Complexity: O(100000 * N) | Space Complexity: O(100000)
function minimumMultiplications(arr, start, end) {
    if (start === end) return 0;

    const mod = 100000;
    const dist = new Array(mod).fill(Infinity);
    dist[start] = 0;

    const queue = [[start, 0]]; // [node, steps]

    while (queue.length > 0) {
        const [node, steps] = queue.shift();

        for (const factor of arr) {
            const num = (node * factor) % mod;

            if (steps + 1 < dist[num]) {
                dist[num] = steps + 1;
                if (num === end) return steps + 1;
                queue.push([num, steps + 1]);
            }
        }
    }
    return -1;
}`
};

export const steps = [
  {
    phase: 'INITIALIZE',
    title: 'Initialize BFS Queue: Start = 3, Target End = 30, Multipliers = [2, 5, 7]',
    queue: [3],
    inputList: [2, 5, 7],
    outputList: [],
    customCard: {
      title: 'Modulo BFS Initial State',
      rows: [
        { label: 'Start Number', value: '3 (dist[3] = 0)', accent: true },
        { label: 'Target End', value: '30' },
        { label: 'Multipliers (arr)', value: '[2, 5, 7]' },
        { label: 'Modulo Space', value: '100,000 states' }
      ]
    },
    variables: {
      start: 3,
      end: 30,
      queue: '[3]',
      currentSteps: 0
    },
    metrics: {
      queueLength: 1,
      targetReached: false,
      activePhase: 'ENQUEUE START'
    },
    explain: 'Initialize a FIFO queue with the start value 3 at step count 0. Every transition between values costs 1 multiplication step, making BFS optimal.'
  },
  {
    phase: 'PROCESS_NODE_3',
    title: 'Pop 3: Generate 3*2=6, 3*5=15, 3*7=21 at Step 1',
    queue: [6, 15, 21],
    inputList: [2, 5, 7],
    outputList: [6, 15, 21],
    customCard: {
      title: 'First Multiplication Step',
      rows: [
        { label: '3 * 2', value: '6 % 100000 = 6 -> dist[6] = 1', accent: true },
        { label: '3 * 5', value: '15 % 100000 = 15 -> dist[15] = 1', accent: true },
        { label: '3 * 7', value: '21 % 100000 = 21 -> dist[21] = 1', accent: true },
        { label: 'Queue Status', value: '[6, 15, 21] (front -> rear)' }
      ]
    },
    variables: {
      popped: 3,
      newQueue: '[6, 15, 21]',
      stepsCount: 1
    },
    metrics: {
      queueLength: 3,
      targetReached: false,
      activePhase: 'STEP 1 MULTIPLICATIONS'
    },
    explain: 'Pop 3 from queue. Multiply by factors 2, 5, and 7 to produce 6, 15, and 21. None equal the target 30 yet, so all three are enqueued at step 1.'
  },
  {
    phase: 'PROCESS_NODE_6',
    title: 'Pop 6: Multiply 6 * 5 = 30 -> Target End Reached at Step 2!',
    queue: [15, 21, 30],
    inputList: [2, 5, 7],
    outputList: [6, 15, 21, 30],
    customCard: {
      title: 'Target Discovered in BFS Queue',
      rows: [
        { label: 'Popped Node', value: '6 at step 1' },
        { label: 'Evaluation: 6 * 5', value: '30 % 100000 = 30 == TARGET END!', accent: true },
        { label: 'Shortest Path Sequence', value: '3 -> (x2) -> 6 -> (x5) -> 30' },
        { label: 'Total Operations', value: '2 Multiplications' }
      ]
    },
    variables: {
      node: 6,
      factor: 5,
      result: 30,
      steps: 2,
      status: 'TARGET REACHED'
    },
    metrics: {
      queueLength: 3,
      targetReached: true,
      activePhase: 'TARGET FOUND'
    },
    explain: 'Pop 6 from the queue. Multiplying 6 by factor 5 yields 30, which equals the destination end! Because BFS explores in non-decreasing step order, 2 is guaranteed minimal.'
  },
  {
    phase: 'COMPLETE',
    title: 'BFS Complete: Minimum Multiplications = 2',
    queue: [],
    inputList: [2, 5, 7],
    outputList: [30],
    customCard: {
      title: 'Shortest Multiplicative Path',
      rows: [
        { label: 'Target Value', value: '30' },
        { label: 'Minimum Multiplications', value: '2 Steps', accent: true },
        { label: 'Path Taken', value: '3 -> 6 -> 30' },
        { label: 'Complexity Guarantee', value: 'BFS terminates in at most 100,000 states' }
      ]
    },
    variables: {
      finalAnswer: 2,
      path: '3 -> 6 -> 30',
      status: 'OPTIMAL BFS COMPLETE'
    },
    metrics: {
      queueLength: 0,
      targetReached: true,
      activePhase: 'DONE'
    },
    explain: 'The target end 30 is reached in exactly 2 multiplication steps (3 -> 6 -> 30). Return 2.',
    intuition: 'Since all edge costs are uniform (1 multiplication), BFS guarantees the shortest path without requiring Dijkstra overhead.'
  }
];
