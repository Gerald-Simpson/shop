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
  variantName
) {
  'use server';

  if (cookieId.length === 36) {
    await addToBasket({
      cookieId: cookieId,
      itemDbId: itemDbId,
      variantName: variantName,
    });
    revalidateTag('basketTag');
  }
}

export async function removeFromBasketAndClearCache(
  cookieId,
  itemDbId,
  variantName
) {
  'user server';

  if (cookieId.length === 36) {
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

  if (cookieId.length === 36) {
    await decrementBasket({
      cookieId: cookieId,
      itemDbId: itemDbId,
      variantName: variantName,
    });
    revalidateTag('basketTag');
  }
}
