import React from 'react';

export const meta = {
  title: 'All Nodes at Distance K in Binary Tree',
  category: 'Binary Trees',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Finds all nodes situated at exact distance K from a designated target node by converting the directed tree into an undirected graph via a parent map and running radial BFS.'
};

export const solutions = {
  cpp: `// C++: All Nodes Distance K in Binary Tree
// Time Complexity: O(N) | Space Complexity: O(N)
#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <queue>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
private:
    void markParents(TreeNode* root, unordered_map<TreeNode*, TreeNode*>& parent_track) {
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            TreeNode* curr = q.front(); q.pop();
            if (curr->left) {
                parent_track[curr->left] = curr;
                q.push(curr->left);
            }
            if (curr->right) {
                parent_track[curr->right] = curr;
                q.push(curr->right);
            }
        }
    }

public:
    vector<int> distanceK(TreeNode* root, TreeNode* target, int k) {
        unordered_map<TreeNode*, TreeNode*> parent_track;
        markParents(root, parent_track);

        unordered_set<TreeNode*> visited;
        queue<TreeNode*> q;
        q.push(target);
        visited.insert(target);
        int curr_level = 0;

        while (!q.empty()) {
            int size = q.size();
            if (curr_level == k) break;
            curr_level++;

            for (int i = 0; i < size; i++) {
                TreeNode* curr = q.front(); q.pop();

                if (curr->left && !visited.count(curr->left)) {
                    visited.insert(curr->left);
                    q.push(curr->left);
                }
                if (curr->right && !visited.count(curr->right)) {
                    visited.insert(curr->right);
                    q.push(curr->right);
                }
                if (parent_track.count(curr) && !visited.count(parent_track[curr])) {
                    visited.insert(parent_track[curr]);
                    q.push(parent_track[curr]);
                }
            }
        }

        vector<int> result;
        while (!q.empty()) {
            result.push_back(q.front()->val);
            q.pop();
        }
        return result;
    }
};`,
  java: `// Java: All Nodes Distance K in Binary Tree
import java.util.*;

class Solution {
    private void markParents(TreeNode root, Map<TreeNode, TreeNode> parent_track) {
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while (!q.isEmpty()) {
            TreeNode curr = q.poll();
            if (curr.left != null) {
                parent_track.put(curr.left, curr);
                q.offer(curr.left);
            }
            if (curr.right != null) {
                parent_track.put(curr.right, curr);
                q.offer(curr.right);
            }
        }
    }

    public List<Integer> distanceK(TreeNode root, TreeNode target, int k) {
        Map<TreeNode, TreeNode> parent_track = new HashMap<>();
        markParents(root, parent_track);

        Set<TreeNode> visited = new HashSet<>();
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(target);
        visited.add(target);
        int curr_level = 0;

        while (!q.isEmpty()) {
            int size = q.size();
            if (curr_level == k) break;
            curr_level++;

            for (int i = 0; i < size; i++) {
                TreeNode curr = q.poll();

                if (curr.left != null && !visited.contains(curr.left)) {
                    visited.add(curr.left);
                    q.offer(curr.left);
                }
                if (curr.right != null && !visited.contains(curr.right)) {
                    visited.add(curr.right);
                    q.offer(curr.right);
                }
                if (parent_track.containsKey(curr) && !visited.contains(parent_track.get(curr))) {
                    visited.add(parent_track.get(curr));
                    q.offer(parent_track.get(curr));
                }
            }
        }

        List<Integer> res = new ArrayList<>();
        while (!q.isEmpty()) {
            res.add(q.poll().val);
        }
        return res;
    }
}`,
  python: `# Python 3: All Nodes Distance K in Binary Tree
from collections import deque

def distance_k(root, target, k):
    parents = {}
    q = deque([root])

    while q:
        curr = q.popleft()
        if curr.left:
            parents[curr.left] = curr
            q.append(curr.left)
        if curr.right:
            parents[curr.right] = curr
            q.append(curr.right)

    visited = {target}
    queue = deque([target])
    dist = 0

    while queue:
        if dist == k:
            break
        dist += 1
        for _ in range(len(queue)):
            curr = queue.popleft()
            for neighbor in (curr.left, curr.right, parents.get(curr)):
                if neighbor and neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)

    return [node.val for node in queue]`,
  javascript: `// JavaScript: All Nodes Distance K in Binary Tree
function distanceK(root, target, k) {
    const parents = new Map();
    const q = [root];

    while (q.length > 0) {
        const curr = q.shift();
        if (curr.left) {
            parents.set(curr.left, curr);
            q.push(curr.left);
        }
        if (curr.right) {
            parents.set(curr.right, curr);
            q.push(curr.right);
        }
    }

    const visited = new Set([target]);
    const bfsQ = [target];
    let dist = 0;

    while (bfsQ.length > 0) {
        if (dist === k) break;
        dist++;
        const size = bfsQ.length;

        for (let i = 0; i < size; i++) {
            const curr = bfsQ.shift();
            const neighbors = [curr.left, curr.right, parents.get(curr)];

            for (const n of neighbors) {
                if (n && !visited.has(n)) {
                    visited.add(n);
                    bfsQ.push(n);
                }
            }
        }
    }
    return bfsQ.map(n => n.val);
}`
};

