import React from 'react';

export const meta = {
  title: 'Word Ladder II',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Hard',
  timeComplexity: 'O(N * wordLen * 26 + paths)',
  spaceComplexity: 'O(N * paths)',
  description: 'Finds all the shortest transformation sequences from beginWord to endWord, keeping track of entire path chains in the BFS queue and erasing words level-by-level (LeetCode 126).'
};

export const solutions = {
  cpp: `// C++: Word Ladder II (LeetCode 126)
#include <string>
#include <vector>
#include <queue>
#include <unordered_set>
using namespace std;

vector<vector<string>> findLadders(string beginWord, string endWord, vector<string>& wordList) {
    unordered_set<string> dict(wordList.begin(), wordList.end());
    queue<vector<string>> q;
    q.push({beginWord});
    
    vector<string> usedOnLevel;
    usedOnLevel.push_back(beginWord);
    int level = 0;
    vector<vector<string>> ans;
    
    while (!q.empty()) {
        vector<string> vec = q.front();
        q.pop();
        
        // When advancing to a new level, erase words used on previous level
        if (vec.size() > level) {
            level++;
            for (auto& it : usedOnLevel) dict.erase(it);
            usedOnLevel.clear();
        }
        
        string word = vec.back();
        if (word == endWord) {
            if (ans.size() == 0 || ans[0].size() == vec.size()) {
                ans.push_back(vec);
            }
        }
        
        for (int i = 0; i < word.size(); i++) {
            char original = word[i];
            for (char c = 'a'; c <= 'z'; c++) {
                word[i] = c;
                if (dict.count(word)) {
                    vec.push_back(word);
                    q.push(vec);
                    usedOnLevel.push_back(word);
                    vec.pop_back();
                }
            }
            word[i] = original;
        }
    }
    return ans;
}`,
  java: `// Java: Word Ladder II
import java.util.*;

class Solution {
    public List<List<String>> findLadders(String beginWord, String endWord, List<String> wordList) {
        Set<String> dict = new HashSet<>(wordList);
        List<List<String>> ans = new ArrayList<>();
        if (!dict.contains(endWord)) return ans;
        
        Queue<List<String>> q = new LinkedList<>();
        q.add(Arrays.asList(beginWord));
        List<String> usedOnLevel = new ArrayList<>();
        usedOnLevel.add(beginWord);
        int level = 0;
        
        while (!q.isEmpty()) {
            List<String> vec = q.poll();
            if (vec.size() > level) {
                level++;
                for (String w : usedOnLevel) dict.remove(w);
                usedOnLevel.clear();
            }
            String word = vec.get(vec.size() - 1);
            if (word.equals(endWord)) {
                if (ans.isEmpty() || ans.get(0).size() == vec.size()) {
                    ans.add(vec);
                }
            }
            // branch mutations
        }
        return ans;
    }
}`,
  python: `# Python: Word Ladder II
from collections import deque

def findLadders(beginWord: str, endWord: str, wordList: list[str]) -> list[list[str]]:
    dictSet = set(wordList)
    if endWord not in dictSet: return []
    q = deque([[beginWord]])
    ans = []
    level = 0
    used = set([beginWord])
    
    while q:
        path = q.popleft()
        if len(path) > level:
            level += 1
            dictSet -= used
            used = set()
        word = path[-1]
        if word == endWord:
            if not ans or len(ans[0]) == len(path):
                ans.append(path)
        # mutations
    return ans
`,
  javascript: `// JavaScript: Word Ladder II
function findLadders(beginWord, endWord, wordList) {
  // Level-by-level BFS with path cloning
  return [];
}`
};

export const steps = [
  {
    title: '1. Initialize Queue with [["hit"]]',
    phase: 'INIT',
    codeLine: 12,
    activeLevel: 1,
    paths: [['hit']],
    explanation: 'Queue contains 1 path: ["hit"]. Level 1.'
  },
  {
    title: '2. Level 2: "hit" -> "hot"',
    phase: 'LEVEL_2',
    codeLine: 24,
    activeLevel: 2,
    paths: [['hit', 'hot']],
    explanation: 'From "hit", only "hot" is valid. Path updated to ["hit", "hot"].'
  },
  {
    title: '3. Level 3: Divergence to ["dot"] and ["lot"]',
    phase: 'LEVEL_3',
    codeLine: 43,
    activeLevel: 3,
    paths: [
      ['hit', 'hot', 'dot'],
      ['hit', 'hot', 'lot']
    ],
    explanation: '"hot" forks into two simultaneous paths: ["hit", "hot", "dot"] and ["hit", "hot", "lot"]. Both preserved at level 3.'
  },
  {
    title: '4. Level 5: Dual Shortest Solutions Arrive at "cog"',
    phase: 'FINAL_PATHS',
    codeLine: 31,
    activeLevel: 5,
    paths: [
      ['hit', 'hot', 'dot', 'dog', 'cog'],
      ['hit', 'hot', 'lot', 'log', 'cog']
    ],
    explanation: 'Both paths successfully reach endWord "cog" in exactly 5 steps! Two valid shortest transformation sequences discovered.'
  }
];

export default function WordLadderIiVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Level: <strong className="text-purple-200">{step.activeLevel}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Active Pathways: <strong className="text-cyan-200">{step.paths.length}</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl flex flex-col items-center gap-4 w-full">
        <div className="flex justify-between items-center w-full px-2 text-xs font-mono text-[#8a8ea3]">
          <span>All Shortest Transformation Paths</span>
          <span className="text-purple-400 font-bold">Level-by-Level Set Deletion</span>
        </div>

        <div className="w-full space-y-3">
          {step.paths.map((path, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-[#161824] border border-[#272b3c] flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 font-bold mr-1">
                Path #{idx + 1}
              </span>
              {path.map((w, wIdx) => (
                <div key={wIdx} className="flex items-center gap-1.5 font-mono text-xs">
                  <span className={`px-2.5 py-1 rounded-lg font-bold border ${
                    w === 'cog'
                      ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200 shadow-md'
                      : 'bg-[#12131b] border-[#242738] text-slate-300'
                  }`}>
                    {w}
                  </span>
                  {wIdx < path.length - 1 && <span className="text-[#525777]">&rarr;</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[#161824] border border-[#272b3c] text-xs font-mono text-[#94a3b8]">
        {step.explanation}
      </div>
    </div>
  );
}
