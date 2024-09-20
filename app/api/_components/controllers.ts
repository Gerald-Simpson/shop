interface lineItems {
  price_data: {
    currency: string;
    unit_amount: number;
    product_data: {
      name: string;
      description: string;
    };
  };
  quantity: number;
}

export type { lineItems };
