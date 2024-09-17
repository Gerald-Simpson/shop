import { DateSchemaDefinition } from 'mongoose';

interface basketItem {
  id: number;
  cookieId: string;
  variantId: number;
  quantity: number;
  createdAt: Date;
}

interface stockVariant {
  id: number;
  listingId: number;
  name: string;
  price: number;
  stock: number;
  createdAt: Date;
}

interface stockListing {
  id: number;
  name: string;
  description: string;
  pictureCount: number;
  mainCategory: string;
  minPrice: number;
  inStock: boolean;
  hidden: boolean;
  createdAt: Date;
}

interface stockDbItem {
  name: string;
  variant: [
    {
      name: string;
      price: string;
      stock: number;
      _id: string;
    },
  ];
  price: string;
  description: [string];
  quantity: number;
  itemDbId: string;
  _id: string;
}

interface stockVariantItem {
  name: string;
  price: string;
  stock: number;
  _id: string;
}

interface stockListItem {
  name: string;
  variant: string;
  price: number;
  description: string[];
  quantity: number;
  variantId: number;
}

interface basketCheckoutItem {
  stockListName: string;
  variantName: string;
  combinedName: string;
  price: number;
  description: string;
  quantity: number;
  img: string;
  variantId: number;
  basketId: number;
  stockListingId: number;
}

export type {
  basketItem,
  stockDbItem,
  stockVariantItem,
  stockListItem,
  stockVariant,
  stockListing,
  basketCheckoutItem,
};
