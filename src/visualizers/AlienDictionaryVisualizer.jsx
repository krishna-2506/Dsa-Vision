export const rendererType = 'queue';

export const meta = {
  title: 'Alien Dictionary',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Hard',
  timeComplexity: 'O(N * len + K)',
  spaceComplexity: 'O(K) where K is unique alien letters',
  description: 'Reconstructs the alphabet ordering of an alien language given a lexicographically sorted list of alien words by building a directed graph of character precedence and applying Topological Sort.'
};

export const ideaMap = {
  title: 'Alien Lexicographic Topological Deduction',
  nodes: [
    {
      id: 'step1',
      label: 'Adjacent Word Comparison',
      detail: 'Compare adjacent words dict[i] and dict[i+1]. The first differing character pair (c1, c2) defines directed edge c1 -> c2.'
    },
    {
      id: 'step2',
      label: 'Character In-Degree Counting',
      detail: 'Record in-degrees for all K alien letters based on directed precedence edges.'
    },
    {
      id: 'step3',
      label: 'Kahn\'s BFS Topological Extraction',
      detail: 'Push characters with in-degree 0 into the ready queue. Dequeue, append to alphabet string, and decrement neighbor in-degrees.'
    },
    {
      id: 'step4',
      label: 'Valid Alphabet Validation',
      detail: 'If reconstructed string length equals K, return the alphabet order; if a cycle exists, return empty string "".'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Alien Dictionary (Topological Sort)
// Time: O(N * len + K) | Space: O(K)
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
    return order.length() == K ? order : "";
}`,
  java: `// Java: Alien Dictionary (Topological Sort)
// Time: O(N * len + K) | Space: O(K)
import java.util.*;

class Solution {
    public String findOrder(String[] words, int N, int K) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < K; i++) adj.add(new ArrayList<>());
        int[] indegree = new int[K];
        
        for (int i = 0; i < N - 1; i++) {
            String w1 = words[i], w2 = words[i + 1];
            int len = Math.min(w1.length(), w2.length());
            for (int ptr = 0; ptr < len; ptr++) {
                if (w1.charAt(ptr) != w2.charAt(ptr)) {
                    adj.get(w1.charAt(ptr) - 'a').add(w2.charAt(ptr) - 'a');
                    indegree[w2.charAt(ptr) - 'a']++;
                    break;
                }
            }
        }
        
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < K; i++) {
            if (indegree[i] == 0) q.offer(i);
        }
        
        StringBuilder order = new StringBuilder();
        while (!q.isEmpty()) {
            int u = q.poll();
            order.append((char)(u + 'a'));
            for (int v : adj.get(u)) {
                indegree[v]--;
                if (indegree[v] == 0) q.offer(v);
            }
        }
        return order.length() == K ? order.toString() : "";
    }
}`,
  python: `# Python: Alien Dictionary (Topological Sort)
# Time: O(N * len + K) | Space: O(K)
from collections import deque, defaultdict

def findOrder(dict_words: list[str], N: int, K: int) -> str:
    adj = defaultdict(list)
    indegree = {chr(ord('a') + i): 0 for i in range(K)}
    
    for i in range(N - 1):
        w1, w2 = dict_words[i], dict_words[i + 1]
        min_len = min(len(w1), len(w2))
        for ptr in range(min_len):
            if w1[ptr] != w2[ptr]:
                adj[w1[ptr]].append(w2[ptr])
                indegree[w2[ptr]] += 1
                break
                
    q = deque([ch for ch in indegree if indegree[ch] == 0])
    order = []
    
    while q:
        u = q.popleft()
        order.append(u)
        for v in adj[u]:
            indegree[v] -= 1
            if indegree[v] == 0:
                q.append(v)
                
    return "".join(order) if len(order) == K else ""`,
  javascript: `// JavaScript: Alien Dictionary (Topological Sort)
