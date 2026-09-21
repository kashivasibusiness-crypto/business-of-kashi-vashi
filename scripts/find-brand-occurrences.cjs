const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const targetDirs = ['src', 'public', 'backend'];
const individualFiles = ['index.html'];

const ignorePatterns = [
  'node_modules',
  '.git',
  'dist',
  'build',
  'package-lock.json',
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.ico',
  '.svg',
  '.pdf',
  'backup',
  'audit'
];

function shouldIgnore(filePath) {
  return ignorePatterns.some(p => filePath.includes(p));
}

const results = [];

function searchDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (shouldIgnore(fullPath)) continue;
    if (entry.isDirectory()) {
      searchDir(fullPath);
    } else if (entry.isFile()) {
      searchFile(fullPath);
    }
  }
}

function searchFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      const match1 = line.match(/varanasi\s*yatra/i);
      const match2 = line.match(/banaras\s*yatra/i);
      if (match1 || match2) {
        results.push({
          file: path.relative(rootDir, filePath),
          lineNum: idx + 1,
          line: line.trim(),
          matched: (match1 ? match1[0] : '') + (match2 ? (match1 ? ', ' : '') + match2[0] : '')
        });
      }
    });
  } catch (err) {
    // binary or unreadable
  }
}

individualFiles.forEach(f => {
  const p = path.join(rootDir, f);
  if (fs.existsSync(p)) searchFile(p);
});

targetDirs.forEach(d => {
  const p = path.join(rootDir, d);
  if (fs.existsSync(p)) searchDir(p);
});

console.log(`Found ${results.length} occurrences across files.`);
const fileMap = {};
results.forEach(r => {
  fileMap[r.file] = (fileMap[r.file] || 0) + 1;
});
console.log('Files breakdown:', JSON.stringify(fileMap, null, 2));

fs.writeFileSync(
  path.join(__dirname, 'brand-search-raw.json'),
  JSON.stringify(results, null, 2),
  'utf-8'
);
