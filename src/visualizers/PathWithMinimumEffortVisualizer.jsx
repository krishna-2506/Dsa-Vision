export const rendererType = 'dp-grid';

export const meta = {
  title: 'Path With Minimum Effort',
  category: 'Graphs',
  difficulty: 'Medium',
  timeComplexity: 'O(N * M log(N * M))',
  spaceComplexity: 'O(N * M)',
  description: 'Finds a route from top-left (0, 0) to bottom-right (N-1, M-1) such that the maximum absolute height difference between consecutive cells along the path is minimized (LeetCode 1631).'
};

export const ideaMap = {
  title: 'Modified Dijkstra Min-Max Effort Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Dijkstra Min-Heap Initialization',
      detail: 'Initialize dist[N][M] with infinity and dist[0][0] = 0; push (effort=0, r=0, c=0) into priority queue.'
    },
    {
      id: 'step2',
      label: 'Greedy Minimum Extraction',
      detail: 'Always pop the state with the minimum accumulated maximum-step effort.'
    },
    {
      id: 'step3',
      label: 'Bottleneck Relaxation',
      detail: 'For each 4-directional neighbor, newEffort = max(currentEffort, abs(heights[r][c] - heights[nr][nc])).'
    },
    {
      id: 'step4',
      label: 'Early Exit at Destination',
      detail: 'When bottom-right cell (N-1, M-1) is popped from heap, its effort is guaranteed minimal.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Path With Minimum Effort (LeetCode 1631)
// Time Complexity: O(N * M log(N * M)) | Space Complexity: O(N * M)
#include <vector>
#include <queue>
#include <cmath>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minimumEffortPath(vector<vector<int>>& heights) {
        int n = heights.size(), m = heights[0].size();
        priority_queue<pair<int, pair<int, int>>,
                       vector<pair<int, pair<int, int>>>,
                       greater<pair<int, pair<int, int>>>> pq;

        vector<vector<int>> dist(n, vector<int>(m, 1e9));
        dist[0][0] = 0;
        pq.push({0, {0, 0}}); // {effort, {r, c}}

        int dRow[] = {-1, 0, 1, 0};
        int dCol[] = {0, 1, 0, -1};

        while (!pq.empty()) {
            auto it = pq.top();
            pq.pop();
            int diff = it.first;
            int r = it.second.first;
            int c = it.second.second;

            if (r == n - 1 && c == m - 1) return diff;
            if (diff > dist[r][c]) continue;

            for (int i = 0; i < 4; i++) {
                int nr = r + dRow[i], nc = c + dCol[i];
                if (nr >= 0 && nr < n && nc >= 0 && nc < m) {
                    int stepDiff = abs(heights[r][c] - heights[nr][nc]);
                    int newEffort = max(diff, stepDiff);
                    if (newEffort < dist[nr][nc]) {
                        dist[nr][nc] = newEffort;
                        pq.push({newEffort, {nr, nc}});
                    }
                }
            }
        }
        return 0;
    }
};`,
  java: `// Java: Path With Minimum Effort (LeetCode 1631)
// Time Complexity: O(N * M log(N * M)) | Space Complexity: O(N * M)
import java.util.*;

class Solution {
    public int minimumEffortPath(int[][] heights) {
        int n = heights.length, m = heights[0].length;
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        int[][] dist = new int[n][m];
        for (int[] row : dist) Arrays.fill(row, Integer.MAX_VALUE);

        dist[0][0] = 0;
        pq.offer(new int[]{0, 0, 0}); // {effort, r, c}

        int[] dRow = {-1, 0, 1, 0};
        int[] dCol = {0, 1, 0, -1};

        while (!pq.isEmpty()) {
            int[] top = pq.poll();
            int diff = top[0], r = top[1], c = top[2];

            if (r == n - 1 && c == m - 1) return diff;
            if (diff > dist[r][c]) continue;

            for (int i = 0; i < 4; i++) {
                int nr = r + dRow[i], nc = c + dCol[i];
                if (nr >= 0 && nr < n && nc >= 0 && nc < m) {
                    int stepDiff = Math.abs(heights[r][c] - heights[nr][nc]);
                    int newEffort = Math.max(diff, stepDiff);
                    if (newEffort < dist[nr][nc]) {
                        dist[nr][nc] = newEffort;
                        pq.offer(new int[]{newEffort, nr, nc});
                    }
                }
            }
        }
        return 0;
    }
}`,
  python: `# Python: Path With Minimum Effort (LeetCode 1631)
# Time Complexity: O(N * M log(N * M)) | Space Complexity: O(N * M)
import heapq

