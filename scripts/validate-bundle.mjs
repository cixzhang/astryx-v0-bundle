#!/usr/bin/env node
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {readFile, readdir, stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const failUnless = (condition, message) => {
  if (!condition) errors.push(message);
};
const readJson = async (relativePath) =>
  JSON.parse(await readFile(path.join(root, relativePath), 'utf8'));
const exists = async (relativePath) => {
  try {
    await stat(path.join(root, relativePath));
    return true;
  } catch {
    return false;
  }
};
const hash = (content) => createHash('sha256').update(content).digest('hex');

const [
  v0,
  catalog,
  packageJson,
  starterPackage,
  examplesManifest,
  bundleManifest,
  evals,
] = await Promise.all([
  readJson('v0.json'),
  readJson('catalog/astryx-0.6.3.json'),
  readJson('package.json'),
  readJson('assets/starter/package.json'),
  readJson('examples/manifest.json'),
  readJson('bundle.manifest.json'),
  readJson('evals/cases.json'),
]);
const skill = await readFile(path.join(root, 'SKILL.md'), 'utf8');

failUnless(v0.version === 1, 'v0.json must use schema version 1.');
failUnless(
  JSON.stringify(Object.keys(v0).sort()) ===
    JSON.stringify(['referenceWorkspace', 'starter', 'version']),
  'v0.json has undocumented top-level keys.',
);
const sources = v0.referenceWorkspace?.sources;
failUnless(
  Array.isArray(sources) && sources.length > 0 && sources.length <= 3,
  'v0.json must have one to three reference sources.',
);
for (const source of sources ?? []) {
  failUnless(
    source.type === 'github-repo',
    `${source.id}: source must be github-repo.`,
  );
  failUnless(
    source.repo?.org === 'facebook',
    `${source.id}: unexpected repository owner.`,
  );
  failUnless(
    source.repo?.name === 'astryx',
    `${source.id}: unexpected repository name.`,
  );
  failUnless(
    source.ref === catalog.source.gitTag,
    `${source.id}: source ref is not pinned to the catalog tag.`,
  );
  failUnless(
    source.ref !== 'main',
    `${source.id}: source ref must not be mutable main.`,
  );
  failUnless(
    source.mountPath?.startsWith('/'),
    `${source.id}: mountPath must be absolute.`,
  );
}
failUnless(
  v0.starter?.source === 'skill-directory',
  'Starter must use skill-directory.',
);
failUnless(
  v0.starter?.path === 'assets/starter',
  'Starter path must be assets/starter.',
);
failUnless(await exists('assets/starter/package.json'), 'Starter package is missing.');

failUnless(skill.startsWith('---\n'), 'SKILL.md must start with YAML frontmatter.');
failUnless(
  skill.includes('\nname: astryx\n'),
  'SKILL.md frontmatter must name astryx.',
);
failUnless(
  skill.includes('\n  v0.kind: design-system\n'),
  'SKILL.md must declare v0.kind: design-system.',
);
failUnless(skill.split('\n').length <= 100, 'SKILL.md should stay under 100 lines.');

const pages = catalog.templates.filter((entry) => entry.kind === 'page-template');
const blocks = catalog.templates.filter((entry) => entry.kind === 'block-template');
failUnless(catalog.schemaVersion === 1, 'Catalog schema version must be 1.');
failUnless(pages.length === 54, `Expected 54 pages, found ${pages.length}.`);
failUnless(blocks.length === 646, `Expected 646 blocks, found ${blocks.length}.`);
failUnless(catalog.templates.length === 700, 'Expected 700 total templates.');
failUnless(
  catalog.themes.length === 15,
  'Expected 7 presets and 8 theme capabilities.',
);
failUnless(catalog.components.length === 8, 'Expected 8 curated component examples.');
failUnless(
  catalog.source.packageVersion === '0.6.3' &&
    catalog.source.gitTag === 'v0.6.3' &&
    /^[0-9a-f]{40}$/.test(catalog.source.gitCommit),
  'Catalog source must pin Astryx 0.6.3 to a full commit.',
);
const templateIds = new Set(catalog.templates.map((entry) => entry.id));
const templatePaths = new Set(catalog.templates.map((entry) => entry.targetPath));
failUnless(templateIds.size === 700, 'Template IDs must be unique.');
failUnless(templatePaths.size === 700, 'Template target paths must be unique.');
failUnless(evals.schemaVersion === 1, 'Eval schema version must be 1.');
failUnless(evals.astryxVersion === '0.6.3', 'Eval Astryx version mismatch.');
failUnless(evals.cases.length >= 8, 'Expected at least 8 release-gating eval cases.');
const evalIds = new Set(evals.cases.map((entry) => entry.id));
const themeNames = new Set([
  'custom',
  ...catalog.themes
    .filter((entry) => entry.kind === 'theme-preset')
    .map((entry) => entry.name),
]);
failUnless(evalIds.size === evals.cases.length, 'Eval IDs must be unique.');
for (const evalCase of evals.cases) {
  failUnless(evalCase.prompt?.length > 20, `${evalCase.id}: eval prompt is too short.`);
  failUnless(
    evalCase.expected?.length >= 3,
    `${evalCase.id}: expected rubric is incomplete.`,
  );
  failUnless(
    evalCase.forbidden?.length >= 2,
    `${evalCase.id}: forbidden rubric is incomplete.`,
  );
  failUnless(
    themeNames.has(evalCase.theme),
    `${evalCase.id}: unknown theme ${evalCase.theme}.`,
  );
  for (const entryId of evalCase.startingEntries ?? []) {
    failUnless(templateIds.has(entryId), `${evalCase.id}: unknown entry ${entryId}.`);
  }
}
const wipPages = pages
  .filter((entry) => entry.upstreamStatus === 'wip')
  .map((entry) => entry.id)
  .sort();
failUnless(
  JSON.stringify(wipPages) ===
    JSON.stringify(['page:incident-console', 'page:messaging-shell', 'page:table']),
  'WIP page status does not match the pinned release.',
);

for (const entry of catalog.templates) {
  failUnless(
    entry.sourcePath.startsWith('packages/cli/'),
    `${entry.id}: unexpected source path.`,
  );
  failUnless(entry.doneCriteria.length > 0, `${entry.id}: missing done criteria.`);
  failUnless(
    await exists(entry.targetPath),
    `${entry.id}: missing ${entry.targetPath}.`,
  );
  const source = await readFile(path.join(root, entry.targetPath), 'utf8');
  failUnless(
    source.startsWith('// Copyright (c) Meta Platforms, Inc. and affiliates.'),
    `${entry.id}: public source attribution was not preserved.`,
  );
  failUnless(
    !source.includes('/template-assets/'),
    `${entry.id}: unresolved template asset.`,
  );
}
for (const entry of [...catalog.themes, ...catalog.components]) {
  failUnless(entry.doneCriteria.length > 0, `${entry.id}: missing done criteria.`);
  failUnless(
    await exists(entry.targetPath),
    `${entry.id}: missing ${entry.targetPath}.`,
  );
}

failUnless(
  examplesManifest.entries.length === 700,
  'Examples manifest must list 700 entries.',
);
failUnless(
  bundleManifest.entries.length === 700,
  'Bundle manifest must hash 700 entries.',
);
failUnless(
  bundleManifest.bundleVersion === packageJson.version,
  'Bundle version mismatch.',
);
failUnless(
  bundleManifest.astryx.version === '0.6.3',
  'Bundle Astryx version mismatch.',
);
const catalogContent = await readFile(path.join(root, 'catalog/astryx-0.6.3.json'));
const v0Content = await readFile(path.join(root, 'v0.json'));
failUnless(
  bundleManifest.contractHashes.catalog === hash(catalogContent),
  'Catalog hash is stale.',
);
failUnless(
  bundleManifest.contractHashes.v0Json === hash(v0Content),
  'v0.json hash is stale.',
);
failUnless(
  bundleManifest.contractHashes.skill === hash(skill),
  'SKILL.md hash is stale.',
);
for (const entry of bundleManifest.entries) {
  const content = await readFile(path.join(root, entry.path));
  failUnless(hash(content) === entry.sha256, `${entry.id}: generated hash mismatch.`);
}

const packagesToCheck = [packageJson, starterPackage];
for (const manifest of packagesToCheck) {
  failUnless(
    manifest.packageManager === 'pnpm@11.10.0',
    `${manifest.name}: pnpm version mismatch.`,
  );
  for (const [name, version] of Object.entries(manifest.dependencies ?? {})) {
    if (name.startsWith('@astryxdesign/')) {
      failUnless(
        version === '0.6.3',
        `${manifest.name}: ${name} must be exactly 0.6.3.`,
      );
    }
    failUnless(
      !String(version).includes('workspace:'),
      `${manifest.name}: workspace dependency leaked.`,
    );
    failUnless(
      !String(version).includes('file:'),
      `${manifest.name}: local dependency leaked.`,
    );
  }
}
failUnless(await exists('pnpm-lock.yaml'), 'Root lockfile is missing.');
failUnless(
  await exists('examples/themes/custom/built/astryx-v0.css'),
  'Built theme CSS is missing.',
);
failUnless(
  await exists('examples/themes/custom/built/astryx-v0.js'),
  'Built theme module is missing.',
);
failUnless(
  await exists('examples/themes/custom/built/astryx-v0.d.ts'),
  'Built theme declarations are missing.',
);

const ignoredDirectories = new Set([
  '.git',
  '.research',
  '.next',
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
async function collectTextFiles(directory = root) {
  const files = [];
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collectTextFiles(absolute)));
    else if (textExtensions.has(path.extname(entry.name))) files.push(absolute);
  }
  return files;
}