export const steps = [
  {
    title: '1. Target = Node 5, Distance K = 2',
    phase: 'INIT',
    codeLine: 35,
    distance: 0,
    activeWave: [5],
    target: 5,
    result: [],
    explain: 'Target node is 5. Parent pointers established. Start radial BFS at distance 0.'
  },
  {
    title: '2. Distance = 1: Neighbors of 5 &rarr; Left (6), Right (2), Parent (3)',
    phase: 'DIST_1',
    codeLine: 45,
    distance: 1,
    activeWave: [6, 2, 3],
    target: 5,
    result: [],
    explain: 'BFS propagates 1 step outward to Node 6, Node 2, and Node 3.'
  },
  {
    title: '3. Distance = 2 (K): Neighbors of Distance 1 &rarr; [7, 4, 1]',
    phase: 'DIST_2_TARGET',
    codeLine: 41,
    distance: 2,
    activeWave: [7, 4, 1],
    target: 5,
    result: [7, 4, 1],
    explain: 'From Node 2 &rarr; 7 and 4. From Node 3 &rarr; 1. All at exact distance K=2 from Node 5!'
  },
  {
    title: '4. Complete: All Nodes at Distance 2 &rarr; [7, 4, 1]',
    phase: 'COMPLETE',
    codeLine: 65,
    distance: 2,
    activeWave: [7, 4, 1],
    target: 5,
    result: [7, 4, 1],
    explain: 'BFS loop breaks at curr_level == k. Output queue contains [7, 4, 1].'
  }
];

export default function PrintAllNodesAtADistanceOfKInBtVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Target: <strong>Node 5</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Radius Distance: <strong>{step.distance} / 2 (k=2)</strong>
        </div>
        {step.result.length > 0 && (
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
            Nodes Found: <strong>[{step.result.join(', ')}]</strong>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl w-full">
        <div className="text-xs font-mono text-[var(--chalk-dim)] flex items-center justify-between w-full px-2">
          <span>Radial Distance Rings</span>
          <span className="text-purple-400 font-bold">Undirected Graph BFS</span>
        </div>

        {/* Node wave circles */}
        <div className="flex items-center justify-center gap-3 w-full py-4">
          {step.activeWave.map((val, idx) => (
            <div
              key={idx}
              className={`w-14 h-14 rounded-xl border-2 flex flex-col items-center justify-center font-mono font-bold text-base shadow-md transition-all ${
                val === step.target
                  ? 'bg-purple-500/30 border-purple-400 text-purple-200 ring-2 ring-purple-400/40'
                  : step.distance === 2
                  ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200'
                  : 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
              }`}
            >
              <span>{val}</span>
              <span className="text-[9px] text-[#767e9f] font-normal">dist {step.distance}</span>
            </div>
          ))}
        </div>

        <div className="text-xs font-mono text-[var(--chalk-dim)] bg-[var(--board-raised-2)] px-4 py-2 rounded-xl border border-[var(--line)] text-center w-full">
          BFS traverses both downward to children and upward to parents using the parent hash map.
        </div>
      </div>
    </div>
  );
}
