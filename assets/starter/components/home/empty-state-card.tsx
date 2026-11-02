import {InboxIcon} from '@heroicons/react/24/outline';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {EmptyState} from '@astryxdesign/core/EmptyState';
import {Icon} from '@astryxdesign/core/Icon';
import {VStack} from '@astryxdesign/core/Layout';
import {Heading} from '@astryxdesign/core/Text';

export function EmptyStateCard() {
  return (
    <Card padding={5}>
      <VStack gap={4}>
        <Heading level={2}>Inbox</Heading>
        <EmptyState
          icon={<Icon icon={InboxIcon} size="lg" />}
          title="No messages yet"
          description="New messages from your team show up here."
          headingLevel={3}
          actions={<Button label="Invite teammates" variant="secondary" size="sm" />}
          isCompact
        />
      </VStack>
    </Card>
  );
}
