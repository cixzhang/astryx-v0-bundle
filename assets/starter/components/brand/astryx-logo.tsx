import * as stylex from '@stylexjs/stylex';
import {markPath, wordmarkPaths} from './logo-paths';

const styles = stylex.create({
  logo: {
    display: 'block',
    color: 'var(--color-accent)',
    flexShrink: 0,
  },
});

export function AstryxMark({size = 40}: {size?: number}) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      fill="currentColor"
      role="img"
      aria-label="Astryx"
      {...stylex.props(styles.logo)}
    >
      <path d={markPath} />
    </svg>
  );
}

export function AstryxWordmark({height = 32}: {height?: number}) {
  return (
    <svg
      viewBox="0 0 1060 200"
      height={height}
      width={(height * 1060) / 200}
      fill="currentColor"
      role="img"
      aria-label="Astryx"
      {...stylex.props(styles.logo)}
    >
      {wordmarkPaths.map((d) => (
        <path key={d.slice(0, 24)} d={d} />
      ))}
    </svg>
  );
}
