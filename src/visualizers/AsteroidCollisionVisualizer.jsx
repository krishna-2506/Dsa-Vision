export const rendererType = 'stack';

export const meta = {
  title: 'Asteroid Collision',
  category: 'Stack Simulation',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Simulates the collision of bidirectional asteroids using a stack where right-moving positive asteroids smash into incoming left-moving negative asteroids.'
};

export const ideaMap = [
  {
    id: 'collision-condition',
    title: 'Directional Collision Condition',
    description: 'A collision happens if and only if the top of the stack is moving right (top > 0) and the incoming asteroid is moving left (incoming < 0).'
  },
  {
    id: 'stack-simulation',
    title: 'LIFO Collision Resolution',
    description: 'When collision occurs, compare absolute weights: smaller explodes; equal sizes both explode; larger survives and continues colliding.'
  },
  {
    id: 'left-moving-stability',
    title: 'Left-Moving Safety',
    description: 'If a negative asteroid finds no positive asteroids to its left (stack empty or stack top < 0), it will never collide and safely enters the stack.'
  },
  {
    id: 'right-moving-stability',
    title: 'Right-Moving Addition',
    description: 'Any positive asteroid is pushed directly onto the stack because it moves right away from preceding asteroids.'
  },
  {
    id: 'linear-amortization',
    title: 'Amortized Complexity Proof',
    description: 'Each asteroid is pushed onto the stack at most once and destroyed at most once, providing guaranteed O(N) linear time.'
  }
];

export const solutions = {
  cpp: `// C++: Asteroid Collision using Vector Stack
// Time Complexity: O(N) | Space Complexity: O(N)
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> asteroidCollision(vector<int>& asteroids) {
        vector<int> st;

        for (int a : asteroids) {
            bool alive = true;

            while (alive && !st.empty() && st.back() > 0 && a < 0) {
                if (st.back() < -a) {
                    st.pop_back(); // Stack top explodes, incoming continues
                } else if (st.back() == -a) {
                    st.pop_back(); // Both explode
                    alive = false;
                } else {
                    alive = false; // Incoming explodes
                }
            }

            if (alive) {
                st.push_back(a);
            }
        }
        return st;
    }
};`,
  java: `// Java: Asteroid Collision using ArrayDeque / Stack
import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public int[] asteroidCollision(int[] asteroids) {
        Deque<Integer> st = new ArrayDeque<>();

        for (int a : asteroids) {
            boolean alive = true;

            while (alive && !st.isEmpty() && st.peekLast() > 0 && a < 0) {
                if (st.peekLast() < -a) {
                    st.pollLast();
                } else if (st.peekLast() == -a) {
                    st.pollLast();
                    alive = false;
                } else {
                    alive = false;
                }
            }

            if (alive) {
                st.addLast(a);
            }
        }

        int[] res = new int[st.size()];
        int idx = 0;
        for (int x : st) res[idx++] = x;
        return res;
    }
}`,
  python: `# Python 3: Asteroid Collision using List Stack
class Solution:
    def asteroidCollision(self, asteroids: list[int]) -> list[int]:
        st = []

        for a in asteroids:
            alive = True
            while alive and st and st[-1] > 0 and a < 0:
                if st[-1] < -a:
                    st.pop()
                elif st[-1] == -a:
                    st.pop()
                    alive = False
                else:
                    alive = False

            if alive:
                st.append(a)

        return st`,
  javascript: `// JavaScript: Asteroid Collision using Array Stack
function asteroidCollision(asteroids) {
    const st = [];

    for (const a of asteroids) {
        let alive = true;

        while (alive && st.length > 0 && st[st.length - 1] > 0 && a < 0) {
            const top = st[st.length - 1];
            if (top < -a) {
                st.pop();
            } else if (top === -a) {
                st.pop();
                alive = false;
            } else {
                alive = false;
            }
        }

        if (alive) {
            st.push(a);
        }
    }

    return st;
}`
};

