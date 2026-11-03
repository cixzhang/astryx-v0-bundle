'use client';

import {useState, type FormEvent} from 'react';
import {LockClosedIcon} from '@heroicons/react/24/outline';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {DateInput, type DateInputProps} from '@astryxdesign/core/DateInput';
import {Grid} from '@astryxdesign/core/Grid';
import {Icon} from '@astryxdesign/core/Icon';
import {HStack, VStack} from '@astryxdesign/core/Layout';
import {Heading, Text} from '@astryxdesign/core/Text';
import {TextInput} from '@astryxdesign/core/TextInput';
import {useToast} from '@astryxdesign/core/Toast';
import {useThemeSettings} from '@/components/app-providers';
import {useDemoState} from './demo-state';
import {formatMoney, getOrderTotals, shops} from './shops';

const emptyForm = {
  email: '',
  address: '',
  city: '',
  zip: '',
  cardNumber: '',
  expiry: '',
  cvc: '',
};

type FieldName = keyof typeof emptyForm;
type ISODateString = NonNullable<DateInputProps['value']>;

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function toISODate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}` as ISODateString;
}

function isWeekday(date: Date) {
  const day = date.getDay();
  return day !== 0 && day !== 6;
}

function nextWeekday(date: Date) {
  let next = date;
  while (!isWeekday(next)) next = addDays(next, 1);
  return next;
}

function formatDay(value: ISODateString) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export function CheckoutCard() {
  const {themeName} = useThemeSettings();
  const {cartItems, clearCart} = useDemoState();
  const toast = useToast();
  const [form, setForm] = useState(emptyForm);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [earliestDelivery] = useState(() =>
    toISODate(nextWeekday(addDays(new Date(), 3))),
  );
  const [deliveryDate, setDeliveryDate] = useState<ISODateString | undefined>(
    earliestDelivery,
  );
  const {total} = getOrderTotals(cartItems, shops[themeName]);
  const isCartEmpty = cartItems.length === 0;

  const missing = (Object.keys(form) as FieldName[]).filter(
    (name) => !form[name].trim(),
  );

  function field(name: FieldName) {
    return {
      value: form[name],
      onChange: (value: string) => setForm((current) => ({...current, [name]: value})),
      status:
        hasSubmitted && missing.includes(name)
          ? {type: 'error' as const, message: 'Required'}
          : undefined,
    };
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHasSubmitted(true);
    if (isCartEmpty || missing.length > 0 || !deliveryDate) return;
    toast({
      body: `Order placed — ${formatMoney(total)} charged, arriving ${formatDay(deliveryDate)}`,
    });
    clearCart();
    setForm(emptyForm);
    setDeliveryDate(earliestDelivery);
    setHasSubmitted(false);
  }

  return (
    <Card padding={5}>
      <form onSubmit={handleSubmit} noValidate>
        <VStack gap={4}>
          <VStack gap={1}>
            <Heading level={2}>Checkout</Heading>
            <Text type="supporting" color="secondary">
              Schedule delivery for any weekday
            </Text>
          </VStack>

          <TextInput
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            {...field('email')}
          />
          <TextInput
            label="Address"
            autoComplete="street-address"
            placeholder="123 Main Street"
            {...field('address')}
          />
          <Grid columns={2} gap={3}>
            <TextInput
              label="City"
              autoComplete="address-level2"
              placeholder="New York"
              {...field('city')}
            />
            <TextInput
              label="ZIP code"
              autoComplete="postal-code"
              placeholder="10001"
              {...field('zip')}
            />
          </Grid>
          <DateInput
            label="Delivery date"
            placeholder="Choose a date"
            min={earliestDelivery}
            dateConstraints={[isWeekday]}
            hasClear
            value={deliveryDate}
            onChange={setDeliveryDate}
            status={
              hasSubmitted && !deliveryDate
                ? {type: 'error', message: 'Choose a delivery date'}
                : undefined
            }
          />
          <TextInput
            label="Card number"
            autoComplete="cc-number"
            placeholder="1234 5678 9012 3456"
            {...field('cardNumber')}
          />
          <Grid columns={2} gap={3}>
            <TextInput
              label="Expiry"
              autoComplete="cc-exp"
              placeholder="MM / YY"
              {...field('expiry')}
            />
            <TextInput
              label="CVC"
              autoComplete="cc-csc"
              placeholder="123"
              {...field('cvc')}
            />
          </Grid>

          <VStack gap={2}>
            <Button
              type="submit"
              label={
                isCartEmpty ? 'Add items to check out' : `Pay ${formatMoney(total)}`
              }
              variant="primary"
              size="lg"
              isDisabled={isCartEmpty}
            />
            <HStack gap={1} justify="center" vAlign="center">
              <Icon icon={LockClosedIcon} size="sm" color="secondary" />
              <Text type="supporting" color="secondary">
                Payments are encrypted and secure
              </Text>
            </HStack>
          </VStack>
        </VStack>
      </form>
    </Card>
  );
}
