import {test, expect} from '@playwright/test';
import {entryMetadata} from '../../verification/src/generated/entries';

const entries = entryMetadata.filter(
  (entry) => entry.kind === 'page-template' || entry.kind === 'block-template',
);
const shardCount = 12;

for (let shard = 0; shard < shardCount; shard += 1) {
  const shardEntries = entries.filter((_, index) => index % shardCount === shard);

  test(`mounts every generated entry, shard ${shard + 1}/${shardCount}`, async ({
    page,
  }) => {
    const failures: string[] = [];
    let currentEntry = 'initialization';

    page.on('pageerror', (error) => {
      failures.push(`${currentEntry}: page error: ${error.message}`);
    });
    page.on('console', (message) => {
      if (message.type() === 'error') {
        failures.push(`${currentEntry}: console error: ${message.text()}`);
      }
    });
    page.on('response', (response) => {
      if (response.status() >= 400) {
        failures.push(
          `${currentEntry}: ${response.status()} response: ${response.url()}`,
        );
      }
    });

    for (const entry of shardEntries) {
      currentEntry = entry.id;
      await page.goto(`/?entry=${encodeURIComponent(entry.id)}`, {
        waitUntil: 'domcontentloaded',
      });
      await page.waitForFunction(() => {
        const state = document.documentElement.dataset.entryState;
        return state === 'ready' || state === 'error';
      });
      const result = await page.evaluate(() => ({
        state: document.documentElement.dataset.entryState,
        error: window.__entryError,
      }));
      if (result.state !== 'ready') {
        failures.push(`${entry.id}: ${result.error ?? 'unknown render error'}`);
      }
      await page.waitForTimeout(25);
      if (failures.length >= 50) break;
    }

    expect(failures, failures.length === 0 ? undefined : failures.join('\n\n')).toEqual(
      [],
    );
  });
}
