'use server';

import Link from 'next/link';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import Basket from './basket.js';
import { unstable_noStore as noStore } from 'next/cache';
import { decrementBasketAndClearCache } from '../actions.js';

export default async function NavBar(props) {
  let comparedBasket = compareBasket(await fetchBasket(), await fetchStock());
  return (
    <div className='w-full h-20 flex items-center justify-between font-mono text-sm bg-white px-80'>
      <Link href='/' className='text-4xl'>
        Logo
      </Link>
      <div className='flex w-2/4 justify-evenly'>
        <NavLink title={'HOME'} href={'/'} activePath={props.activePath} />
        <NavLink
          title={'PORTFOLIO'}
          href={'/portfolio'}
          activePath={props.activePath}
        />
        <NavLink title={'SHOP'} href={'/shop'} activePath={props.activePath} />
        <NavLink
          title={'COMMISSIONS'}
          href={'/commissions'}
          activePath={props.activePath}
        />
        <Basket
          comparedBasket={comparedBasket}
          basketCount={await fetchBasketCount()}
          cookieId={cookies().get('id')['value']}
        />
      </div>
    </div>
  );
}

const mongoose = require('mongoose');

//Connected to DB in layout.js

// Set DB schema
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

// Create DB model
let stockModel = mongoose.models.stock || mongoose.model('stock', stockSchema);

// Removed periodic revalidation as this revalidates every two minutes whether the website is in use or not, so results in more requests to the DB.
// Eventually change this revalidate every hour, with a tag to cause revalidation on successful user checkout
export const fetchStock = async function () {
  noStore();
  return await stockModel.find({});
};
//

/*
        <Suspense fallback={<NavElements basketCount='0' path={props.path} />}>
          <NavElements
            basketCount={await fetchBasketCount()}
            stockData={props.stockData}
            basketData={await fetchBasket()}
            path={props.path}
          />
        </Suspense>
    
    */

// Currently does not cache but will look at caching & re-validating when necessary later
async function fetchBasket() {
  let res = await fetch(process.env.HOST_NAME + '/api/fetch-basket', {
    method: 'GET',
    cache: 'no-store',
    next: { tags: ['basketTag'] },
    headers: {
      cookieId: cookies().get('id')['value'],
    },
  });
  const data = await res.json();
  return data;
}

async function basketCount(data) {
  if (data.length === 0) return ' 0';
  let basketItemCount = 0;
  await data.basket.forEach((entry) => {
    basketItemCount += entry['count'];
  });
  return basketItemCount;
}

async function fetchBasketCount() {
  let data = await fetchBasket();
  return basketCount(data);
}

async function NavLink(props) {
  if (props.href === props.activePath) {
    return (
      <Link
        id={'nav' + props.title}
        href={props.href}
        className={'text-textAccent'}
      >
        {props.title}
      </Link>
    );
  } else {
    return (
      <Link
        id={'nav' + props.title}
        href={props.href}
        className={'hover:text-textAccent'}
      >
        {props.title}
      </Link>
    );
  }
}

function compareBasket(basketData, stockData) {
  let inStock = [];
  let outStock = [];
  // For each basket item, if stock of that item is > the basket value, add the item information to the line items to be passed to Stripe
  let inStockQuantity = 0;
  let outStockQuantity = 0;
  basketData.basket.forEach((basketItem) => {
    stockData.forEach((stockItem) => {
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
        });
      }
    });
  });

  return {
    inStock: inStock,
    outStock: outStock,
    inStockQuantity: inStockQuantity,
    outStockQuantity: outStockQuantity,
  };
}
