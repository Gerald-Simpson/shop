'use server';

import {
  basketItem,
  stockListItem,
  stockVariant,
  stockListing,
  basketCheckoutItem,
} from '../_components/generalControllers.ts';
import { unstable_noStore as noStore } from 'next/cache';
import prisma from './db.ts';

// File contains all functions that fetch DB's

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
    return 0;
  }
  if (data.length === 0) return 0;
  let basketItemCount = 0;
  data.forEach((itme: { quantity: number }) => {
    basketItemCount += itme.quantity;
  });
  return basketItemCount;
}

export async function fetchBasketItem(cookieId: string, id: number) {
  if (cookieId === '') {
    return null;
  }
  try {
    var foundBasketItem: basketItem | null = await prisma.baskets.findUnique({
      where: {
        cookieId: cookieId,
        id: id,
      },
    });
    return foundBasketItem;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function fetchAllStockVariants(): Promise<stockVariant[]> {
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

export async function fetchStockVariantsWithCategory(
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

export async function fetchStockVariantsWithListingId(
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

export async function fetchAllStockListings(): Promise<stockListing[]> {
  noStore();
  try {
    let stockList = await prisma.stockListing.findMany({});
    return stockList;
  } catch (err) {
    console.error(err + ': Failed fetching all stockListing with id.');
    throw new Error(err + ': Failed fetching all stockListing with id.');
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

export async function fetchStockListingWithCategory(
  mainCategory: string,
): Promise<stockListing[]> {
  noStore();
  try {
    let stockListings = prisma.stockListing.findMany({
      where: {
        mainCategory: mainCategory,
      },
    });
    return stockListings;
  } catch (err) {
    console.error(err + ': Failed fetching stock with category.');
    throw new Error(err + ': Failed fetching stock with category.');
  }
}

export async function compareBasket(cookieId: string) {
  let basketData = await fetchBasket(cookieId);
  let inStock: basketCheckoutItem[] = [];
  let outStock: basketCheckoutItem[] = [];
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
          stockListName: stockItem.name,
          variantName: stockVariant.name,
          combinedName: stockItem.name + ' - ' + stockVariant.name,
          price: stockVariant.price,
          description: stockItem.description.split(';').join(' '),
          quantity: basketItem.quantity,
          img: '/productImages/' + stockItem.id + '/tile.jpg',
          variantId: basketItem.variantId,
          basketId: basketItem.id,
          stockListingId: stockItem.id,
        });
        inStockQuantity += basketItem.quantity;
      } else if (stockVariant.stock > 0) {
        inStock.push({
          stockListName: stockItem.name,
          variantName: stockVariant.name,
          combinedName: stockItem.name + ' - ' + stockVariant.name,
          price: stockVariant.price,
          description: stockItem.description.split(';').join(' '),
          quantity: stockVariant.stock,
          img: '/productImages/' + stockItem.id + '/tile.jpg',
          variantId: basketItem.variantId,
          basketId: basketItem.id,
          stockListingId: stockItem.id,
        });
        inStockQuantity += stockVariant.stock;
        outStock.push({
          stockListName: stockItem.name,
          variantName: stockVariant.name,
          combinedName: stockItem.name + ' - ' + stockVariant.name,
          price: stockVariant.price,
          description: stockItem.description.split(';').join(' '),
          quantity: basketItem.quantity - stockVariant.stock,
          img: '/productImages/' + stockItem.id + '/tile.jpg',
          variantId: basketItem.variantId,
          basketId: basketItem.id,
          stockListingId: stockItem.id,
        });
        outStockQuantity += basketItem.quantity - stockVariant.stock;
      } else if (stockVariant.stock === 0) {
        outStock.push({
          stockListName: stockItem.name,
          variantName: stockVariant.name,
          combinedName: stockItem.name + ' - ' + stockVariant.name,
          price: stockVariant.price,
          description: stockItem.description.split(';').join(' '),
          img: '/productImages/' + stockItem.id + '/tile.jpg',
          quantity: basketItem.quantity,
          variantId: basketItem.variantId,
          basketId: basketItem.id,
          stockListingId: stockItem.id,
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
