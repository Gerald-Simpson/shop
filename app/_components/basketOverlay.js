'use server';

import checkOut from '../api/checkout_sessions.js';
import { Suspense } from 'react';

export default async function BasketOverlay(props) {
  return <div></div>;
}

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

function CombinedBasketTiles(props) {
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
