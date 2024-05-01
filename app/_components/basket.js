'use client';

import { useState, useContext } from 'react';
import { Suspense } from 'react';
import { checkOut } from '../api/checkout_sessions.ts';
import { GlobalContext } from '../../stateProvider.tsx';
import { addToBasket, removeFromBasket, decrementBasket } from '../actions.tsx';
import { removeOutOfStock } from '../actions.tsx';
import { space, inter } from '../fonts.ts';

//&#128722 old trolley
export default function Basket(props) {
  const { showBasket, basketChange } = useContext(GlobalContext);
  const toggleBasket = () => basketChange(!showBasket);
  const handleChildClick = (e) => {
    e.stopPropagation();
  };
  if (showBasket === false) {
    return (
      <div className={inter.className}>
        <button
          id={'navBasket'}
          className={
            'hover:text-textAccent select-none hidden md:flex ' +
            space.className
          }
          onClick={() => toggleBasket()}
        >
          Basket&nbsp;
          <span className='text-sm'>{props.basketCount}</span>
        </button>
        <img
          id={'navBasket'}
          className={'text-xl hover:text-textAccent select-none md:hidden'}
          src='/basket.png'
          width='25px'
          height='25px'
          onClick={() => toggleBasket()}
        />
      </div>
    );
  } else
    return (
      <div className={inter.className}>
        <button
          id={'navBasket'}
          className={'hover:text-textAccent select-none ' + space.className}
          onClick={() => toggleBasket()}
        >
          Basket {props.basketCount}
        </button>
        <div
          onClick={() => toggleBasket()}
          className={
            'flex flex-col items-end fixed top-0 right-0 w-screen h-full z-50 bg-slate-500/50'
          }
        >
          <div
            onClick={(e) => handleChildClick(e)}
            className='flex flex-col items-center justify-between w-full h-full bg-white md:rounded-xl md:mt-2 md:mr-2 md:mb-2 md:max-w-[480px]'
          >
            <div className='flex flex-col h-full max-h-screen overflow-auto items-center w-full'>
              <div className='flex flex-row w-full px-5 justify-between items-center'>
                <div></div>
                <h1 className='my-4'>Your Basket</h1>
                <button
                  className='text-lg hover:text-red-700 select-none'
                  onClick={() => toggleBasket()}
                >
                  &#x2715;
                </button>
              </div>
              <div className='flex flex-col w-full h-full border-t'>
                <Suspense fallback={<p>Loading...</p>}>
                  <CombinedBasketTiles
                    comparedBasket={props.comparedBasket}
                    cookieId={props.cookieId}
                  />
                </Suspense>
              </div>
            </div>
            <CheckoutOverlay
              comparedBasket={props.comparedBasket}
              basketCount={props.basketCount}
            />
          </div>
        </div>
      </div>
    );
}

function CheckoutOverlay(props) {
  if (props.comparedBasket.inStock.length > 0) {
    return (
      <div className='flex flex-col items-center w-full border-t h-24'>
        <div className='w-full h-auto flex justify-between px-4 pt-4 pb-1'>
          <h5 className='text-xs'>
            Subtotal ({props.comparedBasket.inStockQuantity} Items)
          </h5>
          <h5 className='text-xs'>
            £{priceCount(props.comparedBasket.inStock)}
          </h5>
        </div>
        <form
          className='w-full h-full px-4'
          action={checkOut}
          onClick={() => removeOutOfStock(props.cookieId)}
        >
          <button className='bg-blue-500 w-full h-10 rounded-md select-none'>
            Checkout
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div className='flex flex-col items-center w-full border-t h-24'>
        <div className='w-full h-auto flex justify-between px-4 pt-4 pb-1'>
          <h5 className='text-xs'>
            Subtotal ({props.comparedBasket.inStockQuantity} Items)
          </h5>
          <h5 className='text-xs'>
            £{priceCount(props.comparedBasket.inStock)}
          </h5>
        </div>
        <form className='w-full h-full px-4' action={checkOut}>
          <button
            className='bg-gray-300 w-full h-10 rounded-md select-none'
            disabled
          >
            Checkout
          </button>
        </form>
      </div>
    );
  }
}

function CombinedBasketTiles(props) {
  let inStock = props.comparedBasket.inStock;
  let outStock = props.comparedBasket.outStock;

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
  } else if (inStock.length === 0 && outStock.length === 0) {
    return (
      <div className='flex h-full w-full flex-col text-center content-center'>
        <h2 className='text-lg pt-10'>Your Basket Is Empty!</h2>
      </div>
    );
  } else if (outStock.length > 0) {
    let inTiles = inStock.map((item) => {
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
    let outTiles = [
      <div className='flex flex-col text-center py-5'>
        <h2 className='text-xs'>Below items not included as out of stock</h2>
      </div>,
    ];
    outTiles.push(
      outStock.map((item) => {
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
      }),
    );
    return inTiles.concat(outTiles);
  }
}

function BasketTile(props) {
  const priceOptions = {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  return (
    <div className='flex flex-row justify-between w-full p-5 items-center border-b'>
      <img width='90' height='90' src={props.img} />
      <div className='flex justify-between w-full h-full mx-3'>
        <div className='flex flex-col h-full justify-start py-2'>
          <p className='text-xs font-bold underline underline-offset-2'>
            {props.name}
          </p>
          <p className='pt-2 text-xs'>{props.variantName}</p>
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
              removeFromBasket(
                props.cookieId,
                props.itemDbId,
                props.variantName,
              );
            }}
            className='text-xs hover:text-red-700 select-none'
          >
            Remove
          </button>
          <p>
            £
            {(props.price * props.quantity).toLocaleString(
              'en-US',
              priceOptions,
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

function priceCount(inStock) {
  const priceOptions = {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  if (inStock.length === 0) return '0.00';
  let basketPriceCount = 0.0;
  inStock.forEach((entry) => {
    basketPriceCount += entry.quantity * entry.price;
  });
  return basketPriceCount.toLocaleString('en-US', priceOptions);
}

function QuantityControl(props) {
  return (
    <div className='flex justify-evenly items-center w-16 border'>
      <div
        className='flex w-full justify-center items-center hover:bg-slate-200 border-r text-l select-none cursor-pointer'
        onClick={() => {
          decrementBasket(props.cookieId, props.itemDbId, props.variantName);
        }}
      >
        &#x2212;
      </div>
      <div className='flex w-full justify-center items-center'>
        <p className='text-xs select-none'>{props.quantity}</p>
      </div>
      <div
        className='flex w-full justify-center items-center hover:bg-slate-200 border-l text-l select-none cursor-pointer'
        onClick={() => {
          addToBasket(props.cookieId, props.itemDbId, props.variantName);
        }}
      >
        &#x2B;
      </div>
    </div>
  );
}
