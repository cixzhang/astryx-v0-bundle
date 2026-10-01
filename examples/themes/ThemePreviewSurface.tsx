'use client';

import {Badge} from '@astryxdesign/core/Badge';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {Stack} from '@astryxdesign/core/Layout';
import {Heading, Text} from '@astryxdesign/core/Text';

export function ThemePreviewSurface({name}: {name: string}) {
  return (
    <Card width={360}>
      <Stack direction="vertical" gap={3}>
        <Stack direction="horizontal" gap={2}>
          <Badge label={name} variant="info" />
          <Badge label="Public preset" variant="success" />
        </Stack>
        <Heading level={3}>Theme preview</Heading>
        <Text type="body" color="secondary">
          Tokens, typography, radius, icons, and component targets come from the active
          Astryx theme.
        </Text>
        <Stack direction="horizontal" gap={2}>
          <Button label="Primary" variant="primary" />
          <Button label="Secondary" variant="secondary" />
        </Stack>
      </Stack>
    </Card>
  );
}
