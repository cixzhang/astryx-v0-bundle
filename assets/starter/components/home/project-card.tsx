'use client';

import {Avatar} from '@astryxdesign/core/Avatar';
import {people} from './people';
import {AvatarGroup} from '@astryxdesign/core/AvatarGroup';
import {Card} from '@astryxdesign/core/Card';
import {HStack, VStack} from '@astryxdesign/core/Layout';
import {MoreMenu} from '@astryxdesign/core/MoreMenu';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {Heading, Text} from '@astryxdesign/core/Text';
import {PROJECT_NAME, useDemoState} from './demo-state';

const members = [people.ami, people.itai, people.gabriela, people.nam, people.pablo];

export function ProjectCard() {
  const {isProjectArchived, setIsProjectArchived} = useDemoState();

  return (
    <Card padding={6}>
      <VStack gap={5}>
        <VStack gap={2}>
          <Heading level={2}>{PROJECT_NAME}</Heading>
          <Text color="secondary" maxLines={2}>
            {isProjectArchived
              ? 'Archived. Deployments are paused until someone restores it.'
              : 'Turning the marketing site into a clearer, faster, and more accessible experience, starting with the homepage and pricing.'}
          </Text>
        </VStack>
        <ProgressBar label="Project progress" value={43} hasValueLabel />
        <HStack justify="between" vAlign="center" gap={3}>
          <AvatarGroup size="md">
            {members.map((member) => (
              <Avatar key={member.name} name={member.name} src={member.src} />
            ))}
          </AvatarGroup>
          <MoreMenu
            label="Project options"
            variant="secondary"
            items={[
              {label: 'Edit project'},
              {label: 'Share'},
              isProjectArchived
                ? {label: 'Restore', onClick: () => setIsProjectArchived(false)}
                : {label: 'Archive', onClick: () => setIsProjectArchived(true)},
            ]}
          />
        </HStack>
      </VStack>
    </Card>
  );
}
