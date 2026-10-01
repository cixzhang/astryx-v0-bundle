import {Theme} from '@astryxdesign/core/theme';
import {gothicTheme} from '@astryxdesign/theme-gothic/built';
import {ThemePreviewSurface} from '../ThemePreviewSurface';

export default function GothicThemeExample() {
  return (
    <Theme theme={gothicTheme}>
      <ThemePreviewSurface name="Gothic" />
    </Theme>
  );
}
