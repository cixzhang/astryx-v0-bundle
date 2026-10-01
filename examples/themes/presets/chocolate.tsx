import {Theme} from '@astryxdesign/core/theme';
import {chocolateTheme} from '@astryxdesign/theme-chocolate/built';
import {ThemePreviewSurface} from '../ThemePreviewSurface';

export default function ChocolateThemeExample() {
  return (
    <Theme theme={chocolateTheme}>
      <ThemePreviewSurface name="Chocolate" />
    </Theme>
  );
}