export const steps = [
  {
    stepIndex: 1,
    title: 'Initialize Empty Asteroid Simulation Stack',
    explanation: 'Prepare input array asteroids = [5, 10, -5, -10, 8, -8, 6, 2]. Positive values move right (+), negative move left (-).',
    activeLine: 9,
    activeIdeaId: 'collision-condition',
    track: [5, 10, -5, -10, 8, -8, 6, 2],
    auxiliaryTrack: [],
    highlightIndices: [0],
    pointers: { i: 0 },
    variables: { incoming: 5, stackSize: 0, alive: true },
    customCard: {
      title: 'Simulation Stack',
      rows: [
        { label: 'Incoming Asteroid', value: '+5 (moving right)' },
        { label: 'Stack Top', value: 'Empty' },
        { label: 'Action', value: 'Push +5 onto stack' }
      ]
    }
  },
  {
    stepIndex: 2,
    title: 'Push +5 and +10: Moving in Same Direction',
    explanation: 'Asteroid 5 is pushed. Next asteroid +10 is moving right. Because top > 0 and incoming > 0, they never collide. Push +10.',
    activeLine: 24,
    activeIdeaId: 'right-moving-stability',
    track: [5, 10, -5, -10, 8, -8, 6, 2],
    auxiliaryTrack: [5, 10],
    highlightIndices: [1],
    pointers: { i: 1 },
    variables: { incoming: 10, stackSize: 2, alive: true },
    customCard: {
      title: 'Parallel Motion',
      rows: [
        { label: 'Stack State', value: '[5, 10]' },
        { label: 'Incoming Asteroid', value: '+10 (moving right)' },
        { label: 'Collision Check', value: 'None (same direction)' }
      ]
    }
  },
  {
    stepIndex: 3,
    title: 'Incoming -5 vs Top +10: Collision, -5 Explodes',
    explanation: 'Incoming is -5 (left). Stack top is +10 (right). Collision occurs! Since |+10| > |-5|, incoming -5 explodes and +10 survives intact.',
    activeLine: 18,
    activeIdeaId: 'stack-simulation',
    track: [5, 10, -5, -10, 8, -8, 6, 2],
    auxiliaryTrack: [5, 10],
    highlightIndices: [2],
    pointers: { i: 2 },
    variables: { incoming: -5, top: 10, alive: false },
    customCard: {
      title: 'Collision Encounter #1',
      rows: [
        { label: 'Contenders', value: 'Top (+10) vs Incoming (-5)' },
        { label: 'Comparison', value: '10 > 5 -> Top wins' },
        { label: 'Outcome', value: 'Incoming -5 destroyed; +10 preserved' }
      ]
    }
  },
  {
    stepIndex: 4,
    title: 'Incoming -10 vs Top +10: Mutual Annihilation',
    explanation: 'Incoming is -10 (left). Stack top is +10 (right). Collision occurs! Since |+10| == |-10|, both asteroids explode. Pop +10; -10 is destroyed.',
    activeLine: 15,
    activeIdeaId: 'stack-simulation',
    track: [5, 10, -5, -10, 8, -8, 6, 2],
    auxiliaryTrack: [5],
    highlightIndices: [3],
    pointers: { i: 3 },
    variables: { incoming: -10, top: 10, alive: false },
    customCard: {
      title: 'Collision Encounter #2 (Tied Mass)',
      rows: [
        { label: 'Contenders', value: 'Top (+10) vs Incoming (-10)' },
        { label: 'Comparison', value: '10 == 10 -> Both explode' },
        { label: 'Remaining Stack', value: '[5]' }
      ]
    }
  },
  {
    stepIndex: 5,
    title: 'Push +8: Stable Forward Flight',
    explanation: 'Next asteroid is +8 (right). Stack top is +5. No collision possible. Push +8 onto the stack.',
    activeLine: 24,
    activeIdeaId: 'right-moving-stability',
    track: [5, 10, -5, -10, 8, -8, 6, 2],
    auxiliaryTrack: [5, 8],
    highlightIndices: [4],
    pointers: { i: 4 },
    variables: { incoming: 8, stackSize: 2, alive: true },
    customCard: {
      title: 'Stack State',
      rows: [
        { label: 'Stack Top', value: '+8' },
        { label: 'Stack Vector', value: '[5, 8]' },
        { label: 'Action', value: 'Pushed +8' }
      ]
    }
  },
  {
    stepIndex: 6,
    title: 'Incoming -8 vs Top +8: Mutual Annihilation',
    explanation: 'Incoming is -8 (left). Stack top is +8 (right). Collision! Since |+8| == |-8|, both explode. Pop +8; stack reverts to [5].',
    activeLine: 15,
    activeIdeaId: 'stack-simulation',
    track: [5, 10, -5, -10, 8, -8, 6, 2],
    auxiliaryTrack: [5],
    highlightIndices: [5],
    pointers: { i: 5 },
    variables: { incoming: -8, top: 8, alive: false },
    customCard: {
      title: 'Collision Encounter #3',
      rows: [
        { label: 'Contenders', value: 'Top (+8) vs Incoming (-8)' },
        { label: 'Comparison', value: '8 == 8 -> Both explode' },
        { label: 'Remaining Stack', value: '[5]' }
      ]
    }
  },
  {
    stepIndex: 7,
    title: 'Push +6 and +2: Final Right-Moving Wave',
    explanation: 'Process +6 (pushed) and +2 (pushed). Since all subsequent asteroids are moving right (+), no further collisions occur.',
    activeLine: 24,
    activeIdeaId: 'right-moving-stability',
    track: [5, 10, -5, -10, 8, -8, 6, 2],
    auxiliaryTrack: [5, 6, 2],
    highlightIndices: [6, 7],
    pointers: { i: 7 },
    variables: { incoming: 2, stackSize: 3, alive: true },
    customCard: {
      title: 'Final Trajectory Alignment',
      rows: [
        { label: 'Pushed Elements', value: '+6, then +2' },
        { label: 'Stack Vector', value: '[5, 6, 2]' },
        { label: 'Collision Risk', value: 'Zero (all moving right)' }
      ]
    }
  },
  {
    stepIndex: 8,
    title: 'Simulation Complete: Surviving Asteroids Returned',
    explanation: 'All asteroids processed in O(N) time. The final surviving asteroids traveling across the cosmos are [5, 6, 2].',
    activeLine: 28,
    activeIdeaId: 'linear-amortization',
    track: [5, 10, -5, -10, 8, -8, 6, 2],
    auxiliaryTrack: [5, 6, 2],
    highlightIndices: [],
    pointers: {},
    variables: { finalStack: '[5, 6, 2]', totalAsteroidsProcessed: 8 },
    customCard: {
      title: 'Final Surviving Asteroids',
      rows: [
        { label: 'Result Array', value: '[5, 6, 2]' },
        { label: 'Time Complexity', value: 'O(N) Amortized' },
        { label: 'Space Complexity', value: 'O(N) Stack' }
      ]
    }
  }
];
