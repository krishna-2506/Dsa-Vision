import { getTemplateForQuestion } from '../src/services/sandbox/AlgorithmTemplates.js';

for (const id of ['pascals-triangle', 'longest-subarray-with-sum-k', 'search-in-rotated-sorted-array', 'sort-colors', 'check-for-prime-number']) {
  const code = getTemplateForQuestion({ id }).code.python;
  let jsCode = code
    .replace(/\r\n/g, '\n')
    .replace(/^[ \t]*(?:import\s+[^\r\n]+|from\s+[\w.]+\s+import\s+[^\r\n]+)/gm, '// $&')
    .replace(/^([ \t]*)#(.*)$/gm, '$1//$2')
    .replace(/\bprint\s*\((.*?)\)/g, 'console.log($1)')
    .replace(/\.append\(/g, '.push(')
    .replace(/\[\s*([^\]]+)\s*\]\s*\*\s*(\([^)]+\)|[a-zA-Z_]\w*|\d+)/g, 'new Array($2).fill($1)')
    .replace(/for\s+([a-zA-Z_]\w*)\s+in\s+range\(\s*len\(\s*([a-zA-Z_]\w*)\s*\)\s*\):/g, 'for (let $1 = 0; $1 < $2.length; $1++) {')
    .replace(/for\s+([a-zA-Z_]\w*)\s+in\s+range\(\s*([^,]+),\s*([^)]+)\):/g, 'for (let $1 = $2; $1 < $3; $1++) {')
    .replace(/for\s+([a-zA-Z_]\w*)\s+in\s+range\(\s*([^)]+)\):/g, 'for (let $1 = 0; $1 < $2; $1++) {')
    .replace(/while\s+(.+):/g, 'while ($1) {')
    .replace(/(?<!for\s+)\b([a-zA-Z_]\w*)\s+not\s+in\s+([a-zA-Z_]\w*)/g, '!($1 in $2)')
    .replace(/(?<!for\s+)\b([a-zA-Z_]\w*)\s+in\s+([a-zA-Z_]\w*)/g, '($1 in $2)')
    .replace(/elif\s+(.+):/g, 'else if ($1) {')
    .replace(/else:/g, 'else {')
    .replace(/if\s+(.+):/g, 'if ($1) {')
    .replace(/\bis\s+None\b/g, '=== null')
    .replace(/\bis\s+not\s+None\b/g, '!== null')
    .replace(/\bTrue\b/g, 'true')
    .replace(/\bFalse\b/g, 'false')
    .replace(/\bNone\b/g, 'null')
    .replace(/len\(([^)]+)\)/g, '$1.length')
    .replace(/\band\b/g, '&&')
    .replace(/\bor\b/g, '||')
    .replace(/\bnot\b/g, '!')
    .replace(/(\w+)\s*\/\/\s*(\w+)/g, 'Math.floor($1 / $2)')
    .replace(/([a-zA-Z0-9_[\]]+),\s*([a-zA-Z0-9_[\]]+)\s*=\s*([a-zA-Z0-9_[\]]+),\s*([a-zA-Z0-9_[\]]+)/g, '[$1, $2] = [$3, $4];');

  const lines = jsCode.split('\n');
  const stack = [];
  const processedLines = [];

  lines.forEach((l) => {
    const trimmed = l.trim();
    if (!trimmed) { processedLines.push(l); return; }
    const indent = l.search(/\S/);

    while (stack.length > 0 && indent <= stack[stack.length - 1].indent) {
      const popped = stack.pop();
      processedLines.push(' '.repeat(popped.indent) + '}');
    }

    if (trimmed.endsWith('{')) {
      stack.push({ indent });
    }
    processedLines.push(l);
  });

  while (stack.length > 0) {
    const popped = stack.pop();
    processedLines.push(' '.repeat(popped.indent) + '}');
  }

  const finalJs = processedLines.join('\n');
  const instrumented = finalJs.split('\n').map((lineText, idx) => {
    const lineNum = idx + 1;
    const t = lineText.trim();
    if (!t || t.startsWith('//') || t === '}' || t === '{' || t.startsWith('else') || t.startsWith('} else') || t.startsWith('catch') || t.startsWith('finally')) return lineText;
    return `__step__(${lineNum});\n${lineText}`;
  }).join('\n');

  try {
    new Function('__step__', instrumented);
    console.log('✓', id, 'OK');
  } catch (err) {
    console.error('✗', id, err.message);
  }
}
