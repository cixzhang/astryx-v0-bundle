import {Theme} from '@astryxdesign/core/theme';
import {matchaTheme} from '@astryxdesign/theme-matcha/built';
import {ThemePreviewSurface} from '../ThemePreviewSurface';

export default function MatchaThemeExample() {
  return (
    <Theme theme={matchaTheme}>
      <ThemePreviewSurface name="Matcha" />
    </Theme>
  );
}
