'use server';

import { revalidateTag } from 'next/cache';
import {
  addToBasket,
  removeFromBasket,
  decrementBasket,
} from './shop/_components/modifyBasket.js';

export async function addToBasketAndClearCache(
  cookieId,
  itemDbId,
  variantName,
  quantity = 1
) {
  'use server';
  if (cookieId == '') {
  } else {
    await addToBasket(
      {
        cookieId: cookieId,
        itemDbId: itemDbId,
        variantName: variantName,
      },
      quantity
    );
    revalidateTag('basketTag');
  }
}

export async function removeFromBasketAndClearCache(
  cookieId,
  itemDbId,
  variantName
) {
  'user server';
  if (cookieId == '') {
  } else {
    await removeFromBasket({
      cookieId: cookieId,
      itemDbId: itemDbId,
      variantName: variantName,
    });
    revalidateTag('basketTag');
  }
}

export async function decrementBasketAndClearCache(
  cookieId,
  itemDbId,
  variantName
) {
  'user server';
  if (cookieId == '') {
  } else {
    await decrementBasket({
      cookieId: cookieId,
      itemDbId: itemDbId,
      variantName: variantName,
    });
    revalidateTag('basketTag');
  }
}
