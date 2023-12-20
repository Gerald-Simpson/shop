'use client';

//import { toggleBasket } from './navButtonAction.js';
import { useState } from 'react';
import { Suspense } from 'react';
import checkOut from '../api/checkout_sessions.js';
import { removeFromBasketAndClearCache } from '../actions.js';
import {
  addToBasketAndClearCache,
  decrementBasketAndClearCache,
} from '../actions.js';

export default function Basket(props) {
  const [showBasket, basketChange] = useState(false);
  const toggleBasket = () => basketChange(!showBasket);
  const handleChildClick = (e) => {
    e.stopPropagation();
  };
  if (showBasket === false) {
    return (
      <button
        id={'navBasket'}
        className={'hover:text-textAccent'}
        onClick={() => toggleBasket()}
      >
        BASKET {props.basketCount}
      </button>
    );
  } else {
    return (
      <div>
        <button
          id={'navBasket'}
          className={'hover:text-textAccent'}
          onClick={() => toggleBasket()}
        >
          BASKET {props.basketCount}
        </button>
        <div
          onClick={() => toggleBasket()}
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
                  onClick={() => toggleBasket()}
                >
                  &#x2715;
                </button>
              </div>
              <div className='flex flex-col w-full h-auto border-t'>
                <Suspense fallback={<p>Loading...</p>}>
                  <CombinedBasketTiles
                    comparedBasket={props.comparedBasket}
                    cookieId={props.cookieId}
                  />
                </Suspense>
              </div>
            </div>
            <div className='flex flex-col items-center w-full border-t h-24'>
              <div className='w-full h-auto flex justify-between px-4 pt-4 pb-1'>
                <h5 className='text-xs'>
                  Subtotal ({props.basketCount} Items)
                </h5>
                <h5 className='text-xs'>
                  £{priceCount(props.comparedBasket[0])}
                </h5>
              </div>
              <form className='w-full h-full px-4' action={checkOut}>
                <button className='bg-blue-500 w-full h-10 rounded-md'>
                  Checkout
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function CombinedBasketTiles(props) {
  let inStock = props.comparedBasket[0];
  let outStock = props.comparedBasket[1];

  if (inStock.length > 0 && outStock.length === 0) {
    return inStock.map((item) => {
      return (
        <BasketTile
          name={item.name}
          variantName={item.variant}
          price={item.price.toString()}
          quantity={item.quantity}
          img={'/productImages/' + item.itemDbId + '/tile.jpg'}
          cookieId={props.cookieId}
          itemDbId={item.itemDbId}
        />
      );
    });
  }
}

function BasketTile(props) {
  return (
    <div className='flex flex-row justify-between w-full p-5 items-center border-b'>
      <img width='90' height='90' src={props.img} />
      <div className='flex justify-between w-full h-full px-3'>
        <div className='flex flex-col h-full justify-start py-2'>
          <p className='text-xs font-bold underline underline-offset-1'>
            {props.name}
          </p>
          <p className='pt-2 text-xs font-bold'>{props.variantName}</p>
          <div className='pt-2'>
            <QuantityControl
              quantity={props.quantity}
              cookieId={props.cookieId}
              itemDbId={props.itemDbId}
              variantName={props.variantName}
            />
          </div>
        </div>
        <div className='flex flex-col h-full w-auto justify-between items-end py-2'>
          <button
            onClick={() => {
              removeFromBasketAndClearCache(
                props.cookieId,
                props.itemDbId,
                props.variantName
              );
            }}
            className='text-xs hover:text-red-700'
          >
            Remove
          </button>
          <p>£{(props.price * props.quantity).toFixed(2).toString()}</p>
        </div>
      </div>
    </div>
  );
}

function priceCount(inStock) {
  if (inStock.length === 0) return '0.00';
  let basketPriceCount = 0.0;
  inStock.forEach((entry) => {
    basketPriceCount += entry.quantity * entry.price;
  });
  return basketPriceCount.toFixed(2).toString();
}

function QuantityControl(props) {
  return (
    <div className='flex justify-evenly items-center w-16 border'>
      <div className='flex w-full justify-center hover:bg-slate-200'>
        <button
          onClick={() => {
            decrementBasketAndClearCache(
              props.cookieId,
              props.itemDbId,
              props.variantName
            );
          }}
          className='text-l'
        >
          &#x2212;
        </button>
      </div>
      <div className='flex w-full justify-center text-center'>
        <p className='text-xs'>{props.quantity}</p>
      </div>
      <div className='flex w-full justify-center hover:bg-slate-200'>
        <button
          onClick={() => {
            addToBasketAndClearCache(
              props.cookieId,
              props.itemDbId,
              props.variantName
            );
          }}
          className='text-l w-full'
        >
          &#x2B;
        </button>
      </div>
    </div>
  );
}
