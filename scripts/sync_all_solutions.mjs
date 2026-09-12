import fs from 'node:fs';
import { dbService } from '../server/db.js';

function extractApproachesSolutions(rawCode) {
  if (!rawCode || typeof rawCode !== 'string') return {};
  const code = rawCode.replace(/\r\n/g, '\n');

  const result = {
    intuitive: {},
    better: {},
    optimal: {}
  };

  const vars = {};
  const varRe = /(?:export\s+)?(?:const|let|var)\s+([a-zA-Z0-9_$]+)\s*=\s*`([\s\S]*?)`;?/g;
  let vm;
  while ((vm = varRe.exec(code)) !== null) {
    vars[vm[1]] = vm[2].trim();
  }

  const tierNames = ['intuitive', 'better', 'optimal'];

  const langKeyPatterns = [
    { key: 'cpp', regexes: [/cpp\s*:\s*`([\s\S]*?)`/, /cpp\s*:\s*([a-zA-Z0-9_$]+)/] },
    { key: 'java', regexes: [/java\s*:\s*`([\s\S]*?)`/, /java\s*:\s*([a-zA-Z0-9_$]+)/] },
    { key: 'python', regexes: [/(?:python|python3|py)\s*:\s*`([\s\S]*?)`/, /(?:python|python3|py)\s*:\s*([a-zA-Z0-9_$]+)/] }
  ];

  function parseSolutionsBlock(subStr) {
    const sols = {};
    for (const { key, regexes } of langKeyPatterns) {
      const litMatch = subStr.match(regexes[0]);
      if (litMatch && litMatch[1].trim()) {
        sols[key] = litMatch[1].trim();
        continue;
      }
      const varMatch = subStr.match(regexes[1]);
      if (varMatch && vars[varMatch[1]]) {
        sols[key] = vars[varMatch[1]];
        continue;
      }
    }
    return sols;
  }

  for (const tier of tierNames) {
    const tierIdx = code.indexOf(`${tier}:`);
    if (tierIdx !== -1) {
      const chunk = code.slice(tierIdx, tierIdx + 6000);
      const solIdx = chunk.indexOf('solutions');
      if (solIdx !== -1) {
        const solChunk = chunk.slice(solIdx, solIdx + 4500);
        const parsed = parseSolutionsBlock(solChunk);
        if (Object.keys(parsed).length > 0) {
          result[tier] = parsed;
        }
      }
    }
  }

  for (const targetTier of tierNames) {
    for (const srcTier of tierNames) {
      if (targetTier === srcTier) continue;
      const aliasPattern = new RegExp(`approaches\\.${targetTier}\\.solutions\\s*=\\s*approaches\\.${srcTier}\\.solutions`);
      if (aliasPattern.test(code) && Object.keys(result[srcTier]).length > 0) {
        if (!result[targetTier] || Object.keys(result[targetTier]).length === 0) {
          result[targetTier] = { ...result[srcTier] };
        }
      }
    }
  }

  const topSols = {};
  for (const [varName, varVal] of Object.entries(vars)) {
    const lower = varName.toLowerCase();
    if (lower.includes('cpp')) topSols.cpp = varVal;
    else if (lower.includes('java')) topSols.java = varVal;
    else if (lower.includes('python') || lower.includes('py')) topSols.python = varVal;
  }

  const nonEmptyTiers = tierNames.filter(t => Object.keys(result[t]).length > 0);
  if (nonEmptyTiers.length > 0) {
    const fallbackTier = result.optimal && Object.keys(result.optimal).length > 0
      ? result.optimal
      : result[nonEmptyTiers[0]];
    for (const tier of tierNames) {
      if (Object.keys(result[tier]).length === 0) {
        result[tier] = { ...fallbackTier };
      }
    }
  } else if (Object.keys(topSols).length > 0) {
    for (const tier of tierNames) {
      result[tier] = { ...topSols };
    }
  }

  return result;
}

const updates = [
  { qId: 'implement-stack-using-linked-list', file: 'src/visualizers/ImplementStackUsingLinkedListVisualizer.jsx' },
  { qId: 'delete-node-in-dll', file: 'src/visualizers/gemini-code-1789073380166.jsx' }
];

for (const { qId, file } of updates) {
  if (fs.existsSync(file)) {
    const code = fs.readFileSync(file, 'utf8');
    const solsByTier = extractApproachesSolutions(code);
    for (const [tier, sols] of Object.entries(solsByTier)) {
      if (Object.keys(sols).length > 0) {
        dbService.saveCodeSolutions(qId, sols, tier);
      }
    }
    console.log(`Saved solutions for ${qId}:`, Object.entries(solsByTier).map(([t, s]) => `${t}: [${Object.keys(s).join(', ')}]`).join('; '));
  }
}

// Verify in DB
for (const { qId } of updates) {
  const inDb = dbService.getCodeSolutionsByTier(qId);
  console.log(`DB check for ${qId}:`, Object.entries(inDb).map(([t, s]) => `${t}: [${Object.keys(s).join(', ')}]`).join('; '));
}
