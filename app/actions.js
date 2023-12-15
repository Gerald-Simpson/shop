'use server';

import { revalidateTag } from 'next/cache';
import { addToBasket } from './shop/_components/addToBasket.js';
import { removeFromBasket } from './shop/_components/removeFromBasket.js';

export async function addToBasketAndClearCache(
  cookieId,
  itemDbId,
  variantName
) {
  'use server';

  await addToBasket({
    cookieId: cookieId,
    itemDbId: itemDbId,
    variantName: variantName,
  });
  revalidateTag('basketTag');
}

export async function removeFromBasketAndClearCache(
  cookieId,
  itemDbId,
  variantName
) {
  'user server';

  await removeFromBasket({
    cookieId: cookieId,
    itemDbId: itemDbId,
    variantName: variantName,
  });
  revalidateTag('basketTag');
}
