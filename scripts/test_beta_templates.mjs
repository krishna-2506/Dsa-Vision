import { sandboxCoordinator } from '../src/services/sandbox/SandboxCoordinator.js';
import { getTemplateForQuestion, getRunnableCodeForQuestion, createDynamicTemplateFromQuestion } from '../src/services/sandbox/AlgorithmTemplates.js';

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

async function runBetaTemplateTests() {
  console.log('\n======================================================');
  console.log('🧪 Testing Enhanced Beta Algorithm Templates & Matching');
  console.log('======================================================\n');

  // Test 1: Pascal's Triangle Matching & Execution
  console.log("Test 1: Pascal's Triangle Matching & Execution");
  const pascalsQ = {
    id: 'pascals-triangle-i',
    title: "Pascal's Triangle I (Row Generation)",
    slug: 'pascals-triangle-i',
    category: 'Arrays & Dynamic Programming'
  };
  const pascalsTmpl = getTemplateForQuestion(pascalsQ);
  assert(pascalsTmpl.id === 'pascals-triangle', `Matched pascals-triangle for "${pascalsQ.title}"`);
  assert(Array.isArray(pascalsTmpl.testCases) && pascalsTmpl.testCases.length >= 3, 'Contains preset test cases');
  
  const pascalsRes = await sandboxCoordinator.executeAndTrace('python', pascalsTmpl.code.python);
  assert(pascalsRes.success === true, "Pascal's Triangle Python code executed successfully");
  assert(pascalsRes.steps.length > 0, `Generated ${pascalsRes.steps.length} execution steps`);

  // Test 2: Maximum Product Subarray
  console.log('\nTest 2: Maximum Product Subarray Matching & Execution');
  const maxProdQ = {
    id: 'maximum-product-subarray-in-an-array',
    title: 'Maximum Product Subarray in an Array',
    slug: 'maximum-product-subarray-in-an-array',
    category: 'Arrays & Dynamic Programming'
  };
  const maxProdTmpl = getTemplateForQuestion(maxProdQ);
  assert(maxProdTmpl.id === 'maximum-product-subarray', `Matched maximum-product-subarray for "${maxProdQ.title}"`);
  const maxProdRes = await sandboxCoordinator.executeAndTrace('python', maxProdTmpl.code.python);
  assert(maxProdRes.success === true, 'Maximum Product Subarray executed successfully');
  const lastMaxProdStep = maxProdRes.steps[maxProdRes.steps.length - 1];
  assert(lastMaxProdStep.variables.max_prod === 6 || lastMaxProdStep.variables.max_prod === '6', 'Calculated max_prod = 6');

  // Test 3: Longest Subarray with Sum K
  console.log('\nTest 3: Longest Subarray with Sum K Matching & Execution');
  const longestSubQ = {
    id: 'longest-subarray-with-sum-k',
    title: 'Longest Subarray with Sum K (Prefix Sum + Hash Map)',
    slug: 'longest-subarray-with-sum-k',
    category: 'Arrays & Prefix Sum'
  };
  const longestSubTmpl = getTemplateForQuestion(longestSubQ);
  assert(longestSubTmpl.id === 'longest-subarray-with-sum-k', `Matched longest-subarray-with-sum-k for "${longestSubQ.title}"`);
  assert(longestSubTmpl.inputs.some(inp => inp.name === 'k'), 'Input schema includes parameter k');
  const longestSubRes = await sandboxCoordinator.executeAndTrace('python', longestSubTmpl.code.python);
  assert(longestSubRes.success === true, 'Longest Subarray with Sum K executed successfully');

  // Test 4: Search in Rotated Sorted Array
  console.log('\nTest 4: Search in Rotated Sorted Array');
  const rotatedQ = {
    id: 'search-in-rotated-sorted-array-i',
    title: 'Search in Rotated Sorted Array I',
    slug: 'search-in-rotated-sorted-array-i',
    category: 'Binary Search'
  };
  const rotatedTmpl = getTemplateForQuestion(rotatedQ);
  assert(rotatedTmpl.id === 'search-in-rotated-sorted-array', `Matched search-in-rotated-sorted-array for "${rotatedQ.title}"`);
  const rotatedRes = await sandboxCoordinator.executeAndTrace('python', rotatedTmpl.code.python);
  assert(rotatedRes.success === true, 'Search in Rotated Sorted Array executed successfully');
  const lastRotStep = rotatedRes.steps[rotatedRes.steps.length - 1];
  assert(lastRotStep.variables.found_idx === 4 || lastRotStep.variables.found_idx === '4', 'Found target 0 at index 4');

  // Test 5: Kadane's Algorithm
  console.log("\nTest 5: Kadane's Algorithm");
  const kadaneQ = {
    id: 'kadanes-algorithm',
    title: "Kadane's Algorithm, maximum subarray sum",
    slug: 'kadanes-algorithm',
    category: 'Arrays'
  };
  const kadaneTmpl = getTemplateForQuestion(kadaneQ);
  assert(kadaneTmpl.id === 'kadanes-algorithm', `Matched kadanes-algorithm for "${kadaneQ.title}"`);
  const kadaneRes = await sandboxCoordinator.executeAndTrace('python', kadaneTmpl.code.python);
  assert(kadaneRes.success === true, "Kadane's Algorithm executed successfully");

  // Test 6: Sort Colors (Dutch National Flag)
  console.log('\nTest 6: Sort Colors (Dutch National Flag)');
  const sortColorsQ = {
    id: 'sort-colors',
    title: 'Sort an array of 0s, 1s and 2s',
    slug: 'sort-an-array-of-0s-1s-and-2s',
    category: 'Arrays'
  };
  const sortColorsTmpl = getTemplateForQuestion(sortColorsQ);
  assert(sortColorsTmpl.id === 'sort-colors', `Matched sort-colors for "${sortColorsQ.title}"`);
  const sortColorsRes = await sandboxCoordinator.executeAndTrace('python', sortColorsTmpl.code.python);
  assert(sortColorsRes.success === true, 'Sort Colors executed successfully');
  const lastSortStep = sortColorsRes.steps[sortColorsRes.steps.length - 1];
  assert(JSON.stringify(lastSortStep.items) === JSON.stringify([0, 0, 1, 1, 2, 2]), 'Array sorted into [0, 0, 1, 1, 2, 2]');

  // Test 7: Check for Prime Number
  console.log('\nTest 7: Check for Prime Number');
  const primeQ = {
    id: 'check-for-prime-number',
    title: 'Check for Prime Number',
    slug: 'check-for-prime-number',
    category: 'Learn the basics'
  };
  const primeTmpl = getTemplateForQuestion(primeQ);
  assert(primeTmpl.id === 'check-for-prime-number', `Matched check-for-prime-number for "${primeQ.title}"`);
  const primeRes = await sandboxCoordinator.executeAndTrace('python', primeTmpl.code.python);
  assert(primeRes.success === true, 'Prime check executed successfully');

  // Test 8: Dynamic Template Synthesis
  console.log('\nTest 8: Dynamic Template Synthesis from Custom Question Solutions');
  const unknownQ = {
    id: 'custom-algo-999',
    title: 'Custom Invert Tree',
    slug: 'custom-invert-tree',
    category: 'Trees'
  };
  const customSolutions = {
    python: `class Solution:\n    def invert(self, nums):\n        return list(reversed(nums))`
  };
  const dynTmpl = getTemplateForQuestion(unknownQ, customSolutions);
  assert(dynTmpl.isDynamic === true, 'Generated dynamic template from question solutions');
  assert(dynTmpl.code.python.includes('Solution()'), 'Synthesized runnable driver harness for Solution class');

  console.log('\n======================================================');
  console.log(`📊 Test Summary: ${passedTests}/${totalTests} Passed (${Math.round((passedTests / totalTests) * 100)}%)`);
  console.log('======================================================\n');

  if (passedTests === totalTests) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runBetaTemplateTests().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
