'use server';

import { cookies } from 'next/headers';
import { unstable_noStore as noStore } from 'next/cache';

const mongoose = require('mongoose');

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

const stockSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  variant: {
    type: [{ name: String, price: String, stock: Number }],
  },
  price: {
    type: String,
  },
  stock: {
    type: Number,
  },
  categories: {
    type: Object,
  },
});
let stockModel = mongoose.models.stock || mongoose.model('stock', stockSchema);

const fetchStock = async function () {
  noStore();
  return await stockModel.find({});
};

async function compareBasket() {
  let basketData = await fetchBasket();
  let stockData = await fetchStock();
  let inStock = [];
  let outStock = [];
  // For each basket item, if stock of that item is > the basket value, add the item information to the line items to be passed to Stripe
  await basketData.forEach((basketItem) => {
    stockData.forEach((stockItem) => {
      if (basketItem.itemDbId === String(stockItem._id)) {
        stockItem.variant.forEach((vari) => {
          if (vari.name === basketItem.variantName) {
            if (vari.stock > basketItem.count) {
              inStock.push({
                name: stockItem.name,
                variant: vari.name,
                price: parseFloat(vari.price),
                description: stockItem.description,
                quantity: basketItem.count,
                itemDbId: basketItem.itemDbId,
              });
            } else {
              if (vari.stock > 0) {
                inStock.push({
                  name: stockItem.name,
                  variant: vari.name,
                  price: parseFloat(vari.price),
                  description: stockItem.description,
                  quantity: vari.stock,
                  itemDbId: basketItem.itemDbId,
                });
              }
              outStock.push({
                name: stockItem.name,
                variant: vari.name,
                price: parseFloat(vari.price),
                description: stockItem.description,
                quantity: basketItem.count - vari.stock,
                itemDbId: basketItem.itemDbId,
              });
            }
          }
        });
      }
    });
  });

  return [inStock, outStock];
}

/*

 
 */

export default async function CombinedBasketTiles(props) {
  let basketLists = await compareBasket();
  let inStock = basketLists[0];
  let outStock = basketLists[1];

  if (inStock.length > 0 && outStock.length === 0) {
    return inStock.map((item) => {
      return (
        <BasketTile
          name={item.name}
          variant={item.variant}
          price={item.price.toString()}
          quantity={item.quantity}
          img={'/productImages/' + item.itemDbId + '/tile.jpg'}
        />
      );
    });
  }
}
