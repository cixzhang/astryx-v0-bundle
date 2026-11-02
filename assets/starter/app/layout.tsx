import type {Metadata, Viewport} from 'next';
import type {ReactNode} from 'react';
import {AppProviders} from '@/components/app-providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Astryx for v0',
  description:
    'A starter for building with the Astryx design system in v0: themes, tokens, and components wired for Next.js.',
  icons: {icon: '/icon.svg'},
};

export const viewport: Viewport = {
  themeColor: [
    {media: '(prefers-color-scheme: light)', color: '#F5F7FA'},
    {media: '(prefers-color-scheme: dark)', color: '#172033'},
  ],
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
