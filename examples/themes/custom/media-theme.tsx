'use client';

import {MediaTheme} from '@astryxdesign/core/theme';
import {Stack} from '@astryxdesign/core/Layout';
import {Badge} from '@astryxdesign/core/Badge';
import {Heading, Text} from '@astryxdesign/core/Text';

export default function MediaThemeExample() {
  return (
    <div
      style={{
        padding: 32,
        borderRadius: 12,
        background:
          'linear-gradient(135deg, rgb(11, 35, 64), rgb(9, 91, 121), rgb(31, 24, 69))',
      }}
    >
      <MediaTheme mode="dark">
        <Stack direction="vertical" gap={2}>
          <Badge label="Dark media surface" variant="info" />
          <Heading level={3}>Readable on imagery</Heading>
          <Text type="body">
            MediaTheme applies the theme's inverted surface tokens without hard-coding
            the child foreground.
          </Text>
        </Stack>
      </MediaTheme>
    </div>
  );
}
