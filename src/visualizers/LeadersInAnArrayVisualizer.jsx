import React from 'react';

export const approaches = {
  intuitive: {
    title: 'Intuitive: Brute Force',
    badge: 'Brute Force',
    complexity: { time: 'O(N²)', space: 'O(1)' },
    steps: [
      {
        title: 'Initialize Array Scan',
        phase: 'INITIALIZING',
        codeLine: 4,
        variables: { i: 0, ans: [] },
        explain: 'Start scanning from the first element (10). We will check if it is strictly greater than all elements to its right.',
        intuition: 'A brute-force approach checks every element against every subsequent element to prove it is a leader.',
        activeIndex: 0,
        array: [10, 22, 12, 3, 0, 6],
        ans: []
      },
      {
        title: 'Compare 10 and 22',
        phase: 'COMPARING',
        codeLine: 8,
        variables: { i: 0, j: 1, ans: [] },
        explain: 'Compare the current candidate (10) with the next element (22).',
        intuition: 'Since 22 >= 10, 10 cannot be a leader. We can break out of the inner loop immediately.',
        activeIndex: 0,
        compareIndex: 1,
        array: [10, 22, 12, 3, 0, 6],
        ans: []
      },
      {
        title: 'Check next candidate (22)',
        phase: 'INITIALIZING',
        codeLine: 5,
        variables: { i: 1, ans: [] },
        explain: 'Move pointer i to the next element (22) and assume it is a leader.',
        intuition: 'We must verify this assumption by checking all elements to its right.',
        activeIndex: 1,
        array: [10, 22, 12, 3, 0, 6],
        ans: []
      },
      {
        title: 'Scan right of 22',
        phase: 'SCANNING',
        codeLine: 7,
        variables: { i: 1, j: '2..5', ans: [] },
        explain: 'Compare 22 with 12, 3, 0, and 6.',
        intuition: 'None of the elements to the right are greater than or equal to 22. Our assumption holds true!',
        activeIndex: 1,
        compareIndex: 5,
        array: [10, 22, 12, 3, 0, 6],
        ans: []
      },
      {
        title: 'Add 22 to leaders',
        phase: 'MATCH_FOUND',
        codeLine: 13,
        variables: { i: 1, ans: [22] },
        explain: 'Since 22 survived all checks, add it to our ans array.',
        intuition: 'This element is proven to be a leader.',
        activeIndex: 1,
        array: [10, 22, 12, 3, 0, 6],
        ans: [22]
      },
      {
        title: 'Fast Forward: Algorithm completes',
        phase: 'DONE',
        codeLine: 15,
        variables: { ans: [22, 12, 6] },
        explain: 'After checking all elements, we find that 22, 12, and 6 are leaders.',
        intuition: 'Brute force works correctly but is inefficient (O(N²)) for large arrays due to redundant rightward scanning.',
        activeIndex: -1,
        array: [10, 22, 12, 3, 0, 6],
        ans: [22, 12, 6]
      }
    ],
    solutions: {
      cpp: `class Solution {
public:
    vector<int> leaders(vector<int>& nums) {
        vector<int> ans;
        for(int i = 0; i < nums.size(); i++) {
            bool isLeader = true;
            for(int j = i + 1; j < nums.size(); j++) {
                if(nums[j] >= nums[i]) {
                    isLeader = false;
                    break;
                }
            }
            if(isLeader) ans.push_back(nums[i]);
        }
        return ans;
    }
};`,
      java: `class Solution {
    public ArrayList<Integer> leaders(int[] nums) {
        ArrayList<Integer> ans = new ArrayList<>();
        for (int i = 0; i < nums.length; i++) {
            boolean isLeader = true;
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[j] >= nums[i]) {
                    isLeader = false;
                    break;
                }
            }
            if (isLeader) ans.add(nums[i]);
        }
        return ans;
    }
}`,
      python: `class Solution:
    def leaders(self, nums: List[int]) -> List[int]:
        ans = []
        for i in range(len(nums)):
            is_leader = True
            for j in range(i + 1, len(nums)):
                if nums[j] >= nums[i]:
                    is_leader = False
                    break
            if is_leader:
                ans.append(nums[i])
        return ans`
    }
  },
  better: {
    title: 'Better: Monotonic Stack',
    badge: 'Sub-Optimal',
    complexity: { time: 'O(N)', space: 'O(N)' },
    steps: [
      {
        title: 'Initialize Stack',
        phase: 'INITIALIZING',
        codeLine: 4,
        variables: { i: 0, stack: [] },
        explain: 'We will use a stack to keep track of valid leaders as we traverse left to right.',
        intuition: 'If we encounter an element larger than the top of our stack, the top element can NEVER be a leader.',
        activeIndex: 0,
        array: [10, 22, 12, 3, 0, 6],
        ans: []
      },
      {
        title: 'Push 10 to Stack',
        phase: 'MATCH_FOUND',
        codeLine: 9,
        variables: { i: 0, stack: [10] },
        explain: 'Stack is empty, so we push 10. It is a candidate leader for now.',
        intuition: 'Every element is a potential leader until proven otherwise by a larger element to its right.',
        activeIndex: 0,
        array: [10, 22, 12, 3, 0, 6],
        ans: [10]
      },
      {
        title: 'Check 22 against Stack Top',
        phase: 'COMPARING',
        codeLine: 6,
        variables: { i: 1, stack: [10] },
        explain: 'Current element 22 is greater than the stack top (10).',
        intuition: '22 invalidates 10. Since 22 is to the right of 10 and larger, 10 cannot be a leader.',
        activeIndex: 1,
        compareIndex: 0,
        array: [10, 22, 12, 3, 0, 6],
        ans: [10],
        invalidating: true
      },
      {
        title: 'Pop 10 and Push 22',
        phase: 'SWAPPING',
        codeLine: 7,
        variables: { i: 1, stack: [22] },
        explain: 'We pop 10 from the stack, and then push 22 as our new candidate.',
        intuition: 'This strictly decreasing (monotonic) stack ensures we only keep elements larger than everything seen so far.',
        activeIndex: 1,
        array: [10, 22, 12, 3, 0, 6],
        ans: [22]
      },
      {
        title: 'Check and Push 12',
        phase: 'COMPARING',
        codeLine: 9,
        variables: { i: 2, stack: [22, 12] },
        explain: '12 is NOT greater than 22. So 22 remains valid. We simply push 12.',
        intuition: '12 could be a leader for the remaining elements, so it goes on the stack.',
        activeIndex: 2,
        array: [10, 22, 12, 3, 0, 6],
        ans: [22, 12]
      },
      {
        title: 'Algorithm Completes',
        phase: 'DONE',
        codeLine: 11,
        variables: { stack: [22, 12, 6] },
        explain: 'After processing all elements and popping smaller ones (like 3 and 0 when 6 arrives), the stack contains our leaders.',
        intuition: 'This reduces time to O(N), but uses O(N) auxiliary space for the stack.',
        activeIndex: -1,
        array: [10, 22, 12, 3, 0, 6],
        ans: [22, 12, 6]
      }
    ],
    solutions: {
      cpp: `class Solution {
public:
    vector<int> leaders(vector<int>& nums) {
        vector<int> st; // using vector as stack
        for(int i = 0; i < nums.size(); i++) {
            while(!st.empty() && nums[i] > st.back()) {
                st.pop_back();
            }
            st.push_back(nums[i]);
        }
        return st;
    }
};`,
      java: `class Solution {
    public ArrayList<Integer> leaders(int[] nums) {
        ArrayList<Integer> st = new ArrayList<>();
        for (int i = 0; i < nums.length; i++) {
            while (st.size() > 0 && nums[i] > st.get(st.size() - 1)) {
                st.remove(st.size() - 1);
            }
            st.add(nums[i]);
        }
        return st;
    }
}`,
      python: `class Solution:
    def leaders(self, nums: List[int]) -> List[int]:
        st = []
        for num in nums:
            while st and num > st[-1]:
                st.pop()
            st.append(num)
        return st`
    }
  },
  optimal: {
    title: 'Optimal: Right-to-Left Max Tracking',
    badge: 'Optimal',
    complexity: { time: 'O(N)', space: 'O(N)' },
    steps: [
      {
        title: 'Identify last element',
        phase: 'INITIALIZING',
        codeLine: 15,
        variables: { max: null, ans: [] },
        explain: 'Start scanning from the right side of the array.',
        intuition: 'The rightmost element has no elements to its right, so by definition, it is ALWAYS a leader.',
        activeIndex: 5,
        array: [10, 22, 12, 3, 0, 6],
        ans: []
      },
      {
        title: 'Add rightmost element',
        phase: 'MATCH_FOUND',
        codeLine: 16,
        variables: { max: 6, ans: [6] },
        explain: 'Add 6 to the answer array, and set max = 6.',
        intuition: 'Tracking the maximum element seen so far from the right gives us an O(1) hurdle for elements to its left.',
        activeIndex: 5,
        array: [10, 22, 12, 3, 0, 6],
        ans: [6],
        maxTracking: 6
      },
      {
        title: 'Check nums[4] (0)',
        phase: 'COMPARING',
        codeLine: 20,
        variables: { i: 4, max: 6, ans: [6] },
        explain: 'Compare the current element (0) with the maximum seen so far (6).',
        intuition: 'Since 0 is NOT strictly greater than 6, it cannot be a leader.',
        activeIndex: 4,
        array: [10, 22, 12, 3, 0, 6],
        ans: [6],
        maxTracking: 6
      },
      {
        title: 'Check nums[3] (3)',
        phase: 'COMPARING',
        codeLine: 20,
        variables: { i: 3, max: 6, ans: [6] },
        explain: 'Compare 3 with the max (6).',
        intuition: '3 is also not greater than 6. Skip it.',
        activeIndex: 3,
        array: [10, 22, 12, 3, 0, 6],
        ans: [6],
        maxTracking: 6
      },
      {
        title: 'Check nums[2] (12)',
        phase: 'COMPARING',
        codeLine: 20,
        variables: { i: 2, max: 6, ans: [6] },
        explain: 'Compare 12 with the max (6). 12 is greater!',
        intuition: 'Because 12 is greater than the highest value to its right (6), it is guaranteed to be greater than ALL values to its right.',
        activeIndex: 2,
        array: [10, 22, 12, 3, 0, 6],
        ans: [6],
        maxTracking: 6,
        isGreater: true
      },
      {
        title: 'Update max and add to ans',
        phase: 'MATCH_FOUND',
        codeLine: 21,
        variables: { i: 2, max: 12, ans: [6, 12] },
        explain: 'Add 12 to our leaders list, and update our tracking max to 12.',
        intuition: 'Elements further left now have a new, higher hurdle (12) they must beat to be considered leaders.',
        activeIndex: 2,
        array: [10, 22, 12, 3, 0, 6],
        ans: [6, 12],
        maxTracking: 12
      },
      {
        title: 'Check nums[1] (22)',
        phase: 'COMPARING',
        codeLine: 20,
        variables: { i: 1, max: 12, ans: [6, 12] },
        explain: 'Compare 22 with the max (12). 22 > 12.',
        intuition: '22 clears the highest hurdle, so it is a leader.',
        activeIndex: 1,
        array: [10, 22, 12, 3, 0, 6],
        ans: [6, 12],
        maxTracking: 12,
        isGreater: true
      },
      {
        title: 'Update max and add to ans',
        phase: 'MATCH_FOUND',
        codeLine: 22,
        variables: { i: 1, max: 22, ans: [6, 12, 22] },
        explain: 'Add 22 to ans, and update max to 22.',
        intuition: 'The max hurdle is now 22.',
        activeIndex: 1,
        array: [10, 22, 12, 3, 0, 6],
        ans: [6, 12, 22],
        maxTracking: 22
      },
      {
        title: 'Check nums[0] (10)',
        phase: 'COMPARING',
        codeLine: 20,
        variables: { i: 0, max: 22, ans: [6, 12, 22] },
        explain: 'Compare 10 with the max (22).',
        intuition: '10 is not greater than 22, so it is not a leader.',
        activeIndex: 0,
        array: [10, 22, 12, 3, 0, 6],
        ans: [6, 12, 22],
        maxTracking: 22
      },
      {
        title: 'Reverse the answer',
        phase: 'SWAPPING',
        codeLine: 28,
        variables: { max: 22, ans: [22, 12, 6] },
        explain: 'Because we processed the array from right-to-left, our leaders are in reverse order. We reverse the list to fix this.',
        intuition: 'Reversing takes O(K) time where K is the number of leaders, maintaining the O(N) overall time complexity.',
        activeIndex: -1,
        array: [10, 22, 12, 3, 0, 6],
        ans: [22, 12, 6],
        maxTracking: 22,
        isReversed: true
      },
      {
        title: 'Return result',
        phase: 'DONE',
        codeLine: 31,
        variables: { ans: [22, 12, 6] },
        explain: 'The algorithm finishes and returns the leaders in their original relative order.',
        intuition: 'Optimal approach achieved: Single O(N) pass, O(1) auxiliary space.',
        activeIndex: -1,
        array: [10, 22, 12, 3, 0, 6],
        ans: [22, 12, 6],
        maxTracking: 22,
        isReversed: true
      }
    ],
    solutions: {
      cpp: `#include<bits/stdc++.h>
using namespace std;

class Solution {
public:
    //Function to find the leaders in an array.
    vector<int> leaders(vector<int>& nums) {
        vector<int> ans;
        
        if(nums.empty()) {
            return ans;
        }
        
        // Last element of the vector is always a leader
        int max = nums[nums.size() - 1];
        ans.push_back(nums[nums.size() - 1]);
        
        // Check elements from right to left
        for (int i = nums.size() - 2; i >= 0; i--) {
            if (nums[i] > max) {
                ans.push_back(nums[i]);
                max = nums[i];
            }
        }
        
        /* Reverse the vector to match
        the required output order*/
        reverse(ans.begin(), ans.end());
        
        //Return the leaders
        return ans;
    }
};`,
      java: `import java.util.*;

class Solution {
    public ArrayList<Integer> leaders(int[] nums) {
        ArrayList<Integer> ans = new ArrayList<>();
        if (nums.length == 0) return ans;
        
        int max = nums[nums.length - 1];
        ans.add(max);
        
        for (int i = nums.length - 2; i >= 0; i--) {
            if (nums[i] > max) {
                ans.add(nums[i]);
                max = nums[i];
            }
        }
        
        Collections.reverse(ans);
        return ans;
    }
}`,
      python: `class Solution:
    def leaders(self, nums: List[int]) -> List[int]:
        if not nums: return []
        
        ans = []
        max_val = nums[-1]
        ans.append(max_val)
        
        for i in range(len(nums) - 2, -1, -1):
            if nums[i] > max_val:
                ans.append(nums[i])
                max_val = nums[i]
                
        return ans[::-1]`
    }
  }
};

