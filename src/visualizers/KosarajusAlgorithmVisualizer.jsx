export const rendererType = 'stack';

export const meta = {
  title: 'Strongly Connected Components (Kosaraju\'s Algorithm)',
  category: 'Graphs',
  difficulty: 'Hard',
  timeComplexity: 'O(V + E)',
  spaceComplexity: 'O(V + E)',
  description: 'Finds all Strongly Connected Components (SCCs) in a directed graph using Kosaraju\'s 3-step algorithm: (1) Order nodes by finishing time via DFS stack, (2) Transpose all edges, (3) Perform DFS in stack order on transposed graph.'
};

export const ideaMap = {
  title: 'Kosaraju 3-Step SCC Decomposition',
  nodes: [
    {
      id: 'step1',
      label: 'Finishing Time DFS Stack',
      detail: 'Perform DFS on original graph G; push each node onto a stack when its traversal finishes (Topological Order).'
    },
    {
      id: 'step2',
      label: 'Transpose Graph G -> G^T',
      detail: 'Reverse every directed edge u -> v into v -> u, preserving intra-component reachability while blocking inter-component leaks.'
    },
    {
      id: 'step3',
      label: 'Stack-Ordered Transposed DFS',
      detail: 'Pop nodes from stack in decreasing finishing time order; each unvisited pop seeds a complete SCC.'
    },
    {
      id: 'step4',
      label: 'Count & Isolate SCCs',
      detail: 'Each full DFS traversal on G^T extracts exactly one strongly connected component.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Kosaraju's Algorithm for Strongly Connected Components
// Time Complexity: O(V + E) | Space Complexity: O(V + E)
#include <vector>
#include <stack>
using namespace std;

class Solution {
private:
    void dfs1(int node, vector<int>& vis, vector<vector<int>>& adj, stack<int>& st) {
        vis[node] = 1;
        for (auto it : adj[node]) {
            if (!vis[it]) dfs1(it, vis, adj, st);
        }
        st.push(node); // Record finishing time
    }

    void dfs2(int node, vector<int>& vis, vector<vector<int>>& adjT) {
        vis[node] = 1;
        for (auto it : adjT[node]) {
            if (!vis[it]) dfs2(it, vis, adjT);
        }
    }
public:
    int kosaraju(int V, vector<vector<int>>& adj) {
        // Step 1: Push nodes ordered by finishing time
        vector<int> vis(V, 0);
        stack<int> st;
        for (int i = 0; i < V; i++) {
            if (!vis[i]) dfs1(i, vis, adj, st);
        }

        // Step 2: Reverse graph edges (Transpose)
        vector<vector<int>> adjT(V);
        for (int i = 0; i < V; i++) {
            vis[i] = 0; // reset visited array
            for (auto it : adj[i]) {
                adjT[it].push_back(i); // i -> it becomes it -> i
            }
        }

        // Step 3: DFS on transposed graph in stack order
        int sccCount = 0;
        while (!st.empty()) {
            int node = st.top();
            st.pop();
            if (!vis[node]) {
                sccCount++;
                dfs2(node, vis, adjT);
            }
        }
        return sccCount;
    }
};`,
  java: `// Java: Kosaraju's Algorithm for SCCs
// Time Complexity: O(V + E) | Space Complexity: O(V + E)
import java.util.*;

class Solution {
    private void dfs1(int node, boolean[] vis, List<List<Integer>> adj, Stack<Integer> st) {
        vis[node] = true;
        for (int it : adj.get(node)) {
            if (!vis[it]) dfs1(it, vis, adj, st);
        }
        st.push(node);
    }

    private void dfs2(int node, boolean[] vis, List<List<Integer>> adjT) {
        vis[node] = true;
        for (int it : adjT.get(node)) {
            if (!vis[it]) dfs2(it, vis, adjT);
        }
    }

    public int kosaraju(int V, List<List<Integer>> adj) {
        boolean[] vis = new boolean[V];
        Stack<Integer> st = new Stack<>();
        for (int i = 0; i < V; i++) {
            if (!vis[i]) dfs1(i, vis, adj, st);
        }

        List<List<Integer>> adjT = new ArrayList<>();
        for (int i = 0; i < V; i++) {
            adjT.add(new ArrayList<>());
            vis[i] = false;
        }
        for (int i = 0; i < V; i++) {
            for (int it : adj.get(i)) adjT.get(it).add(i);
        }

        int sccCount = 0;
        while (!st.isEmpty()) {
            int node = st.pop();
            if (!vis[node]) {
                sccCount++;
                dfs2(node, vis, adjT);
            }
        }
        return sccCount;
    }
}`,
  python: `# Python: Kosaraju's Algorithm for SCCs
# Time Complexity: O(V + E) | Space Complexity: O(V + E)
class Solution:
    def kosaraju(self, V: int, adj: list[list[int]]) -> int:
        vis = [False] * V
        st = []

        def dfs1(node: int) -> None:
            vis[node] = True
            for it in adj[node]:
                if not vis[it]:
                    dfs1(it)
            st.append(node)

        for i in range(V):
            if not vis[i]:
                dfs1(i)

        adj_t = [[] for _ in range(V)]
        for i in range(V):
            vis[i] = False
            for it in adj[i]:
                adj_t[it].append(i)

        def dfs2(node: int) -> None:
            vis[node] = True
            for it in adj_t[node]:
                if not vis[it]:
                    dfs2(it)

        scc_count = 0
        while st:
            node = st.pop()
            if not vis[node]:
                scc_count += 1
                dfs2(node)

        return scc_count`,
  javascript: `// JavaScript: Kosaraju's Algorithm for SCCs
// Time Complexity: O(V + E) | Space Complexity: O(V + E)
function kosaraju(V, adj) {
    const vis = new Array(V).fill(false);
    const st = [];

    function dfs1(node) {
        vis[node] = true;
        for (const it of adj[node]) {
            if (!vis[it]) dfs1(it);
        }
        st.push(node);
    }

    for (let i = 0; i < V; i++) {
        if (!vis[i]) dfs1(i);
    }

    const adjT = Array.from({ length: V }, () => []);
    for (let i = 0; i < V; i++) {
        vis[i] = false;
        for (const it of adj[i]) {
            adjT[it].push(i);
        }
    }

    function dfs2(node) {
        vis[node] = true;
        for (const it of adjT[node]) {
            if (!vis[it]) dfs2(it);
        }
    }

    let sccCount = 0;
    while (st.length > 0) {
        const node = st.pop();
        if (!vis[node]) {
            sccCount++;
            dfs2(node);
        }
    }
    return sccCount;
}`
};

export const steps = [
  {
    phase: 'INITIALIZE',
    title: 'Phase 1: DFS Ordering by Finishing Time',
    stack: [],
    inputList: [0, 1, 2, 3, 4],
    outputList: [],
    customCard: {
      title: 'Kosaraju Step 1 (Finishing Time Stack)',
      rows: [
        { label: 'Graph Topology', value: '0->1, 1->2, 2->0 (Cycle), 2->3, 3->4' },
        { label: 'Stack Invariant', value: 'Nodes finish after their reachable descendants' },
        { label: 'Goal', value: 'Push nodes onto LIFO stack upon completing child DFS' }
      ]
    },
    variables: {
      phase: 'Step 1: DFS1',
      vis: '[0, 0, 0, 0, 0]',
      stack: '[]'
    },
    metrics: {
      stackDepth: 0,
      sccCount: 0,
      activePhase: 'DFS1 (FINISHING TIMES)'
    },
    explain: 'Initiate DFS1 on the original directed graph to record finishing times. A node is pushed to the stack only after all its descendants are fully explored.'
  },
  {
    phase: 'PUSH_LEAF_NODES',
    title: 'DFS1 Reaches Sinks: Push Node 4 then Node 3',
    stack: [3, 4],
    inputList: [0, 1, 2, 3, 4],
    outputList: [],
    customCard: {
      title: 'Sink Nodes Finish First',
      rows: [
        { label: 'Descendant Branch', value: '0 -> 1 -> 2 -> 3 -> 4' },
        { label: 'Node 4 Finished', value: 'No outgoing edges -> push 4 to stack', accent: true },
        { label: 'Node 3 Finished', value: 'All neighbors explored -> push 3 to stack' }
      ]
    },
    variables: {
      popped: 'None',
      stack: '[3, 4]',
      vis: '[1, 1, 1, 1, 1]'
    },
    metrics: {
      stackDepth: 2,
      sccCount: 0,
      activePhase: 'DFS1 PUSHING'
    },
    explain: 'DFS explores 0 -> 1 -> 2 -> 3 -> 4. Since Node 4 has no outgoing edges, it finishes first and is pushed to the stack. Node 3 finishes next and is pushed above 4.'
  },
  {
    phase: 'STACK_COMPLETE',
    title: 'DFS1 Completes: Finishing Time Stack [0, 1, 2, 3, 4]',
    stack: [0, 1, 2, 3, 4],
    inputList: [0, 1, 2, 3, 4],
    outputList: [],
    customCard: {
      title: 'Full Finishing Stack Established',
      rows: [
        { label: 'Stack [top -> bottom]', value: '[0, 1, 2, 3, 4]', accent: true },
        { label: 'Top of Stack', value: 'Node 0 (Source component finished last)' },
        { label: 'Next Step', value: 'Step 2: Transpose all directed edges (G -> G^T)' }
      ]
    },
    variables: {
      stackTop: 0,
      stackContents: '[0, 1, 2, 3, 4]',
      readyForTranspose: 'true'
    },
    metrics: {
      stackDepth: 5,
      sccCount: 0,
      activePhase: 'TRANSPOSE READY'
    },
    explain: 'The cycle {0, 1, 2} finishes after the sink branch. Node 0 is pushed last, sitting at the top of the stack. Next, all edges in the graph are reversed.'
  },
  {
    phase: 'POP_SCC_1',
    title: 'Phase 3: Pop Node 0 -> DFS on G^T Finds SCC #1: {0, 1, 2}',
    stack: [3, 4],
    inputList: [0, 1, 2, 3, 4],
    outputList: ['SCC 1: {0, 1, 2}'],
    customCard: {
      title: 'SCC #1 Extraction',
      rows: [
        { label: 'Popped Node', value: 'Node 0', accent: true },
        { label: 'Transposed DFS Path', value: '0 -> 2 -> 1 (Edges reversed!)' },
        { label: 'Blocked Leaks', value: 'Transposed edge 3->2 cannot leak backwards from 3' },
        { label: 'Extracted Component', value: '{0, 1, 2} is Strongly Connected Component #1' }
      ]
    },
    variables: {
      scc1: '{0, 1, 2}',
      sccCount: 1,
      stackRemaining: '[3, 4]'
    },
    metrics: {
      stackDepth: 2,
      sccCount: 1,
      activePhase: 'DFS2 ON G^T'
    },
    explain: 'Pop Node 0 from stack. In the transposed graph G^T, edges are 0->2 and 2->1. DFS discovers {0, 2, 1}. Because edge 2->3 was inverted to 3->2, DFS cannot leak into Node 3. SCC #1 is isolated!'
  },
  {
    phase: 'POP_SCC_2',
    title: 'Pop Node 3 -> DFS on G^T Finds SCC #2: {3}',
    stack: [4],
    inputList: [0, 1, 2, 3, 4],
    outputList: ['SCC 1: {0, 1, 2}', 'SCC 2: {3}'],
    customCard: {
      title: 'SCC #2 Extraction',
      rows: [
        { label: 'Popped Node', value: 'Node 3', accent: true },
        { label: 'Transposed Edge', value: '3 -> 2 (Blocked: Node 2 already visited!)' },
        { label: 'Extracted Component', value: '{3} forms independent SCC #2' }
      ]
    },
    variables: {
      scc2: '{3}',
      sccCount: 2,
      stackRemaining: '[4]'
    },
    metrics: {
      stackDepth: 1,
      sccCount: 2,
      activePhase: 'DFS2 ON G^T'
    },
    explain: 'Pop Node 3. In G^T, its outgoing edge 3->2 leads to already-visited Node 2. The traversal terminates immediately, yielding SCC #2 = {3}.'
  },
  {
    phase: 'COMPLETE',
    title: 'Pop Node 4 -> SCC #3: {4} | Total SCCs = 3',
    stack: [],
    inputList: [0, 1, 2, 3, 4],
    outputList: ['SCC 1: {0, 1, 2}', 'SCC 2: {3}', 'SCC 3: {4}'],
    customCard: {
      title: 'Kosaraju Algorithm Complete',
      rows: [
        { label: 'Total SCCs Discovered', value: '3 Components', accent: true },
        { label: 'SCC 1', value: '{0, 1, 2} (3-node mutual cycle)' },
        { label: 'SCC 2 & 3', value: '{3}, {4} (Individual components)' },
        { label: 'Time Complexity', value: 'O(V + E) two-pass linear time' }
      ]
    },
    variables: {
      totalSCCs: 3,
      components: '[{0,1,2}, {3}, {4}]',
      status: 'VERIFIED'
    },
    metrics: {
      stackDepth: 0,
      sccCount: 3,
      activePhase: 'DONE'
    },
    explain: 'Pop Node 4. Its transposed edge 4->3 hits visited Node 3. SCC #3 = {4}. Stack is now empty. Exactly 3 Strongly Connected Components exist in the graph. Return 3.',
    intuition: 'Reversing edges traps each DFS within its own SCC, preventing it from crossing component boundaries.'
  }
];
