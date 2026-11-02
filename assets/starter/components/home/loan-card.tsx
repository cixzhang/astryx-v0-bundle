'use client';

import * as stylex from '@stylexjs/stylex';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {VStack} from '@astryxdesign/core/Layout';
import {Text} from '@astryxdesign/core/Text';
import {useThemeSettings} from '@/components/app-providers';
import {cardShadow} from './card-shadow';
import {HERO_SLOT, imageSlots, shops} from './shops';

// The artwork fills the card; the copy sits on a bottom scrim so it stays legible on any theme.
const styles = stylex.create({
  card: {
    position: 'relative',
    overflow: 'hidden',
    minHeight: 440,
    borderWidth: 0,
  },
  artwork: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  scrim: {
    position: 'absolute',
    insetInline: 0,
    bottom: 0,
    backgroundImage: 'linear-gradient(to top, rgba(20, 20, 24, 0.72), rgba(20, 20, 24, 0))',
  },
  onImage: {
    color: '#ffffff',
  },
  pill: {
    borderRadius: 999,
    backgroundColor: {default: '#ffffff', ':hover': '#f1f1f3'},
  },
  pillText: {
    color: '#55555c',
  },
});

export function LoanCard() {
  const {themeName} = useThemeSettings();
  const shop = shops[themeName];
  const product = shop.products[HERO_SLOT];

  return (
    <Card padding={0} elevation="none" xstyle={[styles.card, cardShadow.raised]}>
      <img
        src={`/products/${themeName}/${imageSlots[HERO_SLOT]}.png`}
        alt={product.name}
        loading="lazy"
        {...stylex.props(styles.artwork)}
      />
      <VStack gap={5} padding={6} paddingBlockStart={8} xstyle={styles.scrim}>
        <VStack gap={1}>
          <Text size="lg" xstyle={styles.onImage}>
            {product.name}
          </Text>
          <Text as="h2" size="4xl" weight="bold" textWrap="balance" xstyle={styles.onImage}>
            {shop.heroTagline}
          </Text>
        </VStack>
        <Button label={`Shop now from ${product.price}`} size="lg" width="100%" xstyle={styles.pill}>
          <Text color="secondary" xstyle={styles.pillText}>
            Shop now from <strong>{product.price}</strong>
          </Text>
        </Button>
      </VStack>
    </Card>
  );
}
