'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function BasketOverlay(props) {
  if (props.showBasket === true) {
    return (
      <div
        onClick={props.onClick}
        className={
          'flex flex-col items-end fixed inset-0 w-screen h-screen bg-slate-500/50'
        }
      >
        <div className='flex flex-col items-center w-1/4 h-full my-2 mx-2 rounded-xl bg-white'>
          <h1 className='py-4'>Your Basket ({props.basketCount})</h1>
          <div className='w-full border-b-2'></div>
          <BasketTile
            test={'test'}
            img={'/productImages/64e63ee03c9fbcb94a36d0ce/tile.jpg'}
          />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

function BasketTile(props) {
  return (
    <div className='flex flex-row justify-between w-96 items-center bg-orange-500'>
      <Image width='80' height='80' src={props.img} />
      <div>
        <div>
          <p>item name</p>
          <p>price</p>
        </div>
        <div className='flex flex-row justify-between'>
          <p>quantity</p>
          <p>remove button</p>
        </div>
      </div>
    </div>
  );
}
