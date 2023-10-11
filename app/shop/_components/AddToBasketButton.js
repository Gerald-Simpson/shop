'use client';

import { AddToBasket } from './addToBasket.js';

export default function AddToBasketButton(props) {
  const AddToBasketWithProps = AddToBasket.bind(null, {
    cookieId: props.cookieId,
    itemDbId: props.itemDbId,
  });
  return (
    <form action={AddToBasketWithProps}>
      <button type='submit'>Add to Basket</button>
    </form>
  );
}
