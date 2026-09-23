export const rendererType = 'array-scan';

export const meta = {
  title: 'Remove Outermost Parentheses',
  category: 'Stack and Queues',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Decomposes a valid parentheses string into primitive components and strips the outermost enclosing parentheses of each primitive block using depth counting.'
};

export const ideaMap = [
  {
    id: 'primitive-decomposition',
    title: 'Primitive Valid Substrings',
    description: 'A valid parentheses string can be uniquely decomposed into primitive valid strings that cannot be split into smaller valid strings.'
  },
  {
    id: 'depth-tracking',
    title: 'Nesting Depth Counter',
    description: 'Maintain opened = 0. opened represents the current nesting depth of open parentheses.'
  },
  {
    id: 'opening-bracket-rule',
    title: 'Outer Opening Bracket Filter',
    description: 'For \'(\', if opened > 0 it is an inner bracket, so append it to result. Then increment opened++.'
  },
  {
    id: 'closing-bracket-rule',
    title: 'Outer Closing Bracket Filter',
    description: 'For \')\', first decrement opened--. If opened > 0 it was an inner bracket, so append it to result.'
  },
  {
    id: 'space-optimal',
    title: 'O(1) Extra Space',
    description: 'The counter replaces an explicit stack, allowing linear O(N) execution with zero auxiliary stack memory.'
  }
];

export const solutions = {
  cpp: `// C++ Remove Outermost Parentheses
// Time Complexity: O(N) | Space Complexity: O(1) Auxiliary
#include <string>
using namespace std;

class Solution {
public:
    string removeOuterParentheses(string s) {
        string result = "";
        int opened = 0;

        for (char c : s) {
            if (c == '(') {
                if (opened > 0) result += c;
                opened++;
            } else {
                opened--;
                if (opened > 0) result += c;
            }
        }

        return result;
    }
};`,
  java: `// Java: Remove Outermost Parentheses
class Solution {
    public String removeOuterParentheses(String s) {
        StringBuilder result = new StringBuilder();
        int opened = 0;

        for (char c : s.toCharArray()) {
            if (c == '(') {
                if (opened > 0) result.append(c);
                opened++;
            } else {
                opened--;
                if (opened > 0) result.append(c);
            }
        }

        return result.toString();
    }
}`,
  python: `# Python 3: Remove Outermost Parentheses
class Solution:
    def removeOuterParentheses(self, s: str) -> str:
        result = []
        opened = 0

        for c in s:
            if c == '(':
                if opened > 0:
                    result.append(c)
                opened += 1
            else:
                opened -= 1
                if opened > 0:
                    result.append(c)

        return "".join(result)`,
  javascript: `// JavaScript: Remove Outermost Parentheses
function removeOuterParentheses(s) {
    let result = '';
    let opened = 0;

    for (const c of s) {
        if (c === '(') {
            if (opened > 0) result += c;
            opened++;
        } else {
            opened--;
            if (opened > 0) result += c;
        }
    }

    return result;
}`
};

