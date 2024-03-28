'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { fetchStock } from '../shop/page.js';
import { revalidateTag } from 'next/cache';
import { fetchBasket } from '../_components/navBar.js';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function compareBasket() {
  let basketData = await fetchBasket();
  basketData = basketData.basket;
  let stockData = await fetchStock();
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

async function checkOut() {
  let cookieList = cookies();
  let cookieId = cookieList.get('id')['value'];
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

async function removeOutStock(inStock) {
  let cookieList = cookies();
  let cookieId = cookieList.get('id')['value'];
  const mongoose = require('mongoose');

  // Connect to DB
  mongoose.connect(process.env.MONGO_URI);

  const basketSchema = new mongoose.Schema(
    {
      cookieId: {
        type: String,
        unique: true,
      },
      basket: {
        type: [
          {
            itemDbId: String,
            variantName: String,
            count: Number,
          },
        ],
        minimize: false,
      },
      lastUpdated: {
        type: Date,
        default: Date.now,
      },
    },
    { minimize: false }
  );

  let basketModel =
    mongoose.models.basket || mongoose.model('basket', basketSchema);

  // On checkout update basket to only contain in stock items
  let newInStock = [];
  inStock.forEach((stock) => {
    newInStock.push({
      itemDbId: stock.itemDbId,
      variantName: stock.variant,
      count: stock.quantity,
    });
  });

  await basketModel
    .findOneAndUpdate({ cookieId: cookieId }, { $set: { basket: newInStock } })
    .then(revalidateTag('basketTag'));
}

export { checkOut, removeOutStock };
