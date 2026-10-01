#!/usr/bin/env node
import {mkdir, rm} from 'node:fs/promises';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const check = process.argv.includes('--check');
const source = path.join(root, 'examples/themes/custom/astryx-v0.theme.ts');
const outputDirectory = path.join(root, 'examples/themes/custom/built');
const output = path.join(outputDirectory, 'astryx-v0.css');

if (!check) {
  await rm(outputDirectory, {recursive: true, force: true});
}
await mkdir(outputDirectory, {recursive: true});

const cli = fileURLToPath(import.meta.resolve('@astryxdesign/cli'));
const args = [cli, 'theme', 'build', source, '--out', output];
if (check) args.push('--check');
const result = spawnSync(process.execPath, args, {
  cwd: root,
  stdio: 'inherit',
  env: {...process.env, NO_COLOR: '1'},
});
if (result.status !== 0) process.exit(result.status ?? 1);