export const steps = [
  {
    stepIndex: 1,
    title: 'Initialize Parenthesis String and Nesting Counter',
    explanation: 'Input string s = "(()())(())". Initialize opened = 0 and result = "". We will filter out outermost parentheses of each primitive block.',
    activeLine: 8,
    activeIdeaId: 'depth-tracking',
    track: ['(', '(', ')', '(', ')', ')', '(', '(', ')', ')'],
    auxiliaryTrack: [],
    highlightIndices: [0],
    pointers: { i: 0 },
    variables: { char: '(', opened: 0, result: '""' },
    customCard: {
      title: 'State at Start',
      rows: [
        { label: 'Input String', value: '"(()())(())"' },
        { label: 'Primitive Blocks', value: '"(()())" and "(())"' },
        { label: 'Nesting Depth (opened)', value: '0' }
      ]
    }
  },
  {
    stepIndex: 2,
    title: 'Index 0: \'(\' at opened=0 (Outer Bracket Dropped)',
    explanation: 'Char is \'(\'. Since opened == 0, this is the outer opening bracket of the first primitive component. Do NOT add to result. Increment opened to 1.',
    activeLine: 11,
    activeIdeaId: 'opening-bracket-rule',
    track: ['(', '(', ')', '(', ')', ')', '(', '(', ')', ')'],
    auxiliaryTrack: [],
    highlightIndices: [0],
    pointers: { i: 0 },
    variables: { char: '(', opened: 1, result: '""', action: 'Discard outer (' },
    customCard: {
      title: 'Outer Bracket Filtered',
      rows: [
        { label: 'Character', value: '\'(\'' },
        { label: 'Condition', value: 'opened == 0 -> Outermost bracket!' },
        { label: 'Action', value: 'Drop from output; opened becomes 1' }
      ]
    }
  },
  {
    stepIndex: 3,
    title: 'Index 1 & 2: Process \'(\' and \')\' (Inner Pair Retained)',
    explanation: 'At i=1: \'(\' with opened=1 > 0 -> Append \'(\'. opened becomes 2. At i=2: \')\' -> opened decrements to 1. Since opened > 0 -> Append \')\'. result = "()".',
    activeLine: 16,
    activeIdeaId: 'closing-bracket-rule',
    track: ['(', '(', ')', '(', ')', ')', '(', '(', ')', ')'],
    auxiliaryTrack: ['(', ')'],
    highlightIndices: [1, 2],
    pointers: { i: 2 },
    variables: { opened: 1, result: '"()"' },
    customCard: {
      title: 'First Inner Pair Saved',
      rows: [
        { label: 'Inner Pair', value: '"()"' },
        { label: 'Result String', value: '"()"' },
        { label: 'Current Depth', value: 'opened = 1' }
      ]
    }
  },
  {
    stepIndex: 4,
    title: 'Index 3 & 4: Process \'(\' and \')\' (Second Inner Pair Retained)',
    explanation: 'At i=3: \'(\' with opened=1 > 0 -> Append \'(\', opened=2. At i=4: \')\' -> decrement opened=1 > 0 -> Append \')\'. result becomes "()()".',
    activeLine: 16,
    activeIdeaId: 'closing-bracket-rule',
    track: ['(', '(', ')', '(', ')', ')', '(', '(', ')', ')'],
    auxiliaryTrack: ['(', ')', '(', ')'],
    highlightIndices: [3, 4],
    pointers: { i: 4 },
    variables: { opened: 1, result: '"()()"' },
    customCard: {
      title: 'Second Inner Pair Saved',
      rows: [
        { label: 'Appended Pair', value: '"()"' },
        { label: 'Result String', value: '"()()"' },
        { label: 'Depth', value: 'opened = 1' }
      ]
    }
  },
  {
    stepIndex: 5,
    title: 'Index 5: \')\' at opened=1 -> 0 (Outer Bracket Dropped)',
    explanation: 'Char is \')\'. Decrement opened from 1 to 0. Since opened == 0, this is the outer closing bracket of the 1st primitive. Do NOT append! First primitive "(()())" complete.',
    activeLine: 15,
    activeIdeaId: 'closing-bracket-rule',
    track: ['(', '(', ')', '(', ')', ')', '(', '(', ')', ')'],
    auxiliaryTrack: ['(', ')', '(', ')'],
    highlightIndices: [5],
    pointers: { i: 5 },
    variables: { char: ')', opened: 0, result: '"()()"' },
    customCard: {
      title: 'First Primitive Block Closed',
      rows: [
        { label: 'Primitive 1', value: '"(()())" -> stripped to "()()"' },
        { label: 'Nesting Depth', value: 'opened = 0 (reset to base)' },
        { label: 'Action', value: 'Discarded outer closing \')\'' }
      ]
    }
  },
  {
    stepIndex: 6,
    title: 'Index 6: \'(\' at opened=0 (2nd Outer Bracket Dropped)',
    explanation: 'Char is \'(\'. opened == 0, so this starts the 2nd primitive block "(())". Discard outer \'(\'. opened becomes 1.',
    activeLine: 11,
    activeIdeaId: 'opening-bracket-rule',
    track: ['(', '(', ')', '(', ')', ')', '(', '(', ')', ')'],
    auxiliaryTrack: ['(', ')', '(', ')'],
    highlightIndices: [6],
    pointers: { i: 6 },
    variables: { char: '(', opened: 1, result: '"()()"' },
    customCard: {
      title: 'Second Primitive Block Started',
      rows: [
        { label: 'Discarded', value: 'Outer opening \'(\' at index 6' },
        { label: 'New Depth', value: 'opened = 1' }
      ]
    }
  },
  {
    stepIndex: 7,
    title: 'Index 7 & 8: Inner Pair Saved; Index 9 Outer Closed',
    explanation: 'i=7 (\'(\', opened=1->2, kept), i=8 (\')\', opened=2->1, kept). result becomes "()()()". At i=9 (\')\', opened=1->0, dropped). Both primitives finished!',
    activeLine: 16,
    activeIdeaId: 'primitive-decomposition',
    track: ['(', '(', ')', '(', ')', ')', '(', '(', ')', ')'],
    auxiliaryTrack: ['(', ')', '(', ')', '(', ')'],
    highlightIndices: [7, 8, 9],
    pointers: { i: 9 },
    variables: { opened: 0, result: '"()()()"' },
    customCard: {
      title: 'Second Primitive Block Stripped',
      rows: [
        { label: 'Primitive 2', value: '"(())" -> stripped to "()"' },
        { label: 'Total Output', value: '"()()()"' },
        { label: 'Final opened', value: '0 (balanced)' }
      ]
    }
  },
  {
    stepIndex: 8,
    title: 'Outermost Parentheses Removed: Result = "()()()"',
    explanation: 'Entire string processed in a single pass. Both outer shells were eliminated cleanly. Time complexity is O(N) with O(1) auxiliary space.',
    activeLine: 19,
    activeIdeaId: 'space-optimal',
    track: ['(', '(', ')', '(', ')', ')', '(', '(', ')', ')'],
    auxiliaryTrack: ['(', ')', '(', ')', '(', ')'],
    highlightIndices: [],
    pointers: {},
    variables: { finalResult: '"()()()"', timeComplexity: 'O(N)', spaceComplexity: 'O(1)' },
    customCard: {
      title: 'Transformation Summary',
      rows: [
        { label: 'Original String', value: '"(()())(())"' },
        { label: 'Transformed String', value: '"()()()"', accent: true },
        { label: 'Time Complexity', value: 'O(N) Single Scan' },
        { label: 'Auxiliary Space', value: 'O(1) (Counter Only)' }
      ]
    }
  }
];