class Solution:
    def minimumEffortPath(self, heights: list[list[int]]) -> int:
        n, m = len(heights), len(heights[0])
        dist = [[float('inf')] * m for _ in range(n)]
        dist[0][0] = 0
        pq = [(0, 0, 0)]  # (effort, r, c)

        d_row = [-1, 0, 1, 0]
        d_col = [0, 1, 0, -1]

        while pq:
            diff, r, c = heapq.heappop(pq)

            if r == n - 1 and c == m - 1:
                return diff

            if diff > dist[r][c]:
                continue

            for i in range(4):
                nr, nc = r + d_row[i], c + d_col[i]
                if 0 <= nr < n and 0 <= nc < m:
                    step_diff = abs(heights[r][c] - heights[nr][nc])
                    new_effort = max(diff, step_diff)
                    if new_effort < dist[nr][nc]:
                        dist[nr][nc] = new_effort
                        heapq.heappush(pq, (new_effort, nr, nc))

        return 0`,
  javascript: `// JavaScript: Path With Minimum Effort (LeetCode 1631)
// Time Complexity: O(N * M log(N * M)) | Space Complexity: O(N * M)
function minimumEffortPath(heights) {
    const n = heights.length, m = heights[0].length;
    const dist = Array.from({ length: n }, () => Array(m).fill(Infinity));
    dist[0][0] = 0;

    // Min-priority queue simulation
    const pq = [[0, 0, 0]]; // [effort, r, c]

    const dRow = [-1, 0, 1, 0];
    const dCol = [0, 1, 0, -1];

    while (pq.length > 0) {
        pq.sort((a, b) => a[0] - b[0]);
        const [diff, r, c] = pq.shift();

        if (r == n - 1 && c == m - 1) return diff;
        if (diff > dist[r][c]) continue;

        for (let i = 0; i < 4; i++) {
            const nr = r + dRow[i], nc = c + dCol[i];
            if (nr >= 0 && nr < n && nc >= 0 && nc < m) {
                const stepDiff = Math.abs(heights[r][c] - heights[nr][nc]);
                const newEffort = Math.max(diff, stepDiff);
                if (newEffort < dist[nr][nc]) {
                    dist[nr][nc] = newEffort;
                    pq.push([newEffort, nr, nc]);
                }
            }
        }
    }
    return 0;
}`
};

export const steps = [
  {
    phase: 'INITIALIZE',
    title: 'Initialize Dijkstra: Start at (0, 0) with Effort 0',
    grid: [
      ['0', '∞', '∞'],
      ['∞', '∞', '∞'],
      ['∞', '∞', '∞']
    ],
    rowLabels: ['R0', 'R1', 'R2'],
    colLabels: ['C0', 'C1', 'C2'],
    activeCell: { r: 0, c: 0 },
    metrics: [
      { label: 'Current Cell', value: '(0, 0) [h=1]' },
      { label: 'Current Effort', value: 0 },
      { label: 'Destination', value: '(2, 2) [h=5]' }
    ],
    variables: {
      pqTop: '{effort: 0, r: 0, c: 0}',
      'heights[0][0]': 1,
      target: '(2, 2)',
      status: 'Pushed (0, 0) with effort 0 into min-heap'
    },
    explain: 'Start Dijkstra at top-left cell (0, 0). Its initial effort is 0. All other cells in the distance matrix are initialized to infinity (∞).',
    intuition: 'Dijkstra finds the minimax path by greedily expanding the path of least maximum-step effort.'
  },
  {
    phase: 'EXPAND_ROOT',
    title: 'Explore Neighbors of (0, 0): (0, 1) and (1, 0)',
    grid: [
      ['0', '1', '∞'],
      ['2', '∞', '∞'],
      ['∞', '∞', '∞']
    ],
    rowLabels: ['R0', 'R1', 'R2'],
    colLabels: ['C0', 'C1', 'C2'],
    activeCell: { r: 0, c: 0 },
    dependencyCells: [
      { r: 0, c: 1, label: 'diff 1' },
      { r: 1, c: 0, label: 'diff 2' }
    ],
    metrics: [
      { label: 'Neighbor (0, 1)', value: '|1 - 2| = 1' },
      { label: 'Neighbor (1, 0)', value: '|1 - 3| = 2' },
      { label: 'Min in Heap', value: '(0, 1) with effort 1' }
    ],
    variables: {
      'dist[0][1]': 'max(0, |1 - 2|) = 1',
      'dist[1][0]': 'max(0, |1 - 3|) = 2',
      nextPqTop: '(0, 1) [effort 1]'
    },
    explain: 'From (0, 0), evaluate neighbors: right to (0, 1) with height 2 gives step diff |1-2|=1; down to (1, 0) with height 3 gives step diff |1-3|=2. Push both into heap.',
    intuition: 'Each neighbor takes the max of current path effort and the step difference.'
  },
  {
    phase: 'REACH_TOP_RIGHT',
    title: 'Explore Top Edge to (0, 2): Encounter Bottleneck Jump |2 - 5| = 3 at Target',
    grid: [
      ['0', '1', '1'],
      ['2', '7', '1'],
      ['∞', '∞', '3']
    ],
    rowLabels: ['R0', 'R1', 'R2'],
    colLabels: ['C0', 'C1', 'C2'],
    activeCell: { r: 1, c: 2 },
    dependencyCells: [
      { r: 0, c: 2, label: 'h=2' },
      { r: 2, c: 2, label: 'h=5 (jump 3)' }
    ],
    metrics: [
      { label: 'Top-Right Route', value: '1 -> 2 -> 2 -> 2 -> 5' },
      { label: 'Top Route Effort', value: 'max(1, 0, 0, 3) = 3' },
      { label: 'Alternative Route', value: 'Check left perimeter path' }
    ],
    variables: {
      topRightEffort: 3,
      stepToTarget: '|height(1,2) - height(2,2)| = |2 - 5| = 3',
      distToTargetViaTop: 3
    },
    explain: 'Exploring the top-right route (0,0)->(0,1)->(0,2)->(1,2) has small differences until stepping into destination (2, 2), where |2 - 5| = 3 jumps the total path effort to 3.',
    intuition: 'Even if all previous steps were effort 0 or 1, a single large jump of 3 sets the entire path effort to 3.'
  },
  {
    phase: 'EXPLORE_LEFT_AVENUE',
    title: 'Explore Left Perimeter Route: (0,0) -> (1,0) -> (2,0) -> (2,1) -> (2,2)',
    grid: [
      ['0', '1', '1'],
      ['2', '7', '1'],
      ['2', '2', '2']
    ],
    rowLabels: ['R0', 'R1', 'R2'],
    colLabels: ['C0', 'C1', 'C2'],
    activeCell: { r: 2, c: 1 },
    dependencyCells: [
      { r: 2, c: 0, label: 'h=5' },
      { r: 2, c: 1, label: 'h=3' },
      { r: 2, c: 2, label: 'h=5' }
    ],
    metrics: [
      { label: 'Left Route', value: '1 -> 3 -> 5 -> 3 -> 5' },
      { label: 'Step Differences', value: '|1-3|=2, |3-5|=2, |5-3|=2, |3-5|=2' },
      { label: 'Max Effort on Left', value: 2 }
    ],
    variables: {
      leftPathEffort: 'max(2, 2, 2, 2) = 2',
      improvement: '2 < 3 (Beats top route!)',
      updatedDistToTarget: 2
    },
    explain: 'Traversing the left perimeter: (0,0)[1] -> (1,0)[3] -> (2,0)[5] -> (2,1)[3] -> (2,2)[5]. Every single step has height difference exactly 2. The maximum effort along this path is 2, strictly better than 3!',
    intuition: 'Dijkstra extracts the path with effort 2 before ever needing to accept effort 3.'
  },
  {
    phase: 'COMPLETE',
    title: 'Destination Popped: Minimum Effort = 2',
    grid: [
      ['★', '1', '1'],
      ['★', '7', '1'],
      ['★', '★', '★']
    ],
    rowLabels: ['R0', 'R1', 'R2'],
    colLabels: ['C0', 'C1', 'C2'],
    activeCell: { r: 2, c: 2 },
    dependencyCells: [
      { r: 0, c: 0, label: 'start' },
      { r: 1, c: 0, label: 'path' },
      { r: 2, c: 0, label: 'path' },
      { r: 2, c: 1, label: 'path' },
      { r: 2, c: 2, label: 'target' }
    ],
    metrics: [
      { label: 'Final Min Effort', value: 2 },
      { label: 'Optimal Path', value: '[1 -> 3 -> 5 -> 3 -> 5]' },
      { label: 'Status', value: 'OPTIMAL DESTINATION REACHED' }
    ],
    variables: {
      finalAnswer: 2,
      optimalPathCells: '[(0,0), (1,0), (2,0), (2,1), (2,2)]',
      complexity: 'O(N * M log(N * M))'
    },
    explain: 'Cell (2, 2) is popped from the min-heap with effort 2. Because Dijkstra processes in non-decreasing order of effort, 2 is guaranteed to be the minimum effort required. Return 2.',
    intuition: 'The minimax path problem maps directly to Dijkstra by replacing path sum with path maximum.'
  }
];
