'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import {
  fetchBasket,
  fetchStockVariantWithId,
  fetchStockListingWithId,
} from '../serverActions/viewActions.tsx';
import { lineItems } from './_components/controllers.ts';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

let cookieList = cookies();
let cookieId = cookieList.get('id')!.value;

async function compareBasketCheckout() {
  let basketData = await fetchBasket(cookieId);
  let lineItems: lineItems[] = [];
  for (const basketItem of basketData) {
    let stockVariant = await fetchStockVariantWithId(basketItem.variantId);
    let stockItem = await fetchStockListingWithId(stockVariant.listingId);
    if (basketItem.quantity <= stockVariant.stock) {
      lineItems.push({
        price_data: {
          currency: 'gbp',
          unit_amount: stockVariant.price * 100,
          product_data: {
            name: stockItem.name + ' - ' + stockVariant.name,
            description: stockItem.description.split(';').join(' '),
          },
        },
        quantity: basketItem.quantity,
      });
    } else if (stockVariant.stock > 0) {
      lineItems.push({
        price_data: {
          currency: 'gbp',
          unit_amount: stockVariant.price * 100,
          product_data: {
            name: stockItem.name + ' - ' + stockVariant.name,
            description: stockItem.description.split(';').join(' '),
          },
        },
        quantity: stockVariant.stock,
      });
    }
  }

  return lineItems;
}

export async function checkOut() {
  // Create Checkout Sessions from body params.
  // check DB for details on items in
  const session = await stripe.checkout.sessions.create({
    line_items: await compareBasketCheckout(),
    mode: 'payment',
    success_url: `${process.env.HOST_NAME}/`,
    cancel_url: `${process.env.HOST_NAME}/`,
    automatic_tax: { enabled: true },
    client_reference_id: cookieId,
  });
  redirect(session.url);
}
