import {createHash} from 'node:crypto';
import AxeBuilder from '@axe-core/playwright';
import {test, expect, type Page} from '@playwright/test';

async function openReady(
  page: Page,
  entry: string,
  theme: string,
  mode: 'light' | 'dark',
) {
  await page.goto(`/?entry=${encodeURIComponent(entry)}&theme=${theme}&mode=${mode}`, {
    waitUntil: 'domcontentloaded',
  });
  await page.waitForFunction(
    () => document.documentElement.dataset.entryState === 'ready',
  );
}

async function openStarter(page: Page, mode: 'light' | 'dark') {
  await page.goto('http://127.0.0.1:4174', {waitUntil: 'domcontentloaded'});
  await expect(page.getByRole('heading', {level: 1, name: 'Astryx'})).toBeVisible();
  await expect(page.getByRole('toolbar', {name: 'Theme controls'})).toBeVisible();

  const toDark = page.getByRole('button', {name: 'Switch to dark mode'});
  const toLight = page.getByRole('button', {name: 'Switch to light mode'});
  if (mode === 'dark' && (await toDark.isVisible())) await toDark.click();
  if (mode === 'light' && (await toLight.isVisible())) await toLight.click();
  await expect(mode === 'dark' ? toLight : toDark).toBeVisible();
  await page.waitForFunction(() => document.getAnimations().length === 0);
}

test('starter desktop and mobile states render in real Chromium', async ({
  page,
}, testInfo) => {
  const captures: Buffer[] = [];
  const states = [
    {name: 'desktop-light', width: 1440, height: 1000, mode: 'light' as const},
    {name: 'desktop-dark', width: 1440, height: 1000, mode: 'dark' as const},
    {name: 'mobile-light', width: 390, height: 844, mode: 'light' as const},
    {name: 'mobile-dark', width: 390, height: 844, mode: 'dark' as const},
  ];

  for (const state of states) {
    await page.setViewportSize({width: state.width, height: state.height});
    await openStarter(page, state.mode);
    const metrics = await page.evaluate(() => ({
      background: getComputedStyle(document.body).backgroundColor,
      foreground: getComputedStyle(document.body).color,
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
    }));
    expect(metrics.background).not.toBe('rgba(0, 0, 0, 0)');
    expect(metrics.foreground).not.toBe(metrics.background);
    expect(metrics.documentWidth).toBeLessThanOrEqual(metrics.viewportWidth + 1);
    const capture = await page.screenshot({
      path: testInfo.outputPath(`${state.name}.png`),
      fullPage: true,
    });
    captures.push(capture);
  }

  const hashes = new Set(
    captures.map((capture) => createHash('sha256').update(capture).digest('hex')),
  );
  expect(hashes.size).toBe(captures.length);
});

test('starter and representative component have no serious accessibility violations', async ({
  page,
}) => {
  await openStarter(page, 'light');
  let results = await new AxeBuilder({page}).analyze();
  let serious = results.violations.filter(
    (violation) => violation.impact === 'serious' || violation.impact === 'critical',
  );
  expect(serious).toEqual([]);

  await openReady(page, 'component:actions', 'neutral', 'light');
  results = await new AxeBuilder({page}).analyze();
  serious = results.violations.filter(
    (violation) => violation.impact === 'serious' || violation.impact === 'critical',
  );
  expect(serious).toEqual([]);
});
