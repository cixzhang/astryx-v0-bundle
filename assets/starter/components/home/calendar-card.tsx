'use client';

import {useState} from 'react';
import * as stylex from '@stylexjs/stylex';
import {Calendar, type ISODateString} from '@astryxdesign/core/Calendar';
import {Card} from '@astryxdesign/core/Card';
import {Center} from '@astryxdesign/core/Center';
import {VStack} from '@astryxdesign/core/Layout';
import {Heading} from '@astryxdesign/core/Text';
import {ToggleButton, ToggleButtonGroup} from '@astryxdesign/core/ToggleButton';
import {spacingVars} from '@astryxdesign/core/theme/tokens.stylex';
import {useDemoState} from './demo-state';

const years = ['2026', '2027', '2028'];
const minDate: ISODateString = '2026-01-01';
const maxDate: ISODateString = '2028-12-31';
const fallbackFocus: ISODateString = '2026-11-01';

const styles = stylex.create({
  years: {
    width: '100%',
    gap: spacingVars['--spacing-2'],
  },
  year: {
    flexGrow: 1,
  },
});

export function CalendarCard() {
  const {offsiteDates, setOffsiteDates} = useDemoState();
  const [focusDate, setFocusDate] = useState(offsiteDates?.start ?? fallbackFocus);
  const focusYear = focusDate.slice(0, 4);

  const selectYear = (year: string) =>
    setFocusDate(`${year}${focusDate.slice(4, 8)}01` as ISODateString);

  return (
    <Card padding={5}>
      <VStack gap={4}>
        <Heading level={2} type="display-3" textWrap="balance">
          Event calendar
        </Heading>
        <ToggleButtonGroup
          type="single"
          label="Year"
          value={focusYear}
          onChange={(year) => year && selectYear(year)}
          xstyle={styles.years}
        >
          {years.map((year) => (
            <ToggleButton key={year} value={year} label={year} xstyle={styles.year} />
          ))}
        </ToggleButtonGroup>
        <Card variant="muted" padding={3}>
          <Center axis="horizontal">
            <Calendar
              mode="range"
              value={offsiteDates}
              onChange={setOffsiteDates}
              focusDate={focusDate}
              onFocusDateChange={setFocusDate}
              min={minDate}
              max={maxDate}
              weekStartsOn="mon"
            />
          </Center>
        </Card>
      </VStack>
    </Card>
  );
}
