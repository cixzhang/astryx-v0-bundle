'use client';

import {useMemo, useState} from 'react';
import {Avatar} from '@astryxdesign/core/Avatar';
import {Badge} from '@astryxdesign/core/Badge';
import {Card} from '@astryxdesign/core/Card';
import {HStack, VStack} from '@astryxdesign/core/Layout';
import {Section} from '@astryxdesign/core/Section';
import {StatusDot} from '@astryxdesign/core/StatusDot';
import {Tab, TabList} from '@astryxdesign/core/TabList';
import {
  Table,
  pixel,
  proportional,
  useTableSelection,
  useTableSelectionState,
  useTableSortable,
} from '@astryxdesign/core/Table';
import type {TableColumn, TablePlugin} from '@astryxdesign/core/Table';
import {Heading, Text} from '@astryxdesign/core/Text';
import {people, type Person} from './people';

type Status = 'Done' | 'In review' | 'In progress' | 'Not started';
type Priority = 'High' | 'Medium' | 'Low';

interface Task extends Record<string, unknown> {
  id: string;
  task: string;
  owner: Person;
  priority: Priority;
  status: Status;
  dueDay: number;
}

const tasks: Task[] = [
  {id: 'WF-101', task: 'Audit navigation flows', owner: people.ana, priority: 'Medium', status: 'Done', dueDay: 3},
  {id: 'WF-104', task: 'Settings page wireframe', owner: people.drew, priority: 'High', status: 'In review', dueDay: 12},
  {id: 'WF-107', task: 'Empty and error states', owner: people.jihoo, priority: 'High', status: 'In progress', dueDay: 14},
  {id: 'WF-109', task: 'Onboarding checklist', owner: people.margot, priority: 'Medium', status: 'In progress', dueDay: 16},
  {id: 'WF-112', task: 'Usability test plan', owner: people.margot, priority: 'Low', status: 'Not started', dueDay: 18},
  {id: 'WF-102', task: 'Icon set audit', owner: people.ana, priority: 'Low', status: 'Done', dueDay: 6},
];

const openTasks = tasks.filter((task) => task.status !== 'Done');
const doneTasks = tasks.filter((task) => task.status === 'Done');

const statusMeta: Record<Status, {badge: 'neutral' | 'blue' | 'green'; rank: number}> = {
  'Not started': {badge: 'neutral', rank: 0},
  'In progress': {badge: 'blue', rank: 1},
  'In review': {badge: 'green', rank: 2},
  Done: {badge: 'green', rank: 3},
};

const priorityMeta: Record<Priority, {dot: 'error' | 'warning' | 'neutral'; rank: number}> = {
  High: {dot: 'error', rank: 0},
  Medium: {dot: 'warning', rank: 1},
  Low: {dot: 'neutral', rank: 2},
};

type SortState = Array<{sortKey: string; direction: 'ascending' | 'descending'}>;

function compareTasks(a: Task, b: Task, key: string) {
  switch (key) {
    case 'task':
      return a.task.localeCompare(b.task);
    case 'owner':
      return a.owner.name.localeCompare(b.owner.name);
    case 'priority':
      return priorityMeta[a.priority].rank - priorityMeta[b.priority].rank;
    case 'status':
      return statusMeta[a.status].rank - statusMeta[b.status].rank;
    case 'due':
      return a.dueDay - b.dueDay;
    default:
      return 0;
  }
}

const columns: TableColumn<Task>[] = [
  {
    key: 'task',
    header: 'Task',
    width: proportional(2, {minWidth: 170}),
    sortable: true,
    renderCell: (item) => (
      <VStack gap={0}>
        <Text>{item.task}</Text>
        <Text type="supporting" color="secondary">
          {item.id}
        </Text>
      </VStack>
    ),
  },
  {
    key: 'owner',
    header: 'Owner',
    width: proportional(1.25, {minWidth: 140}),
    sortable: true,
    renderCell: (item) => (
      <HStack gap={2} vAlign="center">
        <Avatar name={item.owner.name} src={item.owner.src} size="sm" tooltip={false} />
        <Text maxLines={1}>{item.owner.name}</Text>
      </HStack>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    width: pixel(130),
    sortable: true,
    renderCell: (item) => <Badge label={item.status} variant={statusMeta[item.status].badge} />,
  },
  {
    key: 'priority',
    header: 'Priority',
    width: pixel(110),
    sortable: true,
    renderCell: (item) => (
      <HStack gap={2} vAlign="center">
        <StatusDot variant={priorityMeta[item.priority].dot} label={item.priority} />
        <Text>{item.priority}</Text>
      </HStack>
    ),
  },
  {
    key: 'due',
    header: 'Due',
    width: pixel(90),
    align: 'end',
    sortable: true,
    renderCell: (item) => <Text>{`Feb ${item.dueDay}`}</Text>,
  },
];

type Filter = 'open' | 'done';

export function TasksTableCard() {
  const [filter, setFilter] = useState<Filter>('open');
  const [sort, setSort] = useState<SortState>([{sortKey: 'priority', direction: 'ascending'}]);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  const rows = useMemo(() => {
    const visible = filter === 'open' ? openTasks : doneTasks;
    if (sort.length === 0) return visible;
    return [...visible].sort((a, b) => {
      for (const {sortKey, direction} of sort) {
        const result = compareTasks(a, b, sortKey);
        if (result !== 0) return direction === 'ascending' ? result : -result;
      }
      return 0;
    });
  }, [filter, sort]);

  const {selectionConfig} = useTableSelectionState({
    data: rows,
    idKey: 'id',
    selectedKeys,
    setSelectedKeys,
  });
  const selectionPlugin = useTableSelection<Task>({
    ...selectionConfig,
    getRowLabel: (item: Task) => `${item.id} ${item.task}`,
  });
  const sortablePlugin = useTableSortable<Task>({
    sort,
    onSortChange: setSort,
    allowUnsortedState: true,
  });

  const plugins = useMemo<Record<string, TablePlugin<Task>>>(
    () => ({selection: selectionPlugin, sortable: sortablePlugin}),
    [selectionPlugin, sortablePlugin],
  );

  const selectedCount = selectedKeys.size;

  return (
    <Card padding={5}>
      <VStack gap={3}>
        <HStack justify="between" vAlign="start" gap={3}>
          <Heading level={2}>Tasks</Heading>
          {selectedCount > 0 ? (
            <Text type="supporting" color="secondary">
              {selectedCount} selected
            </Text>
          ) : null}
        </HStack>
        <Section variant="transparent" padding={0} paddingInline={2} dividers={['bottom']}>
          <TabList
            value={filter}
            onChange={(value) => {
              setFilter(value as Filter);
              setSelectedKeys(new Set());
            }}
          >
            <Tab value="open" label="Open" />
            <Tab value="done" label="Done" />
          </TabList>
        </Section>
        <Table<Task> idKey="id" columns={columns} data={rows} plugins={plugins} />
      </VStack>
    </Card>
  );
}