// Time: O(N * len + K) | Space: O(K)
function findOrder(words, N, K) {
  const adj = Array.from({ length: K }, () => []);
  const indegree = new Array(K).fill(0);
  
  for (let i = 0; i < N - 1; i++) {
    const w1 = words[i], w2 = words[i + 1];
    const len = Math.min(w1.length(), w2.length());
    for (let ptr = 0; ptr < len; ptr++) {
      if (w1[ptr] !== w2[ptr]) {
        const u = w1.charCodeAt(ptr) - 97;
        const v = w2.charCodeAt(ptr) - 97;
        adj[u].push(v);
        indegree[v]++;
        break;
      }
    }
  }
  
  const q = [];
  for (let i = 0; i < K; i++) {
    if (indegree[i] === 0) q.push(i);
  }
  
  let order = '';
  while (q.length > 0) {
    const u = q.shift();
    order += String.fromCharCode(u + 97);
    for (const v of adj[u]) {
      indegree[v]--;
      if (indegree[v] === 0) q.push(v);
    }
  }
  return order.length === K ? order : '';
}`
};

export const steps = [
  {
    phase: 'SETUP',
    title: '1. Deduce Letter Precedence from Word Pairs',
    mode: 'queue',
    queue: ['b'],
    inputTrack: {
      items: [2, 0, 1, 1],
      label: 'Character In-Degrees [a, b, c, d]'
    },
    scanIndex: 1,
    activeIndices: [1],
    customCard: {
      title: 'Word Pair Comparisons',
      rows: [
        { label: '"baa" vs "abcd"', value: 'b comes before a (b -> a)', accent: true },
        { label: '"abcd" vs "abca"', value: 'd comes before a (d -> a)' },
        { label: '"abca" vs "cab"', value: 'a comes before c (a -> c)' },
        { label: '"cab" vs "cad"', value: 'b comes before d (b -> d)' }
      ]
    },
    variables: {
      alienAlphabet: '""',
      queue: '["b"]',
      inDegrees: '{a: 2, b: 0, c: 1, d: 1}'
    },
    metrics: {
      alphabetLength: '0 / 4',
      queueSize: 1,
      currentChar: 'b'
    },
    explain: 'Adjacent word comparisons produce directed edges b->a, d->a, a->c, b->d. Letter "b" has in-degree 0; enqueue "b".',
    intuition: 'The first mismatch between lexicographically ordered words reveals strict relative precedence.'
  },
  {
    phase: 'PROCESS_B',
    title: '2. Dequeue "b": Unlock Letter "d"',
    mode: 'queue',
    queue: ['d'],
    inputTrack: {
      items: [1, 0, 1, 0],
      label: 'Character In-Degrees [a, b, c, d]'
    },
    scanIndex: 3,
    activeIndices: [3],
    customCard: {
      title: 'First Letter Emitted',
      rows: [
        { label: 'Alien Alphabet', value: '"b"', accent: true },
        { label: 'Edge b -> a', value: 'a in-degree drops 2 -> 1' },
        { label: 'Edge b -> d', value: 'd in-degree drops 1 -> 0 (Enqueued!)' },
        { label: 'Queue', value: '["d"]' }
      ]
    },
    variables: {
      alienAlphabet: '"b"',
      queue: '["d"]',
      inDegrees: '{a: 1, b: 0, c: 1, d: 0}'
    },
    metrics: {
      alphabetLength: '1 / 4',
      queueSize: 1,
      currentChar: 'd'
    },
    explain: 'Dequeue "b". Alphabet becomes "b". Edges b->a and b->d reduce in-degrees. Letter "d" reaches in-degree 0 and is enqueued.',
    intuition: 'Processing the root letter clears the way for subsequent characters in the alien language.'
  },
  {
    phase: 'PROCESS_D_A',
    title: '3. Dequeue "d" & "a": Unlock Letter "c"',
    mode: 'queue',
    queue: ['c'],
    inputTrack: {
      items: [0, 0, 0, 0],
      label: 'Character In-Degrees [a, b, c, d]'
    },
    scanIndex: 0,
    activeIndices: [0, 2],
    customCard: {
      title: 'Successive Alphabet Additions',
      rows: [
        { label: 'Alien Alphabet', value: '"b" -> "bd" -> "bda"', accent: true },
        { label: 'Edge d -> a', value: 'a in-degree drops 1 -> 0 (Processed)' },
        { label: 'Edge a -> c', value: 'c in-degree drops 1 -> 0 (Enqueued!)' },
        { label: 'Queue', value: '["c"]' }
      ]
    },
    variables: {
      alienAlphabet: '"bda"',
      queue: '["c"]',
      inDegrees: '{a: 0, b: 0, c: 0, d: 0}'
    },
    metrics: {
      alphabetLength: '3 / 4',
      queueSize: 1,
      currentChar: 'a'
    },
    explain: 'Dequeue "d" then "a". Alphabet advances to "bda". Edge a->c decrements in-degree of "c" to 0; enqueue "c".',
    intuition: 'Topological sorting systematically respects all relative precedence rules.'
  },
  {
    phase: 'COMPLETE',
    title: '4. Dequeue "c": Alien Alphabet Reconstructed "bdac"',
    mode: 'queue',
    queue: [],
    inputTrack: {
      items: [0, 0, 0, 0],
      label: 'All Letters Resolved'
    },
    scanIndex: 2,
    activeIndices: [0, 1, 2, 3],
    customCard: {
      title: 'Alien Lexicon Solved',
      rows: [
        { label: 'Final Alien Alphabet', value: '"bdac"', accent: true },
        { label: 'Unique Characters (K)', value: '4 letters' },
        { label: 'Validity', value: 'Complete DAG sequence with 0 cycles' },
        { label: 'Status', value: 'Success' }
      ]
    },
    variables: {
      alienAlphabet: '"bdac"',
      queue: '[] (Empty)',
      inDegrees: '{a: 0, b: 0, c: 0, d: 0}'
    },
    metrics: {
      alphabetLength: '4 / 4',
      queueSize: 0,
      currentChar: 'c'
    },
    explain: 'Dequeue "c". Alphabet becomes "bdac". Queue is empty and length equals K = 4. Reconstructed alphabet: "bdac"!',
    intuition: 'Topological sort guarantees every prefix relation in the dictionary is rigorously honored.'
  }
];
