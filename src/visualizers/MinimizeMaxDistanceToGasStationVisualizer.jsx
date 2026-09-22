import React from 'react';

export const meta = {
  title: 'Minimize Max Distance to Gas Station',
  category: 'Binary Search',
  difficulty: 'Hard',
  timeComplexity: 'O(N * log(MaxDist / 1e-6))',
  spaceComplexity: 'O(1)',
  description: 'Finds the minimum possible maximum distance between adjacent gas stations after adding K new stations, using high-precision floating point binary search on the answer space.'
};

export const solutions = {
  cpp: `// C++ Floating-Point Binary Search on Answer Space
// Time Complexity: O(N * log(len / 1e-6)) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
    int numberOfGasStationsRequired(double dist, const vector<int>& stations) {
        int count = 0;
        for (size_t i = 1; i < stations.size(); i++) {
            int numberInBetween = (stations[i] - stations[i - 1]) / dist;
            if ((stations[i] - stations[i - 1]) == (numberInBetween * dist)) {
                numberInBetween--;
            }
            count += numberInBetween;
        }
        return count;
    }

public:
    double findSmallestMaxDist(vector<int>& stations, int k) {
        int n = stations.size();
        double low = 0;
        double high = 0;

        for (int i = 0; i < n - 1; i++) {
            high = max(high, (double)(stations[i + 1] - stations[i]));
        }

        double diff = 1e-6;
        while (high - low > diff) {
            double mid = low + (high - low) / 2.0;
            int count = numberOfGasStationsRequired(mid, stations);

            if (count > k) {
                low = mid;  // Max distance too small, requires too many stations
            } else {
                high = mid; // Can achieve max distance <= mid with <= k stations
            }
        }
        return high;
    }
};`,
  python: `# Python 3 Floating-Point Binary Search on Answer
class Solution:
    def findSmallestMaxDist(self, stations: list[int], k: int) -> float:
        def stations_needed(dist):
            count = 0
            for i in range(1, len(stations)):
                gap = stations[i] - stations[i - 1]
                num = int(gap / dist)
                if gap == num * dist:
                    num -= 1
                count += num
            return count

        low = 0.0
        high = max(stations[i + 1] - stations[i] for i in range(len(stations) - 1))

        diff = 1e-6
        while high - low > diff:
            mid = (low + high) / 2.0
            if stations_needed(mid) > k:
                low = mid
            else:
                high = mid

        return round(high, 6)`,
  java: `// Java Floating-Point Binary Search on Answer
class Solution {
    private int numberOfGasStationsRequired(double dist, int[] stations) {
        int count = 0;
        for (int i = 1; i < stations.length; i++) {
            int num = (int)((stations[i] - stations[i - 1]) / dist);
            if ((stations[i] - stations[i - 1]) == (num * dist)) {
                num--;
            }
            count += num;
        }
        return count;
    }

    public double findSmallestMaxDist(int[] stations, int k) {
        double low = 0;
        double high = 0;
        for (int i = 0; i < stations.length - 1; i++) {
            high = Math.max(high, stations[i + 1] - stations[i]);
        }

        double diff = 1e-6;
        while (high - low > diff) {
            double mid = low + (high - low) / 2.0;
            int count = numberOfGasStationsRequired(mid, stations);

            if (count > k) {
                low = mid;
            } else {
                high = mid;
            }
        }
        return high;
    }
}`,
  javascript: `// JavaScript Floating-Point Binary Search on Answer
var findSmallestMaxDist = function(stations, k) {
    const stationsNeeded = (dist) => {
        let count = 0;
        for (let i = 1; i < stations.length; i++) {
            const gap = stations[i] - stations[i - 1];
            let num = Math.floor(gap / dist);
            if (gap === num * dist) num--;
            count += num;
        }
        return count;
    };

    let low = 0;
    let high = 0;
    for (let i = 0; i < stations.length - 1; i++) {
        high = Math.max(high, stations[i + 1] - stations[i]);
    }

    const diff = 1e-6;
    while (high - low > diff) {
        const mid = (low + high) / 2.0;
        if (stationsNeeded(mid) > k) {
            low = mid;
        } else {
            high = mid;
        }
    }
    return high;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: Stations at [1, 13, 17, 23], Additional K = 5 Stations',
    phase: 'INITIAL',
    codeLine: 23,
    stations: [1, 13, 17, 23],
    gaps: [12, 4, 6],
    k: 5,
    low: 0.0,
    high: 12.0,
    mid: null,
    needed: null,
    variables: { stations: '[1, 13, 17, 23]', 'initial gaps': '[12, 4, 6]', k: 5, maxGap: 12.0 },
    explain: 'Adjacent gaps are 12 (1->13), 4 (13->17), and 6 (17->23). The maximum gap is 12.0. We want to place at most K=5 stations to minimize the maximum gap.',
    intuition: 'If we test a max distance dist: each gap requires floor(gap / dist) new stations. Smaller dist requires more stations.'
  },
  {
    title: '2. Iteration 1: Test dist = 6.00',
    phase: 'EVALUATE_DIST',
    codeLine: 34,
    stations: [1, 13, 17, 23],
    gaps: [12, 4, 6],
    k: 5,
    low: 0.0,
    high: 12.0,
    mid: 6.0,
    needed: 1,
    perGap: [1, 0, 0],
    variables: { mid: '6.00', gap12: '1 station (cuts to 6, 6)', gap4: '0 stations', gap6: '0 stations', totalNeeded: 1, allowedK: 5 },
    explain: 'Gap 12 needs 1 station. Total stations needed = 1 <= 5. We can achieve a much tighter maximum distance! Set high = 6.0.',
    intuition: 'Since needed (1) <= K (5), 6.0 is feasible. Try smaller.'
  },
  {
    title: '3. Iteration 2: Test dist = 3.00',
    phase: 'EVALUATE_DIST',
    codeLine: 34,
    stations: [1, 13, 17, 23],
    gaps: [12, 4, 6],
    k: 5,
    low: 0.0,
    high: 6.0,
    mid: 3.0,
    needed: 5,
    perGap: [3, 1, 1],
    variables: { mid: '3.00', gap12: '3 stations', gap4: '1 station', gap6: '1 station', totalNeeded: 5, allowedK: 5 },
    explain: 'Gap 12 needs 3 stations (len 3 each). Gap 4 needs 1 station. Gap 6 needs 1 station. Total needed = 5 <= 5! Feasible!',
    intuition: 'Exactly 5 stations needed. Can we go even lower? Set high = 3.0.'
  },
  {
    title: '4. Iteration 3: Test dist = 1.50',
    phase: 'EVALUATE_DIST',
    codeLine: 36,
    stations: [1, 13, 17, 23],
    gaps: [12, 4, 6],
    k: 5,
    low: 0.0,
    high: 3.0,
    mid: 1.5,
    needed: 11,
    perGap: [7, 2, 3],
    variables: { mid: '1.50', totalNeeded: 11, allowedK: 5, feasible: 'NO (11 > 5)' },
    explain: 'At distance 1.50, we would need 11 stations, but we only have 5. Too small! Set low = 1.50.',
    intuition: 'Overshot below the achievable threshold. Increase lower bound.'
  },
  {
    title: '5. Convergence: Optimal Max Distance = 2.40',
    phase: 'CONVERGENCE',
    codeLine: 41,
    stations: [1, 13, 17, 23],
    gaps: [12, 4, 6],
    k: 5,
    low: 2.399999,
    high: 2.400001,
    mid: 2.4,
    needed: 5,
    perGap: [4, 0, 1],
    variables: { optimalDist: '2.400000', stationsPlaced: 5, precision: '1e-6 met' },
    explain: 'Binary search converges where high - low <= 1e-6. Maximum distance between any two adjacent stations is minimized to 2.40.',
    intuition: 'Continuous floating point BS guarantees high precision without needing priority queue simulations.'
  }
];

export default function MinimizeMaxDistanceToGasStationVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          K = {step.k} Additional Stations
        </span>
        {step.mid !== null && (
          <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold">
            Testing Dist = {typeof step.mid === 'number' ? step.mid.toFixed(2) : step.mid}
          </span>
        )}
        {step.needed !== null && (
          <span className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold ${
            step.needed <= step.k ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
          }`}>
            Stations Needed: {step.needed} / {step.k} {step.needed <= step.k ? '(Feasible)' : '(Too Many)'}
          </span>
        )}
      </div>

      {/* Segment Highway Visualizer */}
      <div className="w-full p-5 rounded-2xl bg-[var(--board-raised-2)] border border-[var(--line)] flex flex-col gap-4">
        <span className="text-xs font-mono text-[var(--chalk-dim)]">Highway Segments & Station Placements:</span>
        <div className="w-full flex items-center justify-between gap-2 overflow-x-auto py-2">
          {step.stations.map((pos, idx) => {
            const nextPos = step.stations[idx + 1];
            const gap = nextPos ? nextPos - pos : null;
            const added = step.perGap ? step.perGap[idx] : 0;

            return (
              <React.Fragment key={idx}>
                {/* Station Node */}
                <div className="flex flex-col items-center gap-1 min-w-[50px]">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-300 flex items-center justify-center font-mono font-bold text-sm">
                    {pos}
                  </div>
                  <span className="text-[10px] text-[var(--chalk-dim)] font-mono">km</span>
                </div>

                {/* Gap Segment */}
                {gap !== null && (
                  <div className="flex-1 flex flex-col items-center justify-center px-2 min-w-[120px]">
                    <div className="text-[11px] font-mono text-amber-300 flex items-center gap-1">
                      <span>Gap: {gap}</span>
                      {added > 0 && <span className="text-emerald-400 font-bold">(+{added} stations)</span>}
                    </div>
                    <div className="w-full h-1 bg-[#272b3c] my-1 relative flex items-center justify-center">
                      <div className="absolute inset-0 bg-blue-500/30 rounded" />
                      {added > 0 && (
                        <div className="flex items-center gap-1 z-10">
                          {Array.from({ length: Math.min(added, 5) }).map((_, i) => (
                            <span key={i} className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Floating Point Range */}
      <div className="w-full p-4 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] flex items-center justify-around font-mono text-sm">
        <div className="flex items-center gap-2">
          <span className="text-[var(--chalk-dim)]">Low:</span>
          <span className="text-blue-400 font-bold">{step.low.toFixed(4)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[var(--chalk-dim)]">High:</span>
          <span className="text-purple-400 font-bold">{step.high.toFixed(4)}</span>
        </div>
      </div>

      {/* Final Result Card */}
      {step.phase === 'CONVERGENCE' && (
        <div className="w-full p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center gap-3 text-emerald-300 font-mono text-base font-bold">
          <span>🎯 Minimized Maximum Distance = 2.4000</span>
        </div>
      )}
    </div>
  );
}
