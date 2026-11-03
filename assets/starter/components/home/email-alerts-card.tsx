'use client';

import {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {Divider} from '@astryxdesign/core/Divider';
import {VStack} from '@astryxdesign/core/Layout';
import {Heading} from '@astryxdesign/core/Text';

const alerts = [
  {
    id: 'mentions',
    label: 'Mentions and replies',
    description: 'When someone mentions you or replies to you',
  },
  {
    id: 'shared',
    label: 'Shared with me',
    description: 'When someone invites you to a project',
  },
  {
    id: 'reminders',
    label: 'Reminders',
    description: 'A friendly nudge before something is due',
  },
] as const;

type AlertId = (typeof alerts)[number]['id'];

export function EmailAlertsCard() {
  const [selected, setSelected] = useState<Record<AlertId, boolean>>({
    mentions: true,
    shared: true,
    reminders: false,
  });

  const selectedCount = Object.values(selected).filter(Boolean).length;
  const allValue =
    selectedCount === alerts.length
      ? true
      : selectedCount === 0
        ? false
        : 'indeterminate';

  function setAll(checked: boolean) {
    setSelected({mentions: checked, shared: checked, reminders: checked});
  }

  return (
    <Card padding={5}>
      <VStack gap={4}>
        <Heading level={2}>Email updates</Heading>
        <CheckboxInput label="All updates" value={allValue} onChange={setAll} />
        <Divider />
        <VStack gap={4}>
          {alerts.map((alert) => (
            <CheckboxInput
              key={alert.id}
              label={alert.label}
              description={alert.description}
              value={selected[alert.id]}
              onChange={(checked) =>
                setSelected((prev) => ({...prev, [alert.id]: checked}))
              }
            />
          ))}
        </VStack>
      </VStack>
    </Card>
  );
}
