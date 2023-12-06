'use client';

import { useState } from 'react';
import Image from 'next/image';
import checkOut from '../api/checkout_sessions.js';
//import CombinedBasketTiles from './basketFetch.js';
import { Suspense } from 'react';

// Will need to save lower resolution version of images as Next Image won't work if images aren't loaded at build / page load
function BasketTile(props) {
  return (
    <div className='flex flex-row justify-between w-full p-5 items-center border-b'>
      <img width='90' height='90' src={props.img} />
      <div className='flex justify-between w-full h-full px-3'>
        <div className='flex flex-col h-full justify-start py-2'>
          <p className='text-xs font-bold underline underline-offset-1'>
            {props.name}
          </p>
          <p className='pt-1 text-xs font-bold'>{props.variant}</p>
          <p className='pt-1 text-xs'>{props.quantity}</p>
        </div>
        <div className='flex flex-col h-full w-auto justify-between items-end py-2'>
          <button className='text-xs hover:text-red-700'>Remove</button>
          <p>£{props.price}</p>
        </div>
      </div>
    </div>
  );
}

function compareBasket(basketData, stockData) {
  let inStock = [];
  let outStock = [];
  // For each basket item, if stock of that item is > the basket value, add the item information to the line items to be passed to Stripe
  basketData.forEach((basketItem) => {
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

function CombinedBasketTiles(props) {
  console.log('basketData');
  console.log(props.basketData);
  console.log('stockData');
  console.log(props.stockData);
  let basketLists = compareBasket(props.basketData, props.stockData);
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

export default function BasketOverlay(props) {
  const handleChildClick = (e) => {
    e.stopPropagation();
  };

  if (props.showBasket === true) {
    return (
      <div
        onClick={props.onClick}
        className={
          'flex flex-col items-end fixed inset-0 w-screen h-screen z-50 bg-slate-500/50'
        }
      >
        <div
          onClick={(e) => handleChildClick(e)}
          className='flex flex-col items-center justify-between w-1/4 h-full my-2 mx-2 rounded-xl bg-white'
        >
          <div className='flex flex-col items-center w-full'>
            <div className='flex flex-row w-full px-5 justify-between'>
              <div></div>
              <h1 className='my-4'>Your Basket</h1>
              <button
                className='text-lg hover:text-red-700'
                onClick={props.onClick}
              >
                &#x2715;
              </button>
            </div>
            <div className='flex flex-col w-full h-auto border-t'>
              <Suspense fallback={<p>Loading...</p>}>
                <CombinedBasketTiles
                  basketData={props.basketData}
                  stockData={props.stockData}
                />
              </Suspense>
            </div>
          </div>
          <div className='flex flex-col items-center w-full border-t h-24'>
            <div className='w-full h-auto flex justify-between px-4 pt-4 pb-1'>
              <h5 className='text-xs'>Subtotal ({props.basketCount} Items)</h5>
              <h5 className='text-xs'>£pricecount</h5>
            </div>
            <form className='w-full h-full px-4' action={checkOut}>
              <button className='bg-blue-500 w-full h-10 rounded-md'>
                Checkout
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return;
  }
}
