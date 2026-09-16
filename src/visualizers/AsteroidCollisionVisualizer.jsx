import React from 'react';

export const meta = {
  title: 'Asteroid Collision',
  category: 'Stack Simulation',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Simulates the collision of bidirectional asteroids using a stack where right-moving positive asteroids smash into incoming left-moving negative asteroids.'
};

export const solutions = {
  cpp: `// C++ Asteroid Collision
// Time Complexity: O(N) | Space Complexity: O(N)
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> asteroidCollision(vector<int>& asteroids) {
        vector<int> st;

        for (int a : asteroids) {
            bool alive = true;

            // Collision only happens when top is moving right (+) and incoming is moving left (-)
            while (alive && !st.empty() && st.back() > 0 && a < 0) {
                if (st.back() < -a) {
                    st.pop_back(); // Top asteroid explodes, incoming continues
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
  python: `# Python 3 Asteroid Collision
class Solution:
    def asteroidCollision(self, asteroids: list[int]) -> list[int]:
        stack = []

        for a in asteroids:
            alive = True

            while alive and stack and stack[-1] > 0 and a < 0:
                if stack[-1] < -a:
                    stack.pop()
                elif stack[-1] == -a:
                    stack.pop()
                    alive = False
                else:
                    alive = False

            if alive:
                stack.append(a)

        return stack`,
  java: `// Java Asteroid Collision
import java.util.Stack;

class Solution {
    public int[] asteroidCollision(int[] asteroids) {
        Stack<Integer> st = new Stack<>();

        for (int a : asteroids) {
            boolean alive = true;

            while (alive && !st.isEmpty() && st.peek() > 0 && a < 0) {
                if (st.peek() < -a) {
                    st.pop();
                } else if (st.peek() == -a) {
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

        int[] result = new int[st.size()];
        for (int i = result.length - 1; i >= 0; i--) {
            result[i] = st.pop();
        }
        return result;
    }
}`,
  javascript: `// JavaScript Asteroid Collision
var asteroidCollision = function(asteroids) {
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
};`
};

export const steps = [
  {
    title: '1. Asteroids: [5, 10, -5], Stack = []',
    phase: 'INITIAL',
    codeLine: 10,
    asteroids: [5, 10, -5],
    currIdx: -1,
    stack: [],
    event: 'Ready for incoming asteroids',
    variables: { incoming: 'None', stack: '[]' },
    explain: 'Positive (+) asteroids move right; negative (-) asteroids move left. Collisions only occur when (+) meets incoming (-).',
    intuition: 'LIFO stack models rightmost asteroid meeting incoming leftward asteroid.'
  },
  {
    title: '2. Process 5: Moving right (+) -> Push to stack [5]',
    phase: 'PUSH',
    codeLine: 26,
    asteroids: [5, 10, -5],
    currIdx: 0,
    stack: [5],
    event: 'Pushed +5 (moving right)',
    variables: { incoming: 5, stack: '[5]' },
    explain: '5 is positive. No collision possible. Pushed to stack.',
    intuition: 'Rightward asteroid placed.'
  },
  {
    title: '3. Process 10: Moving right (+) -> Push to stack [5, 10]',
    phase: 'PUSH',
    codeLine: 26,
    asteroids: [5, 10, -5],
    currIdx: 1,
    stack: [5, 10],
    event: 'Pushed +10 (moving right)',
    variables: { incoming: 10, stack: '[5, 10]' },
    explain: '10 is also moving right. No collision with 5. Pushed to stack.',
    intuition: 'Moving in parallel.'
  },
  {
    title: '4. Process -5: Moving left (-) -> Collides with top +10! |10| > |-5| -> Incoming -5 explodes!',
    phase: 'COLLISION',
    codeLine: 21,
    asteroids: [5, 10, -5],
    currIdx: 2,
    stack: [5, 10],
    event: '💥 Collision: 10 destroys -5',
    variables: { incoming: -5, top: 10, result: '-5 explodes, 10 survives' },
    explain: 'Incoming -5 collides with +10. Since 10 > |-5|=5, the smaller asteroid (-5) explodes. +10 survives on stack.',
    intuition: 'Larger asteroid withstands impact.'
  },
  {
    title: '5. Completed: Surviving Asteroids = [5, 10]',
    phase: 'COMPLETED',
    codeLine: 30,
    asteroids: [5, 10, -5],
    currIdx: 2,
    stack: [5, 10],
    event: 'All collisions resolved',
    variables: { surviving: '[5, 10]', timeComplexity: 'O(N)', spaceComplexity: 'O(N)' },
    explain: 'Final surviving asteroids are [5, 10].',
    intuition: 'Stack simulation complete.'
  }
];

export default function AsteroidCollisionVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Status: {step.event}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Surviving Count = {step.stack.length}
        </span>
      </div>

      {/* Asteroids Stream */}
      <div className="w-full flex items-center justify-center gap-3 py-3 overflow-x-auto">
        {step.asteroids.map((val, idx) => {
          const isCurrent = idx === step.currIdx;
          const isMovingRight = val > 0;

          return (
            <div key={idx} className="flex flex-col items-center gap-1 min-w-[50px]">
              <div
                className={`w-13 h-14 rounded-2xl border flex flex-col items-center justify-center font-mono font-bold text-sm transition-all ${
                  isCurrent
                    ? 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40 shadow-lg'
                    : 'border-[#272b3c] bg-[#12131b] text-slate-200'
                }`}
              >
                <span>{val}</span>
                <span className="text-[10px]">{isMovingRight ? '→' : '←'}</span>
              </div>
              <span className="text-[8px] font-mono text-[#5b6076]">ast[{idx}]</span>
            </div>
          );
        })}
      </div>

      {/* Stack State Container */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-xl p-4 flex flex-col items-center gap-2 text-xs font-mono">
        <span className="text-[11px] text-indigo-400 font-semibold uppercase tracking-wider">
          Active Asteroid Stack:
        </span>
        <div className="flex items-center gap-2">
          {step.stack.length === 0 ? (
            <span className="text-slate-500 italic">Empty Stack</span>
          ) : (
            step.stack.map((ast, idx) => (
              <div
                key={idx}
                className="px-3.5 py-2 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-200 font-bold text-sm flex items-center gap-1 shadow-md"
              >
                <span>🪨</span>
                <span>{ast}</span>
                <span className="text-xs">{ast > 0 ? '→' : '←'}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
