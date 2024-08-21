'use server';

import {
  basketItem,
  stockDbItem,
  stockVariantItem,
  stockListItem,
} from '../_components/generalControllers.ts';
import { unstable_noStore as noStore } from 'next/cache';
import mongoose from 'mongoose';
import { stockSchema, basketSchema } from '../_components/schemas.ts';
import prisma from './db.ts';

// File contains all functions that fetch DB's

// Connect to DB
mongoose.connect(process.env.MONGO_URI!);

// Create DB model
let stockModel = mongoose.models.stock || mongoose.model('stock', stockSchema);

let basketModel =
  mongoose.models.basket || mongoose.model('basket', basketSchema);

export async function fetchBasket(cookieId: string) {
  if (cookieId === '') {
    return [];
  }
  try {
    let res = await fetch(process.env.HOST_NAME + '/api/fetch-basket', {
      method: 'GET',
      cache: 'force-cache',
      next: { tags: ['basketTag'] },
      headers: {
        cookieId: cookieId,
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function fetchBasketCount(cookieId: string) {
  let data = await fetchBasket(cookieId);
  if (data.length === 0) return 0;
  let basketItemCount = 0;
  await data.basket.forEach((entry: basketItem) => {
    basketItemCount += entry.count;
  });
  return basketItemCount;
}

export async function fetchStock(): Promise<stockDbItem[]> {
  noStore();
  let response: stockDbItem[];
  try {
    response = await stockModel.find({});
    return response;
  } catch (err) {
    console.error(err + ': Failed fetching stock.');
    throw new Error(err + ': Failed fetching stock.');
  }
}

export async function fetchStockWithQuery(query: { mainCategory: string }) {
  noStore();
  try {
    return await stockModel.find(query);
  } catch (err) {
    console.error(err + ': Failed fetching stock with query.');
    throw new Error(err + ': Failed fetching stock with query.');
  }
}

export async function fetchStockWithId(productId: string) {
  noStore();
  try {
    let tempRes = await stockModel.find({ _id: productId });
    let response: stockDbItem[];
    if (tempRes != null) {
      response = tempRes;
      console.log(response);
      return response[0];
    } else {
      throw new Error('Failed fetching stock with id.');
    }
  } catch (err) {
    console.error(err + ': Failed fetching stock with id.');
    throw new Error(err + ': Failed fetching stock with id.');
  }
}

export async function compareBasket(cookieId: string) {
  let basketData = await fetchBasket(cookieId);
  let stockData = await fetchStock();
  let inStock: stockListItem[] = [];
  let outStock: stockListItem[] = [];
  // For each basket item, if stock of that item is > the basket value, add the item information to the line items to be passed to Stripe
  let inStockQuantity = 0;
  let outStockQuantity = 0;
  if (basketData.length === 0) {
    return {
      inStock: [],
      outStock: [],
      inStockQuantity: 0,
      outStockQuantity: 0,
    };
  } else {
    basketData.basket.forEach((basketItem: basketItem) => {
      stockData.forEach((stockItem: stockDbItem) => {
        if (basketItem.itemDbId === String(stockItem._id)) {
          stockItem.variant.forEach((vari) => {
            if (vari.name === basketItem.variantName) {
              if (vari.stock > basketItem.count) {
                inStock.push({
                  name: stockItem.name,
                  variant: vari.name,
                  price: vari.price,
                  description: stockItem.description,
                  quantity: basketItem.count,
                  itemDbId: basketItem.itemDbId,
                });
                inStockQuantity += basketItem.count;
              } else {
                if (vari.stock > 0) {
                  inStock.push({
                    name: stockItem.name,
                    variant: vari.name,
                    price: vari.price,
                    description: stockItem.description,
                    quantity: vari.stock,
                    itemDbId: basketItem.itemDbId,
                  });
                  inStockQuantity += vari.stock;
                }
                if (basketItem.count - vari.stock > 0) {
                  outStock.push({
                    name: stockItem.name,
                    variant: vari.name,
                    price: vari.price,
                    description: stockItem.description,
                    quantity: basketItem.count - vari.stock,
                    itemDbId: basketItem.itemDbId,
                  });
                  outStockQuantity += basketItem.count - vari.stock;
                }
              }
            }
          });
        }
      });
    });
  }
  return {
    inStock: inStock,
    outStock: outStock,
    inStockQuantity: inStockQuantity,
    outStockQuantity: outStockQuantity,
  };
}
