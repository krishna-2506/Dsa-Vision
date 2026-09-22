import fs from 'fs';
import path from 'path';

const dir = 'src/visualizers';
const files = [
  'BurstBalloonsVisualizer.jsx',
  'NumberOfLongestIncreasingSubsequencesVisualizer.jsx',
  'PrintLongestIncreasingSubsequenceVisualizer.jsx',
  'LongestStringChainVisualizer.jsx',
  'LongestIncreasingSubsequenceDp43Visualizer.jsx',
  'LongestIncreasingSubsequenceVisualizer.jsx',
  'LongestBitonicSubsequenceVisualizer.jsx',
  'LargestDivisibleSubsetVisualizer.jsx',
  'BestTimeToBuyAndSellStockWithTransactionFeesVisualizer.jsx',
  'BestTimeToBuyAndSellStockWithCooldownVisualizer.jsx',
  'BestTimeToBuyAndSellStockIvVisualizer.jsx',
  'BestTimeToBuyAndSellStockIiiVisualizer.jsx',
  'BestTimeToBuyAndSellStockIiVisualizer.jsx',
  'BestTimeToBuyAndSellStockVisualizer.jsx'
];

for (const f of files) {
  const p = path.join(dir, f);
  if (!fs.existsSync(p)) {
    console.log(f.padEnd(55), 'MISSING');
    continue;
  }
  const content = fs.readFileSync(p, 'utf-8');
  const hasIdeaMap = content.includes('ideaMap');
  const hasRendererType = content.includes('rendererType');
  const stepCount = (content.match(/title:\s*['"`]/g) || []).length;
  console.log(f.padEnd(58), 'steps:', String(stepCount).padEnd(3), '| ideaMap:', String(hasIdeaMap).padEnd(6), '| rendererType:', hasRendererType);
}
