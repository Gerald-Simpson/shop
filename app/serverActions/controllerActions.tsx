'use server';
import mongoose from 'mongoose';
import { stockSchema, basketSchema } from '../_components/schemas.ts';
import { fetchBasket, compareBasket } from './viewActions.tsx';
import {
  basketItem,
  stockDbItem,
  stockVariantItem,
  stockListItem,
} from '../_components/generalControllers.ts';
import { revalidateTag } from 'next/cache';
import prisma from './db.ts';

// File contains all functions that modify DB's

let stockModel = mongoose.models.stock || mongoose.model('stock', stockSchema);

let basketModel =
  mongoose.models.basket || mongoose.model('basket', basketSchema);

export async function addToBasket(
  cookieId: string,
  variantId: number,
  quantity = 1,
) {
  if (cookieId != '') {
    try {
      var foundBasket = await prisma.baskets.findFirst({
        where: {
          cookieId: cookieId,
          variantId: variantId,
        },
      });
    } catch (err) {
      console.error(err + ': Failed creating new basket.');
      throw new Error(err + ': Failed creating new basket.');
    }
    if (foundBasket == null) {
      // Basket not created for this variant & cookieId yet
      // Create basket entry for variant
      try {
        const basketItem = await prisma.baskets.create({
          data: {
            cookieId: cookieId,
            variantId: variantId,
            quantity: quantity,
          },
        });
      } catch (err) {
        console.error(err + ': Failed creating new basket.');
        throw new Error(err + ': Failed creating new basket.');
      }
    } else {
      // Bakset is created must add quantity to existing entry
      try {
        let updatedBasket = await prisma.baskets.update({
          where: {
            id: foundBasket.id,
          },
          data: {
            quantity: foundBasket.quantity + quantity,
          },
        });
      } catch (err) {
        console.error(
          err + ': Failed updating basket in addToBasket function.',
        );
        throw new Error(
          err + ': Failed updating basket in addToBasket function.',
        );
      }
    }
  }
  revalidateTag('basketTag');
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
      try {
        await basketModel.findOneAndUpdate(
          { cookieId: cookieId },
          {
            $set: { basket: basketCopy, lastUpdated: Date.now() },
          },
        );
      } catch (err) {
        console.error(
          err + ': Failed updating basket in removeFromBasket function.',
        );
        throw new Error(
          err + ': Failed updating basket in removeFromBasket function.',
        );
      }
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
      try {
        await basketModel.findOneAndUpdate(
          { cookieId: cookieId },
          {
            $set: { basket: basketCopy, lastUpdated: Date.now() },
          },
        );
      } catch (err) {
        console.error(
          err + ': Failed updating basket in decrementBasket function.',
        );
        throw new Error(
          err + ': Failed updating basket in decrementBasket function.',
        );
      }
    }
    revalidateTag('basketTag');
  }
}

export async function emptyBasket(cookieId: string) {
  // Replace basket with empty array
  try {
    await basketModel.findOneAndUpdate(
      { cookieId: cookieId },
      {
        $set: { basket: [], lastUpdated: Date.now() },
      },
    );
  } catch (err) {
    console.error(err + ': Failed updating basket in emptyBasket function.');
    throw new Error(err + ': Failed updating basket in emptyBasket function.');
  }
}

export async function reduceStock(cookieId: string) {
  let basket = await fetchBasket(cookieId);
  basket = basket.basket;

  // Cycle through basket item
  basket.forEach(async (basketObj: basketItem) => {
    let stockVariants: stockDbItem;
    try {
      let tempRes = await stockModel.findById(
        { _id: basketObj.itemDbId },
        'variant',
      );
      if (tempRes != null) {
        stockVariants = tempRes;
      } else {
        throw new Error(
          'Failed fetching stock variants in reduceStock function.',
        );
      }
    } catch (err) {
      console.error(
        err + ': Failed fetching stock variants in reduceStock function.',
      );
      throw new Error(
        err + ': Failed fetching stock variants in reduceStock function.',
      );
    }

    // Then cycle through stock items & find items that match
    let stockVariantsCopy: stockVariantItem[] = stockVariants.variant;
    stockVariantsCopy.forEach(
      async (variant: stockVariantItem, index: number) => {
        // If the items match, reduce the stock by the amount in the basket
        if (variant.name === basketObj.variantName) {
          stockVariantsCopy[index].stock -= basketObj.count;
          try {
            await stockModel.findByIdAndUpdate(
              { _id: basketObj.itemDbId },
              { $set: { variant: stockVariantsCopy } },
            );
          } catch (err) {
            console.error(
              err + ': Failed updating basket in emptyBasket function.',
            );
            throw new Error(
              err + ': Failed updating basket in emptyBasket function.',
            );
          }
        }
      },
    );
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

  try {
    await basketModel
      .findOneAndUpdate(
        { cookieId: cookieId },
        { $set: { basket: newInStock } },
      )
      .then(revalidateTag('basketTag')!);
  } catch (err) {
    console.error(
      err + ': Failed updating basket in removeOutOfStock function.',
    );
    throw new Error(
      err + ': Failed updating basket in removeOutOfStock function.',
    );
  }
}
