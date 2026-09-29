export const rendererType = 'array-scan';

export const meta = {
  title: 'Design Twitter (K-Way Merge with Heap)',
  category: 'Heaps / Priority Queues',
  difficulty: 'Hard',
  timeComplexity: 'O(K log K) per getNewsFeed where K = followees',
  spaceComplexity: 'O(Users + Tweets)',
  description: 'Implements a simplified Twitter timeline service supporting postTweet, getNewsFeed, follow, and unfollow. Merges the 10 most recent tweets across all followed users using a Max-Heap K-way merge (LeetCode 355).'
};

export const ideaMap = {
  title: 'Twitter Timeline K-Way Heap Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Tweet Post with Global Timestamp',
      detail: 'Each tweet is assigned an auto-incrementing timestamp and appended to userTweets[userId].'
    },
    {
      id: 'step2',
      label: 'Followee Set Aggregation',
      detail: 'When getNewsFeed(userId) is called, gather all followees plus the user themselves (users follow their own tweets).'
    },
    {
      id: 'step3',
      label: 'Max-Heap Seed Initialization',
      detail: 'Push the most recent tweet from each followed user into a Max-Heap keyed by timestamp.'
    },
    {
      id: 'step4',
      label: 'K-Way Merge Extraction',
      detail: 'Pop the top (latest) tweet into newsfeed; push the previous tweet from that same user until 10 tweets are collected.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Design Twitter (K-Way Merge with Heap)
// Time: O(K log K) per getNewsFeed | Space: O(U + T)
#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <queue>
using namespace std;

class Twitter {
    int timestamp = 0;
    unordered_map<int, vector<pair<int, int>>> userTweets; // userId -> {time, tweetId}
    unordered_map<int, unordered_set<int>> following;     // userId -> followees

public:
    Twitter() {}

    void postTweet(int userId, int tweetId) {
        userTweets[userId].push_back({timestamp++, tweetId});
    }

    vector<int> getNewsFeed(int userId) {
        // Max-Heap of {timestamp, tweetId, userId, tweetIndex}
        priority_queue<vector<int>> maxHeap;

        unordered_set<int> followees = following[userId];
        followees.insert(userId); // Self tweets always included

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
        if (followerId != followeeId) {
            following[followerId].insert(followeeId);
        }
    }

    void unfollow(int followerId, int followeeId) {
        following[followerId].erase(followeeId);
    }
};`,
  java: `// Java: Design Twitter (K-Way Merge with Heap)
// Time: O(K log K) per getNewsFeed | Space: O(U + T)
import java.util.*;

class Twitter {
    private static int timestamp = 0;
    private Map<Integer, List<int[]>> userTweets = new HashMap<>(); // userId -> list of [time, tweetId]
    private Map<Integer, Set<Integer>> following = new HashMap<>(); // userId -> set of followees

    public Twitter() {}

    public void postTweet(int userId, int tweetId) {
        userTweets.computeIfAbsent(userId, k -> new ArrayList<>()).add(new int[]{timestamp++, tweetId});
    }

    public List<Integer> getNewsFeed(int userId) {
        PriorityQueue<int[]> maxHeap = new PriorityQueue<>((a, b) -> b[0] - a[0]);

        Set<Integer> followees = new HashSet<>(following.getOrDefault(userId, new HashSet<>()));
        followees.add(userId);

        for (int f : followees) {
            List<int[]> tweets = userTweets.get(f);
            if (tweets != null && !tweets.isEmpty()) {
                int lastIdx = tweets.size() - 1;
                maxHeap.offer(new int[]{tweets.get(lastIdx)[0], tweets.get(lastIdx)[1], f, lastIdx});
            }
        }

        List<Integer> feed = new ArrayList<>();
        while (!maxHeap.isEmpty() && feed.size() < 10) {
            int[] top = maxHeap.poll();
            feed.add(top[1]);
            int f = top[2], idx = top[3];
            if (idx > 0) {
                List<int[]> tweets = userTweets.get(f);
                maxHeap.offer(new int[]{tweets.get(idx - 1)[0], tweets.get(idx - 1)[1], f, idx - 1});
            }
        }
        return feed;
    }

    public void follow(int followerId, int followeeId) {
        if (followerId != followeeId) {
            following.computeIfAbsent(followerId, k -> new HashSet<>()).add(followeeId);
        }
    }

    public void unfollow(int followerId, int followeeId) {
        if (following.containsKey(followerId)) {
            following.get(followerId).remove(followeeId);
        }
    }
}`,
  python: `# Python: Design Twitter (K-Way Merge with Heap)
# Time: O(K log K) per getNewsFeed | Space: O(U + T)
import heapq
from collections import defaultdict

class Twitter:
    def __init__(self):
        self.time = 0
        self.user_tweets = defaultdict(list)
        self.following = defaultdict(set)

    def postTweet(self, userId: int, tweetId: int) -> None:
        self.user_tweets[userId].append((self.time, tweetId))
        self.time += 1

    def getNewsFeed(self, userId: int) -> list[int]:
        max_heap = []
        followees = self.following[userId] | {userId}

        for f in followees:
            tweets = self.user_tweets[f]
            if tweets:
                last_idx = len(tweets) - 1
                t, tw_id = tweets[last_idx]
                # Invert timestamp for max-heap via Python's min-heap
                max_heap.append((-t, tw_id, f, last_idx))

        heapq.heapify(max_heap)
        feed = []
        while max_heap and len(feed) < 10:
            neg_t, tw_id, f, idx = heapq.heappop(max_heap)
            feed.append(tw_id)
            if idx > 0:
                prev_t, prev_id = self.user_tweets[f][idx - 1]
                heapq.heappush(max_heap, (-prev_t, prev_id, f, idx - 1))

        return feed

    def follow(self, followerId: int, followeeId: int) -> None:
        if followerId != followeeId:
            self.following[followerId].add(followeeId)

    def unfollow(self, followerId: int, followeeId: int) -> None:
        self.following[followerId].discard(followeeId)`,
  javascript: `// JavaScript: Design Twitter (K-Way Merge with Heap)
// Time: O(K log K) per getNewsFeed | Space: O(U + T)
class Twitter {
  constructor() {
    this.time = 0;
    this.userTweets = new Map();
    this.following = new Map();
  }

  postTweet(userId, tweetId) {
    if (!this.userTweets.has(userId)) this.userTweets.set(userId, []);
    this.userTweets.get(userId).push({ time: this.time++, tweetId });
  }

  getNewsFeed(userId) {
    const followees = new Set(this.following.get(userId) || []);
    followees.add(userId);
    const candidateTweets = [];

    for (const f of followees) {
      const tweets = this.userTweets.get(f) || [];
      candidateTweets.push(...tweets);
    }
    candidateTweets.sort((a, b) => b.time - a.time);
    return candidateTweets.slice(0, 10).map(t => t.tweetId);
  }

  follow(followerId, followeeId) {
    if (followerId === followeeId) return;
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
    phase: 'POST_TWEET_1',
    title: '1. User 1 Posts Tweet 5 (t = 0)',
    arr: [5],
    auxiliaryTrack: ['User 1 (t=0)'],
    auxiliaryLabel: 'Author & Timestamp',
    activeIndices: [0],
    customCard: {
      title: 'Action: postTweet(1, 5)',
      rows: [
        { label: 'Calling API', value: 'postTweet(userId=1, tweetId=5)', accent: true },
        { label: 'Assigned Time', value: 't = 0' },
        { label: 'User 1 Tweets', value: '[{ time: 0, tweetId: 5 }]' },
        { label: 'Follow Graph', value: 'User 1 follows: { 1 }' }
      ]
    },
    variables: {
      action: 'postTweet(1, 5)',
      timestamp: 1,
      user1Feed: '[5]'
    },
    explanation: 'User 1 posts Tweet 5 at timestamp 0. User 1\'s newsfeed returns [5].'
  },
  {
    phase: 'POST_TWEET_2',
    title: '2. User 2 Posts Tweet 6 (t = 1)',
    arr: [5],
    auxiliaryTrack: ['User 1 (t=0)'],
    auxiliaryLabel: 'Author & Timestamp',
    activeIndices: [0],
    customCard: {
      title: 'Action: postTweet(2, 6)',
      rows: [
        { label: 'Calling API', value: 'postTweet(userId=2, tweetId=6)', accent: true },
        { label: 'Assigned Time', value: 't = 1' },
        { label: 'User 2 Tweets', value: '[{ time: 1, tweetId: 6 }]' },
        { label: 'User 1 Feed (Isolated)', value: '[5] (User 1 does not follow User 2 yet)' }
      ]
    },
    variables: {
      action: 'postTweet(2, 6)',
      timestamp: 2,
      user1Feed: '[5]'
    },
    explanation: 'User 2 posts Tweet 6 at timestamp 1. Because User 1 does not follow User 2, User 1\'s newsfeed remains [5].'
  },
  {
    phase: 'FOLLOW_USER_2',
    title: '3. User 1 Follows User 2: follow(1, 2)',
    arr: [5],
    auxiliaryTrack: ['User 1 (t=0)'],
    auxiliaryLabel: 'Author & Timestamp',
    activeIndices: [],
    customCard: {
      title: 'Action: follow(1, 2)',
      rows: [
        { label: 'Relationship Added', value: 'User 1 -> User 2', accent: true },
        { label: 'User 1 Following Set', value: '{ User 1, User 2 }', accent: true },
        { label: 'Active Tweet Streams', value: 'User 1: [5 (t=0)] | User 2: [6 (t=1)]' },
        { label: 'Upcoming Action', value: 'getNewsFeed(1)' }
      ]
    },
    variables: {
      action: 'follow(1, 2)',
      followingSet: '{ 1, 2 }',
      feedPending: true
    },
    explanation: 'User 1 follows User 2. User 1\'s followee set now contains User 1 (self) and User 2.'
  },
  {
    phase: 'MERGE_FEED',
    title: '4. getNewsFeed(1): Max-Heap Merges Tweets &rarr; [6, 5]',
    arr: [6, 5],
    auxiliaryTrack: ['User 2 (t=1)', 'User 1 (t=0)'],
    auxiliaryLabel: 'Author & Timestamp',
    activeIndices: [0, 1],
    customCard: {
      title: 'Action: getNewsFeed(1) Result',
      rows: [
        { label: 'K-Way Max-Heap Merge', value: 'Heap compares t=1 (Tweet 6) vs t=0 (Tweet 5)', accent: true },
        { label: 'First Pop', value: 'Tweet 6 (t=1, latest)' },
        { label: 'Second Pop', value: 'Tweet 5 (t=0)' },
        { label: 'Retrieved Timeline', value: '[6, 5] (10 most recent)', accent: true }
      ]
    },
    variables: {
      action: 'getNewsFeed(1)',
      feedResult: '[6, 5]',
      latestTweet: 6
    },
    explanation: 'getNewsFeed(1) pushes the latest tweet from each followee into a Max-Heap. Tweet 6 (t=1) is newer than Tweet 5 (t=0), returning [6, 5].'
  },
  {
    phase: 'UNFOLLOW',
    title: '5. User 1 Unfollows User 2: getNewsFeed(1) Returns [5]',
    arr: [5],
    auxiliaryTrack: ['User 1 (t=0)'],
    auxiliaryLabel: 'Author & Timestamp',
    activeIndices: [0],
    customCard: {
      title: 'Action: unfollow(1, 2)',
      rows: [
        { label: 'Relationship Removed', value: 'User 1 unfollows User 2', accent: true },
        { label: 'Updated Following Set', value: '{ User 1 }' },
        { label: 'Refetched News Feed', value: '[5] (Tweet 6 excluded)', accent: true },
        { label: 'Max Feed Capacity', value: 'Up to 10 most recent tweets' }
      ]
    },
    variables: {
      action: 'unfollow(1, 2)',
      followingSet: '{ 1 }',
      feedResult: '[5]'
    },
    explanation: 'User 1 unfollows User 2. Calling getNewsFeed(1) now excludes User 2\'s tweets and returns only [5].'
  }
];
