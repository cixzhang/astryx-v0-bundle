'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {flushSync} from 'react-dom';
import type {ThemeMode} from '@astryxdesign/core/theme';
import {Providers} from '@/app/providers';
import {themeCatalog, type ThemeName} from '@/app/theme-catalog';

interface ThemeSettings {
  themeName: ThemeName;
  setThemeName: (name: ThemeName) => void;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const ThemeSettingsContext = createContext<ThemeSettings | null>(null);

const themeNames = Object.keys(themeCatalog) as ThemeName[];
const TRANSITION_CLASS = 'theme-transition';
const TRANSITION_MS = 450;

// Widgets that already use the arrow keys themselves.
const ARROW_KEY_OWNERS =
  'input, textarea, select, [contenteditable="true"], [role="slider"], [role="tablist"], [role="radiogroup"], [role="grid"], [role="tree"], [role="listbox"], [role="menu"], [role="dialog"], [role="toolbar"] [aria-pressed]';

function isThemeName(value: string | null): value is ThemeName {
  return value != null && value in themeCatalog;
}

function isThemeMode(value: string | null): value is ThemeMode {
  return value === 'light' || value === 'dark';
}

function getFocusedCenter() {
  const focused = document.activeElement;
  if (focused instanceof HTMLElement && focused !== document.body) {
    const rect = focused.getBoundingClientRect();
    return {x: rect.left + rect.width / 2, y: rect.top + rect.height / 2};
  }
  return {x: window.innerWidth / 2, y: window.innerHeight};
}

export function useThemeSettings() {
  const value = useContext(ThemeSettingsContext);
  if (value == null) {
    throw new Error('useThemeSettings must be used inside AppProviders');
  }
  return value;
}

export function AppProviders({children}: {children: ReactNode}) {
  const [themeName, setThemeNameState] = useState<ThemeName>('neutral');
  const [mode, setModeState] = useState<ThemeMode>('light');
  const [hasReadUrl, setHasReadUrl] = useState(false);
  const transitionTimer = useRef<number | undefined>(undefined);
  const lastPointer = useRef<{x: number; y: number} | null>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      lastPointer.current = {x: event.clientX, y: event.clientY};
    }
    function handleKeyDown() {
      lastPointer.current = null;
    }
    window.addEventListener('pointerdown', handlePointerDown, true);
    window.addEventListener('keydown', handleKeyDown, true);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown, true);
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, []);

  // Themes change fonts, spacing, and radii, which can't be tweened per element. A view transition
  // snapshots the page and reveals the new theme in a circle that grows out of the control that
  // triggered it (the pointer, else the focused control), covering the whole viewport.
  const animateChange = useCallback((update: () => void) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      update();
      return;
    }
    if (typeof document.startViewTransition === 'function') {
      const origin = lastPointer.current ?? getFocusedCenter();
      const transition = document.startViewTransition(() => flushSync(update));
      transition.ready
        .then(() => {
          const radius = Math.hypot(
            Math.max(origin.x, window.innerWidth - origin.x),
            Math.max(origin.y, window.innerHeight - origin.y),
          );
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${origin.x}px ${origin.y}px)`,
                `circle(${radius}px at ${origin.x}px ${origin.y}px)`,
              ],
            },
            {
              duration: 720,
              easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
              pseudoElement: '::view-transition-new(root)',
            },
          );
        })
        .catch(() => {});
      return;
    }
    const root = document.documentElement;
    root.classList.add(TRANSITION_CLASS);
    window.clearTimeout(transitionTimer.current);
    transitionTimer.current = window.setTimeout(() => root.classList.remove(TRANSITION_CLASS), TRANSITION_MS);
    update();
  }, []);

  const setThemeName = useCallback(
    (name: ThemeName) => animateChange(() => setThemeNameState(name)),
    [animateChange],
  );

  const setMode = useCallback(
    (next: ThemeMode) => animateChange(() => setModeState(next)),
    [animateChange],
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlTheme = params.get('theme');
    const urlMode = params.get('mode');
    if (isThemeName(urlTheme)) setThemeNameState(urlTheme);
    if (isThemeMode(urlMode)) setModeState(urlMode);
    setHasReadUrl(true);
  }, []);

  useEffect(() => {
    if (!hasReadUrl) return;
    const url = new URL(window.location.href);
    url.searchParams.set('theme', themeName);
    url.searchParams.set('mode', mode);
    window.history.replaceState(window.history.state, '', url);
  }, [hasReadUrl, themeName, mode]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.defaultPrevented) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest(ARROW_KEY_OWNERS)) return;
      event.preventDefault();
      const step = event.key === 'ArrowRight' ? 1 : -1;
      const index = themeNames.indexOf(themeName);
      setThemeName(themeNames[(index + step + themeNames.length) % themeNames.length]);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [themeName, setThemeName]);

  const settings = useMemo(
    () => ({themeName, setThemeName, mode, setMode}),
    [themeName, setThemeName, mode, setMode],
  );

  return (
    <ThemeSettingsContext.Provider value={settings}>
      <Providers theme={themeCatalog[themeName]} mode={mode}>
        {children}
      </Providers>
    </ThemeSettingsContext.Provider>
  );
}
