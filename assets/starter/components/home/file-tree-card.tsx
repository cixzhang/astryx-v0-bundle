'use client';

import {useState} from 'react';
import {DocumentIcon, FolderIcon} from '@heroicons/react/24/outline';
import {Card} from '@astryxdesign/core/Card';
import {Icon} from '@astryxdesign/core/Icon';
import {VStack} from '@astryxdesign/core/Layout';
import {Heading} from '@astryxdesign/core/Text';
import {TreeList} from '@astryxdesign/core/TreeList';

const folder = <Icon icon={FolderIcon} size="sm" />;
const file = <Icon icon={DocumentIcon} size="sm" />;

export function FileTreeCard() {
  const [openFile, setOpenFile] = useState('app/page.tsx');

  function fileItem(path: string) {
    const name = path.split('/').pop() ?? path;
    return {
      id: path,
      label: name,
      startContent: file,
      isSelected: openFile === path,
      onClick: () => setOpenFile(path),
    };
  }

  return (
    <Card padding={5}>
      <VStack gap={3}>
        <Heading level={2}>Files</Heading>
        <TreeList
          density="compact"
          items={[
            {
              id: 'app',
              label: 'app',
              startContent: folder,
              isExpanded: true,
              children: [fileItem('app/layout.tsx'), fileItem('app/page.tsx')],
            },
            {
              id: 'components',
              label: 'components',
              startContent: folder,
              isExpanded: true,
              children: [
                {
                  id: 'components/home',
                  label: 'home',
                  startContent: folder,
                  children: [fileItem('components/home/chat-card.tsx'), fileItem('components/home/plan-card.tsx')],
                },
                fileItem('components/floating-toolbar.tsx'),
              ],
            },
            fileItem('package.json'),
          ]}
        />
      </VStack>
    </Card>
  );
}
