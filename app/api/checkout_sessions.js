'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { fetchStock } from '../shop/page.js';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function fetchBasket() {
  let res = await fetch(process.env.HOST_NAME + '/api/fetch-basket', {
    method: 'GET',
    cache: 'no-store',
    headers: {
      cookieId: cookies().get('id')['value'],
    },
  });

  const data = await res.json();

  if (data.length === 0) return null;

  return data.basket;
}

async function compareBasket() {
  let basketData = await fetchBasket();
  let stockData = await fetchStock();
  let testLines = [];
  // For each basket item, if stock of that item is > the basket value, add the item information to the line items to be passed to Stripe
  basketData.forEach((basketItem) => {
    stockData.forEach((stockItem) => {
      if (basketItem.itemDbId === String(stockItem._id)) {
        stockItem.variant.forEach((vari) => {
          if (vari.name === basketItem.variantName) {
            if (vari.stock > basketItem.count) {
              testLines.push({
                price_data: {
                  currency: 'gbp',
                  unit_amount: parseFloat(vari.price) * 100,
                  product_data: {
                    name: stockItem.name + ' - ' + vari.name,
                    description: stockItem.description,
                  },
                },
                quantity: basketItem.count,
              });
            } else {
              testLines.push({
                price_data: {
                  currency: 'gbp',
                  unit_amount: parseFloat(vari.price) * 100,
                  product_data: {
                    name: stockItem.name + ' - ' + vari.name,
                    description: stockItem.description,
                  },
                },
                quantity: vari.stock,
              });
            }
          }
        });
      }
    });
  });

  return testLines;
}

export default async function checkOut() {
  // Create Checkout Sessions from body params.
  // check DB for details on items in
  const session = await stripe.checkout.sessions.create({
    line_items: await compareBasket(),
    mode: 'payment',
    success_url: `${process.env.HOST_NAME}/`,
    cancel_url: `${process.env.HOST_NAME}/`,
    automatic_tax: { enabled: true },
  });
  redirect(session.url);
}
