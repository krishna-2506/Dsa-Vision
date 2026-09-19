/**
 * Automated Test Suite for Sandbox Compiler & Dynamic Trace Normalizer
 * Tests Python, C++, and JavaScript execution runners, library imports, stdout capture, and syntax error diagnostics.
 */

import { sandboxCoordinator } from '../src/services/sandbox/SandboxCoordinator.js';
import { getTemplateForQuestion, getRunnableCodeForQuestion } from '../src/services/sandbox/AlgorithmTemplates.js';

let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
  }
}

async function runTests() {
  console.log('\n======================================================');
  console.log('🧪 Starting AlgoVision Sandbox & Compiler Test Suite');
  console.log('======================================================\n');

  // Test 1: Python Runner & Trace Normalizer (Reverse Array)
  console.log('Test 1: Python Algorithm Execution (Reverse Array)');
  const pyCode = `
nums = [10, 20, 30, 40, 50]
left = 0
right = len(nums) - 1

while left < right:
    nums[left], nums[right] = nums[right], nums[left]
    left += 1
    right -= 1
`;
  const pyRes = await sandboxCoordinator.executeAndTrace('python', pyCode);
  assert(pyRes.success === true, 'Python execution reported success');
  assert(Array.isArray(pyRes.steps) && pyRes.steps.length > 0, `Python generated ${pyRes.steps.length} trace steps`);
  
  const lastPyStep = pyRes.steps[pyRes.steps.length - 1];
  assert(
    JSON.stringify(lastPyStep.items) === JSON.stringify([50, 40, 30, 20, 10]),
    `Python array reversed correctly to [50, 40, 30, 20, 10]`
  );
  assert(pyRes.steps.some(s => s.pointers && s.pointers.length > 0), 'Pointers (left/right) were tracked across steps');

  // Test 2: Python Library Imports & Print Capture
  console.log('\nTest 2: Python Library Imports & stdout Capture');
  const pyLibCode = `
import math
from collections import deque

nums = [1, 2, 3]
print("Processing nums:", len(nums))
`;
  const pyLibRes = await sandboxCoordinator.executeAndTrace('python', pyLibCode);
  assert(pyLibRes.success === true, 'Python imported standard libraries without error');
  assert(pyLibRes.stdout.includes('Processing nums: 3'), `Captured print() output in stdout: "${pyLibRes.stdout.trim()}"`);

  // Test 3: Python Syntax Error Detection (Missing Colon)
  console.log('\nTest 3: Python Syntax Error Detection & Line Pinpointing');
  const pySyntaxErrCode = `
nums = [1, 2, 3]
for i in range(len(nums))
    print(nums[i])
`;
  const pySyntaxRes = await sandboxCoordinator.executeAndTrace('python', pySyntaxErrCode);
  assert(pySyntaxRes.success === false, 'Compiler caught invalid Python syntax (missing colon)');
  assert(pySyntaxRes.errorType === 'SyntaxError', `Identified error type: ${pySyntaxRes.errorType}`);
  assert(pySyntaxRes.errorLine === 3, `Pinpointed exact error line: Line ${pySyntaxRes.errorLine}`);
  assert(pySyntaxRes.traceback && pySyntaxRes.traceback.includes('SyntaxError'), 'Provided formatted traceback with error context');

  // Test 4: C++ Runner & Trace Normalizer (Two Sum)
  console.log('\nTest 4: C++ Algorithm Execution (Two Sum)');
  const cppCode = `
#include <vector>
#include <iostream>

int main() {
    std::vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    int left = 0;
    int right = nums.size() - 1;
    
    while (left < right) {
        int current_sum = nums[left] + nums[right];
        if (current_sum == target) {
            std::cout << "Found target: " << current_sum << std::endl;
            break;
        } else if (current_sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return 0;
}
`;
  const cppRes = await sandboxCoordinator.executeAndTrace('cpp', cppCode);
  assert(cppRes.success === true, 'C++ execution reported success');
  assert(Array.isArray(cppRes.steps) && cppRes.steps.length > 0, `C++ generated ${cppRes.steps.length} trace steps`);
  assert(cppRes.steps.some(s => s.pointers.some(p => p.label === 'left' || p.label === 'right')), 'C++ tracked left and right pointers');
  assert(cppRes.stdout.includes('Found target') && cppRes.stdout.includes('9'), `C++ captured std::cout output in stdout: "${cppRes.stdout.trim()}"`);

  // Test 5: C++ Syntax Error Detection (Unclosed Brace)
  console.log('\nTest 5: C++ Syntax Error Detection');
  const cppSyntaxErrCode = `
#include <vector>

int main() {
    std::vector<int> nums = {1, 2, 3};
    for (int i = 0; i < 3; i++) {
        nums[i] = nums[i] * 2;
    // Missing closing brace
`;
  const cppSyntaxRes = await sandboxCoordinator.executeAndTrace('cpp', cppSyntaxErrCode);
  assert(cppSyntaxRes.success === false, 'C++ compiler detected unmatched brace error');
  assert(cppSyntaxRes.errorLine >= 1, `C++ detected error line ${cppSyntaxRes.errorLine}`);

  // Test 6: JavaScript Runner & Trace Normalizer (Bubble Sort)
  console.log('\nTest 6: JavaScript Algorithm Execution (Bubble Sort)');
  const jsCode = `
const nums = [5, 1, 4, 2];
const n = nums.length;
console.log("Sorting array of size", n);

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n - i - 1; j++) {
    if (nums[j] > nums[j + 1]) {
      const temp = nums[j];
      nums[j] = nums[j + 1];
      nums[j + 1] = temp;
    }
  }
}
`;
  const jsRes = await sandboxCoordinator.executeAndTrace('javascript', jsCode);
  assert(jsRes.success === true, 'JavaScript execution reported success');
  assert(Array.isArray(jsRes.steps) && jsRes.steps.length > 0, `JavaScript generated ${jsRes.steps.length} trace steps`);
  const lastJsStep = jsRes.steps[jsRes.steps.length - 1];
  assert(
    JSON.stringify(lastJsStep.items) === JSON.stringify([1, 2, 4, 5]),
    `JavaScript array sorted correctly to [1, 2, 4, 5]`
  );
  assert(jsRes.stdout.includes('Sorting array of size 4'), `Captured console.log output in stdout: "${jsRes.stdout.trim()}"`);

  // Test 7: JavaScript Syntax Error Detection
  console.log('\nTest 7: JavaScript Syntax Error Detection');
  const jsSyntaxErrCode = `
const nums = [1, 2, 3; // unclosed bracket with semicolon
`;
  const jsSyntaxRes = await sandboxCoordinator.executeAndTrace('javascript', jsSyntaxErrCode);
  assert(jsSyntaxRes.success === false, 'JavaScript detected syntax error');
  assert(jsSyntaxRes.errorType === 'SyntaxError', `Identified error type: ${jsSyntaxRes.errorType}`);

  // Test 8: Question to Template Mapping
  console.log('\nTest 8: Template Mapping for Array Questions');
  const reverseQ = { id: 'q-101', title: 'Reverse an Array', slug: 'reverse-an-array', category: 'Arrays' };
  const tmpl1 = getTemplateForQuestion(reverseQ);
  assert(tmpl1.id === 'reverse-an-array', `Matched reverse-an-array template for "${reverseQ.title}"`);

  const maxOnesQ = { id: 'q-102', title: 'Maximum Consecutive Ones', slug: 'maximum-consecutive-ones', category: 'Arrays' };
  const tmpl2 = getTemplateForQuestion(maxOnesQ);
  assert(tmpl2.id === 'maximum-consecutive-ones', `Matched maximum-consecutive-ones template for "${maxOnesQ.title}"`);

  const pyCodeForQ = getRunnableCodeForQuestion(reverseQ, 'python');
  assert(pyCodeForQ.includes('left') && pyCodeForQ.includes('right'), 'Returned runnable Python code for Reverse an Array');

  console.log('\n======================================================');
  console.log(`📊 Test Summary: ${passedTests}/${totalTests} Passed (${Math.round((passedTests / totalTests) * 100)}%)`);
  console.log('======================================================\n');

  if (passedTests === totalTests) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Unexpected error running tests:', err);
  process.exit(1);
});
