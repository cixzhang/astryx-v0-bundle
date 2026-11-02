import {Card} from '@astryxdesign/core/Card';
import {Kbd} from '@astryxdesign/core/Kbd';
import {VStack} from '@astryxdesign/core/Layout';
import {List, ListItem} from '@astryxdesign/core/List';
import {Heading} from '@astryxdesign/core/Text';

const shortcuts = [
  {label: 'Search', keys: 'mod+k'},
  {label: 'New project', keys: 'mod+n'},
  {label: 'Toggle dark mode', keys: 'mod+j'},
  {label: 'Save', keys: 'mod+s'},
] as const;

export function ShortcutsCard() {
  return (
    <Card padding={5}>
      <VStack gap={3}>
        <Heading level={2}>Shortcuts</Heading>
        <List density="compact">
          {shortcuts.map((shortcut) => (
            <ListItem key={shortcut.label} label={shortcut.label} endContent={<Kbd keys={shortcut.keys} />} />
          ))}
        </List>
      </VStack>
    </Card>
  );
}
