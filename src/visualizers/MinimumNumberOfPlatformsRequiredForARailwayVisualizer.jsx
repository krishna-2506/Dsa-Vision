// DATA-ONLY — rendered by DualArrayRenderer via rendererType

export const meta = {
  title: 'Minimum Platforms for Railway Station',
  category: 'Greedy Algorithms',
  difficulty: 'Medium',
  timeComplexity: 'O(N log N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Calculates the minimum number of railway platforms required so that no arriving train is delayed, using independent timeline sorting and two-pointer chronological sweep.'
};

export const rendererType = 'dual-array';

export const ideaMap = {
  title: 'Independent Timeline Sorting & Sweep Invariant',
  nodes: [
    { id: 'root', label: 'Chronological Sweep Invariant', children: ['identity-decoupling', 'dual-timeline-sort', 'arrival-event', 'departure-event', 'complexity'] },
    { id: 'identity-decoupling', label: '1. Train Identity Decoupling', detail: 'At any point in time, only the net count of trains present at the station determines platform load; which specific train arrives or departs is irrelevant.' },
    { id: 'dual-timeline-sort', label: '2. Independent Timeline Sort', detail: 'Sort arrival times arr[] and departure times dep[] independently in non-decreasing order.' },
    { id: 'arrival-event', label: '3. Arrival Pointer Step', detail: 'If arr[i] <= dep[j], a train arrives before or during departure: platforms_needed++; max_platforms = max(max_platforms, platforms_needed); i++.' },
    { id: 'departure-event', label: '4. Departure Pointer Step', detail: 'If arr[i] > dep[j], a train departs, freeing up one platform: platforms_needed--; j++.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Sorting takes O(N log N), followed by a linear O(N) two-pointer sweep with strictly O(1) auxiliary space.' }
  ]
};

