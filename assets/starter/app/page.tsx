'use client';

import {useState} from 'react';
import {Badge} from '@astryxdesign/core/Badge';
import {Banner} from '@astryxdesign/core/Banner';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {Grid} from '@astryxdesign/core/Grid';
import {Layout, LayoutContent, Stack} from '@astryxdesign/core/Layout';
import {Selector} from '@astryxdesign/core/Selector';
import {Heading, Text} from '@astryxdesign/core/Text';
import {TextInput} from '@astryxdesign/core/TextInput';
import type {ThemeMode} from '@astryxdesign/core/theme';
import {Providers} from './providers';
import {themeCatalog, type ThemeName} from './theme-catalog';

const themeOptions = Object.keys(themeCatalog).map((value) => ({
  value,
  label:
    value === 'custom' ? 'Custom example' : value[0].toUpperCase() + value.slice(1),
}));
const modeOptions = ['system', 'light', 'dark'].map((value) => ({
  value,
  label: value[0].toUpperCase() + value.slice(1),
}));

export default function Home() {
  const [themeName, setThemeName] = useState<ThemeName>('neutral');
  const [mode, setMode] = useState<ThemeMode>('system');
  const [projectName, setProjectName] = useState('Astryx workspace');
  const [updatesEnabled, setUpdatesEnabled] = useState(true);
  const [savedCount, setSavedCount] = useState(0);

  return (
    <Providers theme={themeCatalog[themeName]} mode={mode}>
      <Layout
        height="auto"
        content={
          <LayoutContent padding={4}>
            <Stack direction="vertical" gap={4}>
              <Stack direction="vertical" gap={2}>
                <Badge label="v0 Design Systems 2.0" variant="info" />
                <Heading level={1}>Build with Astryx</Heading>
                <Text type="large" color="secondary">
                  This starter verifies package setup, public themes, controlled inputs,
                  responsive layout, and accessible actions before v0 adds
                  product-specific UI.
                </Text>
              </Stack>

              <Banner
                status="success"
                title="Astryx 0.6.3 is installed"
                description="The starter uses public packages and a pinned public source reference."
              />

              <Grid columns={{minWidth: 260}} gap={4}>
                <Card>
                  <Stack direction="vertical" gap={3}>
                    <Heading level={3}>Theme</Heading>
                    <Selector
                      label="Theme preset"
                      value={themeName}
                      onChange={(value) => setThemeName(value as ThemeName)}
                      options={themeOptions}
                    />
                    <Selector
                      label="Color mode"
                      value={mode}
                      onChange={(value) => setMode(value as ThemeMode)}
                      options={modeOptions}
                    />
                    <Text type="supporting" color="secondary">
                      The custom option uses defineTheme; presets use built values and
                      matching CSS.
                    </Text>
                  </Stack>
                </Card>

                <Card>
                  <Stack direction="vertical" gap={3}>
                    <Heading level={3}>Controlled form</Heading>
                    <TextInput
                      label="Project name"
                      value={projectName}
                      onChange={setProjectName}
                    />
                    <CheckboxInput
                      label="Send progress updates"
                      value={updatesEnabled}
                      onChange={setUpdatesEnabled}
                    />
                    <Button
                      label={
                        savedCount === 0 ? 'Save settings' : `Saved ${savedCount} times`
                      }
                      variant="primary"
                      onClick={() => setSavedCount((count) => count + 1)}
                    />
                  </Stack>
                </Card>

                <Card>
                  <Stack direction="vertical" gap={3}>
                    <Heading level={3}>Ready for a prompt</Heading>
                    <Text type="body">
                      Ask v0 for an official page template, a component block, or a
                      custom theme. The skill points to versioned source and exact
                      package declarations.
                    </Text>
                    <Stack direction="horizontal" gap={2}>
                      <Button label="Primary action" variant="primary" />
                      <Button label="Secondary" variant="secondary" />
                    </Stack>
                  </Stack>
                </Card>
              </Grid>
            </Stack>
          </LayoutContent>
        }
      />
    </Providers>
  );
}