export const solutions = approaches.optimal.solutions;
export const steps = approaches.optimal.steps;
export const meta = {
  display_id: 'Q-30',
  title: 'Leaders in an Array',
  category: 'Step 3: Solve Problems on Arrays [Easy -> Medium -> Hard]',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) for answer list',
  description: 'Find all the elements in the array which are greater than all elements to their right.'
};

export default function LeadersInAnArrayVisualizer({
  currentStep = 0,
  approachTier = 'optimal'
}) {
  const activeApproach = approaches[approachTier] || approaches.optimal;
  const activeSteps = activeApproach.steps;
  const stepIndex = Math.min(Math.max(0, currentStep), activeSteps.length - 1);
  const stepData = activeSteps[stepIndex] || activeSteps[0];

  const {
    array = [],
    ans = [],
    activeIndex,
    compareIndex,
    maxTracking,
    isGreater,
    invalidating,
    isReversed
  } = stepData;

  // Render Apple-style Array Cell
  const renderCell = (val, idx, isActive, isCompare, isDimmed, isSuccess) => {
    let borderColor = 'var(--line)';
    let bgColor = 'var(--board-raised)';
    let scale = 1;
    let shadow = 'none';
    let textColor = 'var(--chalk)';

    if (isActive) {
      borderColor = 'var(--indigo)';
      bgColor = 'color-mix(in srgb, var(--indigo) 15%, transparent)';
      scale = 1.05;
      shadow = '0 0 0 2px color-mix(in srgb, var(--indigo) 30%, transparent)';
    } else if (isCompare) {
      borderColor = 'var(--amber)';
      bgColor = 'color-mix(in srgb, var(--amber) 15%, transparent)';
    } else if (isSuccess) {
      borderColor = 'var(--easy)';
      bgColor = 'color-mix(in srgb, var(--easy) 15%, transparent)';
      textColor = 'var(--easy)';
    } else if (isDimmed) {
      bgColor = 'transparent';
      textColor = 'var(--chalk-dim)';
      borderColor = 'color-mix(in srgb, var(--line) 50%, transparent)';
    }

    if (invalidating && isCompare) {
      borderColor = 'var(--hard)';
      bgColor = 'color-mix(in srgb, var(--hard) 15%, transparent)';
      textColor = 'var(--hard)';
    }

    return (
      <div key={`cell-${idx}`} className="flex flex-col items-center justify-center relative">
        {/* Pointers mapping logic */}
        <div className="absolute -top-10 flex flex-col items-center justify-end h-8">
          {isActive && (
            <div
              className="px-2 py-0.5 rounded-full text-xs font-semibold mb-1"
              style={{
                backgroundColor: 'var(--indigo)',
                color: '#fff',
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif"
              }}
            >
              curr
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-t-4 border-l-4 border-r-4 border-t-[var(--indigo)] border-l-transparent border-r-transparent" />
            </div>
          )}
          {isCompare && (
            <div
              className="px-2 py-0.5 rounded-full text-xs font-semibold mb-1"
              style={{
                backgroundColor: invalidating ? 'var(--hard)' : 'var(--amber)',
                color: '#fff',
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif"
              }}
            >
              {invalidating ? 'pop' : 'scan'}
              <div
                className={`absolute -bottom-1 left-1/2 -translate-x-1/2 border-t-4 border-l-4 border-r-4 ${
                  invalidating ? 'border-t-[var(--hard)]' : 'border-t-[var(--amber)]'
                } border-l-transparent border-r-transparent`}
              />
            </div>
          )}
        </div>

        {/* Array Box */}
        <div
          className="flex items-center justify-center font-mono font-medium rounded-[10px] w-12 h-12 text-lg sm:w-16 sm:h-16 sm:text-xl transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            border: `1px solid ${borderColor}`,
            backgroundColor: bgColor,
            color: textColor,
            transform: `scale(${scale})`,
            boxShadow: shadow,
            backdropFilter: 'blur(8px)'
          }}
        >
          {val}
        </div>
        {/* Index */}
        <div className="mt-2 text-xs font-mono" style={{ color: 'var(--chalk-faint)' }}>
          {idx}
        </div>
      </div>
    );
  };

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center p-4 relative font-sans"
      style={{ backgroundColor: 'var(--board)', color: 'var(--chalk)' }}
    >
      
      {/* Max Tracker (for Optimal) */}
      {maxTracking !== undefined && (
        <div className="absolute top-4 right-4 flex items-center space-x-3 bg-[var(--board-raised)] border border-[var(--line)] px-4 py-2 rounded-full shadow-sm backdrop-blur-md">
          <span className="text-sm font-medium" style={{ color: 'var(--chalk-dim)' }}>Max Seen:</span>
          <div
            className="flex items-center justify-center w-8 h-8 rounded-full font-mono font-bold transition-all duration-350 ease-in-out"
            style={{
              backgroundColor: isGreater ? 'var(--easy)' : 'var(--board-raised-2)',
              color: isGreater ? '#000' : 'var(--chalk)',
              transform: isGreater ? 'scale(1.1)' : 'scale(1)'
            }}
          >
            {maxTracking}
          </div>
        </div>
      )}

      {/* Main nums Array Container */}
      <div className="mb-12 flex flex-col items-center">
        <div className="mb-8 text-sm font-semibold tracking-wide uppercase" style={{ color: 'var(--chalk-dim)' }}>
          Input Array (nums)
        </div>
        <div className="flex gap-2 sm:gap-4 mt-8">
          {array.map((val, i) =>
            renderCell(
              val,
              i,
              i === activeIndex,
              i === compareIndex,
              false,
              false
            )
          )}
        </div>
      </div>

      {/* Result / Stack Array Container */}
      <div
        className="flex flex-col items-center transition-all duration-500 min-h-[140px]"
        style={{
          opacity: ans.length > 0 ? 1 : 0,
          transform: ans.length > 0 ? 'translateY(0)' : 'translateY(20px)'
        }}
      >
        <div className="mb-4 text-sm font-semibold tracking-wide uppercase flex items-center gap-2" style={{ color: 'var(--chalk-dim)' }}>
          {approachTier === 'better' ? 'Monotonic Stack' : 'Leaders Array (ans)'}
          {isReversed && (
            <span className="px-2 py-0.5 rounded-md text-xs font-bold" style={{ backgroundColor: 'var(--purple)', color: '#fff' }}>
              REVERSED
            </span>
          )}
        </div>
        
        <div className="flex gap-2 sm:gap-4">
          {ans.map((val, i) => (
            <div
              key={`ans-${i}-${val}`}
              className="flex items-center justify-center font-mono font-bold rounded-[8px] w-10 h-10 sm:w-14 sm:h-14 sm:text-lg transition-all duration-500 animate-in zoom-in slide-in-from-bottom-2"
              style={{
                border: `1px solid var(--easy)`,
                backgroundColor: 'color-mix(in srgb, var(--easy) 10%, transparent)',
                color: 'var(--easy)',
                boxShadow: '0 4px 12px color-mix(in srgb, var(--easy) 15%, transparent)'
              }}
            >
              {val}
            </div>
          ))}
          {ans.length === 0 && (
            <div className="w-14 h-14 border border-dashed rounded-[8px] flex items-center justify-center" style={{ borderColor: 'var(--line)', color: 'var(--chalk-faint)' }}>
              -
            </div>
          )}
        </div>
      </div>

    </div>
  );
}