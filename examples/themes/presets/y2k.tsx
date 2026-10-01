import {Theme} from '@astryxdesign/core/theme';
import {y2kTheme} from '@astryxdesign/theme-y2k/built';
import {ThemePreviewSurface} from '../ThemePreviewSurface';

export default function Y2kThemeExample() {
  return (
    <Theme theme={y2kTheme}>
      <ThemePreviewSurface name="Y2K" />
    </Theme>
  );
}
