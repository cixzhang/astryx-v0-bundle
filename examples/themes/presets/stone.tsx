import {Theme} from '@astryxdesign/core/theme';
import {stoneTheme} from '@astryxdesign/theme-stone/built';
import {ThemePreviewSurface} from '../ThemePreviewSurface';

export default function StoneThemeExample() {
  return (
    <Theme theme={stoneTheme}>
      <ThemePreviewSurface name="Stone" />
    </Theme>
  );
}
