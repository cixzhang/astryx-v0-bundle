'use client';

import type {ComponentType} from 'react';
import * as stylex from '@stylexjs/stylex';
import {Grid} from '@astryxdesign/core/Grid';
import {Layout, LayoutContent, VStack} from '@astryxdesign/core/Layout';
import {VisuallyHidden} from '@astryxdesign/core/VisuallyHidden';
import {FloatingToolbar} from '@/components/floating-toolbar';
import {CalendarCard} from '@/components/home/calendar-card';
import {ChatCard} from '@/components/home/chat-card';
import {CheckoutCard} from '@/components/home/checkout-card';
import {CodeEditorCard} from '@/components/home/code-editor-card';
import {OrderSummaryCard} from '@/components/home/order-summary-card';
import {CreatorCard} from '@/components/home/creator-card';
import {LoanCard} from '@/components/home/loan-card';
import {RevenueCard} from '@/components/home/revenue-card';
import {DemoStateProvider} from '@/components/home/demo-state';
import {FileTreeCard} from '@/components/home/file-tree-card';
import {HeroLogo} from '@/components/home/hero-logo';
import {EmptyStateCard} from '@/components/home/empty-state-card';
import {LoadingStatesCard} from '@/components/home/loading-states-card';
import {EmailAlertsCard} from '@/components/home/email-alerts-card';
import {OnboardingCard} from '@/components/home/onboarding-card';
import {PlanCard} from '@/components/home/plan-card';
import {ProductCard} from '@/components/home/product-card';
import {ProjectCard} from '@/components/home/project-card';
import {ShortcutsCard} from '@/components/home/shortcuts-card';
import {TasksTableCard} from '@/components/home/tasks-table-card';

const WIDE = '@media (min-width: 1400px)';
const THREE_UP = '@media (min-width: 1000px)';
const TWO_UP = '@media (min-width: 720px)';
const pageWidth = 1640;

// Fixed page gutters and gaps so the controls and the card edges stay put across themes.
const styles = stylex.create({
  gutters: {
    boxSizing: 'border-box',
    width: '100%',
    maxWidth: pageWidth,
    marginInline: 'auto',
    paddingInline: 24,
    paddingTop: 24,
    // Room for the floating toolbar so the last cards are never covered.
    paddingBottom: 120,
  },
  // Wide: outer | hero + two center columns | outer. Three-up: hero across the top,
  // Tasks + Editor over two columns beside the right column. Two-up: hero, wide, pairs.
  collage: {
    gridTemplateColumns: {
      default: 'minmax(0, 1fr)',
      [TWO_UP]: 'repeat(2, minmax(0, 1fr))',
      [THREE_UP]: 'repeat(3, minmax(0, 1fr))',
      [WIDE]: 'repeat(4, minmax(0, 1fr))',
    },
    // Below THREE_UP the full-width Tasks and Editor cards sit above the card
    // columns, so uneven column lengths only show at the page end, never mid-page.
    gridTemplateAreas: {
      default: '"top" "pairA" "pairB" "wide"',
      [TWO_UP]: '"top top" "wide wide" "pairA pairB"',
      [THREE_UP]: '"top top top" "wide wide right" "left a right" "left b right"',
      [WIDE]: '"left top top right" "left wide wide right" "left a b right"',
    },
    // Rows hug their content so the spanning outer columns don't stretch the hero row.
    gridTemplateRows: {
      default: 'auto',
      [THREE_UP]: 'auto auto auto 1fr',
      [WIDE]: 'auto auto 1fr',
    },
  },
  // Below THREE_UP each pair stacks as one continuous column so a short card
  // never leaves a row-height gap; from THREE_UP up the pair dissolves into the grid.
  pair: {
    display: {default: null, [THREE_UP]: 'contents'},
  },
  pairA: {gridArea: 'pairA'},
  pairB: {gridArea: 'pairB'},
  left: {gridArea: 'left'},
  right: {gridArea: 'right'},
  top: {gridArea: 'top'},
  wide: {gridArea: 'wide'},
  a: {gridArea: 'a'},
  b: {gridArea: 'b'},
});

interface CardEntry {
  file: string;
  Component: ComponentType;
}

// Columns are loosely grouped by theme and balanced so all four end at about the same height.
const workAndData: CardEntry[] = [
  {file: 'revenue-card', Component: RevenueCard},
  {file: 'project-card', Component: ProjectCard},
  {file: 'shortcuts-card', Component: ShortcutsCard},
];

const peopleAndStates: CardEntry[] = [
  {file: 'creator-card', Component: CreatorCard},
  {file: 'loading-states-card', Component: LoadingStatesCard},
  {file: 'empty-state-card', Component: EmptyStateCard},
];

const commerce: CardEntry[] = [
  {file: 'product-card', Component: ProductCard},
  {file: 'order-summary-card', Component: OrderSummaryCard},
  {file: 'checkout-card', Component: CheckoutCard},
  {file: 'plan-card', Component: PlanCard},
  {file: 'onboarding-card', Component: OnboardingCard},
];

const communicationAndMedia: CardEntry[] = [
  {file: 'chat-card', Component: ChatCard},
  {file: 'calendar-card', Component: CalendarCard},
  {file: 'loan-card', Component: LoanCard},
  {file: 'email-alerts-card', Component: EmailAlertsCard},
  {file: 'file-tree-card', Component: FileTreeCard},
];

function CardColumn({cards, xstyle}: {cards: CardEntry[]; xstyle?: stylex.StyleXStyles}) {
  return (
    <VStack gap={5} xstyle={xstyle}>
      {cards.map(({file, Component}) => (
        <Component key={file} />
      ))}
    </VStack>
  );
}

export default function Home() {
  return (
    <DemoStateProvider>
      <Layout
        height="auto"
        contentWidth={pageWidth}
        content={
          <LayoutContent padding={0}>
            <VStack xstyle={styles.gutters}>
              <main>
                <VisuallyHidden>
                  <p>A collage of example cards built with the Astryx design system.</p>
                </VisuallyHidden>
                <Grid gap={5} align="start" xstyle={styles.collage}>
                  <VStack xstyle={styles.top}>
                    <HeroLogo />
                  </VStack>
                  <VStack gap={5} xstyle={styles.wide}>
                    <TasksTableCard />
                    <CodeEditorCard />
                  </VStack>
                  <VStack gap={5} xstyle={[styles.pair, styles.pairA]}>
                    <CardColumn cards={workAndData} xstyle={styles.a} />
                    <CardColumn cards={commerce} xstyle={styles.left} />
                  </VStack>
                  <VStack gap={5} xstyle={[styles.pair, styles.pairB]}>
                    <CardColumn cards={peopleAndStates} xstyle={styles.b} />
                    <CardColumn cards={communicationAndMedia} xstyle={styles.right} />
                  </VStack>
                </Grid>
              </main>
              <FloatingToolbar />
            </VStack>
          </LayoutContent>
        }
      />
    </DemoStateProvider>
  );
}
