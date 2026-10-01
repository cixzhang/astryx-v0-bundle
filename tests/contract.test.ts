import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {describe, expect, test} from 'vitest';
import {astryxV0Theme} from '../examples/themes/custom/astryx-v0.theme';
import {astryxV0SyntaxTheme} from '../examples/themes/custom/syntax-theme';

const root = path.resolve(import.meta.dirname, '..');
const readJson = async <T>(relativePath: string): Promise<T> =>
  JSON.parse(await readFile(path.join(root, relativePath), 'utf8')) as T;

interface Catalog {
  templates: Array<{id: string; kind: string; targetPath: string}>;
  themes: Array<{id: string; targetPath: string}>;
  components: Array<{id: string; targetPath: string}>;
}
interface BundleManifest {
  entries: Array<{id: string; path: string; sha256: string}>;
}

describe('bundle contract', () => {
  test('uses the documented v0 schema and skill-directory starter', async () => {
    const v0 = await readJson<{
      version: number;
      referenceWorkspace: {sources: Array<{type: string; ref: string}>};
      starter: {source: string; path: string};
    }>('v0.json');
    expect(v0.version).toBe(1);
    expect(v0.referenceWorkspace.sources).toHaveLength(1);
    expect(v0.referenceWorkspace.sources[0]).toMatchObject({
      type: 'github-repo',
      ref: 'v0.6.3',
    });
    expect(v0.starter).toEqual({source: 'skill-directory', path: 'assets/starter'});
  });

  test('accounts for the complete pinned template and theme surface', async () => {
    const catalog = await readJson<Catalog>('catalog/astryx-0.6.3.json');
    expect(
      catalog.templates.filter((entry) => entry.kind === 'page-template'),
    ).toHaveLength(54);
    expect(
      catalog.templates.filter((entry) => entry.kind === 'block-template'),
    ).toHaveLength(646);
    expect(new Set(catalog.templates.map((entry) => entry.id)).size).toBe(700);
    expect(catalog.themes).toHaveLength(15);
    expect(catalog.components).toHaveLength(8);
  });

  test('keeps every generated entry content-addressed', async () => {
    const manifest = await readJson<BundleManifest>('bundle.manifest.json');
    expect(manifest.entries).toHaveLength(700);
    for (const entry of manifest.entries) {
      const source = await readFile(path.join(root, entry.path));
      expect(createHash('sha256').update(source).digest('hex'), entry.id).toBe(
        entry.sha256,
      );
    }
  });

  test('defines custom token, component, mode, and syntax values', () => {
    expect(astryxV0Theme.name).toBe('astryx-v0');
    expect(astryxV0Theme.tokens['--color-accent']).toBeDefined();
    expect(astryxV0Theme.components?.button?.['variant:primary']).toMatchObject({
      fontWeight: '700',
    });
    expect(astryxV0Theme.__onDark).toBeDefined();
    expect(astryxV0Theme.__onLight).toBeDefined();
    expect(Object.keys(astryxV0SyntaxTheme.tokens)).toHaveLength(14);
  });
});
