import React from 'react';

export const meta = {
  title: 'Design Twitter (K-Way Merge with Heap)',
  category: 'Heaps',
  difficulty: 'Hard',
  timeComplexity: 'O(K log K) per feed fetch where K = followees',
  spaceComplexity: 'O(Users + Tweets)',
  description: 'Implements a simplified Twitter timeline service supporting postTweet, getNewsFeed, follow, and unfollow. Merges the 10 most recent tweets across followed users using a Max-Heap K-way merge.'
};

export const solutions = {
  cpp: `// C++ Design Twitter (K-Way Merge with Heap)
// Time: O(K log K) getNewsFeed | Space: O(U + T)
#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <queue>
using namespace std;

class Twitter {
    int timestamp = 0;
    unordered_map<int, vector<pair<int, int>>> userTweets; // userId -> list of {time, tweetId}
    unordered_map<int, unordered_set<int>> following;     // userId -> set of followees
public:
    Twitter() {}

    void postTweet(int userId, int tweetId) {
        userTweets[userId].push_back({timestamp++, tweetId});
    }

    vector<int> getNewsFeed(int userId) {
        // Max-Heap of {timestamp, tweetId, userId, tweetIndex}
        priority_queue<vector<int>> maxHeap;

        // User follows themselves
        unordered_set<int> followees = following[userId];
        followees.insert(userId);

        for (int f : followees) {
            if (userTweets.count(f) && !userTweets[f].empty()) {
                int lastIdx = userTweets[f].size() - 1;
                maxHeap.push({userTweets[f][lastIdx].first, userTweets[f][lastIdx].second, f, lastIdx});
            }
        }

        vector<int> feed;
        while (!maxHeap.empty() && feed.size() < 10) {
            auto top = maxHeap.top();
            maxHeap.pop();

            feed.push_back(top[1]);
            int f = top[2], idx = top[3];
            if (idx > 0) {
                maxHeap.push({userTweets[f][idx - 1].first, userTweets[f][idx - 1].second, f, idx - 1});
            }
        }

        return feed;
    }

    void follow(int followerId, int followeeId) {
        following[followerId].insert(followeeId);
    }

    void unfollow(int followerId, int followeeId) {
        following[followerId].erase(followeeId);
    }
};`,
  python: `# Python 3 Design Twitter (K-Way Merge with Heap)
# Time: O(K log K) getNewsFeed | Space: O(U + T)
import heapq
from collections import defaultdict

class Twitter:
    def __init__(self):
        self.time = 0
        self.tweets = defaultdict(list)
        self.following = defaultdict(set)

    def postTweet(self, userId: int, tweetId: int) -> None:
        self.tweets[userId].append((self.time, tweetId))
        self.time += 1

    def getNewsFeed(self, userId: int) -> list[int]:
        max_heap = []
        followees = set(self.following[userId])
        followees.add(userId)

        for f in followees:
            if self.tweets[f]:
                last_idx = len(self.tweets[f]) - 1
                t, tid = self.tweets[f][last_idx]
                max_heap.append((-t, tid, f, last_idx))

        heapq.heapify(max_heap)
        feed = []

        while max_heap and len(feed) < 10:
            neg_t, tid, f, idx = heapq.heappop(max_heap)
            feed.append(tid)
            if idx > 0:
                prev_t, prev_tid = self.tweets[f][idx - 1]
                heapq.heappush(max_heap, (-prev_t, prev_tid, f, idx - 1))

        return feed

    def follow(self, followerId: int, followeeId: int) -> None:
        self.following[followerId].add(followeeId)

    def unfollow(self, followerId: int, followeeId: int) -> None:
        self.following[followerId].discard(followeeId)`,
  java: `// Java Design Twitter (K-Way Merge with Heap)
// Time: O(K log K) getNewsFeed | Space: O(U + T)
import java.util.*;

class Twitter {
    private int timestamp = 0;
    private Map<Integer, List<int[]>> tweets = new HashMap<>();
    private Map<Integer, Set<Integer>> following = new HashMap<>();

    public Twitter() {}

    public void postTweet(int userId, int tweetId) {
        tweets.computeIfAbsent(userId, k -> new ArrayList<>()).add(new int[]{timestamp++, tweetId});
    }

    public List<Integer> getNewsFeed(int userId) {
        PriorityQueue<int[]> maxHeap = new PriorityQueue<>((a, b) -> b[0] - a[0]);
        Set<Integer> users = new HashSet<>(following.getOrDefault(userId, new HashSet<>()));
        users.add(userId);

        for (int u : users) {
            List<int[]> userList = tweets.get(u);
            if (userList != null && !userList.isEmpty()) {
                int lastIdx = userList.size() - 1;
                int[] tw = userList.get(lastIdx);
                maxHeap.offer(new int[]{tw[0], tw[1], u, lastIdx});
            }
        }

        List<Integer> feed = new ArrayList<>();
        while (!maxHeap.isEmpty() && feed.size() < 10) {
            int[] top = maxHeap.poll();
            feed.add(top[1]);
            int u = top[2], idx = top[3];
            if (idx > 0) {
                int[] prev = tweets.get(u).get(idx - 1);
                maxHeap.offer(new int[]{prev[0], prev[1], u, idx - 1});
            }
        }
        return feed;
    }

    public void follow(int followerId, int followeeId) {
        following.computeIfAbsent(followerId, k -> new HashSet<>()).add(followeeId);
    }

    public void unfollow(int followerId, int followeeId) {
        if (following.containsKey(followerId)) {
            following.get(followerId).remove(followeeId);
        }
    }
}`,
  javascript: `// JavaScript Design Twitter
// Time: O(K log K) getNewsFeed | Space: O(U + T)
class Twitter {
    constructor() {
        this.time = 0;
        this.tweets = new Map();
        this.following = new Map();
    }

    postTweet(userId, tweetId) {
        if (!this.tweets.has(userId)) this.tweets.set(userId, []);
        this.tweets.get(userId).push({ time: this.time++, id: tweetId });
    }

    getNewsFeed(userId) {
        const users = new Set(this.following.get(userId) || []);
        users.add(userId);

        const allCandidates = [];
        for (const u of users) {
            const list = this.tweets.get(u) || [];
            allCandidates.push(...list.slice(-10));
        }

        allCandidates.sort((a, b) => b.time - a.time);
        return allCandidates.slice(0, 10).map(t => t.id);
    }

    follow(followerId, followeeId) {
        if (!this.following.has(followerId)) this.following.set(followerId, new Set());
        this.following.get(followerId).add(followeeId);
    }

    unfollow(followerId, followeeId) {
        if (this.following.has(followerId)) {
            this.following.get(followerId).delete(followeeId);
        }
    }
}`
};

