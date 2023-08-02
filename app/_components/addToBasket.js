'use client';

import { addBasket } from '../actions.js';

export default function AddToBasket() {
  let cookieItem1 = 'placeholder';
  function handleClick(itemName) {
    addBasket(itemName);
  }
  return (
    <div>
      <p>
        <a onClick={() => handleClick('Item1')}>Item 1 Count: {cookieItem1}</a>
      </p>
    </div>
  );
}
