import {chromium} from '@playwright/test';
import {mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';

const repositoryUrl = 'https://github.com/cixzhang/astryx-v0-bundle';
const importUrl = 'https://v0.app/chat?design-system-skill-onboarding=1';
const outputDirectory = path.resolve(
  process.env.V0_IMPORT_EVIDENCE_DIR ?? 'v0-import-evidence',
);
const timeoutMilliseconds = 120_000;
const pollMilliseconds = 500;

const authenticationPatterns = [
  /To use v0, create a Vercel account/i,
  /To use v0, sign in to your Vercel account/i,
  /Continue with Vercel/i,
];
const upgradePatterns = [/Get Started with a v0 Plus Plan/i, /Upgrade your plan to/i];
const failurePatterns = [
  /failed to import/i,
  /could(?: not|n['’]t) access/i,
  /repository.*(?:invalid|not found|unavailable)/i,
];

function matchesAny(text, patterns) {
  return patterns.some((pattern) => pattern.test(text));
}

function chatHasStarted(url) {
  return /^\/chat\/[^/]+\/?$/.test(new URL(url).pathname);
}

async function bodyText(page) {
  return page
    .locator('body')
    .innerText()
    .catch(() => '');
}

async function authenticationIsRequired(page, text) {
  if (matchesAny(text, authenticationPatterns)) {
    return true;
  }
  if (new URL(page.url()).pathname !== '/') {
    return false;
  }
  const [logInVisible, signUpVisible] = await Promise.all(
    ['Log In', 'Sign Up'].map((label) =>
      page
        .getByText(label, {exact: true})
        .first()
        .isVisible()
        .catch(() => false),
    ),
  );
  return logInVisible && signUpVisible;
}

async function waitFor(page, evaluate) {
  const deadline = Date.now() + timeoutMilliseconds;
  while (Date.now() < deadline) {
    const result = await evaluate();
    if (result) {
      return result;
    }
    await page.waitForTimeout(pollMilliseconds);
  }
  return null;
}

await mkdir(outputDirectory, {recursive: true});

const evidence = {
  startedAt: new Date().toISOString(),
  importUrl,
  repositoryUrl,
  outcome: 'unknown',
  finalUrl: '',
  visibleSignals: [],
  httpFailures: [],
};

let browser;
let page;

try {
  browser = await chromium.launch({headless: true});
  const context = await browser.newContext({
    viewport: {width: 1440, height: 1000},
  });
  page = await context.newPage();

  page.on('response', (response) => {
    if (response.status() < 400) {
      return;
    }
    const url = new URL(response.url());
    if (url.hostname === 'v0.app' || url.hostname.endsWith('.v0.app')) {
      evidence.httpFailures.push({
        method: response.request().method(),
        path: url.pathname,
        status: response.status(),
      });
    }
  });

  await page.goto(importUrl, {
    timeout: timeoutMilliseconds,
    waitUntil: 'domcontentloaded',
  });

  const entryOutcome = await waitFor(page, async () => {
    const text = await bodyText(page);
    if (await authenticationIsRequired(page, text)) {
      return 'authentication-required-before-form';
    }
    if (matchesAny(text, upgradePatterns)) {
      return 'paid-plan-required-before-form';
    }
    if (await page.locator('#ds-onboard-github').isVisible()) {
      return 'form-ready';
    }
    return null;
  });

  if (entryOutcome !== 'form-ready') {
    evidence.outcome = entryOutcome ?? 'form-timeout';
  } else {
    await page.locator('#ds-onboard-github').fill(repositoryUrl);
    await page.screenshot({
      path: path.join(outputDirectory, '01-import-form.png'),
      fullPage: true,
    });
    await page.getByRole('button', {name: 'Start import', exact: true}).click();

    const submissionOutcome = await waitFor(page, async () => {
      const text = await bodyText(page);
      if (chatHasStarted(page.url())) {
        return 'chat-started';
      }
      if (await authenticationIsRequired(page, text)) {
        return 'authentication-required';
      }
      if (matchesAny(text, upgradePatterns)) {
        return 'paid-plan-required';
      }
      if (matchesAny(text, failurePatterns)) {
        return 'import-rejected';
      }
      return null;
    });

    evidence.outcome = submissionOutcome ?? 'submission-timeout';
  }

  evidence.finalUrl = page.url();
  const finalText = await bodyText(page);
  evidence.visibleSignals = [
    ...authenticationPatterns,
    ...upgradePatterns,
    ...failurePatterns,
  ]
    .filter((pattern) => pattern.test(finalText))
    .map((pattern) => pattern.source);
  for (const label of ['Log In', 'Sign Up']) {
    if (
      await page
        .getByText(label, {exact: true})
        .first()
        .isVisible()
        .catch(() => false)
    ) {
      evidence.visibleSignals.push(label);
    }
  }

  await page.screenshot({
    path: path.join(outputDirectory, '02-final-state.png'),
    fullPage: true,
  });
} catch (error) {
  evidence.outcome = 'probe-error';
  evidence.error = error instanceof Error ? error.message : String(error);
  throw error;
} finally {
  evidence.finishedAt = new Date().toISOString();
  if (page && !evidence.finalUrl) {
    evidence.finalUrl = page.url();
  }
  await writeFile(
    path.join(outputDirectory, 'outcome.json'),
    `${JSON.stringify(evidence, null, 2)}\n`,
  );
  await browser?.close();
}

console.log(JSON.stringify(evidence, null, 2));

if (evidence.outcome !== 'chat-started') {
  throw new Error(`Live v0 import did not start: ${evidence.outcome}`);
}