const hygienePatterns = [
  ['non-public domain', /internalfb[.]com/i],
  ['non-public shortlink', /fburl[.]com/i],
  ['checkout path', /[/]Users[/]/],
  ['non-public repository term', /\bfbsource\b/i],
  ['non-public review term', /\bphabricator\b/i],
  ['non-public config term', /\bconfigerator\b/i],
  ['non-public package', /@astryxdesign\/(?:lab|vega)\b/i],
  ['private key', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
  ['GitHub token', /\bgh[opusr]_[A-Za-z0-9_]{30,}\b/],
  ['Vercel token', /\bvercel_[A-Za-z0-9_-]{20,}\b/i],
];
for (const absolute of await collectTextFiles()) {
  const relative = path.relative(root, absolute).split(path.sep).join('/');
  if (relative === 'scripts/validate-bundle.mjs') continue;
  const content = await readFile(absolute, 'utf8');
  for (const [label, pattern] of hygienePatterns) {
    // Public npm metadata can retain an optional peer name that this bundle never installs.
    if (relative === 'pnpm-lock.yaml' && label === 'non-public package') continue;
    failUnless(!pattern.test(content), `${relative}: contains ${label}.`);
  }
}

try {
  const tracked = execFileSync('git', ['ls-files'], {cwd: root, encoding: 'utf8'});
  failUnless(
    !tracked.split('\n').some((file) => file.startsWith('.research/')),
    'Research files are tracked.',
  );
} catch {
  // Source archives may not include Git metadata; content checks still run.
}

if (errors.length > 0) {
  console.error(`Bundle validation failed (${errors.length}):`);
  for (const error of errors.slice(0, 80)) console.error(`- ${error}`);
  if (errors.length > 80) console.error(`- ...and ${errors.length - 80} more`);
  process.exit(1);
}
console.log(
  'Validated schema, 700 templates, 15 theme entries, 8 component examples, hashes, and public hygiene.',
);
