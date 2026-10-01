import {StrictMode, useEffect, useMemo, useState} from 'react';
import type {ComponentType} from 'react';
import {createRoot} from 'react-dom/client';
import {LinkProvider} from '@astryxdesign/core/Link';
import {Theme, type ThemeMode} from '@astryxdesign/core/theme';
import {ErrorBoundary} from './ErrorBoundary';
import {LinkAdapter} from './LinkAdapter';
import {entryLoaders, type EntryId} from './generated/entries';
import {themes, type ThemeName} from './themes';
import './index.css';

function setEntryState(state: 'loading' | 'ready' | 'error', error?: string) {
  document.documentElement.dataset.entryState = state;
  window.__entryReady = state === 'ready';
  window.__entryError = error;
}

function VerificationApp() {
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const entryId = (params.get('entry') ?? 'page:blank') as EntryId;
  const requestedTheme = params.get('theme') ?? 'neutral';
  const themeName: ThemeName =
    requestedTheme in themes ? (requestedTheme as ThemeName) : 'neutral';
  const requestedMode = params.get('mode');
  const mode: ThemeMode =
    requestedMode === 'dark' || requestedMode === 'light' ? requestedMode : 'system';
  const [Loaded, setLoaded] = useState<ComponentType | null>(null);

  useEffect(() => {
    let active = true;
    const loader = entryLoaders[entryId];
    setEntryState('loading');
    if (loader == null) {
      setEntryState('error', `Unknown entry: ${entryId}`);
      return () => {
        active = false;
      };
    }
    loader()
      .then((module) => {
        if (!active) return;
        if (module.default == null) {
          setEntryState('error', `${entryId} has no default export`);
          return;
        }
        setLoaded(() => module.default);
      })
      .catch((error: unknown) => {
        if (!active) return;
        setEntryState(
          'error',
          error instanceof Error ? (error.stack ?? error.message) : String(error),
        );
      });
    return () => {
      active = false;
    };
  }, [entryId]);

  useEffect(() => {
    if (Loaded == null) return;
    const first = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setEntryState('ready'));
    });
    return () => window.cancelAnimationFrame(first);
  }, [Loaded]);

  const handleRenderError = (message: string) => setEntryState('error', message);

  if (Loaded == null) {
    return window.__entryError == null ? (
      <p aria-live="polite">Loading {entryId}…</p>
    ) : (
      <pre data-verification-error>{window.__entryError}</pre>
    );
  }

  return (
    <Theme theme={themes[themeName]} mode={mode}>
      <LinkProvider component={LinkAdapter}>
        <div
          data-verification-frame
          data-entry-id={entryId}
          data-theme-name={themeName}
          data-theme-mode={mode}
        >
          <ErrorBoundary key={entryId} onError={handleRenderError}>
            <Loaded />
          </ErrorBoundary>
        </div>
      </LinkProvider>
    </Theme>
  );
}

const container = document.getElementById('root');
if (container == null) throw new Error('Missing #root');
createRoot(container).render(
  <StrictMode>
    <VerificationApp />
  </StrictMode>,
);
