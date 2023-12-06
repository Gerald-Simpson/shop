'use client';

//import { toggleBasket } from './navButtonAction.js';
import { useState } from 'react';
import BasketOverlay from './basketOverlay.js';
import { Suspense } from 'react';
import checkOut from '../api/checkout_sessions.js';

export default function NavBasketButton(props) {
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
    //props.comparedBasket
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
                  <p>bombined tiles</p>
                </Suspense>
              </div>
            </div>
            <div className='flex flex-col items-center w-full border-t h-24'>
              <div className='w-full h-auto flex justify-between px-4 pt-4 pb-1'>
                <h5 className='text-xs'>
                  Subtotal ({props.basketCount} Items)
                </h5>
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
      </div>
    );
  }
}

/*          <BasketOverlay
            showBasket={showBasket}
            toggleBasket={toggleBasket}
            basketCount={props.basketCount}
            basketData={props.basketData}
            stockData={props.stockData}
          />
*/
