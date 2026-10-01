import {Theme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral/built';
import {ThemePreviewSurface} from '../ThemePreviewSurface';

export default function NeutralThemeExample() {
  return (
    <Theme theme={neutralTheme}>
      <ThemePreviewSurface name="Neutral" />
    </Theme>
  );
}
