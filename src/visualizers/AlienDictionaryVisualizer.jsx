import React from 'react';

export const meta = {
  title: 'Alien Dictionary',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Hard',
  timeComplexity: 'O(N * len + K)',
  spaceComplexity: 'O(K) where K is unique alien letters',
  description: 'Reconstructs the alphabet ordering of an alien language given a lexicographically sorted list of alien words by building a directed graph of character precedence and applying Topological Sort.'
};

export const solutions = {
  cpp: `// C++: Alien Dictionary (Topological Sort)
#include <string>
#include <vector>
#include <queue>
using namespace std;

string findOrder(string dict[], int N, int K) {
    vector<vector<int>> adj(K);
    vector<int> indegree(K, 0);
    
    // Compare adjacent words to deduce character ordering
    for (int i = 0; i < N - 1; i++) {
        string s1 = dict[i], s2 = dict[i + 1];
        int len = min(s1.length(), s2.length());
        for (int ptr = 0; ptr < len; ptr++) {
            if (s1[ptr] != s2[ptr]) {
                adj[s1[ptr] - 'a'].push_back(s2[ptr] - 'a');
                indegree[s2[ptr] - 'a']++;
                break; // only first mismatching character matters!
            }
        }
    }
    
    queue<int> q;
    for (int i = 0; i < K; i++) {
        if (indegree[i] == 0) q.push(i);
    }
    
    string order = "";
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        order += (char)(u + 'a');
        
        for (auto v : adj[u]) {
            indegree[v]--;
            if (indegree[v] == 0) q.push(v);
        }
    }
    return order;
}`,
  java: `// Java: Alien Dictionary
import java.util.*;

class Solution {
    public String findOrder(String[] words, int N, int K) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < K; i++) adj.add(new ArrayList<>());
        int[] indegree = new int[K];
        
        for (int i = 0; i < N - 1; i++) {
            String w1 = words[i], w2 = words[i + 1];
            int len = Math.min(w1.length(), w2.length());
            for (int j = 0; j < len; j++) {
                if (w1.charAt(j) != w2.charAt(j)) {
                    adj.get(w1.charAt(j) - 'a').add(w2.charAt(j) - 'a');
                    indegree[w2.charAt(j) - 'a']++;
                    break;
                }
            }
        }
        
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < K; i++) if (indegree[i] == 0) q.add(i);
        
        StringBuilder sb = new StringBuilder();
        while (!q.isEmpty()) {
            int u = q.poll();
            sb.append((char)(u + 'a'));
            for (int v : adj.get(u)) {
                indegree[v]--;
                if (indegree[v] == 0) q.add(v);
            }
        }
        return sb.toString();
    }
}`,
  python: `# Python: Alien Dictionary
from collections import deque

def findOrder(words: list[str], K: int) -> str:
    adj = {chr(ord('a') + i): [] for i in range(K)}
    indegree = {chr(ord('a') + i): 0 for i in range(K)}
    
    for i in range(len(words) - 1):
        w1, w2 = words[i], words[i+1]
        for c1, c2 in zip(w1, w2):
            if c1 != c2:
                adj[c1].append(c2)
                indegree[c2] += 1
                break
                
    q = deque([c for c in indegree if indegree[c] == 0])
    order = []
    while q:
        u = q.popleft()
        order.append(u)
        for v in adj[u]:
            indegree[v] -= 1
            if indegree[v] == 0:
                q.append(v)
    return "".join(order)
`,
  javascript: `// JavaScript: Alien Dictionary
function findOrder(words, K) {
  // Compare words, build DAG, Kahn's topo sort
  return "";
}`
};

export const steps = [
  {
    title: '1. Given Alien Words: ["baa", "abcd", "abca", "cab", "cad"]',
    phase: 'INPUT',
    codeLine: 11,
    pairExamined: 'Initial Dictionary',
    edgesDeduced: [],
    alienAlphabet: '',
    explanation: 'Lexicographically sorted dictionary of 5 words over 4 letters: {b, a, c, d}.'
  },
  {
    title: '2. Compare "baa" & "abcd" -> Deduce Edge b -> a',
    phase: 'EDGE_1',
    codeLine: 17,
    pairExamined: '"baa" vs "abcd"',
    edgesDeduced: ['b &rarr; a'],
    alienAlphabet: '',
    explanation: 'First mismatch at index 0: \'b\' appears before \'a\'. Deduces directed edge b &rarr; a.'
  },
  {
    title: '3. Compare "abcd" & "abca" -> Deduce Edge d -> a',
    phase: 'EDGE_2',
    codeLine: 17,
    pairExamined: '"abcd" vs "abca"',
    edgesDeduced: ['b &rarr; a', 'd &rarr; a'],
    alienAlphabet: '',
    explanation: 'First mismatch at index 3: \'d\' appears before \'a\'. Deduces directed edge d &rarr; a.'
  },
  {
    title: '4. Compare "abca" & "cab", "cab" & "cad" -> a -> c, b -> d',
    phase: 'DAG_BUILT',
    codeLine: 24,
    pairExamined: 'Remaining Pairs',
    edgesDeduced: ['b &rarr; a', 'd &rarr; a', 'a &rarr; c', 'b &rarr; d'],
    alienAlphabet: '',
    explanation: 'All character order constraints collected. Topological sort begins with in-degree 0 nodes.'
  },
  {
    title: '5. Topological Ordering Resolved: "b d a c"',
    phase: 'COMPLETE',
    codeLine: 35,
    pairExamined: 'Topo Complete',
    edgesDeduced: ['b &rarr; a', 'd &rarr; a', 'a &rarr; c', 'b &rarr; d'],
    alienAlphabet: 'b -> d -> a -> c',
    explanation: 'Node \'b\' has in-degree 0, followed by \'d\', then \'a\', then \'c\'. Alien alphabet: "bdac"!'
  }
];

export default function AlienDictionaryVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Comparing: <strong className="text-purple-200">{step.pairExamined}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Order Deduced: <strong className="text-cyan-200">{step.alienAlphabet || 'Computing...'}</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center text-xs font-mono text-[#8a8ea3]">
          <span>Precedence Relations Inferred</span>
          <span className="text-emerald-400 font-bold">Directed Character Graph</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap min-h-[48px] p-3 rounded-xl bg-[#0f1017] border border-[#1f2233]">
          {step.edgesDeduced.length === 0 ? (
            <span className="text-[#475569] font-mono text-xs italic">Awaiting pairwise character scans...</span>
          ) : (
            step.edgesDeduced.map((edgeStr, idx) => (
              <span
                key={idx}
                dangerouslySetInnerHTML={{ __html: edgeStr }}
                className="px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-200 font-mono text-xs font-bold shadow"
              />
            ))
          )}
        </div>

        {step.alienAlphabet && (
          <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-300">Alien Alphabet Sequence:</span>
            <span className="text-base font-bold text-emerald-200 tracking-wider">
              {step.alienAlphabet}
            </span>
          </div>
        )}
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[#161824] border border-[#272b3c] text-xs font-mono text-[#94a3b8]">
        {step.explanation}
      </div>
    </div>
  );
}
