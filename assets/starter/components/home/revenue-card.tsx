'use client';

import {ArrowRightIcon} from '@heroicons/react/24/outline';
import {
  Bar,
  BarChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {Divider} from '@astryxdesign/core/Divider';
import {Icon} from '@astryxdesign/core/Icon';
import {HStack, VStack} from '@astryxdesign/core/Layout';
import {Heading, Text} from '@astryxdesign/core/Text';
import {dataTokenDefaults} from '@astryxdesign/core/theme';

const BAR_SIZE = 16;
const REVENUE_TOKEN = '--color-data-categorical-green';
// Astryx defines data-viz colors as StyleX vars that astryx.css doesn't emit, so the default is the fallback.
const REVENUE_COLOR = `var(${REVENUE_TOKEN}, ${dataTokenDefaults[REVENUE_TOKEN]})`;
const BORDER = 'var(--color-border, rgba(0, 0, 0, 0.1))';
const TEXT_SECONDARY = 'var(--color-text-secondary, #6B6B73)';

const week = [
  {day: 'Mo', revenue: 5840},
  {day: 'Tu', revenue: 8920},
  {day: 'We', revenue: 4310},
  {day: 'Th', revenue: 6780},
  {day: 'Fr', revenue: 9640},
  {day: 'Sa', revenue: 7250},
  {day: 'Su', revenue: 5460},
];

const total = week.reduce((sum, {revenue}) => sum + revenue, 0);
const average = Math.round(total / week.length);

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});
const compactCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1,
});

const recentOrders = [
  {label: 'Wireless Headphones', orders: 128, amount: 128 * 249},
  {label: 'Minimalist Watch', orders: 94, amount: 94 * 189},
];

function RevenueTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: {value: number}[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <Card padding={2} elevation="high">
      <Text
        size="sm"
        weight="semibold"
      >{`${label} · ${currency.format(payload[0].value)}`}</Text>
    </Card>
  );
}

export function RevenueCard() {
  return (
    <Card padding={5}>
      <VStack gap={5}>
        <VStack gap={3}>
          <HStack justify="between" vAlign="center" gap={3}>
            <Heading level={2}>Revenue</Heading>
            <Button
              label="Full report"
              variant="secondary"
              size="sm"
              endContent={<Icon icon={ArrowRightIcon} size="sm" />}
            />
          </HStack>
          <VStack gap={1}>
            <HStack gap={2} vAlign="end">
              <Text size="4xl" weight="semibold">
                {compactCurrency.format(total)}
              </Text>
              <Text size="xl" color="secondary">
                this week
              </Text>
            </HStack>
            <Text size="sm" color="secondary">
              10 – 17 Sep 2026
            </Text>
          </VStack>
        </VStack>

        <VStack
          role="img"
          aria-label={`Daily revenue this week totaling ${currency.format(total)}, averaging ${currency.format(average)} per day`}
        >
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={week} margin={{top: 4, right: 0, bottom: 0, left: 0}}>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{fontSize: 12, fill: TEXT_SECONDARY}}
              />
              <YAxis hide domain={[0, 'dataMax']} />
              <Tooltip
                content={<RevenueTooltip />}
                cursor={{fill: BORDER, radius: 8}}
              />
              <ReferenceLine
                y={average}
                stroke={TEXT_SECONDARY}
                strokeDasharray="3 3"
                label={{
                  value: `Avg. ${compactCurrency.format(average)}`,
                  position: 'insideTopLeft',
                  fontSize: 11,
                  fill: TEXT_SECONDARY,
                }}
              />
              <Bar
                dataKey="revenue"
                barSize={BAR_SIZE}
                radius={BAR_SIZE / 2}
                fill={REVENUE_COLOR}
              />
            </BarChart>
          </ResponsiveContainer>
        </VStack>

        <VStack gap={3}>
          {recentOrders.map(({label, orders, amount}, index) => (
            <VStack key={label} gap={3}>
              {index > 0 ? <Divider /> : null}
              <HStack justify="between" vAlign="center" gap={3}>
                <VStack gap={0}>
                  <Text weight="medium">{label}</Text>
                  <Text size="sm" color="secondary">
                    {orders} orders
                  </Text>
                </VStack>
                <Text weight="semibold">{currency.format(amount)}</Text>
              </HStack>
            </VStack>
          ))}
        </VStack>
      </VStack>
    </Card>
  );
}
