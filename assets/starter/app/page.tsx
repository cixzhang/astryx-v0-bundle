import type {ComponentType} from 'react';
import {Grid} from '@astryxdesign/core/Grid';
import {Layout, LayoutContent, VStack} from '@astryxdesign/core/Layout';
import {Text} from '@astryxdesign/core/Text';
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
import {TasksTableCard} from '@/components/home/tasks-table-card';

interface CardEntry {
  file: string;
  Component: ComponentType;
}

// Columns are loosely grouped by theme and balanced so all four end at about the same height.
const columns: CardEntry[][] = [
  [
    {file: 'revenue-card', Component: RevenueCard},
    {file: 'project-card', Component: ProjectCard},
    {file: 'plan-card', Component: PlanCard},
    {file: 'onboarding-card', Component: OnboardingCard},
  ],
  [
    {file: 'creator-card', Component: CreatorCard},
    {file: 'loading-states-card', Component: LoadingStatesCard},
    {file: 'empty-state-card', Component: EmptyStateCard},
    {file: 'email-alerts-card', Component: EmailAlertsCard},
    {file: 'file-tree-card', Component: FileTreeCard},
  ],
  [
    {file: 'product-card', Component: ProductCard},
    {file: 'order-summary-card', Component: OrderSummaryCard},
    {file: 'checkout-card', Component: CheckoutCard},
  ],
  [
    {file: 'chat-card', Component: ChatCard},
    {file: 'calendar-card', Component: CalendarCard},
    {file: 'loan-card', Component: LoanCard},
  ],
];

export default function Home() {
  return (
    <DemoStateProvider>
      <Layout
        height="auto"
        contentWidth={1640}
        content={
          <LayoutContent role="main" padding={6}>
            <VStack gap={5}>
              <VisuallyHidden>
                <Text as="p">
                  A collage of example cards built with the Astryx design system.
                </Text>
              </VisuallyHidden>
              <HeroLogo />
              <Grid columns={{minWidth: 280, repeat: 'fit'}} gap={5} align="stretch">
                <TasksTableCard />
                <CodeEditorCard />
              </Grid>
              <Grid columns={{minWidth: 280, repeat: 'fit'}} gap={5} align="start">
                {columns.map((cards) => (
                  <VStack key={cards[0].file} gap={5}>
                    {cards.map(({file, Component}) => (
                      <Component key={file} />
                    ))}
                  </VStack>
                ))}
              </Grid>
            </VStack>
            <FloatingToolbar />
          </LayoutContent>
        }
      />
    </DemoStateProvider>
  );
}
