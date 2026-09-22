import React from 'react';

export const meta = {
  title: 'Word Ladder I',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Hard',
  timeComplexity: 'O(N * wordLen * 26)',
  spaceComplexity: 'O(N * wordLen)',
  description: 'Finds the length of the shortest transformation sequence from beginWord to endWord such that only one letter changes at a time and every transformed word exists in wordList (LeetCode 127).'
};

export const solutions = {
  cpp: `// C++: Word Ladder I (LeetCode 127)
#include <string>
#include <vector>
#include <queue>
#include <unordered_set>
using namespace std;

int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
    unordered_set<string> dict(wordList.begin(), wordList.end());
    if (dict.find(endWord) == dict.end()) return 0;
    
    queue<pair<string, int>> q;
    q.push({beginWord, 1});
    dict.erase(beginWord);
    
    while (!q.empty()) {
        string word = q.front().first;
        int steps = q.front().second;
        q.pop();
        
        if (word == endWord) return steps;
        
        for (int i = 0; i < word.length(); i++) {
            char original = word[i];
            for (char ch = 'a'; ch <= 'z'; ch++) {
                word[i] = ch;
                if (dict.find(word) != dict.end()) {
                    dict.erase(word);
                    q.push({word, steps + 1});
                }
            }
            word[i] = original;
        }
    }
    return 0;
}`,
  java: `// Java: Word Ladder I (BFS)
import java.util.*;

class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> set = new HashSet<>(wordList);
        if (!set.contains(endWord)) return 0;
        
        Queue<Pair> q = new LinkedList<>();
        q.add(new Pair(beginWord, 1));
        set.remove(beginWord);
        
        while (!q.isEmpty()) {
            Pair cur = q.poll();
            String word = cur.word;
            int step = cur.step;
            if (word.equals(endWord)) return step;
            
            char[] chars = word.toCharArray();
            for (int i = 0; i < chars.length; i++) {
                char orig = chars[i];
                for (char c = 'a'; c <= 'z'; c++) {
                    chars[i] = c;
                    String next = new String(chars);
                    if (set.contains(next)) {
                        set.remove(next);
                        q.add(new Pair(next, step + 1));
                    }
                }
                chars[i] = orig;
            }
        }
        return 0;
    }
    static class Pair {
        String word; int step;
        Pair(String w, int s) { word = w; step = s; }
    }
}`,
  python: `# Python: Word Ladder I
from collections import deque

def ladderLength(beginWord: str, endWord: str, wordList: list[str]) -> int:
    wordSet = set(wordList)
    if endWord not in wordSet:
        return 0
    q = deque([(beginWord, 1)])
    if beginWord in wordSet: wordSet.remove(beginWord)
    
    while q:
        word, step = q.popleft()
        if word == endWord:
            return step
        for i in range(len(word)):
            for c in 'abcdefghijklmnopqrstuvwxyz':
                nxt = word[:i] + c + word[i+1:]
                if nxt in wordSet:
                    wordSet.remove(nxt)
                    q.append((nxt, step + 1))
    return 0
`,
  javascript: `// JavaScript: Word Ladder I
function ladderLength(beginWord, endWord, wordList) {
  const dict = new Set(wordList);
  if (!dict.has(endWord)) return 0;
  const q = [[beginWord, 1]];
  dict.delete(beginWord);
  // BFS mutate letters a-z
  return 0;
}`
};

export const steps = [
  {
    title: '1. Initialize BFS with "hit"',
    phase: 'INIT',
    codeLine: 13,
    currentWord: 'hit',
    stepCount: 1,
    queue: [['hit', 1]],
    visitedPath: ['hit'],
    explanation: 'Enqueue beginWord "hit" with step = 1. Remaining dict: {"hot", "dot", "dog", "lot", "log", "cog"}.'
  },
  {
    title: '2. Mutate to "hot" (Step 2)',
    phase: 'MUTATE_HOT',
    codeLine: 29,
    currentWord: 'hot',
    stepCount: 2,
    queue: [['hot', 2]],
    visitedPath: ['hit', 'hot'],
    explanation: 'Changing "i" to "o" in "hit" gives "hot" in dict. Enqueue ("hot", 2), delete "hot" from set.'
  },
  {
    title: '3. Mutate to "dot" & "lot" (Step 3)',
    phase: 'MUTATE_DOT_LOT',
    codeLine: 29,
    currentWord: 'dot',
    stepCount: 3,
    queue: [['dot', 3], ['lot', 3]],
    visitedPath: ['hit', 'hot', 'dot'],
    explanation: '"hot" branches into 1-letter valid mutations: "dot" and "lot" at step 3.'
  },
  {
    title: '4. Mutate to "dog" (Step 4)',
    phase: 'MUTATE_DOG',
    codeLine: 29,
    currentWord: 'dog',
    stepCount: 4,
    queue: [['lot', 3], ['dog', 4]],
    visitedPath: ['hit', 'hot', 'dot', 'dog'],
    explanation: '"dot" mutates letter "t" -> "g" to reach "dog" at step 4.'
  },
  {
    title: '5. Reach endWord "cog"! (Step 5)',
    phase: 'REACHED',
    codeLine: 19,
    currentWord: 'cog',
    stepCount: 5,
    queue: [],
    visitedPath: ['hit', 'hot', 'dot', 'dog', 'cog'],
    explanation: '"dog" mutates "d" -> "c" producing target "cog"! Shortest path length = 5.'
  }
];

export default function WordLadderIVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Current Word: <strong className="text-cyan-200">"{step.currentWord}"</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Ladder Length: <strong className="text-purple-200">{step.stepCount} words</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl flex flex-col items-center gap-5 w-full">
        <div className="flex justify-between items-center w-full px-2 text-xs font-mono text-[var(--chalk-dim)]">
          <span>Transformation Pathway Sequence</span>
          <span className="text-cyan-400 font-bold">1-Letter Edit Distance</span>
        </div>

        {/* Word chain visualization */}
        <div className="flex items-center gap-2 flex-wrap justify-center py-2">
          {step.visitedPath.map((word, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span
                className={`px-3.5 py-2 rounded-xl font-mono font-bold text-sm tracking-widest border transition-all ${
                  idx === step.visitedPath.length - 1
                    ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200 shadow-lg scale-105'
                    : 'bg-[var(--board-raised-2)] border-[var(--line)] text-[var(--chalk-dim)]'
                }`}
              >
                {word}
              </span>
              {idx < step.visitedPath.length - 1 && (
                <span className="text-[#525777] font-mono text-sm">&rarr;</span>
              )}
            </div>
          ))}
        </div>

        {/* Queue State */}
        <div className="w-full p-3 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] flex items-center justify-between text-xs font-mono">
          <span className="text-[var(--chalk-dim)]">BFS Queue Head:</span>
          <span className="text-purple-300 font-bold">
            {step.queue.length > 0 ? JSON.stringify(step.queue[0]) : 'Target Found (Empty)'}
          </span>
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-mono text-[#94a3b8]">
        {step.explanation}
      </div>
    </div>
  );
}
