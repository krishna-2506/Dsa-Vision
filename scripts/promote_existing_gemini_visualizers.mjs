import fs from 'node:fs';
import path from 'node:path';

const dir = path.resolve(process.cwd(), 'src', 'visualizers');

const mappings = [
  { from: 'gemini-code-1789029503444.ts.jsx', to: 'LargestElementVisualizer.jsx' },
  { from: 'gemini-code-1789030884587.jsx', to: 'SecondLargestElementVisualizer.jsx' },
  { from: 'gemini-code-1789030227316.jsx', to: 'FindMissingNumberVisualizer.jsx' },
  { from: 'gemini-code-1789030978041.jsx', to: 'IntroductionToSinglyLinkedlistVisualizer.jsx' },
  { from: 'gemini-code-1789034545178.jsx', to: 'DeletionOfTheHeadOfLlVisualizer.jsx' },
  { from: 'gemini-code-1789034852822.jsx', to: 'FindTheLengthOfTheLinkedListVisualizer.jsx' },
  { from: 'gemini-code-1789073380166.jsx', to: 'DeleteAllOccurrencesOfAKeyInDllVisualizer.jsx' }
];

for (const m of mappings) {
  const srcPath = path.join(dir, m.from);
  const destPath = path.join(dir, m.to);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${m.from} -> ${m.to}`);
  } else {
    console.warn(`Source not found: ${srcPath}`);
  }
}
