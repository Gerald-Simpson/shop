'use server';

// File contains all functions that fetch or modify DB's

import { revalidateTag } from 'next/cache';
import { unstable_noStore as noStore } from 'next/cache';
import mongoose from 'mongoose';
import { stockSchema, basketSchema } from './_components/schemas.ts';

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

interface basketItem {
  itemDbId: string;
  variantName: string;
  count: number;
  _id: string;
}

export async function fetchBasketCount(cookieId: string) {
  let data = await fetchBasket(cookieId);
  if (data.length === 0) return ' 0';
  let basketItemCount = 0;
  await data.basket.forEach((entry: basketItem) => {
    basketItemCount += entry.count;
  });
  return basketItemCount;
}

export async function fetchStock() {
  noStore();
  try {
    let response = await stockModel.find({});
    return response;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function fetchStockWithQuery(query: { mainCategory: string }) {
  noStore();
  return await stockModel.find(query);
}

export async function fetchStockWithId(productId: string) {
  noStore();
  try {
    let response = await stockModel.find({ _id: productId });
    return response[0];
  } catch (error) {
    console.error(error);
    return [];
  }
}

interface stockListItem {
  name: string;
  variant: string;
  price: string;
  description: [string];
  quantity: number;
  itemDbId: string;
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

export async function addToBasket(
  cookieId: string,
  itemDbId: string,
  variantName: string,
  quantity = 1,
) {
  if (cookieId != '') {
    let foundBasket = await fetchBasket(cookieId);
    if (foundBasket.length === 0) {
      // Basket not created
      // Create basket & add item
      basketModel.create({
        cookieId: cookieId,
        basket: {
          itemDbId: itemDbId,
          variantName: variantName,
          count: quantity,
        },
      });
    } else {
      let basketCopy = foundBasket['basket'];
      let position = -1;
      // Basket already exists
      // Check if item already in basket
      basketCopy.forEach((obj: basketItem, index: number) => {
        if (obj.itemDbId === itemDbId && obj.variantName === variantName) {
          position = index;
          // Increment cont in basketCopy
          basketCopy[index]['count'] += quantity;
        }
      });
      if (position > -1) {
        // Replace basket with updated basketCopy
        await basketModel.findOneAndUpdate(
          { 'basket.itemDbId': itemDbId },
          {
            $set: { basket: basketCopy, lastUpdated: Date.now() },
          },
        );
      } else {
        //If not, add the item to the itemDbId object with value of quantity var
        let basketPushItem = {
          itemDbId: itemDbId,
          variantName: variantName,
          count: quantity,
        };
        await basketModel.findOneAndUpdate(
          { cookieId: cookieId },
          {
            $push: { basket: basketPushItem },
            $set: { lastUpdated: Date.now() },
          },
        );
      }
    }

    revalidateTag('basketTag');
  }
}

export async function removeFromBasket(
  cookieId: string,
  itemDbId: string,
  variantName: string,
) {
  if (cookieId != '') {
    let foundBasket = await fetchBasket(cookieId);

    if (foundBasket.length != 0) {
      let basketCopy = foundBasket['basket'];
      // Basket already exists
      // Check if item is in basket
      basketCopy.forEach((obj: basketItem, index: number) => {
        if (obj.itemDbId === itemDbId && obj.variantName === variantName) {
          // Delete obj in basketCopy
          basketCopy.splice(index, 1);
        }
      });
      // Replace basket with updated basketCopy
      await basketModel.findOneAndUpdate(
        { cookieId: cookieId },
        {
          $set: { basket: basketCopy, lastUpdated: Date.now() },
        },
      );
    }
    revalidateTag('basketTag');
  }
}

export async function decrementBasket(
  cookieId: string,
  itemDbId: string,
  variantName: string,
  num = 1,
) {
  'user server';
  if (cookieId != '') {
    // Check if cookieId is in basketDB
    let foundBasket = await fetchBasket(cookieId);
    if (foundBasket.length != 0) {
      let basketCopy = foundBasket['basket'];
      // Basket already exists
      basketCopy.forEach((obj: basketItem, index: number) => {
        if (obj.itemDbId === itemDbId && obj.variantName === variantName) {
          for (let i = 0; i < num; i++) {
            if (obj.count <= 1) {
              // Delete obj in basketCopy
              basketCopy.splice(index, 1);
            } else {
              // Decrement count value
              basketCopy[index].count -= 1;
            }
          }
        }
      });
      // Replace basket with updated basketCopy
      await basketModel.findOneAndUpdate(
        { 'basket.itemDbId': itemDbId },
        {
          $set: { basket: basketCopy, lastUpdated: Date.now() },
        },
      );
    }
    revalidateTag('basketTag');
  }
}

export async function emptyBasket(cookieId: string) {
  // Replace basket with empty array
  await basketModel.findOneAndUpdate(
    { cookieId: cookieId },
    {
      $set: { basket: [], lastUpdated: Date.now() },
    },
  );
}

export async function reduceStock(cookieId: string) {
  let basket = await basketModel.findOne({ cookieId: cookieId }, 'basket');
  basket = basket.basket;

  // Cycle through basket item
  basket.forEach(async (basketObj: basketItem) => {
    let stockVariants = await stockModel.findById(
      { _id: basketObj.itemDbId },
      'variant',
    );
    // Then cycle through stock items & find items that match
    let stockVariantsCopy = stockVariants.variant;
    stockVariantsCopy.forEach(async (variant: stockDbItem, index: number) => {
      // If the items match, reduce the stock by the amount in the basket
      if (variant.name === basketObj.variantName) {
        stockVariantsCopy[index].stock -= basketObj.count;
        await stockModel.findByIdAndUpdate(
          { _id: basketObj.itemDbId },
          { $set: { variant: stockVariantsCopy } },
        );
      }
    });
  });
}

export async function removeOutOfStock(cookieId: string) {
  let inStock: stockListItem[] = await compareBasket(cookieId).then(
    (allStock) => allStock.inStock,
  );
  // On checkout update basket to only contain in stock items
  let newInStock: Omit<basketItem, '_id'>[] = [];
  inStock.forEach((stock: stockListItem) => {
    newInStock.push({
      itemDbId: stock.itemDbId,
      variantName: stock.variant,
      count: stock.quantity,
    });
  });

  await basketModel
    .findOneAndUpdate({ cookieId: cookieId }, { $set: { basket: newInStock } })
    .then(revalidateTag('basketTag')!);
}
