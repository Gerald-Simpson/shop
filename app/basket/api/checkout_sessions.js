'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function checkOut() {
  // Create Checkout Sessions from body params.
  // check DB for details on items in
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price_data: {
          currency: 'gbp',
          unit_amount: 69,
          product_data: {
            name: 'testProd',
            description: 'test product description',
          },
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.HOST_NAME}/basket`,
    cancel_url: `${process.env.HOST_NAME}/basket`,
    automatic_tax: { enabled: true },
  });
  redirect(session.url);
}
