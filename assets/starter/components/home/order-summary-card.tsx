'use client';

import {ShoppingBagIcon, TrashIcon, TruckIcon} from '@heroicons/react/24/outline';
import {Banner} from '@astryxdesign/core/Banner';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {Divider} from '@astryxdesign/core/Divider';
import {Icon} from '@astryxdesign/core/Icon';
import {HStack, StackItem, VStack} from '@astryxdesign/core/Layout';
import {NumberInput} from '@astryxdesign/core/NumberInput';
import {Heading, Text} from '@astryxdesign/core/Text';
import {Thumbnail} from '@astryxdesign/core/Thumbnail';
import {useThemeSettings} from '@/components/app-providers';
import {useDemoState} from './demo-state';
import {MAX_QUANTITY, formatMoney, getOrderTotals, shops, type CartItem} from './shops';

function LineItem({item}: {item: CartItem}) {
  const {setCartQuantity, removeFromCart} = useDemoState();

  return (
    <HStack gap={3} vAlign="start">
      <Thumbnail src={item.image} alt={item.name} />
      <StackItem size="fill">
        <VStack gap={2}>
          <HStack justify="between" vAlign="start" gap={2}>
            <StackItem size="fill">
              <VStack gap={0}>
                <Text weight="medium" maxLines={1}>
                  {item.name}
                </Text>
                <Text type="supporting" color="secondary">
                  {formatMoney(item.price)} each
                </Text>
              </VStack>
            </StackItem>
            <Text weight="semibold">{formatMoney(item.price * item.quantity)}</Text>
          </HStack>
          <HStack gap={2} vAlign="center">
            <NumberInput
              label={`Quantity of ${item.name}`}
              isLabelHidden
              value={item.quantity}
              onChange={(value) => {
                if (value != null) setCartQuantity(item.slot, value);
              }}
              min={1}
              max={MAX_QUANTITY}
              isIntegerOnly
              hasNumberSteppers
              width={96}
            />
            <Button
              label={`Remove ${item.name}`}
              variant="ghost"
              isIconOnly
              icon={<Icon icon={TrashIcon} size="sm" />}
              onClick={() => removeFromCart(item.slot)}
            />
          </HStack>
        </VStack>
      </StackItem>
    </HStack>
  );
}

function TotalRow({label, value}: {label: string; value: string}) {
  return (
    <HStack justify="between" vAlign="center">
      <Text color="secondary">{label}</Text>
      <Text>{value}</Text>
    </HStack>
  );
}

export function OrderSummaryCard() {
  const {themeName} = useThemeSettings();
  const {cartItems} = useDemoState();
  const shop = shops[themeName];
  const totals = getOrderTotals(cartItems, shop);

  return (
    <Card padding={5}>
      <VStack gap={4}>
        <Heading level={2}>Order summary</Heading>

        {cartItems.length === 0 ? (
          <VStack gap={2} hAlign="center">
            <Icon icon={ShoppingBagIcon} color="secondary" />
            <Text weight="medium">Your cart is empty</Text>
            <Text type="supporting" color="secondary">
              Add something from {shop.title} to see it here.
            </Text>
          </VStack>
        ) : (
          <>
            <VStack gap={4}>
              {cartItems.map((item) => (
                <LineItem key={item.slot} item={item} />
              ))}
            </VStack>
            <Divider />
            <VStack gap={2}>
              <TotalRow label="Subtotal" value={formatMoney(totals.subtotal)} />
              <TotalRow
                label="Shipping"
                value={totals.shipping === 0 ? 'Free' : formatMoney(totals.shipping)}
              />
              <TotalRow label="Tax" value={formatMoney(totals.tax)} />
            </VStack>
            <Divider />
            <HStack justify="between" vAlign="center">
              <Text type="large" weight="bold">
                Total
              </Text>
              <Text type="large" weight="bold">
                {formatMoney(totals.total)}
              </Text>
            </HStack>
          </>
        )}

        <Banner
          status={totals.isFreeShipping ? 'success' : 'info'}
          icon={
              <Icon
                icon={TruckIcon}
                size="md"
                color={totals.isFreeShipping ? 'success' : 'accent'}
              />
            }
          title={
            totals.isFreeShipping
              ? 'You’ve unlocked free shipping'
              : `Add ${formatMoney(totals.amountToFreeShipping)} more for free shipping`
          }
        />
      </VStack>
    </Card>
  );
}
