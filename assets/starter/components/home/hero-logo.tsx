import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {HStack, VStack} from '@astryxdesign/core/Layout';
import {Heading, Text} from '@astryxdesign/core/Text';
import {AstryxWordmark} from '@/components/brand/astryx-logo';
import {dependencies} from '@/package.json';
import {InstallStatus} from './install-status';

const astryxVersion = dependencies['@astryxdesign/core'].replace(/^[\^~]/, '');

export function HeroLogo() {
  return (
    <Card padding={6}>
      <VStack gap={4} hAlign="center">
        <Heading level={1}>
          <AstryxWordmark height={56} />
        </Heading>
        <Heading level={2} justify="center" textWrap="balance">
          <Text display="block" size="xl" weight="normal">
            {"An open source design system that's"}
          </Text>
          <Text display="block" size="xl" weight="bold">
            fully customizable and agent ready
          </Text>
        </Heading>
        <HStack gap={3} hAlign="center" wrap="wrap">
          <Button
            label="Get started"
            variant="primary"
            size="md"
            width={200}
            href="https://astryx.atmeta.com"
            target="_blank"
          />
          <Button
            label="Browse components"
            variant="secondary"
            size="md"
            width={200}
            href="https://astryx.atmeta.com/components"
            target="_blank"
          />
        </HStack>
        <InstallStatus version={astryxVersion} />
      </VStack>
    </Card>
  );
}
