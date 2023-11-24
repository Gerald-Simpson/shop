'use client';

import { useState } from 'react';
import Image from 'next/image';
import checkOut from '../api/checkout_sessions.js';

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
              <BasketTile
                name={'test product name here'}
                variant={'Large'}
                price={'6.69'}
                quantity={'3'}
                img={'/productImages/64e63ee03c9fbcb94a36d0ce/tile.jpg'}
              />
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
    return <div></div>;
  }
}

function BasketTile(props) {
  return (
    <div className='flex flex-row justify-between w-full p-5 items-center border-b'>
      <Image width='90' height='90' src={props.img} />
      <div className='flex justify-between w-full h-full px-3'>
        <div className='flex flex-col h-full justify-start py-2'>
          <p className='text-xs font-bold underline underline-offset-1'>
            {props.name}
          </p>
          <p className='pt-1 text-xs font-bold'>{props.variant}</p>
          <p className='pt-1 text-xs'>quantityControl</p>
        </div>
        <div className='flex flex-col h-full w-auto justify-between items-end py-2'>
          <button className='text-xs hover:text-red-700'>Remove</button>
          <p>£{props.price}</p>
        </div>
      </div>
    </div>
  );
}
