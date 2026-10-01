/// <reference types="vite/client" />

declare global {
  interface Window {
    __entryError?: string;
    __entryReady?: boolean;
  }
}

export {};
