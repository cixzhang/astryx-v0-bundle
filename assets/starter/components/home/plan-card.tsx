'use client';

import {useState} from 'react';
import {Banner} from '@astryxdesign/core/Banner';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {VStack} from '@astryxdesign/core/Layout';
import {RadioList, RadioListItem} from '@astryxdesign/core/RadioList';
import {
  SegmentedControl,
  SegmentedControlItem,
} from '@astryxdesign/core/SegmentedControl';
import {Heading, Text} from '@astryxdesign/core/Text';

type Billing = 'monthly' | 'yearly';

const plans = [
  {value: 'starter', label: 'Starter', monthly: 0},
  {value: 'team', label: 'Team', monthly: 12},
  {value: 'business', label: 'Business', monthly: 29},
];

function formatPrice(monthly: number, billing: Billing) {
  if (monthly === 0) return 'Free';
  return billing === 'monthly' ? `$${monthly}/mo` : `$${monthly * 10}/yr`;
}

export function PlanCard() {
  const [billing, setBilling] = useState<Billing>('yearly');
  const [plan, setPlan] = useState('team');
  const selected = plans.find((item) => item.value === plan);

  return (
    <Card padding={5}>
      <VStack gap={4}>
        <VStack hAlign="center">
          <Heading level={2}>Choose a plan</Heading>
        </VStack>
        <VStack gap={2}>
          <SegmentedControl
            label="Billing period"
            value={billing}
            layout="fill"
            onChange={(value) => setBilling(value as Billing)}
          >
            <SegmentedControlItem value="monthly" label="Monthly" />
            <SegmentedControlItem value="yearly" label="Yearly" />
          </SegmentedControl>
          <Banner
            status="info"
            title={
              billing === 'yearly'
                ? 'Yearly billing includes two months free.'
                : 'Switch to yearly to get two months free.'
            }
          />
        </VStack>
        <RadioList label="Plan" isLabelHidden value={plan} onChange={setPlan}>
          {plans.map((item) => (
            <RadioListItem
              key={item.value}
              label={item.label}
              value={item.value}
              endContent={
                <Text type="body" color="secondary">
                  {formatPrice(item.monthly, billing)}
                </Text>
              }
            />
          ))}
        </RadioList>
        <Button
          label={
            selected && selected.monthly > 0
              ? `Upgrade to ${selected.label}`
              : 'Stay on Starter'
          }
          variant="primary"
          size="lg"
        />
      </VStack>
    </Card>
  );
}
