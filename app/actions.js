'use server';

import { cookies } from 'next/headers';

export async function addBasket(item) {
  cookies().set('basket', 'sdfsdf');
  console.log('cookieset');
}