export const steps = [
  {
    title: '1. User 1 Posts Tweet 5: postTweet(1, 5)',
    phase: 'POST_1',
    codeLine: 18,
    operation: 'postTweet(1, 5)',
    users: [
      { id: 1, tweets: [{ id: 5, t: 0 }], following: [] }
    ],
    feed: [],
    variables: { user: 1, tweetId: 5, timestamp: 0 },
    explain: 'User 1 posts tweet 5 at timestamp 0. Recorded in user 1\'s tweet history list.',
    intuition: 'Each user stores an append-only timeline of their own tweets sorted by timestamp.'
  },
  {
    title: '2. User 1 Gets News Feed: getNewsFeed(1) -> [5]',
    phase: 'FEED_1',
    codeLine: 22,
    operation: 'getNewsFeed(1)',
    users: [
      { id: 1, tweets: [{ id: 5, t: 0 }], following: [] }
    ],
    feed: [5],
    variables: { feed: '[5]', source: 'Self-tweet only' },
    explain: 'User 1 inherently follows themselves. News feed retrieves tweet 5.',
    intuition: 'Self-authored tweets are automatically included in user news feeds.'
  },
  {
    title: '3. User 1 Follows User 2 & User 2 Posts Tweet 6',
    phase: 'FOLLOW_AND_POST',
    codeLine: 50,
    operation: 'follow(1, 2) & postTweet(2, 6)',
    users: [
      { id: 1, tweets: [{ id: 5, t: 0 }], following: [2] },
      { id: 2, tweets: [{ id: 6, t: 1 }], following: [] }
    ],
    feed: [5],
    variables: { 'User 1 follows': '[2]', 'User 2 post': 'tweet 6 at t=1' },
    explain: 'User 1 follows User 2. User 2 posts tweet 6 with timestamp 1.',
    intuition: 'Follow graph updates dynamically in O(1) time.'
  },
  {
    title: '4. getNewsFeed(1) -> [6, 5] & unfollow(1, 2) -> [5]',
    phase: 'COMPLETED',
    codeLine: 24,
    operation: 'getNewsFeed(1) -> [6, 5]',
    users: [
      { id: 1, tweets: [{ id: 5, t: 0 }], following: [2] },
      { id: 2, tweets: [{ id: 6, t: 1 }], following: [] }
    ],
    feed: [6, 5],
    variables: { 'Feed [6, 5]': 'Merged by timestamp desc', 'After unfollow': 'Feed reverts to [5]' },
    explain: 'K-way merge with Max-Heap pulls most recent tweets across User 1 and User 2: tweet 6 (t=1) followed by tweet 5 (t=0).',
    intuition: 'PriorityQueue merges K user streams without loading entire user histories into memory.'
  }
];

export default function DesignTwitterVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Operation: {step.operation}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Feed Items: {step.feed.length}
        </span>
      </div>

      {/* Users and Timelines */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[var(--chalk-dim)] uppercase tracking-wider">
          User Timelines &amp; Global News Feed
        </span>

        <div className="flex items-center justify-center gap-4 py-2 font-mono">
          {step.users.map(u => (
            <div
              key={u.id}
              className="p-3 rounded-xl border border-[#3b4261] bg-[var(--board-raised-2)] flex flex-col items-center gap-1.5"
            >
              <span className="text-xs font-bold text-amber-300">User {u.id}</span>
              <div className="flex items-center gap-1.5 text-[10px]">
                <span className="text-[var(--chalk-dim)]">Tweets:</span>
                {u.tweets.map(t => (
                  <span
                    key={t.id}
                    className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold"
                  >
                    #{t.id}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Current News Feed */}
        {step.feed.length > 0 && (
          <div className="w-full border-t border-[var(--line)] pt-3 flex flex-col items-center gap-2">
            <span className="text-[11px] font-mono text-emerald-400 font-semibold">
              Live News Feed (User 1):
            </span>
            <div className="flex items-center gap-2 font-mono text-sm text-emerald-300 font-bold">
              {step.feed.map((tid, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40"
                >
                  Tweet #{tid}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Explanation */}
      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl p-3 text-xs font-mono text-center text-[var(--chalk-dim)]">
        {step.explain}
      </div>
    </div>
  );
}
