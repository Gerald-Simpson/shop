'use server';

import {
  basketItem,
  stockListItem,
  stockVariant,
  stockListing,
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
    var foundBasket: basketItem[] = await prisma.baskets.findMany({
      where: {
        cookieId: cookieId,
      },
    });
    console.log(foundBasket);
    return foundBasket;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function fetchBasketCount(cookieId: string) {
  try {
    var data = await prisma.baskets.findMany({
      where: {
        cookieId: cookieId,
      },
      select: {
        quantity: true,
      },
    });
  } catch (err) {
    console.error(err);
    return [];
  }
  if (data.length === 0) return 0;
  let basketItemCount = 0;
  data.forEach((itme: { quantity: number }) => {
    basketItemCount += itme.quantity;
  });
  return basketItemCount;
}

export async function fetchStock(): Promise<stockVariant[]> {
  noStore();
  let response: stockVariant[];
  try {
    response = await prisma.stockVariant.findMany({});
    return response;
  } catch (err) {
    console.error(err + ': Failed fetching stock.');
    throw new Error(err + ': Failed fetching stock.');
  }
}

export async function fetchStockWithCategory(
  query: string,
): Promise<stockVariant[]> {
  noStore();
  try {
    // To be replaced by relational strategy once no longer in preview in Prisma
    let stockListingId = await prisma.stockListing.findMany({
      where: { mainCategory: query },
      select: {
        id: true,
      },
    });
    let stockListingIdArr = stockListingId.map((obj) => obj.id);
    let stockList = prisma.stockVariant.findMany({
      where: {
        listingId: { in: stockListingIdArr },
      },
    });
    return stockList;
  } catch (err) {
    console.error(err + ': Failed fetching stock with category.');
    throw new Error(err + ': Failed fetching stock with category.');
  }
}

export async function fetchStockListingWithId(
  stockListingId: number,
): Promise<stockListing> {
  noStore();
  try {
    let stockList = await prisma.stockListing.findUnique({
      where: { id: stockListingId },
    });
    if (stockList === null) {
      throw new Error('No stock with that ID.');
    } else {
      return stockList;
    }
  } catch (err) {
    console.error(err + ': Failed fetching stockListing with id.');
    throw new Error(err + ': Failed fetching stockListing with id.');
  }
}

export async function fetchStockVariantsWithStockId(
  stockListingId: number,
): Promise<stockVariant[]> {
  noStore();

  try {
    let variantList = await prisma.stockVariant.findMany({
      where: { listingId: stockListingId },
    });
    if (variantList === null) {
      throw new Error('No variants with that listingId.');
    } else {
      return variantList;
    }
  } catch (err) {
    console.error(err + ': Failed fetching stockVariants with stockListingId.');
    throw new Error(
      err + ': Failed fetching stockVariants with stockListingId.',
    );
  }
}

export async function fetchStockVariantWithId(
  stockVariantId: number,
): Promise<stockVariant> {
  noStore();

  try {
    let variant = await prisma.stockVariant.findUnique({
      where: { id: stockVariantId },
    });
    if (variant === null) {
      throw new Error('No variant with that Id.');
    } else {
      return variant;
    }
  } catch (err) {
    console.error(err + ': Failed fetching stockVariant with stockVariantId.');
    throw new Error(
      err + ': Failed fetching stockVariants with stockVariantId.',
    );
  }
}

export async function compareBasket(cookieId: string) {
  let basketData = await fetchBasket(cookieId);
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
    // Can't use async function inside of forEach
    for (const basketItem of basketData) {
      let stockVariant = await fetchStockVariantWithId(basketItem.variantId);
      let stockItem = await fetchStockListingWithId(stockVariant.listingId);
      if (basketItem.quantity <= stockVariant.stock) {
        inStock.push({
          name: stockItem.name,
          variant: stockVariant.name,
          price: stockVariant.price,
          description: stockItem.description.split(';'),
          quantity: basketItem.quantity,
          variantId: basketItem.variantId,
        });
        inStockQuantity += basketItem.quantity;
      } else if (stockVariant.stock > 0) {
        inStock.push({
          name: stockItem.name,
          variant: stockVariant.name,
          price: stockVariant.price,
          description: stockItem.description.split(';'),
          quantity: stockVariant.stock,
          variantId: basketItem.variantId,
        });
        inStockQuantity += stockVariant.stock;
        outStock.push({
          name: stockItem.name,
          variant: stockVariant.name,
          price: stockVariant.price,
          description: stockItem.description.split(';'),
          quantity: basketItem.quantity - stockVariant.stock,
          variantId: basketItem.variantId,
        });
        outStockQuantity += basketItem.quantity - stockVariant.stock;
      } else if (stockVariant.stock === 0) {
        outStock.push({
          name: stockItem.name,
          variant: stockVariant.name,
          price: stockVariant.price,
          description: stockItem.description.split(';'),
          quantity: basketItem.quantity,
          variantId: basketItem.variantId,
        });
        outStockQuantity += basketItem.quantity;
      }
    }
  }
  return {
    inStock: inStock,
    outStock: outStock,
    inStockQuantity: inStockQuantity,
    outStockQuantity: outStockQuantity,
  };
}
