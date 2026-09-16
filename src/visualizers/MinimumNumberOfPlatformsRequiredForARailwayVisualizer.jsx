import React from 'react';

export const meta = {
  title: 'Minimum Platforms for Railway Station',
  category: 'Greedy Algorithms',
  difficulty: 'Medium',
  timeComplexity: 'O(N log N)',
  spaceComplexity: 'O(1) auxiliary',
  description: 'Calculates the minimum number of railway platforms needed so that no arriving train is made to wait, using two-pointer chronological sweep.'
};

export const solutions = {
  cpp: `// C++ Minimum Platforms (Two-Pointer Greedy)
// Time: O(N log N) | Space: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int findPlatform(int arr[], int dep[], int n) {
        // Sort arrival and departure arrays independently
        sort(arr, arr + n);
        sort(dep, dep + n);

        int platforms_needed = 1;
        int max_platforms = 1;

        int i = 1; // pointer for arrivals
        int j = 0; // pointer for departures

        while (i < n && j < n) {
            // If next train arrives before or when earliest train departs
            if (arr[i] <= dep[j]) {
                platforms_needed++;
                i++;
            } else { // Train departs, releasing a platform
                platforms_needed--;
                j++;
            }
            max_platforms = max(max_platforms, platforms_needed);
        }

        return max_platforms;
    }
};`,
  python: `# Python 3 Minimum Platforms (Two-Pointer)
class Solution:
    def findPlatform(self, arr: list[int], dep: list[int], n: int) -> int:
        arr.sort()
        dep.sort()

        platforms_needed = 1
        max_platforms = 1

        i = 1
        j = 0

        while i < n and j < n:
            if arr[i] <= dep[j]:
                platforms_needed += 1
                i += 1
            else:
                platforms_needed -= 1
                j += 1
            max_platforms = max(max_platforms, platforms_needed)

        return max_platforms`,
  java: `// Java Minimum Platforms (Two-Pointer)
import java.util.Arrays;

class Solution {
    static int findPlatform(int arr[], int dep[], int n) {
        Arrays.sort(arr);
        Arrays.sort(dep);

        int platformsNeeded = 1;
        int maxPlatforms = 1;

        int i = 1, j = 0;

        while (i < n && j < n) {
            if (arr[i] <= dep[j]) {
                platformsNeeded++;
                i++;
            } else {
                platformsNeeded--;
                j++;
            }
            maxPlatforms = Math.max(maxPlatforms, platformsNeeded);
        }

        return maxPlatforms;
    }
}`,
  javascript: `// JavaScript Minimum Platforms (Two-Pointer)
function findPlatform(arr, dep, n) {
    arr.sort((a, b) => a - b);
    dep.sort((a, b) => a - b);

    let platformsNeeded = 1;
    let maxPlatforms = 1;
    let i = 1, j = 0;

    while (i < n && j < n) {
        if (arr[i] <= dep[j]) {
            platformsNeeded++;
            i++;
        } else {
            platformsNeeded--;
            j++;
        }
        maxPlatforms = Math.max(maxPlatforms, platformsNeeded);
    }

    return maxPlatforms;
}`
};

