'use server';

import { revalidateTag } from 'next/cache';
import { AddToBasket } from './shop/_components/addToBasket.js';

export async function addToBasketAndClearCache(
  cookieId,
  itemDbId,
  variantName
) {
  'use server';

  await AddToBasket({
    cookieId: cookieId,
    itemDbId: itemDbId,
    variantName: variantName,
  });
  revalidateTag('basketTag');
}