export const solutions = {
  cpp: `// C++ Minimum Platforms (Two-Pointer Greedy)
// Time Complexity: O(N log N) | Space Complexity: O(1)
#include <algorithm>
using namespace std;

class Solution {
public:
    int findPlatform(int arr[], int dep[], int n) {
        sort(arr, arr + n);
        sort(dep, dep + n);

        int platforms_needed = 1;
        int max_platforms = 1;

        int i = 1; // pointer for arrivals
        int j = 0; // pointer for departures

        while (i < n && j < n) {
            if (arr[i] <= dep[j]) {
                platforms_needed++;
                i++;
            } else {
                platforms_needed--;
                j++;
            }
            max_platforms = max(max_platforms, platforms_needed);
        }

        return max_platforms;
    }
};`,
  python: `# Python 3 Minimum Platforms (Two-Pointer Greedy)
# Time Complexity: O(N log N) | Space Complexity: O(1)
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
  java: `// Java Minimum Platforms (Two-Pointer Greedy)
// Time Complexity: O(N log N) | Space Complexity: O(1)
import java.util.Arrays;

class Solution {
    public int findPlatform(int[] arr, int[] dep, int n) {
        Arrays.sort(arr);
        Arrays.sort(dep);

        int platforms_needed = 1;
        int max_platforms = 1;

        int i = 1;
        int j = 0;

        while (i < n && j < n) {
            if (arr[i] <= dep[j]) {
                platforms_needed++;
                i++;
            } else {
                platforms_needed--;
                j++;
            }
            max_platforms = Math.max(max_platforms, platforms_needed);
        }

        return max_platforms;
    }
}`,
  javascript: `// JavaScript Minimum Platforms (Two-Pointer Greedy)
// Time Complexity: O(N log N) | Space Complexity: O(1)
var findPlatform = function(arr, dep, n) {
    arr.sort((a, b) => a - b);
    dep.sort((a, b) => a - b);

    let platforms_needed = 1;
    let max_platforms = 1;

    let i = 1;
    let j = 0;

    while (i < n && j < n) {
        if (arr[i] <= dep[j]) {
            platforms_needed++;
            i++;
        } else {
            platforms_needed--;
            j++;
        }
        max_platforms = Math.max(max_platforms, platforms_needed);
    }

    return max_platforms;
};`
};

export const steps = [
  {
    title: '1. Independent Timeline Sorting & Initial Setup',
    phase: 'INITIAL',
    codeLine: 12,
    tracks: [
      {
        label: 'Sorted Arrivals arr: [900, 940, 950, 1100, 1500, 1800]',
        items: [
          { val: '9:00', status: 'current' },
          { val: '9:40', status: 'default' },
          { val: '9:50', status: 'default' },
          { val: '11:00', status: 'default' },
          { val: '15:00', status: 'default' },
          { val: '18:00', status: 'default' }
        ]
      },
      {
        label: 'Sorted Departures dep: [910, 1120, 1130, 1200, 1900, 2000]',
        items: [
          { val: '9:10', status: 'default' },
          { val: '11:20', status: 'default' },
          { val: '11:30', status: 'default' },
          { val: '12:00', status: 'default' },
          { val: '19:00', status: 'default' },
          { val: '20:00', status: 'default' }
        ]
      }
    ],
    activeI: 1,
    activePrev: 0,
    metrics: [
      { label: 'Current Platforms', value: '1 (First train docked)' },
      { label: 'Peak Platforms', value: '1' },
      { label: 'Arrival Pointer i', value: '1 (9:40)' },
      { label: 'Departure Pointer j', value: '0 (9:10)' }
    ],
    formula: 'platforms = 1, max_platforms = 1; i = 1, j = 0;',
    action: 'First train arrives at 9:00, demanding 1 platform. Pointers initialize at i = 1 (arrivals) and j = 0 (departures).',
    explain: 'Because train arrivals and departures are sorted independently, comparing arr[i] with dep[j] simulates chronological event flow.',
    intuition: 'Train identities do not matter; only the total concurrent train count matters.'
  },
  {
    title: '2. Chronological Event: Departure at 9:10 Before Arrival at 9:40',
    phase: 'DEPARTURE',
    codeLine: 25,
    tracks: [
      {
        label: 'Sorted Arrivals arr (Waiting at 9:40)',
        items: [
          { val: '9:00', status: 'visited' },
          { val: '9:40', status: 'selected' },
          { val: '9:50', status: 'default' },
          { val: '11:00', status: 'default' },
          { val: '15:00', status: 'default' },
          { val: '18:00', status: 'default' }
        ]
      },
      {
        label: 'Sorted Departures dep (Train Leaves at 9:10)',
        items: [
          { val: '9:10', status: 'match' },
          { val: '11:20', status: 'default' },
          { val: '11:30', status: 'default' },
          { val: '12:00', status: 'default' },
          { val: '19:00', status: 'default' },
          { val: '20:00', status: 'default' }
        ]
      }
    ],
    activeI: 1,
    activePrev: 0,
    metrics: [
      { label: 'Event', value: 'Departure at 9:10 < 9:40', highlight: true },
      { label: 'Current Platforms', value: '0 (1 - 1)' },
      { label: 'Peak Platforms', value: '1' },
      { label: 'Next Departure', value: 'j = 1 (11:20)' }
    ],
    formula: 'arr[1] (940) > dep[0] (910) => platforms--; j++; // platforms: 1->0',
    action: 'Earlier departure at 9:10 frees a platform before the 9:40 arrival. platforms_needed drops to 0. j advances to 1.',
    explain: 'The station is temporarily empty between 9:10 and 9:40.',
    intuition: 'A departure frees a platform for reuse.'
  },
  {
    title: '3. Chronological Event: Train Arrives at 9:40 (<= 11:20)',
    phase: 'ARRIVAL',
    codeLine: 22,
    tracks: [
      {
        label: 'Sorted Arrivals arr',
        items: [
          { val: '9:00', status: 'visited' },
          { val: '9:40', status: 'current' },
          { val: '9:50', status: 'selected' },
          { val: '11:00', status: 'default' },
          { val: '15:00', status: 'default' },
          { val: '18:00', status: 'default' }
        ]
      },
      {
        label: 'Sorted Departures dep',
        items: [
          { val: '9:10', status: 'visited' },
          { val: '11:20', status: 'selected' },
          { val: '11:30', status: 'default' },
          { val: '12:00', status: 'default' },
          { val: '19:00', status: 'default' },
          { val: '20:00', status: 'default' }
        ]
      }
    ],
    activeI: 1,
    activePrev: 1,
    metrics: [
      { label: 'Event', value: 'Arrival at 9:40 <= 11:20' },
      { label: 'Current Platforms', value: '1 (0 + 1)' },
      { label: 'Peak Platforms', value: '1' },
      { label: 'Next Arrival', value: 'i = 2 (9:50)' }
    ],
    formula: 'arr[1] (940) <= dep[1] (1120) => platforms++; i++; // platforms: 0->1',
    action: 'Train arrives at 9:40. Since next departure is 11:20, train takes platform. platforms = 1. i = 2.',
    explain: 'Station now has 1 active train docked.',
    intuition: 'Arrival before next departure increases current occupancy.'
  },
  {
    title: '4. Chronological Event: Train Arrives at 9:50 -> Platforms = 2',
    phase: 'ARRIVAL',
    codeLine: 22,
    tracks: [
      {
        label: 'Sorted Arrivals arr (9:50 Arrives)',
        items: [
          { val: '9:00', status: 'visited' },
          { val: '9:40', status: 'visited' },
          { val: '9:50', status: 'current' },
          { val: '11:00', status: 'selected' },
          { val: '15:00', status: 'default' },
          { val: '18:00', status: 'default' }
        ]
      },
      {
        label: 'Sorted Departures dep (Earliest Departure 11:20)',
        items: [
          { val: '9:10', status: 'visited' },
          { val: '11:20', status: 'selected' },
          { val: '11:30', status: 'default' },
          { val: '12:00', status: 'default' },
          { val: '19:00', status: 'default' },
          { val: '20:00', status: 'default' }
        ]
      }
    ],
    activeI: 2,
    activePrev: 1,
    metrics: [
      { label: 'Event', value: 'Arrival at 9:50 <= 11:20' },
      { label: 'Current Platforms', value: '2 (1 + 1)', highlight: true },
      { label: 'Peak Platforms', value: '2', highlight: true },
      { label: 'Next Arrival', value: 'i = 3 (11:00)' }
    ],
    formula: 'arr[2] (950) <= dep[1] (1120) => platforms++; max_platforms = 2; i++;',
    action: 'Another train arrives at 9:50 before 11:20 departure. Requires second platform! platforms = 2. max = 2.',
    explain: 'Two trains are concurrently present: train from 9:40 and train from 9:50.',
    intuition: 'Overlap demands a second physical platform.'
  },
  {
    title: '5. Peak Occupancy: Train Arrives at 11:00 -> Platforms = 3!',
    phase: 'ARRIVAL',
    codeLine: 22,
    tracks: [
      {
        label: 'Sorted Arrivals arr (11:00 Arrives)',
        items: [
          { val: '9:00', status: 'visited' },
          { val: '9:40', status: 'visited' },
          { val: '9:50', status: 'visited' },
          { val: '11:00', status: 'match' },
          { val: '15:00', status: 'selected' },
          { val: '18:00', status: 'default' }
        ]
      },
      {
        label: 'Sorted Departures dep (Earliest Departure 11:20)',
        items: [
          { val: '9:10', status: 'visited' },
          { val: '11:20', status: 'selected' },
          { val: '11:30', status: 'default' },
          { val: '12:00', status: 'default' },
          { val: '19:00', status: 'default' },
          { val: '20:00', status: 'default' }
        ]
      }
    ],
    activeI: 3,
    activePrev: 1,
    metrics: [
      { label: 'Event', value: 'Arrival at 11:00 <= 11:20' },
      { label: 'Current Platforms', value: '3 (Peak!)', highlight: true },
      { label: 'Peak Platforms', value: '3', highlight: true },
      { label: 'Trains at Station', value: '3 trains simultaneously' }
    ],
    formula: 'arr[3] (1100) <= dep[1] (1120) => platforms++; max = max(2, 3) = 3;',
    action: 'Third train arrives at 11:00 before any departure. Requires a third platform! platforms = 3. max = 3.',
    explain: 'At 11:00, three trains are docked at the station simultaneously (arrived at 9:40, 9:50, and 11:00). All depart at or after 11:20.',
    intuition: 'The maximum simultaneous overlap is 3 trains.',
    customCard: {
      title: 'Peak Platform Demand Analysis',
      rows: [
        { label: 'Trains Present', value: '3 (Arrived 9:40, 9:50, 11:00)', accent: true },
        { label: 'Earliest Freeing Time', value: '11:20 (Departure 1)' },
        { label: 'Required Platforms', value: '3 platforms', accent: true }
      ]
    }
  },
  {
    title: '6. Departures Wave: 11:20, 11:30, and 12:00 Departures',
    phase: 'DEPARTURE',
    codeLine: 25,
    tracks: [
      {
        label: 'Sorted Arrivals arr (Waiting at 15:00)',
        items: [
          { val: '9:00', status: 'visited' },
          { val: '9:40', status: 'visited' },
          { val: '9:50', status: 'visited' },
          { val: '11:00', status: 'visited' },
          { val: '15:00', status: 'selected' },
          { val: '18:00', status: 'default' }
        ]
      },
      {
        label: 'Sorted Departures dep (3 Trains Depart Before 15:00)',
        items: [
          { val: '9:10', status: 'visited' },
          { val: '11:20', status: 'match' },
          { val: '11:30', status: 'match' },
          { val: '12:00', status: 'match' },
          { val: '19:00', status: 'default' },
          { val: '20:00', status: 'default' }
        ]
      }
    ],
    activeI: 4,
    activePrev: 3,
    metrics: [
      { label: 'Departures Processed', value: '11:20, 11:30, 12:00' },
      { label: 'Current Platforms', value: '0 (All 3 departed)' },
      { label: 'Peak Platforms', value: '3 (Retained)' },
      { label: 'j Pointer', value: 'j = 4 (19:00)' }
    ],
    formula: 'platforms = 3 - 3 = 0; j = 4; max_platforms = 3;',
    action: 'All 3 trains depart at 11:20, 11:30, and 12:00 before the next arrival at 15:00. platforms drops to 0.',
    explain: 'Platforms are released, but the historical peak of 3 remains recorded in max_platforms.',
    intuition: 'Temporary drops in demand do not lower the peak capacity required.'
  },
  {
    title: '7. Remaining Trains at 15:00 and 18:00 Processed',
    phase: 'ARRIVAL',
    codeLine: 28,
    tracks: [
      {
        label: 'Sorted Arrivals arr (All Trains Processed)',
        items: [
          { val: '9:00', status: 'visited' },
          { val: '9:40', status: 'visited' },
          { val: '9:50', status: 'visited' },
          { val: '11:00', status: 'visited' },
          { val: '15:00', status: 'visited' },
          { val: '18:00', status: 'visited' }
        ]
      },
      {
        label: 'Sorted Departures dep',
        items: [
          { val: '9:10', status: 'visited' },
          { val: '11:20', status: 'visited' },
          { val: '11:30', status: 'visited' },
          { val: '12:00', status: 'visited' },
          { val: '19:00', status: 'visited' },
          { val: '20:00', status: 'visited' }
        ]
      }
    ],
    activeI: 5,
    activePrev: 5,
    metrics: [
      { label: 'Arrival 15:00', value: 'occupancy = 1' },
      { label: 'Arrival 18:00', value: 'occupancy = 2 (<= 3)' },
      { label: 'Sweep Status', value: 'All 6 trains completed' }
    ],
    formula: 'max_platforms = max(3, 2) = 3;',
    action: 'Remaining trains at 15:00 and 18:00 produce at most 2 concurrent trains. Peak remains 3.',
    explain: 'The two-pointer chronological sweep has traversed all arrival and departure events.',
    intuition: 'Linear two-pointer traversal finishes in O(N) steps.'
  },
  {
    title: '8. Complete Sweep: Minimum 3 Platforms Guaranteed',
    phase: 'COMPLETED',
    codeLine: 31,
    tracks: [
      {
        label: 'All Arrivals Processed (Peak = 3)',
        items: [
          { val: '9:00', status: 'match' },
          { val: '9:40', status: 'match' },
          { val: '9:50', status: 'match' },
          { val: '11:00', status: 'match' },
          { val: '15:00', status: 'match' },
          { val: '18:00', status: 'match' }
        ]
      },
      {
        label: 'All Departures Processed',
        items: [
          { val: '9:10', status: 'match' },
          { val: '11:20', status: 'match' },
          { val: '11:30', status: 'match' },
          { val: '12:00', status: 'match' },
          { val: '19:00', status: 'match' },
          { val: '20:00', status: 'match' }
        ]
      }
    ],
    activeI: null,
    activePrev: null,
    metrics: [
      { label: 'Minimum Platforms', value: '3', highlight: true },
      { label: 'Time Complexity', value: 'O(N log N)' },
      { label: 'Space Complexity', value: 'O(1) auxiliary' }
    ],
    formula: 'return max_platforms; // 3',
    action: 'Algorithm concludes. Return max_platforms = 3.',
    explain: 'Exactly 3 platforms are sufficient and necessary to accommodate all trains with zero waiting delays.',
    intuition: 'Decoupling arrival and departure timelines converts interval overlap into a clean two-pointer event sweep.',
    customCard: {
      title: 'Platform Allocation Summary',
      rows: [
        { label: 'Platforms Required', value: '3', accent: true },
        { label: 'Peak Interval', value: '11:00 to 11:20 (3 trains present)' },
        { label: 'Complexity', value: 'O(N log N) sort, O(N) sweep, O(1) space', accent: true }
      ]
    }
  }
];
