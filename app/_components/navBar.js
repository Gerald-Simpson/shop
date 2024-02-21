'use server';

import Link from 'next/link';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import Basket from './basket.js';
import { unstable_noStore as noStore } from 'next/cache';
import { decrementBasketAndClearCache } from '../actions.js';
import NavBut from './navClient.js';
import Image from 'next/image';

export default async function NavBar(props) {
  let comparedBasket = compareBasket(await fetchBasket(), await fetchStock());
  let cookieId = '';
  let cookieList = cookies();
  if (cookieList.has('id')) {
    cookieId = cookies().get('id').value;
  }
  return (
    <div className='w-screen h-16 flex flex-col items-center bg-backgroundBlue'>
      <div className='w-full h-16 max-w-[1280px] flex items-center justify-between font-mono text-sm'>
        <NavBut className='md:hidden' activePath={props.activePath} />
        <div className='w-[40px] h-[40px] relative md:inset-x-4'>
          <Link href='/' className='text-4xl'>
            <Image src={'/logo.png'} alt='Logo for coffee shop.' fill={true} />
          </Link>
        </div>
        <div className='flex justify-end md:justify-around md:w-5/6 lg:w-4/6 px-4'>
          <NavLink title={'HOME'} href={'/'} activePath={props.activePath} />
          <NavLink
            title={'SHOP ALL'}
            href={'/shop'}
            activePath={props.activePath}
          />
          <NavLink
            title={'ESPRESSO'}
            href={'/shop/espresso'}
            activePath={props.activePath}
          />
          <NavLink
            title={'GRINDERS'}
            href={'/shop/grinders'}
            activePath={props.activePath}
          />
          <NavLink
            title={'BREWERS'}
            href={'/shop/brewers'}
            activePath={props.activePath}
          />
          <NavLink
            title={'ACCESSORIES'}
            href={'/shop/accessories'}
            activePath={props.activePath}
          />
          <Basket
            comparedBasket={comparedBasket}
            basketCount={await fetchBasketCount()}
            cookieId={cookieId}
          />
        </div>
      </div>
    </div>
  );
}

const mongoose = require('mongoose');

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

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
  mainCategory: {
    type: String,
  },
  pictureCount: {
    type: Number,
  },
});

// Create DB model
let stockModel = mongoose.models.stock || mongoose.model('stock', stockSchema);

// Removed periodic revalidation as this revalidates every two minutes whether the website is in use or not, so results in more requests to the DB.
// Eventually change this revalidate every hour, with a tag to cause revalidation on successful user checkout
export const fetchStock = async function () {
  noStore();
  try {
    let response = await stockModel.find({});
    return response;
  } catch (err) {
    console.error(err);
    return [];
  }
};
//

// Currently does not cache but will look at caching & re-validating when necessary later
async function fetchBasket() {
  let cookieList = cookies();
  if (!cookieList.has('id')) {
    return [];
  }
  try {
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
  } catch (err) {
    console.error(err);
    return [];
  }
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
        className={'text-textAccent select-none hidden md:flex'}
      >
        {props.title}
      </Link>
    );
  } else {
    return (
      <Link
        id={'nav' + props.title}
        href={props.href}
        className={'hover:text-textAccent select-none hidden md:flex'}
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
  if (basketData.length === 0) {
    return {
      inStock: [],
      outStock: [],
      inStockQuantity: 0,
      outStockQuantity: 0,
    };
  } else {
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
  }
  return {
    inStock: inStock,
    outStock: outStock,
    inStockQuantity: inStockQuantity,
    outStockQuantity: outStockQuantity,
  };
}
