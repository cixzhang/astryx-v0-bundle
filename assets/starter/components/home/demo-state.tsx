'use client';

import {createContext, useContext, useMemo, useState, type ReactNode} from 'react';
import type {DateRange} from '@astryxdesign/core/DateRangeInput';
import {useThemeSettings} from '@/components/app-providers';
import {MAX_QUANTITY, imageSlots, parsePrice, shops, type CartItem} from './shops';

interface DemoState {
  offsiteDates: DateRange | null;
  setOffsiteDates: (range: DateRange | null) => void;
  isOffsiteReserved: boolean;
  setIsOffsiteReserved: (reserved: boolean) => void;
  isProjectArchived: boolean;
  setIsProjectArchived: (archived: boolean) => void;
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (slot: number) => void;
  setCartQuantity: (slot: number, quantity: number) => void;
  removeFromCart: (slot: number) => void;
  clearCart: () => void;
}

const DemoStateContext = createContext<DemoState | null>(null);

export const PROJECT_NAME = 'Website redesign';

interface CartEntry {
  slot: number;
  quantity: number;
}

const initialCart: CartEntry[] = [
  {slot: 0, quantity: 1},
  {slot: 1, quantity: 1},
];

export function useDemoState() {
  const value = useContext(DemoStateContext);
  if (value == null) {
    throw new Error('useDemoState must be used inside DemoStateProvider');
  }
  return value;
}

export function DemoStateProvider({children}: {children: ReactNode}) {
  const [offsiteDates, setOffsiteDatesState] = useState<DateRange | null>({
    start: '2026-11-06',
    end: '2026-11-09',
  });
  const [isOffsiteReserved, setIsOffsiteReserved] = useState(false);
  const [isProjectArchived, setIsProjectArchived] = useState(false);
  const [cart, setCart] = useState<CartEntry[]>(initialCart);
  const {themeName} = useThemeSettings();

  const value = useMemo<DemoState>(() => {
    // Cart lines are stored by slot so switching themes swaps in that shop's product, price, and image.
    const products = shops[themeName].products;
    const cartItems: CartItem[] = cart.map(({slot, quantity}) => ({
      slot,
      quantity,
      name: products[slot].name,
      price: parsePrice(products[slot].price),
      image: `/products/${themeName}/${imageSlots[slot]}.png`,
    }));

    return {
      offsiteDates,
      setOffsiteDates: (range) => {
        setOffsiteDatesState(range);
        setIsOffsiteReserved(false);
      },
      isOffsiteReserved,
      setIsOffsiteReserved,
      isProjectArchived,
      setIsProjectArchived,
      cartItems,
      cartCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      addToCart: (slot) =>
        setCart((entries) => {
          const existing = entries.find((entry) => entry.slot === slot);
          if (existing == null) return [...entries, {slot, quantity: 1}];
          return entries.map((entry) =>
            entry.slot === slot
              ? {...entry, quantity: Math.min(MAX_QUANTITY, entry.quantity + 1)}
              : entry,
          );
        }),
      setCartQuantity: (slot, quantity) =>
        setCart((entries) =>
          entries.map((entry) =>
            entry.slot === slot
              ? {
                  ...entry,
                  quantity: Math.min(MAX_QUANTITY, Math.max(1, Math.round(quantity))),
                }
              : entry,
          ),
        ),
      removeFromCart: (slot) =>
        setCart((entries) => entries.filter((entry) => entry.slot !== slot)),
      clearCart: () => setCart([]),
    };
  }, [offsiteDates, isOffsiteReserved, isProjectArchived, cart, themeName]);

  return (
    <DemoStateContext.Provider value={value}>{children}</DemoStateContext.Provider>
  );
}
