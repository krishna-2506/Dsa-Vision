import { formatCodeWithPrettier } from '../src/services/sandbox/PrettierService.js';

async function runTests() {
  console.log('Testing PrettierService...\n');

  // 1. Python Formatting
  const unformattedPy = `
nums=[ 1,2,3,4,5 ]
left=0
right=len(nums)-1

while left<right:
    nums[ left ],nums[ right ]=nums[ right ],nums[ left ]
    left+=1
    right-=1
`;
  const pyRes = await formatCodeWithPrettier(unformattedPy, 'python');
  console.log('--- Python Formatted Output ---');
  console.log(pyRes.formatted);
  if (!pyRes.success || !pyRes.formatted.includes('nums = [1, 2, 3, 4, 5]') || !pyRes.formatted.includes('left += 1')) {
    throw new Error('Python formatting failed: ' + JSON.stringify(pyRes));
  }
  console.log('✓ Python PEP 8 formatting succeeded!');

  // 2. Python Syntax Error Handling
  const badPy = `
while left < right
    left += 1
`;
  const badPyRes = await formatCodeWithPrettier(badPy, 'python');
  console.log('--- Python Bad Syntax Handling ---');
  console.log(badPyRes);
  if (badPyRes.success !== false || badPyRes.errorLine !== 2) {
    throw new Error('Python bad syntax error detection failed!');
  }
  console.log('✓ Python Syntax Error properly trapped without corrupting code!');

  // 3. JavaScript Prettier Formatting
  const unformattedJs = `function reverse(arr){let left=0,right=arr.length-1;while(left<right){const t=arr[left];arr[left]=arr[right];arr[right]=t;left++;right--;}return arr;}`;
  const jsRes = await formatCodeWithPrettier(unformattedJs, 'javascript');
  console.log('--- JavaScript Formatted Output ---');
  console.log(jsRes.formatted);
  if (!jsRes.success || !jsRes.formatted.includes('const t = arr[left];')) {
    throw new Error('JavaScript Prettier formatting failed!');
  }
  console.log('✓ JavaScript Prettier standalone formatting succeeded!');

  // 4. C++ Formatting
  const unformattedCpp = `
#include <vector>
#include <iostream>

void reverse(std::vector<int>& nums){
int left=0;
int right=nums.size()-1;
while(left<right){
std::swap(nums[left],nums[right]);
left++;
right--;
}
}
`;
  const cppRes = await formatCodeWithPrettier(unformattedCpp, 'cpp');
  console.log('--- C++ Formatted Output ---');
  console.log(cppRes.formatted);
  if (!cppRes.success || !cppRes.formatted.includes('    int left = 0;')) {
    throw new Error('C++ Clang/Prettier formatting failed!');
  }
  console.log('✓ C++ Clang/Prettier formatting succeeded!');

  console.log('\n🎉 ALL PRETTIER FORMATTING TESTS PASSED!');
}

runTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
