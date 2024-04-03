'use server';

import { revalidateTag } from 'next/cache';
import {
  addToBasket,
  removeFromBasket,
  decrementBasket,
} from './shop/_components/modifyBasket.js';
import { stockSchema, basketSchema } from './_components/schemas.js';

export async function addToBasketAndClearCache(
  cookieId,
  itemDbId,
  variantName,
  quantity = 1
) {
  'use server';
  if (cookieId == '') {
  } else {
    await addToBasket(
      {
        cookieId: cookieId,
        itemDbId: itemDbId,
        variantName: variantName,
      },
      quantity
    );
    revalidateTag('basketTag');
  }
}

export async function removeFromBasketAndClearCache(
  cookieId,
  itemDbId,
  variantName
) {
  'user server';
  if (cookieId == '') {
  } else {
    await removeFromBasket({
      cookieId: cookieId,
      itemDbId: itemDbId,
      variantName: variantName,
    });
    revalidateTag('basketTag');
  }
}

export async function decrementBasketAndClearCache(
  cookieId,
  itemDbId,
  variantName,
  num = 1
) {
  'user server';
  if (cookieId == '') {
  } else {
    await decrementBasket({
      cookieId: cookieId,
      itemDbId: itemDbId,
      variantName: variantName,
      num: num,
    });
    revalidateTag('basketTag');
  }
}

export async function reduceStock(cookieId) {
  const mongoose = require('mongoose');

  // Connect to DB
  mongoose.connect(process.env.MONGO_URI);

  let stockModel =
    mongoose.models.stock || mongoose.model('stock', stockSchema);

  let basketModel =
    mongoose.models.basket || mongoose.model('basket', basketSchema);

  let basket = await basketModel.findOne({ cookieId: cookieId }, 'basket');
  basket = basket.basket;

  // Cycle through basket item
  basket.forEach(async (basketObj) => {
    let stockVariants = await stockModel.findById(
      { _id: basketObj.itemDbId },
      'variant'
    );
    // Then cycle through stock items & find items that match
    let stockVariantsCopy = stockVariants.variant;
    stockVariantsCopy.forEach(async (variant, index) => {
      // If the items match, reduce the stock by the amount in the basket
      if (variant.name === basketObj.variantName) {
        stockVariantsCopy[index].stock -= basketObj.count;
        await stockModel.findByIdAndUpdate(
          { _id: basketObj.itemDbId },
          { $set: { variant: stockVariantsCopy } }
        );
      }
    });
  });
}
