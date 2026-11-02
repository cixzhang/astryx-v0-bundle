'use client';

import * as stylex from '@stylexjs/stylex';
import {PlusIcon, ShoppingBagIcon} from '@heroicons/react/24/outline';
import {AspectRatio} from '@astryxdesign/core/AspectRatio';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {Carousel} from '@astryxdesign/core/Carousel';
import {Icon} from '@astryxdesign/core/Icon';
import {IconButton} from '@astryxdesign/core/IconButton';
import {HStack, VStack} from '@astryxdesign/core/Layout';
import {Heading, Text} from '@astryxdesign/core/Text';
import {useToast} from '@astryxdesign/core/Toast';
import {radiusVars} from '@astryxdesign/core/theme/tokens.stylex';
import {useThemeSettings} from '@/components/app-providers';
import {useDemoState} from './demo-state';
import {imageSlots, shops} from './shops';

const styles = stylex.create({
  tile: {
    flexShrink: 0,
  },
  image: {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: radiusVars['--radius-element'],
  },
});

export function ProductCard() {
  const {themeName} = useThemeSettings();
  const {cartCount, addToCart} = useDemoState();
  const toast = useToast();
  const shop = shops[themeName];

  return (
    <Card padding={5}>
      <VStack gap={4}>
        <HStack justify="between" vAlign="center">
          <VStack gap={1}>
            <Heading level={2}>{shop.title}</Heading>
            <Text type="supporting" color="secondary">
              New this week
            </Text>
          </VStack>
          <Button
            label={cartCount === 1 ? 'Cart, 1 item' : `Cart, ${cartCount} items`}
            variant="secondary"
            icon={<Icon icon={ShoppingBagIcon} />}
            isIconOnly={cartCount === 0}>
            {cartCount > 0 ? cartCount : undefined}
          </Button>
        </HStack>
        <Carousel gap={3} hasSnap hasButtons aria-label={`${shop.title} products`}>
          {shop.products.map((product, index) => (
            <VStack key={product.name} gap={2} width={168} xstyle={styles.tile}>
                <AspectRatio ratio={1}>
                  <img
                    src={`/products/${themeName}/${imageSlots[index]}.png`}
                    alt={product.name}
                    loading="lazy"
                    {...stylex.props(styles.image)}
                  />
                </AspectRatio>
                <HStack justify="between" vAlign="center" gap={2}>
                  <VStack gap={0}>
                    <Text weight="semibold" maxLines={1}>
                      {product.name}
                    </Text>
                    <Text type="supporting" color="secondary">
                      {product.price}
                    </Text>
                  </VStack>
                  <IconButton
                    label={`Add ${product.name} to cart`}
                    variant="secondary"
                    size="sm"
                    icon={<Icon icon={PlusIcon} />}
                    onClick={() => {
                      addToCart(index);
                      toast({body: `${product.name} added to cart`});
                    }}
                  />
                </HStack>
            </VStack>
          ))}
        </Carousel>
      </VStack>
    </Card>
  );
}
