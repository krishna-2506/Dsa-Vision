export const rendererType = 'dp-grid';

export const meta = {
  title: 'Introduction to Graphs & Degree Theory',
  category: 'Graphs',
  difficulty: 'Easy',
  timeComplexity: 'O(V + E)',
  spaceComplexity: 'O(V + E)',
  description: 'Foundational introduction to Graph theory, components: vertices (nodes), edges, adjacency matrix vs list, degrees, and Euler\'s Handshaking Lemma.'
};

export const ideaMap = {
  title: 'Graph Fundamentals & Anatomy',
  nodes: [
    {
      id: 'step1',
      label: 'Vertices & Edges',
      detail: 'A graph G = (V, E) is composed of vertices (nodes) interconnected by directed or undirected edges.'
    },
    {
      id: 'step2',
      label: 'Adjacency Matrix Representation',
      detail: 'An N x N binary matrix where matrix[u][v] = 1 denotes an edge between node u and node v.'
    },
    {
      id: 'step3',
      label: 'Degree Calculation',
      detail: 'The degree of a vertex in an undirected graph equals the number of edges incident to it (row sum in adjacency matrix).'
    },
    {
      id: 'step4',
      label: 'Euler\'s Handshaking Lemma',
      detail: 'In any undirected graph, the sum of all vertex degrees is twice the number of edges: sum(deg(v)) = 2 * |E|.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Graph Anatomy and Degree Calculation
// Time Complexity: O(V + E) | Space Complexity: O(V + E)
#include <iostream>
#include <vector>
using namespace std;

// In an undirected graph: Total Degree = 2 * E
// Handshaking Lemma: sum of degrees is twice the number of edges.
int calculateTotalDegree(int V, const vector<vector<int>>& adj) {
    int totalDegree = 0;
    for (int i = 1; i <= V; ++i) {
        totalDegree += adj[i].size();
    }
    return totalDegree;
}

int main() {
    int V = 5;
    vector<vector<int>> adj(V + 1);
    // Add edges (1-2, 1-3, 2-4, 3-4, 3-5)
    adj[1] = {2, 3}; adj[2] = {1, 4};
    adj[3] = {1, 4, 5}; adj[4] = {2, 3}; adj[5] = {3};
    cout << "Total Degree: " << calculateTotalDegree(V, adj) << endl; // 10
    return 0;
}`,
  java: `// Java: Graph Degree & Properties
// Time Complexity: O(V + E) | Space Complexity: O(V + E)
import java.util.*;

public class Solution {
    public static int totalDegree(int V, List<List<Integer>> adj) {
        int sum = 0;
        for (int i = 1; i <= V; i++) {
            sum += adj.get(i).size();
        }
        return sum; // 2 * total edges (Handshaking Lemma)
    }
}`,
  python: `# Python: Graph Properties & Degree
# Time Complexity: O(V + E) | Space Complexity: O(V + E)
def total_degree(V: int, adj: dict[int, list[int]]) -> int:
    # Handshaking lemma: sum of degrees equals 2 * E
    return sum(len(neighbors) for neighbors in adj.values())`,
  javascript: `// JavaScript: Graph Representation & Degree
// Time Complexity: O(V + E) | Space Complexity: O(V + E)
function totalDegree(V, adj) {
    let degreeSum = 0;
    for (let u = 1; u <= V; u++) {
        degreeSum += (adj[u] || []).length;
    }
    return degreeSum; // 2 * E
}`
};

export const steps = [
  {
    phase: 'INITIALIZE',
    title: 'Adjacency Matrix Representation: 5 Vertices, 5 Edges',
    grid: [
      ['0', '1', '1', '0', '0'],
      ['1', '0', '0', '1', '0'],
      ['1', '0', '0', '1', '1'],
      ['0', '1', '1', '0', '0'],
      ['0', '0', '1', '0', '0']
    ],
    rowLabels: ['Node 1', 'Node 2', 'Node 3', 'Node 4', 'Node 5'],
    colLabels: ['N1', 'N2', 'N3', 'N4', 'N5'],
    activeCell: null,
    metrics: [
      { label: 'Vertices (|V|)', value: 5 },
      { label: 'Edges (|E|)', value: 5 },
      { label: 'Degree Sum', value: 'Pending' }
    ],
    variables: {
      graphType: 'Undirected Simple Graph',
      edges: '[(1,2), (1,3), (2,4), (3,4), (3,5)]',
      matrixSize: '5 x 5'
    },
    explain: 'A graph is represented as an adjacency matrix where entry A[i][j] = 1 indicates an edge between node i and node j. In undirected graphs, the matrix is symmetric across the main diagonal.',
    intuition: 'Row sums directly give the degree of each corresponding vertex.'
  },
  {
    phase: 'EVALUATE_NODE_1_AND_2',
    title: 'Degrees of Node 1 & Node 2: deg(1) = 2, deg(2) = 2',
    grid: [
      ['0', '★', '★', '0', '0'],
      ['★', '0', '0', '★', '0'],
      ['1', '0', '0', '1', '1'],
      ['0', '1', '1', '0', '0'],
      ['0', '0', '1', '0', '0']
    ],
    rowLabels: ['Node 1 (d=2)', 'Node 2 (d=2)', 'Node 3', 'Node 4', 'Node 5'],
    colLabels: ['N1', 'N2', 'N3', 'N4', 'N5'],
    activeCell: { r: 0, c: 1 },
    dependencyCells: [
      { r: 0, c: 2, label: 'deg' },
      { r: 1, c: 0, label: 'deg' },
      { r: 1, c: 3, label: 'deg' }
    ],
    metrics: [
      { label: 'deg(Node 1)', value: '2 (neighbors 2, 3)' },
      { label: 'deg(Node 2)', value: '2 (neighbors 1, 4)' },
      { label: 'Running Degree Sum', value: 4 }
    ],
    variables: {
      'deg(1)': '1 + 1 = 2',
      'deg(2)': '1 + 1 = 2',
      accumulatedDegrees: 4
    },
    explain: 'Row 1 has two 1s at columns 2 and 3, so deg(1) = 2. Row 2 has two 1s at columns 1 and 4, so deg(2) = 2. Accumulated degree sum is 2 + 2 = 4.',
    intuition: 'Each incident edge contributes 1 to the row sum.'
  },
  {
    phase: 'EVALUATE_NODE_3',
    title: 'Hub Node 3: deg(3) = 3 (Connected to 1, 4, 5)',
    grid: [
      ['0', '1', '1', '0', '0'],
      ['1', '0', '0', '1', '0'],
      ['★', '0', '0', '★', '★'],
      ['0', '1', '1', '0', '0'],
      ['0', '0', '1', '0', '0']
    ],
    rowLabels: ['Node 1 (d=2)', 'Node 2 (d=2)', 'Node 3 (d=3)', 'Node 4', 'Node 5'],
    colLabels: ['N1', 'N2', 'N3', 'N4', 'N5'],
    activeCell: { r: 2, c: 0 },
    dependencyCells: [
      { r: 2, c: 3, label: 'deg' },
      { r: 2, c: 4, label: 'deg' }
    ],
    metrics: [
      { label: 'deg(Node 3)', value: '3 (Highest degree hub)' },
      { label: 'Running Degree Sum', value: '4 + 3 = 7' },
      { label: 'Neighbors of 3', value: '{1, 4, 5}' }
    ],
    variables: {
      'deg(3)': '1 + 1 + 1 = 3',
      accumulatedDegrees: 7
    },
    explain: 'Node 3 connects to Node 1, Node 4, and Node 5. Row 3 has three 1s, giving degree 3. Running degree sum becomes 7.',
    intuition: 'Hub nodes have higher degrees and bridge multiple regions of the network.'
  },
  {
    phase: 'EVALUATE_NODES_4_AND_5',
    title: 'Complete Degree Audit: deg(4) = 2, deg(5) = 1 (Pendant Leaf)',
    grid: [
      ['0', '1', '1', '0', '0'],
      ['1', '0', '0', '1', '0'],
      ['1', '0', '0', '1', '1'],
      ['0', '★', '★', '0', '0'],
      ['0', '0', '★', '0', '0']
    ],
    rowLabels: ['Node 1 (d=2)', 'Node 2 (d=2)', 'Node 3 (d=3)', 'Node 4 (d=2)', 'Node 5 (d=1)'],
    colLabels: ['N1', 'N2', 'N3', 'N4', 'N5'],
    activeCell: { r: 4, c: 2 },
    dependencyCells: [
      { r: 3, c: 1, label: 'deg' },
      { r: 3, c: 2, label: 'deg' }
    ],
    metrics: [
      { label: 'deg(Node 4)', value: 2 },
      { label: 'deg(Node 5)', value: '1 (Pendant)' },
      { label: 'Total Degree Sum', value: '2+2+3+2+1 = 10' }
    ],
    variables: {
      'deg(4)': 2,
      'deg(5)': 1,
      totalDegreeSum: 10
    },
    explain: 'Row 4 has degree 2 (connected to 2 and 3). Row 5 has degree 1 (connected only to 3; a pendant vertex). Total sum of degrees across all 5 vertices is 10.',
    intuition: 'A pendant node has degree 1, forming an endpoint of the graph.'
  },
  {
    phase: 'COMPLETE',
    title: 'Verification: Euler\'s Handshaking Lemma (Total Degree = 2 * |E| = 10)',
    grid: [
      ['0', '1', '1', '0', '0'],
      ['1', '0', '0', '1', '0'],
      ['1', '0', '0', '1', '1'],
      ['0', '1', '1', '0', '0'],
      ['0', '0', '1', '0', '0']
    ],
    rowLabels: ['Node 1 (d=2)', 'Node 2 (d=2)', 'Node 3 (d=3)', 'Node 4 (d=2)', 'Node 5 (d=1)'],
    colLabels: ['N1', 'N2', 'N3', 'N4', 'N5'],
    activeCell: null,
    metrics: [
      { label: 'Total Degrees', value: 10 },
      { label: 'Total Edges (|E|)', value: 5 },
      { label: '2 * |E|', value: '2 * 5 = 10 (MATCH!)' }
    ],
    variables: {
      sumOfDegrees: 10,
      twoTimesEdges: 10,
      lemmaVerified: 'sum(deg(v)) == 2 * |E| is TRUE'
    },
    explain: 'The Handshaking Lemma is verified: every undirected edge contributes 1 to the degree of each of its two endpoints. Therefore, sum(deg(v)) = 2 * |E| = 2 * 5 = 10. Theorem holds universally!',
    intuition: 'Every handshake involves two people; every undirected edge involves two endpoints.'
  }
];
