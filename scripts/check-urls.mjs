#!/usr/bin/env node
import {execFile} from 'node:child_process';
import {readFile, readdir} from 'node:fs/promises';
import {promisify} from 'node:util';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const execFileAsync = promisify(execFile);

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const skippedDirectories = new Set([
  '.git',
  '.next',
  '.research',
  'dist',
  'node_modules',
  'playwright-report',
  'test-results',
]);
const textExtensions = new Set([
  '.css',
  '.html',
  '.js',
  '.json',
  '.md',
  '.mjs',
  '.ts',
  '.tsx',
  '.yaml',
  '.yml',
]);

async function collect(directory = root) {
  const files = [];
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    if (entry.isDirectory() && skippedDirectories.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collect(absolute)));
    else if (textExtensions.has(path.extname(entry.name))) files.push(absolute);
  }
  return files;
}

const urlSources = new Map();
for (const file of await collect()) {
  if (
    file.endsWith('scripts/check-urls.mjs') ||
    file.endsWith('scripts/sync-astryx-examples.mjs')
  ) {
    continue;
  }
  const content = await readFile(file, 'utf8');
  const matches = content.matchAll(/https?:\/\/[^\s"'`)<>{}\\]+/g);
  for (const match of matches) {
    const candidate = match[0].replace(/[.,;:]$/, '');
    if (
      candidate.includes('*') ||
      candidate.includes('${') ||
      candidate.includes('localhost') ||
      candidate.includes('127.0.0.1') ||
      candidate === 'http://www.w3.org/2000/svg'
    ) {
      continue;
    }
    try {
      const normalized = new URL(candidate).toString();
      const sources = urlSources.get(normalized) ?? [];
      sources.push(path.relative(root, file));
      urlSources.set(normalized, sources);
    } catch {
      // A URL-shaped code fragment is covered by type and build checks.
    }
  }
}

async function request(url, method) {
  const args = [
    '--silent',
    '--show-error',
    '--location',
    '--max-time',
    '20',
    '--output',
    '/dev/null',
    '--write-out',
    '%{http_code}\\n%{url_effective}',
    '--user-agent',
    'astryx-v0-bundle-url-check/0.1',
  ];
  if (method === 'HEAD') args.push('--head');
  else args.push('--range', '0-0');
  args.push(url);
  const {stdout} = await execFileAsync('curl', args, {maxBuffer: 1024 * 1024});
  const [status, finalUrl] = stdout.trim().split('\n');
  return {status: Number(status), url: finalUrl ?? url};
}

async function check(url) {
  let lastError;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      let response = await request(url, 'HEAD');
      if (response.status === 405 || response.status >= 500) {
        response = await request(url, 'GET');
      }
      if (
        response.status < 400 ||
        response.status === 401 ||
        response.status === 403 ||
        response.status === 429
      ) {
        return {url, status: response.status, finalUrl: response.url};
      }
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
  }
  throw new Error(
    `${url}: ${lastError instanceof Error ? lastError.message : String(lastError)}`,
  );
}

const urls = [...urlSources.keys()].sort();
const failures = [];
const results = [];
const concurrency = 8;
let next = 0;
await Promise.all(
  Array.from({length: Math.min(concurrency, urls.length)}, async () => {
    while (next < urls.length) {
      const index = next;
      next += 1;
      const url = urls[index];
      try {
        results.push(await check(url));
      } catch (error) {
        failures.push({
          url,
          sources: urlSources.get(url),
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }
  }),
);

if (failures.length > 0) {
  console.error(`URL validation failed (${failures.length}/${urls.length}):`);
  for (const failure of failures) {
    console.error(`- ${failure.error} (${failure.sources.join(', ')})`);
  }
  process.exit(1);
}
const guarded = results.filter((result) => result.status >= 400).length;
console.log(
  `Verified ${results.length} concrete public URLs (${guarded} bot-guarded but reachable).`,
);
