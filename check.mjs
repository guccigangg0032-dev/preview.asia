import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(dir, 'style.css'), 'utf8');
const ids = new Set([...html.matchAll(/id="([^"]+)"/g)].map(match => match[1]));
const brokenAnchors = [...html.matchAll(/href="#([^"]+)"/g)].map(match => match[1]).filter(id => !ids.has(id));
const localFiles = [...html.matchAll(/(?:src|href)="(\.\/[^"#?]+)"/g)].map(match => match[1]);
const missingFiles = localFiles.filter(file => !fs.existsSync(path.join(dir, file)));
let braces = 0;
let badClosingBrace = false;
for (const char of css) {
  if (char === '{') braces += 1;
  else if (char === '}') braces -= 1;
  if (braces < 0) badClosingBrace = true;
}
const result = { brokenAnchors, missingFiles, cssBracesBalanced: braces === 0 && !badClosingBrace };
console.log(JSON.stringify(result, null, 2));
if (brokenAnchors.length || missingFiles.length || !result.cssBracesBalanced) process.exitCode = 1;
