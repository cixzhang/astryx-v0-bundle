'use client';

import {Card} from '@astryxdesign/core/Card';
import {CodeBlock} from '@astryxdesign/core/CodeBlock';
import {HStack, VStack} from '@astryxdesign/core/Layout';
import {Section} from '@astryxdesign/core/Section';
import {StatusDot} from '@astryxdesign/core/StatusDot';
import {Heading, Text} from '@astryxdesign/core/Text';

const fileName = 'Counter.tsx';

const code = `import {useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {HStack} from '@astryxdesign/core/Layout';
import {Text} from '@astryxdesign/core/Text';

export function Counter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount((prev) => prev + 1);

  return (
    <HStack gap={3} vAlign="center">
      <Text type="large" weight="bold">{count}</Text>
      <Button label="Increment" onClick={increment} />
      <Button label="Reset" variant="ghost" onClick={() => setCount(0)} />
    </HStack>
  );
}`;

export function CodeEditorCard() {
  return (
    <Card padding={5}>
      <VStack gap={4}>
        <HStack justify="between" vAlign="end" gap={3}>
          <VStack gap={1}>
            <Heading level={2}>Editor</Heading>
            <Text type="supporting" color="secondary">
              src/components/{fileName}
            </Text>
          </VStack>
          <HStack gap={2} vAlign="center">
            <StatusDot variant="success" label="File status" />
            <Text type="supporting" color="secondary">
              Saved
            </Text>
          </HStack>
        </HStack>
        <Section padding={0} dividers={['top']}>
          <CodeBlock
            code={code}
            language="tsx"
            container="section"
            hasLanguageLabel={false}
            hasLineNumbers
            highlightLines={[8]}
            hasCopyButton={false}
            size="sm"
            width="100%"
            maxHeight={320}
          />
        </Section>
      </VStack>
    </Card>
  );
}
