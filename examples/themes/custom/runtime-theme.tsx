import {Theme} from '@astryxdesign/core/theme';
import {ThemePreviewSurface} from '../ThemePreviewSurface';
import {astryxV0Theme} from './astryx-v0.theme';

export default function RuntimeThemeExample() {
  return (
    <Theme theme={astryxV0Theme}>
      <ThemePreviewSurface name="Astryx v0 custom" />
    </Theme>
  );
}
