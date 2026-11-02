import type {ThemeName} from '@/app/theme-catalog';

export interface Product {
  name: string;
  price: string;
}

export interface Shop {
  title: string;
  products: Product[];
  freeShippingAt: number;
  shippingFee: number;
  heroTagline: string;
  maker: {name: string; bio: string};
}

export const HERO_SLOT = 1;
export const MAKER_SLOT = 2;

export interface CartItem {
  slot: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// Image slots match the per-theme product shots on astryx.atmeta.com.
export const imageSlots = ['watch', 'headphones', 'backpack', 'wallet'] as const;

export const shops: Record<ThemeName, Shop> = {
  neutral: {
    title: 'Studio shop',
    freeShippingAt: 300,
    shippingFee: 9.95,
    heroTagline: 'Hear every detail',
    maker: {
      name: 'Ana Thomas',
      bio: 'Product designer behind the Canvas Backpack, focused on simplicity and usability.',
    },
    products: [
      {name: 'Minimalist Watch', price: '$189'},
      {name: 'Wireless Headphones', price: '$249'},
      {name: 'Canvas Backpack', price: '$129'},
      {name: 'Leather Wallet', price: '$59'},
    ],
  },
  stone: {
    title: 'Ceramics',
    freeShippingAt: 150,
    shippingFee: 7.95,
    heroTagline: 'Small cup, slow mornings',
    maker: {
      name: 'Daniela Gimenez',
      bio: 'Ceramicist behind the Moss Plate, glazing every piece by hand in small batches.',
    },
    products: [
      {name: 'Pedestal Bowl', price: '$68'},
      {name: 'Espresso Cup', price: '$32'},
      {name: 'Moss Plate', price: '$44'},
      {name: 'Serving Bowl', price: '$52'},
    ],
  },
  gothic: {
    title: 'Florist',
    freeShippingAt: 80,
    shippingFee: 6.95,
    heroTagline: 'Petals that linger',
    maker: {
      name: 'Gabriela Fernandez',
      bio: 'Florist behind the Ranunculus bunches, arranging seasonal stems by hand.',
    },
    products: [
      {name: 'Dried Thistle', price: '$28'},
      {name: 'Peach Rose', price: '$34'},
      {name: 'Ranunculus', price: '$22'},
      {name: 'Coral Poppy', price: '$26'},
    ],
  },
  matcha: {
    title: 'Matcha bar',
    freeShippingAt: 25,
    shippingFee: 2.95,
    heroTagline: 'Sweet meets earthy',
    maker: {
      name: 'Nam Tran',
      bio: 'Barista behind the Ube Matcha, whisking ceremonial-grade tea to order.',
    },
    products: [
      {name: 'Iced Matcha Latte', price: '$6.00'},
      {name: 'Strawberry Matcha', price: '$7.00'},
      {name: 'Ube Matcha', price: '$7.50'},
      {name: 'Vanilla Matcha', price: '$6.50'},
    ],
  },
  y2k: {
    title: 'Charm shop',
    freeShippingAt: 75,
    shippingFee: 4.95,
    heroTagline: 'Light up your ceiling',
    maker: {
      name: 'Ami Pena',
      bio: 'Charm maker behind the Holo Butterfly, inspired by early-2000s sparkle.',
    },
    products: [
      {name: 'Flip Phone', price: '$99'},
      {name: 'Glow Stars', price: '$12'},
      {name: 'Holo Butterfly', price: '$8'},
      {name: 'Jelly Heart', price: '$10'},
    ],
  },
  butter: {
    title: 'Bakery',
    freeShippingAt: 30,
    shippingFee: 3.95,
    heroTagline: 'Stacked and golden',
    maker: {
      name: 'Itai Jordaan',
      bio: 'Baker behind the Belgian Waffle, made with cultured butter and slow-rested batter.',
    },
    products: [
      {name: 'Butter Croissant', price: '$4.50'},
      {name: 'Pancakes', price: '$9.00'},
      {name: 'Belgian Waffle', price: '$8.00'},
      {name: 'Buttered Toast', price: '$5.00'},
    ],
  },
};

const TAX_RATE = 0.08;

export const MAX_QUANTITY = 10;

export function parsePrice(price: string) {
  return Number(price.replace(/[^0-9.]/g, ''));
}

export function formatMoney(amount: number) {
  return `$${amount.toFixed(2)}`;
}

export function getOrderTotals(items: CartItem[], shop: Shop) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isFreeShipping = subtotal >= shop.freeShippingAt;
  const shipping = items.length === 0 || isFreeShipping ? 0 : shop.shippingFee;
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  return {
    subtotal,
    shipping,
    tax,
    total: subtotal + shipping + tax,
    isFreeShipping,
    amountToFreeShipping: Math.max(0, shop.freeShippingAt - subtotal),
  };
}
