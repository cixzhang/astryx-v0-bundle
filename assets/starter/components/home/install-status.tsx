'use client';

import {Text} from '@astryxdesign/core/Text';
import {formatThemeName} from '@/app/theme-catalog';
import {useThemeSettings} from '@/components/app-providers';

export function InstallStatus({version}: {version: string}) {
  const {themeName} = useThemeSettings();

  return (
    <Text size="sm" color="secondary" aria-live="polite">
      {`Astryx ${version} installed · ${formatThemeName(themeName)} theme`}
    </Text>
  );
}
