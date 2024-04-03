'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { fetchBasket, fetchStock } from '../actions.js';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

let cookieList = cookies();
let cookieId = cookieList.get('id')['value'];

async function compareBasket() {
  let basketData = await fetchBasket(cookieId);
  basketData = basketData.basket;
  let stockData = await fetchStock(cookieId);
  let lineItems = [];
  // For each basket item, if stock of that item is > the basket value, add the item information to the line items to be passed to Stripe
  basketData.forEach((basketItem) => {
    stockData.forEach((stockItem) => {
      if (basketItem.itemDbId === String(stockItem._id)) {
        stockItem.variant.forEach((vari) => {
          if (vari.name === basketItem.variantName) {
            if (vari.stock > basketItem.count) {
              lineItems.push({
                price_data: {
                  currency: 'gbp',
                  unit_amount: parseFloat(vari.price) * 100,
                  product_data: {
                    name: stockItem.name + ' - ' + vari.name,
                    description: stockItem.description.join(' '),
                  },
                },
                quantity: basketItem.count,
              });
            } else if (vari.stock > 0) {
              lineItems.push({
                price_data: {
                  currency: 'gbp',
                  unit_amount: parseFloat(vari.price) * 100,
                  product_data: {
                    name: stockItem.name + ' - ' + vari.name,
                    description: stockItem.description.join(' '),
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

  return lineItems;
}

export async function checkOut() {
  // Create Checkout Sessions from body params.
  // check DB for details on items in
  const session = await stripe.checkout.sessions.create({
    line_items: await compareBasket(),
    mode: 'payment',
    success_url: `${process.env.HOST_NAME}/`,
    cancel_url: `${process.env.HOST_NAME}/`,
    automatic_tax: { enabled: true },
    client_reference_id: cookieId,
  });
  redirect(session.url);
}
