'use server';
import mongoose from 'mongoose';
import { stockSchema, basketSchema } from '../_components/schemas.ts';
import {
  fetchBasket,
  compareBasket,
  fetchBasketItem,
  fetchStockVariantWithId,
} from './viewActions.tsx';
import {
  basketItem,
  stockDbItem,
  stockVariantItem,
  stockVariant,
  stockListItem,
  basketCheckoutItem,
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
      // Basket is created must add quantity to existing entry
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

export async function removeFromBasket(cookieId: string, basketId: number) {
  if (cookieId != '') {
    let foundBasketItem = await fetchBasketItem(cookieId, basketId);

    if (foundBasketItem != null) {
      let basketCopy = foundBasketItem;
      // Item is in basket db, needs to be removed
      // Replace basket with updated basketCopy
      try {
        await prisma.baskets.delete({
          where: {
            id: basketId,
            cookieId: cookieId,
          },
        });
      } catch (err) {
        console.error(
          err + ': Failed updating basket in removeFromBasket function.',
        );
        throw new Error(
          err + ': Failed updating basket in removeFromBasket function.',
        );
      }
    }
  }
  revalidateTag('basketTag');
}

export async function decrementBasketById(
  cookieId: string,
  id: number,
  num = 1,
) {
  if (cookieId != '') {
    // Check if cookieId is in basketDB
    let foundBasketItem = await fetchBasketItem(cookieId, id);
    if (foundBasketItem != null) {
      let basketCopy = foundBasketItem;
      // Basket item is present
      try {
        // If num >= basket quantity, remove db entry
        if (num >= foundBasketItem.quantity) {
          await prisma.baskets.delete({
            where: {
              cookieId: cookieId,
              id: id,
            },
          });
        } else if (num < foundBasketItem.quantity) {
          // If num < basket quantity, decrement number in basket db entry
          await prisma.baskets.update({
            where: {
              cookieId: cookieId,
              id: id,
            },
            data: {
              quantity: foundBasketItem.quantity - num,
            },
          });
        }
      } catch (err) {
        console.error(
          err + ': Failed updating basket in decrementBasket function.',
        );
        throw new Error(
          err + ': Failed updating basket in decrementBasket function.',
        );
      }
    }
  }
  revalidateTag('basketTag');
}

export async function decrementBasketByVariantId(
  cookieId: string,
  variantId: number,
  num = 1,
) {
  if (cookieId != '') {
    // Check if cookieId is in basketDB
    let foundBasketItem = await prisma.baskets.findFirst({
      where: {
        cookieId: cookieId,
        variantId: variantId,
      },
    });
    if (foundBasketItem != null) {
      // Basket item is present
      try {
        // If num >= basket quantity, remove db entry
        if (num >= foundBasketItem.quantity) {
          await prisma.baskets.deleteMany({
            where: {
              cookieId: cookieId,
              variantId: variantId,
            },
          });
        } else if (num < foundBasketItem.quantity) {
          // If num < basket quantity, decrement number in basket db entry
          await prisma.baskets.updateMany({
            where: {
              cookieId: cookieId,
              variantId: variantId,
            },
            data: {
              quantity: foundBasketItem.quantity - num,
            },
          });
        }
      } catch (err) {
        console.error(
          err + ': Failed updating basket in decrementBasket function.',
        );
        throw new Error(
          err + ': Failed updating basket in decrementBasket function.',
        );
      }
    }
  }
  revalidateTag('basketTag');
}

export async function emptyBasket(cookieId: string) {
  try {
    await prisma.baskets.deleteMany({
      where: {
        cookieId: cookieId,
      },
    });
  } catch (err) {
    console.error(err + ': Failed updating basket in emptyBasket function.');
    throw new Error(err + ': Failed updating basket in emptyBasket function.');
  }
}

export async function reduceStock(cookieId: string) {
  let basket = await fetchBasket(cookieId);

  // Cycle through basket items
  basket.forEach(async (basketObj: basketItem) => {
    try {
      // Find related stockVariant
      var stockVarItem: stockVariant = await fetchStockVariantWithId(
        basketObj.variantId,
      );
      // Check that there is enough in stock
      if (stockVarItem.stock < basketObj.quantity) {
        console.error(
          'Quantity in basket greater than stock in reduceStock function.',
        );
        throw new Error(
          'Quantity in basket greater than stock in reduceStock function.',
        );
      } else {
        // Decrement stock quantity by amount in basket
        await prisma.stockVariant
          .update({
            where: {
              id: stockVarItem.id,
            },
            data: {
              stock: stockVarItem.stock - basketObj.quantity,
            },
          })
          .then(() => {
            if (stockVarItem.stock - basketObj.quantity < 1) {
              checkStockListingQuantity(stockVarItem.listingId);
            }
          });
      }
    } catch (err) {
      console.error(
        err +
          ': Failed fetching and updating stock variants in reduceStock function.',
      );
      throw new Error(
        err +
          ': Failed fetching and updating stock variants in reduceStock function.',
      );
    }
  });
}

export async function checkStockListingQuantity(stockListingId: number) {
  let variantItems = await prisma.stockVariant.findMany({
    where: {
      listingId: stockListingId,
    },
  });
  // If every variant is out of stock, update the stockListing to be out of stock
  if (variantItems.every((variant) => variant.stock === 0)) {
    await prisma.stockListing.update({
      where: {
        id: stockListingId,
      },
      data: {
        inStock: false,
      },
    });
  } else {
    await prisma.stockListing.update({
      where: {
        id: stockListingId,
      },
      data: {
        inStock: true,
      },
    });
  }
}

export async function removeOutOfStock(cookieId: string) {
  // On checkout update basket to only contain in stock items
  try {
    let outStock: basketCheckoutItem[] = await compareBasket(cookieId).then(
      (allStock) => allStock.outStock,
    );
    outStock.forEach(
      async (variant) => {
        await decrementBasketByVariantId(
          cookieId,
          variant.variantId,
          variant.quantity,
        );
      },
      function () {
        revalidateTag('basketTag');
      },
    );
  } catch (err) {
    console.error(
      err + ': Failed updating basket in removeOutOfStock function.',
    );
    throw new Error(
      err + ': Failed updating basket in removeOutOfStock function.',
    );
  }
}