export const steps = [
  {
    title: '1. Sorted Arrivals: [900, 940, 950, 1100], Departures: [910, 1120, 1130, 1200]',
    phase: 'INITIAL',
    codeLine: 12,
    arr: [900, 940, 950, 1100],
    dep: [910, 1120, 1130, 1200],
    i: 1,
    j: 0,
    currentPlat: 1,
    maxPlat: 1,
    event: 'Train 0 arrived at 900, occupies platform 1',
    variables: { i: 1, j: 0, platformsNeeded: 1, maxPlatforms: 1 },
    explain: 'Start after first train has arrived at 900. Station currently requires 1 platform.',
    intuition: 'Sort both arrays independently: we only care about chronology of arrivals vs departures.'
  },
  {
    title: '2. Compare arr[1]=940 vs dep[0]=910: 940 > 910 -> Train departs first!',
    phase: 'DEPARTURE',
    codeLine: 26,
    arr: [900, 940, 950, 1100],
    dep: [910, 1120, 1130, 1200],
    i: 1,
    j: 1,
    currentPlat: 0,
    maxPlat: 1,
    event: 'Departure at 910 freed up platform (needed = 0)',
    variables: { departureAt: 910, platformsNeeded: 0, j: 1 },
    explain: 'Train at dep[0] departed at 910 before next arrival at 940. Platform is released. j advances to 1.',
    intuition: 'A departure frees a platform.'
  },
  {
    title: '3. Compare arr[1]=940 vs dep[1]=1120: 940 <= 1120 -> Train arrives!',
    phase: 'ARRIVAL',
    codeLine: 22,
    arr: [900, 940, 950, 1100],
    dep: [910, 1120, 1130, 1200],
    i: 2,
    j: 1,
    currentPlat: 1,
    maxPlat: 1,
    event: 'Train arrives at 940 (needed = 1)',
    variables: { arrivalAt: 940, platformsNeeded: 1, i: 2 },
    explain: 'Train arrives at 940. It takes the available platform. platformsNeeded = 1.',
    intuition: 'Arrival increases platform count.'
  },
  {
    title: '4. Compare arr[2]=950 vs dep[1]=1120: 950 <= 1120 -> Another train arrives!',
    phase: 'PEAK_ARRIVAL',
    codeLine: 22,
    arr: [900, 940, 950, 1100],
    dep: [910, 1120, 1130, 1200],
    i: 3,
    j: 1,
    currentPlat: 2,
    maxPlat: 2,
    event: 'Train arrives at 950 (needed = 2, PEAK = 2)',
    variables: { arrivalAt: 950, platformsNeeded: 2, maxPlatforms: 2, i: 3 },
    explain: 'Train arrives at 950 while train that arrived at 940 is still parked (departs 1120). 2 platforms required simultaneously!',
    intuition: 'Peak concurrent trains at station reached 2.'
  },
  {
    title: '5. Compare arr[3]=1100 vs dep[1]=1120: 1100 <= 1120 -> 3rd simultaneous train!',
    phase: 'MAX_PEAK',
    codeLine: 22,
    arr: [900, 940, 950, 1100],
    dep: [910, 1120, 1130, 1200],
    i: 4,
    j: 1,
    currentPlat: 3,
    maxPlat: 3,
    event: 'Train arrives at 1100 (needed = 3, MAX PEAK = 3)',
    variables: { arrivalAt: 1100, platformsNeeded: 3, maxPlatforms: 3, allArrivalsDone: true },
    explain: 'Third train arrives at 1100 before any more departures. 3 platforms are simultaneously occupied.',
    intuition: 'Peak concurrency determines station capacity.'
  },
  {
    title: '6. All arrivals processed: Station requires Minimum 3 Platforms',
    phase: 'COMPLETED',
    codeLine: 31,
    arr: [900, 940, 950, 1100],
    dep: [910, 1120, 1130, 1200],
    i: 4,
    j: 1,
    currentPlat: 3,
    maxPlat: 3,
    event: 'Completed! Station capacity = 3 platforms',
    variables: { minPlatforms: 3, timeComplexity: 'O(N log N)', spaceComplexity: 'O(1)' },
    explain: 'All arrivals handled. Peak platforms needed at any single moment was 3.',
    intuition: 'Two-pointer sweep line guarantees optimal minimum platform sizing.'
  }
];

export default function MinimumNumberOfPlatformsRequiredForARailwayVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Active In-Station: {step.currentPlat}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Max Platforms Needed = {step.maxPlat}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          {step.event}
        </span>
      </div>

      {/* Station Platform Tracks */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-5 flex flex-col gap-4">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider text-center">Railway Platforms Occupancy</span>

        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((platNum) => {
            const isOccupied = platNum <= step.currentPlat;
            let borderClass = 'border-[#272b3c] bg-[#161824] text-slate-500';
            if (isOccupied) {
              borderClass = 'border-amber-500 bg-amber-500/20 text-amber-300 ring-2 ring-amber-500/30 shadow-lg';
            }

            return (
              <div key={platNum} className={`h-24 rounded-xl border flex flex-col items-center justify-center font-mono transition-all ${borderClass}`}>
                <span className="text-2xl">{isOccupied ? '🚆' : '🛤️'}</span>
                <span className="text-xs font-bold mt-1">Platform {platNum}</span>
                <span className="text-[10px] text-slate-400">{isOccupied ? 'Occupied' : 'Vacant'}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Arrival & Departure Pointers */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-4 flex flex-col gap-3 font-mono text-xs">
        <div className="flex items-center justify-between">
          <span className="text-emerald-400 font-semibold">Sorted Arrivals:</span>
          <div className="flex items-center gap-2">
            {step.arr.map((time, idx) => (
              <span key={idx} className={`px-2 py-0.5 rounded border ${idx === step.i ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold' : 'border-[#272b3c] bg-[#161824] text-slate-400'}`}>
                {time}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-blue-400 font-semibold">Sorted Departures:</span>
          <div className="flex items-center gap-2">
            {step.dep.map((time, idx) => (
              <span key={idx} className={`px-2 py-0.5 rounded border ${idx === step.j ? 'border-blue-500 bg-blue-500/20 text-blue-300 font-bold' : 'border-[#272b3c] bg-[#161824] text-slate-400'}`}>
                {time}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}
