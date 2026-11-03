'use client';

import * as stylex from '@stylexjs/stylex';
import {EnvelopeIcon, HeartIcon, ShoppingBagIcon} from '@heroicons/react/24/outline';
import {AspectRatio} from '@astryxdesign/core/AspectRatio';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {Icon} from '@astryxdesign/core/Icon';
import {HStack, VStack} from '@astryxdesign/core/Layout';
import {Heading, Text} from '@astryxdesign/core/Text';
import {radiusVars, spacingVars} from '@astryxdesign/core/theme/tokens.stylex';
import {VisuallyHidden} from '@astryxdesign/core/VisuallyHidden';
import {useThemeSettings} from '@/components/app-providers';
import {MAKER_SLOT, imageSlots, shops} from './shops';

const styles = stylex.create({
  photo: {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    // Card re-scopes --radius-container for its children, so read the radius the Card itself resolved.
    borderRadius: `max(${radiusVars['--radius-inner']}, calc(var(--_card-radius, ${radiusVars['--radius-container']}) - ${spacingVars['--spacing-2']}))`,
  },
});

const orders = 312;
const likes = '1.2K';

export function CreatorCard() {
  const {themeName} = useThemeSettings();
  const shop = shops[themeName];
  const product = shop.products[MAKER_SLOT];

  return (
    <Card padding={2}>
      <VStack gap={0}>
        <AspectRatio ratio={1}>
          <img
            src={`/products/${themeName}/${imageSlots[MAKER_SLOT]}.png`}
            alt={`${product.name} by ${shop.maker.name}`}
            loading="lazy"
            {...stylex.props(styles.photo)}
          />
        </AspectRatio>
        <VStack gap={4} padding={4}>
          <VStack gap={2}>
            <Heading level={2}>{shop.maker.name}</Heading>
            <Text as="p" color="secondary" textWrap="pretty">
              {shop.maker.bio}
            </Text>
          </VStack>
          <HStack justify="between" vAlign="center" gap={3}>
            <HStack gap={4} vAlign="center">
              <HStack gap={1} vAlign="center">
                <Icon icon={ShoppingBagIcon} color="secondary" size="sm" />
                <Text weight="semibold">
                  {orders}
                  <VisuallyHidden> orders</VisuallyHidden>
                </Text>
              </HStack>
              <HStack gap={1} vAlign="center">
                <Icon icon={HeartIcon} color="secondary" size="sm" />
                <Text weight="semibold">
                  {likes}
                  <VisuallyHidden> likes</VisuallyHidden>
                </Text>
              </HStack>
            </HStack>
            <Button
              label="Contact"
              variant="secondary"
              endContent={<Icon icon={EnvelopeIcon} size="sm" />}
            />
          </HStack>
        </VStack>
      </VStack>
    </Card>
  );
}
