interface basketItem {
  itemDbId: string;
  variantName: string;
  count: number;
  _id: string;
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
  price: string;
  description: [string];
  quantity: number;
  itemDbId: string;
}

export type { basketItem, stockDbItem, stockVariantItem, stockListItem };
