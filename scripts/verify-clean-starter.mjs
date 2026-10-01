#!/usr/bin/env node
import {cp, mkdtemp, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'assets/starter');
const temporaryDirectory = await mkdtemp(path.join(tmpdir(), 'astryx-v0-starter-'));

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: temporaryDirectory,
    stdio: 'inherit',
    env: {...process.env, CI: '1'},
  });
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} failed with ${result.status}`);
  }
}

try {
  await cp(source, temporaryDirectory, {
    recursive: true,
    filter: (item) =>
      !item.includes(`${path.sep}.next`) &&
      !item.includes(`${path.sep}node_modules`) &&
      !item.endsWith('.tsbuildinfo'),
  });
  run('pnpm', ['install', '--frozen-lockfile=false']);
  run('pnpm', ['typecheck']);
  run('pnpm', ['build']);
  console.log(`Clean starter verified in ${temporaryDirectory}.`);
} finally {
  if (process.env.KEEP_TEMP == null) {
    await rm(temporaryDirectory, {recursive: true, force: true});
  }
}
