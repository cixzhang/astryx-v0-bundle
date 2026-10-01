import {Theme} from '@astryxdesign/core/theme';
import {butterTheme} from '@astryxdesign/theme-butter/built';
import {ThemePreviewSurface} from '../ThemePreviewSurface';

export default function ButterThemeExample() {
  return (
    <Theme theme={butterTheme}>
      <ThemePreviewSurface name="Butter" />
    </Theme>
  );
}
