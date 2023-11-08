'use client';

import { addToBasketAndClearCache } from '../../actions.js';

export default function AddToBasketButton(props) {
  return (
    <button
      onClick={() => addToBasketAndClearCache(props.cookieId, props.itemDbId)}
    >
      Add to Basket
    </button>
  );
}
