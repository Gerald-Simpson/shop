'use client';

import { doThing } from './navButtonAction.js';

export default function NavBasketButton(props) {
  return (
    <button
      id={'navBasket'}
      className={'hover:text-textAccent'}
      onClick={() => doThing()}
    >
      BASKET {props.basketCount}
    </button>
  );
}
